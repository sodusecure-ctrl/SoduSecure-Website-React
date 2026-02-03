# Email Configuration für Sodu Secure

## Überblick
Das Projekt ist jetzt so konfiguriert, dass:
- **Kontaktformular** (`/contact`) - Sendet Emails beim Absenden
- **Pentest-Anfrage** (`/request-pentest`) - Sendet Emails mit allen Formulardaten

## Erforderliche Umgebungsvariablen

Bearbeite `.env.local` und fülle folgende Werte aus:

```
NEXT_PUBLIC_ADMIN_EMAIL=deine-email@example.com
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=deine-email@gmail.com
EMAIL_PASS=dein-app-passwort
```

## Setup mit Gmail (Empfohlen)

1. **2-Faktor-Authentifizierung aktivieren:**
   - Gehe zu https://myaccount.google.com/security
   - Aktiviere "2-Stufen-Verifikation"

2. **App-Passwort erstellen:**
   - Gehe zu https://myaccount.google.com/apppasswords
   - Wähle "Mail" und "Windows Computer"
   - Google erstellt ein 16-stelliges Passwort
   - Kopiere diesen in `EMAIL_PASS` in `.env.local`

3. **Gmail-Einstellungen:**
   - `EMAIL_HOST`: `smtp.gmail.com`
   - `EMAIL_PORT`: `587`
   - `EMAIL_USER`: Deine vollständige Gmail-Adresse
   - `EMAIL_PASS`: Das 16-stellige App-Passwort

## Alternative: Mit eigenem SMTP-Server

Wenn du keinen Gmail verwenden möchtest, nutze deine eigene Domain:

```
EMAIL_HOST=mail.yourdomain.com
EMAIL_PORT=587
EMAIL_USER=noreply@yourdomain.com
EMAIL_PASS=dein-passwort
```

## Verwenden von anderen Email-Services

### SendGrid
```
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=SG.xxxxxx (dein API Key)
```

### Mailgun
```
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_USER=postmaster@yourdomain.com
EMAIL_PASS=dein-passwort
```

## Email-Flows

### 1. Kontaktformular (`/contact`)
- **Recipient (Admin):** Bekommt den vollständigen Kontaktformular mit Antwort-Adresse
- **Recipient (User):** Bekommt Bestätigungsemail

### 2. Pentest-Anfrage (`/request-pentest`)
- **Recipient (Admin):** Bekommt alle Formular-Details, gewählte Kategorie, Varianten, Add-ons
- **Recipient (User):** Bekommt Bestätigungsemail mit 24h Response-Guarantee

## API-Endpoints

### POST /api/contact
```json
{
  "fullName": "Max Mustermann",
  "company": "Test GmbH",
  "email": "max@example.com",
  "phone": "+49 123 456789",
  "message": "Ich interessiere mich für..."
}
```

### POST /api/pentest
```json
{
  "fullName": "Max Mustermann",
  "companyName": "Test GmbH",
  "email": "max@example.com",
  "phone": "+49 123 456789",
  "companySize": "Medium",
  "additionalInfo": "...",
  "selectedCategory": "0",
  "selectedVariant": {...},
  "selectedAddOns": {}
}
```

## Fehlerbehandlung

Falls Emails nicht versendet werden:
1. Überprüfe die Logs im Terminal
2. Verifiziere `.env.local` Werte
3. Teste mit dem Terminal-Befehl:
   ```bash
   node -e "require('nodemailer').createTransport({...}).verify()"
   ```

## Weitere Anpassungen

Die Email-Templates können unter bearbeitet werden:
- **Contact Email:** `src/app/api/contact/route.ts` (Zeile ~38 und ~47)
- **Pentest Email:** `src/app/api/pentest/route.ts` (Zeile ~46 und ~62)

HTML-Struktur ändern, Farben anpassen, Daten hinzufügen - alles möglich!

---

**Deine aktuelle Email:** (aus `NEXT_PUBLIC_ADMIN_EMAIL` in `.env.local`)
