# Email Setup Anleitung

## Problem
Gmail App-Passwörter benötigen 2-Faktor-Authentifizierung. Dein Account hat diese Einstellung nicht verfügbar.

## Lösung 1: SMTP2GO (Empfohlen - Kostenlos)

### Schritt 1: Account erstellen
1. Gehe zu: https://www.smtp2go.com/pricing/
2. Klicke "Sign Up Free" (1000 Emails/Monat kostenlos)
3. Bestätige deine Email-Adresse

### Schritt 2: SMTP Zugangsdaten erhalten
1. Login auf https://app.smtp2go.com/
2. Gehe zu "Settings" → "Users" → "Add User"
3. Erstelle einen SMTP User (z.B. "website")
4. Notiere: Username und Password

### Schritt 3: .env.local aktualisieren
```env
NEXT_PUBLIC_ADMIN_EMAIL=sodusecure@gmail.com
EMAIL_HOST=mail.smtp2go.com
EMAIL_PORT=2525
EMAIL_USER=dein-smtp2go-username
EMAIL_PASS=dein-smtp2go-password
```

### Schritt 4: Dev-Server neustarten
```bash
npm run dev
```

---

## Lösung 2: Brevo (ehemals Sendinblue)

### Vorteile
- 300 Emails/Tag kostenlos
- Sehr professionell
- Deutsche Oberfläche

### Setup
1. Gehe zu: https://www.brevo.com/de/
2. Registriere kostenlosen Account
3. Gehe zu "SMTP & API" → "SMTP"
4. Erstelle SMTP Key

### .env.local Konfiguration
```env
EMAIL_HOST=smtp-relay.brevo.com
EMAIL_PORT=587
EMAIL_USER=deine-email@gmail.com
EMAIL_PASS=dein-brevo-smtp-key
```

---

## Lösung 3: Gmail mit 2FA

Falls du 2FA aktivieren möchtest:

1. **2FA aktivieren**: https://myaccount.google.com/signinoptions/two-step-verification
2. **App-Passwort erstellen**: https://myaccount.google.com/apppasswords
3. **Passwort in .env.local eintragen**:
```env
EMAIL_PASS=dein-16-stelliges-app-passwort
```

---

## Test
Nach der Konfiguration teste das Kontaktformular auf http://localhost:3000/contact
