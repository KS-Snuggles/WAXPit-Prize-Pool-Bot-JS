const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const TOKEN = process.env['Bot_Token']
const CLIENTID = process.env['CLIENT_ID']
const GUILDID = process.env['GUILD_ID']
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const axios = require('axios')

const commands = [
  {
    name: 'test',
    description: 'Replies with Pong!'
  },
  {
    name: 'test2',
    description: 'Replies with Pongggggggg!'
  },
  {
    name: 'getbalmain',
    description: 'Gets wallet balance of thepixelgibs'
  },
  {
    name: 'getbaldoxx',
    description: 'Gets wallet balance of kristoferstu'
  },
  {
    name: 'getbalmaindoubled',
    description: 'Gets wallet balance of thepixelgibs'
  },
  {
    name: 'payouts',
    description: 'Displays current events payouts.'
  },
];

const rest = new REST({ version: '9' }).setToken(process.env['Bot_Token']);


(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(CLIENTID, GUILDID),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


//Slash Commands
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === `test`) {
    await interaction.reply('Pong!');
  }
  else if (interaction.commandName === `test2`) {
    await interaction.reply('Pongggggggg!');
  }
  else if (interaction.commandName === `getbalmain`) {
    axios.post('http://wax.greymass.com/v1/chain/get_currency_balance', {
      code: 'eosio.token',
      account: 'thepixelgibs',
      symbol: 'WAX'
    })
      .then(function(response) {
        console.log(response.data[0]);
        interaction.reply("The current balance of wallet thepixelgibs is " + response.data[0]);
      })
      .catch(function(error) {
        console.log(error);
      });

  }
  else if (interaction.commandName === `getbaldoxx`) {
    axios.post('http://wax.greymass.com/v1/chain/get_currency_balance', {
      code: 'eosio.token',
      account: 'kristoferstu',
      symbol: 'WAX'
    })
      .then(function(response) {
        console.log(response.data[0]);
        interaction.reply("The current balance of wallet kristoferstu is " + response.data[0]);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  else if (interaction.commandName === `getbalmaindoubled`) {
    axios.post('http://wax.greymass.com/v1/chain/get_currency_balance', {
      code: 'eosio.token',
      account: 'thepixelgibs',
      symbol: 'WAX'
    })
      .then(function(response) {
        console.log(parseFloat(response.data[0]));
        const dub = parseFloat(response.data[0]);
        let dab = (dub * 2)
        const dib = dab.toString();
        console.log("doubles to: " + dib)
        interaction.reply("If you doubled the balance of wallet thepixelgibs it would equal " + dib + " WAX");
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  else if (interaction.commandName === `payouts`) {
    axios.post('http://wax.greymass.com/v1/chain/get_currency_balance', {
      code: 'eosio.token',
      account: 'thepixelgibs',
      symbol: 'WAX'
    })
      .then(function(response) {
        console.log(parseFloat(response.data[0]));
        const balfloat = parseInt(response.data[0]).toFixed(3);
        let space = (balfloat * 0.1)
        let wincontestant = (balfloat * 0.10)
        let losecontestant = (balfloat * 0.05)
        let audience = (balfloat * 0.75)
        const spacestr = space.toString();
        const wincontestantstr = wincontestant.toString();
        const losecontestantstr = losecontestant.toString();
        const audiencestr = audience.toString();
        console.log('math complete')
        interaction.reply("***Total Prize Pool:***  ~" + balfloat + " WAX \n\n**Host Acct:**  ~" + spacestr + " WAX \n**Winning Team:**  ~" + wincontestantstr + " WAX \n**Losing Team:**  ~" + losecontestantstr + " WAX \n**Winning Audience:**  ~" + audiencestr + " WAX.");
      })
      .catch(function(error) {
        console.log(error);
      });
  }
});


client.login(process.env['Bot_Token']);


const express = require('express')
const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('Bot is running!')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})