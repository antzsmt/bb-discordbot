// Type definitions for discord.js 9.2.0
// Project: https://github.com/hydrabolt/discord.js
// Definitions by: oorooroot <admin@paintach.ru> (https://github.com/oorooroot)

declare module "discord.js" {
  import { EventEmitter } from 'events';
  import { ChildProcess } from 'child_process';
  import { Readable as ReadableStream } from 'stream';
  /**
   * The starting point for making a Discord Bot.
   */
  export class Client extends EventEmitter {
    constructor(options?: ClientOptions);

    /**
     * A Collection of the Client's stored users
     */
    users: Collection<string, User>;
    /**
     * A Collection of the Client's stored guilds
     */
    guilds: Collection<string, Guild>;
    /**
     * A Collection of the Client's stored channels
     */
    channels: Collection<string, Channel>;
    /**
     * The authorization token for the logged in user/bot.
     */
    token: string;
    /**
     * The ClientUser representing the logged in Client
     */
    user: ClientUser;
    /**
     * The email, if there is one, for the logged in Client
     */
    email: string;
    /**
     * The password, if there is one, for the logged in Client
     */
    password: string;
    /**
     * The date at which the Client was regarded as being in the `READY` state.
     */
    readyTime: Date;
    /**
     * Returns a Collection, mapping Guild ID to Voice Connections.
     * @readonly
     */
    voiceConnections: Collection<string, VoiceConnection>;
    /**
     * The uptime for the logged in Client.
     * @readonly
     */
    uptime: number;
    /**
     * The emojis that the client can use. Mapped by emoji ID.
     * @readonly
     */
    emojis: Collection<string, Emoji>;
    /**
     * The status for the logged in Client.
     * @readonly
     */
    status: number;

    /**
     * Logs the client in. If successful, resolves with the account's token. <warn>If you're making a bot, it's
     * much better to use a bot account rather than a user account.
     * Bot accounts have higher rate limits and have access to some features user accounts don't have. User bots
     * that are making a lot of API requests can even be banned.</warn>
     * @param  {string} tokenOrEmail The token or email used for the account. If it is an email, a password _must_ be
     * provided.
     * @param  {string} [password] The password for the account, only needed if an email was provided.
     * @returns {Promise<string>}
     * @example
     * // log the client in using a token
     * const token = 'my token';
     * client.login(token);
     * @example
     * // log the client in using email and password
     * const email = 'user@email.com';
     * const password = 'supersecret123';
     * client.login(email, password);
     */
    login(tokenOrEmail: string, password?: string): Promise<string>;
    /**
     * Destroys the client and logs out.
     * @returns {Promise}
     */
    destroy(): Promise<void>;
    /**
     * This shouldn't really be necessary to most developers as it is automatically invoked every 30 seconds, however
     * if you wish to force a sync of Guild data, you can use this. Only applicable to user accounts.
     * @param {Guild[]} [guilds=this.guilds.array()] An array of guilds to sync
     */
    syncGuilds(guilds?: Array<Guild>): void;
    /**
     * Caches a user, or obtains it from the cache if it's already cached.
     * If the user isn't already cached, it will only be obtainable by OAuth bot accounts.
     * @param {string} id The ID of the user to obtain
     * @returns {Promise<User>}
     */
    fetchUser(id: string): Promise<User>;
    /**
     * Fetches an invite object from an invite code.
     * @param {string} code the invite code.
     * @returns {Promise<Invite, Error>}
     */
    fetchInvite(code: string): Promise<Invite>;

    on(event: string, listener: Function): this;
    on(event: 'channelUpdate', listener: (oldChannel: Channel, newChannel: Channel) => void): this;
    on(event: 'guildUnavailable', listener: (guild: Guild) => void): this;
    on(event: 'guildMemberRemove', listener: (guild: Guild, member: GuildMember) => void): this;
    on(event: 'guildRoleCreate', listener: (guild: Guild, role: Role) => void): this;
    on(event: 'guildRoleDelete', listener: (guild: Guild, role: Role) => void): this;
    on(event: 'guildRoleUpdate', listener: (guild: Guild, oldRole: Role, newRole: Role) => void): this;
    on(event: 'guildUpdate', listener: (oldGuild: Guild, newGuild: Guild) => void): this;
    on(event: 'messageUpdate', listener: (oldMessage: Message, newMessage: Message) => void): this;
    on(event: 'userUpdate', listener: (oldClientUser: ClientUser, newClientUser: ClientUser) => void): this;
    on(event: 'guildCreate', listener: (guild: Guild) => void): this;
    on(event: 'channelCreate', listener: (channel: Channel) => void): this;
    on(event: 'channelDelete', listener: (channel: Channel) => void): this;
    on(event: 'channelPinsUpdate', listener: (channel: Channel, time: Date) => void): this;
    on(event: 'guildBanAdd', listener: (guild: Guild, user: User) => void): this;
    on(event: 'guildBanRemove', listener: (guild: Guild, user: User) => void): this;
    on(event: 'guildDelete', listener: (guild: Guild) => void): this;
    on(event: 'guildMembersChunk', listener: (guild: Guild, members: Array<GuildMember>) => void): this;
    on(event: 'message', listener: (message: Message) => void): this;
    on(event: 'messageDelete', listener: (message: Message) => void): this;
    on(event: 'messageDeleteBulk', listener: (messages: Collection<string, Message>) => void): this;
    on(event: 'presenceUpdate', listener: (oldUser: User, newUser: User) => void): this;
    on(event: 'guildMemberAvailable', listener: (guild: Guild, member: GuildMember) => void): this;
    on(event: 'typingStart', listener: (channel: Channel, user: User) => void): this;
    on(event: 'typingStop', listener: (channel: Channel, user: User) => void): this;
    on(event: 'voiceStateUpdate', listener: (oldMember: GuildMember, newMember: GuildMember) => void): this;
    on(event: 'error', listener: (error: Error) => void): this;
    on(event: 'ready', listener: () => void): this;
    on(event: 'reconnecting', listener: () => void): this;
    on(event: 'guildMemberAdd', listener: (guild: Guild, member: GuildMember) => void): this;
    on(event: 'guildMemberUpdate', listener: (guild: Guild, oldMember: GuildMember, newMember: GuildMember) => void): this;
    on(event: 'guildMemberSpeaking', listener: (member: GuildMember, speaking: boolean) => void): this;

  }

  /**
   * The class that sends voice packet data to the voice connection.
   * ```js
   * // obtained using:
   * voiceChannel.join().then(connection => {
   *   // you can play a file or a stream here:
   *   connection.playFile('./file.mp3').then(dispatcher => {
   *
   *   });
   * });
   * ```
   */
  export class StreamDispatcher extends EventEmitter {
    /**
     * How many passes the dispatcher should take when sending packets to reduce packet loss. Values over 5
     * aren't recommended, as it means you are using 5x more bandwidth. You _can_ edit this at runtime.
     */
    passes: number;
    /**
     * how long the stream dispatcher has been "speaking" for
     * @readonly
     */
    time: number;
    /**
     * The total time, taking into account pauses and skips, that the dispatcher has been streaming for.
     * @readonly
     */
    totalStreamTime: number;
    /**
     * The volume of the stream, relative to the stream's input volume
     * @readonly
     */
    volume: number;

    /**
     * Stops the current stream permanently and emits an `end` event.
     */
    end(): void;
    /**
     * Sets the volume relative to the input stream - i.e. 1 is normal, 0.5 is half, 2 is double.
     * @param {number} volume The volume that you want to set
     */
    setVolume(volume: number): void;
    /**
     * Set the volume in decibels
     * @param {number} db The decibels
     */
    setVolumeDecibels(db: number): void;
    /**
     * Set the volume so that a perceived value of 0.5 is half the perceived volume etc.
     * @param {number} value The value for the volume
     */
    setVolumeLogarithmic(value: number): void;
    /**
     * Stops sending voice packets to the voice connection (stream may still progress however)
     */
    pause(): void;
    /**
     * Resumes sending voice packets to the voice connection (may be further on in the stream than when paused)
     */
    resume(): void;

    on(event: string, listener: Function): this;
    on(event: 'speaking', listener: (value: boolean) => void): this;
    on(event: 'start', listener: () => void): this;
    on(event: 'end', listener: () => void): this;
    on(event: 'error', listener: (err: Error) => void): this;
    on(event: 'debug', listener: (information: string) => void): this;

  }

  /**
   * Receives voice data from a voice connection.
   * ```js
   * // obtained using:
   * voiceChannel.join().then(connection => {
   *  const receiver = connection.createReceiver();
   * });
   * ```
   */
  export class VoiceReceiver extends EventEmitter {
    /**
     * Whether or not this receiver has been destroyed.
     */
    destroyed: boolean;
    /**
     * The VoiceConnection that instantiated this
     */
    connection: VoiceConnection;

    /**
     * If this VoiceReceiver has been destroyed, running `recreate()` will recreate the listener.
     * This avoids you having to create a new receiver.
     * <info>Any streams that you had prior to destroying the receiver will not be recreated.</info>
     */
    recreate(): void;
    /**
     * Destroy this VoiceReceiver, also ending any streams that it may be controlling.
     */
    destroy(): void;
    /**
     * Creates a readable stream for a user that provides opus data while the user is speaking. When the user
     * stops speaking, the stream is destroyed.
     * @param {UserResolvable} user The user to create the stream for
     * @returns {ReadableStream}
     */
    createOpusStream(user: UserResolvable): ReadableStream;
    /**
     * Creates a readable stream for a user that provides PCM data while the user is speaking. When the user
     * stops speaking, the stream is destroyed. The stream is 16-bit signed stereo PCM at 48KHz.
     * @param {UserResolvable} user The user to create the stream for
     * @returns {ReadableStream}
     */
    createPCMStream(user: UserResolvable): ReadableStream;

    on(event: string, listener: Function): this;
    on(event: 'warn', listener: (message: string) => void): this;
    on(event: 'opus', listener: (user: User, buffer: Buffer) => void): this;
    on(event: 'pcm', listener: (user: User, buffer: Buffer) => void): this;

  }

  /**
   * Represents a connection to a Voice Channel in Discord.
   * ```js
   * // obtained using:
   * voiceChannel.join().then(connection => {
   *
   * });
   * ```
   */
  export class VoiceConnection extends EventEmitter {
    /**
     * The player
     */
    player: BasePlayer;
    /**
     * The endpoint of the connection
     */
    endpoint: string;
    /**
     * The VoiceChannel for this connection
     */
    channel: VoiceChannel;
    /**
     * Whether or not the connection is ready
     */
    ready: boolean;

    /**
     * Disconnects the Client from the Voice Channel
     * @param {string} [reason='user requested'] The reason of the disconnection
     */
    disconnect(reason?: string): void;
    /**
     * Play the given file in the voice connection
     * @param {string} file The path to the file
     * @param {StreamOptions} [options] Options for playing the stream
     * @returns {StreamDispatcher}
     * @example
     * // play files natively
     * voiceChannel.join()
     *  .then(connection => {
     *    const dispatcher = connection.playFile('C:/Users/Discord/Desktop/music.mp3');
     *  })
     *  .catch(console.log);
     */
    playFile(file: string, options?: StreamOptions): StreamDispatcher;
    /**
     * Plays and converts an audio stream in the voice connection
     * @param {ReadableStream} stream The audio stream to play
     * @param {StreamOptions} [options] Options for playing the stream
     * @returns {StreamDispatcher}
     * @example
     * // play streams using ytdl-core
     * const ytdl = require('ytdl-core');
     * const streamOptions = { seek: 0, volume: 1 };
     * voiceChannel.join()
     *  .then(connection => {
     *    const stream = ytdl('https://www.youtube.com/watch?v=XAWgeLF9EVQ', {filter : 'audioonly'});
     *    const dispatcher = connection.playStream(stream, streamOptions);
     *  })
     *  .catch(console.log);
     */
    playStream(stream: ReadableStream, options?: StreamOptions): StreamDispatcher;
    /**
     * Plays a stream of 16-bit signed stereo PCM at 48KHz.
     * @param {ReadableStream} stream The audio stream to play.
     * @param {StreamOptions} [options] Options for playing the stream
     * @returns {StreamDispatcher}
     */
    playConvertedStream(stream: ReadableStream, options?: StreamOptions): StreamDispatcher;
    /**
     * Creates a VoiceReceiver so you can start listening to voice data. It's recommended to only create one of these.
     * @returns {VoiceReceiver}
     */
    createReceiver(): VoiceReceiver;

