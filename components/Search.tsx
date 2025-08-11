"use client";

import Icon from "@/components/Icon";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search({
  queryKey = "query",
  placeholder = "Search here",
}: {
  queryKey?: string;
  placeholder?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";

      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: queryKey,
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: [queryKey],
        });
      }

      router.replace(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, queryKey, router, searchParams]);

  return (
    <div className="bg-input mt-5 flex items-center overflow-hidden rounded-sm px-4 lg:mt-10 lg:flex-1 lg:rounded-lg">
      <input
        className="placeholder:text-muted-foreground/50 text-muted-foreground w-full border-0 border-none py-2.5 text-base outline-offset-0 outline-none focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 lg:text-lg lg:placeholder:text-lg"
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
      />

      <Icon src="/search.svg" className="text-muted-foreground/50" />
    </div>
  );
}
