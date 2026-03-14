---
id: "10"
title: "Aplikace pro svoz komunálního odpadu"
description: "PWA pro občany: přehled termínů svozu komunálního a BIO odpadu, aktuální obecní poplatky a e-mailové připomínky. Node.js, Express, SQLite, nasazeno na Render."
technologies:
  - "Node.js"
  - "TypeScript"
  - "Express"
  - "SQLite"
  - "PWA"
  - "Render"
  - "Nodemailer"
timeSpent: "Průběžně"
status: "Veřejný"
category: "WEB"
createdAt: "2026-03-09"
url: "https://popelnice.onrender.com"
image: "/projects/10-popelnice.png"
businessBenefit: "Jedna aplikace pro občany – svozy i poplatky, instalace na mobil bez obchodu, e-mailové připomínky."
---

# Aplikace pro svoz komunálního odpadu

Progresivní webová aplikace (PWA) pro občany obce: přehled termínů svozu komunálního a BIO odpadu, kalendář svozů, aktuální obecní poplatky v daném měsíci a e-mailové připomínky den před svozem nebo před začátkem platebního období.

## Funkce

- **Kdy co sveze?** – nejbližší svozy s odpočtem dní, kalendář měsíce s vyznačením komunál/BIO.
- **Poplatky obce** – aktivní a brzy nadcházející poplatky (komunální odpad, vodné a stočné, paušální stočné, pes, pronájem pozemku) s platebními obdobími a poznámkami.
- **Nastavení** – e-mail domácnosti, další příjemci připomínek, testovací e-mail.
- **PWA** – instalace na plochu (Android, iOS), offline fallback, bezpečnostní hlavičky pro Chrome/Play Protect a Apple.

## Technologie

- **Backend:** Node.js, Express, TypeScript, SQLite (better-sqlite3), Nodemailer (Gmail SMTP), Helmet (CSP a bezpečnostní hlavičky).
- **Frontend:** statický HTML/CSS/JS, PWA manifest, Service Worker (cache-first pro statiku, network pro API).
- **Nasazení:** Render (backend + statický frontend na jedné URL). Volitelně frontend na Vercelu s API_BASE na Render.

## Čas

Průběžný vývoj a údržba.

## Status

Veřejný – v provozu na [popelnice.onrender.com](https://popelnice.onrender.com).
