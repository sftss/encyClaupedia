/* ================================================
   ENCYCLAUPEDIA — DATA + LOGIC
   ================================================ */

// ─── CATEGORIES ───────────────────────────────────────────────────────────────
const CATEGORIES = {
    all: {
        label: 'Tout',
        icon: '🗂️',
        desc: 'Compilation complète d\'outils, tips et frameworks pour l\'écosystème IA'
    },
    'claude-code': {
        label: 'Claude Code',
        icon: '🤖',
        desc: 'Configuration, hooks, skills, agents, commandes et mémoire persistante'
    },
    skills: {
        label: 'Skills & Plugins',
        icon: '⚡',
        desc: 'Workflows réutilisables, skills design, UX et plugins pour Claude Code'
    },
    'local-ai': {
        label: 'IA Locale',
        icon: '💻',
        desc: 'Modèles locaux, Ollama, fine-tuning et outils pour une IA offline et gratuite'
    },
    frameworks: {
        label: 'Agent Frameworks',
        icon: '🏢',
        desc: 'Orchestration, multi-agents et frameworks pour construire des systèmes IA complexes'
    },
    tips: {
        label: 'Tips & Tricks',
        icon: '💡',
        desc: 'Optimisations tokens, cache, bonnes pratiques et astuces de productivité'
    },
    tools: {
        label: 'Outils',
        icon: '🛠️',
        desc: 'Utilitaires essentiels : monitoring, browser automation, debugging et MCP servers'
    }
};

