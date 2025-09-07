"use client";

import Message from "@/components/Message";
import { IMessage } from "@/types";
import { useEffect, useRef } from "react";

export default function Inbox({ chats }: { chats: IMessage[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simple auto-scroll function
  const scrollToBottom = () => {
    if (scrollRef.current) {
      const element = scrollRef.current;

      if (element.scrollHeight > element.clientHeight) {
        element.scrollTop = element.scrollHeight;
      } else {
        console.error("No need to scroll, content fits in view");
      }
    }
  };

  // Callback for when streaming text updates
  const handleTextUpdate = () => {
    scrollToBottom();
  };

  // Auto-scroll when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  // Monitor for any DOM changes and scroll
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // More aggressive MutationObserver for streaming text
    const mutationObserver = new MutationObserver((mutations) => {
      let hasTextChanges = false;

      mutations.forEach((mutation) => {
        // Check for text content changes
        if (
          mutation.type === "characterData" ||
          mutation.type === "childList" ||
          (mutation.type === "attributes" &&
            mutation.attributeName === "data-*")
        ) {
          hasTextChanges = true;
        }
      });

      if (hasTextChanges) {
        // Use immediate scroll during streaming
        requestAnimationFrame(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          }
        });
      }
    });

    // Observe with more comprehensive options for streaming
    mutationObserver.observe(scrollContainer, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeOldValue: true,
      characterDataOldValue: true,
    });

    // More frequent interval during streaming periods
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        // Check if we're not at the bottom and content is longer than viewport
        if (
          scrollHeight > clientHeight &&
          scrollHeight - scrollTop - clientHeight > 5
        ) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }
    }, 100); // More frequent for streaming

    return () => {
      mutationObserver.disconnect();
      clearInterval(interval);
    };
  }, []);

  if (!chats || chats.length === 0) {
    return (
      <>
        <h1 className="text-center text-2xl font-medium md:text-3xl">
          I am legal expert. You can talk to me <br /> in Spanish or any
          language you prefer.
        </h1>

        <p className="text-center">
          Soy experto legal. Puedes hablar conmigo <br /> en español o cualquier
          idioma que prefieras.
        </p>
      </>
    );
  }

  return (
    <section
      ref={scrollRef}
      className="max-h-[calc(100vh-20rem)] min-h-[calc(100vh-20rem)] overflow-y-auto"
      id="scrollbar"
    >
      <div className="flex flex-col gap-10">
        {chats.map((chat, idx) => (
          <Message
            key={idx}
            onTextUpdate={handleTextUpdate}
            content={chat?.ai_response}
            isUser={chat?.agent_type === "user"}
            file_processing={chat?.file_processing}
            isAuthenticated={false}
          />
        ))}
      </div>
    </section>
  );
}
