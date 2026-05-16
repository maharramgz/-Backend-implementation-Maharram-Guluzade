# Homework 4 — SPA diagram (blueprint for uuBml Draw)

Use this section as the **single SPA overview** to redraw in **uuBml Draw**.

## Narrative

The app is a **multi-route React SPA** (Next.js App Router). A shared shell (`AppShell` + `SiteNav`) wraps every page. Each route loads data with `fetch` through `lib/api.js` and renders forms or lists. Navigation uses **client-side** transitions (`next/link`). There is **no authentication** gate.

## Mermaid — high-level SPA structure

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

## Mermaid — routes as nodes (for a second uuBml sheet if required)

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

## uuBml Draw tips

- Use one **swimlane** for “Browser UI (React)” and one for “REST API (Express)”.  
- Draw **directed arrows** only where `lib/api.js` calls an endpoint (see per-route file).  
- Label arrows with HTTP method + path, e.g. `GET /api/machines`.
