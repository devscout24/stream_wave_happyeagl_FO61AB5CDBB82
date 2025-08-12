"use client";
import useAnimate from "@/hooks/use-animate";
import { useEffect } from "react";

export default function StreamText({
  text,
  onTextUpdate,
}: {
  text: string;
  onTextUpdate?: () => void;
}) {
  const animatedText = useAnimate(text);

  // Trigger callback when animated text changes
  useEffect(() => {
    if (onTextUpdate) {
      onTextUpdate();
    }
  }, [animatedText, onTextUpdate]);

  return <div>{animatedText}</div>;
}
