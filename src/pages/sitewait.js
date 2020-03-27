import React from "react";
import Head from "next/head";

// containers
import SiteWaitContainer from "../containers/SiteWait";

const SiteWait = (props) => {
  return (
    <React.Fragment>
      <Head>
        <title>webcompat metrics client - Site Wait Dashboard</title>
        <meta
          name="description"
          content="Tracking issue sitewait burndown rate"
        />
      </Head>
      <SiteWaitContainer />
    </React.Fragment>
  );
};

export default SiteWait;
