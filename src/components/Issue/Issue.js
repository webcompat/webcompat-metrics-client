/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import PropTypes from "prop-types";

import { CARD_LAYOUT, CARD_LIST } from "../../constants/View";

import classes from "./Issue.module.css";

const Issue = ({ issue, mode }) => {
  const { title, number, createdAt, updatedAt, browserList } = issue;

  return (
    <article className={`${classes.issue} ${classes[mode]}`}>
      <div className={`${classes.issueContainer} ${classes[mode]}`}>
        <h2 className={classes.issueTitle}>
          <a
            className={classes.issueLink}
            href={`https://webcompat.com/issues/${number}`}
            title={title}>
            {number}: {title}
          </a>
        </h2>
        <div className={`${classes.issueWrapper} ${classes[mode]}`}>
          <div className={`${classes.issueInfos} ${classes[mode]}`}>
            <div className={`${classes.issueMetaList} ${classes[mode]}`}>
              <div>
                Created:{"\u202f"}
                <time>{createdAt}</time>
              </div>
              <div>
                Updated:{"\u202f"}
                <time>{updatedAt}</time>
              </div>
            </div>
          </div>
          {browserList.length > 0 && (
            <footer className={`${classes.issueFooter} ${classes[mode]}`}>
              <div className={classes.labelList}>
                {browserList.map((browser, key) => {
                  return (
                    <span key={key} className={classes.issueLabelListName}>
                      {browser}
                    </span>
                  );
                })}
              </div>
            </footer>
          )}
        </div>
      </div>
    </article>
  );
};

Issue.propTypes = {
  issue: PropTypes.shape({
    title: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string,
    browserList: PropTypes.array,
  }),
  mode: PropTypes.oneOf([CARD_LAYOUT, CARD_LIST]),
};

Issue.defaultProps = {
  mode: CARD_LAYOUT,
};

export default Issue;
