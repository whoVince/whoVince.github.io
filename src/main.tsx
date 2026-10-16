import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

type Language = 'pt' | 'en'
type Filter = 'All' | 'AI & GenAI' | 'Architecture' | 'Backend' | 'Frontend' | 'Full Stack'
type ProjectIcon = 'forge' | 'pulse' | 'architecture' | 'fashion' | 'brisa' | 'pizza' | 'layers'

const additionalProjects = [
  { name: 'AI Engineering Platform', category: 'AI & GenAI' as Filter, status: 'Em desenvolvimento', desc: 'Workbench de engenharia assistida por IA para transformar requisitos em arquitetura e artefatos revisáveis.', accent: 'cyan', code: '08', icon: 'forge' as ProjectIcon, stack: ['AI', 'React', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL', 'Docker'] },
  { name: 'Administrative Audit Platform', category: 'Backend' as Filter, status: 'MVP', desc: 'Plataforma administrativa com RBAC, multi-tenant, autorização por recurso e auditoria imutável.', accent: 'blue', code: '09', icon: 'architecture' as ProjectIcon, stack: ['Java', 'Spring Boot', 'Security', 'RBAC', 'Audit'] },
  { name: 'Distributed E-commerce Checkout', category: 'Backend' as Filter, status: 'MVP', desc: 'Checkout modular com catálogo, carrinho, estoque, pagamento simulado, Saga, Outbox e compensação.', accent: 'warm', code: '10', icon: 'layers' as ProjectIcon, stack: ['Java', 'Spring Boot', 'Validation', 'Saga', 'Outbox'] },
  { name: 'Event-Driven Inventory', category: 'Backend' as Filter, status: 'MVP', desc: 'Controle de estoque orientado a eventos com entradas, reservas, idempotência e alertas de estoque mínimo.', accent: 'cyan', code: '11', icon: 'architecture' as ProjectIcon, stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Kafka', 'Idempotency'] },
  { name: 'GlobalPay White Label', category: 'Backend' as Filter, status: 'Primeira entrega', desc: 'Plataforma de pagamentos white label multi-tenant com máquina de estados e provider sandbox determinístico.', accent: 'violet', code: '12', icon: 'layers' as ProjectIcon, stack: ['Java', 'Spring Boot', 'Validation', 'Actuator', 'Multi-tenant'] },
  { name: 'Messaging Platform', category: 'Backend' as Filter, status: 'MVP', desc: 'Mensageria assíncrona com inbox unificado, filas, prioridades, retry, WebSocket e Dead Letter Queue.', accent: 'violet', code: '13', icon: 'pulse' as ProjectIcon, stack: ['Java', 'Spring Boot', 'WebSocket', 'Retry', 'DLQ'] },
  { name: 'WhatsApp Chatbot MVP', category: 'Backend' as Filter, status: 'MVP', desc: 'Automação determinística de respostas para WhatsApp usando a Cloud API oficial da Meta.', accent: 'cyan', code: '14', icon: 'pulse' as ProjectIcon, stack: ['Java', 'Spring Boot', 'WhatsApp Cloud API', 'Validation'] },
  { name: 'Kafka Enterprise Starter Kit', category: 'Backend' as Filter, status: 'Executável', desc: 'Processamento assíncrono de pedidos com Transactional Outbox, Kafka, PostgreSQL, Flyway, retry e idempotência.', accent: 'blue', code: '15', icon: 'architecture' as ProjectIcon, stack: ['Java', 'Spring Boot', 'Kafka', 'PostgreSQL', 'Flyway', 'Docker'] },
]

type ProjectLinkType = 'front' | 'api' | 'docs' | 'demo'
const projectLinks: Record<string, { url: string; type: ProjectLinkType }> = {
  'ForgeFlow AI': { url: 'file:///C:/Projetos/Prontos/Projetos%20Workana/Pizzaria/documentation/architecture.md', type: 'docs' },
  'PulseOps': { url: '#contact', type: 'demo' },
  'Software Architecture Lab': { url: 'file:///C:/Projetos/Prontos/KafkaEnterpriseStarterKit/docs/project-structure.mmd', type: 'docs' },
  'Moda Market': { url: 'http://127.0.0.1:5175/', type: 'front' },
  'Brisa Market': { url: 'http://127.0.0.1:5177/', type: 'front' },
  'Pizzaria Demo': { url: 'http://127.0.0.1:5176/', type: 'front' },
  'Full Stack Experiments': { url: 'file:///C:/Projetos/Prontos/Projetos%20Workana/brisa-market/README.md', type: 'docs' },
  'AI Engineering Platform': { url: 'file:///C:/Projetos/Prontos/ai-engineering-platform/docs/api.md', type: 'api' },
  'Administrative Audit Platform': { url: 'file:///C:/Projetos/Prontos/admin-audit-platform/docs/api.md', type: 'api' },
  'Distributed E-commerce Checkout': { url: 'file:///C:/Projetos/Prontos/distributed-ecommerce/docs/api.md', type: 'api' },
  'Event-Driven Inventory': { url: 'file:///C:/Projetos/Prontos/event-driven-inventory/docs/api.md', type: 'api' },
  'GlobalPay White Label': { url: 'file:///C:/Projetos/Prontos/globalpay-white-label/docs/architecture.md', type: 'docs' },
  'Messaging Platform': { url: 'file:///C:/Projetos/Prontos/messaging-platform/docs/api.md', type: 'api' },
  'WhatsApp Chatbot MVP': { url: 'file:///C:/Projetos/Prontos/whatsapp-chatbot-mvp/README.md', type: 'docs' },
  'Kafka Enterprise Starter Kit': { url: 'file:///C:/Projetos/Prontos/KafkaEnterpriseStarterKit/docs/api.md', type: 'api' },
}

const frontendPreviews: Record<string, string> = {
  'Moda Market': '/assets/project-moda-devices.png',
  'Brisa Market': '/assets/project-brisa-devices.png',
  'Pizzaria Demo': '/assets/project-pizzaria-devices.png',
}

const frontendShots: Record<string, [string, string, string]> = {
  'Moda Market': ['/assets/previews/moda-desktop.png', '/assets/previews/moda-tablet.png', '/assets/previews/moda-mobile.png'],
  'Brisa Market': ['/assets/previews/brisa-desktop.png', '/assets/previews/brisa-tablet.png', '/assets/previews/brisa-mobile.png'],
  'Pizzaria Demo': ['/assets/previews/pizzaria-desktop.png', '/assets/previews/pizzaria-tablet.png', '/assets/previews/pizzaria-mobile.png'],
}

const uiCopy = {
  pt: {
    viewArchitecture: 'Ver arquitetura',
    closeArchitecture: 'Fechar arquitetura',
    architectureFlow: 'ARQUITETURA / FLUXO',
    liveModel: '● MODELO ATIVO',
    openApi: 'OPENAPI 3.0 / EXEMPLO',
    server: 'SERVIDOR',
    frontendPreview: 'FRONTEND / PREVIEW RESPONSIVO',
    responsiveViews: 'HOVER / VISÕES RESPONSIVAS',
  },
  en: {
    viewArchitecture: 'View architecture',
    closeArchitecture: 'Close architecture',
    architectureFlow: 'ARCHITECTURE / FLOW',
    liveModel: '● LIVE MODEL',
    openApi: 'OPENAPI 3.0 / EXAMPLE',
    server: 'SERVER',
    frontendPreview: 'FRONTEND / RESPONSIVE PREVIEW',
    responsiveViews: 'HOVER / RESPONSIVE VIEWS',
  },
}

const apiExamples: Record<string, { base: string; endpoints: [string, string, string][] }> = {
  'ForgeFlow AI': { base: '/api/forgeflow', endpoints: [['POST', '/projects', 'Create an engineering project context'], ['POST', '/generation-runs', 'Start an assisted generation run'], ['GET', '/generation-runs/{id}', 'Read generation status and artifacts']] },
  'Software Architecture Lab': { base: '/api', endpoints: [['GET', '/health', 'Check service health'], ['GET', '/architecture/components', 'List registered components'], ['POST', '/integrations/events', 'Publish an integration event']] },
  'Full Stack Experiments': { base: '/api', endpoints: [['GET', '/catalog/products', 'List products'], ['POST', '/carts/{cartId}/items', 'Add an item to a cart'], ['POST', '/checkouts', 'Start a checkout flow']] },
  'AI Engineering Platform': { base: '/api', endpoints: [['POST', '/projects', 'Create a project intent'], ['POST', '/generation-runs', 'Generate a reviewable artifact set'], ['GET', '/actuator/health', 'Check API health']] },
  'Administrative Audit Platform': { base: '/api', endpoints: [['GET', '/audit', 'Query the immutable audit trail'], ['GET', '/users/{id}/permissions', 'Read resource permissions'], ['GET', '/tenants/{id}', 'Read tenant scope']] },
  'Distributed E-commerce Checkout': { base: '/api', endpoints: [['GET', '/catalog/products', 'List catalog products'], ['POST', '/carts/{cartId}/items', 'Add an item to a cart'], ['POST', '/checkouts', 'Start a Saga checkout']] },
  'Event-Driven Inventory': { base: '/api', endpoints: [['POST', '/stock/entries', 'Register a stock entry'], ['POST', '/stock/reservations', 'Reserve available stock'], ['GET', '/stock/alerts', 'List low-stock alerts']] },
  'GlobalPay White Label': { base: '/api/v1', endpoints: [['POST', '/payments', 'Create an idempotent payment'], ['GET', '/payments/{id}', 'Read payment state'], ['POST', '/payments/{id}/confirm', 'Confirm a sandbox payment']] },
  'Messaging Platform': { base: '/api', endpoints: [['POST', '/messages', 'Enqueue a message'], ['GET', '/messages/{id}', 'Read delivery status'], ['POST', '/messages/{id}/replay', 'Replay a dead-letter message']] },
  'WhatsApp Chatbot MVP': { base: '/webhook/whatsapp', endpoints: [['GET', '', 'Verify the Meta webhook challenge'], ['POST', '', 'Receive a WhatsApp notification'], ['POST', '/messages', 'Send a text through Cloud API']] },
  'Kafka Enterprise Starter Kit': { base: '/api/v1', endpoints: [['POST', '/orders', 'Create an order and outbox event'], ['GET', '/orders/{id}', 'Read processing status'], ['GET', '/actuator/prometheus', 'Read operational metrics']] },
}

const copy = {
  pt: {
    nav: ['Sobre', 'Projetos', 'Stack', 'Contato'],
    eyebrow: 'Engenheiro de software sênior · IA · cloud',
    title: <>Construindo sistemas.<br /><span>Projetando inteligência.</span></>,
    intro: 'Engenheiro de Software Sênior e Engenheiro de IA com mais de 10 anos de experiência em sistemas corporativos de missão crítica para os setores bancário e de seguros.',
    work: 'Explorar projetos',
    contact: 'Entrar em contato',
    available: 'Disponível para conversas sobre engenharia, arquitetura e IA.',
    aboutLabel: '01 — Sobre mim',
    aboutTitle: <>Além do <span>código.</span></>,
    about: 'Sou Vicente Nícolas Soares Marques, Engenheiro de Software Sênior com mais de 10 anos de experiência em Java, Spring Boot, APIs REST, microsserviços, Angular e integração de sistemas corporativos.',
    about2: 'Minha atuação combina arquitetura de software, cloud (AWS e Azure), práticas DevOps e visão de negócio. Atualmente também desenvolvo soluções de IA com Python, Machine Learning e IA Generativa, apoiado pelo MBA em Data Science & Artificial Intelligence da FIAP.',
    about3: 'Atuo em projetos corporativos de alta criticidade e integração de sistemas. Sou bacharel em Sistemas de Informação e me comunico em português, inglês avançado e espanhol básico.',
    pillars: [
      ['01', 'Engenharia de Software', 'Aplicações confiáveis, APIs, microsserviços, testes e código sustentável.'],
      ['02', 'Arquitetura de Sistemas', 'Integrações, modelagem de sistemas e decisões técnicas fundamentadas.'],
      ['03', 'Engenharia de IA', 'Python, Machine Learning, LLMs, IA generativa e automação inteligente aplicada.'],
      ['04', 'Liderança Técnica', 'Mentoria, alinhamento técnico, revisão de código e melhoria contínua.'],
    ],
    projectsLabel: '02 — Projetos selecionados',
    projectsTitle: <>Experimentos que conectam<br /><span>engenharia e impacto.</span></>,
    projectsIntro: 'Uma seleção de laboratórios, produtos e soluções em diferentes estágios de construção.',
    filters: ['All', 'AI & GenAI', 'Architecture', 'Backend', 'Frontend', 'Full Stack'] as Filter[],
    projects: [
      { name: 'ForgeFlow AI', category: 'AI & GenAI' as Filter, status: 'Protótipo', desc: 'Estruturação e geração assistida de projetos de software, conectando contexto, arquitetura e execução.', accent: 'cyan', code: '01', icon: 'forge' as ProjectIcon, stack: ['AI', 'TypeScript', 'Java', 'Spring Boot'], image: '/assets/project-forgeflow.svg' },
      { name: 'PulseOps', category: 'AI & GenAI' as Filter, status: 'Conceitual', desc: 'Automação operacional para integrar monitoramento, processos e inteligência artificial.', accent: 'violet', code: '02', icon: 'pulse' as ProjectIcon, stack: ['AI', 'Automation', 'Observability'], image: '/assets/project-pulseops.svg' },
      { name: 'Software Architecture Lab', category: 'Architecture' as Filter, status: 'Em evolução', desc: 'Laboratório de APIs, microsserviços, integração de sistemas e testes automatizados.', accent: 'blue', code: '03', icon: 'architecture' as ProjectIcon, stack: ['Java', 'Spring Boot', 'Kafka', 'PostgreSQL', 'Docker'], image: '/assets/project-architecture-lab.svg' },
      { name: 'Moda Market', category: 'Frontend' as Filter, status: 'Demonstração', desc: 'Marketplace de moda com curadoria contemporânea, navegação editorial e experiência de descoberta de produtos.', accent: 'warm', code: '04', icon: 'fashion' as ProjectIcon, stack: ['React', 'TypeScript', 'Vite'], image: '/assets/project-moda-market.png' },
      { name: 'Brisa Market', category: 'Frontend' as Filter, status: 'Demonstração', desc: 'E-commerce de artigos para beach tennis com catálogo, categorias, vitrines e jornada de compra.', accent: 'cyan', code: '05', icon: 'brisa' as ProjectIcon, stack: ['React', 'TypeScript', 'Node.js', 'SQLite'], image: '/assets/project-brisa-market.png' },
      { name: 'Pizzaria Demo', category: 'Frontend' as Filter, status: 'Demonstração', desc: 'Interface para pedidos e atendimento de pizzaria, com cardápio, seleção de produtos e fluxo de pedido.', accent: 'violet', code: '06', icon: 'pizza' as ProjectIcon, stack: ['React', 'TypeScript', 'Material UI'], image: '/assets/project-pizzaria-demo.png' },
      { name: 'Full Stack Experiments', category: 'Full Stack' as Filter, status: 'Contínuo', desc: 'Aplicações web que conectam frontend, backend, persistência e serviços externos.', accent: 'blue', code: '07', icon: 'layers' as ProjectIcon, stack: ['React', 'TypeScript', 'APIs', 'SQLite'], image: '/assets/project-full-stack.svg' },
      ...additionalProjects,
    ],
    stackLabel: '03 — Ferramentas',
    stackTitle: <>A tecnologia é meio.<br /><span>O problema é o foco.</span></>,
    architectureLabel: '04 — Como penso sistemas',
    architectureTitle: 'Clareza antes da complexidade.',
    architectureText: 'Uma arquitetura saudável cria limites explícitos, reduz acoplamento e deixa o sistema pronto para mudar.',
    contactLabel: '05 — Vamos conversar',
    contactTitle: <>Tem um desafio<br /><span>interessante?</span></>,
    contactText: 'Estou aberto a oportunidades em engenharia de software, liderança técnica, arquitetura de sistemas, cloud e soluções com inteligência artificial.',
    footer: 'Construindo software. Projetando inteligência.',
  },
  en: {
    nav: ['About', 'Projects', 'Stack', 'Contact'],
    eyebrow: 'Senior software engineer · AI · cloud',
    title: <>Building systems.<br /><span>Engineering intelligence.</span></>,
    intro: 'Senior Software Engineer and AI Engineer with 10+ years of experience delivering mission-critical enterprise systems for banking and insurance.',
    work: 'Explore projects',
    contact: 'Get in touch',
    available: 'Open to conversations about engineering, architecture and AI.',
    aboutLabel: '01 — About me',
    aboutTitle: <>Beyond the <span>code.</span></>,
    about: 'I am Vicente Nícolas Soares Marques, a Senior Software Engineer with 10+ years of experience in Java, Spring Boot, REST APIs, microservices, Angular and enterprise systems integration.',
    about2: 'My work combines software architecture, cloud (AWS and Azure), DevOps practices and business awareness. I also build AI solutions with Python, Machine Learning and Generative AI, supported by an MBA in Data Science & Artificial Intelligence from FIAP.',
    about3: 'I work on mission-critical enterprise projects and systems integration. I hold a Bachelor’s degree in Information Systems and speak native Portuguese, advanced English and basic Spanish.',
    pillars: [
      ['01', 'Software Engineering', 'Reliable applications, APIs, microservices, testing and sustainable code.'],
      ['02', 'System Architecture', 'Integrations, system modeling and well-grounded technical decisions.'],
      ['03', 'AI Engineering', 'Python, Machine Learning, LLMs, generative AI and applied intelligent automation.'],
      ['04', 'Technical Leadership', 'Mentorship, technical alignment, code review and continuous improvement.'],
    ],
    projectsLabel: '02 — Selected projects',
    projectsTitle: <>Experiments connecting<br /><span>engineering and impact.</span></>,
    projectsIntro: 'A selection of labs, products and solutions in different stages of construction.',
    filters: ['All', 'AI & GenAI', 'Architecture', 'Backend', 'Frontend', 'Full Stack'] as Filter[],
    projects: [
      { name: 'ForgeFlow AI', category: 'AI & GenAI' as Filter, status: 'Prototype', desc: 'Assisted software project generation, connecting context, architecture and execution.', accent: 'cyan', code: '01', icon: 'forge' as ProjectIcon, stack: ['AI', 'TypeScript', 'Java', 'Spring Boot'], image: '/assets/project-forgeflow.svg' },
      { name: 'PulseOps', category: 'AI & GenAI' as Filter, status: 'Concept', desc: 'Operational automation integrating monitoring, processes and artificial intelligence.', accent: 'violet', code: '02', icon: 'pulse' as ProjectIcon, stack: ['AI', 'Automation', 'Observability'], image: '/assets/project-pulseops.svg' },
      { name: 'Software Architecture Lab', category: 'Architecture' as Filter, status: 'Evolving', desc: 'A lab for APIs, microservices, system integration and automated testing.', accent: 'blue', code: '03', icon: 'architecture' as ProjectIcon, stack: ['Java', 'Spring Boot', 'Kafka', 'PostgreSQL', 'Docker'], image: '/assets/project-architecture-lab.svg' },
      { name: 'Moda Market', category: 'Frontend' as Filter, status: 'Demo', desc: 'A contemporary fashion marketplace with editorial curation and a product discovery experience.', accent: 'warm', code: '04', icon: 'fashion' as ProjectIcon, stack: ['React', 'TypeScript', 'Vite'], image: '/assets/project-moda-market.png' },
      { name: 'Brisa Market', category: 'Frontend' as Filter, status: 'Demo', desc: 'A beach tennis e-commerce experience with catalog, categories, storefronts and a purchase journey.', accent: 'cyan', code: '05', icon: 'brisa' as ProjectIcon, stack: ['React', 'TypeScript', 'Node.js', 'SQLite'], image: '/assets/project-brisa-market.png' },
      { name: 'Pizzaria Demo', category: 'Frontend' as Filter, status: 'Demo', desc: 'A pizza ordering and service interface with menu, product selection and order flow.', accent: 'violet', code: '06', icon: 'pizza' as ProjectIcon, stack: ['React', 'TypeScript', 'Material UI'], image: '/assets/project-pizzaria-demo.png' },
      { name: 'Full Stack Experiments', category: 'Full Stack' as Filter, status: 'Ongoing', desc: 'Web applications connecting frontend, backend, persistence and external services.', accent: 'blue', code: '07', icon: 'layers' as ProjectIcon, stack: ['React', 'TypeScript', 'APIs', 'SQLite'], image: '/assets/project-full-stack.svg' },
      ...additionalProjects,
    ],
    stackLabel: '03 — Toolkit',
    stackTitle: <>Technology is the means.<br /><span>The problem comes first.</span></>,
    architectureLabel: '04 — How I think about systems',
    architectureTitle: 'Clarity before complexity.',
    architectureText: 'Healthy architecture creates explicit boundaries, reduces coupling and keeps systems ready to change.',
    contactLabel: '05 — Let’s talk',
    contactTitle: <>Have an interesting<br /><span>challenge?</span></>,
    contactText: 'I am open to opportunities in software engineering, technical leadership, system architecture, cloud and AI-powered solutions.',
    footer: 'Building software. Engineering intelligence.',
  },
}

const technologyCopy: Record<Language, Record<string, string>> = {
  pt: {
    AI: 'Inteligência artificial aplicada à automação e geração assistida.',
    TypeScript: 'Tipagem estática para interfaces e aplicações JavaScript mais seguras.',
    Java: 'Linguagem usada nos serviços e projetos backend documentados.',
    'Spring Boot': 'Framework Java para APIs e serviços backend.',
    Automation: 'Automação de processos operacionais e fluxos repetitivos.',
    Observability: 'Monitoramento, métricas, logs e visibilidade operacional.',
    React: 'Biblioteca usada para construir as interfaces dos produtos.',
    Vite: 'Ferramenta de desenvolvimento e build para aplicações frontend.',
    'Node.js': 'Runtime usado na API local do Brisa Market.',
    SQLite: 'Banco local usado para persistência e validação das demonstrações.',
    'Material UI': 'Componentes de interface usados no frontend da aplicação.',
    Kafka: 'Mensageria/eventos presente nos projetos de arquitetura documentados.',
    PostgreSQL: 'Banco relacional usado nos projetos backend documentados.',
    Docker: 'Empacotamento e execução reproduzível dos serviços.',
    APIs: 'Integração entre interfaces, serviços e dados.',
    Security: 'Proteção de endpoints, autenticação e regras de autorização.',
    RBAC: 'Controle de acesso baseado em papéis e permissões.',
    Audit: 'Registro imutável para rastrear ações administrativas.',
    Validation: 'Validação de entradas e regras de domínio na API.',
    Saga: 'Coordenação de etapas distribuídas com compensações.',
    Outbox: 'Persistência transacional de eventos antes da publicação.',
    Idempotency: 'Garantia de que uma mesma operação não seja processada duas vezes.',
    Actuator: 'Health checks e métricas operacionais do serviço.',
    'Multi-tenant': 'Isolamento de dados e contexto entre diferentes clientes.',
    WebSocket: 'Comunicação em tempo real para atualizações de mensagens.',
    Retry: 'Nova tentativa controlada após falhas temporárias.',
    DLQ: 'Fila para mensagens que excederam as tentativas de entrega.',
    'WhatsApp Cloud API': 'Integração oficial da Meta para receber e enviar mensagens.',
    Flyway: 'Versionamento controlado do schema do banco de dados.',
  },
  en: {
    AI: 'Artificial intelligence applied to automation and assisted generation.',
    TypeScript: 'Static typing for safer JavaScript interfaces and applications.',
    Java: 'Language used in documented backend services and projects.',
    'Spring Boot': 'Java framework for APIs and backend services.',
    Automation: 'Automation for operational processes and repetitive workflows.',
    Observability: 'Monitoring, metrics, logs and operational visibility.',
    React: 'Library used to build the product interfaces.',
    Vite: 'Development and build tool for frontend applications.',
    'Node.js': 'Runtime used by the Brisa Market local API.',
    SQLite: 'Local database used for persistence in the demos.',
    'Material UI': 'UI components used in the application frontend.',
    Kafka: 'Messaging/events present in documented architecture projects.',
    PostgreSQL: 'Relational database used in documented backend projects.',
    Docker: 'Reproducible packaging and execution for services.',
    APIs: 'Integration between interfaces, services and data.',
    Security: 'Endpoint protection, authentication and authorization rules.',
    RBAC: 'Role-based access control with explicit permissions.',
    Audit: 'Immutable records for tracing administrative actions.',
    Validation: 'Input validation and domain rules at the API boundary.',
    Saga: 'Coordination of distributed steps with compensating actions.',
    Outbox: 'Transactional event persistence before publication.',
    Idempotency: 'Guarantee that the same operation is not processed twice.',
    Actuator: 'Operational health checks and service metrics.',
    'Multi-tenant': 'Data and context isolation across different clients.',
    WebSocket: 'Real-time communication for message updates.',
    Retry: 'Controlled retry after temporary failures.',
    DLQ: 'Queue for messages that exceeded delivery attempts.',
    'WhatsApp Cloud API': 'Meta official integration for receiving and sending messages.',
    Flyway: 'Controlled database schema versioning.',
  },
}

function projectLinkLabel(language: Language, type: ProjectLinkType) {
  const labels = {
    pt: { front: 'Abrir front', api: 'Ver Swagger', docs: 'Ver Swagger', demo: 'Solicitar demo' },
    en: { front: 'Open frontend', api: 'View Swagger', docs: 'View Swagger', demo: 'Request demo' },
  }
  return labels[language][type]
}

function filterLabel(language: Language, filter: Filter) {
  if (language === 'en') return filter
  const labels: Record<Filter, string> = { All: 'Todos', 'AI & GenAI': 'IA e GenAI', Architecture: 'Arquitetura', Backend: 'Backend', Frontend: 'Frontend', 'Full Stack': 'Full Stack' }
  return labels[filter]
}

function apiDescription(language: Language, description: string) {
  if (language === 'en') return description
  const labels: Record<string, string> = {
    'Create an engineering project context': 'Criar o contexto de um projeto de engenharia',
    'Start an assisted generation run': 'Iniciar uma execução de geração assistida',
    'Read generation status and artifacts': 'Consultar o status e os artefatos gerados',
    'Check service health': 'Verificar a saúde do serviço',
    'List registered components': 'Listar componentes registrados',
    'Publish an integration event': 'Publicar um evento de integração',
    'List products': 'Listar produtos',
    'Add an item to a cart': 'Adicionar um item ao carrinho',
    'Start a checkout flow': 'Iniciar um fluxo de checkout',
    'Create a project intent': 'Criar a intenção de um projeto',
    'Generate a reviewable artifact set': 'Gerar um conjunto de artefatos revisáveis',
    'Check API health': 'Verificar a saúde da API',
    'Query the immutable audit trail': 'Consultar a trilha de auditoria imutável',
    'Read resource permissions': 'Consultar as permissões do recurso',
    'Read tenant scope': 'Consultar o escopo do tenant',
    'Start a Saga checkout': 'Iniciar um checkout com Saga',
    'Register a stock entry': 'Registrar uma entrada de estoque',
    'Reserve available stock': 'Reservar o estoque disponível',
    'List low-stock alerts': 'Listar alertas de estoque baixo',
    'Create an idempotent payment': 'Criar um pagamento idempotente',
    'Read payment state': 'Consultar o estado do pagamento',
    'Confirm a sandbox payment': 'Confirmar um pagamento de sandbox',
    'Enqueue a message': 'Enfileirar uma mensagem',
    'Read delivery status': 'Consultar o status de entrega',
    'Replay a dead-letter message': 'Reprocessar uma mensagem da fila de descarte',
    'Verify the Meta webhook challenge': 'Verificar o desafio do webhook da Meta',
    'Receive a WhatsApp notification': 'Receber uma notificação do WhatsApp',
    'Send a text through Cloud API': 'Enviar um texto pela Cloud API',
    'Create an order and outbox event': 'Criar um pedido e um evento Outbox',
    'Read processing status': 'Consultar o status de processamento',
    'Read operational metrics': 'Consultar as métricas operacionais',
  }
  return labels[description] || description
}

function architectureName(language: Language, name: string) {
  if (language === 'en') return name
  const labels: Record<string, string> = {
    Dashboard: 'Painel',
    'Automation Core': 'Núcleo de automação',
    Intelligence: 'Inteligência',
    Operations: 'Operações',
    Clients: 'Clientes',
    'API layer': 'Camada de API',
    'Event bus': 'Barramento de eventos',
    'Data layer': 'Camada de dados',
    Browser: 'Navegador',
    'UI build': 'Construção da interface',
    State: 'Estado',
    'Backend / DB': 'Backend / Banco',
    'Domain rules': 'Regras de domínio',
    Persistence: 'Persistência',
    'Local data': 'Dados locais',
    Frontend: 'Frontend',
    'API boundary': 'Limite da API',
    Services: 'Serviços',
  }
  return labels[name] || name
}

const architectureData: Record<ProjectIcon, { layers: [string, string][]; database: string; note: string }> = {
  forge: {
    layers: [['Interface / CLI', 'React · TypeScript'], ['Orquestração', 'Java · Spring Boot'], ['Geração assistida', 'AI · agentes'], ['Persistência', 'Não confirmada no protótipo']],
    database: 'Não definido',
    note: 'O núcleo coordena contexto, agentes, templates e revisão antes de gerar artefatos.',
  },
  pulse: {
    layers: [['Dashboard', 'React · TypeScript'], ['Automation Core', 'APIs · workflows'], ['Intelligence', 'AI · rules'], ['Operations', 'Observability · runbooks']],
    database: 'Não definido',
    note: 'Conceito operacional: sinais entram no núcleo, regras decidem e ações são encaminhadas ao time.',
  },
  architecture: {
    layers: [['Clients', 'Web · integrations'], ['API layer', 'Spring Boot'], ['Event bus', 'Kafka'], ['Data layer', 'PostgreSQL']],
    database: 'PostgreSQL',
    note: 'Serviços desacoplados comunicam eventos pelo Kafka e persistem dados relacionais no PostgreSQL.',
  },
  fashion: {
    layers: [['Browser', 'React'], ['UI build', 'TypeScript · Vite'], ['State', 'localStorage'], ['Backend / DB', 'Não implementado']],
    database: 'Nenhum backend confirmado',
    note: 'A demonstração é uma experiência frontend editorial; carrinho e favoritos ficam no navegador.',
  },
  brisa: {
    layers: [['Browser', 'React · TypeScript'], ['API local', 'Node.js'], ['Domain rules', 'REST · validation'], ['Persistence', 'SQLite']],
    database: 'SQLite',
    note: 'SQLite mantém a demonstração autônoma e simples de validar localmente, sem custo operacional.',
  },
  pizza: {
    layers: [['Interface', 'React · Material UI'], ['Application state', 'TypeScript'], ['Local data', 'Demo catalog'], ['Backend / DB', 'Não implementado']],
    database: 'Nenhum backend confirmado',
    note: 'A aplicação demonstra cardápio, pedidos e operação com dados locais de homologação.',
  },
  layers: {
    layers: [['Frontend', 'React · TypeScript'], ['API boundary', 'REST APIs'], ['Services', 'Backend modules'], ['Persistence', 'SQLite']],
    database: 'SQLite',
    note: 'Uma composição full stack para validar contratos entre interface, serviços e persistência.',
  },
}

function TechSymbol({ name }: { name: string }) {
  const symbols: Record<string, string> = { AI: '✦', TypeScript: 'TS', Java: '☕', 'Spring Boot': 'SB', Automation: '↻', Observability: '◌', React: '⚛', Vite: 'V', 'Node.js': 'JS', SQLite: 'DB', 'Material UI': 'MUI', Kafka: 'K', PostgreSQL: 'PG', Docker: '◇', APIs: '</>' }
  return <span className="tech-symbol" aria-hidden="true">{symbols[name] || '•'}</span>
}

function ProjectIcon({ name }: { name: ProjectIcon }) {
  const common = { viewBox: '0 0 48 48', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }
  if (name === 'forge') return <svg {...common}><path d="M24 6v9M15 10l6 6M33 10l-6 6M12 29h24l-4 8H16l-4-8Z" /><path d="M18 37h12M21 42h6M19 23h10" /></svg>
  if (name === 'pulse') return <svg {...common}><path d="M5 25h8l4-12 7 25 5-16 4 7h10" /><circle cx="24" cy="24" r="19" /></svg>
  if (name === 'architecture') return <svg {...common}><circle cx="10" cy="24" r="4" /><circle cx="24" cy="10" r="4" /><circle cx="38" cy="24" r="4" /><circle cx="24" cy="38" r="4" /><path d="m13 21 8-8M27 13l8 8M35 27l-8 8M21 35l-8-8" /></svg>
  if (name === 'fashion') return <svg {...common}><path d="M18 10c0 4 2 6 6 6s6-2 6-6M18 10c0-3 2-5 6-5s6 2 6 5M24 16 9 42h30L24 16Z" /></svg>
  if (name === 'brisa') return <svg {...common}><circle cx="24" cy="24" r="17" /><path d="M12 18c7 5 13 5 20 0M12 30c7-5 13-5 20 0M24 7v34" /></svg>
  if (name === 'pizza') return <svg {...common}><path d="m8 10 31 12-25 18L8 10Z" /><path d="m8 10 17 30M17 17h.1M28 23h.1M20 31h.1" /></svg>
  return <svg {...common}><path d="M8 12 24 6l16 6-16 6-16-6ZM8 24l16 6 16-6M8 34l16 6 16-6" /></svg>
}

function ArchitectureVisual({ icon, language }: { icon: ProjectIcon; language: Language }) {
  const architecture = architectureData[icon]
  const labels = uiCopy[language]
  return <div className="architecture-visual">
    <div className="architecture-topline"><span>{labels.architectureFlow}</span><span>{labels.liveModel}</span></div>
    <div className="architecture-flow">{architecture.layers.map(([name, tech], index) => <div className="architecture-node" key={name}><span>{String(index + 1).padStart(2, '0')}</span><strong>{architectureName(language, name)}</strong><small>{tech}</small>{index < architecture.layers.length - 1 && <b aria-hidden="true">→</b>}</div>)}</div>
    <div className="architecture-database"><span className="database-symbol">DB</span><div><strong>{architecture.database}</strong><small>{language === 'pt' ? 'banco / persistência' : 'database / persistence'}</small></div></div>
    <p className="architecture-note">{architecture.note}</p>
  </div>
}

function SwaggerPreview({ projectName, language, onClose }: { projectName: string; language: Language; onClose: () => void }) {
  const example = apiExamples[projectName]
  const labels = uiCopy[language]
  if (!example) return null
  return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={`Swagger preview for ${projectName}`} onClick={onClose}><div className="swagger-preview" onClick={(event) => event.stopPropagation()}><div className="swagger-head"><div><span className="swagger-kicker">{labels.openApi}</span><h3>{projectName}</h3><p>{language === 'pt' ? 'Contrato visual da API — exemplo não executável.' : 'Visual API contract — non-executable example.'}</p></div><button onClick={onClose} aria-label={language === 'pt' ? 'Fechar Swagger' : 'Close Swagger'}>×</button></div><div className="swagger-server"><span>{labels.server}</span><code>{example.base}</code></div><div className="swagger-endpoints">{example.endpoints.map(([method, path, description]) => <div className="swagger-endpoint" key={`${method}-${path}`}><strong className={method.toLowerCase()}>{method}</strong><code>{example.base}{path}</code><span>{apiDescription(language, description)}</span></div>)}</div></div></div>
}

function ResponsiveScreens({ projectName, language, context }: { projectName: string; language: Language; context: 'hover' | 'modal' }) {
  const shots = frontendShots[projectName]
  const labels = language === 'pt' ? ['PC', 'Tablet', 'Celular'] : ['Desktop', 'Tablet', 'Mobile']
  const devices = ['monitor', 'tablet', 'phone']
  return <div className={`responsive-devices responsive-devices-${context}`}>{shots.map((shot, index) => <figure className={`device-preview device-${devices[index]}`} key={shot}><div className="device-shell"><span className="device-camera" /><img src={shot} alt={`${projectName} ${labels[index]} screenshot`} /></div><figcaption>{labels[index]}</figcaption></figure>)}{context === 'hover' && <span className="responsive-devices-caption">{uiCopy[language].responsiveViews}</span>}</div>
}

function FrontendPreview({ projectName, language, onClose }: { projectName: string; language: Language; onClose: () => void }) {
  return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={`${projectName} frontend preview`} onClick={onClose}><div className="frontend-preview" onClick={(event) => event.stopPropagation()}><div className="frontend-preview-head"><div><span className="swagger-kicker">{uiCopy[language].frontendPreview}</span><h3>{projectName}</h3><p>{language === 'pt' ? 'PC, tablet e celular em uma única visualização.' : 'Desktop, tablet and mobile in one view.'}</p></div><button onClick={onClose} aria-label={language === 'pt' ? 'Fechar preview' : 'Close preview'}>×</button></div><ResponsiveScreens projectName={projectName} language={language} context="modal" /></div></div>
}

const technologies = [
  ['Backend', 'Java · Spring Boot · Python · REST · Microservices'],
  ['Frontend', 'TypeScript · React · Vite · HTML · CSS'],
  ['Cloud & DevOps', 'Docker · AWS · Azure · CI/CD · Observability'],
  ['AI Engineering', 'Python · Machine Learning · Data Science · LLMs · RAG · Generative AI'],
  ['Data', 'PostgreSQL · MySQL · SQL Server · Oracle'],
  ['Practices', 'Clean Architecture · DDD · Testing · Scrum · Kanban · Technical Leadership'],
]

function Arrow() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg> }
function Mark() { return <span className="mark" aria-hidden="true"><i /><i /><i /><i /></span> }

function App() {
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem('portfolio-lang') as Language) || 'pt')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [menu, setMenu] = useState(false)
  const [filter, setFilter] = useState<Filter>('All')
  const [activeTech, setActiveTech] = useState<string | null>(null)
  const [openArchitecture, setOpenArchitecture] = useState<string | null>(null)
  const [openApi, setOpenApi] = useState<string | null>(null)
  const [openFrontend, setOpenFrontend] = useState<string | null>(null)
  const t = copy[lang]

  useEffect(() => {
    localStorage.setItem('portfolio-lang', lang)
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
  }, [lang])

  const scrollTo = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }
  const visibleProjects = t.projects.filter((project) => filter === 'All' || project.category === filter)

  return <div className={`site ${theme}`}>
    <header className="header">
      <a className="brand" href="#home" aria-label="Vicente Nícolas home"><Mark /><span>vicente<span>.dev</span></span></a>
      <nav className={menu ? 'nav open' : 'nav'} aria-label="Primary navigation">
        {t.nav.map((item, index) => <a key={item} href={`#${['about', 'projects', 'stack', 'contact'][index]}`} onClick={() => setMenu(false)}>{item}</a>)}
      </nav>
      <div className="header-actions">
        <button className="language" onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')} aria-label="Change language">{lang === 'pt' ? 'EN' : 'PT'}</button>
        <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">{theme === 'dark' ? '☼' : '☾'}</button>
        <button className="menu-button" onClick={() => setMenu(!menu)} aria-label={menu ? 'Close menu' : 'Open menu'}>{menu ? '×' : '☰'}</button>
      </div>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow"><b />{t.eyebrow}</p>
          <h1>{t.title}</h1>
          <p className="hero-intro">{t.intro}</p>
          <div className="hero-actions"><a className="button primary" href="#projects">{t.work}<Arrow /></a><a className="inline-link" href="#contact">{t.contact}<Arrow /></a></div>
          <p className="availability"><span />{t.available}</p>
        </div>
        <div className="hero-portrait"><div className="portrait-frame"><img src="/assets/vicente-profile.png" alt="Vicente Nícolas trabalhando em seu escritório" /></div><span className="portrait-label">Software<br />Engineer <b>✦</b></span><span className="portrait-index">01 / 05</span></div>
        <div className="hero-grid" aria-hidden="true" />
      </section>

      <section className="section about" id="about">
        <div className="section-kicker"><span>{t.aboutLabel}</span><i /></div>
        <div className="about-grid"><div><h2>{t.aboutTitle}</h2></div><div className="about-copy"><p className="lead">{t.about}</p><p>{t.about2}</p><p>{t.about3}</p><a className="inline-link" href="#contact">{t.contact}<Arrow /></a></div></div>
        <div className="pillar-grid">{t.pillars.map(([number, title, text]) => <article className="pillar" key={number}><span>{number}</span><Mark /><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="section projects" id="projects">
        <div className="section-kicker"><span>{t.projectsLabel}</span><i /></div>
        <div className="projects-head"><div><h2>{t.projectsTitle}</h2><p>{t.projectsIntro}</p></div><span className="project-count">0{visibleProjects.length} / 0{t.projects.length}</span></div>
        <div className="filters" role="group" aria-label={lang === 'pt' ? 'Filtros de projetos' : 'Project filters'}>{t.filters.map((item) => <button className={filter === item ? 'active' : ''} key={item} onClick={() => setFilter(item)}>{filterLabel(lang, item)}</button>)}</div>
        <div className="project-grid">{visibleProjects.map((project) => <article className={`project-card ${project.accent}`} key={project.name}><div className={`project-visual ${openArchitecture === project.name ? 'architecture-open' : 'icon-mode'} ${frontendShots[project.name] ? 'has-responsive' : ''}`}>{openArchitecture === project.name ? <ArchitectureVisual icon={project.icon} language={lang} /> : <><span className="project-code">{project.code} / 24</span><div className="visual-lines"><i /><i /><i /></div><button className="project-icon" onClick={() => setOpenArchitecture(openArchitecture === project.name ? null : project.name)} aria-label={`${lang === 'pt' ? 'Ver arquitetura de' : 'View architecture for'} ${project.name}`}><ProjectIcon name={project.icon} /></button><div className="visual-orb"><span>{project.code}</span></div><span className="visual-caption">{project.category}</span>{frontendShots[project.name] && <div className="responsive-hover" aria-label={`${project.name} responsive screenshots`}><ResponsiveScreens projectName={project.name} language={lang} context="hover" /></div>}</>}</div><div className="project-body"><div className="project-meta"><span>{project.status}</span><button className="architecture-toggle" onClick={() => setOpenArchitecture(openArchitecture === project.name ? null : project.name)}>{openArchitecture === project.name ? uiCopy[lang].closeArchitecture : uiCopy[lang].viewArchitecture} <Arrow /></button></div><h3>{project.name}</h3><p>{project.desc}</p><div className="tags">{project.stack.map((tag) => <button className={activeTech === tag ? 'tech-tag active' : 'tech-tag'} data-tooltip={technologyCopy[lang][tag]} key={tag} onClick={() => setActiveTech(activeTech === tag ? null : tag)}><TechSymbol name={tag} />{tag}</button>)}</div>{project.stack.includes(activeTech || '') && <div className="tech-detail"><strong>{activeTech}</strong><span>{technologyCopy[lang][activeTech || '']}</span></div>} {projectLinks[project.name] && (projectLinks[project.name].type === 'front' ? <button className="project-link" onClick={() => setOpenFrontend(project.name)}>{projectLinkLabel(lang, projectLinks[project.name].type)} <Arrow /></button> : projectLinks[project.name].type === 'demo' ? <a className="project-link" href="#contact">{projectLinkLabel(lang, projectLinks[project.name].type)} <Arrow /></a> : <button className="project-link" onClick={() => setOpenApi(project.name)}>{projectLinkLabel(lang, projectLinks[project.name].type)} <Arrow /></button>)}</div></article>)}</div>
        {openApi && <SwaggerPreview projectName={openApi} language={lang} onClose={() => setOpenApi(null)} />}
        {openFrontend && <FrontendPreview projectName={openFrontend} language={lang} onClose={() => setOpenFrontend(null)} />}
      </section>

      <section className="section stack" id="stack">
        <div className="section-kicker"><span>{t.stackLabel}</span><i /></div>
        <div className="stack-head"><h2>{t.stackTitle}</h2><p>{t.architectureText}</p></div>
        <div className="tech-grid">{technologies.map(([name, items]) => <div className="tech-row" key={name}><span>{name}</span><p>{items}</p><b>↗</b></div>)}</div>
      </section>

      <section className="architecture"><div className="architecture-inner"><div className="section-kicker"><span>{t.architectureLabel}</span><i /></div><div className="architecture-copy"><h2>{t.architectureTitle}</h2><p>{t.architectureText}</p></div><div className="system-map" aria-label={lang === 'pt' ? 'Arquitetura conceitual do sistema' : 'Conceptual system architecture'}><div>{lang === 'pt' ? 'Frontend' : 'Frontend'}</div><b>→</b><div>{lang === 'pt' ? 'Camada de API' : 'API layer'}</div><b>→</b><div>{lang === 'pt' ? 'Serviços' : 'Services'}</div><b>→</b><div>{lang === 'pt' ? 'Dados' : 'Data'}</div><b>→</b><div>{lang === 'pt' ? 'IA + Nuvem' : 'AI + Cloud'}</div></div><small>{lang === 'pt' ? 'ARQUITETURA CONCEITUAL / PRINCÍPIOS ANTES DE PRESCRIÇÕES' : 'CONCEPTUAL ARCHITECTURE / PRINCIPLES OVER PRESCRIPTIONS'}</small></div></section>

      <section className="section contact" id="contact"><div className="section-kicker"><span>{t.contactLabel}</span><i /></div><div className="contact-grid"><div><h2>{t.contactTitle}</h2><p>{t.contactText}</p></div><div className="contact-links"><a href="https://outlook.office.com/mail/deeplink/compose?to=vicentenicolasmarques@gmail.com" target="_blank" rel="noreferrer"><span>01</span>E-mail<Arrow /></a><a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><span>02</span>LinkedIn<Arrow /></a><a href="https://github.com" target="_blank" rel="noreferrer"><span>03</span>GitHub<Arrow /></a></div></div></section>
    </main>
    <footer><a className="brand" href="#home"><Mark /><span>vicente<span>.dev</span></span></a><p>{t.footer}</p><span>© 2026</span></footer>
  </div>
}

createRoot(document.getElementById('root')!).render(<App />)
