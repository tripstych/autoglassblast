import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StepHeader } from "@/components/StepHeader";
import { VehicleTypeCarousel } from "@/components/VehicleTypeCarousel";
import { VehicleStep } from "@/components/VehicleStep";
import { GlassTypeStep } from "@/components/GlassTypeStep";
import { WeeklyDateTimeGrid } from "@/components/WeeklyDateTimeGrid";
import { DetailsStep } from "@/components/DetailsStep";
import { ReviewStep } from "@/components/ReviewStep";
import { Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export function QuoteForm() {
  // Vehicle type
  const [vehicleType, setVehicleType] = useState("sedan");

  // Vehicle
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  // Glass
  const [glassType, setGlassType] = useState<string[]>([]);

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

  const [submitted, setSubmitted] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!year || !make) {
      toast.error("Please select your vehicle year and make.");
      return;
    }
    if (glassType.length === 0) {
      toast.error("Please select at least one glass type.");
      return;
    }
    if (!date || !time) {
      toast.error("Please select a date and time.");
      return;
    }
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim() || !zipCode.trim()) {
      toast.error("Please fill in all required contact fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("auto_glass_quote", "1");
      formData.append("vehicle_type", vehicleType);
      formData.append("year", year);
      formData.append("make", make);
      formData.append("model", model);
      formData.append("glass_type", glassType.join(", "));
      formData.append("date", date ? date.toISOString().split("T")[0] : "");
      formData.append("time", time);
      formData.append("vin", vin);
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("postal_code", zipCode);
      formData.append("preferred_contact", preferredContact);
      formData.append("insurance_claim", insuranceClaim);
      formData.append("notes", notes);

      const response = await fetch(window.location.href, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Server error");

      toast.success("Quote request submitted! We'll be in touch within 24 hours.");
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setVehicleType("sedan"); setYear(""); setMake(""); setModel(""); setGlassType([]);
    setDate(undefined); setTime(""); setVin("");
    setFirstName(""); setLastName(""); setEmail(""); setPhone("");
    setPreferredContact(""); setZipCode(""); setInsuranceClaim(""); setNotes("");
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-primary" />
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
    <div className="space-y-16">
      {/* STEP 01 — Vehicle Type + Year/Make/Model */}
      <section className="space-y-8">
        <StepHeader stepNumber={1} title="Choose Your Car Type" />
        <VehicleTypeCarousel selected={vehicleType} onSelect={setVehicleType} />
        <VehicleStep
          year={year} make={make} model={model}
          onYearChange={setYear} onMakeChange={setMake} onModelChange={setModel}
        />
      </section>

      {/* STEP 02 — Glass Type */}
      <section className="space-y-8">
        <StepHeader stepNumber={2} title="Specify The Glass" subtitle="Which Glass Needs Replacement" />
        <GlassTypeStep selected={glassType} onSelect={setGlassType} />
      </section>

      {/* STEP 03 — Date & Time */}
      <section className="space-y-8">
        <StepHeader stepNumber={3} title="Date and Time" />
        <WeeklyDateTimeGrid date={date} time={time} onDateChange={setDate} onTimeChange={setTime} />
      </section>

      {/* STEP 04 — Details & Summary */}
      <section className="space-y-8">
        <StepHeader stepNumber={4} title="Summary" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ReviewStep data={formData} />
          <div className="space-y-6">
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5 space-y-4">
              <h3 className="font-display font-semibold text-lg text-foreground">Your Contact Details</h3>
              <p className="text-xs text-muted-foreground">
                This request will be sent to us and an associate will get in touch for scheduling your service.
              </p>
              <DetailsStep
                vin={vin} firstName={firstName} lastName={lastName} email={email} phone={phone}
                zipCode={zipCode} preferredContact={preferredContact} insuranceClaim={insuranceClaim} notes={notes}
                onVinChange={setVin} onFirstNameChange={setFirstName} onLastNameChange={setLastName}
                onEmailChange={setEmail} onPhoneChange={setPhone} onZipCodeChange={setZipCode}
                onPreferredContactChange={setPreferredContact} onInsuranceClaimChange={setInsuranceClaim} onNotesChange={setNotes}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-4">
          <Button size="lg" onClick={handleSubmit} disabled={submitting} className="gap-2 px-12 text-lg">
            <Send className="w-5 h-5" /> {submitting ? "Submitting…" : "Submit Request"}
          </Button>
        </div>
      </section>
    </div>
  );
}
