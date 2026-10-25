# Historia — rodzinna aplikacja do nauki historii (PWA)

Zawsze po polsku. Aplikacja webowa na iPhone'a (dodana do ekranu początkowego), siostra Biologii (`~/Projekty/biologoza`)
i Przyrody (`~/Projekty/przyroda`) — kod jest wspólny z Przyrodą, różni je tylko `public/js/przedmiot.js`
(nazwa, konto, folder lekcji, ikony), akcent na końcu `styles.css`, nazwy pamięci w `sw.js` i teksty w `index.html`/manifeście.

- **Dla kogo:** tylko Aniela (klasa 4, konto `aniela` na ogarnijmaterial.pl).
- **Adres:** https://historia.ogarnijmaterial.pl — Cloudflare Worker ze statycznymi plikami z `public/` (bez skryptu),
  `wrangler.jsonc`. Wersji na github.io nie ma. Repo kodu: publiczne `krolikowskiwojciech-dotcom/historia`.
- **Konto (zawsze tryb ogarnijmaterial.pl):** przy starcie `GET https://ogarnijmaterial.pl/api/ja` (credentials) — `aniela` →
  aplikacja od razu jako Aniela; inna osoba → spokojny komunikat „To przedmiot Anieli” (przyciski do https://ogarnijmaterial.pl/
  i `#konta`); 401 → przekierowanie na https://ogarnijmaterial.pl/. Zero tokenów GitHuba.
  Render lokalnie: `?test-ogarnij=aniela|julian|401` (działa tylko na 127.0.0.1/localhost, bez sieci).
- **Dane:** wyniki `profile/aniela.json` i pełne nagrania `nagrania/<id>.mp3` leżą w Cloudflare KV „DANE” Workera
  `~/Projekty/ogarnijmaterial` pod kluczami `plik:historia-dane/<ścieżka>` (metadata `{sha, size}`); aplikacja czyta je przez
  `https://ogarnijmaterial.pl/api/gh/repos/krolikowskiwojciech-dotcom/historia-dane/contents/<ścieżka>` (`?raw=1` = strumień z Range).
  Repo `historia-dane` na GitHubie NIE istnieje i nie jest potrzebne. Worker wpuszcza `historia-dane` (stała `REPO` w jego `src/index.js`).
- **Nawigacja:** lewy górny róg zawsze pigułka powrotu: „Przedmioty” na starcie → https://ogarnijmaterial.pl/, „Wróć” w aplikacji;
  po prawej ustawienia i znaczek z inicjałem → https://ogarnijmaterial.pl/#konta. Odtwarzacz: −15 s / +15 s, pamięta miejsce.

## Skąd są lekcje

Na razie **nie ma żadnej lekcji historii** — aplikacja pokazuje spokojny ekran „Jeszcze nie ma lekcji / Lekcje historii pojawią się,
gdy dodamy pierwszy rozdział”. NIE używaj materiałów historii Julka (klasa 6) dla Anieli.
Lekcje zrobi skill `lekcja-audio` w `iCloud/Audio - do nauki /lekcje-audio` (profil `dzieci/aniela.md`); importer czyta
`KLASA 6/KLASA 4/Historia/Dział */` (folder Anieli leży w `KLASA 6/KLASA 4/`, jak jej przyroda i matematyka):

| z lekcje-audio | w aplikacji | gdzie |
|---|---|---|
| `skrypty/<id>_A.json` (pytania, ściąga, definicje) | zestaw z blokami: Pojęcia, Test wyboru, Prawda czy fałsz, Uzupełnij, Pytania z podręcznika + ściąga | `public/zestawy/` (publiczne) |
| `skrypty/<id>_A_pytania.md` (gdy nie ma JSON-a) | sam blok „Pytania z nagrania” | `public/zestawy/` |
| `audio/do-nauki-z-podrecznikiem/<id>_A.mp3` | „Lekcja z podręcznikiem” | **tylko** Cloudflare KV, `plik:historia-dane/nagrania/<id>.mp3` |
| `audio/na-strone/<id>_A_www.mp3` (jeśli będzie) | „Krótka powtórka” | **tylko** Cloudflare KV, `…/nagrania/<id>-krotkie.mp3` |

Id lekcji w stylu `hist_dz1_l01_<temat>_A` (dział i numer lekcji import bierze z `_dz<N>_l<N>_`; `podsumowanie`/`test` w nazwie = pozycja
na końcu działu). Skany stron, ekstrakcje i nagrania (blisko tekstu podręcznika) **nigdy** nie trafiają do publicznego repo ani do `public/`.
Nic nie czytamy z „Ucz się sprytniej” ani z folderu `uczsiesprytniej/`. Nagrania tylko `eleven_v4` (głos `piotr-v4`) —
nie nagrywamy tu niczego; starsze modele zgłoś Wojtkowi.

