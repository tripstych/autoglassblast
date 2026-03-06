import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "@/components/QuoteFormSteps";
import { VehicleStep } from "@/components/VehicleStep";
import { GlassTypeStep } from "@/components/GlassTypeStep";
import { DateTimeStep } from "@/components/DateTimeStep";
import { DetailsStep } from "@/components/DetailsStep";
import { ReviewStep } from "@/components/ReviewStep";
import { ArrowLeft, ArrowRight, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const STEPS = ["Vehicle", "Glass Type", "Date & Time", "Details", "Review"];

export function QuoteForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Vehicle
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  // Glass
  const [glassType, setGlassType] = useState("");

  // Date & Time
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState("");

  // Details
  const [vin, setVin] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredContact, setPreferredContact] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [insuranceClaim, setInsuranceClaim] = useState("");
  const [notes, setNotes] = useState("");

  const validateStep = (s: number): boolean => {
    if (s === 0 && (!year || !make || !model)) {
      toast.error("Please select your vehicle year, make, and model.");
      return false;
    }
    if (s === 1 && !glassType) {
      toast.error("Please select a glass type.");
      return false;
    }
    if (s === 2 && (!date || !time)) {
      toast.error("Please select both a date and time.");
      return false;
    }
    if (s === 3) {
      if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim() || !zipCode.trim()) {
        toast.error("Please fill in all required contact fields.");
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast.error("Please enter a valid email address.");
        return false;
      }
    }
    return true;
  };

  const next = () => { if (validateStep(step)) setStep((s) => Math.min(s + 1, 4)); };
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = () => {
    toast.success("Quote request submitted! We'll be in touch within 24 hours.");
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false); setStep(0);
    setYear(""); setMake(""); setModel(""); setGlassType("");
    setDate(undefined); setTime(""); setVin("");
    setFirstName(""); setLastName(""); setEmail(""); setPhone("");
    setPreferredContact(""); setZipCode(""); setInsuranceClaim(""); setNotes("");
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
        <Button variant="outline" onClick={resetForm}>Submit Another Request</Button>
      </div>
    );
  }

  const formData = { year, make, model, glassType, date, time, vin, firstName, lastName, email, phone, zipCode, preferredContact, insuranceClaim, notes };

  return (
    <div>
      <StepIndicator steps={STEPS} currentStep={step} />

      <div className="min-h-[380px]">
        {step === 0 && <VehicleStep year={year} make={make} model={model} onYearChange={setYear} onMakeChange={setMake} onModelChange={setModel} />}
        {step === 1 && <GlassTypeStep selected={glassType} onSelect={setGlassType} />}
        {step === 2 && <DateTimeStep date={date} time={time} onDateChange={setDate} onTimeChange={setTime} />}
        {step === 3 && (
          <DetailsStep
            vin={vin} firstName={firstName} lastName={lastName} email={email} phone={phone}
            zipCode={zipCode} preferredContact={preferredContact} insuranceClaim={insuranceClaim} notes={notes}
            onVinChange={setVin} onFirstNameChange={setFirstName} onLastNameChange={setLastName}
            onEmailChange={setEmail} onPhoneChange={setPhone} onZipCodeChange={setZipCode}
            onPreferredContactChange={setPreferredContact} onInsuranceClaimChange={setInsuranceClaim} onNotesChange={setNotes}
          />
        )}
        {step === 4 && <ReviewStep data={formData} />}
      </div>

      <div className="flex justify-between mt-8 pt-6 border-t">
        <Button variant="ghost" onClick={prev} disabled={step === 0} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        {step < 4 ? (
          <Button onClick={next} className="gap-2">Next <ArrowRight className="w-4 h-4" /></Button>
        ) : (
          <Button onClick={handleSubmit} className="gap-2"><Send className="w-4 h-4" /> Submit Request</Button>
        )}
      </div>
    </div>
  );
}
