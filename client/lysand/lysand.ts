import { OAuth2Client } from "@badgateway/oauth2-client";
import type { Account } from "../types/account";
import type { Activity } from "../types/activity";
import type { Announcement } from "../types/announcement";
import type { Application, ApplicationData } from "../types/application";
import type { AsyncAttachment } from "../types/async_attachment";
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
import type { PushSubscription } from "../types/push_subscription";
import type { Relationship } from "../types/relationship";
import type { Category, Report } from "../types/report";
import type { Results } from "../types/results";
import type { ScheduledStatus } from "../types/scheduled_status";
import type { Status, StatusVisibility } from "../types/status";
import type { StatusSource } from "../types/status_source";
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
        options?: Partial<{
            reblogs: boolean;
            notify: boolean;
            languages: string[];
        }>,
        extra?: RequestInit,
    ): Promise<Output<Relationship>> {
        return this.post<Relationship>(
            `/api/v1/accounts/${id}/follow`,
            { ...options },
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

    /**
     * GET /api/v1/statuses/:id
     *
     * @param id The target status id.
     * @return Status
     */
    public getStatus(id: string, extra?: RequestInit): Promise<Output<Status>> {
        return this.get<Status>(`/api/v1/statuses/${id}`, extra);
    }

    /**
     * GET /api/v1/statuses/:id/context
     *
     * Get parent and child statuses.
     * @param id The target status id.
     * @param options.limit Max number of results to return. Defaults to 20.
     * @param options.max_id Return results older than ID.
     * @param options.since_id Return results newer than ID.
     * @return Context
     */
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

    /**
     * GET /api/v1/statuses/:id/favourited_by
     *
     * @param id The target status id.
     * @param options.limit Max number of results to return. Defaults to 40.
     * @param options.max_id Return results older than ID.
     * @param options.since_id Return results newer than ID.
     * @return Array of accounts.
     */
    public getStatusFavouritedBy(
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
            `/api/v1/statuses/${id}/favourited_by?${params}`,
            extra,
        );
    }

    /**
     * GET /api/v1/statuses/:id/reblogged_by
     *
     * @param id The target status id.
     * @param options.limit Max number of results to return. Defaults to 40.
     * @param options.max_id Return results older than ID.
     * @param options.since_id Return results newer than ID.
     * @return Array of accounts.
     */
    public getStatusRebloggedBy(
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
            `/api/v1/statuses/${id}/reblogged_by?${params}`,
            extra,
        );
    }

    /**
     * GET /api/v1/statuses/:id/source
     *
     * Obtain the source properties for a status so that it can be edited.
     * @param id The target status id.
     * @return StatusSource
     */
    public getStatusSource(
        id: string,
        extra?: RequestInit,
    ): Promise<Output<StatusSource>> {
        return this.get<StatusSource>(`/api/v1/statuses/${id}/source`, extra);
    }

    /**
     * GET /api/v1/featured_tags/suggestions
     *
     * @return Array of tag.
     */
    public getSuggestedTags(extra?: RequestInit): Promise<Output<Tag[]>> {
        return this.get<Tag[]>("/api/v1/featured_tags/suggestions", extra);
    }

    public getSuggestions(
        options?: Partial<{ limit: number }>,
    ): Promise<Output<Account[]>> {
        const params = new URLSearchParams();

        if (options) {
            if (options.limit) params.set("limit", options.limit.toString());
        }

        return this.get<Account[]>(`/api/v1/suggestions?${params}`);
    }

    public getTag(id: string, extra?: RequestInit): Promise<Output<Tag>> {
        return this.get<Tag>(`/api/v1/tags/${id}`, extra);
    }

    /**
     * GET /api/v1/timelines/tag/:hashtag
     *
     * @param hashtag Content of a #hashtag, not including # symbol.
     * @param options.local Show only local statuses? Defaults to false.
     * @param options.only_media Show only statuses with media attached? Defaults to false.
     * @param options.limit Max number of results to return. Defaults to 20.
     * @param options.max_id Return results older than ID.
     * @param options.since_id Return results newer than ID.
     * @param options.min_id Return results immediately newer than ID.
     * @return Array of statuses.
     */
    public getTagTimeline(
        id: string,
        options?: Partial<{
            max_id: string;
            min_id: string;
            since_id: string;
            limit: number;
            local: boolean;
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
            if (options.local) params.set("local", "true");
            if (options.only_media) params.set("only_media", "true");
        }

        return this.get<Status[]>(
            `/api/v1/timelines/tag/${id}?${params}`,
            extra,
        );
    }

    // TODO: listStreaming
    // TODO: localStreaming

    /**
     * GET /api/v1/accounts/lookup
     *
     * @param acct The username or Webfinger address to lookup.
     * @return Account.
     */
    public lookupAccount(
        acct: string,
        extra?: RequestInit,
    ): Promise<Output<Account>> {
        const params = new URLSearchParams();

        params.set("q", acct);

        return this.get<Account>(`/api/v1/accounts/search?${params}`, extra);
    }

    /**
     * POST /api/v1/accounts/:id/mute
     *
     * @param id The account ID.
     * @param options.notifications Mute notifications in addition to statuses.
     * @param options.duration Duration of mute in seconds. Defaults to indefinite.
     * @return Relationship
     */
    public muteAccount(
        id: string,
        options?: Partial<{ notifications: boolean; duration: number }>,
        extra?: RequestInit,
    ): Promise<Output<Relationship>> {
        return this.post<Relationship>(
            `/api/v1/accounts/${id}/mute`,
            { ...options },
            extra,
        );
    }

    /**
     * POST /api/v1/statuses/:id/mute
     *
     * @param id The target status id.
     * @return Status
     */
    public muteStatus(
        id: string,
        extra?: RequestInit,
    ): Promise<Output<Status>> {
        return this.post<Status>(
            `/api/v1/statuses/${id}/mute`,
            undefined,
            extra,
        );
    }

    /**
     * POST /api/v1/accounts/:id/pin
     *
     * @param id The account ID.
     * @return Relationship
     */
    public pinAccount(
        id: string,
        extra?: RequestInit,
    ): Promise<Output<Relationship>> {
        return this.post<Relationship>(
            `/api/v1/accounts/${id}/pin`,
            undefined,
            extra,
        );
    }

    /**
     * POST /api/v1/statuses/:id/pin
     * @param id The target status id.
     * @return Status
     */
    public pinStatus(id: string, extra?: RequestInit): Promise<Output<Status>> {
        return this.post<Status>(
            `/api/v1/statuses/${id}/pin`,
            undefined,
            extra,
        );
    }

    /**
     * POST /api/v1/statuses
     *
     * @param status Text content of status.
     * @param options.media_ids Array of Attachment ids.
     * @param options.poll Poll object.
     * @param options.in_reply_to_id ID of the status being replied to, if status is a reply.
     * @param options.quote_id ID of the status being quoted to, if status is a quote.
     * @param options.sensitive Mark status and attached media as sensitive?
     * @param options.spoiler_text Text to be shown as a warning or subject before the actual content.
     * @param options.visibility Visibility of the posted status.
     * @param options.content_type Content type of the status (MIME format).
     * @param options.language ISO 639 language code for this status.
     * @param options.scheduled_at ISO 8601 Datetime at which to schedule a status.
     * @param options.local_only Post status to local timeline only?
     * @return Status. When options.scheduled_at is present, ScheduledStatus is returned instead.
     */
    public postStatus(
        status: string,
        options: {
            in_reply_to_id?: string;
            quote_id?: string;
            media_ids?: string[];
            sensitive?: boolean;
            spoiler_text?: string;
            visibility?: StatusVisibility;
            content_type?: StatusContentType;
            scheduled_at?: string;
            language?: string;
            local_only?: boolean;
            poll?: {
                expires_in?: number;
                hide_totals?: boolean;
                multiple?: boolean;
                options: string[];
            };
        },
        extra?: RequestInit,
    ): Promise<Output<Status | ScheduledStatus>> {
        return this.post<Status | ScheduledStatus>(
            "/api/v1/statuses",
            { status, ...options },
            extra,
        );
    }

    // TODO: publicStreaming

    public readConversation(
        id: string,
        extra?: RequestInit,
    ): Promise<Output<Conversation>> {
        return this.post<Conversation>(
            `/api/v1/conversations/${id}/read`,
            undefined,
            extra,
        );
    }

    /**
     * POST /api/v1/statuses/:id/reblog
     *
     * @param id The target status id.
     * @param options.visibility Visibility of the reblogged status.
     * @return Status.
     */
    public reblogStatus(
        id: string,
        options?: Partial<{ visibility: StatusVisibility }>,
        extra?: RequestInit,
    ): Promise<Output<Status>> {
        return this.post<Status>(
            `/api/v1/statuses/${id}/reblog`,
            { ...options },
            extra,
        );
    }

    /**
     * POST /oauth/token
     *
     * Revoke an OAuth token.
     * @param client_id will be generated by #createApp or #registerApp
     * @param client_secret will be generated by #createApp or #registerApp
     * @param token will be get #fetchAccessToken
     */
    public refreshToken(
        client_id: string,
        client_secret: string,
        refresh_token: string,
        extra?: RequestInit,
    ): Promise<Output<Token>> {
        return this.post<Token>(
            "/oauth/token",
            {
                client_id,
                client_secret,
                grant_type: "refresh_token",
                refresh_token,
            },
            extra,
        );
    }

    /**
     * POST /api/v1/accounts
     *
     * @param username Username for the account.
     * @param email Email for the account.
     * @param password Password for the account.
     * @param agreement Whether the user agrees to the local rules, terms, and policies.
     * @param locale The language of the confirmation email that will be sent
     * @param reason Text that will be reviewed by moderators if registrations require manual approval.
     * @return An account token.
     */
    public registerAccount(
        username: string,
        email: string,
        password: string,
        agreement: boolean,
        locale: string,
        reason: string,
        extra?: RequestInit,
    ): Promise<Output<Account>> {
        return this.postForm<Account>(
            "/api/v1/accounts",
            { username, email, password, agreement, locale, reason },
            extra,
        );
    }

    /**
     * POST /api/v1/apps
     *
     * Create an application.
     * @param client_name your application's name
     * @param options Form Data
     */
    public registerApp(
        client_name: string,
        options: {
            redirect_uris: string;
            scopes?: string;
            website?: string;
        },
        extra?: RequestInit,
    ): Promise<Output<ApplicationData>> {
        return this.post<ApplicationData>(
            "/api/v1/apps",
            { client_name, ...options },
            extra,
        );
    }

    public rejectFollowRequest(
        id: string,
        extra?: RequestInit,
    ): Promise<Output<Relationship>> {
        return this.post<Relationship>(
            `/api/v1/follow_requests/${id}/reject`,
            undefined,
            extra,
        );
    }

    public removeReactionFromAnnouncement(
        id: string,
        name: string,
        extra?: RequestInit,
    ): Promise<Output<Announcement>> {
        return this.delete<Announcement>(
            `/api/v1/announcements/${id}/reactions/${name}`,
            undefined,
            extra,
        );
    }

    /**
     * POST /api/v1/reports
     *
     * @param account_id Target account ID.
     * @param options.status_ids Array of Statuses ids to attach to the report.
     * @param options.comment The reason for the report. Default maximum of 1000 characters.
     * @param options.forward If the account is remote, should the report be forwarded to the remote admin?
     * @param options.category Specify if the report is due to spam, violation of enumerated instance rules, or some other reason. Defaults to other. Will be set to violation if rule_ids[] is provided (regardless of any category value you provide).
     * @param options.rule_ids For violation category reports, specify the ID of the exact rules broken. Rules and their IDs are available via GET /api/v1/instance/rules and GET /api/v1/instance.
     * @return Report.
     */
    public report(
        account_id: string,
        options: {
            status_ids?: string[];
            rule_ids?: string[];
            comment: string;
            forward?: boolean;
            category?: Category;
        },
        extra?: RequestInit,
    ): Promise<Output<Report>> {
        return this.post<Report>(
            "/api/v1/reports",
            { account_id, ...options },
            extra,
        );
    }

    public revokeToken(
        client_id: string,
        client_secret: string,
        token: string,
        extra?: RequestInit,
    ): Promise<Output<void>> {
        return this.post<void>(
            "/oauth/revoke",
            { client_id, client_secret, token },
            extra,
        );
    }

    /**
     * POST /api/v1/markers
     *
     * @param options.home Marker position of the last read status ID in home timeline.
     * @param options.notifications Marker position of the last read notification ID in notifications.
     * @return Marker.
     */
    public saveMarkers(
        options: Partial<{
            home: {
                last_read_id: string;
            };
            notifications: {
                last_read_id: string;
            };
        }>,
        extra?: RequestInit,
    ): Promise<Output<Marker>> {
        return this.post<Marker>("/api/v1/markers", options, extra);
    }

    public scheduleStatus(
        id: string,
        scheduled_at?: string,
        extra?: RequestInit,
    ): Promise<Output<ScheduledStatus>> {
        return this.put<ScheduledStatus>(
            `/api/v1/scheduled_statuses/${id}`,
            { scheduled_at },
            extra,
        );
    }

    /**
     * GET /api/v2/search
     *
     * @param q The search query.
     * @param type Enum of search target.
     * @param options.limit Maximum number of results to load, per type. Defaults to 20. Max 40.
     * @param options.max_id Return results older than this id.
     * @param options.min_id Return results immediately newer than this id.
     * @param options.resolve Attempt WebFinger lookup. Defaults to false.
     * @param options.following Only include accounts that the user is following. Defaults to false.
     * @param options.account_id If provided, statuses returned will be authored only by this account.
     * @param options.exclude_unreviewed Filter out unreviewed tags? Defaults to false.
     * @return Results.
     */
    public search(
        q: string,
        options: Partial<{
            account_id: string;
            exclude_unreviewed: boolean;
            following: boolean;
            limit: number;
            max_id: string;
            min_id: string;
            offset: number;
            resolve: boolean;
            type: "accounts" | "hashtags" | "statuses";
        }>,
        extra?: RequestInit,
    ): Promise<Output<Results>> {
        const params = new URLSearchParams();

        params.set("q", q);

        if (options) {
            if (options.account_id)
                params.set("account_id", options.account_id);
            if (options.exclude_unreviewed)
                params.set("exclude_unreviewed", "true");
            if (options.following) params.set("following", "true");
            if (options.limit) params.set("limit", options.limit.toString());
            if (options.max_id) params.set("max_id", options.max_id);
            if (options.min_id) params.set("min_id", options.min_id);
            if (options.offset) params.set("offset", options.offset.toString());
            if (options.resolve) params.set("resolve", "true");
            if (options.type) params.set("type", options.type);
        }

        return this.get<Results>(`/api/v2/search?${params}`, extra);
    }

    public searchAccount(
        q: string,
        options: Partial<{
            following: boolean;
            limit: number;
            max_id: string;
            resolve: boolean;
            since_id: string;
        }>,
        extra?: RequestInit,
    ): Promise<Output<Account[]>> {
        const params = new URLSearchParams();

        params.set("q", q);

        if (options) {
            if (options.following) params.set("following", "true");
            if (options.limit) params.set("limit", options.limit.toString());
            if (options.max_id) params.set("max_id", options.max_id);
            if (options.resolve) params.set("resolve", "true");
            if (options.since_id) params.set("since_id", options.since_id);
        }

        return this.get<Account[]>(`/api/v1/accounts/search?${params}`, extra);
    }

    // TODO: streamingURL

    /**
     * POST /api/v1/push/subscription
     *
     * @param subscription.endpoint Endpoint URL that is called when a notification event occurs.
     * @param subscription.keys.p256dh User agent public key. Base64 encoded string of public key of ECDH key using prime256v1 curve.
     * @param subscription.keys Auth secret. Base64 encoded string of 16 bytes of random data.
     * @param data.alerts.follow Receive follow notifications?
     * @param data.alerts.favourite Receive favourite notifications?
     * @param data.alerts.reblog Receive reblog notifictaions?
     * @param data.alerts.mention Receive mention notifications?
     * @param data.alerts.poll Receive poll notifications?
     * @param data.alerts.status Receive status notifications?
     * @param data.alerts.follow_request Receive follow request notifications?
     * @param data.alerts.update Receive status update notifications?
     * @param data.alerts.admin.sign_up Receive sign up notifications?
     * @param data.alerts.admin.report Receive report notifications?
     * @param data.policy Notification policy. Defaults to all.
     * @return PushSubscription.
     */
    public subscribePushNotifications(
        subscription: {
            endpoint: string;
            keys: {
                auth: string;
                p256dh: string;
            };
        },
        data?: {
            alerts: Partial<{
                favourite: boolean;
                follow: boolean;
                mention: boolean;
                poll: boolean;
                reblog: boolean;
                status: boolean;
                follow_request: boolean;
                update: boolean;
                "admin.sign_up": boolean;
                "admin.report": boolean;
            }>;
            policy?: "all" | "followed" | "follower" | "none";
        },
        extra?: RequestInit,
    ): Promise<Output<PushSubscription>> {
        return this.post<PushSubscription>(
            "/api/v1/push/subscription",
            { subscription, data },
            extra,
        );
    }

    // TODO: tagStreaming

    public unblockAccount(
        id: string,
        extra?: RequestInit,
    ): Promise<Output<Relationship>> {
        return this.post<Relationship>(
            `/api/v1/accounts/${id}/unblock`,
            undefined,
            extra,
        );
    }

    public unblockDomain(
        domain: string,
        extra?: RequestInit,
    ): Promise<Output<void>> {
        return this.delete<void>("/api/v1/domain_blocks", { domain }, extra);
    }

    public unbookmarkStatus(
        id: string,
        extra?: RequestInit,
    ): Promise<Output<Status>> {
        return this.post<Status>(
            `/api/v1/statuses/${id}/unbookmark`,
            undefined,
            extra,
        );
    }

    public unfavouriteStatus(
        id: string,
        extra?: RequestInit,
    ): Promise<Output<Status>> {
        return this.post<Status>(
            `/api/v1/statuses/${id}/unfavourite`,
            undefined,
            extra,
        );
    }

    public unfollowAccount(
        id: string,
        extra?: RequestInit,
    ): Promise<Output<Relationship>> {
        return this.post<Relationship>(
            `/api/v1/accounts/${id}/unfollow`,
            undefined,
            extra,
        );
    }

    public unmuteAccount(
        id: string,
        extra?: RequestInit,
    ): Promise<Output<Relationship>> {
        return this.post<Relationship>(
            `/api/v1/accounts/${id}/unmute`,
            undefined,
            extra,
        );
    }

    public unpinAccount(
        id: string,
        extra?: RequestInit,
    ): Promise<Output<Relationship>> {
        return this.post<Relationship>(
            `/api/v1/accounts/${id}/unpin`,
            undefined,
            extra,
        );
    }

    public unpinStatus(
        id: string,
        extra?: RequestInit,
    ): Promise<Output<Status>> {
        return this.post<Status>(
            `/api/v1/statuses/${id}/unpin`,
            undefined,
            extra,
        );
    }

    public unreblogStatus(
        id: string,
        extra?: RequestInit,
    ): Promise<Output<Status>> {
        return this.post<Status>(
            `/api/v1/statuses/${id}/unreblog`,
            undefined,
            extra,
        );
    }

    /**
     * PATCH /api/v1/accounts/update_credentials
     *
     * @param options.avatar Avatar image, as a File
     * @param options.bot Is this account a bot?
     * @param options.discoverable Should this account be included in directory?
     * @param options.display_name Account display name.
     * @param options.fields_attributes Array of profile metadata.
     * @param options.header Header image, as a File
     * @param options.locked Is this account locked?
     * @param options.note Brief account description.
     * @param options.source Source metadata.
     * @return An account.
     */
    public updateCredentials(
        options: Partial<{
            avatar: File;
            bot: boolean;
            discoverable: boolean;
            display_name: string;
            fields_attributes: {
                name: string;
                value: string;
            }[];
            header: File;
            locked: boolean;
            note: string;
            source: Partial<{
                language: string;
                privacy: string;
                sensitive: boolean;
            }>;
        }>,
        extra?: RequestInit,
    ): Promise<Output<Account>> {
        return this.patchForm<Account>(
            "/api/v1/accounts/update_credentials",
            options,
            extra,
        );
    }

    // TODO: updateFilter

    /**
     * PUT /api/v1/lists/:id
     *
     * @param id Target list ID.
     * @param options.title New list title.
     * @param options.replies_policy Which replies should be shown in the list.
     * @param options.exclusive Should the members of this list be removed from the home timeline?
     * @return List.
     */
    public updateList(
        id: string,
        options: {
            title: string;
            replies_policy?: "none" | "followed" | "list";
            exclusive?: boolean;
        },
        extra?: RequestInit,
    ): Promise<Output<List>> {
        return this.put<List>(`/api/v1/lists/${id}`, { ...options }, extra);
    }

    public updateMedia(
        id: string,
        options?: Partial<{
            description: string;
            file: File;
            focus: string;
        }>,
        extra?: RequestInit,
    ): Promise<Output<Attachment>> {
        return this.putForm<Attachment>(
            `/api/v1/media/${id}`,
            { ...options },
            extra,
        );
    }

    public updatePushSubscription(
        data?: {
            alerts: Partial<{
                favourite: boolean;
                follow: boolean;
                mention: boolean;
                poll: boolean;
                reblog: boolean;
                status: boolean;
                follow_request: boolean;
                update: boolean;
                "admin.sign_up": boolean;
                "admin.report": boolean;
            }>;
            policy?: "all" | "followed" | "follower" | "none";
        },
        extra?: RequestInit,
    ): Promise<Output<PushSubscription>> {
        return this.put<PushSubscription>(
            "/api/v1/push/subscription",
            { data: { ...data, policy: undefined }, policy: data?.policy },
            extra,
        );
    }

    public uploadMedia(
        file: File,
        options?: Partial<{
            description: string;
            focus: string;
        }>,
        extra?: RequestInit,
    ): Promise<Output<Attachment | AsyncAttachment>> {
        return this.postForm<Attachment | AsyncAttachment>(
            "/api/v2/media",
            { file, ...options },
            extra,
        );
    }

    // TODO: userStreaming

    public verifyAccountCredentials(
        extra?: RequestInit,
    ): Promise<Output<Account>> {
        return this.get<Account>("/api/v1/accounts/verify_credentials", extra);
    }

    public verifyAppCredentials(
        extra?: RequestInit,
    ): Promise<Output<Application>> {
        return this.get<Application>("/api/v1/apps/verify_credentials", extra);
    }

    public votePoll(
        id: string,
        choices: number[],
        extra?: RequestInit,
    ): Promise<Output<Poll>> {
        return this.post<Poll>(`/api/v1/polls/${id}/votes`, { choices }, extra);
    }
}
