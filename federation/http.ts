import type {
    Delete,
    Dislike,
    Follow,
    FollowAccept,
    FollowReject,
    Group,
    InstanceMetadata,
    Like,
    Note,
    Reaction,
    Share,
    Unfollow,
    User,
    Vote,
} from "./schemas";
import type { EntityValidator } from "./validator";

type MaybePromise<T> = T | Promise<T>;

type ParserCallbacks<T> = {
    note: (note: Note) => MaybePromise<T>;
    follow: (follow: Follow) => MaybePromise<T>;
    followAccept: (followAccept: FollowAccept) => MaybePromise<T>;
    followReject: (followReject: FollowReject) => MaybePromise<T>;
    user: (user: User) => MaybePromise<T>;
    like: (like: Like) => MaybePromise<T>;
    dislike: (dislike: Dislike) => MaybePromise<T>;
    delete: (undo: Delete) => MaybePromise<T>;
    instanceMetadata: (instanceMetadata: InstanceMetadata) => MaybePromise<T>;
    group: (group: Group) => MaybePromise<T>;
    reaction: (reaction: Reaction) => MaybePromise<T>;
    share: (share: Share) => MaybePromise<T>;
    vote: (vote: Vote) => MaybePromise<T>;
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
            case "Like": {
                const like = await this.validator.Like(this.body);

                if (callbacks.like) {
                    return await callbacks.like(like);
                }

                break;
            }
            case "Dislike": {
                const dislike = await this.validator.Dislike(this.body);

                if (callbacks.dislike) {
                    return await callbacks.dislike(dislike);
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
            case "Group": {
                const group = await this.validator.Group(this.body);

                if (callbacks.group) {
                    return await callbacks.group(group);
                }

                break;
            }
            case "Reaction": {
                const reaction = await this.validator.Reaction(this.body);

                if (callbacks.reaction) {
                    return await callbacks.reaction(reaction);
                }

                break;
            }
            case "Share": {
                const share = await this.validator.Share(this.body);

                if (callbacks.share) {
                    return await callbacks.share(share);
                }

                break;
            }
            case "Vote": {
                const vote = await this.validator.Vote(this.body);

                if (callbacks.vote) {
                    return await callbacks.vote(vote);
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
