import NextLink from "next/link";

export function Link({
  text,
  href,
  className,
  type,
}: {
  text: string;
  href: string;
  className?: string;
  type: "primary" | "secondary";
}) {
  return (
    <NextLink
      className={`${
        type === "primary" && "bg-neutral-100 border-b border-r border-black"
      } text-sm px-4 py-2 border-b border-black ${className ?? ""}`}
      href={href}
    >
      {text}
    </NextLink>
  );
}
