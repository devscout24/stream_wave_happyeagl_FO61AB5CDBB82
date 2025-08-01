"use client";

import Icon from "@/components/Icon";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    setIsDark(theme === "dark");
  }, [theme]);

  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        checked={isDark}
        onChange={() => setTheme(isDark ? "light" : "dark")}
        className="peer sr-only"
      />

      <div
        className={cn(
          "group peer relative h-8 w-16 rounded-full shadow-inner outline-none peer-focus:outline-none",
          {
            "bg-[#525252] shadow-[#525252]": !isDark,
            "bg-[#554F4F] shadow-[#554F4F]": isDark,
          },
        )}
      >
        <span
          className={cn(
            "absolute top-1 left-1.5 z-10 h-5.5 w-5.5 transform rounded-full transition-transform duration-300",
            {
              "translate-x-8": !isDark,
              "translate-x-0 bg-[#525252]": isDark,
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
