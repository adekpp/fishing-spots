import React, { useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import { ArriveHandler } from "./ArriveHandler";
import { closeModal } from "../features/modalSlice";
import { setToRequest } from "../features/spotsSlice";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";

export const AddSpotForm = ({ setStatusApp }) => {
  const { toRequest } = useSelector((state) => state.spots);
  const dispatch = useDispatch();
  const [spotName, setspotName] = useState("");
  const [kind, setKind] = useState("");
  const [arrive, setArrive] = useState("0");
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (toRequest) {
      setIsLoading(true);
      const collectionRef = collection(db, "requests");
      await addDoc(collectionRef, {
        spotName: spotName,
        kind: kind,
        arrive: arrive,
        lat: toRequest.lat,
        lng: toRequest.lng,
      }).then((docRef) => {
        if (docRef.id) {
          setStatusApp("completed");
          dispatch(closeModal());
          dispatch(setToRequest(null));
          setIsLoading(false);
          var templateParams = {
            name: "Spot",
            notes: "Check this out!",
          };
          emailjs
            .send(
              "service_7wosmcq",
              "gdzienaryby",
              templateParams,
              "user_fwkx4EFHDSWWq24EQrecL"
            )
            .then(
              (result) => {
                console.log(result.text);
              },
              (error) => {
                console.log(error.text);
              }
            );
        } else {
          setStatusApp("error");
          setIsLoading(false);
        }
      });
    } else return;
    setTimeout(() => {
      setStatusApp(null);
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute bottom-0 flex flex-col min-w-fit bg-white rounded-md p-6 z-10 shadow-xl"
    >
      <button
        className="close-btn absolute top-1 right-2 text-xl active:scale-90"
        onClick={() => dispatch(closeModal())}
      >
        <CloseIcon className="text-red-500" />
      </button>

      <div className="flex flex-row">
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <p>Krótki opis: (opcjonalne)({120 - spotName.length})</p>

            <textarea
              className=" text-sm shadow-inner border-2 outline-sky-500 p-2"
              type="text"
              name="water"
              onChange={(e) => setspotName(e.target.value)}
              value={spotName}
              rows="9"
              cols="30"
              placeholder="Np. najskuteczniejsza metoda, przynęta, gatunki ryb występujące na łowisku."
              maxLength="120"
            />
          </div>

          <p className="lowisko">Rodzaj łowiska:</p>
          <div role="radiogroup" className="kind mb-3">
            <label className="p-2">
              <input
                className="mr-1"
                type="radio"
                name="kind"
                value="PZW"
                required
                onChange={(e) => setKind(e.target.value)}
              />
              PZW
            </label>

            <label className="p-2">
              <input
                className="mr-1"
                type="radio"
                name="kind"
                value="Komercja"
                onChange={(e) => setKind(e.target.value)}
              />
              Komercja
            </label>

            <label className="p-2">
              <input
                className="mr-1"
                type="radio"
                name="kind"
                value="Inne"
                onChange={(e) => setKind(e.target.value)}
              />
              Inne
            </label>
          </div>

          <div className="arrive mb-3">
            <p>Dostęp do zaznaczonego miejsca:</p>
            <label>
              <input
                type="range"
                name="arrive"
                min="0"
                max="3"
                step="1"
                value={arrive}
                onChange={(e) => setArrive(e.target.value)}
              />
              <ArriveHandler arrive={arrive} />
            </label>
          </div>
          <div className="flex flex-row justify-end">
            <Button
              color="info"
              sx={{ marginLeft: 2 }}
              variant="contained"
              size="small"
              type="submit"
              disabled={isLoading ? true : false}
            >
              Dodaj
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};
