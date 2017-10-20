[![Build Status](https://travis-ci.org/telemark/micro-yff-programomrader.svg?branch=master)](https://travis-ci.org/telemark/micro-yff-programomrader)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Greenkeeper badge](https://badges.greenkeeper.io/telemark/micro-yff-programomrader.svg)](https://greenkeeper.io/)

# micro-yff-programomrader

microservice for yff programomrader

## Update files

```
$ npm run update
```

## API

### ```GET /yff/utdanningsprogrammer```

Get a list of all utdanningsprogrammer for yff

```bash
$ curl -v https://yff.minelev.no/utdanningsprogrammer
```

### ```GET /yff/utdanningsprogrammer/:id```

Get a spesific utdanningsprogram

```bash
$ curl -v https://yff.minelev.no/utdanningsprogrammer/ba
```

## Deployment - ZEIT/Now

Change content of [production.env](production.env) and [rules.json](rules.json) to match your environment.

Change content of now:alias in [package.json](package.json) to match your domains.

Deploy service.

```bash
$ npm run deploy
```

## License

[MIT](LICENSE)

![Robohash image of micro-yff-programomrader](https://robots.kebabstudios.party/micro-yff-programomrader.png "Robohash image of micro-yff-programomrader")
