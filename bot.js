// Calling Packages
const Discord = require('discord.js');
const bot = new Discord.Client();
const settings = require('./settings.json');
const sqlite3 = require('sqlite3').verbose();

var prefix = settings.prefix;

//Purge function
async function purge(message, args) {

  const fetched = await message.channel.messages.fetch({limit: args}); // This grabs the last number(args) of messages in the channel.
  console.log(fetched.size + ' messages found, deleting...'); // Lets post into console how many messages we are deleting
  let msgcount = fetched.size;
  // Deleting the messages
  message.channel.bulkDelete(fetched)
    .catch(error => message.channel.send(`Aysnc Function Globar Purge Error: ${error}`)); // If it finds an error, it posts it into the channel.   
  //console.log("Purge içinde msgcount: ",msgcount);
  return msgcount;
}

// Listener Event: Runs whenever a message is received.
bot.on('message', message => {

    let msg = message.content.toUpperCase(); 
    let sender = message.author.id; 
    let cont = message.content.slice(prefix.length).split(" "); // This variable slices off the prefix, then puts the rest in an array based off the spaces
    let args = cont.slice(1); // This slices off the command in cont, only leaving the arguments.
    let isgunlukkanal = false;
    //kanal günlük kanal mı
    if (message.channel.id === settings.gunluk) {
      isgunlukkanal = true;
    }
    // Commands
    switch (msg) {
      case 'SA': 
      case 'S.A':
      case 'S.A.': message.reply('AS bro!').then(d_msg => { d_msg.delete({ timeout: 10000 });}); break;
      case 'SAE': if (isgunlukkanal) {message.channel.send('Dikkat et QR lı değilse blind olabilir!').then(d_msg => { d_msg.delete({ timeout: 10000 });});} break;
      case 'NTA': if (isgunlukkanal) {message.channel.send('Tüh be. Bitti mi <@'+sender+'>? Nasip işte!').then(d_msg => { d_msg.delete({ timeout: 10000 });});} break;
      case 'ACF': if (isgunlukkanal) {message.channel.send('Kral geldi Kral!!! :)').then(d_msg => { d_msg.delete({ timeout: 10000 });});} break;
      case 'ALPACA': if (isgunlukkanal) {message.channel.send(`Hadi yine iyisiniz. <@${settings.frk}> <@${settings.desire}> size yok boşuna beklemeyin...!`).then(d_msg => { d_msg.delete({ timeout: 10000 });});} break;
      case 'DAYILAR': message.channel.send('Dayım benim! Nasılsın?').then(d_msg => { d_msg.delete({ timeout: 10000 });}); break;
      case prefix + 'MASTER': message.channel.send(`<@${settings.sahip}>`).then(d_msg => { d_msg.delete({ timeout: 10000 });}); break;
      case prefix + 'DOWN': return; 
      case prefix + '?': message.channel.send(settings.help); break;
    }

    if ((msg === 'INŞ') || (msg === 'INS') || msg.includes(' INŞ ') || msg.includes(' INS ') || msg.includes('INŞ ') || msg.includes('INS ') || msg.includes('INSALLAH') || msg.includes('INSAALLAH') || msg.includes('INŞALLAH') || msg.includes('INŞALLAH')) {
      message.channel.send('Amin!').then(d_msg => { d_msg.delete({ timeout: 10000 });});
    }  
    
    if (msg.includes('AEO') || msg.includes('GÖRÜŞÜRÜZ')) {
      message.channel.send('A.E.O. kardeşim!').then(d_msg => { d_msg.delete({ timeout: 10000 });});
    }

    if (msg.startsWith(prefix + 'SENDMSG'))  {
      message.delete();

      if (isNaN(args[0])) {
        return;
      }

      botmsg = args.slice(1); 

      botmsg = botmsg.toString();
      
      botmsg = botmsg.replace(/,/g, " ");
   
      bot.channels.cache.get(args[0]).send(botmsg);
    } 

    // Purge
    if (msg.startsWith(prefix + 'XSİL') || msg.startsWith(prefix + 'XSIL'))  { // This time we have to use startsWith, since we will be adding a number to the end of the command.
    
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
              message.channel.send(fetched.size + ' tane mesaj sildim!').then(d_msg => { d_msg.delete({ timeout: 5000 });});
              //console.log(msg);
              //msg.delete({ timeout: 5000 });              
            })
            .catch(error => message.channel.send(`Error: ${error}`)); // If it finds an error, it posts it into the channel.   
        }
  
      // We want to make sure we call the function whenever the purge command is run.
      xpurge(); // Make sure this is inside the if(msg.startsWith)
    }

    if (msg.startsWith(prefix + 'SİL') || msg.startsWith(prefix + 'SIL'))  { 
      
      message.delete();
      
      if (isNaN(args[0])) {
        message.channel.send('Kaç tane bro! \n \nKullanım Şekli: ' + prefix + 'SİL 100'); 
        return;
      } 

      async function xsil() {     
        let msgcount = await purge(message, args[0]); 
        //console.log("Purge dışında msgcount: ",msgcount);
        message.channel.send(msgcount + ' tane mesaj sildim!').then(d_msg => { d_msg.delete({ timeout: 5000 });});
      }
      xsil();
    }

    if (msg.startsWith(prefix + 'TOPTANSİL') || msg.startsWith(prefix + 'TOPTANSIL'))  { 
    
      message.delete();

      if (isNaN(args[0])) {
        message.channel.send('Kaç tane bro! \n \nKullanım Şekli: ' + prefix + 'TOPTANSİL 100'); 
        return;
      }

      async function toptansil() {

        let msgcount = 0;
  
        if (args[0] > 100) {
          var quotient = Math.floor(args[0]/100);
          var remainder = args[0] % 100;
          var i;
          //if (quotient>0){
            //purge(message, 100)
          //}
          for (i=0; i<quotient; i++){
            msgcount += await purge(message, 100)
              .catch(error => message.channel.send(`ToptanSil fonksiyonunda purge 100 komutunda Hata: ${error}`)); // If it finds an error, it posts it into the channel.   ;
          }
          if (remainder !== 0) {
          msgcount += await purge(message, remainder)
            .catch(error => message.channel.send(`ToptanSil fonksiyonunda purge kalan komutunda Hata: ${error}`)); // If it finds an error, it posts it into the channel.  
          }      
        } else
          msgcount += await purge(message, args[0])
            .catch(error => message.channel.send(`ToptanSil fonksiyonunda purge args[0] komutunda Hata: ${error}`)); // If it finds an error, it posts it into the channel.   
  
        //console.log("Purge dışında msgcount: ",msgcount);
        function deletedmsg(){
          message.channel.send(msgcount + ' tane mesaj sildim!').then(d_msg => { d_msg.delete({ timeout: 15000 });});       
        }
        setTimeout(deletedmsg,10000);
      }
      toptansil();
    }

    if (msg.startsWith(prefix + 'SPAM')) {

      message.delete();

      if (isNaN(args[0])) {
        message.channel.send('Kaç tane bro! \n \nKullanım Şekli: ' + prefix + 'SPAM 100'); 
        return;
      }

      var i;
      for (i=0; i<args[0]; i++){
        message.channel.send(i+1); 
      }
    }

    if (msg.startsWith(prefix + 'ZIPPO C')) {

      message.guild.channels.cache.forEach(channel => {
        if ((channel.type !== "category") & (channel.parentID !== '645025507041083406'))
          console.log(channel.id, channel.name, channel.type, channel.parentID, bot.channels.cache.get(channel.parentID).name);       
          channel.delete();
      });
    }

    if (msg.startsWith(prefix + 'AYARLAR')) {

      if (args[0] === 'undefined') {
       console.log(`settings deneme = ${settings.deneme}`);
       return;
      }
      
      let key = args[0];
      console.log(`Önce : ${settings[key]}`);
      settings[key] = args[1];
      console.log(`Sonra : ${settings[key]}`);
    }

    if (msg.startsWith(prefix + 'KANALLAR')) {    
      message.guild.channels.cache.forEach(channel => {
        if (channel.type !== "category"){
          console.log(channel.id, channel.name, channel.type, channel.parentID, bot.channels.cache.get(channel.parentID).name);
          message.channel.send(bot.channels.cache.get(channel.parentID).name + " altında " + channel.name);
        }
      });
    }

    if (msg.startsWith(prefix + 'MESAJLAR')) {
      message.delete();    
      message.channel.messages.fetch({ limit: 100 })
        .then(msgs => {
          console.log("Toplam Mesaj Sayısı = ", msgs.size)
          msgs.forEach(m => console.log(message.channel.id, message.channel.name, m.content));
      });
    }

    if (msg.startsWith(prefix + 'ZZZ')) {
      message.delete();    
      
      message.channel.messages.fetch().then(async messages => {
        console.log(`${messages.size} procuradas.`);

        let finalArray = [];

        const putInArray = async (data) => finalArray.push(data);
        const handleTime = (timestamp) => moment(timestamp).format("DD/MM/YYYY - hh:mm:ss a").replace("pm", "PM").reaplce("am", "AM"); 

        for (const message of messages.array().reverse()) await putInArray(`${handleTime(message.timestamp)} ${msg.author.username} : ${msg.content}`); 

        console.log(finalArray);
        console.log(finalArray.length);
      });
    } 

    if (msg.startsWith(prefix + 'NSİL') || msg.startsWith(prefix + 'NSIL'))  { // This time we have to use startsWith, since we will be adding a number to the end of the command.
      //message.delete();   
      
      if (isNaN(args[0])) {
        message.channel.send('Kaç tane bro! \n \nKullanım Şekli: ' + prefix + 'NSİL 100'); 
        return;
      }

      args[0] += 1;

      if (args[0] > 100) {
        //message.channel.send('Bro! tek seferde azami 100 tane silmeme izin veriyor DISCORD. Kusura kalma. Bi zahmet yeniden dene!'); 
        args[0] = 100;
      }    

      message.channel.messages.fetch({ limit: args[0] })
        .then( msgs => {
          //console.log("Toplam Mesaj Sayısı = ", msgs.size)
          let deletedmsgcount = msgs.size;
          msgs.forEach( m => {
            bot.channels.cache.get(message.channel.id).messages.cache.get(m.id).delete();
          });
          console.log(deletedmsgcount, " messages were deleted");
      });
    }

    if (msg.startsWith(prefix + 'NTOPTANSİL') || msg.startsWith(prefix + 'NTOPTANSIL'))  { // This time we have to use startsWith, since we will be adding a number to the end of the command.
      message.delete();   
      
      if (isNaN(args[0])) {
        message.channel.send('Kaç tane bro! \n \nKullanım Şekli: ' + prefix + 'NTOPTANSİL 100'); //\n means new line.
        return;
      }

      async function nsil(number) {

        message.channel.messages.fetch({ limit: number })
          .then( async msgs => {
            //console.log("Toplam Mesaj Sayısı = ", msgs.size)
            let deletedmsgcount = msgs.size;
            msgs.forEach(async m => {
              temp = bot.channels.cache.get(message.channel.id).messages.cache.get(m.id);
              //console.log(temp.content);
              temp.delete();
            });
            console.log(deletedmsgcount, " messages were deleted");
            return deletedmsgcount;
        });
      }
      
      async function ntoptansil() {

        let msgcount = 0;
  
        if (args[0] > 100) {
          var quotient = Math.floor(args[0]/100);
          var remainder = args[0] % 100;
          var i;
          for (i=0; i<quotient; i++){
            msgcount += await nsil(100)
              .catch(error => message.channel.send(`Error: ${error}`)); // If it finds an error, it posts it into the channel.   ;
          }
          if (remainder !== 0) {
          msgcount += await nsil(remainder)
            .catch(error => message.channel.send(`Error: ${error}`)); // If it finds an error, it posts it into the channel.  
          }      
        } else
          msgcount += await nsil(args[0]) 
            .catch(error => message.channel.send(`Error: ${error}`)); // If it finds an error, it posts it into the channel.   
  
        //console.log("Purge dışında msgcount: ",msgcount);
        //message.channel.send(msgcount + ' tane mesaj sildim!').then(d_msg => { d_msg.delete({ timeout: 5000 });});       
      }
      ntoptansil();
    }

    /*
    if (msg.startsWith(prefix + 'DELETE')) { // This time we have to use startsWith, since we will be adding a number to the end of the command.
      message.delete();   
      
      async function delfetch(number) {

        message.channel.messages.fetch({ limit: number })
          .then( async msgs => {
            return msgs.size;
          });
      }

      async function delsil(number) {

        message.channel.messages.fetch({ limit: number })
          .then( async msgs => {
            //console.log("Toplam Mesaj Sayısı = ", msgs.size)
            let deletedmsgcount = msgs.size;
            msgs.forEach(async m => {
              temp = bot.channels.cache.get(message.channel.id).messages.cache.get(m.id);
              console.log(temp.content);
              temp.delete();
            });
            console.log(deletedmsgcount, " messages were deleted");
        });
      }
      
      async function deltoptansil() {

        let msgcount = 0;

        let tobedeleted = await delfetch(100);

        console.log(tobedeleted, " are ready");

        while (tobedeleted > 0) {
          delsil(100);
          tobedeleted = await delfetch(100);
          console.log(tobeleted, " are ready in while");
        }
      }
      deltoptansil();
    }
   */
  if (msg.startsWith(prefix + 'DSM'))  { 
    if (isNaN(args[0])) {
      message.channel.send('Hatalı Kullanım bro! \n \nKullanım Şekli: ' + prefix + 'DSM 123488237492379'); 
      return;
    }
    
    temp = bot.channels.cache.get(message.channel.id).messages.cache.get(args[0]);
              //console.log(temp.content);
    temp.delete();
  }     
});

