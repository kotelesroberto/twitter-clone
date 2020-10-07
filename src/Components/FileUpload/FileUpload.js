import React, { useRef } from "react";
import "./FileUpload.scss";

const FileUpload = () => {
  //   referencing to image DOM element and to thumbnail
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;

    console.log(e.target.files);
    if (file) {
      console.log(uploadedImage);

      const { current } = uploadedImage;
      const reader = new FileReader();

      current.file = file;

      console.log("current", current);

      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fileUpload">
      <div className="fileUpload__container">
        <input
          type="file"
          accept="image/*"
          multiple={true}
          ref={imageUploader}
          onChange={handleImageUpload}
        />

        <div
          className="fileUpload__thumbContainer"
          onClick={() => imageUploader.current.click()}
        >
          <img ref={uploadedImage} />
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
