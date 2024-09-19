// App imports
import { Switch } from './switch';
import './styles.scss';

export const Wrapper = ({ children }: any) => {
	return (
		<div className="map-container">
			{children}
			<Switch/>
		</div>
	)
}

Wrapper.displayName="Wrapper";