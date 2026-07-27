export default function FaqList({ items }) {
  return (
    <div className="faq-list">
      {items.map((item) => (
        <details className="faq-list__item" id={item.id} key={item.id || item.question}>
          <summary>
            <span>{item.question}</span>
            <span className="faq-list__icon" aria-hidden="true">
              +
            </span>
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
