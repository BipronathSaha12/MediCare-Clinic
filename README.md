# MediCare Clinic — Front Desk Appointment Dashboard

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0.7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-Custom_Tokens-1572B6?logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![License: MIT](https://img.shields.io/badge/License-MIT-0F766E.svg)](LICENSE)
[![Cross-Browser Tested](https://img.shields.io/badge/Tested%20on-Firefox%20%7C%20Chrome%20%7C%20Edge%20%7C%20Safari-FF7139?logo=firefox-browser&logoColor=white)](https://www.mozilla.org/firefox/)

> **Live Repository:** [https://github.com/BipronathSaha12/MediCare-Clinic.git](https://github.com/BipronathSaha12/MediCare-Clinic.git)  
> A high-performance, single-page hospital reception and clinical scheduling dashboard built with **React 19** and **Vite**. Engineered for outpatient departments (OPD), specialty clinics, and medical triage desks to streamline physician schedules, patient registrations, and consultation lifecycles with zero latency.

---

## Table of Contents
1. [Core Features & System Highlights](#1-core-features--system-highlights)
2. [Clinical Workflow & System Architecture](#2-clinical-workflow--system-architecture)
3. [Developer Quick Start & Toolchain](#3-developer-quick-start--toolchain)
   - [3.1 Prerequisites](#31-prerequisites)
   - [3.2 Installation & Setup](#32-installation--setup)
   - [3.3 Running Locally (Cross-Browser Instructions)](#33-running-locally-cross-browser-instructions)
   - [3.4 Production Build & Optimization](#34-production-build--optimization)
4. [Software Engineering & Design Patterns](#4-software-engineering--design-patterns)
   - [4.1 Unidirectional State Flow & Lifted State Hub](#41-unidirectional-state-flow--lifted-state-hub)
   - [4.2 Component Composition & Inversion of Control](#42-component-composition--inversion-of-control)
   - [4.3 Render Prop Pattern (FilterableList)](#43-render-prop-pattern-filterablelist)
   - [4.4 Controlled Forms vs. Uncontrolled DOM References](#44-controlled-forms-vs-uncontrolled-dom-references)
   - [4.5 3-Tier Enterprise Error Defense & Telemetry](#45-3-tier-enterprise-error-defense--telemetry)
5. [Codebase Layout & Component Directory](#5-codebase-layout--component-directory)
6. [Design System, Tokens & Pin Specifications](#6-design-system-tokens--pin-specifications)
7. [Extensibility & Backend Migration Roadmap](#7-extensibility--backend-migration-roadmap)
8. [Deployment Blueprint](#8-deployment-blueprint)
9. [License & Author](#9-license--author)

---

## 1. Core Features & System Highlights

- 🩺 **Doctor Catalog & Specialty Triage**: Real-time physician search by name and dynamic filtering across departments (**Cardiology**, **Neurology**, **Medicine**, **Orthopedics**). Includes visiting fees, credentials, and live availability toggling (`Not available` pill badge with disabled selection).
- 📅 **Synchronized Appointment Booking**: Selecting a doctor card automatically locks and populates the doctor select input in the booking form. Built-in validation enforces strict formatting for patient names, phone numbers (`01XXXXXXXXX`), future dates, and required appointment times.
- 📊 **Real-Time KPI Analytics**: Live dashboard counters tracking **Total Doctors**, **Total Appointments**, **Pending Triage**, and **Completed Consultations**. Metrics automatically update upon appointment booking, status change, or deletion.
- 🔄 **Consultation Lifecycle Management**: Dedicated tabular records panel with live status filtering chips (**All**, **Pending**, **Confirmed**, **Completed**, **Cancelled**). Instant per-row dropdown status mutations provide seamless workflow transitions.
- 📎 **Uncontrolled File Attachment Engine**: Memory-efficient medical report and prescription attachment reader powered by direct DOM `useRef` integration.
- 🛡️ **Fault-Tolerant Resilience**: Top-level and isolated panel Error Boundaries prevent UI crashes. If an individual data table encounters corrupted input, only that table gracefully falls back into a recovery card while the doctor catalog and booking form remain fully operational.
- 📱 **Pixel-Accurate Responsive Layout**: 3-tier spatial architecture supporting Desktop (`≥ 1024px`), Tablet (`640px – 1023px`), and Mobile (`< 640px`) breakpoints with custom minimal scrollbars and zero page-level horizontal overflow.

---

## 2. Clinical Workflow & System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                   CLINICAL FRONT DESK OPERATIONAL FLOW                 │
└────────────────────────────────────────────────────────────────────────┘
       │
       ├──► 1. Triage & Overview ──────► Monitor live KPI metrics & operational queue tags
       │                                 [● All Caught Up] | [● Active] | [● High Queue]
       │
       ├──► 2. Physician Discovery ────► Search by physician name & filter by department
       │                                 (Cardiology, Neurology, Medicine, Orthopedics)
       │
       ├──► 3. Patient Registration ───► Auto-sync physician selection, validate inputs,
       │                                 attach medical files & submit with success alerts
       │
       ├──► 4. Schedule Management ────► Filter appointments by status & update lifecycle
       │                                 (Pending ➜ Confirmed ➜ Completed ➜ Cancelled)
       │
       └──► 5. Safe Record Deletion ───► Native browser confirmation (window.confirm)
```

### Spatial Grid Architecture
```
┌────────────────────────────────────────────────────────────────────────┐
│ Tier 1: Sticky Navigation Bar (72px, Brand Mark, Status Tag, Crash UI) │
├────────────────────────────────────────────────────────────────────────┤
│ Tier 2: Summary Metric KPI Grid (4 Columns: 🩺 Doctors, 📅 Appts, ...) │
├────────────────────────────────────┬───────────────────────────────────┤
│ Tier 3: Left Column (40%)          │ Tier 3: Right Column (60%)        │
│                                    │                                   │
│  ┌──────────────────────────────┐  │  ┌──────────────────────────────┐ │
│  │ DoctorPanel (Card)           │  │  │ AppointmentForm (Card)       │ │
│  │  ├─ Search Input             │  │  │  ├─ Controlled Inputs        │ │
│  │  ├─ Dynamic Specialty Chips  │  │  │  ├─ Uncontrolled File Ref    │ │
│  │  └─ DoctorList (Scrollable)  │  │  │  └─ Form Validation Engine   │ │
│  │      └─ FilterableList (RP)  │  │  └──────────────────────────────┘ │
│  │          └─ DoctorCard       │  │  ┌──────────────────────────────┐ │
│  └──────────────────────────────┘  │  │ Isolated ErrorBoundary       │ │
│                                    │  │  └─ AppointmentList (Card)   │ │
│                                    │  │      ├─ Status Filter Chips  │ │
│                                    │  │      └─ Appointments Table   │ │
│                                    │  │          └─ AppointmentRow   │ │
│                                    │  └──────────────────────────────┘ │
├────────────────────────────────────┴───────────────────────────────────┤
│ Footer (MediCare Clinic © 2026 · Built with React)                     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Developer Quick Start & Toolchain

### 3.1 Prerequisites
- **Node.js**: `v18.0.0` or higher (tested and verified on Node `v24.14.0`)
- **Package Manager**: `npm` `v9.0.0` or higher
- **Git**: `v2.40.0` or higher
- **Supported Browsers**: Mozilla Firefox, Google Chrome, Microsoft Edge, Safari

---

### 3.2 Installation & Setup

```bash
# 1. Clone the GitHub repository
git clone https://github.com/BipronathSaha12/MediCare-Clinic.git

# 2. Enter project directory
cd MediCare-Clinic

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev

# 5. Open your browser at http://localhost:3000
```

---

### 3.3 Running Locally (Cross-Browser Instructions)

#### Running in Mozilla Firefox
```powershell
# Windows PowerShell: Start dev server and launch Firefox
npm run dev
Start-Process firefox "http://localhost:3000"
```
```bash
# macOS
npm run dev &
open -a Firefox "http://localhost:3000"

# Linux
npm run dev &
firefox "http://localhost:3000" &
```

#### Launching with the `BROWSER` Environment Variable
```bash
# Force Vite to launch directly into Firefox
BROWSER=firefox npm run dev
```

---

### 3.4 Production Build & Optimization

To compile production-optimized bundles with tree-shaking and minification:

```bash
# Compile production build
npm run build
```

**Build Output Metrics**:
```text
✓ 53 modules transformed.
dist/index.html                   1.03 kB │ gzip:  0.58 kB
dist/assets/index-D8ymT4gx.css   14.81 kB │ gzip:  3.31 kB
dist/assets/index-sS6i9Zv6.js   248.32 kB │ gzip: 77.25 kB
✓ built in 1.33s
```

#### Previewing the Production Artifacts
```bash
# Serve the compiled distribution build locally
npm run preview
# Serves at http://localhost:4173/
```

---

## 4. Software Engineering & Design Patterns

### 4.1 Unidirectional State Flow & Lifted State Hub
All core operational data (`doctors`, `appointments`, and `selectedDoctorId`) resides at the root level in [`src/App.jsx`](src/App.jsx).
- **Single Source of Truth**: When a user selects a physician in `DoctorCard`, the change is propagated to `App.jsx`, which immediately synchronizes the `Doctor` select dropdown in `AppointmentForm`.
- **Zero Redundant State**: Summary KPI counters (`totalDoctors`, `totalAppointments`, `pendingCount`, `completedCount`) and department tabs are derived on the fly during render—never duplicated in separate `useState` hooks.

---

### 4.2 Component Composition & Inversion of Control
To prevent rigid coupling between modules, the presentation wrapper [`Card.jsx`](src/components/ui/Card.jsx) uses React's `children` prop.
- The `Card` container standardizes visual styles, borders, titles, and counter pills without dictating what runs inside it.
- Eliminates "prop drilling" where intermediate containers (`DoctorPanel`, `DoctorList`) do not need to know or forward props used only by leaf nodes (`DoctorCard`).

---

### 4.3 Render Prop Pattern (`FilterableList`)
The generic [`FilterableList.jsx`](src/components/ui/FilterableList.jsx) component abstracts list rendering and empty state evaluation from presentation logic:
```jsx
<FilterableList
  items={filteredDoctors}
  keyExtractor={(doc) => doc.id}
  emptyState={<EmptyState title="No doctors found" />}
  renderItem={(doctor) => (
    <DoctorCard
      doctor={doctor}
      isSelected={selectedDoctorId === doctor.id}
      onSelectDoctor={onSelectDoctor}
    />
  )}
/>
```
This pattern decouples data collection from markup, allowing the same component to render doctor cards as well as table rows (`wrapper="tbody"`).

---

### 4.4 Controlled Forms vs. Uncontrolled DOM References
[`src/components/appointments/AppointmentForm.jsx`](src/components/appointments/AppointmentForm.jsx) demonstrates an optimal balance of React form paradigms:
- **Controlled Components (`useState`)**: Inputs that require live validation (`patientName`, `phone`, `doctorId`, `date`, `time`, `note`) update state on every keystroke, driving dynamic button disabling and instant error feedback.
- **Uncontrolled Component (`useRef`)**: The file attachment input does not need per-keystroke re-renders. A direct DOM reference (`fileInputRef = useRef(null)`) reads file metadata imperatively upon submit and clears the input DOM value upon reset.

---

### 4.5 3-Tier Enterprise Error Defense & Telemetry

```
┌────────────────────────────────────────────────────────────────────────┐
│                   3-TIER ENTERPRISE ERROR DEFENSE                      │
└────────────────────────────────────────────────────────────────────────┘
       │
       ├──► TIER 1: Declarative Render Boundary (ErrorBoundary.jsx)
       │    └─ Catches runtime exceptions during React rendering & lifecycle.
       │    └─ Renders FallbackUI.jsx with collapsible stack trace & reset button.
       │    └─ Isolated boundary around Appointments protects the rest of the UI.
       │
       ├──► TIER 2: Imperative Event Handlers (try / catch)
       │    └─ Catches exceptions during form submission and click events.
       │    └─ Prevents silent failure; renders friendly user alert banner.
       │
       └──► TIER 3: Global Window Catchers (main.jsx)
            └─ window.onerror intercepts global unhandled JavaScript errors.
            └─ unhandledrejection intercepts asynchronous promise failures.
            └─ Structured telemetry routes to utils/logger.js with ISO timestamps.
```

---

## 5. Codebase Layout & Component Directory

```text
MediCare-Clinic/
├── package.json               # Project manifest, scripts, and dependencies
├── vite.config.js             # Vite build & development server configuration
├── index.html                 # HTML5 template with Google Inter font preconnect
├── README.md                  # Comprehensive developer & operations documentation
├── .gitignore                 # Standard exclusions (node_modules, dist, logs)
└── src/
    ├── assets/
    │   └── medicare-logo.svg  # Scalable brand vector asset
    ├── components/
    │   ├── layout/
    │   │   ├── Header.jsx             # Sticky top navigation, status tag & crash trigger
    │   │   └── PageContainer.jsx      # Max-width 1200px responsive centered container
    │   ├── ui/
    │   │   ├── Card.jsx               # Reusable panel container utilizing props.children
    │   │   ├── Button.jsx             # Standardized buttons (primary, secondary, sm)
    │   │   ├── Badge.jsx              # Status badge mapping styles via switch statement
    │   │   ├── EmptyState.jsx         # Contextual placeholder when collections are empty
    │   │   └── FilterableList.jsx     # Generic render-prop list abstraction
    │   ├── stats/
    │   │   ├── StatGrid.jsx           # Responsive 4-column KPI overview container
    │   │   └── StatCard.jsx           # Metric card with icon tile, label & 2-digit number
    │   ├── doctors/
    │   │   ├── DoctorPanel.jsx        # Doctor catalog coordinator (search, tabs, scroll list)
    │   │   ├── DoctorFilter.jsx       # Search input + dynamic department filter chips
    │   │   ├── DoctorList.jsx         # Scrollable doctor container with FilterableList
    │   │   └── DoctorCard.jsx         # Physician card (initials avatar, fee, select toggle)
    │   ├── appointments/
    │   │   ├── AppointmentForm.jsx    # Controlled booking form + uncontrolled file input
    │   │   ├── AppointmentList.jsx    # Dynamic status count chips & appointments table
    │   │   └── AppointmentRow.jsx     # Tabular row with status dropdown & confirm delete
    │   └── error/
    │       ├── ErrorBoundary.jsx      # React class component with error catch lifecycle
    │       ├── FallbackUI.jsx         # User-friendly crash card with recovery trigger
    │       └── CrashTest.jsx          # Intentional synchronous render thrower for QA
    ├── data/
    │   ├── doctors.js                 # 8 physicians across 4 specialty departments
    │   └── appointments.js            # 12 seed appointments with realistic patient records
    ├── utils/
    │   ├── logger.js                  # Standardized ISO-timestamped console logger
    │   ├── validators.js              # Validation engine (name, phone, doctor, date, time)
    │   └── format.js                  # formatStatNumber, formatCurrency, formatDate, formatTime
    ├── App.jsx                        # Root orchestrator managing lifted state & callbacks
    ├── main.jsx                       # React 19 root mount with global error listeners
    └── index.css                      # Pure CSS design tokens, custom scrollbar & queries
```

---

## 6. Design System, Tokens & Pin Specifications

All visual styles are implemented using pure, standard CSS Custom Properties in [`src/index.css`](src/index.css):

### Color Tokens
```css
:root {
  --bg-page: #F1F5F9;         /* Body background */
  --bg-surface: #FFFFFF;      /* Cards, sticky header, popovers */
  --border-color: #E2E8F0;    /* Structural borders, dividers, inputs */
  --primary: #0F766E;         /* Brand teal, primary buttons, active chips */
  --primary-hover: #0D655E;
  --primary-soft: #CCFBF1;    /* Avatar tiles, selected doctor background, count pills */
  --text-primary: #0F172A;    /* Headings, primary values */
  --text-muted: #64748B;      /* Labels, helper text, table headers */

  /* Status Tokens */
  --pending-text: #B45309;    --pending-bg: #FEF3C7;
  --confirmed-text: #1D4ED8;  --confirmed-bg: #DBEAFE;
  --completed-text: #15803D;  --completed-bg: #DCFCE7;
  --cancelled-text: #B91C1C;  --cancelled-bg: #FEE2E2;

  /* Danger / Errors */
  --danger: #DC2626;
  --danger-hover: #B91C1C;
  --danger-soft: #FEE2E2;
}
```

### 30-Pin Architectural Conformance
- **Header (Pins 1–3)**: `position: sticky; top: 0; z-index: 50; height: 72px; background: #FFFFFF; border-bottom: 1px solid #E2E8F0`. Brand circle `36px x 36px` (`#0F766E`), title `"MediCare Clinic"` (`20px/700`), dynamic status badge, and Crash Test button.
- **KPI Grid (Pins 4–7)**: 4 equal columns inside centered container (`max-width: 1200px; padding: 24px`). Cards feature `#CCFBF1` icon tiles (`40px x 40px`), uppercase labels (`13px/500`), and formatted 2-digit values (`28px/700`).
- **Main Workspace (Pin 8)**: Left column 40% (`DoctorPanel`), Right column 60% (`AppointmentForm` + `AppointmentList`), `gap: 24px`.
- **Doctor Catalog (Pins 9–16)**: Full-width search input, dynamic pill filter chips (`border-radius: 999px`), doctor avatar tile (`42px x 42px`) with initials, fee formatting (`৳ 1,200`), "Not available" pill badge, and card selection highlight (`border-left: 3px solid #0F766E`).
- **Booking Form (Pins 17–21)**: 2-column date/time row, field labels with required red asterisk `*`, input focus ring (`outline: 2px solid #0F766E`), dashed file attachment box, auto-hiding green success alert, and disabled primary submit button.
- **Appointments Table (Pins 22–29)**: Dynamic status chips with live counters, uppercase column headers, switch-statement status badges, per-row status update dropdown, and confirm-guarded delete button.
- **Footer (Pin 30)**: Centered footer: `"MediCare Clinic © 2026 · Built with React"`.

---

## 7. Extensibility & Backend Migration Roadmap

### Adding a New Doctor
To register an additional physician, add an entry to [`src/data/doctors.js`](src/data/doctors.js):
```javascript
{
  id: 9,
  name: 'Dr. Shahriar Kabir',
  department: 'Dermatology', // Automatically generates a new department chip!
  specialization: 'MBBS, DDV (Dermatology)',
  visitingFee: 1100,
  available: true
}
```

### Connecting to a Production REST API
To transition from local seed data to a production backend:
1. Replace seed state in `App.jsx` with **TanStack React Query**:
   ```javascript
   import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

   const { data: doctors = [] } = useQuery({
     queryKey: ['doctors'],
     queryFn: () => fetch('/api/v1/doctors').then(res => res.json())
   });

   const { data: appointments = [] } = useQuery({
     queryKey: ['appointments'],
     queryFn: () => fetch('/api/v1/appointments').then(res => res.json())
   });
   ```
2. Wrap `onAddAppointment`, `onStatusChange`, and `onDeleteAppointment` in `useMutation` calls for optimistic updates.

---

## 8. Deployment Blueprint

### Deploying to Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy directly from repository root
vercel
```

### Deploying to Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
netlify deploy --build --prod
```

### Deploying to GitHub Pages
1. In `vite.config.js`, set `base: '/MediCare-Clinic/'`.
2. Run `npm run build`.
3. Push the `dist/` directory to your `gh-pages` branch.

---

## 9. License & Author

Developed by **[Bipronath Saha](https://github.com/BipronathSaha12)**.  
Licensed under the [MIT License](LICENSE).
