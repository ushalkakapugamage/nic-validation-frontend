
import "./Dashboard.css";
import FileUploader from "../uploader/FileUploader";

import FileViewer from "../fileViewer/FileViewer";


function Dashboard(prop : any) {
    
    const handler = (name : String) =>{
        prop.handler(name);
    }

    return (
        <div className="container">
            <div className="sidebar">
            </div>
            <div className="content">
                <div className="uploadArea">
                    <FileUploader />
                </div>

                <div className="viewArea">
                    <FileViewer handler={handler}  />
                </div>
            </div>

        </div>
    );
}

export default Dashboard;
