import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { store } from './app/store'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'

const styles = {
  global: (props) => ({
    body: {
      bg: mode('gray.100', "#000")(props),
      color: mode("gray.800", "whiteAlpha.900")(props)
    }
  })
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}
// Extend the theme 
const theme = extendTheme({ config, styles })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
