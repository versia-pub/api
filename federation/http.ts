import type {
    Delete,
    DislikeExtension,
    Follow,
    FollowAccept,
    FollowReject,
    GroupExtensionSubscribe,
    GroupExtensionSubscribeAccept,
    GroupExtensionSubscribeReject,
    GroupExtensionUnsubscribe,
    InstanceMetadata,
    LikeExtension,
    Note,
    PollVoteExtension,
    ReactionExtension,
    ShareExtension,
    Unfollow,
    User,
} from "./types.ts";
import type { EntityValidator } from "./validator.ts";

type MaybePromise<T> = T | Promise<T>;

type ParserCallbacks<T> = {
    note: (note: Note) => MaybePromise<T>;
    follow: (follow: Follow) => MaybePromise<T>;
    followAccept: (followAccept: FollowAccept) => MaybePromise<T>;
    followReject: (followReject: FollowReject) => MaybePromise<T>;
    user: (user: User) => MaybePromise<T>;
    "pub.versia:likes/Like": (like: LikeExtension) => MaybePromise<T>;
    "pub.versia:likes/Dislike": (dislike: DislikeExtension) => MaybePromise<T>;
    delete: (undo: Delete) => MaybePromise<T>;
    instanceMetadata: (instanceMetadata: InstanceMetadata) => MaybePromise<T>;
    "pub.versia:groups/Subscribe": (
        groupSubscribe: GroupExtensionSubscribe,
    ) => MaybePromise<T>;
    "pub.versia:groups/SubscribeAccept": (
        groupSubscribeAccept: GroupExtensionSubscribeAccept,
    ) => MaybePromise<T>;
    "pub.versia:groups/SubscribeReject": (
        groupSubscribeReject: GroupExtensionSubscribeReject,
    ) => MaybePromise<T>;
    "pub.versia:groups/Unsubscribe": (
        groupUnsubscribe: GroupExtensionUnsubscribe,
    ) => MaybePromise<T>;
    "pub.versia:reactions/Reaction": (
        reaction: ReactionExtension,
    ) => MaybePromise<T>;
    "pub.versia:share/Share": (share: ShareExtension) => MaybePromise<T>;
    "pub.versia:polls/Vote": (vote: PollVoteExtension) => MaybePromise<T>;
    unfollow: (unfollow: Unfollow) => MaybePromise<T>;
    unknown: (data: unknown) => MaybePromise<T>;
};

/**
 * A class to parse the body of a request and call the appropriate callback.
 * @example
 * const body = { ... };
 * const validator = new EntityValidator();
 * const parser = new RequestParserHandler(body, validator);
 *
 * await parser.parseBody({
 *     note: (note) => {
 *         // If the object is a Note, this will be called
 *         console.log(note);
 *     },
 *     follow: (follow) => {
 *         // If the object is a Follow, this will be called
 *         console.log(follow);
 *     },
 *     ...
 * });
 */
export class RequestParserHandler {
    constructor(
        private readonly body: Record<
            string,
            string | number | object | boolean | null
        >,
        private readonly validator: EntityValidator,
    ) {}

