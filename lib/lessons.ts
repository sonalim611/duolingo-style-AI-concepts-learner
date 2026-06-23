import { Lesson } from "./types";

export const LESSONS: Lesson[] = [
  {
    id: "intro-to-ai",
    title: "What is AI?",
    description: "Discover what artificial intelligence really means and where you see it every day.",
    unit: 1,
    order: 1,
    icon: "🤖",
    estimatedMinutes: 5,
    sections: [
      {
        title: "AI in Everyday Life",
        content:
          "Artificial Intelligence (AI) is technology that lets computers perform tasks that usually need human intelligence — like recognizing faces, understanding speech, or recommending videos.\n\nYou already use AI dozens of times a day: spam filters, autocorrect, Netflix suggestions, and voice assistants like Siri or Alexa all rely on AI.",
      },
      {
        title: "How AI Differs from Traditional Software",
        content:
          "Traditional software follows fixed rules written by programmers. AI systems learn patterns from data instead of following step-by-step instructions for every situation.\n\nThink of it like teaching vs. programming: you show AI thousands of examples, and it figures out the patterns on its own.",
      },
      {
        title: "Types of AI",
        content:
          "Narrow AI handles specific tasks (chess, translation, image recognition). This is what exists today.\n\nGeneral AI — machines as capable as humans at any intellectual task — remains theoretical. Every AI product you use today is narrow AI, and that's already incredibly powerful.",
      },
    ],
    quiz: [
      {
        id: "intro-q1",
        question: "Which best describes Artificial Intelligence?",
        options: [
          "Fixed rules programmed for every situation",
          "Technology that learns patterns from data",
          "Only robots that look like humans",
          "A type of computer virus",
        ],
        correctIndex: 1,
        explanation: "AI learns patterns from data rather than following only pre-written rules.",
      },
      {
        id: "intro-q2",
        question: "Which is an example of AI you might use daily?",
        options: [
          "A basic calculator",
          "A mechanical clock",
          "Netflix recommendations",
          "A light switch",
        ],
        correctIndex: 2,
        explanation: "Recommendation systems use AI to predict what you might enjoy watching.",
      },
      {
        id: "intro-q3",
        question: "What type of AI exists today?",
        options: [
          "General AI that can do anything humans can",
          "Narrow AI for specific tasks",
          "Conscious AI with emotions",
          "No AI exists yet",
        ],
        correctIndex: 1,
        explanation: "All current AI is narrow AI — specialized for particular tasks.",
      },
    ],
  },
  {
    id: "machine-learning",
    title: "Machine Learning Basics",
    description: "Learn how machines learn from examples without explicit programming.",
    unit: 1,
    order: 2,
    icon: "📊",
    estimatedMinutes: 6,
    sections: [
      {
        title: "Learning from Data",
        content:
          "Machine Learning (ML) is a subset of AI where algorithms improve by finding patterns in data. Instead of telling a computer every rule, you give it examples.\n\nShow a model 10,000 photos labeled 'cat' or 'not cat,' and it learns to recognize cats in new photos it's never seen before.",
      },
      {
        title: "Three Types of Learning",
        content:
          "Supervised learning uses labeled examples (input + correct answer). Unsupervised learning finds hidden patterns without labels. Reinforcement learning learns through trial and error with rewards.\n\nMost apps you use rely on supervised learning — think email spam detection trained on emails marked spam or not spam.",
      },
      {
        title: "Training vs. Inference",
        content:
          "Training is the expensive phase where a model learns from huge datasets (can take days on powerful GPUs). Inference is when the trained model makes predictions on new data — this happens in milliseconds on your phone.\n\nWhen ChatGPT responds to you, that's inference. The training already happened behind the scenes.",
      },
    ],
    quiz: [
      {
        id: "ml-q1",
        question: "What does machine learning primarily use to improve?",
        options: ["Random guesses", "Patterns in data", "Human emotions", "Fixed lookup tables"],
        correctIndex: 1,
        explanation: "ML algorithms discover patterns in training data to make better predictions.",
      },
      {
        id: "ml-q2",
        question: "Spam email detection is typically an example of:",
        options: [
          "Unsupervised learning",
          "Reinforcement learning",
          "Supervised learning",
          "No machine learning",
        ],
        correctIndex: 2,
        explanation: "Spam filters learn from emails labeled as spam or not spam — labeled examples.",
      },
      {
        id: "ml-q3",
        question: "When ChatGPT answers your question, that is called:",
        options: ["Training", "Inference", "Labeling", "Clustering"],
        correctIndex: 1,
        explanation: "Inference is using a trained model to generate outputs for new inputs.",
      },
    ],
  },
  {
    id: "neural-networks",
    title: "Neural Networks",
    description: "Understand the brain-inspired architecture behind modern AI.",
    unit: 2,
    order: 1,
    icon: "🧠",
    estimatedMinutes: 7,
    sections: [
      {
        title: "Inspired by the Brain",
        content:
          "Neural networks are computing systems loosely modeled on biological neurons. They consist of layers of connected nodes (neurons) that process information.\n\nEach connection has a weight that adjusts during training — strengthening useful pathways and weakening unhelpful ones.",
      },
      {
        title: "How Layers Work",
        content:
          "Input layer receives raw data (pixels, words, numbers). Hidden layers extract increasingly abstract features. Output layer produces the final prediction.\n\nIn image recognition, early layers might detect edges, middle layers detect shapes, and later layers recognize full objects like faces or cars.",
      },
      {
        title: "Deep Learning",
        content:
          "When neural networks have many hidden layers, we call it deep learning. More layers let the model learn more complex patterns.\n\nDeep learning powers breakthroughs in vision, speech, and language — but it requires massive data and computing power to train effectively.",
      },
    ],
    quiz: [
      {
        id: "nn-q1",
        question: "Neural networks are loosely inspired by:",
        options: ["Computer circuits", "Biological neurons", "Solar systems", "Library catalogs"],
        correctIndex: 1,
        explanation: "Neural networks mimic the interconnected neuron structure of brains.",
      },
      {
        id: "nn-q2",
        question: "What adjusts during neural network training?",
        options: ["Connection weights", "Input data labels", "Hardware speed", "User passwords"],
        correctIndex: 0,
        explanation: "Training optimizes connection weights to minimize prediction errors.",
      },
      {
        id: "nn-q3",
        question: "Deep learning refers to neural networks with:",
        options: [
          "Very shallow layers",
          "Many hidden layers",
          "No training data",
          "Only one neuron",
        ],
        correctIndex: 1,
        explanation: "Deep learning uses many stacked hidden layers to learn complex patterns.",
      },
    ],
  },
  {
    id: "large-language-models",
    title: "Large Language Models",
    description: "Explore how LLMs like Gemini understand and generate human language.",
    unit: 2,
    order: 2,
    icon: "💬",
    estimatedMinutes: 7,
    sections: [
      {
        title: "What is an LLM?",
        content:
          "Large Language Models (LLMs) are neural networks trained on vast amounts of text to predict the next word in a sequence. This simple objective produces surprisingly capable language understanding.\n\nModels like Gemini, GPT, and Claude can write, summarize, translate, code, and reason — all from learning language patterns.",
      },
      {
        title: "Tokens and Context",
        content:
          "LLMs process text as tokens — chunks of words or subwords. A context window is how much text the model can consider at once (thousands to millions of tokens).\n\nLonger context lets models reference more of your conversation, documents, or code — but uses more compute.",
      },
      {
        title: "Capabilities and Limits",
        content:
          "LLMs excel at language tasks but can hallucinate — confidently stating false information. They don't truly 'understand' like humans; they predict statistically likely text.\n\nAlways verify important facts. LLMs are powerful assistants, not infallible oracles.",
      },
    ],
    quiz: [
      {
        id: "llm-q1",
        question: "LLMs are primarily trained to predict:",
        options: ["Stock prices", "The next token/word", "Weather patterns", "Image colors"],
        correctIndex: 1,
        explanation: "Next-token prediction on massive text corpora is the core training objective.",
      },
      {
        id: "llm-q2",
        question: "What is a 'hallucination' in LLM context?",
        options: [
          "The model dreaming at night",
          "Confident but incorrect output",
          "Running out of memory",
          "Translating languages",
        ],
        correctIndex: 1,
        explanation: "Hallucinations are plausible-sounding but factually wrong responses.",
      },
      {
        id: "llm-q3",
        question: "A context window determines:",
        options: [
          "Screen size",
          "How much text the model can consider",
          "Internet speed",
          "Battery life",
        ],
        correctIndex: 1,
        explanation: "Context window limits how much input text an LLM processes at once.",
      },
    ],
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering",
    description: "Master the art of communicating effectively with AI models.",
    unit: 3,
    order: 1,
    icon: "✨",
    estimatedMinutes: 6,
    sections: [
      {
        title: "What is a Prompt?",
        content:
          "A prompt is the input you give an AI model — your question, instruction, or context. Better prompts lead to dramatically better outputs.\n\nPrompt engineering is the skill of crafting inputs to get reliable, useful responses from AI systems.",
      },
      {
        title: "Effective Prompt Techniques",
        content:
          "Be specific about format, tone, and constraints. Provide examples (few-shot prompting). Break complex tasks into steps. Assign a role: 'You are an expert Python tutor...'\n\nInstead of 'help with my essay,' try 'Review this 500-word essay for clarity and suggest 3 specific improvements with examples.'",
      },
      {
        title: "Iterating and Refining",
        content:
          "Great prompts rarely work perfectly on the first try. Treat it as a conversation — refine based on outputs, add constraints, or ask the model to explain its reasoning.\n\nChain-of-thought prompting ('think step by step') often improves accuracy on complex reasoning tasks.",
      },
    ],
    quiz: [
      {
        id: "pe-q1",
        question: "Prompt engineering is primarily about:",
        options: [
          "Fixing computer hardware",
          "Crafting effective AI inputs",
          "Training new models",
          "Designing websites",
        ],
        correctIndex: 1,
        explanation: "Prompt engineering focuses on writing inputs that produce better AI outputs.",
      },
      {
        id: "pe-q2",
        question: "Which prompt is more effective?",
        options: [
          "Write something",
          "Help me",
          "Summarize this article in 3 bullet points for a beginner",
          "Do AI stuff",
        ],
        correctIndex: 2,
        explanation: "Specific format, length, and audience constraints produce better results.",
      },
      {
        id: "pe-q3",
        question: "'Think step by step' prompting helps with:",
        options: [
          "Image generation only",
          "Complex reasoning tasks",
          "Deleting files",
          "Increasing internet speed",
        ],
        correctIndex: 1,
        explanation: "Chain-of-thought prompting encourages models to reason through problems.",
      },
    ],
  },
  {
    id: "ai-ethics",
    title: "AI Ethics & Safety",
    description: "Understand responsible AI use, bias, privacy, and societal impact.",
    unit: 3,
    order: 2,
    icon: "⚖️",
    estimatedMinutes: 6,
    sections: [
      {
        title: "Bias in AI Systems",
        content:
          "AI models learn from human-created data, which can contain biases. A hiring algorithm trained on historical data might discriminate against qualified candidates from underrepresented groups.\n\nResponsible AI requires diverse training data, bias testing, and human oversight in high-stakes decisions.",
      },
      {
        title: "Privacy and Data",
        content:
          "AI systems often need large datasets, sometimes including personal information. Questions arise: Who owns your data? How is it stored? Can you opt out?\n\nRead privacy policies, understand what data apps collect, and be cautious sharing sensitive information with AI chatbots.",
      },
      {
        title: "Using AI Responsibly",
        content:
          "Verify AI outputs for important decisions. Disclose when content is AI-generated. Don't use AI to deceive, harass, or spread misinformation.\n\nAI is a tool that amplifies human intent — use it to learn, create, and solve problems while respecting others' rights and wellbeing.",
      },
    ],
    quiz: [
      {
        id: "ethics-q1",
        question: "AI bias often comes from:",
        options: [
          "Random number generators",
          "Biased training data",
          "Fast internet",
          "Large screens",
        ],
        correctIndex: 1,
        explanation: "Models reflect patterns — including biases — present in their training data.",
      },
      {
        id: "ethics-q2",
        question: "When using AI for important decisions, you should:",
        options: [
          "Trust it blindly",
          "Verify outputs and maintain human oversight",
          "Never use AI",
          "Share all passwords with AI",
        ],
        correctIndex: 1,
        explanation: "Human verification is essential for high-stakes AI-assisted decisions.",
      },
      {
        id: "ethics-q3",
        question: "Responsible AI use includes:",
        options: [
          "Spreading misinformation faster",
          "Disclosing AI-generated content when relevant",
          "Hiding AI involvement always",
          "Ignoring privacy policies",
        ],
        correctIndex: 1,
        explanation: "Transparency about AI involvement builds trust and accountability.",
      },
    ],
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}

export function getLessonIds(): string[] {
  return LESSONS.map((l) => l.id);
}

export function getUnits(): { unit: number; title: string; lessons: Lesson[] }[] {
  const unitTitles: Record<number, string> = {
    1: "AI Foundations",
    2: "How AI Works",
    3: "Using AI Wisely",
  };

  const units = new Map<number, Lesson[]>();
  for (const lesson of LESSONS) {
    const list = units.get(lesson.unit) ?? [];
    list.push(lesson);
    units.set(lesson.unit, list);
  }

  return Array.from(units.entries())
    .sort(([a], [b]) => a - b)
    .map(([unit, lessons]) => ({
      unit,
      title: unitTitles[unit] ?? `Unit ${unit}`,
      lessons: lessons.sort((a, b) => a.order - b.order),
    }));
}
