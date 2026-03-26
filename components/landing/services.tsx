import { 
  MessageSquare, 
  Cog, 
  Wallet,
  Users,
  Bot 
} from "lucide-react"

const services = [
  {
    icon: MessageSquare,
    title: "Atención + Ventas",
    description: "Automatizamos la comunicación para que no se te escapen clientes ni consultas.",
    points: [
      "WhatsApp automatizado (chat + voz)",
      "Captura de leads sin esfuerzo",
      "Seguimientos automáticos (mismo día y días posteriores)",
      "Reactivación de clientes y pedidos de reseñas",
      "Call center virtual",
    ],
  },
  {
    icon: Cog,
    title: "Operación",
    description: "Hacemos que las tareas del día a día se ejecuten solas y en orden.",
    points: [
      "Reservas conectadas con calendario",
      "Stock, pedidos y proveedores sincronizados",
      "Documentos automáticos",
      "Archivos y datos centralizados",
      "Coordinación de reuniones sin fricción",
    ],
  },
  {
    icon: Wallet,
    title: "Finanzas",
    description: "Controlás ingresos y gastos con procesos automáticos, sin depender de planillas sueltas.",
    points: [
      "Cobros automáticos",
      "Conciliaciones más rápidas",
      "Gastos y presupuestos ordenados",
      "Proyecciones para decidir mejor",
      "Facturación express",
    ],
  },
  {
    icon: Users,
    title: "Gestión Interna",
    description: "Estandarizamos la operación interna para que el equipo trabaje con claridad.",
    points: [
      "Tareas y SLA con seguimiento",
      "Checklists operativos",
      "Onboarding y offboarding",
      "Ausencias y reemplazos",
      "Feedback y performance",
    ],
  },
  {
    icon: Bot,
    title: "Datos + IA",
    description: "La inteligencia artificial no solo analiza: también ejecuta acciones reales para tu negocio.",
    points: [
      "OCR inteligente para leer documentos",
      "Datos y KPIs automáticos (ETL/ELT)",
      "Agente analista",
      "Agente auditor",
      "Agente QA/marketing",
      "Alertas automáticas y respaldos cloud",
    ],
  },
]

export function Services() {
  return (
    <section id="servicios" className="section-interactive bg-background pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Lo que hacemos por tu negocio
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Te ayudamos a vender más, ordenar operaciones y ganar tiempo con sistemas simples de usar.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group hover-lift-card rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-border hover:shadow-md"
            >
              <div className="motion-icon mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-muted transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <ul className="mt-4 space-y-1.5">
                {service.points.map((point) => (
                  <li key={point} className="text-sm text-foreground/85">
                    • {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