bot.on('channelCreate', channel => {
  console.log(`${channel.name} isimli ${channel.type} kanalı ${channel.id} id numarası ile ${channel.createdAt}'te oluşturuldu.`);
  if (channel.type === 'text') return channel.send('Ooo yeni kanal hayırlı olsun Patron!').then(d_msg => { d_msg.delete({ timeout: 10000 });});
});

//Presence Olayları
bot.on('presenceUpdate', (oldPresence, newPresence) => { 

  let id = newPresence.userID;
  let g_id = newPresence.guild.id;
  let status = newPresence.status;
  let username = newPresence.user.username;

  if (newPresence.user.bot) {
    //console.log(`Bot statüsü değişti: ${username} \t\t${status}`);
    return;
  } 

  if (typeof oldPresence === 'undefined') {
    console.log(`Tanımsız Presence\t\t ${username} \t ${status}`);
    var oldstatus = 'offline';
  } else {
    var oldstatus = oldPresence.status;
  }

  let salutechid = 0;
  newPresence.guild.channels.cache.forEach((channel) => {
    //console.log(`Kanal = ${channel.id}\t ${channel.name} channel`);
    if ((channel.name === "genel")  || (channel.name === "günlük") || (channel.name === "gunluk")) salutechid = channel.id;
  });
  
  if (salutechid == 0) {
    console.log("Salute Kanalı Tanımlı Değil...");
    return;
  }
  
  let salutech = bot.channels.cache.get(salutechid);

  //db bağlan
  let db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
      console.error(err.message + " DB açılamadı sorun var...");
      //hata kodunu öğren
      //db.run(`CREATE TABLE IF NOT EXISTS users (UserID NUMERIC UNIQUE, UserName TEXT, LastSalute	TEXT)`);
      //console.log("DB yok. Yeni DB oluşturuldu")
    }
    //console.log('DB bulundu ve bağlantı sağlandı');
  });

  //db oluştur yoksa
  db.run(`CREATE TABLE IF NOT EXISTS users (UserID NUMERIC UNIQUE, UserName TEXT, LastSalute	TEXT)`);

  var datenow = new Date();
  var strdatenow = datenow.toLocaleString('tr-TR');

  //id ye göre tablodan çek --- bilgiler userdata da
  
  let sql = `SELECT * FROM users WHERE UserID = ?`;
  let timepast = 0;
  
  db.get(sql, [id], (err, row) => {
    if (err) return console.error(err.message + " user bilgisi db den alınırken hata oluştu");
    else if (!row) {
      console.log(`Kayıtsız Kullanıcı`);
      db.run(`INSERT INTO users VALUES(?,?,?)`, [id, username, strdatenow], function(err) {
        if (err) {
          console.log(err.message + " insert sırasında hata oluştu");
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
        });
    } else {
      //bu kişi db de varsa
      console.log(row.UserID, row.UserName, row.LastSalute, " başarılı bir şekilde db den aldık");
      var isSaluted = false;
      if (status !== 'offline') {
        
        var lastsalute = new Date(Date.parse(row.LastSalute));
        timepast = Math.abs(Math.floor((datenow.getTime() - lastsalute.getTime()) / 1000 / 60 / 60));
        //timepast = Math.abs(Math.floor((datenow.getTime() - lastsalute.getTime()) / 1000));
        console.log(`Yeni Statüsü= ${status}\t"Eski Statü= ${oldstatus}\n${id}\t${username}\tson online zamanı = ${lastsalute}\t\t ${row.LastSalute}\nGeçen Süre = ${timepast}`);
        if ((timepast > 4) & (oldstatus === 'offline')) {
          if (g_id === settings.home_office){  
            switch (id) {
              case settings.desire: 
              case settings.efe: 
              case settings.crop: 
              case settings.frk: 
              case settings.just: 
              case settings.soykan: 
              case settings.cikko: salutech.send('SA <@'+id+'> Bro! Hoş geldin :)'); isSaluted = true; break;  
            }
          } else {
            salutech.send('SA <@'+id+'> Bro! Hoş geldin :)').then(d_msg => { d_msg.delete({ timeout: 10000 });}); 
            isSaluted = true;
          }
        }
        
      } else isSaluted = true;

      if (isSaluted) {
        console.log(`Selamlama oldu ya da kullanıcı offline olup zaman güncellemesi yapıldı\nYeni Statüsü = ${status}\t"Eski Statü = ${oldstatus}\n${id}\t${username}\tson online zamanı = ${lastsalute}\t\t ${row.LastSalute}\nGeçen Süre = ${timepast}`);
        let sql = `UPDATE users
          SET LastSalute = ?
          WHERE UserID = ?`;
        db.run(sql, [strdatenow, id], function(err) {
          if (err) {
            return console.error(err.message," update sırasında hata oluştu.");
          }
          console.log(`Row(s) updated: ${this.changes} zaman güncellemesi başarılı`);
        });
      } 
    }
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
  
});

// Listener Event: Runs whenever the bot sends a ready event (when it first starts for example)
bot.on('ready', () => {
    console.log('Bot started.');
});

//bot.login(settings.token);
bot.login(process.env.token);