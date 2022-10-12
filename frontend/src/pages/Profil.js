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
import useDrivePicker from 'react-google-drive-picker'
import { patchUser } from "../utils";
import { useCookies } from "react-cookie";

function Profil() {
  const [openPicker, authResponse] = useDrivePicker();  
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const { user, setUser } = React.useContext(UserContext);
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [selectedFileAvatar, setSelectedFileAvatar] = React.useState();
	const [isSelectedAvatar, setIsSelectedAvatar] = React.useState(false);
  const [selectedFileCV, setSelectedFileCV] = React.useState();
	const [isSelectedCV, setIsSelectedCV] = React.useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();


  const changeHandlerAvatar = (event) => {
		setSelectedFileAvatar(event.target.files[0]);
		setIsSelectedAvatar(true);
	};

	const handleSubmissionAvatar =  async () => {
		const formData = new FormData();

		await formData.append('source', selectedFileAvatar);
    console.log(selectedFileAvatar);
    console.log(formData);

		fetch(
			'https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5',
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
        patchUser(cookies.auth_token,user._id,{avatarUrl:  result.image.image.url});
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  

  const changeHandlerCV = (event) => {
		setSelectedFileCV(event.target.files[0]);
		setIsSelectedCV(true);
	};

	const handleSubmissionCV =  async () => {
		const formData = new FormData();

		await formData.append('source', selectedFileCV);
    console.log(selectedFileCV);
    console.log(formData);

		fetch(
			'https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5',
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
        patchUser(cookies.auth_token,user._id,{cvUrl:  result.image.image.url});
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

  return (<>
    <div>
      <h1>Avatar</h1>
      {user.avatarUrl === undefined? <h2>Vous n'avez pas encore d'avatar</h2>: <img src={user.avatarUrl} height={200}></img>}
			<input type="file" name="file" onChange={changeHandlerAvatar} />
			{isSelectedAvatar ? (
				<div>
					<p>Filename: {selectedFileAvatar.name}</p>
					<p>Filetype: {selectedFileAvatar.type}</p>
					<p>Size in bytes: {selectedFileAvatar.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFileAvatar.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Choisissez votre nouvel avatar</p>
			)}
			<div>
				<button onClick={handleSubmissionAvatar}>Je change mon avatar</button>
			</div>
		</div>
    {/* <button onClick={() => {handleDownload('https://arxiv.org/pdf/quant-ph/0410100.pdf', 'test-download.pdf')}}>Download CV</button>
  <PDFViewer
      document={{
        url: 'https://arxiv.org/pdf/quant-ph/0410100.pdf',
      }}
    />
    <Link to='https://arxiv.org/pdf/quant-ph/0410100.pdf' target="_blank" download>Doawnload</Link> */}
    <div>
      <h1>CV</h1>
      {user.cvUrl === undefined ? <h2>Vous n'avez pas encore de cv</h2>: <img src={user.cvUrl} ></img>}
			<input type="file" name="file" onChange={changeHandlerCV} />
			{isSelectedAvatar ? (
				<div>
					<p>Filename: {selectedFileAvatar.name}</p>
					<p>Filetype: {selectedFileAvatar.type}</p>
					<p>Size in bytes: {selectedFileAvatar.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFileAvatar.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Choisissez votre nouveau CV</p>
			)}
			<div>
				<button onClick={handleSubmissionCV}>Je change de CV</button>
			</div>
		</div>
    </>
  );
}

export default Profil;
