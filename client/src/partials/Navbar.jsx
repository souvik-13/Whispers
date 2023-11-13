const Navbar = () => {
  return (
    <div className="flex justify-between px-5 bg-slate-500 mb-1" >
      <h1 className="text-2xl font-bold text-gray-800" >Navbar</h1>
      <div className="flex justify-evenly space-x-5" >
        <a className="text-gray-800 hover:text-blue-400 no-underline text-xl" href="/" >Home</a>
        <a className="text-gray-800 hover:text-blue-400 no-underline text-xl" href="/register" >Register</a>
        <a className="text-gray-800 hover:text-blue-400 no-underline text-xl" href="/login" >Login</a>
        <a className="text-gray-800 hover:text-blue-400 no-underline text-xl" href="/secrets" >Secrets</a>
        <a className="text-gray-800 hover:text-blue-400 no-underline text-xl" href="/submit" >Submit</a>
        <a className="text-gray-800 hover:text-blue-400 no-underline text-xl" href="/logout" >Logout</a>
        </div>
    </div>
  )
}

export default Navbar
