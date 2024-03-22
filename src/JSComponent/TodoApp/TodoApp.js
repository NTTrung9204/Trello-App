import './InputTask.js';
import InputTask from './InputTask.js';
import { useState, useEffect } from 'react';
import ListTask from './ListTask.js';
import Footer from './Footer.js';
import '../../CSS/Static.css'

function TodoApp({data_id}) {

    const [isFill, SetIsFill] = useState(true);
    const [taskList, SetTaskList] = useState(JSON.parse(localStorage.getItem(data_id + "_listTask")) || []);
    const [nameBoard, SetNameBoard] = useState(JSON.parse(localStorage.getItem(data_id + "_nameBoard")) || "Todo App" );
    const [count, SetCount] = useState(taskList.length);


    
    function updateCount(status){
        status ? SetCount(count + 1) : SetCount(count - 1);
    }

    function onChange(event){
        event.target.value ? SetIsFill(false) : SetIsFill(true);
    }

    function removeTask(event){
        const index = event.target.getAttribute('data-id');
        const newTaskList = taskList.filter((_, i) => i != index);
        SetTaskList(newTaskList);
        updateCount(false);
    }

    function addListTask(){
        const task = document.getElementById(data_id).value;
        if(task) {
            const newTaskList = [task, ...taskList];
            SetTaskList(newTaskList);
            updateCount(true);
            onChange({target: {value: false}});
            document.getElementById(data_id).value = '';
            localStorage.setItem(data_id + "_listTask", JSON.stringify(newTaskList));
        }
    }

    function clearAll(){
        if(count > 0){
            SetTaskList([]);
            SetCount(0);
        }
    }

    useEffect(() => {
        const position = JSON.parse(localStorage.getItem(data_id));
        if (position) {
            const todoApp = document.querySelector(`[data-id="${data_id}"]`);
            todoApp.style.left = position.x;
            todoApp.style.top = position.y;
        }

        document.getElementById(data_id + "_nameBoard").addEventListener('dblclick', function(event){
            const nameBoard = prompt("Enter new name: ");
            if(nameBoard){
                SetNameBoard(nameBoard);
                localStorage.setItem(data_id + "_nameBoard", JSON.stringify(nameBoard));
            }
        });
    }, []);


    return (
        <div data-id={data_id} className="todoApp">
            <h1 id={data_id + "_nameBoard"} className="headerTodo">{nameBoard}</h1>
            <InputTask data_id={data_id} onChange={onChange} onClick={addListTask} status={isFill} />
            <ListTask count={count} taskList={taskList} onClick={removeTask} />
            <Footer count={count} onClick={clearAll} />
        </div>
    )
}

export default TodoApp;