import { OAuth2Client } from "@badgateway/oauth2-client";
import type { Account } from "../types/account";
import type { Activity } from "../types/activity";
import type { Announcement } from "../types/announcement";
import type { Application, ApplicationData } from "../types/application";
import type { Attachment } from "../types/attachment";
import type { Context } from "../types/context";
import type { Conversation } from "../types/conversation";
import type { Emoji } from "../types/emoji";
import type { FeaturedTag } from "../types/featured_tag";
import type { List } from "../types/list";
import type { Marker } from "../types/marker";
import type { Notification } from "../types/notification";
import type { Poll } from "../types/poll";
import type { Preferences } from "../types/preferences";
import type { Relationship } from "../types/relationship";
import type { ScheduledStatus } from "../types/scheduled_status";
import type { Status } from "../types/status";
import type { Tag } from "../types/tag";
import type { Token } from "../types/token";
import { BaseClient, type Output } from "./base";
import { DEFAULT_SCOPE, NO_REDIRECT } from "./constants";

type StatusContentType =
    | "text/plain"
    | "text/markdown"
    | "text/html"
    | "text/x.misskeymarkdown";

interface InstanceV2Output {
    domain: string;
    title: string;
    version: string;
    lysand_version: string;
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
}

export class LysandClient extends BaseClient {
    public acceptFollowRequest(
        id: string,
        extra?: RequestInit,
    ): Promise<Output<Relationship>> {
        return this.post<Relationship>(
            `/api/v1/follow_requests/${id}/authorize`,
            undefined,
            extra,
        );
    }

    public addAccountToList(
        id: string,
        account_ids: string[],
        extra?: RequestInit,
    ): Promise<Output<void>> {
        return this.post<void>(
            `/api/v1/lists/${id}/accounts`,
            { account_ids },
            extra,
        );
    }

    public addReactionToAnnouncement(
        id: string,
        name: string,
        extra?: RequestInit,
    ): Promise<Output<void>> {
        return this.put<void>(
            `/api/v1/announcements/${id}/reactions/${name}`,
            undefined,
            extra,
        );
    }

    public blockAccount(
        id: string,
        extra?: RequestInit,
    ): Promise<Output<Relationship>> {
        return this.post<Relationship>(
            `/api/v1/accounts/${id}/block`,
            undefined,
            extra,
        );
    }

    public blockDomain(
        domain: string,
        extra?: RequestInit,
    ): Promise<Output<void>> {
        return this.post<void>("/api/v1/domain_blocks", { domain }, extra);
    }

    public bookmarkStatus(
        id: string,
        extra?: RequestInit,
    ): Promise<Output<Status>> {
        return this.post<Status>(
            `/api/v1/statuses/${id}/bookmark`,
            undefined,
            extra,
        );
    }

    public cancelScheduledStatus(
        id: string,
        extra?: RequestInit,
    ): Promise<Output<void>> {
        return this.delete<void>(
            `/api/v1/scheduled_statuses/${id}/cancel`,
            undefined,
            extra,
        );
    }

    public createApp(
        client_name: string,
        options?: Partial<{
            redirect_uris: string;
            scopes: string[];
            website?: string;
        }>,
    ): Promise<Output<Application>> {
        return this.postForm<ApplicationData>("/api/v1/apps", {
            client_name,
            ...options,
            scopes: options?.scopes?.join(" ") || DEFAULT_SCOPE.join(" "),
            redirect_uris: options?.redirect_uris || NO_REDIRECT,
        });
    }

    public createEmojiReaction(
        id: string,
        emoji: string,
        extra?: RequestInit,
    ): Promise<Output<Status>> {
        return this.post<Status>(
            `/api/v1/statuses/${id}/reactions/${emoji}`,
            undefined,
            extra,
        );
    }

    public createFeaturedTag(
        name: string,
        extra?: RequestInit,
    ): Promise<Output<FeaturedTag>> {
        return this.post<FeaturedTag>("/api/v1/featured_tags", { name }, extra);
    }

    public createList(
        title: string,
        extra?: RequestInit,
    ): Promise<Output<List>> {
        return this.post<List>("/api/v1/lists", { title }, extra);
    }

