import jsPDF from 'jspdf';

interface ResumeData {
  resume: any;
  jobs: any[];
  education: any[];
}

export function generateMarkdown(data: ResumeData): string {
  const { resume, jobs, education } = data;
  let markdown = '';

  // Header
  markdown += `# ${resume.name}\n\n`;
  if (resume.tagline) markdown += `*${resume.tagline}*\n\n`;
  
  // Contact Info
  markdown += `📧 ${resume.email}`;
  if (resume.phone) markdown += ` | 📞 ${resume.phone}`;
  markdown += '\n\n';
  if (resume.location) markdown += `📍 ${resume.location}\n\n`;
  if (resume.linkedin) markdown += `[LinkedIn](${resume.linkedin}) | `;
  if (resume.github) markdown += `[GitHub](${resume.github})`;
  markdown += '\n\n';

  // Summary
  if (resume.summary) {
    markdown += `## Summary\n\n${resume.summary}\n\n`;
  }

  // Experience
  if (jobs.length > 0) {
    markdown += `## Experience\n\n`;
    jobs.forEach((job: any) => {
      markdown += `### ${job.title}\n`;
      markdown += `**${job.employer}**`;
      if (job.location) markdown += ` | ${job.location}`;
      markdown += '\n';
      markdown += `*${job.startDate} - ${job.endDate || 'Present'}*\n\n`;
      if (job.description && Array.isArray(job.description)) {
        job.description.forEach((item: string) => {
          markdown += `- ${item}\n`;
        });
        markdown += '\n';
      }
    });
  }

  // Education
  if (education.length > 0) {
    markdown += `## Education\n\n`;
    education.forEach((edu: any) => {
      markdown += `### ${edu.degree} in ${edu.fieldOfStudy}\n`;
      markdown += `**${edu.institution}**`;
      if (edu.location) markdown += ` | ${edu.location}`;
      markdown += '\n';
      markdown += `*${edu.startDate} - ${edu.endDate || 'Present'}*\n\n`;
      if (edu.description) markdown += `${edu.description}\n\n`;
    });
  }

  return markdown;
}

export function downloadMarkdown(data: ResumeData, filename: string = 'resume.md') {
  const markdown = generateMarkdown(data);
  const blob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadPDFFromMarkdown(data: ResumeData, filename: string = 'resume.pdf') {
  const { resume, jobs, education } = data;
  const doc = new jsPDF();
  
  let yPosition = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - (margin * 2);
  const lineHeight = 7;

  // Helper function to format date from yyyy-mm to MM/YYYY
  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    return `${month}/${year}`;
  };

  // Helper function to check if we need a new page
  const checkPageBreak = (neededSpace: number = 10) => {
    if (yPosition + neededSpace > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
    }
  };

  // Header - Name
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text(resume.name, margin, yPosition);
  yPosition += 10;

  // Tagline
  if (resume.tagline) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'italic');
    doc.text(resume.tagline, margin, yPosition);
    yPosition += 8;
  }

  // Contact Info
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  let contactLine = resume.email;
  if (resume.phone) contactLine += ` | ${resume.phone}`;
  doc.text(contactLine, margin, yPosition);
  yPosition += 6;

  if (resume.location) {
    doc.text(resume.location, margin, yPosition);
    yPosition += 6;
  }

  if (resume.linkedin || resume.github) {
    let linksLine = '';
    if (resume.linkedin) linksLine += resume.linkedin;
    if (resume.github) linksLine += (linksLine ? ' | ' : '') + resume.github;
    doc.text(linksLine, margin, yPosition);
    yPosition += 10;
  } else {
    yPosition += 4;
  }

  // Summary
  if (resume.summary) {
    checkPageBreak(20);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Summary', margin, yPosition);
    yPosition += 7;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const summaryLines = doc.splitTextToSize(resume.summary, maxWidth);
    summaryLines.forEach((line: string) => {
      checkPageBreak();
      doc.text(line, margin, yPosition);
      yPosition += lineHeight;
    });
    yPosition += 3;
  }

  // Experience
  if (jobs.length > 0) {
    checkPageBreak(20);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Experience', margin, yPosition);
    yPosition += 8;

    jobs.forEach((job: any) => {
      checkPageBreak(25);
      
      // Job Title
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(job.title, margin, yPosition);
      yPosition += 6;

      // Employer and Location
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      let employerLine = job.employer;
      if (job.location) employerLine += ` | ${job.location}`;
      doc.text(employerLine, margin, yPosition);
      yPosition += 5;

      // Dates
      doc.setFont('helvetica', 'italic');
      const jobStartDate = formatDate(job.startDate);
      const jobEndDate = job.endDate ? formatDate(job.endDate) : 'Present';
      doc.text(`${jobStartDate} - ${jobEndDate}`, margin, yPosition);
      yPosition += 6;

      // Description bullets
      if (job.description && Array.isArray(job.description)) {
        doc.setFont('helvetica', 'normal');
        job.description.forEach((item: string) => {
          checkPageBreak();
          const bulletLines = doc.splitTextToSize(`• ${item}`, maxWidth - 5);
          bulletLines.forEach((line: string, index: number) => {
            checkPageBreak();
            doc.text(line, margin + (index > 0 ? 5 : 0), yPosition);
            yPosition += lineHeight;
          });
        });
      }
      yPosition += 4;
    });
  }

  // Education
  if (education.length > 0) {
    checkPageBreak(20);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Education', margin, yPosition);
    yPosition += 8;

    education.forEach((edu: any) => {
      checkPageBreak(20);
      
      // Degree
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`${edu.degree} in ${edu.fieldOfStudy}`, margin, yPosition);
      yPosition += 6;

      // Institution and Location
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      let institutionLine = edu.institution;
      if (edu.location) institutionLine += ` | ${edu.location}`;
      doc.text(institutionLine, margin, yPosition);
      yPosition += 5;

      // Dates
      doc.setFont('helvetica', 'italic');
      const eduStartDate = formatDate(edu.startDate);
      const eduEndDate = edu.endDate ? formatDate(edu.endDate) : 'Present';
      doc.text(`${eduStartDate} - ${eduEndDate}`, margin, yPosition);
      yPosition += 6;

      // Description
      if (edu.description) {
        doc.setFont('helvetica', 'normal');
        const descLines = doc.splitTextToSize(edu.description, maxWidth);
        descLines.forEach((line: string) => {
          checkPageBreak();
          doc.text(line, margin, yPosition);
          yPosition += lineHeight;
        });
      }
      yPosition += 4;
    });
  }

  doc.save(filename);
}
