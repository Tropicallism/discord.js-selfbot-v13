## User Settings
<details>
<summary><strong>Click to show</strong></summary>

```js
client.setting // Return Data Setting User;
client.setting.setDisplayCompactMode(true | false); // Message Compact Mode
client.setting.setTheme('dark' | 'light'); // Discord App theme
client.setting.setLocale(value); // Set Language
	/**
	 * * Locale Setting, must be one of:
	 * * `DANISH`
	 * * `GERMAN`
	 * * `ENGLISH_UK`
	 * * `ENGLISH_US`
	 * * `SPANISH`
	 * * `FRENCH`
	 * * `CROATIAN`
	 * * `ITALIAN`
	 * * `LITHUANIAN`
	 * * `HUNGARIAN`
	 * * `DUTCH`
	 * * `NORWEGIAN`
	 * * `POLISH`
	 * * `BRAZILIAN_PORTUGUESE`
	 * * `ROMANIA_ROMANIAN`
	 * * `FINNISH`
	 * * `SWEDISH`
	 * * `VIETNAMESE`
	 * * `TURKISH`
	 * * `CZECH`
	 * * `GREEK`
	 * * `BULGARIAN`
	 * * `RUSSIAN`
	 * * `UKRAINIAN`
	 * * `HINDI`
	 * * `THAI`
	 * * `CHINA_CHINESE`
	 * * `JAPANESE`
	 * * `TAIWAN_CHINESE`
	 * * `KOREAN`
	 * @param {string} value
	 * @returns {locale}
	 */
```

</details>

## Discord User Info
<details>
<summary><strong>Click to show</strong></summary>

Code:
```js
GuildMember.user.getProfile();
// or
User.getProfile();
```
Response
```js
User {
  id: '721746046543331449',
  bot: false,
  system: false,
  flags: UserFlagsBitField { bitfield: 256 },
  connectedAccounts: [],
  premiumSince: 1623357181151,
  premiumGuildSince: 0,
  mutualGuilds: Collection(3) [Map] {
    '906765260017516605' => { id: '906765260017516605', nick: null },
    '809133733591384155' => { id: '809133733591384155', nick: 'uwu' },
    '926065180788531261' => { id: '926065180788531261', nick: 'shiro' }
  },
  username: 'Shiraori',
  discriminator: '1782',
  avatar: 'f9ba7fb35b223e5f1a12eb910faa40c2',
  banner: undefined,
  accentColor: undefined
}
```
</details>

## Discord User Friend / Blocked
<details>
<summary><strong>Click to show</strong></summary>

Code:
```js
GuildMember.user.setFriend();
User.unFriend();
Message.member.user.sendFriendRequest();
// or
GuildMember.user.setBlock();
User.unBlock();
```
Response
```js
User {
  id: '721746046543331449',
  bot: false,
  system: false,
  flags: UserFlagsBitField { bitfield: 256 },
  note: null,
  connectedAccounts: [],
  premiumSince: 1623357181151,
  premiumGuildSince: 0,
  mutualGuilds: Collection(3) [Map] {
    '906765260017516605' => { id: '906765260017516605', nick: null },
    '809133733591384155' => { id: '809133733591384155', nick: 'uwu' },
    '926065180788531261' => { id: '926065180788531261', nick: 'shiro' }
  },
  username: 'Shiraori',
  discriminator: '1782',
  avatar: 'f9ba7fb35b223e5f1a12eb910faa40c2',
  banner: undefined,
  accentColor: undefined
}
```
</details>

## Custom Status and RPC

<details>
<summary><strong>Click to show</strong></summary>
Custom Status

```js
const RichPresence = require('discord-rpc-contructor'); // My module :))
const custom = new RichPresence.CustomStatus()
    .setUnicodeEmoji('🎮') // Set Unicode Emoji [Using one]
    .setDiscordEmoji({ // Set Custom Emoji (Nitro Classic / Boost) [Using one]
        name: 'nom',
        id: '737373737373737373',
        animated: false,
    })
    .setState('Testing') // Name of presence
    .toDiscord();
client.user.setActivity(custom);
```

Rich Presence [Custom]
```js
const RPC = require('discord-rpc-contructor');
const r = new RPC.Rpc()
	.setApplicationId('817229550684471297')
	.setType(0)
	.setState('State')
	.setName('Name')
	.setDetails('Details')
	.setParty({
		size: [1, 2],
		id: RPC.uuid(),
	})
	.setStartTimestamp(Date.now())
	.setAssetsLargeImage('929325841350000660')
	.setAssetsLargeText('Youtube')
	.setAssetsSmallImage('895316294222635008')
	.setAssetsSmallText('Bot')
client.user.setActivity(r.toDiscord().game);
// Button not working
```
<img src='https://cdn.discordapp.com/attachments/820557032016969751/955767445220646922/unknown.png'>

Rich Presence with Twitch / Spotify

```js
Update soon ~
```

<strong>How to get AssetID ?</strong>

Code

```js
const RPC = require('discord-rpc-contructor');
// Bot ID
RPC.getRpcImages('817229550684471297').then(console.log);
```
Return
```js
// ID is AssetID
[
  { id: '838629816881381376', type: 1, name: 'honkai' },
  { id: '853533658250084352', type: 1, name: 'vscode' },
  { id: '895316294222635008', type: 1, name: 'botsagiri' },
  { id: '929324633063292929', type: 1, name: 'soundcloud' },
  { id: '929324634858479666', type: 1, name: 'spotify' },
  { id: '929325841350000660', type: 1, name: 'youtube' }
]
```
You can cache to use these files, do not run this function too much because it will be rate limit
And you can change the status 5 times every 20 seconds!
</details>

## User & ClientUser Method
<details>
<summary>Click to show</summary>

```js
// HypeSquad
await client.user.setHypeSquad('HOUSE_BRAVERY');
await client.user.setHypeSquad('HOUSE_BRILLIANCE');
await client.user.setHypeSquad('HOUSE_BALANCE');
// Set Note to User
await user.setNote('Hello World');
// Set Username
await client.user.setUsername('new username', 'password');
// Set Accent Color
await client.user.setAccentColor('RED'); // set color same as Embed.setColor()
// Set Banner
await client.user.setBanner('image file / image url'); // same as setAvatar & Require Nitro level 2
// Set Discord Tag
await client.user.setDiscriminator('1234', 'password'); // #1234 & Require Nitro
// Set About me
await client.user.setAboutMe('Hello World');
// Set Email
await client.user.setEmail('aiko.dev@mail.nezukobot.vn', 'password'); // It is clone email =))
// Change Password
await client.user.setPassword('old password', 'new password');
// Disable Account
await client.user.disableAccount('password');
// Delete Account [WARNING] Cannot be changed once used!
await client.user.deleteAccount('password');
```
</details>


## Reddem Nitro ?
<details>
<summary>Click to show</summary>

```js
await client.reddemNitro('code')
```
</details>