    on(event: string, listener: Function): this;
    on(event: 'error', listener: (error: Error) => void): this;
    on(event: 'disconnected', listener: (error: Error) => void): this;
    on(event: 'ready', listener: () => void): this;
    on(event: 'speaking', listener: (user: User, speaking: boolean) => void): this;

  }

  /**
   * Represents a Shard spawned by the ShardingManager.
   */
  export class Shard {
    constructor(manager: ShardingManager, id: number);

    /**
     * The manager of the spawned shard
     */
    manager: ShardingManager;
    /**
     * The shard ID
     */
    id: number;
    /**
     * The process of the shard
     */
    process: ChildProcess;

  }

  /**
   * This is a utility class that can be used to help you spawn shards of your Client. Each shard is completely separate
   * from the other. The Shard Manager takes a path to a file and spawns it under the specified amount of shards safely.
   * <warn>The Sharding Manager is still experimental</warn>
   */
  export class ShardingManager extends EventEmitter {
    constructor(file: string, totalShards?: number);

    /**
     * Path to the shard script file
     */
    file: string;
    /**
     * The amount of shards that this manager is going to spawn
     */
    totalShards: number;
    /**
     * A collection of shards that this manager has spawned
     */
    shards: Collection<number, Shard>;

    /**
     * Spawns a single shard.
     */
    createShard(): void;
    /**
     * Spawns multiple shards.
     * @param {number} [amount=this.totalShards] The number of shards to spawn
     */
    spawn(amount?: number): void;

  }

  export class Channel {
    /**
     * The client that instantiated the Channel
     */
    client: Client;
    /**
     * The type of the channel, either:
     * * `dm` - a DM channel
     * * `group` - a Group DM channel
     * * `text` - a guild text channel
     * * `voice` - a guild voice channel
     */
    type: string;
    /**
     * The unique ID of the channel
     */
    id: string;
    /**
     * The time the channel was created
     * @readonly
     */
    creationDate: Date;

    /**
     * Deletes the channel
     * @returns {Promise<Channel>}
     * @example
     * // delete the channel
     * channel.delete()
     *  .then() // success
     *  .catch(console.log); // log error
     */
    delete(): Promise<Channel>;

  }

  /**
   * Represents the logged in client's Discord User
   */
  export class ClientUser extends User {
    /**
     * Whether or not this account has been verified
     */
    verified: boolean;
    /**
     * The email of this account
     */
    email: string;
    /**
     * The Client that created the instance of the the User.
     */
    client: Client;
    /**
     * The ID of the User
     */
    id: string;
    /**
     * The username of the User
     */
    username: string;
    /**
     * A discriminator based on username for the User
     */
    discriminator: string;
    /**
     * The ID of the user's avatar
     */
    avatar: string;
    /**
     * Whether or not the User is a Bot.
     */
    bot: boolean;
    /**
     * The status of the user:
     *
     * * **`online`** - user is online
     * * **`offline`** - user is offline
     * * **`idle`** - user is AFK
     */
    status: string;
    /**
     * The game that the user is playing, `null` if they aren't playing a game.
     */
    game: Game;
    /**
     * The time the user was created
     * @readonly
     */
    creationDate: Date;
    /**
     * A link to the user's avatar (if they have one, otherwise null)
     * @readonly
     */
    avatarURL: string;

    /**
     * Set the username of the logged in Client.
     * <info>Changing usernames in Discord is heavily rate limited, with only 2 requests
     * every hour. Use this sparingly!</info>
     * @param {string} username The new username
     * @returns {Promise<ClientUser>}
     * @example
     * // set username
     * client.user.setUsername('discordjs')
     *  .then(user => console.log(`My new username is ${user.username}`))
     *  .catch(console.log);
     */
    setUsername(username: string): Promise<ClientUser>;
    /**
     * If this user is a "self bot" or logged in using a normal user's details (which should be avoided), you can set the
     * email here.
     * @param {string} email The new email
     * @returns {Promise<ClientUser>}
     * @example
     * // set email
     * client.user.setEmail('bob@gmail.com')
     *  .then(user => console.log(`My new email is ${user.email}`))
     *  .catch(console.log);
     */
    setEmail(email: string): Promise<ClientUser>;
    /**
     * If this user is a "self bot" or logged in using a normal user's details (which should be avoided), you can set the
     * password here.
     * @param {string} password The new password
     * @returns {Promise<ClientUser>}
     * @example
     * // set password
     * client.user.setPassword('password')
     *  .then(user => console.log('New password set!'))
     *  .catch(console.log);
     */
    setPassword(password: string): Promise<ClientUser>;
    /**
     * Set the avatar of the logged in Client.
     * @param {Base64Resolvable} avatar The new avatar
     * @returns {Promise<ClientUser>}
     * @example
     * // set avatar
     * client.user.setAvatar(fs.readFileSync('./avatar.png'))
     *  .then(user => console.log(`New avatar set!`))
     *  .catch(console.log);
     */
    setAvatar(avatar: Base64Resolvable): Promise<ClientUser>;
    /**
     * Set the status and playing game of the logged in client.
     * @param {string} [status] The status, can be `online` or `idle`
     * @param {string|Object} [game] The game that is being played
     * @param {string} [url] If you want to display as streaming, set this as the URL to the stream (must be a
     * twitch.tv URl)
     * @returns {Promise<ClientUser>}
     * @example
     * // set status
     * client.user.setStatus('status', 'game')
     *  .then(user => console.log('Changed status!'))
     *  .catch(console.log);
     */
    setStatus(status?: string, game?: string | Object, url?: string): Promise<ClientUser>;
    /**
     * Check whether the user is typing in a channel.
     * @param {ChannelResolvable} channel The channel to check in
     * @returns {boolean}
     */
    typingIn(channel: ChannelResolvable): boolean;
    /**
     * Get the time that the user started typing.
     * @param {ChannelResolvable} channel The channel to get the time in
     * @returns {?Date}
     */
    typingSinceIn(channel: ChannelResolvable): Date;
    /**
     * Get the amount of time the user has been typing in a channel for (in milliseconds), or -1 if they're not typing.
     * @param {ChannelResolvable} channel The channel to get the time in
     * @returns {number}
     */
    typingDurationIn(channel: ChannelResolvable): number;
    /**
     * Deletes a DM Channel (if one exists) between the Client and the User. Resolves with the Channel if successful.
     * @returns {Promise<DMChannel>}
     */
    deleteDM(): Promise<DMChannel>;
    /**
     * Checks if the user is equal to another. It compares username, ID, discriminator, status and the game being played.
     * It is recommended to compare equality by using `user.id === user2.id` unless you want to compare all properties.
     * @param {User} user The user to compare
     * @returns {boolean}
     */
    equals(user: User): boolean;
    /**
     * When concatenated with a string, this automatically concatenates the User's mention instead of the User object.
     * @returns {string}
     * @example
     * // logs: Hello from <@123456789>!
     * console.log(`Hello from ${user}!`);
     */
    toString(): string;
    /**
     * Send a message to this channel
     * @param {StringResolvable} content The content to send
     * @param {MessageOptions} [options={}] The options to provide
     * @returns {Promise<Message|Message[]>}
     * @example
     * // send a message
     * channel.sendMessage('hello!')
     *  .then(message => console.log(`Sent message: ${message.content}`))
     *  .catch(console.log);
     */
    sendMessage(content: StringResolvable, options?: MessageOptions): Promise<Message | Array<Message>>;
    /**
     * Send a text-to-speech message to this channel
     * @param {StringResolvable} content The content to send
     * @param {MessageOptions} [options={}] The options to provide
     * @returns {Promise<Message|Message[]>}
     * @example
     * // send a TTS message
     * channel.sendTTSMessage('hello!')
     *  .then(message => console.log(`Sent tts message: ${message.content}`))
     *  .catch(console.log);
     */
    sendTTSMessage(content: StringResolvable, options?: MessageOptions): Promise<Message | Array<Message>>;
    /**
     * Send a file to this channel
     * @param {FileResolvable} attachment The file to send
     * @param {string} [fileName="file.jpg"] The name and extension of the file
     * @param {StringResolvable} [content] Text message to send with the attachment
     * @param {MessageOptions} [options] The options to provide
     * @returns {Promise<Message>}
     */
    sendFile(attachment: FileResolvable, fileName?: string, content?: StringResolvable, options?: MessageOptions): Promise<Message>;
    /**
     * Send a code block to this channel
     * @param {string} lang Language for the code block
     * @param {StringResolvable} content Content of the code block
     * @param {MessageOptions} options The options to provide
     * @returns {Promise<Message|Message[]>}
     */
    sendCode(lang: string, content: StringResolvable, options: MessageOptions): Promise<Message | Array<Message>>;

  }

  /**
   * Represents a Direct Message Channel between two users.
   * @implements {TextBasedChannel}
   */
  export class DMChannel extends Channel {
    /**
     * The recipient on the other end of the DM
     */
    recipient: User;
    /**
     * A Collection containing the messages sent to this channel.
     */
    messages: Collection<string, Message>;
    /**
     * The ID of the last message in the channel, if one was sent.
     */
    lastMessageID: string;
    /**
     * Whether or not the typing indicator is being shown in the channel.
     */
    typing: boolean;
    /**
     * Number of times `startTyping` has been called.
     */
    typingCount: number;
    /**
     * The client that instantiated the Channel
     */
    client: Client;
    /**
     * The type of the channel, either:
     * * `dm` - a DM channel
     * * `group` - a Group DM channel
     * * `text` - a guild text channel
     * * `voice` - a guild voice channel
     */
    type: string;
    /**
     * The unique ID of the channel
     */
    id: string;
    /**
     * The time the channel was created
     * @readonly
     */
    creationDate: Date;

