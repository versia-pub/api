import type { Account } from "./account.ts";

export type Instance = {
    domain: string;
    title: string;
    version: string;
    versia_version: string;
    source_url: string;
    description: string;
    usage: {
        users: {
            active_month: number;
        };
    };
    thumbnail: {
        url: string | null;
    };
    banner: {
        url: string | null;
    };
    languages: string[];
    configuration: {
        urls: {
            streaming: string | null;
            status: string | null;
        };
        accounts: {
            max_featured_tags: number;
            max_note_characters: number;
            max_displayname_characters: number;
            avatar_size_limit: number;
            header_size_limit: number;
            max_fields_name_characters: number;
            max_fields_value_characters: number;
            max_fields: number;
            max_username_characters: number;
        };
        statuses: {
            max_characters: number;
            max_media_attachments: number;
            characters_reserved_per_url: number;
        };
        media_attachments: {
            supported_mime_types: string[];
            image_size_limit: number;
            image_matrix_limit: number;
            video_size_limit: number;
            video_frame_rate_limit: number;
            video_matrix_limit: number;
            max_description_characters: number;
        };
        emojis: {
            emoji_size_limit: number;
            max_emoji_shortcode_characters: number;
            max_emoji_description_characters: number;
        };
        polls: {
            max_characters_per_option: number;
            max_expiration: number;
            max_options: number;
            min_expiration: number;
        };
        translation: {
            enabled: boolean;
        };
    };
    registrations: {
        enabled: boolean;
        approval_required: boolean;
        message: string | null;
        url: string | null;
    };
    contact: {
        email: string | null;
        account: Account | null;
    };
    rules: {
        id: string;
        text: string;
        hint: string;
    }[];
    sso: {
        forced: boolean;
        providers: {
            name: string;
            icon: string;
            id: string;
        }[];
    };
};

export type InstanceRule = {
    id: string;
    text: string;
};

export type ExtendedDescription = {
    updated_at: string;
    content: string;
};
