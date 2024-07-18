import { produce } from 'immer'
import { TTodo } from '../_t/TTodo'

export const _changeTodoCompleted = (todo_id, completed: boolean) => {
    return produce(draft => {
        const todoToChange: TTodo = draft.find((todo: TTodo) => todo.id == todo_id)
        todoToChange.completed = completed
    })
}