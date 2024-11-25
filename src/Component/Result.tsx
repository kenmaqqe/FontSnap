import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import styles from "../styles/Result.module.css";
import { Stage, Layer, Rect, Image } from "react-konva";
import { identifyFont } from "../utils/WhatIsFonts";

const Result = () => {
  const textIndex = useSelector((state: any) => state.data.textForSearch);
  const textBoxes = useSelector((state: any) => state.data.textBoxes);
  const images = useSelector((state: any) => state.data.images);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [fontData, setFontData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Image loading and setting
  useEffect(() => {
    if (images && images.length > 0) {
      const image = new window.Image();
      image.src = images[0];
      image.onload = () => setImg(image);
    }
  }, [images]);

  // Font identification logic
  useEffect(() => {
    if (img) {
      const fetchFontData = async () => {
        try {
          setError(null);
          // Optionally pass your actual API key here
          const data = await identifyFont(images[0], 'c201675bf87ff0d6f3acbf5837863f06aba1dce6caaedc4830443dd29b52aaed');
          setFontData(data);
          console.log(data);
        } catch (err) {
          setError("Font recognition failed. Try again.");
          console.error(err);
        }
      };
      fetchFontData();
    }
  }, [img]);

  return (
    <div className={styles.Container}>
      {img && (
        <div className={styles.Content}>
          <Stage width={img.width} height={img.height}>
            <Layer>
              {/* Image with opacity set */}
              <Image
                image={img}
                opacity={0.5} // Image opacity 0.5
              />
              {textBoxes.map((box: any, index: number) => (
                <Rect
                  key={index}
                  x={box.x}
                  y={box.y}
                  width={box.width}
                  height={box.height}
                  stroke={textIndex === index ? "blue" : "transparent"}
                  strokeWidth={5}
                  fill={textIndex === index ? "rgba(0, 0, 255, 0.3)" : "transparent"}
                />
              ))}
            </Layer>
          </Stage>
          {fontData && (
            <div>
              {/* Display font data if available */}
              result
            </div>
          )}
        </div>
      )}
      {error && <div className={styles.Error}>{error}</div>}
    </div>
  );
};

export default Result;
