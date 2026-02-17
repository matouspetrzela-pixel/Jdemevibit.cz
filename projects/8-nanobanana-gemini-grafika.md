---
id: "8"
title: "Nano Banana – generování grafiky přes Gemini 3 Pro"
description: "Nástroj pro generování obrázků z textového popisu pomocí Gemini 3 Pro Image API. Vibe coding příklad: od nápadu k funkčnímu skriptu – prompt na příkazové řádce, volba poměru stran a rozlišení, výstup do složky."
technologies:
  - "Python 3"
  - "Google GenAI API"
  - "Gemini 3 Pro Image"
  - "python-dotenv"
  - "Pillow"
timeSpent: "Krátký projekt (hodiny)"
status: "Prototyp"
category: "PROTOTYPE"
createdAt: "2026-02-17"
image: "/projects/8-nanobanana-gemini-grafika.svg"
businessBenefit: "Rychlá tvorba obrázků z popisu bez složité instalace – vhodné pro prototypy, moodboardy nebo integraci do Cursor/workflow."
---

# Nano Banana – generování grafiky přes Gemini 3 Pro

Nástroj pro generování obrázků z textového popisu (promptu) pomocí **Gemini 3 Pro Image** (Nano Banana Pro) přes Google GenAI API. Typický vibe coding projekt: minimální závislosti, jeden skript, API klíč v `.env` – od nápadu k funkčnímu nástroji za hodiny.

## Proč tento projekt

Ukázka praktického využití image generation API v reálném kódu: zadáš popis (příkazová řádka nebo stdin), skript zavolá model a uloží obrázek do složky `vystup/`. Cursor nebo jiné prostředí může skript spouštět a na základě zadání v chatu vygenerovat obrázek. Ideální příklad „malého projektu s okamžitým výsledkem“.

## Technologie

- Python 3.10+
- Google GenAI (`google-genai`) – oficiální klient pro Gemini API
- Gemini 3 Pro Image (model `gemini-3-pro-image-preview`)
- python-dotenv pro API klíč z `.env`
- Pillow pro práci s obrázky

## Co umí

- **Prompt z příkazové řádky** – např. `python generuj_obrazek.py Slunce zapadá nad horami v minimalistickém stylu`
- **Prompt ze vstupu** – při spuštění bez argumentu skript vyzve k zadání popisu
- **Více obrázků** – parametr `-n 3` vygeneruje tři obrázky
- **Poměr stran** – `--aspect 16:9`, `1:1`, `9:16` atd.
- **Rozlišení** – `--size 1K`, `2K`, `4K`
- **Vlastní výstup** – `-d slozka` a `-o cesta/soubor.png` (při jednom obrázku)

Vygenerované soubory se ukládají do `vystup/` (nebo zadané složky) s názvem odvozeným od promptu a časové značky.

## Čas

Krátký projekt – od návrhu po funkční skript v řádu hodin. Vhodný jako první projekt s image generation API nebo jako stavební kámen pro větší workflow.

## Status

Prototyp – zdrojový kód a README dostupné jako příklad vibe codingu na jdemevibit.cz.

## Odkazy

- [Gemini API – Image generation (Nano Banana)](https://ai.google.dev/gemini-api/docs/image-generation)
- [Google AI Studio – API klíč](https://aistudio.google.com/apikey)
