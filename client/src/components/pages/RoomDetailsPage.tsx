import { useEffect, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Title } from './BrandsPage';
import { IRoom } from './RoomsPage';

const RoomDetails = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 30px;
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .occupant-form {
    margin-bottom: 20px;
    label {
      margin-right: 8px;
    }
  }
`;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const RoomDetailsPage = () => {
  const { brandId, hotelId, roomId } = useParams();
  let history = useHistory();
  const [room, setRoom] = useState<IRoom>();
  const [occupant, setOccupant] = useState<number>(1);
  const query = useQuery();
  const s = query.get('start_date');
  const e = query.get('end_date');

  useEffect(() => {
    const loadRoomData = async () => {
      const url = `http://localhost:8000/hotel-brands/${brandId}/hotels/${hotelId}/rooms/${roomId}`;
      const res = await fetch(url);
      const data: IRoom = await res.json();
      setRoom(data);
    };
    loadRoomData();
  }, [brandId, hotelId, roomId]);

  const submitBooking = async () => {
    if (!s || !e || !occupant) {
      return;
    }
    const data = {
      customer_id: 1,
      room_id: roomId,
      occupant_count: occupant,
      start_date: s,
      end_date: e,
    };
    const res = await fetch(
      `http://localhost:8000/hotel-brands/${brandId}/hotels/${hotelId}/bookings`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );
    history.push('/brands');
  };

  return (
    <>
      {room && (
        <Container>
          <Title>{room.room_title}</Title>
          <RoomDetails>
            <div>
              <strong>{room.room_description}</strong>
              <p>Can Extend: {room.can_extend ? "Yes" : "No"}</p>
              <p>Has Mountain View: {room.mountain_view ? "Yes" : "No"}</p>
              <p>Has Ocean View: {room.ocean_view ? "Yes" : "No"}</p>
              <p>Has Tv: {room.has_tv ? "Yes" : "No"}</p>
              <p>Has AC: {room.has_ac ? "Yes" : "No"}</p>
              <p>Has Mini Bar: {room.has_mini_bar ? "Yes" : "No"}</p>
              <p>Has Hairdryer: {room.has_hairdryer ? "Yes" : "No"}</p>
              <p>Has Wifi: {room.has_wifi ? "Yes" : "No"}</p>
            </div>
            <ActionContainer>
              <div className="occupant-form">
                <label>Number of occupants</label>
                <input
                  type="number"
                  step={1}
                  min={1}
                  max={420}
                  value={occupant}
                  onChange={(e) => setOccupant(+e.currentTarget.value)}
                />
              </div>
              <button disabled={!s || !e || !occupant} onClick={submitBooking}>
                BOOK NOW!
              </button>
            </ActionContainer>
          </RoomDetails>
        </Container>
      )}
    </>
  );
};

export default RoomDetailsPage;
