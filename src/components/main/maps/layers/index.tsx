// App imports
import { Circle } from './circle';
import { Mask } from './mask';
import { Parcels } from './parcels';

export const Layers = () => {
	return (
		<>
			<Circle/>
			<Mask/>
			<Parcels/>
		</>
	)
}

Layers.displayName="Layers";