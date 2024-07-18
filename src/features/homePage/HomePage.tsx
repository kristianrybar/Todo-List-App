import { useEffect, useState } from 'react'

import { TTodo } from './_t/TTodo'
import { TTabEnums } from './_t/TTabEnums'

import { GET_todos } from './_api/GET_todos'
import { POST_todos__createTodo } from './_api/POST_todos__createTodo'
import { DELETE_todos__deleteTodoById } from './_api/DELETE_todos__deleteTodoById'

import { _convertStringToBoolean } from './_utils/_convertStringToBoolean'

import useTodo_Updating from './_hooks/useTodo_Updating'

import TodoForm_modal from './todoForm_modal/TodoForm_modal'
import LoadingCircle from '~/app_shared/loadingCircle/LoadingCircle'
import TodoItem from './todoItem/TodoItem'
import TodoForm from './todoForm/TodoForm'
import Tabs from './tabs/Tabs'


import css from './HomePage.module.css'

const HomePage = () => {
    const [todos, set_todos] = useState<TTodo[]>([])

    const [todoText, set_todoText] = useState({text: ''})
    const [loadingTodosStatus, set_loadingTodosStatus] = useState<'pending' | 'idle'>('idle')
    const [activeTab, set_activeTab] = useState<TTabEnums>('all')
    const [isModalOpen, set_isModalOpen] = useState<boolean>(false)
    const [lastTodoID, set_lastTodoID] = useState('') // nastavi sa po kliku na dit icon pre modal


    const {updateTodoText, updateTodoCompleted, updateTodoImportant} = useTodo_Updating()

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

    const clearTextInput = () => {
        set_todoText(prev => ({...prev, text: ''}))
    }


    const filterTodos = async (tabName) => {
        if (!todos.length) 
            return

        if (tabName == 'completed') {
            const resp1= await loadTodos()
            if (resp1.error) 
                return
            
            set_todos(prev => prev.filter(todo => todo.completed == true))
        }
        if (tabName == 'important') {
            const resp2 = await loadTodos()
            if (resp2.error) 
                return

            set_todos(prev => prev.filter(todo => todo.important == true))
        }
        if (tabName == 'all') 
            loadTodos()
    }
    
    const onChangeText = (e) => {
        set_todoText(prev => ({...prev, text: e.target.value}))
    }

    const onSubmitCreate = (e) => {
        e.preventDefault()
        createTodo() 
    }

    const onSubmitEdit = (e) => {
        e.preventDefault()
        console.log('onSubmit edit')
        return
        doUpdateTodoText(lastTodoID, todoText.text)
    }

    const loadTodos = async () => {
        set_loadingTodosStatus('pending')
        const resp = await GET_todos()
        if (resp.error) 
            return resp
        
        const editedTodos: TTodo[] = _convertStringToBoolean(resp) // fix, lebo z api boolean tomu chodi ako string 
        
        set_todos(editedTodos)
        set_loadingTodosStatus('idle')
        return resp
    }

    const createTodo = async () => {
        if (!todoText.text)
            return

        const resp = await POST_todos__createTodo(todoText) 
        if (resp.error) 
            return

        set_todos(prev => [resp, ...prev])
        set_todoText(prev => ({...prev, text: ''})) // reset input
    }

    const deleteTodo = async (todo_id) => {
        const resp = await DELETE_todos__deleteTodoById({todo_id: todo_id})
        if (resp.error) 
            return

        set_todos(prev => prev.filter(todo => todo.id != resp.id))
    }

    // UPDATING TODO

    const doUpdateTodoText = async (todo_id, newText) => {
        if (!newText) 
            return

        clearTextInput()

        const resp = await updateTodoText(todo_id, newText)
        if (resp.error) 
            return

        _setTodoText(resp.id, resp.text)
    }

    const doUpdateTodoCompleted_withFilter = async (todo_id, isChecked: boolean) => {
        const resp = await updateTodoCompleted(todo_id, isChecked)
        if (resp.error) 
            return
        
        const fixedCompletedValue = resp.completed == 'true' || resp.completed == true ? true : false // fix, lebo z api boolean tomu chodi ako string
        _setTodoCompleted(resp.id, fixedCompletedValue)

        if (activeTab == 'all') 
            return
        
        filterTodos(activeTab)
    }

    const doUpdateTodoImportant_withFilter = async (todo_id, isImportant: boolean) => { 
        const resp = await updateTodoImportant(todo_id, isImportant)
        if (resp.error) 
            return
        
        const fixedImportantValue = resp.important == 'true' || resp.important == true ? true : false // fix, lebo z api boolean tomu chodi ako string
        _setTodoImportant(resp.id, fixedImportantValue)

        if (activeTab == 'all') 
            return

        filterTodos(activeTab)
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
                    <TodoForm
                        onSubmit={(e) => onSubmitCreate(e)}
                        onChangeText={(e) => onChangeText(e)}
                        todoText={todoText.text}
                        onClickButton={createTodo}
                        btnTitle='Add'
                    />

                    <Tabs
                        onChangeTab={(tabName) => {
                            set_activeTab(tabName)
                            filterTodos(tabName)
                        }}
                        activeTab={activeTab}
                    />
                </div>
                <div className={css.todosList}>
                    <div className={css.scroll}>
                        {(todos.length ? true : false) && loadingTodosStatus == 'idle' &&
                            todos.map(todo => 
                                <TodoItem
                                    key={todo.id}
                                    todo={todo}
                                    onDelete={() => deleteTodo(todo.id)}
                                    onEdit={() => {
                                        console.log(todo.id);
                                        
                                        set_lastTodoID(todo.id)
                                        set_todoText(prev => ({...prev, text: todo.text}))
                                        set_isModalOpen(true)
                                    }}
                                    onChangeCheckbox={(e) => doUpdateTodoCompleted_withFilter(todo.id, e.target.checked)}
                                    onClickImportantIcon={() => doUpdateTodoImportant_withFilter(todo.id, todo.important ? false : true)}
                                />
                            )
                        }
                        {!todos.length && loadingTodosStatus == 'idle' && 
                            <div className={css.noTodosText}>
                                No todos yet
                            </div>
                        }
                    </div>
                </div>

                {loadingTodosStatus == 'pending' &&
                    <LoadingCircle
                        size={7}
                        loadingColor='#0284C7'
                    />
                }
            </div>

            {isModalOpen &&
                <TodoForm_modal
                    onSubmit={(e) => onSubmitEdit(e)}
                    onChangeText={(e) => onChangeText(e)}
                    todoText={todoText.text}
                    onClickButton={() => {
                        set_isModalOpen(false)
                        doUpdateTodoText(lastTodoID, todoText.text)
                    }} 
                    btnTitle='Edit'
                    onCancel={() => {
                        set_isModalOpen(false)
                        clearTextInput()
                    }}
                />
            }
        </div>
    )
}

export default HomePage