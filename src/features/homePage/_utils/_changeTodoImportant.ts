import { produce } from 'immer'
import { TTodo } from '../_t/TTodo'

export const _changeTodoImportant = (todo_id, important: boolean) => {
    return produce(draft => {
        const todoToChange: TTodo = draft.find((todo: TTodo) => todo.id == todo_id)
        todoToChange.important = important
    })
}