    public deleteAccountsFromList(
        id: string,
        account_ids: string[],
        extra?: RequestInit,
    ): Promise<Output<void>> {
        return this.delete<void>(
            `/api/v1/lists/${id}/accounts`,
            { account_ids },
            extra,
        );
    }

    public deleteConversation(
        id: string,
        extra?: RequestInit,
    ): Promise<Output<void>> {
        return this.delete<void>(
            `/api/v1/conversations/${id}`,
            undefined,
            extra,
        );
    }

    public deleteEmojiReaction(
        id: string,
        emoji: string,
        extra?: RequestInit,
    ): Promise<Output<Status>> {
        return this.delete<Status>(
            `/api/v1/statuses/${id}/reactions/${emoji}`,
            undefined,
            extra,
        );
    }

    public deleteFeaturedTag(
        id: string,
        extra?: RequestInit,
    ): Promise<Output<void>> {
        return this.delete<void>(
            `/api/v1/featured_tags/${id}`,
            undefined,
            extra,
        );
    }

    public deleteList(id: string, extra?: RequestInit): Promise<Output<void>> {
        return this.delete<void>(`/api/v1/lists/${id}`, undefined, extra);
    }

    public deletePushSubscription(extra?: RequestInit): Promise<Output<void>> {
        return this.delete<void>("/api/v1/push/subscription", undefined, extra);
    }

    public deleteStatus(
        id: string,
        extra?: RequestInit,
    ): Promise<Output<Status>> {
        return this.delete<Status>(`/api/v1/statuses/${id}`, undefined, extra);
    }

    // TODO: directStreaming

    public dismissInstanceAnnouncement(
        id: string,
        extra?: RequestInit,
    ): Promise<Output<void>> {
        return this.post<void>(
            `/api/v1/instance/announcements/${id}/dismiss`,
            undefined,
            extra,
        );
    }

    public dismissNotification(
        id: string,
        extra?: RequestInit,
    ): Promise<Output<void>> {
        return this.post<void>(
            `/api/v1/notifications/${id}/dismiss`,
            undefined,
            extra,
        );
    }

    public dismissNotifications(extra?: RequestInit): Promise<Output<void>> {
        return this.post<void>("/api/v1/notifications/clear", undefined, extra);
    }

    public editStatus(
        id: string,
        options: Partial<{
            status: string;
            content_type: StatusContentType;
            media_ids: string[];
            poll: Partial<{
                expires_in: number;
                hide_totals: boolean;
                multiple: boolean;
                options: string[];
            }>;
            sensitive: boolean;
            spoiler_text: string;
            language: string;
        }>,
        extra?: RequestInit,
    ): Promise<Output<Status>> {
        return this.put<Status>(
            `/api/v1/statuses/${id}`,
            { ...options },
            extra,
        );
    }

    public favouriteStatus(
        id: string,
        extra?: RequestInit,
    ): Promise<Output<Status>> {
        return this.post<Status>(
            `/api/v1/statuses/${id}/favourite`,
            undefined,
            extra,
        );
    }

    public fetchAccessToken(
        client_id: string,
        client_secret: string,
        code?: string,
        redirect_uri: string = NO_REDIRECT,
        extra?: RequestInit,
    ): Promise<Output<Token>> {
        return this.postForm<Token>(
            "/oauth/token",
            {
                client_id,
                client_secret,
                code,
                redirect_uri,
                grant_type: "authorization_code",
            },
            extra,
        );
    }

    public followAccount(
        id: string,
        extra?: RequestInit,
    ): Promise<Output<Relationship>> {
        return this.post<Relationship>(
            `/api/v1/accounts/${id}/follow`,
            undefined,
            extra,
        );
    }

    public followTag(id: string, extra?: RequestInit): Promise<Output<Tag>> {
        return this.post<Tag>(`/api/v1/tags/${id}/follow`, undefined, extra);
    }

    public generateAuthUrl(
        client_id: string,
        client_secret: string,
        options: Partial<{
            redirect_uri: string;
            scopes: string[];
        }>,
    ): Promise<string> {
        const oauthClient = new OAuth2Client({
            server: this.baseUrl.toString(),
            clientId: client_id,
            clientSecret: client_secret,
            tokenEndpoint: "/oauth/token",
            authorizationEndpoint: "/oauth/authorize",
        });

        return oauthClient.authorizationCode.getAuthorizeUri({
            redirectUri: options.redirect_uri || NO_REDIRECT,
            scope: options.scopes || DEFAULT_SCOPE,
        });
    }

