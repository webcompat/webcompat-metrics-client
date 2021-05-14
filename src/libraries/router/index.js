/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { isEmptyObject } from "..";

class Router {
  constructor() {
    this.routes = {};
    this.config = {};
  }
  /*
   * dDfine
   * @param {string} url
   * @param {string} slug
   * @paramas {object} options
   *
   * ex : Router.define("/pdf/download/:id/:type", "pdf-download", { baseUrl : "console" })
   */
  defineRoute(url, slug, options) {
    if (this.routes[slug]) {
      throw new Error(`${slug} is already defined`);
    }
    this.routes[slug] = {
      url: url,
      ...options,
    };
  }
  /**
   * Getter Route
   *
   * @param {string}  slug
   * @param {object}  params
   * @param {function} cb
   * @return {string}
   */
  getRoute(slug = null, params = {}) {
    if (null == slug) {
      throw new Error("slug must be a string");
    }

    /* on récupére la config du slug */
    const currentRoute = this.routes?.[slug] ?? {};
    if (isEmptyObject(currentRoute)) {
      console.warn("no configuration found for this slug");
      return "";
    }

    /* get url*/
    const url = currentRoute?.url;

    /* get baseUrl */
    const baseUrl = currentRoute?.baseUrl;

    if (isEmptyObject(params)) {
      return this.buildUrl(baseUrl, url);
    }
    /* injecte params */
    const parseUrl = this.stringfyUrl(url, params);

    return this.buildUrl(baseUrl, parseUrl);
  }

  /*
   * Build url
   * @param {string} baseUrl
   * @param {string} path
   * @return {string}
   */
  buildUrl(baseUrl, url) {
    return `${baseUrl}${url}`;
  }

  /*
   * stringfy url
   * @param {string} url
   * @param {object} params
   * @retrun string
   */
  stringfyUrl(url, params = {}) {
    let result = url;
    for (const param in params) {
      const regexp = new RegExp(`[:*]${param}\\b`);
      result = result.replace(regexp, params[param]);
    }
    return result;
  }
}

export default Router;
