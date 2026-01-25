"use client";

import { useEffect, useState } from "react";

// Email obfuskace pro ochranu proti spam botům
function obfuscateEmail(email: string): string {
  return btoa(email.split("").reverse().join(""));
}

function deobfuscateEmail(obfuscated: string): string {
  try {
    return atob(obfuscated).split("").reverse().join("");
  } catch {
    return "";
  }
}

export function CommunitySection() {
  const [email, setEmail] = useState<string>("");
  const [isClient, setIsClient] = useState(false);
  const linkedInUrl = "https://www.linkedin.com/in/matouš-petržela";

  useEffect(() => {
    setIsClient(true);
    // Deobfuskace emailu pouze na klientovi (ochrana proti botům)
    const obfuscated =
      process.env.NEXT_PUBLIC_CONTACT_EMAIL_OBFUSCATED || "";
    if (obfuscated) {
      setEmail(deobfuscateEmail(obfuscated));
    } else {
      // Fallback na normální email
      setEmail(process.env.NEXT_PUBLIC_CONTACT_EMAIL || "matous.petrzela@gmail.com");
    }
  }, []);

  // Render pouze na klientovi (SSR protection)
  if (!isClient) {
    return (
      <section className="text-center py-20 px-5 text-[#ffffff]">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Komunita</h2>
        <p className="opacity-60 mb-8">Loading...</p>
      </section>
    );
  }

  return (
    <section className="text-center py-8 text-[#ffffff]">
      <h2 className="text-2xl font-semibold text-white mb-4">Komunita</h2>

      <p className="opacity-80 mb-8 text-base md:text-lg leading-relaxed">
        Sdílím projekty, proces i slepé uličky.
        <br />
        Pokud tě baví tvořit, učit se a zkoušet nové věci, patříš sem.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {linkedInUrl && (
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#d9ff00] font-semibold hover:underline transition-all"
          >
            LinkedIn
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="text-[#d9ff00] font-semibold hover:underline transition-all"
          >
            Napiš mi
          </a>
        )}
      </div>
    </section>
  );
}
