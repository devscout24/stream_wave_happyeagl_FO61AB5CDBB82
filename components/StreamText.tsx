"use client";
import useAnimate from "@/hooks/use-animate";

export default function StreamText({ text }: { text: string }) {
  const animatedText = useAnimate(text);

  return <div>{animatedText}</div>;
}
