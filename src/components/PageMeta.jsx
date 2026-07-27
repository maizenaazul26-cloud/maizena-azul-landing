import { useEffect } from 'react';
import { SITE_ORIGIN } from '../data/siteContent';

const DEFAULT_IMAGE = `${SITE_ORIGIN}/favicon.png`;

function setMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
}

export default function PageMeta({
  title,
  description,
  path,
  structuredData,
  noIndex = false,
}) {
  useEffect(() => {
    const canonicalUrl = `${SITE_ORIGIN}${path}`;
    document.title = title;

    setMeta('meta[name="description"]', { name: 'description', content: description });
    setMeta('meta[name="robots"]', {
      name: 'robots',
      content: noIndex ? 'noindex, follow' : 'index, follow',
    });
    setMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    setMeta('meta[property="og:site_name"]', {
      property: 'og:site_name',
      content: 'Blue Sky Group',
    });
    setMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    setMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: description,
    });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    setMeta('meta[property="og:image"]', { property: 'og:image', content: DEFAULT_IMAGE });
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary' });
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    setMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: description,
    });
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: DEFAULT_IMAGE });

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    const previousSchema = document.getElementById('bsg-structured-data');
    previousSchema?.remove();
    if (structuredData) {
      const script = document.createElement('script');
      script.id = 'bsg-structured-data';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    return () => {
      document.getElementById('bsg-structured-data')?.remove();
    };
  }, [description, noIndex, path, structuredData, title]);

  return null;
}

