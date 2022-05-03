function ControlPanel({props}) {
    console.log(props.state.isLogged, 'adlogin')
    return ( 
        <div>
            <div className="text-3xl">ControlPanel</div>
            <button className="w-1/12 h-10 rounded-md bg-lime-300" onClick={()=>{props.isLogged(!props.state.isLogged)}}>LogOut</button>
        </div>
     );
}

export default ControlPanel;