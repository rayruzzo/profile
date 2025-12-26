import { IResume } from "@/db/resume.model";
import Image from 'next/image';

type ResumeProps = IResume;


function formatPhoneNumber(phone?: string) {
    if (!phone) return '';
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
}

function ResumeDisplay({ name, tagline, email, phone, location, summary, linkedin, github, avatar}: ResumeProps) {
    return (
        <section className="resume-header">
            <h1>{name}</h1>
            {tagline && <p className="tagline">{tagline}</p>}
            <p className="email">
                <Image src="/email.svg" alt="Email" width={20} height={20} />
                <span>{email}</span>
                {phone && (
                    <>
                        <span> | </span>
                        <Image src="/phone.svg" alt="Phone" width={20} height={20} />
                        <span>{formatPhoneNumber(phone)}</span>
                    </>
                )}
            </p>
            {location && <p className="location"><Image src="/location.svg" alt="Location" width={20} height={20} /><span>{location}</span></p>}
            {linkedin && <p className="linkedin"><Image src="/linkedin.svg" alt="LinkedIn" width={20} height={20} /><a href={linkedin} target="_blank" rel="noopener noreferrer">{linkedin}</a></p>}
            {github && <p className="github"><Image src="/github.svg" alt="GitHub" width={20} height={20} /><a href={github} target="_blank" rel="noopener noreferrer">{github}</a></p>}
            {avatar && <img src={avatar} alt={`${name}'s avatar`} className="avatar" />}
        {summary && <section className="summary"><h2>Summary</h2><p>{summary}</p></section>}
        </section>
    );
}

export default ResumeDisplay;