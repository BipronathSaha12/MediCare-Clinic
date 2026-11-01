# MediCare Clinic — Front Desk Appointment Dashboard UI

> **React Batch-9 | Module-26 Assignment Submission**  
> A pixel-accurate, production-grade hospital reception appointment dashboard built with **React (JavaScript) + Vite**, running 100% on local hard-coded seed data with zero backend dependencies.

---

## 1. Project Overview

MediCare Clinic Front Desk Dashboard is an intuitive single-page operational workspace designed for clinic receptionists. It allows front desk personnel to:
- Monitor dynamic clinical KPIs at a glance (**Total Doctors**, **Total Appointments**, **Pending Appointments**, **Completed Appointments**).
- Search doctors by name and filter dynamically by medical department (**Cardiology**, **Neurology**, **Medicine**, **Orthopedics**).
- Select active physicians to automatically populate and link booking forms via lifted state.
- Schedule new patient consultations using a validated controlled form with an uncontrolled file attachment input.
- Manage live appointments with instant inline status updates (**Pending**, **Confirmed**, **Completed**, **Cancelled**) and deletion with explicit confirmation.
- Experience fault-tolerant recovery via nested **Error Boundaries**, a **Fallback UI**, and global runtime error listeners.

---

## 2. Quick Start & CLI Commands

This project uses standard **Vite** and pure React.

```bash
# 1. Navigate to the project directory
cd medicare-dashboard

# 2. Install dependencies
npm install

# 3. Start the local development server (http://localhost:3000)
npm run dev

# 4. Create an optimized production build
npm run build

# 5. Preview the production build locally
npm run preview
```

> **Note**: You can also run `npm run dev`, `npm run build`, or `npm run preview` directly from the repository root workspace (`f:\Projects\MediCare`).

---

## 3. Project Structure

```text
medicare-dashboard/
├── package.json
├── vite.config.js
├── index.html
├── README.md
└── src/
    ├── assets/
    │   └── medicare-logo.svg
    ├── components/
    │   ├── layout/
    │   │   ├── Header.jsx              # Sticky top navigation, brand block, dynamic IIFE tag, Crash Test button
    │   │   └── PageContainer.jsx       # 1200px centered page wrapper
    │   ├── ui/
    │   │   ├── Card.jsx                # Reusable container using props.children and count pill [REQ-5]
    │   │   ├── Button.jsx              # Standardized button variants and sizing
    │   │   ├── Badge.jsx               # Status pill using switch statement [REQ-2c]
    │   │   ├── EmptyState.jsx          # Contextual placeholder when lists have 0 items
    │   │   └── FilterableList.jsx      # Generic render-prop list abstraction [REQ-6]
    │   ├── stats/
    │   │   ├── StatGrid.jsx            # 4-column responsive KPI grid (Desktop 4, Tablet 2, Mobile 1)
    │   │   └── StatCard.jsx            # Individual metric card with icon tile and 2-digit formatted value
    │   ├── doctors/
    │   │   ├── DoctorPanel.jsx         # Card-wrapped doctor module resolving prop drilling [REQ-9]
    │   │   ├── DoctorFilter.jsx        # Name search input + dynamic department filter chips
    │   │   ├── DoctorList.jsx          # Scrollable doctor list utilizing FilterableList render prop
    │   │   └── DoctorCard.jsx          # Doctor item with avatar, fee, "Not available" badge, and Select button
    │   ├── appointments/
    │   │   ├── AppointmentForm.jsx     # Controlled booking form [REQ-7] with uncontrolled file ref [REQ-8]
    │   │   ├── AppointmentList.jsx     # Live status count chips + appointments table
    │   │   └── AppointmentRow.jsx      # Tabular row with status dropdown and confirm delete
    │   └── error/
    │       ├── ErrorBoundary.jsx       # React class error boundary with telemetry [REQ-11]
    │       ├── FallbackUI.jsx          # User-friendly crash card with collapsible stack trace
    │       └── CrashTest.jsx           # Intentional synchronous render thrower for grading verification
    ├── data/
    │   ├── doctors.js                  # 8 seed doctors across 4 departments
    │   └── appointments.js             # 12 seed appointments matching exact counters (08, 12, 05, 04)
    ├── utils/
    │   ├── logger.js                   # Timestamped logInfo, logWarn, logError telemetry [REQ-12]
    │   ├── validators.js               # Form input verification functions (name, phone, doctor, date, time)
    │   └── format.js                   # formatStatNumber, formatCurrency, formatDate, formatTime, getInitials
    ├── App.jsx                         # Top-level state orchestration (selectedDoctorId, appointments) [REQ-3]
    ├── main.jsx                        # React root mount, global window.onerror & unhandledrejection [REQ-12]
    └── index.css                       # Pure CSS tokens, responsive breakpoints, and pins 1-30
```

---

## 4. Assignment Grading Rubric Mapping (REQ-1 through REQ-12)

Every rubric requirement is marked in the code using the exact comment syntax `// [REQ-X]`:

