"use client";

import { ChatResponse } from "@/types";
import { useEffect, useRef } from "react";
import Message from "./Message";

export default function Inbox({ chats }: { chats: ChatResponse[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chats]);

  // Monitor content changes for streaming text and auto-scroll
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollToBottom = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      // Only auto-scroll if user is near the bottom (within 100px)
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

      if (isNearBottom) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: "smooth",
        });
      }
    };

    // Use MutationObserver to detect content changes (for streaming text)
    const observer = new MutationObserver(() => {
      scrollToBottom();
    });

    // Observe changes in the scroll container and all its descendants
    observer.observe(scrollContainer, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    // Fallback interval for cases where MutationObserver might miss updates
    const interval = setInterval(scrollToBottom, 200);

    return () => {
      observer.disconnect();
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
          <Message key={idx} message={chat} />
        ))}
      </div>
    </section>
  );
}
