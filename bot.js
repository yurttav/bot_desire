// Calling Packages
const Discord = require('discord.js');
const bot = new Discord.Client();
const settings = require('./settings.json');

var prefix = settings.prefix;


//Purge function
// We have to wrap this in an async since awaits only work in them.
async function purge(message, args) {
  message.delete(); // Let's delete the command message, so it doesn't interfere with the messages we are going to delete.

  // Now, we want to check if the user has the `bot-commander` role, you can change this to whatever you want.
  //if (!message.member.roles.find("name", "bot-commander")) { // This checks to see if they DONT have it, the "!" inverts the true/false
  //    message.channel.send('You need the \`bot-commander\` role to use this command.'); // This tells the user in chat that they need the role.
  //    return; // this returns the code, so the rest doesn't run.
  //}

  // We want to check if the argument is a number
  if (isNaN(args[0])) {
      message.channel.send('Kaç tane bro! \n \nKullanım Şekli: ' + prefix + 'SİL 100'); //\n means new line.
      return;
  }

  if (args[0] > 100) {
    message.channel.send('Bro! tek seferde azami 100 tane silmeme izin veriyor DISCORD. Kusura kalma. Bi zahmet yeniden dene!'); //\n means new line.
     return;
  }  

  const fetched = await message.channel.messages.fetch({limit: args[0]}); // This grabs the last number(args) of messages in the channel.
  console.log(fetched.size + ' messages found, deleting...'); // Lets post into console how many messages we are deleting

  // Deleting the messages
  message.channel.bulkDelete(fetched)
      .then(msg => {
        message.channel.send(fetched.size + ' tane mesaj sildim!');
        msg.delete({ timeout: 5000 });              
      })
      .catch(error => message.channel.send(`Error: ${error}`)); // If it finds an error, it posts it into the channel.   
  }

