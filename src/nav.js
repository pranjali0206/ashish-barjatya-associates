// Minimal history-based router shared across the app (no dependency).
// navigate() pushes a path; subscribe() fires on push/back/forward.
// A pending scroll lets a link on a sub-page jump to a home section after returning home.

let pending = null
export const setPendingScroll = (v) => { pending = v }
export const takePendingScroll = () => { const p = pending; pending = null; return p }

export function navigate(to) {
  if (to === window.location.pathname) { window.scrollTo(0, 0); return }
  window.history.pushState({}, '', to)
  window.dispatchEvent(new Event('routechange'))
}

export function subscribeRoute(fn) {
  const h = () => fn(window.location.pathname)
  window.addEventListener('popstate', h)
  window.addEventListener('routechange', h)
  return () => {
    window.removeEventListener('popstate', h)
    window.removeEventListener('routechange', h)
  }
}
