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
    id: "neurocode-framework",
    title: "NeuroCode: Heterogeneous Code-Graph Slicing for On-Device Autonomous Software Engineering",
    authors: ["Deepak R"],
    venue: "Target: IEEE Transactions on Software Engineering / PyPI: neurocode-ai",
    doi: "PyPI: neurocode-ai",
    doiUrl: "https://pypi.org/project/neurocode-ai/",
    publicationDate: "November 2026",
    status: "Under Review",
    abstract: "A lightweight, heterogeneous neuro-symbolic framework and Model Context Protocol (MCP) server enabling small language models (1.5B–14B) to solve multi-file repository bugs on consumer laptop GPUs (4GB VRAM) without OOM crashes by dividing cognitive labor between host CPU graph engines and device GPU neural synthesis.",
    keyContributions: [
      "Topological Code Property Graph (CPG) slicing with bounded 0/1 knapsack token-budget optimization.",
      "Empirical validation on SWE-bench Lite (41.4% diff apply / 9.5% resolved on 4GB VRAM) with 93.2% VRAM reduction.",
      "100% recall on RepoBench-R cross-file retrieval with 42.6% token reduction."
    ],
    citationBibtex: `@article{deepak2026neurocode,
  title={NeuroCode: Heterogeneous Code-Graph Slicing for On-Device Autonomous Software Engineering},
  author={Deepak, R.},
  journal={IEEE Transactions on Software Engineering (Under Review)},
  year={2026},
  note={PyPI: neurocode-ai, MCP Server}
}`
  },
  {
    id: "vga-robotic-manipulation",
    title: "VGA Policy: Vision-Geometry-Action Robotic Manipulation with Kinematic Jerk Suppression",
    authors: ["Deepak R"],
    venue: "Technical Report & Benchmark Validation (LIBERO-Spatial & RoboCasa)",
    doi: "Repo: Arkz-Deepak/vga-poc",
    doiUrl: "https://github.com/Arkz-Deepak/vga-poc",
    publicationDate: "October 2026",
    status: "Published Preprint",
    abstract: "Documents the design and empirical validation of the Vision-Geometry-Action (VGA) robotic manipulation policy under a strict <=0.5B parameter budget. Couplings of SigLIP and SmolLM2 backbones with a 12-layer Action DiT and Flow Matching yield 154–215 Hz hard real-time control (4.6ms motor latency) and 89.1% jerk reduction, verified by autonomous pick-and-place success in MuJoCo.",
    keyContributions: [
      "Sub-0.5B (298M) architecture operating at 3x-4.3x industrial 50 Hz control rate threshold.",
      "Physics-guided finite-difference kinematic loss annealing suppressing robot joint vibration by 89.1%.",
      "Validated closed-loop physical pick-and-place task completion at Step 118 in MuJoCo simulation.",
      "Collaborating on lightweight Vision-Language-Action (VLA) architectures and embodied policy optimization with researchers from Technical University of Denmark (DTU)."
    ],
    citationBibtex: `@techreport{deepak2026vga,
  title={Vision-Geometry-Action (VGA) Robotic Manipulation with Kinematic Jerk Suppression},
  author={Deepak, R.},
  institution={ARKZ Autonomous Systems},
  year={2026},
  url={https://github.com/Arkz-Deepak/vga-poc}
}`
  },
  {
    id: "neuroarc-fluid-intelligence",
    title: "NeuroARC: Heterogeneous Spatial-Graph Slicing for Interactive ARC-AGI-3 Environments",
    authors: ["Deepak R"],
    venue: "ARC Prize 2026 — Paper Track (Kaggle Submission 57909506)",
    doi: "Kaggle: deepark121/neuroarc-interactive-arc3",
    doiUrl: "https://www.kaggle.com/code/deepark121/neuroarc-interactive-arc3",
    publicationDate: "October 2026",
    status: "Published Preprint",
    abstract: "A dual-engine neuro-symbolic framework for real-time interactive reasoning in discrete POMDP game environments. Combines host-side connected-component segmentation with step-level affordance filtering and centroid-targeted entity probing to resolve multi-stage puzzle mechanics at 510 FPS without external hosted APIs.",
    keyContributions: [
      "Deterministic spatial graph engine extracting entity centroids in <1.5ms on standard CPU.",
      "Elevates interactive hit rate from 1.8% to 98.4% on targeted coordinate actions.",
      "Zero illegal action penalties via dynamic step-level affordance mask pruning."
    ],
    citationBibtex: `@article{deepak2026neuroarc,
  title={NeuroARC: Heterogeneous Spatial-Graph Slicing for Interactive ARC-AGI-3 Environments},
  author={Deepak, R.},
  journal={ARC Prize 2026 Paper Track},
  year={2026},
  url={https://www.kaggle.com/code/deepark121/neuroarc-interactive-arc3}
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
