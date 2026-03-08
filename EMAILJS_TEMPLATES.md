  # EmailJS — 2 templates pour le formulaire de contact

Créez un **Service** (ex. Gmail) sur [EmailJS Dashboard](https://dashboard.emailjs.com/), puis **2 templates**. Copiez les paramètres et le contenu ci‑dessous.

## Variables d'environnement (.env.local)

Ajoutez dans votre fichier `.env.local` à la racine du projet :

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=votre_service_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=votre_public_key
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN=id_du_template_admin
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CLIENT=id_du_template_client
NEXT_PUBLIC_EMAILJS_ADMIN_EMAIL=contact@63agency.com
```

Sans ces variables, le formulaire utilisera l’API `/api/contact` en secours.

---

## Variables utilisées par le code

- **Template Admin** : `to_email`, `from_name`, `from_email`, `phone`, `city`, `address`, `company`, `role`, `objective`, `timing`, `campaigns`, `sector`, `establishment`, `subject_admin`
- **Template Client** : `to_email`, `client_name`, `subject_client`

Dans chaque template EmailJS, le champ **To** doit être : `{{to_email}}` (le code envoie l’email admin à votre adresse et l’email client à `{{email}}` du formulaire).

---

## Template 1 — Email au CLIENT (confirmation)

**Nom du template (dashboard)** : `Contact - Confirmation client`  
**Subject** : `{{subject_client}}`  
**To** : `{{to_email}}`

**Content (HTML)** :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>63 Agency — Confirmation</title>
</head>
<body style="margin:0; padding:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0c0c0c;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0c0c0c; padding: 48px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 8px 40px rgba(0,0,0,0.25);">
          <!-- Header: logo + accent -->
          <tr>
            <td style="background: #000000; padding: 32px 40px 24px; text-align: left;">
              <img src="https://lhleyqtvyojrqwjthlfz.supabase.co/storage/v1/object/public/assets/63.png" alt="63 Agency" width="112" style="display: block; max-width: 112px; height: auto;" />
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top: 20px;"><tr><td style="width: 48px; height: 3px; background: #d0ff71; border-radius: 2px;"></td></tr></table>
            </td>
          </tr>
          <!-- Hero: thank you -->
          <tr>
            <td style="padding: 40px 40px 32px; background-color: #f8faf9;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width: 44px; vertical-align: top; padding-top: 2px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" style="width: 36px; height: 36px; background: #d0ff71; border-radius: 50%;"><tr><td align="center" style="font-size: 18px; color: #000;">✓</td></tr></table>
                  </td>
                  <td>
                    <p style="margin: 0 0 6px; font-size: 11px; font-weight: 700; color: #0c0c0c; letter-spacing: 0.14em; text-transform: uppercase;">Confirmation</p>
                    <h1 style="margin: 0; font-size: 26px; font-weight: 800; color: #0c0c0c; line-height: 1.2; letter-spacing: -0.02em;">Merci pour votre message</h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 0 40px 32px;">
              <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.65; color: #1a1a1a;">Bonjour {{client_name}},</p>
              <p style="margin: 0 0 28px; font-size: 15px; line-height: 1.7; color: #444;">Nous avons bien reçu votre demande. Un membre de notre équipe vous recontactera sous <strong style="color: #0c0c0c;">24 à 48 heures ouvrées</strong>.</p>
              <!-- Contact card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #0c0c0c; border-radius: 12px; margin: 0 0 28px;">
                <tr>
                  <td style="padding: 24px 28px;">
                    <p style="margin: 0 0 12px; font-size: 11px; font-weight: 700; color: #d0ff71; letter-spacing: 0.1em; text-transform: uppercase;">Besoin de nous joindre ?</p>
                    <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #ffffff;">
                      <a href="tel:+212720007007" style="color: #ffffff; font-weight: 600; text-decoration: none;">07 20 007 007</a> &nbsp;·&nbsp; <a href="mailto:contact@63agency.com" style="color: #d0ff71; font-weight: 600; text-decoration: none;">contact@63agency.com</a>
                    </p>
                  </td>
                </tr>
              </table>
              <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #333;">À très bientôt,<br><strong style="color: #0c0c0c;">L'équipe 63 Agency</strong></p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background: #f1f1f1; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0; font-size: 11px; color: #888; letter-spacing: 0.04em;">63 Agency · Lead generation &amp; performance · Maroc &amp; Europe</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## Template 2 — Email à l’ADMIN (nouveau contact)

**Nom du template (dashboard)** : `Contact - Notification admin`  
**Subject** : `{{subject_admin}}`  
**To** : `{{to_email}}` (votre adresse admin)

**Content (HTML)** :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouveau contact — 63 Agency</title>
</head>
<body style="margin:0; padding:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0a;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 48px 24px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 580px; background: #ffffff; border-radius: 16px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background: #000000; padding: 24px 32px; text-align: left;">
              <img src="https://lhleyqtvyojrqwjthlfz.supabase.co/storage/v1/object/public/assets/63.png" alt="63 Agency" width="120" style="display: block; max-width: 120px; height: auto;" />
              <p style="margin: 16px 0 0; font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.5); letter-spacing: 0.15em; text-transform: uppercase;">Nouveau lead</p>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding: 32px 32px 24px;">
              <h1 style="margin: 0 0 24px; font-size: 18px; font-weight: 700; color: #000;">Nouveau contact — Formulaire site</h1>

              <!-- Contact block -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 24px; border: 1px solid #e5e5e5; border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 20px 24px; background: #fafafa; font-size: 11px; font-weight: 600; color: #666; letter-spacing: 0.08em; text-transform: uppercase;">Coordonnées</td>
                </tr>
                <tr><td style="padding: 14px 24px; border-top: 1px solid #eee; font-size: 14px;"><span style="color: #666; font-weight: 600;">Nom</span><br>{{from_name}}</td></tr>
                <tr><td style="padding: 14px 24px; border-top: 1px solid #eee; font-size: 14px;"><span style="color: #666; font-weight: 600;">Email</span><br><a href="mailto:{{from_email}}" style="color: #000; font-weight: 600; text-decoration: none;">{{from_email}}</a></td></tr>
                <tr><td style="padding: 14px 24px; border-top: 1px solid #eee; font-size: 14px;"><span style="color: #666; font-weight: 600;">Téléphone</span><br><a href="tel:{{phone}}" style="color: #000; font-weight: 600; text-decoration: none;">{{phone}}</a></td></tr>
                <tr><td style="padding: 14px 24px; border-top: 1px solid #eee; font-size: 14px;"><span style="color: #666; font-weight: 600;">Ville</span><br>{{city}}</td></tr>
                <tr><td style="padding: 14px 24px; border-top: 1px solid #eee; font-size: 14px;"><span style="color: #666; font-weight: 600;">Adresse</span><br>{{address}}</td></tr>
                <tr><td style="padding: 14px 24px; border-top: 1px solid #eee; font-size: 14px;"><span style="color: #666; font-weight: 600;">Entreprise / Établissement</span><br>{{company}} — {{establishment}}</td></tr>
              </table>

              <!-- Qualification block -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0; border: 1px solid #e5e5e5; border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 20px 24px; background: #fafafa; font-size: 11px; font-weight: 600; color: #666; letter-spacing: 0.08em; text-transform: uppercase;">Qualification</td>
                </tr>
                <tr><td style="padding: 14px 24px; border-top: 1px solid #eee; font-size: 14px;"><span style="color: #666; font-weight: 600;">Fonction</span><br>{{role}}</td></tr>
                <tr><td style="padding: 14px 24px; border-top: 1px solid #eee; font-size: 14px;"><span style="color: #666; font-weight: 600;">Objectif</span><br>{{objective}}</td></tr>
                <tr><td style="padding: 14px 24px; border-top: 1px solid #eee; font-size: 14px;"><span style="color: #666; font-weight: 600;">Lancement publicité</span><br>{{timing}}</td></tr>
                <tr><td style="padding: 14px 24px; border-top: 1px solid #eee; font-size: 14px;"><span style="color: #666; font-weight: 600;">Campagnes déjà lancées</span><br>{{campaigns}}</td></tr>
                <tr><td style="padding: 14px 24px; border-top: 1px solid #eee; font-size: 14px;"><span style="color: #666; font-weight: 600;">Secteur</span><br>{{sector}}</td></tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; background: #f8f8f8; border-top: 1px solid #eee;">
              <p style="margin: 0; font-size: 11px; color: #999;">Formulaire de contact — 63 Agency</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## Configuration dans le projet

1. Copiez `.env.example` vers `.env.local`.
2. Renseignez les clés depuis le dashboard EmailJS :
   - **Service ID** → `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - **Public Key** → `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
   - **Template ID** du template admin → `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN`
   - **Template ID** du template client → `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CLIENT`
3. (Optionnel) `NEXT_PUBLIC_EMAILJS_ADMIN_EMAIL` : adresse qui reçoit les notifications (défaut : contact@63agency.com).

Sans ces variables, le formulaire enverra la requête à l’API `/api/contact` existante (comportement de secours).
