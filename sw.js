// sw.js — Service Worker base per PWA offline-first
"use strict";

const CACHE_NAME = "woozy-index-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
];

// Installa e pre-cacha le risorse statiche
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)),
  );
  self.skipWaiting();
});

// Attiva e rimuovi cache vecchie
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)),
        ),
      ),
  );
  self.clients.claim();
});

// Fetch: cache-first per risorse statiche, network-first per il resto
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Ignora richieste non-GET e URL esterne (es. thumbnails)
  if (request.method !== "GET") return;
  if (!request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          // Cacha solo risposte valide delle nostre risorse
          if (
            response.ok &&
            ASSETS.some((a) => request.url.endsWith(a.replace("./", "")))
          ) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => {
          // Fallback offline: restituisci index.html per navigazione
          if (request.headers.get("accept")?.includes("text/html")) {
            return caches.match("./index.html");
          }
        });
    }),
  );
});
