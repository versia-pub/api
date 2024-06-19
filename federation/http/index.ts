import type {
    Dislike,
    Extension,
    Follow,
    FollowAccept,
    FollowReject,
    Like,
    Note,
    Patch,
    ServerMetadata,
    Undo,
    User,
} from "../schemas";
import type { EntityValidator } from "../validator/index";

type MaybePromise<T> = T | Promise<T>;

type ParserCallbacks<T> = {
    note: (note: Note) => MaybePromise<T>;
    follow: (follow: Follow) => MaybePromise<T>;
    followAccept: (followAccept: FollowAccept) => MaybePromise<T>;
    followReject: (followReject: FollowReject) => MaybePromise<T>;
    user: (user: User) => MaybePromise<T>;
    like: (like: Like) => MaybePromise<T>;
    dislike: (dislike: Dislike) => MaybePromise<T>;
    undo: (undo: Undo) => MaybePromise<T>;
    serverMetadata: (serverMetadata: ServerMetadata) => MaybePromise<T>;
    extension: (extension: Extension) => MaybePromise<T>;
    patch: (patch: Patch) => MaybePromise<T>;
};

/**
 * A class to parse the body of a request and call the appropriate callback.
 * @example
 * const parser = new RequestParserHandler(body, validator);
 *
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
            case "Patch": {
                const patch = await this.validator.Patch(this.body);

                if (callbacks.patch) {
                    return await callbacks.patch(patch);
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
            case "Undo": {
                const undo = await this.validator.Undo(this.body);

                if (callbacks.undo) {
                    return await callbacks.undo(undo);
                }

                break;
            }
            case "ServerMetadata": {
                const serverMetadata = await this.validator.ServerMetadata(
                    this.body,
                );

                if (callbacks.serverMetadata) {
                    return await callbacks.serverMetadata(serverMetadata);
                }

                break;
            }
            case "Extension": {
                const extension = await this.validator.Extension(this.body);

                if (callbacks.extension) {
                    return await callbacks.extension(extension);
                }

                break;
            }
            default:
                throw new Error(
                    `Invalid type field in body: ${this.body.type}`,
                );
        }

        throw new Error(`Invalid type field in body: ${this.body.type}`);
    }
}
