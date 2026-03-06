import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Hash } from "lucide-react";

interface DetailsStepProps {
  vin: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  preferredContact: string;
  insuranceClaim: string;
  notes: string;
  onVinChange: (v: string) => void;
  onFirstNameChange: (v: string) => void;
  onLastNameChange: (v: string) => void;
  onEmailChange: (v: string) => void;
  onPhoneChange: (v: string) => void;
  onZipCodeChange: (v: string) => void;
  onPreferredContactChange: (v: string) => void;
  onInsuranceClaimChange: (v: string) => void;
  onNotesChange: (v: string) => void;
}

export function DetailsStep(props: DetailsStepProps) {
  return (
    <div className="space-y-6">
      {/* VIN Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Hash className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-foreground">Vehicle Details</h3>
            <p className="text-sm text-muted-foreground">Providing your VIN ensures the exact right glass for your vehicle</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">VIN Number</label>
          <Input
            placeholder="e.g. 1HGBH41JXMN109186"
            value={props.vin}
            onChange={(e) => props.onVinChange(e.target.value.toUpperCase())}
            maxLength={17}
            className="font-mono tracking-wider uppercase"
          />
          <p className="text-xs text-muted-foreground">17-character Vehicle Identification Number — found on your dashboard or driver's door jamb</p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
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
            <Input placeholder="John" value={props.firstName} onChange={(e) => props.onFirstNameChange(e.target.value)} maxLength={100} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Last Name *</label>
            <Input placeholder="Doe" value={props.lastName} onChange={(e) => props.onLastNameChange(e.target.value)} maxLength={100} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email *</label>
            <Input type="email" placeholder="john@example.com" value={props.email} onChange={(e) => props.onEmailChange(e.target.value)} maxLength={255} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Phone *</label>
            <Input type="tel" placeholder="(555) 123-4567" value={props.phone} onChange={(e) => props.onPhoneChange(e.target.value)} maxLength={20} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">ZIP Code *</label>
            <Input placeholder="12345" value={props.zipCode} onChange={(e) => props.onZipCodeChange(e.target.value)} maxLength={10} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Preferred Contact</label>
            <Select value={props.preferredContact} onValueChange={props.onPreferredContactChange}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="phone">Phone Call</SelectItem>
                <SelectItem value="text">Text Message</SelectItem>
                <SelectItem value="email">Email</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Insurance Claim?</label>
            <Select value={props.insuranceClaim} onValueChange={props.onInsuranceClaimChange}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No, out of pocket</SelectItem>
                <SelectItem value="unsure">Not sure yet</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Additional Notes</label>
          <Textarea
            placeholder="Any special requests or additional details about the damage..."
            value={props.notes}
            onChange={(e) => props.onNotesChange(e.target.value)}
            className="min-h-[80px] resize-none"
            maxLength={1000}
          />
        </div>
      </div>
    </div>
  );
}
