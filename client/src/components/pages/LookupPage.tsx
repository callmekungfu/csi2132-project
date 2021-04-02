import { useEffect, useState } from 'react';
import { Grid, Card, Container, Title } from './BrandsPage'
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

const LookupPage = () => {
    const [bookings, setBookings] = useState<IBooking[]>();

    useEffect(() => {
      loadBookingsData();
    }, []);

    const handleClick = () => {
    }

    const loadBookingsData = async () => {
        const res = await fetch('http://localhost:8000/hotel-brands/2/hotels/2/bookings');
        const data: BrandGetBody = await res.json();
        console.log(data.data);
        setBookings(data.data);
      };

    return(
        <Container>
            <Title>Room Lookup</Title>
                <Grid>
                    {bookings?.map((b) => (
                    <Link
                        to={`/lookup`} onClick={handleClick()}
                    >
                        <Card>
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
                        </Card>
                    </Link>
                    ))}
                </Grid>
        </Container>
    )
}

export default LookupPage