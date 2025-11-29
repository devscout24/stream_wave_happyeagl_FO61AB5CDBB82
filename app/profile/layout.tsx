import { ReactNode } from "react";
import Header from "./_components/Header";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="container mx-auto mt-12 max-xl:px-2 lg:max-w-7xl">
        {children}
      </main>
    </>
  );
}
