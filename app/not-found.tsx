import Icon from "@/components/Icon";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center">
      <Icon src="/not-found.svg" className="mb-6 h-24 w-24" />
      <h1 className="mb-4 text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-muted-foreground mb-8">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-primary hover:bg-primary/80 rounded px-4 py-2 text-white transition"
      >
        Go Home
      </Link>
    </div>
  );
}
