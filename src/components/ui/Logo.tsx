interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export function Logo({ size = 32, className = '', showText = true }: LogoProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="EmAI logo"
      >
        {/* Background */}
        <rect width="32" height="32" rx="8" fill="#FF6700" />

        {/* Abstract forward-pointing mark - two stacked chevrons */}
        <path
          d="M8 10L16 16L8 22"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M16 10L24 16L16 22"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      {showText && (
        <span className="font-bold text-xl text-text-primary">EmAI</span>
      )}
    </div>
  );
}
