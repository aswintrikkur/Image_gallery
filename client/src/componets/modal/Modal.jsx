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
	});
	const [fetchedImage, setFetchedImage] = useState([]);

	const fetchImages = async () => {
        try {
            const response = await axios(`${API_URL}/api/imageList`);
            setFetchedImage(response.data);                
        } catch (error) {
            console.log(error);
        }
	};
    useEffect(() => {
      fetchImages();
    
    }, [])
    

	const handleImageSelected = (event) => {
		setImage(event.target.files[0]);
		setTempFile((prev) => ({
			...prev,
			preview: URL.createObjectURL(event.target.files[0]),
			name: event.target.files[0].name,
		}));
	};

	const handleUpload = async () => {
		const formData = new FormData();
		formData.append("upload_image", image);
		// formData.append("user-name", "Aswinkumar");

		console.log("image==", image);
		console.log("formData==", formData);

        try {
            const response= await axios(`${API_URL}/api/upload`,{
                method:'POST',
                headers:{
                    "Content-Type": "multipart/form-data"
                },
                data: formData
            });
            console.log(response.data);
                
        } catch (error) {
            console.log(error);
        }
	};

	return (
		<div className="modal-container">
			<div className="add-img">
				<label htmlFor="file-upload" className="icon">
					+
					<input type="file" accept="image/*" id="file-upload" onChange={handleImageSelected} />
				</label>
				<div className="img-name">{tempFile.name}</div>
				{tempFile.name && (
					<button className="upload-file" onClick={handleUpload}>
						upload
					</button>
				)}

				<div className="img-prev">{tempFile.preview && <img src={tempFile.preview} alt="selected img" />}</div>
			</div>
			<div className="loading-bar">{tempFile.name && <LoadingBar />}</div>

			<div className="image-display">
				{fetchedImage?.map((data) => {
					return <img key={data.id} src={data.image} alt="img" />;
				})}
			</div>
		</div>
	);
};
