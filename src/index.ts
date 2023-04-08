import { Client, Intents } from 'discord.js';
import dotenv from 'dotenv';
import { registerCommands } from './utils/registerCommands';

dotenv.config();

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES
    ],
});

client.on('ready', async () => {
    console.log(`Logged in as ${client.user?.tag}!`);
    await registerCommands(client);
});

client.login(process.env.DISCORD_TOKEN);
