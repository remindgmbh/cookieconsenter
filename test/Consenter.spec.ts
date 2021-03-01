import { expect } from 'chai'
import jsdomGlobal = require('jsdom-global')
import { Consenter } from '../index'
import Iframe from '../src/modules/Iframe'
import YouTube from '../src/modules/Youtube'

describe('Consenter', function() {

    beforeEach(() => {

        jsdomGlobal()

        window.Cookiebot = {
            consent: {
                marketing: true,
                necessary: true,
                preferences: true,
                statistics: true
            }
        }
    })

    it('should replace div placeholder with iframe', () => {

        /* Create a placeholder with all parameters */
        const placeholder = document.createElement('div')
        placeholder.dataset['iframeUrl'] = 'https://forever.invalid.hostname'
        placeholder.dataset['iframeWidth'] = '100%'
        placeholder.dataset['iframeHeight'] = '100%'
        placeholder.dataset['iframeRecordUid'] = 'unit-1'

        document.body.appendChild(placeholder)

        const consenter = new Consenter()

        /* Add iframe module */
        consenter.addModule('statistics', new Iframe())

        /* Enable consenter */
        consenter.enable()

        /* Create custom event to mock cookieconsent function */
        const event = new CustomEvent('CookiebotOnAccept')

        window.dispatchEvent(event)

        /* Get created iframe element */
        const result = document.getElementsByTagName('iframe')

        expect(result.length).to.equal(1)

        expect(result[0]?.src).to.equal('https://forever.invalid.hostname/')
        expect(result[0]?.width).to.equal('100%')
        expect(result[0]?.height).to.equal('100%')
        expect(result[0]?.name).to.equal('iframe-unit-1')
    })

    it('should replace div placeholder with yotube iframe', () => {

        /* Create a placeholder with all parameters */
        const placeholder = document.createElement('div')
        placeholder.dataset['ytConsent'] = 'unittest'
        placeholder.dataset['ytParams'] = '?test=1'

        document.body.appendChild(placeholder)

        const consenter = new Consenter()

        /* Add iframe module */
        consenter.addModule('marketing', new YouTube())

        /* Enable consenter */
        consenter.enable()

        /* Create custom event to mock cookieconsent function */
        const event = new CustomEvent('CookiebotOnAccept')

        window.dispatchEvent(event)

        /* Get created iframe element */
        const result = document.getElementsByTagName('iframe')

        expect(result.length).to.equal(1)

        expect(result[0]?.src).to.equal('https://www.youtube-nocookie.com/embed/unittest?test=1')
        expect(result[0]?.width).to.equal('100%')
        expect(result[0]?.height).to.equal('100%')
    })

    it('should do nothing when disabled', () => {

        /* Create a placeholder with all parameters */
        const placeholder = document.createElement('div')
        placeholder.dataset['ytConsent'] = 'unittest'
        placeholder.dataset['ytParams'] = '?test=1'

        document.body.appendChild(placeholder)

        const consenter = new Consenter()

        /* Add iframe module */
        consenter.addModule('marketing', new YouTube())

        /* Enable consenter */
        consenter.enable()

        consenter.disable()

        /* Create custom event to mock cookieconsent function */
        const event = new CustomEvent('CookiebotOnAccept')

        window.dispatchEvent(event)

        /* Get created iframe element */
        const result = document.getElementsByTagName('iframe')

        expect(result.length).to.equal(0)
    })

    it('should restore a previously set onAccept handler', (done) => {

        const timeoutId = setTimeout(() => {
            done(new Error('Failed to restore handler'))
        }, 100)

        window.CookiebotCallback_OnAccept = () => {
            clearTimeout(timeoutId)
            done()
        }

        const consenter = new Consenter()

        /* Enable consenter */
        consenter.enable()
        consenter.disable()

        window.CookiebotCallback_OnAccept()
    })

    it('should do nothing when no consent is given', () => {

        window.Cookiebot = {
            consent: {
                marketing: false,
                necessary: false,
                preferences: false,
                statistics: false
            }
        }

        /* Create a placeholder with all parameters */
        const placeholder = document.createElement('div')
        placeholder.dataset['ytConsent'] = 'unittest'
        placeholder.dataset['ytParams'] = '?test=1'

        document.body.appendChild(placeholder)

        const consenter = new Consenter()

        /* Add iframe module */
        consenter.addModule('marketing', new YouTube())

        /* Enable consenter */
        consenter.enable()

        /* Create custom event to mock cookieconsent function */
        const event = new CustomEvent('CookiebotOnAccept')

        window.dispatchEvent(event)

        /* Get created iframe element */
        const result = document.getElementsByTagName('iframe')

        expect(result.length).to.equal(0)
    })
})
