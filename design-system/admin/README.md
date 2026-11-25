# Zixom Plast admin dashboard prototype

Clickable HTML prototype of the admin web dashboard. Source of truth:
`docs/Zixom Plast Admin Dashboard Spec (Source of Truth) SCT-SP-ADM-ZP Draft 1.pdf` (not committed).
Desktop web, single Admin role, light mode. Demo today is Monday 23 Nov 2026, 12:00 IST.

## Open it

```sh
cd design-system && python3 -m http.server 8000
```

`http://localhost:8000/admin/` is the screen map: all 250 Phase 1 pages are built; the 8 Phase 2 pages (D1701 to D1708)
are listed but not built, as the spec defers them. `/admin/components.html` shows every component.

## Relation to the mobile prototype

The mobile files are never changed from here. Admin pages link these read only:
`../assets/css/tokens.css` (colours, type, fonts), `../assets/brand/`, `../assets/js/data.js` and `render.js`
(same companies, people, machines, tickets and invoices, so a flow can be followed from the app to the dashboard).
Everything desktop lives in `admin/`.

## Structure

```
index.html                 screen map
components.html            every component, live
assets/css/admin.css       the one stylesheet a page links (imports tokens + the files below)
  shell.css                sidebar 248/72 px, top bar 56 px, content max 1440 px
  ui.css                   buttons, tags, chips, cards, tabs, banners, states, timeline
  forms.css                fields, search, checks, switch, choice cards, file drop, OTP
  data.css                 filter bar, table, bulk bar, KPI, charts, mini lists, kanban, schedule board
  overlays.css             drawer 480/720, modal 480, menus, popovers, command search, toast
  pages.css                record detail 2/3 + 1/3, sign in card, split view, thread, gallery, steps, diff
  proto.css                prototype panel (never build)
assets/js/admin-screens.js page registry from the spec index, sidebar nav, ZXA.built (generated)
assets/js/data/<module>.js demo data and small helpers of one module, on top of ZX.data and ZXA.data
assets/css/m-<module>.css  layout only one module needs (with its phone rules); everything shared stays in the files above
assets/js/admin-data.js    admin-only demo data on top of ZX.data
assets/js/admin-render.js  ZXA.r: lookups, Admin status wording (spec section 11), chips, money in L/Cr
assets/js/admin-shell.js   draws sidebar, top bar, search, bell, Create, health, banners, prototype panel
assets/js/admin-ui.js      overlays, menus, toasts, tabs, tables, search, demo states, ZXA.chart
assets/icons.js            Lucide sprite, built by tools/build-icons.mjs (mobile names plus desktop ones)
assets/vendor/chart.umd.js Chart.js 4.4.7 (MIT)
assets/ds/                 select, date picker, calendar, time picker, popover, scroll area and input copied from the
                           Software Crafting design system (~/git/design-system), rebranded in ds/theme.css; ds-admin.css
                           matches them to the admin fields; calendar and time picker take today from the demo date
assets/js/admin-ds.js      turns every native select, date, time and date-time field into those components; the native
                           element keeps the value, so pages still read and set .value and listen to change
pages/<module>/<ID>-<slug>.html
tools/build-index.mjs      writes ZXA.built from pages/ and fails on a file name that does not match the registry
tools/check-links.mjs      fails on links to unknown or Phase 2 pages and on missing mobile screens
```

## Page skeleton

```html
<body class="adm" data-page="D401">
<main class="content"> ... content marked data-when="ready", "loading", "empty" ... </main>
<aside class="proto" data-states="ready loading empty error" data-mobile="../../../screens/customer/C502-requests.html">
  <div><h3>What it is</h3><p>...</p></div> ... What you can do, What happens next, Edge cases and spec
</aside>
<script src="../../assets/icons.js"></script>
<script src="../../../assets/js/data.js"></script>
<script src="../../../assets/js/render.js"></script>
<script src="../../assets/js/admin-screens.js"></script>
<script src="../../assets/js/admin-data.js"></script>
<script src="../../assets/js/admin-render.js"></script>
<script> /* render the page's rows here, before the shell */ </script>
<script src="../../assets/js/admin-shell.js"></script>
<script src="../../assets/js/admin-ui.js"></script>
</body>
```

Then run `node design-system/admin/tools/build-index.mjs` and `node design-system/admin/tools/check-links.mjs`.
A page that should open in another demo state sets `document.body.dataset.state` before the shell loads. Record pages read
their record from the address (`?t=` ticket, `?m=` machine, `?c=` claim or company, `?e=` engineer) and fall back to a
sensible sample. Pages that are a drawer or modal in the spec are their parent page with that overlay open. Link pages with `href="#D403"` or `data-href="D403?t=TKT-2026-0126"`; unbuilt pages
open the screen map.

## Prototype chrome, never build this

The yellow Prototype button and its panel: demo state switch (every page also gets Offline, Slow network, Stale data,
Session expired from the shell), sticky notes, link to the matching mobile screen, screen map link.

## Rules

Same as mobile: one primary action, chevrons only on plain rows, filter button beside search, pills for small
actions, spring in and out, no page transitions, grey surface with white hairline cards, Lucide icons, short copy.
Lists: 25 rows (25/50/100), row click opens a quick view drawer, record number opens the page, checkboxes show the
bulk bar. Destructive modals name the record and the consequence (spec section 18).

## Responsive

Desktop first, down to phones with no sideways page scroll: under 1100 px the sidebar is a slide-out menu; under 640 px
cards stack, KPI cards sit two per row, drawers fill the screen, modals rise from the bottom, toolbars wrap with the
filter button kept beside search, and wide tables scroll inside their card.
