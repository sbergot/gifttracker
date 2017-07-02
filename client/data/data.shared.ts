export enum Verbs
{
    GET,
    POST,
    PUT,
    DELETE
}

export function sendJson<T>(url : string, verb : Verbs, payload : T) : JQueryXHR
{
    let settings : JQueryAjaxSettings = {
        url : url,
        method : Verbs[verb],
        data : JSON.stringify(payload),
        headers : {"Content-Type" : "application/json"}
    };
    return jquery.ajax(settings);
}
