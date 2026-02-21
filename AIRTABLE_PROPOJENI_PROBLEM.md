# Proč propojení s Airtable (zápis zpráv) nefunguje

Dokument pro konzultaci – shrnutí stavu a možných příčin.

---

## Co je nastaveno

- **Kontaktní formulář** na webu posílá data na vlastní API: `POST /api/contact`.
- **API route** (`app/api/contact/route.ts`):
  1. Odešle data na **Formspree** → funguje (200 OK, e-mail chodí).
  2. Při úspěchu volá **Airtable API** a vytvoří záznam v tabulce (např. „Zprávy“).

---

## Co se děje

- **Formspree:** funguje, odpověď `200`, `ok: true`.
- **Airtable:** API vrací **403** s tělem:
  ```json
  {"error":{"type":"INVALID_PERMISSIONS_OR_MODEL_NOT_FOUND","message":"Invalid permissions, or the requested model was not found. Check that both your user and your token have the required permissions, and that the model names and/or ids are correct."}}
  ```

Uživateli se zobrazí úspěch (zpráva byla odeslána), ale do Airtable se nic nezapíše. V terminálu se objeví:  
`[api/contact] Airtable zápis selhal (zpráva byla odeslána): Error: Airtable 403: ...`

---

## Kde se request sestavuje

- **Soubor:** `jdemevibit-web/app/api/contact/route.ts`
- **Endpoint:** `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_CONTACTS)}`
- **Metoda:** POST, hlavička `Authorization: Bearer ${AIRTABLE_API_KEY}`, body JSON s poli `Jméno`, `Email`, `Zpráva`.

Proměnné se berou z prostředí (`.env.local`):

- `AIRTABLE_API_KEY` – Personal Access Token z Airtable (začíná `pat...`)
- `AIRTABLE_BASE_ID` – ID base (začíná `app...`, cca 17 znaků)
- `AIRTABLE_TABLE_CONTACTS` – název tabulky (výchozí `Zprávy`)

V kódu je validace ENV (existují, neprázdné, formát Base ID a tokenu) a logování:  
`[api/contact] Airtable endpoint: ...`, `Airtable status: ...`, `Airtable body: ...`.

---

## Ověřené

- V `.env.local` jsou všechny tři proměnné vyplněné.
- Base ID má formát `app...` (např. `appRtUIAUiiTpc3MW`).
- Token v Airtable (stránka Personal access tokens): název „Jdemevibit.cz“, ACCESS „1 base“, SCOPES `data.records:write`, TOKEN ID začíná `patzr4kt48dZY0Gy0`.
- V Airtable se zobrazuje jen začátek tokenu (TOKEN ID); celý token byl vidět jen při vytvoření.

---

## Diagnostika (skript `scripts/airtable-diagnose.mjs`)

Spuštění: `node scripts/airtable-diagnose.mjs` (z adresáře `jdemevibit-web`).

**Výsledek diagnostiky:**

- **ENV:** Base ID `appRtUIAUiiTpc3MW`, tabulka `Table1`, token délka 82, začíná na `pat` – formát v pořádku.
- **GET /v0/meta/bases:** 403 – token nemá scope `schema.bases:read` (volitelné).
- **GET /v0/{baseId}/Table1** (list records): **403** – stejná chyba jako POST.
- **POST** (create record): **403**.

**Závěr:** Ani **čtení** z tabulky nefunguje (GET 403). Token tedy buď **nemá přístup k base `appRtUIAUiiTpc3MW`**, nebo je **Base ID z jiné base** než té, ke které má token v Airtable přiřazený přístup (např. máte dvě bases a token má přístup jen k jedné).

**Doporučený krok:** V Airtable u tokenu „Jdemevibit.cz“ v sekci **Access** je vybraná konkrétní base. Otevřete **právě tuto** base v prohlížeči a z adresního řádku zkopírujte Base ID (část `app...`). Musí být **shodné** s `AIRTABLE_BASE_ID` v `.env.local`. Pokud tam máte jiné ID, nahraďte ho. Případně vytvořte **nový** token a u něj v Access zvolte jen base s názvem „Jdemevibit.cz“ (kde máte Table1), uložte, zkopírujte celý nový token do `AIRTABLE_API_KEY` a restartujte server.

---

## Možné příčiny 403 (INVALID_PERMISSIONS_OR_MODEL_NOT_FOUND)

1. **Špatný nebo zkrácený token v `.env.local`**  
   Do `AIRTABLE_API_KEY` musí být **celý** Personal Access Token (dlouhý řetězec), ne jen prefix z sloupce „TOKEN ID“ v Airtable. Pokud je v ENV jen např. `patzr4kt48dZY0Gy0`, je to zkrácené → 401/403.  
   **Ověření:** vytvořit v Airtable nový token, zkopírovat celý a nahradit jím hodnotu v `.env.local`, restartovat dev server.

2. **Base ID nesedí na base, ke které má token přístup**  
   Token má přístup k „1 base“. Pokud je v `AIRTABLE_BASE_ID` ID jiné base než té, kterou jste u tokenu vybrali, Airtable vrátí 403.  
   **Ověření:** v Airtable otevřít base „Jdemevibit.cz“, zkontrolovat URL (část `appXXXXXXXX`). Ta musí být **identická** s hodnotou v `.env.local` u `AIRTABLE_BASE_ID`.

3. **Token nemá oprávnění k této base**  
   Na stránce tokenu zkontrolovat, že v „Access“ je vybraná právě ta base, do které chcete zapisovat („Jdemevibit.cz“), a že scope obsahuje např. `data.records:write`.

4. **Název tabulky**  
   `AIRTABLE_TABLE_CONTACTS` musí být **přesně** název záložky tabulky v Airtable (např. `Zprávy`). Špatný název může u Airtable vést k 403 nebo 404.  
   Sloupce v tabulce musí mít názvy: **Jméno**, **Email**, **Zpráva** (jinak může přijít 422).

5. **ENV se nenačítá (např. na Vercel)**  
   Na produkci musí být `AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID` a `AIRTABLE_TABLE_CONTACTS` nastavené v Environment Variables. Po změně env je potřeba nový deploy.

---

## Co zkontrolovat v logu při dalším odeslání formuláře

V terminálu (např. `npm run dev`) hledat:

- `[api/contact] Airtable endpoint:` … zkontrolovat, že Base ID v URL odpovídá base v prohlížeči.
- `[api/contact] Airtable status:` … 403 = problém s oprávněním nebo base/tabulkou.
- `[api/contact] Airtable body:` … přesná chybová zpráva od Airtable.

Případně `[api/contact] Airtable ENV neplatné:` – pak některá z ENV proměnných neprošla validací (formát, prázdné, uvozovky).

---

## Shrnutí pro konzultaci

- **Stav:** Formspree OK, Airtable API vrací 403 (INVALID_PERMISSIONS_OR_MODEL_NOT_FOUND).
- **Nejpravděpodobnější:** token v `.env.local` je zkrácený (použit jen prefix z Airtable) nebo Base ID nesedí na base, ke které má token přístup.
- **Doporučený postup:** ověřit celý token (příp. vytvořit nový a vložit celý), ověřit shodu Base ID s URL base „Jdemevibit.cz“, ověřit název tabulky a názvy sloupců (Jméno, Email, Zpráva).

Poslední aktualizace: únor 2026.
