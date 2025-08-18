"use client";
import useAnimate from "@/hooks/use-animate";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function StreamText({
  text,
  onTextUpdate,
  isNow = true,
}: {
  text: string;
  onTextUpdate?: () => void;
  isNow?: boolean;
}) {
  const animatedText = useAnimate(text);

  // Trigger callback when animated text changes
  useEffect(() => {
    if (onTextUpdate) {
      onTextUpdate();
    }
  }, [animatedText, onTextUpdate]);

  return <ReactMarkdown>{isNow ? animatedText : text}</ReactMarkdown>;
}
