import css from './TodoForm.module.css' 

type Props = {
    onSubmit: (e) => void
    onChangeText: (e) => void
    text: string
    onClickButton: () => void
    btnTitle: string
}

const TodoForm = (props: Props) => {
    return (
        <form
            className={css.formAddText}
            onSubmit={(e) => props.onSubmit(e)}
        >
            <input
                type='text'
                placeholder='Enter text here...'
                value={props.text || ''}
                onChange={e => props.onChangeText(e)}

            />
            <button
                type='button'
                className={`
            ${css.addButton}
            ${!props.text && css.disabled}
        `}
                onClick={props.onClickButton}
            >
                {props.btnTitle || ''}
            </button>
        </form>
    )
}

export default TodoForm