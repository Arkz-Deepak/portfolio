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
  gallery?: {
    title: string;
    type: 'video' | 'image';
    url: string;
    poster?: string;
    caption?: string;
  }[];
  summary: string;
  highlights: string[];
  architectureMermaid?: string;
}

export const projectsData: ProjectItem[] = [
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
    caseStudySlug: "/projects/vga-manipulation",
    media: {
      type: "video",
      url: "/videos/vga-mujoco-pickplace.mp4",
      poster: "/images/projects/vga-manipulation-preview.png",
      aspectRatio: "16:9"
    },
    gallery: [
      {
        title: "Task 0: Multi-Variant Rollout Matrix",
        type: "video",
        url: "/videos/vga-libero-t0-multitile.mp4",
        caption: "Side-by-side rollout matrix on LIBERO-Spatial Task 0 comparing Baseline, +Depth, +Rays, +Smooth Chunk Joins, All Three, and SmolVLA-450M."
      },
      {
        title: "Task 4: Articulated Spatial Insertion",
        type: "video",
        url: "/videos/vga-libero-t4-multitile.mp4",
        caption: "Multi-variant policy comparison on Task 4 demonstrating smooth chunk joins preventing chunk-boundary jerking."
      },
      {
        title: "Task 6: Precision Push & Alignment",
        type: "video",
        url: "/videos/vga-libero-t6-multitile.mp4",
        caption: "Task 6 rollout matrix showing wrist-camera tracking and trajectory stability."
      },
      {
        title: "Task 9: Complex Manipulation Sequence",
        type: "video",
        url: "/videos/vga-libero-t9-multitile.mp4",
        caption: "Task 9 multi-policy rollouts verifying autonomous task completion across 16-step action horizons."
      },
      {
        title: "SmolVLA Comparative Benchmark",
        type: "video",
        url: "/videos/vga-vs-smolvla-comparison.mp4",
        caption: "Direct head-to-head execution showing 89.1% jerk reduction and 8.7x faster control frequency compared to SmolVLA."
      },
      {
        title: "Workstation Telemetry Screencast",
        type: "video",
        url: "/videos/vga-live-simulation-screencast.webm",
        caption: "Workstation screencast showing live MuJoCo physics simulation, 4.6ms inference telemetry, and GPU resource footprint."
      }
    ],
    summary: "Engineered an embodied AI manipulation policy under a strict <=0.5B parameter budget capable of hard real-time execution in closed-loop MuJoCo physics. Employs frozen SigLIP-B/16 vision tokens and SmolLM2 language representations integrated via CentroidRayRoPE into a 12-layer Action Diffusion Transformer (DiT) with Flow Matching. Physics-guided finite-difference kinematic loss annealing eliminates joint vibration and motor chatter, culminating in autonomous physical pick-and-place task completion at Step 118 on LIBERO-Spatial.",
    highlights: [
      "Operates at 154–215 Hz control rate (4.64–6.46 ms latency), beating baseline SmolVLA-450M by 8.7x.",
      "Achieved 89.1% trajectory jerk reduction via finite-difference acceleration/jerk loss constraints.",
      "Smooth chunk joins cut chunk-boundary jumps from 2.88x to 1.05x normal step.",
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
    title: "AutoTwin-AI: Automotive Chassis Digital Twin & Structural Defect Detection",
    subtitle: "Sim-to-Real Inspection Platform for Vehicle Ladder-Frame Chassis Assemblies (PyTorch & Blender Cycles)",
    category: "ai-vision",
    featured: true,
    date: "Sep 2026",
    stack: [
      "PyTorch",
      "Convolutional Autoencoders",
      "Blender Cycles OptiX",
      "FastAPI",
      "React Three Fiber",
      "Three.js",
      "Docker"
    ],
    stats: [
      { label: "Dataset Pipeline", value: "5,000+ OptiX Renders" },
      { label: "CAD Vertices", value: "361,174 Spatial Voxels" },
      { label: "Anomaly Head", value: "|I - Î| Error Heatmap" },
      { label: "3D Visualization", value: "WebGL Digital Twin HUD" }
    ],
    githubUrl: "https://github.com/Arkz-Deepak/AutoTwin-AI",
    docsUrl: "https://lab.deepak-arkz.me/AutoTwin-AI/",
    jekyllTheme: "Jekyll",
    demoUrl: "https://docs.google.com/presentation/d/1sPcQ4e1_jjpj0JXypPtbesnlkwDpOdKaJvuFtlF2hcU/edit?usp=drivesdk&ouid=104707271718142286385",
    paperUrl: "https://docs.google.com/document/d/1AuqkxuTheMNYmw5k6l56dOAPQ29gaJuoj3zMCOB1v1M/edit?usp=drivesdk&ouid=104707271718142286385",
    caseStudySlug: "/projects/autotwin-ai",
    media: {
      type: "image",
      url: "/images/projects/autotwin-reconstruction-analysis.png",
      aspectRatio: "16:9"
    },
    gallery: [
      {
        title: "Chassis Top-Down Orthographic View",
        type: "image",
        url: "/images/projects/autotwin-chassis-top-view.png",
        caption: "Orthographic top-down render of vehicle ladder-frame chassis generated in Blender Cycles."
      },
      {
        title: "Autoencoder Reconstruction & Anomaly Heatmap",
        type: "image",
        url: "/images/projects/autotwin-reconstruction-analysis.png",
        caption: "PyTorch autoencoder reconstruction residual isolating weld slag, spatter, and porosity."
      }
    ],
    summary: "Engineered an end-to-end AI-powered digital twin and visual inspection platform specifically for vehicle structural ladder-frame chassis assemblies. Combines high-throughput GPU synthetic data generation in Blender Cycles (OptiX engine, 5,000+ baseline renders) with physics-informed domain randomization, 3D spatial voxel clustering isolating load-bearing junctions from 361,174 CAD vertices, and deep convolutional autoencoders for microscopic weld defect and structural crack detection with absolute pixel reconstruction error heatmaps (|I - Î|), linked to an interactive React + Three.js 3D WebGL dashboard.",
    highlights: [
      "Trained PyTorch Convolutional Autoencoders detecting weld slag, spatter bursts, and porosity via |I - Î| pixel residual error maps.",
      "High-density 3D spatial voxel clustering isolates critical load-bearing suspension junctions from 361,174 CAD vertices.",
      "Synthesized 5,000+ domain-randomized training images with procedural lighting, camera framing, and material roughness in Blender Cycles.",
      "Deployed an interactive React Three Fiber 3D digital twin cockpit providing live telemetry and joint anomaly locator."
    ],
    architectureMermaid: `graph LR
      CAD["Chassis CAD (361,174 Vertices)"] --> Blender["Blender Cycles OptiX (5,000+ Synthetic Renders)"]
      Blender --> CAE["PyTorch Convolutional Autoencoder"]
      CAE --> Heatmap["Residual Error Heatmap (|I - Î|)"]
      Heatmap --> Dashboard["React + Three.js 3D Digital Twin HUD"]`
  },
  {
    id: "weldguard-ai",
    title: "WeldGuard-AI: In-Situ Universal Robotic Welding Surveillance",
    subtitle: "Edge Deep Learning Surveillance & Automated Industrial Defect Mitigation Platform",
    category: "ai-vision",
    featured: true,
    date: "Oct 2026",
    stack: [
      "PyTorch",
      "ConvLSTM",
      "OpenCV",
      "FastAPI",
      "GMAW Arc Process",
      "CUDA",
      "Geometric Ellipse Fitting"
    ],
    stats: [
      { label: "Glare Exclusion", value: "T_0 Ambient Mask" },
      { label: "Inference Speedup", value: "13.6x Adaptive ROI" },
      { label: "Pool Geometry", value: "WPGM Ellipse Fitting" },
      { label: "Safety Trip", value: "Zero-Flapping E-STOP" }
    ],
    githubUrl: "https://github.com/Arkz-Deepak/WeldGuard-AI",
    caseStudySlug: "/projects",
    media: {
      type: "image",
      url: "/images/projects/weldguard-training-loss.png",
      aspectRatio: "16:9"
    },
    summary: "A deep learning and computer vision system engineered for in-situ factory surveillance, robotic welding quality assurance, and automated defect mitigation. Operates at low latency on edge GPUs to detect defects, eliminate false glare alarms, and execute automated emergency stops (E-STOP) when cumulative defect stressors breach safety bounds. Features T_0 environment baseline lighting calibration, standby torch tip tracking with 400x400 adaptive ROI yielding a 13.6x inference speedup, and Weld Pool Geometry Monitoring (WPGM) via real-time geometric ellipse fitting.",
    highlights: [
      "T_0 Ambient Calibration: Excludes shop skylights and reflective steel reflections (17,500+ px) using an ambient illumination map and dilated glare exclusion mask.",
      "Adaptive ROI Tracking: 250x250 standby tip tracking smoothly zooms to 400x400 welding mode, yielding a 13.6x edge speedup by evaluating only 7.7% of full-frame pixels.",
      "Weld Pool Geometry Monitoring (WPGM): Real-time geometric ellipse fitting flags burn-through, lack of fusion, and humping bead (aspect ratio L/W > 2.8).",
      "Zero-Flapping E-STOP: Cumulative defect stressor accumulator and hysteresis-based line-trip engine preventing industrial alert flapping."
    ],
    architectureMermaid: `graph LR
      Camera["Factory Camera Stream"] --> Calib["T_0 Ambient Glare Exclusion Mask"]
      Calib --> ROI["Adaptive Torch-Tip ROI (400x400 px, 13.6x Speedup)"]
      ROI --> WPGM["Weld Pool Geometry Monitoring (Ellipse Fitting)"]
      WPGM --> ConvLSTM["PyTorch ConvLSTM Defect Head"]
      ConvLSTM --> ESTOP["Zero-Flapping Industrial Safety E-STOP Trip"]`
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
