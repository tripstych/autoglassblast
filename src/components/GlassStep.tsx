import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Shield } from "lucide-react";

const glassTypes = [
  "Windshield",
  "Rear Window",
  "Front Door - Driver",
  "Front Door - Passenger",
  "Rear Door - Driver",
  "Rear Door - Passenger",
  "Quarter Glass - Driver",
  "Quarter Glass - Passenger",
  "Sunroof / Moonroof",
  "Vent Glass",
  "Other",
];

const damageTypes = [
  "Chip / Bull's Eye",
  "Crack (under 6 inches)",
  "Crack (over 6 inches)",
  "Shattered",
  "Star Break",
  "Combination Break",
  "Edge Crack",
  "Stress Crack",
  "Other / Not Sure",
];

interface GlassStepProps {
  glassType: string;
  damageType: string;
  notes: string;
  hasADAS: string;
  onGlassTypeChange: (v: string) => void;
  onDamageTypeChange: (v: string) => void;
  onNotesChange: (v: string) => void;
  onADASChange: (v: string) => void;
}

export function GlassStep({
  glassType,
  damageType,
  notes,
  hasADAS,
  onGlassTypeChange,
  onDamageTypeChange,
  onNotesChange,
  onADASChange,
}: GlassStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Shield className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg text-foreground">Glass & Damage Details</h3>
          <p className="text-sm text-muted-foreground">Describe the damage for an accurate quote</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Glass Type *</label>
          <Select value={glassType} onValueChange={onGlassTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select glass type" />
            </SelectTrigger>
            <SelectContent>
              {glassTypes.map((g) => (
                <SelectItem key={g} value={g}>{g}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Damage Type *</label>
          <Select value={damageType} onValueChange={onDamageTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select damage type" />
            </SelectTrigger>
            <SelectContent>
              {damageTypes.map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">ADAS / Sensors *</label>
        <p className="text-xs text-muted-foreground">Does your vehicle have cameras or sensors on the windshield? (e.g., rain sensors, lane departure, auto-braking)</p>
        <Select value={hasADAS} onValueChange={onADASChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Yes, my vehicle has ADAS features</SelectItem>
            <SelectItem value="no">No</SelectItem>
            <SelectItem value="unsure">Not sure</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Additional Notes</label>
        <Textarea
          placeholder="Any additional details about the damage, location, or special requests..."
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          className="min-h-[100px] resize-none"
          maxLength={1000}
        />
      </div>
    </div>
  );
}
