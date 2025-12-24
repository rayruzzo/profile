import type { Project } from "@/types/project";
type ProjectProps = Project;

function ProjectDisplay({ name, description, techStack, gh_link, live_link, previewImage }: ProjectProps) {
    return (
        <div className="project-card">
            <h3>{name}</h3>
            {previewImage && <img src={previewImage} alt={`${name} preview`} className="project-preview" />}
            {description && <p className="details">{description}</p>}
            {techStack && techStack.length > 0 && (
                <div className="tech-stack">
                    <span className="tech-label">Tech Stack:</span> {techStack.join(', ')}
                </div>
            )}
            <div className="project-links">
                {gh_link && <a href={gh_link} target="_blank" rel="noopener noreferrer">GitHub</a>}
                {live_link && <a href={live_link} target="_blank" rel="noopener noreferrer">Live Demo</a>}
            </div>
        </div>
    );
}

export default ProjectDisplay;