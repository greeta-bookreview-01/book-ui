import React from 'react'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import Keycloak from 'keycloak-js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Customer from './components/customer/Customer'
import Author from './components/staff/Author'
import Book from './components/staff/Book'
import Navbar from './components/misc/Navbar'
import AuthorBookWizard from './components/wizard/AuthorBookWizard'
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
    <Dimmer inverted active={true} page>
      <Header style={{ color: '#4d4d4d' }} as='h2' icon inverted>
        <Icon loading name='cog' />
        <Header.Content>Keycloak is loading
          <Header.Subheader style={{ color: '#4d4d4d' }}>or running authorization code flow with PKCE</Header.Subheader>
        </Header.Content>
      </Header>
    </Dimmer>
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
          <Route path='/' element={<Customer />} />
          <Route path='/customer' element={<Customer />} />
          <Route path='/author' element={<Author />} />
          <Route path='/book' element={<Book />} />
          <Route path='/wizard' element={<AuthorBookWizard />} />
        </Routes>
      </Router>
    </ReactKeycloakProvider>      
  )
}

export default App