    public getAccount(
        id: string,
        extra?: RequestInit,
    ): Promise<Output<Account>> {
        return this.get<Account>(`/api/v1/accounts/${id}`, extra);
    }

    public getAccountFollowers(
        id: string,
        options?: Partial<{
            max_id: string;
            since_id: string;
            limit: number;
        }>,
        extra?: RequestInit,
    ): Promise<Output<Account[]>> {
        const params = new URLSearchParams();

        if (options) {
            if (options.max_id) params.set("max_id", options.max_id);
            if (options.since_id) params.set("since_id", options.since_id);
            if (options.limit) params.set("limit", options.limit.toString());
        }

        return this.get<Account[]>(
            `/api/v1/accounts/${id}/followers?${params}`,
            extra,
        );
    }

    public getAccountFollowing(
        id: string,
        options?: Partial<{
            max_id: string;
            since_id: string;
            limit: number;
        }>,
        extra?: RequestInit,
    ): Promise<Output<Account[]>> {
        const params = new URLSearchParams();

        if (options) {
            if (options.max_id) params.set("max_id", options.max_id);
            if (options.since_id) params.set("since_id", options.since_id);
            if (options.limit) params.set("limit", options.limit.toString());
        }

        return this.get<Account[]>(
            `/api/v1/accounts/${id}/following?${params}`,
            extra,
        );
    }

    public getAccountLists(
        id: string,
        extra?: RequestInit,
    ): Promise<Output<List[]>> {
        return this.get<List[]>(`/api/v1/accounts/${id}/lists`, extra);
    }

    public getAccountStatuses(
        id: string,
        options?: Partial<{
            max_id: string;
            min_id: string;
            since_id: string;
            limit: number;
            only_media: boolean;
            pinned: boolean;
            exclude_replies: boolean;
            exclude_reblogs: boolean;
        }>,
        extra?: RequestInit,
    ): Promise<Output<Status[]>> {
        const params = new URLSearchParams();

        if (options) {
            if (options.max_id) params.set("max_id", options.max_id);
            if (options.min_id) params.set("min_id", options.min_id);
            if (options.since_id) params.set("since_id", options.since_id);
            if (options.limit) params.set("limit", options.limit.toString());
            if (options.only_media) params.set("only_media", "true");
            if (options.pinned) params.set("pinned", "true");
            if (options.exclude_replies) params.set("exclude_replies", "true");
            if (options.exclude_reblogs) params.set("exclude_reblogs", "true");
        }

        return this.get<Status[]>(
            `/api/v1/accounts/${id}/statuses?${params}`,
            extra,
        );
    }

    public getAccountsInList(
        id: string,
        options: Partial<{
            max_id: string;
            since_id: string;
            limit: number;
        }>,
        extra?: RequestInit,
    ): Promise<Output<Account[]>> {
        const params = new URLSearchParams();

        if (options) {
            if (options.max_id) params.set("max_id", options.max_id);
            if (options.since_id) params.set("since_id", options.since_id);
            if (options.limit) params.set("limit", options.limit.toString());
        }

        return this.get<Account[]>(
            `/api/v1/lists/${id}/accounts?${params}`,
            extra,
        );
    }

    public getBlocks(
        options?: Partial<{
            max_id: string;
            since_id: string;
            limit: number;
        }>,
    ): Promise<Output<Account[]>> {
        const params = new URLSearchParams();

        if (options) {
            if (options.max_id) params.set("max_id", options.max_id);
            if (options.since_id) params.set("since_id", options.since_id);
            if (options.limit) params.set("limit", options.limit.toString());
        }

        return this.get<Account[]>(`/api/v1/blocks?${params}`);
    }

