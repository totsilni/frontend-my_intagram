import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react"
import useSearchUser from "../../hooks/useSearchUser"
import { useRef } from "react"
import SuggestedUser from "../SuggestedUsers/SuggestedUser";

const SearchBar = () => {

    const SearchRef = useRef(null)
    const {GetUserProfile, User, isloading,setUser} = useSearchUser()
    const handleSearchUser = (e)=>{
        e.preventDefault();
        GetUserProfile(SearchRef.current.value)
    }
    console.log(User);
  return (
    <>
      <form onSubmit={handleSearchUser}  > 
        <FormControl>
            <FormLabel>Username</FormLabel>
            <Input placeholder="asaprogrammer" ref={SearchRef}/>
        </FormControl>
        <Flex w={"full"} justifyContent={"flex-end"}>
            <Button type="submit" ml={"auto"} size={"sm"} my={4} isLoading={isloading}>
                search
            </Button>
        </Flex>
      </form>
      {User && <SuggestedUser user={User} isloading={isloading} setUser={setUser}/>}
    </>
  )
}

export default SearchBar
