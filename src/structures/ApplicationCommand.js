'use strict';

const Base = require('./Base');
const ApplicationCommandPermissionsManager = require('../managers/ApplicationCommandPermissionsManager');
const {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  ChannelTypes,
} = require('../util/Constants');
const SnowflakeUtil = require('../util/SnowflakeUtil');
const { Message } = require('discord.js');

/**
 * Represents an application command.
 * @extends {Base}
 */
class ApplicationCommand extends Base {
  constructor(client, data, guild, guildId) {
    super(client);

    /**
     * The command's id
     * @type {Snowflake}
     */
    this.id = data.id;

    /**
     * The parent application's id
     * @type {Snowflake}
     */
    this.applicationId = data.application_id;

    /**
     * The guild this command is part of
     * @type {?Guild}
     */
    this.guild = guild ?? null;

    /**
     * The guild's id this command is part of, this may be non-null when `guild` is `null` if the command
     * was fetched from the `ApplicationCommandManager`
     * @type {?Snowflake}
     */
    this.guildId = guild?.id ?? guildId ?? null;

    /**
     * The manager for permissions of this command on its guild or arbitrary guilds when the command is global
     * @type {ApplicationCommandPermissionsManager}
     */
    this.permissions = new ApplicationCommandPermissionsManager(
      this,
      this.applicationId,
    );

    /**
     * The type of this application command
     * @type {ApplicationCommandType}
     */
    this.type = ApplicationCommandTypes[data.type];

    this.user = client.users.cache.get(this.applicationId);

    this._patch(data);
  }

  _patch(data) {
    if ('name' in data) {
      /**
       * The name of this command
       * @type {string}
       */
      this.name = data.name;
    }

    if ('description' in data) {
      /**
       * The description of this command
       * @type {string}
       */
      this.description = data.description;
    }

    if ('options' in data) {
      /**
       * The options of this command
       * @type {ApplicationCommandOption[]}
       */
      this.options = data.options.map((o) =>
        this.constructor.transformOption(o, true),
      );
    } else {
      this.options ??= [];
    }

    if ('default_permission' in data) {
      /**
       * Whether the command is enabled by default when the app is added to a guild
       * @type {boolean}
       */
      this.defaultPermission = data.default_permission;
    }

    if ('version' in data) {
      /**
       * Autoincrementing version identifier updated during substantial record changes
       * @type {Snowflake}
       */
      this.version = data.version;
    }
  }

  /**
   * The timestamp the command was created at
   * @type {number}
   * @readonly
   */
  get createdTimestamp() {
    return SnowflakeUtil.timestampFrom(this.id);
  }

  /**
   * The time the command was created at
   * @type {Date}
   * @readonly
   */
  get createdAt() {
    return new Date(this.createdTimestamp);
  }

  /**
   * The manager that this command belongs to
   * @type {ApplicationCommandManager}
   * @readonly
   */
  get manager() {
    return (this.guild ?? this.client.application).commands;
  }

  /**
   * Data for creating or editing an application command.
   * @typedef {Object} ApplicationCommandData
   * @property {string} name The name of the command
   * @property {string} description The description of the command
   * @property {ApplicationCommandType} [type] The type of the command
   * @property {ApplicationCommandOptionData[]} [options] Options for the command
   * @property {boolean} [defaultPermission] Whether the command is enabled by default when the app is added to a guild
   */