    /**
     * When concatenated with a string, this automatically concatenates the recipient's mention instead of the
     * DM channel object.
     * @returns {string}
     */
    toString(): string;
    /**
     * Send a message to this channel
     * @param {StringResolvable} content The content to send
     * @param {MessageOptions} [options={}] The options to provide
     * @returns {Promise<Message|Message[]>}
     * @example
     * // send a message
     * channel.sendMessage('hello!')
     *  .then(message => console.log(`Sent message: ${message.content}`))
     *  .catch(console.log);
     */
    sendMessage(content: StringResolvable, options?: MessageOptions): Promise<Message | Array<Message>>;
    /**
     * Send a text-to-speech message to this channel
     * @param {StringResolvable} content The content to send
     * @param {MessageOptions} [options={}] The options to provide
     * @returns {Promise<Message|Message[]>}
     * @example
     * // send a TTS message
     * channel.sendTTSMessage('hello!')
     *  .then(message => console.log(`Sent tts message: ${message.content}`))
     *  .catch(console.log);
     */
    sendTTSMessage(content: StringResolvable, options?: MessageOptions): Promise<Message | Array<Message>>;
    /**
     * Send a file to this channel
     * @param {FileResolvable} attachment The file to send
     * @param {string} [fileName="file.jpg"] The name and extension of the file
     * @param {StringResolvable} [content] Text message to send with the attachment
     * @param {MessageOptions} [options] The options to provide
     * @returns {Promise<Message>}
     */
    sendFile(attachment: FileResolvable, fileName?: string, content?: StringResolvable, options?: MessageOptions): Promise<Message>;
    /**
     * Send a code block to this channel
     * @param {string} lang Language for the code block
     * @param {StringResolvable} content Content of the code block
     * @param {MessageOptions} options The options to provide
     * @returns {Promise<Message|Message[]>}
     */
    sendCode(lang: string, content: StringResolvable, options: MessageOptions): Promise<Message | Array<Message>>;
    /**
     * Gets a single message from this channel, regardless of it being cached or not.
     * @param {string} messageID The ID of the message to get
     * @returns {Promise<Message>}
     * @example
     * // get message
     * channel.fetchMessage('99539446449315840')
     *   .then(message => console.log(message.content))
     *   .catch(console.error);
     */
    fetchMessage(messageID: string): Promise<Message>;
    /**
     * Gets the past messages sent in this channel. Resolves with a Collection mapping message ID's to Message objects.
     * @param {ChannelLogsQueryOptions} [options={}] The query parameters to pass in
     * @returns {Promise<Collection<string, Message>>}
     * @example
     * // get messages
     * channel.fetchMessages({limit: 10})
     *  .then(messages => console.log(`Received ${messages.size} messages`))
     *  .catch(console.log);
     */
    fetchMessages(options?: ChannelLogsQueryOptions): Promise<Collection<string, Message>>;
    /**
     * Fetches the pinned messages of this Channel and returns a Collection of them.
     * @returns {Promise<Collection<string, Message>>}
     */
    fetchPinnedMessages(): Promise<Collection<string, Message>>;
    /**
     * Starts a typing indicator in the channel.
     * @param {number} [count] The number of times startTyping should be considered to have been called
     * @example
     * // start typing in a channel
     * channel.startTyping();
     */
    startTyping(count?: number): void;
    /**
     * Stops the typing indicator in the channel.
     * The indicator will only stop if this is called as many times as startTyping().
     * <info>It can take a few seconds for the Client User to stop typing.</info>
     * @param {boolean} [force=false] Whether or not to reset the call count and force the indicator to stop
     * @example
     * // stop typing in a channel
     * channel.stopTyping();
     * @example
     * // force typing to fully stop in a channel
     * channel.stopTyping(true);
     */
    stopTyping(force?: boolean): void;
    /**
     * Creates a Message Collector
     * @param {CollectorFilterFunction} filter The filter to create the collector with
     * @param {CollectorOptions} [options={}] The options to pass to the collector
     * @returns {MessageCollector}
     * @example
     * // create a message collector
     * const collector = channel.createCollector(
     *  m => m.content.includes('discord'),
     *  { time: 15000 }
     * );
     * collector.on('message', m => console.log(`Collected ${m.content}`));
     * collector.on('end', collected => console.log(`Collected ${collected.size} items`));
     */
    createCollector(filter: CollectorFilterFunction, options?: CollectorOptions): MessageCollector;
    /**
     * Similar to createCollector but in Promise form. Resolves with a Collection of messages that pass the specified
     * filter.
     * @param {CollectorFilterFunction} filter The filter function to use
     * @param {AwaitMessagesOptions} [options={}] Optional options to pass to the internal collector
     * @returns {Promise<Collection<string, Message>>}
     * @example
     * // await !vote messages
     * const filter = m => m.content.startsWith('!vote');
     * // errors: ['time'] treats ending because of the time limit as an error
     * channel.awaitMessages(filter, { max: 4, time: 60000, errors: ['time'] })
     *  .then(collected => console.log(collected.size))
     *  .catch(collected => console.log(`After a minute, only ${collected.size} out of 4 voted.`));
     */
    awaitMessages(filter: CollectorFilterFunction, options?: AwaitMessagesOptions): Promise<Collection<string, Message>>;
    /**
     * Bulk delete a given Collection or Array of messages in one go. Returns the deleted messages after.
     * @param {Collection<string, Message>|Message[]} messages The messages to delete
     * @returns {Collection<string, Message>}
     */
    bulkDelete(messages: Collection<string, Message> | Array<Message>): Collection<string, Message>;
    /**
     * Deletes the channel
     * @returns {Promise<Channel>}
     * @example
     * // delete the channel
     * channel.delete()
     *  .then() // success
     *  .catch(console.log); // log error
     */
    delete(): Promise<Channel>;

  }

  /**
   * Represents a Custom Emoji
   */
  export class Emoji {
    /**
     * The Client that instantiated this object
     */
    client: Client;
    /**
     * The Guild this emoji is part of
     */
    guild: Guild;
    /**
     * The ID of the Emoji
     */
    id: string;
    /**
     * The name of the Emoji
     */
    name: string;
    /**
     * Whether or not this emoji requires colons surrounding it
     */
    requiresColons: boolean;
    /**
     * Whether this emoji is managed by an external service
     */
    managed: boolean;
    /**
     * The time the emoji was created
     * @readonly
     */
    creationDate: Date;
    /**
     * A collection of roles this emoji is active for (empty if all), mapped by role ID.
     * @readonly
     */
    roles: Collection<string, Role>;
    /**
     * The URL to the emoji file
     * @readonly
     */
    url: string;

    /**
     * When concatenated with a string, this automatically returns the emoji mention rather than the object.
     * @returns {string}
     * @example
     * // send an emoji:
     * const emoji = guild.emojis.array()[0];
     * msg.reply(`Hello! ${emoji}`);
     */
    toString(): string;

  }

  /**
   * The final evaluated permissions for a member in a channel
   */
  export class EvaluatedPermissions {
    /**
     * The member this permissions refer to
     */
    member: GuildMember;
    /**
     * A number representing the packed permissions
     */
    raw: number;

    /**
     * Get an object mapping permission name, e.g. `READ_MESSAGES` to a boolean - whether the user
     * can perform this or not.
     * @returns {Object<string, boolean>}
     */
    serialize(): {[K:string]: boolean};
    /**
     * Checks whether the user has a certain permission, e.g. `READ_MESSAGES`.
     * @param {PermissionResolvable} permission The permission to check for
     * @param {boolean} [explicit=false] Whether to require the user to explicitly have the exact permission
     * @returns {boolean}
     */
    hasPermission(permission: PermissionResolvable, explicit?: boolean): boolean;
    /**
     * Checks whether the user has all specified permissions.
     * @param {PermissionResolvable[]} permissions The permissions to check for
     * @param {boolean} [explicit=false] Whether to require the user to explicitly have the exact permissions
     * @returns {boolean}
     */
    hasPermissions(permissions: Array<PermissionResolvable>, explicit?: boolean): boolean;

  }

  /**
   * Represents a Group DM on Discord
   * @implements {TextBasedChannel}
   */
  export class GroupDMChannel extends Channel {
    /**
     * The name of this Group DM, can be null if one isn't set.
     */
    name: string;
    /**
     * A hash of the Group DM icon.
     */
    icon: string;
    /**
     * The owner of this Group DM.
     */
    owner: User;
    /**
     * A collection of the recipients of this DM, mapped by their ID.
     */
    recipients: Collection<string, User>;
    /**
     * A Collection containing the messages sent to this channel.
     */
    messages: Collection<string, Message>;
    /**
     * The ID of the last message in the channel, if one was sent.
     */
    lastMessageID: string;
    /**
     * Whether or not the typing indicator is being shown in the channel.
     */
    typing: boolean;
    /**
     * Number of times `startTyping` has been called.
     */
    typingCount: number;
    /**
     * The client that instantiated the Channel
     */
    client: Client;
    /**
     * The type of the channel, either:
     * * `dm` - a DM channel
     * * `group` - a Group DM channel
     * * `text` - a guild text channel
     * * `voice` - a guild voice channel
     */
    type: string;
    /**
     * The unique ID of the channel
     */
    id: string;
    /**
     * The time the channel was created
     * @readonly
     */
    creationDate: Date;

    /**
     * Whether this channel equals another channel. It compares all properties, so for most operations
     * it is advisable to just compare `channel.id === channel2.id` as it is much faster and is often
     * what most users need.
     * @param {GroupDMChannel} channel The channel to compare to
     * @returns {boolean}
     */
    equals(channel: GroupDMChannel): boolean;
    /**
     * When concatenated with a string, this automatically concatenates the Channel's name instead of the Channel object.
     * @returns {string}
     * @example
     * // logs: Hello from My Group DM!
     * console.log(`Hello from ${channel}!`);
     * @example
     * // logs: Hello from My Group DM!
     * console.log(`Hello from ' + channel + '!');
     */
    toString(): string;
    /**
     * Send a message to this channel
     * @param {StringResolvable} content The content to send
     * @param {MessageOptions} [options={}] The options to provide
     * @returns {Promise<Message|Message[]>}
     * @example
     * // send a message
     * channel.sendMessage('hello!')
     *  .then(message => console.log(`Sent message: ${message.content}`))
     *  .catch(console.log);
     */
    sendMessage(content: StringResolvable, options?: MessageOptions): Promise<Message | Array<Message>>;
    /**
     * Send a text-to-speech message to this channel
     * @param {StringResolvable} content The content to send
     * @param {MessageOptions} [options={}] The options to provide
     * @returns {Promise<Message|Message[]>}
     * @example
     * // send a TTS message
     * channel.sendTTSMessage('hello!')
     *  .then(message => console.log(`Sent tts message: ${message.content}`))
     *  .catch(console.log);
     */
    sendTTSMessage(content: StringResolvable, options?: MessageOptions): Promise<Message | Array<Message>>;
    /**
     * Send a file to this channel
     * @param {FileResolvable} attachment The file to send
     * @param {string} [fileName="file.jpg"] The name and extension of the file
     * @param {StringResolvable} [content] Text message to send with the attachment
     * @param {MessageOptions} [options] The options to provide
     * @returns {Promise<Message>}
     */
    sendFile(attachment: FileResolvable, fileName?: string, content?: StringResolvable, options?: MessageOptions): Promise<Message>;
    /**
     * Send a code block to this channel
     * @param {string} lang Language for the code block
     * @param {StringResolvable} content Content of the code block
     * @param {MessageOptions} options The options to provide
     * @returns {Promise<Message|Message[]>}
     */
    sendCode(lang: string, content: StringResolvable, options: MessageOptions): Promise<Message | Array<Message>>;
    /**
     * Gets a single message from this channel, regardless of it being cached or not.
     * @param {string} messageID The ID of the message to get
     * @returns {Promise<Message>}
     * @example
     * // get message
     * channel.fetchMessage('99539446449315840')
     *   .then(message => console.log(message.content))
     *   .catch(console.error);
     */
    fetchMessage(messageID: string): Promise<Message>;
    /**
     * Gets the past messages sent in this channel. Resolves with a Collection mapping message ID's to Message objects.
     * @param {ChannelLogsQueryOptions} [options={}] The query parameters to pass in
     * @returns {Promise<Collection<string, Message>>}
     * @example
     * // get messages
     * channel.fetchMessages({limit: 10})
     *  .then(messages => console.log(`Received ${messages.size} messages`))
     *  .catch(console.log);
     */
    fetchMessages(options?: ChannelLogsQueryOptions): Promise<Collection<string, Message>>;
    /**
     * Fetches the pinned messages of this Channel and returns a Collection of them.
     * @returns {Promise<Collection<string, Message>>}
     */
    fetchPinnedMessages(): Promise<Collection<string, Message>>;
    /**
     * Starts a typing indicator in the channel.
     * @param {number} [count] The number of times startTyping should be considered to have been called
     * @example
     * // start typing in a channel
     * channel.startTyping();
     */
    startTyping(count?: number): void;
    /**
     * Stops the typing indicator in the channel.
     * The indicator will only stop if this is called as many times as startTyping().
     * <info>It can take a few seconds for the Client User to stop typing.</info>
     * @param {boolean} [force=false] Whether or not to reset the call count and force the indicator to stop
     * @example
     * // stop typing in a channel
     * channel.stopTyping();
     * @example
     * // force typing to fully stop in a channel
     * channel.stopTyping(true);
     */
    stopTyping(force?: boolean): void;
    /**
     * Creates a Message Collector
     * @param {CollectorFilterFunction} filter The filter to create the collector with
     * @param {CollectorOptions} [options={}] The options to pass to the collector
     * @returns {MessageCollector}
     * @example
     * // create a message collector
     * const collector = channel.createCollector(
     *  m => m.content.includes('discord'),
     *  { time: 15000 }
     * );
     * collector.on('message', m => console.log(`Collected ${m.content}`));
     * collector.on('end', collected => console.log(`Collected ${collected.size} items`));
     */
    createCollector(filter: CollectorFilterFunction, options?: CollectorOptions): MessageCollector;
    /**
     * Similar to createCollector but in Promise form. Resolves with a Collection of messages that pass the specified
     * filter.
     * @param {CollectorFilterFunction} filter The filter function to use
     * @param {AwaitMessagesOptions} [options={}] Optional options to pass to the internal collector
     * @returns {Promise<Collection<string, Message>>}
     * @example
     * // await !vote messages
     * const filter = m => m.content.startsWith('!vote');
     * // errors: ['time'] treats ending because of the time limit as an error
     * channel.awaitMessages(filter, { max: 4, time: 60000, errors: ['time'] })
     *  .then(collected => console.log(collected.size))
     *  .catch(collected => console.log(`After a minute, only ${collected.size} out of 4 voted.`));
     */
    awaitMessages(filter: CollectorFilterFunction, options?: AwaitMessagesOptions): Promise<Collection<string, Message>>;
    /**
     * Bulk delete a given Collection or Array of messages in one go. Returns the deleted messages after.
     * @param {Collection<string, Message>|Message[]} messages The messages to delete
     * @returns {Collection<string, Message>}
     */
    bulkDelete(messages: Collection<string, Message> | Array<Message>): Collection<string, Message>;
    /**
     * Deletes the channel
     * @returns {Promise<Channel>}
     * @example
     * // delete the channel
     * channel.delete()
     *  .then() // success
     *  .catch(console.log); // log error
     */
    delete(): Promise<Channel>;

  }

