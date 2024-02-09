import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import styles, { layout } from "../style";


const UploadImageForm = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState({
    status: "",
    message: "",
    error: "",
  });

  const [showButtons, setShowButtons] = useState(false);
  const [educationMode, setEducationMode] = useState(false);
  const [businessMode, setBusinessMode] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const file = e.target.files[0];
    fileValidate(file);
    setImage(file);
    setShowButtons(false);
    setEducationMode(false);
    setBusinessMode(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
  
    const data = new FormData();
    data.append("file", image);
  
    axios.post("http://127.0.0.1:5000/upload", data)
      .then((response) => {
        if (response.status === 201) {
          setResponseMsg({
            status: response.data.status,
            message: response.data.message,
          });
          setTimeout(() => {
            setImage(null);
            setResponseMsg({});
            setLoading(false);
            setShowButtons(true);
          }, 1000);
  
          document.querySelector("#Upload").reset(); // Updated line
        }
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          console.log(error.response);
          if (error.response.status === 401) {
            alert("Invalid credentials");
          }
        }
        setLoading(false);
      });
  };

  const fileValidate = (file) => {
    if (
      file && (
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg"
      )
    ) {
      setResponseMsg({
        error: "",
      });
      return true;
    } else {
      setResponseMsg({
        error: "File type allowed only jpg, png, jpeg",
      });
      return false;
    }
  };

  const handleEducationMode = () => {
    setEducationMode(true);
    navigate('/EducationMode');
  };

  const handleBusinessMode = () => {
    setBusinessMode(true);
    navigate('/BusinessMode');
  };

  return (
    
    <div className="container mx-auto my-10 h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full p-8 rounded-md shadow-md flex flex-col items-center">
          <h1 className={styles.heading2} id="Upload">
            Upload a Photo <span className="text-gradient ">Here</span>
          </h1>

        {/* Instruction Tab */}
        <div className="mb-6 py-8">
          <h1 className={styles.heading3}>
            Instructions & Limitations
          </h1>
          <p className="text-gray-400">
            <br />Please follow the instructions below before uploading your photo:
          </p>
          <p className="text-white py-4">
            1. Upload image should be in the type of .png / .jpg / .jpeg <br></br>
            2. Dataset is working with 200 images, accuracy is still in the minimum condition <br />
            3. Only predicts 6 elements in HTML components <br />
            4. Try out with this sample image{" "}
            <a
              href="/imagecheck1.png"  
              download="sampleimage.png"
              className="text-blue-500 underline"
            >
              Download Sample Image
            </a>
          </p>
        </div>

        {/* Upload Form */}
        {responseMsg.status === "success" ? (
          <div className="alert alert-success">
            {responseMsg.message}
          </div>
        ) : responseMsg.status === "failed" ? (
          <div className="alert alert-danger">
            {responseMsg.message}
          </div>
        ) : (
          ""
        )}

        <form onSubmit={submitHandler} encType="multipart/form-data" className="w-full max-w-lg">

          <div className="mb-6">
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="mt-1 p-4 border rounded-md w-full text-gray-50"
            />
            <span className="text-red-500">
              {responseMsg.error}
            </span>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className={`bg-purple-500 hover:bg-purple-600 text-white py-4 px-6 rounded-md w-full ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              disabled={loading}
            >
              {loading ? (
                <span>
                  Uploading...{' '}
                  <i className="animate-spin inline-block h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></i>
                </span>
              ) : (
                "Upload"
              )}
            </button>
          </div>
        </form>

        {/* Mode Buttons */}
        {showButtons && (
          <div className="mt-6 space-x-4 max-w-full">
            <button
              onClick={handleEducationMode}
              className="bg-purple-500 hover:bg-purple-600 text-white py-4 px-6 rounded-md"
            >
              Education Mode
            </button>
            <button
              onClick={handleBusinessMode}
              className="bg-purple-500 hover:bg-purple-600 text-white py-4 px-6 rounded-md"
            >
              Business Mode
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadImageForm;