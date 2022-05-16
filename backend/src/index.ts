import { config } from 'dotenv'
import MusicBot from './discord/MusicBot.js'

// Load environment variables
config()
MusicBot.getSharedInstance().startBot()
