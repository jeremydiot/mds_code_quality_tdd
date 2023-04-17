import chai from 'chai';
import chaiHttp from 'chai-http';
import api from '../index.js';

chai.use(chaiHttp);

describe('Users', function(){
  it('GET /bookings should return a success response with all bookings', function(done){

  });

  it('POST /bookings should create the booking and return a success response with the booking', function(done){

  });
  it('POST /bookings should return a bad request if rentdate is malformed', function(done){

  });
  it('POST /bookings should return a bad request if returnDate is malformed', function(done){

  });
  it('POST /bookings should return a bad request if rentdate is greater than returndate', function(done){

  });
  it('POST /bookings should return a bad request if book does not exist', function(done){

  });
  it('POST /bookings should return a bad request if user does not exist', function(done){

  });
  it('POST /bookings should return a bad request if there is a empty field', function(done){

  })

  it('GET /bookings/:id should return a success response with founded booking', function(done){

  })
  it('GET /bookings/:id should return not found response if the booking does not exist', function(done){

  })

  it('PUT /bookings/:id should update the booking and return a success response with the booking', function(done){

  });
  it('PUT /bookings/:id should return a bad request if rentdate is malformed', function(done){

  });
  it('PUT /bookings/:id should return a bad request if returnDate is malformed', function(done){

  });
  it('PUT /bookings/:id should return a bad request if rentdate is greater than returndate', function(done){

  });
  it('PUT /bookings/:id should return a bad request if book does not exist', function(done){

  });
  it('PUT /bookings/:id should return a bad request if user does not exist', function(done){

  });
  it('PUT /bookings/:id should return a bad request if there is a empty field', function(done){

  })

  it('DELETE /bookings/:id should return a success response with the deleted booking', function(done){

  });
  it('DELETE /bookings/:id should return not found response if the booking does not exist', function(done){
    
  });

});