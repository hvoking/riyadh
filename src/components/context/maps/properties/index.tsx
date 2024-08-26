// React imports
import { useState, useEffect, useRef, useContext, createContext } from 'react';

// App imports
import * as Locations from './locations';

const MapPropertiesContext: React.Context<any> = createContext(null);

export const useMapProperties = () => {
	return (
		useContext(MapPropertiesContext)
	)
}

export const MapPropertiesProvider = ({children}: any) => {
	const mapRef = useRef<any>();

	const [ cityName, setCityName ] = useState<any>("riyadh");
	const [ viewport, setViewport ] = useState(Locations.riyadh);
	
	const [ currentBasemap, setCurrentBasemap ] = useState("https://basemaps.cartocdn.com/gl/positron-gl-style/style.json");
	const [ activeBasemap, setActiveBasemap ] =  useState(false);

	const mapStyle = !activeBasemap ? "mapbox://styles/mapbox/satellite-v9" : currentBasemap;

	const [ marker, setMarker ] = useState({ 
		latitude: viewport.latitude, 
		longitude: viewport.longitude 
	});

	useEffect(() => {
		mapRef.current?.flyTo({
			center: [viewport.longitude, viewport.latitude],
			zoom: viewport.zoom,
			pitch: viewport.pitch,
			bearing: viewport.bearing,
			duration: 4000, 
			essential: true,
		});
	}, [viewport]);
	
	return (
		<MapPropertiesContext.Provider value={{
			mapStyle,
			cityName, setCityName, 
			mapRef, Locations, 
			viewport, setViewport, 
			activeBasemap, setActiveBasemap,
			currentBasemap, setCurrentBasemap,
			marker, setMarker
		}}>
			{children}
		</MapPropertiesContext.Provider>
	)
}

MapPropertiesContext.displayName = "MapPropertiesContext";