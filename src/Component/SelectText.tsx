import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import styles from "../styles/SelectText.module.css";
import Tesseract from "tesseract.js";
import { Stage, Layer, Rect, Image } from "react-konva";
import { ModalData } from "../data/index";
import Modal from "./Modal";
import { setFirstButton, setTextForSearch } from "../redux/dataSlice";

const SelectText = () => {
  const images = useSelector((state: any) => state.data.images);
  const [boxes, setBoxes] = useState<any[]>([]);
  const [selectedBoxIndex, setSelectedBoxIndex] = useState<number | null>(null); // Для збереження вибраного тексту
  const [imageURL, setImageURL] = useState<string>("");
  const [konvaImage, setKonvaImage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const recognizeText = async () => {
      if (images && Array.isArray(images)) {
        setIsLoading(true);
        setShowModal(false);
        const allBoxes = [];
        for (const image of images) {
          const result = await Tesseract.recognize(image, "eng", {
            logger: (info) => console.log(info),
          });
          const filteredLines = result.data.lines.filter(
            (line) => line.text.trim().length > 2
          ); // Фільтрує короткий "шум"
          const lines = filteredLines.map((line) => ({
            x: line.bbox.x0,
            y: line.bbox.y0,
            width: line.bbox.x1 - line.bbox.x0,
            height: line.bbox.y1 - line.bbox.y0,
            text: line.text,
          }));

          allBoxes.push(...lines);
        }
        setBoxes(allBoxes);
        setImageURL(images[0]); // Показуємо перше зображення
        setIsLoading(false);

        if (allBoxes.length === 0) {
          setShowModal(true);
          dispatch(setFirstButton(false));
        }
      }
    };
    recognizeText();
  }, [images]);

  useEffect(() => {
    if (imageURL) {
      const img = new window.Image();
      img.src = imageURL;
      img.onload = () => {
        setKonvaImage(img);
      };
    }
  }, [imageURL]);

  const handleTextClick = (index: number) => {
    setSelectedBoxIndex(index);
    dispatch(setTextForSearch(boxes[index].text));
    console.log(`Clicked on text: ${boxes[index].text}`);
  };
  

  return (
    <div className={styles.Container}>
      {isLoading && <div className={styles.Loader}>Loading...</div>}
      {!isLoading && konvaImage && (
        <Stage width={konvaImage.width} height={konvaImage.height}>
          <Layer>
            <Image image={konvaImage} />
            {boxes.map((box, index) => (
              <Rect
              key={index}
              x={box.x}
              y={box.y}
              width={box.width}
              height={box.height}
              stroke={selectedBoxIndex === index ? "blue" : "red"}
              strokeWidth={2}
              onClick={() => handleTextClick(index)}
            />            
            ))}
          </Layer>
        </Stage>
      )}
      {showModal && (
        <Modal
          description={ModalData[1]}
          helloModal={false}
        />
      )}
    </div>
  );
};

export default SelectText;
