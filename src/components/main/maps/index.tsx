// App imports
import { Wrapper } from './wrapper';
import { Layers } from './layers';
import { Navigation } from './nav';

// Context imports
import { useMapProperties } from '../../context/maps/properties';
import { useMapEvents } from '../../context/maps/events';

// Third-party imports
import 'mapbox-gl/dist/mapbox-gl.css';
import { Map } from 'react-map-gl';

export const Maps = () => {
	const { viewport, mapRef, mapStyle } = useMapProperties();
    const { isDragging, onDragStart, onMouseMove, onDragEnd } = useMapEvents();

	return (
		<Wrapper>
			<Map
				ref={mapRef}
				initialViewState={viewport}
				mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} 
				mapStyle={mapStyle}
				onMouseDown={onDragStart}
                onMouseMove={onMouseMove}
                onMouseUp={onDragEnd}
                onTouchStart={onDragStart}
                onTouchMove={onMouseMove}
                onTouchEnd={onDragEnd}
                dragPan={!isDragging}
			>	
				<Layers/>
				<Navigation/>
			</Map>
		</Wrapper>
	)
}