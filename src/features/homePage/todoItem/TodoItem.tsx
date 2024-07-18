import { TTodo } from '../_t/TTodo'
import { FaRegTrashCan, FaPenClip } from "react-icons/fa6"
import { MdOutlineStarPurple500, MdOutlineStarOutline } from "react-icons/md"
import { isTodoCompleted } from './_utils/isTodoCompleted'
import { isTodoImportant } from './_utils/isTodoImportant'

import css from './TodoItem.module.css'

type Props = {
    todo: TTodo
    onDelete: () => void
    onEdit: () => void
    onChangeCheckbox: (e) => void
    onClickImportantIcon: () => void
}

const TodoItem = (props: Props) => {
    return (
        <div className={css.wrapper}>
            <div className={css.todoItem}>
                <div className={css.checkbox}>
                    <input 
                        type='checkbox'
                        checked={props.todo.completed} // primarne 'props.todo.completed' je boolean ale z api chodi response ako string

                        onChange={(e) => props.onChangeCheckbox(e)}
                    />
                </div>
                <div 
                    className={`
                        ${css.text}
                        ${props.todo.completed && css.completed}
                    `}
                    title={props.todo.text}
                >
                    {props.todo.text || ''}
                </div>
                <div 
                    className={css.editIcon}
                    onClick={props.onEdit}
                >
                    <FaPenClip />
                </div>
                <div 
                    className={css.importantIcon}
                    onClick={props.onClickImportantIcon}
                >
                    {props.todo.important
                        ? <MdOutlineStarPurple500 className={css.filled} />
                        : <MdOutlineStarOutline />
                    }
                </div>
            </div>
            <div 
                className={css.deleteIcon}
                onClick={props.onDelete}
            >
                <FaRegTrashCan />
            </div>
        </div>
    )
}

export default TodoItem