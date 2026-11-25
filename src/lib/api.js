export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "/api").replace(/\/+$/, "");

export function apiUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const baseHasApiPrefix = API_BASE_URL.endsWith("/api");
  const pathHasApiPrefix = normalizedPath === "/api" || normalizedPath.startsWith("/api/");

  if (baseHasApiPrefix && pathHasApiPrefix) {
    return `${API_BASE_URL}${normalizedPath.slice(4)}`;
  }
  return `${API_BASE_URL}${normalizedPath}`;
}
