interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
}

export function SectionHeader({ title, subtitle, align = 'center' }: SectionHeaderProps) {
  if (align === 'left') {
    return (
      <div className="max-w-4xl mx-auto mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">{title}</h2>
        {subtitle && (
          <p className="text-lg text-text-secondary leading-relaxed">{subtitle}</p>
        )}
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">{title}</h2>
      <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full mb-6" />
      {subtitle && <p className="text-xl text-text-secondary">{subtitle}</p>}
    </div>
  );
}
