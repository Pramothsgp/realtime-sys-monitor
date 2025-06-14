Here's a well-structured `README.md` for your **Vite + React + Electron** project called **CPU Manager**, including setup, development, and build steps.

---

# ⚙️ CPU Manager

A cross-platform desktop application built with **Vite + React + TypeScript** and **Electron**. Supports building for **macOS (arm64)**, **Linux (x64)**, and **Windows (x64)** using `electron-builder`.

---

## 📁 Project Structure

```

cpu-manager/
├── dist/                # Bundled distributables (AppImage, .exe, .dmg, etc.)
├── dist-electron/       # Transpiled Electron main process code
├── dist-react/          # Vite-built React app
├── public/              # Static files for Vite
├── src/
│   ├── electron/        # Electron main process code (TypeScript)
│   └── ui/              # React front-end
├── index.html           # Vite HTML entry
├── vite.config.ts       # Vite config
├── electron-builder.json
├── package.json
├── tsconfig.\*.json
└── README.md

````

---

## 🛠️ Tech Stack

- ⚛️ **React** (Vite)
- 🧠 **TypeScript**
- ⚡ **Electron**
- 🛠️ **electron-builder** for packaging
- 🧪 ESLint for linting

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/cpu-manager.git
cd cpu-manager
````

### 2. Install Dependencies

```bash
npm install
```

---

## 🔧 Development

### Run Frontend Only (React)

```bash
npm run dev:react
```

Runs the Vite dev server at [http://localhost:5173](http://localhost:5173)

### Run Electron with React

```bash
npm run dev:electron
```

Make sure the Vite server is running (`dev:react`) before launching Electron, or modify your `main.ts` to point to the correct dev server.

---

## 🏗️ Build

### 1. Transpile Electron Main Process

```bash
npm run transpile:electron
```

### 2. Build React Frontend & Transpile Electron

```bash
npm run build
```

---

## 📦 Package App

### Linux (x64: `.AppImage`, `.deb`)

```bash
npm run dist:linux
```

### macOS (arm64: `.dmg`)

```bash
npm run dist:mac
```

### Windows (x64: `.exe`, `.msi`)

```bash
npm run dist:win
```

> 🧪 Note: For building Windows apps on Linux, **Wine** is required.

### Build for All Platforms

```bash
npm run dist
```

> ⚠️ Warning: This may consume **\~1GB or more** of disk space.

---

## 🪟 Notes on Running the App

### On Linux

Make the `.AppImage` executable:

```bash
chmod +x ./dist/CPU\ Manager-0.0.0-arm64.AppImage
./dist/CPU\ Manager-0.0.0-arm64.AppImage
```

If you encounter a `chrome-sandbox` error:

```bash
sudo chmod 4755 /path/to/chrome-sandbox
```

---

## 📁 .gitignore Summary

To keep your repo clean:

```
node_modules
dist/
dist-react/
dist-electron/
*.log
.vscode/*
```

---

## 📄 License

MIT License

---

## 👨‍💻 Author

**Pramoth N**
📧 [pramothsgp@gmail.com](mailto:pramothsgp@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/pramoth-sgp-8263372a0)
🔗 [GitHub](https://github.com/Pramothsgp)

```

---

Let me know if you'd like this README exported as a `.md` file or want a badge/header layout added.
```
