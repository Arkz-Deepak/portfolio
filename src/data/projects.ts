export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'robotics' | 'ai-vision' | 'embedded' | 'fullstack';
  featured: boolean;
  date: string;
  competition?: string;
  cadSpecs?: string[];
  model3dUrl?: string;
  stack: string[];
  stats?: { label: string; value: string }[];
  demoUrl?: string;
  githubUrl?: string;
  paperUrl?: string;
  caseStudySlug?: string;
  media: {
    type: 'video' | 'gif' | 'image';
    url: string;
    poster?: string;
    aspectRatio: '16:9' | '4:3' | '1:1';
  };
  summary: string;
  highlights: string[];
  architectureMermaid?: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "hybrid-vortex-crawler",
    title: "Hybrid Vortex Crawler: Multi-Surface Wall-Climbing Robot",
    subtitle: "Multi-Surface Vertical Scaling & NDE Payload Delivery (NeX-Gen Robotics Challenge 2026 | IDREA)",
    category: "robotics",
    featured: true,
    date: "Aug 2026",
    competition: "NeX-Gen Robotics Challenge 2026 (IDREA | Round 1 Concept Presentation)",
    model3dUrl: "/models/vortex-crawler.glb",
    cadSpecs: [
      "Autodesk Fusion Parametric Assembly (3mm CNC Carbon Fiber Base Frame)",
      "70mm Electric Ducted Fan (EDF) Active Vortex Impeller Core",
      "Pololu Stamped Aluminum Motor Brackets & Custom Standoffs",
      "Raspberry Pi 4 (ROS 2 Jazzy Supervisor) + ESP32 Node (FreeRTOS)",
      "Flycolor 60A ESC & Dual HW-411 Buck Converters (12V to 5V Step-Down)",
      "4x Motorabit 12V 164 RPM Planetary Gear Motors with Optical Encoders",
      "Pololu 30T Continuous High-Friction Rubber Tread Belt Assembly",
      "Passive N52 Neodymium Magnetic Arrays for Ferromagnetic Surface Lock"
    ],
    stack: [
      "ROS 2 Jazzy",
      "Raspberry Pi 4",
      "ESP32 (FreeRTOS)",
      "Dual BTS7960 H-Bridges",
      "70mm EDF",
      "MPU6050 IMU",
      "Fusion 360",
      "Three.js"
    ],
    stats: [
      { label: "Holding Downforce", value: "45 N (EDF Vortex)" },
      { label: "Payload Capacity", value: "1.5 kg (NDE Probes)" },
      { label: "Control Dual-Tier", value: "ROS 2 / FreeRTOS" },
      { label: "Motor PWM Frequency", value: "20 kHz" }
    ],
    githubUrl: "https://github.com/Arkz-Deepak",
    caseStudySlug: "/projects/vortex-crawler",
    media: {
      type: "image",
      url: "/urban-traffic.jpg",
      aspectRatio: "16:9"
    },
    summary: "Engineered an industrial wall-climbing inspection robot utilizing an active aerodynamic vortex 70mm Electric Ducted Fan (EDF) generating 45 N holding force combined with passive N52 magnetic track locking. Implemented a dual-tier control hierarchy: ROS 2 Jazzy on Raspberry Pi 4 for high-level mission logic and ToF telemetry, paired via UART to an ESP32 FreeRTOS controller for deterministic motor actuation and 50Hz tilt stabilization.",
    highlights: [
      "Designed in Autodesk Fusion with 3mm CNC carbon fiber plates, Pololu 30T rubber tracks, and 4x 164 RPM planetary gear motors.",
      "Delivers 1.5 kg payload capacity for Non-Destructive Evaluation (NDE) ultrasound probes and HD thermal inspection.",
      "Dual-tier control: ROS 2 Jazzy mission supervisor (RPi4) coupled with FreeRTOS 20 kHz deterministic motor PWM (ESP32).",
      "Qualified for NeX-Gen Robotics Challenge 2026 (IDREA | Round 1 Concept Presentation)."
    ],
    architectureMermaid: `graph TD
      RPi["Raspberry Pi 4 (ROS 2 Jazzy Supervisor)"] -->|UART Telemetry| ESP32["ESP32 (FreeRTOS Controller)"]
      ESP32 -->|20 kHz PWM| Drivers["Dual BTS7960 43A H-Bridges"]
      Drivers --> Motors["4x Planetary Gear Motors (164 RPM)"]
      ESP32 -->|ESC Control| EDF["70mm EDF (45 N Vacuum Downforce)"]
      Sensors["MPU6050 IMU + ToF LiDAR"] -->|50 Hz Feedback| ESP32`
  },
  {
    id: "autotwin-ai",
    title: "AutoTwin-AI: Sim-to-Real Digital Twin",
    subtitle: "Zero-Defect Anomaly Detection in Automotive & Industrial Discrete Manufacturing",
    category: "ai-vision",
    featured: true,
    date: "Aug 2026",
    stack: ["PyTorch", "Convolutional Autoencoder (CAE)", "Blender OptiX", "FastAPI", "TensorRT", "Three.js", "WebGL", "Docker"],
    stats: [
      { label: "Defect Photos Needed", value: "0 (CAD Only)" },
      { label: "Synthetic Renders", value: "4,851" },
      { label: "Edge Latency", value: "<42 ms" },
      { label: "Convergence Loss (MSE)", value: "0.000092" }
    ],
    githubUrl: "https://github.com/Arkz-Deepak",
    caseStudySlug: "/projects/autotwin-ai",
    media: {
      type: "image",
      url: "/urban-traffic.jpg",
      aspectRatio: "16:9"
    },
    summary: "Proprietary Sim-to-Real Digital Twin pipeline eliminating the physical defect collection bottleneck. Ingests native 3D CAD files, generates 4,851 ray-traced domain-randomized synthetic renders under extreme illumination/camera noise, and trains an unsupervised PyTorch Autoencoder to localize micro-anomalies in sub-millimeter precision via reconstruction residual errors (L = ||X - X̂||²).",
    highlights: [
      "Trained across 50 epochs on NVIDIA RTX 3050 Laptop GPU in ~128.8 min with MSE loss reaching 0.000092.",
      "Engineered FastAPI / TensorRT edge inference node delivering frame evaluation under 42ms.",
      "Constructed a 3-panel WebGL dashboard (Live Camera, AI Reconstruction, Residual Heatmap) for instant PLC line-trip alerts."
    ],
    architectureMermaid: `graph LR
      CAD["3D CAD (STEP/IGES)"] --> Blender["Blender OptiX Ray-Tracing Engine"]
      Blender --> Dataset["4,851 Synthetic Renders (Domain Randomization)"]
      Dataset --> CAE["PyTorch Conv Autoencoder Training (50 Epochs)"]
      CAE --> Edge["TensorRT / FastAPI Edge Node (<42ms)"]
      Edge --> Dashboard["Three.js / WebGL 3-Panel Inspection HUD"]`
  },
  {
    id: "oomwoo-coverage-planner",
    title: "OOMWOO: Autonomous Robot Vacuum System",
    subtitle: "Complete Area Coverage Planning & SLAM Toolbox Integration in ROS 2 Jazzy",
    category: "robotics",
    featured: true,
    date: "Jul 2026",
    stack: ["ROS 2 (Jazzy)", "Nav2", "SLAM Toolbox", "Python", "C++", "Gazebo", "Coverage Planning"],
    stats: [
      { label: "Coverage Algorithm", value: "Boustrophedon (BCD)" },
      { label: "ROS 2 Distribution", value: "Jazzy Jalisco" },
      { label: "Simulation", value: "Gazebo / Nav2" }
    ],
    githubUrl: "https://github.com/Arkz-Deepak",
    caseStudySlug: "/projects",
    media: {
      type: "image",
      url: "/urban-traffic.jpg",
      aspectRatio: "16:9"
    },
    summary: "Authored core open-source coverage planning modules for the OOMWOO autonomous vacuum robot (oomwoo_clean_and_map). Implemented Boustrophedon Cellular Decomposition (BCD) for complete workspace coverage and integrated SLAM Toolbox for online map generation and localization under ROS 2 Jazzy.",
    highlights: [
      "Integrated Nav2 costmap layers and custom path generation nodes for obstacle-dense room navigation.",
      "Validated complete coverage trajectories and dynamic replanning inside Gazebo simulation environments."
    ]
  },
  {
    id: "sih-smart-traffic",
    title: "Smart Traffic Management System (SIH25050)",
    subtitle: "Real-Time Computer Vision Adaptive Signal Controller for Smart India Hackathon",
    category: "ai-vision",
    featured: false,
    date: "Nov 2025",
    stack: ["Python", "YOLOv8", "OpenCV", "FastAPI", "Edge Computing"],
    stats: [
      { label: "Latency", value: "<30 ms" },
      { label: "Model", value: "YOLO Vehicle Detection" }
    ],
    githubUrl: "https://github.com/Arkz-Deepak",
    caseStudySlug: "/projects/sih",
    media: {
      type: "image",
      url: "/urban-traffic.jpg",
      aspectRatio: "16:9"
    },
    summary: "Built a vision-based adaptive traffic signal controller utilizing YOLO object detection to dynamically calculate vehicular queue density across multi-lane intersections and modulate green-light intervals.",
    highlights: [
      "Reduced simulated intersection idling delay by over 35% compared to static fixed-timer intervals.",
      "Optimized inference pipeline for low-power edge compute deployment with OpenCV hardware acceleration."
    ]
  },
  {
    id: "hybrid-ai-compliance-bot",
    title: "Hybrid AI Scholarship Policy Engine",
    subtitle: "Automated Document Verification & Anomaly Detection (Build-a-Bot Hackathon)",
    category: "fullstack",
    featured: false,
    date: "Feb 2026",
    stack: ["Python", "Scikit-Learn", "Streamlit", "OCR", "NLP"],
    stats: [
      { label: "Hackathon", value: "CIT Build-a-Bot" },
      { label: "Engine", value: "Hybrid ML / Rule Engine" }
    ],
    githubUrl: "https://github.com/Arkz-Deepak",
    caseStudySlug: "/projects",
    media: {
      type: "image",
      url: "/urban-traffic.jpg",
      aspectRatio: "16:9"
    },
    summary: "Engineered an anomaly detection and policy verification bot designed to automate scholarship eligibility parsing, document fraud detection, and compliance auditing with an interactive Streamlit UI.",
    highlights: [
      "Implemented rule-based consistency validation alongside Scikit-Learn classification algorithms.",
      "Developed at Chennai Institute of Technology technical symposium hackathon."
    ]
  }
];
