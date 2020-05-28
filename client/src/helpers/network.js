import {API_ROOT} from "../constants/Default";


export const httpPost = async (url, data) => {
    // from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    return fetch(url, {
        body: JSON.stringify(data),
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
        referrer: 'no-referrer',
    }).then(response => response.json())// parses response to JSON
}

export const httpPostFiles = async (url, data) => {
    return fetch(url, {
        body: data,
        cache: 'no-cache',
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        redirect: 'follow',
        referrer: 'no-referrer',
    }) // ??
}




export const httpGet = async (url) => {
    // from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    return fetch(url).then(response => response.json())// parses response to JSON
}
/*
export async function httpPost(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(data)
    })
    const serverData = await response.json()
    console.log(serverData);
    return serverData;
}
*/

export function checkResponse(res) {
    return res.status === 'ok';
}