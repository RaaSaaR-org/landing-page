import Image from 'next/image';

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export function Logo({ size = 32, className = '', showText = true }: LogoProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Image
        src="/logo.svg"
        alt="EmAI logo"
        width={size}
        height={size}
        priority
      />

      {showText && (
        <span className="font-bold text-xl text-text-primary">EmAI</span>
      )}
    </div>
  );
}
