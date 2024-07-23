import Link from "next/link";

export default function Logo({
  onClick,
  className,
}: {
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      onClick={() => onClick?.()}
      href="/"
      className={`font-semibold italic capitalize cursor-pointer ${
        className ?? ""
      }`}
    >
      <span>Skincare</span>
    </Link>
  );
}
