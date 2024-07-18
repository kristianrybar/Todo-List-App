import { api } from '~/zzz_api/core/api'

type Params = {
    todo_id: string
    text: string
}

export const PUT_todos__updateText = async (p: Params) => {
    const r = await api.put(`/todos/${p.todo_id}`, {
        text: p.text,
    })
    if (!r || r.error) {
        const error = r.error ? r.error : 'unexpected error'
        console.warn(error)
        // alert(error) // for mobiles
        return {error: error}
    }

    return r
}