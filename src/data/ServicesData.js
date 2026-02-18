import { 
  Layers,
  Map,
  Monitor,
  Brain,
  Shuffle,
  CreditCard,
  Box,
  ZoomIn,
  Heart,
  Edit3,
  List,
  Sparkles,
  Filter,
  Mic,
  Volume2,
  Mic2,
  Music,
  Headphones,
  Phone,
  Command,

  RefreshCcw,
  Database, 
  Settings, 
  BarChart3, 
  Globe,
  Cloud,
  Server,
  GitBranch,
  Lock,
  Search,
  Zap,
  Shield,
  Network,
  RefreshCw,
  TrendingUp,
  Award,
  Users,
  Briefcase,
  Clock,
  FileCheck,
  Code,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  BrainCircuit,
  LineChart,
  Bot,
  Workflow,
  Lightbulb,
  Smartphone,
  Target,
  Activity,
    AlertCircle,
    Star,
    DollarSign,
    AlertTriangle,
    Fingerprint,
        UserCheck,
    MessageSquare,
    Layout,
        Eye,
        FileText,
        ShieldAlert,
            Sliders,
            FileSearch,
            Scale,
                Rocket,
                LifeBuoy,
                Share2,
                Terminal,
                BookOpen,
                Scan,
                Calculator,
                BarChart,
                FlaskConical,
                PieChart,
                GitMerge,
                HardDrive,
} from 'lucide-react';

