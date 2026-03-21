export function GlassPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`vc-panel rounded-sm ${className}`.trim()}>{children}</div>
  );
}
