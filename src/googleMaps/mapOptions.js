import {mapsStyles} from './mapsStyles'

const libraries = ["places"];

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 52.41401853929,
  lng: 19.557303186968195,
};

const options = {
  styles: mapsStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

export { libraries, mapContainerStyle, center, options };
