type EnMessages = typeof import('./src/messages/en.json');
type EsMessages = typeof import('./src/messages/es-ES.json');
type ItMessages = typeof import('./src/messages/it-IT.json');
type PtMessages = typeof import('./src/messages/pt-BR.json');
declare interface IntlMessages extends EnMessages, EsMessages, ItMessages, PtMessages {}