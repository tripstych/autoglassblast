import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const timeSlots = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
];

interface DateTimeStepProps {
  date: Date | undefined;
  time: string;
  onDateChange: (d: Date | undefined) => void;
  onTimeChange: (t: string) => void;
}

export function DateTimeStep({ date, time, onDateChange, onTimeChange }: DateTimeStepProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display font-semibold text-lg text-foreground">Pick a Date & Time</h3>
        <p className="text-sm text-muted-foreground">Choose your preferred appointment slot</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Preferred Date *</label>
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-11",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Select a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => { onDateChange(d); setPopoverOpen(false); }}
                disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Preferred Time *</label>
          <div className="grid grid-cols-2 gap-2 max-h-[240px] overflow-y-auto pr-1">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => onTimeChange(slot)}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-all",
                  time === slot
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-foreground hover:border-primary/40"
                )}
              >
                <Clock className="w-3.5 h-3.5" />
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
