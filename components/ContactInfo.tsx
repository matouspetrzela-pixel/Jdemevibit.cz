"use client";

import { useEffect, useState } from "react";

// Email obfuskace pro ochranu proti spam botům
// Používáme base64 encoding + reverse pro lepší ochranu
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

export function ContactInfo() {
  const [email, setEmail] = useState<string>("");
  const [isClient, setIsClient] = useState(false);
  const linkedInUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || "";

  useEffect(() => {
    setIsClient(true);
    // Deobfuskace emailu pouze na klientovi (ochrana proti botům)
    const obfuscated =
      process.env.NEXT_PUBLIC_CONTACT_EMAIL_OBFUSCATED || "";
    if (obfuscated) {
      setEmail(deobfuscateEmail(obfuscated));
    } else {
      // Fallback na normální email (pouze pro vývoj)
      setEmail(process.env.NEXT_PUBLIC_CONTACT_EMAIL || "");
    }
  }, []);

  // Render pouze na klientovi (SSR protection)
  if (!isClient) {
    return (
      <section id="kontakt" className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          {linkedInUrl && (
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#7b3beb] transition-colors"
            >
              LinkedIn profil
            </a>
          )}
        </div>
      </section>
    );
  }

  return (
    <section id="kontakt" className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
        {email && (
          <a
            href={`mailto:${email}`}
            className="text-white hover:text-[#ef2c28] transition-colors"
            aria-label="Kontaktní email"
          >
            {email}
          </a>
        )}
        {linkedInUrl && (
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#7b3beb] transition-colors"
            aria-label="LinkedIn profil"
          >
            LinkedIn profil
          </a>
        )}
      </div>
    </section>
  );
}
