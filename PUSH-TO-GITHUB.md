# 🚀 Com Pujar el Projecte Refactoritzat a GitHub

## ✅ Refactorització Completada!

El projecte ha estat **completament refactoritzat** i optimitzat per Bolt.new.

**Commit:** `2f42df4` - Initial commit - GRÀFIC E-commerce (Refactored & Bolt.new ready)
**Fitxers:** 235 fitxers nets
**Mida:** ~13MB

---

## 📋 Passos per Pujar a GitHub

### 1️⃣ Esborra el Repositori Antic (si encara no ho has fet)

Ves a: https://github.com/higginsgrafic/grafic-ecommerce/settings

- Scroll fins al final → **"Danger Zone"**
- Clica **"Delete this repository"**
- Confirma escrivint: `higginsgrafic/grafic-ecommerce`

---

### 2️⃣ Crea un Repositori NOU a GitHub

Ves a: https://github.com/new

**Configuració:**
- **Nom:** `grafic-ecommerce` (o el que vulguis)
- **Descripció:** E-commerce de samarretes GRÀFIC
- **Visibilitat:** Public o Private
- ⚠️ **NO marquis**: "Add a README file"
- ⚠️ **NO marquis**: "Add .gitignore"
- ⚠️ **NO marquis**: "Choose a license"

Clica **"Create repository"**

---

### 3️⃣ Puja el Codi des de la teva Màquina Local

#### Opció A: Si tens el projecte descarregat localment

```bash
cd grafic-ecommerce
git remote add origin https://github.com/higginsgrafic/grafic-ecommerce.git
git branch -M main
git push -u origin main
```

#### Opció B: Si no el tens descarregat

1. **Descarrega el projecte de Same:**
   - Clica a "Download Project" o fes servir l'exportació

2. **Descomprimeix-lo** i ves al directori:

```bash
cd grafic-ecommerce
```

3. **Verifica que el git està inicialitzat:**

```bash
git status
```

Hauries de veure: `On branch main`

4. **Afegeix el remote i puja:**

```bash
git remote add origin https://github.com/higginsgrafic/grafic-ecommerce.git
git push -u origin main
```

---

## ✅ Verificació

Un cop hagis fet el push, verifica a GitHub:

👉 https://github.com/higginsgrafic/grafic-ecommerce

Hauries de veure:
- ✅ 1 commit: `Initial commit - GRÀFIC E-commerce (Refactored & Bolt.new ready)`
- ✅ 235 fitxers
- ✅ README.md amb documentació

---

## 🚀 Importar a Bolt.new

Un cop el repositori estigui a GitHub, importa'l a Bolt amb aquesta URL:

```
https://bolt.new/~/github.com/higginsgrafic/grafic-ecommerce
```

O manualment:

```bash
git clone https://github.com/higginsgrafic/grafic-ecommerce.git --depth=1
cd grafic-ecommerce
bun install
bun run dev
```

---

## 🎯 Què s'ha Refactoritzat

### ✅ Optimitzacions
- vite.config.js simplificat (eliminada configuració complexa)
- package.json net (només dependencies essencials)
- Imports explícits (no hi ha imports de directoris)
- Host: 0.0.0.0 (compatible amb Bolt)
- Build testat: ✅ FUNCIONA

### ✅ Mantingut
- TOTES les funcionalitats de l'usuari
- Les 5 col·leccions
- Els 60 productes
- El cistell complet
- El Taller (/taller)
- Totes les pàgines
- Tots els components UI

### ❌ Eliminat
- Configuracions complexes problemàtiques
- Dependencies no utilitzades (csv-parse, etc.)
- Fitxers temporals i backups
- Historial Git antic (commit net)

---

## 📝 Resum

| Abans | Després |
|-------|---------|
| 369 fitxers | 235 fitxers |
| Historial complicat | 1 commit net |
| Errors EISDIR | ✅ Cap error |
| No funciona a Bolt | ✅ Llest per Bolt |

---

**Projecte refactoritzat i llest per ser pujat!** 🎉
