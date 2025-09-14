import { Button } from "./ui/button";

export default function ConfirmAppointment() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">Appointment Confirmed!</h2>
      <div className="flex gap-4">
        <Button variant="outline" size="lg" className="flex-1">
          Cancel
        </Button>
        <Button variant="default" size="lg" className="flex-1">
          Confirm
        </Button>
      </div>
    </div>
  );
}
