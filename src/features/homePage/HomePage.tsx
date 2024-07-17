import { useEffect, useState } from 'react'
import { TTodo } from './_t/TTodo'
import { GET_todos } from './_api/GET_todos'
import { POST_todos } from './_api/POST_todos'
import { DELETE_todos } from './_api/DELETE_todos'
import TodoItem from './todoItem/TodoItem'

import css from './HomePage.module.css'

const HomePage = () => {
    const [todos, set_todos] = useState<TTodo[]>([])

    const [todoInfo, set_todoInfo] = useState({text: ''})


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

        set_todos(resp)
    }

    const createTodo = async () => {
        if (!todoInfo.text)
            return

        const resp = await POST_todos(todoInfo) 
        if (resp.error) 
            return

        set_todos(prev => [resp, ...prev])
    }

    const deleteTodo = async (todo_id) => {
        const resp = await DELETE_todos({todo_id: todo_id})
        if (resp.error) 
            return

        set_todos(prev => prev?.filter(todo => todo.id != resp.id))
    }

    // EFFECTS

    useEffect(() => {
        loadTodos()
    }, [])
    
    return (
        <div className={css.homePageContainer}>
            <div className={css.mobileTitle}>
                Todo List
            </div>
            <div className={css.todosBox}>
                <div className={css.header}>
                    <h1>Todo List</h1>
                    <form 
                        className={css.addText}
                        onSubmit={onSubmit}
                    >
                        <input 
                            type='text'
                            placeholder='Enter text here...'
                            onChange={e => onChange(e)}
                            
                        />
                        <button
                            type='button'
                            className={`
                                ${css.addButton}
                                ${!todoInfo.text && css.disabled}
                            `}
                            onClick={createTodo}
                        >
                            ADD
                        </button>
                    </form>
                </div>
                <div className={css.todosList}>
                    {todos.length 
                        ? todos.map(todo => 
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onDelete={() => deleteTodo(todo.id)}
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