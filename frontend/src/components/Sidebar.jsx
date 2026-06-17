import {
  FaHome,
  FaChartLine,
  FaBell,
  FaHistory,
  FaCog
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>🚗 Drowsiness</h2>

      <ul>
        <li><FaHome /> Dashboard</li>
        <li><FaChartLine /> Analytics</li>
        <li><FaBell /> Alerts</li>
        <li><FaHistory /> History</li>
        <li><FaCog /> Settings</li>
      </ul>
    </div>
  );
}

export default Sidebar;
