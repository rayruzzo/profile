import { IProject } from '@/db/project.model';

type ProjectProps = IProject;

function ProjectDisplay({ name, description, techStack, gh_link, live_link, previewImage }: ProjectProps) {
    return (
        <div>
            <h3>{name}</h3>
            {previewImage && <img src={previewImage} alt={`${name} preview`} />}
            {description && <p className="details">{description}</p>}
            {techStack && techStack.length > 0 && (
                <p className="tech-stack">Tech Stack: {techStack.join(', ')}</p>
            )}
            <p className="links">
                {gh_link && <a href={gh_link} target="_blank" rel="noopener noreferrer">GitHub</a>}
                {live_link && <a href={live_link} target="_blank" rel="noopener noreferrer">Live Demo</a>}
            </p>
        </div>
    );
}

export default ProjectDisplay;