"use client";

import useAppointment from "@/hooks/use-appointment";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import AppointmentChatForm from "./AppointmentChatForm";
import Message from "./Message";

export default function Appointment() {
  const { messages, form, onSubmit } = useAppointment();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  return (
    <div className="flex h-full flex-col">
      <h2 className="mb-4 text-2xl font-bold">Book an Appointment</h2>
      <div
        ref={messagesContainerRef}
        className="max-h-96 min-h-96 flex-1 space-y-4 overflow-y-auto p-4"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "transition-opacity duration-300",
              message.isOptimistic && "opacity-70",
            )}
          >
            <Message
              content={message.content}
              createdAt={message.createdAt}
              isAuthenticated={true}
              profile_pic="/default-avatar.png"
              isUser={message.isUser}
            />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-auto">
        <AppointmentChatForm form={form} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
