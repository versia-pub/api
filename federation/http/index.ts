import type { EntityValidator } from "../validator/index";

type MaybePromise<T> = T | Promise<T>;

type ParserCallbacks<T> = {
    note: (note: typeof EntityValidator.$Note) => MaybePromise<T>;
    follow: (follow: typeof EntityValidator.$Follow) => MaybePromise<T>;
    followAccept: (
        followAccept: typeof EntityValidator.$FollowAccept,
    ) => MaybePromise<T>;
    followReject: (
        followReject: typeof EntityValidator.$FollowReject,
    ) => MaybePromise<T>;
    user: (user: typeof EntityValidator.$User) => MaybePromise<T>;
    like: (like: typeof EntityValidator.$Like) => MaybePromise<T>;
    dislike: (dislike: typeof EntityValidator.$Dislike) => MaybePromise<T>;
    undo: (undo: typeof EntityValidator.$Undo) => MaybePromise<T>;
    serverMetadata: (
        serverMetadata: typeof EntityValidator.$ServerMetadata,
    ) => MaybePromise<T>;
    extension: (
        extension: typeof EntityValidator.$Extension,
    ) => MaybePromise<T>;
};

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
     * @param callbacks The callbacks to call when a specific entity is found.
     * @returns A promise that resolves when the body has been parsed, and the callbacks have finished executing.
     */
    public async parseBody<ReturnType = void>(
        callbacks: Partial<ParserCallbacks<ReturnType>>,
    ): Promise<ReturnType> {
        if (!this.body.type) throw new Error("Missing type field in body");

        switch (this.body.type) {
            case "Note": {
                const note = await this.validator.Note(this.body);

                if (callbacks.note) return await callbacks.note(note);

                break;
            }
            case "Follow": {
                const follow = await this.validator.Follow(this.body);

                if (callbacks.follow) return await callbacks.follow(follow);

                break;
            }
            case "FollowAccept": {
                const followAccept = await this.validator.FollowAccept(
                    this.body,
                );

                if (callbacks.followAccept)
                    return await callbacks.followAccept(followAccept);

                break;
            }
            case "FollowReject": {
                const followReject = await this.validator.FollowReject(
                    this.body,
                );

                if (callbacks.followReject)
                    return await callbacks.followReject(followReject);

                break;
            }
            case "User": {
                const user = await this.validator.User(this.body);

                if (callbacks.user) return await callbacks.user(user);

                break;
            }
            case "Like": {
                const like = await this.validator.Like(this.body);

                if (callbacks.like) return await callbacks.like(like);

                break;
            }
            case "Dislike": {
                const dislike = await this.validator.Dislike(this.body);

                if (callbacks.dislike) return await callbacks.dislike(dislike);

                break;
            }
            case "Undo": {
                const undo = await this.validator.Undo(this.body);

                if (callbacks.undo) return await callbacks.undo(undo);

                break;
            }
            case "ServerMetadata": {
                const serverMetadata = await this.validator.ServerMetadata(
                    this.body,
                );

                if (callbacks.serverMetadata)
                    return await callbacks.serverMetadata(serverMetadata);

                break;
            }
            case "Extension": {
                const extension = await this.validator.Extension(this.body);

                if (callbacks.extension)
                    return await callbacks.extension(extension);

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
