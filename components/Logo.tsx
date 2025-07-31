import Link from "next/link";
import Icon from "./Icon";

export default function Logo() {
  return (
    <Link href="/">
      <Icon src="/logo.svg" />
    </Link>
  );
}
