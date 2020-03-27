/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { POST } from "../../constants/Api";
import request from "..";

const requestData = {
  about: "Hourly NeedsDiagnosis issues count",
  date_format: "w3c",
  timeline: [
    {
      count: "822",
      timestamp: "2018-02-08T13:12:16Z",
    },
    {
      count: "819",
      timestamp: "2018-02-08T15:00:00Z",
    },
    {
      count: "806",
      timestamp: "2018-02-09T15:00:03Z",
    },
  ],
};

const requestParameters = {
  from: "2018-12-12",
  to: "2019-01-01",
  filters: {
    countrty: "USA",
  },
};

const responseData = [
  {
    count: "822",
    timestamp: "2018-02-08T13:12:16Z",
  },
  {
    count: "819",
    timestamp: "2018-02-08T15:00:00Z",
  },
  {
    count: "806",
    timestamp: "2018-02-09T15:00:03Z",
  },
];

describe("testing api", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("calls API: request failed", () => {
    fetch.mockResponseOnce(JSON.stringify(requestData));

    //no request
    expect(() => {
      request();
    }).toThrow();
  });
});

describe("testing api: fake method", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("calls API", () => {
    fetch.mockResponseOnce(JSON.stringify(requestData));

    //fake method
    expect(() => {
      request({
        endpoint: "endpoint",
        config: {
          method: "method",
        },
      });
    }).toThrow();
  });
});

describe("testing api: wrong method type", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("calls API", () => {
    fetch.mockResponseOnce(JSON.stringify(requestData));

    //wrong method type
    expect(() => {
      request({
        endpoint: "endpoint",
        parameters: requestParameters,
        config: {
          method: {},
        },
      });
    }).toThrow();
  });
});

describe("testing api: GET", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("calls API", () => {
    fetch.mockResponseOnce(JSON.stringify(requestData));
    //assert on the response
    request(
      {
        endpoint: "endpoint",
      },
      {
        onSuccess: (payload) => expect(payload.timeline).toEqual(responseData),
        onError: (payload) => {},
      },
    );
  });
});

describe("testing api: POST", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("calls API", () => {
    fetch.mockResponseOnce(JSON.stringify(requestData));
    //POST call API
    request(
      {
        endpoint: "endpoint",
        config: {
          method: POST,
        },
      },
      {
        onSuccess: (payload) => expect(payload.timeline).toEqual(responseData),
        onError: (payload) => {},
      },
    );
  });
});

describe("testing api: erreur", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("calls API: eror", () => {
    fetch.mockReject("Message error");
    //POST call API
    request(
      {
        endpoint: "endpoint",
        config: {
          method: POST,
        },
      },
      {
        onSuccess: (payload) => {},
        onError: (payload) => expect(payload).toEqual("Message error"),
      },
    );
  });
});
