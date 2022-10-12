/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import React from "react";

import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { useDropzone } from "react-dropzone";
import "./style.css";
import { UserContext } from '../contexts/user';
import { Document, Page } from 'react-pdf';
import PDFViewer from 'pdf-viewer-reactjs'
import { Link } from "react-router-dom";
import axios from 'axios'
import fileDownload from 'js-file-download'
// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

function Profil() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const { user, setUser } = React.useContext(UserContext);
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function handleDownload(url, filename){
    axios.get(url, {
      responseType: 'blob',
    })
    .then((res) => {
      fileDownload(res.data, filename)
    })
  }




  fetch('../ExamplePdf.pdf')
  .then(response => console.log(response.text()))
  .then(text => console.log(text))
  return (<>
    <div className="drag-area">
    <section className="container">
      <div {...getRootProps({className: "dropzone"})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <ul>{files}</ul>
      </aside>
    </section>
    <a href="../SignIn.png" download>Cliquez pour télécharger</a>
    
    </div>
    <button onClick={() => {handleDownload('https://arxiv.org/pdf/quant-ph/0410100.pdf', 'test-download.pdf')}}>Download CV</button>
  <PDFViewer
      document={{
        url: 'https://arxiv.org/pdf/quant-ph/0410100.pdf',
      }}
    />
    <Link to='https://arxiv.org/pdf/quant-ph/0410100.pdf' target="_blank" download>Doawnload</Link>
    </>
  );
}

export default Profil;
