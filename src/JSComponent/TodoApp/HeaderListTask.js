export default function HeaderListTask({todoAppList}){
    const nameBoardList = []
    todoAppList.forEach((data_id) => {
        nameBoardList.push(JSON.parse(localStorage.getItem(data_id + "_nameBoard")));
    });

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