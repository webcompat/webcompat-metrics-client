import React from "react";
import Head from "next/head";

// containers
import NeedsContactContainer from "../containers/NeedsContact";

const NeedsContact = (props) => {
  return (
    <React.Fragment>
      <Head>
        <title>webcompat metrics client - Needs Contact Dashboard</title>
        <meta
          name="description"
          content="Tracking needs-contact issue burndown rate"
        />
      </Head>
      <NeedsContactContainer />
    </React.Fragment>
  );
};

export default NeedsContact;
