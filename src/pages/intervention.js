import React from "react";
import Head from "next/head";

// containers
import InterventionContainer from "../containers/Intervention";

const Intervention = (props) => {
  return (
    <React.Fragment>
      <Head>
        <title>
          webcompat metrics client - Firefox WebCompat interventions dashboard
        </title>
        <meta
          name="description"
          content="Tracking available and deployed WebCompat interventions in Firefox products"
        />
      </Head>
      <InterventionContainer />
    </React.Fragment>
  );
};

export default Intervention;