  /**
   * Represents a Guild (or a Server) on Discord.
   * <info>It's recommended to see if a guild is available before performing operations or reading data from it. You can
   * check this with `guild.available`.</info>
   */
  export class Guild {
    /**
     * The Client that created the instance of the the Guild.
     */
    client: Client;
    /**
     * A Collection of members that are in this Guild. The key is the member's ID, the value is the member.
     */
    members: Collection<string, GuildMember>;
    /**
     * A Collection of channels that are in this Guild. The key is the channel's ID, the value is the channel.
     */
    channels: Collection<string, GuildChannel>;
    /**
     * A Collection of roles that are in this Guild. The key is the role's ID, the value is the role.
     */
    roles: Collection<string, Role>;
    /**
     * Whether the Guild is available to access. If it is not available, it indicates a server outage.
     */
    available: boolean;
    /**
     * The Unique ID of the Guild, useful for comparisons.
     */
    id: string;
    /**
     * The name of the guild
     */
    name: string;
    /**
     * The hash of the guild icon, or null if there is no icon.
     */
    icon: string;
    /**
     * The hash of the guild splash image, or null if no splash (VIP only)
     */
    splash: string;
    /**
     * The region the guild is located in
     */
    region: string;
    /**
     * The full amount of members in this Guild as of `READY`
     */
    memberCount: number;
    /**
     * Whether the guild is "large" (has more than 250 members)
     */
    large: boolean;
    /**
     * An array of guild features.
     */
    features: Array<Object>;
    /**
     * An array of guild emojis.
     */
    emojis: Array<Object>;
    /**
     * The time in seconds before a user is counted as "away from keyboard".
     */
    afkTimeout: number;
    /**
     * The ID of the voice channel where AFK members are moved.
     */
    afkChannelID: string;
    /**
     * Whether embedded images are enabled on this guild.
     */
    embedEnabled: boolean;
    /**
     * The verification level of the guild.
     */
    verificationLevel: number;
    /**
     * The time the guild was created
     * @readonly
     */
    creationDate: Date;
    /**
     * The date at which the logged-in client joined the guild.
     */
    joinDate: Date;
    /**
     * Gets the URL to this guild's icon (if it has one, otherwise it returns null)
     * @readonly
     */
    iconURL: string;
    /**
     * The owner of the Guild
     * @readonly
     */
    owner: GuildMember;
    /**
     * The `#general` GuildChannel of the server.
     * @readonly
     */
    defaultChannel: GuildChannel;

    /**
     * Returns the GuildMember form of a User object, if the User is present in the guild.
     * @param {UserResolvable} user The user that you want to obtain the GuildMember of
     * @returns {?GuildMember}
     * @example
     * // get the guild member of a user
     * const member = guild.member(message.author);
     */
    member(user: UserResolvable): GuildMember;
    /**
     * Updates the Guild with new information - e.g. a new name.
     * @param {GuildEditData} data The data to update the guild with
     * @returns {Promise<Guild>}
     * @example
     * // set the guild name and region
     * guild.edit({
     *  name: 'Discord Guild',
     *  region: 'london',
     * })
     * .then(updated => console.log(`New guild name ${updated.name} in region ${updated.region}`))
     * .catch(console.log);
     */
    edit(data: GuildEditData): Promise<Guild>;
    /**
     * Edit the name of the Guild.
     * @param {string} name The new name of the Guild
     * @returns {Promise<Guild>}
     * @example
     * // edit the guild name
     * guild.setName('Discord Guild')
     *  .then(updated => console.log(`Updated guild name to ${guild.name}`))
     *  .catch(console.log);
     */
    setName(name: string): Promise<Guild>;
    /**
     * Edit the region of the Guild.
     * @param {Region} region The new region of the guild.
     * @returns {Promise<Guild>}
     * @example
     * // edit the guild region
     * guild.setRegion('london')
     *  .then(updated => console.log(`Updated guild region to ${guild.region}`))
     *  .catch(console.log);
     */
    setRegion(region: Region): Promise<Guild>;
    /**
     * Edit the verification level of the Guild.
     * @param {VerificationLevel} verificationLevel The new verification level of the guild
     * @returns {Promise<Guild>}
     * @example
     * // edit the guild verification level
     * guild.setVerificationLevel(1)
     *  .then(updated => console.log(`Updated guild verification level to ${guild.verificationLevel}`))
     *  .catch(console.log);
     */
    setVerificationLevel(verificationLevel: VerificationLevel): Promise<Guild>;
    /**
     * Edit the AFK channel of the Guild.
     * @param {GuildChannelResolvable} afkChannel The new AFK channel
     * @returns {Promise<Guild>}
     * @example
     * // edit the guild AFK channel
     * guild.setAFKChannel(channel)
     *  .then(updated => console.log(`Updated guild AFK channel to ${guild.afkChannel}`))
     *  .catch(console.log);
     */
    setAFKChannel(afkChannel: GuildChannelResolvable): Promise<Guild>;
    /**
     * Edit the AFK timeout of the Guild.
     * @param {number} afkTimeout The time in seconds that a user must be idle to be considered AFK
     * @returns {Promise<Guild>}
     * @example
     * // edit the guild AFK channel
     * guild.setAFKTimeout(60)
     *  .then(updated => console.log(`Updated guild AFK timeout to ${guild.afkTimeout}`))
     *  .catch(console.log);
     */
    setAFKTimeout(afkTimeout: number): Promise<Guild>;
    /**
     * Set a new Guild Icon.
     * @param {Base64Resolvable} icon The new icon of the guild
     * @returns {Promise<Guild>}
     * @example
     * // edit the guild icon
     * guild.setIcon(fs.readFileSync('./icon.png'))
     *  .then(updated => console.log('Updated the guild icon'))
     *  .catch(console.log);
     */
    setIcon(icon: Base64Resolvable): Promise<Guild>;
    /**
     * Sets a new owner of the Guild.
     * @param {GuildMemberResolvable} owner The new owner of the Guild
     * @returns {Promise<Guild>}
     * @example
     * // edit the guild owner
     * guild.setOwner(guilds.members[0])
     *  .then(updated => console.log(`Updated the guild owner to ${updated.owner.username}`))
     *  .catch(console.log);
     */
    setOwner(owner: GuildMemberResolvable): Promise<Guild>;
    /**
     * Set a new Guild Splash Logo.
     * @param {Base64Resolvable} splash The new splash screen of the guild
     * @returns {Promise<Guild>}
     * @example
     * // edit the guild splash
     * guild.setIcon(fs.readFileSync('./splash.png'))
     *  .then(updated => console.log('Updated the guild splash'))
     *  .catch(console.log);
     */
    setSplash(splash: Base64Resolvable): Promise<Guild>;
    /**
     * Bans a user from the guild.
     * @param {UserResolvable} user The user to ban
     * @param {number} [deleteDays=0] The amount of days worth of messages from this user that should
     * also be deleted. Between `0` and `7`.
     * @returns {Promise<GuildMember|User>}
     * @example
     * // ban a user
     * guild.ban('123123123123');
     */
    ban(user: UserResolvable, deleteDays?: number): Promise<GuildMember | User>;
    /**
     * Unbans a user from the Guild.
     * @param {UserResolvable} user The user to unban
     * @returns {Promise<User>}
     * @example
     * // unban a user
     * guild.unban('123123123123')
     *  .then(user => console.log(`Unbanned ${user.username} from ${guild.name}`))
     *  .catch(reject);
     */
    unban(user: UserResolvable): Promise<User>;
    /**
     * Fetch a Collection of banned users in this Guild.
     * @returns {Promise<Collection<string, User>>}
     */
    fetchBans(): Promise<Collection<string, User>>;
    /**
     * Fetch a Collection of invites to this Guild. Resolves with a Collection mapping invites by their codes.
     * @returns {Promise<Collection<string, Invite>>}
     */
    fetchInvites(): Promise<Collection<string, Invite>>;
    /**
     * Fetch a single guild member from a user.
     * @param {UserResolvable} user The user to fetch the member for
     * @returns {Promise<GuildMember>}
     */
    fetchMember(user: UserResolvable): Promise<GuildMember>;
    /**
     * Fetches all the members in the Guild, even if they are offline. If the Guild has less than 250 members,
     * this should not be necessary.
     * @param {string} [query=''] An optional query to provide when fetching members
     * @returns {Promise<Guild>}
     */
    fetchMembers(query?: string): Promise<Guild>;
    /**
     * Creates a new Channel in the Guild.
     * @param {string} name The name of the new channel
     * @param {string} type The type of the new channel, either `text` or `voice`
     * @returns {Promise<TextChannel|VoiceChannel>}
     * @example
     * // create a new text channel
     * guild.createChannel('new general', 'text')
     *  .then(channel => console.log(`Created new channel ${channel}`))
     *  .catch(console.log);
     */
    createChannel(name: string, type: string): Promise<TextChannel | VoiceChannel>;
    /**
     * Creates a new role in the guild, and optionally updates it with the given information.
     * @param {RoleData} [data] The data to update the role with
     * @returns {Promise<Role>}
     * @example
     * // create a new role
     * guild.createRole()
     *  .then(role => console.log(`Created role ${role}`))
     *  .catch(console.log);
     * @example
     * // create a new role with data
     * guild.createRole({ name: 'Super Cool People' })
     *   .then(role => console.log(`Created role ${role}`))
     *   .catch(console.log)
     */
    createRole(data?: RoleData): Promise<Role>;
    /**
     * Causes the Client to leave the guild.
     * @returns {Promise<Guild>}
     * @example
     * // leave a guild
     * guild.leave()
     *  .then(g => console.log(`Left the guild ${g}`))
     *  .catch(console.log);
     */
    leave(): Promise<Guild>;
    /**
     * Causes the Client to delete the guild.
     * @returns {Promise<Guild>}
     * @example
     * // delete a guild
     * guild.delete()
     *  .then(g => console.log(`Deleted the guild ${g}`))
     *  .catch(console.log);
     */
    delete(): Promise<Guild>;
    /**
     * Syncs this guild (already done automatically every 30 seconds). Only applicable to user accounts.
     */
    sync(): void;
    /**
     * Whether this Guild equals another Guild. It compares all properties, so for most operations
     * it is advisable to just compare `guild.id === guild2.id` as it is much faster and is often
     * what most users need.
     * @param {Guild} guild The guild to compare
     * @returns {boolean}
     */
    equals(guild: Guild): boolean;
    /**
     * When concatenated with a string, this automatically concatenates the Guild's name instead of the Guild object.
     * @returns {string}
     * @example
     * // logs: Hello from My Guild!
     * console.log(`Hello from ${guild}!`);
     * @example
     * // logs: Hello from My Guild!
     * console.log(`Hello from ' + guild + '!');
     */
    toString(): string;

  }

  /**
   * Represents a Guild Channel (i.e. Text Channels and Voice Channels)
   */
  export class GuildChannel extends Channel {
    /**
     * The guild the channel is in
     */
    guild: Guild;
    /**
     * The name of the Guild Channel
     */
    name: string;
    /**
     * The position of the channel in the list.
     */
    position: number;
    /**
     * A map of permission overwrites in this channel for roles and users.
     */
    permissionOverwrites: Collection<string, PermissionOverwrites>;
    /**
     * The client that instantiated the Channel
     */
    client: Client;
    /**
     * The type of the channel, either:
     * * `dm` - a DM channel
     * * `group` - a Group DM channel
     * * `text` - a guild text channel
     * * `voice` - a guild voice channel
     */
    type: string;
    /**
     * The unique ID of the channel
     */
    id: string;
    /**
     * The time the channel was created
     * @readonly
     */
    creationDate: Date;

