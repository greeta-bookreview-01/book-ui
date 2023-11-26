import React from 'react'
import { useKeycloak } from '@react-keycloak/web'
import { NavLink } from 'react-router-dom'
import { AppBar, Toolbar, Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
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

  const useStyles = makeStyles(theme => ({
    link: {
      marginLeft: theme.spacing(3),
      color: 'white'
    },
  }))

  const classes = useStyles()

  return (
    <AppBar position="static">
      <Container maxWidth='md'>
        <Toolbar variant="dense">
          <Typography variant="h6">Book Review UI</Typography>
          <Typography>
            <NavLink to='/customer' className={classes.link} style={userPageStyle()}>Customer</NavLink>
          </Typography>
          <Typography>
            <NavLink to='/book' className={classes.link} style={userPageStyle()}>Book</NavLink>
          </Typography>          
          <Typography>
            <NavLink to='/login' className={classes.link} onClick={handleLogInOut}>{getLogInOutText()}</NavLink>
          </Typography>          
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar