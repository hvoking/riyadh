// App imports
import { MapEventsProvider } from './events';
import { MapPropertiesProvider } from './properties';

export const MapsProvider = ({ children }: any) => {
	return (
		<MapPropertiesProvider>
		<MapEventsProvider>
			{children}
		</MapEventsProvider>
		</MapPropertiesProvider>
	)
}