  /**
   * An option for an application command or subcommand.
   * <info>In addition to the listed properties, when used as a parameter,
   * API style `snake_case` properties can be used for compatibility with generators like `@discordjs/builders`.</info>
   * <warn>Note that providing a value for the `camelCase` counterpart for any `snake_case` property
   * will discard the provided `snake_case` property.</warn>
   * @typedef {Object} ApplicationCommandOptionData
   * @property {ApplicationCommandOptionType|number} type The type of the option
   * @property {string} name The name of the option
   * @property {string} description The description of the option
   * @property {boolean} [autocomplete] Whether the option is an autocomplete option
   * @property {boolean} [required] Whether the option is required
   * @property {ApplicationCommandOptionChoice[]} [choices] The choices of the option for the user to pick from
   * @property {ApplicationCommandOptionData[]} [options] Additional options if this option is a subcommand (group)
   * @property {ChannelType[]|number[]} [channelTypes] When the option type is channel,
   * the allowed types of channels that can be selected
   * @property {number} [minValue] The minimum value for an `INTEGER` or `NUMBER` option
   * @property {number} [maxValue] The maximum value for an `INTEGER` or `NUMBER` option
   */

  /**
   * Edits this application command.
   * @param {ApplicationCommandData} data The data to update the command with
   * @returns {Promise<ApplicationCommand>}
   * @example
   * // Edit the description of this command
   * command.edit({
   *   description: 'New description',
   * })
   *   .then(console.log)
   *   .catch(console.error);
   */
  edit(data) {
    return this.manager.edit(this, data, this.guildId);
  }

  /**
   * Edits the name of this ApplicationCommand
   * @param {string} name The new name of the command
   * @returns {Promise<ApplicationCommand>}
   */
  setName(name) {
    return this.edit({ name });
  }

  /**
   * Edits the description of this ApplicationCommand
   * @param {string} description The new description of the command
   * @returns {Promise<ApplicationCommand>}
   */
  setDescription(description) {
    return this.edit({ description });
  }

  /**
   * Edits the default permission of this ApplicationCommand
   * @param {boolean} [defaultPermission=true] The default permission for this command
   * @returns {Promise<ApplicationCommand>}
   */
  setDefaultPermission(defaultPermission = true) {
    return this.edit({ defaultPermission });
  }

  /**
   * Edits the options of this ApplicationCommand
   * @param {ApplicationCommandOptionData[]} options The options to set for this command
   * @returns {Promise<ApplicationCommand>}
   */
  setOptions(options) {
    return this.edit({ options });
  }

  /**
   * Deletes this command.
   * @returns {Promise<ApplicationCommand>}
   * @example
   * // Delete this command
   * command.delete()
   *   .then(console.log)
   *   .catch(console.error);
   */
  delete() {
    return this.manager.delete(this, this.guildId);
  }

  /**
   * Whether this command equals another command. It compares all properties, so for most operations
   * it is advisable to just compare `command.id === command2.id` as it is much faster and is often
   * what most users need.
   * @param {ApplicationCommand|ApplicationCommandData|APIApplicationCommand} command The command to compare with
   * @param {boolean} [enforceOptionOrder=false] Whether to strictly check that options and choices are in the same
   * order in the array <info>The client may not always respect this ordering!</info>
   * @returns {boolean}
   */
  equals(command, enforceOptionOrder = false) {
    // If given an id, check if the id matches
    if (command.id && this.id !== command.id) return false;

    // Check top level parameters
    const commandType =
      typeof command.type === 'string'
        ? command.type
        : ApplicationCommandTypes[command.type];
    if (
      command.name !== this.name ||
      ('description' in command && command.description !== this.description) ||
      ('version' in command && command.version !== this.version) ||
      ('autocomplete' in command &&
        command.autocomplete !== this.autocomplete) ||
      (commandType && commandType !== this.type) ||
      // Future proof for options being nullable
      // TODO: remove ?? 0 on each when nullable
      (command.options?.length ?? 0) !== (this.options?.length ?? 0) ||
      (command.defaultPermission ?? command.default_permission ?? true) !==
      this.defaultPermission
    ) {
      return false;
    }

    if (command.options) {
      return this.constructor.optionsEqual(
        this.options,
        command.options,
        enforceOptionOrder,
      );
    }
    return true;
  }

