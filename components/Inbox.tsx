"use client";
import { useCustomContext } from "@/app/chat/[chatId]/_context/use-context";
import { Message as IMessage } from "@/types";
import { useEffect, useLayoutEffect, useRef } from "react";
import Message from "./Message";

interface InboxProps {
  inboxes: IMessage[];
}

export default function Inbox({ inboxes }: InboxProps) {
  const contextValue = useCustomContext(); // May be null if not in Provider

  // If context is available, use it; otherwise fall back to just showing inboxes
  const chats = contextValue ? contextValue.chats : inboxes;
  const setChats = contextValue?.setChats;
  const initializedRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  console.log("inboxes:", inboxes);
  console.log("contextValue:", contextValue);
  console.log("chats:", chats);
  console.log("chats.length:", chats.length);

  // Auto-scroll to bottom when new messages are added
  const scrollToBottom = () => {
    console.log("scrollToBottom called");

    // Method 1: Scroll the main container
    const scrollContainer = document.getElementById("scrollbar");
    console.log("scrollContainer found:", !!scrollContainer);

    if (scrollContainer) {
      console.log("Current scrollTop:", scrollContainer.scrollTop);
      console.log("ScrollHeight:", scrollContainer.scrollHeight);
      console.log("ClientHeight:", scrollContainer.clientHeight);

      // Try immediate scroll first
      scrollContainer.scrollTop = scrollContainer.scrollHeight;

      // Then try smooth scroll
      setTimeout(() => {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: "smooth",
        });
      }, 50);
    } else {
      console.log("Scroll container #scrollbar not found");
    }

    // Method 2: Use scrollIntoView on the end marker
    if (messagesEndRef.current) {
      console.log("Scrolling into view using messagesEndRef");
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  useEffect(() => {
    // Update state when server data changes, but be smart about it
    if (inboxes.length > 0 && setChats) {
      console.log(
        "Server data changed. Current chats length:",
        chats.length,
        "New inboxes length:",
        inboxes.length,
      );

      // If we have optimistic messages (chats longer than inboxes),
      // only update if the new server data actually has more messages
      if (chats.length > inboxes.length) {
        console.log(
          "We have optimistic messages. Checking if server has caught up...",
        );
        // Don't overwrite optimistic state unless server has more messages
        if (inboxes.length > chats.length) {
          console.log(
            "Server has more messages than our optimistic state. Updating...",
          );
          setChats(inboxes);
        } else {
          console.log(
            "Server hasn't caught up yet. Keeping optimistic messages.",
          );
        }
      } else {
        // No optimistic messages, safe to update
        console.log("No optimistic messages. Updating with server data.");
        setChats(inboxes);
      }

      if (!initializedRef.current) {
        initializedRef.current = true;
      }
    }
  }, [inboxes, setChats, chats.length]);

  // Scroll to bottom when chats change (new messages added)
  useEffect(() => {
    console.log("useEffect triggered for scroll, chats.length:", chats.length);

    // Add a small delay to ensure DOM has updated
    const timeoutId = setTimeout(() => {
      console.log("Executing scrollToBottom after timeout");
      scrollToBottom();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [chats.length]);

  // Also try immediate scroll after DOM updates
  useLayoutEffect(() => {
    console.log("useLayoutEffect triggered, scrolling immediately");
    scrollToBottom();
  }, [chats.length]);

  return (
    <section>
      <div className="flex flex-col gap-10">
        {chats
          .map((item) => {
            // Type guard to check if it's a Message
            if ("id" in item && "chat" in item && "message_type" in item) {
              // It's a Message
              const message = item as IMessage;
              return (
                <Message
                  key={message.id}
                  message={message}
                  onTextUpdate={scrollToBottom}
                />
              );
            } else {
              // It's a ChatResponse - skip for now since Message component expects Message type
              return null;
            }
          })
          .filter(Boolean)}

        {/* Invisible element at the end for scrollIntoView */}
        <div ref={messagesEndRef} style={{ height: 1 }} />
      </div>
    </section>
  );
}
