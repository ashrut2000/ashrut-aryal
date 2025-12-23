import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { publications } from "../data/publications.jsx";
import { useState } from "react";

export default function Home() {
  const base = import.meta.env.BASE_URL;
  const [openPhoto, setOpenPhoto] = useState(false);

  return (
    <div className="stack">
      {/* HERO */}
      <section className="hero">
        <div className="heroTop">
          <div className="photoWrap">
            <img
              className="heroPhoto"
              src={`${base}media/headshot.png`}
              alt="Ashrut Aryal"
              role="button"
              tabIndex={0}
              onClick={() => setOpenPhoto(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setOpenPhoto(true);
              }}
              style={{ cursor: "pointer" }}
              title="Click to view full photo"
            />
          </div>

          {/* Lightbox / modal */}
          {openPhoto && (
            <div
              onClick={() => setOpenPhoto(false)}
              role="button"
              tabIndex={-1}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.72)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
                zIndex: 9999,
              }}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  maxWidth: "min(900px, 92vw)",
                  maxHeight: "92vh",
                  width: "fit-content",
                  background: "rgba(20,20,20,0.35)",
                  borderRadius: "18px",
                  padding: "10px",
                }}
              >
                <img
                  src={`${base}media/headshot-full.jpg`}   // <-- your new filename
                  alt="Ashrut Aryal (full photo)"
                  style={{
                    display: "block",
                    maxWidth: "100%",
                    maxHeight: "calc(92vh - 20px)",
                    borderRadius: "14px",
                  }}
                />

                <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                  <button
                    type="button"
                    onClick={() => setOpenPhoto(false)}
                    style={{
                      cursor: "pointer",
                      border: "1px solid rgba(255,255,255,0.25)",
                      background: "rgba(255,255,255,0.08)",
                      color: "white",
                      padding: "8px 14px",
                      borderRadius: "999px",
                      fontSize: "14px",
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="heroText">
            <h1>Ashrut Aryal</h1>

            <div className="lede">
              <p>
                I’m a 3rd-year PhD student in Mechanical Engineering at Michigan State University, working in the{" "}
                <a
                  className="inlineLink"
                  href="https://sites.google.com/site/motrelab/home"
                  target="_blank"
                  rel="noreferrer"
                >
                  MOTRE Lab
                </a>
                .
              </p>
              <p>
                My research focuses on <strong>human–machine interaction</strong> and{" "}
                <strong>robotic manipulation</strong>, with an emphasis on learning from human behavior and building
                systems that work reliably in the real world. I’ve worked on human-inspired robotic cloth manipulation
                and I’m currently developing a body–machine interface to control industrial sewing machines.
              Before my PhD, I worked as a Robotics and AI Engineer developing perception and tracking systems for autonomous robots </p>
            </div>


            <div className="actions">
  <a className="btn primary" href={`${base}cv.pdf`} target="_blank" rel="noreferrer"> Resume </a>


</div>

          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section">
        <div className="sectionHeader">
          <h2>Projects</h2>
          {/* <p>Click a project for details (video, figures, links).</p> */}
        </div>

        <div className="grid">
          {projects.map((p) => (
            <Link key={p.slug} to={`/projects/${p.slug}`} className="card">
              <div className="thumb">
                {p.hero?.type === "video" ? (
                  <video
                    src={`${base}${p.hero.src}`}
                    poster={p.hero.poster ? `${base}${p.hero.poster}` : undefined}
                    muted
                    playsInline
                    loop
                    autoPlay
                  />
                ) : (
                  <img src={`${base}${p.hero?.src}`} alt={p.title} />
                )}
              </div>

              <div className="cardBody">
                <div className="cardTitle">{p.title}</div>
                <div className="cardSummary">{p.summary}</div>
                <div className="tagRow">
                  {p.tags.slice(0, 4).map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PUBLICATIONS */}
      <section className="section">
        <div className="sectionHeader">
          <h2>Publications</h2>

        </div>

        <div className="pubList">
          {publications.map((pub) => (
            <div className="pub" key={`${pub.title}-${pub.year}`}>
              <div className="pubTitle">{pub.title}</div>
              <div className="pubMeta">
                {pub.authors} • <span className="muted">{pub.venue}</span> •{" "}
                {pub.year}
                {pub.note ? ` • ${pub.note}` : ""}
              </div>

              {pub.links?.length ? (
                <div className="pubLinks">
                  {pub.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section className="section">
  <div className="sectionHeader">
    <h2>Skills</h2>
   
  </div>

  <div className="skillsGrid">
    <div className="skillCard">
      <div className="skillTitle">Robotics</div>
      <ul className="skillList">
        <li>ROS 2</li>
        <li>Robot manipulation</li>
        <li>Industrial robots (FANUC)</li>
      </ul>
    </div>

    <div className="skillCard">
      <div className="skillTitle">Perception & ML</div>
      <ul className="skillList">
        <li>OpenCV, YOLO</li>
        <li>PyTorch, TensorFlow</li>
        <li>RGB-D, depth estimation</li>
      </ul>
    </div>

    <div className="skillCard">
      <div className="skillTitle">Programming</div>
      <ul className="skillList">
        <li>Python</li>
        <li>MATLAB</li>
        <li>C / C++</li>
      </ul>
    </div>

    <div className="skillCard">
      <div className="skillTitle">Hardware & Tools</div>
      <ul className="skillList">
        <li>Arduino</li>
        <li>IMU and EMG</li>
        <li>Git, Linux, SolidWorks</li>
      </ul>
    </div>
  </div>
</section>
    </div>
  );
}
