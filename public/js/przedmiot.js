// Ustawienia tego przedmiotu — jedyny plik w js/, który różni się między aplikacjami Przyroda i Historia
// (reszta kodu jest wspólna). Czyta go też narzędzie narzedzia/*.mjs.
export const PRZEDMIOT = {
  id: 'historia',                 // repo GitHub, subdomena (historia.ogarnijmaterial.pl), dane: historia-dane w Cloudflare KV
  nazwa: 'Historia',              // nazwa widoczna w aplikacji
  dopelniacz: 'historii',         // „Lekcje historii pojawią się…”
  klucz: 'hs',                    // przedrostek kluczy w pamięci telefonu (localStorage)
  folder: 'KLASA 6/KLASA 4/Historia', // lekcje w lekcje-audio (iCloud)
  konto: 'aniela',                // konto domyślne (gdy nie ma listy „profile” niżej)
  profil: { id: 'aniela', imie: 'Aniela', dopelniacz: 'Anieli', klasa: 4, znak: 'A', ona: true },
  // kilka dzieci w jednej aplikacji: konto na ogarnijmaterial.pl → profil, folder lekcji w lekcje-audio (pliki _<znak>),
  // układ podręcznika (zestawy/<spis>) i ilustracje (obrazy/<ilustracje>); id zestawów z przedrostkiem, żeby się nie zderzały
  profile: {
    aniela: { id: 'aniela', imie: 'Aniela', dopelniacz: 'Anieli', klasa: 4, znak: 'A', ona: true,
      folder: 'KLASA 6/KLASA 4/Historia', spis: 'spis.json', ilustracje: 'obrazy/ilustracje/', przedrostek: '' },
    julian: { id: 'julian', imie: 'Julek', dopelniacz: 'Julka', klasa: 6, znak: 'J', ona: false,
      folder: 'KLASA 6/Historia', spis: 'spis-julian.json', ilustracje: 'obrazy/ilustracje/julian/', przedrostek: 'julek-' },
  },
  // ikony do bąbli na kartach lekcji (pole „ikona” w zestawie) — rysunki w js/dom.js
  ikony: ['kolumna', 'zwoj', 'korona', 'zamek', 'klepsydra', 'mapa', 'ksiazka', 'pioro', 'tarcza', 'statek', 'amfora'],
  // ikona dobierana przy imporcie z tytułu lekcji (pierwsze dopasowanie)
  ikonaTematu: [[/czas|kalendarz|chronolog|wiek|epok/i, 'klepsydra'], [/źródł|pismo|kronik|dokument/i, 'zwoj'], [/król|książ|władc|koron|dynasti/i, 'korona'],
    [/zamek|gród|średniow|rycer/i, 'zamek'], [/map|plan|kraj|ojczyzn|region/i, 'mapa'], [/staroży|grec|rzym|egip|antyk/i, 'kolumna'],
    [/odkry|podróż|morz|statek/i, 'statek'], [/bitw|wojn|obron|powstan/i, 'tarcza'], [/archeolog|wykop|zabyt|muzeum/i, 'amfora'],
    [/uczon|pisarz|poet|nauk/i, 'pioro'], [/histori|przeszło/i, 'ksiazka']],
};
