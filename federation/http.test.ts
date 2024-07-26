import { beforeEach, describe, expect, jest, test } from "bun:test";
import { RequestParserHandler } from "./http.ts";
import { EntityValidator } from "./validator.ts";

// Pulled from social.lysand.org
const validUser = {
    id: "018eb863-753f-76ff-83d6-fd590de7740a",
    type: "User",
    uri: "https://social.lysand.org/users/018eb863-753f-76ff-83d6-fd590de7740a",
    bio: {
        "text/html": {
            content: "<p>Hey</p>\n",
        },
    },
    created_at: "2024-04-07T11:48:29.623Z",
    dislikes:
        "https://social.lysand.org/users/018eb863-753f-76ff-83d6-fd590de7740a/dislikes",
    featured:
        "https://social.lysand.org/users/018eb863-753f-76ff-83d6-fd590de7740a/featured",
    likes: "https://social.lysand.org/users/018eb863-753f-76ff-83d6-fd590de7740a/likes",
    followers:
        "https://social.lysand.org/users/018eb863-753f-76ff-83d6-fd590de7740a/followers",
    following:
        "https://social.lysand.org/users/018eb863-753f-76ff-83d6-fd590de7740a/following",
    inbox: "https://social.lysand.org/users/018eb863-753f-76ff-83d6-fd590de7740a/inbox",
    outbox: "https://social.lysand.org/users/018eb863-753f-76ff-83d6-fd590de7740a/outbox",
    indexable: false,
    username: "jessew",
    display_name: "Jesse Wierzbinski",
    fields: [
        {
            key: { "text/html": { content: "<p>Identity</p>\n" } },
            value: {
                "text/html": {
                    content:
                        '<p><a href="https://keyoxide.org/aspe:keyoxide.org:NKLLPWPV7P35NEU7JP4K4ID4CA">https://keyoxide.org/aspe:keyoxide.org:NKLLPWPV7P35NEU7JP4K4ID4CA</a></p>\n',
                },
            },
        },
    ],
    public_key: {
        actor: "https://social.lysand.org/users/018eb863-753f-76ff-83d6-fd590de7740a",
        public_key: "XXXXXXXX",
    },
    extensions: { "org.lysand:custom_emojis": { emojis: [] } },
};

describe("LysandRequestHandler", () => {
    let validator: EntityValidator;

    beforeEach(() => {
        validator = new EntityValidator();
    });

    test("parseBody with valid User", async () => {
        const handler = new RequestParserHandler(validUser, validator);

        const noteCallback = jest.fn();
        await handler.parseBody({ user: noteCallback });

        expect(noteCallback).toHaveBeenCalled();
    });

    test("Throw on invalid Note", async () => {
        const handler = new RequestParserHandler(
            {
                type: "Note",
                body: "bad",
            },
            validator,
        );

        const noteCallback = jest.fn();
        await expect(
            handler.parseBody({ note: noteCallback }),
        ).rejects.toThrow();
        expect(noteCallback).not.toHaveBeenCalled();
    });

    test("Throw on incorrect body type property", async () => {
        const handler = new RequestParserHandler(
            {
                type: "DoesntExist",
                body: "bad",
            },
            validator,
        );

        const noteCallback = jest.fn();
        await expect(
            handler.parseBody({ note: noteCallback }),
        ).rejects.toThrow();
        expect(noteCallback).not.toHaveBeenCalled();
    });
});
