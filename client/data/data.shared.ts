export enum Verbs
{
    GET,
    POST,
    PUT,
    DELETE
}

export async function postJson<T>(url : string, payload : T) : Promise<T>
{
    const response = await sendJson(url, Verbs.POST, payload);
    return await response.json();
}

export async function putJson<T>(url : string, payload : T) : Promise<T>
{
    const response = await sendJson(url, Verbs.PUT, payload);
    return await response.json();
}

export async function sendJson<T>(url : string, verb : Verbs, payload : T) : Promise<Response>
{
    let settings: RequestInit = {
        method : Verbs[verb],
        body : JSON.stringify(payload),
        headers : {
            "Content-Type" : "application/json"
        },
        credentials: 'include'
    };
    return await fetch(url, settings);
}

export async function getJson<T>(url: string): Promise<T>
{
    const response = await fetch(url, { credentials: 'include' });
    return await response.json();
}