"use client";

import { confirmBooking } from "@/lib/actions";
import { removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";

export default function ConfirmAppointment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const booked = searchParams.get("booked");
  const expert_id = searchParams.get("expert_id");

  const session_id = searchParams.get("session_id");
  console.log("🚀 ~ ConfirmAppointment ~ booked:", booked);
  console.log("🚀 ~ ConfirmAppointment ~ session_id:", session_id);
  console.log("🚀 ~ ConfirmAppointment ~ expert_id:", expert_id);

  const handleCancel = () => {
    // Logic to handle cancellation
    console.log("Appointment cancelled");
    const newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: ["booked", "chat_id", "expert_id", "session_id"],
    });

    // replace URL without scrolling
    router.replace(newUrl || "/", { scroll: false });
  };

  const handleConfirm = async () => {
    const toastId = toast.loading("Confirming appointment...");
    try {
      if (!session_id || !expert_id) {
        toast.error("Missing chat_id or expert_id");
        return;
      }
      const response = await confirmBooking({
        session_id: Number(session_id),
        picked_expert_id: Number(expert_id),
      });
      toast.success("Appointment confirmed!", { id: toastId });
      console.log("Appointment confirmed:", response);
      const newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["booked", "session_id", "modal", "expert_id"],
      });
      // replace URL without scrolling
      router.replace(newUrl || "/", { scroll: false });
    } catch (error) {
      toast.error("Failed to confirm appointment. Please try again.", {
        id: toastId,
      });
      console.error("Failed to confirm appointment:", error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">Appointment Confirmed!</h2>
      <div className="flex gap-4">
        <Button
          variant="outline"
          size="lg"
          className="flex-1"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          variant="default"
          size="lg"
          className="flex-1"
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
