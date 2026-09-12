# Labor 01: STM32 Fejlesztői Környezet & ST-Link
**Tananyag:** Kristálytiszta Elektronika 2 — 04. fejezet (CubeIDE, ST-Link)

---

## 🎯 A Laboratórium Célja
A heti laboratórium célja az **STM32CubeIDE** integrált fejlesztői környezet, a projektstruktúra, a moduláris forrásfájl-kezelés, a **CubeMX** grafikus konfigurátor és az **ST-Link** programozó/hibakereső készségszintű elsajátítása a laboratóriumi NUCLEO kártyán a Kristálytiszta Elektronika 2 hivatalos tananyaga alapján.

---

## 📋 Elvégzendő Feladatok
- [ ] **Munkavédelmi jegyzőkönyv megismerése és aláírása** (az első labor kötelező feltétele!).
- [ ] **Környezeti beállítások az STM32CubeIDE-ben:**
  - Párhuzamos fordítás engedélyezése a gyorsabb buildeléshez (`Project` → `Properties` → `C/C++ Build` → `Behavior` → *Enable Parallel build* & *Use optimal jobs*).
- [ ] **Új projekt létrehozása és struktúra megismerése:**
  - Új STM32 projekt létrehozása a laboratóriumi NUCLEO kártyához (STM32F446ZE / STM32F446RE Target Selector).
  - A projekt könyvtárszerkezetének feltérképezése (`Core/Src`, `Core/Inc`, `Drivers`, `.ioc` konfigurációs fájl).
- [ ] **Moduláris forrásfájl- és könyvtárkezelés:**
  - Különálló forrásmappa létrehozása (`New` → `Source Folder`, pl. `External/Src` és `External/Inc`).
  - Saját forrásfájl (`pelda.c`) és fejlécfájl (`pelda.h`) létrehozása, deklaráció és definíció szétválasztása.
  - Include keresési útvonal hozzáadása a fordítóhoz (`Project` → `Properties` → `C/C++ General` → `Paths and Symbols` → `Includes`).
  - Saját függvény meghívása a `main.c`-ben a `USER CODE BEGIN` és `USER CODE END` blokkok szabályainak szigorú betartásával.
- [ ] **CubeMX grafikus konfiguráció (.ioc):**
  - Kivezetések beállítása, alternatív kivezetések keresése (Ctrl + kattintás), saját címke megadása (*Enter user label*).
  - Órajel konfiguráció: külső kristály oszcillátorok (HSE, LSE) engedélyezése az RCC perifériában, órajel-frekvenciák áttekintése.
  - Kódgenerálás mentéssel (Ctrl+S).
- [ ] **Fordítás és letöltés:**
  - Projekt sikeres lefordítása (Build - kalapács ikon), üzenetek megtekintése a Console és Problems felületen.
  - Firmware ellenőrzése és a lefordított bináris letöltése a mikrokontroller Flash memóriájába.

---

## 🚀 Teendők a Laboron (Lépésről lépésre)
1. Tanulmányozd át a mellékelt tananyag PDF-et (`4. STM programozási környezet CubeIDE, ST-Link.pdf`)!
2. Indítsd el az **STM32CubeIDE**-t, és állítsd be a workspace-t (ügyelj arra, hogy az elérési út ne tartalmazzon ékezetes karaktereket)!
3. Hozz létre egy új projektet a laboratóriumi kártyához ebben a mappában!
4. Hozd létre a külön forrásmappát (`External`), add hozzá a `.c` és `.h` fájlokat, és konfiguráld be az Include útvonalat a projekt beállításaiban!
5. Próbáld ki a hasznos gyorsbillentyűket (`F2` lebegő definíció, `F3`/`Ctrl+Kattintás` ugrás deklarációhoz, `Ctrl+Space` kódkiegészítés)!
6. Nyisd meg az `.ioc` fájlt, konfiguráld az RCC külső oszcillátort és mentsd el a kódgeneráláshoz!
7. Fordítsd le a projektet (Build), csatlakoztasd a kártyát, és töltsd le a mikrokontrollerre!
8. A labor végén commitold és pushold a megoldásodat a saját privát GitHub repódba a heti érdemjegyedért:
   ```bash
   git add .
   git commit -m "labor_01 fejlesztoi kornyezet beallitva"
   git push origin main
   ```
