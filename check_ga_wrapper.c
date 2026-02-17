/*
  GA WRAPPER CHECK SCRIPT (C)

  Kontroluje:
  1. Existenci GoogleAnalyticsWrapper.tsx
  2. "use client"
  3. NEXT_PUBLIC_GA_ID
  4. Blokaci renderu (return null)

  Použití:
  gcc check_ga_wrapper.c -o check_ga_wrapper
  ./check_ga_wrapper
*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define FILE_PATH "components/GoogleAnalyticsWrapper.tsx"

int main() {
    FILE *f = fopen(FILE_PATH, "r");
    if (!f) {
        printf("ERROR: Soubor %s nebyl nalezen.\n", FILE_PATH);
        return 1;
    }

    char line[2048];
    int hasUseClient = 0;
    int hasEnvVar = 0;
    int hasReturnNull = 0;

    while (fgets(line, sizeof(line), f)) {
        if (strstr(line, "\"use client\"") != NULL) {
            hasUseClient = 1;
        }

        if (strstr(line, "process.env.NEXT_PUBLIC_GA_ID") != NULL) {
            hasEnvVar = 1;
        }

        if (strstr(line, "return null") != NULL) {
            hasReturnNull = 1;
        }
    }

    fclose(f);

    printf("\n=== GA WRAPPER CHECK ===\n\n");

    if (hasUseClient) {
        printf("OK: \"use client\" nalezen.\n");
    } else {
        printf("ERROR: Chybi \"use client\" -> GA se nespusti.\n");
    }

    if (hasEnvVar) {
        printf("OK: Pouziva NEXT_PUBLIC_GA_ID.\n");
    } else {
        printf("ERROR: Nenalezena process.env.NEXT_PUBLIC_GA_ID.\n");
    }

    if (hasReturnNull) {
        printf("WARNING: Nalezeno \"return null\" -> muze blokovat GA.\n");
    } else {
        printf("OK: Nenalezena blokace renderu.\n");
    }

    printf("\n=== DOPORUCENI ===\n");

    if (!hasUseClient) {
        printf("- Pridej na prvni radek: \"use client\";\n");
    }

    if (!hasEnvVar) {
        printf("- Pouzij: process.env.NEXT_PUBLIC_GA_ID\n");
    }

    if (hasReturnNull) {
        printf("- Zkontroluj podminku return null, muze blokovat GA.\n");
    }

    if (hasUseClient && hasEnvVar && !hasReturnNull) {
        printf("\nWrapper vypada OK. Pokud GA stale nejede:\n");
        printf("- Zkontroluj Network -> gtag\n");
        printf("- Zkontroluj cookie banner\n");
        printf("- Zkontroluj deploy na Vercel\n");
    }

    printf("\n========================\n");

    return 0;
}
