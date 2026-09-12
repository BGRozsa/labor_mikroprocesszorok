# Labor 07: Digitális-Analóg Átalakítás (DAC)
**Tananyag:** Kristálytiszta Elektronika 2 — 12. fejezet (D-A átalakítás)

---

## 🎯 A Laboratórium Célja
A digitális-analóg átalakítás elvének, a DAC hibáknak és típusoknak a megismerése, fix analóg kimeneti feszültségek előállítása és multiméteres mérése, valamint 100 pontos szinuszjel generálása szoftveres és hardveres (Timer trigger) módszerrel.

---

## 📋 Elvégzendő Feladatok
- [ ] **DAC elmélet és típusok áttekintése:**
  - A D/A átalakítás szerepe, felbontás, LSB feszültség ($LSB = rac{V_{REF}}{2^N - 1}$).
  - DAC hibák megismerése: offset (nullponti) hiba, erősítési hiba, differenciális linearitási hiba (DNL), kapcsolási tranziens (glitch).
  - DAC típusok: kapcsolt ellenállásos, R-2R létrás, ciklikus soros átalakító.
- [ ] **1. Feladat: Fix kimenő feszültség előállítása:**
  - DAC1 Channel 1 (PA4) beállítása az `.ioc` felületen a J2 csatlakozón.
  - Digitális kód kiszámítása: $D = rac{U_{out}}{V_{REF}} \cdot 4095$ (pl. 1.0 V, 2.0 V, 3.3 V feszültségekhez).
  - DAC indítása és értékadás: `HAL_DAC_Start()` és `HAL_DAC_SetValue()` 12 bites jobbra igazított formátumban (`DAC_ALIGN_12B_R`).
  - A kimenő feszültség ellenőrzése multiméterrel a J2 csatlakozó 2. lábán.
- [ ] **2. Feladat: Szinuszjel előállítása Look-Up Table (LUT) segítségével:**
  - 100 pontból álló szinuszhullám kiszámítása a `GenerateSine()` függvénnyel (`USER CODE BEGIN 0`) matematikai képlettel ($(\sin(2\pi \cdot i / 100) + 1) \cdot 2048$), majd meghívása a `USER CODE BEGIN 2` blokkban.
  - 1. módszer: Pontról pontra léptetés szoftveres `while(1)` ciklusból `HAL_Delay(1)` késleltetéssel (10 Hz-es analóg szinuszjel).
  - 2. módszer: Hardveres időzítés: Timer Trigger (TRGO esemény) kiválasztása az `.ioc` felületen a processzor terhelésmentesítéséhez és a jittermentes frekvenciához.

---

## 🔌 Mérési Összeállítás: DAC Kimenet Mérése (Multiméter / Oszcilloszkóp)

Ebben a laborban nincs önállóan felépítendő próbapanel-áramkör: a DAC1 Channel 1 analóg kimenete közvetlenül a J2 csatlakozó 2. lábán (PA4) jelenik meg, amit egy jumper vezetékkel kötünk ki egy multiméter vagy oszcilloszkóp mérőpróbájához.

> 🎮 **[👉 Interaktív Mérési Szimulátor megnyitása (breadboard.html)](breadboard.html)** — élő szinuszjel-oszcilloszkóp és feszültségmérő szimuláció a generált 100 pontos LUT alapján.

| Alkatrész | STM32 Pin | C Makró | Mérési pont |
| :--- | :--- | :--- | :--- |
| **DAC1 Channel 1 kimenet** | `PA4` | `DAC_CHANNEL_1` | J2 csatlakozó 2. lába → jumper vezeték → multiméter/oszcilloszkóp mérőhegye |
| **Közös földpont** | `GND` | — | Nucleo GND láb → multiméter/oszcilloszkóp földcsipesze |

*(A DAC beépített kimeneti puffere max. 1–2 mA áramot képes leadni — mérőműszer nagy bemeneti ellenállása mellett ez biztonságos, de terhelő alkatrészt sosem szabad közvetlenül a kimenetre kötni.)*

> [!CAUTION]
> Mérés előtt mindig ellenőrizd, hogy a multiméter/oszcilloszkóp földcsipesze a Nucleo GND lábára van kötve — közös földpont nélkül a mérés hibás (lebegő) értékeket ad.

---

## 🚀 Teendők a Laboron (Lépésről lépésre)
1. Tanulmányozd át a mellékelt tananyag PDF-et (`12. D-A átalakítás.pdf`)!
2. Indítsd el az **STM32CubeIDE**-t, és konfiguráld a DAC perifériát (PA4 kimenet)!
3. Valósítsd meg az 1. feladatot: állíts be 1.0 V kimeneti feszültséget, és mérd meg multiméterrel a J2 csatlakozón!
4. Valósítsd meg a 2. feladatot: generáld le a 100 pontos szinusz tömböt, és léptesd a DAC kimenetet a főciklusban!
5. Vizsgáld meg az előállított analóg hullámformát oszcilloszkóppal!
6. A labor végén töltsd fel a megoldásodat a saját privát GitHub repódba a heti érdemjegyedért:
   ```bash
   git add .
   git commit -m "labor_07 dac fix feszultseg es szinuszjel generalas kesz"
   git push origin main
   ```
