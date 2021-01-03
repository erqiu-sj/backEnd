/*
 * @Author: 邱狮杰
 * @Date: 2020-12-04 14:47:31
 * @LastEditTime: 2020-12-19 13:21:27
 * @FilePath: /backEnd-main/src/App.tsx
 * @Description: homePage
 */
import React, {useState} from "react";
import {Layout, Menu} from "antd";
import {
    DesktopOutlined,
    OrderedListOutlined,
} from "@ant-design/icons";
import {Switch, Route, Redirect} from "react-router-dom";
import {Link} from "react-router-dom";
// Page
import CreatePage from "./page/create/create";
import ArticleList from "./page/ArticleList/ArticleList";
import NpmList from "./page/npmList/npmList";
import SpecialColumn from "./page/specialColumn";

const {Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

function App() {
    const [collapsed, setCollapsed] = useState(true);
    const onCollapse = () => setCollapsed((collapsed) => !collapsed);

    return (
        <Layout style={{minHeight: "100vh"}}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo"/>
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                    <Menu.Item key="1" icon={<DesktopOutlined/>}>
                        <Link to="/create">Creative center</Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<OrderedListOutlined/>} title="List">
                        <Menu.Item key="2">
                            <Link to="/articleList">ArticleList</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/npmList">NpmList</Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to="/specialColumnList">SpecialColumn</Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Content style={{margin: "0 16px"}}>
                    <div
                        className="site-layout-background"
                        style={{padding: 24, minHeight: 360}}
                    >
                        <Switch>
                            <Route path="/create" exact component={CreatePage}/>
                            <Route path="/articleList" exact component={ArticleList}/>
                            <Route path="/npmList" exact component={NpmList}/>
                            <Route path="/specialColumnList" exact component={SpecialColumn}/>
                            <Redirect to="/create"/>
                        </Switch>
                    </div>
                </Content>
                <Footer style={{textAlign: "center"}}>GoServer ©2020 react</Footer>
            </Layout>
        </Layout>
    );
}

export default App;
