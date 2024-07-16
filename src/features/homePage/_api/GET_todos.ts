import api from '~/zzz_api/apiPublic/api'

export const GET_todos = async () => {
    const r = await api.get('/todos') 
    if (r.error) {
        console.warn(r.error)
        return r
    }

    return r
}