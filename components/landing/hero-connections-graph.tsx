import {
  MessageSquare,
  Database,
  Zap,
  FileCheck,
  Send,
  CheckCircle2,
} from "lucide-react"

const nodes = [
  {
    id: "input",
    label: "Entrada",
    icon: MessageSquare,
    x: 8,
    y: 52,
    endpoint: true,
    positionClass: "left-[8%] top-[52%]",
    delayClass: "[animation-delay:0s]",
  },
  {
    id: "validation",
    label: "Validación",
    icon: CheckCircle2,
    x: 30,
    y: 22,
    positionClass: "left-[30%] top-[22%]",
    delayClass: "[animation-delay:0.12s]",
  },
  {
    id: "routing",
    label: "Enrutamiento",
    icon: Zap,
    x: 50,
    y: 52,
    positionClass: "left-[50%] top-[52%]",
    delayClass: "[animation-delay:0.24s]",
  },
  {
    id: "storage",
    label: "Almacenamiento",
    icon: Database,
    x: 72,
    y: 22,
    positionClass: "left-[72%] top-[22%]",
    delayClass: "[animation-delay:0.36s]",
  },
  {
    id: "trigger",
    label: "Disparo",
    icon: FileCheck,
    x: 72,
    y: 82,
    positionClass: "left-[72%] top-[82%]",
    delayClass: "[animation-delay:0.48s]",
  },
  {
    id: "output",
    label: "Salida",
    icon: Send,
    x: 92,
    y: 52,
    endpoint: true,
    positionClass: "left-[92%] top-[52%]",
    delayClass: "[animation-delay:0.6s]",
  },
]

const connections = [
  { from: "input", to: "validation", delayClass: "[animation-delay:0s]" },
  { from: "input", to: "routing", delayClass: "[animation-delay:0.18s]" },
  { from: "validation", to: "routing", delayClass: "[animation-delay:0.36s]" },
  { from: "routing", to: "storage", delayClass: "[animation-delay:0.54s]" },
  { from: "routing", to: "trigger", delayClass: "[animation-delay:0.72s]" },
  { from: "storage", to: "output", delayClass: "[animation-delay:0.9s]" },
  { from: "trigger", to: "output", delayClass: "[animation-delay:1.08s]" },
]

function getNodePosition(id: string) {
  const node = nodes.find((item) => item.id === id)
  return node ? { x: node.x, y: node.y } : { x: 0, y: 0 }
}

export function HeroConnectionsGraph() {
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px] min-h-[320px] p-4">
      <div className="absolute inset-0 rounded-[2.7rem] bg-gradient-to-br from-[#a7d7ff]/12 via-transparent to-[#ffd6b3]/14" />
      <div className="absolute -left-2 top-10 h-32 w-32 animate-zubu-orbit rounded-full bg-[#a7d7ff]/25 blur-3xl" />
      <div className="absolute -right-4 bottom-10 h-36 w-36 animate-zubu-orbit-reverse rounded-full bg-[#ffd6b3]/25 blur-3xl" />
      <div className="absolute inset-8 rounded-[2rem] border border-white/40 opacity-70" />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <linearGradient id="zubu-path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#74bdf2" />
            <stop offset="50%" stopColor="#8ea1ff" />
            <stop offset="100%" stopColor="#f1b68d" />
          </linearGradient>
          <filter id="zubu-signal-glow">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {connections.map((connection, index) => {
          const from = getNodePosition(connection.from)
          const to = getNodePosition(connection.to)
          const midX = (from.x + to.x) / 2
          const midY = (from.y + to.y) / 2 + (index % 2 === 0 ? -5 : 5)
          const pathId = `zubu-conn-path-${index}`

          return (
            <g key={pathId}>
              <path
                id={pathId}
                d={`M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`}
                fill="none"
                stroke="url(#zubu-path-gradient)"
                strokeWidth="0.6"
                strokeOpacity="0.52"
                className={`animate-zubu-network-path ${connection.delayClass}`}
              />

              <circle r="1" fill="#7ec9ff" filter="url(#zubu-signal-glow)" className="animate-zubu-signal-soft">
                <animateMotion dur={`${2.2 + index * 0.25}s`} repeatCount="indefinite" begin={`${index * 0.45}s`}>
                  <mpath href={`#${pathId}`} />
                </animateMotion>
              </circle>
            </g>
          )
        })}
      </svg>

      {nodes.map((node, index) => {
        const Icon = node.icon

        return (
          <div
            key={node.id}
            className={`absolute -translate-x-1/2 -translate-y-1/2 ${node.positionClass} ${node.delayClass} ${node.endpoint ? "animate-hero-float" : "animate-hero-float-delayed"}`}
          >
            <div
              className={`relative rounded-2xl border border-white/60 bg-white/65 px-2.5 py-2 text-center shadow-[0_8px_24px_rgba(148,163,184,0.24)] backdrop-blur-md sm:px-3 sm:py-2.5 ${
                node.endpoint ? "min-w-[82px] sm:min-w-[98px]" : "min-w-[72px] sm:min-w-[88px]"
              }`}
            >
              <div className="mx-auto mb-1.5 flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-white sm:h-9 sm:w-9">
                <Icon className="h-4 w-4 text-slate-800" />
              </div>
              <span className="block text-[10px] font-semibold text-slate-700 sm:text-xs">{node.label}</span>
              {node.endpoint && (
                <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5 rounded-full bg-[#74bdf2]">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#74bdf2]/75" />
                </span>
              )}
            </div>
          </div>
        )
      })}

      <div className="absolute bottom-3 left-4 right-4 flex justify-between text-[9px] font-medium uppercase tracking-wide text-slate-500/80 sm:text-[10px]">
        <span>Flujo: ZUBU_001</span>
        <span>Activo</span>
      </div>
    </div>
  )
}
