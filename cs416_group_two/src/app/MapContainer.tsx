import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { db } from "../../firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import EditOptions from "./EditOptions";
import BuildingDetailsModal from "./BuildingDetailsModal";

const mapContainerStyle = {
	width: "100%",
	height: "100%",
};

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

interface MapContainerProps {
	mapObject: {
		center?: {
			lat: number;
			lng: number;
		};
		zoom?: number;
		mapTypeId?: google.maps.MapTypeId | string;
		bounds?: {
			sw: { lat: number; lng: number };
			ne: { lat: number; lng: number };
		};
	};
	isLoggedIn: boolean;
}

interface LatLng {
	lat: number;
	lng: number;
}

interface Bounds {
	ne: LatLng;
	sw: LatLng;
}

interface Building {
	id: string;
	name: string;
	description: string;
	imageUrl: string;
	bounds: Bounds;
}

const MapContainer: React.FC<MapContainerProps> = ({
	mapObject,
	isLoggedIn,
}) => {
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey,
		libraries: ["places"], // Removed 'drawing' since it's no longer needed
	});

	const [map, setMap] = useState<google.maps.Map | null>(null);
	const [showEditOptions, setShowEditOptions] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [showBuildingDetailsModal, setShowBuildingDetailsModal] =
		useState(false);
	const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(
		null
	);
	const [isNewBuilding, setIsNewBuilding] = useState(false);

	const onLoad = useCallback(
		(map: google.maps.Map) => {
			const bounds = new google.maps.LatLngBounds(
				mapObject.bounds?.sw,
				mapObject.bounds?.ne
			);
			map.fitBounds(bounds);
			setMap(map);
		},
		[mapObject.bounds]
	);

	const onUnmount = useCallback(() => {
		setMap(null);
	}, []);

	useEffect(() => {
		const checkAdminStatus = async () => {
			const adminRef = collection(db, "admins");
			const querySnapshot = await getDocs(adminRef);
			const admins = querySnapshot.docs.map((doc) => doc.data().email);
			setIsAdmin(admins.includes("your-user-email@example.com")); // Replace with dynamic user email
		};

		checkAdminStatus();
	}, []);

	useEffect(() => {
		if (!map) return;

		const fetchBuildings = async () => {
			const querySnapshot = await getDocs(collection(db, "buildings"));
			const buildings: Building[] = [];
			querySnapshot.forEach((doc) => {
				const data = doc.data();
				buildings.push({
					id: doc.id,
					name: data.name,
					description: data.description,
					imageUrl: data.imageUrl,
					bounds: {
						ne: data.bounds.ne,
						sw: data.bounds.sw,
					},
				});
			});
			buildings.forEach((building) => {
				const buildingOverlay = new google.maps.Rectangle({
					strokeColor: "#FF0000",
					strokeOpacity: 0.8,
					strokeWeight: 2,
					fillColor: "#FF0000",
					fillOpacity: 0.1,
					map,
					bounds: new google.maps.LatLngBounds(
						building.bounds.sw,
						building.bounds.ne
					),
				});

				google.maps.event.addListener(buildingOverlay, "click", () => {
					setSelectedBuilding(building);
					setShowBuildingDetailsModal(true);
					setIsNewBuilding(false);
				});
			});
		};

		fetchBuildings();
	}, [map]);

	const deleteBuilding = async (id: string) => {
		await deleteDoc(doc(db, "buildings", id));
		setShowBuildingDetailsModal(false);
		// Additional logic to remove the overlay from the map if needed
	};

	const toggleEditOptions = () => setShowEditOptions(!showEditOptions);

	const handleCloseEditOptions = () => {
		setShowEditOptions(false);
	};

	return isLoaded ? (
		<div style={{ position: "relative", width: "100%", height: "100%" }}>
			<GoogleMap
				mapContainerStyle={mapContainerStyle}
				center={mapObject.center}
				zoom={mapObject.zoom}
				onLoad={onLoad}
				onUnmount={onUnmount}
				mapTypeId={mapObject.mapTypeId}
			>
				{/* Additional map features like markers can be added here */}
			</GoogleMap>
			{isLoggedIn && (
				<button
					style={{
						position: "absolute",
						top: "-30px",
						right: "10px",
						zIndex: 2,
					}}
					onClick={toggleEditOptions}
				>
					Edit Map
				</button>
			)}
			{showEditOptions && <EditOptions onClose={handleCloseEditOptions} />}
			{showBuildingDetailsModal && selectedBuilding && (
				<BuildingDetailsModal
					building={selectedBuilding}
					onClose={() => setShowBuildingDetailsModal(false)}
					onDelete={() => deleteBuilding(selectedBuilding.id)}
					isAdmin={isAdmin}
					isNewBuilding={isNewBuilding}
				/>
			)}
		</div>
	) : (
		<></>
	);
};

export default MapContainer;
