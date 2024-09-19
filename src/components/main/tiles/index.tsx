// Third-party imports
import { Source, Layer, LayerProps } from 'react-map-gl';

export const Tiles = () => {
	const url = `https://tiles.suhail.ai/maps/riyadh/{z}/{x}/{y}.vector.pbf?`;

	const parcelLayer: LayerProps = {
		id: 'parcel',
		source: 'tiles',
		'source-layer': 'parcels',
		type: 'fill',
		paint: {
			'fill-opacity': 0,
			'fill-color': 'rgba(255, 255, 255, 1)',
		},
	};

	const parcelLineLayer: LayerProps = {
		id: 'parcel-line',
		source: 'tiles',
		'source-layer': 'parcels',
		type: 'line',
		minzoom: 13,
		maxzoom: 22,
		paint: {
			'line-color': 'rgba(255, 255, 255, 1)',
			'line-opacity': 0,
			'line-width': 4,
		},
	};

	const parcelHoverFillLayer: LayerProps = {
		id: 'parcel-hover-fill',
		source: 'tiles',
		'source-layer': 'parcels',
		type: 'fill',
		minzoom: 13,
		maxzoom: 22,
		paint: {
			'fill-color': 'rgba(255, 255, 255, 1)',
			'fill-opacity': 0.1,
		},
	};

	return (
		<Source 
			id="raster-style" 
			type="vector" 
			tiles={[url]}
		>
			<Layer {...parcelLayer}/>
		</Source>
	)
}

Tiles.displayName = "Tiles";