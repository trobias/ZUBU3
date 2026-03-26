import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { About } from "@/components/landing/about"
import { Services } from "@/components/landing/services"
import { TargetAudience } from "@/components/landing/target-audience"
import { Differentiator } from "@/components/landing/differentiator"
import { Benefits } from "@/components/landing/benefits"
import { Testimonials } from "@/components/landing/testimonials"
import { CTA } from "@/components/landing/cta"
import { Footer } from "@/components/landing/footer"

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ZUBU Agency",
  url: "https://zubuagency.com",
  logo: "https://zubuagency.com/icon.svg",
  email: "agencyzubu@gmail.com",
  sameAs: [
    "https://www.instagram.com/zubudevagency/",
    "https://linkedin.com",
  ],
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "ZUBU Agency",
  url: "https://zubuagency.com",
  serviceType: [
    "Automatización de procesos",
    "Desarrollo de software a medida",
    "Inteligencia artificial aplicada",
  ],
  areaServed: "AR",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Posadas",
    addressRegion: "Misiones",
    addressCountry: "AR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "agencyzubu@gmail.com",
  },
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <TargetAudience />
        <Differentiator />
        <Benefits />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
