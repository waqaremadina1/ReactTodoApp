import React, { useState } from 'react';
import { filesize } from 'filesize';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../config/firebase';
import { notification } from 'antd'; // Import Ant Design's notification component

export default function Upload() {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState({});

  // Function to handle file upload
  const handleUpload = () => {
    if (!files?.length) {
      console.log("No files selected");
      return;
    }

    setIsUploading(true);
    const newProgress = {};
    files.forEach((file, index) => {
      const fileExt = file.name.split('.').pop();
      const randomId = Math.random().toString(36).slice(2);
      const imagesRef = ref(storage, `images/${randomId}.${fileExt}`);
      const uploadTask = uploadBytesResumable(imagesRef, file);

      newProgress[index] = 0;
      setProgress({ ...newProgress });

      // Monitor the upload progress
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const currentProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          newProgress[index] = currentProgress;
          setProgress({ ...newProgress });
        },
        (error) => {
          console.error(error);
          setIsUploading(false);
          // Show error notification on failure
          notification.error({
            message: 'Upload Failed',
            description: 'There was an issue with uploading your image.',
            placement: 'topRight',
          });
        },
        () => {
          // Reset the input field after upload completes
          if (files.length === index + 1) {
            setIsUploading(false);
            setFiles([]); // Clear the file input
            // Show success notification after upload
            notification.success({
              message: 'Upload Successful',
              description: 'Your image has been uploaded successfully!',
              placement: 'topRight', // Optional: Change notification position
            });
          }
        }
      );
    });
  };

  return (
    <div className="py-5">
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="text-center text-white">Upload Images</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <input
              type="file"
              className="form-control text-white"
              accept="image/*"
              onChange={(e) => setFiles(Array.from(e.target.files))}
              multiple
              style={{ borderRadius: '20px' }}
            />
            {files.length > 0 && (
              <p className="mb-0 text-white">
                {files.map((file) => (
                  <span key={file.name}>
                    {file.name} | Size: {filesize(file.size)}
                    <br />
                  </span>
                ))}
              </p>
            )}
          </div>
        </div>
        {isUploading && (
          <div className="row mt-3">
            <div className="col">
              {files.map((file, index) => (
                <div key={index} className="progress mb-2">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    aria-label="Example with label"
                    aria-valuenow={progress[index]}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: `${progress[index]}%` }}
                  >
                    {progress[index]}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="row my-3 text-end">
          <div className="col">
            <button
              className="btn btn-success"
              onClick={handleUpload}
              disabled={isUploading}
              style={{ fontWeight: 'bolder' }}
            >
              {!isUploading ? 'Upload' : <div className="spinner-border spinner-border-sm"></div>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
