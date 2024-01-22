import React,{useState,useEffect} from 'react';
import "../Styles/Documents/DocumentHistory.css";
import Sidebar from '../Components/Sidebar'
import "../Styles/Documents/YourDocuments.css";
import Navigate from '../Components/Navigate'
import { Card, Col, Row,Form, InputGroup, Button,Dropdown,Modal, Table } from 'react-bootstrap';
import {FiSearch} from "react-icons/fi";
import { BsPlus, BsThreeDotsVertical } from 'react-icons/bs';
import {useNavigate} from "react-router-dom";
import pdfimg from "../Assets/pdf.svg"
import folderimg from "../Assets/folder.svg";
import xlsimg from "../Assets/xlsFile.svg";
import wordimg from "../Assets/wordfile.svg";
import Swal from 'sweetalert2';

function DocumentHistory() {
    const navigate=useNavigate();

    let docID=sessionStorage.getItem("histDoc");

    let empID=sessionStorage.getItem("EmployeeID");


    const hstUrl=`https://www.orthosquareportal.com/BMAPI/BombayMetricsService.svc/GetDocumentHistory/${docID}/${empID}`;

const [histData, sethistData] = useState([]);



    useEffect(()=>{
        fetch(hstUrl)
        .then((res)=>res.json())
        .then((result)=>{
            console.log(result);
            sethistData(result.Data)
        })
    },[])
    
  return (
   <>
    <Navigate/>
    <div className='pblock'>
   
<Sidebar/>
    <div className="content">

    <Row className='m-4'>
      <Col>
      <Card className='p-3'>
        <p className='docTitle mb-4'>History</p>
        <hr />
        <p className='pt-3'>Document Name: <span>{histData[0]?.DocumentTitle}</span></p>
        <p className='pt-3'>Uploaded By: <span>{histData[0]?.UploadedBy}</span></p>
        <p className='pt-3'>Uploaded On: <span>{histData[0]?.UploadedOn.split(" ")[0]}</span></p>
        
        <Table responsive className='mt-3'>
            <thead className='hstHead'>
                <tr className='hstrw'>
                    <th className='p-2'>Directory Path</th>
                    {/* <th className='p-2'>Shared By</th> */}
                    <th className='p-2'>Shared with</th>
                    <th className='p-2'>Shared on</th>
                </tr>
            </thead>

            <tbody>
                {
                    histData?.map((hst,i)=>{
                        return(
                            <>
                            {
                                (hst?.SharedTo && hst?.SharedOn)?
                              <tr>
                    <td className='p-2'>{hst?.DocumentPath}</td>
                    {/* <td className='p-2'>{hst?.UploadedBy}</td> */}
                    <td className='p-2'>{hst?.SharedTo}</td>
                    <td className='p-2'>{hst?.SharedOn.split(" ")[0]}</td>
                </tr>:""
                            }
                            </>
                        )
                    })
                }
              
            </tbody>
        </Table>
    
      </Card>
      </Col>
    </Row>
    </div>
  </div>
   </>
  )
}

export default DocumentHistory