"use client";

import Icon from "@/components/Icon";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="relative inline-flex cursor-pointer items-center">
        <div className="group peer relative h-8 w-16 rounded-full bg-[#525252] shadow-inner outline-none">
          <span className="absolute top-1 left-1.5 z-10 h-5.5 w-5.5 transform rounded-full transition-transform duration-300">
            <Icon src="/thumb.svg" className="h-full w-full" />
          </span>
          <Icon src="/moon.svg" className="absolute top-1.5 left-1 h-5 w-5" />
          <Icon src="/sun.svg" className="absolute top-1.5 right-1 h-5 w-5" />
        </div>
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        checked={isDark}
        onChange={() => {
          const newTheme = isDark ? "light" : "dark";
          setTheme(newTheme);
        }}
        className="peer sr-only"
      />

      <div
        className={cn(
          "group peer relative h-8 w-16 rounded-full outline-none peer-focus:outline-none",
          {
            "bg-[#525252] shadow-[inset_0_4px_4px_0_rgba(0,0,0,0.25)]": !isDark,
            "bg-[#554F4F] shadow-[inset_0_4px_4px_0_rgba(0,0,0,0.25)]": isDark,
          },
        )}
      >
        <span
          className={cn(
            "absolute top-1 left-1.5 z-10 h-5.5 w-5.5 transform rounded-full transition-all duration-500 ease-in-out",
            {
              "translate-x-8": !isDark,
              "translate-x-0": isDark,
            },
          )}
        >
          <Icon src="/thumb.svg" className="h-full w-full" />
        </span>

        <Icon
          src="/moon.svg"
          className="absolute top-1.5 left-1 h-5 w-5 stroke-[#554F4F]"
        />
        <Icon
          src="/sun.svg"
          className="absolute top-1.5 right-1 h-5 w-5 stroke-[#525252]"
        />
      </div>
    </label>
  );
}