    /**
     * Gets the overall set of permissions for a user in this channel, taking into account roles and permission
     * overwrites.
     * @param {GuildMemberResolvable} member The user that you want to obtain the overall permissions for
     * @returns {?EvaluatedPermissions}
     */
    permissionsFor(member: GuildMemberResolvable): EvaluatedPermissions;
    /**
     * Overwrites the permissions for a user or role in this channel.
     * @param {Role|UserResolvable} userOrRole The user or role to update
     * @param {PermissionOverwriteOptions} options The configuration for the update
     * @returns {Promise}
     * @example
     * // overwrite permissions for a message author
     * message.channel.overwritePermissions(message.author, {
     *  SEND_MESSAGES: false
     * })
     * .then(() => console.log('Done!'))
     * .catch(console.log);
     */
    overwritePermissions(userOrRole: Role | UserResolvable, options: PermissionOverwriteOptions): Promise<void>;
    /**
     * Set a new name for the Guild Channel
     * @param {string} name The new name for the guild channel
     * @returns {Promise<GuildChannel>}
     * @example
     * // set a new channel name
     * channel.setName('not general')
     *  .then(newChannel => console.log(`Channel's new name is ${newChannel.name}`))
     *  .catch(console.log);
     */
    setName(name: string): Promise<GuildChannel>;
    /**
     * Set a new position for the Guild Channel
     * @param {number} position The new position for the guild channel
     * @returns {Promise<GuildChannel>}
     * @example
     * // set a new channel position
     * channel.setPosition(2)
     *  .then(newChannel => console.log(`Channel's new position is ${newChannel.position}`))
     *  .catch(console.log);
     */
    setPosition(position: number): Promise<GuildChannel>;
    /**
     * Set a new topic for the Guild Channel
     * @param {string} topic The new topic for the guild channel
     * @returns {Promise<GuildChannel>}
     * @example
     * // set a new channel topic
     * channel.setTopic('needs more rate limiting')
     *  .then(newChannel => console.log(`Channel's new topic is ${newChannel.topic}`))
     *  .catch(console.log);
     */
    setTopic(topic: string): Promise<GuildChannel>;
    /**
     * Create an invite to this Guild Channel
     * @param {InviteOptions} [options={}] The options for the invite
     * @returns {Promise<Invite>}
     */
    createInvite(options?: InviteOptions): Promise<Invite>;
    /**
     * Checks if this channel has the same type, topic, position, name, overwrites and ID as another channel.
     * In most cases, a simple `channel.id === channel2.id` will do, and is much faster too.
     * @param {GuildChannel} channel The channel to compare this channel to
     * @returns {boolean}
     */
    equals(channel: GuildChannel): boolean;
    /**
     * When concatenated with a string, this automatically returns the Channel's mention instead of the Channel object.
     * @returns {string}
     * @example
     * // Outputs: Hello from #general
     * console.log(`Hello from ${channel}`);
     * @example
     * // Outputs: Hello from #general
     * console.log('Hello from ' + channel);
     */
    toString(): string;
    /**
     * Deletes the channel
     * @returns {Promise<Channel>}
     * @example
     * // delete the channel
     * channel.delete()
     *  .then() // success
     *  .catch(console.log); // log error
     */
    delete(): Promise<Channel>;

  }

  /**
   * Represents a Member of a Guild on Discord
   * @implements {TextBasedChannel}
   */
  export class GuildMember {
    /**
     * The client that instantiated this GuildMember
     */
    client: Client;
    /**
     * The guild that this member is part of
     */
    guild: Guild;
    /**
     * The user that this guild member instance Represents
     */
    user: User;
    /**
     * Whether this member is deafened server-wide
     */
    serverDeaf: boolean;
    /**
     * Whether this member is muted server-wide
     */
    serverMute: boolean;
    /**
     * Whether this member is self-muted
     */
    selfMute: boolean;
    /**
     * Whether this member is self-deafened
     */
    selfDeaf: boolean;
    /**
     * The voice session ID of this member, if any
     */
    voiceSessionID: string;
    /**
     * The voice channel ID of this member, if any
     */
    voiceChannelID: string;
    /**
     * Whether this meember is speaking
     */
    speaking: boolean;
    /**
     * The nickname of this Guild Member, if they have one
     */
    nickname: string;
    /**
     * The date this member joined the guild
     */
    joinDate: Date;
    /**
     * A list of roles that are applied to this GuildMember, mapped by the role ID.
     * @readonly
     */
    roles: Collection<string, Role>;
    /**
     * Whether this member is muted in any way
     * @readonly
     */
    mute: boolean;
    /**
     * Whether this member is deafened in any way
     * @readonly
     */
    deaf: boolean;
    /**
     * The voice channel this member is in, if any
     * @readonly
     */
    voiceChannel: VoiceChannel;
    /**
     * The ID of this User
     * @readonly
     */
    id: string;
    /**
     * The overall set of permissions for the guild member, taking only roles into account
     */
    permissions: EvaluatedPermissions;

    /**
     * Returns `channel.permissionsFor(guildMember)`. Returns evaluated permissions for a member in a guild channel.
     * @param {ChannelResolvable} channel Guild channel to use as context
     * @returns {?EvaluatedPermissions}
     */
    permissionsIn(channel: ChannelResolvable): EvaluatedPermissions;
    /**
     * Checks if any of the member's roles have a permission.
     * @param {PermissionResolvable} permission The permission to check for
     * @param {boolean} [explicit=false] Whether to require the roles to explicitly have the exact permission
     * @returns {boolean}
     */
    hasPermission(permission: PermissionResolvable, explicit?: boolean): boolean;
    /**
     * Checks whether the roles of the member allows them to perform specific actions.
     * @param {PermissionResolvable[]} permissions The permissions to check for
     * @param {boolean} [explicit=false] Whether to require the member to explicitly have the exact permissions
     * @returns {boolean}
     */
    hasPermissions(permissions: Array<PermissionResolvable>, explicit?: boolean): boolean;
    /**
     * Edit a Guild Member
     * @param {GuildmemberEditData} data The data to edit the member with
     * @returns {Promise<GuildMember>}
     */
    edit(data: GuildmemberEditData): Promise<GuildMember>;
    /**
     * Mute/unmute a user
     * @param {boolean} mute Whether or not the member should be muted
     * @returns {Promise<GuildMember>}
     */
    setMute(mute: boolean): Promise<GuildMember>;
    /**
     * Deafen/undeafen a user
     * @param {boolean} deaf Whether or not the member should be deafened
     * @returns {Promise<GuildMember>}
     */
    setDeaf(deaf: boolean): Promise<GuildMember>;
    /**
     * Moves the Guild Member to the given channel.
     * @param {ChannelResolvable} channel The channel to move the member to
     * @returns {Promise<GuildMember>}
     */
    setVoiceChannel(channel: ChannelResolvable): Promise<GuildMember>;
    /**
     * Sets the Roles applied to the member.
     * @param {Collection<string, Role>|Role[]|string[]} roles The roles or role IDs to apply
     * @returns {Promise<GuildMember>}
     */
    setRoles(roles: Collection<string, Role> | Array<Role> | Array<string>): Promise<GuildMember>;
    /**
     * Adds a single Role to the member.
     * @param {Role|string} role The role or ID of the role to add
     * @returns {Promise<GuildMember>}
     */
    addRole(role: Role | string): Promise<GuildMember>;
    /**
     * Adds multiple roles to the member.
     * @param {Collection<string, Role>|Role[]|string[]} roles The roles or role IDs to add
     * @returns {Promise<GuildMember>}
     */
    addRoles(roles: Collection<string, Role> | Array<Role> | Array<string>): Promise<GuildMember>;
    /**
     * Removes a single Role from the member.
     * @param {Role|string} role The role or ID of the role to remove
     * @returns {Promise<GuildMember>}
     */
    removeRole(role: Role | string): Promise<GuildMember>;
    /**
     * Removes multiple roles from the member.
     * @param {Collection<string, Role>|Role[]|string[]} roles The roles or role IDs to remove
     * @returns {Promise<GuildMember>}
     */
    removeRoles(roles: Collection<string, Role> | Array<Role> | Array<string>): Promise<GuildMember>;
    /**
     * Set the nickname for the Guild Member
     * @param {string} nick The nickname for the Guild Member
     * @returns {Promise<GuildMember>}
     */
    setNickname(nick: string): Promise<GuildMember>;
    /**
     * Deletes any DMs with this Guild Member
     * @returns {Promise<DMChannel>}
     */
    deleteDM(): Promise<DMChannel>;
    /**
     * Kick this member from the Guild
     * @returns {Promise<GuildMember>}
     */
    kick(): Promise<GuildMember>;
    /**
     * Ban this Guild Member
     * @param {number} [deleteDays=0] The amount of days worth of messages from this member that should
     * also be deleted. Between `0` and `7`.
     * @returns {Promise<GuildMember>}
     * @example
     * // ban a guild member
     * guildMember.ban(7);
     */
    ban(deleteDays?: number): Promise<GuildMember>;
    /**
     * When concatenated with a string, this automatically concatenates the User's mention instead of the Member object.
     * @returns {string}
     * @example
     * // logs: Hello from <@123456789>!
     * console.log(`Hello from ${member}!`);
     */
    toString(): string;
    /**
     * Send a message to this channel
     * @param {StringResolvable} content The content to send
     * @param {MessageOptions} [options={}] The options to provide
     * @returns {Promise<Message|Message[]>}
     * @example
     * // send a message
     * channel.sendMessage('hello!')
     *  .then(message => console.log(`Sent message: ${message.content}`))
     *  .catch(console.log);
     */
    sendMessage(content: StringResolvable, options?: MessageOptions): Promise<Message | Array<Message>>;
    /**
     * Send a text-to-speech message to this channel
     * @param {StringResolvable} content The content to send
     * @param {MessageOptions} [options={}] The options to provide
     * @returns {Promise<Message|Message[]>}
     * @example
     * // send a TTS message
     * channel.sendTTSMessage('hello!')
     *  .then(message => console.log(`Sent tts message: ${message.content}`))
     *  .catch(console.log);
     */
    sendTTSMessage(content: StringResolvable, options?: MessageOptions): Promise<Message | Array<Message>>;
    /**
     * Send a file to this channel
     * @param {FileResolvable} attachment The file to send
     * @param {string} [fileName="file.jpg"] The name and extension of the file
     * @param {StringResolvable} [content] Text message to send with the attachment
     * @param {MessageOptions} [options] The options to provide
     * @returns {Promise<Message>}
     */
    sendFile(attachment: FileResolvable, fileName?: string, content?: StringResolvable, options?: MessageOptions): Promise<Message>;
    /**
     * Send a code block to this channel
     * @param {string} lang Language for the code block
     * @param {StringResolvable} content Content of the code block
     * @param {MessageOptions} options The options to provide
     * @returns {Promise<Message|Message[]>}
     */
    sendCode(lang: string, content: StringResolvable, options: MessageOptions): Promise<Message | Array<Message>>;

  }

  /**
   * Collects messages based on a specified filter, then emits them.
   */
  export class MessageCollector extends EventEmitter {
    constructor(channel: Channel, filter: CollectorFilterFunction, options?: CollectorOptions);

    /**
     * The channel this collector is operating on
     */
    channel: Channel;
    /**
     * A function used to filter messages that the collector collects.
     */
    filter: CollectorFilterFunction;
    /**
     * Options for the collecor.
     */
    options: CollectorOptions;
    /**
     * Whether this collector has stopped collecting Messages.
     */
    ended: boolean;
    /**
     * A collection of collected messages, mapped by message ID.
     */
    collected: Collection<string, Message>;

    /**
     * Stops the collector and emits `end`.
     * @param {string} [reason='user'] An optional reason for stopping the collector
     */
    stop(reason?: string): void;

    on(event: string, listener: Function): this;
    on(event: 'message', listener: (message: Message, collector: MessageCollector) => void): this;
    on(event: 'end', listener: (collection: Collection<string, Message>, reason: string) => void): this;

  }

  /**
   * Represents an Invitation to a Guild Channel.
   * <warn>The only guaranteed properties are `code`, `guild` and `channel`. Other properties can be missing.</warn>
   */
  export class Invite {
    /**
     * The client that instantiated the invite
     */
    client: Client;
    /**
     * The Guild the invite is for. If this Guild is already known, this will be a Guild object. If the Guild is
     * unknown, this will be a Partial Guild.
     */
    guild: Guild | PartialGuild;
    /**
     * The code for this invite
     */
    code: string;
    /**
     * Whether or not this invite is temporary
     */
    temporary: boolean;
    /**
     * The maximum age of the invite, in seconds
     */
    maxAge: number;
    /**
     * How many times this invite has been used
     */
    uses: number;
    /**
     * The maximum uses of this invite
     */
    maxUses: number;
    /**
     * The user who created this invite
     */
    inviter: User;
    /**
     * The Channel the invite is for. If this Channel is already known, this will be a GuildChannel object.
     * If the Channel is unknown, this will be a Partial Guild Channel.
     */
    channel: GuildChannel | PartialGuildChannel;
    /**
     * The creation date of the invite
     */
    createdAt: Date;
    /**
     * The creation date of the invite
     */
    creationDate: Date;

