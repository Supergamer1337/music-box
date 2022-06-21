import { Response } from 'express'
import fetch from 'node-fetch'
import CachedRequest from '../models/CachedRequest.js'

/**
 * General request function.
 *
 * @param url The URL to request.
 * @param method The HTTP method to use.
 * @param data The data to send.
 * @param headers The headers to send.
 * @returns The response data.
 * @throws The response if the request failed.
 */
const request = async (
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data: string | undefined,
    headers: Record<string, string> = {
        'Content-Type': 'application/json'
    }
) => {
    const response = await fetch(url, {
        method,
        headers,
        body: data
    })

    if (!response.ok) {
        throw response
    }

    if (response.headers.get('content-type') === 'application/json') {
        return await response.json()
    } else {
        return await response.text()
    }
}

const requestCache: Record<string, CachedRequest<any>> = {}
const requestMadeRecently: Record<string, boolean> = {}

/**
 * Makes a request to the given URL, caching the response. The identification of the request is based on the URL and the identifier.
 *
 * @param identifier The identifier to use for the request.
 * @param url The URL to request.
 * @param options The options to use for the cached request. Defaults to { staleTime: 10000 }.
 * @param headers The headers to send.
 * @returns The response data.
 * @throws The response if the request failed.
 */
export const cachedGetRequest = async <T>(
    identifier: string,
    url: string,
    options?: { staleTime: number },
    headers?: Record<string, string>
) => {
    if (requestMadeRecently[url + identifier]) {
        while (requestMadeRecently[url + identifier]) {
            await new Promise((resolve) => setTimeout(resolve, 100))
        }
    }

    // Check if the request is cached and not stale.
    if (
        requestCache[url + identifier] &&
        !requestCache[url + identifier].isStale()
    ) {
        return requestCache[url + identifier].getData() as T
    }

    // Request the data.
    requestMadeRecently[url + identifier] = true
    const response = (await request(url, 'GET', undefined, headers)) as T

    // Cache the data.
    requestCache[url + identifier] = new CachedRequest<T>(
        options?.staleTime ?? 10000,
        response
    )
    delete requestMadeRecently[url + identifier]

    // Clean the cache approximately every 100 requests.
    if (Math.random() < 0.01) {
        for (const key in requestCache) {
            if (requestCache[key].isStale()) {
                delete requestCache[key]
            }
        }
    }

    return response
}

/**
 * Form data POST request.
 *
 * @param url The URL to request.
 * @param data The data to send.
 * @param headers The headers to send. If specified, the Content-Type header will be overwritten.
 * @returns The response data.
 * @throws The response if the request failed.
 */
export const formDataPostRequest = async (
    url: string,
    data: Record<string, any>,
    headers: Record<string, string> = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
) => {
    const requestData = new URLSearchParams(data)

    return await request(url, 'POST', requestData.toString(), headers)
}

/**
 * A GET request.
 *
 * @param url The URL to request.
 * @param headers The headers to send.
 * @returns The response data.
 */
export const getRequest = async (
    url: string,
    headers: Record<string, string>
) => {
    return await request(url, 'GET', undefined, headers)
}

/**
 * Makes a request to the specified Discord API endpoint.
 *
 * @param endpoint The Discord API endpoint to request.
 * @param headers The headers to send.
 * @param accessToken The Discord access token to use.
 * @returns The response data.
 */
export const discordGetRequest = async (
    endpoint: string,
    accessToken: string,
    headers?: Record<string, string>
) => {
    return await request(
        `https://discord.com/api/v10${endpoint}`,
        'GET',
        undefined,
        {
            Authorization: `Bearer ${accessToken}`,
            ...headers
        }
    )
}

/**
 * Makes a cached GET request to the specified Discord API endpoint.
 *
 * @param identifier The identifier to use for the request.
 * @param endpoint The Discord API endpoint to request.
 * @param accessToken The Discord access token to use.
 * @param options The options to use for the cached request. Defaults to { staleTime: 10000 }.
 * @param headers The headers to send.
 * @returns The response data.
 * @throws The response if the request failed.
 */
export const cachedDiscordGetRequest = async <T>(
    identifier: string,
    endpoint: string,
    accessToken: string,
    options?: { staleTime: number },
    headers?: Record<string, string>
) => {
    return (await cachedGetRequest(
        identifier,
        `https://discord.com/api/v10${endpoint}`,
        { staleTime: options?.staleTime ?? 10000 },
        {
            Authorization: `Bearer ${accessToken}`,
            ...headers
        }
    )) as T
}

/**
 * Handles a request error.
 *
 * @param errorResponse The error response.
 * @param functionName The name of the function that caused the error.
 * @throws Formatted error message.
 */
export const handleRequestError = async (
    errorResponse: any,
    functionName: string
) => {
    throw new Error(
        `${errorResponse.status} ${
            errorResponse.statusText
        }. ${await errorResponse.text()} in function ${functionName}`
    )
}

/**
 * Handles a non-specific endpoint error.
 *
 * @param error The error.
 * @param res The response object.
 * @param returnMessage The message to return to the client.
 */
export const handleEndpointError = async (
    error: unknown | any,
    res: Response,
    returnMessage: string
) => {
    console.error(error)

    res.status(500).json({
        error: returnMessage
    })
}
