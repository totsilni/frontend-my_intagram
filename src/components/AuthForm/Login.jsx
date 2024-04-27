import { Alert, AlertIcon, Button, Input } from "@chakra-ui/react"
import { useState } from "react"
import useLogin from "../../hooks/useLogin"
const Login = () => {
    const {login, error, loading}= useLogin()
    const [inputs, setinputs] = useState({
        email: "",
        username:"",
        password: "",
    })
    const check = "gmail.com";
    const handleinputs = (e) => {
        setinputs({ ...inputs, [e.target.name]: e.target.value })
        console.log(inputs.email, inputs.password, inputs.username)
    }
    return (
        <>
            <Input placeholder='Email' name='email' fontSize={14} type='email' size={"sm"} onChange={handleinputs} />
            <Input placeholder='Password' name='password' type='password' fontSize={14} size={"sm"} onChange={handleinputs} />

            {error && (<>
                {error && (
                <Alert>
                    <AlertIcon fontSize={12} />
                    {error.message}
                    {console.log(error)}
                </Alert>)}
            </>)}

            <Button isLoading={loading}  w={"full"} onClick={()=>{login(inputs)}} colorScheme='blue' size={"sm"} fontSize={14}>
                Log in
            </Button>
        </>
    )
}

export default Login
