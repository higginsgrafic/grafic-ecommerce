# 🚀 Com Importar GRÀFIC a Bolt

Aquest projecte és totalment compatible amb Bolt.new. Segueix aquestes instruccions per importar-lo i executar-lo.

## 📋 Requisits Previs

- Compte de GitHub
- El projecte `grafic-ecommerce` pujat a GitHub

## 🎯 Passos per Importar a Bolt

### Opció 1: Importació Directa des de GitHub

1. Obre **Bolt.new** al teu navegador
2. Fes clic a **"Import from GitHub"** o utilitza aquesta URL:
   ```
   https://bolt.new/~/github.com/higginsgrafic/grafic-ecommerce
   ```
3. Bolt clonarà automàticament el repositori i instal·larà les dependències
4. El projecte s'executarà automàticament amb `bun dev`

### Opció 2: Clonar Manualment a Bolt

1. Obre **Bolt.new**
2. A la consola de Bolt, executa:
   ```bash
   git clone https://github.com/higginsgrafic/grafic-ecommerce.git
   cd grafic-ecommerce
   bun install
   bun run dev
   ```

## 🛠️ Configuració Inicial

### 1. Variables d'Entorn (Opcional)

El projecte funciona amb dades mock per defecte. Si vols connectar serveis reals:

```bash
# Copia l'exemple
cp .env.example .env

# Edita .env amb les teves claus
# Per defecte, VITE_USE_MOCK_DATA=true (no cal configurar res més)
```

### 2. Verificar que Funciona

Un cop Bolt executi el projecte, hauries de veure:

- ✅ Dev server executant-se a `http://localhost:3000`
- ✅ Hero slider amb les 5 col·leccions
- ✅ Productes mostrant-se correctament
- ✅ Header amb menú i cistell
- ✅ Footer amb enllaços

## 📦 Scripts Disponibles

```bash
# Desenvolupament (s'executa automàticament a Bolt)
bun run dev

# Build per producció
bun run build

# Preview de la build
bun run preview
```

## 🎨 Característiques del Projecte

- **React 19** amb Vite 4
- **Tailwind CSS** per estils
- **Framer Motion** per animacions
- **React Router** per navegació
- **Shadcn/ui** components (personalitzats)
- **Stripe** integració (opcional)
- **Gelato** print-on-demand (opcional)
- **WooCommerce** backend (opcional)

## 🔧 Mode Mock vs Producció

### Mode Mock (Per Defecte)

```env
VITE_USE_MOCK_DATA=true
```

- ✅ Funciona sense configuració
- ✅ Dades de productes simulades
- ✅ Ideal per desenvolupament i proves
- ✅ No necessita API keys

### Mode Producció

```env
VITE_USE_MOCK_DATA=false
VITE_WP_URL=https://teu-wordpress.com
VITE_WOO_CONSUMER_KEY=ck_...
VITE_WOO_CONSUMER_SECRET=cs_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_...
```

## 🚨 Solució de Problemes

### El projecte no carrega a Bolt

1. Comprova que el repositori és públic a GitHub
2. Verifica que `package.json` existeix
3. Assegura't que tens `bun.lock` al repositori

### Errors de dependències

```bash
# Elimina node_modules i torna a instal·lar
rm -rf node_modules
bun install
```

### El dev server no s'inicia

```bash
# Verifica el port
bun run dev --port 3000
```

## 📱 Accedir al Taller (Dev Mode)

El projecte inclou **El Taller**, una zona d'administració interna:

1. Clica 5 vegades al logo de GRÀFIC
2. S'obrirà la pàgina `/taller`
3. Pots editar:
   - Hero de la Home
   - Catàleg de Gelato
   - Galeria de components

**Nota:** El Taller només és accessible en mode desenvolupament (`import.meta.env.DEV`).

## 🌍 Deployment des de Bolt

### Netlify (Recomanat)

```bash
# Instal·la Netlify CLI
bun add -D netlify-cli

# Autentifica't
bunx netlify login

# Deploy
bunx netlify deploy --prod
```

### Vercel

1. Connecta el repositori GitHub a Vercel
2. Vercel detectarà automàticament Vite
3. Deploy automàtic

## 📚 Documentació Addicional

- [README.md](./README.md) - Informació general del projecte
- [.env.example](./.env.example) - Totes les variables d'entorn disponibles
- [DEPLOYMENT-STATUS.md](./DEPLOYMENT-STATUS.md) - Estat del deployment
- [NETLIFY-DEPLOYMENT-GUIDE.md](./NETLIFY-DEPLOYMENT-GUIDE.md) - Guia de deployment a Netlify

## ✨ Característiques Úniques

### Estructura de Components

```
src/
├── components/
│   ├── ui/              # Components UI reutilitzables
│   ├── editors/         # Editors del Taller
│   └── ...
├── pages/               # Pàgines de l'aplicació
├── contexts/            # React Context (Product, Toast)
├── utils/               # Utilitats (analytics, etc.)
└── i18n/                # Traduccions (català)
```

### System Design

- **Components UI:** SizeButton, PriceDisplay, CartIcon, ProductCard
- **Editors visuals:** HomeEditor, GelatoCatalogManager
- **Galeria de components:** Arbre jeràrquic interactiu amb previews
- **Dark mode:** Paleta Affinity Designer al Taller

## 🎯 Pròxims Passos

1. ✅ Importar a Bolt
2. ✅ Verificar que funciona en mode mock
3. 🔄 Personalitzar dissenys i contingut
4. 🔄 Connectar backend real (opcional)
5. 🚀 Deploy a producció

## 💡 Consells

- **Treballa en mode mock** fins que tinguis el backend configurat
- **El Taller** et permet editar visualment sense tocar codi
- **Versiona sovint** per poder revertir canvis
- **Prova en mobile** abans de fer deploy

## 🆘 Suport

Si tens problemes:

1. Revisa els logs de Bolt
2. Comprova que totes les dependències s'han instal·lat
3. Verifica que el `package.json` és correcte
4. Contacta amb suport de Bolt si persisteix

---

**Projecte creat amb ❤️ per GRÀFIC**

**Última actualització:** Desembre 2025
