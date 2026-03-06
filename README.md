# 63 Agency — Site web

Site vitrine et génération de leads pour **63 Agency**, agence de génération de prospects et de marketing performance (Maroc & Europe).  
Next.js 14, internationalisation (EN/FR), formulaires de contact avec envoi d’emails via EmailJS.

---

## Sommaire

- [Présentation du projet](#présentation-du-projet)
- [Stack technique](#stack-technique)
- [Structure du projet](#structure-du-projet)
- [Installation et lancement](#installation-et-lancement)
- [Variables d’environnement](#variables-denvironnement)
- [Internationalisation (i18n)](#internationalisation-i18n)
- [Pages et fonctionnalités](#pages-et-fonctionnalités)
- [Formulaires et emails](#formulaires-et-emails)
- [Scripts disponibles](#scripts-disponibles)
- [Documentation associée](#documentation-associée)

---

## Présentation du projet

63 Agency est une agence spécialisée dans la **génération de leads qualifiés** (éducation, B2B/B2C, immobilier). Le site permet de :

- Présenter l’offre (système en 5 étapes, témoignages, résultats, secteurs).
- Capturer des leads via un **formulaire CTA** sur la page d’accueil (2 étapes) et un **formulaire contact** complet sur la page Contact (2 étapes).
- Envoyer des **emails** : notification admin (nouveau lead) et confirmation client, via **EmailJS**.

Le design est sobre (fond noir, accents verts), responsive (mobile-first) et disponible en **anglais** et **français**.

---

## Stack technique

| Technologie | Usage |
|-------------|--------|
| **Next.js 14** | App Router, SSR, génération statique |
| **React 18** | Composants, hooks |
| **TypeScript** | Typage |
| **next-intl** | Internationalisation (routes `/en`, `/fr`) |
| **Tailwind CSS** | Styles, responsive |
| **EmailJS** | Envoi d’emails (admin + client) depuis le navigateur |
| **Lucide React / React Icons** | Icônes |
| **GSAP** (optionnel) | Animations |
| **Font Awesome** (CDN) | Icônes additionnelles |

---

## Structure du projet

```
63 AGENCY/
├── messages/                 # Traductions (clés next-intl)
│   ├── en.json
│   ├── fr.json
│   └── ar.json               # (préparé, non utilisé dans les locales actuelles)
├── public/
│   └── images/               # Logo, hero, partenaires, Meta/Google Ads, etc.
├── src/
│   ├── app/
│   │   ├── [locale]/         # Routes internationalisées
│   │   │   ├── layout.tsx    # Layout principal (navbar, footer, contenu)
│   │   │   ├── page.tsx      # Page d’accueil
│   │   │   └── contact/
│   │   │       └── page.tsx  # Page Contact (formulaire + sidebar)
│   │   ├── api/
│   │   │   └── contact/      # Route API contact (fallback si EmailJS non configuré)
│   │   ├── layout.tsx        # Root layout (minimal, globals.css)
│   │   └── components/       # Footer, ScrollToTop, Header
│   ├── components/           # Composants partagés
│   │   ├── CardNav.tsx       # Barre de navigation (desktop + mobile)
│   │   ├── CardNavHeader.tsx # En-tête avec navbar fixe
│   │   ├── LanguageSwitcher.tsx
│   │   ├── ScrollReveal.tsx  # Révélation au scroll
│   │   └── sections/         # Sections de page
│   │       ├── HeroSection.tsx
│   │       ├── OurSystemSection.tsx
│   │       ├── FounderSection.tsx
│   │       ├── TestimonialsSection.tsx
│   │       ├── ResultsSection.tsx
│   │       ├── IndustriesSection.tsx
│   │       ├── DigitalPresenceSection.tsx  # Meta + Google Ads
│   │       ├── CTASection.tsx              # Formulaire CTA 2 étapes (accueil)
│   │       └── PartnersGridSection.tsx
│   ├── i18n/
│   │   └── config.ts         # Locales (en, fr), chargement des messages
│   ├── lib/
│   │   ├── emailjs.ts       # Envoi emails (admin + client) via EmailJS (client-side)
│   │   └── emailService.ts  # Envoi emails via Nodemailer/Titan (API /api/contact)
│   └── middleware.ts        # next-intl (détection locale, redirections)
├── docs/
│   └── email-templates-emailjs.md   # Templates HTML et config EmailJS
├── next.config.js            # Config Next + plugin next-intl
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Installation et lancement

### Prérequis

- **Node.js** 18+ (recommandé 20+)
- **npm** ou **yarn**

### Étapes

```bash
# Cloner le dépôt (si applicable)
git clone <url-du-repo>
cd "63 AGENCY"

# Installer les dépendances
npm install

# Copier les variables d’environnement (voir section suivante)
# Créer .env.local et renseigner les clés EmailJS

# Lancer en développement
npm run dev
```

Le site est accessible sur **http://localhost:3000**.  
La locale par défaut est **en** ; exemples : `/`, `/en`, `/fr`, `/en/contact`, `/fr/contact`.

### Build production

```bash
npm run build
npm start
```

---

## Variables d’environnement

Créer un fichier **`.env.local`** à la racine du projet.

### EmailJS (formulaires contact / CTA)

| Variable | Description | Exemple |
|----------|-------------|---------|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | ID du service EmailJS | (depuis dashboard EmailJS) |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Clé publique EmailJS | (depuis dashboard EmailJS) |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN` | ID du template « email admin » (nouveau lead) | (depuis dashboard EmailJS) |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CLIENT` | ID du template « email client » (confirmation) | (depuis dashboard EmailJS) |
| `NEXT_PUBLIC_EMAILJS_ADMIN_EMAIL` | Email qui reçoit les nouveaux leads | `contact@63agency.ma` |

Si ces variables ne sont pas définies, le formulaire de la **page Contact** envoie les données vers l’API **`/api/contact`** (fallback). Les templates EmailJS et la configuration des champs (Subject, To Email, From Name, etc.) sont détaillés dans **`docs/email-templates-emailjs.md`**.

### Nodemailer / Titan Email (Hostinger) — API `/api/contact`

L’API `POST /api/contact` utilise **Nodemailer** pour envoyer deux e-mails : confirmation au client et notification à l’admin. Copier **`env.example`** vers **`.env`** (ou `.env.local`) et renseigner les valeurs :

| Variable | Description | Exemple |
|----------|-------------|---------|
| `SMTP_HOST` | Serveur SMTP | `smtp.titan.email` |
| `SMTP_PORT` | Port (SSL) | `465` |
| `SMTP_USER` | Adresse e-mail d’envoi | `info@63agency.ma` |
| `SMTP_PASS` | Mot de passe du compte e-mail | *(votre mot de passe Titan)* |
| `ADMIN_EMAIL` | Adresse qui reçoit les notifications | `info@63agency.ma` |
| `FROM_NAME` | Nom affiché comme expéditeur | `63 Agency` |

Ne jamais commiter le fichier `.env` (il contient des secrets).

---

## Internationalisation (i18n)

- **Locales actives** : `en` (anglais), `fr` (français), définies dans `src/i18n/config.ts`.
- **Fichiers de messages** : `messages/en.json`, `messages/fr.json`.  
  Le fichier `messages/ar.json` existe mais n’est pas utilisé dans la config des locales.
- **Routes** : toutes les pages sont sous `/[locale]/` (ex. `/en`, `/fr`, `/en/contact`).
- **Middleware** : `src/middleware.ts` utilise `next-intl` pour la locale par défaut (`en`) et le routage.
- **Composant** : `LanguageSwitcher` dans la navbar permet de basculer entre EN et FR.

Pour ajouter une nouvelle locale (ex. arabe), il faut :  
1) l’ajouter dans `locales` dans `src/i18n/config.ts`,  
2) fournir un fichier `messages/<locale>.json` avec les mêmes clés.

---

## Pages et fonctionnalités

### Page d’accueil (`/[locale]/`)

- **Hero** : titre principal, sous-titre, description, CTA « Réservez un appel ».
- **Notre système** : présentation en 5 étapes (benchmark, ads, tunnel, suivi, scaling).
- **Founder** : section fondateur / équipe.
- **Témoignages** : avis clients.
- **Résultats** : indicateurs / cas clients.
- **Secteurs** : industries (éducation, B2B/B2C, immobilier, etc.).
- **Digital Presence** : blocs Meta et Google Ads (images et textes par locale).
- **CTA** : formulaire 2 étapes (infos personnelles + qualification), redirection vers la page Contact avec paramètres en query string.
- **Partenaires** : grille de logos.

Navbar fixe (avec menu mobile), footer, bouton scroll-to-top, lien WhatsApp flottant.

### Page Contact (`/[locale]/contact`)

- **En-tête** : titre type « Êtes-vous prêt à commencer ? » + sous-titre.
- **Contenu** :  
  - **Desktop** : sidebar (texte, preuve sociale, garanties, « places limitées ») à gauche ; formulaire 2 étapes à droite.  
  - **Mobile** : formulaire affiché en premier (ordre CSS), puis la sidebar.
- **Formulaire** :  
  - Étape 1 : nom, téléphone, ville, entreprise, effectif, email, rôle.  
  - Étape 2 : objectif, délai, campagnes en cours, secteur, établissement.  
  Barre de progression, validation, envoi soit vers EmailJS (si configuré), soit vers `POST /api/contact`.
- **Bas de page** : section Meta + Google Ads (même principe que l’accueil).

Les images (Meta, Google Ads) sont choisies selon la locale (EN/FR) et encodées pour les noms de fichiers avec caractères spéciaux.

---

## Formulaires et emails

- **Formulaire CTA (accueil)** : 2 étapes ; à la soumission, redirection vers `/[locale]/contact?name=...&email=...` (etc.) pour pré-remplir le formulaire contact.
- **Formulaire Contact** : 2 étapes ; à la soumission, appel à `sendContactEmails()` dans `src/lib/emailjs.ts` si EmailJS est configuré, sinon `POST /api/contact`.

**Données envoyées** (admin + pré-remplissage) :  
nom, email, téléphone, ville, entreprise, effectif, rôle, objectif, délai, campagnes, secteur, établissement.

**Emails envoyés via EmailJS** :  
1) **Admin** : email vers vous avec toutes les infos du lead (template ID admin).  
2) **Client** : email de confirmation vers l’email du contact (template ID client).

Templates HTML professionnels, champs EmailJS (Subject, To Email, From Name, Reply To, etc.) et variables à utiliser sont décrits dans **`docs/email-templates-emailjs.md`**.

---

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement (Next.js) |
| `npm run build` | Build de production |
| `npm start` | Serveur de production (après `build`) |
| `npm run lint` | Exécution de ESLint (Next.js) |

---

## Documentation associée

- **`docs/email-templates-emailjs.md`**  
  Templates email (admin + client) au format HTML professionnel, liste des variables EmailJS et configuration des champs (Subject, To Email, From Name, From Email, Reply To) pour les deux templates.

---

## Résumé technique

- **Framework** : Next.js 14 (App Router).  
- **Langues** : EN, FR (next-intl).  
- **Styles** : Tailwind CSS, design noir / vert, responsive.  
- **Formulaires** : CTA 2 étapes (accueil) → redirection vers Contact ; Contact 2 étapes → EmailJS (ou API).  
- **Emails** : EmailJS (2 templates : admin + client) ; configuration et variables détaillées dans `docs/email-templates-emailjs.md`.

Pour toute question sur le déploiement (Vercel, etc.) ou l’ajout de fonctionnalités, se référer à la structure des composants dans `src/components` et aux clés de traduction dans `messages/*.json`.
