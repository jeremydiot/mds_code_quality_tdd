import moment from 'moment'
import {v4 as uuidv4} from 'uuid'

export default (bookingRepo, userRepo, bookRepo) => {

  const listBookings = (_, res) => {
    res.send({
      data: bookingRepo.listBookings().map(b => {
        const booking = JSON.parse(JSON.stringify(b))
        booking.rentDate = moment(booking.rentDate).format('YYYY-MM-DD')
        booking.returnDate = moment(booking.returnDate).format('YYYY-MM-DD')
        booking.user.birthDate = moment(booking.user.birthDate).format('YYYY-MM-DD')
        return booking
      })
    })
  }

  const createBooking = (req, res) => {

    // check missing or empty fields
    if(
      Object.values(req.body).includes('') ||
      Object.values(req.body).includes(undefined) ||
      Object.values(req.body).includes(null) ||
      !Object.keys(req.body).includes('item') ||
      !Object.keys(req.body).includes('rentDate') ||
      !Object.keys(req.body).includes('user')
    ){
      return res.status(400).send({
        error: {
          message: 'Tous les champs doivent être renseignés'
        }
      })
    }

    const data = {}
    
    data.rentDate = new moment(req.body.rentDate, 'YYYY-MM-DD', true)
    // check date
    if(isNaN(data.rentDate)){
      return res.status(400).send({
        error: {
          message: 'Date de location incorrecte : format attendu YYYY-MM-DD'
        }
      })
    }

    data.id = uuidv4()

    data.user = userRepo.findUser(req.body.user)
    // check not found user
    if (data.user === null){
      return res.status(404).send({
        error: {
          message: 'Aucun utilisateur ne correspond à l\identifiant'
        }
      })
    }

    data.item = bookRepo.findBook(req.body.item)
    // check not found book
    if (data.item === null){
      return res.status(404).send({
        error: {
          message: 'Aucun livre ne correspond à l\identifiant'
        }
      })
    }

    if (bookingRepo.listBookings().find(b => b.item.isbn13 === req.body.item)){
      return res.status(400).send({
        error: {
          message: `Livre ${req.body.item} déjà loué`
        }
      })
    }

    const booking = JSON.parse(JSON.stringify(bookingRepo.createBooking(data)))

    booking.rentDate = moment(booking.rentDate).format('YYYY-MM-DD')
    booking.user.birthDate = moment(booking.user.birthDate).format('YYYY-MM-DD')

    res.status(201).send({
      data: booking
    })
  }

  const getBooking = (req, res) => {
    const id = req.params.id
    const booking = JSON.parse(JSON.stringify(bookingRepo.findBooking(id)))

    if(booking){
      booking.rentDate = moment(booking.rentDate).format('YYYY-MM-DD')
      booking.returnDate = moment(booking.returnDate).format('YYYY-MM-DD')
      booking.user.birthDate = moment(booking.user.birthDate).format('YYYY-MM-DD')
      return res.send({
        data: booking
      })
    }

    res.status(404).send({
      error:{
        message: `Booking ${id} not found`
      }
    })
  }

  const updateBooking = (req, res) => {
    const id = req.params.id
    const data = {}

    // check missing or empty fields
    if(
      Object.values(req.body).includes('') ||
      Object.values(req.body).includes(undefined) ||
      Object.values(req.body).includes(null) ||
      !Object.keys(req.body).includes('item') ||
      !Object.keys(req.body).includes('rentDate') ||
      !Object.keys(req.body).includes('user')
    ){
      return res.status(400).send({
        error: {
          message: 'Tous les champs doivent être renseignés'
        }
      })
    }

    data.rentDate = new moment(req.body.rentDate, 'YYYY-MM-DD', true)
    // check rentdate
    if(isNaN(data.rentDate)){
      return res.status(400).send({
        error: {
          message: 'Date de location incorrecte : format attendu YYYY-MM-DD'
        }
      })
    }

    if(req.body.returnDate !== undefined){
      data.returnDate = new moment(req.body.returnDate, 'YYYY-MM-DD', true)
      // check returndate
      if(isNaN(data.returnDate)){
        return res.status(400).send({
          error: {
            message: 'Date de retour incorrecte : format attendu YYYY-MM-DD'
          }
        })
      }
      
      if(data.rentDate > data.returnDate){
        return res.status(400).send({
          error: {
            message: 'La date de retour doit être postérieure à la date de location'
          }
        })
      }
    }

    data.user = userRepo.findUser(req.body.user)
    // check not found user
    if (data.user === null){
      return res.status(404).send({
        error: {
          message: 'Aucun utilisateur ne correspond à l\identifiant'
        }
      })
    }

    data.item = bookRepo.findBook(req.body.item)
    // check not found book
    if (data.item === null){
      return res.status(404).send({
        error: {
          message: 'Aucun livre ne correspond à l\identifiant'
        }
      })
    }

    const booking = JSON.parse(JSON.stringify(bookingRepo.updateBooking(id, data)))

    if(booking){
      booking.rentDate = moment(booking.rentDate).format('YYYY-MM-DD')
      booking.user.birthDate = moment(booking.user.birthDate).format('YYYY-MM-DD')
      if(booking.returnDate) booking.returnDate = moment(booking.returnDate).format('YYYY-MM-DD')

      return res.send({
        data: booking
      })
    }

    res.status(404).send({
      error: {
        message: `Booking ${id} not found`
      }
    })
  }


  const deleteBooking = (req, res) => {
    const id = req.params.id
    const deletedBooking = JSON.parse(JSON.stringify(bookingRepo.deleteBooking(id)))

    if(deletedBooking){
      deletedBooking.rentDate = moment(deletedBooking.rentDate).format('YYYY-MM-DD')
      deletedBooking.user.birthDate = moment(deletedBooking.user.birthDate).format('YYYY-MM-DD')
      if(deletedBooking.returnDate) deletedBooking.returnDate = moment(deletedBooking.returnDate).format('YYYY-MM-DD')

      return res.send({
        meta: {
          _deleted: deletedBooking
        }
      })
    }

    res.status(404).send({
      error: {
        message: `Booking ${id} not found`
      }
    })
  }

  return {
    listBookings, 
    createBooking, 
    updateBooking, 
    getBooking, 
    deleteBooking
  }
}