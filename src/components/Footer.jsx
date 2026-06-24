import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__divider" />
        <div className="footer__inner">
          <div className="footer__brand">
            <span className="footer__logo-text">Blue Sky Group</span>
          </div>

          <div className="footer__info">
            Foundation phase &middot; v0.1 &middot; {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
}
