"use client";

export function Button({
  text,
  className,
  onClick,
}: {
  text: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={() => {
        if (onClick) {
          onClick();
          location.reload();
        }
      }}
      className={`bg-neutral-100 text-sm px-4 py-2 border-b border-r border-black ${
        className ?? ""
      }`}
    >
      {text}
    </button>
  );
}
