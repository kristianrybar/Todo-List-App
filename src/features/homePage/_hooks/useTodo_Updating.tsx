import { PUT_todos__updateText } from '../_api/PUT_todos__updateText'
import { PUT_todos__updateCompleted } from '../_api/PUT_todos__updateCompleted'
import { PUT_todos__updateImportant } from '../_api/PUT_todos__updateImportant'


const useTodo_Updating = () => {

    const updateTodoText = async (todo_id, newText) => {

        const resp = await PUT_todos__updateText({
            todo_id: todo_id,
            text: newText,
        })
        if (resp.error) 
            return resp
            
        return resp
    }

    const updateTodoCompleted = async (todo_id, isChecked: boolean) => {
        const resp = await PUT_todos__updateCompleted({
            todo_id: todo_id,
            completed: isChecked,
        })
        if (resp.error) 
            return resp
            
        return resp
    }

    const updateTodoImportant = async (todo_id, isImportant: boolean) => {
        const resp = await PUT_todos__updateImportant({
            todo_id: todo_id,
            important: isImportant,
        })
        if (resp.error) 
            return resp
            
        return resp
    }

    return {
        updateTodoText,
        updateTodoCompleted,
        updateTodoImportant,
    }
}

export default useTodo_Updating