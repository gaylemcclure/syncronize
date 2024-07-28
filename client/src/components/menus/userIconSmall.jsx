
const UserIconSmall = ({ userInitials }) => {
    return (
        <Icon>
          {userInitials}
        </Icon>

    )
};

const Icon = styled.button`
  background-color: var(--main-green);
  border-radius: 50%;
  border: none;
  color: white;
  font-weight: 600;
  transition-timing-function: ease-in;
  transition-duration: 0.2s;
  height: 30px;
  width: 30px;
  font-size: 12px;
  margin-right: 1rem;
  

`;

export default UserIconSmall;