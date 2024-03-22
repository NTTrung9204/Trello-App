

function InputTask({onChange, status, onClick, data_id}) {
    
    return (
        <div className="InputTask">
            <input id={data_id} onChange={onChange} className="InputForm" placeholder="Add your new todo"></input>
            <span onClick={onClick} className={`AddButton ${status? 'Blur': ''}`}>+</span>
        </div>
    )
}

export default InputTask;