import Module from './Module'

/**
 * Enables all iframes.
 */
export default class Iframe extends Module {

    public run(): void {

        /** Select all replacement elements that display the consent message */
        const elements: NodeListOf<Element> = document.querySelectorAll('[data-iframe-url]')

        for (let i = 0; i < elements.length; i++) {

            /** Save the current element */
            const el: HTMLElement = elements[i] as HTMLElement

            /** Get the url from the current element */
            const url: string = el.dataset['iframeUrl'] as string

            /** Get width param */
            const width: string = el.dataset['iframeWidth'] as string

            /** Get height param */
            const height: string = el.dataset['iframeHeight'] as string

            /** Get record uid param */
            const uid: string = el.dataset['iframeRecordUid'] as string

            /** Create the youtube iframe */
            let iframe: HTMLIFrameElement = document.createElement('iframe')
            iframe.style.borderStyle = 'none'
            iframe.width = width
            iframe.height = height
            iframe.src = url
            iframe.allowFullscreen = false
            iframe.name = 'iframe-' + uid

            /** The parent element should be the div with ytPlayer class */
            const parent: HTMLElement = el.parentNode as HTMLElement

            /** Remove placeholder and insert iframe */
            parent.removeChild(el)
            parent.appendChild(iframe)
        }
    }
}
