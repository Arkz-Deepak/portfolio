export interface SkillCategory {
  category: string;
  description: string;
  skills: { name: string; level: 'Expert' | 'Advanced' | 'Proficient'; icon?: string }[];
}

export const skillsData: SkillCategory[] = [
  {
    category: "Robotics & Simulation Middleware",
    description: "Autonomous navigation, kinematic solvers, physical manipulation, and simulation environments",
    skills: [
      { name: "ROS 2 (Jazzy)", level: "Advanced" },
      { name: "MoveIt 2 & OMPL Kinematics", level: "Advanced" },
      { name: "MuJoCo Physics Simulation", level: "Advanced" },
      { name: "LeRobot Embodied Manipulation", level: "Advanced" },
      { name: "Vision-Language-Action (VLA) Frameworks", level: "Advanced" },
      { name: "Robot Path Planning & Sampling (RRT, RRT*, PRM, A*)", level: "Advanced" },
      { name: "LIBERO Robotics Manipulation Benchmark", level: "Advanced" },
      { name: "ABB RobotStudio & RAPID Programming", level: "Proficient" },
      { name: "Industrial Manipulator TCP Calibration", level: "Proficient" },
      { name: "SUMO & TraCI Microscopic Traffic", level: "Advanced" },
      { name: "Nav2 Navigation Stack", level: "Advanced" },
      { name: "SLAM Toolbox", level: "Advanced" },
      { name: "Gazebo / Ignition", level: "Advanced" },
      { name: "URDF / Xacro Modeling", level: "Advanced" },
      { name: "Coverage Path Planning (BCD)", level: "Advanced" }
    ]
  },
  {
    category: "AI, Vision & Machine Learning",
    description: "Deep learning models, diffusion transformers, neuro-symbolic slicing, and vision pipelines",
    skills: [
      { name: "Diffusion Transformers (DiT) & Flow Matching", level: "Advanced" },
      { name: "Embodied AI & LeRobot Framework", level: "Advanced" },
      { name: "CentroidRayRoPE Geometric Embeddings", level: "Advanced" },
      { name: "On-Device Multimodal LLMs", level: "Proficient" },
      { name: "Neuro-Symbolic Heterogeneous Slicing", level: "Expert" },
      { name: "Model Context Protocol (MCP)", level: "Expert" },
      { name: "Tree-sitter Code Property Graphs (CPG)", level: "Expert" },
      { name: "Dual 14B LoRA Fine-Tuning & Quantization", level: "Advanced" },
      { name: "Semi-Markov Decision Processes (SMDP / TraCI)", level: "Advanced" },
      { name: "ConvLSTM / Spatiotemporal Modeling", level: "Advanced" },
      { name: "TimeDistributed CNNs", level: "Advanced" },
      { name: "TFLite & ONNX Runtime", level: "Advanced" },
      { name: "PyTorch & Autoencoders", level: "Advanced" },
      { name: "TensorFlow / Keras", level: "Proficient" },
      { name: "OpenCV", level: "Advanced" },
      { name: "YOLO (v8 / v11)", level: "Advanced" },
      { name: "MediaPipe", level: "Advanced" },
      { name: "Multi-Agent Reinforcement Learning", level: "Advanced" },
      { name: "Scikit-Learn", level: "Advanced" },
      { name: "Blender OptiX Ray-Tracing", level: "Advanced" }
    ]
  },
  {
    category: "Embedded Systems & Hardware",
    description: "Real-time microcontrollers, motor drivers, and industrial automation",
    skills: [
      { name: "STM32 Microcontrollers", level: "Advanced" },
      { name: "ESP-NOW & LoRa Mesh OTA", level: "Advanced" },
      { name: "Raspberry Pi 4", level: "Advanced" },
      { name: "ESP32 / ESP8266 (FreeRTOS)", level: "Advanced" },
      { name: "BTS7960 43A Motor Drivers", level: "Advanced" },
      { name: "Arduino Microcontrollers", level: "Advanced" },
      { name: "8051 Microcontroller Architecture", level: "Proficient" },
      { name: "OpenPLC (Ladder Logic)", level: "Proficient" },
      { name: "Time-of-Flight (ToF) / LiDAR / IMU Telemetry", level: "Advanced" }
    ]
  },
  {
    category: "Software Engineering & Full-Stack",
    description: "Programming languages, backends, compilers, and development infrastructure",
    skills: [
      { name: "Python", level: "Expert" },
      { name: "C++", level: "Advanced" },
      { name: "C", level: "Advanced" },
      { name: "Flex & Bison (Lexer/Parser Architecture)", level: "Advanced" },
      { name: "Rust", level: "Proficient" },
      { name: "ROS 2 CI/CD (GitHub Actions)", level: "Advanced" },
      { name: "PyPI Package Authoring (neurocode-ai)", level: "Advanced" },
      { name: "Decentralized Mesh Protocols", level: "Proficient" },
      { name: "FastAPI / Node.js", level: "Advanced" },
      { name: "Three.js / WebGL", level: "Proficient" },
      { name: "Linux (Ubuntu 24.04 / WSL2)", level: "Expert" },
      { name: "Docker & Containerization", level: "Advanced" },
      { name: "Git / GitHub Version Control", level: "Advanced" },
      { name: "Autodesk Fusion 360 / SolidWorks", level: "Proficient" },
      { name: "MATLAB / Simulink", level: "Proficient" }
    ]
  }
];
