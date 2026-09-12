# Labor 10: Számláló és Timer Egységek, Watchdog (WDT)
**Tananyag:** Kristálytiszta Elektronika 2 — 15. fejezet (Számláló és Timer egységek, WDT)

---

## 🎯 A Laboratórium Célja
Az általános célú időzítők (Timer/Counter) üzemmódjainak elsajátítása, precíz 1 másodperces időzítés és periodikus megszakítás megvalósítása LED villogtatáshoz, valamint a független Watchdog Timer (IWDG) felkonfigurálása és tesztelése rendszerfagyás esetén.

> 🔌 **Hardver:** Ehhez a laborhoz nincs szükség új bekötésre — a felhasznált `LED1` (`PD7`, `HMI_LED_1`) már fel van építve a [Labor 02 próbapanel-szimulátorában](../labor_02/breadboard.html); csak ellenőrizd, hogy a korábbi bekötés még megvan.

---

## 📋 Elvégzendő Feladatok
- [ ] **Időzítő modulok üzemmódjainak megismerése:**
  - Prescaler (PSC), Auto-Reload Register (ARR), számlálási irányok (fel, le, középállású).
  - Főbb funkciók: Input Capture (eseménydetektálás, frekvenciamérés), Output Compare és PWM (impulzusszélesség-moduláció), Enkóder interfész, SysTick Timer.
  - A Watchdog Timer szerepe és működése a beágyazott rendszerek üzembiztonságában.
- [ ] **1. Feladat: LED villogtatása Timer interrupt segítségével:**
  - Időzítő (TIM1 vagy TIM2) beállítása az `.ioc` felületen pontos 1 másodperces periódusidőre (Clock Source: Internal Clock, Prescaler és ARR számítása).
  - Időzítő megszakítás engedélyezése az NVIC-ben és indítása: `HAL_TIM_Base_Start_IT(&htim)`.
  - A `HAL_TIM_PeriodElapsedCallback()` callback függvény megírása: benne egy jelzőváltozó (flag) beállítása, majd a főciklusban ennek vizsgálata és a felhasználói LED (`PD7` / LED1) állapotának átbillentése (`HAL_GPIO_TogglePin`).
- [ ] **2. Feladat: Watchdog Timer (IWDG) alkalmazása:**
  - IWDG periféria beállítása a CubeMX felületen (megfelelő előosztó és számláló érték megadása, pl. 5 másodperces lejárati időhöz).
  - Az IWDG periodikus törlése a főciklusban: `HAL_IWDG_Refresh(&hiwdg)`.
  - Szándékos hiba előidézése: néhány sikeres LED-villogtatás/Watchdog-újratöltés után szándékos végtelen ciklusba (`while(1);`) léptetés, amitől elmarad a további `HAL_IWDG_Refresh()` hívás.
  - A mikrokontroller hardveres újraindulásának megfigyelése az újraindulás után ismét megjelenő LED1-villogáson.

---

## 🚀 Teendők a Laboron (Lépésről lépésre)
1. Tanulmányozd át a mellékelt tananyag PDF-et (`15. Számláló és Timer egységek, WDT.pdf`)!
2. Indítsd el az **STM32CubeIDE**-t, és hozz létre egy új projektet a timeres feladathoz!
3. Konfiguráld be a Timert 1 Hz-es frekvenciára az órajelfa, Prescaler és ARR helyes kiszámításával!
4. Valósítsd meg a `HAL_TIM_PeriodElapsedCallback()` függvényt és teszteld a másodpercenkénti LED villogást!
5. Aktiváld az IWDG-t, léptess be néhány sikeres frissítés után egy szándékos végtelen ciklust, és figyeld meg a Watchdog által kiváltott újraindulást!
6. A labor végén töltsd fel a megoldásodat a saját privát GitHub repódba a heti érdemjegyedért:
   ```bash
   git add .
   git commit -m "labor_10 timer interrupt led villogtatas es iwdg tesztelve"
   git push origin main
   ```
