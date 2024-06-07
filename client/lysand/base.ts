import { DEFAULT_UA } from "./constants";

type HttpVerb = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type ConvertibleObject = {
    [key: string]:
        | string
        | number
        | boolean
        | File
        | undefined
        | null
        | ConvertibleObject[]
        | ConvertibleObject;
};

export interface Output<ReturnType> {
    data: ReturnType;
    headers: Headers;
}

const objectToFormData = (obj: ConvertibleObject): FormData => {
    return Object.keys(obj).reduce((formData, key) => {
        if (obj[key] === undefined || obj[key] === null) return formData;
        if (obj[key] instanceof File) {
            formData.append(key, obj[key] as Blob);
            return formData;
        }
        if (Array.isArray(obj[key])) {
            (obj[key] as ConvertibleObject[]).forEach((item, index) => {
                if (item instanceof File) {
                    formData.append(`${key}[${index}]`, item as Blob);
                    return;
                }
                formData.append(`${key}[${index}]`, String(item));
            });

            return formData;
        }
        if (typeof obj[key] === "object") {
            const nested = objectToFormData(obj[key] as ConvertibleObject);

            for (const [nestedKey, value] of nested.entries()) {
                formData.append(`${key}[${nestedKey}]`, value);
            }

            return formData;
        }
        formData.append(key, String(obj[key]));
        return formData;
    }, new FormData());
};

export class ResponseError extends Error {}

export class BaseClient {
    constructor(
        protected baseUrl: URL,
        private accessToken?: string,
    ) {}

    get url(): URL {
        return this.baseUrl;
    }

    get token(): string | undefined {
        return this.accessToken;
    }

    private async request<ReturnType>(
        request: Request,
    ): Promise<Output<ReturnType>> {
        const result = await fetch(request);

        if (!result.ok) {
            const error = await result.json();
            throw new ResponseError(
                `Request failed (${result.status}): ${
                    error.error || error.message || result.statusText
                }`,
            );
        }

        return {
            data: await result.json(),
            headers: result.headers,
        };
    }

    private async constructRequest(
        path: string,
        method: HttpVerb,
        body?: object | FormData,
        extra?: RequestInit,
    ): Promise<Request> {
        return new Request(new URL(path, this.baseUrl).toString(), {
            method,
            headers: {
                Authorization: this.accessToken
                    ? `Bearer ${this.accessToken}`
                    : "",
                "Content-Type": "application/json",
                "User-Agent": DEFAULT_UA,
                ...extra?.headers,
            },
            body: body
                ? body instanceof FormData
                    ? body
                    : JSON.stringify(body)
                : undefined,
            ...extra,
        });
    }

    protected async get<ReturnType>(
        path: string,
        extra?: RequestInit,
    ): Promise<Output<ReturnType>> {
        return await this.request(
            await this.constructRequest(path, "GET", undefined, extra),
        );
    }

    protected async post<ReturnType>(
        path: string,
        body?: object,
        extra?: RequestInit,
    ): Promise<Output<ReturnType>> {
        return await this.request(
            await this.constructRequest(path, "POST", body, extra),
        );
    }

    protected async postForm<ReturnType>(
        path: string,
        body: FormData | ConvertibleObject,
        extra?: RequestInit,
    ): Promise<Output<ReturnType>> {
        return await this.request(
            await this.constructRequest(
                path,
                "POST",
                body instanceof FormData ? body : objectToFormData(body),
                extra,
            ),
        );
    }

    protected async put<ReturnType>(
        path: string,
        body?: object,
        extra?: RequestInit,
    ): Promise<Output<ReturnType>> {
        return await this.request(
            await this.constructRequest(path, "PUT", body, extra),
        );
    }

    protected async putForm<ReturnType>(
        path: string,
        body: FormData | ConvertibleObject,
        extra?: RequestInit,
    ): Promise<Output<ReturnType>> {
        return await this.request(
            await this.constructRequest(
                path,
                "PUT",
                body instanceof FormData ? body : objectToFormData(body),
                extra,
            ),
        );
    }

    protected async patch<ReturnType>(
        path: string,
        body?: object,
        extra?: RequestInit,
    ): Promise<Output<ReturnType>> {
        return await this.request(
            await this.constructRequest(path, "PATCH", body, extra),
        );
    }

    protected async patchForm<ReturnType>(
        path: string,
        body: FormData | ConvertibleObject,
        extra?: RequestInit,
    ): Promise<Output<ReturnType>> {
        return await this.request(
            await this.constructRequest(
                path,
                "PATCH",
                body instanceof FormData ? body : objectToFormData(body),
                extra,
            ),
        );
    }

    protected async delete<ReturnType>(
        path: string,
        body?: object,
        extra?: RequestInit,
    ): Promise<Output<ReturnType>> {
        return await this.request(
            await this.constructRequest(path, "DELETE", body, extra),
        );
    }

    protected async deleteForm<ReturnType>(
        path: string,
        body: FormData | ConvertibleObject,
        extra?: RequestInit,
    ): Promise<Output<ReturnType>> {
        return await this.request(
            await this.constructRequest(
                path,
                "DELETE",
                body instanceof FormData ? body : objectToFormData(body),
                extra,
            ),
        );
    }
}
