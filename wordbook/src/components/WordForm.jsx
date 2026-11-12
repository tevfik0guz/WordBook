
import { useEffect, useState } from "react";

function WordForm({ onSave, editingWord, onCancel }) {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [example, setExample] = useState("");

  useEffect(() => {
    if (editingWord) {
      setWord(editingWord.word);
      setMeaning(editingWord.meaning);
      setExample(editingWord.example);
    } else {
      setWord("");
      setMeaning("");
      setExample("");
    }
  }, [editingWord]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!word.trim() || !meaning.trim()) {
      return;
    }

    onSave({
      word: word.trim(),
      meaning: meaning.trim(),
      example: example.trim()
    });

    setWord("");
    setMeaning("");
    setExample("");
  };

  return (
    <section className="form-card">
      <div className="form-heading">
        <h2>{editingWord ? "Kelimeyi Düzenle" : "Yeni Kelime Ekle"}</h2>
        <p>Defterine yeni bir kelime ekle.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Kelime *</label>
            <input
              type="text"
              placeholder="Örn. Ambiguous"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Anlamı *</label>
            <input
              type="text"
              placeholder="Örn. Belirsiz"
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              required
            />
          </div>

          <div className="form-group full-width">
            <label>Örnek Cümle</label>
            <textarea
              placeholder="Kelimenin kullanıldığı örnek bir cümle..."
              value={example}
              onChange={(e) => setExample(e.target.value)}
              rows="2"
            />
          </div>
        </div>

        <div className="form-actions">
          {editingWord && (
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
            >
              Vazgeç
            </button>
          )}

          <button type="submit" className="save-button">
            {editingWord ? "Değişiklikleri Kaydet" : "+ Kelimeyi Kaydet"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default WordForm;
