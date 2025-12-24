import { IEducation } from "@/db/education.model";

type EducationProps = IEducation;

function EducationDisplay({ institution, degree, fieldOfStudy, startDate, endDate, notes }: EducationProps) {
    return (
        <div>
            <h3>{degree} in {fieldOfStudy}</h3>
            <h4>{institution}</h4>
            <p className="date-range">
                {new Date(startDate).toLocaleDateString()} - {endDate ? new Date(endDate).toLocaleDateString() : 'Present'}
            </p>
            {notes && <p className="details">{notes}</p>}
        </div>
    );
}

export default EducationDisplay; 