const description = "I came to software engineering through an unconventional path. With a background in Psychology and Theatre, I spent over a decade in the workforce before pursuing my Masters in Computer Science. But that winding journey gave me something valuable: perspective.\n\nI understand product needs because I've been a project coordinator on large-scale initiatives. I understand data because I started in tech as a data scientist—until I discovered I loved building analytics tools more than running the analyses. Now as a full-stack developer with a focus on backend, data, and API design, I realize that every step was leading me exactly to where I am now.";

export default function Home() {
  return (

    <div className="hero">
      <h1>Ray Ruzzo</h1>
      <h2>Professional Nerd</h2>
      <div className="introduction">
        <p>{description}</p>
      </div>
      <div className="call-to-action">
        <a href="/resume" className="btn">View Resume</a>
        <a href="/projects" className="btn">View Projects</a>
      </div>
    </div>
  );
}
