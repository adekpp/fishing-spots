import React from "react";
import { InfoWindow } from "@react-google-maps/api";
export const SpotInfo = ({ selected, setSelected }) => {
  return (
    <>
      {selected && (
        <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <div className="w-44">
            <p className="font-semibold">Opis: </p>
            <p className=" font-light tracking-wide">{selected.spotName}</p>

            <p className="mt-1 font-semibold">
              Rodzaj:{" "}
              <span className="font-light tracking-wide ">{selected.kind}</span>
            </p>

            <p className="mt-1 font-semibold">
              Dostęp do miejsca:{" "}
              {selected.arrive === "Łatwy" ? (
                <span className="font-semibold tracking-wide text-green-500">
                  {selected.arrive}
                </span>
              ) : null}
              {selected.arrive === "Krótki spacer" ? (
                <span className="font-semibold tracking-wide text-green-700">
                  {selected.arrive}
                </span>
              ) : null}
              {selected.arrive === "Dłuższy spacer" ? (
                <span className="font-semibold tracking-wide text-yellow-500">
                  {selected.arrive}
                </span>
              ) : null}
              {selected.arrive === "Przeprawa" ? (
                <span className="font-semibold tracking-wide text-amber-700">
                  {selected.arrive}
                </span>
              ) : null}
            </p>
          </div>
        </InfoWindow>
      )}
    </>
  );
};
