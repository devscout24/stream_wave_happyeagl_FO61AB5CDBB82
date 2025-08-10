"use client";

import Icon from "@/components/Icon";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";

      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, router, searchParams]);

  return (
    <div className="mt-10 flex flex-1 items-center overflow-hidden rounded-lg bg-black px-4">
      <Input
        className="placeholder:text-secondary/50 text-secondary border-0 py-6 text-base outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Search here"
        onChange={(e) => setQuery(e.target.value)}
      />

      <Icon src="/search.svg" className="text-secondary/50" />
    </div>
  );
}
