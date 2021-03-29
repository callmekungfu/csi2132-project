import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'

const HeaderTitle = styled.h1`
  text-align: center;
  color: black;
  size: 30px;
`

const Container = styled.div`
  height: 700px;
  width: 100%;
  background: pink;
  display: flex;
  justify-content: space-evenly;
`

const CenterBox = styled.div`
  background: lightblue;
  width: 400px;
  height: 500px;
`

const RightBox = styled.div`
  background: lightblue;
  width: 400px;
  height: 500px;
`

const ListTemp = styled.li`
  list-style: none;
`

const DateText = styled.p`
  font-size: 25px;
`

const UserCardDisplay = () => {
  const [user, setUser] = useState<any>([]);

  useEffect( () => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch(
      'http://localhost:8000/hotel-brands'
    )
      .then(response => response.json())
      .then(receivedData => setUser(receivedData.data));
  }

  return(
    <>
      {console.log(user)}
      {user.map((user,index) => {
        return(
        <div key={index}>
          <ListTemp>{user.brand_name}</ListTemp>
        </div>
        )
      })}
    </>
  )
}


const CustomerPage = () => {
    const [value, onChange] = useState(new Date());

    return(
        <>
        <HeaderTitle>
            Customer Page
        </HeaderTitle>
            <Container>
                <CenterBox>
                    <p>Select a Hotel Brand</p>
                    {UserCardDisplay()}
                    <Dropdown >
                        <DropdownButton variant="primary" id="dropdown-basic" title="Choose a Date">
                        <Dropdown.Item>
                        <Calendar
                            onChange={onChange}
                            value={value}
                        />
                        </Dropdown.Item>
                        </DropdownButton>
                    </Dropdown>
                    <DateText>{value.toString().slice(0,16)}</DateText>
                    <div>
                        Name:
                        <input type="text" name="name" />
                    </div>
                    <div>
                        Room Number:
                        <input type="text" name="room" />
                    </div>
                    <button>Book Room</button>
                </CenterBox>
            </Container>
        </>
    )
}



export default CustomerPage