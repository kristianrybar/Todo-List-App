import { api } from '~/zzz_api/core/api'

export const POST_todos = async () => {
    const r = await api.post('/todos') 
    if (!r || r.error) {
        const error = r.error ? r.error : 'unexpected error'
        return {error: error}
    }

    return r
}