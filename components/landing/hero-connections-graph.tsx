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
    label: "Input",
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
    label: "Routing",
    icon: Zap,
    x: 50,
    y: 52,
    positionClass: "left-[50%] top-[52%]",
    delayClass: "[animation-delay:0.24s]",
  },
  {
    id: "storage",
    label: "Storage",
    icon: Database,
    x: 72,
    y: 22,
    positionClass: "left-[72%] top-[22%]",
    delayClass: "[animation-delay:0.36s]",
  },
  {
    id: "trigger",
    label: "Trigger",
    icon: FileCheck,
    x: 72,
    y: 82,
    positionClass: "left-[72%] top-[82%]",
    delayClass: "[animation-delay:0.48s]",
  },
  {
    id: "output",
    label: "Output",
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
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px] min-h-[320px] rounded-[2.5rem] border border-slate-200/80 bg-white/75 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.1)] backdrop-blur-sm">
      <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-[#8ed0ff]/10 via-transparent to-[#ffd8b8]/10" />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <linearGradient id="zubu-path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6ec5ff" />
            <stop offset="100%" stopColor="#4f46e5" />
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
                strokeWidth="0.45"
                strokeOpacity="0.45"
                className={`animate-zubu-network-path ${connection.delayClass}`}
              />

              <circle r="0.9" fill="#6ec5ff" filter="url(#zubu-signal-glow)">
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
              className={`relative rounded-2xl border border-slate-200 bg-white/90 px-2.5 py-2 text-center shadow-sm sm:px-3 sm:py-2.5 ${
                node.endpoint ? "min-w-[82px] sm:min-w-[98px]" : "min-w-[72px] sm:min-w-[88px]"
              }`}
            >
              <div className="mx-auto mb-1.5 flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 sm:h-9 sm:w-9">
                <Icon className="h-4 w-4 text-slate-800" />
              </div>
              <span className="block text-[10px] font-semibold text-slate-700 sm:text-xs">{node.label}</span>
              {node.endpoint && (
                <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5 rounded-full bg-[#6ec5ff]">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6ec5ff]/75" />
                </span>
              )}
            </div>
          </div>
        )
      })}

      <div className="absolute bottom-3 left-4 right-4 flex justify-between text-[9px] font-medium uppercase tracking-wide text-slate-400 sm:text-[10px]">
        <span>Flow: ZUBU_001</span>
        <span>Active</span>
      </div>
    </div>
  )
}
