import { QuoteForm } from "@/components/QuoteForm";
import { ShieldCheck, Clock, Award } from "lucide-react";

const badges = [
  { icon: ShieldCheck, text: "Certified Technicians" },
  { icon: Clock, text: "Same-Day Service" },
  { icon: Award, text: "Lifetime Warranty" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div
        className="relative py-16 md:py-24"
        style={{ background: "var(--hero-gradient)" }}
      >
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: "hsl(0 0% 100%)" }}>
            Get Your Free <span style={{ color: "hsl(187 80% 60%)" }}>Auto Glass</span> Quote
          </h1>
          <p className="text-lg mb-8" style={{ color: "hsl(210 20% 75%)" }}>
            Professional windshield repair & replacement — fast, certified, and hassle-free.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {badges.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2" style={{ color: "hsl(187 80% 65%)" }}>
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="container max-w-3xl mx-auto px-4 -mt-8 relative z-10 pb-16">
        <div
          className="rounded-2xl border bg-card p-6 md:p-10"
          style={{ boxShadow: "var(--card-shadow)" }}
        >
          <QuoteForm />
        </div>
      </div>
    </div>
  );
};

export default Index;
