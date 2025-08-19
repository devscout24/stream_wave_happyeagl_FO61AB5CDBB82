"use client";
import { useCustomContext } from "@/app/chat/[chatId]/_context/use-context";
import { IMessage } from "@/types";
import { useEffect, useLayoutEffect, useRef } from "react";

interface InboxProps {
  inboxes: IMessage[];
  profilePic?: string;
}

export default function Inbox({ inboxes, profilePic }: InboxProps) {
  const contextValue = useCustomContext(); // May be null if not in Provider

  // If context is available, use it; otherwise fall back to just showing inboxes
  const chats = contextValue ? contextValue.chats : inboxes;
  const setChats = contextValue?.setChats;
  const initializedRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  const scrollToBottom = () => {
    // Method 1: Scroll the main container
    const scrollContainer = document.getElementById("scrollbar");

    if (scrollContainer) {
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
      console.error("Scroll container #scrollbar not found");
    }

    // Method 2: Use scrollIntoView on the end marker
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  useEffect(() => {
    // Update state when server data changes, but be smart about it
    if (inboxes.length > 0 && setChats) {
      // If we have optimistic messages (chats longer than inboxes),
      // only update if the new server data actually has more messages
      if (chats.length > inboxes.length) {
        // Don't overwrite optimistic state unless server has more messages
        if (inboxes.length > chats.length) {
          setChats(inboxes);
        } else {
          console.error(
            "Server hasn't caught up yet. Keeping optimistic messages.",
          );
        }
      } else {
        // No optimistic messages, safe to update
        console.error("No optimistic messages. Updating with server data.");
        setChats(inboxes);
      }

      if (!initializedRef.current) {
        initializedRef.current = true;
      }
    }
  }, [inboxes, setChats, chats.length]);

  // Scroll to bottom when chats change (new messages added)
  useEffect(() => {
    // Add a small delay to ensure DOM has updated, including file attachments
    const timeoutId = setTimeout(() => {
      scrollToBottom();
    }, 150); // Slightly longer delay for file loading

    return () => clearTimeout(timeoutId);
  }, [chats.length]);

  // Also scroll when file attachments load
  useEffect(() => {
    // Check if any message has file attachments and scroll after they might load
    const hasFiles = chats.some((chat) => "file_url" in chat && chat.file_url);

    if (hasFiles) {
      const timeoutId = setTimeout(() => {
        scrollToBottom();
      }, 300); // Extra delay for image loading

      return () => clearTimeout(timeoutId);
    }
  }, [chats]);

  // Also try immediate scroll after DOM updates
  useLayoutEffect(() => {
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
                  key={`${message.id}-${message.file_url ? "file" : "text"}`} // Better key for file messages
                  content={message.content}
                  isUser={message.agent_type === "user"}
                  onTextUpdate={() => {
                    // Scroll after text updates and file loads
                    setTimeout(scrollToBottom, 100);
                  }}
                  profile_pic={profilePic}
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
