import jsPDF from "jspdf";
import axios from "axios";

function ReportButton() {

  const generateReport = async () => {

    const statusRes = await axios.get(
      "http://127.0.0.1:5000/status"
    );

    const statsRes = await axios.get(
      "http://127.0.0.1:5000/stats"
    );

    const status = statusRes.data;
    const stats = statsRes.data;

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text(
      "Driver Drowsiness Detection Report",
      20,
      20
    );

    doc.setFontSize(12);

    doc.text(
      `EAR: ${status.ear}`,
      20,
      50
    );

    doc.text(
      `MAR: ${status.mar}`,
      20,
      60
    );

    doc.text(
      `Driver State: ${status.state}`,
      20,
      70
    );

    doc.text(
      `Total Alerts: ${stats.alerts}`,
      20,
      80
    );

    doc.text(
      `Monitoring Time: ${stats.uptime}`,
      20,
      90
    );

    doc.save(
      "Drowsiness_Report.pdf"
    );
  };

  return (

    <button
      onClick={generateReport}
      className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold"
    >
      📄 Generate Report
    </button>

  );
}

export default ReportButton;