# Japanisch-Trainer

Lokale Lern-Webseite für Vokabeln und Grammatik. Läuft ohne Server, ohne Konto und ohne Internet.

## Starten

- **Einfach:** `index.html` per Doppelklick im Browser öffnen.
- **Mit lokalem Server** (nötig, wenn du die Seite auch auf dem Smartphone im selben WLAN öffnen willst):

  ```
  cd japanisch-trainer
  python3 -m http.server 8000
  ```

  Dann am Computer `http://localhost:8000` öffnen. Auf dem Smartphone im selben WLAN `http://<IP-des-Computers>:8000`.

## Was drin ist

- **Vokabeln:** Karteikarten mit Stapeln, beide Richtungen, „Gewusst“ und „Nochmal“.
- **Grammatik:** Aufgaben zu den sieben Mustern aus Lektion 1, in zwei Formaten zum Umschalten:
  - **Japanisch (Auswahl):** Lückentext mit vier Antworten, wie im Minitest. Das ist die Standardeinstellung.
  - **Deutsch (Übersetzen):** deutscher Satz, du schreibst die japanische Lösung selbst und vergleichst danach.

  Das Muster steht nicht in der Aufgabe. Es erscheint nur unter „Hilfe anzeigen“, zusammen mit Regel und Bunpro-Link.
- **Daten:** Import, Export und Zurücksetzen.

Standardinhalt: 29 Vokabeln, 34 Auswahlfragen und 43 Übersetzungssätze zu Lektion 1 (`data/standarddaten.js`).

## Vokabeln importieren

Tab „Daten“, dann CSV-Datei wählen oder Text einfügen. Eine Zeile pro Karte, zwei Spalten:

```
to teach,教える (おしえる)
class / lesson,授業 (じゅぎょう)
```

- Trennzeichen (Komma, Tab, Semikolon) wird automatisch erkannt, lässt sich aber umstellen.
- Enthält ein Text Kommas, setze ihn in Anführungszeichen: `"healthy, well, fine",元気 (げんき)`.
- Hat die Datei mehr als zwei Spalten, wählst du aus, welche Vorder- und Rückseite wird.
- Hat sie eine Kopfzeile, hake „Erste Zeile ist eine Kopfzeile“ an.
- Gleicher Stapelname = Karten werden ergänzt, doppelte Karten werden übersprungen.
- Dateien müssen als UTF-8 gespeichert sein. Aus Excel: „CSV UTF-8“ wählen.

Ein Beispiel liegt in `beispiele/vokabeln_lektion1.csv`.

## Auswahlfragen importieren (Japanisch)

Spalten: `Muster, Frage, richtige Antwort, falsch 1, falsch 2, falsch 3, Hinweis` (Hinweis optional, mindestens eine falsche Antwort). Die Lücke schreibst du als `（　　　）`. Die Antworten werden beim Üben gemischt. Beispiel: `beispiele/auswahlfragen_beispiel.csv`.

## Übersetzungssätze importieren (Deutsch)

Spalten: `Muster, Aufgabe, Lösung, Hinweis` (Hinweis ist optional). Mehrere richtige Lösungen trennst du in der dritten Spalte mit `|`. In der Aufgabe wird `**Text**` hervorgehoben. Beispiel: `beispiele/grammatik_beispiel.csv`.

Passt der Mustername zu einem vorhandenen, kommt die Aufgabe dort hinein. Ein neuer Name legt ein neues Muster an (ohne Regeltext in der Hilfe).

## Als App aufs Handy (Installation)

Die Seite ist eine installierbare Web-App (PWA). Sie bekommt ein eigenes Symbol auf dem Startbildschirm, öffnet sich ohne Browserleiste und läuft nach dem ersten Laden auch ohne Internet. Dafür muss sie einmal unter einer **https-Adresse** erreichbar sein. Direkt aus dem ZIP oder per Dateimanager auf dem Handy geht das nicht.

### Kostenlos veröffentlichen mit GitHub Pages

1. Auf github.com ein Konto anlegen und ein neues Repository erstellen (öffentlich, z. B. `japanisch-trainer`).
2. Im Repository „Add file → Upload files“ wählen und den **Inhalt** dieses Ordners hineinziehen (`index.html`, `app.js`, `style.css`, `sw.js`, `manifest.webmanifest` und die Ordner `data`, `icons`, `beispiele`). Mit „Commit changes“ bestätigen.
3. „Settings → Pages“: Quelle „Deploy from a branch“, Branch `main`, Ordner `/ (root)`, speichern.
4. Nach etwa einer Minute steht oben die Adresse, z. B. `https://dein-name.github.io/japanisch-trainer/`.

Wichtig: Ein öffentliches Repository kann jeder mit dem Link sehen. Bei dir sind das nur die Vokabel- und Grammatiklisten. Persönliche Daten stehen nicht drin. Dein Fortschritt und deine Importe bleiben auf dem Handy und werden nicht hochgeladen.

### Installieren

- **Android (Chrome):** Adresse öffnen, Menü (drei Punkte) → „App installieren“ oder „Zum Startbildschirm hinzufügen“.
- **iPhone (Safari):** Adresse öffnen, Teilen-Symbol → „Zum Home-Bildschirm“.

### Gut zu wissen

- Der Speicher der installierten App ist getrennt vom Browser. Auf dem iPhone sind importierte Daten aus Safari nicht automatisch in der App. Importiere sie in der App neu oder nutze den Export im Tab „Daten“.
- Ändert sich eine Datei, erhöhe in `sw.js` die Nummer bei `CACHE`. Die neue Version erscheint beim zweiten Öffnen mit Internet.
- Daten auf dem Handy und dem Computer sind getrennt. Zum Übertragen: Export als CSV, auf dem anderen Gerät importieren.

## Wo werden Daten gespeichert?

Im Browser (`localStorage`), nur auf diesem Gerät und in diesem Browser. Beim Öffnen per Doppelklick (`file://`) behandeln manche Browser jede Datei als eigene Herkunft. Für verlässliche Speicherung nimm den lokalen Server und bleibe bei derselben Adresse. Sichern kannst du über die Export-Knöpfe im Tab „Daten“.

## Dateien

- `index.html`, `style.css`, `app.js`: die Seite
- `manifest.webmanifest`, `sw.js`, `icons/`: Installation und Offline-Betrieb
- `data/standarddaten.js`: Startdaten
- `beispiele/`: Importbeispiele
