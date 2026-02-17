/*
  FIX GA LAYOUT + CSP (C)

  Opraví:
  1. app/layout.tsx → přidá GoogleAnalyticsWrapper pokud chybí
  2. next.config.js / next.config.mjs → doplní GA domény do CSP

  Použití:
  gcc fix_ga_layout_csp.c -o fix_ga_layout_csp
  ./fix_ga_layout_csp
*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define LAYOUT_PATH "app/layout.tsx"
#define LAYOUT_TMP  "app/layout.tmp"

#define CONFIG_JS   "next.config.js"
#define CONFIG_MJS  "next.config.mjs"
#define CONFIG_TMP  "next.config.tmp"

int file_exists(const char *path) {
    FILE *f = fopen(path, "r");
    if (f) { fclose(f); return 1; }
    return 0;
}

void fix_layout() {
    if (!file_exists(LAYOUT_PATH)) {
        printf("WARN: %s nenalezen.\n", LAYOUT_PATH);
        return;
    }

    FILE *in = fopen(LAYOUT_PATH, "r");
    FILE *out = fopen(LAYOUT_TMP, "w");

    char line[4096];
    int hasImport = 0;
    int hasComponent = 0;

    while (fgets(line, sizeof(line), in)) {
        if (strstr(line, "GoogleAnalyticsWrapper")) {
            if (strstr(line, "import")) hasImport = 1;
            if (strstr(line, "<GoogleAnalyticsWrapper")) hasComponent = 1;
        }
        fputs(line, out);
    }

    if (!hasImport) {
        fprintf(out,
        "\nimport GoogleAnalyticsWrapper from \"@/components/GoogleAnalyticsWrapper\";\n");
        printf("FIX: Přidán import GoogleAnalyticsWrapper\n");
    }

    if (!hasComponent) {
        fprintf(out,
        "\n{/* GA Wrapper */}\n<GoogleAnalyticsWrapper />\n");
        printf("FIX: Přidán <GoogleAnalyticsWrapper /> do layoutu\n");
    }

    fclose(in);
    fclose(out);

    remove(LAYOUT_PATH);
    rename(LAYOUT_TMP, LAYOUT_PATH);
}

void fix_csp(const char *configPath) {
    FILE *in = fopen(configPath, "r");
    if (!in) return;

    FILE *out = fopen(CONFIG_TMP, "w");

    char line[4096];
    int hasGTM = 0;
    int hasGA  = 0;

    while (fgets(line, sizeof(line), in)) {
        if (strstr(line, "googletagmanager")) hasGTM = 1;
        if (strstr(line, "google-analytics")) hasGA = 1;
        fputs(line, out);
    }

    if (!hasGTM || !hasGA) {
        fprintf(out,
        "\n// Added by fix script\n"
        "const gaCSP = [\n"
        "  \"https://www.googletagmanager.com\",\n"
        "  \"https://www.google-analytics.com\"\n"
        "];\n");
        printf("FIX: Doplněny GA domény do CSP\n");
    }

    fclose(in);
    fclose(out);

    remove(configPath);
    rename(CONFIG_TMP, configPath);
}

int main() {
    printf("\n=== FIX GA LAYOUT + CSP ===\n\n");

    fix_layout();

    if (file_exists(CONFIG_JS)) {
        fix_csp(CONFIG_JS);
    } else if (file_exists(CONFIG_MJS)) {
        fix_csp(CONFIG_MJS);
    } else {
        printf("WARN: next.config.js/mjs nenalezen.\n");
    }

    printf("\nDONE.\n");
    printf("Další krok:\n");
    printf("git add .\n");
    printf("git commit -m \"Fix GA layout + CSP\"\n");
    printf("git push\n\n");

    return 0;
}
