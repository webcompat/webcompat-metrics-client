# [webcompat-metrics-client][website]

[website]: https://webcompat.com/

 [![PRs Welcome]][make-a-pull-request]

Webcompat metrics is an application to power metrics for [webcompat.com]

### Quick Setup

```bash
git clone https://github.com/webcompat/webcompat-metrics-client.git

cd webcompat-metrics-client

yarn
yarn start:dev
# or
npm install
npm run start:dev
# Go to http://localhost:3001
```

### Testing

For testing DOM, React component, and others JavaScript, we use [Jest], [Enzyme] and [Sinon.JS].

For the linting JavaScript process, we use [Prettier] , [Eslint].

For the linting CSS process, we use [stylelint].

you can test application:

```bash
npm run test
# or
yarn test
```

### License

[MPL 2](./LICENSE)

[prs welcome]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[make-a-pull-request]: http://makeapullrequest.com
[Jest]: https://facebook.github.io/jest/
[Enzyme]: http://airbnb.io/enzyme/
[Sinon.JS]: http://sinonjs.org/
[Prettier]: https://prettier.io/
[Eslint]: https://eslint.org/
[stylelint]: https://stylelint.io/
[webcompat.com]: https://webcompat.com
