import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useVehicleMakes, useVehicleModels } from "@/hooks/useVehicleData";
import { Loader2, Car } from "lucide-react";

interface VehicleStepProps {
  year: string;
  make: string;
  model: string;
  onYearChange: (v: string) => void;
  onMakeChange: (v: string) => void;
  onModelChange: (v: string) => void;
}

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 35 }, (_, i) => String(currentYear + 1 - i));

export function VehicleStep({
  year,
  make,
  model,
  onYearChange,
  onMakeChange,
  onModelChange,
}: VehicleStepProps) {
  const { makes, loading: makesLoading } = useVehicleMakes();
  const { models, loading: modelsLoading } = useVehicleModels(make, year);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Car className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg text-foreground">Vehicle Information</h3>
          <p className="text-sm text-muted-foreground">Tell us about your vehicle</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Year *</label>
          <Select value={year} onValueChange={(v) => { onYearChange(v); onModelChange(""); }}>
            <SelectTrigger>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={y}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Make *</label>
          <Select value={make} onValueChange={(v) => { onMakeChange(v); onModelChange(""); }} disabled={makesLoading}>
            <SelectTrigger>
              {makesLoading ? (
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" /> Loading...
                </span>
              ) : (
                <SelectValue placeholder="Select make" />
              )}
            </SelectTrigger>
            <SelectContent>
              {makes.map((m) => (
                <SelectItem key={m.MakeId} value={m.MakeName}>
                  {m.MakeName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Model *</label>
          <Select value={model} onValueChange={onModelChange} disabled={!make || !year || modelsLoading}>
            <SelectTrigger>
              {modelsLoading ? (
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" /> Loading...
                </span>
              ) : (
                <SelectValue placeholder={!make || !year ? "Select year & make first" : "Select model"} />
              )}
            </SelectTrigger>
            <SelectContent>
              {models.map((m) => (
                <SelectItem key={m.Model_ID} value={m.Model_Name}>
                  {m.Model_Name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
