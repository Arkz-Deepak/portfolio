export interface ResearchPublication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  doi: string;
  doiUrl: string;
  publicationDate: string;
  abstract: string;
  keyContributions: string[];
  citationBibtex: string;
  pdfUrl?: string;
  status: 'Published Preprint' | 'Active Investigation' | 'Under Review';
}

export const researchData: ResearchPublication[] = [
  {
    id: "traffic-rl-preprint",
    title: "Sensor-Fusion Driven Deep Reinforcement Learning for Dynamic Traffic Signal Optimization",
    authors: ["Deepak R"],
    venue: "Zenodo Preprint",
    doi: "10.5281/zenodo.20265628",
    doiUrl: "https://doi.org/10.5281/zenodo.20265628",
    publicationDate: "August 2026",
    status: "Published Preprint",
    abstract: "This paper presents a closed-loop, decentralized urban traffic management architecture integrating real-time computer vision telemetry with multi-agent reinforcement learning (MARL). By ingesting optical density metrics and vehicle queue trajectories, the policy dynamically adjusts signal timing to maximize arterial throughput while minimizing waiting variance.",
    keyContributions: [
      "Closed-loop telemetry pipeline fusing edge vision detections directly into policy state space.",
      "Multi-agent reward formulation preventing congestion spillover across adjacent intersections.",
      "Open access publication and dataset schema indexed under Zenodo DOI 10.5281/zenodo.20265628."
    ],
    citationBibtex: `@article{deepak2026sensorfusion,
  title={Sensor-Fusion Driven Deep Reinforcement Learning for Dynamic Traffic Signal Optimization},
  author={Deepak, R.},
  journal={Zenodo Preprint},
  year={2026},
  doi={10.5281/zenodo.20265628},
  url={https://doi.org/10.5281/zenodo.20265628}
}`
  },
  {
    id: "aura-navigation",
    title: "AURA: Acoustic-visual Urban Routing Architecture for Autonomous Mobile Robots",
    authors: ["Deepak R"],
    venue: "Target: ICRA / IROS Conference Series",
    doi: "In Progress",
    doiUrl: "https://www.deepak-arkz.me/projects/aura",
    publicationDate: "Ongoing (2026 – 2027)",
    status: "Active Investigation",
    abstract: "Investigating multimodal acoustic and visual sensor fusion frameworks to facilitate robust autonomous robot navigation and localized spatial awareness in GPS-denied, visually degraded urban canyons.",
    keyContributions: [
      "Cross-modal acoustic-visual feature extraction for spatial landmark localization.",
      "Integration with ROS 2 Nav2 costmaps and real-time state estimators."
    ],
    citationBibtex: `@misc{deepak2026aura,
  title={AURA: Acoustic-visual Urban Routing Architecture for Autonomous Mobile Robots},
  author={Deepak, R.},
  year={2026},
  note={Working Research Paper}
}`
  }
];
