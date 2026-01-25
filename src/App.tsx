import { useState } from "react";
import "./App.css";

const images = Object.values(
  import.meta.glob("./assets/images/*.png", {
    eager: true,
    as: "url",
  }),
);

function App() {
  const [index, setIndex] = useState(0);

  const isFirst = index === 0;
  const isLast = index === images.length - 1;

  const prevImage = () => {
    if (!isFirst) {
      setIndex(index - 1);
    }
  };

  const nextImage = () => {
    if (!isLast) {
      setIndex(index + 1);
    }
  };

  const shuffleImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setIndex(randomIndex);
  };

  return (
    <div className="container">
      <div className="viewer">
        <div className="image-box">
          <img src={images[index]} alt="gallery" />
        </div>

        <div className="controls">
          <button onClick={prevImage} disabled={isFirst}>
            Prev
          </button>

          <button onClick={shuffleImage}>Shuffle</button>

          <button onClick={nextImage} disabled={isLast}>
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
