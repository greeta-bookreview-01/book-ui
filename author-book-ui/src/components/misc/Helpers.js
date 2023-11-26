export const getKeycloak = () => {
  return JSON.parse(localStorage.getItem('keycloak'))
}

export const isAdminFunc = (keycloak) => {
  return keycloak && 
         keycloak.tokenParsed &&
         keycloak.tokenParsed.resource_access['book-app'] &&
         keycloak.tokenParsed.resource_access['book-app'].roles.includes('BOOK_MANAGER')
}

export const getUsernameFunc = (keycloak) => {
  return keycloak.tokenParsed.preferred_username
}

export const isUserFunc = (keycloak) => {
  return keycloak && 
         keycloak.tokenParsed &&
         keycloak.tokenParsed.resource_access['book-app'] &&
         keycloak.tokenParsed.resource_access['book-app'].roles.includes('BOOK_USER')
}

export const handleLogError = (error) => {
  if (error.response) {
    console.log(error.response.data);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log(error.message);
  }
}