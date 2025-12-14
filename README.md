# GRÀFIC E-commerce

E-commerce de samarretes amb dissenys únics. React 19 + Vite 4 + Tailwind CSS.

## 🚀 Quick Start

### Importar a Bolt.new

**URL directa:**
```
https://bolt.new/~/github.com/higginsgrafic/grafic-ecommerce2
```

### Executar localment

**Amb Bun (recomanat):**
```bash
git clone https://github.com/higginsgrafic/grafic-ecommerce2.git
cd grafic-ecommerce2
bun install
bun run dev
```

**Amb npm:**
```bash
git clone https://github.com/higginsgrafic/grafic-ecommerce2.git
cd grafic-ecommerce2
npm install
npm run dev
```

Obre: http://localhost:3000

## ✨ Característiques

- ✅ **React 19** + **Vite 4** + **Tailwind CSS**
- ✅ **60 productes** en 5 col·leccions
- ✅ **Mode mock** (funciona sense backend)
- ✅ **Cistell complet** amb comptador
- ✅ **Responsive design** (mòbil, tablet, desktop)
- ✅ **Stripe** + **WooCommerce** + **Gelato** (opcional)

## 📦 Estructura

```
src/
 components/     # Components React
   ├── ui/        # UI components (Button, CartIcon, etc.)
   └── examples/  # Component examples
 pages/         # Pàgines
 contexts/      # ProductContext, ToastContext
 data/          # Mock products
```

## 🎨 Col·leccions

- **First Contact** - 12 productes
- **The Human Inside** - 12 productes
- **Austen** - 14 productes
- **Cube** - 10 productes
- **Outcasted** - 12 productes

## 🛠️ Scripts

**Amb Bun:**
```bash
bun run dev      # Dev server (port 3000)
bun run build    # Build per producció
bun run preview  # Preview del build
```

**Amb npm:**
```bash
npm run dev      # Dev server (port 3000)
npm run build    # Build per producció
npm run preview  # Preview del build
npm run lint     # Executar linter
```

## 🔑 Variables d'Entorn

El projecte funciona **sense configuració** (mode mock activat):

```env
VITE_USE_MOCK_DATA=true  # (per defecte)
```

Per connectar serveis reals, copia `.env.example` a `.env` i configura.

## ⚠️ Notes sobre Bolt.new

Si uses Bolt.new i no tens Bun disponible:
- ✅ Usa `npm install` i `npm run dev`
- ⚠️ Pots ignorar els warnings de `react-helmet` amb React 19 (no són crítics)

## 📄 Llicència

 2023-2025 GRÀFIC. Tots els drets reservats.

**Dissenys:** Creative Commons BY-NC-ND 4.0

---

**Stack:** React · Vite · Tailwind · Bun/npm

**Compatible amb:** Bolt.new · Same · Local Development
