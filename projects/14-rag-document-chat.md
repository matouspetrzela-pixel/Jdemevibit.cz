---
id: "14"
title: "RAG Document Chat"
highlightOrder: 1
description: "Chat nad vlastními dokumenty. Odpovědi berou text z repo složky docs/ a ukazují zdroje."
strapline: "Next.js · hybridní RAG · Google Gemini · Vercel Blob"
technologies:
  - "Next.js 16"
  - "Gemini"
  - "Vercel Blob"
  - "MiniSearch"
timeSpent: "2026"
status: "Veřejný"
category: "WEB"
image: "/projects/rag-document-chat.png"
url: "https://rag-document-chat-app.vercel.app"
businessBenefit: "Ukázka RAG bez externí vektorové DB: jeden index, čitelné zdroje u odpovědi, vhodné jako šablona pro vlastní knowledge base."
---

# RAG Document Chat

Veřejná demo aplikace: nahraješ dokumenty do `docs/`, spustíš indexaci, ptáš se v češtině. Retrieval kombinuje embeddingy a fulltext (RRF); odpověď streamuje Gemini a přikládá metadata o zdrojích.

Nasazeno na Vercelu s trvalým indexem ve Vercel Blob. Autentizace API volitelná přes `RAG_API_SECRET`.
