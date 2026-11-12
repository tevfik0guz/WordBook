
function Sidebar({ wordCount }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">W</div>
        <span>WordBook</span>
      </div>

      <div className="menu-label">ÇALIŞMA ALANI</div>

      <nav>
        <div className="menu-item active">
          <span>▤</span>
          Kelime Defterim
        </div>

        <div className="menu-item">
          <span>◷</span>
          Son Eklenenler
        </div>
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-stat">
          <span>Toplam Kelime</span>
          <strong>{wordCount}</strong>
        </div>

        <p>WordBook © 2026</p>
      </div>
    </aside>
  );
}

export default Sidebar;
