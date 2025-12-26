function Header() {
    return (
        <header>
            <div className="header-left">
                <a href="/" className="site-name">ray ruzzo . com  | </a>
                <div className="tagline">software engineer & professional nerd</div>
            </div>
            <div className="header-right">
                <ul>
                    <li><a href="/resume">RESUME</a></li>
                    <li><a href="/projects">PROJECTS</a></li>
                    <li><a href="#" title="Coming soon">BLOG</a></li>
                </ul>

            </div>
        </header>
    );
}

export default Header;