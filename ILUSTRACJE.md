# Ilustracje Historii — prompty i cięcie

**Styl: atlas historyczny / katalog muzealny** — tusz z delikatną akwarelą, prawdziwe przedmioty i budowle, spokojne barwy
(ochry, terakota, stonowana zieleń, łupkowy błękit, kremowy pergamin). Zasada całego projektu: grafika dla 11–13 lat (`~/CLAUDE.md`) —
bez maskotek, bez bajkowych twarzy. Ludzie tylko mali, z daleka. Styl zatwierdzony do pokazania Wojtkowi 2026-10-25 (próbka = arkusz działów).

Źródło promptów: `narzedzia/prompty.json` (`styl`, `siatka`, `arkusze[]` z nazwami komórek).

## Jak zrobić
1. ChatGPT (Chrome Wojtka, jeden czat „Ilustracje historii 4 klasy”): wklej `prompt + styl + siatka` arkusza. Kolejne arkusze w tym samym czacie
   z dopiskiem „in exactly the same visual style as the previous image”.
2. Pobranie: blob obrazka z czatu (JS: `fetch(img.src)` → `<a download>`), od razu z Pobranych do scratchpadu. Uwaga: przycisk „Download the PNG”
   otwiera bibliotekę i nie zapisuje pliku — nie bierz „najnowszego pliku w Pobranych”, tylko plik o własnej nazwie.
3. Cięcie: `python narzedzia/tnij_arkusz.py <arkusz.png> <kolumny> <wiersze> <katalog> nazwa1,nazwa2,…` (venv z Pillow, numpy, scipy w scratchpadzie),
   potem `cwebp -q 86 -alpha_q 100 x.png -o public/obrazy/ilustracje/x.webp`.

## Nazwy plików (`public/obrazy/ilustracje/`, `js/dom.js` → `obrazDzialu`, `obrazLekcji`)
- `dzial-<n>.webp` — działy 1–5, `historia.webp` — ogólna (kolumna ze zwojem)
- `dz<n>-l<m>.webp` — lekcja m działu n, `dz<n>-podsumowanie.webp` — podsumowanie działu (`dz<n>-test.webp`, gdyby doszedł test)
- Brak pliku = w zarysie zostaje sam numer (obrazek znika przez `onerror`).
