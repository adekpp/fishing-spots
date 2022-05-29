import React from "react";
import { useCallback, useRef, useState } from "react";
import { useCollection } from "./hooks/useCollection";
import fishMarker from "./assets/img/fishMarker.png";
import requestSpotMarker from "./assets/img/requestSpot.png";
import "./App.css";
import {
  GoogleMap,
  useLoadScript,
  Marker
} from "@react-google-maps/api";
import {
  libraries,
  mapContainerStyle,
  center,
  options,
} from "./googleMaps/mapOptions";

import Search from "./components/Search";
import { AddSpotForm } from "./components/AddSpotForm";
import { AlertComplete } from "./components/AlertComplete";
import { AlertInfo } from "./components/AlertInfo";
import { AnimatePresence } from "framer-motion";
import { Header } from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import { setToRequest } from "./features/spotsSlice";
import { SpotInfo } from "./components/SpotInfo";
function App() {
  const { documents: markers } = useCollection("spots");
  const dispatch = useDispatch();
  const { showModal } = useSelector((state) => state.modal);
  const { toRequest } = useSelector((state) => state.spots);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState(null);

  const onMapClick = useCallback(
    (event) => {
      dispatch(
        setToRequest({
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
          time: new Date().toISOString(),
        })
      );
    },
    [dispatch]
  );

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API,
    libraries,
  });
  if (loadError) return "Nie można załadować mapy";
  if (!isLoaded)
    return (
      <div className="grid h-full place-content-center">
        <p>Ładuję mapy...</p>
      </div>
    );

  return (
    <div className="overflow-x-hidden">
      <div className="absolute z-10 w-full">
        <Header>
          <Search panTo={panTo} />
        </Header>

        <AnimatePresence>
          {!toRequest & !status && <AlertInfo />}
          {status === "completed" && <AlertComplete />}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showModal && <AddSpotForm setStatusApp={setStatus} />}
      </AnimatePresence>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={7}
        center={center}
        options={options}
        onLoad={onMapLoad}
        onClick={onMapClick}
      >
        {markers &&
          markers.map((marker) => (
            <Marker
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={{
                url: fishMarker,
                scaledSize: new window.google.maps.Size(50, 40),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(25, 20),
              }}
              onClick={() => {
                setSelected(marker);
              }}
            />
          ))}

        {toRequest && (
          <Marker
            key={toRequest.time}
            position={{
              lat: parseFloat(toRequest.lat),
              lng: parseFloat(toRequest.lng),
            }}
            icon={{
              url: requestSpotMarker,
              scaledSize: new window.google.maps.Size(50, 40),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(25, 20),
            }}
            onClick={() => {
              dispatch(setToRequest(null));
            }}
          />
        )}

        {selected && <SpotInfo
          selected={selected}
          setSelected={setSelected}
         />}

      </GoogleMap>
    </div>
  );
}

export default App;
