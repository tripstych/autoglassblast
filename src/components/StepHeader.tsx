interface StepHeaderProps {
  stepNumber: number;
  title: string;
  subtitle?: string;
}

export function StepHeader({ stepNumber, title, subtitle }: StepHeaderProps) {
  const num = String(stepNumber).padStart(2, "0");
  return (
    <div className="text-center space-y-2">
      <span className="text-sm font-semibold tracking-widest uppercase text-primary">
        Step {num}
      </span>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground italic">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}
