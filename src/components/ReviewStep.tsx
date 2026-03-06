import { Car, Shield, User, FileText } from "lucide-react";

interface ReviewStepProps {
  data: {
    year: string;
    make: string;
    model: string;
    glassType: string;
    damageType: string;
    hasADAS: string;
    notes: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    zipCode: string;
    preferredContact: string;
    insuranceClaim: string;
  };
}

function ReviewSection({ icon: Icon, title, items }: { icon: React.ElementType; title: string; items: { label: string; value: string }[] }) {
  return (
    <div className="rounded-xl border bg-card p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-primary" />
        <span className="font-display font-semibold text-sm text-foreground">{title}</span>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {items.filter(i => i.value).map((item) => (
          <div key={item.label}>
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="text-sm font-medium text-foreground">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const contactLabels: Record<string, string> = {
  phone: "Phone Call",
  text: "Text Message",
  email: "Email",
};

const insuranceLabels: Record<string, string> = {
  yes: "Yes",
  no: "No, paying out of pocket",
  unsure: "Not sure yet",
};

const adasLabels: Record<string, string> = {
  yes: "Yes",
  no: "No",
  unsure: "Not sure",
};

export function ReviewStep({ data }: ReviewStepProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <FileText className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg text-foreground">Review Your Request</h3>
          <p className="text-sm text-muted-foreground">Please verify all details before submitting</p>
        </div>
      </div>

      <ReviewSection
        icon={Car}
        title="Vehicle"
        items={[
          { label: "Year", value: data.year },
          { label: "Make", value: data.make },
          { label: "Model", value: data.model },
        ]}
      />

      <ReviewSection
        icon={Shield}
        title="Glass & Damage"
        items={[
          { label: "Glass Type", value: data.glassType },
          { label: "Damage Type", value: data.damageType },
          { label: "ADAS / Sensors", value: adasLabels[data.hasADAS] || "" },
          { label: "Notes", value: data.notes },
        ]}
      />

      <ReviewSection
        icon={User}
        title="Contact"
        items={[
          { label: "Name", value: `${data.firstName} ${data.lastName}` },
          { label: "Email", value: data.email },
          { label: "Phone", value: data.phone },
          { label: "ZIP Code", value: data.zipCode },
          { label: "Preferred Contact", value: contactLabels[data.preferredContact] || "" },
          { label: "Insurance", value: insuranceLabels[data.insuranceClaim] || "" },
        ]}
      />
    </div>
  );
}
