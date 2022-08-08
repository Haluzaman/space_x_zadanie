# Zadanie - React app

## Vypracovane úlohy

### 1. Pomocou Urql zobraziť tabuľku, kde budú zobrazené misie spoločnosti SpaceX
Tu som pre graphql request nastavil limit na 20 záznamov, z dôvodu aby nemuselo načitávať všetky údaje.
### 2. Implementovanie prepínania stĺpcov
Vytvoril som pár checkboxov s názvami stĺpcov, ktoré je možné zaškrutnúť, a následne sa daný stĺpec zobrazí alebo skryje
v tabuľke.

### 5. Implementovať detail misie
V každom riadku tabuľky sa nachádza tlačidlo, ktoré presmeruje používateľa na novú stránku s detailom misie (jej názov a video)

## Neimplementované úlohy

### 3. Implementovat prepínanie jazyka EN/SK
Túto úloha nebola splnená iba z časového dôvodu.

**Popis**: úlohu som začal riešiť, no natrafil som na problém v súbore i18n.js.
Princíp je však taký, že treba nastaviť správne súbor i18n.js a následne povytvárať adresáre public/locales/skratka_jazyka
a následne použit useTranslation(), z ktorého by som si zobral funkciu 't', ktorá ako kľúč berie kľúč vo vytvorenom adresáry,
pod ktorým je uložená hodnota pre daný nastavený jazyk.

### 4. Implementovať infinite-scrolling
Túto úloha nebola splnená z časového dôvodu a z problémami pri inštalácií niektorých komponentov.

**Ako by som to riešil:**
Použil by som najskôr asi https://www.npmjs.com/package/react-infinite-scroll-component.
Ktorý by mi obaloval tabuľku a za pomoci prop refreshFunction, kde by som si namapoval moju funkciu
na stiahnutie dodatočných dát z graphql api.