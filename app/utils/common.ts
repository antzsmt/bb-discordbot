/// <reference path="../../typings/index.d.ts" />

import { Message, TextChannel, DMChannel, GroupDMChannel } from "discord.js";

export const isDevEnv: boolean = process.env.NODE_ENV === "development";

export interface SendReplyFunc {
	(message: StringResolvable): MessagePromise;
}

export interface SendMessageFunc extends SendReplyFunc {
	(channel: TextChannel | DMChannel, message: StringResolvable): MessagePromise;
}

export type StringResolvable = any[] | string;
export type MessagePromise = Promise<Message | Array<Message>>;
export type AnyTextChannel = TextChannel | DMChannel | GroupDMChannel; 