import {
    AudioPlayerStatus,
    createAudioPlayer,
    createAudioResource,
    NoSubscriberBehavior
} from '@discordjs/voice'

export const playLocalFile = (filePath: string) => {
    const player = createAudioPlayer({
        behaviors: {
            noSubscriber: NoSubscriberBehavior.Pause
        }
    })

    player.on(AudioPlayerStatus.Buffering, () => {
        console.log('Buffering...')
    })

    player.on(AudioPlayerStatus.Playing, () => {
        console.log('Playing')
    })

    player.on(AudioPlayerStatus.Paused, () => {
        console.log('Paused')
    })

    player.on(AudioPlayerStatus.AutoPaused, () => {
        console.log('Auto Paused')
    })

    player.on('error', (error) => {
        console.error(error)
    })

    const resource = createAudioResource(filePath)
    player.play(resource)

    return player
}