    /**
     * Deletes this invite
     * @returns {Promise<Invite>}
     */
    delete(): Promise<Invite>;

  }

  /**
   * Represents a Message on Discord
   */
  export class Message {
    /**
     * The client that instantiated the Message
     */
    client: Client;
    /**
     * The channel that the message was sent in
     */
    channel: TextChannel | DMChannel | GroupDMChannel;
    /**
     * If the message was sent in a guild, this will be the guild the message was sent in
     */
    guild: Guild;
    /**
     * The ID of the message (unique in the channel it was sent)
     */
    id: string;
    /**
     * The content of the message
     */
    content: string;
    /**
     * The author of the message
     */
    author: User;
    /**
     * Represents the Author of the message as a Guild Member. Only available if the message comes from a Guild
     * where the author is still a member.
     */
    member: GuildMember;
    /**
     * Whether or not this message is pinned
     */
    pinned: boolean;
    /**
     * Whether or not the message was Text-To-Speech
     */
    tts: boolean;
    /**
     * A random number used for checking message delivery
     */
    nonce: string;
    /**
     * Whether or not this message was sent by Discord, not actually a user (e.g. pin notifications)
     */
    system: boolean;
    /**
     * A list of embeds in the message - e.g. YouTube Player
     */
    embeds: Array<Embed>;
    /**
     * A collection of attachments in the message - e.g. Pictures - mapped by their ID.
     */
    attachments: Collection<string, MessageAttachment>;
    /**
     * An object containing a further users, roles or channels collections
     * @property {Collection<string, User>} mentions.users Mentioned users, maps their ID to the user object.
     * @property {Collection<string, Role>} mentions.roles Mentioned roles, maps their ID to the role object.
     * @property {Collection<string, GuildChannel>} mentions.channels Mentioned channels,
     * maps their ID to the channel object.
     * @property {boolean} mentions.everyone Whether or not @everyone was mentioned.
     */
    mentions: {
		users: Collection<string, User>,
		roles: Collection<string, Role>,
		channels: Collection<string, GuildChannel>,
		everyone: boolean
	};
    /**
     * When the message was sent
     */
    timestamp: Date;
    /**
     * If the message was edited, the timestamp at which it was last edited
     */
    editedTimestamp: Date;
    /**
     * The message contents with all mentions replaced by the equivalent text.
     */
    cleanContent: string;
    /**
      * An array of cached versions of the message, including the current version.
      * Sorted from latest (first) to oldest (last).
      */
    edits: Array<Message>;

    /**
     * Whether or not a user, channel or role is mentioned in this message.
     * @param {GuildChannel|User|Role|string} data either a guild channel, user or a role object, or a string representing
     * the ID of any of these.
     * @returns {boolean}
     */
    isMentioned(data: GuildChannel | User | Role | string): boolean;
    /**
     * Edit the content of a message
     * @param {StringResolvable} content The new content for the message
     * @returns {Promise<Message>}
     * @example
     * // update the content of a message
     * message.edit('This is my new content!')
     *  .then(msg => console.log(`Updated the content of a message from ${msg.author}`))
     *  .catch(console.log);
     */
    edit(content: StringResolvable): Promise<Message>;
    /**
     * Pins this message to the channel's pinned messages
     * @returns {Promise<Message>}
     */
    pin(): Promise<Message>;
    /**
     * Unpins this message from the channel's pinned messages
     * @returns {Promise<Message>}
     */
    unpin(): Promise<Message>;
    /**
     * Deletes the message
     * @param {number} [timeout=0] How long to wait to delete the message in milliseconds
     * @returns {Promise<Message>}
     * @example
     * // delete a message
     * message.delete()
     *  .then(msg => console.log(`Deleted message from ${msg.author}`))
     *  .catch(console.log);
     */
    delete(timeout?: number): Promise<Message>;
    /**
     * Reply to the message
     * @param {StringResolvable} content The content for the message
     * @param {MessageOptions} [options = {}] The options to provide
     * @returns {Promise<Message|Message[]>}
     * @example
     * // reply to a message
     * message.reply('Hey, I'm a reply!')
     *  .then(msg => console.log(`Sent a reply to ${msg.author}`))
     *  .catch(console.log);
     */
    reply(content: StringResolvable, options?: MessageOptions): Promise<Message | Array<Message>>;
    /**
     * Used mainly internally. Whether two messages are identical in properties. If you want to compare messages
     * without checking all the properties, use `message.id === message2.id`, which is much more efficient. This
     * method allows you to see if there are differences in content, embeds, attachments, nonce and tts properties.
     * @param {Message} message The message to compare it to
     * @param {Object} rawData Raw data passed through the WebSocket about this message
     * @returns {boolean}
     */
    equals(message: Message, rawData: Object): boolean;
    /**
     * When concatenated with a string, this automatically concatenates the Message's content instead of the object.
     * @returns {string}
     * @example
     * // logs: Message: This is a message!
     * console.log(`Message: ${message}`);
     */
    toString(): string;

  }

  export class MessageAttachment {
    /**
     * The Client that instantiated this Message.
     */
    client: Client;
    /**
     * The message this attachment is part of.
     */
    message: Message;
    /**
     * The ID of this attachment
     */
    id: string;
    /**
     * The file name of this attachment
     */
    filename: string;
    /**
     * The size of this attachment in bytes
     */
    filesize: number;
    /**
     * The URL to this attachment
     */
    url: string;
    /**
     * The Proxy URL to this attachment
     */
    proxyURL: string;
    /**
     * The height of this attachment (if an image)
     */
    height: number;
    /**
     * The width of this attachment (if an image)
     */
    width: number;

  }

  export class MessageEmbed {
    /**
     * The client that instantiated this embed
     */
    client: Client;
    /**
     * The message this embed is part of
     */
    message: Message;
    /**
     * The title of this embed, if there is one
     */
    title: string;
    /**
     * The type of this embed
     */
    type: string;
    /**
     * The description of this embed, if there is one
     */
    description: string;
    /**
     * The URL of this embed
     */
    url: string;
    /**
     * The thumbnail of this embed, if there is one
     */
    thumbnail: MessageEmbedThumbnail;
    /**
     * The author of this embed, if there is one
     */
    author: MessageEmbedAuthor;
    /**
     * The provider of this embed, if there is one
     */
    provider: MessageEmbedProvider;

  }

  /**
   * Represents a thumbnail for a Message embed
   */
  export class MessageEmbedThumbnail {
    /**
     * The embed this thumbnail is part of
     */
    embed: MessageEmbed;
    /**
     * The URL for this thumbnail
     */
    url: string;
    /**
     * The Proxy URL for this thumbnail
     */
    proxyURL: string;
    /**
     * The height of the thumbnail
     */
    height: number;
    /**
     * The width of the thumbnail
     */
    width: number;

  }

  /**
   * Represents a Provider for a Message embed
   */
  export class MessageEmbedProvider {
    /**
     * The embed this provider is part of
     */
    embed: MessageEmbed;
    /**
     * The name of this provider
     */
    name: string;
    /**
     * The URL of this provider
     */
    url: string;

  }

  /**
   * Represents a Author for a Message embed
   */
  export class MessageEmbedAuthor {
    /**
     * The embed this author is part of
     */
    embed: MessageEmbed;
    /**
     * The name of this author
     */
    name: string;
    /**
     * The URL of this author
     */
    url: string;

  }

  /**
   * Represents a Guild that the client only has limited information for - e.g. from invites.
   */
  export class PartialGuild {
    /**
     * The client that instantiated this PartialGuild
     */
    client: Client;
    /**
     * The ID of this guild
     */
    id: string;
    /**
     * The name of this guild
     */
    name: string;
    /**
     * The hash of this guild's icon, or null if there is none.
     */
    icon: string;
    /**
     * The hash of the guild splash image, or null if no splash (VIP only)
     */
    splash: string;

  }

  /**
   * Represents a Guild Channel that the client only has limited information for - e.g. from invites.
   */
  export class PartialGuildChannel {
    /**
     * The client that instantiated this PartialGuildChannel
     */
    client: Client;
    /**
     * The ID of this Guild Channel
     */
    id: string;
    /**
     * The name of this Guild Channel
     */
    name: string;
    /**
     * The type of this Guild Channel - `text` or `voice`
     */
    type: string;

  }

  export class PermissionOverwrites {
    /**
     * The GuildChannel this overwrite is for
     */
    channel: GuildChannel;
    /**
     * The ID of this overwrite, either a User ID or a Role ID
     */
    id: string;
    /**
     * The type of this overwrite
     */
    type: string;

    /**
     * Delete this Permission Overwrite.
     * @returns {Promise<PermissionOverwrites>}
     */
    delete(): Promise<PermissionOverwrites>;

  }

  /**
   * Represents a Role on Discord
   */
  export class Role {
    /**
     * The client that instantiated the role
     */
    client: Client;
    /**
     * The guild that the role belongs to
     */
    guild: Guild;
    /**
     * The ID of the role (unique to the guild it is part of)
     */
    id: string;
    /**
     * The name of the role
     */
    name: string;
    /**
     * The base 10 color of the role
     */
    color: number;
    /**
     * If true, users that are part of this role will appear in a separate category in the users list
     */
    hoist: boolean;
    /**
     * The position of the role in the role manager
     */
    position: number;
    /**
     * The evaluated permissions number
     */
    permissions: number;
    /**
     * Whether or not the role is managed by an external service
     */
    managed: boolean;
    /**
     * The time the role was created
     * @readonly
     */
    creationDate: Date;
    /**
     * The hexadecimal version of the role color, with a leading hashtag.
     * @readonly
     */
    hexColor: string;

    /**
     * Get an object mapping permission names to whether or not the role enables that permission
     * @returns {Object<string, boolean>}
     * @example
     * // print the serialized role
     * console.log(role.serialize());
     */
    serialize(): {[K:string]: boolean};
    /**
     * Checks if the role has a permission.
     * @param {PermissionResolvable} permission The permission to check for
     * @param {boolean} [explicit=false] Whether to require the role to explicitly have the exact permission
     * @returns {boolean}
     * @example
     * // see if a role can ban a member
     * if (role.hasPermission('BAN_MEMBERS')) {
     *   console.log('This role can ban members');
     * } else {
     *   console.log('This role can\'t ban members');
     * }
     */
    hasPermission(permission: PermissionResolvable, explicit?: boolean): boolean;
    /**
     * Checks if the role has all specified permissions.
     * @param {PermissionResolvable[]} permissions The permissions to check for
     * @param {boolean} [explicit=false] Whether to require the role to explicitly have the exact permissions
     * @returns {boolean}
     */
    hasPermissions(permissions: Array<PermissionResolvable>, explicit?: boolean): boolean;
    /**
     * Edits the role
     * @param {RoleData} data The new data for the role
     * @returns {Promise<Role>}
     * @example
     * // edit a role
     * role.edit({name: 'new role'})
     *  .then(r => console.log(`Edited role ${r}`))
     *  .catch(console.log);
     */
    edit(data: RoleData): Promise<Role>;
    /**
     * Set a new name for the role
     * @param {string} name The new name of the role
     * @returns {Promise<Role>}
     * @example
     * // set the name of the role
     * role.setName('new role')
     *  .then(r => console.log(`Edited name of role ${r}`))
     *  .catch(console.log);
     */
    setName(name: string): Promise<Role>;
    /**
     * Set a new color for the role
     * @param {number|string} color The new color for the role, either a hex string or a base 10 number
     * @returns {Promise<Role>}
     * @example
     * // set the color of a role
     * role.setColor('#FF0000')
     *  .then(r => console.log(`Set color of role ${r}`))
     *  .catch(console.log);
     */
    setColor(color: number | string): Promise<Role>;
    /**
     * Set whether or not the role should be hoisted
     * @param {boolean} hoist Whether or not to hoist the role
     * @returns {Promise<Role>}
     * @example
     * // set the hoist of the role
     * role.setHoist(true)
     *  .then(r => console.log(`Role hoisted: ${r.hoist}`))
     *  .catch(console.log);
     */
    setHoist(hoist: boolean): Promise<Role>;
    /**
     * Set the position of the role
     * @param {number} position The position of the role
     * @returns {Promise<Role>}
     * @example
     * // set the position of the role
     * role.setPosition(1)
     *  .then(r => console.log(`Role position: ${r.position}`))
     *  .catch(console.log);
     */
    setPosition(position: number): Promise<Role>;
    /**
     * Set the permissions of the role
     * @param {string[]} permissions The permissions of the role
     * @returns {Promise<Role>}
     * @example
     * // set the permissions of the role
     * role.setPermissions(['KICK_MEMBERS', 'BAN_MEMBERS'])
     *  .then(r => console.log(`Role updated ${r}`))
     *  .catch(console.log);
     */
    setPermissions(permissions: Array<string>): Promise<Role>;
    /**
     * Deletes the role
     * @returns {Promise<Role>}
     * @example
     * // delete a role
     * role.delete()
     *  .then(r => console.log(`Deleted role ${r}`))
     *  .catch(console.log);
     */
    delete(): Promise<Role>;
    /**
     * Whether this role equals another role. It compares all properties, so for most operations
     * it is advisable to just compare `role.id === role2.id` as it is much faster and is often
     * what most users need.
     * @param {Role} role The role to compare to
     * @returns {boolean}
     */
    equals(role: Role): boolean;
    /**
     * When concatenated with a string, this automatically concatenates the Role mention rather than the Role object.
     * @returns {string}
     */
    toString(): string;

  }

