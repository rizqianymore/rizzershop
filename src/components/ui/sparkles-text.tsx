import React, { useEffect, useState, type CSSProperties } from "react"
import { cn } from "@/lib/utils"

interface Sparkle {
  id: string
  x: string
  y: string
  color: string
  delay: number
  scale: number
}

const SPARKLE_KEYFRAMES = `
@keyframes sparkle-spin {
  0% { opacity: 0; transform: translate(-50%, -50%) scale(0) rotate(0deg); }
  50% { opacity: 0.3; transform: translate(-50%, -50%) scale(1) rotate(45deg); }
  100% { opacity: 0; transform: translate(-50%, -50%) scale(0.3) rotate(90deg); }
}
`

if (typeof document !== "undefined" && !document.getElementById("sparkle-keyframes")) {
  const style = document.createElement("style")
  style.id = "sparkle-keyframes"
  style.textContent = SPARKLE_KEYFRAMES
  document.head.appendChild(style)
}

const SparkleIcon: React.FC<Sparkle> = ({ id, x, y, color, delay, scale }) => {
  return (
    <svg
      key={id}
      className="pointer-events-none absolute z-20"
      style={{
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        animation: `sparkle-spin 1.2s ease-in-out infinite alternate`,
        animationDelay: `${delay}s`,
      }}
      width="16"
      height="16"
      viewBox="0 0 21 21"
    >
      <path
        d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z"
        fill={color}
      />
    </svg>
  )
}

interface SparklesTextProps {
  className?: string
  textClassName?: string
  children: React.ReactNode
  sparklesCount?: number
  colors?: {
    first: string
    second: string
  }
}

export const SparklesText: React.FC<SparklesTextProps> = ({
  children,
  colors = { first: "#38bdf8", second: "#60a5fa" },
  className,
  textClassName,
  sparklesCount = 4,
  ...props
}) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    const generateStar = (index: number): Sparkle => {
      const starX = `${15 + Math.random() * 70}%`
      const starY = `${15 + Math.random() * 70}%`
      const color = index % 2 === 0 ? colors.first : colors.second
      const delay = (index * 0.3) % 2
      const scale = 0.3 + Math.random() * 0.3
      const id = `${index}-${Date.now()}-${Math.random()}`
      return { id, x: starX, y: starY, color, delay, scale }
    }

    const init = Array.from({ length: sparklesCount }, (_, i) => generateStar(i))
    setSparkles(init)

    const interval = setInterval(() => {
      setSparkles((prev) =>
        prev.map((star, idx) => {
          if (Math.random() > 0.15) {
            return generateStar(idx)
          }
          return star
        })
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [colors.first, colors.second, sparklesCount])

  return (
    <div
      className={cn("relative inline-block", className)}
      {...props}
      style={{
        "--sparkles-first-color": colors.first,
        "--sparkles-second-color": colors.second,
      } as CSSProperties}
    >
      <span className="relative inline-block" style={{ position: "relative", zIndex: 1 }}>
        {sparkles.map((sparkle) => (
          <SparkleIcon key={sparkle.id} {...sparkle} />
        ))}
        <span className={cn("relative", textClassName)} style={{ zIndex: 2 }}>{children}</span>
      </span>
    </div>
  )
}
