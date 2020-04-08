import React from "react";
import Head from "next/head";

// containers
import ContactReadyContainer from "../containers/ContactReady";

const ContactReady = (props) => {
  return (
    <React.Fragment>
      <Head>
        <title>webcompat metrics client - Contact Ready Dashboard</title>
        <meta
          name="description"
          content="Tracking contact-ready issue burndown rate"
        />
      </Head>
      <ContactReadyContainer />
    </React.Fragment>
  );
};

export default ContactReady;
