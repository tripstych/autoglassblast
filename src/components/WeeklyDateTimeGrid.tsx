import { useState, useMemo } from "react";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const timeSlots = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
];

interface WeeklyDateTimeGridProps {
  date: Date | undefined;
  time: string;
  onDateChange: (d: Date | undefined) => void;
  onTimeChange: (t: string) => void;
}

export function WeeklyDateTimeGrid({ date, time, onDateChange, onTimeChange }: WeeklyDateTimeGridProps) {
  const [weekOffset, setWeekOffset] = useState(0);

  const weekDays = useMemo(() => {
    const today = new Date();
    const start = addDays(startOfWeek(today, { weekStartsOn: 1 }), weekOffset * 7);
    return Array.from({ length: 6 }, (_, i) => addDays(start, i));
  }, [weekOffset]);

  const monthLabel = format(weekDays[0], "MMMM yyyy");

  const handleSelect = (day: Date, slot: string) => {
    onDateChange(day);
    onTimeChange(slot);
  };

  return (
    <div className="space-y-4">
      {/* Month header */}
      <div className="flex items-center justify-between">
        <h4 className="font-display font-semibold text-base text-primary">{monthLabel}</h4>
        <button
          onClick={() => setWeekOffset((w) => w + 1)}
          className="w-8 h-8 rounded-full bg-primary/20 hover:bg-primary/40 flex items-center justify-center text-primary transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              {weekDays.map((day) => (
                <th key={day.toISOString()} className="p-2 text-center border border-border/30">
                  <div className="text-lg font-bold text-foreground">{format(day, "dd")}</div>
                  <div className="text-xs text-muted-foreground">{format(day, "EEEE")}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot) => (
              <tr key={slot}>
                {weekDays.map((day) => {
                  const isSelected = date && isSameDay(day, date) && time === slot;
                  const isPast = day < new Date(new Date().setHours(0, 0, 0, 0));
                  return (
                    <td key={day.toISOString() + slot} className="border border-border/30 p-0">
                      <button
                        disabled={isPast}
                        onClick={() => handleSelect(day, slot)}
                        className={cn(
                          "w-full px-2 py-2 text-xs transition-colors",
                          isPast
                            ? "text-muted-foreground/40 cursor-not-allowed"
                            : isSelected
                            ? "bg-primary text-primary-foreground font-bold"
                            : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                        )}
                      >
                        {slot}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-destructive">
        * Observation: times are approximate and may vary within 60 minutes.
      </p>
    </div>
  );
}