// ─── RESOURCES DATA ───────────────────────────────────────────────────────────
const RESOURCES = [

    /* ============================================================
       CLAUDE CODE
    ============================================================ */
    {
        id: 1,
        category: 'claude-code',
        icon: '🗂️',
        title: 'Anatomie du dossier .claude/',
        description: 'Le centre de contrôle de Claude Code. <strong>CLAUDE.md</strong> (instructions équipe, committées), <strong>settings.json</strong> (permissions + hooks), <strong>commands/</strong> (slash commands), <strong>rules/</strong> (instructions modulaires), <strong>skills/</strong> (workflows auto-invoqués), <strong>agents/</strong> (sous-agents spécialisés).',
        tags: ['essentiel', 'setup', 'configuration'],
        type: 'guide',
        link: null,
        code: 'your-project/\n├── CLAUDE.md          # Instructions équipe (committées)\n├── CLAUDE.local.md    # Overrides perso (gitignored)\n└── .claude/\n    ├── settings.json\n    ├── commands/\n    ├── rules/\n    ├── skills/\n    └── agents/'
    },
    {
        id: 2,
        category: 'claude-code',
        icon: '📄',
        title: 'CLAUDE.md — Le manuel d\'instruction',
        description: 'Le fichier le plus important. Chargé dans le system prompt à chaque session. Y mettre : commandes build/test/lint, décisions architecturales, conventions de nommage, gotchas non-évidents. <strong>Garder sous 200 lignes</strong> — au-delà, l\'adhérence de Claude baisse.',
        tags: ['essentiel', 'instructions', 'config'],
        type: 'guide',
        link: null,
        code: '# Project: Acme API\n## Commands\nnpm run dev   # Start dev server\nnpm test      # Run tests (Jest)\n## Conventions\n- Use zod for request validation\n- Return shape: { data, error }\n- Use logger module, not console.log'
    },
    {
        id: 3,
        category: 'claude-code',
        icon: '📁',
        title: 'rules/ — Instructions modulaires & path-scoped',
        description: 'Découper CLAUDE.md en fichiers par domaine (<code>code-style.md</code>, <code>testing.md</code>, <code>api-conventions.md</code>). Chaque fichier peut avoir un frontmatter YAML <code>paths:</code> pour ne s\'activer que pour certains fichiers. Idéal quand CLAUDE.md dépasse 200 lignes.',
        tags: ['organisation', 'rules', 'path-scoped', 'scalable'],
        type: 'guide',
        link: null,
        code: '# .claude/rules/api-conventions.md\n---\npaths:\n  - "src/api/**/*.ts"\n  - "src/handlers/**/*.ts"\n---\n# API Rules\n- Return { data, error } shape\n- Validate with zod on every handler'
    },
    {
        id: 4,
        category: 'claude-code',
        icon: '🪝',
        title: 'Hooks System — Comportement déterministe',
        description: 'Event handlers qui s\'exécutent automatiquement. <strong>PreToolUse</strong> = gate de sécurité (bloquer rm -rf, DROP TABLE). <strong>PostToolUse</strong> = formatter automatique après édition. <strong>Stop</strong> = quality gate (tests must pass). <strong>Exit code 2 = bloque</strong> l\'action et envoie stderr à Claude pour autocorrection.',
        tags: ['hooks', 'sécurité', 'automation', 'avancé'],
        type: 'guide',
        link: null,
        code: '// settings.json\n{\n  "hooks": {\n    "PostToolUse": [{\n      "matcher": "Write|Edit",\n      "hooks": [{"type":"command",\n        "command":"npx prettier --write $FILE"}]\n    }],\n    "PreToolUse": [{\n      "matcher": "Bash",\n      "hooks": [{"type":"command",\n        "command":"./.claude/hooks/firewall.sh"}]\n    }]\n  }\n}'
    },
    {
        id: 5,
        category: 'claude-code',
        icon: '⚙️',
        title: 'settings.json — Permissions & config',
        description: 'Contrôle ce que Claude peut faire sans demander (<code>allow</code>) ou pas du tout (<code>deny</code>). Ce qui n\'est ni allow ni deny → Claude demande confirmation. Ajouter le <code>$schema</code> pour l\'autocomplétion VS Code. Committable en équipe.',
        tags: ['sécurité', 'permissions', 'essentiel'],
        type: 'guide',
        link: null,
        code: '{\n  "$schema": "https://json.schemastore.org/claude-code-settings.json",\n  "permissions": {\n    "allow": [\n      "Bash(npm run *)", "Bash(git *)",\n      "Read", "Write", "Edit"\n    ],\n    "deny": [\n      "Bash(rm -rf *)", "Bash(curl *)",\n      "Read(./.env)"\n    ]\n  }\n}'
    },
    {
        id: 6,
        category: 'claude-code',
        icon: '⌨️',
        title: 'commands/ — Slash Commands personnalisés',
        description: 'Chaque fichier Markdown dans <code>.claude/commands/</code> devient un slash command <code>/project:nom</code>. Ex: <code>review.md</code> → <code>/project:review</code>. Parfait pour les workflows répétitifs : code review, fix-issue, deploy. Un fichier = un workflow complet en une commande.',
        tags: ['commands', 'workflow', 'productivité'],
        type: 'guide',
        link: null,
        code: '.claude/commands/\n├── review.md      → /project:review\n├── fix-issue.md   → /project:fix-issue\n└── deploy.md      → /project:deploy'
    },
    {
        id: 7,
        category: 'claude-code',
        icon: '🧠',
        title: 'agents/ — Sous-agents spécialisés',
        description: 'Définir des personas de sous-agents avec leur propre system prompt, outils disponibles et modèle. Claude les invoque dans une <strong>fenêtre de contexte isolée</strong>. Le contexte principal reste propre. Restreindre les outils (<code>Read, Grep, Glob</code> pour un auditeur — pas d\'écriture).',
        tags: ['agents', 'isolation', 'sous-agents', 'avancé'],
        type: 'guide',
        link: null,
        code: '# .claude/agents/code-reviewer.md\n---\nname: code-reviewer\nmodel: claude-haiku-4-5-20251001\ntools: Read, Grep, Glob\n---\nYou are a senior code reviewer.\nFocus on bugs, edge cases, and security.\nSuggest specific fixes, not vague improvements.'
    },
    {
        id: 8,
        category: 'claude-code',
        icon: '🧩',
        title: 'Auto-Memory — Mémoire persistante cross-sessions',
        description: 'Claude sauvegarde automatiquement des notes dans <code>~/.claude/projects/</code> : commandes découvertes, patterns architecturaux, insights. Persiste entre les sessions. Gérer avec <code>/memory</code>. Deux dossiers .claude : un dans le projet (équipe) et un global dans <code>~/.claude/</code> (perso).',
        tags: ['mémoire', 'persistance', 'sessions', 'feature'],
        type: 'feature',
        link: null,
        code: '~/.claude/\n├── CLAUDE.md          # Instructions globales perso\n├── settings.json      # Settings globaux + hooks\n├── skills/            # Skills perso (tous projets)\n├── agents/            # Agents perso (tous projets)\n└── projects/          # Historique + auto-memory'
    },
    {
        id: 9,
        category: 'claude-code',
        icon: '🔗',
        title: 'MCP — Model Context Protocol',
        description: 'Protocole ouvert pour connecter Claude à des sources de données et outils externes : bases de données, APIs, fichiers, services. Ajouter des MCP servers dans <code>settings.json</code> pour étendre les capacités de Claude avec vos propres intégrations (GitHub, Slack, Linear, etc.).',
        tags: ['mcp', 'intégrations', 'protocole', 'avancé'],
        type: 'feature',
        link: 'https://github.com/modelcontextprotocol/servers',
        code: null
    },

    /* ============================================================
       SKILLS & PLUGINS
    ============================================================ */
    {
        id: 10,
        category: 'skills',
        icon: '🔧',
        title: 'OpenSkills CLI — Skills portables entre agents',
        description: 'CLI open-source pour rendre les skills IA portables entre Claude Code, Cursor, Codex et autres. Installer des skills depuis n\'importe quel repo GitHub. Format standardisé <strong>SKILL.md + AGENTS.md</strong>. Partage et versioning des skills cross-projets.',
        tags: ['open-source', 'cli', 'portable', 'cross-agent'],
        type: 'tool',
        link: 'https://github.com/numman-ali/openskills',
        code: null
    },
    {
        id: 11,
        category: 'skills',
        icon: '🎨',
        title: 'frontend-design — Anthropic',
        description: 'Transforme Claude en partenaire design production-ready. Génère des interfaces distinctives et cohérentes. Évite l\'esthétique IA générique (police Inter partout, dégradés violet...). Itéré avec des clients Anthropic pour améliorer le "goût" de Claude. Idéal pour le premier draft visuel.',
        tags: ['design', 'ui', 'frontend', 'production'],
        type: 'skill',
        link: null,
        code: 'npx skills add anthropics/skills@frontend-design'
    },
    {
        id: 12,
        category: 'skills',
        icon: '🧭',
        title: 'UI-UX-Pro-Max',
        description: 'Upgrade Claude d\'un générateur de layouts à un vrai stratège UX. Analyse le <strong>comportement utilisateur, le flow visuel et les besoins produit</strong> avant de générer quoi que ce soit. Sur une landing page SaaS : la différence entre une belle page et une page qui convertit.',
        tags: ['ux', 'stratégie', 'conversion', 'saas'],
        type: 'skill',
        link: null,
        code: 'npx skills add nextlevelbuilder/ui-ux-pro-max-skill@ui-ux-pro-max'
    },
    {
        id: 13,
        category: 'skills',
        icon: '📐',
        title: 'web-design-guidelines — Vercel',
        description: 'Fondations et principes établis du web design. Espacement, typographie, responsive design appliqués systématiquement sans avoir à tout re-spécifier à chaque projet. Code propre dès le premier draft, moins de retouches.',
        tags: ['guidelines', 'responsive', 'typographie', 'vercel'],
        type: 'skill',
        link: null,
        code: 'npx skills add vercel-labs/agent-skills@web-design-guidelines'
    },
    {
        id: 14,
        category: 'skills',
        icon: '🧩',
        title: 'shadcn-ui — Composants',
        description: 'Connaissance approfondie de la librairie <strong>shadcn/ui</strong>. Sélectionne les bons composants, applique un styling cohérent, respecte les conventions. Idéal pour les SaaS qui ont déjà un design system basé sur shadcn/ui.',
        tags: ['shadcn', 'components', 'design-system', 'react'],
        type: 'skill',
        link: null,
        code: 'npx skills add giuseppe-trisciuoglio/developer-kit@shadcn-ui'
    },
    {
        id: 15,
        category: 'skills',
        icon: '🎯',
        title: 'brand-guidelines — Identité visuelle',
        description: 'Ancre Claude dans l\'identité visuelle du client avant de générer une ligne de code. Typographie, palette, ton, espacement : tout est contextualisé. Résultat cohérent avec la marque dès le premier rendu. Zéro retour client "c\'est pas notre style".',
        tags: ['branding', 'identité', 'design', 'client'],
        type: 'skill',
        link: null,
        code: 'npx skills add anthropics/skills -- skill brand-guidelines'
    },
    {
        id: 16,
        category: 'skills',
        icon: '📚',
        title: '9 Types de Skills — Taxonomie Anthropic',
        description: '<strong>1.</strong> Library & API Reference · <strong>2.</strong> Product Verification · <strong>3.</strong> Data Fetching & Analysis · <strong>4.</strong> Business Process Automation · <strong>5.</strong> Code Scaffolding · <strong>6.</strong> Code Quality & Review · <strong>7.</strong> CI/CD & Deployment · <strong>8.</strong> Runbooks · <strong>9.</strong> Infrastructure Operations',
        tags: ['taxonomie', 'organisation', 'stratégie', 'anthropic'],
        type: 'guide',
        link: null,
        code: null
    },
    {
        id: 17,
        category: 'skills',
        icon: '💡',
        title: 'Best Practices pour créer des Skills',
        description: '<strong>Section Gotchas</strong> = contenu le plus high-signal. <strong>Disclosure progressive</strong> : le skill = un dossier, pas juste un .md (scripts, assets, data inclus). <strong>Ne pas brider</strong> Claude avec trop de spécificité. <strong>Mémoire</strong> : stocker données dans <code>$CLAUDE_PLUGIN_DATA</code> entre sessions.',
        tags: ['best-practices', 'gotchas', 'création', 'tips'],
        type: 'guide',
        link: null,
        code: '.claude/skills/mon-skill/\n├── SKILL.md          # Description + instructions\n├── DETAILED_GUIDE.md # Guide complet référencé\n├── scripts/          # Scripts helper\n├── assets/           # Templates, exemples\n└── config.json       # Config utilisateur'
    },
    {
        id: 18,
        category: 'skills',
        icon: '🐛',
        title: 'Debugging systématique & Brainstorming',
        description: 'Skills <strong>obra/superpowers</strong> : debug étape par étape avec hypothèses et tests. Brainstorming structuré avec pros/cons et approches multiples. Transforme Claude en partenaire de réflexion structuré plutôt qu\'un générateur d\'idées brut.',
        tags: ['debugging', 'brainstorming', 'structuré'],
        type: 'skill',
        link: 'https://github.com/obra/superpowers',
        code: null
    },

    /* ============================================================
       LOCAL AI
    ============================================================ */
    {
        id: 19,
        category: 'local-ai',
        icon: '🦙',
        title: 'Ollama — Runner de modèles locaux',
        description: 'Exécuter des LLM en local en quelques commandes. Supporte Llama, Gemma, Mistral, Qwen et des centaines d\'autres. <strong>API compatible OpenAI</strong> sur <code>localhost:11434</code>. Gestion simple des modèles : pull, run, list, rm.',
        tags: ['ollama', 'local', 'open-source', 'essentiel'],
        type: 'tool',
        link: 'https://ollama.com',
        code: 'ollama pull gemma4:e4b\nollama serve\n# API dispo sur http://localhost:11434'
    },
    {
        id: 20,
        category: 'local-ai',
        icon: '💎',
        title: 'Gemma 4 — Google (Recommandé pour local)',
        description: 'Très capable, léger et rapide. Compatible laptop et mobile. <strong>e2b</strong> (8 GB RAM) · <strong>e4b</strong> (16 GB RAM) · <strong>26b</strong> (32 GB RAM). Idéal pour un usage local quotidien. Fonctionne avec Claude Code complètement gratuitement.',
        tags: ['gemma4', 'google', 'local', 'recommandé'],
        type: 'model',
        link: null,
        code: '# Version recommandée (16GB RAM)\nollama pull gemma4:e4b\n\n# Version légère (8GB RAM)\nollama pull gemma4:e2b\n\n# Version maximale (32GB RAM)\nollama pull gemma4:26b'
    },
    {
        id: 21,
        category: 'local-ai',
        icon: '🆓',
        title: 'Claude Code + Ollama = 100% Gratuit',
        description: 'Utiliser Claude Code avec un modèle local, sans abonnement ni clé API. Configurer <code>ANTHROPIC_BASE_URL</code> vers Ollama dans les settings VS Code. Tout reste sur votre machine, aucune donnée envoyée à Anthropic.',
        tags: ['gratuit', 'local', 'claude-code', 'privacy'],
        type: 'guide',
        link: null,
        code: '// VS Code settings.json\n"claude-code.env": {\n  "ANTHROPIC_BASE_URL": "http://localhost:11434",\n  "ANTHROPIC_API_KEY": "",\n  "ANTHROPIC_AUTH_TOKEN": "ollama"\n}\n// Puis sélectionner le modèle : gemma4:e4b'
    },
    {
        id: 22,
        category: 'local-ai',
        icon: '🐌',
        title: 'Unsloth — Fine-tuning ultra-rapide',
        description: 'Leader de la démocratisation du deep learning. Fine-tuning <strong>2× plus rapide</strong> avec <strong>80% moins de VRAM</strong>. Notebooks Jupyter prêts à l\'emploi. Pour fine-tuner : juste un dataset de prompts + sorties attendues, OU une fonction procédurale qui vérifie si la sortie est correcte.',
        tags: ['fine-tuning', 'training', 'vram', 'open-source'],
        type: 'tool',
        link: 'https://github.com/unslothai/unsloth',
        code: null
    },
    {
        id: 23,
        category: 'local-ai',
        icon: '🐉',
        title: 'Qwen3.5 Series — Excellents petits modèles',
        description: 'Série de modèles impressionnants d\'Alibaba. <strong>2B et 4B très performants</strong>, le 0.8B est idéal pour le fine-tuning spécialisé. Excellent rapport qualité/taille. Supporte le raisonnement structuré et le code. Disponible sur Ollama et Hugging Face.',
        tags: ['qwen', 'alibaba', 'small-models', 'finetune'],
        type: 'model',
        link: null,
        code: 'ollama pull qwen2.5:3b\nollama pull qwen2.5:7b\nollama pull qwen2.5-coder:7b'
    },
    {
        id: 24,
        category: 'local-ai',
        icon: '🖥️',
        title: 'LM Studio — Interface GUI locale',
        description: 'Interface graphique pour télécharger et exécuter des LLM localement. Découverte facile des modèles HuggingFace, gestion de conversations, server compatible OpenAI. Idéal pour débuter avec l\'IA locale sans ligne de commande.',
        tags: ['gui', 'desktop', 'débutant', 'huggingface'],
        type: 'tool',
        link: 'https://lmstudio.ai',
        code: null
    },
    {
        id: 25,
        category: 'local-ai',
        icon: '🌐',
        title: 'Open WebUI — Interface ChatGPT pour Ollama',
        description: 'Interface web ChatGPT-like pour Ollama. Gestion de conversations, sélection de modèles, <strong>RAG intégré</strong>, plugins, multimodal. Self-hosted via Docker. Idéal pour une expérience utilisateur complète en local avec plusieurs utilisateurs.',
        tags: ['web-ui', 'ollama', 'self-hosted', 'rag'],
        type: 'tool',
        link: 'https://github.com/open-webui/open-webui',
        code: 'docker run -d -p 3000:8080 \\\n  --add-host=host.docker.internal:host-gateway \\\n  ghcr.io/open-webui/open-webui:main'
    },
    {
        id: 26,
        category: 'local-ai',
        icon: '🤖',
        title: 'OpenClaw — Agent coding local',
        description: 'Agent de coding qui fonctionne avec des modèles locaux via Ollama. Lancer <strong>Gemma 4 26B A4B</strong> avec OpenClaw pour un agent de code complet, hors ligne et gratuit. Remplace Claude Code avec un modèle local pour les projets sensibles ou sans connexion.',
        tags: ['agent', 'coding', 'local', 'openclaw'],
        type: 'tool',
        link: null,
        code: null
    },
    {
        id: 27,
        category: 'local-ai',
        icon: '📱',
        title: 'IA sur mobile — Ollama + Pixel',
        description: 'Faire tourner des LLM localement sur Android avec Ollama et un téléphone récent (ex: Pixel). Idéal pour des apps d\'apprentissage (langues, vocabulaire) sans cloud. Les modèles Gemma 4 e2b et Qwen 2.5 3B sont particulièrement adaptés à un usage mobile.',
        tags: ['mobile', 'android', 'pixel', 'offline'],
        type: 'guide',
        link: null,
        code: null
    },

    /* ============================================================
       AGENT FRAMEWORKS
    ============================================================ */
    {
        id: 28,
        category: 'frameworks',
        icon: '📎',
        title: 'Paperclip — OS pour entreprise IA',
        description: 'Dashboard open-source pour organiser vos agents comme une vraie entreprise : <strong>org chart, budgets mensuels, heartbeats (schedules), ticket system, audit trail</strong>. Compatible Claude Code, Codex, Cursor. Multi-entreprises. 1.6M vues la 1ère semaine.',
        tags: ['open-source', 'orchestration', 'budget', 'production'],
        type: 'framework',
        link: 'https://github.com/paperclipai/paperclip',
        code: 'npx paperclipai onboard --yes\n# Dashboard sur http://localhost:3100'
    },
    {
        id: 29,
        category: 'frameworks',
        icon: '🏗️',
        title: 'gstack — 15 Agents Spécialistes (Garry Tan)',
        description: 'Par le CEO de Y Combinator. 15 rôles engineering spécialisés : <strong>/office-hours</strong> (planning), <strong>/qa</strong> (tests navigateur réel), <strong>/ship</strong> (déploiement complet), <strong>/review</strong> (code review bugs), <strong>/careful</strong> (mode sécurisé prod), <strong>/freeze</strong> (lock fichiers).',
        tags: ['yc', 'engineering', 'specialists', 'production'],
        type: 'framework',
        link: 'https://github.com/garrytan/gstack',
        code: 'git clone https://github.com/garrytan/gstack.git \\\n  ~/.claude/skills/gstack\ncd ~/.claude/skills/gstack && ./setup'
    },
    {
        id: 30,
        category: 'frameworks',
        icon: '🔬',
        title: 'autoresearch — R&D autonome (Karpathy)',
        description: 'Par Andrej Karpathy (ex-Tesla AI). Expériences autonomes overnight : modifie le code, exécute une exp. de 5 min, vérifie les résultats, garde si amélioration, itère. <strong>12 expériences/heure → ~100/nuit</strong>. Vous vous réveillez avec des résultats clairs.',
        tags: ['karpathy', 'research', 'ml', 'automation', 'overnight'],
        type: 'framework',
        link: 'https://github.com/karpathy/autoresearch',
        code: null
    },
    {
        id: 31,
        category: 'frameworks',
        icon: '👥',
        title: 'CrewAI — Orchestration multi-agents',
        description: 'Framework Python pour orchestrer des équipes d\'agents IA. Définir des rôles, outils, processus de collaboration séquentiels ou parallèles. Large écosystème d\'intégrations. Idéal pour des pipelines complexes avec spécialisation des agents.',
        tags: ['python', 'multi-agent', 'orchestration', 'open-source'],
        type: 'framework',
        link: 'https://github.com/crewAIInc/crewAI',
        code: 'pip install crewai\n# Définir roles, tasks, agents\n# Lancer crew.kickoff()'
    },
    {
        id: 32,
        category: 'frameworks',
        icon: '🕸️',
        title: 'LangGraph — Agents stateful (LangChain)',
        description: 'Créer des agents avec <strong>état persistant sous forme de graphes</strong>. Boucles, branchements conditionnels, agents réactifs, gestion d\'erreurs. Production-ready avec checkpointing. Idéal pour des workflows complexes qui nécessitent de la mémoire d\'état.',
        tags: ['langchain', 'stateful', 'graphs', 'python'],
        type: 'framework',
        link: 'https://github.com/langchain-ai/langgraph',
        code: null
    },
    {
        id: 33,
        category: 'frameworks',
        icon: '🤖',
        title: 'OpenHands (ex-OpenDevin) — Coding agent',
        description: 'Agent de développement open-source capable de naviguer le web, écrire du code, exécuter des commandes terminal, gérer des fichiers. Interface similaire à Devin mais <strong>entièrement open-source et self-hostable</strong>. Support multi-modèles.',
        tags: ['coding-agent', 'open-source', 'devin', 'self-hosted'],
        type: 'framework',
        link: 'https://github.com/All-Hands-AI/OpenHands',
        code: null
    },
    {
        id: 34,
        category: 'frameworks',
        icon: '🏢',
        title: 'Workflow Paperclip × gstack × autoresearch',
        description: '<strong>Paperclip</strong> assigne le travail → <strong>autoresearch</strong> fait la R&D overnight (100 expériences) → <strong>gstack</strong> /office-hours planifie, /review vérifie le code, /qa teste en navigateur réel, /ship déploie → Paperclip loggue tout (coût, temps, décisions).',
        tags: ['workflow', 'complet', 'production', 'combo'],
        type: 'guide',
        link: null,
        code: null
    },

    /* ============================================================
       TIPS & TRICKS
    ============================================================ */
    {
        id: 35,
        category: 'tips',
        icon: '🔍',
        title: 'ENABLE_TOOL_SEARCH — 15-20K tokens économisés/tour',
        description: 'Les skills et outils ne sont plus chargés dans le contexte à chaque tour. Ils sont chargés <strong>à la demande via ToolSearch</strong> seulement quand nécessaire. L\'une des optimisations les plus impactantes pour les abonnés Pro/Max.',
        tags: ['tokens', 'optimisation', 'essentiel', 'pro'],
        type: 'tip',
        link: null,
        code: '// settings.json ou CLAUDE.md\nENABLE_TOOL_SEARCH: true\n\n// Économie estimée : ~15-20K tokens/tour'
    },
    {
        id: 36,
        category: 'tips',
        icon: '⏱️',
        title: 'Cache Anthropic — 5 min = tout retraité',
        description: 'Si vous quittez Claude Code plus de <strong>5 minutes</strong>, le cache Anthropic expire. Tout le contexte est retraité au prix fort au message suivant. Soit restez actif, soit anticipez le coût. Utiliser ccusage pour monitorer la fenêtre de 5h.',
        tags: ['cache', 'coûts', 'tokens', 'essentiel'],
        type: 'tip',
        link: null,
        code: null
    },
    {
        id: 37,
        category: 'tips',
        icon: '⚡',
        title: 'RTK — Rust Token Killer (60-90% savings)',
        description: 'Préfixer toutes les commandes avec <code>rtk</code> pour réduire massivement les tokens de sortie. <strong>vitest → 99.5%</strong>, next build → 87%, git diff → 80%, tsc → 83%, pnpm install → 90%. Toujours utiliser rtk même dans les chains &&.',
        tags: ['rtk', 'tokens', 'cli', 'savings', 'essentiel'],
        type: 'tip',
        link: null,
        code: '# Toujours préfixer avec rtk !\nrtk git diff\nrtk vitest run\nrtk next build\nrtk tsc\n\n# Dans les chains &&\nrtk git add . && rtk git commit -m "msg"'
    },
    {
        id: 38,
        category: 'tips',
        icon: '🌐',
        title: 'Chrome DevTools MCP + Remote Debugging',
        description: 'Combo <strong>Chrome remote debugging + Chrome DevTools MCP + Claude terminal</strong>. L\'agent bosse directement sur votre session Chrome en cours, sans ouvrir de nouvelle session. Le gain de temps est considérable pour le debugging frontend.',
        tags: ['chrome', 'debugging', 'mcp', 'productivité', 'frontend'],
        type: 'tip',
        link: null,
        code: '# Lancer Chrome avec remote debugging\nchrome --remote-debugging-port=9222\n\n# L\'agent peut maintenant inspecter\n# la session en cours via DevTools MCP'
    },
    {
        id: 39,
        category: 'tips',
        icon: '🛑',
        title: 'Stop Hook — Tests obligatoires avant "Done"',
        description: 'Un hook <strong>Stop</strong> qui lance les tests et exit 2 en cas d\'échec empêche Claude de déclarer "terminé" avant que les tests soient verts. <strong>Attention</strong> : toujours vérifier <code>stop_hook_active</code> dans le payload JSON pour éviter les boucles infinies.',
        tags: ['hooks', 'tests', 'qualité', 'avancé'],
        type: 'tip',
        link: null,
        code: '#!/bin/bash\n# .claude/hooks/enforce-tests.sh\nPAYLOAD=$(cat)\nACTIVE=$(echo "$PAYLOAD" | jq -r .stop_hook_active)\n\nif [ "$ACTIVE" != "true" ]; then\n  npm test || exit 2\nfi'
    },
    {
        id: 40,
        category: 'tips',
        icon: '📊',
        title: 'Maximiser l\'abonnement Claude Pro/Max',
        description: 'Fenêtre de <strong>5h</strong> qui se reset. Utiliser l\'endpoint <code>GET /api/oauth/usage</code> pour monitorer. Si moins de 30 min restantes, déclencher toutes les tâches planifiées (fix PRs, recherches, génération) jusqu\'à atteindre 100% du quota.',
        tags: ['pro', 'max', 'subscription', 'quota', 'optimisation'],
        type: 'tip',
        link: null,
        code: 'GET /api/oauth/usage\n# Avec la clé API Claude Code\n\n# Monitorer avec ccusage\nnpx ccusage@latest'
    },
    {
        id: 41,
        category: 'tips',
        icon: '🎯',
        title: 'Progression setup .claude/ recommandée',
        description: '<strong>1.</strong> <code>/init</code> → CLAUDE.md starter auto-généré · <strong>2.</strong> settings.json allow/deny pour votre stack · <strong>3.</strong> commands/ pour vos workflows fréquents · <strong>4.</strong> rules/ quand CLAUDE.md devient trop long · <strong>5.</strong> <code>~/.claude/CLAUDE.md</code> pour préférences perso globales',
        tags: ['setup', 'progression', 'onboarding', 'débutant'],
        type: 'tip',
        link: null,
        code: null
    },
    {
        id: 42,
        category: 'tips',
        icon: '🧩',
        title: 'Skill description = trigger de déclenchement',
        description: 'Claude scanne la description de chaque skill disponible pour décider si c\'est pertinent. La <code>description</code> dans le frontmatter n\'est <strong>pas un résumé</strong> — c\'est la condition de déclenchement. Écrire : "Use when [condition]", "Use PROACTIVELY when [context]".',
        tags: ['skills', 'description', 'trigger', 'best-practices'],
        type: 'tip',
        link: null,
        code: '---\nname: security-review\ndescription: Use PROACTIVELY when reviewing code\n  for vulnerabilities, before deployments, or when\n  the user mentions security concerns.\n---'
    },
    {
        id: 43,
        category: 'tips',
        icon: '🔄',
        title: 'Skills avec mémoire persistante',
        description: 'Les skills peuvent stocker des données entre sessions dans <code>$CLAUDE_PLUGIN_DATA</code>. Ex: un skill standup garde un log de tous les standups précédents → au prochain run, Claude voit ce qui a changé. Utiliser JSON ou SQLite pour des données structurées.',
        tags: ['skills', 'mémoire', 'persistance', 'avancé'],
        type: 'tip',
        link: null,
        code: '# Stocker dans le dossier stable du plugin\nDATA_DIR="$CLAUDE_PLUGIN_DATA"\nLOG_FILE="$DATA_DIR/standups.log"\n\n# Claude lit l\'historique et génère\n# un standup en delta depuis hier'
    },

    /* ============================================================
       TOOLS
    ============================================================ */
    {
        id: 44,
        category: 'tools',
        icon: '📈',
        title: 'ccusage — Dashboard d\'utilisation Claude',
        description: 'Version améliorée du monitoring Claude Code. Visualise l\'utilisation, les coûts, les <strong>fenêtres de 5h et leur reset</strong>, l\'historique par session et projet. Indispensable pour optimiser sa consommation Pro/Max.',
        tags: ['monitoring', 'tokens', 'dashboard', 'essentiel'],
        type: 'tool',
        link: 'https://github.com/ryoppippi/ccusage',
        code: 'npx ccusage@latest'
    },
    {
        id: 45,
        category: 'tools',
        icon: '🌐',
        title: 'dev-browser CLI — Agent browser',
        description: 'Le moyen le plus rapide pour qu\'un agent utilise un navigateur : il génère du code. Installer globalement puis dire à l\'agent "use dev-browser". Pas de setup de browser automation complexe — l\'agent écrit le code de navigation lui-même.',
        tags: ['browser', 'automation', 'agent', 'cli'],
        type: 'tool',
        link: null,
        code: 'npm i -g dev-browser\n\n# Dans votre prompt à Claude :\n# "use dev-browser to navigate to..."'
    },
    {
        id: 46,
        category: 'tools',
        icon: '🔍',
        title: 'Chrome DevTools MCP Server',
        description: 'MCP Server qui expose le Chrome DevTools Protocol à Claude. Inspection DOM, réseau, console, screenshots, evaluation JS. Connecte Claude directement à votre navigateur Chrome en cours d\'exécution via remote debugging.',
        tags: ['mcp', 'chrome', 'devtools', 'debugging', 'frontend'],
        type: 'tool',
        link: 'https://github.com/modelcontextprotocol/servers',
        code: null
    },
    {
        id: 47,
        category: 'tools',
        icon: '🤗',
        title: 'Hugging Face — Hub central de l\'IA open-source',
        description: 'La plateforme incontournable : <strong>500K+ modèles, 100K+ datasets</strong>, Spaces pour déployer des démos. Fine-tuning via AutoTrain, Inference API, modèles privés. Référentiel central pour tout ce qui touche aux LLMs open-source.',
        tags: ['models', 'datasets', 'hub', 'essentiel', 'open-source'],
        type: 'tool',
        link: 'https://huggingface.co',
        code: 'pip install huggingface_hub\n# Ou directement dans Ollama\nollama pull hf.co/[org]/[model]'
    },
    {
        id: 48,
        category: 'tools',
        icon: '📋',
        title: 'ClipMart — Marketplace d\'entreprises IA',
        description: '<strong>À venir</strong> : marketplace pour télécharger des entreprises IA pré-construites en un clic via Paperclip. Templates : agence marketing IA, SaaS builder, studio de contenu. Import d\'une organisation entière avec agents, budgets et workflows préconfigurés.',
        tags: ['coming-soon', 'templates', 'marketplace', 'paperclip'],
        type: 'tool',
        link: null,
        code: null
    },
    {
        id: 49,
        category: 'tools',
        icon: '💡',
        title: 'Continue.dev — Copilot open-source VS Code',
        description: 'Extension VS Code/JetBrains open-source pour l\'assistance au code. <strong>Connecte n\'importe quel LLM</strong> (Ollama, Anthropic, OpenAI, Groq...) en autocomplétion et chat inline. Alternative à GitHub Copilot, 100% configurable.',
        tags: ['vscode', 'copilot', 'open-source', 'autocomplete'],
        type: 'tool',
        link: 'https://github.com/continuedev/continue',
        code: null
    },
    {
        id: 50,
        category: 'tools',
        icon: '🚀',
        title: 'Aeon — Monitoring fenêtre 5h Claude',
        description: 'Outil de monitoring qui surveille la fenêtre de 5h Claude Code et peut déclencher automatiquement des skills planifiés quand le quota est sur le point d\'expirer. Maximise l\'utilisation de l\'abonnement Pro/Max en automatisant les tâches de fond.',
        tags: ['monitoring', 'automation', '5h-window', 'pro'],
        type: 'tool',
        link: 'https://github.com/aaronjmars/aeon',
        code: null
    }
];

