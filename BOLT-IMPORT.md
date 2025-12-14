# 🚀 IMPORTAR A BOLT.NEW

## ⚡ Mètode Ràpid (Recomanat)

**Copia aquesta URL i enganxa-la al navegador:**

```
https://bolt.new/~/github.com/higginsgrafic/grafic-ecommerce2
```

Bolt farà:
1. ✅ Clonar el repositori automàticament
2. ✅ Instal·lar dependències (bun install)
3. ✅ Executar el servidor (bun run dev)
4. ✅ Obrir l'aplicació al port 3000

---

## 🔧 Mètode Manual (Si el ràpid falla)

A la terminal de Bolt, executa **una per una**:

### 1️⃣ Neteja i clona
```bash
rm -rf grafic-ecommerce2 && git clone https://github.com/higginsgrafic/grafic-ecommerce2.git --depth=1
```

### 2️⃣ Entra al directori
```bash
cd grafic-ecommerce2
```

### 3️⃣ Verifica el commit (hauries de veure `1a3e6df`)
```bash
git log --oneline -3
```

**Resposta esperada:**
```
1a3e6df Add .stackblitzrc for optimal Bolt.new loading
1159606 OPTIMIZED FOR BOLT.new - Lightweight version
e5a5a66 Clean up and optimize project files
```

### 4️⃣ Instal·la dependències

**Amb Bun (recomanat):**
```bash
bun install
```

**Amb npm (si Bun no està disponible):**
```bash
npm install
```

### 5️⃣ Executa el servidor

**Amb Bun:**
```bash
bun run dev
```

**Amb npm:**
```bash
npm run dev
```

---

## ✅ Verificació

Després d'executar, hauries de veure:

```
VITE v4.4.5  ready in XXX ms

➜  Local:   http://localhost:3000/
➜  Network: http://0.0.0.0:3000/
```

**Obre:** http://localhost:3000

---

## 📦 Què s'ha optimitzat per Bolt?

- ✅ **13 MB** (abans era 88 MB)
- ✅ **371 fitxers** (abans 500+)
- ✅ **Projecte completament net** (sense fitxers innecessaris)
- ✅ **Mode mock activat** (funciona sense backend)
- ✅ **Scripts simplificats** (dev, build, preview)
- ✅ **Netlify/WordPress eliminats** (no necessaris)
- ✅ **Plugins visuals eliminats** (causaven conflictes)

---

## 🐛 Solució de Problemes

### Error: "Cannot find module"
```bash
rm -rf node_modules bun.lock
bun install --force
bun run dev
```

### Error: "Port 3000 already in use"
```bash
# Canvia el port al package.json o:
bun run dev -- --port 3001
```

### Bolt mostra versió antiga
```bash
# Esborra cache de Bolt i torna a clonar:
rm -rf grafic-ecommerce2
git clone https://github.com/higginsgrafic/grafic-ecommerce2.git --depth=1
cd grafic-ecommerce2
bun install
bun run dev
```

---

## 📝 Commit Actual

**Últim commit:** `1a3e6df` - Add .stackblitzrc for optimal Bolt.new loading

**Data:** Desembre 2025

**Repositori:** https://github.com/higginsgrafic/grafic-ecommerce2

---

**Fet! Si tens problemes, assegura't que Bolt té Bun instal·lat i que estàs utilitzant la versió més recent del repositori.** 🎯
