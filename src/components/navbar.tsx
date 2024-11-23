import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        {/* Your other navbar items */}
        <ThemeToggle />
      </div>
    </nav>
  )
} 