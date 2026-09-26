import { cn } from "cn"
import { LoaderIcon } from "lucide-react"

function Spinner({
  className,
  ...props
}) {
  return (
    <LoaderIcon aria-label="Loading" role="status" className={cn("size-6 animate-spin", className)} {...props} />
  )
}

export { Spinner }
