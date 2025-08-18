"use client";

import useAnimate from "@/hooks/use-animate";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";

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

  useEffect(() => {
    if (onTextUpdate) onTextUpdate();
  }, [animatedText, onTextUpdate]);

  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkBreaks]}>
        {isNow ? animatedText : text}
      </ReactMarkdown>
    </div>
  );
}


