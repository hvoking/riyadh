// React imports
import { useState, useEffect, useMemo, useContext, createContext } from 'react';

// Context imports
import { useMapProperties } from '../maps/properties';
import { useCircle } from '../circle';

// Third-party imports
import * as turf from '@turf/turf';

const MaskContext: React.Context<any> = createContext(null)

export const useMask = () => {
	return (
		useContext(MaskContext)
	)
}

export const MaskProvider = ({children}: any) => {
	const { mapRef } = useMapProperties();
	const { circleGeometry } = useCircle();

	const [mapFeatures, setMapFeatures] = useState([]);
	const [activeFeatures, setActiveFeatures] = useState(false);

	useEffect(() => {
		const map = mapRef.current;
		if (!map) return;
		const onData = (e: any) => {
	        if (e.tile) {
	            setActiveFeatures((prev) => !prev);
	        }
	    };

	    map.on('data', onData);

	    return () => {
	        map.off('data', onData);
	    };
	}, [mapRef.current]);

	useEffect(() => {
		const map = mapRef.current;
		if (!map) return;
		setMapFeatures(map.queryRenderedFeatures());
	}, [activeFeatures, mapRef.current]);

	const maskProperties = useMemo(() => {
	    return mapFeatures.filter((item: any) => {
	        if (item.source === 'raster-style') {
	            const featureGeometry = item.geometry;
	            const featureCentroid = turf.centroid(featureGeometry);
	            return turf.booleanPointInPolygon(featureCentroid, circleGeometry);
	        }
	    });
	}, [mapFeatures, circleGeometry]);

	return (
		<MaskContext.Provider value={{ maskProperties }}>
			{children}
		</MaskContext.Provider>
	)
}

MaskContext.displayName = "MaskContext";