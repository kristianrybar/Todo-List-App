import css from './LoadingCircle.module.css'

type Props = {
    size: number
    loadingColor: string
}

const LoadingCircle = (props: Props) => {
    return (
        <div
            className={css.circle}
            style={{
                width: `${props.size || 9}rem`,
                height: `${props.size || 9 }rem`,
                borderColor: props.loadingColor || '',
            }}
        >
            <div
                className={css.loader}
                style={{
                    borderColor: 'transparent',
                    borderTopColor: props.loadingColor || '', 
                    borderRightColor: props.loadingColor || '',
                }}
            ></div>
        </div>
    )
}


export default LoadingCircle