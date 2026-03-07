import { Car, Shield, Calendar, User, FileText, Hash } from "lucide-react";
import { format } from "date-fns";

interface ReviewStepProps {
  data: {
    year: string;
    make: string;
    model: string;
    glassType: string;
    date: Date | undefined;
    time: string;
    vin: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    zipCode: string;
    preferredContact: string;
    insuranceClaim: string;
    notes: string;
  };
}

const glassLabels: Record<string, string> = {
  windshield: "Windshield",
  "side-glass": "Side Glass",
  "back-glass": "Back Glass",
  sunroof: "Sunroof",
};

const contactLabels: Record<string, string> = {
  phone: "Phone Call",
  text: "Text Message",
  email: "Email",
};

const insuranceLabels: Record<string, string> = {
  yes: "Yes",
  no: "No, out of pocket",
  unsure: "Not sure yet",
};

function ReviewSection({ icon: Icon, title, items }: { icon: React.ElementType; title: string; items: { label: string; value: string }[] }) {
  const filtered = items.filter((i) => i.value);
  if (filtered.length === 0) return null;
  return (
    <div className="rounded-xl border bg-card p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-primary" />
        <span className="font-display font-semibold text-sm text-foreground">{title}</span>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {filtered.map((item) => (
          <div key={item.label}>
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="text-sm font-medium text-foreground">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReviewStep({ data }: ReviewStepProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-display font-semibold text-lg text-foreground">Review Your Request</h3>
        <p className="text-sm text-muted-foreground">Please verify all details before submitting</p>
      </div>

      <ReviewSection icon={Car} title="Vehicle" items={[
        { label: "Year", value: data.year },
        { label: "Make", value: data.make },
        { label: "Model", value: data.model },
        { label: "VIN", value: data.vin },
      ]} />

      <ReviewSection icon={Shield} title="Glass Type" items={[
        { label: "Type", value: glassLabels[data.glassType] || data.glassType },
      ]} />

      <ReviewSection icon={Calendar} title="Appointment" items={[
        { label: "Date", value: data.date ? format(data.date, "PPP") : "" },
        { label: "Time", value: data.time },
      ]} />

      <ReviewSection icon={User} title="Contact" items={[
        { label: "Name", value: `${data.firstName} ${data.lastName}`.trim() },
        { label: "Email", value: data.email },
        { label: "Phone", value: data.phone },
        { label: "Postal Code", value: data.zipCode },
        { label: "Preferred Contact", value: contactLabels[data.preferredContact] || "" },
        { label: "Insurance", value: insuranceLabels[data.insuranceClaim] || "" },
        { label: "Notes", value: data.notes },
      ]} />
    </div>
  );
}
