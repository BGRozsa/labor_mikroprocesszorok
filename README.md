# Mikroprocesszoros Rendszerek Laboratórium (2026/2027)
**Sapientia EMTE — Műszaki és Természettudományi Kar**

Üdvözlünk a Mikroprocesszoros Rendszerek laboratórium hivatalos tananyag repójában!
A félév során 32 bites ARM Cortex-M4 mikrovezérlőkkel (**STM32 Nucleo**), valamint az ipari szabvány **STM32CubeIDE** környezettel dolgozunk a **Kristálytiszta Elektronika 2** tananyaga alapján.

---

## 🌐 Hivatalos Labor Portál (GitHub Pages)

A részletes szabályzat, az 1–10-es értékelési rendszer, a mini projekt követelmények és a heti ütemterv elérhető a kurzus weboldalán:
👉 **[Laboratóriumi Információs Portál](https://szigetipeter.github.io/labor_mikroprocesszorok/)**  
*(helyileg megtekinthető a [`docs/index.html`](docs/index.html) fájl böngészőben való megnyitásával).*

---

## 📌 Tudnivaló a Heti Feladatokról

A laboratóriumi mappákban **kizárólag a feladat leírása és az útmutató tananyag (PDF + README.md)** található meg. 
A hallgatók a feladatot **önállóan** valósítják meg az STM32CubeIDE környezetben, és a megírt projektet commitolják be az adott heti mappába a heti érdemjegyért (1–10).

---

## 📁 A Repó Felépítése

```text
.
├── docs/             # Hivatalos GitHub Pages weboldal (szabályzat, értékelés, segédletek)
├── .gitignore         # STM32CubeIDE fordítási és bináris fájlok szigorú kiszűrése
├── README.md          # Általános kurzusismertető
├── labor_01/          # 1. Hét: STM32 Fejlesztői Környezet & ST-Link
├── labor_02/          # 2. Hét: A Mikrokontroller I/O Portjai (GPIO)
├── labor_03/          # 3. Hét: Soros Kommunikáció I. (I2C & SPI)
├── labor_04/          # 4. Hét: Ember-Gép Kapcsolat Eszközei (HMI, Kijelzők)
├── labor_05/          # 5. Hét: Soros Kommunikáció II. (UART)
├── labor_06/          # 6. Hét: Analóg-Digitális Átalakítás (ADC)
├── labor_07/          # 7. Hét: Digitális-Analóg Átalakítás (DAC)
├── labor_08/          # 8. Hét: Korszerű Szenzortípusok és Alkalmazásuk
├── labor_09/          # 9. Hét: Szenzorok Kalibrálása
├── labor_10/          # 10. Hét: Számlálók, Timerek, PWM & WDT
├── labor_11/          # 11. Hét: Real-Time Clock (Valós Idejű Óra)
├── labor_12/          # 12. Hét: Villamos Motorok Vezérlése
└── mini_projekt/      # Félév végi integrált mini projekt
```

---

## ⚡ Gyors Git Útmutató Diákoknak

### 1. Félév eleji egyszeri beállítás (Saját privát repó):
```bash
git clone https://github.com/szigetipeter/labor_mikroprocesszorok.git mcu-labor
cd mcu-labor
git remote rename origin upstream
git remote add origin https://github.com/FELHASZNALONEVED/mcu-labor-2026.git
git push -u origin main
```
*(Minden heti feladat és tananyag már benne van a repóban!)*

### 2. Önálló munka a heti laboron:
1. Nyisd meg az aktuális heti mappa (pl. `labor_02`) `README.md` feladatleírását és a tananyag PDF-et.
2. Hozz létre egy új STM32CubeIDE projektet a kártyádhoz az adott heti mappán belül.
3. Valósítsd meg a feladatot és teszteld a hardveren.

### 3. Megoldás beküldése a heti jegyért:
```bash
git add .
git commit -m "Labor XX feladat megoldva"
git push origin main
```
