
function WordList({ words, onDelete, onEdit }) {
  if (words.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">▤</div>
        <h3>Henüz kelime eklenmemiş</h3>
        <p>Yeni kelime ekleyerek kendi sözlüğünü oluşturmaya başla.</p>
      </div>
    );
  }

  return (
    <div className="word-list">
      {words.map((word) => (
        <article className="word-card" key={word.id}>
          <div className="word-card-content">
            <div className="word-title-row">
              <h3>{word.word}</h3>
              <span className="word-date">
                {new Date(word.createdAt).toLocaleDateString("tr-TR")}
              </span>
            </div>

            <p className="word-meaning">{word.meaning}</p>

            {word.example && (
              <p className="word-example">
                "{word.example}"
              </p>
            )}
          </div>

          <div className="word-actions">
            <button
              onClick={() => onEdit(word)}
              className="edit-button"
            >
              Düzenle
            </button>

            <button
              onClick={() => onDelete(word.id)}
              className="delete-button"
            >
              Sil
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default WordList;
