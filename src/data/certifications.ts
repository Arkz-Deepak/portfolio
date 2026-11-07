export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  skillsCovered: string[];
}

export const certificationsData: CertificationItem[] = [
  {
    id: "abb-robotstudio-rapid",
    title: "Basics of Robotics & Simulation in RobotStudio",
    issuer: "ABB Robotics Training Team",
    issueDate: "Oct 2026",
    skillsCovered: [
      "ABB RobotStudio Simulation",
      "RAPID Programming (MoveJ, MoveL, MoveC)",
      "Tool Center Point (TCP) Calibration",
      "WorkObject & ToolData Coordinate Systems",
      "Industrial Workcell Cycle Optimization"
    ]
  },
  {
    id: "ros2-industrial",
    title: "ROS 2 Industrial Program (20-Day Intensive)",
    issuer: "Karthikesh Robotics Private Limited",
    issueDate: "Aug 2026",
    skillsCovered: ["ROS 2 Jazzy", "Nav2 Autonomous Stacks", "Gazebo Simulations", "SLAM", "URDF Robot Modeling"]
  },
  {
    id: "ibm-python-ml",
    title: "Advanced Python & Machine Learning Track",
    issuer: "IBM SkillsBuild",
    issueDate: "Aug 2026",
    skillsCovered: ["Python", "Scikit-Learn", "Machine Learning Algorithms", "Data Preprocessing"]
  },
  {
    id: "construct-linux",
    title: "Linux Basics for Robotics",
    issuer: "The Construct Robotics Institute",
    issueDate: "Dec 2025",
    skillsCovered: ["Ubuntu Linux", "Bash Scripting", "Real Hardware Presentation", "Process Management"]
  },
  {
    id: "ibm-ai-fund",
    title: "AI Fundamentals",
    issuer: "IBM SkillsBuild",
    issueDate: "Aug 2025",
    skillsCovered: ["Artificial Intelligence Concepts", "Neural Networks", "Ethics in AI"]
  }
];
