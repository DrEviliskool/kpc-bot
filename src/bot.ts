import { EmbedBuilder } from '@discordjs/builders';
import { ActivityType, Client, GatewayIntentBits } from 'discord.js'
import dotenv from 'dotenv';
import mysql from 'mysql2'
import { AddNoteCommand, AltCheckCommand, AvatarCommand, BanAmount, BlacklistCommand, DelNoteCommand, InfoCommand, LofiCommand, NoaddCheckCommand, NotesCommand, PollCommand, TierManager, TimeoutCommand, UnTimeoutCommand, ValidationBlacklistCommand } from './commands/Commands';

dotenv.config();

process.on('uncaughtException', (err) => {
  console.error(err);
});

process.on('unhandledRejection', (err) => {
  console.error(err);
});

export const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT as string),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

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
  // const role = msg.guild?.roles.cache.find(role => role.id === "823597873731469383")
  // const channel = msg.guild?.channels.cache.find(channel => channel.id === "672895397282316360")

  // if (msg.member?.roles.cache.has(role!.id) && (msg.channel === channel)) {
  //   msg.channel.send(`${msg.member}, You are blacklisted. Please make a ticket in <#1061327943483281428> if you think this was a false blacklist.`)
  // }

  if (!msg.content.startsWith(prefix)) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift()?.toLowerCase();

  switch (command) {
    case 'tm':
      TierManager(msg, args, client)
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
      BlacklistCommand(msg, args, client);
      break;
    case 'vbl':
      ValidationBlacklistCommand(msg, args, client);
      break;
    case 'av':
      AvatarCommand(msg, args);
      break;
    case 'noaddcheck':
      NoaddCheckCommand(msg, args, client);
      break;
    case 't': 
    case 'timeout': {
      TimeoutCommand(msg, args, client)
      break;
    }
    case 'ut':
    case 'untimeout': {
      UnTimeoutCommand(msg, args, client)
      break;
    }
    case 'poll':
      PollCommand(msg, args, client)
      break;
    case 'addnote':
      AddNoteCommand(msg, args, client)
      break;
    case 'notes':
      NotesCommand(msg, args, client)
      break;
    case 'delnote':
      DelNoteCommand(msg, args, client)
      break;
    case 'banamount':
      BanAmount(msg, args, client)
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
