import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "@/components/QuoteFormSteps";
import { VehicleStep } from "@/components/VehicleStep";
import { GlassStep } from "@/components/GlassStep";
import { ContactStep } from "@/components/ContactStep";
import { ReviewStep } from "@/components/ReviewStep";
import { ArrowLeft, ArrowRight, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const STEPS = ["Vehicle", "Damage", "Contact", "Review"];

export function QuoteForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Vehicle
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  // Glass
  const [glassType, setGlassType] = useState("");
  const [damageType, setDamageType] = useState("");
  const [hasADAS, setHasADAS] = useState("");
  const [notes, setNotes] = useState("");

  // Contact
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredContact, setPreferredContact] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [insuranceClaim, setInsuranceClaim] = useState("");

  const validateStep = (s: number): boolean => {
    if (s === 0) {
      if (!year || !make || !model) {
        toast.error("Please select your vehicle year, make, and model.");
        return false;
      }
    }
    if (s === 1) {
      if (!glassType || !damageType || !hasADAS) {
        toast.error("Please fill in all required glass and damage fields.");
        return false;
      }
    }
    if (s === 2) {
      if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim() || !zipCode.trim()) {
        toast.error("Please fill in all required contact fields.");
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address.");
        return false;
      }
    }
    return true;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, 3));
  };

  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = () => {
    toast.success("Quote request submitted! We'll be in touch within 24 hours.");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[hsl(var(--step-completed))]/10 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-[hsl(var(--step-completed))]" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground">Request Submitted!</h2>
        <p className="text-muted-foreground max-w-md">
          Thank you, {firstName}. We've received your quote request for your {year} {make} {model}. 
          Our team will review and get back to you within 24 hours.
        </p>
        <Button variant="outline" onClick={() => { setSubmitted(false); setStep(0); setYear(""); setMake(""); setModel(""); setGlassType(""); setDamageType(""); setHasADAS(""); setNotes(""); setFirstName(""); setLastName(""); setEmail(""); setPhone(""); setPreferredContact(""); setZipCode(""); setInsuranceClaim(""); }}>
          Submit Another Request
        </Button>
      </div>
    );
  }

  const formData = { year, make, model, glassType, damageType, hasADAS, notes, firstName, lastName, email, phone, zipCode, preferredContact, insuranceClaim };

  return (
    <div>
      <StepIndicator steps={STEPS} currentStep={step} />

      <div className="min-h-[340px]">
        {step === 0 && (
          <VehicleStep year={year} make={make} model={model} onYearChange={setYear} onMakeChange={setMake} onModelChange={setModel} />
        )}
        {step === 1 && (
          <GlassStep glassType={glassType} damageType={damageType} notes={notes} hasADAS={hasADAS} onGlassTypeChange={setGlassType} onDamageTypeChange={setDamageType} onNotesChange={setNotes} onADASChange={setHasADAS} />
        )}
        {step === 2 && (
          <ContactStep firstName={firstName} lastName={lastName} email={email} phone={phone} preferredContact={preferredContact} zipCode={zipCode} insuranceClaim={insuranceClaim} onFirstNameChange={setFirstName} onLastNameChange={setLastName} onEmailChange={setEmail} onPhoneChange={setPhone} onPreferredContactChange={setPreferredContact} onZipCodeChange={setZipCode} onInsuranceClaimChange={setInsuranceClaim} />
        )}
        {step === 3 && <ReviewStep data={formData} />}
      </div>

      <div className="flex justify-between mt-8 pt-6 border-t">
        <Button variant="ghost" onClick={prev} disabled={step === 0} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        {step < 3 ? (
          <Button onClick={next} className="gap-2">
            Next <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="gap-2">
            <Send className="w-4 h-4" /> Submit Request
          </Button>
        )}
      </div>
    </div>
  );
}
