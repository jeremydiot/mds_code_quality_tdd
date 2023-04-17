import chai from 'chai'
import chaiHttp from 'chai-http'
import api from '../index.js'

chai.use(chaiHttp)

describe('Users', function(){
  it('GET /users should return a success response with all users', function(done){
    chai.request(api)
    .get('/users')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200)
      chai.expect(res.body).to.deep.equal({
        data : [
          {
            address: "3 rue des aubépines 44300 Nantes",
            birthDate: "1995-12-17",
            email: "alban.goupil@gmail.com",
            firstName: "Alban",
            id: "5793ee17-5d65-4e73-92fd-6c4d9fef96a8",
            lastName: "GOUPIL",
            phone: "+33634689374"
          },
          {
            address: "18 boulevard des trois croix 35000 Rennes",
            birthDate: "1989-04-04",
            email: "theo.grollier@gmail.com",
            firstName: "Théo",
            id: "fe523f18-6b19-44e0-b156-446edc0e6862",
            lastName: "GROLLIER",
            phone: "0657836652"
          },
          {
            address: "14 allée de l'oseraie 94260 fresnes",
            birthDate: "1996-07-31",
            email: "hugo.blanchard@gmail.com",
            firstName: "Hugo",
            id: "63dcff89-47c5-4365-875d-8934a250d0fe",
            lastName: "BLANCHARD",
            phone: "0033678398215"
          }
        ]
      })    
      done()
    })
  })

  it('POST /users should create the user and return a success response with the user', function(done){
    const user = {
      lastName: 'GONZALEZ',
      firstName: 'Nathan',
      birthDate: '1992-09-11',
      address: '28 allée vivaldi 75012 Paris',
      phone: '+33645618495',
      email: 'nathan.gonzalez@gmail.com'
    }
    chai.request(api)
    .post('/users')
    .send(user)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(201)
      chai.expect(res.body.data).to.deep.include(user)
      chai.expect(res.body.data).to.have.property('id')
      chai.expect(res.body.data.id).to.have.lengthOf(36)
      done()
    })
  })
  it('POST /users should return a bad request if birthdate is malformed', function(done){
    const user = {
      lastName: 'GONZALEZ',
      firstName: 'Nathan',
      birthDate: '19920911',
      address: '28 allée vivaldi 75012 Paris',
      phone: '+33645618495',
      email: 'nathan.gonzalez@gmail.com'
    }
    chai.request(api)
    .post('/users')
    .send(user)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(400)
      chai.expect(res.body).to.deep.equal({
        error: {
          message: 'Date de naissance incorrecte : format attendu YYYY-MM-DD'
        }
      })
      done()
    })
  })
  it('POST /users should return a bad request if phone number is malformed', function(done){
    const user = {
      lastName: 'GONZALEZ',
      firstName: 'Nathan',
      birthDate: '1992-09-11',
      address: '28 allée vivaldi 75012 Paris',
      phone: '645618495',
      email: 'nathan.gonzalez@gmail.com'
    }
    chai.request(api)
    .post('/users')
    .send(user)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(400)
      chai.expect(res.body).to.deep.equal({
        error: {
          message: 'Numéro de téléphone incorrecte : format attendu (+33 ou 0 ou 0033) suivi de 9 chiffres'
        }
      })
      done()
    })
  })
  it('POST /users should return a bad request if email is malformed', function(done){
    const user = {
      lastName: 'GONZALEZ',
      firstName: 'Nathan',
      birthDate: '1992-09-11',
      address: '28 allée vivaldi 75012 Paris',
      phone: '+33645618495',
      email: 'nathan.gonzalezgmail.com'
    }
    chai.request(api)
    .post('/users')
    .send(user)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(400)
      chai.expect(res.body).to.deep.equal({
        error: {
          message: 'Email incorrect : format attendu prenom.nom@mail.com'
        }
      })
      done()
    })
  })
  it('POST /users should return a bad request if there is a empty field', function(done){
    const user = {
      lastName: 'GONZALEZ',
      firstName: null,
      birthDate: undefined,
      address: '28 allée vivaldi 75012 Paris',
      phone: '',
    }
    chai.request(api)
    .post('/users')
    .send(user)
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

  it('GET /users/:id should return a success response with founded user', function(done){
    chai.request(api)
    .get('/users/5793ee17-5d65-4e73-92fd-6c4d9fef96a8')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200)
      chai.expect(res.body).to.deep.equal({
        data:{
            address: "3 rue des aubépines 44300 Nantes",
            birthDate: "1995-12-17",
            email: "alban.goupil@gmail.com",
            id: "5793ee17-5d65-4e73-92fd-6c4d9fef96a8",
            firstName: "Alban",
            lastName: "GOUPIL",
            phone: "+33634689374"
          },
      })
      done()
    })
  })
  it('GET /users/:id should return not found response if the user does not exist', function(done){
    chai.request(api)
    .get('/users/123456')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404)
      chai.expect(res.body).to.deep.equal({
        error:{
          message: 'User 123456 not found'
        }
      })
      done()
    })
  })

  it('PUT /users/:id should update the user and return a success response with the user', function(done){
    const user = {
      address: "3 rue des aubépines 44300 Nantes",
      birthDate: "1995-12-17",
      email: "alban.renard@gmail.com",
      firstName: "Alban",
      lastName: "RENARD",
      phone: "+33634689374"
    }

    chai.request(api)
    .put('/users/5793ee17-5d65-4e73-92fd-6c4d9fef96a8')
    .send(user)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200)
      chai.expect(res.body).to.deep.equal({
        data:{...user, id: '5793ee17-5d65-4e73-92fd-6c4d9fef96a8' },
      })
      done()
    })
  })
  it('PUT /users/:id should return not found response if the user does not exist', function(done){
    const user = {
      address: "3 rue des aubépines 44300 Nantes",
      birthDate: "1995-12-17",
      email: "alban.renard@gmail.com",
      firstName: "Alban",
      lastName: "RENARD",
      phone: "+33634689374"
    }

    chai.request(api)
    .put('/users/123456')
    .send(user)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404)
      chai.expect(res.body).to.deep.equal({
        error:{
          message :'User 123456 not found'
        }
      })
      done()
    })
  })
  it('PUT /users/:id should return a bad request if birthdate is malformed', function(done){
    const user = {
      address: "3 rue des aubépines 44300 Nantes",
      birthDate: "19951217",
      email: "alban.renard@gmail.com",
      firstName: "Alban",
      lastName: "RENARD",
      phone: "+33634689374"
    }

    chai.request(api)
    .put('/users/5793ee17-5d65-4e73-92fd-6c4d9fef96a8')
    .send(user)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(400)
      chai.expect(res.body).to.deep.equal({
        error:{
          message: 'Date de naissance incorrecte : format attendu YYYY-MM-DD'
        }
      })
      done()
    })
  })
  it('PUT /users/:id should return a bad request if phone number is malformed', function(done){
    const user = {
      address: "3 rue des aubépines 44300 Nantes",
      birthDate: "1995-12-17",
      email: "alban.renard@gmail.com",
      firstName: "Alban",
      lastName: "RENARD",
      phone: "634689374"
    }

    chai.request(api)
    .put('/users/5793ee17-5d65-4e73-92fd-6c4d9fef96a8')
    .send(user)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(400)
      chai.expect(res.body).to.deep.equal({
        error:{
          message: 'Numéro de téléphone incorrecte : format attendu (+33 ou 0 ou 0033) suivi de 9 chiffres'
        }
      })
      done()
    })
  })
  it('PUT /users/:id should return a bad request if email is malformed', function(done){
    const user = {
      address: "3 rue des aubépines 44300 Nantes",
      birthDate: "1995-12-17",
      email: "alban.renardgmail.com",
      firstName: "Alban",
      lastName: "RENARD",
      phone: "+33634689374"
    }

    chai.request(api)
    .put('/users/5793ee17-5d65-4e73-92fd-6c4d9fef96a8')
    .send(user)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(400)
      chai.expect(res.body).to.deep.equal({
        error:{
          message: 'Email incorrect : format attendu prenom.nom@mail.com'
        }
      })
      done()
    })
  })
  it('PUT /users/:id should return a bad request if there is a empty field', function(done){
    const user = {
      birthDate: "1995-12-17",
      email: undefined,
      firstName: null,
      lastName: "RENARD",
      phone: ""
    }

    chai.request(api)
    .put('/users/5793ee17-5d65-4e73-92fd-6c4d9fef96a8')
    .send(user)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(400)
      chai.expect(res.body).to.deep.equal({
        error:{
          message: 'Tous les champs doivent être renseignés'
        }
      })
      done()
    })
  })

  it('DELETE /users/:id should return a success response with the deleted user', function(done){
    chai.request(api)
    .delete('/users/5793ee17-5d65-4e73-92fd-6c4d9fef96a8')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200)
      chai.expect(res.body).to.deep.equal({
        meta:{
          _deleted: {
            address: "3 rue des aubépines 44300 Nantes",
            birthDate: "1995-12-17",
            email: "alban.renard@gmail.com",
            firstName: "Alban",
            lastName: "RENARD",
            phone: "+33634689374",
            id:'5793ee17-5d65-4e73-92fd-6c4d9fef96a8'
          }
        }
      })
      done()
    })
  })
  it('DELETE /users/:id should return not found response if the user does not exist', function(done){
    chai.request(api)
    .delete('/users/5793ee17-5d65-4e73-92fd-6c4d9fef96a8')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404)
      chai.expect(res.body).to.deep.equal({
        error:{
          message: 'User 5793ee17-5d65-4e73-92fd-6c4d9fef96a8 not found'
        }
      })
      done()
    })
  })
})