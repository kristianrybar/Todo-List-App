import { apiGet } from '../apiPublic/apiGet'
import { apiPost } from '../apiPublic/apiPost'
import { apiDelete } from '../apiPublic/apiDelete'
import { apiPut } from '../apiPublic/apiPut'

export const api = {
    get: apiGet,
    post: apiPost,
    delete: apiDelete,
    put: apiPut,
}