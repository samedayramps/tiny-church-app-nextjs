import Image from 'next/image'

export function Logo() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <Image
        src="/logo.svg"
        alt="Tiny Church Logo"
        width={40}
        height={40}
        className="dark:invert"
      />
      <span className="text-xl font-semibold">Tiny Church</span>
    </div>
  )
} 