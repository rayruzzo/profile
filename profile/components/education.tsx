import type { Education } from "@/types/education";
type EducationProps = Education;

function formatMMYYYY(dateStr?: string) {
    if (!dateStr) return '';
    // Accepts 'YYYY-MM' or 'MM/YYYY' or 'YYYY-MM-DD'
    const match = dateStr.match(/^(\d{4})-(\d{2})/);
    if (match) {
        return `${match[2]}/${match[1]}`;
    }
    // fallback for MM/YYYY
    const fallback = dateStr.match(/^(\d{2})\/(\d{4})/);
    if (fallback) {
        return dateStr;
    }
    return dateStr;
}

function EducationDisplay({ institution, degree, fieldOfStudy, startDate, endDate, description }: EducationProps) {
    return (
        <div className="education-card">
            <h3>{degree} in {fieldOfStudy}</h3>
            <h4>{institution}</h4>
            <p className="date-range">
                {formatMMYYYY(startDate)} - {endDate ? formatMMYYYY(endDate) : 'Present'}
            </p>
            {description && <p className="details">{description}</p>}
        </div>
    );
}

export default EducationDisplay; 