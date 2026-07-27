const getDevice = () => {
  if (typeof window === 'undefined') return 'unknown';
  if (window.innerWidth <= 768) return 'mobile';
  if (window.innerWidth <= 1024) return 'tablet';
  return 'desktop';
};

export function trackEvent(name, parameters = {}) {
  if (typeof window === 'undefined') return null;

  const event = {
    event: name,
    page: window.location.pathname,
    device: getDevice(),
    timestamp: new Date().toISOString(),
    ...parameters,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
  window.dispatchEvent(new CustomEvent('bsg:analytics', { detail: event }));

  if (import.meta.env?.DEV && import.meta.env?.VITE_ANALYTICS_DEBUG === 'true') {
    console.info('[Blue Sky analytics]', event);
  }

  return event;
}

