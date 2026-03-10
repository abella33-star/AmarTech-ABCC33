# 🔧 AmarTech — Assistant IA Plomberie ABCC33

> PWA intelligente pour artisan plombier-chauffagiste.  
> Stock camion · Devis IA · Diagnostic photo · Assistant vocal · Remises fournisseurs

---

## ⚡ Déploiement en 3 minutes

### 1. Cloner et pousser sur GitHub
```bash
# Si tu pars de zéro
git init
git add .
git commit -m "feat: AmarTech PWA v2"
git remote add origin https://github.com/TON_COMPTE/amartech-abcc33.git
git push -u origin main
```

### 2. Connecter à Vercel
1. Va sur **[vercel.com](https://vercel.com)**
2. Clique **Add New Project**
3. Importe ton repo `amartech-abcc33`
4. **Framework Preset** → `Other`
5. **Root Directory** → laisser `/` (racine)
6. Clique **Deploy** ✅

### 3. Installer sur iPhone (PWA)
1. Ouvre le lien Vercel dans **Safari**
2. Bouton **Partager** → **Sur l'écran d'accueil**
3. L'icône ABCC33 apparaît comme une vraie app 📱

---

## 🔐 Identifiants
| Champ | Valeur |
|-------|--------|
| Identifiant | `ABCC33` |
| Mot de passe | `09031977` |

---

## 📦 Structure du projet
```
amartech-abcc33/
├── index.html          # Page de connexion
├── app.html            # Application principale (5 onglets)
├── sw.js               # Service Worker (mode hors-ligne)
├── manifest.json       # Config PWA (icône, nom, couleurs)
├── icon-192.png        # Icône ABCC33 pour l'écran d'accueil
├── icon-512.png        # Icône ABCC33 haute résolution
├── vercel.json         # Config déploiement Vercel
└── README.md           # Ce fichier
```

---

## 🤖 Fonctionnalités

| Onglet | Fonctionnalité |
|--------|---------------|
| 🤖 Assistant | Chat GPT-4o + micro 🎙️ + photo depuis le chat |
| 📦 Stock | 37 articles, alertes, +/−, export/import JSON |
| 📷 Diagnostic | GPT-4o Vision — photo → analyse instantanée |
| 📝 Devis IA | Correction ortho · Génération prix avec remises · PDF |
| 🏪 Remises | SIDV/Sisca + Wendel · Calculateur prix revient |

---

## 🏢 Données ABCC33 pré-configurées
- **SIRET :** 498 201 292 00030
- **SIREN :** 498 201 292  
- **TVA :** FR49 498 201 292
- **Adresse :** 1 Av. Pierre et Marcelle Girard, 33127 Martignas-sur-Jalle
- **Fournisseurs :** SIDV/Sisca Mérignac + Villenave · Wendel Mérignac

---

## 🔑 Configuration API
La clé OpenAI GPT-4o est **pré-configurée** dans l'application.  
Aucune configuration nécessaire — l'app fonctionne directement.

Pour changer la clé : Onglet ⚙️ Réglages → Clé API.

---

## 📱 PWA — Fonctionnement hors-ligne
- Le stock est disponible **sans connexion** (IndexedDB)
- Les modifications sont synchronisées dès que le réseau revient
- L'app peut être utilisée sur chantier sans 4G

---

## 🛠️ Technologies
- **Frontend :** HTML5 · CSS3 · Vanilla JS (zéro dépendance)
- **IA :** OpenAI GPT-4o · GPT-4o Vision · Web Speech API
- **PWA :** Service Worker · Web App Manifest · Cache API
- **Deploy :** Vercel · GitHub CI/CD automatique

---

*AmarTech v2.0 · ABCC33 · Martignas-sur-Jalle (33127)*
