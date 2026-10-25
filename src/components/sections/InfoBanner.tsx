function InfoBanner() {
  const items = [
    '7 послідовних кроків',
    'Чернетка тільки в sessionStorage',
    'Клавіатурна навігація',
    'Адаптивний layout',
  ];

  return (
    <aside className="info-banner" aria-label="Особливості демонстрації">
      <div className="page-container">
        <ul className="info-banner-list">
          {items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </aside>
  );
}

export default InfoBanner;