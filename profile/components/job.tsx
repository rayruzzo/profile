import type { IJob } from '../db/job.model';

type JobProps = IJob;

function JobDisplay({ title, employer, location, startDate, endDate, description }: JobProps) {
    return (
        <div>
            <h3>{title}</h3>
            <h4>{employer}</h4>
            <p className="location">{location}</p>
            <p className="date-range">
                {new Date(startDate).toLocaleDateString()} - {endDate ? new Date(endDate).toLocaleDateString() : 'Present'}
            </p>
            {description && <p className="details">{description}</p>}
        </div>
    );
}

export default JobDisplay;