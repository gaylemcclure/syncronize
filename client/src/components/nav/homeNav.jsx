import styled from "styled-components";
// import logo from "../../assets/images/sync-icon.png";
// import DropdownMenu from "../menus/dropdownMenu";
// import AddTaskModal from "../modals/addTaskModal";
// import AddProjectModal from "../modals/addProjectModal";
// import '../../assets/styles/sideNav.css';


const HomeNav = ({ user }) => {
  // const pathName = window.location.pathname;
  return (
      <NavWrapper>
        {/* <img className="logo" src={logo} alt="logo" />
        <div className="input-container">
          <input className="search-bar" placeholder="Search..." />
        </div>
        {pathName === "/home" && <AddProjectModal text="Add project" button='null' />}
        {pathName !== "/home" && <AddTaskModal />}
        {user && <DropdownMenu user={user} />} */}
      </NavWrapper>
  );
};

const NavWrapper = styled.nav`
  padding: 0.5rem 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: fixed;
  z-index: 5;
  width: 100%;

  .icon-size {
    height: 45px;
    width: 50px;
    font-size: 14px;
  }

  .logo {
    height: 3rem;
  }

  input,
  textarea {
    width: 20rem;
    align-self: center;
  }
  .input-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .search-bar {
    background-color: #d9d9d9;
    border: none;
    color: white;
    padding-left: 0.5rem;
  }
  .search-bar::placeholder {
    color: #7e7c7c;
  }
  .search-bar:focus {
    border: none;
  }
`;

const ButtonNav = styled.button`
  padding: 0.75rem 1rem;
  color: var(--main-green);
  border: none;
  background-color: var(--gray-text);
  border-radius: 18px;
  font-weight: 700;
  margin-left: auto;
  margin-right: 1rem;
  transition-timing-function: ease-in;
  transition-duration: 0.2s;
  font-size: 1rem;
  width: 10rem;
  display: flex;
  justify-content: center;
  &:hover {
    opacity: 0.5;
  }
`;

export default HomeNav;
