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
    role: "Web Development Intern",
    period: "Jul 2026 – Present",
    location: "Remote",
    locationType: "Remote",
    ndaProtected: true,
    ndaNotice: "Proprietary internal architecture and developer tooling built under strict Non-Disclosure Agreement (NDA).",
    domainTag: "Full-Stack Web & Internal Tooling",
    responsibilities: [
      "Architecting responsive full-stack web platforms and developer interfaces for proprietary company systems.",
      "Designing secure RESTful API routes and backend services in Python and Node.js to optimize data flow and system responsiveness.",
      "Streamlining client-side telemetry handling and state management for internal dashboards."
    ],
    technologies: ["Python", "Node.js", "REST APIs", "React", "TypeScript", "Docker"]
  },
  {
    id: "precise3dm",
    company: "Precise3DM",
    role: "Automation & Data Engineering Intern",
    period: "Jun 2026 – Jul 2026",
    location: "Chennai, India",
    locationType: "Hybrid",
    ndaProtected: false,
    domainTag: "Automated ETL & Web Scraping",
    responsibilities: [
      "Engineered automated lead generation pipelines and high-throughput data processing workflows integrating custom scrapers with REST APIs.",
      "Designed robust ETL ingestion validation routines, eliminating manual entry overhead and ensuring high dataset consistency."
    ],
    technologies: ["Python", "Data Pipelines", "REST APIs", "Web Scraping", "ETL Validation"]
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
