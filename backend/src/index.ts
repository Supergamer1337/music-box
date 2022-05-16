import { Client, Intents } from 'discord.js'
import { config } from 'dotenv'

// Load environment variables
config()

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.on('ready', () => {
    if (!client.user) return console.error('Client user is undefined')
    console.log(`Logged in as ${client.user.tag}!`)
})

client.login(process.env.BOT_TOKEN)
