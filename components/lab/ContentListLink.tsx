import Link from "next/link";

export function ContentListLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="vc-list-row vc-panel group rounded-sm p-6 md:p-7"
    >
      <h2 className="lab-section-title text-xl font-bold text-white transition-colors group-hover:text-[#67e8f9] md:text-2xl">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-500">{description}</p>
    </Link>
  );
}
