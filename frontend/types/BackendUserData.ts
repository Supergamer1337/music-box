export default interface BackendUserData {
    id: string
    username: string
    discriminator: string
    avatar: string | null
}
