import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface BrandGetBody {
  data: IBrand[];
}

export interface IBrand {
  hotel_brand_id: number;
  brand_name: string;
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

export const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  color: black;
  size: 30px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
`;

export const Card = styled.div`
  border: solid 1px gray;
  border-radius: 10px;
  padding: 16px;
  cursor: pointer;
  transition: all ease 0.2s;
  &:hover {
    transform: translateY(-2px);
  }
  h5 {
    font-size: 20px;
    margin-top: 0;
    margin-bottom: 8px;
  }
  &.success {
    background-color: #a5d6a7;
  }
  &.warning {
    background-color: #ffe082;
  }
`;

const BrandsPage = () => {
  const [brands, setBrands] = useState<IBrand[]>();

  useEffect(() => {
    loadBrandsData();
  }, []);

  const loadBrandsData = async () => {
    const res = await fetch('http://localhost:8000/hotel-brands');
    const data: BrandGetBody = await res.json();
    console.log(data.data);
    setBrands(data.data);
  };

  return (
    <Container>
      <Title>Brands Page</Title>
      <Grid>
        {brands?.map((b) => (
          <Link
            to={`/brands/${b.hotel_brand_id}/hotels`}
            key={b.hotel_brand_id}
          >
            <Card>
              <h5>{b.brand_name}</h5>
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

export default BrandsPage;
