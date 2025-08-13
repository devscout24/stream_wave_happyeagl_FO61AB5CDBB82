import { ReactNode } from "react";
import Header from "./_components/Header";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
