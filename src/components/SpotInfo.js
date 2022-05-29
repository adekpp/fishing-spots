import React from "react";
import { InfoWindow } from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedSpot } from "../features/spotsSlice";

export const SpotInfo = () => {
  const { selectedSpot } = useSelector((state) => state.spots);
  console.log(selectedSpot);
  const dispatch = useDispatch();
  return (
    <>
      {selectedSpot && (
        <InfoWindow
          position={{
            lat: parseFloat(selectedSpot.lat),
            lng: parseFloat(selectedSpot.lng),
          }}
          onCloseClick={() => {
            dispatch(setSelectedSpot(null));
          }}
        >
          <div className="w-44">
            <p className="font-semibold">Opis: </p>
            <p className=" font-light tracking-wide">{selectedSpot.spotName}</p>

            <p className="mt-1 font-semibold">
              Rodzaj:{" "}
              <span className="font-light tracking-wide ">
                {selectedSpot.kind}
              </span>
            </p>

            <p className="mt-1 font-semibold">
              Dostęp do miejsca:{" "}
              {selectedSpot.arrive === "Łatwy" ? (
                <span className="font-semibold tracking-wide text-green-500">
                  {selectedSpot.arrive}
                </span>
              ) : null}
              {selectedSpot.arrive === "Krótki spacer" ? (
                <span className="font-semibold tracking-wide text-green-700">
                  {selectedSpot.arrive}
                </span>
              ) : null}
              {selectedSpot.arrive === "Dłuższy spacer" ? (
                <span className="font-semibold tracking-wide text-yellow-500">
                  {selectedSpot.arrive}
                </span>
              ) : null}
              {selectedSpot.arrive === "Przeprawa" ? (
                <span className="font-semibold tracking-wide text-amber-700">
                  {selectedSpot.arrive}
                </span>
              ) : null}
            </p>
          </div>
        </InfoWindow>
      )}
    </>
  );
};
