import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar, Nav, Form, FormControl, InputGroup, Button, Badge, Container, NavDropdown } from 'react-bootstrap';
import { Bell, Search, PersonCircle } from 'react-bootstrap-icons';

const Header = () => {
  const location = useLocation().pathname.substring(1) || 'HOME';
  const pageTitle = location.toUpperCase();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Guest");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/users/me");
        const user = response.data;
        if (user?.firstName && user?.lastName) {
          setUserName(`${user.firstName} ${user.lastName}`);
        }
      } catch {
        console.warn("Không thể lấy thông tin người dùng.");
      }
    };
    fetchUser();
  }, []);

  const handleSearchToggle = () => setSearchOpen(open => !open);
  const handleProfile = () => navigate('/profile');
  const handleNotification = () => navigate('/notifications');

  return (<>
  <Navbar bg="" variant="dark" expand="lg" className="shadow-sm py-3 bg-[#56D3C7]">
      <Container fluid>
        {/* Brand / Breadcrumb */}
        <Navbar.Brand className="fw-bold text-white">
          Pages / <span className="text-uppercase">{pageTitle}</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar" className="justify-content-end align-items-center">
          {/* Search */}
          <Form className={`d-flex align-items-center me-3 ${searchOpen ? 'w-50' : ''}`}>
            {searchOpen && (
              <FormControl
                type="search"
                placeholder="Search..."
                className="me-2"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            )}
            <Button variant="light" onClick={handleSearchToggle} className="p-2">
              <Search size={20} />
            </Button>
          </Form>

          {/* Notifications */}
          <Nav className="align-items-center me-3">
            <Nav.Link  className="position-relative px-2">
              <Bell size={24} className="text-white" />
              <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">3</Badge>
            </Nav.Link>
          </Nav>

          {/* Profile */}
          <Nav>
            <NavDropdown
              title={
                <span className="d-flex align-items-center">
                  <PersonCircle size={28} className="me-2 text-white" />
                  <span className="text-white fw-medium">{userName}</span>
                </span>
              }
              id="profile-dropdown"
              align="end"
              menuVariant="dark"
              // style={{top: '11px'}}
              className="custom-dropdown"
            >
              <NavDropdown.Item onClick={handleProfile}>View Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => navigate('/logout')}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <style>
{`.custom-dropdown .dropdown-toggle::after {
    display: none !important;
  }`}
</style>
  </>
    
  );
};


export default Header;
