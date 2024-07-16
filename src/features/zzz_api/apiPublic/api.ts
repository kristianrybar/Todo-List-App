import { getApiHost } from '../host/getApiHost'


export async function api_get(url: string) {

    const host = getApiHost()
    if (!host) 
        return {error: 'Host not provided'}
    
    const fullUrl = host + url

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    
    try {
        let r = await fetch(fullUrl, options)
        if (!r.ok) 
            return {error: 'didnt respond with json, something is very broken'}
        
        let json = await r.json()

        return json
    } catch(e) {
        return {error: e}
    }
}

export async function api_post(url: string, body) {

    const host = getApiHost()
    if (!host) 
        return {error: 'Host not provided'}
    const fullUrl = host + url

    const options = {
        method: 'POST',
        body: new URLSearchParams({
            ...body
        }),
    }

    try {
        let r = await fetch(fullUrl, options)
        if (!r.ok) 
            return {error: 'didnt respond with json, something is very broken'}
        
        let json = await r.json()

        return json
    } catch(e) {
        return {error: e}
    }
}


let apiExcel = {
    get: api_get, 
    post: api_post,
}


export default apiExcel