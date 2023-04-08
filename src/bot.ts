import { Client, Collection } from 'discord.js';
import { CommandHandler } from './utils/commandHandler';

export class Bot extends Client {
    public commands: Collection<string, ICommand>;
    public commandHandler: CommandHandler;

    constructor() {
        super({
            intents: ['GUILDS', 'GUILD_MESSAGES']
        });

        this.commands = new Collection();
        this.commandHandler = new CommandHandler(this);

        this.setupEvents();
    }

    public async start(token: string) {
        await this.login(token);
    }