    public getBookmarks(
        options?: Partial<{
            max_id: string;
            min_id: string;
            since_id: string;
            limit: number;
        }>,
    ): Promise<Output<Status[]>> {
        const params = new URLSearchParams();

        if (options) {
            if (options.max_id) params.set("max_id", options.max_id);
            if (options.min_id) params.set("min_id", options.min_id);
            if (options.since_id) params.set("since_id", options.since_id);
            if (options.limit) params.set("limit", options.limit.toString());
        }

        return this.get<Status[]>(`/api/v1/bookmarks?${params}`);
    }

    public getConversationTimeline(
        id: string,
        options?: Partial<{
            max_id: string;
            min_id: string;
            since_id: string;
            limit: number;
        }>,
        extra?: RequestInit,
    ): Promise<Output<Conversation[]>> {
        const params = new URLSearchParams();

        if (options) {
            if (options.max_id) params.set("max_id", options.max_id);
            if (options.min_id) params.set("min_id", options.min_id);
            if (options.since_id) params.set("since_id", options.since_id);
            if (options.limit) params.set("limit", options.limit.toString());
        }

        return this.get<Conversation[]>(
            `/api/v1/conversations/${id}/timeline?${params}`,
            extra,
        );
    }

    public getDomainBlocks(
        options?: Partial<{
            max_id: string;
            since_id: string;
            limit: number;
        }>,
    ): Promise<Output<string[]>> {
        const params = new URLSearchParams();

        if (options) {
            if (options.max_id) params.set("max_id", options.max_id);
            if (options.since_id) params.set("since_id", options.since_id);
            if (options.limit) params.set("limit", options.limit.toString());
        }

        return this.get<string[]>(`/api/v1/domain_blocks?${params}`);
    }

    public getEndorsements(
        options?: Partial<{
            max_id: string;
            since_id: string;
            limit: number;
        }>,
        extra?: RequestInit,
    ): Promise<Output<Account[]>> {
        const params = new URLSearchParams();

        if (options) {
            if (options.max_id) params.set("max_id", options.max_id);
            if (options.since_id) params.set("since_id", options.since_id);
            if (options.limit) params.set("limit", options.limit.toString());
        }

        return this.get<Account[]>(`/api/v1/endorsements?${params}`, extra);
    }

    public getFavourites(
        options?: Partial<{
            max_id: string;
            min_id: string;
            limit: number;
        }>,
    ): Promise<Output<Status[]>> {
        const params = new URLSearchParams();

        if (options) {
            if (options.max_id) params.set("max_id", options.max_id);
            if (options.min_id) params.set("min_id", options.min_id);
            if (options.limit) params.set("limit", options.limit.toString());
        }

        return this.get<Status[]>(`/api/v1/favourites?${params}`);
    }

    public getFeaturedTags(
        extra?: RequestInit,
    ): Promise<Output<FeaturedTag[]>> {
        return this.get<FeaturedTag[]>("/api/v1/featured_tags", extra);
    }

    // TODO: getFilter
    // TODO: getFilters

    public getFollowRequests(
        options?: Partial<{
            limit: number;
        }>,
    ): Promise<Output<Account[]>> {
        const params = new URLSearchParams();

        if (options) {
            if (options.limit) params.set("limit", options.limit.toString());
        }

        return this.get<Account[]>(`/api/v1/follow_requests?${params}`);
    }

    public getFollowedTags(extra?: RequestInit): Promise<Output<Tag[]>> {
        return this.get<Tag[]>("/api/v1/followed_tags", extra);
    }

    public getHomeTimeline(
        options?: Partial<{
            max_id: string;
            min_id: string;
            since_id: string;
            limit: number;
            local: boolean;
        }>,
        extra?: RequestInit,
    ): Promise<Output<Status[]>> {
        const params = new URLSearchParams();

        if (options) {
            if (options.max_id) params.set("max_id", options.max_id);
            if (options.min_id) params.set("min_id", options.min_id);
            if (options.since_id) params.set("since_id", options.since_id);
            if (options.limit) params.set("limit", options.limit.toString());
            if (options.local) params.set("local", "true");
        }

        return this.get<Status[]>(`/api/v1/timelines/home?${params}`, extra);
    }

    public getInstance(extra?: RequestInit): Promise<Output<InstanceV2Output>> {
        return this.get<InstanceV2Output>("/api/v2/instance", extra);
    }

