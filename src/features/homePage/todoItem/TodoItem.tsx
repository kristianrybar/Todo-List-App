import { TTodo } from '../_t/TTodo'
import { FaRegTrashCan, FaPenClip } from "react-icons/fa6"
import { RxCross2 } from "react-icons/rx";
import { MdOutlineStarPurple500, MdOutlineStarOutline } from "react-icons/md";




import css from './TodoItem.module.css'

type Props = {
    todo: TTodo
    onDelete: () => void
}

const TodoItem = (props: Props) => {
    return (
        <div className={css.wrapper}>
            <div className={css.todoItem}>
                <div className={css.completed}>
                    <input 
                        type='checkbox'
                    />
                </div>
                <div 
                    className={css.text}
                    title={props.todo.text}
                >
                    {props.todo.text}
                </div>
                <div className={css.edit}>
                    <FaPenClip />
                </div>
                <div className={css.important}>
                    <MdOutlineStarOutline />
                </div>
            </div>
            <div 
                className={css.delete}
                onClick={props.onDelete}
            >
                <FaRegTrashCan />
            </div>
        </div>
    )
}

export default TodoItem