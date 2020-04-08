import React from "react";
import Head from "next/head";

// containers
import TsciContainer from "../containers/TSCI";

const Tsci = (props) => {
  return (
    <React.Fragment>
      <Head>
        <title>webcompat metrics client - TSCI dashboard</title>
        <meta
          name="description"
          content="Measuring user pain from webcompat issues (aggregated, mobile & desktop)"
        />
      </Head>
      <TsciContainer />
    </React.Fragment>
  );
};

export default Tsci;
