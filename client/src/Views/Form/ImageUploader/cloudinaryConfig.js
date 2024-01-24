export const uploadImage = async (file) => {
  const cloudName = import.meta.env.VITE_APP_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_APP_UPLOAD_PRESET;

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    return data.secure_url;
  } catch (error) {
    alert("Error uploading file to Cloudinary:", error);
    throw error;
  }
};
