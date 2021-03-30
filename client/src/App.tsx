import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import BookingPage from './components/BookingPage';
import CustomerPage from './components/CustomerPage';
import BrandsPage from './components/pages/BrandsPage';
import HomePage from './components/pages/HomePage';
import HotelsPage from './components/pages/HotelsPage';
import RoomsPage from './components/pages/RoomsPage';

function App() {
  return (
    <div>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/check-in">Customer</Link>
              </li>
              <li>
                <Link to="/booking">Booking</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/brands/:brandId/hotels/:hotelId/rooms">
              <RoomsPage />
            </Route>
            <Route path="brands/:brandId/hotels">
              <HotelsPage />
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
