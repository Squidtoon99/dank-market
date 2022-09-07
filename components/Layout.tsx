import NavBar from "components/NavBar";
import TabBar from "components/TabBar";
import styled, { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from 'styles/theme';
import Head from "next/head";

const Content = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 400vh;
`;

const Layout: React.FC<{ children: any; }> = ({ children }) => {
    return (
        <>
            <Head>
            </Head>
            <div id="root">
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <NavBar />
                    <Content>{children}</Content>
                    <TabBar />
                </ThemeProvider>
            </div>
        </>
    );
};

export default Layout;