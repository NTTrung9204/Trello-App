
function ListTask({taskList, onClick, count}) {
    if(count === 0) 
        return (
            <div className="ListTask">
                <p className="Task EmptyTask">You don't have any task!</p>
            </div>
        );
    return (
        <div className="ListTask">
            {taskList.map((task, index) => {
                return (
                    <div className="Task" key={index}>
                        <span className="TaskName">{task}</span>
                        <div data-id={index} onClick={onClick} className="Task-remove">
                        <i data-id={index} style={{fontFamily: 'Font Awesome 6 Free'}} className="fas fa-trash"></i>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ListTask;