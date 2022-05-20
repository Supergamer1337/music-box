import fetch from 'node-fetch'

export const request = async (
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data: string,
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
