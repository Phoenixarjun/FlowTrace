**Project Name:** FlowTrace
**Purpose:**
FlowTrace is a **frontend-only algorithm execution visualizer** that replays **explicit execution traces** to help a single user (Naresh) understand how algorithms work internally.

This is:

* A **learning system**
* A **visual execution player**
* A **white-coding-first project**

This is **NOT**:

* A production SaaS
* A general-purpose code interpreter
* A competitive coding platform
* An AI tutor

---

## 1. Core Philosophy (DO NOT VIOLATE)

1. **Determinism over intelligence**

   * The system must replay declared steps
   * The system must never guess execution

2. **Visualization > correctness checking**

   * FlowTrace does not judge solutions
   * It visualizes *declared execution*

3. **Frontend-only by design**

   * No backend
   * No database
   * No authentication

4. **Architecture clarity > UI polish**

   * Visual clarity matters more than animations
   * Avoid decorative complexity

5. **Learning value > completeness**

   * Fewer features, deeper understanding

---

## 2. Tech Stack (LOCKED)

Anti-Gravity **must not change this stack** without explicit permission.

* **Framework:** Next.js (App Router)
* **Language:** TypeScript (strict mode ON)
* **Styling:** Tailwind CSS
* **State:** React state only (no Redux, no Zustand)
* **Animations:** Framer Motion (light usage only)
* **Visualization:** Custom SVG / Canvas / DOM (NO heavy graph libs initially)

❌ Do NOT add:

* Backend services
* APIs
* Auth
* AI SDKs
* Databases
* Third-party visualization engines

---

## 3. What FlowTrace Actually Does

FlowTrace **replays execution traces**.

An execution trace is a **structured, declarative description** of:

* Function calls
* State mutations
* Stack changes
* Pointer movements
* Control flow transitions

FlowTrace **does not execute algorithms**.

---

## 4. Supported Usage Modes (Phase 1)

### Mode A — Concept Mode

* User selects a predefined algorithm (DFS, Linked List, etc.)
* A predefined trace is loaded
* User steps through execution visually

### Mode B — Runtime Trace Injection

* User pastes a valid trace (JSON or DSL)
* FlowTrace parses and replays it immediately

❗ Raw code is **never** interpreted directly.

---

## 5. Execution Trace Contract (VERY IMPORTANT)

FlowTrace operates on **execution events**, not code.

### Canonical Event Types (initial)

```ts
type TraceEvent =
  | { type: "call"; fn: string; args?: any }
  | { type: "return"; fn: string; value?: any }
  | { type: "state"; key: string; value: any }
  | { type: "pointer"; from: string; to: string | null }
  | { type: "mark"; target: string }
  | { type: "unmark"; target: string };
```

Anti-Gravity:

* Must **not invent new event types** without permission
* Must treat this schema as **authoritative**

---

## 6. Visual Model (NON-NEGOTIABLE)

FlowTrace must render **three conceptual layers**:

### 1. Call Stack

* Vertical stack
* Push on `call`
* Pop on `return`

### 2. State View

* Variables
* Arrays
* Grids
* Maps

### 3. Pointer / Relationship View

* Linked list arrows
* Tree edges
* Graph connections

These views must stay **logically separate**.

---

## 7. UI Structure (LOCK THIS)

```
/app
 ├─ layout.tsx
 ├─ page.tsx (Home)
 ├─ playground/
 │   └─ page.tsx
 ├─ concepts/
 │   └─ page.tsx
 └─ about/
```

### Core Components

```
components/
 ├─ TracePlayer/
 ├─ StackView/
 ├─ StateView/
 ├─ PointerView/
 ├─ ControlPanel/
 └─ TraceEditor/
```

Anti-Gravity must **not collapse components into monoliths**.

---

## 8. Color System (LOCKED DESIGN SYSTEM)

FlowTrace uses a **dark, high-contrast, learning-focused palette**.

### Base Theme

```txt
Background:        #0B0F14  (near-black)
Surface:           #111827  (deep slate)
Primary Accent:    #38BDF8  (sky blue)
Secondary Accent:  #22C55E  (green)
Warning:           #F59E0B  (amber)
Error:             #EF4444  (red)
Text Primary:      #E5E7EB
Text Muted:        #9CA3AF
```

### Gradient Usage (Subtle, Not Loud)

```txt
Primary Gradient:
from #38BDF8 → #6366F1

Execution Highlight:
from #22C55E → #16A34A
```

Rules:

* Gradients only for **active execution**
* Never for background noise
* Never reduce readability

---

## 9. UX Rules (STRICT)

* Step-by-step control is mandatory
* Autoplay must be pausable
* Current step must be visually obvious
* No animation longer than 300ms
* No flashing or distracting motion

---

## 10. Constraints Anti-Gravity MUST Respect

❌ Do NOT:

* Delete files without explicit instruction
* Rename core components
* Change the trace schema
* Add unnecessary abstractions
* Introduce backend logic
* “Improve” scope creatively

✅ MUST:

* Ask before removing anything
* Keep files small and readable
* Favor explicit logic over cleverness
* Leave TODO comments instead of guessing

---

## 11. Development Phases (Anti-Gravity MUST FOLLOW)

### Phase 1 — Skeleton

* App routing
* Layout
* Static UI sections

### Phase 2 — Trace Engine

* Event iterator
* State reducer
* Step control

### Phase 3 — Visualization

* StackView
* StateView
* PointerView

### Phase 4 — Runtime Injection

* Trace editor
* Validation
* Replay

No phase skipping.

---

## 12. Success Criteria

FlowTrace is considered **successful** if:

* A DFS trace can be replayed step-by-step
* Stack growth/shrink is visually clear
* State mutations are obvious
* New traces can be injected at runtime
* The system remains simple and readable

---

## 13. Final Authority Clause

If ambiguity arises:

**Default to:**

* Simplicity
* Determinism
* Visual clarity

Anti-Gravity must **pause and ask** rather than assume.

