/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";

import Svg from "../../../components/Svg";
import SVGTwitter from "../../../assets/svg/iconmonstr-twitter-1.svg";
import SVGGithub from "../../../assets/svg/iconmonstr-github-1.svg";

import classes from "./styles.css";

const Footer = props => {
  return (
    <footer className={classes.footer}>
      <div className={classes.socials}>
        <a
          className={classes.social}
          href="https://twitter.com/webcompat"
          title="Twitter webcompat accounts"
          target="_blank"
          rel="noopener noreferrer">
          <Svg svg={SVGTwitter} fill="#1da1f2" height={"1.5em"} />
        </a>
        <a
          className={classes.social}
          href="https://github.com/webcompat"
          title="Github webcompat account"
          target="_blank"
          rel="noopener noreferrer">
          <Svg svg={SVGGithub} fill="#c6cbd1" height={"1.5em"} />
        </a>
      </div>
      <div className={classes.footerText}>
        <span>Created and maintained by webcompat</span>
      </div>
    </footer>
  );
};

export default Footer;
