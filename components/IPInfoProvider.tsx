"use client";

import IPInfo from "ip-info-react";
import React from "react";

export default function IPInfoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // This component can be used to provide IP information context to its children
  // You can add any additional logic or state management here if needed
  return <IPInfo>{children}</IPInfo>;
}
