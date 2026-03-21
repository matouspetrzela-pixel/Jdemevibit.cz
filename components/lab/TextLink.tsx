import Link from "next/link";

type Base = {
  children: React.ReactNode;
  className?: string;
};

export function TextLink({
  href,
  children,
  className = "",
  external,
  variant = "cyan",
}: Base & {
  href: string;
  external?: boolean;
  variant?: "cyan" | "violet";
}) {
  const v =
    variant === "violet" ? "vc-text-link vc-text-link--violet" : "vc-text-link";
  const cls = `${v} ${className}`.trim();

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