  /**
   * Represents a Server Text Channel on Discord.
   * @implements {TextBasedChannel}
   */
  export class TextChannel extends GuildChannel {
    /**
     * The topic of the Text Channel, if there is one.
     */
    topic: string;
    /**
     * A collection of members that can see this channel, mapped by their ID.
     * @readonly
     */
    members: Collection<string, GuildMember>;
    /**
     * A Collection containing the messages sent to this channel.
     */
    messages: Collection<string, Message>;
    /**
     * The ID of the last message in the channel, if one was sent.
     */
    lastMessageID: string;
    /**
     * Whether or not the typing indicator is being shown in the channel.
     */
    typing: boolean;
    /**
     * Number of times `startTyping` has been called.
     */
    typingCount: number;
    /**
     * The guild the channel is in
     */
    guild: Guild;
    /**
     * The name of the Guild Channel
     */
    name: string;
    /**
     * The position of the channel in the list.
     */
    position: number;
    /**
     * A map of permission overwrites in this channel for roles and users.
     */
    permissionOverwrites: Collection<string, PermissionOverwrites>;

    /**
     * Send a message to this channel
     * @param {StringResolvable} content The content to send
     * @param {MessageOptions} [options={}] The options to provide
     * @returns {Promise<Message|Message[]>}
     * @example
     * // send a message
     * channel.sendMessage('hello!')
     *  .then(message => console.log(`Sent message: ${message.content}`))
     *  .catch(console.log);
     */
    sendMessage(content: StringResolvable, options?: MessageOptions): Promise<Message | Array<Message>>;
    /**
     * Send a text-to-speech message to this channel
     * @param {StringResolvable} content The content to send
     * @param {MessageOptions} [options={}] The options to provide
     * @returns {Promise<Message|Message[]>}
     * @example
     * // send a TTS message
     * channel.sendTTSMessage('hello!')
     *  .then(message => console.log(`Sent tts message: ${message.content}`))
     *  .catch(console.log);
     */
    sendTTSMessage(content: StringResolvable, options?: MessageOptions): Promise<Message | Array<Message>>;
    /**
     * Send a file to this channel
     * @param {FileResolvable} attachment The file to send
     * @param {string} [fileName="file.jpg"] The name and extension of the file
     * @param {StringResolvable} [content] Text message to send with the attachment
     * @param {MessageOptions} [options] The options to provide
     * @returns {Promise<Message>}
     */
    sendFile(attachment: FileResolvable, fileName?: string, content?: StringResolvable, options?: MessageOptions): Promise<Message>;
    /**
     * Send a code block to this channel
     * @param {string} lang Language for the code block
     * @param {StringResolvable} content Content of the code block
     * @param {MessageOptions} options The options to provide
     * @returns {Promise<Message|Message[]>}
     */
    sendCode(lang: string, content: StringResolvable, options: MessageOptions): Promise<Message | Array<Message>>;
    /**
     * Gets a single message from this channel, regardless of it being cached or not.
     * @param {string} messageID The ID of the message to get
     * @returns {Promise<Message>}
     * @example
     * // get message
     * channel.fetchMessage('99539446449315840')
     *   .then(message => console.log(message.content))
     *   .catch(console.error);
     */
    fetchMessage(messageID: string): Promise<Message>;
    /**
     * Gets the past messages sent in this channel. Resolves with a Collection mapping message ID's to Message objects.
     * @param {ChannelLogsQueryOptions} [options={}] The query parameters to pass in
     * @returns {Promise<Collection<string, Message>>}
     * @example
     * // get messages
     * channel.fetchMessages({limit: 10})
     *  .then(messages => console.log(`Received ${messages.size} messages`))
     *  .catch(console.log);
     */
    fetchMessages(options?: ChannelLogsQueryOptions): Promise<Collection<string, Message>>;
    /**
     * Fetches the pinned messages of this Channel and returns a Collection of them.
     * @returns {Promise<Collection<string, Message>>}
     */
    fetchPinnedMessages(): Promise<Collection<string, Message>>;
    /**
     * Starts a typing indicator in the channel.
     * @param {number} [count] The number of times startTyping should be considered to have been called
     * @example
     * // start typing in a channel
     * channel.startTyping();
     */
    startTyping(count?: number): void;
    /**
     * Stops the typing indicator in the channel.
     * The indicator will only stop if this is called as many times as startTyping().
     * <info>It can take a few seconds for the Client User to stop typing.</info>
     * @param {boolean} [force=false] Whether or not to reset the call count and force the indicator to stop
     * @example
     * // stop typing in a channel
     * channel.stopTyping();
     * @example
     * // force typing to fully stop in a channel
     * channel.stopTyping(true);
     */
    stopTyping(force?: boolean): void;
    /**
     * Creates a Message Collector
     * @param {CollectorFilterFunction} filter The filter to create the collector with
     * @param {CollectorOptions} [options={}] The options to pass to the collector
     * @returns {MessageCollector}
     * @example
     * // create a message collector
     * const collector = channel.createCollector(
     *  m => m.content.includes('discord'),
     *  { time: 15000 }
     * );
     * collector.on('message', m => console.log(`Collected ${m.content}`));
     * collector.on('end', collected => console.log(`Collected ${collected.size} items`));
     */
    createCollector(filter: CollectorFilterFunction, options?: CollectorOptions): MessageCollector;
    /**
     * Similar to createCollector but in Promise form. Resolves with a Collection of messages that pass the specified
     * filter.
     * @param {CollectorFilterFunction} filter The filter function to use
     * @param {AwaitMessagesOptions} [options={}] Optional options to pass to the internal collector
     * @returns {Promise<Collection<string, Message>>}
     * @example
     * // await !vote messages
     * const filter = m => m.content.startsWith('!vote');
     * // errors: ['time'] treats ending because of the time limit as an error
     * channel.awaitMessages(filter, { max: 4, time: 60000, errors: ['time'] })
     *  .then(collected => console.log(collected.size))
     *  .catch(collected => console.log(`After a minute, only ${collected.size} out of 4 voted.`));
     */
    awaitMessages(filter: CollectorFilterFunction, options?: AwaitMessagesOptions): Promise<Collection<string, Message>>;
    /**
     * Bulk delete a given Collection or Array of messages in one go. Returns the deleted messages after.
     * @param {Collection<string, Message>|Message[]} messages The messages to delete
     * @returns {Collection<string, Message>}
     */
    bulkDelete(messages: Collection<string, Message> | Array<Message>): Collection<string, Message>;
    /**
     * Gets the overall set of permissions for a user in this channel, taking into account roles and permission
     * overwrites.
     * @param {GuildMemberResolvable} member The user that you want to obtain the overall permissions for
     * @returns {?EvaluatedPermissions}
     */
    permissionsFor(member: GuildMemberResolvable): EvaluatedPermissions;
    /**
     * Overwrites the permissions for a user or role in this channel.
     * @param {Role|UserResolvable} userOrRole The user or role to update
     * @param {PermissionOverwriteOptions} options The configuration for the update
     * @returns {Promise}
     * @example
     * // overwrite permissions for a message author
     * message.channel.overwritePermissions(message.author, {
     *  SEND_MESSAGES: false
     * })
     * .then(() => console.log('Done!'))
     * .catch(console.log);
     */
    overwritePermissions(userOrRole: Role | UserResolvable, options: PermissionOverwriteOptions): Promise<void>;
    /**
     * Set a new name for the Guild Channel
     * @param {string} name The new name for the guild channel
     * @returns {Promise<GuildChannel>}
     * @example
     * // set a new channel name
     * channel.setName('not general')
     *  .then(newChannel => console.log(`Channel's new name is ${newChannel.name}`))
     *  .catch(console.log);
     */
    setName(name: string): Promise<GuildChannel>;
    /**
     * Set a new position for the Guild Channel
     * @param {number} position The new position for the guild channel
     * @returns {Promise<GuildChannel>}
     * @example
     * // set a new channel position
     * channel.setPosition(2)
     *  .then(newChannel => console.log(`Channel's new position is ${newChannel.position}`))
     *  .catch(console.log);
     */
    setPosition(position: number): Promise<GuildChannel>;
    /**
     * Set a new topic for the Guild Channel
     * @param {string} topic The new topic for the guild channel
     * @returns {Promise<GuildChannel>}
     * @example
     * // set a new channel topic
     * channel.setTopic('needs more rate limiting')
     *  .then(newChannel => console.log(`Channel's new topic is ${newChannel.topic}`))
     *  .catch(console.log);
     */
    setTopic(topic: string): Promise<GuildChannel>;
    /**
     * Create an invite to this Guild Channel
     * @param {InviteOptions} [options={}] The options for the invite
     * @returns {Promise<Invite>}
     */
    createInvite(options?: InviteOptions): Promise<Invite>;
    /**
     * Checks if this channel has the same type, topic, position, name, overwrites and ID as another channel.
     * In most cases, a simple `channel.id === channel2.id` will do, and is much faster too.
     * @param {GuildChannel} channel The channel to compare this channel to
     * @returns {boolean}
     */
    equals(channel: GuildChannel): boolean;
    /**
     * When concatenated with a string, this automatically returns the Channel's mention instead of the Channel object.
     * @returns {string}
     * @example
     * // Outputs: Hello from #general
     * console.log(`Hello from ${channel}`);
     * @example
     * // Outputs: Hello from #general
     * console.log('Hello from ' + channel);
     */
    toString(): string;

  }

  /**
   * Represents a User on Discord.
   * @implements {TextBasedChannel}
   */
  export class User {
    /**
     * The Client that created the instance of the the User.
     */
    client: Client;
    /**
     * The ID of the User
     */
    id: string;
    /**
     * The username of the User
     */
    username: string;
    /**
     * A discriminator based on username for the User
     */
    discriminator: string;
    /**
     * The ID of the user's avatar
     */
    avatar: string;
    /**
     * Whether or not the User is a Bot.
     */
    bot: boolean;
    /**
     * The status of the user:
     *
     * * **`online`** - user is online
     * * **`offline`** - user is offline
     * * **`idle`** - user is AFK
     */
    status: string;
    /**
     * The game that the user is playing, `null` if they aren't playing a game.
     */
    game: Game;
    /**
     * The time the user was created
     * @readonly
     */
    creationDate: Date;
    /**
     * A link to the user's avatar (if they have one, otherwise null)
     * @readonly
     */
    avatarURL: string;

