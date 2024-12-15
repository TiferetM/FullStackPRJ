import React, { useState } from 'react';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../services/fireBaseConfig';

function ImageUpload({ type, url, afterUpload = null, parametersAfterUpload = null }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // יצירת תצוגה מקדימה של התמונה שנבחרה
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) return;

    // יצירת רפרנס לקובץ ב-Firebase Storage
    const storageRef = ref(storage, `uploads/${selectedFile.name}`);
    
    try {
      // העלאת הקובץ ל-Firebase Storage
      await uploadBytes(storageRef, selectedFile);
      setUploadMessage('File uploaded successfully!');
      if (afterUpload) afterUpload(parametersAfterUpload);
    } catch (error) {
      setUploadMessage('Error uploading file. Please try again.');
      console.error(error);
    }
  };

  const handleRemove = (e) => {
    e.preventDefault();
    setSelectedFile(null);
    setPreview(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {!selectedFile && <input type="file" onChange={handleFileChange} />}
        {selectedFile && (
          <>
            <button onClick={handleRemove}><i className="fa-solid fa-trash-can"></i></button>
            <button type="submit"><i className="fa-solid fa-arrow-up-from-bracket"></i></button>
          </>
        )}
      </form>

      {uploadMessage && <p>{uploadMessage}</p>} {/* הודעת העלאה */}
      
      {preview && <img src={preview} alt="Selected" style={{ width: '200px', height: '200px' }} />}
    </div>
  );
}

export default ImageUpload;
