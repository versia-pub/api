/**
 * Regular expressions for matching various strings.
 * @module federation/schemas/regex
 * @see module:federation/schemas/base
 */

import {
    caseInsensitive,
    charIn,
    createRegExp,
    digit,
    exactly,
    global,
    letter,
    oneOrMore,
} from "magic-regexp";

/**
 * Regular expression for matching emojis.
 */
export const emojiRegex = createRegExp(
    // A-Z a-z 0-9 _ -
    oneOrMore(letter.or(digit).or(exactly("_")).or(exactly("-"))),
    [caseInsensitive, global],
);

/**
 * Regular expression for matching an extension_type
 * @example org.lysand:custom_emojis/Emoji
 */
export const extensionTypeRegex = createRegExp(
    // org namespace, then colon, then alphanumeric/_/-, then extension name
    exactly(
        oneOrMore(exactly(letter.lowercase.or(digit).or(charIn("_-.")))),
        exactly(":"),
        oneOrMore(exactly(letter.lowercase.or(digit).or(charIn("_-")))),
        exactly("/"),
        oneOrMore(exactly(letter.or(digit).or(charIn("_-")))),
    ),
);
