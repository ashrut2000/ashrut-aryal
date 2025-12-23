// Project.jsx
import { useParams } from "react-router-dom";
import { projects } from "../data/projects";
import { useMemo } from "react";

/* ---------------- Shared components ---------------- */

function YouTubeHero({ id, autoplay = true }) {
  const auto = autoplay ? 1 : 0;
  return (
    <div className="ytWrap">
      <iframe
        className="ytFrame"
        src={`https://www.youtube.com/embed/${id}?autoplay=${auto}&mute=1&playsinline=1&controls=1&rel=0&modestbranding=1`}
        title="Project demo video"
        frameBorder="0"
        allow={autoplay ? "autoplay; encrypted-media; picture-in-picture" : "encrypted-media; picture-in-picture"}
        allowFullScreen
      />
    </div>
  );
}

function ApproachOverview({ steps }) {
  const jumpTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.history.replaceState(null, "", `#${id}`);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const safeSteps = useMemo(() => {
    if (steps?.length) return steps;
    return [
      { id: "step-1", title: "Step 1", subtitle: "Describe step 1." },
      { id: "step-2", title: "Step 2", subtitle: "Describe step 2." },
      { id: "step-3", title: "Step 3", subtitle: "Describe step 3." },
      { id: "step-4", title: "Step 4", subtitle: "Describe step 4." },
    ];
  }, [steps]);

  return (
    <section className="approachNav" aria-label="Approach overview">
      <div className="approachNavTitle">Approach Overview</div>

      <div className="flowchartGrid" role="list">
        {safeSteps.slice(0, 4).map((s, idx) => (
          <button
            key={s.id}
            type="button"
            className="flowNode"
            onClick={() => jumpTo(s.id)}
            role="listitem"
            data-step={idx + 1}
          >
            <div className="flowNodeTop">
              <span className="flowNum">{idx + 1}</span>
              <span className="flowTitle">{s.title}</span>
            </div>
            {s.subtitle ? <div className="flowSub">{s.subtitle}</div> : null}
          </button>
        ))}

        {/* arrows via CSS grid areas */}
        <span className="flowArrow arrow12" aria-hidden="true" />
        <span className="flowArrow arrow23" aria-hidden="true" />
        <span className="flowArrow arrow34" aria-hidden="true" />
      </div>
    </section>
  );
}

/* ---------------------------
   Shared: IO schematic (wrinkle)
---------------------------- */
function IOSchematic() {
  return (
    <div className="ioGrid" role="group" aria-label="Supervised learning formulation: inputs to outputs">
      <div className="ioCard">
        <div className="ioTitle">Input (Wrinkle State)</div>
        <ul className="ioList">
          <li>X position</li>
          <li>Y position</li>
          <li>Orientation (θ)</li>
        </ul>
      </div>

      <div className="ioMid" aria-hidden="true">
        <div className="ioArrowLine" />
        <div className="ioArrowHead" />
        <div className="ioMidText">Model</div>
      </div>

      <div className="ioCard">
        <div className="ioTitle">Output (Human Action)</div>
        <ul className="ioList">
          <li>X finger position</li>
          <li>Y finger position</li>
          <li>Pull direction</li>
        </ul>
      </div>
    </div>
  );
}

/* ---------------------------
   CUSTOM PAGE 1: WRINKLE
   (kept as you wrote it)
---------------------------- */
function WrinkleProject({ p, base }) {
  const setupImg = "media/wrinkle-setup.png";
  const cvPipelineImg = "media/wrinkle-cv-pipeline.png";
  const algImg = "media/wrinkle-algorithm.png";

  return (
    <article className="wrinklePage">
      {/* 1) VIDEO (caption removed) */}
      <section className="wrinkleHero">
        <YouTubeHero id="8KHZz7rHHG8" autoplay={true} />
      </section>

      {/* 2) TITLE + PROBLEM STATEMENT + MY ROLE */}
      <header className="wrinkleHeader">
        <h1 className="wrinkleTitle">Human-Inspired Robotic Cloth Manipulation</h1>
      </header>

      <section className="wrinkleProblem">
      <div className="introduction">
        <p>
          In garment manufacturing, cloth 'bunches' up behind the sewing needle, causing deformations in cloth which we refer to as 'wrinkles'. This forces sewing operators to stop and manually
          flatten the cloth, interrupting workflow and increasing fatigue. We developed a robotic system that autonomously flattens
          wrinkles by learning from human demonstrates. The system perceives the cloth state in real time and
          executes closed-loop manipulation until the cloth is flat.
        </p>
      </div>
        <div className="wrinkleRole">
          <span className="wrinkleRoleK">My Role:</span>{" "}
          <span className="wrinkleRoleV">
            Built a perception system using OpenCV to detect and quantify wrinkles. Extracted human actions from ArUco markers. Trained the model and implemented robot integration.
          </span>
        </div>
      </section>

      {/* 3) APPROACH OVERVIEW */}
      <ApproachOverview steps={p?.approachSteps} />

      {/* 4) HUMAN DATA COLLECTION */}
      <section id="data-collection" className="wrinkleSplit">
        <div>
          <h2 className="wrinkleH2">Human Data Collection</h2>
          <p className="wrinkleP">
            Built a camera-based capture setup to record cloth manipulation. Participants were asked to flatten ecloth using their index finger, which was fitted with an ArUco marker for 3D pose tracking. This enabled simultaneous capture of cloth state and finger motion. Collected data from 10 participants, segmented into individual pull actions (start point, direction, distance).
          </p>
        </div>

        <figure className="wrinkleFigure paper fig75">
          <img src={`${base}${setupImg}`} alt="Human data collection setup with overhead camera and ArUco marker" />
          <figcaption className="wrinkleFigcap">
            Setup for data collection. An ArUco marker enables 3D finger pose tracking, while a defined home position initializes each trial.
        </figcaption>
          </figure>
      </section>

      {/* 5) WRINKLE PERCEPTION */}
      <section id="feature-extraction" className="wrinkleFull">
        <h2 className="wrinkleH2">Wrinkle Perception</h2>
        <p className="wrinkleP">
          Designed and implemented a real-time computer vision system to extract wrinkle geometry from raw camera images using grayscale conversion, denoising, adaptive thresholding, edge detection, and morphological operations, followed by extraction of wrinkle centroid, orientation, and size.
        </p>

        <figure className="wrinkleFigure paper fig95 capCenter">
  <img src={`${base}${cvPipelineImg}`} alt="Wrinkle perception pipeline (raw image to extracted wrinkle)" />
  <figcaption className="wrinkleFigcap">
    Real-time perception pipeline: raw RGB → processed mask → extracted wrinkle geometry.
  </figcaption>
</figure>
      </section>

      {/* 6) MODELING HUMAN STRATEGY */}
      <section id="strategy-model" className="wrinkleFull">
        <h2 className="wrinkleH2">Modeling Human Strategy</h2>

        <div className="wrinkleSubblock">
          <h3 className="wrinkleH3">Part A — Problem Formulation</h3>
          <p className="wrinkleP">
            We formulated cloth flattening as a supervised learning problem: given the current wrinkle state, predict the
            corresponding pull action.
          </p>
          <IOSchematic />
        </div>

        <div className="wrinkleSubblock">
          <h3 className="wrinkleH3">Part B — Model Selection</h3>
          <p className="wrinkleP">
            With limited training data (~100 demonstrations), we needed a model that would generalize to novel wrinkle
            configurations. An initial neural network fit the training data well but failed on unseen wrinkles. A linear regression model operating in a wrinkle-relative coordinate frame generalized reliably and enabled robust robotic execution.
          </p>
        </div>
      </section>

      {/* 7) ROBOT IMPLEMENTATION */}
      <section id="closed-loop" className="wrinkleFull">
        <h2 className="wrinkleH2">Closed-Loop Robot Execution</h2>

        <div className="wrinkleInlineVideo">
          <YouTubeHero id="0H3936VVZIs" autoplay = {false}/>
        </div>

        <p className="wrinkleP">
          We implemented the algorithm (HI-ARCF) on a FANUC LR Mate 200iD industrial robot. The system operates in closed
          loop: detecting wrinkles, predicting the optimal pull action, and executing feedback-controlled pulling until
          the cloth is flat. A custom finger-like end-effector was designed in SolidWorks to mimic human pulling motion.
        </p>


          <figure className="wrinkleFigure paper algFigure">
            <img src={`${base}${algImg}`} alt="HI-ARCF closed-loop wrinkle flattening algorithm" />
            <figcaption className="wrinkleFigcap">
              Algorithm for wrinkle removal
            </figcaption>
          </figure>



      </section>

      {/* 9) PUBLICATIONS */}
      {/* <section id="publications" className="wrinkleFull">
        <h2 className="wrinkleH2">Publications</h2>

        <div className="wrinklePubList">
          <div className="wrinklePub">
            <div className="wrinklePubText">
              A. Aryal, N. Kant, R. Ranganathan, R. Mukherjee, C. Owen, “Robotic Manipulation for Flattening Wrinkled
              Cloth: A Human-Inspired Algorithm,”{" "}
              <span className="wrinklePubVenue">IEEE Transactions on Human-Machine Systems</span>, 2025.{" "}
              <span className="wrinklePubNote">(Under review)</span>
            </div>

          </div>

          <div className="wrinklePub">
            <div className="wrinklePubText">
              N. Kant, A. Aryal, R. Ranganathan, R. Mukherjee, C. Owen, “Modeling Human Strategy for Flattening Wrinkled
              Cloth Using Neural Networks,” <span className="wrinklePubVenue">IEEE SMC</span>, 2024.
            </div>
           <div className="wrinklePubLinks">
  <a
    href="https://ieeexplore.ieee.org/abstract/document/10832048"
    className="wrinklePubLink"
    target="_blank"
    rel="noopener noreferrer"
  >
    PDF
  </a>
</div>
          </div>
        </div>
      </section> */}
    </article>
  );
}

