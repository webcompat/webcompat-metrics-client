import React from "react";
import Head from "next/head";

// containers
import NeedsDiagnosisContainer from "../containers/NeedsDiagnosis";

const NeedsDiagnosis = (props) => {
  return (
    <React.Fragment>
      <Head>
        <title>webcompat metrics client - Needs diagnosis dashboard</title>
        <meta
          name="description"
          content="Tracking issue diagnosis burndown rate"
        />
      </Head>
      <NeedsDiagnosisContainer />
    </React.Fragment>
  );
};

export default NeedsDiagnosis;
