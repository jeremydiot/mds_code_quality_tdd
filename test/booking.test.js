import chai from 'chai'
import chaiHttp from 'chai-http'
import api from '../index.js'

chai.use(chaiHttp)

describe('Bookings', function(){
  it('GET /bookings should return a success response with all bookings', function(done){
    chai.request(api)
    .get('/bookings')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200)
      chai.expect(res.body).to.deep.equal({
        data : [
          {
            id: "4f27236a-c68c-4489-b3e7-bf7dd49a546a",
            item: {
              authors: "Richard C. Lee, William M. Tepfenhart",
              editor: "CampusPress",
              isbn13: "9782744005084",
              langCode: "FR",
              price: 29.95,
              title: "UML et C++"
            },
            rentDate: "2023-02-22",
            returnDate: "2023-03-17",
            user: {
              address: "3 rue des aubépines 44300 Nantes",
              birthDate: "1995-12-17",
              email: "alban.goupil@gmail.com",
              firstName: "Alban",
              id: "5793ee17-5d65-4e73-92fd-6c4d9fef96a8",
              lastName: "GOUPIL",
              phone: "+33634689374"
            }
          },
          {
            id: "c756e63d-5d36-459b-bf17-aee880a20371",
            item: {
              authors: "Richard C. Lee, William M. Tepfenhart",
              editor: "CampusPress",
              isbn13: "9782744005084",
              langCode: "FR",
              price: 29.95,
              title: "UML et C++"
            },
            rentDate: "2023-01-05",
            returnDate: "2023-04-18",
            user: {
              address: "3 rue des aubépines 44300 Nantes",
              birthDate: "1995-12-17",
              email: "alban.goupil@gmail.com",
              firstName: "Alban",
              id: "5793ee17-5d65-4e73-92fd-6c4d9fef96a8",
              lastName: "GOUPIL",
              phone: "+33634689374"
            }
          },
          {
            id: "6dd0ee02-e30f-4032-98fe-f12c5708b78c",
            item: {
              authors: "Roberts Simon",
              editor: "Sybex Inc",
              isbn13: "9780782140774",
              langCode: "EN",
              price: 1,
              title: "Complete Java 2 Certification Study Guide"
            },
            rentDate: "2023-04-04",
            returnDate: "2023-06-14",
            user: {
              address: "14 allée de l'oseraie 94260 fresnes",
              birthDate: "1996-07-31",
              email: "hugo.blanchard@gmail.com",
              firstName: "Hugo",
              id: "63dcff89-47c5-4365-875d-8934a250d0fe",
              lastName: "BLANCHARD",
              phone: "0033678398215",
            }
          }
        ]
      })
      done()
    })
  })

  it('POST /bookings should create the booking and return a success response with the booking', function(done){
    const booking = {
      item:  "9782746035966",
      rentDate: "2023-04-04",
      user: "fe523f18-6b19-44e0-b156-446edc0e6862"
    }
    chai.request(api)
    .post('/bookings')
    .send(booking)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(201)
      chai.expect(res.body.data.rentDate).to.equal(booking.rentDate)
      chai.expect(res.body.data.item.isbn13).to.equal(booking.item)
      chai.expect(res.body.data.user.id).to.equal(booking.user)
      chai.expect(res.body.data).to.have.property('id')
      chai.expect(res.body.data.id).to.have.lengthOf(36)
      done()
    })
  })
  it('POST /bookings should return a bad request if rentdate is malformed', function(done){
    const booking = {
      item:  "9782746035966",
      rentDate: "20230404",
      user: "fe523f18-6b19-44e0-b156-446edc0e6862"
    }
    chai.request(api)
    .post('/bookings')
    .send(booking)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(400)
      chai.expect(res.body).to.deep.equal({
      error: {
        message: 'Date de location incorrecte : format attendu YYYY-MM-DD'
      }
      })
      done()
    })
  })
  it('POST /bookings should return a not found if book does not exist', function(done){
    const booking = {
      item:  "123456",
      rentDate: "2023-04-04",
      user: "fe523f18-6b19-44e0-b156-446edc0e6862"
    }
    chai.request(api)
    .post('/bookings')
    .send(booking)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404)
      chai.expect(res.body).to.deep.equal({
      error: {
        message: 'Aucun livre ne correspond à l\identifiant'
      }
      })
      done()
    })
  })
  it('POST /bookings should return a not found if user does not exist', function(done){
    const booking = {
      item:  "9782746035966",
      rentDate: "2023-04-04",
      user: "123456"
    }
    chai.request(api)
    .post('/bookings')
    .send(booking)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404)
      chai.expect(res.body).to.deep.equal({
      error: {
        message: 'Aucun utilisateur ne correspond à l\identifiant'
      }
      })
      done()
    })
  })
  it('POST /bookings should return a bad request if there is a empty field', function(done){
    const booking = {
      item:  "9782746035966",
      rentDate: "",
      user: "123456"
    }
    chai.request(api)
    .post('/bookings')
    .send(booking)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(400)
      chai.expect(res.body).to.deep.equal({
      error: {
        message: 'Tous les champs doivent être renseignés'
      }
      })
      done()
    })
  })
  it('POST /bookings should return a bad request if book is already rented', function(done){
    const booking = {
      item:  "9782746035966",
      rentDate: "2023-04-04",
      user: "fe523f18-6b19-44e0-b156-446edc0e6862"
    }
    chai.request(api)
    .post('/bookings')
    .send(booking)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(400)
      chai.expect(res.body).to.deep.equal({
      error: {
        message: 'Livre 9782746035966 déjà loué'
      }
      })
      done()
    })
  })

  it('GET /bookings/:id should return a success response with founded booking', function(done){
    chai.request(api)
    .get('/bookings/4f27236a-c68c-4489-b3e7-bf7dd49a546a')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200)
      chai.expect(res.body).to.deep.equal({
        data: {
          id: "4f27236a-c68c-4489-b3e7-bf7dd49a546a",
          item: {
            authors: "Richard C. Lee, William M. Tepfenhart",
            editor: "CampusPress",
            isbn13: "9782744005084",
            langCode: "FR",
            price: 29.95,
            title: "UML et C++"
          },
          rentDate: "2023-02-22",
          returnDate: "2023-03-17",
          user: {
            address: "3 rue des aubépines 44300 Nantes",
            birthDate: "1995-12-17",
            email: "alban.goupil@gmail.com",
            firstName: "Alban",
            id: "5793ee17-5d65-4e73-92fd-6c4d9fef96a8",
            lastName: "GOUPIL",
            phone: "+33634689374"
          }
        }
      })
      done()
    })
  })
  it('GET /bookings/:id should return not found response if the booking does not exist', function(done){
    chai.request(api)
    .get('/bookings/123456')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404)
      chai.expect(res.body).to.deep.equal({
        error:{
          message: 'Booking 123456 not found'
        }
      })
      done()
    })
  })

  it('PUT /bookings/:id should update the booking and return a success response with the booking', function(done){
    const booking = {
      item: "9782746035966",
      rentDate: "2023-01-10",
      returnDate: "2023-04-21",
      user: "fe523f18-6b19-44e0-b156-446edc0e6862"
    }

    chai.request(api)
    .put('/bookings/4f27236a-c68c-4489-b3e7-bf7dd49a546a')
    .send(booking)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200)
      chai.expect(res.body).to.deep.equal({
        data: {
          id: "4f27236a-c68c-4489-b3e7-bf7dd49a546a",
          item: {
            authors: "B.A. GUERIN",
            editor: "ENI",
            isbn13: "9782746035966",
            langCode: "ES",
            price: 10.02,
            title: "Cree su primer sitio web con dreamweaver 8"
          },
          rentDate: "2023-01-10",
          returnDate: "2023-04-21",
          user: {
            address: "18 boulevard des trois croix 35000 Rennes",
            birthDate: "1989-04-04",
            email: "theo.grollier@gmail.com",
            firstName: "Théo",
            id: "fe523f18-6b19-44e0-b156-446edc0e6862",
            lastName: "GROLLIER",
            phone: "0657836652"
          }
        }
      })
      done()
    })
  })
  it('PUT /bookings/:id should return a bad request if rentdate is malformed', function(done){
    const booking = {
      item: "9782746035966",
      rentDate: "20230110",
      returnDate: "2023-04-21",
      user: "fe523f18-6b19-44e0-b156-446edc0e6862"
    }

    chai.request(api)
    .put('/bookings/4f27236a-c68c-4489-b3e7-bf7dd49a546a')
    .send(booking)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(400)
      chai.expect(res.body).to.deep.equal({
        error: {
          message: 'Date de location incorrecte : format attendu YYYY-MM-DD'
        }
      })
      done()
    })
  })
  it('PUT /bookings/:id should return a bad request if returnDate is malformed', function(done){
    const booking = {
      item: "9782746035966",
      rentDate: "2023-01-10",
      returnDate: "20230421",
      user: "fe523f18-6b19-44e0-b156-446edc0e6862"
    }

    chai.request(api)
    .put('/bookings/4f27236a-c68c-4489-b3e7-bf7dd49a546a')
    .send(booking)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(400)
      chai.expect(res.body).to.deep.equal({
        error: {
          message: 'Date de retour incorrecte : format attendu YYYY-MM-DD'
        }
      })
      done()
    })
  })
  it('PUT /bookings/:id should return a bad request if rentdate is greater than returndate', function(done){
    const booking = {
      item: "9782746035966",
      rentDate: "2023-04-21",
      returnDate: "2023-01-10",
      user: "fe523f18-6b19-44e0-b156-446edc0e6862"
    }

    chai.request(api)
    .put('/bookings/4f27236a-c68c-4489-b3e7-bf7dd49a546a')
    .send(booking)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(400)
      chai.expect(res.body).to.deep.equal({
        error: {
          message: 'La date de retour doit être postérieure à la date de location'
        }
      })
      done()
    })
  })
  it('PUT /bookings/:id should return a bad request if booking does not exist', function(done){
    const booking = {
      item: "9782746035966",
      rentDate: "2023-01-10",
      returnDate: "2023-04-21",
      user: "fe523f18-6b19-44e0-b156-446edc0e6862"
    }

    chai.request(api)
    .put('/bookings/123456')
    .send(booking)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404)
      chai.expect(res.body).to.deep.equal({
        error: {
          message: 'Booking 123456 not found'
        }
      })
      done()
    })
  })
  it('PUT /bookings/:id should return a bad request if book does not exist', function(done){
    const booking = {
      item: "9782746035966",
      rentDate: "2023-01-10",
      returnDate: "2023-04-21",
      user: "123456"
    }

    chai.request(api)
    .put('/bookings/4f27236a-c68c-4489-b3e7-bf7dd49a546a')
    .send(booking)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404)
      chai.expect(res.body).to.deep.equal({
        error: {
          message: 'Aucun utilisateur ne correspond à l\identifiant'
        }
      })
      done()
    })
  })
  it('PUT /bookings/:id should return a bad request if user does not exist', function(done){
    const booking = {
      item: "123456",
      rentDate: "2023-01-10",
      returnDate: "2023-04-21",
      user: "fe523f18-6b19-44e0-b156-446edc0e6862"
    }

    chai.request(api)
    .put('/bookings/4f27236a-c68c-4489-b3e7-bf7dd49a546a')
    .send(booking)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404)
      chai.expect(res.body).to.deep.equal({
        error: {
          message: 'Aucun livre ne correspond à l\identifiant'
        }
      })
      done()
    })
  })
  it('PUT /bookings/:id should return a bad request if there is a empty field', function(done){
    const booking = {
      item: "",
      rentDate: "",
    }

    chai.request(api)
    .put('/bookings/4f27236a-c68c-4489-b3e7-bf7dd49a546a')
    .send(booking)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(400)
      chai.expect(res.body).to.deep.equal({
        error: {
          message: 'Tous les champs doivent être renseignés'
        }
      })
      done()
    })
  })

  it('DELETE /bookings/:id should return a success response with the deleted booking', function(done){
    chai.request(api)
    .delete('/bookings/4f27236a-c68c-4489-b3e7-bf7dd49a546a')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200)
      chai.expect(res.body).to.deep.equal({
        meta: {
          _deleted: {
            id: "4f27236a-c68c-4489-b3e7-bf7dd49a546a",
            item: {
              authors: "B.A. GUERIN",
              editor: "ENI",
              isbn13: "9782746035966",
              langCode: "ES",
              price: 10.02,
              title: "Cree su primer sitio web con dreamweaver 8"
            },
            rentDate: "2023-01-10",
            returnDate: "2023-04-21",
            user: {
              address: "18 boulevard des trois croix 35000 Rennes",
              birthDate: "1989-04-04",
              email: "theo.grollier@gmail.com",
              firstName: "Théo",
              id: "fe523f18-6b19-44e0-b156-446edc0e6862",
              lastName: "GROLLIER",
              phone: "0657836652"
            }
          }
        }
      })
      done()
    })
  })
  it('DELETE /bookings/:id should return not found response if the booking does not exist', function(done){
    chai.request(api)
    .delete('/bookings/4f27236a-c68c-4489-b3e7-bf7dd49a546a')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404)
      chai.expect(res.body).to.deep.equal({
        error: {
          message: 'Booking 4f27236a-c68c-4489-b3e7-bf7dd49a546a not found'
        }
      })
      done()
    })
  })

})