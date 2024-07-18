import { api } from '~/zzz_api/core/api'

type Params = {
    todo_id: string
    completed: boolean
}

export const PUT_todos__updateCompleted = async (p: Params) => {
    console.log(p);
    
    const r = await api.put(`/todos/${p.todo_id}`, {
        completed: p.completed,
    })
    if (!r || r.error) {
        const error = r.error ? r.error : 'unexpected error'
        console.warn(error)
        // alert(error) // for mobiles
        return {error: error}
    }

    return r
}