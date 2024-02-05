import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import TableView from "./components/table/TableView";
import { useState } from "react";
import View from "./components/view/view";
import SideBar from "./components/navbar/SideBar";


function App() {
  const [fileName, setFileName] = useState<String>();
  
  const handleFileName = (name: String) => {
    setFileName(name);
  }




  return (
    <Router>
      <SideBar />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Dashboard handler={handleFileName} />} />
          <Route path="/dashboard" element={<Dashboard handler={handleFileName} />} />
          <Route path="/tableView" element={<TableView fileName={fileName} />} />
          <Route path="/view" element={<View />} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;
