"use client";

import { ChatResponse } from "@/types";
import { useEffect, useRef } from "react";
import Message from "./Message";

export default function Inbox({ chats }: { chats: ChatResponse[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simple auto-scroll function
  const scrollToBottom = () => {
    if (scrollRef.current) {
      const element = scrollRef.current;
      console.log("Scroll values:", {
        scrollTop: element.scrollTop,
        scrollHeight: element.scrollHeight,
        clientHeight: element.clientHeight,
        shouldScroll: element.scrollHeight > element.clientHeight,
      });

      if (element.scrollHeight > element.clientHeight) {
        element.scrollTop = element.scrollHeight;
        console.log("Scrolled to bottom, new scrollTop:", element.scrollTop);
      } else {
        console.log("No need to scroll, content fits in view");
      }
    }
  };

  // Callback for when streaming text updates
  const handleTextUpdate = () => {
    console.log("Text streaming update detected, scrolling");
    scrollToBottom();
  };

  // Auto-scroll when new messages are added
  useEffect(() => {
    console.log("Chats changed, scrolling to bottom");
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
        console.log("Text content changed during streaming, scrolling");
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
          console.log("Interval scroll during streaming");
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }
    }, 100); // More frequent for streaming

    return () => {
      mutationObserver.disconnect();
      clearInterval(interval);
    };
  }, []);

  console.log("Inbox chats:", chats);

  if (!chats || chats.length === 0) {
    return (
      <h1 className="text-center text-2xl font-medium md:text-3xl xl:text-4xl">
        How May I Help you!
      </h1>
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
          <Message key={idx} message={chat} onTextUpdate={handleTextUpdate} />
        ))}
      </div>
    </section>
  );
}