    /**
     * Parse the body of the request and call the appropriate callback.
     * To change the return type, edit the ReturnType generic parameter.
     * const parser = new RequestParserHandler(body, validator);
     * @param callbacks The callbacks to call when a specific entity is found.
     * @returns A promise that resolves when the body has been parsed, and the callbacks have finished executing.
     * @throws If the type field is missing or invalid
     * @example
     * await parser.parseBody({
     *     note: (note) => {
     *         console.log(note);
     *     },
     *     follow: (follow) => {
     *         console.log(follow);
     *     },
     *     ...
     * });
     */
    public async parseBody<ReturnType = void>(
        callbacks: Partial<ParserCallbacks<ReturnType>>,
    ): Promise<ReturnType> {
        if (!this.body.type) {
            throw new Error("Missing type field in body");
        }

        switch (this.body.type) {
            case "Note": {
                const note = await this.validator.Note(this.body);

                if (callbacks.note) {
                    return await callbacks.note(note);
                }

                break;
            }
            case "Follow": {
                const follow = await this.validator.Follow(this.body);

                if (callbacks.follow) {
                    return await callbacks.follow(follow);
                }

                break;
            }
            case "FollowAccept": {
                const followAccept = await this.validator.FollowAccept(
                    this.body,
                );

                if (callbacks.followAccept) {
                    return await callbacks.followAccept(followAccept);
                }

                break;
            }
            case "FollowReject": {
                const followReject = await this.validator.FollowReject(
                    this.body,
                );

                if (callbacks.followReject) {
                    return await callbacks.followReject(followReject);
                }

                break;
            }
            case "User": {
                const user = await this.validator.User(this.body);

                if (callbacks.user) {
                    return await callbacks.user(user);
                }

                break;
            }
            case "pub.versia:likes/Like": {
                const like = await this.validator.LikeExtension(this.body);

                if (callbacks["pub.versia:likes/Like"]) {
                    return await callbacks["pub.versia:likes/Like"](like);
                }

                break;
            }
            case "pub.versia:likes/Dislike": {
                const dislike = await this.validator.DislikeExtension(
                    this.body,
                );

                if (callbacks["pub.versia:likes/Dislike"]) {
                    return await callbacks["pub.versia:likes/Dislike"](dislike);
                }

                break;
            }
            case "Delete": {
                // "delete" isn't an allowed variable name
                const delete_ = await this.validator.Delete(this.body);

                if (callbacks.delete) {
                    return await callbacks.delete(delete_);
                }

                break;
            }
            case "InstanceMetadata": {
                const instanceMetadata = await this.validator.InstanceMetadata(
                    this.body,
                );

                if (callbacks.instanceMetadata) {
                    return await callbacks.instanceMetadata(instanceMetadata);
                }

                break;
            }
            case "pub.versia:groups/Subscribe": {
                const groupSubscribe = await this.validator.GroupSubscribe(
                    this.body,
                );

                if (callbacks["pub.versia:groups/Subscribe"]) {
                    return await callbacks["pub.versia:groups/Subscribe"](
                        groupSubscribe,
                    );
                }

                break;
            }
            case "pub.versia:groups/SubscribeAccept": {
                const groupSubscribeAccept =
                    await this.validator.GroupSubscribeAccept(this.body);

                if (callbacks["pub.versia:groups/SubscribeAccept"]) {
                    return await callbacks["pub.versia:groups/SubscribeAccept"](
                        groupSubscribeAccept,
                    );
                }

                break;
            }
            case "pub.versia:groups/SubscribeReject": {
                const groupSubscribeReject =
                    await this.validator.GroupSubscribeReject(this.body);

                if (callbacks["pub.versia:groups/SubscribeReject"]) {
                    return await callbacks["pub.versia:groups/SubscribeReject"](
                        groupSubscribeReject,
                    );
                }

                break;
            }
            case "pub.versia:groups/Unsubscribe": {
                const groupUnsubscribe = await this.validator.GroupUnsubscribe(
                    this.body,
                );

                if (callbacks["pub.versia:groups/Unsubscribe"]) {
                    return await callbacks["pub.versia:groups/Unsubscribe"](
                        groupUnsubscribe,
                    );
                }

                break;
            }
            case "pub.versia:reactions/Reaction": {
                const reaction = await this.validator.ReactionExtension(
                    this.body,
                );

                if (callbacks["pub.versia:reactions/Reaction"]) {
                    return await callbacks["pub.versia:reactions/Reaction"](
                        reaction,
                    );
                }

                break;
            }
            case "pub.versia:share/Share": {
                const share = await this.validator.ShareExtension(this.body);

                if (callbacks["pub.versia:share/Share"]) {
                    return await callbacks["pub.versia:share/Share"](share);
                }

                break;
            }
            case "pub.versia:polls/Vote": {
                const vote = await this.validator.PollVoteExtension(this.body);

                if (callbacks["pub.versia:polls/Vote"]) {
                    return await callbacks["pub.versia:polls/Vote"](vote);
                }

                break;
            }
            case "Unfollow": {
                const unfollow = await this.validator.Unfollow(this.body);

                if (callbacks.unfollow) {
                    return await callbacks.unfollow(unfollow);
                }

                break;
            }
            default: {
                if (callbacks.unknown) {
                    return await callbacks.unknown(this.body);
                }
            }
        }

        return undefined as ReturnType;
    }
}
