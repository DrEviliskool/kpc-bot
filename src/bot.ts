import { EmbedBuilder } from '@discordjs/builders';
import { ActivityType, Client, GatewayIntentBits } from 'discord.js'
import dotenv from 'dotenv';
import { AltCheckCommand, AvatarCommand, BlacklistCommand, InfoCommand, LofiCommand, NoaddCheckCommand, PollCommand, Tier1RoleCommand, Tier2RoleCommand, TimeoutCommand, UnTimeoutCommand, ValidationBlacklistCommand } from './commands/Commands';

dotenv.config();

process.on('uncaughtException', (err) => {
  console.error(err);
});

process.on('unhandledRejection', (err) => {
  console.error(err);
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
  ],
});

const prefix = '.';

client.on('ready', () => {
  console.log('Bot is ready!');
  client.user?.setPresence({
    status: "online",
    activities: [
      {
        name: "Lofi",
        type: ActivityType.Listening
      }
    ]
  })
});

client.on('messageCreate', (msg) => {
  if (!msg.content.startsWith(prefix)) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift()?.toLowerCase();

  switch (command) {
    case 't1':
      Tier1RoleCommand(msg, args);
      break;
    case 't2':
      Tier2RoleCommand(msg, args);
      break;
    case 'altcheck':
      AltCheckCommand(msg, args, client);
      break;
    case 'info':
      InfoCommand(msg, args);
      break;
    case 'lofi':
      LofiCommand(msg, args, client);
      break;
    case 'bl':
      BlacklistCommand(msg, args);
      break;
    case 'vbl':
      ValidationBlacklistCommand(msg, args);
      break;
    case 'av':
      AvatarCommand(msg, args);
      break;
    case 'noaddcheck':
      NoaddCheckCommand(msg, args, client);
      break;
    case 't': 
    case 'timeout': {
      TimeoutCommand(msg, args)
      break;
    }
    case 'ut':
    case 'untimeout': {
      UnTimeoutCommand(msg, args)
      break;
    }
    case 'poll':
      PollCommand(msg, args, client)
      break;
  }
})

client.on('messageReactionAdd', (reaction, user) => {
  const member = client.guilds.cache.get("672146248182136863")?.members.cache.find(user2 => user2.id === user.id)
  if (reaction.message.author?.id !== client.user?.id) return;
  if(!member?.roles.cache.has(client.guilds.cache.get("672146248182136863")?.roles.cache.get('672899608787288075')?.id as string)) return;
  if (reaction.emoji.name !== "🔴") return;

  const embed = new EmbedBuilder()
    .setTitle("Poll Ended")
    .setTimestamp()
  
  reaction.message.reactions.cache.forEach((reaction) => {
    if (reaction.emoji.name === "🔴") return
    embed.addFields(
      {
        name: `${reaction.emoji.name}`,
        value: `${reaction.count.toString()} vote(s)`
      }
    )
  });

  reaction.message.reply({embeds: [embed]})

})
  

client.login(process.env.BOT_TOKEN);