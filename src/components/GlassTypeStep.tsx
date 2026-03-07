import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

const glassOptions = [
  {
    id: "windshield",
    label: "Windshield",
    description: "Premium glass with optimal safety standards.",
    duration: "90 min",
    icon: "🛡️",
  },
  {
    id: "side-glass",
    label: "Side Glass",
    description: "Enhanced durability and thermal protection.",
    duration: "60 min",
    icon: "🪟",
  },
  {
    id: "back-glass",
    label: "Back Glass",
    description: "Technology integrated for safety and convenience.",
    duration: "120 min",
    icon: "🔲",
  },
  {
    id: "sunroof",
    label: "Sunroof",
    description: "Enhanced protection with advanced design.",
    duration: "120 min",
    icon: "☀️",
  },
];

interface GlassTypeStepProps {
  selected: string[];
  onSelect: (ids: string[]) => void;
}

export function GlassTypeStep({ selected, onSelect }: GlassTypeStepProps) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display font-semibold text-lg text-foreground">Select Glass Type</h3>
        <p className="text-sm text-muted-foreground">Choose the type of glass that needs service</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {glassOptions.map((opt) => {
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelect(opt.id)}
              className={cn(
                "relative flex flex-col items-start gap-3 rounded-xl border-2 p-5 text-left transition-all duration-200 hover:shadow-md",
                isSelected
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border bg-card hover:border-primary/40"
              )}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="hsl(0 0% 100%)" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              <span className="text-3xl">{opt.icon}</span>
              <div className="space-y-1">
                <span className="font-display font-semibold text-base text-foreground">{opt.label}</span>
                <p className="text-sm text-muted-foreground leading-snug">{opt.description}</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-primary mt-auto pt-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Est. {opt.duration}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
