import React, { useState } from 'react';

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Create a preview of the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);
    
    console.log('Uploading image...');
    
  };

  const handleRemove = async e => {
    e.preventDefault();
    console.log('Removing image...');
    setSelectedFile(null);
    setPreview(null);
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        {!selectedFile && <input type="file" onChange={handleFileChange} />}
        {selectedFile && (<><button onClick={handleRemove} ><i className="fa-solid fa-trash-can"></i></button>
        <button type="submit"><i className="fa-solid fa-arrow-up-from-bracket"></i></button></>)}
      </form>
      {preview && <img src={preview} alt="Selected" style={{ width: '200px', height: '200px' }} />}
    </div>
  );
}

export default ImageUpload;
