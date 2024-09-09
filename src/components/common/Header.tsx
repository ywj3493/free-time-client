import Link from "next/link";

export function Header() {
  return (
    <div>
      <Link href={"/users"}>마이 페이지</Link>
    </div>
  );
}
