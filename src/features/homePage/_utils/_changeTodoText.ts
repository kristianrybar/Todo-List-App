import { produce } from 'immer'
import { TTodo } from '../_t/TTodo'

export const _changeTodoText = (todo_id, newText) => {
    return produce(draft => {
        const todoToChange: TTodo = draft.find((todo: TTodo) => todo.id == todo_id)
        todoToChange.text = newText
    })
}