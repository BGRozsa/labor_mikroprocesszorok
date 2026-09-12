# Labor 12: Motorok Vezérlése (DC Motor, H-híd & Enkóder)
**Tananyag:** Kristálytiszta Elektronika 2 — 17. fejezet (Motorok vezérlése)

---

## 🎯 A Laboratórium Célja
A villamos gépek (DC, AC) működési elveinek megismerése, a laborpanelen lévő BD6211F integrált H-híd meghajtóval és kvadratúra enkóderrel ellátott egyenáramú motor sebesség- és irányvezérlése (PWM és analóg DAC mód), valamint a fordulatszám mérése és számítása.

---

## 📋 Elvégzendő Feladatok
- [ ] **Villamos gépek és hajtások elmélete:**
  - Az elektromágneses indukció elve (Lorentz-erő, Faraday és Lenz törvénye).
  - Villamos gépek osztályozása: DC motorok (kefés, BLDC), AC aszinkron és szinkron motorok.
  - H-híd teljesítményfokozat működése (4 kapcsolóelem, átlós vezérlés, szabadonfutás, dinamikus fékezés).
  - Inkrementális kvadratúra enkóder elve (a két Hall-szenzoros fázis, A és B jelek kb. 100°-os szögeltolása, felbontás).
- [ ] **Enkóder pozíció- és fordulatszámmérés (`motor.c`):**
  - Enkóder fázisok figyelése EXTI külső megszakítással (`HAL_GPIO_EXTI_Callback()`).
  - 4 bites állapotgép (`updateEncoderPosition()`): az előző és aktuális A/B bitek összevetésével a pozícióváltozás (`encoder_position_act`) növelése vagy csökkentése.
  - Fordulatszám (RPM) számítása TIM10 periodikus időzítő callbackben (`HAL_TIM_PeriodElapsedCallback()`): pozíciókülönbség, frekvencia, áttétel (`MOTOR_GEAR_RATIO`) és enkóderfelbontás alapján.
- [ ] **Motorvezérlés a BD6211F H-híd IC-vel:**
  - Az üzemmódok beállítása a 4. táblázat logikája szerint: a tananyag PDF-jében szereplő eredeti kártyán fizikai SW1-SW4 DIP kapcsolók végzik ezt, ezen a Nucleo-alapú laborhardveren viszont a `MOTOR_FIN` (`PF11`) és `MOTOR_RIN` (`PF12`) GPIO-kimenetek szoftveres vezérlése választja ki az üzemmódot:
    - Maximális sebességű előreforgatás (`FIN=H, RIN=L`) és hátraforgatás (`FIN=L, RIN=H`).
    - **PWM fordulatszám-szabályozás:** FIN kivezetés PWM kimenetként hajtva, kitöltési tényező 10%-os léptetése gombokkal.
    - **Analóg sebességszabályozás:** VREF bemenet vezérlése az STM32 DAC kimenetével (`HAL_DAC_SetValue()`).
    - Fékezés és készenléti (Standby) állapot.

---

## 🔌 Hardver Összeállítás: BD6211F Meghajtó Modul, DC Motor &amp; Enkóder

A BD6211F H-híd meghajtó IC és az enkóderes DC motor kész, tüskesoros modulblokkok a laborpanelen — nem szórt LED/ellenállás jellegű breadboard-alkatrészek —, amelyeket jumperekkel kötünk az STM32 Nucleo GPIO lábaihoz és egy külső motortápegységhez.

> 🎮 **[👉 Interaktív Modul-Bekötés Szimulátor megnyitása (breadboard.html)](breadboard.html)** — pontos modul-Nucleo bekötési rajz, tesztelhető sebesség- és irányvezérlés, élő enkóder-impulzusszámláló és forgó motor-animáció.

| Alkatrész | STM32 Pin | C Makró | Próbapanel |
| :--- | :--- | :--- | :--- |
| **BD6211F modul — FIN** | `PF11` | `MOTOR_FIN_Pin` | Meghajtó modul FIN bemenete (irányválasztó GPIO) |
| **BD6211F modul — RIN** | `PF12` | `MOTOR_RIN_Pin` | Meghajtó modul RIN bemenete (irányválasztó GPIO) |
| **BD6211F modul — PWM** | `PF9` (`TIM14_CH1`) | `MOTOR_PWM_Pin` | Meghajtó modul sebességszabályzó PWM bemenete |
| **BD6211F modul — DIR** | `PG1` | `MOTOR_DIR_Pin` | Forgásirány-vezérlő GPIO (`Motor_setDirection()`) |
| **Enkóder — A fázis** | `PD1` (EXTI1) | `ENC_PHASE_A_Pin` | Kvadratúra enkóder A csatornája |
| **Enkóder — B fázis** | `PG0` (EXTI0) | `ENC_PHASE_B_Pin` | Kvadratúra enkóder B csatornája (kb. 100°-kal eltolva az A-hoz képest) |
| **Közös GND** | `GND` | — | Külső motortápegység és a Nucleo közös földje |

**Biztonság:** a motor OUT+/OUT- vezetékeit csak áramtalanított állapotban köss vagy bontsd, feszültség alatt sose cserélgesd a bekötést.

> [!CAUTION]
> A motort mindig külön, külső tápegységről tápláld — soha ne a Nucleo 3.3V/5V lábáról! A motor indulási árama messze meghaladja a Nucleo lábak (~20 mA) terhelhetőségét, a tekercsek induktív feszültséglökése pedig károsíthatja a mikrovezérlőt. A külső tápegység GND-jét kötelező összekötni a Nucleo GND lábával (közös föld) — enélkül a vezérlőjelek nem záródnak, és a motor kiszámíthatatlanul viselkedik.

---

## 🚀 Teendők a Laboron (Lépésről lépésre)
1. Tanulmányozd át a mellékelt tananyag PDF-et (`17. Motorok vezérlése.pdf`)!
2. Indítsd el az **STM32CubeIDE**-t, és nyisd meg a fejezethez tartozó motorvezérlő projektet!
3. Vizsgáld meg a motorvezérlő IC (BD6211F) bemeneteinek (FIN, RIN, VREF) és az enkóder lábak bekötését!
4. Tanulmányozd át a `motor.c` állományban az enkóder állapotátmeneti táblázatát és a fordulatszám-számítást!
5. Teszteld a motor működését a `MOTOR_FIN`/`MOTOR_RIN` GPIO-kimenetek szoftveres vezérlésével: próbáld ki a maximális fordulatszámú forgatást, a PWM vezérlést és az analóg DAC vezérlést!
6. Figyeld meg a fordulatszám (RPM) változását a gombok nyomására!
7. A labor végén töltsd fel a megoldásodat a saját privát GitHub repódba a heti érdemjegyedért:
   ```bash
   git add .
   git commit -m "labor_12 dc motor vezerles bldc h-hid enkoder meres kesz"
   git push origin main
   ```
