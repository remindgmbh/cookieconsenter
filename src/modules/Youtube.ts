import Module from './Module'

/**
 * Enables all youtube videos.
 */
export default class YouTube extends Module {

    public run(): void {
        /** Select all replacement elements that display the consent message */
        const elements: NodeListOf<Element> = document.querySelectorAll('[data-yt-consent]')

        for (let i = 0; i < elements.length; i++) {

            /** Save the current element */
            const el: HTMLElement = elements[i] as HTMLElement

            /** Get the id from the current element */
            const id: string = el.dataset['ytConsent'] as string

            /** Get additional url params */
            const params: string = el.dataset['ytParams'] as string

            /** Create the youtube iframe */
            let iframe: HTMLIFrameElement = document.createElement('iframe')
            iframe.style.borderStyle = 'none'
            iframe.width = '100%'
            iframe.height = '100%'
            iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + params
            iframe.allowFullscreen = true

            /** The parent element should be the div with ytPlayer class */
            const parent: HTMLElement = el.parentNode as HTMLElement

            /** Remove placeholder and insert iframe */
            parent.removeChild(el)
            parent.appendChild(iframe)
        }
    }
}
