import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => vi.resetModules());

async function setup(production: boolean, mode = "") {
  vi.stubEnv("PROD", production);
  vi.stubEnv("DEV", !production);
  vi.stubEnv("VITE_DATA_MODE", mode);
  const { client } = await import("../../src/api/client");
  const requests: string[] = [];
  client.defaults.adapter = async (config) => {
    requests.push(config.url ?? "");
    return {
      config,
      data: { status: "success", data: [{ id: 999, title: "Local server product" }] },
      status: 200,
      statusText: "OK",
      headers: {},
    };
  };
  return { client, requests, ...(await import("../../src/api/productApi")) };
}

describe("static deployment and local API data", () => {
  it("serves the production catalog without attempting a backend request", async () => {
    const api = await setup(true);
    const items = await api.getProducts("gadget");
    expect(items.length).toBeGreaterThan(0);
    expect(items.every((item) => item.category === "gadget")).toBe(true);
    expect(api.requests).toEqual([]);
  });

  it("matches both category and ID for a static product", async () => {
    const api = await setup(true);
    expect(await api.getSingleProduct("gadget", 2)).toMatchObject({ id: 2, category: "gadget" });
    expect(await api.getSingleProduct("furniture", 2)).toBeUndefined();
    expect(api.requests).toEqual([]);
  });

  it("keeps local server reads enabled in development", async () => {
    const api = await setup(false);
    expect(await api.getProducts("gadget")).toEqual([{ id: 999, title: "Local server product" }]);
    expect(api.requests).toEqual(["getProduct/gadget"]);
  });

  it("allows development to preview static data explicitly", async () => {
    const api = await setup(false, "static");
    expect(await api.getSingleProduct("gadget", 2)).toMatchObject({ id: 2, category: "gadget" });
    expect(api.requests).toEqual([]);
  });

  it("allows an explicit API mode for a local production preview", async () => {
    const api = await setup(true, "api");
    expect(await api.getSingleProduct("gadget", 2)).toMatchObject({ id: 999 });
    expect(api.requests).toEqual(["getProduct/gadget/2"]);
  });

  it("prevents other backend operations from making requests in static mode", async () => {
    const api = await setup(true);
    await expect(api.client.post("order", {})).rejects.toMatchObject({ code: "ERR_STATIC_MODE" });
    expect(api.requests).toEqual([]);
  });
});
