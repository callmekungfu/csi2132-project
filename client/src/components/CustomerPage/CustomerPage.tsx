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
    console.log(e)
}

  return(
    <>
      {user.map((user,index) => {
        return(
          <div key={index}>
            <ListTemp onClick={e => handleInput(user.hotel_brand_id)}>{user.hotel_brand_id}</ListTemp>
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
    await fetch('http://localhost:8000/hotel-brands/' + '2/hotels')
      .then(response => response.json())
      .then(receivedData => setUser(receivedData.data));
  }

  return(
    <>
      {user.map((user,index) => {
        return(
        <div key={index}>
          <ListTemp>{user.hotel_name}</ListTemp>
          <p>{user.office_address.address}</p>
        </div>
        )
      })}
    </>
  )
}

const HotelRoomStuff = () => {
  const [user, setUser] = useState<any>({});

  useEffect( () => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch('http://localhost:8000/hotel-brands/' + '2/hotels/1/rooms/5')
      .then(response => response.json())
      .then(receivedData => setUser(receivedData));
  }

  return(
    <>
        <div>
          <p>Room Id: {user.room_id}</p>
          <p>Room Title: {user.room_title}</p>
          <p>${user.price}</p>
          <p>Can Extend: {user.can_extend ? "Yes" : "No"}</p>
          <p>Ocean View: {user.ocean_view ? "Yes" : "No"}</p>
          <p>Has AC: {user.has_ac ? "Yes" : "No"}</p>
        </div>
    </>
  )
}

const Form = () => {
  return(
    <>
      <form>
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
      </form>
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
                  {Form()}

                </SelectBox>
                <SelectBox>
                  <BoxTitle>Room Details</BoxTitle>
                  {HotelRoomStuff()}
                </SelectBox>
            </Container>
        </>
    )
}



export default CustomerPage