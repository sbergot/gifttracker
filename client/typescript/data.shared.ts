import * as jquery from "jquery"

export function sendJson<T>(url : string, verb : string, payload : T) : JQueryXHR
{
    let settings : JQueryAjaxSettings = {
        url : url,
        method : verb,
        data : JSON.stringify(payload),
        headers : {"Content-Type" : "application/json"}
    };
    return jquery.ajax(settings);
}
