import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";

function AllRoutes() {
  return (
    <Routes>
      {
        AuthRoutes.map((item,index) => (
          <Route path={item.path} element={item.name} key={index} />
        ))
      }
    </Routes>
  );
}

export default AllRoutes;
