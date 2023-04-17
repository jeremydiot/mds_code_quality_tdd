export default (Booking, Book, User) =>{
  const bookings = [
    new Booking(
      '4f27236a-c68c-4489-b3e7-bf7dd49a546a', 
      new Date(2023, 1, 22),
      new Date(2023, 2, 17),
      new Book('9782744005084', 'UML et C++', 'Richard C. Lee, William M. Tepfenhart', 'CampusPress', 'FR', 29.95),
      new User('5793ee17-5d65-4e73-92fd-6c4d9fef96a8', 'GOUPIL', 'Alban', new Date(1995, 11, 17), '3 rue des aubépines 44300 Nantes', '+33634689374', 'alban.goupil@gmail.com')
    ),

    new Booking(
      'c756e63d-5d36-459b-bf17-aee880a20371', 
      new Date(2022, 12, 5), 
      undefined, 
      new Book('9782744005084', 'UML et C++', 'Richard C. Lee, William M. Tepfenhart', 'CampusPress', 'FR', 29.95), 
      new User('5793ee17-5d65-4e73-92fd-6c4d9fef96a8', 'GOUPIL', 'Alban', new Date(1995, 11, 17), '3 rue des aubépines 44300 Nantes', '+33634689374', 'alban.goupil@gmail.com')
    ),

    new Booking(
      '6dd0ee02-e30f-4032-98fe-f12c5708b78c',
      new Date(2023, 3, 4),
      new Date(2023, 5, 14),
      new Book('9780782140774', 'Complete Java 2 Certification Study Guide', 'Roberts Simon', 'Sybex Inc', 'EN', 1.00),
      new User('63dcff89-47c5-4365-875d-8934a250d0fe','BLANCHARD', 'Hugo', new Date(1996, 6, 31), '14 allée de l\'oseraie 94260 fresnes', '0033678398215', 'hugo.blanchard@gmail.com')
    )
  ];
    
  const listBookings = () => {
    return bookings;
  }

  const createBooking = (booking) => {
   //TODO to implement 
  }

  const findBooking = (id) => {
    //TODO to implement 
  }

  const updateBooking = (booking) => {
    //TODO to implement 
  }

  const deleteBooking = (booking) => {
    //TODO to implement 
  }

  return {
    listBookings,
    createBooking,
    findBooking,
    updateBooking,
    deleteBooking
  };
}