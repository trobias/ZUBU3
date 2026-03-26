"use client"

import { useEffect, useMemo, useRef, useState } from "react"
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
  { from: "input", to: "validation" },
  { from: "input", to: "routing" },
  { from: "validation", to: "routing" },
  { from: "routing", to: "storage" },
  { from: "routing", to: "trigger" },
  { from: "storage", to: "output" },
  { from: "trigger", to: "output" },
]

const routeDefinitions = {
  upper: ["input", "validation", "routing", "storage", "output"],
  lower: ["input", "routing", "trigger", "output"],
} as const

type RouteId = keyof typeof routeDefinitions

type Particle = {
  id: number
  routeId: RouteId
  distance: number
  speed: number
  spawnedAtRouting: boolean
  invertColor: boolean
}

type RouteGeometry = {
  id: RouteId
  points: Array<{ x: number; y: number }>
  segmentLengths: number[]
  cumulativeLengths: number[]
  totalLength: number
  routingDistance: number
}

function getNodePosition(id: string) {
  const node = nodes.find((item) => item.id === id)
  return node ? { x: node.x, y: node.y } : { x: 0, y: 0 }
}

function createRouteGeometry(routeId: RouteId): RouteGeometry {
  const routeNodeIds = routeDefinitions[routeId]
  const points = routeNodeIds.map((nodeId) => getNodePosition(nodeId))
  const segmentLengths: number[] = []
  const cumulativeLengths: number[] = [0]

  let totalLength = 0
  for (let index = 0; index < points.length - 1; index += 1) {
    const fromPoint = points[index]
    const toPoint = points[index + 1]
    const length = Math.hypot(toPoint.x - fromPoint.x, toPoint.y - fromPoint.y)
    segmentLengths.push(length)
    totalLength += length
    cumulativeLengths.push(totalLength)
  }

  const routingIndex = routeNodeIds.indexOf("routing")
  const routingDistance = routingIndex > 0 ? cumulativeLengths[routingIndex] : 0

  return {
    id: routeId,
    points,
    segmentLengths,
    cumulativeLengths,
    totalLength,
    routingDistance,
  }
}

function getPositionAtDistance(route: RouteGeometry, distance: number) {
  if (route.totalLength <= 0) {
    return { x: route.points[0]?.x ?? 0, y: route.points[0]?.y ?? 0, segmentIndex: 0 }
  }

  const boundedDistance = Math.max(0, Math.min(distance, route.totalLength))

  for (let segmentIndex = 0; segmentIndex < route.segmentLengths.length; segmentIndex += 1) {
    const segmentStart = route.cumulativeLengths[segmentIndex]
    const segmentEnd = route.cumulativeLengths[segmentIndex + 1]

    if (boundedDistance <= segmentEnd) {
      const segmentLength = Math.max(route.segmentLengths[segmentIndex], 0.0001)
      const localProgress = (boundedDistance - segmentStart) / segmentLength
      const fromPoint = route.points[segmentIndex]
      const toPoint = route.points[segmentIndex + 1]

      return {
        x: fromPoint.x + (toPoint.x - fromPoint.x) * localProgress,
        y: fromPoint.y + (toPoint.y - fromPoint.y) * localProgress,
        segmentIndex,
      }
    }
  }

  const lastPoint = route.points[route.points.length - 1] ?? { x: 0, y: 0 }
  return { x: lastPoint.x, y: lastPoint.y, segmentIndex: Math.max(0, route.segmentLengths.length - 1) }
}

export function HeroConnectionsGraph() {
  const routeGeometries = useMemo(
    () => ({
      upper: createRouteGeometry("upper"),
      lower: createRouteGeometry("lower"),
    }),
    []
  )

  const nextParticleId = useRef(3)
  const lastFrameTime = useRef<number | null>(null)

  const [particles, setParticles] = useState<Particle[]>([
    {
      id: 1,
      routeId: "upper",
      distance: 0,
      speed: 18,
      spawnedAtRouting: false,
      invertColor: false,
    },
    {
      id: 2,
      routeId: "lower",
      distance: 0,
      speed: 18,
      spawnedAtRouting: false,
      invertColor: true,
    },
  ])

  useEffect(() => {
    let animationFrameId = 0

    const tick = (timestamp: number) => {
      if (lastFrameTime.current === null) {
        lastFrameTime.current = timestamp
      }

      const deltaSeconds = Math.min((timestamp - lastFrameTime.current) / 1000, 0.06)
      lastFrameTime.current = timestamp

      setParticles((previousParticles) => {
        const updatedParticles: Particle[] = []
        const newParticles: Particle[] = []

        for (const particle of previousParticles) {
          const route = routeGeometries[particle.routeId]
          const previousDistance = particle.distance
          let nextDistance = particle.distance + particle.speed * deltaSeconds
          let spawnedAtRouting = particle.spawnedAtRouting

          if (nextDistance >= route.totalLength) {
            nextDistance %= route.totalLength
            spawnedAtRouting = false
          }

          const crossesRoutingNode =
            !spawnedAtRouting &&
            route.routingDistance > 0 &&
            previousDistance < route.routingDistance &&
            nextDistance >= route.routingDistance

          if (crossesRoutingNode && previousParticles.length + newParticles.length < 8) {
            const alternateRouteId: RouteId = particle.routeId === "upper" ? "lower" : "upper"
            const alternateRoute = routeGeometries[alternateRouteId]

            newParticles.push({
              id: nextParticleId.current,
              routeId: alternateRouteId,
              distance: alternateRoute.routingDistance,
              speed: particle.speed,
              spawnedAtRouting: true,
              invertColor: !particle.invertColor,
            })
            nextParticleId.current += 1
            spawnedAtRouting = true
          }

          updatedParticles.push({
            ...particle,
            distance: nextDistance,
            spawnedAtRouting,
          })
        }

        return [...updatedParticles, ...newParticles]
      })

      animationFrameId = requestAnimationFrame(tick)
    }

    animationFrameId = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [routeGeometries])

  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px] min-h-[320px] rounded-[2.7rem] bg-[#f5f7fb] p-4">
      <div className="absolute inset-8 rounded-[2rem] border border-slate-100 opacity-70" />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
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
          const pathId = `zubu-conn-path-${index}`

          return (
            <g key={pathId}>
              <path
                id={pathId}
                d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
                fill="none"
                stroke="#8ea1ff"
                strokeWidth="0.6"
                strokeOpacity="0.5"
              />
            </g>
          )
        })}

        {particles.map((particle) => {
          const route = routeGeometries[particle.routeId]
          const position = getPositionAtDistance(route, particle.distance)
          const isDark = (position.segmentIndex + (particle.invertColor ? 1 : 0)) % 2 === 0

          return (
            <circle
              key={particle.id}
              cx={position.x}
              cy={position.y}
              r="1"
              fill={isDark ? "#0f172a" : "#ffffff"}
              stroke={isDark ? "#ffffff" : "#0f172a"}
              strokeWidth="0.18"
              filter="url(#zubu-signal-glow)"
            />
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
