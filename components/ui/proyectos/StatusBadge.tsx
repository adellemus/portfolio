// Badge de estado del proyecto — color según si está en producción, en desarrollo, etc.
export function StatusBadge({ status, type }: { status: string; type: string }) {
  const styles: Record<string, string> = {
    'activo': 'bg-estado-activo-bg text-estado-activo border-estado-activo-border',
    'desarrollo': 'bg-estado-desarrollo-bg text-estado-desarrollo border-estado-desarrollo-border',
    'wip': 'bg-estado-wip-bg text-estado-wip border-estado-wip-border',
    'profesional': 'bg-estado-profesional-bg text-estado-profesional border-estado-profesional-border',
  }
  const style = styles[type] ?? styles['wip']

  return (
    <span className={`rounded border px-2 py-0.5 font-mono text-xs ${style}`}>
      {status}
    </span>
  )
}
