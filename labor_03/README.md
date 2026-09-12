# Labor 03: Soros Kommunikáció I. (I2C & SPI)
**Tananyag:** Kristálytiszta Elektronika 2 — 08. fejezet (Soros kommunikációs vonalak I.)

---

## 🎯 A Laboratórium Célja
A szinkron soros kommunikációs vonalak (I2C és SPI) megismerése, a panelen található TSL2561 digitális fényerősség mérő szenzor I2C regisztereinek kezelése (Simple és Memory módban), valamint a mért fénymennyiség kijelzése LED-eken.

---

## 📋 Elvégzendő Feladatok
- [ ] **I2C periféria és kimenetek konfigurálása:**
  - I2C2 periféria beállítása az `.ioc` felületen Standard módban (100 kHz órajel), az `SDA` (`PF0`) és `SCL` (`PF1`) lábakon.
  - A LED-ek (`HMI_LED_1..4` a `PD7..PD4` lábakon) konfigurálása GPIO kimenetként.
- [ ] **A TSL2561 fénymérő szenzor címzése és konfigurálása:**
  - A szenzor 7 bites I2C címének megértése (`ADDRSEL` bekötése szerint: `0x29`, `0x39` vagy `0x49`) és 8 bites HAL címmé alakítása (`ADDR << 1`).
  - Bekapcsolási parancs (`Power On` = `0x03`) kiküldése a szenzor `CONTROL` (`0x00`) regiszterébe.
- [ ] **Fényerősség kiolvasása kétféle módszerrel:**
  - **Egyszerű mód (Simple mode):** Kiolvasás `HAL_I2C_Master_Transmit()` (regisztercím átadása) és `HAL_I2C_Master_Receive()` függvényekkel.
  - **Memória mód (Memory mode):** Közvetlen regiszterolvasás a `HAL_I2C_Mem_Read()` függvénnyel (`DATA0LOW`, `DATA0HIGH`, `DATA1LOW`, `DATA1HIGH` regiszterekből).
- [ ] **Mért érték megjelenítése és küszöbértékek kezelése:**
  - A kiolvasott ADC0 (látható és IR fény) érték feldolgozása.
  - A mért fényszint megjelenítése a 4 LED-en szintjelző sávként a fényintenzitás függvényében.
- [ ] **SPI elméleti ismeretek elsajátítása:**
  - Az SPI működési elvének (master-slave címzés az SS/CS lábbal, két összekapcsolt léptetőregiszterrel megvalósított full-duplex adatcsere) megértése a tananyag alapján.
  - Egy szenzorregiszter kiolvasási szekvenciájának végigkövetése: az SS láb lehúzása, a regisztercím kiküldése, majd egy dummy bájt (`0xFF`) küldése az adat fogadásához.

---

## 🔌 Hardver Összeállítás: TSL2561 Fénymérő Modul & LED Sávkijelző

A TSL2561 I2C fénymérő modult a próbapanelen keresztül az STM32 **I2C2** perifériájához (`PF0` = SDA, `PF1` = SCL) kötjük, a mért fényerősséget pedig a már ismert 4 LED-en jelenítjük meg szintjelző sávként.

> 🎮 **[👉 Interaktív Próbapanel Szimulátor megnyitása (breadboard.html)](breadboard.html)** — pontos bekötési rajz, X-ray nézet a belső sínekhez, és élő fényerő-szimuláció, amely a küszöbértékek alapján gyújtja fel a LED sávot.

| Alkatrész | STM32 Pin | C Makró | Próbapanel |
| :--- | :--- | :--- | :--- |
| **TSL2561 VCC** | `+3.3V` | — | Piros (+) sín |
| **TSL2561 GND** | `GND` | — | Kék (-) sín |
| **TSL2561 SCL** | `PF1` | `hi2c2` (I2C2 handle) | Jumper vezeték a Nucleóhoz |
| **TSL2561 SDA** | `PF0` | `hi2c2` (I2C2 handle) | Jumper vezeték a Nucleóhoz |
| **LED 1 (Piros)** | `PD7` | `HMI_LED_1_Pin` | Anód: 6. oszlop, Katód: 7. oszlop → ellenállás → GND sín |
| **LED 2 (Sárga)** | `PD6` | `HMI_LED_2_Pin` | Anód: 11. oszlop, Katód: 12. oszlop → ellenállás → GND sín |
| **LED 3 (Zöld)** | `PD5` | `HMI_LED_3_Pin` | Anód: 16. oszlop, Katód: 17. oszlop → ellenállás → GND sín |
| **LED 4 (Kék)** | `PD4` | `HMI_LED_4_Pin` | Anód: 21. oszlop, Katód: 22. oszlop → ellenállás → GND sín |

*(Az I2C SDA/SCL vonalak Open-Drain jellegűek, de a TSL2561 modul NYÁK-ján gyárilag megvannak a szükséges felhúzó (pull-up) ellenállások.)*

---

## 🚀 Teendők a Laboron (Lépésről lépésre)
1. Tanulmányozd át a mellékelt tananyag PDF-et (`8. Soros kommunikáció I.pdf`)!
2. Indítsd el az **STM32CubeIDE**-t, és nyisd meg az I2C fénymérő példaprojektet vagy konfiguráld be az I2C2-t (100 kHz)!
3. Konfiguráld a LED-ek kivezetéseit (`PD4..PD7`) kimenetként!
4. Valósítsd meg a fénymérő szenzor bekapcsolását a `CONTROL` regiszter írásával!
5. Olvasd ki a mért fényerősséget a `HAL_I2C_Master_Transmit/Receive` vagy a `HAL_I2C_Mem_Read` függvénnyel!
6. Kapcsold be a megfelelő számú LED-et a fényerősség függvényében (fénymérő tesztelése a szenzor letakarásával és megvilágításával)!
7. A labor végén töltsd fel a megoldásodat a saját privát GitHub repódba a heti érdemjegyedért:
   ```bash
   git add .
   git commit -m "labor_03 i2c fenymero szenzor kiolvasas megoldva"
   git push origin main
   ```
