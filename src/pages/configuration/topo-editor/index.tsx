// import { Editor } from "./components/main";
// import { ConfigurationProvider } from "./context";
import styled from "styled-components";

import { AssetsPanel } from "./components/assets-panel";
import { PageContextProvider } from "./components/context";
import { Header } from "./components/header";
import { Main } from "./components/main";
import { SettingsPanel } from "./components/settings-panel";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template:
    "header header header" 1fr
    "assets-panel main settings-panel" 15fr / 1fr 5fr 1fr;
`;

const TopoEditor = () => {
  return (
    <PageContextProvider>
      <Container>
        <Header />
        <AssetsPanel />
        <Main />
        <SettingsPanel />
      </Container>
    </PageContextProvider>
  );
};

export default TopoEditor;
