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
    title: "AURA: Resilient Urban Traffic Signal Control via Semi-Markov Reinforcement Learning with Action-Duration Bounds and Shockwave-Mitigated Preemption",
    authors: ["Deepak R"],
    venue: "IEEE Transactions on Intelligent Transportation Systems (TITS Under Review: dbb571bd) / Zenodo: 10.5281/zenodo.20265628",
    doi: "10.5281/zenodo.20265628",
    doiUrl: "https://doi.org/10.5281/zenodo.20265628",
    publicationDate: "November 2026",
    status: "Under Review",
    pdfUrl: "/papers/AURA_IEEE_TITS_Manuscript.pdf",
    abstract: "This paper presents AURA, a closed-loop, decentralized urban traffic management architecture integrating real-time computer vision telemetry with semi-Markov decision process reinforcement learning (SMDP-RL). Featuring action-duration bounds and shockwave-mitigated emergency vehicle preemption, AURA dynamically adjusts signal timing to maximize arterial throughput while reducing emergency transit delays and dissipating shockwaves 42% faster than actuated baselines.",
    keyContributions: [
      "Closed-loop telemetry pipeline fusing edge vision detections directly into policy state space.",
      "Semi-Markov decision formulation with action-duration bounds preventing arterial starvation.",
      "Shockwave-mitigated emergency vehicle preemption with 42% faster network queue recovery.",
      "Submitted to IEEE Transactions on Intelligent Transportation Systems (IEEE TITS, Submission ID dbb571bd)."
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
    title: "On-Device Autonomous Software Engineering: In-Memory Code Property Graph Reachability Slicing under Edge VRAM Constraints",
    authors: ["Deepak R"],
    venue: "Journal of Parallel and Distributed Computing (JPDC Under Review — Manuscript # JPDC-S-26-02633)",
    doi: "PyPI: neurocode-ai",
    doiUrl: "https://pypi.org/project/neurocode-ai/",
    publicationDate: "November 2026",
    status: "Under Review",
    pdfUrl: "/papers/NeuroCode_JPDC_Manuscript.pdf",
    abstract: "A lightweight, heterogeneous neuro-symbolic framework and Model Context Protocol (MCP) server enabling small language models (1.5B–14B) to solve multi-file repository bugs on consumer laptop GPUs (4GB VRAM) without OOM crashes by dividing cognitive labor between host CPU graph engines and device GPU neural synthesis.",
    keyContributions: [
      "Topological Code Property Graph (CPG) slicing with bounded 0/1 knapsack token-budget optimization.",
      "Empirical validation on SWE-bench Lite (41.4% diff apply / 9.5% resolved on 4GB VRAM) with 93.2% VRAM reduction.",
      "100% recall on RepoBench-R cross-file retrieval with 42.6% token reduction.",
      "Submitted to Journal of Parallel and Distributed Computing (JPDC, Manuscript # JPDC-S-26-02633)."
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
    title: "VGA: Vision-Geometry-Action Policy with Continuous 3D Ray-RoPE for Smooth and Camera-Invariant Robot Manipulation",
    authors: ["Shafeeq Sadiq", "Trishanth Mellimi", "Deepak R", "Tran Nguyen Le"],
    venue: "Target: Robotics: Science and Systems (RSS 2027) / IEEE RA-L Submission",
    doi: "Repo: Arkz-Deepak/vga-poc",
    doiUrl: "https://github.com/Arkz-Deepak/vga-poc",
    publicationDate: "November 2026",
    status: "Under Review",
    pdfUrl: "/papers/VGA_RSS_2027_Manuscript.pdf",
    abstract: "Documents the design and empirical validation of Vision-Geometry-Action (VGA), a lightweight (375M parameter) manipulation policy that directly couples visual semantics with metric 3D scene geometry and kinematically smooth trajectory generation. Integrates continuous 3D Ray-RoPE into transformer attention layers, projecting physical camera ray geometry directly into latent spatial representations without requiring explicit depth sensors. Prior-action conditioning with boundary velocity-matching loss (L_smooth) eliminates inter-chunk trajectory discontinuities. Evaluated on LIBERO-Spatial, VGA achieves an 85.0% verified success rate under 10-shot fine-tuning, reduces trajectory RMS jerk by 35.4% (from 11.38 to 7.35 m/s³), suppresses chunk-boundary acceleration jumps from 2.83× to 1.05×, and retains 74.5% success under severe camera extrinsics perturbations in LIBERO-MAX.",
    keyContributions: [
      "Lightweight 375M VLA architecture with continuous 3D Ray-RoPE achieving camera extrinsics invariance.",
      "85.0% verified success rate under 10-shot fine-tuning on LIBERO-Spatial benchmark.",
      "Boundary velocity-matching loss (L_smooth) reducing RMS jerk by 35.4% and chunk jump acceleration to 1.05x.",
      "Retains 74.5% success under out-of-distribution camera extrinsics perturbation where monolithic models collapse (-67.5%).",
      "Sub-3.0 GB VRAM footprint with 152 ms chunk latency on edge NVIDIA T4 GPU."
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
    citationBibtex: `@inproceedings{sadiq2027vga,
  title={VGA: Vision-Geometry-Action Policy with Continuous 3D Ray-RoPE for Smooth and Camera-Invariant Robot Manipulation},
  author={Sadiq, Shafeeq and Mellimi, Trishanth and Deepak, R. and Le, Tran Nguyen},
  booktitle={Robotics: Science and Systems (RSS Under Review)},
  year={2027},
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
