"use client";

import useAppointment from "@/hooks/use-appointment";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import AppointmentChatForm from "./AppointmentChatForm";
import Icon from "./Icon";
import Message from "./Message";

export default function Appointment() {
  const { messages, form, onSubmit, isLoading } = useAppointment();
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
        {isLoading && (
          <div role="status" className="flex items-center gap-2">
            <Icon src="/ai.svg" className="size-6" />
            <span className="flex items-end gap-1">
              Thinking
              <span className="flex gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.4s] [animation-duration:0.8s]"></span>
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.2s] [animation-duration:0.8s]"></span>
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-duration:0.8s]"></span>
              </span>
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-auto">
        <AppointmentChatForm form={form} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
