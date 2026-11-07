export interface ProfileData {
  name: string;
  legalName: string;
  tagline: string;
  location: string;
  email: string;
  cgpa: string;
  degree: string;
  institution: string;
  affiliation: string;
  graduationYear: string;
  avatarUrl: string;
  driveAvatarUrl: string;
  resumeUrl: string;
  resumeViewUrl: string;
  socials: {
    github: string;
    linkedin: string;
    portfolio: string;
    orcid?: string;
    openreview?: string;
    huggingface?: string;
  };
  honors?: string[];
  bioSummary: string;
}

export const profileData: ProfileData = {
  name: "Deepak R",
  legalName: "Deepak Rajender",
  tagline: "Robotics & Automation Engineering Student | Physical AI, Embodied Robotics (MuJoCo/LeRobot), Neuro-Symbolic Graph Slicing & ROS 2 Jazzy",
  location: "Chennai, Tamil Nadu, India",
  email: "deepak121289@outlook.com",
  cgpa: "9.2 / 10.0",
  degree: "Bachelor of Engineering (B.E.) in Robotics and Automation",
  institution: "Dhaanish Ahmed College of Engineering",
  affiliation: "Anna University",
  graduationYear: "2024 – 2028",
  avatarUrl: "/deepak.png",
  driveAvatarUrl: "https://lh3.googleusercontent.com/d/1t6hQ1fs7cHKKlhqdNVc4k9VxU5aJFZ51",
  resumeUrl: "https://docs.google.com/document/d/1PqoCoVizRO3i-Ws3H4bdJa-0T9DamFOIF7KMSuFDnXM/export?format=pdf",
  resumeViewUrl: "https://docs.google.com/document/d/1DW0Ua1k6mZE0o88sl-J6GOJIQ1RZGmMz1MLBC5SLuX0/edit?usp=drivesdk",
  socials: {
    github: "https://github.com/Arkz-Deepak",
    linkedin: "https://www.linkedin.com/in/robotics-deepak/",
    portfolio: "https://www.deepak-arkz.me",
    orcid: "https://orcid.org/0009-0000-2500-9093",
    openreview: "https://openreview.net/profile?id=~Deepak_R2",
    huggingface: "https://huggingface.co/Arkz121"
  },
  honors: [
    "Top Finalist — Build 2026 × ByteAsk Open Source Challenge (Oct 2026)",
    "Technical Interviewee — Google Summer 2027 Data Center Technician (DCT) Intern Track",
    "Selected Interviewee — IIT Mandi CAIR Project RAHAT (Trauma Robotics)",
    "Finalist — HackNIMA 2026 International Hackathon (AutoTwin-AI)",
    "Team Lead — Smart India Hackathon 2026 (Problem Statement SIH26226)"
  ],
  bioSummary: "Research-oriented Robotics & Automation engineering student and open-source systems builder. Author of the NeuroCode neuro-symbolic graph framework (published on PyPI: neurocode-ai), Kaggle Top 100 competitor (Rank #72), and ARC Prize 2026 contender. Specializes in Embodied Physical AI (VGA manipulation policies in MuJoCo/LeRobot), real-time ROS 2 Jazzy & MoveIt 2 motion planning, and edge-constrained neural synthesis."
};
