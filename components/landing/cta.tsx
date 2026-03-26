"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, CalendarDays, Mail, MessageCircle, ExternalLink } from "lucide-react"

type ContactChannel = "whatsapp" | "mail" | "agenda"
type MailProvider = "gmail" | "outlook"

export function CTA() {
  const [activeChannel, setActiveChannel] = useState<ContactChannel>("whatsapp")
  const [mailProvider, setMailProvider] = useState<MailProvider>("gmail")

  const emailHref =
    mailProvider === "gmail"
      ? "https://mail.google.com/mail/?view=cm&fs=1&to=agencyzubu@gmail.com&su=Consulta%20desde%20la%20web"
      : "https://outlook.office.com/mail/deeplink/compose?to=agencyzubu@gmail.com&subject=Consulta%20desde%20la%20web"

  return (
    <section id="contacto" className="section-interactive bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="hover-lift-soft relative overflow-hidden rounded-3xl border border-border/60 bg-card px-6 py-16 shadow-sm sm:px-12 sm:py-20 lg:px-16">
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-muted/50" />
          <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-muted/50" />

          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Transformá procesos manuales en sistemas inteligentes
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Empezá con un diagnóstico gratuito. Elegí cómo querés hablar con nosotros y activá el canal en un click.
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <button
                className={`contact-chip ${activeChannel === "whatsapp" ? "contact-chip--active-whatsapp" : ""}`}
                onClick={() => setActiveChannel("whatsapp")}
                type="button"
              >
                <MessageCircle className="motion-icon h-4 w-4" /> WhatsApp
              </button>
              <button
                className={`contact-chip ${activeChannel === "mail" ? "contact-chip--active-mail" : ""}`}
                onClick={() => setActiveChannel("mail")}
                type="button"
              >
                <Mail className="motion-icon motion-icon-delay-1 h-4 w-4" /> Mail
              </button>
              <button
                className={`contact-chip ${activeChannel === "agenda" ? "contact-chip--active-agenda" : ""}`}
                onClick={() => setActiveChannel("agenda")}
                type="button"
              >
                <CalendarDays className="motion-icon motion-icon-delay-2 h-4 w-4" /> Agendar
              </button>
            </div>

            <div className="contact-panel mt-6 rounded-2xl border border-border/60 bg-background/70 p-5 text-left sm:p-6">
              {activeChannel === "whatsapp" && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Abrí WhatsApp y te preparamos el mensaje inicial automáticamente.</p>
                  <Button asChild size="lg" className="btn-energized h-12 w-full bg-[#25D366] text-white hover:bg-[#1ebe5b]">
                    <a href="https://wa.me/5493764502803?text=Hola%20ZUBU,%20quiero%20automatizar%20mi%20negocio" target="_blank" rel="noopener noreferrer">
                      Ir a WhatsApp
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              )}

              {activeChannel === "mail" && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Elegí desde dónde querés enviar el correo.</p>
                  <div className="flex flex-wrap gap-2">
                    <button type="button" className={`mail-chip ${mailProvider === "gmail" ? "mail-chip--active" : ""}`} onClick={() => setMailProvider("gmail")}>Gmail</button>
                    <button type="button" className={`mail-chip ${mailProvider === "outlook" ? "mail-chip--active" : ""}`} onClick={() => setMailProvider("outlook")}>Outlook</button>
                  </div>
                  <Button asChild size="lg" className="btn-energized h-12 w-full bg-black text-white hover:bg-black/85">
                    <a href={emailHref} target="_blank" rel="noopener noreferrer">
                      Abrir {mailProvider === "gmail" ? "Gmail" : "Outlook"}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              )}

              {activeChannel === "agenda" && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Agendá el día que quieras: la reunión es por Google Meet y te enviamos una propuesta de automatización según tu negocio.</p>
                  <Button asChild size="lg" className="btn-energized h-12 w-full bg-[#4f46e5] text-white hover:bg-[#4338ca]">
                    <a href="https://calendar.app.google/B2iUdXjH8gJhrofL7" target="_blank" rel="noopener noreferrer">
                      Agendar reunión por Google Meet
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              )}
            </div>

            <div className="mt-8">
              <Button asChild size="lg" className="btn-energized h-14 w-full px-10 text-base sm:w-auto">
                <a href="#servicios">
                  Quiero automatizar mi negocio
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Sin compromiso. Respondemos en menos de 24 horas.
            </p>
          </div>
        </div>
      </div>
      </section>
  )
}
