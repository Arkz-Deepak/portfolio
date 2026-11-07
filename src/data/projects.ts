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
  docsUrl?: string;
  jekyllTheme?: string;
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
    id: "sih-space-debris-cleaner",
    title: "Orbital ADR: Autonomous Space Debris Cleaning Robot",
    subtitle: "Active Debris Removal (ADR) & Orbital Logistics Platform (Smart India Hackathon 2026 — PS SIH26226)",
    category: "robotics",
    featured: true,
    date: "Sep 2026",
    competition: "Smart India Hackathon 2026 (Hardware Edition | Space Technology Theme)",
    stack: [
      "ROS 2",
      "NVIDIA Jetson Nano",
      "STM32 Microcontroller",
      "SpaceYOLO",
      "OpenCV",
      "Autodesk Fusion 360",
      "Electroadhesion",
      "Three.js",
      "FastAPI"
    ],
    stats: [
      { label: "Challenge", value: "SIH 2026 (Space Tech)" },
      { label: "Team", value: "ARKZ (Lead: Deepak R)" },
      { label: "Capture Mechanism", value: "Electroadhesive + 4-Piston CS" },
      { label: "Mission Telemetry", value: "Three.js WebGL Live HUD" }
    ],
    cadUrl: "https://a360.co/3V6CWF7",
    githubUrl: "https://github.com/Arkz-Deepak/sih2026-isro-space-tech",
    docsUrl: "https://lab.deepak-arkz.me/sih2026-isro-space-tech/",
    jekyllTheme: "Architect",
    demoUrl: "http://sih-space-tech.deepak-arkz.me/",
    caseStudySlug: "/projects/space-debris-cleaner",
    media: {
      type: "image",
      url: "/images/projects/sih-space-debris-preview.png",
      aspectRatio: "16:9"
    },
    summary: "Engineered an autonomous Active Debris Removal (ADR) spacecraft architecture designed for Low Earth Orbit (LEO) debris remediation under SIH Problem Statement SIH26226. Combines a custom octagonal CAD bus with a 4-piston mechanical Compression System to dampen docking kinetics, alongside an electroadhesive capture plate capable of gripping non-conductive, irregular space debris. Uses a segregated dual-compute architecture: NVIDIA Jetson Nano running ROS 2 and SpaceYOLO for non-cooperative tumbling target pose estimation, linked to an STM32 MCU for microsecond cold-gas thruster firings, backed by a live Three.js orbital mission control interface.",
    highlights: [
      "Designed 3-phase orbital flight plan: autonomous chaser rendezvous, mothership deployable deorbit braking modules, and reusable orbital tug logistics.",
      "Bypassed traditional magnetic grapple limitations using high-voltage electroadhesion to adhere to carbon fiber, composite casings, and glass.",
      "Deployed an interactive WebGL mission control simulator providing real-time 3D telemetry and docking trajectory visualization."
    ],
    architectureMermaid: `graph LR
      Sensors["Stereo Vision + SpaceYOLO (Jetson Nano)"] -->|Pose Estimation| ROS2["ROS 2 Guidance & Rendezvous Stack"]
      ROS2 -->|UART Actuation Commands| STM32["STM32 Real-Time Controller"]
      STM32 --> Thrusters["Cold-Gas Reaction Control Thrusters"]
      STM32 --> CS["4-Piston Kinetic Damping System"]
      CS --> Capture["Electroadhesive Capture Plate"]
      ROS2 -->|Telemetry Stream| Telemetry["Three.js Live Mission Control WebGL"]`
  },
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
    id: "vga-robotic-manipulation",
    title: "VGA Policy: Vision-Geometry-Action Robotic Manipulation",
    subtitle: "Hard Real-Time Embodied AI Policy with Kinematic Jerk Suppression (LIBERO-Spatial & RoboCasa)",
    category: "robotics",
    featured: true,
    date: "Oct 2026",
    competition: "Embodied AI / LIBERO-Spatial Benchmark",
    stack: [
      "PyTorch",
      "LeRobot",
      "MuJoCo",
      "SigLIP",
      "SmolLM2",
      "Flow Matching DiT",
      "CentroidRayRoPE"
    ],
    stats: [
      { label: "Parameter Footprint", value: "298.3M (36.3M Head)" },
      { label: "Control Frequency", value: "154–215 Hz (4.6ms)" },
      { label: "Jerk Reduction", value: "89.1% Annealed" },
      { label: "Physical Status", value: "Closed-Loop Success" }
    ],
    githubUrl: "https://github.com/Arkz-Deepak/vga-poc",
    media: {
      type: "image",
      url: "/images/projects/vga-manipulation-preview.png",
      aspectRatio: "16:9"
    },
    summary: "Engineered an embodied AI manipulation policy under a strict <=0.5B parameter budget capable of hard real-time execution in closed-loop MuJoCo physics. Employs frozen SigLIP-B/16 vision tokens and SmolLM2 language representations integrated via CentroidRayRoPE into a 12-layer Action Diffusion Transformer (DiT) with Flow Matching. Physics-guided finite-difference kinematic loss annealing eliminates joint vibration and motor chatter, culminating in autonomous physical pick-and-place task completion at Step 118 on LIBERO-Spatial.",
    highlights: [
      "Operates at 154–215 Hz control rate (4.64–6.46 ms latency), beating baseline SmolVLA-450M by 8.7x.",
      "Achieved 89.1% trajectory jerk reduction via finite-difference acceleration/jerk loss constraints.",
      "Demonstrated full closed-loop pick-and-place success in MuJoCo simulation from few-shot demonstrations."
    ],
    architectureMermaid: `graph LR
      RGB["Camera RGB (256x256)"] --> SigLIP["SigLIP-B/16 (Frozen)"]
      Task["Task Language Prompt"] --> SmolLM["SmolLM2-135M (Frozen)"]
      SigLIP --> CrossAttn["Cross-Attention + RayRoPE"]
      SmolLM --> CrossAttn
      CrossAttn --> DiT["12-Layer Action DiT (36.3M Trainable)"]
      Noise["Gaussian Noise"] --> DiT
      DiT --> FlowMatching["Flow Matching (NFE=4)"]
      FlowMatching --> Actions["16-Step Chunk Actions"]`
  },
  {
    id: "neurocode-ai",
    title: "NeuroCode: On-Device Code-Graph Slicing Framework",
    subtitle: "Heterogeneous Neuro-Symbolic Model Context Protocol (MCP) Server for Local LLM Repository Repair",
    category: "fullstack",
    featured: true,
    date: "Nov 2026",
    stack: [
      "Python",
      "Model Context Protocol (MCP)",
      "Tree-sitter",
      "NetworkX",
      "PyTorch",
      "SWE-bench",
      "Ollama"
    ],
    stats: [
      { label: "PyPI Package", value: "neurocode-ai" },
      { label: "Hardware Verified", value: "4GB Laptop GPU" },
      { label: "SWE-bench Lite", value: "41.4% Valid / 0 OOMs" },
      { label: "RepoBench-R", value: "100% Recall @ 428 Tokens" }
    ],
    githubUrl: "https://github.com/Arkz-Deepak",
    demoUrl: "https://pypi.org/project/neurocode-ai/",
    media: {
      type: "image",
      url: "/images/projects/neurocode-architecture.png",
      aspectRatio: "16:9"
    },
    summary: "Authored and published neurocode-ai on PyPI with a Model Context Protocol (MCP) server that enables local small language models (1.5B–14B) to solve multi-file repository software engineering bugs on consumer laptops (4GB VRAM) without cloud API dependency or Out-of-Memory (OOM) crashes. Divides cognitive labor across the PC hardware boundary: deterministic host CPU graph engine constructs topological Code Property Graphs (CPG) with 0/1 knapsack budget optimization, while the device GPU executes bounded neural patch generation.",
    highlights: [
      "Eliminated GPU OOM cliff failure on everyday 4GB VRAM laptop GPUs (961MB active peak VRAM) across SWE-bench Lite.",
      "Achieved 100% recall on RepoBench-R cross-file retrieval with a 42.6% token reduction over dense vector retrieval.",
      "Published as open-source Python library on PyPI (neurocode-ai) with native Claude Desktop/Ollama MCP integration."
    ],
    architectureMermaid: `graph LR
      Repo["Target Codebase"] --> TreeSitter["Host CPU: Tree-sitter + NetworkX"]
      TreeSitter --> CPG["Code Property Graph (CPG)"]
      CPG --> Knapsack["0/1 Knapsack Bounded Token Slicer"]
      Knapsack -->|Bounded Subtrees (B <= 1200 Tokens)| GPU["Device GPU: Local LLM Synthesis"]
      GPU --> Diff["SEARCH/REPLACE Diffs"]
      Diff --> Patch["Deterministic Patch Verification"]`
  },
  {
    id: "project-tara",
    title: "Project TARA: Embodied Multimodal Assistive Robot",
    subtitle: "Modular Architecture for Autonomous Nav2 Mobility, On-Device LLM Reasoning & Telemetry",
    category: "robotics",
    featured: true,
    date: "Oct 2026",
    stack: [
      "ROS 2 Jazzy",
      "Nav2 Stack",
      "SLAM Toolbox",
      "Edge Multimodal LLMs",
      "Embedded Hardware Controllers",
      "Next.js Touch HUD",
      "Python / C++"
    ],
    stats: [
      { label: "Architecture", value: "Modular Quad-Subsystem" },
      { label: "Navigation", value: "Autonomous ROS 2 Nav2" },
      { label: "Reasoning", value: "On-Device Multimodal LLM" },
      { label: "Interface", value: "Interactive Touch Telemetry" }
    ],
    githubUrl: "https://github.com/Arkz-Deepak",
    caseStudySlug: "/projects/project-tara",
    media: {
      type: "image",
      url: "/images/projects/project-tara-preview.png",
      aspectRatio: "16:9"
    },
    summary: "Architected a modular embodied assistive robotics platform partitioning complex service tasks into four decoupled subsystems: autonomous Nav2 lidar mobility, on-device multimodal language model reasoning for real-time spatial instruction parsing, deterministic low-level actuator and sensor controllers, and an interactive telemetry display HUD.",
    highlights: [
      "Modularized software into four isolated layers: Navigation, LLM Reasoning, Hardware Components, and Display HUD.",
      "Engineered autonomous room mapping and dynamic obstacle avoidance utilizing ROS 2 Jazzy and SLAM Toolbox.",
      "Integrated local edge model command execution to parse natural user instructions directly into discrete waypoint goals."
    ],
    architectureMermaid: `graph TD
      User["User Natural Language / Touch Input"] --> Display["Display & UI Layer (Interactive HUD)"]
      User --> LLM["LLM Reasoning Subsystem (On-Device Model)"]
      LLM --> Nav["Navigation Subsystem (ROS 2 Jazzy & Nav2)"]
      Nav --> Hardware["Component & Actuation Subsystem (Motor Drivers & Sensors)"]
      Hardware --> Telemetry["Real-time Telemetry Feedback"]
      Telemetry --> Display`
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
    subtitle: "In-Situ Predictive Robotic Weld Monitoring & 3D Digital Twin (HackNIMA 2026 Finalist — Presented Sep 26, 2026)",
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
    githubUrl: "https://github.com/Arkz-Deepak/AutoTwin-AI",
    docsUrl: "https://lab.deepak-arkz.me/AutoTwin-AI/",
    jekyllTheme: "Jekyll",
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
      "Presented live to the international jury panel during the HackNIMA 2026 Final Round on September 26, 2026.",
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
    docsUrl: "https://lab.deepak-arkz.me/oomwoo-clean-and-map-arkz/",
    jekyllTheme: "Slate",
    caseStudySlug: "/projects",
    media: {
      type: "image",
      url: "/urban-traffic.jpg",
      aspectRatio: "16:9"
    },
    summary: "Authored core open-source coverage planning modules for the OOMWOO autonomous vacuum robot (oomwoo_clean_and_map). Implemented Boustrophedon Cellular Decomposition (BCD) for complete workspace coverage and integrated SLAM Toolbox for online map generation and localization under ROS 2 Jazzy.",
    highlights: [
      "Integrated Nav2 costmap layers and custom path generation nodes for obstacle-dense room navigation.",
      "Validated complete coverage trajectories and dynamic replanning inside Gazebo simulation environments.",
      "Published automated engineering documentation using Jekyll Slate theme under lab.deepak-arkz.me."
    ]
  },
  {
    id: "sih-smart-traffic",
    title: "AURA / Smart Traffic Management System (SIH25050)",
    subtitle: "Semi-Markov Decision Process (SMDP) RL & Rolling Emergency Vehicle Preemption ( TraCI / SUMO )",
    category: "ai-vision",
    featured: false,
    date: "Aug 2026 – Nov 2026",
    stack: ["PyTorch", "SUMO / TraCI", "YOLOv8", "FastAPI", "React", "Node.js DDS"],
    stats: [
      { label: "Algorithm", value: "SMDP Deep Q-Network" },
      { label: "Preemption", value: "Rolling EVP Green-Wave" },
      { label: "Benchmark", value: "177-TLS Manhattan Map" },
      { label: "Preprint DOI", value: "10.5281/zenodo.20265628" }
    ],
    githubUrl: "https://github.com/Arkz-Deepak/Traffic-Management-System",
    docsUrl: "https://lab.deepak-arkz.me/Traffic-Management-System/",
    jekyllTheme: "Jekyll",
    caseStudySlug: "/projects/sih",
    media: {
      type: "image",
      url: "/images/projects/aura-manhattan-preview.png",
      aspectRatio: "16:9"
    },
    summary: "Evolved the SIH smart traffic architecture into AURA (Adaptive Urban Routing and Actuation), integrating a Semi-Markov Decision Process (SMDP) DQN with rolling emergency vehicle preemption (EVP) and post-preemption shockwave mitigation. Validated across TraCI microscopic simulations on both a 10-node grid and a 177-intersection Midtown Manhattan network, backed by a full IEEE conference paper and live dual-mode tactical dashboard.",
    highlights: [
      "Replaced fixed-time controllers with an SMDP DQN enforcing statutory clearance and queue-adaptive green limits.",
      "Engineered rolling emergency vehicle preemption with shockwave mitigation to restore starved cross-arterials.",
      "Indexed under Zenodo DOI 10.5281/zenodo.20265628 with automated documentation on lab.deepak-arkz.me."
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
    docsUrl: "https://lab.deepak-arkz.me/Scholarship-Policy-Compliance-Bot/",
    jekyllTheme: "Jekyll",
    caseStudySlug: "/projects",
    media: {
      type: "image",
      url: "/urban-traffic.jpg",
      aspectRatio: "16:9"
    },
    summary: "Engineered an anomaly detection and policy verification bot designed to automate scholarship eligibility parsing, document fraud detection, and compliance auditing with an interactive Streamlit UI.",
    highlights: [
      "Implemented rule-based consistency validation alongside Scikit-Learn classification algorithms.",
      "Developed at Chennai Institute of Technology technical symposium hackathon.",
      "Automated specification deployment on lab.deepak-arkz.me."
    ]
  },
  {
    id: "ecocast-schneider-optimizer",
    title: "EcoCast AI: Schneider Electric Melter Optimizer",
    subtitle: "Dynamic Thermal & Energy Efficiency Optimization (Yuva Yodha Energy Tech Hackathon 2026)",
    category: "embedded",
    featured: false,
    date: "Sep 2026",
    competition: "Schneider Electric Energy Tech Hackathon (Yuva Yodha)",
    stack: ["Python", "PyTorch", "Energy Modeling", "Thermal Telemetry", "Industrial IoT"],
    stats: [
      { label: "Challenge", value: "Schneider Electric" },
      { label: "Documentation", value: "Slate Theme" },
      { label: "Domain", value: "Induction Melters" }
    ],
    githubUrl: "https://github.com/Arkz-Deepak/yuva-yodha-hackathon",
    docsUrl: "https://lab.deepak-arkz.me/yuva-yodha-hackathon/",
    jekyllTheme: "Slate",
    caseStudySlug: "/projects",
    media: {
      type: "image",
      url: "/urban-traffic.jpg",
      aspectRatio: "16:9"
    },
    summary: "Engineered an AI-driven energy and thermal scheduling engine for industrial induction melters. Models temperature ramp profiles and molten metal cooling curves to minimize electrical surge penalties and heat loss during batch cycles.",
    highlights: [
      "Designed predictive control algorithms for the Schneider Electric Yuva Yodha energy innovation track.",
      "Automated architecture and deployment specifications under Jekyll Slate theme at lab.deepak-arkz.me/yuva-yodha-hackathon."
    ]
  },
  {
    id: "twindeo-industrial-digital-twin",
    title: "Twindeo: Federated 3D Industrial Digital Twin",
    subtitle: "High-Concurrency WebSocket Telemetry & Three.js Multi-Robot WebGL Cockpit",
    category: "robotics",
    featured: false,
    date: "Aug 2026",
    stack: ["Three.js", "WebSockets", "ROS 2", "TypeScript", "FastAPI"],
    stats: [
      { label: "Visualization", value: "Three.js WebGL" },
      { label: "Documentation", value: "Slate Theme" }
    ],
    githubUrl: "https://github.com/Arkz-Deepak/twindeo",
    docsUrl: "https://lab.deepak-arkz.me/twindeo/",
    jekyllTheme: "Slate",
    caseStudySlug: "/projects",
    media: {
      type: "image",
      url: "/urban-traffic.jpg",
      aspectRatio: "16:9"
    },
    summary: "Built a federated digital twin engine streaming live 3D joint states, kinematics, and spatial heatmaps from multi-robot manufacturing workcells into a low-latency WebGL browser HUD.",
    highlights: [
      "Simulates real-time robot arm trajectories and mobile AMR costmaps in synchronized 3D space.",
      "Full API and protocol architecture documented on lab.deepak-arkz.me/twindeo with Jekyll Slate theme."
    ]
  },
  {
    id: "wheeled-robot-ros2",
    title: "4WD Autonomous Mobile Robot (Gazebo + FSM)",
    subtitle: "Differential-Drive Kinematics, URDF/Xacro Modeling & Behavior Finite State Machine",
    category: "robotics",
    featured: false,
    date: "Jul 2026",
    stack: ["ROS 2 Jazzy", "Gazebo Harmonic", "URDF/Xacro", "Python", "C++"],
    stats: [
      { label: "Chassis", value: "4WD Differential" },
      { label: "Documentation", value: "Cayman Theme" }
    ],
    githubUrl: "https://github.com/Arkz-Deepak/wheeled_robot_ros2",
    docsUrl: "https://lab.deepak-arkz.me/wheeled_robot_ros2/",
    jekyllTheme: "Cayman",
    caseStudySlug: "/projects",
    media: {
      type: "image",
      url: "/urban-traffic.jpg",
      aspectRatio: "16:9"
    },
    summary: "Engineered an open-source 4-wheel differential-drive autonomous rover package for ROS 2 Jazzy. Features custom URDF physical modeling, Gazebo friction plugins, and an autonomous behavior finite-state machine (FSM).",
    highlights: [
      "Constructed multi-link collision models and differential drive controllers for complex terrain navigation.",
      "Deployed automated architecture documentation using Jekyll Cayman theme at lab.deepak-arkz.me/wheeled_robot_ros2."
    ]
  },
  {
    id: "luminous-pdm-command-center",
    title: "Luminous Inverter PdM Command Center",
    subtitle: "Industrial Inverter Predictive Maintenance & Capacitor Health Indexing (BITS Pilani Hackathon)",
    category: "embedded",
    featured: false,
    date: "May 2026",
    stack: ["Python", "Time-Series ML", "FastAPI", "React", "Predictive Maintenance"],
    stats: [
      { label: "Platform", value: "BITS Pilani" },
      { label: "Documentation", value: "Cayman Theme" }
    ],
    githubUrl: "https://github.com/Arkz-Deepak/luminous-pdm-command-center",
    docsUrl: "https://lab.deepak-arkz.me/luminous-pdm-command-center/",
    jekyllTheme: "Cayman",
    caseStudySlug: "/projects",
    media: {
      type: "image",
      url: "/urban-traffic.jpg",
      aspectRatio: "16:9"
    },
    summary: "Telemetry command center monitoring capacitor degradation, thermal stress, and voltage harmonics across solar and industrial inverters to trigger automated maintenance before failure.",
    highlights: [
      "Engineered anomaly scoring routines for real-time sensor streams under the BITS Pilani innovation challenge.",
      "Documented schema and integration blueprints at lab.deepak-arkz.me/luminous-pdm-command-center."
    ]
  },
  {
    id: "odom-drift-monitor",
    title: "ROS 2 Real-Time Odometry Drift Monitor",
    subtitle: "High-Speed C++ Node for Wheel Slip Detection & Odometry Covariance Diagnostics",
    category: "robotics",
    featured: false,
    date: "Jun 2026",
    stack: ["ROS 2 Jazzy", "C++20", "Eigen3", "EKF Fusion", "Nav2 Diagnostics"],
    stats: [
      { label: "Language", value: "Modern C++20" },
      { label: "Documentation", value: "Jekyll Hub" }
    ],
    githubUrl: "https://github.com/Arkz-Deepak/odom_monitor",
    docsUrl: "https://lab.deepak-arkz.me/odom_monitor/",
    jekyllTheme: "Jekyll",
    caseStudySlug: "/projects",
    media: {
      type: "image",
      url: "/urban-traffic.jpg",
      aspectRatio: "16:9"
    },
    summary: "Zero-copy C++ node monitoring real-time discrepancies between wheel encoder odometry and IMU angular rate integration, broadcasting diagnostic alerts on ROS 2 /diagnostics before localization divergence occurs.",
    highlights: [
      "Critical safety watchdog for autonomous rovers operating on low-friction or loose terrain.",
      "Documented ROS 2 parameters and test vectors at lab.deepak-arkz.me/odom_monitor."
    ]
  }
];