    /**
     * Check whether the user is typing in a channel.
     * @param {ChannelResolvable} channel The channel to check in
     * @returns {boolean}
     */
    typingIn(channel: ChannelResolvable): boolean;
    /**
     * Get the time that the user started typing.
     * @param {ChannelResolvable} channel The channel to get the time in
     * @returns {?Date}
     */
    typingSinceIn(channel: ChannelResolvable): Date;
    /**
     * Get the amount of time the user has been typing in a channel for (in milliseconds), or -1 if they're not typing.
     * @param {ChannelResolvable} channel The channel to get the time in
     * @returns {number}
     */
    typingDurationIn(channel: ChannelResolvable): number;
    /**
     * Deletes a DM Channel (if one exists) between the Client and the User. Resolves with the Channel if successful.
     * @returns {Promise<DMChannel>}
     */
    deleteDM(): Promise<DMChannel>;
    /**
     * Checks if the user is equal to another. It compares username, ID, discriminator, status and the game being played.
     * It is recommended to compare equality by using `user.id === user2.id` unless you want to compare all properties.
     * @param {User} user The user to compare
     * @returns {boolean}
     */
    equals(user: User): boolean;
    /**
     * When concatenated with a string, this automatically concatenates the User's mention instead of the User object.
     * @returns {string}
     * @example
     * // logs: Hello from <@123456789>!
     * console.log(`Hello from ${user}!`);
     */
    toString(): string;
    /**
     * Send a message to this channel
     * @param {StringResolvable} content The content to send
     * @param {MessageOptions} [options={}] The options to provide
     * @returns {Promise<Message|Message[]>}
     * @example
     * // send a message
     * channel.sendMessage('hello!')
     *  .then(message => console.log(`Sent message: ${message.content}`))
     *  .catch(console.log);
     */
    sendMessage(content: StringResolvable, options?: MessageOptions): Promise<Message | Array<Message>>;
    /**
     * Send a text-to-speech message to this channel
     * @param {StringResolvable} content The content to send
     * @param {MessageOptions} [options={}] The options to provide
     * @returns {Promise<Message|Message[]>}
     * @example
     * // send a TTS message
     * channel.sendTTSMessage('hello!')
     *  .then(message => console.log(`Sent tts message: ${message.content}`))
     *  .catch(console.log);
     */
    sendTTSMessage(content: StringResolvable, options?: MessageOptions): Promise<Message | Array<Message>>;
    /**
     * Send a file to this channel
     * @param {FileResolvable} attachment The file to send
     * @param {string} [fileName="file.jpg"] The name and extension of the file
     * @param {StringResolvable} [content] Text message to send with the attachment
     * @param {MessageOptions} [options] The options to provide
     * @returns {Promise<Message>}
     */
    sendFile(attachment: FileResolvable, fileName?: string, content?: StringResolvable, options?: MessageOptions): Promise<Message>;
    /**
     * Send a code block to this channel
     * @param {string} lang Language for the code block
     * @param {StringResolvable} content Content of the code block
     * @param {MessageOptions} options The options to provide
     * @returns {Promise<Message|Message[]>}
     */
    sendCode(lang: string, content: StringResolvable, options: MessageOptions): Promise<Message | Array<Message>>;

  }

  /**
   * Represents a Server Voice Channel on Discord.
   */
  export class VoiceChannel extends GuildChannel {
    /**
     * The members in this Voice Channel.
     */
    members: Collection<string, GuildMember>;
    /**
     * The bitrate of this voice channel
     */
    bitrate: number;
    /**
     * The maximum amount of users allowed in this channel - 0 means unlimited.
     */
    userLimit: number;
    /**
     * The guild the channel is in
     */
    guild: Guild;
    /**
     * The name of the Guild Channel
     */
    name: string;
    /**
     * The position of the channel in the list.
     */
    position: number;
    /**
     * A map of permission overwrites in this channel for roles and users.
     */
    permissionOverwrites: Collection<string, PermissionOverwrites>;

    /**
     * Sets the bitrate of the channel
     * @param {number} bitrate The new bitrate
     * @returns {Promise<VoiceChannel>}
     * @example
     * // set the bitrate of a voice channel
     * voiceChannel.setBitrate(48000)
     *  .then(vc => console.log(`Set bitrate to ${vc.bitrate} for ${vc.name}`))
     *  .catch(console.log);
     */
    setBitrate(bitrate: number): Promise<VoiceChannel>;
    /**
     * Attempts to join this Voice Channel
     * @returns {Promise<VoiceConnection>}
     * @example
     * // join a voice channel
     * voiceChannel.join()
     *  .then(connection => console.log('Connected!'))
     *  .catch(console.log);
     */
    join(): Promise<VoiceConnection>;
    /**
     * Leaves this voice channel
     * @example
     * // leave a voice channel
     * voiceChannel.leave();
     */
    leave(): void;
    /**
     * Gets the overall set of permissions for a user in this channel, taking into account roles and permission
     * overwrites.
     * @param {GuildMemberResolvable} member The user that you want to obtain the overall permissions for
     * @returns {?EvaluatedPermissions}
     */
    permissionsFor(member: GuildMemberResolvable): EvaluatedPermissions;
    /**
     * Overwrites the permissions for a user or role in this channel.
     * @param {Role|UserResolvable} userOrRole The user or role to update
     * @param {PermissionOverwriteOptions} options The configuration for the update
     * @returns {Promise}
     * @example
     * // overwrite permissions for a message author
     * message.channel.overwritePermissions(message.author, {
     *  SEND_MESSAGES: false
     * })
     * .then(() => console.log('Done!'))
     * .catch(console.log);
     */
    overwritePermissions(userOrRole: Role | UserResolvable, options: PermissionOverwriteOptions): Promise<void>;
    /**
     * Set a new name for the Guild Channel
     * @param {string} name The new name for the guild channel
     * @returns {Promise<GuildChannel>}
     * @example
     * // set a new channel name
     * channel.setName('not general')
     *  .then(newChannel => console.log(`Channel's new name is ${newChannel.name}`))
     *  .catch(console.log);
     */
    setName(name: string): Promise<GuildChannel>;
    /**
     * Set a new position for the Guild Channel
     * @param {number} position The new position for the guild channel
     * @returns {Promise<GuildChannel>}
     * @example
     * // set a new channel position
     * channel.setPosition(2)
     *  .then(newChannel => console.log(`Channel's new position is ${newChannel.position}`))
     *  .catch(console.log);
     */
    setPosition(position: number): Promise<GuildChannel>;
    /**
     * Set a new topic for the Guild Channel
     * @param {string} topic The new topic for the guild channel
     * @returns {Promise<GuildChannel>}
     * @example
     * // set a new channel topic
     * channel.setTopic('needs more rate limiting')
     *  .then(newChannel => console.log(`Channel's new topic is ${newChannel.topic}`))
     *  .catch(console.log);
     */
    setTopic(topic: string): Promise<GuildChannel>;
    /**
     * Create an invite to this Guild Channel
     * @param {InviteOptions} [options={}] The options for the invite
     * @returns {Promise<Invite>}
     */
    createInvite(options?: InviteOptions): Promise<Invite>;
    /**
     * Checks if this channel has the same type, topic, position, name, overwrites and ID as another channel.
     * In most cases, a simple `channel.id === channel2.id` will do, and is much faster too.
     * @param {GuildChannel} channel The channel to compare this channel to
     * @returns {boolean}
     */
    equals(channel: GuildChannel): boolean;
    /**
     * When concatenated with a string, this automatically returns the Channel's mention instead of the Channel object.
     * @returns {string}
     * @example
     * // Outputs: Hello from #general
     * console.log(`Hello from ${channel}`);
     * @example
     * // Outputs: Hello from #general
     * console.log('Hello from ' + channel);
     */
    toString(): string;

  }

  export class Collection<K, T> extends Map<K, T> {
		/**
		 * Returns an ordered array of the values of this collection.
		 * @returns {array}
		 * @example
		 * // identical to:
		 * Array.from(collection.values());
		 */
    array(): T[];
		/**
		 * If the items in this collection have a delete method (e.g. messages), invoke
		 * the delete method. Returns an array of promises
		 * @returns {Promise[]}
		 */
    deleteAll(): Promise<T>[];
		/**
		 * Identical to
		 * [Array.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every).
		 * @param {function} fn Function used to test (should return a boolean)
		 * @param {Object} [thisArg] Value to use as `this` when executing function
		 * @returns {Collection}
		 */
    every(fn: (element: T, key: K, collection: Collection<K, T>) => boolean, thisArg?: Object): Collection<K, T>;
		/**
		 * Returns true if the collection has an item where `item[prop] === value`
		 * @param {string} prop The property to test against
		 * @param {*} value The expected value
		 * @returns {boolean}
		 * @example
		 * if (collection.exists('id', '123123...')) {
		 *  console.log('user here!');
		 * }
		 */
    exists(key: K, value: T): boolean;
		/**
		 * Identical to
		 * [Array.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
		 * but returns a Collection instead of an Array.
		 * @param {function} fn Function used to test (should return a boolean)
		 * @param {Object} [thisArg] Value to use as `this` when executing function
		 * @returns {Collection}
		 */
    filter(fn: (element: T, key: K, collection: Collection<K, T>) => boolean, thisArg?: Object): Collection<K, T>;
		/**
		 * Returns a single item where `item[prop] === value`, or the given function returns `true`.
		 * In the latter case, this is identical to
		 * [Array.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find).
		 * @param {string|function} propOrFn The property to test against, or the function to test with
		 * @param {*} [value] The expected value - only applicable and required if using a property for the first argument
		 * @returns {*}
		 * @example
		 * collection.find('id', '123123...');
		 * @example
		 * collection.find(val => val.id === '123123...');
		 */
    find(key: K, value: T): T;
	find(fn: (element: T, key: K, collection: Collection<K, T>) => boolean, thisArg?: Object): T;
		/**
		 * Returns an array of items where `item[prop] === value` of the collection
		 * @param {string} prop The property to test against
		 * @param {*} value The expected value
		 * @returns {array}
		 * @example
		 * collection.findAll('username', 'Bob');
		 */
    findAll(key: K, value: T): T[];
		/**
		 * Returns the first item in this collection.
		 * @returns {*}
		 */
    first(): T;
		/**
		 * Returns the last item in this collection. This is a relatively slow operation,
		 * since an array copy of the values must be made to find the last element.
		 * @returns {*}
		 */
    last(): T;
		/**
		 * Identical to
		 * [Array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).
		 * @param {function} fn Function that produces an element of the new array, taking three arguments
		 * @param {*} [thisArg] Value to use as `this` when executing function
		 * @returns {array}
		 */
    map<U>(fn: (element: T, key: K, collection: Collection<K, T>) => U, thisArg?: Object): U[];
		/**
		 * Returns a random item from this collection. This is a relatively slow operation,
		 * since an array copy of the values must be made to find a random element.
		 * @returns {*}
		 */
    random(): T[];
		/**
		 * Identical to
		 * [Array.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some).
		 * @param {function} fn Function used to test (should return a boolean)
		 * @param {Object} [thisArg] Value to use as `this` when executing function
		 * @returns {Collection}
		 */
    some(fn: (element: T, key: K, collection: Collection<K, T>) => void, thisArg?: Object): boolean;
  }

  export type ChannelType = 'dm' | 'group' | 'text' | 'voice';

  export type MessageOptions = {
    tts?: boolean;
    nonce?: string;
    disable_everyone?: boolean;
  }

  export type PermissionOverwriteOptions = {
    SEND_MESSAGES?: boolean;
    ATTACH_FILES?: boolean;
  }

  export type StreamOptions = {
    seek: number;
    volume: number;
  }

  export type ClientOptions = {
    ws?: {
      large_threshold?: number;
      compress?: boolean;
      properties?: {
        $os?: string;
        $browser?: string;
        $device?: string;
        $referrer?: string;
        $referring_domain?: string;
      }
    };
    protocol_version?: number;
    max_message_cache?: number;
    rest_ws_bridge_timeout?: number;
    api_request_method?: string;
    shard_id?: number;
    shard_count?: number;
    fetch_all_members?: boolean;
    disable_everyone?: boolean;
  }

  export type CollectorOptions = {
    time?: number;
    max?: number;
  }

  export type AwaitMessagesOptions = {
    errors?: any[];
    time?: number;
    max?: number;
  }

  export type ChannelLogsQueryOptions = {
    limit?: number;
    before?: string;
    after?: string;
    around?: string;
  }

  export type InviteOptions = {
    temporary?: boolean;
    maxAge?: number;
    maxUses?: number;
  }

  export type CollectorFilterFunction = (message: Message, collector: MessageCollector) => boolean;

  export type UserResolvable = User | Guild | GuildMember | Message | string;
  export type ChannelResolvable = Channel | string;
  export type Base64Resolvable = Buffer | string;
  export type FileResolvable = Buffer | string;
  export type GuildMemberResolvable = GuildMember | User;
  export type GuildResolvable = Guild;
  export type PermissionResolvable = string | number;
  export type StringResolvable = string | Array<string> | any;

  export type BasePlayer = any;
  export type Game = any;
  export type GuildEditData = any;
  export type Region = any;
  export type VerificationLevel = any;
  export type GuildChannelResolvable = any;
  export type RoleData = any;
  export type GuildmemberEditData = any;
  export type Embed = any;

}