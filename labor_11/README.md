# Labor 11: Real-Time Clock (Valós Idejű Óra - RTC)
**Tananyag:** Kristálytiszta Elektronika 2 — 16. fejezet (Real-time Clock)

---

## 🎯 A Laboratórium Célja
A valós idejű óra (RTC) periféria megismerése, a 32.768 kHz-es külső kristály (LSE) és a BCD adatformátum kezelése, valamint komplett ébresztőóra megvalósítása réteges architektúrával, állapottér-modellel, kezelőgombokkal (EXTI) és OLED kijelzővel.

---

## 📋 Elvégzendő Feladatok
- [ ] **RTC alapfogalmak és hardveres felépítés:**
  - Az RTC periféria feladata, külső RTC-k (pl. DS1307) vs. belső mikrokontrolleres RTC.
  - LSE (Low Speed External) 32.768 kHz-es órajel-forrás, C10/C11 kapacitások szerepe, valamint a 2^15-ös (15-szörös kettes) leosztási lánc szerepe a precíz 1 Hz-es időalap előállításához.
  - A BCD (Binary Coded Decimal) kódolás lényege és a HAL struktúrák (`RTC_TimeTypeDef`, `RTC_DateTypeDef`, `RTC_FORMAT_BCD`).
- [ ] **Ébresztőóra réteges architektúrája és kezelőszervei:**
  - Réteges felépítés áttekintése: Hardver réteg -> Driver réteg -> Alkalmazás réteg.
  - Kezelőgombok bekötése és kezelése külső megszakításokkal (EXTI): navigáció, érték növelése/csökkentése és jóváhagyás.
- [ ] **Ébresztőóra állapotgépének megvalósítása:**
  - Az alkalmazás állapotainak kezelése:
    1. `SHOW_DATE_TIME`: Dátum és pontos idő formázott kiírása az OLED képernyőre folyamatos frissítéssel.
    2. `SHOW_ALARM_PRESET_TIME`: Az ébresztés beállított időpontjának megtekintése.
    3. `SET_DATE_TIME`: Év, hónap, nap, óra, perc, másodperc beállítása menürendszerből.
    4. `SET_ALARM`: Ébresztési időpont beállítása és ébresztés engedélyezése.
    5. `ALARM_IN_PROGRESS`: Riasztási állapot, villogó riasztási képernyő és LED működtetése nyugtázásig.
- [ ] **Ébresztési esemény (Alarm Interrupt):**
  - Az RTC Alarm A esemény és megszakítás felkonfigurálása az egyezési feltételek vizsgálatára.

---

## 🔌 Hardver Összeállítás: OLED Kijelző &amp; Irányítógombok

A laborpanelen egy 128x64 képpontos SSD1306 grafikus OLED modul jeleníti meg a dátumot, az időt és az ébresztési menüket, az **I2C2** periférián (PF0/PF1) keresztül. Az állapotgép navigálásához mind az 5 HMI nyomógomb használatban van (fel/le/balra/jobbra/OK szerepkörben). A 32.768 kHz-es LSE kristály a Nucleo panelon található, azt nem kell külön bekötni.

> 🎮 **[👉 Interaktív Bekötés Szimulátor megnyitása (breadboard.html)](breadboard.html)** — pontos I2C2 és gomb bekötési rajz, élő ébresztőóra szimuláció ketyegő órával, dátum/idő és ébresztés beállítással, valamint RTC Alarm megszakítás kiváltásával.

| Alkatrész | STM32 Pin | C Makró | Próbapanel |
| :--- | :--- | :--- | :--- |
| **OLED VCC** | `+3.3V` | — | Piros (+) táp sín |
| **OLED GND** | `GND` | — | Kék (-) GND sín |
| **OLED SCL** | `PF1` | `I2C2_SCL` | I2C2 órajel vonal |
| **OLED SDA** | `PF0` | `I2C2_SDA` | I2C2 adat vonal |
| **Gomb ▲ (Fel)** | `PE5` | `HMI_BTN_1_Pin` | Belső pull-down, lenyomva 3.3V |
| **Gomb ◀ (Bal)** | `PE2` | `HMI_BTN_2_Pin` | Belső pull-down, lenyomva 3.3V |
| **Gomb OK (Középső)** | `PE3` | `HMI_BTN_3_Pin` | Belső pull-down, lenyomva 3.3V |
| **Gomb ▶ (Jobb)** | `PE6` | `HMI_BTN_4_Pin` | Belső pull-down, lenyomva 3.3V |
| **Gomb ▼ (Le)** | `PE4` | `HMI_BTN_5_Pin` | Belső pull-down, lenyomva 3.3V |

Az SDA és SCL vonalak nem cserélhetők fel, és figyelj rá, hogy a mikrokontroller **I2C2** perifériáját használjuk (nem I2C1-et).

> [!CAUTION]
> Az SSD1306 modul kizárólag **3.3V**-ra köthető — 5V-ra kötve a kijelző véglegesen károsodhat. Mindig ellenőrizd a modul feliratozását bekötés előtt.

---

## 🚀 Teendők a Laboron (Lépésről lépésre)
1. Tanulmányozd át a mellékelt tananyag PDF-et (`16. Real-time Clock.pdf`)!
2. Indítsd el az **STM32CubeIDE**-t, és nyisd meg az ébresztőóra mintaprojektet!
3. Vizsgáld meg az RTC beállításait az `.ioc` fájlban: LSE órajel és BCD formátum!
4. Tanulmányozd át a gombok EXTI megszakításait és az állapotgép működését!
5. Állítsd be a pontos időt és egy 1 percen belüli ébresztést, majd figyeld meg az `ALARM_IN_PROGRESS` állapot viselkedését!
6. A labor végén töltsd fel a megoldásodat a saját privát GitHub repódba a heti érdemjegyedért:
   ```bash
   git add .
   git commit -m "labor_11 rtc ebresztoora allapotgep es oled megjelenites kesz"
   git push origin main
   ```
