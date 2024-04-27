import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Alert, AlertIcon, Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useState } from "react"
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword"

const Signup = () => {
    const { loading, error, signup } = useSignUpWithEmailAndPassword()
    const [inputs, setinputs] = useState({
        fullname: "",
        username: "",
        email: "",
        password: "",
    })
    const [showPassword, setshowPassword] = useState(false)
    const handleinputs = (e) => {
        setinputs({ ...inputs, [e.target.name]: e.target.value })
    }
    return (
        <>
            <Input placeholder='Email' name='email' fontSize={14} type='email' size={"sm"} onChange={handleinputs} />
            <Input placeholder='Username' name='username' fontSize={14} type='text' size={"sm"} onChange={handleinputs} />
            <Input placeholder='Fullname' name='fullname' fontSize={14} type='text' size={"sm"} onChange={handleinputs} />
            <InputGroup>
                <Input placeholder='Password' name='password' type={showPassword ? "text" : "password"} fontSize={14} onChange={handleinputs} size={"sm"} />
                <InputRightElement h={"full"} >
                    <Button variant={"ghost"} size={"sm"} onClick={() => { setshowPassword(!showPassword) }}>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                </InputRightElement>
            </InputGroup>
            {error && (
                <Alert>
                    <AlertIcon fontSize={12} />
                    {error.message}
                    {console.log(error)}
                </Alert>)}
            <Button w={"full"} colorScheme='blue' size={"sm"} fontSize={14} isLoading={loading} onClick={() => signup(inputs)}>
                Sign up
            </Button>
        </>
    )
}

export default Signup
