import React from 'react'
import { useKeycloak } from '@react-keycloak/web'
import { NavLink } from 'react-router-dom'
import { Menu, Container, Dropdown } from 'semantic-ui-react'
import { isAdminFunc } from '../misc/Helpers'
import { getUsernameFunc } from '../misc/Helpers'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const { keycloak } = useKeycloak()
  localStorage.setItem('keycloak', JSON.stringify(keycloak))
  const navigate = useNavigate()

  const handleLogInOut = () => {
    if (keycloak.authenticated) {
      navigate('/')
      keycloak.logout()
    } else {
      keycloak.login()
    }
  }

  const getLogInOutText = () => {
    return keycloak.authenticated ? "Logout" : "Login"
  } 
  
  const getAdminMenuStyle = () => {
    return keycloak.authenticated && isAdminFunc(keycloak) ? { "display": "block" } : { "display": "none" }
  }  

  const userPageStyle = () => {
    return keycloak.authenticated ? { "display": "block" } : { "display": "none" }
  }

  const getUsername = () => {
    return getUsernameFunc(keycloak)
  } 

  return (
    <Menu>
      <Container>
        <Menu.Item header>Author Book UI</Menu.Item>
        <Menu.Item as={NavLink} to="/customer">Customer</Menu.Item>
        <Dropdown item text='Staff'>
          <Dropdown.Menu>
            <Dropdown.Item as={NavLink} to="/author" style={userPageStyle()}>Authors</Dropdown.Item>
            <Dropdown.Item as={NavLink} to="/book" style={userPageStyle()}>Books</Dropdown.Item>
            <Dropdown.Item as={NavLink} to="/wizard" style={userPageStyle()}>Author-Book Wizard</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Menu position='right'>
          {keycloak.authenticated &&
            <Dropdown text={`Hi ${getUsername()}`} pointing className='link item'>
            </Dropdown>
          }
          <Menu.Item as={NavLink} to="/login" onClick={handleLogInOut}>{getLogInOutText()}</Menu.Item>
        </Menu.Menu>           
      </Container>
    </Menu>
  )
}

export default Navbar