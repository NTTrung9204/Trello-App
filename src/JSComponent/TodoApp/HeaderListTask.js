import { useEffect } from "react";

export default function HeaderListTask({todoAppList}){
    const nameBoardList = []
    todoAppList.forEach((data_id) => {
        nameBoardList.push(JSON.parse(localStorage.getItem(data_id + "_nameBoard")));
    });

    useEffect(() => {
        const HeaderItems = document.getElementsByClassName("headerItem")
        Array.from(HeaderItems).forEach((headerItem, index) => {
            headerItem.addEventListener('click', function(event){
                const hidenTodoApp = document.getElementsByClassName("todoApp")[index];
                hidenTodoApp.classList.toggle("todoApp__SwitchHiden");
                headerItem.classList.toggle("headerItem__SwitchActive");
            });
        });

    }, []);

    return(
        <div id="headerListTask">
            {
                nameBoardList.map((nameBoard, index) => {
                    return <button key={index} className="headerItem">
                        <span>{nameBoard}</span>
                    </button>
                })
            }
        </div>
    )
}