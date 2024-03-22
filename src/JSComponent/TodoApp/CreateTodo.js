export default function CreateTodo({onClick}) {
    return(
        <button onClick={onClick} id="createTodo">
                <i className="fas fa-plus"></i>
        </button>
    )
}