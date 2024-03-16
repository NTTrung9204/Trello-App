
function Footer({count, onClick}) {
    return (
        <div className="Footer">
            <p>You have {count} pending tasks</p>
            <button onClick={onClick} className={`ClearButton ${count? '' : 'Blur'}`}>Clear All</button>
        </div>
    )
}

export default Footer;