import css from './AddTodoForm.module.css' 

type Props = {
    onSubmit: (e) => void
    onChange: (e) => void
    todoInfo
    onAdd: () => void
}

const AddTodoForm = (props: Props) => {
    return (
        <form
            className={css.formAddText}
            onSubmit={(e) => props.onSubmit(e)}
        >
            <input
                type='text'
                placeholder='Enter text here...'
                value={props.todoInfo.text || ''}
                onChange={e => props.onChange(e)}

            />
            <button
                type='button'
                className={`
            ${css.addButton}
            ${!props.todoInfo.text && css.disabled}
        `}
                onClick={props.onAdd}
            >
                ADD
            </button>
        </form>
    )
}

export default AddTodoForm