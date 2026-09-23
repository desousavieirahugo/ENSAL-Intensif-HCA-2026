# Vue migration profiling

Design read: preserve the existing Lyon historical-map identity for visitors exploring people and justice sites, with ENERGY 2 / RHYTHM 2 / MOTION 1.

## Reproducible build comparison

Vite builds were compared in Docker with Bun 1.4.2 and Vite 8.3.0. The baseline is commit `82eb666fca6e0ea7f42c31035c64089e689d4d6f`; the migrated build is from branch `feat/vue-migration-performance`.

Command run in each worktree:

```sh
make build
```

Sizes reported by Vite:

| Artifact | Baseline raw | Migration raw | Baseline gzip | Migration gzip |
| --- | ---: | ---: | ---: | ---: |
| Entry JavaScript | 114.79 kB | 108.17 kB | 40.29 kB | 41.37 kB |
| Entry CSS | 38.98 kB | 42.41 kB | 7.41 kB | 8.05 kB |
| Map JavaScript | CDN, not reported by Vite | 152.99 kB, deferred chunk | CDN, not reported by Vite | 45.27 kB |
| Leaflet CSS | CDN, not reported by Vite | 15.09 kB, deferred chunk | CDN, not reported by Vite | 6.36 kB |

The migrated entry JavaScript is 6.62 kB smaller before gzip (5.8%). Its gzip size is 1.08 kB larger. The asynchronous map component moves Leaflet code into a chunk loaded when a map view opens. The baseline loaded Leaflet from a CDN during document load; Vite's measurements do not include that remote resource, so these figures alone do not prove a reduction in total transfer or display time.

## Browser profiling still required

The OpenCode browser was not connected during this run. No CPU recording, heap/memory measurement, or visual click-through was performed. No CPU or memory improvement is claimed.

To complete the measurements, compare the baseline and migration in the same browser and on the same network. Record the same flows: landing page, each person, Justice view, search, era changes, sidebar, legal dialog, and light/dark themes. For each flow, save a Performance trace with the same actions and a heap snapshot after the page settles. On mobile, repeat era changes and sidebar open/close at narrow, tablet, and desktop widths. Record the browser, version, viewport, network, and exported files with each result.
