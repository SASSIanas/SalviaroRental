import React from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {

    const {setShowLogin ,axios , setToken, navigate} = useAppContext()

    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [role, setRole] = React.useState("user");
    const [rentalBusinessName, setRentalBusinessName] = React.useState("");
    const [rentalAddress, setRentalAddress] = React.useState("");

    const onSubmitHandler = async (event)=>{
        try {
            event.preventDefault();
            const requestData = {name, email, password};
            
            // Add rental business info if registering as owner
            if (state === "register" && role === "owner") {
                requestData.role = role;
                requestData.rentalBusinessName = rentalBusinessName;
                requestData.rentalAddress = rentalAddress;
            }

            const {data} = await axios.post(`/api/user/${state}`, requestData)

            if (data.success) {
                navigate('/')
                setToken(data.token)
                localStorage.setItem('token', data.token)
                setShowLogin(false)
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div onClick={() => setShowLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center
    text-sm text-gray-600 bg-black/50'>
            <form onSubmit={onSubmitHandler} onClick={(e)=>e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[400px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white">
                <p className="text-2xl font-medium m-auto">
                    <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
                </p>
                {state === "register" && (
                    <>
                        <div className=" w-full">
                            
                            <input onChange={(e) => setName(e.target.value)} value={name} 
                            placeholder="Name" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" 
                            type="text" required />
                        </div>
                        
                        {/* Role Selection */}
                        <div className="w-full">
                            <p>Register as</p>
                            <div className="flex gap-4 mt-2">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="user"
                                        checked={role === "user"}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="mr-2"
                                    />
                                    Client
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="owner"
                                        checked={role === "owner"}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="mr-2"
                                    />
                                    Car Owner
                                </label>
                            </div>
                        </div>

                        {/* Rental Business Fields - Only show for owner */}
                        {role === "owner" && (
                            <>
                                <div className="w-full">
                                    
                                    <input 
                                        onChange={(e) => setRentalBusinessName(e.target.value)} 
                                        value={rentalBusinessName} 
                                        placeholder="Your rental business name" 
                                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" 
                                        type="text" 
                                        required 
                                    />
                                </div>
                                <div className="w-full">
                                    
                                    <input 
                                        onChange={(e) => setRentalAddress(e.target.value)} 
                                        value={rentalAddress} 
                                        placeholder="Business address" 
                                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" 
                                        type="text" 
                                        required 
                                    />
                                </div>
                            </>
                        )}
                    </>
                )}
                <div className="w-full ">
                    
                    <input onChange={(e) => setEmail(e.target.value)} value={email} 
                    placeholder="example@email.com" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" 
                    type="email" required />
                </div>
                <div className="w-full ">
                    
                    <input onChange={(e) => setPassword(e.target.value)} value={password} 
                    placeholder="Password" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" 
                    type="password" required />
                </div>
                {state === "register" ? (
                    <p>
                        Already have account? <span onClick={() => setState("login")} className="text-primary cursor-pointer">click here</span>
                    </p>
                ) : (
                    <p>
                        Create an account? <span onClick={() => setState("register")} className="text-primary cursor-pointer">click here</span>
                    </p>
                )}
                <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
                    {state === "register" ? "Create Account" : "Login"}
                </button>
            </form>
        </div>
    )
}

export default Login