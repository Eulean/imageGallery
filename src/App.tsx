import { useEffect, useState } from "react";
import "./App.css";
import { getAllCategories, loadImagesByCategories } from "./utils/groupImages";

function App() {
  const [categories] = useState(getAllCategories());
  const [selected, setSelected] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (selected.length === 0) return setImages([]);

    loadImagesByCategories(selected).then((imgs) => {
      setImages(imgs);
      setIndex(0);
    });
  }, [selected]);

  const toggleCategory = (cat: string) => {
    setSelected((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const isFirst = index === 0;
  const isLast = index === images.length - 1;
  const hasImages = images.length > 0;

  const prevImage = () => {
    if (!isFirst) setIndex((i) => i - 1);
  };

  const nextImage = () => {
    if (!isLast) setIndex((i) => i + 1);
  };

  const shuffleImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setIndex(randomIndex);
  };

  return (
    <div className="container">
      <div className="viewer">
        {/* Top section: category bar + image */}
        <div className="top-section">
          <div className="category-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                className={selected.includes(cat) ? "active" : ""}
                onClick={() => toggleCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="image-box">
            {images.length > 0 ? (
              <img src={images[index]} alt="gallery" loading="lazy" />
            ) : (
              <p>Select a category</p>
            )}
          </div>
        </div>

        <div className="controls">
          <button onClick={prevImage} disabled={!hasImages || isFirst}>
            Prev
          </button>
          <button onClick={shuffleImage} disabled={!hasImages}>
            Shuffle
          </button>
          <button onClick={nextImage} disabled={!hasImages || isLast}>
            Next
          </button>
        </div>

        <p className="counter">
          {index + 1} / {images.length}
        </p>
      </div>
    </div>
  );
}

export default App;
