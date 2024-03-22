import { useEffect } from "react"

export default function DeleteTodo() {
    useEffect(() => {
        const deleteTodo = document.getElementsByClassName("deleteTodo")[0];
        deleteTodo.addEventListener('click', function(event){
            document.getElementsByClassName("dangerousZone")[0].classList.toggle("dangerousZone__SwitchActive");
        });
    }, []);

    return(
        <button className="deleteTodo">
                <i className="fas fa-trash"></i>
        </button>
    )
}