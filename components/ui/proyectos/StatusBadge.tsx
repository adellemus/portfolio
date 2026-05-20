// Badge de estado del proyecto — color según si está en producción, en desarrollo, etc.
export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    'producción': 'bg-[#0f2a1f] text-[#28c941] border-[#1a4a2a]',
    'cliente':    'bg-[#1a1a0f] text-[#f7c07e] border-[#3a3a1a]',
    'wip':        'bg-[#1a0f0f] text-[#ff7e7e] border-[#3a1a1a]',
  }
  const style = styles[status] ?? styles['wip']

  return (
    <span className={`rounded border px-2 py-0.5 font-mono text-xs ${style}`}>
      {status}
    </span>
  )
}