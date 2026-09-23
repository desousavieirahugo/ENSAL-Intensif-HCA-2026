import { describe, expect, it } from "vitest";
import { rechercherPatrimoine } from "../src/domain/search.js";

describe("historical search", () => {
  it("waits for a two-character query", () => {
    expect(rechercherPatrimoine("a", "landing", null)).toEqual([]);
  });

  it("finds people and places from the landing page", () => {
    const results = rechercherPatrimoine("Moulin", "landing", null);

    expect(results.some((result) => result.type === "person" && result.id === "jean_moulin")).toBe(
      true,
    );
    expect(results.some((result) => result.type === "step")).toBe(true);
    expect(results[0].description).toBe("Parcours • Unificateur des mouvements de la Résistance (M.U.R.)");
  });

  it("matches main's hidden person alias and keeps map marker styling on place results", () => {
    const people = rechercherPatrimoine("Klaus", "landing", null);
    const places = rechercherPatrimoine("Prison de Montluc", "landing", null);

    expect(people.some((result) => result.id === "chaban_delmas")).toBe(true);
    const place = places.find((result) => result.type === "place");
    expect(place?.item.markerColor).toBeTruthy();
    expect(place?.description).toMatch(/^⚖️ Prisons • /);
  });

  it("limits map search to the active view", () => {
    const results = rechercherPatrimoine("Montluc", "map", "jean_moulin");

    expect(results[0].label).toMatch(/^Étape \d+ : /);
    expect(results[0].description).toMatch(/^📍 /);
  });

  it("uses the same result caps as main", () => {
    const landingResults = rechercherPatrimoine("de", "landing", null);
    const mapResults = rechercherPatrimoine("rue", "justice", null);

    expect(landingResults).toHaveLength(10);
    expect(mapResults).toHaveLength(8);
  });
});
