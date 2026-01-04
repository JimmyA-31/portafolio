import { useRef } from 'react'
import type { PropsWithChildren} from 'react'

type Props = PropsWithChildren<{
  className?: string
  style?: React.CSSProperties
}>

export default function TiltCard({ className = '', style, children }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height

    const rotY = (px - 0.5) * 14   // izquierda/derecha
    const rotX = (0.5 - py) * 12   // arriba/abajo

    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`panel glowNeon ${className}`}
      style={{ ...style }}
    >
      {children}
    </div>
  )
}
