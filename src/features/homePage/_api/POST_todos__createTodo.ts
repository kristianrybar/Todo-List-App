import { api } from '~/zzz_api/core/api'

type Params = {
    text
}

export const POST_todos__createTodo = async (p: Params) => {
    const r = await api.post('/todos', {
        text: p.text
    }) 
    if (!r || r.error) {
        const error = r.error ? r.error : 'unexpected error'
        console.warn(error)
        // alert(error) // for mobiles
        return {error: error}
    }

    return r
}