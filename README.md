<div align="center">

# 🏆 2026 FIFA World Cup Explorer

**A high-performance, data-driven sports analytics dashboard built for the expanded 48-team 2026 FIFA World Cup format.**

<p align="center">
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" style="pointer-events: none;" />
  <img src="https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" style="pointer-events: none;" />
  <img src="https://img.shields.io/badge/Vite-Fast-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" style="pointer-events: none;" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" style="pointer-events: none;" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" style="pointer-events: none;" />
</p>

<p align="center">
  <a href="#-getting-started--installation">Setup</a>
</p>

</div>

## 🌟 Overview

**2026 World Cup Explorer** is a feature-rich web application engineered to simulate and track the upcoming 2026 FIFA World Cup. Moving beyond basic tournament tables, this dashboard combines rigorous group-stage tracking (Groups A–L), an exact knockout tree layout from the Round of 32 to the Finals, and granular individual player metrics mirroring professional sports data providers.

---

## ✨ Core Features

* **🗺️ 48-Team Group Stage Matrix**: 
  * Full standings for Groups A through L tracking matches played, wins, draws, losses, goal differences, and recent match forms.
  * Dedicated third-placed qualification ranking table governed by official tie-breaker logic.
* **⚔️ Precision Knockout Tournament Tree**:
  * Clean, artifact-free visual bracket layout from the Round of 32, Round of 16, Quarterfinals, and Semifinals.
  * Centered Finals and 3rd-place playoff stage alignment with penalty shoot-out breakdowns (`(ph: pa)`).
* **📊 Deep Squad & Player Analytics Engine**:
  * Granular squad roster module featuring detailed player cards (Clubs, Primary Roles, Heights, DOB, and Ages).
  * Advanced metrics dashboard tracking Sofascore ratings, expected goals ($xG$), assists, key passes, distance covered, top speeds, sprints, and shot efficiency maps.
* **🎨 Modern UI/UX Architecture**:
  * Built using a custom dark-mode sports design system (`#0f1115` base with `#1a1d24` cards).
  * Fully responsive grid arrangements with optimized horizontal scrolling trees and custom styling overlays.

---

## 🛠️ Tech Stack & Architecture

* **Frontend Framework**: React 18 with strict TypeScript integration for type-safe data handling.
* **Build System**: Vite for ultra-fast Hot Module Replacement (HMR) and optimized production bundles.
* **Styling Engine**: Tailwind CSS utility classes paired with custom scrollbar optimization.
* **Iconography**: Lucide-React for crisp, scalable UI vectors.
* **Asset Integration**: Dynamic flag CDN resolution (`flagcdn.com`) mapped across 48+ international football federations.

---

## 📂 Repository Architecture

```text
Footlytics/
├── public/                 # Static assets and flag resources
├── src/
│   ├── App.tsx             # Main application orchestrator, state control, and views
│   ├── main.tsx            # DOM mounting and root provider configuration
│   └── index.css           # Tailwind base directives and custom scrollbar styles
├── package.json            # Project dependencies and build scripts
└── README.md               # Comprehensive project documentation

```

---

## 🚀 Getting Started & Installation

To spin up a local development instance on your machine, execute the following commands in your terminal:

1. **Clone the repository:**
```bash
git clone [https://github.com/Kartiksharma1234/Footlytics.git](https://github.com/Kartiksharma1234/Footlytics.git)
cd Footlytics

```


2. **Install package dependencies:**
```bash
npm install
npm install lucide-react

```


3. **Launch the local development server:**
```bash
npm run dev

```


4. **Access the application:**
Open your web browser and navigate to `http://localhost:5173`.

---

## 🛡️ License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👤 Author & Maintainer

**Kartik Sharma**

* GitHub: [@Kartiksharma1234](https://www.google.com/search?q=https://github.com/Kartiksharma1234&utm_source=gemini)
