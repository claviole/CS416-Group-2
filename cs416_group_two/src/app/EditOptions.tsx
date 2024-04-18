import React, { useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

interface EditOptionsProps {
	onClose: () => void;
}

const EditOptions: React.FC<EditOptionsProps> = ({ onClose }) => {
	const [showAddBuildingForm, setShowAddBuildingForm] = useState(false);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [neLat, setNeLat] = useState("");
	const [neLng, setNeLng] = useState("");
	const [swLat, setSwLat] = useState("");
	const [swLng, setSwLng] = useState("");

	const handleAddBuilding = async () => {
		const newBuilding = {
			name,
			description,
			imageUrl,
			bounds: {
				ne: { lat: parseFloat(neLat), lng: parseFloat(neLng) },
				sw: { lat: parseFloat(swLat), lng: parseFloat(swLng) },
			},
		};
		try {
			await addDoc(collection(db, "buildings"), newBuilding);
			alert("Building added successfully!");
			setShowAddBuildingForm(false); // Close form on success
		} catch (error) {
			console.error("Error adding document: ", error);
			alert("Error adding building.");
		}
	};

	return (
		<div
			style={{
				position: "fixed", // Use fixed positioning
				top: "50%", // Center vertically
				left: "50%", // Center horizontally
				transform: "translate(-50%, -50%)", // Adjust to perfectly center the modal
				zIndex: 1000, // Ensure it's above other content
				backgroundColor: "white",
				boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
				borderRadius: "8px",
				padding: "20px",
				display: "flex",
				flexDirection: "column",
				width: "300px",
				// Optionally, you can add a max-height and overflow-y to handle modal content scrolling
				maxHeight: "90vh",
				overflowY: "auto",
			}}
		>
			{showAddBuildingForm ? (
				<div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
					<input
						type="text"
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						style={{
							padding: "10px",
							borderRadius: "5px",
							border: "1px solid #ccc",
						}}
					/>
					<textarea
						placeholder="Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						style={{
							padding: "10px",
							borderRadius: "5px",
							border: "1px solid #ccc",
							height: "100px",
						}}
					/>
					<input
						type="text"
						placeholder="Image URL"
						value={imageUrl}
						onChange={(e) => setImageUrl(e.target.value)}
						style={{
							padding: "10px",
							borderRadius: "5px",
							border: "1px solid #ccc",
						}}
					/>
					<input
						type="text"
						placeholder="NE Latitude"
						value={neLat}
						onChange={(e) => setNeLat(e.target.value)}
						style={{
							padding: "10px",
							borderRadius: "5px",
							border: "1px solid #ccc",
						}}
					/>
					<input
						type="text"
						placeholder="NE Longitude"
						value={neLng}
						onChange={(e) => setNeLng(e.target.value)}
						style={{
							padding: "10px",
							borderRadius: "5px",
							border: "1px solid #ccc",
						}}
					/>
					<input
						type="text"
						placeholder="SW Latitude"
						value={swLat}
						onChange={(e) => setSwLat(e.target.value)}
						style={{
							padding: "10px",
							borderRadius: "5px",
							border: "1px solid #ccc",
						}}
					/>
					<input
						type="text"
						placeholder="SW Longitude"
						value={swLng}
						onChange={(e) => setSwLng(e.target.value)}
						style={{
							padding: "10px",
							borderRadius: "5px",
							border: "1px solid #ccc",
						}}
					/>
					<button
						onClick={handleAddBuilding}
						style={{
							padding: "10px",
							borderRadius: "5px",
							backgroundColor: "#4CAF50",
							color: "white",
							border: "none",
							cursor: "pointer",
						}}
					>
						Submit
					</button>
					<button
						onClick={() => setShowAddBuildingForm(false)}
						style={{
							padding: "10px",
							borderRadius: "5px",
							backgroundColor: "#f44336",
							color: "white",
							border: "none",
							cursor: "pointer",
						}}
					>
						Cancel
					</button>
				</div>
			) : (
				<>
					<button
						onClick={() => setShowAddBuildingForm(true)}
						style={{
							padding: "10px",
							borderRadius: "5px",
							backgroundColor: "#008CBA",
							color: "white",
							border: "none",
							cursor: "pointer",
						}}
					>
						Add Building
					</button>
					<button
						onClick={() => {
							console.log("Edit option 2");
						}}
						style={{
							padding: "10px",
							borderRadius: "5px",
							backgroundColor: "#e7e7e7",
							color: "black",
							border: "none",
							cursor: "pointer",
						}}
					>
						Edit Option 2
					</button>
					<button
						onClick={() => {
							console.log("Edit option 3");
						}}
						style={{
							padding: "10px",
							borderRadius: "5px",
							backgroundColor: "#e7e7e7",
							color: "black",
							border: "none",
							cursor: "pointer",
						}}
					>
						Edit Option 3
					</button>
					<button
						onClick={onClose}
						style={{
							padding: "10px",
							borderRadius: "5px",
							backgroundColor: "#555555",
							color: "white",
							border: "none",
							cursor: "pointer",
						}}
					>
						Close
					</button>
				</>
			)}
		</div>
	);
};
export default EditOptions;
