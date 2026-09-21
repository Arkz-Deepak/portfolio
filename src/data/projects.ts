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
  cadUrl?: string;
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
    id: "edgevision-npu-profiler",
    title: "EdgeVision NPU Profiler",
    subtitle: "Bare-Metal On-Device Edge AI Evaluation Testbench (iQOO Hackathon 2026 Grand Finale)",
    category: "ai-vision",
    featured: true,
    date: "Sep 2026",
    stack: [
      "Snapdragon NPU",
      "Qualcomm Neural Processing SDK",
      "TensorFlow Lite",
      "ONNX Runtime",
      "React Native",
      "FastAPI",
      "TypeScript"
    ],
    stats: [
      { label: "Track", value: "Dev Tools / Edge AI" },
      { label: "Deployment", value: "Zero-ADB Cable" },
      { label: "Camera Loop", value: "30–60 FPS Zero-Copy" },
      { label: "Telemetry", value: "Real-time Latency & RAM" }
    ],
    githubUrl: "https://github.com/Arkz-Deepak",
    demoUrl: "https://docs.google.com/presentation/d/1wtzB97O7d21n2auHoZLjmvhmmsDoqVhJRXfHKcaKpe8/edit?usp=drivesdk&ouid=104707271718142286385",
    caseStudySlug: "/projects/edgevision",
    media: {
      type: "image",
      url: "/images/projects/edgevision-preview.png",
      aspectRatio: "16:9"
    },
    summary: "Eliminates the deployment bottleneck between desktop AI training and physical mobile/edge hardware. Turns commercial Snapdragon NPU smartphones into live bare-metal evaluation testbenches, executing custom .tflite and ONNX models directly on NPU tensor cores using native camera streams with real-time latency and memory telemetry streaming back to a desktop terminal.",
    highlights: [
      "Integrated a zero-cable wireless sync bridge to drag-and-drop compiled models directly from laptop to device.",
      "Bypassed CPU bottlenecks with a zero-copy native camera pipeline delivering 30–60 FPS video frames straight into the NPU buffer.",
      "Built a live telemetry stream monitoring true inference latency (ms), frame rate stability, and thermal limits."
    ],
    architectureMermaid: `graph LR
      Dev["Laptop Dev Environment (PyTorch / ONNX)"] -->|Wireless Office Kit Bridge| Phone["iQOO Flagship (Snapdragon NPU)"]
      Phone --> Runtime["TFLite / ONNX NPU Delegate"]
      Camera["Native Camera (30-60 FPS)"] -->|Zero-Copy Tensor Feed| Runtime
      Runtime --> Telemetry["Real-time Telemetry Engine (ms / FPS / RAM)"]
      Telemetry -->|Live WebSocket Stream| Dashboard["Developer Terminal Dashboard"]`
  },
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
    cadUrl: "https://a360.co/3TZt13C",
    githubUrl: "https://a360.co/3TZt13C",
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
    title: "AutoTwin-AI: Spatiotemporal ConvLSTM Welding Inspection",
    subtitle: "In-Situ Predictive Robotic Weld Monitoring & 3D Digital Twin (HackNIMA 2026 Round 2)",
    category: "ai-vision",
    featured: true,
    date: "Sep 2026",
    stack: [
      "PyTorch",
      "ConvLSTM2d",
      "TimeDistributed CNN",
      "LWIR Radiometric Thermography",
      "TensorRT",
      "FastAPI",
      "Three.js",
      "ROS 2"
    ],
    stats: [
      { label: "Architecture", value: "Spatiotemporal 5D Tensor" },
      { label: "Inference Latency", value: "<40 ms (TensorRT)" },
      { label: "Defect Isolation", value: "Next-Frame MSE Spike" },
      { label: "Sensing", value: "Eye-in-Hand TCP Thermal" }
    ],
    githubUrl: "https://github.com/Arkz-Deepak",
    demoUrl: "https://docs.google.com/presentation/d/1sPcQ4e1_jjpj0JXypPtbesnlkwDpOdKaJvuFtlF2hcU/edit?usp=drivesdk&ouid=104707271718142286385",
    paperUrl: "https://docs.google.com/document/d/1AuqkxuTheMNYmw5k6l56dOAPQ29gaJuoj3zMCOB1v1M/edit?usp=drivesdk&ouid=104707271718142286385",
    caseStudySlug: "/projects/autotwin-ai",
    media: {
      type: "image",
      url: "/images/projects/autotwin-convlstm-preview.png",
      aspectRatio: "16:9"
    },
    summary: "Upgraded AutoTwin-AI from static frame inspection to an in-situ spatiotemporal video deep learning framework for robotic arc welding cells. Ingests 30 FPS thermal video streams as 5D tensors (Batch, Time, Channels, Height, Width) from an end-effector mounted LWIR camera tracking the Tool Center Point (TCP). Uses TimeDistributed CNNs and ConvLSTM2d recurrent cells for unsupervised next-frame prediction; sudden Mean Squared Error (MSE) divergences detect subsurface voids, spatter bursts, and cooling rate anomalies in under 40ms, synchronized with a real-time Three.js 3D digital twin HUD.",
    highlights: [
      "Overcomes static 2D vision limitations by modeling continuous fluid-thermal weld pool dynamics across time.",
      "Engineered a sliding-window queue buffering 5D PyTorch tensors for real-time inference on NVIDIA TensorRT.",
      "Integrated telemetry pipelines computing active arc duration and spatter density index (S_dot) streamed via FastAPI to a 3D WebGL dashboard."
    ],
    architectureMermaid: `graph LR
      TCP["Eye-in-Hand LWIR Thermal Camera (30 FPS)"] -->|Sliding Buffer| Tensors["5D Tensors (B, T, C, H, W)"]
      Tensors --> TDCNN["TimeDistributed 2D CNN (Spatial Geometry)"]
      TDCNN --> ConvLSTM["ConvLSTM2d Recurrent Layers (Temporal Dynamics)"]
      ConvLSTM --> Pred["Next-Frame Prediction (t+1)"]
      Pred --> MSE["MSE Anomaly Head (<40ms TensorRT)"]
      MSE --> Dashboard["React 18 + Three.js 3D Digital Twin HUD"]`
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
    githubUrl: "https://github.com/Arkz-Deepak/oomwoo-clean-and-map-arkz",
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
    githubUrl: "https://github.com/Arkz-Deepak/Traffic-Management-System",
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
    githubUrl: "https://github.com/Arkz-Deepak/Scholarship-Policy-Compliance-Bot",
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
