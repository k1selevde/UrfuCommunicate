import {API_ROOT} from "../constants/Default";


export const httpPost = async (url, data) => {
    console.log(JSON.stringify(data))
//    from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    return await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        mode:'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        method: 'POST',
    }).then(response => response.json())
    // parses response to JSON
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
