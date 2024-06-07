export type Application = {
    name: string;
    website?: string | null;
    vapid_key?: string | null;
};

export type ApplicationData = {
    id: string;
    name: string;
    website?: string | null;
    client_id: string;
    client_secret: string;
    vapid_key?: string | null;
};
