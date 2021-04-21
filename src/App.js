//Tools
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
//Components + styles
import Header from "./components/Header/Header";
import ContainerNavbar from "./components/Navbar/ContainerNavbar";
import ContainerContent from "./components/Content/ContainerContent";
import './App.scss';


function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="app-wrapper">
          <Header />
          <ContainerNavbar />
          <ContainerContent />
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
