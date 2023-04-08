import fetch from 'node-fetch';
import { ICommand } from './bot';

export const ChatCommand: ICommand = {
  name: 'chat',
  description: 'Talk with the chatbot',
  options: [
    {
      name: 'message',
      description: 'The message to send to the chatbot',
      type: 'STRING',
      required: true,
    },
  ],
  async run(client, interaction) {
    const message = interaction.options.getString('message');
    const conversationId = client.chatConversations.get(interaction.user.id);
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
body: JSON.stringify({
        prompt: `conversation_id: ${conversationId}\n${message}`,
        temperature: 0.5,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    });

    const data = await response.json();
    const output = data.choices[0].text.trim();

    if (!conversationId) {
      client.chatConversations.set(interaction.user.id, data.conversation_id);
    }

    await interaction.reply(output);
  },
};
