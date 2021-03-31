import React, {useRef} from 'react'
import { Card, Container, Grid, Title } from './BrandsPage';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

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

const RoomsPage = () => {
  const { brandId, hotelId } = useParams();
  const [room, setRooms] = useState<IRoom[]>(); 
  // const [date1, setDate1] = useState('');
  // const [date2, setDate2] = useState('');
  const date1 = useRef(null);
  const date2 = useRef(null);
  const [link, setLink] = useState('')

  useEffect(() => {
    if (brandId && hotelId) {
      loadBrandsData();
    }
  }, [brandId, hotelId]);

  const loadBrandsData = async () => {
    const res = await fetch(
      `http://localhost:8000/hotel-brands/${brandId}/hotels/${hotelId}/rooms`,
    );
    const data: RoomGetBody = await res.json();
    setRooms(data.data);
  };

  const handleSubmit = () => {
    console.log(date1.current.value, date2.current.value)
    setLink(`/brands/${brandId}/hotels/${hotelId}/rooms?start_date=${date1.current.value}&end_date=${date2.current.value}}`)
    console.log(link)
  };

  return(
    <Container>
      <Title>Brand Page</Title>
      <form>
        <input placeholder="start date" ref={date1} />
        <input placeholder="end date" ref={date2} />
      </form>
      <button type="submit" onClick={handleSubmit}>
        Submit Dates
      </button>
      <Grid>
      {room?.map((b) => (
          <Link
          to={link} 
        >
            <Card key={b.room_id}>
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

// onChange={event => setDate1(event.target.value)}