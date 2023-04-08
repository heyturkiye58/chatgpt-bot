import { Client, GuildMember, MessageEmbed, TextChannel } from 'discord.js';

export function formatDate(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
export function logEvent(client: Client, eventName: string, ...args: any[]): void {
    const embed = new MessageEmbed()
        .setColor('#00ff00')
        .setTitle(`Event: ${eventName}`)
        .setDescription(`\`\`\`${JSON.stringify(args)}\`\`\``)
        .setFooter(`Bot ID: ${client.user?.id}`)
        .setTimestamp();

    const logChannel = client.channels.cache.find((channel) => channel.name === 'bot-logs' && channel.type === 'text') as TextChannel;

    if (logChannel) {
        logChannel.send({ embeds: [embed] });
    }
}
export function getUserFromMention(client: Client, mention: string): GuildMember | null {
    if (!mention) return null;
    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);

        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }

        return client.guilds.cache.get(process.env.GUILD_ID!)?.members.cache.get(mention) || null;
    }

    return null;
}
