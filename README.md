# CookieConsenter

[travis-img]: https://img.shields.io/travis/remindgmbh/cookieconsenter.svg?style=flat-square
[codecov-img]: https://img.shields.io/codecov/c/github/remindgmbh/cookieconsenter.svg?style=flat-square
[github-issues-img]: https://img.shields.io/github/issues/remindgmbh/cookieconsenter.svg?style=flat-square
[contrib-welcome-img]: https://img.shields.io/badge/contributions-welcome-blue.svg?style=flat-square
[license-img]: https://img.shields.io/github/license/remindgmbh/cookieconsenter.svg?style=flat-square

[![travis-img]](https://travis-ci.com/github/remindgmbh/cookieconsenter)
[![codecov-img]](https://codecov.io/gh/remindgmbh/cookieconsenter)
[![github-issues-img]](https://github.com/remindgmbh/cookieconsenter/issues)
[![contrib-welcome-img]](https://github.com/remindgmbh/cookieconsenter/blob/master/CONTRIBUTING.md)
[![license-img]](https://github.com/remindgmbh/cookieconsenter/blob/master/LICENSE)

Blah blah

---

## Installation

```shell
npm i @remindgmbh/cookieconsenter
```

## API

The wrapper api consists of modules that can be assigned to the cookieconsent
choice types.

```typescript
import { Consenter, Iframe } from '@reindgmbh/cookieconsenter'

const consenter: Consenter = new Consenter()

const iframe: Iframe = new Iframe()

consenter.add('marketing', iframe)

consenter.enable()
```

### Modules

#### YouTube

Create placeholder element with params.

```html
<div
    data-yt-consent="id"
    data-yt-params="query params"></div>
```

Api will create iframe in its place

```html
<iframe
    style="border-style: none;"
    width="100%"
    height="100%"
    src="https://www.youtube-nocookie.com/embed/id?params"
    allowfullscreen></iframe>
```

#### Iframe

Create placeholder element with params.

```html
<div
    data-iframe-url="https://my.url.domain/"
    data-iframe-width="50%"
    data-iframe-height="50%"
    data-iframe-uid="some-id"></div>
```

Api will create this iframe

```html
<iframe
    style="border-style: none;"
    width="50%"
    height="50%"
    src="https://my.url.domain/"
    name="iframe-some-id"
    allowfullscreen></iframe>
```

### Custom Modules

Any functionality not provided by the base modules can be implemented by creating your own module.

```typescript
import { Consenter, Module } from '@remindgmbh/cookieconsenter'

/**
 * Create your own module by extending the module class.
 */
class MyModule extends Module {

    /**
     * This method will be called by the api to run your code.
     */
    public run(): void {
        // custom code
    }
}

/* Create a new consenter instance */
const consenter = new Consenter()

/* Create an instance of your module */
const myMod = new MyModule()

/* Add your module to the consenter using whatever consent level you require */
consenter.add('necessary', myMod)

/* Enable the consenter and watch what happens when you consent */
consenter.enable()
```

## Contributing