  /**
   * Recursively checks that all options for an {@link ApplicationCommand} are equal to the provided options.
   * In most cases it is better to compare using {@link ApplicationCommand#equals}
   * @param {ApplicationCommandOptionData[]} existing The options on the existing command,
   * should be {@link ApplicationCommand#options}
   * @param {ApplicationCommandOptionData[]|APIApplicationCommandOption[]} options The options to compare against
   * @param {boolean} [enforceOptionOrder=false] Whether to strictly check that options and choices are in the same
   * order in the array <info>The client may not always respect this ordering!</info>
   * @returns {boolean}
   */
  static optionsEqual(existing, options, enforceOptionOrder = false) {
    if (existing.length !== options.length) return false;
    if (enforceOptionOrder) {
      return existing.every((option, index) =>
        this._optionEquals(option, options[index], enforceOptionOrder),
      );
    }
    const newOptions = new Map(options.map((option) => [option.name, option]));
    for (const option of existing) {
      const foundOption = newOptions.get(option.name);
      if (!foundOption || !this._optionEquals(option, foundOption))
        return false;
    }
    return true;
  }

  /**
   * Checks that an option for an {@link ApplicationCommand} is equal to the provided option
   * In most cases it is better to compare using {@link ApplicationCommand#equals}
   * @param {ApplicationCommandOptionData} existing The option on the existing command,
   * should be from {@link ApplicationCommand#options}
   * @param {ApplicationCommandOptionData|APIApplicationCommandOption} option The option to compare against
   * @param {boolean} [enforceOptionOrder=false] Whether to strictly check that options or choices are in the same
   * order in their array <info>The client may not always respect this ordering!</info>
   * @returns {boolean}
   * @private
   */
  static _optionEquals(existing, option, enforceOptionOrder = false) {
    const optionType =
      typeof option.type === 'string'
        ? option.type
        : ApplicationCommandOptionTypes[option.type];
    if (
      option.name !== existing.name ||
      optionType !== existing.type ||
      option.description !== existing.description ||
      option.autocomplete !== existing.autocomplete ||
      (option.required ??
        (['SUB_COMMAND', 'SUB_COMMAND_GROUP'].includes(optionType)
          ? undefined
          : false)) !== existing.required ||
      option.choices?.length !== existing.choices?.length ||
      option.options?.length !== existing.options?.length ||
      (option.channelTypes ?? option.channel_types)?.length !==
      existing.channelTypes?.length ||
      (option.minValue ?? option.min_value) !== existing.minValue ||
      (option.maxValue ?? option.max_value) !== existing.maxValue
    ) {
      return false;
    }

    if (existing.choices) {
      if (
        enforceOptionOrder &&
        !existing.choices.every(
          (choice, index) =>
            choice.name === option.choices[index].name &&
            choice.value === option.choices[index].value,
        )
      ) {
        return false;
      }
      if (!enforceOptionOrder) {
        const newChoices = new Map(
          option.choices.map((choice) => [choice.name, choice]),
        );
        for (const choice of existing.choices) {
          const foundChoice = newChoices.get(choice.name);
          if (!foundChoice || foundChoice.value !== choice.value) return false;
        }
      }
    }

    if (existing.channelTypes) {
      const newTypes = (option.channelTypes ?? option.channel_types).map(
        (type) => (typeof type === 'number' ? ChannelTypes[type] : type),
      );
      for (const type of existing.channelTypes) {
        if (!newTypes.includes(type)) return false;
      }
    }

    if (existing.options) {
      return this.optionsEqual(
        existing.options,
        option.options,
        enforceOptionOrder,
      );
    }
    return true;
  }

