import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Tabs, Typography, Layout, Card } from "antd";
import '../App.css';
import Login from "../components/authentication/Login" // Import Login component
import Signup from "../components/authentication/Signup"; // Import Signup component

const { Title } = Typography;
const { TabPane } = Tabs;
const { Content } = Layout;

function Homepage() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) history.push("/chats");
  }, [history]);

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <Content style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card
          style={{
            width: "400px",
            textAlign: "center",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Title level={2} style={{ fontFamily: "Work Sans" }}>
            Talk-A-Tive
          </Title>
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Login" key="1">
              <Login /> {/* Render Login component here */}
            </TabPane>
            <TabPane tab="Sign Up" key="2">
              <Signup /> {/* Render Signup component here */}
            </TabPane>
          </Tabs>
        </Card>
      </Content>
    </Layout>
  );
}

export default Homepage;
