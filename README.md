<div align="center">
  <br />
  <p>
    <a href="https://discord.js.org"><img src="https://discord.js.org/static/logo.svg" width="546" alt="discord.js" /></a>
  </p>
  <br />
  <p>
    <a href="https://discord.gg/djs"><img src="https://img.shields.io/discord/222078108977594368?color=5865F2&logo=discord&logoColor=white" alt="Discord server" /></a>
    <a href="https://www.npmjs.com/package/discord.js"><img src="https://img.shields.io/npm/v/discord.js.svg?maxAge=3600" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/discord.js"><img src="https://img.shields.io/npm/dt/discord.js.svg?maxAge=3600" alt="npm downloads" /></a>
    <a href="https://github.com/discordjs/discord.js/actions"><img src="https://github.com/discordjs/discord.js/actions/workflows/test.yml/badge.svg" alt="Tests status" /></a>
  </p>
</div>

## About

- discord.js-selfbot-v13 is a [Node.js](https://nodejs.org) module that allows user accounts to interact with the Discord API v9.


<div align="center">
  <p>
    <a href="https://www.npmjs.com/package/discord.js-selfbot-v13"><img src="https://img.shields.io/npm/v/discord.js-selfbot-v13.svg?maxAge=3600" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/discord.js-selfbot-v13"><img src="https://img.shields.io/npm/dt/discord.js-selfbot-v13.svg?maxAge=3600" alt="npm downloads" /></a>
  </p>
</div>

### <strong>I don't take any responsibility for blocked Discord accounts that used this module.</strong>
### <strong>Using this on a user account is prohibited by the [Discord TOS](https://discord.com/terms) and can lead to the account block.</strong>

### <strong>[Feature + Example Code](https://github.com/aiko-chan-ai/discord.js-selfbot-v13/blob/main/DOCUMENT.md)</strong>
### <strong>[Risky actions](https://github.com/Merubokkusu/Discord-S.C.U.M/issues/66)</strong>

## Checklist
- [x] Send + receive messages with Attachment, Embed (WebEmbed), etc.
- [x] Setting Discord App (Missing a lot of functions)
- [X] Requests (add friends, join guilds, etc.)
- [X] Profile Editing (Name, Status, Avatar, Bio, Rich-Presence, etc.)
- [X] Interactions (slash commands, buttons, etc.)
- [X] Voice Channel (Join, Leave, Speak, etc.)
- [ ] Improve documentation (maybe)
- [ ] Add more guild http api wraps
- [ ] Audio / Video call 
- [ ] Everything

## Installation

**Node.js 16.6.0 or newer is required**

```sh-session
npm install discord.js-selfbot-v13@latest
```
## Example

```js
const { Client } = require('discord.js-selfbot-v13');
const client = new Client(); // Intents and Partials are already set so you don't have to define them

client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);
})

client.login('token');
```

<strong>Github Repo (Play Youtube music) [Here](https://github.com/aiko-chan-ai/Selfbot-Example)</strong>

## Get Token ?

<strong>Copy code to console Discord [Ctrl + Shift + I]</strong>

```js
window.webpackChunkdiscord_app.push([[Math.random()], {}, (req) => {for (const m of Object.keys(req.c).map((x) => req.c[x].exports).filter((x) => x)) {if (m.default && m.default.getToken !== undefined) {return copy(m.default.getToken())}if (m.getToken !== undefined) {return copy(m.getToken())}}}]); console.log("%cWorked!", "font-size: 50px"); console.log(`%cYou now have your token in the clipboard!`, "font-size: 16px")
```

Credit: <img src="https://cdn.discordapp.com/emojis/889092230063734795.png" alt="." width="16" height="16"/> [<strong>hxr404</strong>](https://github.com/hxr404/Discord-Console-hacks)

## Selfbot feature ?
- [Friends and Block Members](https://github.com/aiko-chan-ai/discord.js-selfbot-v13/blob/main/DOCUMENT.md#discord-user-friend--blocked)
- [Discord Apps Setting: Theme, Language, HypeSquad, etc.](https://github.com/aiko-chan-ai/discord.js-selfbot-v13/blob/main/DOCUMENT.md#user-settings)
- [Get Profile GuildMember: Nitro Time, Boost Time, Connected Account, Bio, etc.](https://github.com/aiko-chan-ai/discord.js-selfbot-v13/blob/main/DOCUMENT.md#discord-user-info)
- [Setting Position Guild and Folder](https://github.com/aiko-chan-ai/discord.js-selfbot-v13/blob/main/DOCUMENT.md#discord-guild-set-position)
- [Custom Status and RPC (without button, because it's not working)](https://github.com/aiko-chan-ai/discord.js-selfbot-v13/blob/main/DOCUMENT.md#custom-status-and-rpc)
- [Interaction: Button, MessageSelectMenu, Slash, ContextMenu](https://github.com/aiko-chan-ai/discord.js-selfbot-v13/blob/main/DOCUMENT.md#interaction)
- [You can request more features for my module by placing an issue!](https://github.com/aiko-chan-ai/discord.js-selfbot-v13/issues)
- Click <strong>[here](https://github.com/aiko-chan-ai/discord.js-selfbot-v13/blob/main/DOCUMENT.md)</strong> to see the patched functions
## Links [Discord.js]

- [Website](https://discord.js.org/) ([source](https://github.com/discordjs/website))
- [Documentation](https://discord.js.org/#/docs)
- [Guide](https://discordjs.guide/) ([source](https://github.com/discordjs/guide))
  See also the [Update Guide](https://discordjs.guide/additional-info/changes-in-v13.html), including updated and removed items in the library.
- [discord.js Discord server](https://discord.gg/djs)
- [Discord API Discord server](https://discord.gg/discord-api)
- [GitHub](https://github.com/discordjs/discord.js)
- [npm](https://www.npmjs.com/package/discord.js)
- [Related libraries](https://discord.com/developers/docs/topics/community-resources#libraries)

## Contributing [Discord.js]

- Before creating an issue, please ensure that it hasn't already been reported/suggested, and double-check the
[documentation](https://discord.js.org/#/docs).  
- See [the contribution guide](https://github.com/discordjs/discord.js/blob/main/.github/CONTRIBUTING.md) if you'd like to submit a PR.

## Need help?
Contact me in Discord: [Shiraori#1782](https://discord.com/users/721746046543331449)

## Credits
- [Discord.js Teams](https://github.com/discordjs/discord.js)
- [Discord S.C.U.M Teams](https://github.com/Merubokkusu/Discord-S.C.U.M)
- [Yellowy dsb.js](https://github.com/TheDevYellowy/dsb.js)
- [Discord Console Hack](https://github.com/hxr404/Discord-Console-hacks)
- And the people who submitted the issue, colab, ...

## <strong><img src="https://cdn.discordapp.com/attachments/820557032016969751/952436539118456882/flag-vietnam_1f1fb-1f1f3.png" alt="." width="20" height="20"/> Vietnamese</strong>
- Tóm lại là module này dùng Discord.js v13 , API v9 nên chưa chết sớm đâu, cứ dùng đi =))
