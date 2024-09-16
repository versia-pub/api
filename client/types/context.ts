import type { Status } from "./status.ts";

export type Context = {
    ancestors: Status[];
    descendants: Status[];
};
