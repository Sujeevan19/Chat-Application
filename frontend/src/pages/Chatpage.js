import { ChatState } from "../context/ChatProvider";
import MyChats from "../components/miscellaneous/MyChats";
import ChatPage from "../components/miscellaneous/ChatPage";
import SideDrawer from "../components/miscellaneous/SideDrawer";

const Chatpage = () => {
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        {user && <MyChats />}
        {user && <ChatPage />}
      </div>
    </div>
  );
};

export default Chatpage;
