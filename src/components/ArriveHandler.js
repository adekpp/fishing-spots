import React from "react";

export const ArriveHandler = ({ arrive }) => {
  
  return <>
  
  {arrive === "0" && (
    <p className="font-medium text-green-500">Łatwy</p>
  )}
  {arrive === "1" && (
    <p className="font-medium text-green-700">Krótki spacer</p>
  ) }
  {arrive === "2" && (
    <p className="font-medium text-yellow-500">Dłuższy spacer</p>
  ) }
  {arrive === "3" && (
    <p className="font-medium text-amber-700">Przeprawa</p>
  ) }
  </>;
};
