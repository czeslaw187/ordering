function AdminLogin({props}) {
    console.log(props.state.isLogged, 'adlogin')
    return ( 
        <div className="bg-gradient-to-tr from-sky-400 to-lime-500 w-screen h-screen flex-row">
            <form className="flex flex-col w-3/12 h-2/6 justify-center mx-auto">
                <label className="font-serif text-lg mt-5" htmlFor="login">Login</label>
                <input className="pl-2 h-10 rounded-md" type="text" name="login" id="name" required={true} />
                <label className="font-serif text-lg mt-5" htmlFor="password">Password</label>
                <input className="pl-2 h-10 rounded-md" type="password" name="password" id="password" required={true} />
                <input type="submit" onClick={(e)=>{e.preventDefault(); props.isLogged(!props.state.isLogged)}} value={'Submit'} className="w-4/12 h-10 rounded-md text-center text-lg bg-lime-300 mx-auto mt-7" />
            </form>
        </div>
     );
}

export default AdminLogin;