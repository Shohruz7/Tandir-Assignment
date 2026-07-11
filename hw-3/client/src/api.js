// Thin wrapper around the REST API.
// In dev, Vite proxies /api -> http://localhost:5001 (see vite.config.js).
// In prod, the Express server serves this build, so same-origin /api works too.
const BASE = import.meta.env.VITE_API_URL || "";

async function request(path, options = {}) {
  const res = await fetch(BASE + path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body.error) message = body.error;
    } catch {
      /* response had no JSON body */
    }
    throw new Error(message);
  }
  return res.status === 204 ? null : res.json();
}

// ----- menu -----
export const getMenu = () => request("/api/menu");
export const createMenuItem = (data) =>
  request("/api/menu", { method: "POST", body: JSON.stringify(data) });
export const updateMenuItem = (id, data) =>
  request(`/api/menu/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteMenuItem = (id) =>
  request(`/api/menu/${id}`, { method: "DELETE" });

// ----- orders -----
export const getOrders = () => request("/api/orders");
export const createOrder = (data) =>
  request("/api/orders", { method: "POST", body: JSON.stringify(data) });
export const updateOrder = (id, data) =>
  request(`/api/orders/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteOrder = (id) =>
  request(`/api/orders/${id}`, { method: "DELETE" });
