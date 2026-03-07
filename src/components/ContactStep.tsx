import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "lucide-react";

interface ContactStepProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContact: string;
  zipCode: string;
  insuranceClaim: string;
  onFirstNameChange: (v: string) => void;
  onLastNameChange: (v: string) => void;
  onEmailChange: (v: string) => void;
  onPhoneChange: (v: string) => void;
  onPreferredContactChange: (v: string) => void;
  onZipCodeChange: (v: string) => void;
  onInsuranceClaimChange: (v: string) => void;
}

export function ContactStep({
  firstName, lastName, email, phone, preferredContact, zipCode, insuranceClaim,
  onFirstNameChange, onLastNameChange, onEmailChange, onPhoneChange,
  onPreferredContactChange, onZipCodeChange, onInsuranceClaimChange,
}: ContactStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <User className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg text-foreground">Contact Information</h3>
          <p className="text-sm text-muted-foreground">How should we reach you?</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">First Name *</label>
          <Input placeholder="John" value={firstName} onChange={(e) => onFirstNameChange(e.target.value)} maxLength={100} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Last Name *</label>
          <Input placeholder="Doe" value={lastName} onChange={(e) => onLastNameChange(e.target.value)} maxLength={100} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Email *</label>
          <Input type="email" placeholder="john@example.com" value={email} onChange={(e) => onEmailChange(e.target.value)} maxLength={255} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Phone *</label>
          <Input type="tel" placeholder="(555) 123-4567" value={phone} onChange={(e) => onPhoneChange(e.target.value)} maxLength={20} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Postal Code *</label>
          <Input placeholder="12345" value={zipCode} onChange={(e) => onZipCodeChange(e.target.value)} maxLength={10} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Preferred Contact</label>
          <Select value={preferredContact} onValueChange={onPreferredContactChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="phone">Phone Call</SelectItem>
              <SelectItem value="text">Text Message</SelectItem>
              <SelectItem value="email">Email</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Insurance Claim?</label>
          <Select value={insuranceClaim} onValueChange={onInsuranceClaimChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No, paying out of pocket</SelectItem>
              <SelectItem value="unsure">Not sure yet</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
