# webcompat-metrics
An application to power metrics for [webcompat.com](https://webcompat.com/)


## Starting the app

`npm start`

## Install dependencies

Install using `yarn` or `npm`:

```
npm install
cd client
npm install
# or
yarn install
cd client
yarn install
```

## Starting the app (dev mode)

it starts the [express](https://expressjs.com/) server (port: 3000) and the client [React](https://reactjs.org/) server (port: 3001)

```
npm run start
# or
yarn start
```

You can start only client or server:

```
npm run start:client
# or
yarn start:client
```

```
npm run start:server
# or
yarn start:server
```

## testing the app

For testing DOM, React component, and others JavaScript, we use [Jest](https://facebook.github.io/jest/), [Enzyme](http://airbnb.io/enzyme/) and [Sinon.JS](http://sinonjs.org/).

For the linting JavaScript process, we use [Prettier](https://prettier.io/) , [Eslint](https://eslint.org/).

For the linting CSS process, we use [stylelint](https://stylelint.io/).

you can test application:

```
npm run test
# or
yarn test
```
