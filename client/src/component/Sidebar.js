import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as LogoIcon } from "../assets/logo.svg";
import { BsFillHouseDoorFill, BsBookmark } from "react-icons/bs";
import { BiBell } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { COLORS } from "../Constants";

const Sidebar = () => {
  return (
    <Div>
      <>
        <LogoIcon width="50" />
      </>
      <SidePart>
        <IconSpan>
          <BsFillHouseDoorFill />
        </IconSpan>
        <NavigationLink to="/">Home</NavigationLink>
      </SidePart>
      <SidePart>
        <IconSpan>
          <BiBell />
        </IconSpan>
        <NavigationLink to="/notification">Notification</NavigationLink>
      </SidePart>
      <SidePart>
        <IconSpan>
          <BsBookmark />
        </IconSpan>
        <NavigationLink to="/bookmarks">Bookmarks</NavigationLink>
      </SidePart>
      <SidePart>
        <IconSpan>
          <CgProfile />
        </IconSpan>
        <NavigationLink to="/treasurymog">Profile</NavigationLink>
      </SidePart>
    </Div>
  );
};

export default Sidebar;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
`;

const SidePart = styled.div`
  display: flex;
  align-items: center;
  padding-right: 20px;
  border-radius: 20px;
  color: black;
  &:hover {
    background-color: hsl(258deg 100% 50% / 28%);
  }
`;

const IconSpan = styled.span`
  margin: 15px 20px;
`;

const NavigationLink = styled(NavLink)`
  text-decoration: none;
  font-weight: bold;
  color: black;

  &.active {
    color: ${COLORS.primary};
  }
`;
