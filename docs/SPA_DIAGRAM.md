# SPA structure (frontend)

Multi-route React application (Next.js App Router). Shared shell: `AppShell` + `SiteNav` in the root layout. Data access is centralized in `frontend/lib/api.js` (HTTP `fetch` to the Express API). Navigation uses `next/link`.

## High-level architecture

```mermaid
flowchart TB
  subgraph shell [App shell]
    L[Root layout]
    N[SiteNav]
    L --> N
    N --> P[Page outlet]
  end

  subgraph data [Shared data access]
    API[lib/api.js]
  end

  P --> H[Home /]
  P --> M[machines/*]
  P --> B[bookings/*]

  H --> API
  M --> API
  B --> API

  API --> REST[Express REST JSON]
```

## Route graph

```mermaid
flowchart LR
  Home(/) --> ML(/machines)
  Home --> BL(/bookings)
  ML --> MN(/machines/new)
  ML --> MD(/machines/:id)
  MD --> ME(/machines/:id/edit)
  MD --> MS(/machines/:id/schedule)
  BL --> BN(/bookings/new)
  BL --> BS(/bookings/schedule)
  BL --> BM(/bookings/manage)
  BL --> BD(/bookings/:id)
  BD --> BE(/bookings/:id/edit)
```

## Diagram conventions

- UI lane: React pages and components under `frontend/app/` and `frontend/components/`.  
- API lane: Express routes under `GET` / `POST` / `PUT` / `DELETE` as in `docs/API_ENDPOINTS.md`.  
- Per-route Mermaid flows: `docs/ROUTE_DIAGRAMS.md`.
