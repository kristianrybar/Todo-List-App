import { useEffect, useState } from 'react'
import { TTodo } from './_t/TTodo'
import { GET_todos } from './_api/GET_todos'
import TodoItem from './todoItem/TodoItem'
import { IoSend } from "react-icons/io5";

import css from './HomePage.module.css'

const HomePage = () => {
    const [todos, set_todos] = useState<TTodo[]>()

    const loadTodos = async () => {
        const resp = await GET_todos()
        if (resp.error) 
            return

        set_todos(resp)
    }

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
                    <div className={css.addText}>
                        <input 
                            type='text'
                            placeholder='Enter text here...'
                        />
                        <div className={css.addButton}>
                            ADD
                        </div>
                    </div>
                </div>
                <div className={css.todosList}>
                    {todos && todos.map(todo => 
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default HomePage