import { useState } from 'react';
import axios from 'axios';
import fileIcon from '../../assets/file.png';
import './FileUploader.css'

const FileUploader = (prop: any) => {

  const [files, setFiles] = useState<File[]>([]);

  const [response, setresponse] = useState<String>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      
      setFiles(Array.from(selectedFiles));


    }
  };

  const uploadOnClick = async () => {
    if (files.length > 0) {
      
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('file', file);
      });


      const res = await axios.post('http://localhost:8080/NIC/addNicFile', formData);

      setresponse(res.data.response.status);
      window.alert(res.data.response.status);
      prop.handleFileChanges(Array.from(files).map((file) => file.name));

      setFiles([]);

    } else {
      window.alert("Please Upload a file")
    }


  }

  return (
    <div className="container">
      <div className="wrapper">
        <header>File Uploader</header>
        <form>
          <label className="upload-button">
            Click here to upload files
            <input
              type="file"
              accept=".txt,.csv"
              onChange={handleFileChange}
              multiple
              style={{ display: "none" }}
            />
          </label>
        </form>
        <section className="uploaded-area">
          {files.length > 0 && (
            <div>
              <ul>
                {files.map((file, index) => (
                  <li className='li-element' key={index}><img src={fileIcon} />{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
        <button onClick={uploadOnClick} className="upload-btn">Upload</button>
      </div>
    </div>
  );
};

export default FileUploader;
