export const projects = [


 {
  slug: "robotic-wrinkle-flattening",
  title: "Human-Inspired Robotic Cloth Manipulation (HI-ARCF)",
  summary: "Modeled human strategies from participant data and deployed a vision-guided manipulation pipeline for wrinkle flattening.",
  tags: ["Robotics", "Manipulation", "Vision", "Learning from Humans"],
  hero: {
    type: "video",
    src: "media/wrinkle-demo.mp4",
    poster: "media/wrinkle-thumb.png",
    caption: "Robot flattenting dominant wrinkles using a human-inspired strategy model.",
  },
  approachSteps: [
    { id: "data-collection", title: "Human Data Collection", subtitle: "Capture cloth state + finger pulls (ArUco)." },
    { id: "feature-extraction", title: "Feature Extraction", subtitle: "Detect wrinkles and quanity it's features." },
    { id: "strategy-model", title: "Strategy Model", subtitle: "Predict wrinkle clearing pull action from cloth state." },
    { id: "closed-loop", title: "Closed-loop Execution", subtitle: "Implement cloth flattening on FANUC robot" },
  ],
},

{
    slug: "bomi-sewing-machine-control",
    title: "Body–Machine Interface for Industrial Sewing Machine Control",
    summary:
      "An alternative control paradigm for industrial sewing machines that replaces pedal-based input with a torso-lean-based body-machine interface. The system includes real-time haptic feedback and aims to improve workplace accessibility for operators with lower-limb impairments.",
    tags: ["HMI", "Wearables", "Embedded", "Real-time"],
    hero: {
      type: "video",
      src: "media/bomi-demo.mp4",
      poster: "media/bomi-thumb.png",
      caption: "Prototype BoMI controlling sewing machine speed using body input + haptics.",
    },
    bullets: [
      "Built an alternative control paradigm to replace pedal-based sewing machine control using body-motion sensing.",
      "Reverse-engineered sewing machine electronics and built an Arduino interface for real-time motor speed control.",
      "Integrated IMU/EMG sensing with a real-time Python processing pipeline.",
      "Implemented bHaptics vest feedback for continuous proportional cues and discrete state transitions.",
    ],
    highlights: [
      { label: "Core", value: "Body input → speed control mapping" },
      { label: "Hardware", value: "Arduino + machine control board + sensors + haptics" },
      { label: "Next", value: "Adaptive per-user mapping + camera-based state feedback" },
    ],
    links: [
      // { label: "Demo video", href: "https://..." },
    ],
    gallery: [
      { type: "image", src: "media/bomi-setup.jpg", caption: "System setup (recommended)." },
    ],
  },
  {
    slug: "multi-object-tracking",
    title: "Real-Time Object Tracking for an Autonomous Service Robot",
    summary:
      "Built navigation + tracking and created multi-sensor data acquisition and a PyQt GUI for visualization/verification.",
    tags: ["Robotics", "SLAM", "Perception", "PyQt"],
    hero: {
      type: "image",
      src: "media/slam-thumb.jpg",
      caption: "Add a clean photo or a map/trajectory figure.",
    },
    bullets: [
      "Developed SLAM-based navigation and integrated real-time object tracking for an autonomous service robot.",
      "Built multi-sensor data acquisition system to support testing and dataset creation.",
      "Created a PyQt GUI for visualization and training data verification.",
    ],
    highlights: [
      { label: "Role", value: "Robotics & AI Engineer" },
      { label: "Deliverables", value: "Navigation + tracking + data tooling" },
    ],
    links: [],
    gallery: [
      { type: "image", src: "media/slam-gui.png", caption: "PyQt GUI (recommended)." },
    ],
  },
];
