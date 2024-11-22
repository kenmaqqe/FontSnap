import React, { useRef, useState } from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import Modal from "react-modal";
import styles from "../styles/MainAction.module.css";
import Upload from "../assets/Upload.svg";

type MainActionProps = {
  stepsNumber: number;
};

const MainAction: React.FC<MainActionProps> = ({ stepsNumber }) => {
  const [image, setImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const imageRef = useRef<HTMLImageElement | null>(null);
  const cropperInstance = useRef<Cropper | null>(null);

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setImage(fileUrl);
      setModalOpen(true); // Відкрити модальне вікно
    }
  };

  const initializeCropper = () => {
    if (imageRef.current) {
      cropperInstance.current = new Cropper(imageRef.current, {
        aspectRatio: null, // Співвідношення сторін
        viewMode: 1,
        autoCropArea: 1,
        responsive: true, // Автоматичне підлаштування під розміри
      });
    }
  };

  const handleCrop = () => {
    if (cropperInstance.current) {
      const canvas = cropperInstance.current.getCroppedCanvas({
        width: 800, // Максимальна ширина
        height: 600, // Максимальна висота
      });
      setCroppedImage(canvas.toDataURL("image/jpeg"));
      // Залишаємо старе зображення, щоб користувач міг завантажити нове
    }
    setModalOpen(false); // Закрити модальне вікно після обрізання
  };
  
  const resetCropper = () => {
    cropperInstance.current?.destroy();
    cropperInstance.current = null;
    setCroppedImage(null);
    // Стан image не очищається, щоб користувач міг завантажити нове зображення
  }

  return (
    <div className={styles.Container}>
      <div className={styles.Content}>
        {!image ? (
          <div className={styles.Upload}>
            <label className={styles.Label}>
              <img src={Upload} alt="Upload" />
              <input
                className={styles.Input}
                type="file"
                accept="image/*"
                onChange={handleUploadImage}
              />
            </label>
            <span>Upload an image</span>
          </div>
        ) : croppedImage ? (
          <div>
            <img
              src={croppedImage}
              alt="Cropped"
              className={styles.CroppedImage}
            />
            <button onClick={resetCropper}>Reset</button>
          </div>
        ) : null}

        {/* Модальне вікно */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setModalOpen(false)}
          className={styles.Modal}
          overlayClassName={styles.Overlay}
          contentLabel="Crop Image"
        >
          <div className={styles.ImageCropper}>
            <img
              ref={imageRef}
              src={image || ""}
              alt="To Crop"
              onLoad={initializeCropper}
            />
            <button className={styles.CropButton} onClick={handleCrop}>Crop</button>
            <button className={styles.CropButton} onClick={() => setModalOpen(false)}>Cancel</button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default MainAction;
