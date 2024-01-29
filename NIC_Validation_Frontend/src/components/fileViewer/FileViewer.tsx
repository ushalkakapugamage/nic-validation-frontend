import { useState, useEffect } from 'react';
import axios from 'axios';
import './FileViewer.css'
import { useNavigate } from 'react-router-dom';

const FileViewer = (prop: any) => {
    const [fileNames, setFileNames] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const navigation = useNavigate();

    const handleNavigation = (name: String) => {
        prop.handler(name)
        navigation("/tableView");
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/NIC/getFileNames');

                if (response.data && response.data.response && response.data.response.data && Array.isArray(response.data.response.data)) {
                    setFileNames(response.data.response.data);
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

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (fileNames.length === 0) {
        return <div>No records available</div>;
    }

    return (
        <div className='tbl-container'>
            <caption className='caption'>Uploaded Files</caption>
            <table className='table'>
                
                <thead>
                    <tr className='tbl-row'>
                        <th className='tbl-heading'>File Names</th>
                    </tr>
                </thead>
                <tbody>
                    {fileNames.map((fileName, index) => (
                        <tr onClick={()=>{handleNavigation(fileName)}} key={index} className='tbl-row'>
                            <td className='tbl-data'>{fileName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FileViewer;