| Requirement Tag | React Concept | Implementation Location | Description |
| :--- | :--- | :--- | :--- |
| **`// [REQ-1]`** | List rendering with `.map()` & stable `key` | `DoctorFilter.jsx`<br>`DoctorList.jsx`<br>`AppointmentList.jsx`<br>`FilterableList.jsx` | Renders doctors, appointments, department chips, and status tabs using unique numeric/string identifiers (`doctor.id`, `appointment.id`, `dept`). Array indexes are never used as keys. |
| **`// [REQ-2a]`** | Ternary operator (`condition ? a : b`) | `DoctorCard.jsx`<br>`FilterableList.jsx`<br>`AppointmentList.jsx` | Toggles "Selected" vs "Select" button text; renders `<EmptyState />` vs populated collections. |
| **`// [REQ-2b]`** | Logical `&&` operator | `AppointmentForm.jsx`<br>`DoctorCard.jsx` | Renders auto-hiding green booking success banner (`"✓ Appointment booked..."`), field error messages, and `"Not available"` badges. |
| **`// [REQ-2c]`** | `switch` statement | `Badge.jsx` (`getBadgeStyle`) | Selects exact badge text and background color tokens for `'Pending'`, `'Confirmed'`, `'Completed'`, and `'Cancelled'`. |
| **`// [REQ-2d]`** | Immediately-Invoked Function Expression (IIFE) in JSX | `Header.jsx` | `{(() => { ... })()}` evaluates pending appointment queue density inline to render real-time reception status tags. |
| **`// [REQ-3]`** | Lifting State Up | `App.jsx` | `selectedDoctorId` and `appointments` reside in `App.jsx`, synchronizing doctor selection across `DoctorCard` and `AppointmentForm`. |
| **`// [REQ-4]`** | Passing props parent → child (callbacks) | `App.jsx` → children | Passes `onSelectDoctor`, `onAddAppointment`, `onStatusChange`, `onDeleteAppointment`, and `onResetDoctor` down as functional callback props. |
| **`// [REQ-5]`** | Component Composition via `children` | `Card.jsx` | Reusable `<Card title="..." count={...}>{children}</Card>` wraps `DoctorPanel`, `AppointmentForm`, and `AppointmentList`. |
| **`// [REQ-6]`** | Render Prop Pattern | `FilterableList.jsx` | `<FilterableList items={...} renderItem={(item) => ...} />` separates filtering/list mechanics from presentation in both doctor and appointment modules. |
| **`// [REQ-7]`** | Controlled Components | `AppointmentForm.jsx` | `patientName`, `phone`, `doctorId`, `date`, `time`, and `note` are strictly bound to React `useState`. |
| **`// [REQ-8]`** | Uncontrolled Component with `useRef` | `AppointmentForm.jsx` | Direct DOM reference `fileInputRef = useRef(null)` binds the report attachment input; read imperatively on submit and cleared on reset. |
| **`// [REQ-9]`** | Prop Drilling Problem & Solution | `App.jsx`<br>`DoctorPanel.jsx` | Solved pass-through drilling via Component Composition (`children`) and Render Props (`renderItem`). Detailed architecture comparison provided below. |
| **`// [REQ-10]`** | Event Handling (`handle*`) & Form Submit | `AppointmentForm.jsx`<br>`AppointmentRow.jsx`<br>`DoctorCard.jsx` | `handleSubmit` with `e.preventDefault()` and `try/catch`; `handleDelete` with `window.confirm()`; `handleSelect` doctor toggle. |
| **`// [REQ-11]`** | Error Boundary & Fallback UI | `ErrorBoundary.jsx`<br>`FallbackUI.jsx`<br>`CrashTest.jsx` | Class component with `getDerivedStateFromError` and `componentDidCatch`. Top-level boundary protects the app; isolated boundary protects Appointments. |
| **`// [REQ-12]`** | Global Error Handling & Logger | `logger.js`<br>`main.jsx` | Standardized timestamped logging (`logInfo`, `logWarn`, `logError`) + global `window.onerror` and `unhandledrejection` routing. |

---

## 5. Architectural Deep Dives

### 5.1 Prop Drilling Analysis (`[REQ-9]`)

#### The Problem
In hierarchical React applications, child components often need access to state or event handlers managed high up in the tree. When passing `selectedDoctorId` and `onSelectDoctor`:
```text
App (manages selectedDoctorId state)
 └── DoctorPanel (does NOT use selectedDoctorId directly)
      └── DoctorList (does NOT use selectedDoctorId directly)
           └── DoctorCard (consumes selectedDoctorId to show "Selected" state)
```
In this scenario, `DoctorPanel` and `DoctorList` act as "dumb pipes" or blind pass-through intermediaries. This causes:
1. **Tight Coupling**: Any change to `DoctorCard`'s prop signature forces updates to all intermediate components.
2. **Boilerplate Noise**: Intermediary components clutter their prop types and function signatures with arguments they have no interest in.
3. **Refactoring Friction**: Moving components or restructuring the layout breaks the chain of forwarded props.

