import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './SideBar.css'

const SideBar: React.FC = () => {
  const location = useLocation();
  const navigation = useNavigate();

  return (
    <div className="nav-bar">
      <table className='sd-tbl'>
        <tbody>
          <tr><th className='sd-tbl-th' onClick={()=>{navigation("/dashboard")}}>DashBoard</th></tr>
          <tr className={`sd-tbl-tr ${location.pathname === '/dashboard' ? 'active' : ''}`}>
            <td>
              <Link to="/dashboard">Upload File</Link>
            </td>
          </tr>
          <tr className={`sd-tbl-tr ${location.pathname === '/view' ? 'active' : ''}`}>
            <td>
              <Link to="/view">Records</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SideBar;
