/*
 FIX: Repair CookieConsent.tsx
 - Ensures banner always appears when consent missing
 - Stores consent to localStorage
 - Reloads page after Accept (to start GA)

 Usage:
 gcc fix_cookie_banner.c -o fix_cookie_banner
 ./fix_cookie_banner
*/

#include <stdio.h>
#include <stdlib.h>

#define FILE_PATH "components/CookieConsent.tsx"

int main() {
    FILE *f = fopen(FILE_PATH, "w");
    if (!f) {
        printf("ERROR: Cannot open %s\n", FILE_PATH);
        return 1;
    }

    const char *content =
"\"use client\";\n"
"\n"
"import { useEffect, useState } from \"react\";\n"
"\n"
"export function CookieConsent() {\n"
"  const [visible, setVisible] = useState(false);\n"
"\n"
"  useEffect(() => {\n"
"    try {\n"
"      const consent = localStorage.getItem(\"cookie-consent\");\n"
"      if (!consent) setVisible(true);\n"
"    } catch {\n"
"      setVisible(true);\n"
"    }\n"
"  }, []);\n"
"\n"
"  const accept = () => {\n"
"    localStorage.setItem(\"cookie-consent\", \"accepted\");\n"
"    setVisible(false);\n"
"    window.location.reload();\n"
"  };\n"
"\n"
"  const reject = () => {\n"
"    localStorage.setItem(\"cookie-consent\", \"rejected\");\n"
"    setVisible(false);\n"
"  };\n"
"\n"
"  if (!visible) return null;\n"
"\n"
"  return (\n"
"    <div style={{\n"
"      position: \"fixed\",\n"
"      bottom: 0,\n"
"      left: 0,\n"
"      right: 0,\n"
"      background: \"#111\",\n"
"      color: \"#fff\",\n"
"      padding: \"16px\",\n"
"      display: \"flex\",\n"
"      justifyContent: \"space-between\",\n"
"      alignItems: \"center\",\n"
"      zIndex: 9999\n"
"    }}>\n"
"      <span>Tento web používá cookies pro analýzu návštěvnosti.</span>\n"
"\n"
"      <div style={{ display: \"flex\", gap: \"10px\" }}>\n"
"        <button onClick={reject}>Odmítnout</button>\n"
"        <button onClick={accept} style={{ background: \"#4CAF50\", color: \"white\" }}>\n"
"          Přijmout\n"
"        </button>\n"
"      </div>\n"
"    </div>\n"
"  );\n"
"}\n";

    fputs(content, f);
    fclose(f);

    printf("SUCCESS: CookieConsent.tsx repaired.\n");
    printf("Next:\n");
    printf("git add .\n");
    printf("git commit -m \"Fix cookie banner\"\n");
    printf("git push\n");

    return 0;
}