  /**
   * An option for an application command or subcommand.
   * @typedef {Object} ApplicationCommandOption
   * @property {ApplicationCommandOptionType} type The type of the option
   * @property {string} name The name of the option
   * @property {string} description The description of the option
   * @property {boolean} [required] Whether the option is required
   * @property {boolean} [autocomplete] Whether the option is an autocomplete option
   * @property {ApplicationCommandOptionChoice[]} [choices] The choices of the option for the user to pick from
   * @property {ApplicationCommandOption[]} [options] Additional options if this option is a subcommand (group)
   * @property {ChannelType[]} [channelTypes] When the option type is channel,
   * the allowed types of channels that can be selected
   * @property {number} [minValue] The minimum value for an `INTEGER` or `NUMBER` option
   * @property {number} [maxValue] The maximum value for an `INTEGER` or `NUMBER` option
   */

  /**
   * A choice for an application command option.
   * @typedef {Object} ApplicationCommandOptionChoice
   * @property {string} name The name of the choice
   * @property {string|number} value The value of the choice
   */

  /**
   * Transforms an {@link ApplicationCommandOptionData} object into something that can be used with the API.
   * @param {ApplicationCommandOptionData} option The option to transform
   * @param {boolean} [received] Whether this option has been received from Discord
   * @returns {APIApplicationCommandOption}
   * @private
   */
  static transformOption(option, received) {
    const stringType =
      typeof option.type === 'string'
        ? option.type
        : ApplicationCommandOptionTypes[option.type];
    const channelTypesKey = received ? 'channelTypes' : 'channel_types';
    const minValueKey = received ? 'minValue' : 'min_value';
    const maxValueKey = received ? 'maxValue' : 'max_value';
    return {
      type:
        typeof option.type === 'number' && !received
          ? option.type
          : ApplicationCommandOptionTypes[option.type],
      name: option.name,
      description: option.description,
      required:
        option.required ??
        (stringType === 'SUB_COMMAND' || stringType === 'SUB_COMMAND_GROUP'
          ? undefined
          : false),
      autocomplete: option.autocomplete,
      choices: option.choices,
      options: option.options?.map((o) => this.transformOption(o, received)),
      [channelTypesKey]: received
        ? option.channel_types?.map((type) => ChannelTypes[type])
        : option.channelTypes?.map((type) =>
          typeof type === 'string' ? ChannelTypes[type] : type,
        ) ??
        // When transforming to API data, accept API data
        option.channel_types,
      [minValueKey]: option.minValue ?? option.min_value,
      [maxValueKey]: option.maxValue ?? option.max_value,
    };
  }
  /**
   * Send Slash command to channel
   * @param {Message} message Discord Message
   * @param {Array<string>} options The options to Slash Command
   * @returns {Promise<Boolean>}
   * @example
   * const botID = '12345678987654321'
   * const user = await client.users.fetch(botID);
   * const application = await user.applications.fetch();
   * const command = application.commands.first();
   * await command.sendSlashCommand(messsage, ['option1', 'option2']);
   */
  async sendSlashCommand(message, options = []) {
    // Check Options
    if (!message instanceof Message)
      throw new TypeError('The message must be a Discord.Message');
    if (!Array.isArray(options))
      throw new TypeError('The options must be an array of strings');
    if (this.type !== 'CHAT_INPUT') return false;
    const optionFormat = [];
    let option_ = [];
    let i = 0;
    // Check Command type is Sub group ?
    const subCommandCheck = this.options.some((option) =>
      ['SUB_COMMAND', 'SUB_COMMAND_GROUP'].includes(option.type),
    );
    let subCommand;
    if (subCommandCheck) {
      subCommand = this.options.find((option) => option.name == options[0]);
      options.shift();
      option_[0] = {
        type: ApplicationCommandOptionTypes[subCommand.type],
        name: subCommand.name,
        options: optionFormat,
      };
    } else {
      option_ = optionFormat;
    }
    for (i; i < options.length; i++) {
      const value = options[i];
      if (typeof value !== 'string') {
        throw new TypeError(
          `Expected option to be a String, got ${typeof value}. If you type Number, please convert to String.`,
        );
      }
      if (!subCommandCheck && !this?.options[i]) continue;
      if (subCommandCheck && subCommand?.options && !subCommand?.options[i]) continue;
      if (!subCommandCheck) {
        // Check value is invalid
        let choice;
        if (this.options[i].choices && this.options[i].choices.length > 0) {
					choice =
						this.options[i].choices.find((c) => c.name == value) ||
						this.options[i].choices.find((c) => c.value == value);
					if (!choice) {
						throw new Error(
							`Invalid option: ${value} is not a valid choice for this option\nList of choices: ${this.options[
								i
							].choices
								.map((c, i) => `#${i + 1} Name: ${c.name} Value: ${c.value}\n`)
								.join('')}`,
						);
					}
				}
        const data = {
          type: ApplicationCommandOptionTypes[this.options[i].type],
          name: this.options[i].name,
          value: choice?.value || (this.options[i].type == 'INTEGER' ? Number(value) : (this.options[i].type == 'BOOLEAN' ? Boolean(value) : value)),
        };
        optionFormat.push(data);
      } else {
        // First element is sub command and removed
        if (!value) continue;
        // Check value is invalid
        let choice;
        if (
          subCommand?.options &&
					subCommand.options[i].choices &&
					subCommand.options[i].choices.length > 0
				) {
					choice =
						subCommand.options[i].choices.find((c) => c.name == value) ||
						subCommand.options[i].choices.find((c) => c.value == value);
					if (!choice) {
						throw new Error(
							`Invalid option: ${value} is not a valid choice for this option\nList of choices: \n${subCommand.options[
								i
							].choices.map(
								(c, i) => `#${i + 1} Name: ${c.name} Value: ${c.value}\n`,
							).join('')}`,
						);
					}
				}
        const data = {
					type: ApplicationCommandOptionTypes[subCommand.options[i].type],
					name: subCommand.options[i].name,
					value:
						choice?.value ||
						(subCommand.options[i].type == 'INTEGER'
							? Number(value)
							: subCommand.options[i].type == 'BOOLEAN'
							? Boolean(value)
							: value),
				};
        optionFormat.push(data);
      }
    }
    if (!subCommandCheck && this.options[i]?.required)
			throw new Error('Value required missing');
    if (
			subCommandCheck &&
			subCommand?.options &&
			subCommand?.options[i]?.required
		)
			throw new Error('Value required missing');
    await this.client.api.interactions.post({
      body: {
        type: 2, // ???
        application_id: this.applicationId,
        guild_id: message.guildId,
        channel_id: message.channelId,
        session_id: this.client.session_id,
        data: {
          // ApplicationCommandData
          version: this.version,
          id: this.id,
          name: this.name,
          type: ApplicationCommandTypes[this.type],
          options: option_,
        },
      },
    });
    return true;
  }
  /**
   * Message Context Menu
   * @param {Message} message Discord Message
   * @returns {Promise<Boolean>}
   * @example
   * const botID = '12345678987654321'
   * const user = await client.users.fetch(botID);
   * const application = await user.applications.fetch();
   * const command = application.commands.first();
   * await command.sendContextMenu(messsage);
   */
  async sendContextMenu(message, sendFromMessage = false) {
    if (!message instanceof Message && !sendFromMessage)
      throw new TypeError('The message must be a Discord.Message');
    if (this.type == 'CHAT_INPUT') return false;
    await this.client.api.interactions.post({
      body: {
        type: 2, // ???
        application_id: this.applicationId,
        guild_id: message.guildId,
        channel_id: message.channelId,
        session_id: this.client.session_id,
        data: {
          // ApplicationCommandData
          version: this.version,
          id: this.id,
          name: this.name,
          type: ApplicationCommandTypes[this.type],
          target_id:
            ApplicationCommandTypes[this.type] == 1
              ? message.author.id
              : message.id,
        },
      },
    });
    return true;
  }
}

module.exports = ApplicationCommand;

/* eslint-disable max-len */
/**
 * @external APIApplicationCommand
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-structure}
 */

/**
 * @external APIApplicationCommandOption
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure}
 */
