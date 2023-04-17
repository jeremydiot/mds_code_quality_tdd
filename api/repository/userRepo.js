export default (User) =>{
  const users = [
    new User('5793ee17-5d65-4e73-92fd-6c4d9fef96a8', 'GOUPIL', 'Alban', new Date(1995, 11, 17), '3 rue des aubépines 44300 Nantes', '+33634689374', 'alban.goupil@gmail.com'),
    new User('fe523f18-6b19-44e0-b156-446edc0e6862', 'GROLLIER', 'Théo', new Date(1989, 3, 4), '18 boulevard des trois croix 35000 Rennes', '0657836652', 'theo.grollier@gmail.com'),
    new User('63dcff89-47c5-4365-875d-8934a250d0fe', 'BLANCHARD', 'Hugo', new Date(1996, 6, 31), '14 allée de l\'oseraie 94260 fresnes', '0033678398215', 'hugo.blanchard@gmail.com')
  ];

  const listUsers = () => {
    return users;
  }

  const createUser = (user) => {
   //TODO to implement 
  }

  const findUser = (id) => {
    //TODO to implement 
  }

  const updateUser = (user) => {
    //TODO to implement 
  }

  const deleteUser = (user) => {
    //TODO to implement 
  }

  return {
    listUsers,
    createUser,
    findUser,
    updateUser,
    deleteUser
  };
}