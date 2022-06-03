export default interface BackendGuildData {
    id: string
    name: string
    icon: string
    owner: boolean
    permissions: string
    features: string[]
    botInServer: boolean
}
