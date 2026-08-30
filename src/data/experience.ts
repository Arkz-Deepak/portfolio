export interface IndustryExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  locationType: 'Remote' | 'On-site' | 'Hybrid';
  ndaProtected?: boolean;
  ndaNotice?: string;
  domainTag: string;
  responsibilities: string[];
  technologies: string[];
  deliverables?: string[];
}

export const experienceData: IndustryExperience[] = [
  {
    id: "wildplant",
    company: "Wildplant Terrestrial Solutions Pvt Ltd",
    role: "Frontend & 3D Web Development Intern",
    period: "Jul 2026 – Present",
    location: "Remote",
    locationType: "Remote",
    ndaProtected: true,
    ndaNotice: "Proprietary commercial web platform and 3D UI architectures built under strict Non-Disclosure Agreement (NDA).",
    domainTag: "Three.js & Full-Stack Web Development",
    responsibilities: [
      "Assisting lead engineers in developing responsive frontend user interfaces and modular web components for proprietary internal platforms.",
      "Implementing 3D graphics rendering pipelines and interactive viewport modules utilizing Three.js and modern WebGL.",
      "Optimizing client-side state management, asset compression, and cross-browser rendering reliability."
    ],
    technologies: ["Three.js", "WebGL", "TypeScript", "React", "Next.js", "REST APIs"]
  },
  {
    id: "precise3dm",
    company: "Precise3DM",
    role: "AI & Data Engineering Intern",
    period: "Jun 2026 – Jul 2026",
    location: "Chennai, India",
    locationType: "Hybrid",
    ndaProtected: false,
    domainTag: "Autonomous Data Pipelines & AI Scraping",
    responsibilities: [
      "Architected an automated B2B lead generation pipeline integrating Google Maps API with headless browser automation (Playwright/Selenium).",
      "Engineered an automated prompt pipeline using the Gemini API to identify, filter, and qualify high-potential industrial clients based on geographic and industry criteria.",
      "Constructed automated data sanitization workflows to aggregate, validate, and export structured lead datasets directly to CSV formats."
    ],
    technologies: ["Python", "Gemini API", "Google Maps API", "Headless Browsers", "Web Scraping", "Data Pipelines"]
  },
  {
    id: "tamizhan-rise",
    company: "Tamizhan Skills (RISE Programs)",
    role: "AI & Autonomous Systems Intern",
    period: "Dec 2025 – Mar 2026",
    location: "Remote",
    locationType: "Remote",
    ndaProtected: false,
    domainTag: "Autonomous Navigation & Deep Learning",
    responsibilities: [
      "Configured and evaluated ROS 2 Nav2 navigation stacks, costmaps, and multi-sensor fusion (LiDAR, IMU, Odometry) in Gazebo simulations.",
      "Trained Convolutional Neural Networks (CNNs) in TensorFlow/Keras for image classification and developed NLP anomaly detection pipelines."
    ],
    technologies: ["ROS 2", "Gazebo", "Nav2", "TensorFlow", "Keras", "OpenCV", "Scikit-Learn"]
  },
  {
    id: "chennai-port",
    company: "Chennai Port Authority",
    role: "Industrial Engineering Intern",
    period: "Dec 2025",
    location: "Chennai, India",
    locationType: "On-site",
    ndaProtected: false,
    domainTag: "Heavy Industrial Automation & Machinery",
    responsibilities: [
      "Diagnosed, inspected, and serviced heavy diesel locomotive engine powertrains and pneumatic subsystem assemblies.",
      "Examined PLC-driven industrial automation infrastructure and large-scale automated cargo handling workflows."
    ],
    technologies: ["Industrial PLCs", "Pneumatic Systems", "Locomotive Powertrains", "Industrial Safety Protocols"]
  },
  {
    id: "mk-auto",
    company: "MK Autocomponents",
    role: "Industrial Automation Intern",
    period: "Aug 2025",
    location: "Chennai, India",
    locationType: "On-site",
    ndaProtected: false,
    domainTag: "Manufacturing & Precision Machining",
    responsibilities: [
      "Operated CNC, VMC, and precision lathe machinery in an active automotive component manufacturing plant.",
      "Analyzed tool degradation patterns and preventive maintenance cycles to optimize line output."
    ],
    technologies: ["CNC Machinery", "VMC", "Precision Lathe", "Preventive Maintenance"]
  }
];
