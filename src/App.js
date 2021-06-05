//Tools
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
//Components + styles
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import ContainerContent from "./components/Content/ContainerContent";
import './App.scss';


function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="app-wrapper">
          <Header />
          {document.body.clientWidth >= 769 ? <Navbar /> : ''}
          <ContainerContent />
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