#### The Applied Solution: Component Composition & Render Props
1. **Component Composition (`children` prop)**:
   Instead of hardcoding sub-trees inside monolithic panels, `Card.jsx` provides a container that renders `props.children`. `DoctorPanel` composes `DoctorFilter` and `DoctorList` as direct siblings.
2. **Render Prop Pattern (`FilterableList.jsx`)**:
   `DoctorList` delegates rendering to `FilterableList`, passing a `renderItem={(doctor) => <DoctorCard ... />}` function. The caller defines exactly how each item is rendered and passes bindings directly to `DoctorCard`.
3. **Bonus: Comparison with React Context**:
   For complex enterprise applications with deep nesting (5+ levels), a dedicated `ClinicContext` (`createContext()`) paired with `useContext(ClinicContext)` allows `DoctorCard` to subscribe directly to `selectedDoctorId` without any intermediary props:
   ```jsx
   // Optional Context Alternative:
   const ClinicContext = React.createContext();
   export const useClinic = () => React.useContext(ClinicContext);
   ```
   *Trade-off*: Context adds abstraction and may trigger wider re-renders unless memoized; Component Composition and Render Props keep data flow explicit, highly testable, and lightweight.

---

### 5.2 Error Handling Architecture (`[REQ-11]` & `[REQ-12]`)

#### Why React `ErrorBoundary` Alone Is Insufficient
A common misconception among beginner React developers is that wrapping an app in `<ErrorBoundary>` catches every possible error. It does **not**:
1. **Event Handlers**: Errors thrown inside `onClick`, `onChange`, or `onSubmit` occur during asynchronous browser events, outside React's render/reconciliation phase. `ErrorBoundary` will never catch them.
2. **Asynchronous Code**: Promises (`fetch`, `async/await`), `setTimeout`, or `requestAnimationFrame` errors escape the React boundary lifecycle.
3. **Server-Side Rendering (SSR)**: Errors occurring outside client render cycles.
4. **Errors in the Error Boundary Itself**: If `ErrorBoundary`'s own render method fails, it cannot catch itself.

#### The Complete 3-Tier Defense System
Our implementation provides an exhaustive safety net:
1. **Tier 1: React Error Boundary (`ErrorBoundary.jsx`)**:
   - Catches declarative rendering and lifecycle errors in child components.
   - Updates state via `getDerivedStateFromError(error)` to render `FallbackUI.jsx`.
   - Logs component stack traces via `componentDidCatch(error, errorInfo)`.
   - **Isolation**: In addition to the root boundary, `AppointmentList` is wrapped in its own isolated boundary. If rendering tabular appointment data fails, only that table crashes into a local fallback card—the doctor catalog and booking form remain 100% interactive!
2. **Tier 2: Event Handler `try / catch` Blocks (`AppointmentForm.jsx`)**:
   - `handleSubmit` wraps form processing in a `try / catch` block.
   - Any runtime failure logs to `logError` and displays a user-friendly UI error banner (`form-error-banner`) without crashing the page.
3. **Tier 3: Global Window Error Listeners (`main.jsx`)**:
   - `window.onerror`: Catches uncaught runtime JavaScript exceptions anywhere on the window.
   - `window.addEventListener('unhandledrejection')`: Catches unhandled asynchronous promise rejections.
   - Both forward telemetry to `logError` in `src/utils/logger.js` with ISO timestamps.

---

## 6. Seed Data & Screenshot Alignment

The seed datasets in `src/data/doctors.js` and `src/data/appointments.js` exactly reproduce the counters shown in the assignment design:

- **Total Doctors**: `08` (8 doctors across Cardiology, Neurology, Medicine, Orthopedics)
- **Total Appointments**: `12` (12 scheduled consultations)
- **Pending Appointments**: `05` (5 pending triage review)
- **Completed Appointments**: `04` (4 completed visits)
- **Confirmed Appointments**: `02`
- **Cancelled Appointments**: `01`
- `5 + 4 + 2 + 1 = 12 total appointments`

---

## 7. Responsive Breakpoint Behavior

- **Desktop (`≥ 1024px`)**:
  - `StatGrid`: 4 equal columns (`repeat(4, 1fr)`, gap: 20px)
  - `Workspace`: 2-column split (Left 40% `DoctorPanel`, Right 60% `AppointmentForm` + `AppointmentList`)
- **Tablet (`640px – 1023px`)**:
  - `StatGrid`: 2 equal columns (`repeat(2, 1fr)`, gap: 20px)
  - `Workspace`: 1 column (`DoctorPanel` on top, followed by `AppointmentForm` and `AppointmentList`)
- **Mobile (`< 640px`)**:
  - `StatGrid`: 1 column (`1fr`, gap: 16px)
  - `Workspace`: 1 column
  - `AppointmentForm`: `Date` and `Time` inputs stack into 1 column
  - `Appointments Table`: Responsive horizontal scroll wrapper with minimal custom scrollbar

---

## 8. License & Academic Integrity

Built as part of **Module-26 (React Fundamentals)** under the Web Development Course Curriculum.  
Author: MediCare Front Desk Engineering Team  
Year: 2026
