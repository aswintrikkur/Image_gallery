import React, { useEffect, useState } from "react";
import "./LoadingBar.css";

export const LoadingBar = ({ showLoadingBar }) => {
	const [width, setWidth] = useState(0);

	useEffect(() => {
		let loader = setInterval(() => {
			setWidth((prev) => prev + 5);
			console.log("loading animation...");
		}, 50);
		setTimeout(() => {
			clearInterval(loader);
			setWidth(0);
		}, 2000);
	}, []);

	return  <div className="loading-bar-container" style={{ width: `${width}%` }}></div>;
};
