import { api } from '~/zzz_api/core/api'

type Params = {
    todo_id
    text
}

export const PUT_todos = async (p: Params) => {
    const r = await api.put(`/todos/${p.todo_id}`, p.text) 
    if (!r || r.error) {
        const error = r.error ? r.error : 'unexpected error'
        return {error: error}
    }

    return r
}