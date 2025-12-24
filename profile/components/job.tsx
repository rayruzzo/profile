import type { Job } from "@/types/job";
type JobProps = Job;

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

function JobDisplay({ title, employer, location, startDate, endDate, description }: JobProps) {
    console.log('JobDisplay description:', description, 'Type:', Array.isArray(description) ? 'array' : typeof description);
    return (
        <div className="job-card">
            <h3>{title}</h3>
            <h4>{employer}</h4>
            <p className="location">{location}</p>
            <p className="date-range">
                {formatMMYYYY(startDate)} - {endDate ? formatMMYYYY(endDate) : 'Present'}
            </p>
            {Array.isArray(description) && description.length > 0 && (
                <ul className="details" style={{ paddingLeft: '1.25rem', margin: 0 }}>
                    {description.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default JobDisplay;