import { LucideProps, LucideIcon } from "lucide-react"
import * as Icons from "lucide-react"

interface Props extends Omit<LucideProps, "name"> {
  name: keyof typeof Icons
}

export default function Icon({ name, ...props }: Props) {
  const IconComponent = ( Icons[name] ?? Icons["Circle"] ) as LucideIcon

  return (
    <IconComponent {...props} />
  )
}
