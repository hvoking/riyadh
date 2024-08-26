import { CircleProvider } from './circle';
import { MaskProvider } from './mask';
import { MapsProvider } from './maps';

export const MainProvider = ({children}: any) => {
  return (
    <MapsProvider>
    <CircleProvider>
    <MaskProvider>
      {children}
    </MaskProvider>
    </CircleProvider>
    </MapsProvider>
  )
}

MainProvider.displayName="MainProvider";