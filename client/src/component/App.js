import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Bookmarks from "./Bookmarks";
import HomeFeed from "./HomeFeed";
import Profile from "./Profile";
import TweetDetails from "./TweetDetails";
import Notification from "./Notification";
import GlobalStyles from "../GobalStyles";
import Sidebar from "./Sidebar";
import { UserProvider } from "./CurrentUserContext";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Div>
        <Sidebar />
        <UserProvider>
          <Routes>
            <Route path="/" element={<HomeFeed />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/tweet/:twwetId" element={<TweetDetails />} />
            <Route path="/:profileId" element={<Profile />} />
          </Routes>
        </UserProvider>
      </Div>
    </BrowserRouter>
  );
};

export default App;

const Div = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;
