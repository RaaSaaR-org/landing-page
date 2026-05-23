import Image from 'next/image';

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

/**
 * EmAI primary lockup: mark + color-split wordmark.
 * "Em" white, "AI" orange — matches the visitenkarten and flyer brand system.
 */
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
        <span className="font-bold text-xl tracking-tight">
          <span className="text-text-primary">Em</span>
          <span className="text-primary-500">AI</span>
        </span>
      )}
    </div>
  );
}
