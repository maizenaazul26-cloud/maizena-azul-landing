import { forwardRef } from 'react';
import { isPlainLeftClick } from '../router';

const SiteLink = forwardRef(function SiteLink(
  { href, onNavigate, onClick, children, ...props },
  ref,
) {
  const handleClick = (event) => {
    onClick?.(event);
    if (!isPlainLeftClick(event) || props.target === '_blank') return;

    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) return;

    event.preventDefault();
    onNavigate(`${url.pathname}${url.search}${url.hash}`);
  };

  return (
    <a ref={ref} href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
});

export default SiteLink;

