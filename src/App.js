import Header from "./components/Header/Header";
import './App.scss';
import ContainerNavbar from "./components/Navbar/ContainerNavbar";
import ContainerContent from "./components/Content/ContainerContent";

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <ContainerNavbar />
      <ContainerContent />
    </div>
  );
}

export default App;
