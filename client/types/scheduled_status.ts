import type { Attachment } from "./attachment.ts";
import type { StatusParams } from "./status_params.ts";

export type ScheduledStatus = {
    id: string;
    scheduled_at: string;
    params: StatusParams;
    media_attachments: Attachment[] | null;
};
