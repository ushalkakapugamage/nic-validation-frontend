import { useState, useEffect } from 'react';
import axios from 'axios';
import './view.css'



interface Record {
  id: number;
  age: number;
  gender: string;
  nic: string;
  birthdate: string;
  FileName: string;

}

const View = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const TableViewFromAPI = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/NIC/getAllNicFiles`);

        if (response.data && response.data.response && response.data.response.data && Array.isArray(response.data.response.data)) {
          setRecords(response.data.response.data);
        } else {
          setError('Invalid data format received from the server');
        }
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    TableViewFromAPI();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (records.length === 0) {
    return <div>No records available</div>;
  }

  return (
    <div>
      <h1>Data Table</h1><br />
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

export default View;
