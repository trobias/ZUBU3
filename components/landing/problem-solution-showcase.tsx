"use client"

import { useRef } from "react"
import { AlertTriangle, ArrowRightLeft, CheckCircle2, Sparkles } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

const useCases = [
  {
    problem: "Perdés ventas por responder tarde WhatsApp.",
    solution: "Implementamos bot + enrutado automático por tipo de consulta.",
    result: "Respuestas en minutos y más cierres sin sumar personal.",
  },
  {
    problem: "Cobros, reservas y recordatorios se hacen manualmente.",
    solution: "Creamos flujos automáticos conectados a calendario y pagos.",
    result: "Menos errores operativos y mejor experiencia del cliente.",
  },
  {
    problem: "Los datos están en planillas sueltas y no hay control.",
    solution: "Unificamos información en paneles y sistemas a medida.",
    result: "Decisiones más rápidas con métricas claras en tiempo real.",
  },
  {
    problem: "Tu equipo repite tareas todos los días.",
    solution: "Automatizamos procesos repetitivos con reglas e IA aplicada.",
    result: "Más foco en tareas estratégicas y menos desgaste del equipo.",
  },
]

export function ProblemSolutionShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } })

      timeline.from(".problem-showcase-title", {
        y: 26,
        opacity: 0,
        duration: 0.7,
      })

      timeline.from(
        ".problem-card",
        {
          y: 34,
          opacity: 0,
          scale: 0.97,
          duration: 0.6,
          stagger: 0.09,
        },
        "-=0.35"
      )

      gsap.to(".problem-beam-dot", {
        y: -9,
        repeat: -1,
        yoyo: true,
        duration: 1.15,
        ease: "sine.inOut",
      })

      gsap.to(".problem-card-glow", {
        opacity: 0.8,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        stagger: 0.14,
        ease: "sine.inOut",
      })
    },
    { scope: sectionRef }
  )

  const handleCardMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget
    const bounds = card.getBoundingClientRect()
    const offsetX = (event.clientX - bounds.left - bounds.width / 2) / 20
    const offsetY = (event.clientY - bounds.top - bounds.height / 2) / 26

    gsap.to(card, {
      x: offsetX,
      y: offsetY,
      duration: 0.32,
      ease: "power2.out",
      overwrite: "auto",
    })
  }

  const handleCardLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(event.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: "power3.out",
      overwrite: "auto",
    })
  }

  return (
    <section ref={sectionRef} className="section-interactive relative overflow-hidden bg-background py-20 sm:py-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="problem-showcase-orb absolute left-[8%] top-10 h-40 w-40 rounded-full bg-blue-200/25 blur-3xl" />
        <div className="problem-showcase-orb absolute right-[10%] bottom-10 h-44 w-44 rounded-full bg-indigo-200/25 blur-3xl [animation-delay:0.45s]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="problem-showcase-title mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            Problema diario → Solución ZUBU
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Lo que hoy te frena, nosotros lo convertimos en un sistema que trabaja por vos
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Cada caso combina automatización, software e IA aplicada según tu operación real.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:mt-14 md:grid-cols-2">
          {useCases.map((item, index) => (
            <article
              key={item.problem}
              className="problem-card group relative overflow-hidden rounded-2xl border border-border/70 bg-card/95 p-5 shadow-[0_10px_26px_rgba(15,23,42,0.08)] sm:p-6"
              onMouseMove={handleCardMove}
              onMouseLeave={handleCardLeave}
            >
              <div className="problem-card-glow pointer-events-none absolute -inset-px rounded-2xl border border-blue-200/35 opacity-35" />

              <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-start">
                <div>
                  <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-red-500">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    Problema
                  </p>
                  <p className="text-sm leading-relaxed text-foreground/90">{item.problem}</p>
                </div>

                <div className="hidden sm:flex sm:h-full sm:items-center sm:justify-center">
                  <div className="relative h-full min-h-24 w-8">
                    <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-blue-300/20 via-indigo-300/70 to-emerald-300/20" />
                    <span className="problem-beam-dot absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500" />
                  </div>
                </div>

                <div>
                  <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald-600">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Solución ZUBU
                  </p>
                  <p className="text-sm leading-relaxed text-foreground/90">{item.solution}</p>
                </div>
              </div>

              <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-xs font-medium text-foreground/90 sm:text-sm">
                <ArrowRightLeft className="h-3.5 w-3.5" />
                Resultado: {item.result}
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-colors duration-300 group-hover:border-blue-300/35" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
