import "./styles.css"

export const Ready = ({onClick}: {onClick: () => void}) => {
    return (
        <button onClick={onClick} className="save_button">
            Сохранить
        </button>
    )
}