    public getInstanceActivity(
        extra?: RequestInit,
    ): Promise<Output<Activity[]>> {
        return this.get<Activity[]>("/api/v1/instance/activity", extra);
    }

    public getInstanceAnnouncements(
        extra?: RequestInit,
    ): Promise<Output<Announcement[]>> {
        return this.get<Announcement[]>(
            "/api/v1/instance/announcements",
            extra,
        );
    }

    public getInstanceCustomEmojis(
        extra?: RequestInit,
    ): Promise<Output<Emoji[]>> {
        return this.get<Emoji[]>("/api/v1/custom_emojis", extra);
    }

    public getInstanceDirectory(
        options?: Partial<{
            limit: number;
            local: boolean;
            offset: number;
            order: "active" | "new";
        }>,
        extra?: RequestInit,
    ): Promise<Output<Account[]>> {
        const params = new URLSearchParams();

        if (options) {
            if (options.limit) params.set("limit", options.limit.toString());
            if (options.local) params.set("local", "true");
            if (options.offset) params.set("offset", options.offset.toString());
            if (options.order) params.set("order", options.order);
        }

        return this.get<Account[]>(`/api/v1/directory?${params}`, extra);
    }

    public getInstancePeers(extra?: RequestInit): Promise<Output<string[]>> {
        return this.get<string[]>("/api/v1/instance/peers", extra);
    }

    public getInstanceTrends(
        options?: Partial<{ limit: number }>,
    ): Promise<Output<Tag[]>> {
        const params = new URLSearchParams();

        if (options) {
            if (options.limit) params.set("limit", options.limit.toString());
        }

        return this.get<Tag[]>(`/api/v1/trends?${params}`);
    }

    public getList(id: string, extra?: RequestInit): Promise<Output<List>> {
        return this.get<List>(`/api/v1/lists/${id}`, extra);
    }

    /**
     * GET /api/v1/timelines/list/:id
     *
     * @param id Local ID of the list in the database.
     * @param options.limit Max number of results to return. Defaults to 20.
     * @param options.max_id Return results older than ID.
     * @param options.since_id Return results newer than ID.
     * @param options.min_id Return results immediately newer than ID.
     * @return Array of statuses.
     */
    public getListTimeline(
        id: string,
        options?: Partial<{
            max_id: string;
            min_id: string;
            since_id: string;
            limit: number;
        }>,
        extra?: RequestInit,
    ): Promise<Output<Status[]>> {
        const params = new URLSearchParams();

        if (options) {
            if (options.max_id) params.set("max_id", options.max_id);
            if (options.min_id) params.set("min_id", options.min_id);
            if (options.since_id) params.set("since_id", options.since_id);
            if (options.limit) params.set("limit", options.limit.toString());
        }

        return this.get<Status[]>(
            `/api/v1/timelines/list/${id}?${params}`,
            extra,
        );
    }

    /**
     * GET /api/v1/lists
     *
     * @return Array of lists.
     */
    public getLists(extra?: RequestInit): Promise<Output<List[]>> {
        return this.get<List[]>("/api/v1/lists", extra);
    }

    /**
     * GET /api/v1/timelines/public
     *
     * @param options.only_media Show only statuses with media attached? Defaults to false.
     * @param options.limit Max number of results to return. Defaults to 20.
     * @param options.max_id Return results older than ID.
     * @param options.since_id Return results newer than ID.
     * @param options.min_id Return results immediately newer than ID.
     * @param options.only_media Show only statuses with media attached? Defaults to false.
     * @return Array of statuses.
     */
    public getLocalTimeline(
        options?: Partial<{
            max_id: string;
            min_id: string;
            since_id: string;
            limit: number;
            only_media: boolean;
        }>,
        extra?: RequestInit,
    ): Promise<Output<Status[]>> {
        const params = new URLSearchParams();

        if (options) {
            if (options.max_id) params.set("max_id", options.max_id);
            if (options.min_id) params.set("min_id", options.min_id);
            if (options.since_id) params.set("since_id", options.since_id);
            if (options.limit) params.set("limit", options.limit.toString());
            if (options.only_media) params.set("only_media", "true");
        }

        return this.get<Status[]>(`/api/v1/timelines/public?${params}`, extra);
    }