/* ---------------------------
   CUSTOM PAGE 2: OBJECT TRACKING
---------------------------- */
function TrackingProject({ p, base }) {
  const thumbImg = "media/slam-thumb.jpg";
  const pyqtImg = "media/pyqt.png";
  const trackingYoutubeId = "9Cr3ZONFJvY";

  const approachSteps = p?.approachSteps?.length
    ? p.approachSteps
    : [
        { id: "det-track", title: "Object Detection", subtitle: "Detect objects in RGB image using YOLOv4" },
        { id: "depth", title: "Depth Estimation", subtitle: "Sample aligned depth image at bbox center for distance" },
        { id: "assoc", title: "Tracking", subtitle: "SORT-style 2D tracking with Kalman filtering + Hungarian association" },
        { id: "proj3d", title: "Spatial Projection", subtitle: "Convert pixel + depth to 3D position using FOV geometry" },
      ];

  return (
    <article className="trackingPage">
      {/* 1) VIDEO */}
      <section className="trackingHero">
        <YouTubeHero id={trackingYoutubeId} autoplay={true} />
        <p className="trackingVideoNote">
          <em>Demo shows 2D tracking with depth estimated from bounding box scale. Original RGB-D depth estimation was implemented using Intel RealSense hardware, which I no longer have access to.</em>
        </p>
      </section>

      {/* 2) TITLE + PROBLEM STATEMENT + MY ROLE */}
      <header className="trackingHeader">
        <h1 className="trackingTitle">Multi-Object Tracking with Depth-Augmented Visualization</h1>
      </header>

      <section className="trackingProblem">
        <p>
          Autonomous robots navigating indoor environments need to detect and track objects in real time to avoid obstacles and plan safe paths. At the National Innovation Center in Nepal, I developed a perception system for an autonomous service robot that detects objects using deep learning, tracks them across frames with persistent IDs, and estimates their spatial positions using RGB-D sensor data.
        </p>
          <div className="wrinkleRole">
          <span className="wrinkleRoleK">My Role:</span>{" "}
          <span className="wrinkleRoleV">
            Developed the complete system: detection integration, tracking, depth estimation, spatial projection, and visualization.
          </span>
        </div>
     </section>

      {/* 3) APPROACH OVERVIEW */}
      <ApproachOverview steps={approachSteps} />

      {/* 4) OBJECT DETECTION */}
      <section id="det-track" className="trackingSplit">
        <div>
          <h2 className="trackingH2">Object Detection</h2>
          <p className="trackingP">
            The system uses YOLOv4 (TensorFlow SavedModel) for real-time object detection, producing 2D bounding boxes with confidence scores. Detection is configured to filter for specific classes (e.g., people) based on the application.
          </p>
        </div>

        <figure
          className="trackingFigure"
          style={{
            width: "80%",
            maxWidth: "720px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img
            src={`${base}${thumbImg}`}
            alt="Example frame with tracked objects (boxes + IDs)"
            style={{
              width: "100%",
              height: "380px",
              objectFit: "cover",
              display: "block",
              borderRadius: "12px",
            }}
          />
          <figcaption
            className="trackingFigcap"
            style={{
              width: "100%",
              textAlign: "center",
            }}
          >
            Example visualization of tracked objects with IDs.
          </figcaption>
        </figure>
      </section>

      {/* 5) DEPTH ESTIMATION */}
      <section id="depth" className="trackingFull">
        <h2 className="trackingH2">Depth Estimation</h2>
        <p className="trackingP">
          Each detected object is assigned a depth value by sampling the aligned RGB-D depth image at the bounding box center. The Intel RealSense camera provides aligned color and depth streams, allowing direct indexing from detection pixel coordinates to depth values in meters.
        </p>
        <p className="trackingP trackingNote">
          <em>Note: The demo video uses bounding box scale as a depth proxy, as I no longer have access to the original RGB-D hardware.</em>
        </p>
      </section>

      {/* 6) TRACKING */}
      <section id="assoc" className="trackingFull">
        <h2 className="trackingH2">Tracking</h2>
        <p className="trackingP">
          To maintain object identity across frames, I implemented a SORT-style tracking architecture. The system uses Kalman filtering for state estimation and motion prediction, IOU-based matching in 2D image space, and the Hungarian algorithm for optimal detection-to-track association. The tracker maintains consistent IDs through brief occlusions and missed detections.
        </p>
      </section>

      {/* 7) SPATIAL PROJECTION */}
      <section id="proj3d" className="trackingFull">
        <h2 className="trackingH2">Spatial Projection and Visualization</h2>
        <p className="trackingP">
          To visualize object positions in space, I convert pixel coordinates and depth to camera-centric 3D positions. The system computes horizontal and vertical bearing angles using camera field-of-view, then projects bearing and depth to approximate (x, y, z) positions relative to the camera. This enables a top-down "world view" showing tracked objects with IDs and motion trails. Motion trajectories are smoothed using Savitzky-Golay filtering to reduce frame-to-frame jitter.
        </p>
      </section>

      {/* 8) DATA ACQUISITION SYSTEM */}
      <section className="trackingSplit">
        <div>
          <h2 className="trackingH2">Sensor Data Acquisition and Annotation System</h2>
          <p className="trackingP">
            In addition to the tracking system, I built a data acquisition system for collecting robot navigation training data. The system synchronizes dual RGB-D camera streams, LiDAR scans, odometry, and control commands using multi-threaded Python. I developed a PyQt GUI for real-time visualization of all streams, frame-level playback and scrubbing, and data annotation. Edits made in the GUI are reflected directly in the underlying data files, enabling efficient dataset creation and validation.
          </p>
        </div>

        <figure
          className="trackingFigure"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "0 auto",
            gap: "10px",
          }}
        >
          <img
            src={`${base}${pyqtImg}`}
            alt="PyQt GUI for synchronized multi-sensor visualization and annotation"
            style={{
              width: "100%",
              maxWidth: "800px",
              height: "auto",
              display: "block",
              borderRadius: "18px",
            }}
          />
          <figcaption
            className="trackingFigcap"
            style={{
              width: "100%",
              maxWidth: "800px",
              textAlign: "center",
            }}
          >
            PyQt tool for synchronized playback, validation, and annotation.
          </figcaption>
        </figure>
      </section>

      {/* 9) TECHNICAL HIGHLIGHTS */}
      <section className="trackingFull">
        <h2 className="trackingH2">Technical Highlights</h2>
        <ul className="trackingList">
          <li>
            <strong>Detection:</strong> YOLOv4 with TensorFlow SavedModel, class filtering
          </li>
          <li>
            <strong>Depth:</strong> Per-detection depth from aligned RGB-D stream (center-pixel sampling)
          </li>
          <li>
            <strong>Tracking:</strong> SORT-style 2D tracking with Kalman filtering and Hungarian association
          </li>
          <li>
            <strong>Projection:</strong> Bearing + depth to camera-centric 3D coordinates using FOV geometry
          </li>
          <li>
            <strong>Visualization:</strong> ID overlays, smoothed motion arrows (Savitzky-Golay), top-down world view
          </li>
          <li>
            <strong>Data Acquisition:</strong> Multi-threaded Python, PyQt GUI, synchronized multi-sensor logging
          </li>
        </ul>
      </section>
    </article>
  );
}

