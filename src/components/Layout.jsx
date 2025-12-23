export default function Layout({ children }) {
  const base = import.meta.env.BASE_URL;

  return (
    <div className="page">
      <header className="header">
        <div className="container headerInner">
          <a className="brand" href={`${base}#/`}>
            {/* <img className="avatar" src={`${base}media/headshot.png`} alt="Headshot" /> */}
            <div>
              <div className="name">Ashrut Aryal</div>
              {/* <div className="subtitle">PhD (Year 3) • HMI + Robotics/Manipulation</div> */}
            </div>
          </a>

          <nav className="nav">
            <a className="navLink" href={`${base}cv.pdf`} target="_blank" rel="noreferrer">
              CV
            </a>
            <a className="navLink" href="mailto:aryalash@msu.edu">Email</a>
            <a className="navLink" href="https://www.linkedin.com/in/a-aryal/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            {/* <a className="navLink" href="YOUR_GITHUB" target="_blank" rel="noreferrer">
              GitHub
            </a> */}
          </nav>
        </div>
      </header>

      <main className="container main">{children}</main>

      <footer className="footer">
        <div className="container footerInner">
          <span>Open to internships in Robotics Manipulation, Human-Machine Interaction</span>
          <span>•</span>
          <a href="mailto:aryalash@msu.edu">aryalash@msu.edu</a>
        </div>
      </footer>
    </div>
  );
}
