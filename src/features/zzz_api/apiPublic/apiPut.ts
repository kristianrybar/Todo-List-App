import { getApiHost } from '../host/getApiHost'

export async function apiPut(url: string, body) {
    const host = getApiHost()
    if (!host) 
        return {error: 'Host not provided'}
    
    const fullUrl = host + url    
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
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