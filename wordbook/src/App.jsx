
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import WordForm from "./components/WordForm";
import WordList from "./components/WordList";
import "./App.css";

const STORAGE_KEY = "wordbook_words";

function App() {
  // LocalStorage üzerinden kayıtlı kelimeleri yükle
  const [words, setWords] = useState(() => {
    try {
      const savedWords = localStorage.getItem(STORAGE_KEY);
      return savedWords ? JSON.parse(savedWords) : [];
    } catch {
      return [];
    }
  });

  const [search, setSearch] = useState("");
  const [editingWord, setEditingWord] = useState(null);

  // Kelimeler değiştiğinde LocalStorage'a kaydet
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
  }, [words]);

  // Yeni kelime ekleme veya mevcut kelimeyi güncelleme
  const saveWord = (wordData) => {
    if (editingWord) {
      setWords((prev) =>
        prev.map((word) =>
          word.id === editingWord.id
            ? { ...wordData, id: word.id, createdAt: word.createdAt }
            : word
        )
      );

      setEditingWord(null);
    } else {
      const newWord = {
        ...wordData,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };

      setWords((prev) => [newWord, ...prev]);
    }
  };

  // Kelime silme
  const deleteWord = (id) => {
    if (window.confirm("Bu kelimeyi silmek istediğine emin misin?")) {
      setWords((prev) => prev.filter((word) => word.id !== id));

      if (editingWord?.id === id) {
        setEditingWord(null);
      }
    }
  };

  // Arama işlemi
  const filteredWords = words.filter((word) =>
    `${word.word} ${word.meaning} ${word.example}`
      .toLocaleLowerCase("tr")
      .includes(search.toLocaleLowerCase("tr"))
  );

  return (
    <div className="app-container">
      <Sidebar wordCount={words.length} />

      <main className="main-content">
        <header className="top-header">
          <div>
            <p className="eyebrow">PERSONAL WORKSPACE</p>
            <h1>Kelime Defterim</h1>
            <p className="subtitle">
              Kelimelerini kaydet, düzenle ve öğren.
            </p>
          </div>

          <div className="word-counter">
            <span>{words.length}</span>
            <small>Kayıtlı Kelime</small>
          </div>
        </header>

        <WordForm
          onSave={saveWord}
          editingWord={editingWord}
          onCancel={() => setEditingWord(null)}
        />

        <section className="words-section">
          <div className="section-header">
            <div>
              <h2>Kelime Listesi</h2>
              <p>{filteredWords.length} kelime bulundu</p>
            </div>

            <input
              className="search-input"
              type="text"
              placeholder="Kelime veya anlam ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <WordList
            words={filteredWords}
            onDelete={deleteWord}
            onEdit={setEditingWord}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
