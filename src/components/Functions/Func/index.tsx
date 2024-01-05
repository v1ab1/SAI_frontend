import "./styles.css"

export const Func = ({text, isActive}: {text: string; isActive: boolean}) => {
    const styles = {
        backgroundColor: isActive ? 'rgb(0, 110, 219)' : undefined, 
        color: isActive ? 'white' : undefined
    }
    
    return (
        <div className="func" style={styles}>
            {text}
        </div>
    )
}