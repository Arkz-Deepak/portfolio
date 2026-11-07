export interface ResearchFigure {
  url: string;
  title: string;
  caption: string;
  alt: string;
}

export interface ResearchVideo {
  url: string;
  title: string;
  caption: string;
  poster?: string;
}

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
  figures?: ResearchFigure[];
  video?: ResearchVideo;
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
    figures: [
      {
        url: "/images/research/traffic-preemption-shockwave.png",
        title: "Shockwave Dissipation Across Road Networks",
        caption: "Empirical shockwave propagation and clearance during emergency vehicle (EV) preemption on real-world GIS road networks, demonstrating 42% faster recovery over actuated systems.",
        alt: "Graph showing traffic shockwave dissipation curves across GIS road networks"
      },
      {
        url: "/images/research/traffic-ai-comparison.png",
        title: "Multi-Agent AI vs Baseline Policies",
        caption: "Quantitative comparison showing average vehicle delay, queue length variance, and fuel emission reduction across Fixed-Time, Actuated, and Multi-Agent RL policies.",
        alt: "Bar and line charts comparing Multi-Agent RL against Fixed-Time and Actuated policies"
      },
      {
        url: "/images/research/traffic-recovery-curve.png",
        title: "Post-Preemption Queue Recovery Dynamics",
        caption: "Decentralized arterial stabilization curve tracking queue dissipation following priority emergency preemption clearance.",
        alt: "Post-preemption queue length dissipation curve over time"
      },
      {
        url: "/images/research/traffic-ev-latency.png",
        title: "Emergency Vehicle Delay Reduction",
        caption: "Average transit latency reduction for ambulances and emergency responders across high-density simulated intersections.",
        alt: "Emergency vehicle transit latency reduction bar chart"
      }
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
    figures: [
      {
        url: "/images/research/neurocode-architecture.png",
        title: "Heterogeneous Neuro-Symbolic Architecture",
        caption: "Bipartite cognitive architecture: host CPU Code Property Graph (CPG) slicing with bounded 0/1 knapsack token budgeting feeding consumer GPU neural synthesis.",
        alt: "NeuroCode bipartite neuro-symbolic system architecture diagram"
      },
      {
        url: "/images/research/neurocode-empirical-comparison.png",
        title: "SWE-bench Lite & RepoBench Evaluation",
        caption: "41.4% diff apply rate and 9.5% resolved benchmark performance achieved entirely on consumer 4GB laptop GPUs without OOM crashes.",
        alt: "SWE-bench Lite and RepoBench empirical performance charts"
      },
      {
        url: "/images/research/neurocode-gpu-ablation.png",
        title: "VRAM Consumption & Hardware Ablation",
        caption: "93.2% VRAM footprint reduction (under 4GB) compared to vanilla dense RAG and full-context LLM architectures.",
        alt: "GPU VRAM memory footprint ablation across model sizes"
      },
      {
        url: "/images/research/neurocode-microbenchmarks.png",
        title: "Systems Microbenchmarks & Latency",
        caption: "Sub-10ms graph slicing traversal and bounded context token extraction latency across million-line repositories.",
        alt: "Microbenchmarks showing graph slicing latency and throughput"
      },
      {
        url: "/images/research/neurocode-hardware-oom.png",
        title: "Hardware OOM Cliff Prevention",
        caption: "Strict bounded knapsack budgeting eliminating CUDA out-of-memory crashes on constrained hardware.",
        alt: "OOM cliff prevention curve showing bounded memory allocation"
      }
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
      "Smooth chunk joins cut chunk-boundary jumps from 2.88x to 1.05x normal step.",
      "Retains ~82% success under mid-task camera perturbation in LIBERO-MAX, whereas X-VLA collapses losing 61–69%."
    ],
    video: {
      url: "/videos/vga-libero-t0-multitile.mp4",
      title: "LIBERO-Spatial Multi-Variant Rollout Matrix",
      caption: "Side-by-side rollout evaluation on LIBERO-Spatial Task 0 comparing Baseline, +Depth, +Rays, +Smooth Chunk Joins, All Three, and SmolVLA-450M with wrist camera insets."
    },
    figures: [
      {
        url: "/images/projects/vga-manipulation-preview.png",
        title: "Closed-Loop MuJoCo Architecture",
        caption: "Sub-0.5B (298M) flow-matching architecture achieving 154–215 Hz inference control rate with 89.1% annealed jerk reduction.",
        alt: "VGA Policy closed-loop simulation architecture preview"
      }
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
      "End-to-end local inference running at 510 FPS without internet connectivity or hosted API calls."
    ],
    citationBibtex: `@article{deepak2026neuroarc,
  title={NeuroARC: Heterogeneous Spatial-Graph Slicing for Interactive ARC-AGI-3 Environments},
  author={Deepak, R.},
  journal={ARC Prize 2026 Paper Track},
  year={2026},
  url={https://www.kaggle.com/code/deepark121/neuroarc-interactive-arc3}
}`
  }
]
