export type Alerts = {
    follow: boolean;
    favourite: boolean;
    mention: boolean;
    reblog: boolean;
    poll: boolean;
    status: boolean;
    follow_request: boolean;
    update: boolean;
    "admin.sign_up": boolean;
    "admin.report": boolean;
};

export type PushSubscription = {
    id: string;
    endpoint: string;
    server_key: string;
    alerts: Alerts;
};
