import { useState, useEffect } from 'react';
import axios from 'axios';
import './TableView.css';

interface Record {
  id: number;
  age: number;
  gender: string;
  nic: string;
  birthdate: string;
  FileName: string;
}

const TableView = (prop: any) => {
  const [records, setRecords] = useState<Record[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/NIC/getNicFileByFileName?name=${prop.fileName}`);

        if (response.data && response.data.response && response.data.response.data && Array.isArray(response.data.response.data)) {
          setRecords(response.data.response.data);
        } else {
          setError('Invalid data format received from the server');
        }
      } catch (error) {
        setError('Error fetching data');
        window.alert(`Error fetching data: ${error}`);
      }
    };

    fetchDataFromAPI();
  }, []);

  const handleExport = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/NIC/generateReports?title=${prop.fileName}`, {
        responseType: 'blob',
      });


      const blob = new Blob([response.data], { type: 'application/pdf' });


      const url = URL.createObjectURL(blob);


      const a = document.createElement('a');
      a.href = url;
      a.download = 'exported_data.pdf';
      a.click();


      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting PDF:', error);
    }
  };


  if (error) {
    return <div>Error: {error}</div>;
  }

  if (records.length === 0) {
    return <div>No records available</div>;
  }

  return (
    <div>
      <h1>Data Table</h1>
      <br />
      <h3>File = {prop.fileName}</h3>
      <button onClick={handleExport} className='exp-btn'>Export</button>
      <table className='tbl'>
        <thead>
          <tr className='tbl-rw'>
            {Object.keys(records[0]).map((header) => (
              <th key={header} className='tbl-hd'>{header.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id} className='tbl-rw' style={{ padding: '10px' }}>
              {Object.values(record).map((value, index) => (
                <td key={index} className='tbl-dt'>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;