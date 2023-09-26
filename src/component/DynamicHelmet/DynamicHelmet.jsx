import React from "react";
import { Helmet } from "react-helmet-async";

const DynamicHelmet = ({ pageName }) => {
  return (
    <Helmet>
      <title>{pageName} :: Doc House</title>
    </Helmet>
  );
};

export default DynamicHelmet;
