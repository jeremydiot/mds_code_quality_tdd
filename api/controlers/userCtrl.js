import moment from 'moment'
import {v4 as uuidv4} from 'uuid';

export default (userRepo) => {

  const listUsers = (_, res) => {
    res.send({
      data: userRepo.listUsers().map(u =>{
        const user = JSON.parse(JSON.stringify(u))
        user.birthDate = moment(user.birthDate).format('YYYY-MM-DD')
        return user
      })
    })
  }

  const createUser = (req, res) => {
    const data = req.body

    data.birthDate = new moment(data.birthDate, "YYYY-MM-DD", true)
    
    // check missing or empty fields
    if(
      Object.values(data).includes('') ||
      Object.values(data).includes(undefined) ||
      Object.values(data).includes(null) ||
      !Object.keys(data).includes('lastName') ||
      !Object.keys(data).includes('firstName') ||
      !Object.keys(data).includes('birthDate') ||
      !Object.keys(data).includes('address') ||
      !Object.keys(data).includes('phone') ||
      !Object.keys(data).includes('email') 
    ){
      return res.status(400).send({
        error: {
          message: 'Tous les champs doivent être renseignés'
        }
      })
    }

    // check date
    if(isNaN(data.birthDate)){
      return res.status(400).send({
        error: {
          message: 'Date de naissance incorrecte : format attendu YYYY-MM-DD'
        }
      })
    }
    
    // check phone number
    if(!/^(0|\+33|0033)[1-9][0-9]{8}$/.test(data.phone)){
      return res.status(400).send({
        error: {
          message: 'Numéro de téléphone incorrecte : format attendu (+33 ou 0 ou 0033) suivi de 9 chiffres'
        }
      })
    }

    // check email
    if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(data.email)){
      return res.status(400).send({
        error: {
          message: 'Email incorrect : format attendu prenom.nom@mail.com'
        }
      })
    }

    data.id = uuidv4()

    const user = JSON.parse(JSON.stringify(userRepo.createUser(data)))

    user.birthDate = moment(user.birthDate).format('YYYY-MM-DD')

    res.status(201).send({
      data:user
    })
  }

  const updateUser = (req, res) => {
    const data = req.body
    const id = req.params.id
    
    data.birthDate = new moment(data.birthDate, "YYYY-MM-DD", true)
    
    // check missing or empty fields
    if(
      Object.values(data).includes('') ||
      Object.values(data).includes(undefined) ||
      Object.values(data).includes(null) ||
      !Object.keys(data).includes('lastName') ||
      !Object.keys(data).includes('firstName') ||
      !Object.keys(data).includes('birthDate') ||
      !Object.keys(data).includes('address') ||
      !Object.keys(data).includes('phone') ||
      !Object.keys(data).includes('email') 
    ){
      return res.status(400).send({
        error: {
          message: 'Tous les champs doivent être renseignés'
        }
      })
    }

    // check date
    if(isNaN(data.birthDate)){
      return res.status(400).send({
        error: {
          message: 'Date de naissance incorrecte : format attendu YYYY-MM-DD'
        }
      })
    }
    
    // check phone number
    if(!/^(0|\+33|0033)[1-9][0-9]{8}$/.test(data.phone)){
      return res.status(400).send({
        error: {
          message: 'Numéro de téléphone incorrecte : format attendu (+33 ou 0 ou 0033) suivi de 9 chiffres'
        }
      })
    }

    // check email
    if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(data.email)){
      return res.status(400).send({
        error: {
          message: 'Email incorrect : format attendu prenom.nom@mail.com'
        }
      })
    }

    const user = JSON.parse(JSON.stringify(userRepo.updateUser(id, data)))

    
    if(user){
      user.birthDate = moment(user.birthDate).format('YYYY-MM-DD')
      return res.send({
        data: user
      })
    }

    res.status(404).send({
      error: {
        message: `User ${id} not found`
      }
    })
  }

  const getUser = (req, res) => {
    const id = req.params.id
    const user = JSON.parse(JSON.stringify(userRepo.findUser(id)))

    if(user){
      user.birthDate = moment(user.birthDate).format('YYYY-MM-DD')
      return res.send({
        data: user
      })
    }

    res.status(404).send({
      error: {
        message: `User ${id} not found`
      }
    })

  }

  const deleteUser = (req, res) => {
    const id = req.params.id
    const deletedUser = JSON.parse(JSON.stringify(userRepo.deleteUser(id)))

    if(deletedUser){
      deletedUser.birthDate = moment(deletedUser.birthDate).format('YYYY-MM-DD')
      return res.send({
        meta: {
          _deleted: deletedUser
        }
      })
    }

    res.status(404).send({
      error: {
        message: `User ${id} not found`
      }
    })
  }

  return {
    listUsers,
    createUser,
    updateUser, 
    getUser,
    deleteUser
  }
}