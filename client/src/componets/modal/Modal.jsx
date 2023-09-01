import React, { useEffect, useState } from "react";
import "./Modal.css";
import { LoadingBar } from "../loadingBar/LoadingBar";
import axios from "axios";
import { API_URL } from "../../api";

export const Modal = ({ children }) => {
	const [image, setImage] = useState({});

	const [tempFile, setTempFile] = useState({
		name: "",
		preview: "",
		status: false,
	});
	const [fetchedImage, setFetchedImage] = useState([]);
	const [showLoadingBar, setShowLoadingBar] = useState(false);

	const fetchImages = async () => {
		try {
			const response = await axios(`${API_URL}/api/imageList`);
			setFetchedImage(response.data.imageList);
			console.log("Images fetched from DB");
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchImages();
	}, []);

	const handleImageSelected = (event) => {
		setImage(event.target.files[0]);
		setTempFile((prev) => ({
			...prev,
			preview: URL.createObjectURL(event.target.files[0]),
			name: event.target.files[0].name,
			status: true,
		}));
	};

	const handleUpload = async () => {
		const formData = new FormData();
		formData.append("upload_image", image);
		formData.append("user-name", "Aswinkumar");
		setShowLoadingBar(true);
		console.log("image==", image);
		console.log("formData==", formData);

		try {
			const response = await axios(`${API_URL}/api/imageList/upload`, {
				method: "POST",
				headers: {
					"Content-Type": "multipart/form-data",
				},
				data: formData,
			});
			console.log(response.data);
			// setFetchedImage(response.data.imageList);   //couldn't receiving the update imageList due to async behaviour

			setTempFile((prev) => ({
				...prev,
				status: false,
			}));
		} catch (error) {
			console.log(error);
		}
		// To refresh the page 2000ms after uploading image. so it auto fetch imgage with help of useEffect()
		setTimeout(() => {
			window.location.reload();
		}, 1000);
	};

	return (
		<div className="modal-container">
			<div className="add-img">
				<label htmlFor="file-upload" className="icon">
					+
					<input type="file" accept="image/*" id="file-upload" onChange={handleImageSelected} />
				</label>
				<div className="img-name">{tempFile.status && tempFile.name}</div>
				{tempFile.name && tempFile.status && (
					<button className="upload-file" onClick={handleUpload}>
						upload
					</button>
				)}

				<div className="img-prev">
					{tempFile.preview && tempFile.status && <img src={tempFile.preview} alt="selected img" />}
				</div>
			</div>
			<div className="loading-bar">{tempFile.name && <LoadingBar showLoadingBar={showLoadingBar} />}</div>

			<div className="image-display">
				{fetchedImage?.map((data) => {
					return <img key={data.id} src={`${API_URL}/images/${data.image}`} alt="img" />;
				})}
			</div>
		</div>
	);
};
