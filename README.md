[![Build Status](https://travis-ci.org/telemark/micro-yff-programomrader.svg?branch=master)](https://travis-ci.org/telemark/micro-yff-programomrader)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# micro-yff-programomrader

microservice for yff programomrader

## Update files

```
$ npm run update-vg3
```

```
$ npm run update-vg2
```

```
$ npm run update-vg1
```

## API

### ```GET /utdanningsprogrammer```

Get a list of all utdanningsprogrammer for yff

```bash
$ curl -v https://yff.service.minelev.no/utdanningsprogrammer
```

### ```GET /utdanningsprogrammer/:id```

Get a spesific utdanningsprogram

```bash
$ curl -v https://yff.service.minelev.no/utdanningsprogrammer/ba-vg3
```

## Deployment - ZEIT/Now

Change content of [production.env](production.env) to match your environment.

Change content of now:alias in [package.json](package.json) to match your domains.

Deploy service.

```bash
$ npm run deploy
```

## License

[MIT](LICENSE)

