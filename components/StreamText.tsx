"use client";
import useAnimate from "@/hooks/use-animate";
import { useEffect } from "react";

export default function StreamText({
  text,
  onTextUpdate,
  isNow,
}: {
  text: string;
  onTextUpdate?: () => void;
  isNow: boolean;
}) {
  const animatedText = useAnimate(text);

  // Trigger callback when animated text changes
  useEffect(() => {
    if (onTextUpdate) {
      onTextUpdate();
    }
  }, [animatedText, onTextUpdate]);

  return <span>{isNow ? animatedText : text}</span>;
}
