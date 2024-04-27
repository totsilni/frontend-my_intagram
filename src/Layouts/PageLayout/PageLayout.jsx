import { Box, Flex, Spinner } from '@chakra-ui/react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useLocation } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase/firebase'
import Navbar from '../../components/Navbar/Navbar'

// Instead of adding the sidebar component to everypage, we can add it only once to the pagelayout component and wrap the childer with it. this wat, we have a siderbar on everypage excapt the authpage...


const PageLayout = ({ children }) => {
    const { pathname } = useLocation()
    const [user, loading, error] = useAuthState(auth);
    const canRenderSideBar = pathname !== "/auth" && user;
    const canRenderNavBar = !user && !loading && pathname !== "/auth";
    const checkingUserIsAuth = !user && loading;
    if(checkingUserIsAuth){
        return (<>
            <PageLayoutSpinner />
        </>)
    }

    return (
        <>
            <Flex flexDir={canRenderNavBar ? "column" : "row"}>
                {/* Side Bar on the left  */}
                {canRenderSideBar ? (
                    <Box w={{ base: "70px", md: "240px" }}>
                        <Sidebar />
                    </Box>
                ) : null}
                {/* NavBar */}
                {canRenderNavBar ? <Navbar /> : null}

                {/* the page content  Bar on the Right */}
                <Box flex={1} w={{base:"calc(100% - 70px)", md:"calc(100% - 240px)"}} mx={"auto"}>
                    {children}
                </Box>
            </Flex>
        </>
    )
}

export default PageLayout

const PageLayoutSpinner = ()=>{
    return (<Flex flexDir={"column"} h={"100vh"} alignItems={"center"} justifyContent={"center"}>
        <Spinner size={"xl"}/>
    </Flex>)
}