/**
 * Globální patička — Easter egg hint pro The Vault (Phase Alpha).
 */
export function SiteFooter() {
  return (
    <footer
      className="site-footer-vignette relative z-[1] border-t border-white/[0.05] bg-black py-10"
      aria-label="Patička webu"
    >
      <div className="mx-auto max-w-7xl px-5 text-center">
        <p className="font-mono text-[0.65rem] text-[#00f0ff]/[0.15]">
          {"// sys_access: decrypted002"}
        </p>
      </div>
    </footer>
  );
}