    /**
     * GET /api/v1/markers
     *
     * @param timelines Array of timeline names, String enum anyOf home, notifications.
     * @return Marker or empty object.
     */
    public getMarkers(
        timelines: ("home" | "notifications")[],
    ): Promise<Output<Marker | Record<never, never>>> {
        const params = new URLSearchParams();

        for (const timeline of timelines) {
            params.append("timelines[]", timeline);
        }

        return this.get<Marker | Record<never, never>>(
            `/api/v1/markers?${params}`,
        );
    }

    /**
     * GET /api/v1/media/:id
     *
     * @param id Target media ID.
     * @return Attachment
     */
    public getMedia(
        id: string,
        extra?: RequestInit,
    ): Promise<Output<Attachment>> {
        return this.get<Attachment>(`/api/v1/media/${id}`, extra);
    }

    /**
     * GET /api/v1/mutes
     *
     * @param options.limit Max number of results to return. Defaults to 40.
     * @param options.max_id Return results older than ID.
     * @param options.min_id Return results immediately newer than ID.
     * @return Array of accounts.
     */
    public getMutes(
        options?: Partial<{
            max_id: string;
            since_id: string;
            limit: number;
        }>,
    ): Promise<Output<Account[]>> {
        const params = new URLSearchParams();

        if (options) {
            if (options.max_id) params.set("max_id", options.max_id);
            if (options.since_id) params.set("since_id", options.since_id);
            if (options.limit) params.set("limit", options.limit.toString());
        }

        return this.get<Account[]>(`/api/v1/mutes?${params}`);
    }

    /**
     * GET /api/v1/notifications/:id
     *
     * @param id Target notification ID.
     * @return Notification.
     */
    public getNotification(
        id: string,
        extra?: RequestInit,
    ): Promise<Output<Notification>> {
        return this.get<Notification>(`/api/v1/notifications/${id}`, extra);
    }

    /**
     * GET /api/v1/notifications
     *
     * @param options.limit Max number of results to return. Defaults to 20.
     * @param options.max_id Return results older than ID.
     * @param options.since_id Return results newer than ID.
     * @param options.min_id Return results immediately newer than ID.
     * @param options.exclude_types Array of types to exclude.
     * @param options.account_id Return only notifications received from this account.
     * @return Array of notifications.
     */
    public getNotifications(
        options?: Partial<{
            max_id: string;
            min_id: string;
            since_id: string;
            limit: number;
            exclude_types: string[];
            account_id: string;
        }>,
    ): Promise<Output<Notification[]>> {
        const params = new URLSearchParams();

        if (options) {
            if (options.max_id) params.set("max_id", options.max_id);
            if (options.min_id) params.set("min_id", options.min_id);
            if (options.since_id) params.set("since_id", options.since_id);
            if (options.limit) params.set("limit", options.limit.toString());
            if (options.exclude_types) {
                for (const type of options.exclude_types) {
                    params.append("exclude_types[]", type);
                }
            }
            if (options.account_id)
                params.set("account_id", options.account_id);
        }

        return this.get<Notification[]>(`/api/v1/notifications?${params}`);
    }

    /**
     * GET /api/v1/polls/:id
     *
     * @param id Target poll ID.
     * @return Poll.
     */
    public getPoll(id: string, extra?: RequestInit): Promise<Output<Poll>> {
        return this.get<Poll>(`/api/v1/polls/${id}`, extra);
    }

    /**
     * GET /api/v1/preferences
     *
     * @return Preferences.
     */
    public getPreferences(extra?: RequestInit): Promise<Output<Preferences>> {
        return this.get<Preferences>("/api/v1/preferences", extra);
    }

    /**
     * GET /api/v1/timelines/public
     *
     * @param options.only_media Show only statuses with media attached? Defaults to false.
     * @param options.limit Max number of results to return. Defaults to 20.
     * @param options.max_id Return results older than ID.
     * @param options.since_id Return results newer than ID.
     * @param options.min_id Return results immediately newer than ID.
     * @return Array of statuses.
     */
    public getPublicTimeline(
        options?: Partial<{
            max_id: string;
            min_id: string;
            since_id: string;
            limit: number;
            only_media: boolean;
        }>,
        extra?: RequestInit,
    ): Promise<Output<Status[]>> {
        const params = new URLSearchParams();

        if (options) {
            if (options.max_id) params.set("max_id", options.max_id);
            if (options.min_id) params.set("min_id", options.min_id);
            if (options.since_id) params.set("since_id", options.since_id);
            if (options.limit) params.set("limit", options.limit.toString());
            if (options.only_media) params.set("only_media", "true");
        }

        return this.get<Status[]>(`/api/v1/timelines/public?${params}`, extra);
    }

