import { IResume } from "@/db/resume.model";
type ResumeProps = IResume;

function ResumeDisplay({ name, tagline, email, phone, location, summary, linkedin, github, avatar}: ResumeProps) {
    return (
        <div>
            <section className="header">
                <h1>{name}</h1>
                {tagline && <p className="tagline">{tagline}</p>}
                <p className="email">{email} {phone && `| ${phone}`}</p>
                {location && <p className="location">{location}</p>}
                {linkedin && <p className="linkedin">LinkedIn: {linkedin}</p>}
                {github && <p className="github">GitHub: {github}</p>}
                {avatar && <img src={avatar} alt={`${name}'s avatar`} className="avatar" />}
            </section>
            {summary && <section className="summary"><h2>Summary</h2><p>{summary}</p></section>}
        </div>
    );
}

export default ResumeDisplay;