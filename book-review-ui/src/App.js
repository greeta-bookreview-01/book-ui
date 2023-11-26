import React from 'react'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import Keycloak from 'keycloak-js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/misc/PrivateRoute';
import Navbar from './components/misc/Navbar'
import Customer from './components/customer/Customer'
import Book from './components/staff/Book'
import { config } from './Constants'

function App() {
  const keycloak = new Keycloak({
    url: `${config.url.KEYCLOAK_BASE_URL}`,
    realm: "book-realm",
    clientId: "book-app"
  })
  const initOptions = { pkceMethod: 'S256' }

  const handleOnEvent = async (event: AuthClientEvent, error: AuthClientError | undefined) => {
    if (event === 'onAuthSuccess') {
      if (keycloak.authenticated) {
        //TODO: ignore for now
      }
    }
  }  

  const loadingComponent = (
    <div></div>
  )

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={initOptions}
      LoadingComponent={loadingComponent}
      onEvent={(event, error) => handleOnEvent(event, error)}
    >
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<PrivateRoute><Customer /></PrivateRoute>} />
        <Route path='/customer' element={<PrivateRoute><Customer /></PrivateRoute>} />
        <Route path='/book' element={<PrivateRoute><Book /></PrivateRoute>} />
      </Routes>
    </Router>
    </ReactKeycloakProvider>
  )
}

export default App