// ─── STATE ────────────────────────────────────────────────────────────────────
const state = {
    category: 'all',
    search: '',
    tag: null
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function esc(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function getFiltered() {
    let list = RESOURCES;

    if (state.category !== 'all') {
        list = list.filter(r => r.category === state.category);
    }

    if (state.tag) {
        list = list.filter(r => r.tags.includes(state.tag));
    }

    if (state.search.trim()) {
        const q = state.search.trim().toLowerCase();
        list = list.filter(r =>
            r.title.toLowerCase().includes(q) ||
            r.description.replace(/<[^>]+>/g, '').toLowerCase().includes(q) ||
            r.tags.some(t => t.toLowerCase().includes(q))
        );
    }

    return list;
}

function getTopTags(n = 16) {
    const freq = {};
    RESOURCES.forEach(r => r.tags.forEach(t => { freq[t] = (freq[t] || 0) + 1; }));
    return Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, n)
        .map(([t]) => t);
}

// ─── RENDER NAV ───────────────────────────────────────────────────────────────
function renderNav() {
    const nav = document.getElementById('category-nav');
    nav.innerHTML = Object.entries(CATEGORIES).map(([key, cat]) => {
        const count = key === 'all'
            ? RESOURCES.length
            : RESOURCES.filter(r => r.category === key).length;
        return `
            <button class="nav-item${state.category === key ? ' active' : ''}" data-cat="${key}">
                <span class="nav-icon">${cat.icon}</span>
                <span class="nav-label">${cat.label}</span>
                <span class="nav-count">${count}</span>
            </button>`;
    }).join('');

    nav.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => {
            state.category = btn.dataset.cat;
            state.tag = null;
            updateTagFilters();
            update();
        });
    });
}

