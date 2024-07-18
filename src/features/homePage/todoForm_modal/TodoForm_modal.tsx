import TodoForm from '../todoForm/TodoForm'
import css from './TodoForm_modal.module.css'

type Props = {
    onSubmit: (e) => void
    onChangeText: (e) => void
    todoText: string
    onClickButton: () => void
    btnTitle: string
    onCancel: () => void
}

const TodoForm_modal = (props: Props) => {
    console.log(props.todoText);
    
    return (
        <div className={css.backdrop}>
            <div className={css.modal_container}>
                <h3>Edit Todo text</h3>
                <TodoForm
                    onSubmit={props.onSubmit}
                    onChangeText={props.onChangeText}
                    todoText={props.todoText}
                    onClickButton={props.onClickButton}
                    btnTitle={props.btnTitle}
                />
                <div 
                    className={css.cancelButton}
                    onClick={props.onCancel}
                >
                    Cancel
                </div>
            </div>
        </div>
    )
}

export default TodoForm_modal