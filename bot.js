const Discord = require('discord.js')
const logger = require('winston');

let all_user = [];
let number_user_message = [];

let all_user_spam = [];
let number_user_message_spam = [];
let message_minute_spam = [];

let message_minute = [];
let user_kick = [];

let role_menu = {};

let i = -1;
let  a = -1;
let verif = 0;

const bot = new Discord.Client();
 
bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});
 
bot.on('message', message => {
    let role_canard_tueur = message.guild.roles.find((role => role.name === "Canard Tueur"),
        role_voyou = message.guild.roles.find(role => role.name === "Voyou"),
        role_terreur = message.guild.roles.find(role => role.name === "Terreur"),
        role_bandit = message.guild.roles.find(role => role.name === "Bandit"),
        role_criminel = message.guild.roles.find(role => role.name === "Criminel"),
        role_homme_de_main = message.guild.roles.find(role => role.name === "Homme de main"),
        role_Second = message.guild.roles.find(role => role.name === "Second"),
        role_veteran = message.guild.roles.find(role => role.name === "Vétéran")
    );

    if (message.author.id != 648228281316802562) {


       	const found = all_user.find(element => element == message.author.id);
        if (!found) {
            nb_user = all_user.push(message.author.id);
            number_user_message.push(0);
        }

        const user_index = all_user.findIndex(element => element == message.author.id);
        number_user_message[user_index] = number_user_message[user_index] + 1 ;

        const member = message.guild.member(message.author.id);
        if (!member){
        	verif = 1 ;
        }


//                      COMMAND
// ==================================================================================================================================================



        if (message.content === '!xp') {
    		message.reply("Vous avez envoyé " + number_user_message[user_index] + " messages");
  		}
        if (message.content.startsWith('!role')) {
        	let string = '';
    		let array_role = message.content.split(' ');
    		role_menu[message.id] = "";
    		i = 1
    		while (i < array_role.length) {
    			if (array_role[i + 1] != "") {
    				if (string == "") {
    					string = array_role[i] + " " + ":" + " " + array_role[i + 1];
    				} else {
    					string =  string + "\n" + array_role[i] + " " + ":" + " " + array_role[i + 1];
    				}
    				role_menu[message.id] = role_menu[message.id] + " " + array_role[i];
    			}
    			i = i + 2;
    		}
    		message.channel.send("Role Menu: Rôles de départ\nReact to give yourself a role.\n" + string);
    		message.channel.send(role_menu[message.id]);
    		message.delete();

  		}
  		
// ==================================================================================================================================================


//                      ANTIRAID
// ==================================================================================================================================================

    if (message.channel.name == "join-chat" && verif == 0){
        if ( (message_minute[i]-message_minute[0]) >= 60000){
            message_minute=[];
            i = 0;
            user_kick = [];
        }

        message_minute.push(message.createdTimestamp);
        user_kick.push(member);
        i= i + 1;
        if (i > 4) {
            user_kick.forEach(element => element.kick());
        }
    }

// ==================================================================================================================================================


//                      ANTISPAM
// ==================================================================================================================================================

        const found_spam = all_user_spam.find(element => element == message.author.id);

        if ( (message_minute_spam[a]-message_minute_spam[0]) >= 60000){
                message_minute_spam=[];
                a = 0;

                number_user_message_spam = [];
        }

        if (!found_spam) {
            all_user_spam.push(message.author.id);
            number_user_message_spam.push(0);
        }

        message_minute_spam.push(message.createdTimestamp);
        a= a+1;

        const user_index_spam = all_user_spam.findIndex(element => element == message.author.id);

        number_user_message_spam[user_index_spam] = number_user_message_spam[user_index_spam] + 1 ;
        if (number_user_message_spam[user_index_spam] >= 20 && verif == 0) {
            member.kick();
        }
        


// ==================================================================================================================================================


//                      AJOUTER DES ROLES ET LES ENLEVER
// ==================================================================================================================================================


	switch (number_user_message[user_index]) {
        case 3000 :

            member.addRole(role_veteran).catch(console.error);

            member.removeRole(role_Second).catch(console.error);

            message.reply("Bravo vous êtes maintenant Vétéran");
            break;

        case 2500 :

            member.addRole(role_Second).catch(console.error);

            member.removeRole(role_homme_de_main).catch(console.error);

            message.reply("Bravo vous êtes maintenant Second");
            break
        case 2000 :

            member.addRole(role_homme_de_main).catch(console.error);

            member.removeRole(role_criminel).catch(console.error);

            message.reply("Bravo vous êtes maintenant Homme de main");
            break;
        case 1500 :

            member.addRole(role_criminel).catch(console.error);

            member.removeRole(role_bandit).catch(console.error);

            message.reply("Bravo vous êtes maintenant Criminel");
            break;
        case 500 :

            member.addRole(role_bandit).catch(console.error);

            member.removeRole(role_terreur).catch(console.error);

            message.reply("Bravo vous êtes maintenant Bandit");
            break;
        case 125 :

            member.addRole(role_terreur).catch(console.error);

            member.removeRole(role_voyou).catch(console.error);

            message.reply("Bravo vous êtes maintenant Terreur");

        case 25 :

            member.addRole(role_voyou).catch(console.error);

            member.removeRole(role_canard_tueur).catch(console.error);

            message.reply("Bravo vous êtes maintenant Voyou");
            break;
        case 5 :

            member.addRole(role_canard_tueur).catch(console.error);

            message.reply("Bravo vous êtes maintenant Canard Tueur");
            break;
	}

// ==================================================================================================================================================
	verif = 0;
    }

});
 
bot.login(process.env.BOT_TOKEN);