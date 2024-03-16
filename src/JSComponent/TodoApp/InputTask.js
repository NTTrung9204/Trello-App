

function InputTask({onChange, status, onClick}) {
    
    return (
        <div className="InputTask">
            <input onChange={onChange} className="InputForm" placeholder="Add your new todo"></input>
            <span onClick={onClick} className={`AddButton ${status? 'Blur': ''}`}>+</span>
        </div>
    )
}

export default InputTask;