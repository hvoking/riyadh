// App imports
import './styles.scss';

// Third party imports
import { NavigationControl, FullscreenControl } from 'react-map-gl';

export const Navigation = () => {
	return (
		<>
			<NavigationControl/>
			<FullscreenControl/>
		</>
	)
}

Navigation.displayName="Navigation";