    /**
     * GET /api/v1/push/subscription
     *
     * @return PushSubscription.
     */
    public getPushSubscription(
        extra?: RequestInit,
    ): Promise<Output<PushSubscription>> {
        return this.get<PushSubscription>("/api/v1/push/subscription", extra);
    }

    /**
     * GET /api/v1/accounts/relationships
     *
     * @param id The account ID.
     * @param options.with_suspended Include relationships with suspended accounts? Defaults to false.
     * @return Relationship
     */
    public getRelationship(
        id: string,
        options?: Partial<{
            with_suspended: boolean;
        }>,
        extra?: RequestInit,
    ): Promise<Output<Relationship>> {
        return this.getRelationships([id], options, extra).then((r) => ({
            data: r.data[0],
            headers: r.headers,
        }));
    }

    /**
     * GET /api/v1/accounts/relationships
     *
     * @param ids Array of account IDs.
     * @param options.with_suspended Include relationships with suspended accounts? Defaults to false.
     * @return Array of Relationship.
     */
    public getRelationships(
        ids: string[],
        options?: Partial<{
            with_suspended: boolean;
        }>,
        extra?: RequestInit,
    ): Promise<Output<Relationship[]>> {
        const params = new URLSearchParams();

        for (const id of ids) {
            params.append("id[]", id);
        }

        if (options) {
            if (options.with_suspended) params.set("with_suspended", "true");
        }

        return this.get<Relationship[]>(
            `/api/v1/accounts/relationships?${params}`,
            extra,
        );
    }

    /**
     * GET /api/v1/scheduled_statuses/:id
     *
     * @param id Target status ID.
     * @return ScheduledStatus.
     */
    public getScheduledStatus(
        id: string,
        extra?: RequestInit,
    ): Promise<Output<ScheduledStatus>> {
        return this.get<ScheduledStatus>(
            `/api/v1/scheduled_statuses/${id}`,
            extra,
        );
    }

    /**
     * GET /api/v1/scheduled_statuses
     *
     * @param options.limit Max number of results to return. Defaults to 20.
     * @param options.max_id Return results older than ID.
     * @param options.since_id Return results newer than ID.
     * @param options.min_id Return results immediately newer than ID.
     * @return Array of scheduled statuses.
     */
    public getScheduledStatuses(
        options?: Partial<{
            max_id: string;
            min_id: string;
            since_id: string;
            limit: number;
        }>,
        extra?: RequestInit,
    ): Promise<Output<ScheduledStatus[]>> {
        const params = new URLSearchParams();

        if (options) {
            if (options.max_id) params.set("max_id", options.max_id);
            if (options.min_id) params.set("min_id", options.min_id);
            if (options.since_id) params.set("since_id", options.since_id);
            if (options.limit) params.set("limit", options.limit.toString());
        }

        return this.get<ScheduledStatus[]>(
            `/api/v1/scheduled_statuses?${params}`,
            extra,
        );
    }

    public getStatus(id: string, extra?: RequestInit): Promise<Output<Status>> {
        return this.get<Status>(`/api/v1/statuses/${id}`, extra);
    }

    public getStatusContext(
        id: string,
        options?: Partial<{
            limit: number;
            max_id: string;
            since_id: string;
        }>,
        extra?: RequestInit,
    ): Promise<Output<Context>> {
        const params = new URLSearchParams();

        if (options) {
            if (options.limit) params.set("limit", options.limit.toString());
            if (options.max_id) params.set("max_id", options.max_id);
            if (options.since_id) params.set("since_id", options.since_id);
        }

        return this.get<Context>(
            `/api/v1/statuses/${id}/context?${params}`,
            extra,
        );
    }
}
