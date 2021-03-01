export {}

type Consent = {
    marketing: boolean,
    necessary: boolean,
    preferences: boolean,
    statistics: boolean
}

interface Cookiebot {
    consent: Consent;
}

declare global {
    interface Window {
        Cookiebot: Cookiebot;
        CookiebotCallback_OnAccept?: CallableFunction;
    }
}
