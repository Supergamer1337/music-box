import { config } from 'dotenv'
import MusicBot from './models/discord/MusicBot.js'

// Load environment variables
config()
MusicBot.getSharedInstance().startBot()
