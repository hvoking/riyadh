// App imports
import { Wrapper } from './wrapper';
import { Tiles } from './tiles';
import { Layers } from './layers';
import { Navigation } from './nav';
import { Avatar } from './avatar';
import './styles.scss';

// Context imports
import { useMapProperties } from '../context/maps/properties';
import { useMapEvents } from '../context/maps/events';

// Third-party imports
import 'mapbox-gl/dist/mapbox-gl.css';
import { Map } from 'react-map-gl';

export const Main = () => {
	const { viewport, mapRef, mapStyle } = useMapProperties();
    const { isDragging, onDragStart, onMouseMove, onDragEnd } = useMapEvents();

	return (
		<div className="main">
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
					<Tiles/>
					<Layers/>
					<Navigation/>
					<Avatar/>
				</Map>
			</Wrapper>
		</div>
	)
}

Main.displayName="Main";