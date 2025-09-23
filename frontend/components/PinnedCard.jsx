import { Card } from "@/components/ui/card"
import redPin from "../src/assets/redpin.png"

export function PinnedCard({ children, className = "", ...props }) {
  return (
    <Card className={`relative rounded-xl p-2 z-10 bg-white/70 ${className}`} {...props}>
      <img
        src={redPin}
        alt="Pin"
        className="absolute -top-3 -left-3 w-32 rotate-[-25deg] z-20"
      />
      {children}
    </Card>
  )
}
