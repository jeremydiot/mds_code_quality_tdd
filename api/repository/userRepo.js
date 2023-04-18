export default (User) => {
  const users = [
    new User('5793ee17-5d65-4e73-92fd-6c4d9fef96a8', 'GOUPIL', 'Alban', new Date(1995, 11, 17), '3 rue des aubépines 44300 Nantes', '+33634689374', 'alban.goupil@gmail.com'),
    new User('fe523f18-6b19-44e0-b156-446edc0e6862', 'GROLLIER', 'Théo', new Date(1989, 3, 4), '18 boulevard des trois croix 35000 Rennes', '0657836652', 'theo.grollier@gmail.com'),
    new User('63dcff89-47c5-4365-875d-8934a250d0fe', 'BLANCHARD', 'Hugo', new Date(1996, 6, 31), '14 allée de l\'oseraie 94260 fresnes', '0033678398215', 'hugo.blanchard@gmail.com')
  ]

  const listUsers = () => {
    return users
  }

  const createUser = (user) => {
   users.push(new User(
    user.id,
    user.lastName,
    user.firstName,
    user.birthDate,
    user.address,
    user.phone,
    user.email
   ))
   return user
  }

  const findUser = (id) => {
    return users.find(user => user.id === id) || null
  }

  const updateUser = (id ,user) => {
    let foundUserIdx = users.findIndex(u => u.id === id)

    if(foundUserIdx > -1){
      users[foundUserIdx] = new User(
        id,
        user.lastName,
        user.firstName,
        user.birthDate,
        user.address,
        user.phone,
        user.email
      )
      return users[foundUserIdx]
    }
    return null
  }

  const deleteUser = (id) => {
    let userToDeleteIndex = users.findIndex(u => u.id === id)
    
    if(userToDeleteIndex < 0) return null
    
    let deletedUser = users.splice(userToDeleteIndex, 1)
    return deletedUser[0]
  }

  return {
    listUsers,
    createUser,
    findUser,
    updateUser,
    deleteUser
  }
}