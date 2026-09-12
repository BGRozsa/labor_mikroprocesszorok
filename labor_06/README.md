# Labor 06: Analóg-Digitális Átalakítás (ADC)
**Tananyag:** Kristálytiszta Elektronika 2 — 11. fejezet (A-D átalakítás)

---

## 🎯 A Laboratórium Célja
Az analóg-digitális átalakítás elméletének elsajátítása, az STM32 SAR ADC perifériájának beállítása, potenciométer feszültségének mérése blokkoló (polling) és megszakításos (interrupt) módban, valamint a mérés pontosságának javítása szoftveres átlagolással.

---

## 📋 Elvégzendő Feladatok
- [ ] **ADC elmélet és architektúra megértése:**
  - A mintavételezés és kvantálás folyamata, felbontás (12 bit = 4096 szint), referenciaszint ($V_{REF} = 3.3	ext{ V}$) és LSB érték.
  - A szukcesszív approximációs (SAR) ADC működési elve és a konverziós idő.
  - Az STM32 ADC regiszterek (`SR`, `CR1`, `CR2`, `SMPR`, `DR`) funkcióinak áttekintése.
- [ ] **Hardver összeállítás és CubeMX konfiguráció:**
  - Forgó potenciométer (`HMI_POT`) bekötése az analóg bemenetre (`PC0` / `ADC1_IN10`).
  - 12 bites felbontás, jobbra igazítás (Right alignment), Single conversion konfiguráció.
- [ ] **Mérés blokkoló (Polling) üzemmódban:**
  - Mérés indítása és lekérdezése: `HAL_ADC_Start()`, `HAL_ADC_PollForConversion()`, `HAL_ADC_GetValue()`, `HAL_ADC_Stop()`.
  - A digitális kód átszámítása valós feszültségértékké ($U = rac{ADC}{4095} \cdot 3.3	ext{ V}$).
- [ ] **Mérés megszakításos (Interrupt) üzemmódban:**
  - ADC globális megszakítás engedélyezése az NVIC-ben.
  - Mérés indítása: `HAL_ADC_Start_IT()`.
  - A konverzió lezárultakor lefutó `HAL_ADC_ConvCpltCallback()` callback függvény megvalósítása a CPU terhelésének megszüntetésére.
- [ ] **Zajcsökkentés és stabilitásjavítás szoftveres átlagolással:**
  - Mozgóátlagoló vagy több egymást követő mérés számtani középértékét képző algoritmus megírása a zajos tranziensek kiszűrésére.

---

## 🔌 Hardver Összeállítás: Forgó Potenciométer

A méréshez egy 10 kΩ-os forgó potenciométert kötünk a próbapanelre feszültségosztóként: a két szélső lába a táplálást kapja, a középső (wiper) lába pedig az elforgatás mértékétől függő analóg feszültséget adja az STM32 ADC bemenetére.

> 🎮 **[👉 Interaktív Próbapanel Szimulátor megnyitása (breadboard.html)](breadboard.html)** — pontos bekötési rajz, X-ray nézet a belső sínekhez, és élő ADC-leolvasás szimuláció (12 bites érték és feszültség) a wiper pozíciójának állításával.

| Alkatrész | STM32 Pin | C Makró | Próbapanel |
| :--- | :--- | :--- | :--- |
| **Potenciométer — bal láb** | `GND` | — | Kék (-) sín |
| **Potenciométer — wiper (középső láb)** | `PC0` | `HMI_POT_Pin` | Jumper vezeték a Nucleóhoz (`ADC1_IN10`) |
| **Potenciométer — jobb láb** | `+3.3V` | — | Piros (+) sín |

> [!CAUTION]
> Az ADC analóg bemenetére soha ne köss 3.3V-nál nagyobb feszültséget — a bemeneti fokozat azonnal károsodik. Ellenőrizd, hogy a potenciométer szélső lábai valóban a `GND` és a `+3.3V` sínre kerülnek, ne fordítva.

---

## 🚀 Teendők a Laboron (Lépésről lépésre)
1. Tanulmányozd át a mellékelt tananyag PDF-et (`11. A-D átalakítás.pdf`)!
2. Indítsd el az **STM32CubeIDE**-t, és konfiguráld be az ADC1 csatornáját az `.ioc` felületen!
3. Írd meg a blokkoló módú feszültségmérést a `while(1)` ciklusban, és kövesd nyomon az érték változását a potméter forgatásával!
4. Módosítsd a projektet megszakításos üzemmódra (`HAL_ADC_Start_IT` és `HAL_ADC_ConvCpltCallback`)!
5. Egészítsd ki a programot szoftveres átlagolással, és hasonlítsd össze a kapott értékek stabilitását a nyers méréssel!
6. A labor végén töltsd fel a megoldásodat a saját privát GitHub repódba a heti érdemjegyedért:
   ```bash
   git add .
   git commit -m "labor_06 adc feszultsegmeres polling es interrupt modban kesz"
   git push origin main
   ```
