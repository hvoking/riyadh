// App context
import './styles.scss';

// Context imports
import { useMask } from '../../../../context/mask';

// Third-party imports
import { Source, Layer } from 'react-map-gl';
import * as d3 from 'd3';

const hexToRgba = (hex: string, alpha: number = 1) => {
	if (hex) {
	    const r = parseInt(hex.slice(1, 3), 16);
	    const g = parseInt(hex.slice(3, 5), 16);
	    const b = parseInt(hex.slice(5, 7), 16);
	    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return `rgba(255, 255, 255, 0.2)`;
};

export const Mask = () => {
	const { maskProperties } = useMask();

	if (!maskProperties) return <></>;

	const scaleLinear = d3.scaleLinear()
		.range([50, 100])
		.domain([0, 10000])

	// Filter by fill color
	const features = maskProperties.filter((item: any) => {
        const stringList = Object.keys(item.layer.paint);
        return stringList.includes("fill-color");
    });

	const updatedFeatures = features.map((item: any) => {
		const zoningColor = hexToRgba(item.properties.zoning_color);
		const priceOfMeter = scaleLinear(item.properties.price_of_meter);

		return {
			type: "Feature",
			geometry: item.geometry,
			properties: {
				...item.properties, 
				'zoning-color': zoningColor,
				'price-of-meter': priceOfMeter
			}
		};
	});
		
	const geoJsonData: any = {
        "type": "FeatureCollection",
        "features": updatedFeatures
    };

	// Function to download geoJsonData as a file
	const downloadGeoJson = () => {
		const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(geoJsonData));
		const downloadAnchorNode = document.createElement('a');
		downloadAnchorNode.setAttribute("href", dataStr);
		downloadAnchorNode.setAttribute("download", "data.geojson");
		document.body.appendChild(downloadAnchorNode); // required for firefox
		downloadAnchorNode.click();
		downloadAnchorNode.remove();
	};

	return (
		<>
			<button className="download-button" onClick={downloadGeoJson}>Download GeoJSON</button>
			<Source id="polygon-data" type="geojson" data={geoJsonData}>
		        <Layer
		          id="extruded-polygons"
		          type="fill-extrusion"
		          paint={{
		            'fill-extrusion-color': ['get', 'zoning-color'],
		            'fill-extrusion-height': ['get', 'price-of-meter'],
		            'fill-extrusion-base': 0,
		            'fill-extrusion-opacity': 1
		          }}
		        />
		    </Source>
		</>
	);
};

Mask.displayName = "Mask";
