'use client'

// 'use client' porque manejamos estado del formulario (useState)
// y el submit con fetch al API de Formspree.

import type { Metadata } from 'next'
import { useState } from 'react'

// ─── Por qué Formspree y no un backend propio ─────────────────────────────────
// Queremos cero servidor. Formspree recibe el POST del formulario,
// te reenvía el mensaje a tu email, y tiene un plan gratis de 50 envíos/mes
// — más que suficiente para un portafolio personal.
//
// SETUP (5 minutos):
// 1. Creá cuenta en https://formspree.io
// 2. Creá un nuevo form y copiá el endpoint (ej: https://formspree.io/f/xpwzabcd)
// 3. Reemplazá FORMSPREE_ENDPOINT abajo con tu endpoint real

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/TU_ID_ACÁ'

// Estado del formulario
type FormStatus = 'idle' | 'loading' | 'success' | 'error'

const CONTACT_LINKS = [
  {
    label: 'GitHub',
    value: '@tu-usuario',
    href: 'https://github.com/tu-usuario',
  },
  {
    label: 'LinkedIn',
    value: 'Tu Nombre',
    href: 'https://linkedin.com/in/tu-usuario',
  },
  {
    label: 'Email',
    value: 'tu@email.com',
    href: 'mailto:tu@email.com',
  },
]

export default function ContactoPage() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })

      if (response.ok) {
        setStatus('success')
        form.reset()
      } else {
        const body = await response.json()
        // Formspree devuelve errors en body.errors
        const msg = body?.errors?.map((e: { message: string }) => e.message).join(', ')
        setErrorMsg(msg || 'Algo salió mal. Intentá de nuevo.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('No se pudo enviar. Revisá tu conexión.')
      setStatus('error')
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">

      {/* Encabezado */}
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-6 bg-accent" />
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            hablemos
          </span>
        </div>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white">
          Contacto
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-text-muted">
          Disponible para proyectos freelance, consultas técnicas o simplemente
          para hablar de código. Respondó en menos de 24 horas.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2">

        {/* Columna izquierda — formulario */}
        <div>
          {status === 'success' ? (
            // Estado de éxito — reemplaza el formulario
            <div className="rounded-lg border border-accent-border bg-accent-muted p-8 text-center">
              <p className="mb-2 text-2xl">✓</p>
              <p className="font-bold text-white">Mensaje enviado</p>
              <p className="mt-2 text-sm text-text-muted">
                Te respondo pronto.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-6 font-mono text-xs text-accent underline underline-offset-4 transition-opacity hover:opacity-70"
              >
                enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Campo nombre */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block font-mono text-xs uppercase tracking-widest text-text-dim"
                >
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Tu nombre"
                  className="w-full rounded border border-border bg-bg-secondary px-4 py-3 text-sm text-text-secondary placeholder-text-dim outline-none transition-colors focus:border-accent"
                />
              </div>

              {/* Campo email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-mono text-xs uppercase tracking-widest text-text-dim"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="tu@email.com"
                  className="w-full rounded border border-border bg-bg-secondary px-4 py-3 text-sm text-text-secondary placeholder-text-dim outline-none transition-colors focus:border-accent"
                />
              </div>

              {/* Campo asunto */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block font-mono text-xs uppercase tracking-widest text-text-dim"
                >
                  Asunto
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="¿De qué querés hablar?"
                  className="w-full rounded border border-border bg-bg-secondary px-4 py-3 text-sm text-text-secondary placeholder-text-dim outline-none transition-colors focus:border-accent"
                />
              </div>

              {/* Campo mensaje */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block font-mono text-xs uppercase tracking-widest text-text-dim"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Contame tu proyecto o idea..."
                  className="w-full resize-none rounded border border-border bg-bg-secondary px-4 py-3 text-sm text-text-secondary placeholder-text-dim outline-none transition-colors focus:border-accent"
                />
              </div>

              {/* Error */}
              {status === 'error' && (
                <p className="rounded border border-[#3a1a1a] bg-[#1a0f0f] px-4 py-3 font-mono text-xs text-[#ff7e7e]">
                  ✗ {errorMsg}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="rounded bg-accent px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-bg-primary transition-all hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === 'loading' ? 'enviando...' : 'enviar mensaje →'}
              </button>

            </form>
          )}
        </div>

        {/* Columna derecha — links directos */}
        <div className="flex flex-col gap-6">
          <p className="font-mono text-xs uppercase tracking-widest text-text-dim">
            // también encontrarme en
          </p>

          <div className="flex flex-col gap-4">
            {CONTACT_LINKS.map(({ label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-lg border border-border bg-bg-secondary px-5 py-4 transition-colors hover:border-accent"
              >
                <div>
                  <p className="font-mono text-xs text-text-dim">{label}</p>
                  <p className="mt-0.5 text-sm font-medium text-text-secondary transition-colors group-hover:text-white">
                    {value}
                  </p>
                </div>
                <span className="text-text-dim transition-colors group-hover:text-accent">
                  ↗
                </span>
              </a>
            ))}
          </div>

          {/* Disponibilidad */}
          <div className="rounded-lg border border-accent-border bg-accent-muted p-5">
            <div className="mb-2 flex items-center gap-2">
              {/* Punto verde pulsante — señal de disponibilidad */}
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <p className="font-mono text-xs text-accent">Disponible para proyectos</p>
            </div>
            <p className="text-sm text-text-muted">
              Actualmente aceptando proyectos freelance y consultas técnicas.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}