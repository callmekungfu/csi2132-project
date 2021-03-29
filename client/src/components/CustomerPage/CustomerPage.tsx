import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';


const HeaderTitle = styled.h1`
  text-align: center;
  color: black;
  size: 30px;
`

const Container = styled.div`
  height: 700px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`

const SelectBox = styled.div`
  background: lightblue;
  width: 400px;
  height: 500px;
`

const ListTemp = styled.li`
  list-style: none;
`

const BoxTitle = styled.p`
  font-size: 20px;
`

const HotelBrand = () => {
  const [user, setUser] = useState<any>([]);

  useEffect( () => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch('http://localhost:8000/hotel-brands')
      .then(response => response.json())
      .then(receivedData => setUser(receivedData.data));
  }

  const handleInput = (e) => {
    console.log(e.target.value);
}

  return(
    <>
      {user.map((user,index) => {
        return(
        <div key={index}>
          <ListTemp onClick={e => handleInput(e)}>{user.hotel_brand_id}</ListTemp>
          <p>{user.brand_name}</p>
        </div>
        )
      })}
    </>
  )
}

const HotelBrandName = () => {
  const [user, setUser] = useState<any>([]);

  useEffect( () => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch('http://localhost:8000/hotel-brands/' + '2' + '/hotels')
      .then(response => response.json())
      .then(receivedData => setUser(receivedData.data));
  }

  return(
    <>
      {user.map((user,index) => {
        return(
        <div key={index}>
          <ListTemp >{user.hotel_name}</ListTemp>
          <p>{user.office_address.address}</p>
        </div>
        )
      })}
    </>
  )
}


const CustomerPage = () => {

    return(
        <>
          <HeaderTitle>
              Customer Page
          </HeaderTitle>
            <Container>
                <SelectBox>
                  <BoxTitle>Select a Hotel ID</BoxTitle>
                  {HotelBrand()}  
                </SelectBox>
                <SelectBox>
                  <BoxTitle>Select a Hotel Brand</BoxTitle>
                  {HotelBrandName()}
                </SelectBox>
                <SelectBox>
                  <BoxTitle>Available Rooms</BoxTitle>
                  <p>--In the form of YYYY-MM-DD--</p>
                  <input
                    type="text"
                    placeholder="startDate"
                    name="startDate"
                  />
                  <input
                    type="text"
                    placeholder="endDate"
                    name="endDate"
                  />
                  <p>Enter Number of Occupants</p>
                  <input
                    type="num"
                    placeholder="occupants"
                    name="occupants"
                  />

                </SelectBox>
                <SelectBox>
                  <BoxTitle>Room Details</BoxTitle>
                </SelectBox>
            </Container>
        </>
    )
}



export default CustomerPage