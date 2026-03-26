"use client"

import { useRef } from "react"
import { AlertTriangle, ArrowRightLeft, CheckCircle2, Sparkles } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

const useCases = [
  {
    problem: "Te escriben y respondés tarde.",
    solution: "WhatsApp automático que responde y clasifica solo.",
    result: "Más respuestas y más ventas.",
  },
  {
    problem: "Reservas y cobros te consumen tiempo.",
    solution: "Flujos automáticos con calendario y pagos.",
    result: "Menos errores y menos trabajo manual.",
  },
  {
    problem: "Tenés datos sueltos y poco control.",
    solution: "Tableros claros en un solo lugar.",
    result: "Decisiones rápidas con números reales.",
  },
  {
    problem: "Tu equipo repite tareas todos los días.",
    solution: "Automatización + IA para ejecutar por vos.",
    result: "Más foco en crecer, menos desgaste.",
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
        <div className="problem-showcase-orb absolute left-[8%] top-10 h-40 w-40 rounded-full bg-black/10 blur-3xl" />
        <div className="problem-showcase-orb absolute right-[10%] bottom-10 h-44 w-44 rounded-full bg-black/10 blur-3xl [animation-delay:0.45s]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="problem-showcase-title mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-black/70">
            <Sparkles className="h-3.5 w-3.5" />
            Problema diario → Solución
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Menos caos diario. Más sistema.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Te mostramos el problema y la solución en simple.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:mt-14 md:grid-cols-2">
          {useCases.map((item, index) => (
            <article
              key={item.problem}
              className="problem-card group relative overflow-hidden rounded-2xl border border-black/20 bg-white p-0 shadow-[0_10px_26px_rgba(15,23,42,0.08)]"
              onMouseMove={handleCardMove}
              onMouseLeave={handleCardLeave}
            >
              <div className="problem-card-glow pointer-events-none absolute -inset-px rounded-2xl border border-black/20 opacity-35" />

              <div className="grid sm:grid-cols-[1fr_auto_1fr] sm:items-stretch">
                <div className="bg-black px-5 py-5 text-white sm:px-6 sm:py-6">
                  <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/75">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    Problema
                  </p>
                  <p className="text-sm leading-relaxed text-white">{item.problem}</p>
                </div>

                <div className="hidden sm:flex sm:h-full sm:items-center sm:justify-center">
                  <div className="relative h-full min-h-24 w-8">
                    <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-black/20 via-black/70 to-black/20" />
                    <span className="problem-beam-dot absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
                  </div>
                </div>

                <div className="bg-white px-5 py-5 sm:px-6 sm:py-6">
                  <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-black/70">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Solución
                  </p>
                  <p className="text-sm leading-relaxed text-black">{item.solution}</p>
                </div>
              </div>

              <div className="m-5 mt-4 inline-flex items-center gap-2 rounded-lg border border-black/20 bg-white px-3 py-2 text-xs font-medium text-black sm:m-6 sm:text-sm">
                <ArrowRightLeft className="h-3.5 w-3.5" />
                Resultado: {item.result}
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-colors duration-300 group-hover:border-black/35" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