`public/zestawy/spis.json` — układ podręcznika (działy, lekcje, strony); dziś pusty. Import sam dopisuje do spisu lekcję, której tam nie ma
(temat = tytuł lekcji) — gdy przyjdzie spis treści podręcznika, uzupełnij działy, tematy i strony (lekcje bez zestawu pokażą się jako „wkrótce”).

## Prośba „wrzuć nową lekcję historii” / po nagraniu lekcji historii Anieli

1. `git pull`.
2. `node narzedzia/historia.mjs importuj` — wczytuje wszystkie lekcje, wysyła nowe nagrania do Cloudflare KV
   (`npx wrangler@4` zalogowany na tym Macu, uruchamiany w `~/Projekty/ogarnijmaterial`), pomija pliki, których sha w KV się zgadza,
   po wysyłce sprawdza listę KV jeszcze raz; potem sprawdza zestawy i przebudowuje `public/zestawy/indeks.json`. **Musi przejść bez błędów.**
   `--na-sucho` = tylko pokaż, czego brakuje w KV; `--bez-nagran` = bez nagrań.
   Zestawy z importu (`"zrodlo": "lekcje-audio"`) generują się przy każdym imporcie od nowa — błąd w pytaniu poprawiaj
   w `lekcje-audio/.../skrypty/<id>.json`. Zachowują się tylko `termin`, `ikona`, `kolor`, `dodano`.
3. Obejrzyj lokalnie: `python3 -m http.server 8763 --bind 127.0.0.1 -d public`, potem
   `http://127.0.0.1:8763/?test-ogarnij=aniela` (telefon 390 px).
4. **Publikacja: commit + `git push` + `npx -y wrangler@4 deploy`** (w tym katalogu). Sam push niczego nie publikuje.
   Nagrania są w KV od razu po imporcie; nowe pytania widać po deployu. Powiedz Wojtkowi, jakie lekcje doszły.

Kartkówka ze zdjęcia: jak w Biologii (`~/Projekty/biologoza/CLAUDE.md`), plik `public/zestawy/<rrrr-mm-dd>-aniela-<temat>.json`
według `ZESTAWY.md`, `node narzedzia/historia.mjs katalog`, render, commit + push + deploy. Zdjęcie nie trafia do repo.
Wyniki Anieli: `node narzedzia/historia.mjs wyniki` (czyta z KV).

## Zasady wyglądu

Jak w Biologii: Libre Baskerville (nagłówki) + Jost, **zero kursywy**, **bez emoji w interfejsie** (ikony SVG `ik()` z `js/dom.js`,
kreska 2.1), karty 3D z `--brzeg`, mniejsze rogi, żadnych `confirm()`/`alert()` — tylko `okno()`. **Żadnych maskotek ani słodkich
grafik dla maluchów** (Aniela ma 11 lat — styl dojrzały, podręcznikowy). Kolor przewodni: krem `#F1E7BF` (`--akcent`,
tło ikony aplikacji `public/ikony/ikona-*.png` — kolumna i zwój, ChatGPT). Teksty do Anieli w rodzaju żeńskim („Umiałaś?”).
Zmiany wizualne sprawdzaj renderem na 127.0.0.1 przed publikacją.
Ekran główny ma zakładki „Lekcje” (działy ze spisu) i „Ćwiczenia” (zestawy bez działu, np. kartkówki ze zdjęć) — jak w Angielskim.
Zarys: `public/zestawy/spis.json` ma cały podręcznik „Wczoraj i dziś 4” (5 działów, jak w Biologii — działy bez lekcji zwinięte, lekcje „wkrótce”).
Ilustracje działów i lekcji (ChatGPT, styl atlasu muzealnego): `ILUSTRACJE.md`, prompty `narzedzia/prompty.json`, cięcie `narzedzia/tnij_arkusz.py`.

## Kod

- `public/index.html`, `public/styles.css`, `public/sw.js` (szybki start: pliki aplikacji z pamięci, odświeżanie w tle;
  lekcje z sieci z limitem 1,5 s; pełne nagrania w osobnej pamięci `historia-nagrania`, której SW nie czyści).
- `public/js/przedmiot.js` (ustawienia przedmiotu), `app.js` (ekrany), `gra.js` (przebieg ćwiczeń), `sprawdz.js` (ocena odpowiedzi —
  wspólna z narzędziem), `store.js` (konto, zapis wyników, nagrania przez ogarnijmaterial.pl), `dom.js` (pomocniki, ikony, okienka),
  `dzwieki.js` (dźwięki jak w Biologii, `~/Projekty/biologoza/DZWIEKI.md`).
- `narzedzia/historia.mjs` — `importuj | sprawdz [id] | katalog | wyniki`.
- Po każdej zmianie kodu podbij `CACHE` w `public/sw.js`, potem commit + push + deploy. Nowe lekcje tego nie wymagają.
- Zmiana we wspólnym kodzie (`js/` poza `przedmiot.js`, `styles.css` poza akcentem) — przenieś ją też do `~/Projekty/przyroda`.