function BomiProject({ p, base }) {
  // ✅ Set these two things:
  const bomiYouTubeId = "1Tou617VO9E"; // e.g. "abc123..."
  const schematicImg = "media/bomi-schematic.jpg";   // rename your uploaded schematic to this

  const bomiSteps = [
    { id: "bomi-problem", title: "Body Measurement", subtitle: "Compute torso-lean angle as input signals using IMU sensors" },
    { id: "bomi-mapping", title: "Mapping", subtitle: "Map the input (lean-angle) to desired voltage" },
    { id: "bomi-interface", title: "Haptic Feedback", subtitle: "Set Haptic Feedback proportional to Lean" },
    { id: "bomi-next", title: "Interface", subtitle: "Interface the Arduino to Sewing Machine Control Board" },
  ];

  return (
    <article className="bomiPage">
      {/* 1) VIDEO */}
      <section className="bomiHero">
        <YouTubeHero id={bomiYouTubeId} autoplay={true} />
      </section>

      {/* 2) TITLE + PROBLEM + ROLE */}
      <header className="bomiHeader">
        <div className="bomiTitleRow">
          <h1 className="bomiTitle">Body–Machine Interface for Industrial Sewing Machine Control</h1>
          <span className="bomiBadge">Ongoing</span>
        </div>
      </header>

      <section id="bomi-problem" className="bomiProblem">
        <p className="bomiP">
          Conventional industrial sewing machines are controlled by a foot pedal, which modulates a potentiometer and
          produces a voltage command that sets motor speed. This limits accessibility and makes alternative control
          strategies difficult to explore. I am developing a Body–Machine Interface (BoMI) that maps upper-body motion to
          sewing-machine speed, enabling hands-free, continuous control.
        </p>

        <div className="bomiRole">
          <span className="bomiRoleK">My Role:</span>{" "}
          <span className="bomiRoleV">
            Design and implement the full prototype: sensing → real-time mapping → Arduino-based control-board
            interfacing → end-to-end system integration and testing.
          </span>
        </div>
      </section>

      {/* 3) APPROACH OVERVIEW */}
      <ApproachOverview steps={bomiSteps} />

      {/* 4) HOW IT WORKS (schematic) */}
      <section id="bomi-mapping" className="bomiSplit">
        <div>
          <h2 className="bomiH2">How the Interface Works</h2>
          <p className="bomiP">
            Industrial sewing machines typically use a foot pedal that varies a potentiometer, producing a control voltage that sets motor speed. We interface directly with the machine’s control board and use an Arduino to generate that same voltage command electronically. Our Body–Machine Interface replaces the pedal input with torso-lean measured by an IMU
          </p>
          <p className="bomiP">
            This work is ongoing; the current prototype demonstrates reliable real-time control and provides a platform
            for future adaptive and personalized mappings.
          </p>
        </div>

        <figure className="bomiFigure">
          <img src={`${base}${schematicImg}`} alt="Schematic: conventional pedal control vs body-machine interface control" />
          <figcaption className="bomiFigcap">
            Conventional pedal control (top) vs BoMI control path using body motion + Arduino (bottom).
          </figcaption>
        </figure>
      </section>



      {/* 6) FUTURE WORK */}
      <section id="bomi-next" className="bomiFull">
        <h2 className="bomiH2">Future Plans</h2>
        <ul className="bomiBullets">

          <li><strong>Personalized mapping:</strong> Make the interface adjust to each user by learning user-specific control policies to improve precision and comfort.</li>
          <li><strong>Computer vision integration:</strong> Incorporate cloth/task state monitoring to make the interface smart.</li>
        </ul>
      </section>
    </article>
  );
}

