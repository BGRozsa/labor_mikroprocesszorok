# Labor 05: Soros Kommunikáció II. (UART, CAN, USB)
**Tananyag:** Kristálytiszta Elektronika 2 — 10. fejezet (Soros kommunikáció II.)

---

## 🎯 A Laboratórium Célja
Az aszinkron soros kommunikációs protokollok (UART, CAN, USB) megismerése, kétirányú UART adatátvitel megvalósítása pixelmozgató alkalmazással és heartbeat visszajelzéssel, valamint a mikrokontroller beépített USB PHY-jának HID egérként történő konfigurálása és tesztelése.

---

## 📋 Elvégzendő Feladatok
- [ ] **Aszinkron kommunikációs protokollok megismerése:**
  - Az aszinkron átvitel elve (órajel hiánya, baud rate, start bit, stop bit, 16x túlmintavételezés, overhead).
  - A CAN 2.0A protokoll jellemzői (multimaster, domináns/recesszív szintek, arbitráció, Identifier, CRC, bitbeszúrás).
  - Az USB architektúra és HID (Human Interface Device) eszközosztály megértése.
- [ ] **UART kétirányú adatátvitel (`10_UART` projekt):**
  - USART6 konfiguráció áttekintése (PG14 = TX, PG9 = RX; 115200 baud, 8 bit, 1 stop bit, paritás nélkül).
  - Kétirányú adatátvitel: `HAL_UART_Transmit()` és `HAL_UART_Receive()`.
  - Irányító gombok beolvasása, sebességvektor (`x_velocity`, `y_velocity`) továbbítása UART-on.
  - Heartbeat jelzés megvalósítása a 3-as LED periodikus felvillantásával a rendszer futásának ellenőrzésére.
- [ ] **USB HID egér megvalósítása (`10_USB` projekt):**
  - USB OTG FS periféria konfigurálása Device módban a beépített belső PHY-vel.
  - USB Middleware aktiválása Human Interface Device (HID) osztályként.
  - Egérmozgatás implementálása a kártya 4 szélső gombjával, egérkattintás a középső gombbal.
  - Adatcsomagok küldése a PC felé `USBD_HID_SendReport()` függvénnyel (`mouse_report_t` struktúra).

---

## 🔌 Hardver Összeállítás: HMI Gombsor, UART és USB Csatlakozás

Ebben a laborban nincs önállóan összeépítendő próbapanel-áramkör: az irányító gombok a fejlesztőpanelre szerelt, korábbi laborokból már ismert HMI gombsoron találhatók, az UART és USB perifériák pedig közvetlenül a Nucleo fejléceiről, illetve a beépített micro-USB csatlakozóról érhetők el.

> 🎮 **[👉 Interaktív Bekötési Szimulátor megnyitása (breadboard.html)](breadboard.html)** — élő USB-HID egérmozgatás demó a gombokkal, UART TX/RX aktivitásjelzés és a heartbeat LED szimulációja.

| Alkatrész | STM32 Pin | C Makró | Próbapanel |
| :--- | :--- | :--- | :--- |
| **HMI gomb 1 (Fel)** | `PE5` | `HMI_BTN_1_Pin` | Rögzített HMI gombsor, 1. gomb |
| **HMI gomb 2 (Balra)** | `PE2` | `HMI_BTN_2_Pin` | Rögzített HMI gombsor, 2. gomb |
| **HMI gomb 3 (Kattintás / Reset)** | `PE3` | `HMI_BTN_3_Pin` | Rögzített HMI gombsor, középső gomb |
| **HMI gomb 4 (Jobbra)** | `PE6` | `HMI_BTN_4_Pin` | Rögzített HMI gombsor, 4. gomb |
| **HMI gomb 5 (Le)** | `PE4` | `HMI_BTN_5_Pin` | Rögzített HMI gombsor, 5. gomb |
| **USART6 TX** | `PG14` | `huart6` (USART6) | Nucleo fejléc → USB-UART átalakító / partner panel RX |
| **USART6 RX** | `PG9` | `huart6` (USART6) | Nucleo fejléc → USB-UART átalakító / partner panel TX |
| **USB OTG FS (D-/D+)** | `PA11` / `PA12` | `hUsbDeviceFS` | Beépített micro-USB csatlakozó → PC |

*(A HMI gombok belső `GPIO_PULLDOWN` üzemmódban vannak, ezért felengedve 0V, lenyomva 3.3V a bemeneten — ahogy a korábbi laborokban.)*

Az USART6 vonalak teszteléséhez csatlakoztass egy külső USB-UART átalakítót a PG14 (TX) és PG9 (RX) lábakra (vagy köss össze két panelt kereszdrótozással: TX↔RX, GND↔GND), majd nyiss egy terminálprogramot (pl. PuTTY) 115200 baud, 8N1 beállítással.

> [!CAUTION]
> Az USB HID feladathoz mindig **adatátvitelre alkalmas** micro-USB kábelt használj — sok "csak töltő" kábelben nincs bekötve a D+/D- érpár, így a PC nem fogja felismerni a kártyát HID eszközként.

---

## 🚀 Teendők a Laboron (Lépésről lépésre)
1. Tanulmányozd át a mellékelt tananyag PDF-et (`10. Soros kommunikáció II.pdf`)!
2. Indítsd el az **STM32CubeIDE**-t, és nyisd meg a `10_UART` példaprojektet!
3. Csatlakoztasd a kártyát, fordítsd le a kódot, és figyeld meg az UART-os adatforgalmat és a LED3 heartbeat villogását!
4. Nyisd meg a `10_USB` projektet, és vizsgáld meg az `.ioc` fájlban az `USB_OTG_FS` és a `Middleware/USB_DEVICE` beállításait!
5. Csatlakoztasd a kártya micro-USB portját a PC-hez, és figyeld meg, hogy a gombok nyomására mozog-e a számítógép egérkurzora!
6. A labor végén töltsd fel a megoldásodat a saját privát GitHub repódba a heti érdemjegyedért:
   ```bash
   git add .
   git commit -m "labor_05 uart es usb hid eger feladat megoldva"
   git push origin main
   ```
