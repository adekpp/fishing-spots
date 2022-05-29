import React from "react";
import { useCollection } from "../hooks/useCollection";
import { db } from "../firebase/config";
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { CustomTooltip } from "../components/Tooltip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

export const Dashboard = () => {
  const { documents: toRequest, error } = useCollection("requests");
  const { documents: spots, error: spotErr } = useCollection("spots");

  toRequest &&
    toRequest.forEach((req) => {
      if (req.arrive === "0") {
        return (req.arrive = "Łatwy");
      }
      if (req.arrive === "1") {
        return (req.arrive = "Krótki spacer");
      }
      if (req.arrive === "2") {
        return (req.arrive = "Dłuższy spacer");
      }
      if (req.arrive === "3") {
        return (req.arrive = "Przeprawa");
      }
    });

  const addRequestedSpot = (spot) => {
    const ref = collection(db, "spots");
    addDoc(ref, {
      spotName: spot.spotName,
      kind: spot.kind,
      arrive: spot.arrive,
      lat: spot.lat,
      lng: spot.lng,
    });

    const refDel = doc(db, "requests", spot.id);
    deleteDoc(refDel);
  };

  const removeRequestedSpot = (spot) => {
    const ref = doc(db, "requests", spot.id);
    deleteDoc(ref);
  };

  const removeSpot = (spot) => {
    const ref = doc(db, "spots", spot.id);
    deleteDoc(ref);
  };

  return (
    <div className="flex flex-col place-items-center gap-5">
      <h1 className="text-red-400 font-medium">Do zatwierdzenia:</h1>
      <TableContainer component={Paper} sx={{ maxWidth: 600 }}>
        <Table sx={{ minWidth: 450 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ background: "rgb(243 244 246)" }}>
              <TableCell>Opis</TableCell>
              <TableCell align="right">Rodzaj</TableCell>
              <TableCell align="right">Dojazd</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {error && (
              <TableRow
                key="Error"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{error}</TableCell>
              </TableRow>
            )}
            {toRequest &&
              toRequest.map((row) => (
                <TableRow
                  key={row.spotName}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.spotName.length > 20 ? (
                      <CustomTooltip title={row.spotName}>
                        <p className="cursor-pointer underline">
                          {row.spotName.substr(0, 20)}...
                        </p>
                      </CustomTooltip>
                    ) : (
                      row.spotName
                    )}
                  </TableCell>
                  <TableCell align="right">{row.kind}</TableCell>
                  <TableCell align="right">{row.arrive}</TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => addRequestedSpot(row)}
                      variant="contained"
                      color="success"
                      size="small"
                    >
                      Dodaj
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => removeRequestedSpot(row)}
                      variant="contained"
                      color="error"
                      size="small"
                    >
                      Usuń
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h1 className="ml-2 text-green-400 font-medium">Zatwierdzone:</h1>
      <TableContainer component={Paper} sx={{ maxWidth: 600 }}>
        <Table sx={{ minWidth: 450 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ background: "rgb(243 244 246)" }}>
              <TableCell>Opis</TableCell>
              <TableCell align="right">Rodzaj</TableCell>
              <TableCell align="right">Dojazd</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {spotErr && (
              <TableRow
                key="Error"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">Brak łowisk</TableCell>
              </TableRow>
            )}
            {spots &&
              spots.map((row) => (
                <TableRow
                  key={row.spotName}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.spotName.length > 20 ? (
                      <CustomTooltip title={row.spotName}>
                        <p className="cursor-pointer underline">
                          {row.spotName.substr(0, 20)}...
                        </p>
                      </CustomTooltip>
                    ) : (
                      row.spotName
                    )}
                  </TableCell>
                  <TableCell align="right">{row.kind}</TableCell>
                  <TableCell align="right">{row.arrive}</TableCell>

                  <TableCell align="right">
                    <Button
                      onClick={() => removeSpot(row)}
                      variant="contained"
                      color="error"
                      size="small"
                    >
                      Usuń
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
