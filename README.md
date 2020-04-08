# [webcompat-metrics-client][website]

[website]: https://webcompat.com/

[![CircleCI status]][circle-ci]
[![travis status]][travis-ci]
[![appveyor status]][appveyor-ci]
[![PRs Welcome]][make-a-pull-request]

webcompat-metrics is a JavaScript application using [Next.js] and [React] to power metrics for [webcompat.com]

### Quick Setup

```bash
git clone https://github.com/webcompat/webcompat-metrics-client.git

cd webcompat-metrics-client

yarn
yarn dev
# or
npm install
npm run dev
# Go to http://localhost:3001
```

### Production

```bash
yarn build
yarn start
# or
npm run build
npm run start
# Go to http://localhost:3001
```

### Configuration
#### Environment variables

You can create a `.env` file (or copy `.env.example`) and modify variables, make sure variables are all set.

By default `.env.defaults` is loaded and injected through the [Next.js] configuration.

### Testing

For testing DOM, React components, and other JavaScript, we use [Jest], [Enzyme] and [Sinon.JS].

For the linting JavaScript process, we use [Prettier] and [Eslint].

For the linting CSS process, we use [stylelint].

You can test the full application locally with:

```bash
# for all tests
npm run test
# or
yarn test
# only do linting:
npm run lint
# or
yarn lint
# only run DOM/React tests:
npm run test:jest
# or
yarn test:jest
```

If your changes will alter the appearance of any views, be sure to update the [Jest] snapshots before running tests:

```bash
npm run test:jest -- -u
```

### How to Add a New Dashboard

1. Add an endpoint for the new dashboard in [`src/routes/index.js`](https://github.com/webcompat/webcompat-metrics-client/blob/8ab26fa6475ea376d0ea4dafdd520f6a73faec11/src/routes/index.js#L14).
   
2. Add a new container directory for your dashboard in the `src/containers/` directory, and build a container for it using the[`MetricsTemplate` model](https://github.com/webcompat/webcompat-metrics-client/blob/a65bcd87702425fba9f39fa6d026c1bcb2e488c0/src/containers/MetricsTemplate/index.js#L24).
   
3. Add at least one test for your new dashboard container in a `__tests__` directory inside your container directory.

4. Add a new page in [`src/pages`](https://github.com/webcompat/webcompat-metrics-client/tree/8ab26fa6475ea376d0ea4dafdd520f6a73faec11/src/pages).

5. Import your new dashboard component to your new page in [`src/pages`](https://github.com/webcompat/webcompat-metrics-client/blob/8ab26fa6475ea376d0ea4dafdd520f6a73faec11/src/pages/needstriage.js#L5-L19).
   
6. Update the [Jest] snapshots so that they will include your new dashboard views -- as shown in the [testing](#testing) section.

### [Code of Conduct]

Webcompat has adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text] so that you can understand what actions will and will not be tolerated.

### License

[MPL 2](./LICENSE)

[prs welcome]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[circleci status]: https://circleci.com/gh/webcompat/webcompat-metrics-client/tree/master.svg?style=shield
[circle-ci]: https://circleci.com/gh/webcompat/webcompat-metrics-client/tree/master
[travis status]: https://travis-ci.org/webcompat/webcompat-metrics-client.svg?branch=master
[travis-ci]: https://travis-ci.org/webcompat/webcompat-metrics-client
[appveyor status]: https://ci.appveyor.com/api/projects/status/o3fd2d32rxstpak4/branch/master?svg=true
[appveyor-ci]: https://ci.appveyor.com/project/magsout/webcompat-metrics-client/branch/master
[make-a-pull-request]: http://makeapullrequest.com
[jest]: https://facebook.github.io/jest/
[enzyme]: http://airbnb.io/enzyme/
[sinon.js]: http://sinonjs.org/
[prettier]: https://prettier.io/
[eslint]: https://eslint.org/
[stylelint]: https://stylelint.io/
[webcompat.com]: https://webcompat.com
[webpack]: https://webpack.js.org/
[react]: https://reactjs.org/
[next.js]: https://nextjs.org/
[code of conduct]: https://github.com/webcompat/webcompat-metrics-client/blob/master/CODE_OF_CONDUCT.md
[the full text]: https://github.com/webcompat/webcompat-metrics-client/blob/master/CODE_OF_CONDUCT.md
