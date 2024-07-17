import { api } from '~/zzz_api/core/api'

type Params = {
    todo_id
}

export const DELETE_todos = async (p: Params) => {
    const r = await api.delete(`/todos/${p.todo_id}`)
    if (!r || r.error) {
        const error = r.error ? r.error : 'unexpected error'
        console.warn(error)
        // alert(error) // for mobiles
        return {error: error}
    }

    return r
}