// Listener Event: Runs whenever a message is received.
bot.on('message', message => {

    // Variables - Variables make it easy to call things, since it requires less typing.
    let msg = message.content.toUpperCase(); // This variable takes the message, and turns it all into uppercase so it isn't case sensitive.
    let sender = message.author.id; // This variable takes the message, and finds who the author is.
    let cont = message.content.slice(prefix.length).split(" "); // This variable slices off the prefix, then puts the rest in an array based off the spaces
    let args = cont.slice(1); // This slices off the command in cont, only leaving the arguments.
    let isgunlukkanal = false;
    //kanal günlük kanal mı
    if (message.channel.id === settings.gunluk) {
      isgunlukkanal = true;
    }
    // Commands
    switch (msg) {
      case 'SA': message.reply('AS bro!'); break;
      case 'SAE': if (isgunlukkanal) {message.channel.send('Dikkat et QR lı değilse blind olabilir!');} break;
      case 'NTA': 
        if (isgunlukkanal) {
          if (sender === settings.soykan){
            message.channel.send('Hadi <@'+sender+'> Derviş göster kendini iste de gelsin!');
          } else {
            message.channel.send('Tüh be. Bitti mi <@'+sender+'> Bro!. İste de gelsin diyeceğim ama <@'+settings.soykan+'> Dervişe has bir durum! Ama yine de iste sen');
          }
        } 
        break;
      case 'ACF': if (isgunlukkanal) {message.channel.send('Kral geldi Kral ama sadece @frk a Kral! @Btc Desire @Crop @Cikko siz de kırıntıları toplayın. @Soykan sen de şu testi bitir artık sana da gelsin :)');} break;
      case 'ALPACA': if (isgunlukkanal) {message.channel.send('Hadi yine iyisiniz. @frk @Btc Desire size yok boşuna beklemeyin...!');} break;
      case 'DAYILAR': message.channel.send('Dayım benim! Nasılsın?'); break;
      case prefix + 'ADAM': message.channel.send(settings.sahip); break;
      case prefix + 'DOWN': return; 
    // Ping
      case prefix + 'PING': message.channel.send('Ping!'); break;// This 'sends' the message to the channel the message was in. You can change what is in the message to whatever you want.
      case prefix + '?': message.channel.send(settings.help); break;
    }

    if ((msg === 'INŞ') || (msg === 'INS') || msg.includes(' INŞ ') || msg.includes(' INS ') || msg.includes('INŞ ') || msg.includes('INS ')) {
      message.channel.send('Amin!');
    } else if (msg.includes('AEO') || msg.includes('GÖRÜŞÜRÜZ')) {
      message.channel.send('A.E.O. kardeşim!');
    }

    if (msg.startsWith(prefix + 'SENDMSG'))  {
      message.delete();

      if (isNaN(args[0])) {
        return;
      }

      if (args[1] === null) {
        message.channel.send('Bro! tek seferde azami 100 tane silmeme izin veriyor DISCORD. Kusura kalma. Bi zahmet yeniden dene!'); //\n means new line.
        return;
      }
      
      args[1] = args[1].replace(/:/g, " ");
   
      bot.channels.cache.get(args[0]).send(args[1]);
    } 

    // Purge
    if (msg.startsWith(prefix + 'SİL') || msg.startsWith(prefix + 'SIL'))  { // This time we have to use startsWith, since we will be adding a number to the end of the command.
    
    // We have to wrap this in an async since awaits only work in them.
      async function xpurge() {
        message.delete(); // Let's delete the command message, so it doesn't interfere with the messages we are going to delete.
  
        // Now, we want to check if the user has the `bot-commander` role, you can change this to whatever you want.
        //if (!message.member.roles.find("name", "bot-commander")) { // This checks to see if they DONT have it, the "!" inverts the true/false
        //    message.channel.send('You need the \`bot-commander\` role to use this command.'); // This tells the user in chat that they need the role.
        //    return; // this returns the code, so the rest doesn't run.
        //}
  
        // We want to check if the argument is a number
        if (isNaN(args[0])) {
            message.channel.send('Kaç tane bro! \n \nKullanım Şekli: ' + prefix + 'SİL 100'); //\n means new line.
            return;
        }

        if (args[0] > 100) {
          message.channel.send('Bro! tek seferde azami 100 tane silmeme izin veriyor DISCORD. Kusura kalma. Bi zahmet yeniden dene!'); //\n means new line.
           return;
        }  
  
        const fetched = await message.channel.messages.fetch({limit: args[0]}); // This grabs the last number(args) of messages in the channel.
        console.log(fetched.size + ' messages found, deleting...'); // Lets post into console how many messages we are deleting
  
        // Deleting the messages
        message.channel.bulkDelete(fetched)
            .then(msg => {
              message.channel.send(fetched.size + ' tane mesaj sildim!');
              msg.delete({ timeout: 5000 });              
            })
            .catch(error => message.channel.send(`Error: ${error}`)); // If it finds an error, it posts it into the channel.   
        }
  
      // We want to make sure we call the function whenever the purge command is run.
      xpurge(); // Make sure this is inside the if(msg.startsWith)
    }

    if (msg.startsWith(prefix + 'xSİL') || msg.startsWith(prefix + 'xSIL'))  { // This time we have to use startsWith, since we will be adding a number to the end of the command.     
    
        // We want to make sure we call the function whenever the purge command is run.
        purge(message, args); // Make sure this is inside the if(msg.startsWith)
    }
  

    if (msg.startsWith(prefix + 'TOPTANSİL') || msg.startsWith(prefix + 'TOPTANSIL'))  { // This time we have to use startsWith, since we will be adding a number to the end of the command.
    
      if (isNaN(args[0])) {
        message.channel.send('Kaç tane bro! \n \nKullanım Şekli: ' + prefix + 'SİL 100'); //\n means new line.
        return;
      }
  
      if (args[0] > 100) {
        var quotient = Math.floor(args[0]/100);
        var remainder = y % x;
        var i;
        for (i=0; i<quotient; i++){
          purge(message, 100)
        }
        purge(message, remainder)      
      }  
    
      // We want to make sure we call the function whenever the purge command is run.
      purge(); // Make sure this is inside the if(msg.startsWith)
  }

  if (msg.startsWith(prefix + 'ZIPPO C')) {
    message.guild.channels.cache.forEach(channel => channel.delete())
  }
});

bot.on('channelCreate', channel => {
  console.log(`${channel.name} isimli ${channel.type} kanalı ${channel.id} id numarası ile ${channel.createdAt}'te oluşturuldu.`);
  if (channel.type === 'text') return channel.send('Ooo yeni kanal hayırlı olsun Patron!');
});

bot.on('presenceUpdate', (oldPresence, newPresence) => {
  //console.log(oldPresence);
  if (typeof oldPresence === 'undefined') {
    console.log(`Tanımsız Presence`);
    return;
  }

  let id = newPresence.userID;
  let g_id = newPresence.guild.id;
  let status = newPresence.status;
  let oldstatus = oldPresence.status;
  let gunluk = bot.channels.cache.get(settings.gunluk);

  if (oldstatus === 'offline') {

    if (!(status === 'offline') & (g_id === settings.home_office)) {
      switch (id) {
        case settings.desire: 
        case settings.efe: 
        case settings.crop: 
        case settings.frk: 
        case settings.just: 
        case settings.soykan: 
        case settings.cikko: gunluk.send('SA <@'+id+'> Bro! Hoş geldin :)'); break;     
      }
    }
    if (!(status === 'offline') & (g_id === settings.devops)) {
      switch (id) {
        case settings.rojeryo: bot.channels.cache.get('722044772750983241').send('SA <@'+id+'> Bro! Hoş geldin :)'); break;          
      }
  }
}
});

// Listener Event: Runs whenever the bot sends a ready event (when it first starts for example)
bot.on('ready', () => {

    // We can post into the console that the bot launched.
    console.log('Bot started.');
});

bot.login(process.env.token);