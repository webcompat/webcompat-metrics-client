import React from "react";
import Head from "next/head";

// containers
import NeedsTriage from "../containers/NeedsTriage";

const HomePage = (props) => {
  return (
    <React.Fragment>
      <Head>
        <title>webcompat metrics client - Needs triage dashboard</title>
        <meta
          name="description"
          content="Tracking issue triage burndown rate"
        />
      </Head>
      <NeedsTriage />
    </React.Fragment>
  );
};

export default HomePage;
