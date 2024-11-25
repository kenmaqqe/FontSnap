import React, { useRef, useState } from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { setFirstButton, setImages } from '../redux/dataSlice'
import styles from "../styles/UploadImage.module.css";
import Upload from "../assets/Upload.svg";


const MainAction = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [preview,setPreview] = useState<boolean>(true);

  const imageRef = useRef<HTMLImageElement | null>(null);
  const cropperInstance = useRef<Cropper | null>(null);

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setImage(fileUrl);
      setModalOpen(true); 

    }
  };

  const initializeCropper = () => {
    if (imageRef.current) {
      const contentElement = document.querySelector(`.${styles.Content}`);
      const contentHeight = contentElement?.getBoundingClientRect().height || 600; // Значення за замовчуванням
  
      cropperInstance.current = new Cropper(imageRef.current, {
        aspectRatio: null,
        viewMode: 1,
        autoCropArea: 0.5,
        responsive: true,
        cropBoxResizable: true,
        cropBoxMovable: true,
        minContainerHeight: contentHeight, // Мінімальна висота контейнера
      });
    }
  };
  

  const handleCrop = () => {
    if (cropperInstance.current) {
      const canvas = cropperInstance.current.getCroppedCanvas();
      const cropped = canvas.toDataURL("image/jpeg");
      setCroppedImage(cropped);
      dispatch(setImages([cropped])); // Передаємо обрізане зображення в Redux
    }
    setModalOpen(false);
    setPreview(false);
    dispatch(setFirstButton(true));
  };
  
  
  const resetCropper = () => {
    cropperInstance.current?.destroy();
    cropperInstance.current = null;
    setCroppedImage(null);
    setPreview(true);
    dispatch(setFirstButton(false));
  }

  return (
    <div className={styles.Container}>
      <div className={styles.Content}>
        {preview ? (
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
          <div className={styles.Cropped}>
            <img
              src={croppedImage}
              alt="Cropped"
              className={styles.CroppedImage}
            />
            <button onClick={resetCropper} className={styles.Reset}>Reset</button>
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
