## Interaction
<details>
<summary>Button Click</summary>

```js
await Button.click(Message); // Message has button (v1)
//
await message.clickButton(buttonID); // Message has button (v2)
```
</details>
<details>
<summary>Message Select Menu</summary>

```js
await MessageSelectMenu.select(Message, options); // Message has menu (v1)
// value: ['value1', 'value2' , ...]
await message.selectMenu(menuID, options) // If message has >= 2 menu
await message.selectMenu(options) // If message has 1 menu
```
</details>
<details>
<summary>Slash Command</summary>

```js
// v1 [deprecated]
// v2
await Channel.sendSlash(botID, commandName, ['option1', 'option2']);
// Eg /addrole roleID: 12345678987654321 userID: 98765432123456789
// => await Channel.sendSlash(botID, 'addrole', ['12345678987654321', '98765432123456789']);
// Command group
await Channel.sendSlash(botID, commandName, ['sub command', 'option1', 'option2']);
// Eg: /role add roleID: 12345678987654321 userID: 98765432123456789
// => await Channel.sendSlash(botID, 'role', ['add', '12345678987654321', '98765432123456789']);
```
</details>
<details>
<summary>Message Context Command</summary>

```js
// v1 [deprecated]
// v2
await message.contextMenu(botID, commandName);
```
</details>
<details>
<summary>Issue ?</summary>

- It has some minor bugs.
> DiscordAPIError [20012] You are not authorized to perform this action on this application
> 
> I tried to fix it by creating 1 DMs with bot
> 
> In this way, all Slash commands can be obtained
- I will try to find another way to not need to create DMs with Bot anymore
- Credit: [Here](https://www.reddit.com/r/Discord_selfbots/comments/tczprx/discum_help_creating_a_selfbot_that_can_do_ping/)
</details>

## MessageEmbed ?
- Because Discord has removed the ability to send Embeds in its API, that means MessageEmbed is unusable. But I have created a constructor that uses oEmbed from [page](https://embed.benny.fun/) (known to this site by module py discord.py-self_embed, thanks)
- Update: This [page](https://embed.benny.fun/) is no longer available.

<details>
<summary><strong>Click to show</strong></summary>


Code:
```js
const Discord = require('discord.js-selfbot-v13');
const w = new Discord.WebEmbed({
  shorten: true,
  hidden: false // if you send this embed with MessagePayload.options.embeds, it must set to false
})
	.setAuthor({ name: 'hello', url: 'https://google.com' })
	.setColor('RED')
	.setDescription('description uh')
	.setProvider({ name: 'provider', url: 'https://google.com' })
	.setTitle('This is Title')
        .setURL('https://google.com')
	.setImage(
		'https://cdn.discordapp.com/attachments/820557032016969751/959093026695835648/unknown.png',
	)
	.setVideo(
		'https://cdn.discordapp.com/attachments/877060758092021801/957691816143097936/The_Quintessential_Quintuplets_And_Rick_Astley_Autotune_Remix.mp4',
	);
message.channel.send({ content: `Hello world`, embeds: [w] }) // Patched :)

```
### Features & Issues
- No Timestamp, Footer, Thumbnail (but embed video, thumbnail working), Fields, Author iconURL
- Video with Embed working
- Description limit 350 characters
- If you use hidden mode you must make sure your custom content is less than 1000 characters without nitro (because hidden mode uses 1000 characters + URL)

</details>