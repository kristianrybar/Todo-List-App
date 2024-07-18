import { useEffect, useState } from 'react'
import { TTodo } from './_t/TTodo'
import { GET_todos } from './_api/GET_todos'
import { POST_todos__createTodo } from './_api/POST_todos__createTodo'
import { DELETE_todos__deleteTodoById } from './_api/DELETE_todos__deleteTodoById'

import useTodo_Updating from './_hooks/useTodo_Updating'

import AddTodoForm from './addTodoForm/AddTodoForm'
import TodoItem from './todoItem/TodoItem'

import css from './HomePage.module.css'

const HomePage = () => {
    const [todos, set_todos] = useState<TTodo[]>([])

    const [todoInfo, set_todoInfo] = useState({text: ''})
    //const [loadingTodosStatus, set_loadingTodosStatus] = useState<'pending' | 'idle'>('idle')
    //const [activeList, set_activeList] = useState<'all' | 'completed' | 'important'>('all')

    const {updateTodoText_withPrompt, updateTodoCompleted, updateTodoImportant} = useTodo_Updating()

    // FUNCTIONS

    const _setTodoText = (todo_id, newText) => {
        set_todos(prev => {
            return prev.map(todo => {
                if (todo.id != todo_id) 
                    return todo
                return {...todo, text: newText} 
            })
        })
    }

    const _setTodoCompleted = (todo_id, completed: boolean) => {
        set_todos(prev => {
            return prev.map(todo => {
                if (todo.id != todo_id) 
                    return todo
                return {...todo, completed: completed} 
            })
        })
    }

    const _setTodoImportant = (todo_id, isImportant: boolean) => {
        set_todos(prev => {
            return prev.map(todo => {
                if (todo.id != todo_id) 
                    return todo
                return {...todo, important: isImportant} 
            })
        })
    }

    const convertStringToBoolean = (todos) => {
        return todos.map(todo => {
            return {
                ...todo,
                completed: (todo.completed == 'true' || todo.completed == true) ? true : false,
                important: (todo.important == 'true' || todo.important == true) ? true : false,
            }
        })
    }

    const onChange = (e) => {
        set_todoInfo(prev => ({...prev, text: e.target.value}))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        createTodo() 
    }

    const loadTodos = async () => {
        const resp = await GET_todos()
        if (resp.error) 
            return
        
        const editedTodos = convertStringToBoolean(resp) // fix, lebo z api boolean tomu chodi ako string 
        
        set_todos(editedTodos)
    }

    const createTodo = async () => {
        if (!todoInfo.text)
            return

        const resp = await POST_todos__createTodo(todoInfo) 
        if (resp.error) 
            return

        set_todos(prev => [resp, ...prev])
        set_todoInfo(prev => ({...prev, text: ''})) // reset input
    }

    const deleteTodo = async (todo_id) => {
        const resp = await DELETE_todos__deleteTodoById({todo_id: todo_id})
        if (resp.error) 
            return

        set_todos(prev => prev.filter(todo => todo.id != resp.id))
    }

    // UPDATING TODO

    const doUpdateTodoText_withPrompt = async (todo_id, prevText) => {
        const resp = await updateTodoText_withPrompt(todo_id, prevText)
        if (resp.error) 
            return

        _setTodoText(resp.id, resp.text)
    }

    const doUpdateTodoCompleted = async (todo_id, isChecked: boolean) => {
        const resp = await updateTodoCompleted(todo_id, isChecked)
        if (resp.error) 
            return
        
        const fixedCompletedValue = resp.completed == 'true' || resp.completed == true ? true : false // fix, lebo z api boolean tomu chodi ako string
        _setTodoCompleted(resp.id, fixedCompletedValue)
    }

    const doUpdateTodoImportant = async (todo_id, isImportant: boolean) => { 
        const resp = await updateTodoImportant(todo_id, isImportant)
        if (resp.error) 
            return
        
        const fixedImportantValue = resp.important == 'true' || resp.important == true ? true : false // fix, lebo z api boolean tomu chodi ako string
        _setTodoImportant(resp.id, fixedImportantValue)
    }

    // EFFECTS

    useEffect(() => {
        loadTodos()
    }, [])
    
    console.log(todos);
    

    return (
        <div className={css.homePageContainer}>
            <div className={css.mobileTitle}>
                Todo List
            </div>
            <div className={css.todosBox}>
                <div className={css.header}>
                    <h1>Todo List</h1>
                    <AddTodoForm
                        onSubmit={(e) => onSubmit(e)}
                        onChange={(e) => onChange(e)}
                        todoInfo={todoInfo}
                        onAdd={createTodo}
                    />
                </div>
                <div className={css.todosList}>
                    {todos.length 
                        ? todos
                            //.filter(todo => todo.completed == 'true' || todo.completed == true)
                            //.filter(todo => todo.important == 'true' || todo.important == true)
                            .map(todo => 
                                <TodoItem
                                    key={todo.id}
                                    todo={todo}
                                    onDelete={() => deleteTodo(todo.id)}
                                    onEdit={() => doUpdateTodoText_withPrompt(todo.id, todo.text)}
                                    onChangeCheckbox={(e) => doUpdateTodoCompleted(todo.id, e.target.checked)}
                                    onClickImportantIcon={() => doUpdateTodoImportant(todo.id, todo.important ? false : true)}
                                    //onClickImportantIcon={() => console.log(todo.important)}
                                />
                            )
                        : <div className={css.noTodosText}>
                            No todos yet
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePage