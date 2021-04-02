import { useEffect, useState } from 'react';
import { Grid, Card, Container, Title } from './BrandsPage';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface BrandGetBody {
  data: IBooking[];
}

export interface IBooking {
  booking_id: number;
  occupant_count: number;
  start_date: string;
  end_date: string;
  checked_in: boolean;
  checked_in_staff: number;
  room_id: number;
  customer_id: number;
  customer_name: string;
}

const BookingBtn = styled.button`
  width: 100%;
`;

const CustomerNameSearch = styled.div`
  margin-bottom: 20px;
  input {
    padding: 8px;
    width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LookupPage = () => {
  const employeeId = 1;
  const today = new Date().toISOString().split('T')[0];
  const [bookings, setBookings] = useState<IBooking[]>();
  const [rawBookings, setRawBookings] = useState<IBooking[]>();

  useEffect(() => {
    loadBookingsData();
  }, []);

  const loadBookingsData = async () => {
    const res = await fetch(
      'http://localhost:8000/hotel-brands/1/hotels/1/bookings',
    );
    const data: BrandGetBody = await res.json();
    data.data.sort((a, b) => a.booking_id - b.booking_id);
    setBookings(data.data);
    setRawBookings(data.data);
  };

  const handleClick = async (bookingId: number) => {
    await fetch(
      `http://localhost:8000/hotel-brands/2/hotels/1/bookings/${bookingId}/check-in`,
      {
        method: 'PUT',
        body: JSON.stringify({ employee_id: employeeId }),
      },
    );
    loadBookingsData();
  };

  const searchByName = (query: string) => {
    if (!query) {
      setBookings(rawBookings);
    }
    const res = rawBookings.filter((b) =>
      b.customer_name.replaceAll(' ', '').toLocaleLowerCase().includes(query),
    );
    setBookings(res);
  };

  return (
    <Container>
      <Header>
        <Title>Bookings</Title>
        <Link
          to={`/brands/2/hotels/1/rooms?start_date=${today}&end_date=${today}&from_checkin=true`}
        >
          See available Rooms
        </Link>
      </Header>

      <CustomerNameSearch>
        <input
          type="text"
          placeholder="Search for customer name"
          onChange={(e) => searchByName(e.currentTarget.value)}
        />
      </CustomerNameSearch>
      <Grid>
        {bookings?.map((b) => (
          <Card key={b.booking_id} className={b.checked_in ? 'success' : ''}>
            <h5>Room ID: {b.room_id}</h5>
            <div>
              <b>Customer Name: </b> {b.customer_name}
            </div>
            <div>
              <b>Customer ID: </b> {b.customer_id}
            </div>
            <div>
              <b>Occupancy: </b> {b.occupant_count}
            </div>
            <div>
              <b>Checked In:</b> {b.checked_in.toString()}
            </div>
            <div>
              <b>Start Date: </b> {b.start_date}
            </div>
            <div>
              <b>End Date: </b> {b.end_date}
            </div>
            <BookingBtn
              onClick={() => handleClick(b.booking_id)}
              disabled={b.checked_in}
            >
              Check In {b.checked_in && '(Already Checked In)'}
            </BookingBtn>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default LookupPage;
