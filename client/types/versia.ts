export type VersiaRole = {
    id: string;
    name: string;
    permissions: RolePermission[];
    priority: number;
    description?: string;
    visible: boolean;
    icon?: string;
};

// Last updated: 2025-01-02
export enum RolePermission {
    ManageNotes = "notes",
    ManageOwnNotes = "owner:note",
    ViewNotes = "read:note",
    ViewNoteLikes = "read:note_likes",
    ViewNoteBoosts = "read:note_boosts",
    ManageAccounts = "accounts",
    ManageOwnAccount = "owner:account",
    ViewAccountFollows = "read:account_follows",
    ManageLikes = "likes",
    ManageOwnLikes = "owner:like",
    ManageBoosts = "boosts",
    ManageOwnBoosts = "owner:boost",
    ViewAccounts = "read:account",
    ManageEmojis = "emojis",
    ViewEmojis = "read:emoji",
    ManageOwnEmojis = "owner:emoji",
    ViewReactions = "read:reaction",
    ManageReactions = "reactions",
    ManageOwnReactions = "owner:reaction",
    ManageMedia = "media",
    ManageOwnMedia = "owner:media",
    ManageBlocks = "blocks",
    ManageOwnBlocks = "owner:block",
    ManageFilters = "filters",
    ManageOwnFilters = "owner:filter",
    ManageMutes = "mutes",
    ManageOwnMutes = "owner:mute",
    ManageReports = "reports",
    ManageOwnReports = "owner:report",
    ManageSettings = "settings",
    ManageOwnSettings = "owner:settings",
    ManageRoles = "roles",
    ManageNotifications = "notifications",
    ManageOwnNotifications = "owner:notification",
    ManageFollows = "follows",
    ManageOwnFollows = "owner:follow",
    ManageOwnApps = "owner:app",
    Search = "search",
    UsePushNotifications = "push_notifications",
    ViewPublicTimelines = "public_timelines",
    ViewPrivateTimelines = "private_timelines",
    IgnoreRateLimits = "ignore_rate_limits",
    Impersonate = "impersonate",
    ManageInstance = "instance",
    ManageInstanceFederation = "instance:federation",
    ManageInstanceSettings = "instance:settings",
    /** Users who do not have this permission will not be able to login! */
    OAuth = "oauth",
}
