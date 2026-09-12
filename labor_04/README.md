# Labor 04: Ember-Gép Kapcsolat Eszközei (HMI & OLED Kijelző)
**Tananyag:** Kristálytiszta Elektronika 2 — 09. fejezet (Ember-gép kapcsolat eszközei)

---

## 🎯 A Laboratórium Célja
Az ember-gép kapcsolat bemeneti és kimeneti eszközeinek megismerése, a laborpanelen található grafikus OLED kijelző (SSD1306, 128x64) I2C illesztése, geometriai alakzatok és formázott szövegek kirajzolása, valamint bemutató állapotgép megvalósítása.

---

## 📋 Elvégzendő Feladatok
- [ ] **HMI eszközök áttekintése:**
  - A fejlesztőpanel bemeneti (nyomógombok, DIP kapcsolósor, forgó potenciométer) és kimeneti (táp/státusz LED-ek, 7-szegmenses kijelző, OLED) eszközeinek megismerése.
- [ ] **OLED kijelző és betűkészlet architektúra:**
  - Az SSD1306 vezérlős, 128x64 képpontos grafikus OLED kijelző I2C illesztésének felderítése.
  - A betűk és fontok tárolási módjának megértése (Flash memóriában tárolt konstans fonttáblák: `Font_7x10`, `Font_11x18`, `Font_16x26`).
  - A memóriabeli képernyőpuffer (framebuffer) szerepének megértése és frissítése (`OLED_UpdateScreen()`).
- [ ] **Geometriai rajzoló rutinok kipróbálása és használata:**
  - Kijelző inicializálása és törlése: `OLED_Init()`, `OLED_SetDisplay()`, `OLED_Fill()` (a teljes puffer feketére vagy fehérre színezése).
  - Alakzatok kirajzolása a pufferbe: képpont (`OLED_DrawPixel`), vonal (`OLED_DrawLine`), téglalap (`OLED_DrawRectangle`), kör (`OLED_DrawCircle`), ív (`OLED_DrawArc`), törtvonal (`OLED_DrawPolyline`).
- [ ] **Szöveges és karakteres kiírás:**
  - Karakterek és szövegek elhelyezése tetszőleges koordinátákon: `OLED_SetCursor()`, `OLED_WriteChar()`, `OLED_WriteString()`.
- [ ] **Bemutató állapotgép megvalósítása:**
  - Az `OLED_Test_state` állapotgép megvalósítása vagy kibővítése a demó képernyők egymás utáni megjelenítésére (`OLED_STATE_CCE`, `FONTS`, `LINE`, `RECTANGLE`, `CIRCLE`, `ARC`, `POLYLINE`).

---

## 🔌 Hardver Összeállítás: SSD1306 OLED &amp; Kezelőgombok

A laborpanelen egy 128x64 képpontos SSD1306 grafikus OLED modul van felszerelve, amely az **I2C2** periférián (nem I2C1-en!) keresztül kommunikál a mikrokontrollerrel. A demó állapotgép léptetéséhez 3 HMI nyomógomb szolgál.

> 🎮 **[👉 Interaktív OLED Bekötés Szimulátor megnyitása (breadboard.html)](breadboard.html)** — pontos I2C2 bekötési rajz, élő demó állapotgép a `OLED_Test_state` képernyőkkel (fontok, vonal, téglalap, kör, ív, törtvonal), gombkövetéssel és színinvertálással.

| Alkatrész | STM32 Pin | C Makró | Próbapanel |
| :--- | :--- | :--- | :--- |
| **OLED VCC** | `+3.3V` | — | Piros (+) táp sín |
| **OLED GND** | `GND` | — | Kék (-) GND sín |
| **OLED SCL** | `PF1` | `I2C2_SCL` | I2C2 órajel vonal |
| **OLED SDA** | `PF0` | `I2C2_SDA` | I2C2 adat vonal |
| **Gomb ◀ (Előző)** | `PE2` | `HMI_BTN_2_Pin` | Belső pull-down, lenyomva 3.3V |
| **Gomb (Invertálás)** | `PE3` | `HMI_BTN_3_Pin` | Belső pull-down, lenyomva 3.3V |
| **Gomb ▶ (Következő)** | `PE6` | `HMI_BTN_4_Pin` | Belső pull-down, lenyomva 3.3V |

Az SDA és SCL vonalak nem cserélhetők fel; sok OLED modulon már van beépített felhúzó (pull-up) ellenállás, ezért külön ellenállás nem szükséges a buszra.

> [!CAUTION]
> Az SSD1306 modul kizárólag **3.3V**-ra köthető — 5V-ra kötve a kijelző véglegesen károsodhat. Mindig ellenőrizd a modul feliratozását bekötés előtt.

---

## 🚀 Teendők a Laboron (Lépésről lépésre)
1. Tanulmányozd át a mellékelt tananyag PDF-et (`9. Ember-gép kapcsolat eszközei.pdf`)!
2. Indítsd el az **STM32CubeIDE**-t, és nyisd meg az OLED példaprojektet!
3. Vizsgáld meg a projekt felépítését: `oled.c`, `oled.h`, `fonts.c`, `fonts.h` állományokat!
4. Futtasd az állapotgépet, és figyeld meg az egyes geometriai alakzatok és fontok kirajzolását!
5. Készíts egy saját képernyőképet: írd ki a nevedet, a kurzus nevét, és rajzolj köré egy keretet téglalapból és körökből!
6. Teszteld és mutasd be a működést az oktatónak a fejlesztői kártyán!
7. A labor végén töltsd fel a megoldásodat a saját privát GitHub repódba a heti érdemjegyedért:
   ```bash
   git add .
   git commit -m "labor_04 oled kijelzo grafikus es szoveges demo megoldva"
   git push origin main
   ```
