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
  };
  bioSummary: string;
}

export const profileData: ProfileData = {
  name: "Deepak R",
  legalName: "Deepak Rajender",
  tagline: "Robotics & Automation Engineer | Physical AI, ROS 2 Jazzy, Autonomous Systems & Sim-to-Real Digital Twins",
  location: "Chennai, Tamil Nadu, India",
  email: "deepak121289@outlook.com",
  cgpa: "9.2 / 10.0",
  degree: "Bachelor of Engineering (B.E.) in Robotics and Automation",
  institution: "Dhaanish Ahmed College of Engineering",
  affiliation: "Anna University",
  graduationYear: "2024 – 2028",
  avatarUrl: "/deepak.png",
  driveAvatarUrl: "https://lh3.googleusercontent.com/d/1t6hQ1fs7cHKKlhqdNVc4k9VxU5aJFZ51",
  resumeUrl: "https://docs.google.com/document/d/1V8XjDHoHC8vaw_bTTNxZjhv8CYjbHddVax9KLsOTZk8/export?format=pdf",
  resumeViewUrl: "https://docs.google.com/document/d/1V8XjDHoHC8vaw_bTTNxZjhv8CYjbHddVax9KLsOTZk8/edit?usp=sharing",
  socials: {
    github: "https://github.com/Arkz-Deepak",
    linkedin: "https://www.linkedin.com/in/robotics-deepak/",
    portfolio: "https://www.deepak-arkz.me"
  },
  bioSummary: "Dedicated and research-oriented Robotics & Automation engineer specializing in Physical AI, ROS 2 Jazzy, Autonomous Mobile Robots (AMR), Gazebo simulations, and Sim-to-Real unsupervised anomaly detection pipelines. Proven track record bridging low-level embedded RTOS actuation with high-level deep learning and computer vision architectures."
};
