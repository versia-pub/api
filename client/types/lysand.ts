export type LysandRole = {
    id: string;
    name: string;
    permissions: LysandRolePermissions[];
    priority: number;
    description: string | null;
    visible: boolean;
    icon: string | null;
};

// Last updated: 2024-06-07
export enum LysandRolePermissions {
    MANAGE_NOTES = "notes",
    MANAGE_OWN_NOTES = "owner:note",
    VIEW_NOTES = "read:note",
    VIEW_NOTE_LIKES = "read:note_likes",
    VIEW_NOTE_BOOSTS = "read:note_boosts",
    MANAGE_ACCOUNTS = "accounts",
    MANAGE_OWN_ACCOUNT = "owner:account",
    VIEW_ACCOUNT_FOLLOWS = "read:account_follows",
    MANAGE_LIKES = "likes",
    MANAGE_OWN_LIKES = "owner:like",
    MANAGE_BOOSTS = "boosts",
    MANAGE_OWN_BOOSTS = "owner:boost",
    VIEW_ACCOUNTS = "read:account",
    MANAGE_EMOJIS = "emojis",
    VIEW_EMOJIS = "read:emoji",
    MANAGE_OWN_EMOJIS = "owner:emoji",
    MANAGE_MEDIA = "media",
    MANAGE_OWN_MEDIA = "owner:media",
    MANAGE_BLOCKS = "blocks",
    MANAGE_OWN_BLOCKS = "owner:block",
    MANAGE_FILTERS = "filters",
    MANAGE_OWN_FILTERS = "owner:filter",
    MANAGE_MUTES = "mutes",
    MANAGE_OWN_MUTES = "owner:mute",
    MANAGE_REPORTS = "reports",
    MANAGE_OWN_REPORTS = "owner:report",
    MANAGE_SETTINGS = "settings",
    MANAGE_OWN_SETTINGS = "owner:settings",
    MANAGE_ROLES = "roles",
    MANAGE_NOTIFICATIONS = "notifications",
    MANAGE_OWN_NOTIFICATIONS = "owner:notification",
    MANAGE_FOLLOWS = "follows",
    MANAGE_OWN_FOLLOWS = "owner:follow",
    MANAGE_OWN_APPS = "owner:app",
    SEARCH = "search",
    VIEW_PUBLIC_TIMELINES = "public_timelines",
    VIEW_PRIVATE_TIMELINES = "private_timelines",
    IGNORE_RATE_LIMITS = "ignore_rate_limits",
    IMPERSONATE = "impersonate",
    MANAGE_INSTANCE = "instance",
    MANAGE_INSTANCE_FEDERATION = "instance:federation",
    MANAGE_INSTANCE_SETTINGS = "instance:settings",
    OAUTH = "oauth",
}
