import { api } from '~/zzz_api/core/api'

type Params = {
    todo_id: string
    important: boolean
}

export const PUT_todos__updateImportant = async (p: Params) => {
    const r = await api.put(`/todos/${p.todo_id}`, {
        important: p.important,
    })
    if (!r || r.error) {
        const error = r.error ? r.error : 'unexpected error'
        console.warn(error)
        // alert(error) // for mobiles
        return {error: error}
    }

    return r
}