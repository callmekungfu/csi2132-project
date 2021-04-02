import { Card, Container, Grid, Title } from './BrandsPage';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface HotelGetBody {
  data: IHotel[];
}

export interface IHotel {
  hotel_id: number;
  hotel_name: string;
  room_count: number;
  office_address: OfficeAddress;
  office_emails: string[];
  office_phones: string[];
}

export interface OfficeAddress {
  address: string;
  unit: null;
  locality: string;
  postal: string;
  country: string;
  admin_area: string;
}

const HotelsPage = () => {
  const { brandId } = useParams<any>();
  const [hotels, setHotels] = useState<IHotel[]>();

  useEffect(() => {
    if (brandId) {
      loadBrandsData();
    }
  }, [brandId]);

  const loadBrandsData = async () => {
    const res = await fetch(
      `http://localhost:8000/hotel-brands/${brandId}/hotels`,
    );
    const data: HotelGetBody = await res.json();
    setHotels(data.data);
  };
  return (
    <Container>
      <Title>Hotels Page</Title>
      <Grid>
        {hotels?.map((b) => (
          <Link
            to={`/brands/${brandId}/hotels/${b.hotel_id}/rooms`}
            key={b.hotel_id}
          >
            <Card>
              <h5>{b.hotel_name}</h5>
              <div>
                <b>Phones: </b> {b.office_phones.join(', ')}
              </div>
              <div>
                <b>Emails: </b> {b.office_emails.join(', ')}
              </div>
              <div>
                <b>Address: </b> {b.office_address.address}
              </div>
            </Card>
          </Link>
        ))}
      </Grid>
    </Container>
  );
};

export default HotelsPage;
