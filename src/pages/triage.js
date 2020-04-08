import React from "react";
import Head from "next/head";

// containers
import TriageContainer from "../containers/Triage";

const Triage = (props) => {
  return (
    <React.Fragment>
      <Head>
        <title>webcompat metrics client - Needs triage dashboard</title>
        <meta
          name="description"
          content="Tracking untriaged issues older than 48h"
        />
      </Head>
      <TriageContainer />
    </React.Fragment>
  );
};

export default Triage;