// ─── RENDER TAG FILTERS ───────────────────────────────────────────────────────
function renderTagFilters() {
    const container = document.getElementById('tag-filters');
    const tags = getTopTags();
    container.innerHTML = tags.map(t => `
        <span class="filter-tag${state.tag === t ? ' active' : ''}" data-tag="${t}">${t}</span>
    `).join('');

    container.querySelectorAll('.filter-tag').forEach(el => {
        el.addEventListener('click', () => {
            state.tag = state.tag === el.dataset.tag ? null : el.dataset.tag;
            updateTagFilters();
            update();
        });
    });
}

function updateTagFilters() {
    document.querySelectorAll('.filter-tag').forEach(el => {
        el.classList.toggle('active', el.dataset.tag === state.tag);
    });
}

// ─── RENDER CARDS ────────────────────────────────────────────────────────────
function renderCards() {
    const grid = document.getElementById('cards-grid');
    const list = getFiltered();

    document.getElementById('results-count').textContent =
        list.length === RESOURCES.length ? '' : `${list.length} résultat${list.length > 1 ? 's' : ''}`;

    if (list.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🔍</div>
                <h3>Aucun résultat</h3>
                <p>Essayez un autre terme ou effacez les filtres</p>
            </div>`;
        return;
    }

    grid.innerHTML = list.map((r, i) => renderCard(r, i)).join('');

    // Copy buttons
    grid.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const code = btn.closest('.card-code-wrap').querySelector('.card-code').textContent;
            navigator.clipboard.writeText(code).then(() => {
                btn.textContent = '✓ Copié';
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.textContent = 'Copier';
                    btn.classList.remove('copied');
                }, 2000);
            });
        });
    });

    // Tag clicks in cards → filter
    grid.querySelectorAll('.tag').forEach(el => {
        el.addEventListener('click', () => {
            state.tag = state.tag === el.dataset.tag ? null : el.dataset.tag;
            updateTagFilters();
            update();
        });
    });
}

function renderCard(r, index) {
    const cat = CATEGORIES[r.category];
    const catLabel = cat ? cat.label : r.category;
    const delay = Math.min(index * 30, 300);

    const codeBlock = r.code ? `
        <div class="card-code-wrap">
            <pre class="card-code">${esc(r.code)}</pre>
            <button class="copy-btn" title="Copier le code">Copier</button>
        </div>` : '';

    const tags = r.tags.map(t =>
        `<span class="tag${state.tag === t ? ' active' : ''}" data-tag="${t}">${t}</span>`
    ).join('');

    const footer = (r.link || r.type) ? `
        <div class="card-foot">
            ${r.link
                ? `<a href="${r.link}" class="card-link" target="_blank" rel="noopener">Voir le projet →</a>`
                : '<span></span>'}
            <span class="card-type">${r.type}</span>
        </div>` : '';

    return `
        <div class="card" style="animation-delay:${delay}ms">
            <div class="card-top">
                <span class="card-emoji">${r.icon}</span>
                <div class="card-heading">
                    <div class="card-title">${r.title}</div>
                    <span class="cat-badge cat-${r.category}">${catLabel}</span>
                </div>
            </div>
            <p class="card-desc">${r.description}</p>
            ${codeBlock}
            <div class="card-tags">${tags}</div>
            ${footer}
        </div>`;
}

// ─── SECTION HEADER ──────────────────────────────────────────────────────────
function updateHeader() {
    const cat = CATEGORIES[state.category];
    const title = state.tag
        ? `#${state.tag}`
        : (state.category === 'all' ? 'Toutes les ressources' : `${cat.icon} ${cat.label}`);
    const desc = state.search
        ? `Résultats pour "${state.search}"`
        : (state.tag ? `Filtré par tag : ${state.tag}` : cat.desc);

    document.getElementById('section-title').textContent = title;
    document.getElementById('section-desc').textContent = desc;
}

// ─── UPDATE (full re-render) ──────────────────────────────────────────────────
function update() {
    // Re-render nav active state
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.cat === state.category);
        // Update count badge color
        btn.querySelector('.nav-count').parentElement.classList.toggle('active', btn.dataset.cat === state.category);
    });
    updateHeader();
    renderCards();
}

// ─── INIT ────────────────────────────────────────────────────────────────────
function init() {
    // Total count pill
    document.getElementById('total-count').textContent = `${RESOURCES.length} ressources`;

    // Render sidebar
    renderNav();
    renderTagFilters();

    // Initial cards
    renderCards();

    // Search input
    const searchEl = document.getElementById('search');
    let debounce;
    searchEl.addEventListener('input', e => {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
            state.search = e.target.value;
            update();
        }, 180);
    });

    // ⌘K / Ctrl+K to focus search
    document.addEventListener('keydown', e => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            searchEl.focus();
            searchEl.select();
        }
        if (e.key === 'Escape' && document.activeElement === searchEl) {
            searchEl.blur();
            state.search = '';
            searchEl.value = '';
            update();
        }
    });
}

document.addEventListener('DOMContentLoaded', init);
