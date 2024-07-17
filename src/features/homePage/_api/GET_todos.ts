import { api } from '~/zzz_api/core/api'

export const GET_todos = async () => {
    const r = await api.get('/todos') 
    if (!r || r.error) {
        const error = r.error ? r.error : 'unexpected error'
        return {error: error}
    }

    return r
}