# Labor 02: A Mikrokontroller I/O Portjai (GPIO)
**Tananyag:** Kristálytiszta Elektronika 2 — 07. fejezet (A mikrokontroller I/O portjai)

---

## 🎯 A Laboratórium Célja
A mikrokontroller általánosan használható ki- és bemeneti (GPIO) portjainak konfigurálása, push-pull kimenetek vezérlése (LED futófény), valamint nyomógomb beolvasása, hardveres és szoftveres pergésmentesítése, és 4 bites bináris számláló készítése.

---

## 📋 Elvégzendő Feladatok
- [ ] **GPIO kimenetek konfigurálása és futófény program:**
  - A fejlesztői kártya 4 felhasználói LED-jének (`HMI_LED_1`, `HMI_LED_2`, `HMI_LED_3`, `HMI_LED_4`) beállítása GPIO kimenetként az `.ioc` felületen (Push-Pull mód).
  - Futófény algoritmus megvalósítása a `main.c` főciklusában: a LED-ek egymás utáni be- és kikapcsolása balra és jobbra `HAL_GPIO_WritePin()` és `HAL_Delay()` függvényekkel, bitműveletekkel.
- [ ] **Gomb beolvasása és pergésmentesítés vizsgálata:**
  - A felhasználói nyomógomb (`HMI_BTN_1`) beállítása GPIO bemenetként.
  - A nyomógomb mechanikus prelljének megértése; a hardveres pergésmentesítés elvei (RC szűrő, Schmitt-trigger hiszterézis, SR tároló).
  - Szoftveres pergésmentesítés megvalósítása: állapotmintavételezés küszöbértékkel (`DEBOUNCING_TRESHOLD = 20`) stabil nyomógomb-állapot eléréséig.
- [ ] **Éldetektálás és 4 bites bináris számláló:**
  - Lenyomási él detektálása a gomb aktuális és korábbi állapotának összehasonlításával (`current_state_debounce && !previous_state_edge`).
  - Számláló változó (`counter`) léptetése minden érvényes gombnyomáskor (0–15 tartományban).
  - A számláló értékének megjelenítése a 4 LED-en bináris formátumban bitmaszkolással (`counter & 0x08`, `0x04`, `0x02`, `0x01`).

---

## 🔌 Hardver Összeállítás: 4 LED & Nyomógomb a Próbapanelen (Breadboard)

A laborfeladatok fizikai megvalósításához 4 darab LED-et, 4 darab $220\,\Omega$–$330\,\Omega$ előtét-ellenállást és 1 darab taktilis nyomógombot építünk fel a próbapanelen, jumper vezetékekkel az STM32 Nucleo kártyához kötve.

> 🎮 **[👉 Interaktív Próbapanel Szimulátor megnyitása (breadboard.html)](breadboard.html)** — pontos 2D elhelyezési rajz, tesztelhető futófény és számláló szimuláció, X-ray nézet a belső sínekhez, minden alkatrész polaritásával.

| Alkatrész | STM32 Pin | C Makró | Próbapanel |
| :--- | :--- | :--- | :--- |
| **LED 1 (Piros)** | `PD7` | `HMI_LED_1_Pin` | Anód: 6. oszlop, Katód: 7. oszlop → ellenállás → GND sín |
| **LED 2 (Sárga)** | `PD6` | `HMI_LED_2_Pin` | Anód: 11. oszlop, Katód: 12. oszlop → ellenállás → GND sín |
| **LED 3 (Zöld)** | `PD5` | `HMI_LED_3_Pin` | Anód: 16. oszlop, Katód: 17. oszlop → ellenállás → GND sín |
| **LED 4 (Kék)** | `PD4` | `HMI_LED_4_Pin` | Anód: 21. oszlop, Katód: 22. oszlop → ellenállás → GND sín |
| **Nyomógomb** | `PE5` | `HMI_BTN_1_Pin` | 26. oszlop → `3.3V`, 28. oszlop → `PE5` |
| **Közös GND** | `GND` | — | Próbapanel kék (-) sínje |

**LED polaritás:** hosszabb láb / gömbölyű perem = Anód (+) → GPIO; rövidebb láb / lapított perem = Katód (-) → ellenálláson át GND-re.

> [!CAUTION]
> Előtét-ellenállás nélkül tilos a LED-et közvetlenül a mikrokontroller lábára kötni — a túláram tönkreteszi a LED-et és az STM32 kimeneti tranzisztorát. Mindig használj $220\,\Omega$–$330\,\Omega$-os ellenállást soros.

*(A gombnál a belső `GPIO_PULLDOWN` lehúzó ellenállás aktív a programban, ezért felengedve 0V, lenyomva 3.3V a bemeneten.)*

---

## 🚀 Teendők a Laboron (Lépésről lépésre)
1. Tanulmányozd át a fenti bekötési táblát, az interaktív próbapanel szimulátort és a mellékelt tananyag PDF-et (`7. A mikrokontroller IO portjai.pdf`)!
2. Építsd fel a kapcsolást a próbapanelen feszültségmentesített állapotban (a Nucleo USB kábele legyen kihúzva)!
3. Csatlakoztasd az USB kábelt a számítógéphez!
4. Indítsd el az **STM32CubeIDE**-t, és nyisd meg a projektet!
5. Ellenőrizd a 4 LED kimenetet (`PD7`, `PD6`, `PD5`, `PD4` Push-Pull) és a nyomógomb bemenetet (`PE5` Pull-Down) az `.ioc` felületen!
6. Valósítsd meg az 1. feladatot: a 4 LED-es futófényt a `main.c` `while(1)` ciklusában!
7. Valósítsd meg a 2. feladatot: a szoftveres pergésmentesítést (`DEBOUNCING_TRESHOLD`), az éldetektálást és a 4 bites számláló bináris LED-es megjelenítését!
8. Teszteld a működést a fizikai hardveren: ellenőrizd, hogy minden egyes gombnyomás pontosan egyet léptet-e a számlálón!
9. A labor végén töltsd fel a megoldásodat a saját privát GitHub repódba a heti érdemjegyedért:
   ```bash
   git add .
   git commit -m "labor_02 gpio futofeny es pergesmentesitett szamlalo megoldva"
   git push origin main
   ```
