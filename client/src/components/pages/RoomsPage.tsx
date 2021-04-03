import { Card, Container, Grid, Title } from './BrandsPage';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from './RoomDetailsPage';

interface RoomGetBody {
  data: IRoom[];
}

export interface IRoom {
  room_id: number;
  room_title: string;
  room_description: string;
  price: string;
  mountain_view: boolean;
  ocean_view: boolean;
  can_extend: boolean;
  has_tv: boolean;
  has_ac: boolean;
  has_mini_bar: boolean;
  has_hairdryer: boolean;
  has_wifi: boolean;
}

const DateForm = styled.form`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  .form-group {
    margin: 0 12px;
    label {
      margin-right: 8px;
    }
  }
`;

const ReturnBtn = styled.a`
  margin-left: auto;
`;

const RoomsPage = () => {
  const query = useQuery();
  const { brandId, hotelId } = useParams<any>();
  const [room, setRooms] = useState<IRoom[]>();
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    if (query.has('start_date') && query.has('end_date')) {
      setStartDate(query.get('start_date'));
      setEndDate(query.get('end_date'));
      handleSubmit();
    }
  }, [query]);

  const loadRoomsData = async (link?: string) => {
    const url =
      link ??
      `http://localhost:8000/hotel-brands/${brandId}/hotels/${hotelId}/rooms`;
    const res = await fetch(url);
    const data: RoomGetBody = await res.json();
    setRooms(data.data);
  };

  const handleSubmit = () => {
    if (startDate > endDate) {
      alert('ur date is wrong make start before end pls');
      return;
    }
    loadRoomsData(
      `http://localhost:8000/hotel-brands/${brandId}/hotels/${hotelId}/rooms?start_date=${startDate}&end_date=${endDate}`,
    );
  };

  return (
    <Container>
      <Title>Rooms Page</Title>
      <DateForm>
        <div className="form-group">
          {/* Start Date */}
          <label htmlFor="startDate">Check In Date</label>
          <input
            type="date"
            placeholder="Check In Date"
            value={startDate}
            onChange={(e) => setStartDate(e.currentTarget.value)}
          />
        </div>
        <div className="form-group">
          {/* End Date */}
          <label htmlFor="startDate">Check Out Date</label>
          <input
            type="date"
            placeholder="Check Out Date"
            value={endDate}
            onChange={(e) => setEndDate(e.currentTarget.value)}
          />
        </div>
        <div className="form-group">
          <button type="button" onClick={handleSubmit}>
            Search
          </button>
        </div>

        {query.get('from_checkin') === 'true' && (
          <ReturnBtn>
            <Link to="/lookup">Return to Bookings Lookup</Link>
          </ReturnBtn>
        )}
      </DateForm>

      <Grid>
        {room?.map((b) => (
          <Link
            to={`/brands/${brandId}/hotels/${hotelId}/rooms/${b.room_id}?start_date=${startDate}&end_date=${endDate}`}
            key={b.room_id}
          >
            <Card>
              <h5>{b.room_title}</h5>
              <div>
                <b>Description: </b> {b.room_description}
              </div>
              <div>
                <b>Price: </b> {b.price}
              </div>
            </Card>
          </Link>
        ))}
      </Grid>
    </Container>
  );
};

export default RoomsPage;
