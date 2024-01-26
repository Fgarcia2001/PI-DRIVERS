import { useState, useRef, useEffect } from "react";
import { uploadImage } from "./cloudinaryConfig";

import style from "./showImage.module.css";
const ImageHandler = ({ onImageChange, initialImageUrl }) => {
  const fileInput = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showImage, setShowImage] = useState(false);
  useEffect(() => {
    setPreviewImage(initialImageUrl);
  }, [initialImageUrl]);

  const seeImage = () => {
    setShowImage(true);
    setTimeout(() => {
      setShowImage(false); // Ocultar la imagen después de 4 segundos
    }, 2000);
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (
        !["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.type
        )
      ) {
        alert(
          "Invalid file format. Please upload a JPEG, JPG, WEBP or PNG image."
        );
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert("File size exceeds 5MB limit.");
        return;
      }

      setIsUploading(true);

      try {
        const imageUrl = await uploadImage(file);
        if (imageUrl) {
          onImageChange(imageUrl);
          const previewUrl = URL.createObjectURL(file);
          setPreviewImage(previewUrl);
          setShowImage(true); // Mostrar la imagen
          setTimeout(() => {
            setShowImage(false); // Ocultar la imagen después de 4 segundos
          }, 2000);
        } else {
          alert("Image upload failed. Please, try again later.");
        }
      } catch (error) {
        alert("Error uploading file. Please try again later.", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className={style.divSelectImage}>
      <p className={style.error}>*Only: .jpg .jpeg .png .webp</p>
      <input
        id="image"
        name="image"
        type="file"
        ref={fileInput}
        onChange={handleFileChange}
        className={style.archivo}
      />
      {isUploading && <p className={style.cargandoImage}>Cargando Imagen...</p>}

      {showImage && previewImage && !isUploading && (
        <div className={style.divConImagen}>
          <img src={previewImage} alt="driver" className={style.imagen} />
        </div>
      )}
      {previewImage && !showImage && (
        <button type="button" onClick={seeImage} className={style.link}>
          Show image
        </button>
      )}
    </div>
  );
};

export default ImageHandler;
