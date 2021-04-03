import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import BookingPage from './components/BookingPage';
import CustomerPage from './components/CustomerPage';
import BrandsPage from './components/pages/BrandsPage';
import HomePage from './components/pages/HomePage';
import HotelsPage from './components/pages/HotelsPage';
import RoomDetailsPage from './components/pages/RoomDetailsPage';
import RoomsPage from './components/pages/RoomsPage';
import LookupPage from './components/pages/LookupPage';

function App() {
  return (
    <div>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/lookup">Employees</Link>
              </li>
              <li>
                <Link to="/brands">Customer</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/brands/:brandId/hotels/:hotelId/rooms/:roomId">
              <RoomDetailsPage />
            </Route>
            <Route path="/brands/:brandId/hotels/:hotelId/rooms">
              <RoomsPage />
            </Route>
            <Route path="/brands/:brandId/hotels">
              <HotelsPage />
            </Route>
            <Route path="/lookup">
              <LookupPage />
            </Route>
            <Route path="/brands">
              <BrandsPage />
            </Route>
            <Route path="/check-in">
              <CustomerPage />
            </Route>
            <Route path="/booking">
              <BookingPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
