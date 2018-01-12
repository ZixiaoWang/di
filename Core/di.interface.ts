export interface ComponentConfig {
    provider: Array<any>,
    restrict?: boolean
}

export interface ProviderConfig {
    provider: any,
    useValue: any,
    useClass: any,
    useExistInstance: any
}