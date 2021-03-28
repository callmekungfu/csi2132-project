export interface CreateHotelParams {
  name: string;
  address: {
    address: string;
    unit: string | null;
    locality: string | null;
    postal: string | null;
    country: string | null;
    admin_area: string | null;
  };
  phone_number: string;
  email: string;
}
