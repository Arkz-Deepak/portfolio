export interface SkillCategory {
  category: string;
  description: string;
  skills: { name: string; level: 'Expert' | 'Advanced' | 'Proficient'; icon?: string }[];
}

export const skillsData: SkillCategory[] = [
  {
    category: "Robotics & Simulation Middleware",
    description: "Autonomous navigation, kinematics, and spatial simulation environments",
    skills: [
      { name: "ROS 2 (Jazzy)", level: "Advanced" },
      { name: "Nav2 Navigation Stack", level: "Advanced" },
      { name: "SLAM Toolbox", level: "Advanced" },
      { name: "Gazebo / Ignition", level: "Advanced" },
      { name: "MoveIt 2", level: "Proficient" },
      { name: "URDF / Xacro Modeling", level: "Advanced" },
      { name: "Coverage Path Planning (BCD)", level: "Advanced" }
    ]
  },
  {
    category: "AI, Vision & Machine Learning",
    description: "Deep learning models, unsupervised anomaly detection, and vision pipelines",
    skills: [
      { name: "PyTorch & Autoencoders", level: "Advanced" },
      { name: "TensorFlow / Keras", level: "Proficient" },
      { name: "OpenCV", level: "Advanced" },
      { name: "YOLO (v8 / v11)", level: "Advanced" },
      { name: "MediaPipe", level: "Advanced" },
      { name: "Multi-Agent Reinforcement Learning", level: "Proficient" },
      { name: "Scikit-Learn", level: "Advanced" },
      { name: "Blender OptiX Ray-Tracing", level: "Advanced" }
    ]
  },
  {
    category: "Embedded Systems & Hardware",
    description: "Real-time microcontrollers, motor drivers, and industrial automation",
    skills: [
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
    description: "Programming languages, backends, and development infrastructure",
    skills: [
      { name: "Python", level: "Expert" },
      { name: "C++", level: "Advanced" },
      { name: "C", level: "Advanced" },
      { name: "Rust", level: "Proficient" },
      { name: "FastAPI / Node.js", level: "Advanced" },
      { name: "Three.js / WebGL", level: "Proficient" },
      { name: "Linux (Ubuntu 24.04 / WSL2)", level: "Advanced" },
      { name: "Docker & Containerization", level: "Advanced" },
      { name: "Git / GitHub Version Control", level: "Advanced" },
      { name: "Autodesk Fusion 360 / SolidWorks", level: "Proficient" },
      { name: "MATLAB / Simulink", level: "Proficient" }
    ]
  }
];
