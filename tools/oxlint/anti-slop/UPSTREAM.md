# Vendored anti-slop rules

- Upstream: <https://github.com/dmmulroy/anti-slop>
- Revision: `c44ef22ca116d0ba62a3ff663a0bd13a3f3fa40b`
- Upstream license: MIT (`LICENSE`)

The generic plugin source is vendored under `tools/oxlint/anti-slop/` as
recommended upstream. The Effect-specific plugin is kept for provenance but is
not registered because this project does not use Effect. Keep the vendored
source out of the project's lint targets and review upstream changes before
updating this copy.
