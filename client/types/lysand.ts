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
    ViewPublicTimelines = "public_timelines",
    ViewPrimateTimelines = "private_timelines",
    IgnoreRateLimits = "ignore_rate_limits",
    Impersonate = "impersonate",
    ManageInstance = "instance",
    ManageInstanceFederation = "instance:federation",
    ManageInstanceSettings = "instance:settings",
    /** Users who do not have this permission will not be able to login! */
    OAuth = "oauth",
}
