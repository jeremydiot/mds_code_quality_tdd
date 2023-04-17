import chai from 'chai';
import chaiHttp from 'chai-http';
import api from '../index.js';

chai.use(chaiHttp);

describe('Users', function(){
  it('GET /users should return a success response with all users', function(done){

  });

  it('POST /users should create the user and return a success response with the user', function(done){

  });
  it('POST /users should return a bad request if birthdate is malformed', function(done){

  });
  it('POST /users should return a bad request if phone number is malformed', function(done){

  });
  it('POST /users should return a bad request if there is a empty field', function(done){

  })

  it('GET /users/:id should return a success response with founded user', function(done){

  })
  it('GET /users/:id should return not found response if the user does not exist', function(done){

  })

  it('PUT /users/:id should return a success response with founded user', function(done){

  })
  it('PUT /users/:id should return not found response if the user does not exist', function(done){

  })
  it('PUT /users/:id should return a bad request if birthdate is malformed', function(done){

  });
  it('PUT /users/:id should return a bad request if phone number is malformed', function(done){

  });
  it('PUT /users/:id should return a bad request if there is a empty field', function(done){

  })

  it('DELETE /users/:id should return a success response with the deleted user', function(done){

  });
  it('DELETE /users/:id should return not found response if the user does not exist', function(done){
    
  });

});