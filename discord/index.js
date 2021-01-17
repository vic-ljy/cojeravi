const Discord = require('discord.js');

const client = new Discord.Client();

const token = 'ODAwMjM1OTE5MjkwNDAwNzY4.YAPLxg.KDBUgbUphKy1r-GgdI226pkBurY';

const prefix = '~';

const fs = require('fs');

client.commands = new Discord.Collection();

/*
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}*/
client.once('ready', () => {
    console.log('Tea is online!');
});

client.on('guildMemberAdd', member => {//does not work yet!!!!!!!!!!!!!!!!!
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.cache.find(ch => ch.name === 'general');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Welcome to the server, ${member}`);
  });
  
client.on('message', message => {
    //channel = client.channels.cache.get('781014014611161159');
    //client.channels.get('781014014611161159').send('Hello here!');
    //const channel = client.channels.cache.find(channel => channel.name === channelName)
//channel.send(message)

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'you') {
        client.commands.get('you').execute(message, args);
        //message.channel.send('poo <3');
    } else if (command === 'sneeze') {
        message.channel.send('bless your heart and soul and butt');
    } else if (command === 'hug') {
        message.channel.send('YOU SAID THE H WORD!!!! HOW DARE YOU');
    } else if (command == 'sheets') {
        message.channel.send('https://docs.google.com/spreadsheets/d/1YojzzonVTYwi0N_w09Zrul-7mUgLGWjQh5Vn8Y4B5TU/edit?usp=sharing');
    } else if (command == 'tutorial') {
        message.channel.send('https://youtu.be/7fnf08KAvZ4');
    } else if (command == 'help') {
        message.channel.send('why should i help you :p');
    } else if (command == 'gn') {
        message.channel.send('~goodnight ~sleep tight ~don\'t let the bugs bite ~love you, you mite <3');
    } else if (command == 'plop') {
        var num = Math.round(Math.random());
        if (num == 0) message.channel.send('sad');
        else message.channel.send('comfy');
    } else if (command == 'poo') {
        message.channel.send('plop');
    } else if (command == 'jenna') {
        message.channel.send('stinky girl! PU!');
    } else if (command == 'francis') {
        message.channel.send('cho xia zi');
    } else if (command == 'eric') {
        message.channel.send('why do they call it oven when you of in the cold food of out hot eat the food?');
    } else if (command == 'nancy') {
        message.channel.send('gimme bubble tea');
    } else if (command == 'junyi') {
        message.channel.send('tbd');
    } else if (command == 'connie') {
        message.channel.send('tbd');
    } else if (command == 'raymond') {
        message.channel.send('scottish pomegranates');
        //--------------------------------------------------------------------
    } else if (command == 'pingtest') { //PING
        if (message.mentions.users.size) {
            const taggedUser = message.mentions.users.first();
            message.channel.send(`You wanted to kick: <@${taggedUser.id}>`);
        } else {
        msg.reply('Please tag a valid user!');
        }
    } else if (command == 'tochannel') { //CHANNEL
        //client.channels.cache.get('759964620516884540').send('bum');
        //const channel1 = client.channels.cache.find(channel => channel.id === '759964620516884540');
        //channel1.send("blah blah blah");
    }else {
        message.channel.send('stop making up commands. go nag jenna if u want a command.');
    } 
});
/*client.on('message', message => {
	console.log(message.content);
});

if (message.content === '!ping') {
	message.channel.send('Pong.');
}*/

client.login('ODAwMjM1OTE5MjkwNDAwNzY4.YAPLxg.KDBUgbUphKy1r-GgdI226pkBurY');