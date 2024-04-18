import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

interface Building {
	id: string;
	name: string;
	description: string;
	imageUrl: string;
}

interface BuildingDetailsModalProps {
	building: Building;
	onClose: () => void;
	onDelete: () => void;
	onSave?: (name: string, description: string, imageUrl: string) => void;
	isAdmin: boolean;
	isNewBuilding: boolean;
}

const BuildingDetailsModal: React.FC<BuildingDetailsModalProps> = ({
	building,
	onClose,
	onDelete,
	onSave,
	isNewBuilding,
}) => {
	const handleDelete = () => {
		const isConfirmed = window.confirm(
			"Are you sure you want to delete this building?"
		);
		if (isConfirmed) {
			onDelete(); // Only call onDelete if the user confirmed
		}
	};
	const [name, setName] = useState(building.name);
	const [description, setDescription] = useState(building.description);
	const [imageUrl, setImageUrl] = useState(building.imageUrl);
	const [isAdmin, setIsAdmin] = useState(false);
	const currentUser = auth.currentUser; // Directly use the auth instance imported

	useEffect(() => {
		if (isNewBuilding) {
			setName("");
			setDescription("");
			setImageUrl("");
		} else {
			setName(building.name);
			setDescription(building.description);
			setImageUrl(building.imageUrl);
		}
	}, [building, isNewBuilding]);

	useEffect(() => {
		const checkAdminStatus = async () => {
			if (currentUser) {
				const adminQuery = query(
					collection(db, "admins"),
					where("email", "==", currentUser.email)
				);
				const querySnapshot = await getDocs(adminQuery);
				setIsAdmin(!querySnapshot.empty); // Set isAdmin true if the user is found in the admins collection
			}
		};

		checkAdminStatus();
	}, [currentUser]);

	return (
		<div
			style={{
				position: "fixed",
				top: "50%",
				left: "2%",
				transform: "translateY(-50%)",
				width: "300px",
				minHeight: "60%",
				backgroundColor: "#1a1a1a",
				padding: "20px",
				borderRadius: "8px",
				boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
				color: "#f1c40f",
				display: "flex",
				flexDirection: "column",
				alignItems: "left",
				zIndex: 100,
				overflow: "auto",
			}}
		>
			<img
				src={imageUrl}
				alt="Building"
				style={{
					width: "100%",
					height: "200px",
					objectFit: "cover",
					marginBottom: "20px",
					borderRadius: "4px",
				}}
			/>
			<h2 style={{ color: "#f1c40f" }}>{name}</h2>
			<p style={{ color: "#ffffff" }}>{description}</p>

			<button
				onClick={onClose}
				style={{
					marginTop: "auto",
					padding: "10px 20px",
					borderRadius: "5px",
					backgroundColor: "#f1c40f",
					color: "#1a1a1a",
					border: "none",
					cursor: "pointer",
					fontWeight: "bold",
					margin: "10px 0",
				}}
			>
				Close
			</button>
			{isAdmin && (
				<button
					onClick={handleDelete}
					style={{
						padding: "10px 20px",
						borderRadius: "5px",
						backgroundColor: "#333333",
						color: "#f1c40f",
						border: "none",
						cursor: "pointer",
						fontWeight: "bold",
					}}
				>
					Delete Building
				</button>
			)}
		</div>
	);
};

export default BuildingDetailsModal;