/* ---------------- Router page switch ---------------- */

export default function Project() {
  const { slug } = useParams();
  const p = projects.find((x) => x.slug === slug);
  const base = import.meta.env.BASE_URL;

  if (!p) return <div className="stack"><h1>Project not found</h1></div>;

  if (p.slug === "robotic-wrinkle-flattening") return <WrinkleProject p={p} base={base} />;
  if (p.slug === "multi-object-tracking") return <TrackingProject p={p} base={base} />;
  if (p.slug === "bomi-sewing-machine-control") return <BomiProject p={p} base={base} />;

  // default template
  return (
    <article className="stack">
      <header className="projectHeader">
        <h1>{p.title ?? "Untitled project"}</h1>
        {p.summary ? <p className="lede">{p.summary}</p> : null}
        {p.tags?.length ? (
          <div className="tagRow">
            {p.tags.map((t) => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </header>

      {p.hero?.src ? (
        <section className="heroMedia">
          {p.hero?.type === "video" ? (
            <video
              controls
              src={`${base}${p.hero.src}`}
              poster={p.hero.poster ? `${base}${p.hero.poster}` : undefined}
            />
          ) : (
            <img src={`${base}${p.hero?.src}`} alt={p.title ?? "Project"} />
          )}
          {p.hero?.caption ? <div className="caption">{p.hero.caption}</div> : null}
        </section>
      ) : null}

      {(p.bullets?.length || p.highlights?.length || p.links?.length) ? (
        <section className="twoCol">
          {p.bullets?.length ? (
            <div className="panel">
              <h2>What I did</h2>
              <ul>{p.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
            </div>
          ) : null}

          {(p.highlights?.length || p.links?.length) ? (
            <div className="panel">
              <h2>Highlights</h2>
              {p.highlights?.length ? (
                <ul className="kv">
                  {p.highlights.map((h, i) => (
                    <li key={i}>
                      <span className="k">{h.label}</span>
                      <span className="v">{h.value}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {p.links?.length ? (
                <>
                  <h3>Links</h3>
                  <div className="linkList">
                    {p.links.map((l) => (
                      <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
                        {l.label}
                      </a>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          ) : null}
        </section>
      ) : null}
    </article>
  );
}