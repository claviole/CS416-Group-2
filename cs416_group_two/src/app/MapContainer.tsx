import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { db } from '../../firebaseConfig'; // Adjust the import path as necessary
import { getDocs } from 'firebase/firestore';
import EditOptions from './EditOptions'; // Make sure the path is correct

const mapContainerStyle = {
    width: '100%', // Fill the width of its parent
    height: '100%', // Fill the height of its parent
};

// Use the environment variable for the Google Maps API key
const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

interface MapContainerProps {
    mapObject: {
        center?: {
            lat: number,
            lng: number,
        },
        zoom?: number,
        mapTypeId?: google.maps.MapTypeId | string, // Optional map type ID
        bounds?: {
            sw: { lat: number, lng: number }, // Southwest corner
            ne: { lat: number, lng: number }, // Northeast corner
        };
    };
    isLoggedIn: boolean; // Added isLoggedIn prop
}

const MapContainer: React.FC<MapContainerProps> = ({ mapObject, isLoggedIn }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey,
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [showEditOptions, setShowEditOptions] = useState(false); // State to manage EditOptions visibility

    const onLoad = useCallback(function callback(map: google.maps.Map) {
        if (mapObject.bounds) {
            const bounds = new google.maps.LatLngBounds(
                mapObject.bounds.sw,
                mapObject.bounds.ne
            );
            map.fitBounds(bounds);
        }
        setMap(map);
    }, [mapObject]);

    const onUnmount = useCallback(function callback(map: google.maps.Map) {
        setMap(null);
    }, []);

    // Toggle the visibility of EditOptions
    const toggleEditOptions = () => setShowEditOptions(!showEditOptions);

    return isLoaded ? (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                onLoad={onLoad}
                onUnmount={onUnmount}
                mapTypeId={mapObject.mapTypeId} // Set the map type ID if provided
            >
                {/* Additional map features like markers can be added here */}
            </GoogleMap>
            {isLoggedIn && (
                <button
                    style={{ position: 'absolute', top: '-20px', right: '10px', zIndex: 2 }}
                    onClick={toggleEditOptions}
                >
                    Edit Map
                </button>
            )}
            {showEditOptions && <EditOptions onClose={toggleEditOptions} onAddBuilding={() => { console.log('Add building'); }} />}
        </div>
    ) : <></>;
};

export default MapContainer;