// Consolidated Services Data
export const allServicesData = [
  {
    id: "custom-ai-solutions",
    slug: "custom-ai-solutions",
    title: "Custom Enterprise AI Solutions",
    hero: {
      title: "Custom Enterprise AI Solutions.",
      description: "AI Strategy. Transformation. Governance. We go beyond simple tools to build comprehensive AI strategies that drive real-world transformation. From automated decision systems to ethical governance, 1TecHub ensures your AI journey is secure, scalable, and focused on measurable business impact.",
      backgroundImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop" // Strategic AI Network Image
    },
    sections: [
      {
        id: "ai-strategy",
        title: "Custom AI Strategy",
        icon: Target,
        cards: [
          { 
            title: "Discovery & Readiness", 
            desc: "Identifying high-impact opportunities and evaluating data quality, infrastructure, and cultural readiness for adoption.", 
            icon: Search 
          },
          { 
            title: "Tech Stack Selection", 
            desc: "Objective guidance on choosing the right LLMs, vector databases, and cloud providers for your specific needs.", 
            icon: Layers 
          },
          { 
            title: "ROI & Feasibility", 
            desc: "Detailed financial modeling, technical scoping, and feasibility analysis for proposed AI initiatives.", 
            icon: TrendingUp 
          },
          { 
            title: "Implementation Roadmap", 
            desc: "Phase-by-phase planning from pilot programs to full-scale enterprise deployment and vendor auditing.", 
            icon: Map 
          }
        ]
      },
      {
        id: "ai-transformation",
        title: "Enterprise AI Transformation",
        icon: GitBranch,
        cards: [
          { 
            title: "Legacy Integration", 
            desc: "Bridge the gap between your existing software and modern AI capabilities for seamless operations.", 
            icon: RefreshCw 
          },
          { 
            title: "Operationalizing AI", 
            desc: "Moving models from research to high-availability production systems with scalable infrastructure.", 
            icon: Server 
          },
          { 
            title: "Change Management", 
            desc: "Structured programs to train teams and align organizational culture with AI-first workflows.", 
            icon: Users 
          },
          { 
            title: "Performance Monitoring", 
            desc: "Continuous tracking of model accuracy and business value metrics across departmental workflows.", 
            icon: Activity 
          }
        ]
      },
      {
        id: "automated-decisions",
        title: "Automated Decision Systems",
        icon: Zap,
        cards: [
          { 
            title: "ML-Driven & Real-Time", 
            desc: "Predictive engines operating at millisecond speeds to automate complex choices with high precision.", 
            icon: Cpu 
          },
          { 
            title: "Predictive Intervention", 
            desc: "Systems that identify potential issues before they occur and trigger automated corrective actions.", 
            icon: AlertTriangle 
          },
          { 
            title: "Automated Approvals", 
            desc: "AI-powered gates for financial, legal, and operational approvals with strict compliance checks.", 
            icon: CheckCircle2 
          },
          { 
            title: "Decision Transparency", 
            desc: "Explanation layers that provide clear reasoning for every automated choice to human auditors.", 
            icon: FileSearch 
          }
        ]
      },
      {
        id: "ai-governance",
        title: "AI Governance & Ethics",
        icon: Scale,
        cards: [
          { 
            title: "Bias Detection", 
            desc: "Continuous monitoring for algorithmic bias to ensure fair, equitable, and ethical AI outcomes.", 
            icon: Eye 
          },
          { 
            title: "Data Privacy Compliance", 
            desc: "Ensuring all AI systems adhere to GDPR, CCPA, and other global data protection standards.", 
            icon: Lock 
          },
          { 
            title: "Ethical Audit Logs", 
            desc: "Immutable records of agent actions and model outputs for regulatory and internal review.", 
            icon: FileText 
          },
          { 
            title: "Risk Management", 
            desc: "Comprehensive protocols to identify and mitigate technical, operational, and regulatory AI risks.", 
            icon: ShieldAlert 
          }
        ]
      }
    ],
    features: [
      { 
        title: "Strategic ROI", 
        desc: "Every implementation is backed by a clear financial impact case and measurable business value.", 
        icon: TrendingUp 
      },
      { 
        title: "Secure by Design", 
        desc: "Proprietary frameworks for data protection, ethical safety, and rigorous compliance.", 
        icon: ShieldCheck 
      },
      { 
        title: "Production Ready", 
        desc: "No prototypes that stall. We build robust models that scale immediately to production.", 
        icon: Rocket 
      },
      { 
        title: "Total Support", 
        desc: "Ongoing monitoring, optimization, and refinement to ensure long-term model value.", 
        icon: LifeBuoy 
      },
      { 
        title: "Deep Industrial Expertise", 
        desc: "We combine cutting-edge engineering with deep industry knowledge to solve real business problems.", 
        icon: Briefcase 
      },
      { 
        title: "Cutting-Edge Engineering", 
        desc: "Leveraging the latest in LLMs, Vector Databases, and Agentic frameworks for superior performance.", 
        icon: Code 
      }
    ],
    cta: {
      title: "Innovate. Automate. Lead.",
      text: "AI Solutions at 1TecHub are more than just technology—they are a strategic leverage. Transform your enterprise into an AI-driven leader with our expert engineering and governance.",
      buttonText: "Start Your Transformation"
    }
  },

  {
    id: "autonomous-ai-agents",
    slug: "autonomous-ai-agents",
    title: "Autonomous AI Agents",
    hero: {
      title: "Autonomous AI Agents.",
      description: "Agentic Workflows. Orchestration. Hyper-Automation. The future of business is autonomous. We build systems that don't just follow instructions, but reason, plan, and execute. From multi-agent collaboration to human-in-the-loop governance, 1TecHub delivers the intelligent workforce of tomorrow.",
      backgroundImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop" // Neural Network / AI Brain Image
    },
    sections: [
      {
        id: "orchestration",
        title: "Autonomous Agent Orchestration",
        icon: Network,
        cards: [
          { 
            title: "Multi-Agent Controller", 
            desc: "Centralized reasoning layer managing dependencies and task delegation across specialized agent teams.", 
            icon: Cpu 
          },
          { 
            title: "Dynamic Task Trees", 
            desc: "Real-time decomposition of high-level goals into executable sub-tasks for specialized agents.", 
            icon: GitBranch 
          },
          { 
            title: "Reasoning Guardrails", 
            desc: "Continuous validation of agent logic to prevent hallucination and ensure objective alignment.", 
            icon: ShieldCheck 
          },
          { 
            title: "Conflict Resolution", 
            desc: "Automated arbitration for agents accessing shared resources or proposing divergent solutions.", 
            icon: Scale 
          }
        ]
      },
      {
        id: "workflow-automation",
        title: "Agentic Workflow Automation",
        icon: Workflow,
        cards: [
          { 
            title: "Self-Healing Workflows", 
            desc: "Autonomous detection and remediation of API breaks or data inconsistencies without human intervention.", 
            icon: RefreshCw 
          },
          { 
            title: "Cognitive Decision Gates", 
            desc: "AI-powered conditional logic that interprets complex qualitative data to determine the next step.", 
            icon: BrainCircuit 
          },
          { 
            title: "Tool Discovery", 
            desc: "Capability for agents to browse documentation and learn how to use new API tools dynamically.", 
            icon: Search 
          },
          { 
            title: "Secure Context Mapping", 
            desc: "Mapping enterprise data silos into agent working memory with strict access control.", 
            icon: Lock 
          }
        ]
      },
      {
        id: "multi-agent-systems",
        title: "Multi-Agent Systems",
        icon: Users,
        cards: [
          { 
            title: "Swarm Intelligence", 
            desc: "Large-scale deployments of small, specialized agents collaborating on massive data processing tasks.", 
            icon: Globe 
          },
          { 
            title: "Role-Based Teams", 
            desc: "Pre-configured specialized teams (Researcher, Architect, Implementer) for complex project cycles.", 
            icon: Briefcase 
          },
          { 
            title: "Cross-Domain Synergy", 
            desc: "Breaking down silos by allowing agents from different departments to share insights and tools.", 
            icon: Share2 
          },
          { 
            title: "Distributed Inference", 
            desc: "Load-balancing of agent reasoning across multiple clusters to ensure high availability.", 
            icon: Server 
          }
        ]
      },
      {
        id: "human-in-the-loop",
        title: "Human-in-the-Loop AI",
        icon: UserCheck,
        cards: [
          { 
            title: "Active Feedback Loops", 
            desc: "Interfaces for human experts to review and correct agent reasoning, retraining the system in real-time.", 
            icon: MessageSquare 
          },
          { 
            title: "Escalation Management", 
            desc: "Intelligent monitoring that identifies edge cases and seamlessly hands off to human operators.", 
            icon: AlertTriangle 
          },
          { 
            title: "Cooperative Workspaces", 
            desc: "Shared canvases where humans and agents collaborate on creative and strategic outputs.", 
            icon: Layout 
          },
          { 
            title: "Transparency Mapping", 
            desc: "Visual mapping of the 'Chain of Thought' behind every autonomous decision for human audit.", 
            icon: Eye 
          }
        ]
      }
    ],
    features: [
      { 
        title: "Autonomous Thinkers", 
        desc: "We don't just build chatbots. We build agents that reason, plan, and execute multi-step tasks independently.", 
        icon: BrainCircuit 
      },
      { 
        title: "Continuous Learning", 
        desc: "Agents improve over time based on feedback loops and historical execution data.", 
        icon: TrendingUp 
      },
      { 
        title: "Native Integration", 
        desc: "Ready-to-use connectors for major ERP, CRM, and HRMS systems to execute deep in the stack.", 
        icon: Layers 
      },
      { 
        title: "Enterprise Security", 
        desc: "Private deployments and data silos by default to ensure maximum data protection.", 
        icon: ShieldCheck 
      },
      { 
        title: "24/7 Autonomy", 
        desc: "Constant execution without human fatigue, ensuring round-the-clock productivity.", 
        icon: Clock 
      },
      { 
        title: "Measurable Performance", 
        desc: "Live tracking of throughput, latency, and success rates for every orchestration path.", 
        icon: BarChart3 
      }
    ],
    cta: {
      title: "The 1TecHub Agentic Advantage",
      text: "Our agents are powered by the latest LLMs and custom orchestration layers, ensuring reliability, multi-step reasoning, and measurable performance at scale. Let's build your intelligent workforce.",
      buttonText: "Deploy Your Agents"
    }
  },

  {
    id: "llm-integration",
    slug: "llm-integration",
    title: "LLM Integration & Orchestration",
  hero: {
    title: "Large Language Model Integration & Orchestration.",
    description: "Smarter Decisions. Autonomous Actions. Enterprise Intelligence Reinvented. We go beyond traditional automation to create autonomous digital agents that think, reason, and execute. Combined with advanced machine learning, we help organizations unlock unprecedented operational efficiency.",
    backgroundImage: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=2000&auto=format&fit=crop/" // Abstract Generative AI / Particles
  },
  
  sections: [
    {
      id: "llm-integration",
      title: "LLM Integration & Orchestration",
      icon: BrainCircuit,
      cards: [
        { 
          title: "Multi-Model Orchestration", 
          desc: "Seamless switching between GPT-4, Claude 3.5, and Llama 3 based on cost, latency, and performance needs.", 
          icon: Layers 
        },
        { 
          title: "Secure API Wrappers", 
          desc: "Enterprise-grade security layers that sanitize data and strip PII before sending requests to public LLM endpoints.", 
          icon: Shield 
        },
        { 
          title: "Context Management", 
          desc: "Advanced chunking and summarization strategies to maximize information density within LLM context windows.", 
          icon: FileText 
        },
        { 
          title: "Streaming Response APIs", 
          desc: "Ultra-low latency real-time text generation designed for conversational agents and drafting interfaces.", 
          icon: Zap 
        },
        { 
          title: "Chain-of-Thought Logic", 
          desc: "Embedding multi-step reasoning directly into the integration layer to ensure higher accuracy and logic.", 
          icon: BrainCircuit 
        },
        { 
          title: "Function Calling / Tools", 
          desc: "Enabling models to execute code, search documentation, and perform backend actions autonomously.", 
          icon: Code 
        }
      ]
    },
    {
      id: "rag-knowledge",
      title: "RAG & Knowledge Bases",
      icon: Database,
      cards: [
        { 
          title: "Vector DB Implementation", 
          desc: "Industrial-grade deployments of Pinecone, Weaviate, or Milvus for high-speed semantic retrieval.", 
          icon: Database 
        },
        { 
          title: "Real-time Data Ingestion", 
          desc: "Automated pipelines that keep your AI knowledge base perfectly synced with internal documentation sources.", 
          icon: RefreshCw 
        },
        { 
          title: "Semantic Chunking", 
          desc: "Intelligent data preprocessing that preserves context across massive document datasets for better recall.", 
          icon: Layers 
        },
        { 
          title: "Hallucination Control", 
          desc: "Rigorous fact-checking layers that compare LLM outputs against source knowledge bases to ensure grounding.", 
          icon: ShieldCheck 
        },
        { 
          title: "Hybrid Search Logic", 
          desc: "Combining vector similarity with keyword search (BM25) for 99%+ information retrieval accuracy.", 
          icon: Search 
        },
        { 
          title: "Multi-Modal RAG", 
          desc: "Enabling AI to 'read', interpret, and retrieve information from images, PDFs, and technical charts.", 
          icon: Eye 
        }
      ]
    },
    {
      id: "prompt-engineering",
      title: "Advanced Prompt Engineering",
      icon: Terminal,
      cards: [
        { 
          title: "System Prompt Optimization", 
          desc: "Designing highly-refined system instructions that anchor the AI's persona, tone, and output quality.", 
          icon: Settings 
        },
        { 
          title: "Few-Shot Strategy", 
          desc: "Implementing example-driven prompting to align model outputs perfectly with complex brand voices.", 
          icon: MessageSquare 
        },
        { 
          title: "Dynamic Prompt Injection", 
          desc: "Real-time assembly of prompts based on live user data, history, and contextual metadata.", 
          icon: Zap 
        },
        { 
          title: "Evaluation & Benchmarking", 
          desc: "Automated testing of prompt variations to scientifically identify the most reliable interaction patterns.", 
          icon: BarChart3 
        },
        { 
          title: "Prompt Versioning", 
          desc: "Git-like version control for prompt templates to ensure consistent, traceable production deployments.", 
          icon: GitBranch 
        },
        { 
          title: "Guardrail Engineering", 
          desc: "Hard-coding safety constraints and negative constraints directly into the foundational prompt layer.", 
          icon: Lock 
        }
      ]
    },
    {
      id: "model-finetuning",
      title: "Custom Model Fine-tuning",
      icon: Sliders,
      cards: [
        { 
          title: "Domain-Specific Training", 
          desc: "Specializing open-source models on your industry's niche language, terminology, and data formats.", 
          icon: BookOpen 
        },
        { 
          title: "PEFT / LoRA Techniques", 
          desc: "Highly efficient parameter tuning that maintains base model knowledge while adding new specific skills.", 
          icon: Settings 
        },
        { 
          title: "Instruction Fine-tuning", 
          desc: "Training models to follow your unique enterprise business logic and complex workflow instructions.", 
          icon: Terminal 
        },
        { 
          title: "Private VPC Deployment", 
          desc: "Hosting your fine-tuned models on secure, private infrastructure for total data sovereignty.", 
          icon: Cloud 
        },
        { 
          title: "Quantization for Speed", 
          desc: "Optimizing model size (4-bit/8-bit) for high-speed inference without sacrificing intellectual depth.", 
          icon: Zap 
        },
        { 
          title: "Model Alignment (RLHF)", 
          desc: "Aligning model outputs with human preferences and organizational safety standards via feedback loops.", 
          icon: UserCheck 
        }
      ]
    }
  ],

  features: [
    { 
      title: "Private & Secure", 
      desc: "No data leakage to public models. Total privacy with secure API wrappers and private VPC options.", 
      icon: Lock 
    },
    { 
      title: "Hallucination Free", 
      desc: "Rigorous RAG grounding and fact-checking layers ensure outputs are accurate and trustworthy.", 
      icon: CheckCircle2 
    },
    { 
      title: "High Velocity", 
      desc: "Fast-track from prototype to industrial-scale production in weeks, not months.", 
      icon: Rocket 
    },
    { 
      title: "Brand Alignment", 
      desc: "Custom instructions and fine-tuning that strictly preserve your unique brand voice.", 
      icon: Award 
    },
    { 
      title: "Industrial Scale", 
      desc: "Infrastructure built to handle millions of tokens with enterprise reliability and uptime.", 
      icon: Server 
    },
    { 
      title: "Mission-Critical Safety", 
      desc: "Guardrails and safety constraints baked into every layer of the AI stack.", 
      icon: ShieldCheck 
    }
  ],

  cta: {
    title: "Think Beyond the Prompt.",
    text: "1TecHub builds the infrastructure that makes Gen AI enterprise-ready. We bridge the gap between creative prompts and industrial-scale production, ensuring safety, reliability, and precision for your mission-critical applications.",
    buttonText: "Build Enterprise GenAI"
  }
  },

 {
    id: "advanced-machine-learning",
    slug: "advanced-machine-learning",
    title: "Advanced Machine Learning",
  hero: {
    title: "Advanced Machine Learning.",
    description: "Predictive Modeling. Pattern Recognition. MLOps & Scaling. We build sophisticated models that evolve and improve over time. From statistical modeling to full-scale MLOps, 1TecHub ensures your ML initiatives are robust, scalable production systems that drive significant ROI.",
    backgroundImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop" // Data Analytics / Financial Graph
  },
  
  sections: [
    {
      id: "predictive-analytics",
      title: "Predictive Analytics",
      icon: TrendingUp,
      cards: [
        { 
          title: "Demand & Sales Forecasting", 
          desc: "High-precision time-series models that predict future inventory needs and revenue streams.", 
          icon: LineChart 
        },
        { 
          title: "Customer Churn Prediction", 
          desc: "Identifying at-risk segments before they leave using behavioral analysis and intent mapping.", 
          icon: Users 
        },
        { 
          title: "Lead Scoring Engines", 
          desc: "Automated prioritization of high-value prospects based on historical conversion patterns.", 
          icon: Star 
        },
        { 
          title: "Predictive Maintenance", 
          desc: "Using sensor data and log files to anticipate equipment failure before it causes downtime.", 
          icon: AlertCircle 
        },
        { 
          title: "Financial Risk Modeling", 
          desc: "Complex statistical simulations to assess credit risk and market volatility in real-time.", 
          icon: Activity 
        },
        { 
          title: "Price Optimization", 
          desc: "Dynamic pricing models that adjust automatically based on demand, competition, and marginal cost.", 
          icon: DollarSign 
        }
      ]
    },
    {
      id: "pattern-recognition",
      title: "Pattern Recognition",
      icon: Eye,
      cards: [
        { 
          title: "Fraud Detection Systems", 
          desc: "Identifying anomalous transaction patterns in real-time to prevent financial leakage.", 
          icon: ShieldAlert 
        },
        { 
          title: "Object & Signal Classification", 
          desc: "Deep learning models that categorize images, audio, and sensor signals with human-level accuracy.", 
          icon: Scan 
        },
        { 
          title: "Behavioral Discovery", 
          desc: "Unsupervised learning to find hidden clusters of users with similar traits and needs.", 
          icon: Search 
        },
        { 
          title: "Anomaly Detection", 
          desc: "Automated spotting of outliers in network logs, industrial pipelines, or financial reports.", 
          icon: AlertTriangle 
        },
        { 
          title: "Trend Trajectory Analysis", 
          desc: "Mapping the evolution of market movements through high-frequency data pattern analysis.", 
          icon: TrendingUp 
        },
        { 
          title: "Signature Identification", 
          desc: "Precise matching of digital or biological signatures for secure access and verification.", 
          icon: Fingerprint 
        }
      ]
    },
    {
      id: "mlops-scaling",
      title: "MLOps & Model Management",
      icon: Server,
      cards: [
        { 
          title: "Automated ML Pipelines", 
          desc: "End-to-end CI/CD for machine learning, from data ingestion to containerized deployment.", 
          icon: GitBranch 
        },
        { 
          title: "Model Metadata Tracking", 
          desc: "Immutable version control for datasets, experiments, and production weights.", 
          icon: Database 
        },
        { 
          title: "Drift Detection Systems", 
          desc: "Real-time monitoring that alerts engineers when production data diverges from training patterns.", 
          icon: Activity 
        },
        { 
          title: "Scalable Inference Nodes", 
          desc: "Orchestrating GPU and CPU clusters to handle high-concurrency model requests.", 
          icon: Cpu 
        },
        { 
          title: "Automated Retraining", 
          desc: "Closed-loop systems that periodically refresh models based on the latest ground-truth data.", 
          icon: RefreshCw 
        },
        { 
          title: "Resource Orchestration", 
          desc: "Efficient allocation of compute resources using Kubernetes and advanced sharding logic.", 
          icon: Settings 
        }
      ]
    },
    {
      id: "statistical-modeling",
      title: "Statistical Modeling",
      icon: Calculator,
      cards: [
        { 
          title: "Bayesian Inference", 
          desc: "Probabilistic modeling that updates beliefs with new evidence for robust decision making.", 
          icon: BarChart 
        },
        { 
          title: "A/B Testing Frameworks", 
          desc: "Mathematically rigorous experimentation layers to prove feature impact and ROI.", 
          icon: FlaskConical 
        },
        { 
          title: "Multivariate Regression", 
          desc: "Deep analysis of how multiple independent variables influence critical business outcomes.", 
          icon: PieChart 
        },
        { 
          title: "Causal Inference", 
          desc: "Moving beyond correlation to understand the 'why' behind data shifts and market changes.", 
          icon: GitMerge 
        },
        { 
          title: "Time Series Decomposition", 
          desc: "Breaking down data into trend, seasonality, and noise for precise historical analysis.", 
          icon: Clock 
        },
        { 
          title: "Experimental Design", 
          desc: "Crafting structured data collection plans to ensure statistical significance in every trial.", 
          icon: FileText 
        }
      ]
    }
  ],

  features: [
    { 
      title: "Production First", 
      desc: "We build models intended for the real world, not the lab. Focused on reliability and uptime.", 
      icon: Server 
    },
    { 
      title: "High Precision", 
      desc: "Rigorous validation workflows to ensure 95%+ accuracy in core business tasks.", 
      icon: CheckCircle2 
    },
    { 
      title: "Elastic Scaling", 
      desc: "Infrastructure that grows automatically with your inference needs to handle demand spikes.", 
      icon: Cloud 
    },
    { 
      title: "Explainable ML", 
      desc: "No black boxes. We provide the 'why' behind every prediction for transparency and trust.", 
      icon: Eye 
    },
    { 
      title: "Prescriptive Intelligence", 
      desc: "Going beyond prediction to prescribe optimal actions for business outcomes.", 
      icon: Lightbulb 
    },
    { 
      title: "Continuous ROI", 
      desc: "Systems designed to drive significant Return on Investment through automated efficiency.", 
      icon: TrendingUp 
    }
  ],

  cta: {
    title: "Transform Data into Foreknowledge.",
    text: "Machine Learning at 1TecHub is about building systems that don't just react—they anticipate. We leverage the full spectrum of modern ML architectures to convert your raw historical data into a continuous competitive advantage.",
    buttonText: "Start Your ML Journey"
  }
 },

{
    id: "data-science-analytics-big-data",
    slug: "data-science-analytics-big-data",
    title: "Data Science, Analytics & Big Data",
  hero: {
    title: "Data Science, Analytics & Big Data.",
    description: "Big Data Infra. Real-time Analytics. Insight Generation. In the age of AI, data is the most valuable asset. We turn raw information into strategic intelligence, building the massive infrastructure needed to handle modern data loads and finding the 'why' behind the numbers.",
    backgroundImage: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=2000&auto=format&fit=crop" // Abstract Data / Network Nodes
  },
  
  sections: [
    {
      id: "big-data-infra",
      title: "Big Data Infrastructure",
      icon: Database,
      cards: [
        { 
          title: "Data Lake & Warehouse", 
          desc: "Architecting scalable storage solutions using Snowflake, Redshift, or BigQuery for enterprise datasets.", 
          icon: Database 
        },
        { 
          title: "Cloud Data Migrations", 
          desc: "Zero-downtime transition of legacy on-premise databases to high-performance cloud environments.", 
          icon: Cloud 
        },
        { 
          title: "Distributed Compute", 
          desc: "Implementing Spark and Flink clusters for parallel processing of petabyte-scale data flows.", 
          icon: Server 
        },
        { 
          title: "Pipeline Orchestration", 
          desc: "Automated workflow management using Airflow or Prefect to ensure data readiness and quality.", 
          icon: Workflow 
        },
        { 
          title: "Petabyte-Scale Optimization", 
          desc: "Intelligent partitioning and indexing strategies to maintain sub-second query performance at scale.", 
          icon: HardDrive 
        },
        { 
          title: "Multi-Cloud Architectures", 
          desc: "Designing redundant, vendor-agnostic data foundations across AWS, Azure, and Google Cloud.", 
          icon: Globe 
        }
      ]
    },
    {
      id: "real-time-analytics",
      title: "Real-time Analytics",
      icon: Activity,
      cards: [
        { 
          title: "Kafka & Event Streaming", 
          desc: "Building high-throughput message buses for millisecond-latency data transportation.", 
          icon: Activity 
        },
        { 
          title: "Live Monitoring Dashboards", 
          desc: "Real-time visual interfaces that update instantly as operational data flows into the system.", 
          icon: Monitor 
        },
        { 
          title: "Streaming Governance", 
          desc: "Applying strict quality and compliance checks to data as it moves through the pipeline.", 
          icon: ShieldCheck 
        },
        { 
          title: "Low-Latency Ingestion", 
          desc: "Optimizing the 'edge-to-insight' path for instant response to market or user events.", 
          icon: Zap 
        },
        { 
          title: "Real-time Anomaly Detection", 
          desc: "Autonomous AI layers that flag irregularities in streaming data before they impact the business.", 
          icon: AlertTriangle 
        },
        { 
          title: "Live Aggregation Engines", 
          desc: "Continuous computation of KPIs and metrics as new data points are ingested.", 
          icon: Calculator 
        }
      ]
    },
    {
      id: "data-visualization",
      title: "Data Visualization",
      icon: PieChart,
      cards: [
        { 
          title: "Custom BI Dashboards", 
          desc: "Tailored visual command centers that translate complex data into clear, actionable executive insights.", 
          icon: Layout 
        },
        { 
          title: "Geospatial & Heat Mapping", 
          desc: "Multi-dimensional territory analysis to visualize business performance across space and time.", 
          icon: Map 
        },
        { 
          title: "Interactive Storytelling", 
          desc: "Dynamic reports that allow users to drill down from high-level trends to individual data points.", 
          icon: BookOpen 
        },
        { 
          title: "Executive Reporting Systems", 
          desc: "Automated, high-fidelity visual summaries delivered to stakeholders in real-time.", 
          icon: FileText 
        },
        { 
          title: "Real-time Data UI", 
          desc: "Lightweight, reactive front-end modules for embedding live intelligence into any application.", 
          icon: Box 
        },
        { 
          title: "3D & Predictive Visuals", 
          desc: "Advanced visualization of future trajectories and complex relationship networks.", 
          icon: TrendingUp 
        }
      ]
    },
    {
      id: "insight-generation",
      title: "Insight Generation",
      icon: Lightbulb,
      cards: [
        { 
          title: "KPI Discovery & Definition", 
          desc: "Identifying the core metrics that truly drive business value in your specific industry.", 
          icon: Search 
        },
        { 
          title: "Root Cause Identification", 
          desc: "Automated deep-dives to understand the 'why' behind performance shifts and market trends.", 
          icon: AlertCircle 
        },
        { 
          title: "Strategic Growth Mapping", 
          desc: "Using historical and comparative data to identify untapped revenue opportunities.", 
          icon: TrendingUp 
        },
        { 
          title: "Automated Report Synthesis", 
          desc: "AI-powered generation of qualitative summaries based on quantitative data shifts.", 
          icon: FileText 
        },
        { 
          title: "Exploratory Data Analysis", 
          desc: "Deep mathematical investigation to uncover hidden correlations and statistical anomalies.", 
          icon: ZoomIn 
        },
        { 
          title: "Actionable Recommendations", 
          desc: "Converting raw intelligence into specific, prioritized tasks for business leaders.", 
          icon: CheckCircle2 
        }
      ]
    }
  ],

  features: [
    { 
      title: "Petabyte Scale", 
      desc: "Built to handle the world's most massive datasets with ease, scalability, and robust performance.", 
      icon: Database 
    },
    { 
      title: "Sub-Second Latency", 
      desc: "Real-time responses for real-time business decisions, powered by optimized ingestion paths.", 
      icon: Zap 
    },
    { 
      title: "Deep Governance", 
      desc: "Strict adherence to SOC2, GDPR, and global privacy standards at every stage of the pipeline.", 
      icon: ShieldCheck 
    },
    { 
      title: "Visual Clarity", 
      desc: "Transforming immense complexity into intuitive, actionable visuals for every stakeholder.", 
      icon: Eye 
    },
    { 
      title: "Strategic Intelligence", 
      desc: "Moving beyond raw numbers to provide the strategic 'why' that drives business growth.", 
      icon: Lightbulb 
    },
    { 
      title: "Industrial-Grade Infra", 
      desc: "Infrastructure built for high availability, redundancy, and mission-critical reliability.", 
      icon: Server 
    }
  ],

  cta: {
    title: "Data is Fuel. Insight is Power.",
    text: "At 1TecHub, we don't just store your data—we liberate its value. Our data science teams build the industrial-grade infrastructure and visual intelligence layers that turn massive datasets into your most significant competitive asset.",
    buttonText: "Unlock Your Data"
  }
},

{
    id: "natural-language-processing",
    slug: "natural-language-processing",
    title: "Natural Language Processing",
  hero: {
    title: "Natural Language Processing.",
    description: "Semantic Analysis. Multilingual Text. Automated Summaries. We leverage the world's most advanced language models to build systems that interpret meaning, emotion, and intent—providing a bridge between massive unstructured data and actionable business strategy.",
    backgroundImage: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2000&auto=format&fit=crop" // Education / Text / Letters / Abstract
  },
  
  sections: [
    {
      id: "sentiment-analysis",
      title: "Sentiment Analysis",
      icon: Heart,
      cards: [
        { 
          title: "Emotional Intensity Scoring", 
          desc: "Beyond positive/negative; quantifying the depth of anger, joy, or frustration in customer voices.", 
          icon: Activity 
        },
        { 
          title: "Brand Health Tracking", 
          desc: "Continuous monitoring of brand sentiment trends across social media and public forums.", 
          icon: TrendingUp 
        },
        { 
          title: "Real-time Crisis Detection", 
          desc: "Autonomous alerts when negative sentiment spikes, allowing for immediate PR response.", 
          icon: AlertTriangle 
        },
        { 
          title: "Aspect-Based Sentiment", 
          desc: "Pinpointing exactly which product features or services are driving customer emotions.", 
          icon: Layers 
        },
        { 
          title: "Multilingual Sentiment", 
          desc: "Analyzing emotions across 100+ languages with native cultural context awareness.", 
          icon: Globe 
        },
        { 
          title: "Predictive Churn Signals", 
          desc: "Identifying subtle shifts in tone that correlate with future customer attrition.", 
          icon: Users 
        }
      ]
    },
    {
      id: "language-translation",
      title: "Language Translation",
      icon: Globe,
      cards: [
        { 
          title: "Context-Aware Translation", 
          desc: "Maintaining semantic meaning and industry-specific terminology across 100+ languages.", 
          icon: BookOpen 
        },
        { 
          title: "Real-time Chat Localization", 
          desc: "Zero-latency translation for global support centers and cross-border communication.", 
          icon: MessageSquare 
        },
        { 
          title: "Legal & Technical Translation", 
          desc: "High-precision models trained on specialized corpora for zero-error documentation.", 
          icon: Scale 
        },
        { 
          title: "Dialect & Nuance Mapping", 
          desc: "Adapting content to local dialects and cultural idioms to ensure brand resonance.", 
          icon: Map 
        },
        { 
          title: "Automated Glossary Sync", 
          desc: "Ensuring brand-specific terms are translated consistently across all corporate outputs.", 
          icon: RefreshCw 
        },
        { 
          title: "Cross-Lingual Retrieval", 
          desc: "Search and retrieve documents in any language, regardless of the input query language.", 
          icon: Search 
        }
      ]
    },
    {
      id: "text-extraction",
      title: "Extraction & Summarization",
      icon: FileText,
      cards: [
        { 
          title: "Abstractive Summarization", 
          desc: "AI that 're-writes' long documents into concise, human-readable executive summaries.", 
          icon: Edit3 
        },
        { 
          title: "Knowledge Relation Mapping", 
          desc: "Extracting complex relationships between entities found in unstructured text data.", 
          icon: Share2 
        },
        { 
          title: "Automated Meeting Minutes", 
          desc: "Condensing hours of audio/text transcripts into actionable tasks and key decisions.", 
          icon: List 
        },
        { 
          title: "Legal Clause Analysis", 
          desc: "Rapid identification and summary of critical terms and risks within massive contract sets.", 
          icon: Scale 
        },
        { 
          title: "Dark Data Liberation", 
          desc: "Converting scans and PDFs into structured, queryable data for business intelligence.", 
          icon: Database 
        },
        { 
          title: "Key Point Extraction", 
          desc: "Bullet-point generation of the 'most important' facts from any length of text.", 
          icon: CheckCircle2 
        }
      ]
    },
    {
      id: "semantic-search",
      title: "Semantic Search",
      icon: Search,
      cards: [
        { 
          title: "Intent-Aware Querying", 
          desc: "Search systems that provide results based on what the user 'means', not what they typed.", 
          icon: Brain 
        },
        { 
          title: "Vector-Based Indexing", 
          desc: "High-performance semantic retrieval using state-of-the-art embedding models.", 
          icon: Database 
        },
        { 
          title: "Natural Language SQL", 
          desc: "Allowing non-technical users to query databases using plain English conversational inputs.", 
          icon: Code 
        },
        { 
          title: "Concept Recommender", 
          desc: "Suggesting related documents and ideas based on semantic similarity, not tags.", 
          icon: Sparkles 
        },
        { 
          title: "Multilingual Discovery", 
          desc: "Unified search across all corporate languages with consistent relevance scoring.", 
          icon: Globe 
        },
        { 
          title: "Content Filtering", 
          desc: "Intelligent moderation and categorization of user-generated content in real-time.", 
          icon: Filter 
        }
      ]
    }
  ],

  features: [
    { 
      title: "Global Ready", 
      desc: "Native support for 100+ languages and localized dialects, ensuring true global reach.", 
      icon: Globe 
    },
    { 
      title: "Semantic Depth", 
      desc: "Going beyond keywords to true contextual understanding of human emotion and intent.", 
      icon: Brain 
    },
    { 
      title: "Industrial Speed", 
      desc: "Millisecond inference for real-time applications, enabling instant customer response.", 
      icon: Zap 
    },
    { 
      title: "Zero Data Leak", 
      desc: "Total privacy for your sensitive enterprise communications with secure processing layers.", 
      icon: Lock 
    },
    { 
      title: "Human-Like Understanding", 
      desc: "Bringing human-level nuance to digital interfaces for sophisticated text interpretation.", 
      icon: UserCheck 
    },
    { 
      title: "Actionable Strategy", 
      desc: "Bridging the gap between massive unstructured data and clear business decision-making.", 
      icon: TrendingUp 
    }
  ],

  cta: {
    title: "Decode. Understand. Scale.",
    text: "NLP at 1TecHub is about more than just reading words—it's about understanding human intent at an industrial scale. We provide the linguistic intelligence layers that allow your enterprise to process unstructured data with total clarity.",
    buttonText: "Unlock Linguistic Intelligence"
  }
},

{
    id: "conversational-voice-ai",
    slug: "conversational-voice-ai",
    title: "Conversational Voice AI",
  hero: {
    title: "Conversational Voice AI.",
    description: "Speech-To-Text. Natural TTS. Global Voice. We bridge the gap between human speech and digital execution. From hands-free industrial solutions to global customer support, 1TecHub implements high-precision STT and hyper-realistic TTS for interactions that are natural, clear, and contextually aware.",
    backgroundImage: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=2000&auto=format&fit=crop" // Sound Wave / Microphone / Audio visualization
  },
  
  sections: [
    {
      id: "speech-to-text",
      title: "Speech-To-Text (STT)",
      icon: Mic,
      cards: [
        { 
          title: "Real-time Neural Transcription", 
          desc: "Ultra-low latency audio-to-text conversion using state-of-the-art transformer models.", 
          icon: Zap 
        },
        { 
          title: "Multi-Dialect Recognition", 
          desc: "High-accuracy support for diverse accents and localized dialects across the global landscape.", 
          icon: Globe 
        },
        { 
          title: "Domainized Vocabulary", 
          desc: "Customizing STT engines to recognize industry-specific jargon and technical terminology.", 
          icon: BookOpen 
        },
        { 
          title: "Noise-Resilient Processing", 
          desc: "Advanced acoustic modeling that maintains accuracy in crowded or industrial environments.", 
          icon: Activity 
        },
        { 
          title: "Speaker Diarization", 
          desc: "Automatically identifying and labeling different speakers within a multi-person conversation.", 
          icon: Users 
        },
        { 
          title: "Automated Timestamping", 
          desc: "Precise word-level timing for accurate meeting logs and video subtitling.", 
          icon: Clock 
        }
      ]
    },
    {
      id: "text-to-speech",
      title: "Text-To-Speech (TTS)",
      icon: Volume2,
      cards: [
        { 
          title: "Emotional Prosody Synthesis", 
          desc: "Generating voices that convey human-like warmth, urgency, or professionalism based on context.", 
          icon: Heart 
        },
        { 
          title: "High-Fidelity Voice Cloning", 
          desc: "Safe and secure creation of unique brand-specific voices with just minutes of target audio.", 
          icon: Mic2 
        },
        { 
          title: "Dynamic Speed & Pitch", 
          desc: "Fine-tuning verbal delivery to match the pacing requirements of any interactive system.", 
          icon: Sliders 
        },
        { 
          title: "Custom Pronunciation", 
          desc: "Ensuring proper names and brand-specific terms are spoken perfectly every time.", 
          icon: CheckCircle2 
        },
        { 
          title: "Low-Footprint Edge TTS", 
          desc: "High-quality speech synthesis that runs locally on devices without requiring cloud access.", 
          icon: Smartphone 
        },
        { 
          title: "Long-Form Audio Generation", 
          desc: "Optimized pipelines for generating hours of consistent, flicker-free audio content.", 
          icon: Music 
        }
      ]
    },
    {
      id: "voice-assistants",
      title: "Voice Assistants",
      icon: Headphones,
      cards: [
        { 
          title: "Multi-Turn Conversation", 
          desc: "Maintaining context across complex, audible interactions to solve multi-step user goals.", 
          icon: MessageSquare 
        },
        { 
          title: "Intelligent IVR", 
          desc: "Modernizing phone systems with reasoning-capable agents that understand natural intent.", 
          icon: Phone 
        },
        { 
          title: "Hands-Free Control Logic", 
          desc: "Designing secure, voice-activated interfaces for industrial and consumer smart environments.", 
          icon: Command 
        },
        { 
          title: "Edge Voice Processing", 
          desc: "Secure, local processing of 'wake words' and core commands for total user privacy.", 
          icon: Shield 
        },
        { 
          title: "Intent Collision Arbitration", 
          desc: "Intelligent logic to resolve ambiguity when users provide complex or conflicting commands.", 
          icon: AlertTriangle 
        },
        { 
          title: "Continuous Learning Loop", 
          desc: "Improving assistant accuracy based on real-world interactions and human-guided feedback.", 
          icon: RefreshCw 
        }
      ]
    },
    {
      id: "multilingual-voice",
      title: "Multilingual Voice Systems",
      icon: Globe,
      cards: [
        { 
          title: "Simultaneous Translation", 
          desc: "Hear the speaker's intent in a different language with near-zero perceptual delay.", 
          icon: RefreshCcw 
        },
        { 
          title: "Cultural Voice Adaptation", 
          desc: "Designing artificial voices that resonate with the cultural norms of specific global regions.", 
          icon: UserCheck 
        },
        { 
          title: "Language-Agnostic STT", 
          desc: "A single model capable of transcribing dozens of languages without manual switching.", 
          icon: Layers 
        },
        { 
          title: "Code-Switching Support", 
          desc: "Native handling of conversations that fluidly alternate between multiple languages.", 
          icon: Shuffle 
        },
        { 
          title: "Global Accent Distribution", 
          desc: "Localized STT/TTS nodes to ensure low-latency performance in every continent.", 
          icon: Server 
        },
        { 
          title: "Universal Semantic Mapping", 
          desc: "Translating vocal intent into a unified data structure across all corporate languages.", 
          icon: Database 
        }
      ]
    }
  ],

  features: [
    { 
      title: "Indistinguishable", 
      desc: "Neural TTS that rivals human vocal quality and warmth, moving beyond robotic greetings.", 
      icon: UserCheck 
    },
    { 
      title: "Ultra Low Latency", 
      desc: "Real-time responses under 500ms for natural conversational flow and interaction.", 
      icon: Zap 
    },
    { 
      title: "Truly Global", 
      desc: "Support for 100+ languages and 85+ localized accents for total global reach.", 
      icon: Globe 
    },
    { 
      title: "Secure & Private", 
      desc: "Edge processing options available for mission-critical privacy and local execution.", 
      icon: Lock 
    },
    { 
      title: "Empathetic Systems", 
      desc: "Creating natural-sounding systems that allow your enterprise to communicate at a human level.", 
      icon: Heart 
    },
    { 
      title: "High Precision", 
      desc: "Bridging the gap between human speech and digital execution with exacting accuracy.", 
      icon: Target 
    }
  ],

  cta: {
    title: "Voice is the New Interface.",
    text: "1TecHub builds the next generation of audible intelligence. We move beyond robotic greetings to create truly empathetic, natural-sounding voice systems that allow your enterprise to communicate with the world at a human level.",
    buttonText: "Amplify Your Voice"
  }
},

{
    id: "software-development",
    slug: "software-development",
    title: "Software Development",
  hero: {
    title: "End-to-End Software Development.",
    description: "AI-Integrated Apps. Scalable Backend. Modern Tech Stack. We combine traditional product engineering with cutting-edge AI integration. From mobile apps with integrated voice assistants to massive SaaS platforms, we deliver the digital infrastructure your enterprise needs to win in the AI era.",
    backgroundImage: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=2000&auto=format&fit=crop" // Coding / Developer Monitor
  },
  
  sections: [
    {
      id: "ai-integrated-apps",
      title: "AI-Integrated App Development",
      icon: Smartphone,
      cards: [
        { 
          title: "Native Agent Embedding", 
          desc: "Building apps with autonomous 'brain' modules that can think, reason, and act within the UI.", 
          icon: BrainCircuit 
        },
        { 
          title: "Personalized UX Engines", 
          desc: "UI components that dynamically adapt based on individual user behavior and preferences.", 
          icon: UserCheck 
        },
        { 
          title: "Intelligent Search", 
          desc: "Semantic, intent-aware search capabilities that help users find exactly what they need instantly.", 
          icon: Search 
        },
        { 
          title: "Automated Content Sourcing", 
          desc: "AI-driven pipelines for generating and retrieving relevant media and text for your users.", 
          icon: Database 
        },
        { 
          title: "Predictive UI Components", 
          desc: "Predicting the user's next action to pre-load data and provide a zero-latency experience.", 
          icon: Zap 
        },
        { 
          title: "Privacy-First AI Ops", 
          desc: "Ensuring all integrated AI features adhere to the highest standards of data security and privacy.", 
          icon: Lock 
        }
      ]
    },
    {
      id: "intelligent-saas",
      title: "Intelligent SaaS Solutions",
      icon: Cloud,
      cards: [
        { 
          title: "Multi-Tenant Architecture", 
          desc: "Robust, scalable foundations designed to serve thousands of organizations with data isolation.", 
          icon: Layers 
        },
        { 
          title: "Autonomous Backend Tasks", 
          desc: "Offloading complex processing to background agents that operate 24/7 without intervention.", 
          icon: Settings 
        },
        { 
          title: "Data-Driven User Insights", 
          desc: "Providing SaaS owners with deep, AI-generated analytics on user churn and feature adoption.", 
          icon: Activity 
        },
        { 
          title: "Scalable Cloud Orchestration", 
          desc: "Elastic infrastructure that automatically scales compute resources based on tenant load.", 
          icon: Server 
        },
        { 
          title: "Unified Integration Layers", 
          desc: "Flexible API-first design that allows your SaaS to talk to every major enterprise tool.", 
          icon: Share2 
        },
        { 
          title: "Smart Billing & Provisioning", 
          desc: "Automated management of subscriptions, usage tracking, and multi-tier access control.", 
          icon: CreditCard 
        }
      ]
    },
    {
      id: "modern-stack",
      title: "Modern Stack Development",
      icon: Code,
      cards: [
        { 
          title: "Next.js & React Specialists", 
          desc: "Building lightning-fast, SEO-optimized frontends that provide a premium user experience.", 
          icon: Layout 
        },
        { 
          title: "Go & Node.js Backend Engines", 
          desc: "High-concurrency, low-latency server-side logic designed for high-traffic environments.", 
          icon: Cpu 
        },
        { 
          title: "Cloud-Native Deployments", 
          desc: "Leveraging serverless and containerized environments for maximum resilience and speed.", 
          icon: Cloud 
        },
        { 
          title: "Headless CMS Integration", 
          desc: "Decoupled content management systems for total frontend flexibility and developer velocity.", 
          icon: Database 
        },
        { 
          title: "High-Availability System", 
          desc: "Redundant, multi-region architectures that ensure 99.999% uptime for global applications.", 
          icon: Globe 
        },
        { 
          title: "TypeScript Core Engineering", 
          desc: "Using strict type-safety to prevent runtime errors and ensure long-term code maintainability.", 
          icon: Code 
        }
      ]
    },
    {
      id: "product-engineering",
      title: "Product Engineering",
      icon: Rocket,
      cards: [
        { 
          title: "MVP & Rapid Prototyping", 
          desc: "Moving from initial concept to a functional, market-ready pilot in as little as 2-4 weeks.", 
          icon: Zap 
        },
        { 
          title: "Full-Cycle Product Management", 
          desc: "Strategic guidance from initial ideation through to global scale and market leadership.", 
          icon: Briefcase 
        },
        { 
          title: "QA Automation", 
          desc: "AI-driven testing suites that detect regressions and security flaws before every release.", 
          icon: CheckCircle2 
        },
        { 
          title: "Performance Optimization", 
          desc: "Deep-dive analysis of application bottlenecks to ensure the fastest possible user experience.", 
          icon: TrendingUp 
        },
        { 
          title: "Continuous Delivery (CI/CD)", 
          desc: "Automated deployment pipelines that allow for safe, multiple-times-a-day code releases.", 
          icon: GitBranch 
        },
        { 
          title: "Technical Debt Auditing", 
          desc: "Constant monitoring of code health to ensure your product remains agile and scalable.", 
          icon: AlertTriangle 
        }
      ]
    }
  ],

  features: [
    { 
      title: "AI-Native Stack", 
      desc: "Designed from the foundation to integrate reasoning and autonomy, not just basic logic.", 
      icon: BrainCircuit 
    },
    { 
      title: "High Velocity", 
      desc: "Accelerated development cycles using AI-assisted engineering for faster time-to-market.", 
      icon: Zap 
    },
    { 
      title: "Global Scaling", 
      desc: "Cloud-native architectures built to handle millions of concurrent users with ease.", 
      icon: Globe 
    },
    { 
      title: "Uncompromising Quality", 
      desc: "Automated QA and security auditing integrated at every single stage of the lifecycle.", 
      icon: ShieldCheck 
    },
    { 
      title: "Full-Stack Excellence", 
      desc: "Combining deep backend expertise with premium frontend design for complete solutions.", 
      icon: Layers 
    },
    { 
      title: "Intelligent Platforms", 
      desc: "Engineering the next generation of software that thinks, adapts, and evolves.", 
      icon: Lightbulb 
    }
  ],

  cta: {
    title: "We Code with Intelligence.",
    text: "Software development at 1TecHub is about more than just writing code—it's about engineering the next generation of intelligent platforms. We combine full-stack excellence with AI-native methodologies to build products that lead.",
    buttonText: "Build Your Platform"
  }
},
];

// Helper function to get service data by ID
export const getServiceById = (serviceId) => {
    console.log(serviceId);
  return allServicesData.find(service => service.id === serviceId || service.slug === serviceId);
};

// Helper function to get all services
export const getAllServices = () => {
  return allServicesData;
};

// Helper function to get service titles for navigation
export const getServiceTitles = () => {
  return allServicesData.map(service => ({
    id: service.id,
    slug: service.slug,
    title: service.title
  }));
};

export default allServicesData;
