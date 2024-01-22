import React, { useState,useEffect,useRef } from 'react'
import Sidebar from '../Components/Sidebar'
import "../Styles/Documents/YourDocuments.css";
import Navigate from '../Components/Navigate'
import { Card, Col, Row,Form, InputGroup, Button,Dropdown,Modal, Table } from 'react-bootstrap';
import {FiSearch} from "react-icons/fi";
import {HiViewList} from "react-icons/hi";
import { BsPlus, BsThreeDotsVertical,BsFillGrid3X3GapFill } from 'react-icons/bs';
import {useNavigate, useLocation} from "react-router-dom";
import pdfimg from "../Assets/pdf.svg"
import folderimg from "../Assets/folder.svg";
import xlsimg from "../Assets/xlsFile.svg";
import wordimg from "../Assets/wordfile.svg";
import Swal from 'sweetalert2';
import { FaSave } from "react-icons/fa";
import { TfiDownload } from "react-icons/tfi";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { FaUserGroup } from "react-icons/fa6";


function YourDocuments() {

  const navigate=useNavigate();

//  let empId=window.location.href




//  console.log(empId);


const [showAccess, setShowAccess] = useState(false);

const handleCloseAccess = () => setShowAccess(false);
const handleShowAccess = () => setShowAccess(true);






const [showAccess1, setShowAccess1] = useState(false);

const handleCloseAccess1 = () => setShowAccess1(false);
const handleShowAccess1 = () => setShowAccess1(true);


const location = useLocation();
const [employeeId, setEmployeeId] = useState(null);

useEffect(() => {
  const params = new URLSearchParams(location.search);
  const idFromUrl = params.get('EmployeeId');

  setTimeout(() => {
    
    if (idFromUrl) {
      // Update state with the EmployeeId
      setEmployeeId(idFromUrl);
      sessionStorage.setItem("EmployeeID",idFromUrl)
      
    }
  }, 2000);


  const url=`https://www.orthosquareportal.com/BMAPI/BombayMetricsService.svc/GetDirectory/0/${idFromUrl}`;

  fetch(url)
  .then((res)=>res.json())
  .then((result)=>{
    console.log(result);

    setdata(result);

    setDirectories(result.Directory);

    setDocuments(result.Document);


  })
}, [location.search]);




console.log(employeeId);




let empID=sessionStorage.getItem("EmployeeID");



  const [shareWith, setshareWith] = useState([])

const sharelistUrl=`https://www.orthosquareportal.com/BMAPI/BombayMetricsService.svc/GetEmployeeList/${empID}`;


  useEffect(()=>{

    
fetch(sharelistUrl)
.then((res)=>res.json())
.then((result)=>{
  console.log(result.Data);


  setshareWith(result.Data)
})
  },[])

  const [deleteDoc, setdeleteDoc] = useState({
    DocumentID:"",
    Reason:"",
    DeletedBy:"1"
  })


  const [deleteDir, setdeleteDir] = useState({
    DirectoryID:"",
    Reason:"",
    DeletedBy:"1"
  })


  const [shareDirectory, setshareDirectory] = useState({
    DocumentAccessID:"0",
    EmployeeID:"",
    CreatedBy:"1",
    Reads:"",
    Write:"",
    DirectoryID:""
  })


  const [shareDocument, setshareDocument] = useState({
    DocumentAccessID:"0",
    EmployeeID:"",
    CreatedBy:"1",
    Reads:"",
    Write:"",
    DirectoryID:"",
    DocumentID:""
  })

const [dirId, setdirId] = useState("")


const [docID, setdocID] = useState("")






  const [data, setdata] = useState(null)

  const [directories, setDirectories] = useState([]);

  const [documents, setDocuments] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const [showshareDoc, setshowshareDoc] = useState(false);

  const handleCloseShareDoc=()=>setshowshareDoc(false);
  const handleShowShareDoc=()=>setshowshareDoc(true);

  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);


  const [docdelShow, setdocdelShow] = useState(false);

  const handleDocDelClose=()=>setdocdelShow(false);
  const handleDocDelShow=()=>setdocdelShow(true);


  const [dirdelShow, setdirdelShow] = useState(false);

  const handleDirDelClose=()=>setdirdelShow(false);
  const handleDirDelShow=()=>setdirdelShow(true);



  const [showfiles, setshowfiles] = useState(false)

  
  const handleClosefiles=()=>setshowfiles(false);
  const handleShowfiles=()=>setshowfiles(true);




  useEffect(()=>{

   
     
   
  
  },[])


const [DocInfo, setDocInfo] = useState([]);


let DocInfoID=sessionStorage.getItem("InfoDoc");





const docinfoUrl=`https://www.orthosquareportal.com/BMAPI/BombayMetricsService.svc/GetDocumentInfo/${DocInfoID}/${empID}`;



const getDocInfo=()=>{
  fetch(docinfoUrl)
  .then((res)=>res.json())
  .then((result)=>{
    console.log(result);
    setDocInfo(result?.Data[0])
  })
}


  


  const [showInfo, setshowInfo] = useState(false);
  

const handleCloseInfo=()=>setshowInfo(false);
const handleShowInfo=()=>{
  
  setshowInfo(true)

};




const [DirInfo, setDirInfo] = useState([]);

let DirInfoID=sessionStorage.getItem("InfoDir");


const dirinfoUrl=`https://www.orthosquareportal.com/BMAPI/BombayMetricsService.svc/GetDirectoryInfo/${DirInfoID}/${empID}`;


const getDirinfo=()=>{
  fetch(dirinfoUrl)
  .then((res)=>res.json())
  .then((result)=>{
    console.log(result);
    setDirInfo(result.Data[0])
  })
}


useEffect(()=>{
  getDirinfo();
},[DirInfoID])
  


const [showDirInfo, setshowDirInfo] = useState(false);
  

const handleCloseDirInfo=()=>setshowDirInfo(false);
const handleShowDirInfo=()=>{
  
  setshowDirInfo(true)

};


  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // const handleSearchClick = () => {
  //   // Filter the data based on DocumentTitle or DirectoryName
  //   const filtered = {
  //     Directory: data.Directory.filter((item) => {
  //       return (
  //         item.DirectoryName.toLowerCase().includes(filter.toLowerCase()) ||
  //         item.DocumentTitle.toLowerCase().includes(filter.toLowerCase())
  //       );
  //     }),
  //     Document: data.Document.filter((item) => {
  //       return item.DocumentTitle.toLowerCase().includes(filter.toLowerCase());
  //     }),
  //   };

  //   setDirectories(filtered?.Directory)
  //   setDocuments(filtered?.Document)
  //   setFilteredData(filtered);
  // };

const [docpath, setdocpath] = useState("")

const [docRead, setdocRead] = useState("")

const [docWrite, setdocWrite] = useState("")

const [docShared, setdocShared] = useState("")




const [docName, setdocName] = useState("")


  const handleSearchClick = () => {
    // Filter the data based on DocumentTitle or DirectoryName
    const filtered = {
      Directory: data.Directory.filter((item) => {
        return (
          (item.DirectoryName && item.DirectoryName.toLowerCase().includes(filter.toLowerCase())) ||
          (item.DocumentTitle && item.DocumentTitle.toLowerCase().includes(filter.toLowerCase()))
        );
      }),
      Document: data.Document.filter((item) => {
        return item.DocumentTitle && item.DocumentTitle.toLowerCase().includes(filter.toLowerCase());
      }),
    };

    setDirectories(filtered?.Directory)
    setDocuments(filtered?.Document)
    setFilteredData(filtered);
  };


  // let permmission=document.getElementById("perm")?.value;
  // let shareWithEmps=document.getElementById("sharewith")?.value;



  
  const [teamData, setTeamData] = useState({
    Reads:"",
    Writes:"",
    GroupID:"",
    EmployeeID:empID,
    DirectoryID:"",
    ObjGroupD:[]
  })



  const [teamDataDoc, setTeamDataDoc] = useState({
    Reads:"",
    Writes:"",
    GroupID:"",
    EmployeeID:empID,
    DocumentID:"",
    ObjGroup:[]
  })



  const [toggleView, settoggleView] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedEmployees1, setSelectedEmployees1] = useState([]);



  const handleCheckboxChange = (employeeId, isChecked) => {
    // Find the index of the employee in the selectedEmployees array
    const employeeIndex = selectedEmployees.findIndex(emp => emp.GroupEmployeeID === employeeId);

    // If the employee is not in the array and is checked, add them to the array
    if (isChecked && employeeIndex === -1) {
      const newEmployee = {
        GroupEmployeeID: employeeId,
        IsApprovar: false, // Initially set to false
      };
      setSelectedEmployees([...selectedEmployees, newEmployee]);


      setTeamData((pre)=>{
        return{
          ...pre,
          ObjGroupD:[...selectedEmployees, newEmployee]
        }
      })
      
    }

    // If the employee is in the array and is unchecked, remove them from the array
    if (!isChecked && employeeIndex !== -1) {
      const updatedEmployees = [...selectedEmployees];
      updatedEmployees.splice(employeeIndex, 1);
      setSelectedEmployees(updatedEmployees);

      setTeamData((pre)=>{
        return{
          ...pre,
          ObjGroupD:updatedEmployees
        }
      })
    }


    console.log(teamData)
  };

  const handleApproverCheckboxChange = (employeeId, isApprover) => {
    // Update the isApprover property of the selected employee
    const updatedEmployees = selectedEmployees.map(emp => {
      if (emp.GroupEmployeeID === employeeId) {
        return { ...emp, IsApprovar: !isApprover }; // Toggle the isApprover value
      }
      return emp;
    });




    setSelectedEmployees(updatedEmployees);

    setTeamData((pre)=>{
      return{
        ...pre,
        ObjGroupD:updatedEmployees
      }
    })


    console.log(teamData)
  };




  const handleCheckboxChange1 = (employeeId, isChecked) => {
    // Find the index of the employee in the selectedEmployees array
    const employeeIndex = selectedEmployees1.findIndex(emp => emp.GroupEmployeeID === employeeId);

    // If the employee is not in the array and is checked, add them to the array
    if (isChecked && employeeIndex === -1) {
      const newEmployee = {
        GroupEmployeeID: employeeId,
        IsApprovar: false, // Initially set to false
      };
      setSelectedEmployees1([...selectedEmployees1, newEmployee]);


      setTeamDataDoc((pre)=>{
        return{
          ...pre,
          ObjGroup:[...selectedEmployees1, newEmployee]
        }
      })
      
    }

    // If the employee is in the array and is unchecked, remove them from the array
    if (!isChecked && employeeIndex !== -1) {
      const updatedEmployees = [...selectedEmployees1];
      updatedEmployees.splice(employeeIndex, 1);
      setSelectedEmployees1(updatedEmployees);

      setTeamDataDoc((pre)=>{
        return{
          ...pre,
          ObjGroup:updatedEmployees
        }
      })
    }


    console.log(teamDataDoc)
  };

  const handleApproverCheckboxChange1 = (employeeId, isApprover) => {
    // Update the isApprover property of the selected employee
    const updatedEmployees = selectedEmployees1.map(emp => {
      if (emp.GroupEmployeeID === employeeId) {
        return { ...emp, IsApprovar: !isApprover }; // Toggle the isApprover value
      }
      return emp;
    });




    setSelectedEmployees1(updatedEmployees);

    setTeamDataDoc((pre)=>{
      return{
        ...pre,
        ObjGroup:updatedEmployees
      }
    })


    console.log(teamDataDoc)
  };


  const countApproverTrue = selectedEmployees?.filter(employee => employee.IsApprovar).length;

  console.log(countApproverTrue);


  const countApproverTrue1 = selectedEmployees1?.filter(employee => employee.IsApprovar).length;

  console.log(countApproverTrue1);



  // const modalRef = useRef(null);s


    const handleContextMenu = (e) => {
      e.preventDefault();
    };

   const [docpathfile, setdocpathfile] = useState("")

   const docs = [
    { uri: docpathfile }, // Remote file
    // { uri: require("./file-example.xls") }, // Local File
  ];



  return (
    <>
    <Navigate/>
    <div className='pblock'>
   
<Sidebar/>
    <div className="content">

    <Row className='m-4'>
      <Col>
      <Card className='p-3'>
        <p className='docTitle mb-4'>Your Documents</p>
        <Row>
          <Col>
          <Row>
<Col md={8}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1" className='igicon p-2'><FiSearch/></InputGroup.Text>
        <Form.Control
          placeholder="search folder/document"
          aria-label="Username"
          aria-describedby="basic-addon1"
          className='p-2 igsrch'
          value={filter}
          onChange={handleFilterChange}
  
          
          />
      </InputGroup>
      
      </Form.Group>
          </Col>
          <Col md={4}>
          <Button variant='' className='srchBtn px-4 p-2 mx-3' onClick={handleSearchClick}>Search</Button>
          </Col>
          </Row>
          </Col>
          <Col>
          
          <Button variant='' className='addFol p-2 mx-3 px-4' onClick={()=>{
            
            navigate(("/addFol"))
          }}><BsPlus className='mx-2' fontSize={25}/><span>Add New Folder</span></Button>
          <Button variant='' className='addDoc p-2' onClick={()=>{
          navigate("/addDoc")
          }}><BsPlus className='mx-2' fontSize={25}/><span>Add New Document</span></Button>
          </Col>
        </Row>
        <hr className='hrline'/>

        <Row>
          <Col className='d-flex'>
          <Button variant='' className='m-2 mb-0' onClick={()=>settoggleView(false)}><BsFillGrid3X3GapFill fontSize={22}/></Button>
          <Button variant='' className='m-2 mb-0' onClick={()=>settoggleView(true)}><HiViewList fontSize={23}/></Button>
          </Col>
        
        </Row>

        {/* <div className="foldersorfiles">
          
        </div> */}

        <div className='alldocs mt-4'>

       

       {!toggleView && <Row className='mt-4'>
          {
            directories? directories?.map((dir,i)=>{
              return(
                <>
                  <Col md={2}>
          <Card className='foldCrd p-3 border-0 m-2' onClick={()=>{
            sessionStorage.setItem("rootFolder",dir?.DirectoryID)
sessionStorage.setItem("rootfName",dir?.DirectoryName);
         

          console.log(dir?.DirectoryID);
            navigate("/inFolder")
          }}>
            <Row>
              <Col>
              <img src={folderimg} alt="" srcset="" /><span className='threedot mt-2'><Button variant='' onClick={(e)=>{
                e.stopPropagation();

              
              }}>
                <Dropdown>
                      <Dropdown.Toggle variant="" id="dropdown-basic">
                      <BsThreeDotsVertical fontSize={20}/> 
                      </Dropdown.Toggle>
                
                      <Dropdown.Menu className='p-2 dm'>
                      
                        {dir?.sharedDirectory==="0"?<Dropdown.Item href="" className='p-2' onClick={()=>{
                          console.log(dir?.DirectoryID);
                            setdirId(dir?.DirectoryID);
                           
                          handleShow();
                        }}>Share</Dropdown.Item>:""}

                        <Dropdown.Divider/>
                         {dir?.sharedDirectory==="0"?  <Dropdown.Item href="" className='p-2' onClick={()=>{
                          setdeleteDir((pre)=>{
                            return{
                              ...pre,
                              DirectoryID:dir?.DirectoryID
                            }
                          })
                          handleDirDelShow()
                        }}>Delete</Dropdown.Item>:""}
                        <Dropdown.Divider/>
                
                        <Dropdown.Item href="" className='p-2' onClick={()=>{
                          sessionStorage.setItem("InfoDir",dir?.DirectoryID)
                          fetch(`https://www.orthosquareportal.com/BMAPI/BombayMetricsService.svc/GetDirectoryInfo/${dir?.DirectoryID}/${empID}`)
                          .then((res)=>res.json())
                          .then((result)=>{
                            console.log(result);
                            setDirInfo(result.Data[0])
                          })
                          handleShowDirInfo();
                        }}>Info</Dropdown.Item>
                        <Dropdown.Divider/>
                
                        {dir?.sharedDirectory==="0"?<Dropdown.Item href="" className='p-2' 
                        onClick={()=>{
                          setTeamData((pre)=>{
                            return{
                              ...pre,
                              DirectoryID:dir?.DirectoryID,
                              GroupID:dir?.GroupID
                            }
                          })
                          handleShowAccess()
                        }}
                        >Team access</Dropdown.Item>:""}
                      </Dropdown.Menu>
                    </Dropdown>
              </Button></span>
              <p className='mt-3 foldTitle'>{dir?.DirectoryName}</p>
              <p className='mt-3 foldContent'>{dir?.Contain}</p>
              <p className='mt-3'>{dir?.sharedDirectory==="1"?<FaUserGroup fontSize={20} title='Shared' onClick={(e)=>e.stopPropagation()}/>:<p>&nbsp;</p>}</p>

              </Col>
            </Row>
          </Card>
          </Col>
                </>
              )
            })
            :""
          }
        
        </Row>
}
        {!toggleView && <Row className='mt-4'> 
        {
            documents? documents?.map((doc,i)=>{
              return(
                <>
                  <Col md={2}>
          <Card className='foldCrd p-3 border-0 m-2' onClick={(e)=>{
            // e.stopPropagation()

            if(doc?.DocumentType==="jpeg"||"jpg"||"png"||"jfif"){
              setdocpath(doc?.DocumentPath) 

              setdocRead(doc?.Reads)
              setdocWrite(doc?.Write)
              setdocShared(doc?.sharedDocument)

              setdocName(doc?.DocumentTitle)
              // setTimeout(() => {
                handleShow1()
              // }, 1000);
            }
            
            if(doc?.DocumentType==="pdf" || doc?.DocumentType==="xls" ||doc?.DocumentType==="xlsx" || doc?.DocumentType==="doc" || doc?.DocumentType==="docx"){
              // navigate(doc?.DocumentPath)
              // window.open(doc?.DocumentPath, "_blank");
setdocpathfile(doc?.DocumentPath)


setdocRead(doc?.Reads)
setdocWrite(doc?.Write)
setdocShared(doc?.sharedDocument)

console.log(docpathfile);


console.log(docs);


handleShowfiles();

            }

          }}>
            <Row>
              <Col>
              <img src={doc?.DocumentPath.endsWith("jpeg")||doc?.DocumentPath.endsWith("jpg")||doc?.DocumentPath.endsWith("png")||doc?.DocumentPath.endsWith("jfif")?doc?.DocumentPath:doc?.DocumentType.endsWith("pdf")?pdfimg:doc?.DocumentType.endsWith("xls")||doc?.DocumentType.endsWith("xlsx")?xlsimg:doc?.DocumentType.endsWith("doc")||doc?.DocumentType.endsWith("docx")?wordimg:""} alt="" srcset="" width={150} height={150}/><span className='threedot mt-2'><Button variant='' onClick={(e)=>{
                e.stopPropagation();

              
              }}>
                <Dropdown>
                      <Dropdown.Toggle variant="" id="dropdown-basic">
                      <BsThreeDotsVertical fontSize={20}/> 
                      </Dropdown.Toggle>
                
                      <Dropdown.Menu className='p-2 dm'>
                        {doc?.sharedDocument==="0"?<Dropdown.Item href="" className='p-2' onClick={()=>{
                          console.log(doc?.DocumentID);
                            // setdirId(dir?.DirectoryID)
                           setdocID(doc?.DocumentID)
                          handleShowShareDoc();
                        }}>Share</Dropdown.Item>:""}
                        <Dropdown.Divider/>
                        {doc?.sharedDocument==="0"? <Dropdown.Item href="" className='p-2' onClick={()=>{
                          setdeleteDoc((pre)=>{
                            return{
                              ...pre,
                              DocumentID:doc?.DocumentID
                            }
                          })
                          handleDocDelShow()
                        }}>Delete</Dropdown.Item>:""}
                        <Dropdown.Divider/>
                
                        <Dropdown.Item href="" className='p-2' onClick={(e)=>{
                          sessionStorage.setItem("InfoDoc",doc?.DocumentID)
                          fetch(`https://www.orthosquareportal.com/BMAPI/BombayMetricsService.svc/GetDocumentInfo/${doc?.DocumentID}/${empID}`)
                          .then((res)=>res.json())
                          .then((result)=>{
                            console.log(result);
                            setDocInfo(result.Data[0])
                          })


                          handleShowInfo();
                        }}>Info</Dropdown.Item>

<Dropdown.Divider/>
                
                <Dropdown.Item href="" className='p-2' onClick={(e)=>{
                  sessionStorage.setItem("histDoc",doc?.DocumentID)
            
                  navigate(`/doc-hst/${doc?.DocumentID}`)
                }}>History</Dropdown.Item>


<Dropdown.Divider/>
                
                {doc?.sharedDocument==="0"?   <Dropdown.Item href="" className='p-2' 
                onClick={()=>{
                  setTeamDataDoc((pre)=>{
                    return{
                      ...pre,
                      DocumentID:doc?.DocumentID,
                      GroupID:doc?.GroupID
                    }
                  })
                  handleShowAccess1()
                }}
                >Team access</Dropdown.Item>:""}

                      </Dropdown.Menu>
                    </Dropdown>
              </Button></span>
              <p className='mt-3 foldTitle'>{doc?.DocumentTitle}</p>
              <p className='mt-3'>{doc?.sharedDocument==="1"?<FaUserGroup fontSize={20} title='Shared'/>:<p>&nbsp;</p>}</p>
              </Col>
            </Row>
          </Card>

       
          </Col>
                </>
              )
            })
            :""
          }

        </Row>}



        {/* --------------------------------------list view--------------------------------------- */}
{
  toggleView && directories?.map((drc,i)=>{
    return(
      <>
      <Card className='foldCrd p-3 pt-0 border-0 m-2' onClick={()=>{
            sessionStorage.setItem("rootFolder",drc?.DirectoryID)
            sessionStorage.setItem("rootfName",drc?.DirectoryName);

         

          console.log(drc?.DirectoryID);
            navigate("/inFolder")
          }}>
        <Row className='mt-4'>
          <Col>
          <img src={folderimg} alt="" srcset="" /> <span>{drc?.DirectoryName}</span><span className='threedot mt-2'><Button variant='' onClick={(e)=>{
                e.stopPropagation();

              
              }}>
                <Dropdown>
                      <Dropdown.Toggle variant="" id="dropdown-basic">
                      <BsThreeDotsVertical fontSize={20}/> 
                      </Dropdown.Toggle>
                
                      <Dropdown.Menu className='p-2 dm'>
                       {drc?.sharedDirectory==="0"? <Dropdown.Item href="" className='p-2' onClick={()=>{
                          console.log(drc?.DirectoryID);
                            setdirId(drc?.DirectoryID)
                           
                          handleShow();
                        }}>Share</Dropdown.Item>:""}
                        <Dropdown.Divider/>
                        <Dropdown.Item href="" className='p-2' onClick={()=>{
                          setdeleteDir((pre)=>{
                            return{
                              ...pre,
                              DirectoryID:drc?.DirectoryID
                            }
                          })
                          handleDirDelShow()
                        }}>Delete</Dropdown.Item>
                        <Dropdown.Divider/>
                
                        <Dropdown.Item href="" className='p-2' onClick={(e)=>{
                          sessionStorage.setItem("InfoDir",drc?.DirectoryID)
                          fetch(`https://www.orthosquareportal.com/BMAPI/BombayMetricsService.svc/GetDirectoryInfo/${drc?.DirectoryID}/${empID}`)
                          .then((res)=>res.json())
                          .then((result)=>{
                            console.log(result);
                            setDirInfo(result.Data[0])
                          })
                          handleShowDirInfo();
                        }}>Info</Dropdown.Item>
                         <Dropdown.Divider/>
                
                <Dropdown.Item href="" className='p-2' 
                onClick={()=>{
                  handleShowAccess()
                }}
                >Team access</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
              </Button></span>
          </Col>
        </Row>
      </Card>
      </>
    )
  })
}

{
  toggleView && documents?.map((dms,i)=>{
    return(
      <>
       <Card className='foldCrd p-3 pt-0 border-0 m-2' onClick={(e)=>{
            // e.stopPropagation()

            if(dms?.DocumentType==="jpeg"||"jpg"||"png"||"jfif"){
              setdocpath(dms?.DocumentPath) 
              setdocName(dms?.DocumentTitle)
              // setTimeout(() => {
                handleShow1()
              // }, 1000);
            }
            

            if(dms?.DocumentType==="pdf" || dms?.DocumentType==="xls" ||dms?.DocumentType==="xlsx" || dms?.DocumentType==="doc" || dms?.DocumentType==="docx"){
              // navigate(doc?.DocumentPath)
              window.open(dms?.DocumentPath, "_blank");
            }

          }}>
         <Row className='mt-4'>
           <Col>
           <img src={dms?.DocumentPath.endsWith("jpeg")||dms?.DocumentPath.endsWith("jpg")||dms?.DocumentPath.endsWith("png")||dms?.DocumentPath.endsWith("jfif")?dms?.DocumentPath:dms?.DocumentType.endsWith("pdf")?pdfimg:dms?.DocumentType.endsWith("xls")||dms?.DocumentType.endsWith("xlsx")?xlsimg:dms?.DocumentType.endsWith("doc")||dms?.DocumentType.endsWith("docx")?wordimg:""} alt="" width={50} height={50} /> <span>{dms?.DocumentTitle}</span><span className='threedot mt-2'><Button variant='' onClick={(e)=>{
                e.stopPropagation();

              
              }}>
                <Dropdown>
                      <Dropdown.Toggle variant="" id="dropdown-basic">
                      <BsThreeDotsVertical fontSize={20}/> 
                      </Dropdown.Toggle>
                
                      <Dropdown.Menu className='p-2 dm'>
                       {dms?.sharedDocument==="0"? <Dropdown.Item href="" className='p-2' onClick={()=>{
                          console.log(dms?.DocumentID);
                            // setdirId(dir?.DirectoryID)
                           setdocID(dms?.DocumentID)
                          handleShowShareDoc();
                        }}>Share</Dropdown.Item>:""}
                        <Dropdown.Divider/>
                        <Dropdown.Item href="" className='p-2' onClick={()=>{
                          setdeleteDoc((pre)=>{
                            return{
                              ...pre,
                              DocumentID:dms?.DocumentID
                            }
                          })
                          handleDocDelShow()
                        }}>Delete</Dropdown.Item>
                        <Dropdown.Divider/>
                
                        <Dropdown.Item href="" className='p-2' onClick={(e)=>{
                          sessionStorage.setItem("InfoDoc",dms?.DocumentID)
                          fetch(`https://www.orthosquareportal.com/BMAPI/BombayMetricsService.svc/GetDocumentInfo/${dms?.DocumentID}/${empID}`)
                          .then((res)=>res.json())
                          .then((result)=>{
                            console.log(result);
                            setDocInfo(result.Data[0])
                          })


                          handleShowInfo();
                        }}>Info</Dropdown.Item>

<Dropdown.Divider/>
                
                <Dropdown.Item href="" className='p-2' onClick={(e)=>{
                  sessionStorage.setItem("histDoc",dms?.DocumentID)
            
                  navigate(`/doc-hst/${dms?.DocumentID}`)
                }}>History</Dropdown.Item>

                      </Dropdown.Menu>
                    </Dropdown>
              </Button></span>
           </Col>
         </Row>
       </Card>
      </>
    )
  })
}


        <Modal show={show} onHide={handleClose} centered className='shMdl' size='lg'>
       
        <Modal.Body>
        <Row>
          <Col md={8}>
          <Form.Group className="mb-3 m-2">
          <Form.Label htmlFor="">Share with</Form.Label>
          <Form.Select id="sharewith" className='p-2' name='' onChange={(e)=>{
             setshareDirectory((pre)=>{
                              return{
                                ...pre,
                                DirectoryID:dirId,
                                EmployeeID:e.target.value
                              }
                            })

                          
          }}>
            <option></option>
            {
              shareWith?.map((share,i)=>{
                return(
                  <>
                  <option value={share?.EmployeeID}>{share?.EmployeeName}</option>
                  </>
                )
              })
            }
          </Form.Select>
        </Form.Group>
          </Col>
          <Col md={4}>
          <Form.Group className="mb-3 m-2">
          <Form.Label htmlFor="">Permission</Form.Label>
          <Form.Select id="perm" className='p-2' name='' onChange={(e)=>{
            if(e.target.value==="Read"){
              setshareDirectory((pre)=>{
                return{
                  ...pre,
                  Reads:"1",
                  Write:"0"
                }
              })
            }
            else if(e.target.value==="Write"){
              setshareDirectory((pre)=>{
                return{
                  ...pre,
                  Reads:"0",
                  Write:"1"
                }
              })
            }
            else{
              console.log("nothing selected");
            }
          }}>
            <option></option>
            <option>Read</option>
            <option>Write</option>
          </Form.Select>
        </Form.Group>
          </Col>
         </Row>    
          </Modal.Body>
        <Modal.Footer>
          <Button variant="" className='mdlcloseBtn' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="" className='mdlsaveBtn' onClick={()=>{


            console.log(shareDirectory);

            const shareUrl=`https://www.orthosquareportal.com/BMAPI/BombayMetricsService.svc/ShareDirectory`;


            if(shareDirectory.EmployeeID===""){
              Swal.fire({
                icon:"warning",
                title:"Please select an employee to share with!`"
              })
            }
            else{

            

            fetch(shareUrl,{
              method:"POST",
            headers:{
              Accept: "application/json",
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(shareDirectory)
            }).then((res)=>res.json()).then((result)=>{
                console.log(result);

                if(result.status===true){
                  Swal.fire({
                    icon:"success",
                    title:"Shared successfully!"
                  })
                  handleClose();
                  
                }else{
                  Swal.fire({
                    icon:"error",
                    title:"Something went wrong!"
                  })
                }
            })
          }
            
            }}>
           Share
          </Button>
        </Modal.Footer>
      </Modal>







      
      <Modal show={showshareDoc} onHide={handleCloseShareDoc} centered className='shMdl' size='lg'>
       
       <Modal.Body>
       <Row>
         <Col md={8}>
         <Form.Group className="mb-3 m-2">
         <Form.Label htmlFor="">Share with</Form.Label>
         <Form.Select id="sharewith" className='p-2' name='' onChange={(e)=>{
            setshareDocument((pre)=>{
                             return{
                               ...pre,
                               DirectoryID:"0",
                              DocumentID:docID,
                               EmployeeID:e.target.value
                             }
                           })

                         
         }}>
           <option></option>
           {
             shareWith?.map((share,i)=>{
               return(
                 <>
                 <option value={share?.EmployeeID}>{share?.EmployeeName}</option>
                 </>
               )
             })
           }
         </Form.Select>
       </Form.Group>
         </Col>
         <Col md={4}>
         <Form.Group className="mb-3 m-2">
         <Form.Label htmlFor="">Permission</Form.Label>
         <Form.Select id="perm" className='p-2' name='' onChange={(e)=>{
           if(e.target.value==="Read"){
             setshareDocument((pre)=>{
               return{
                 ...pre,
                 Reads:"1",
                 Write:"0"
               }
             })
           }
           else if(e.target.value==="Write"){
             setshareDocument((pre)=>{
               return{
                 ...pre,
                 Reads:"0",
                 Write:"1"
               }
             })
           }
           else{
             console.log("nothing selected");
           }
         }}>
           <option></option>
           <option>Read</option>
           <option>Write</option>
         </Form.Select>
       </Form.Group>
         </Col>
        </Row>    
         </Modal.Body>
       <Modal.Footer>
         <Button variant="" className='mdlcloseBtn' onClick={handleCloseShareDoc}>
           Cancel
         </Button>
         <Button variant="" className='mdlsaveBtn' onClick={()=>{


           console.log(shareDocument);

           const shareUrl=`https://www.orthosquareportal.com/BMAPI/BombayMetricsService.svc/ShareDocument`;


           if(shareDocument.EmployeeID===""){
             Swal.fire({
               icon:"warning",
               title:"Please select an employee to share with!`"
             })
           }
           else{

           

           fetch(shareUrl,{
             method:"POST",
           headers:{
             Accept: "application/json",
             'Content-Type': 'application/json'
           },
           body: JSON.stringify(shareDocument)
           }).then((res)=>res.json()).then((result)=>{
               console.log(result);
             
               if(result.status===true){
                 Swal.fire({
                   icon:"success",
                   title:"Shared successfully!"
                 })

                 setshareDocument((pre)=>{
                  return{
                    ...pre,
                    EmployeeID:""
                  }
                })

                 handleCloseShareDoc();
                 
               }else{
                 Swal.fire({
                   icon:"error",
                   title:"Something went wrong!"
                 })
               }
           })
         }
           
           }}>
          Share
         </Button>
       </Modal.Footer>
     </Modal>


        <Modal show={show1} onContextMenu={docWrite==="True"?console.log("editable"):handleContextMenu} onHide={handleClose1} centered className='shMdl1' size='xl'>
          <Modal.Header closeButton>
            <Modal.Title>{docName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {docWrite==="True"?<p className='text-end'><Button variant='' onClick={(e)=>{
               // Replace 'your_file_url' with the actual URL of the file you want to download
  const fileUrl = docpath;

  
  // Fetch the file as a Blob
  fetch(fileUrl)
    .then(response => response.blob())
    .then(blob => {
      // Create a temporary anchor element
      const downloadAnchor = document.createElement('a');

      // Create a URL for the Blob data
      const blobUrl = window.URL.createObjectURL(blob);

      // Set the download attribute with the desired file name
      downloadAnchor.download = docName;

      // Set the href attribute to the Blob URL
      downloadAnchor.href = blobUrl;

      // Append the anchor element to the document
      document.body.appendChild(downloadAnchor);

      // Trigger a click event on the anchor element
      downloadAnchor.click();

      // Remove the anchor element and revoke the Blob URL
      document.body.removeChild(downloadAnchor);
      window.URL.revokeObjectURL(blobUrl);
    })
    .catch(error => console.error('Error downloading file:', error));


            }}><TfiDownload/></Button></p>:""}
            <p className='text-center'><img src={docName.endsWith("pdf")?pdfimg:docName.endsWith("xls")||docName.endsWith("xlsx")?xlsimg:docName.endsWith("doc")||docName.endsWith("docx")?wordimg:docpath} alt="" srcset=""  width={500} height={500} className='m-auto'/></p>
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="" className='mdlcloseBtn' onClick={handleClose1}>
              Close
            </Button>
            <Button variant="" className='mdlsaveBtn' onClick={handleClose1}>
              Save Changes
            </Button>
          </Modal.Footer> */}
        </Modal>
   




      <Modal show={docdelShow} onHide={handleDocDelClose} centered className='shMdl1' size='xl'>
       
        <Modal.Body>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Reason for deletion</Form.Label>
        <Form.Control as="textarea" rows={3} onChange={(e)=>{
           setdeleteDoc((pre)=>{
            return{
              ...pre,
              Reason:e.target.value
            }})
        }}/>
      </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" className='mdlcloseBtn' onClick={handleDocDelClose}>
            Close
          </Button>
          <Button variant="" className='mdlsaveBtn' onClick={()=>{
            console.log(deleteDoc);

            const deleteUrl=`https://www.orthosquareportal.com/BMAPI/BombayMetricsService.svc/DeleteDocument`;


            if(deleteDoc?.Reason===""){
              Swal.fire({
                icon:"warning",
                title:"Please mention the reason of deletion!"
              })
            }else{

            

            fetch(deleteUrl,{
              method:"POST",
            headers:{
              Accept: "application/json",
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(deleteDoc)
            }).then((res)=>res.json()).then((result)=>{
              console.log(result);

              if(result.status===true){
                Swal.fire({
                  icon:"success",
                  title:"Deleted successfully!"
                })
                handleDocDelClose();
                
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }
              else{
                Swal.fire({
                  icon:"error",
                  title:"Something went wrong!"
                })
              }
            })
          }
            }}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>




      <Modal show={dirdelShow} onHide={handleDirDelClose} centered className='shMdl2' size='xl'>
       
       <Modal.Body>
       <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
       <Form.Label>Reason for deletion</Form.Label>
       <Form.Control as="textarea" rows={3} onChange={(e)=>{
          setdeleteDir((pre)=>{
           return{
             ...pre,
             Reason:e.target.value
           }})
       }}/>
     </Form.Group>
       </Modal.Body>
       <Modal.Footer>
         <Button variant="" className='mdlcloseBtn' onClick={handleDirDelClose}>
           Close
         </Button>
         <Button variant="" className='mdlsaveBtn' onClick={()=>{
           console.log(deleteDir);

           const deleteUrl=`https://www.orthosquareportal.com/BMAPI/BombayMetricsService.svc/DeleteDirectory`;

           fetch(deleteUrl,{
             method:"POST",
           headers:{
             Accept: "application/json",
             'Content-Type': 'application/json'
           },
           body: JSON.stringify(deleteDir)
           }).then((res)=>res.json()).then((result)=>{
             console.log(result);

             if(result.status===true){
               Swal.fire({
                 icon:"success",
                 title:"Deleted successfully!"
               })
               handleDocDelClose();
               
               setTimeout(() => {
                 window.location.reload();
               }, 1000);
             }
             else{
               Swal.fire({
                 icon:"error",
                 title:"Something went wrong!"
               })
             }
           })
           }}>
           Delete
         </Button>
       </Modal.Footer>
     </Modal>






  <Modal show={showInfo} onHide={handleCloseInfo} centered className='shMdl3'>
       <Modal.Header closeButton>Info</Modal.Header>
       <Modal.Body>
   <p>Type: <span>{DocInfo?.DocumentType}</span></p>
   <p>Size: <span>{DocInfo?.Size}</span></p>
   <p>Version: <span>{DocInfo?.VersionNo}</span></p>
   <p>Created: <span>{DocInfo?.UploadedBy}</span></p>
   <p>Modified: <span>{DocInfo?.UpdatedBy}</span></p>
   <p>Who has access: <span>Me &{DocInfo?.SharedTo} other(s)</span></p>
       </Modal.Body>
      
     </Modal>




     <Modal show={showDirInfo} onHide={handleCloseDirInfo} centered className='shMdl42'>
       <Modal.Header closeButton>Info</Modal.Header>
       <Modal.Body>
   <p>Name: <span>{DirInfo?.DirectoryName}</span></p>
   <p>Size: <span>{DirInfo?.Size}</span></p>
   <p>Contains: <span>{DirInfo?.Contain}</span></p>
   <p>Created: <span>{DirInfo?.CreatedOn}</span></p>
   {/* <p>Modified: <span>{DirInfo?.UpdatedBy}</span></p> */}
   {/* <p>Who has access: <span>Me &{DirInfo?.SharedTo} other(s)</span></p> */}
       </Modal.Body>
      
     </Modal>











     <Modal show={showAccess} onHide={handleCloseAccess} centered size='lg'>
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
<Row className='gap-3'>
  <Col md={4}>
  <Form.Group className="mb-4" controlId="formBasicEmail">
  <Form.Label>Search</Form.Label>

          <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1" className='igicon p-2'><FiSearch/></InputGroup.Text>
        <Form.Control
          placeholder="search employee"
          aria-label="Username"
          aria-describedby="basic-addon1"
          className='p-2 igsrch'
          // value={filter}
          // onChange={handleFilterChange}
  
          
          />
      </InputGroup>
      
      </Form.Group>
  </Col>
  <Col md={4}>
  <Form.Group className="mb-3">
        <Form.Label>Permission <span className='req-t'>*</span></Form.Label>
        <Form.Select placeholder='Select Permission' className='p-2' onChange={(e)=>{
            if(e.target.value==="Read"){
              setTeamData((pre)=>{
                return{
                  ...pre,
                  Reads:"1",
                  Writes:"0"
                }
              })
            }
            else if(e.target.value==="Write"){
              setTeamData((pre)=>{
                return{
                  ...pre,
                  Reads:"0",
                  Writes:"1"
                }
              })
            }
            else{
              console.log("nothing selected");
            }
          }}>
          <option value=""></option>
          <option value="Read">Read</option>
          <option value="Write">Write</option>
        </Form.Select>
      </Form.Group>
  </Col>
  <Col md={2}>
  <Card className='text-center border-0'>

  <Button variant='' className='mt-2 p-1 saveTeamBtn' onClick={(e)=>{
e.preventDefault();

const dirPermUrl=`https://www.orthosquareportal.com/BMAPI/BombayMetricsService.svc/InsertGroupMemberD`;


// if(teamData?.Reads==="" || teamData?.Writes===""){
  



fetch(dirPermUrl,{
  method:"POST",
  headers:{
    Accept: "application/json",
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(teamData)
})
.then((res)=>res.json())
.then((result)=>{
  console.log(result);

  if(result.Status===true){
    Swal.fire({
      icon:'success',
      title:"Group access granted!"
    })

    window.location.reload();
  }
  else{
    Swal.fire({
      icon:"error",
      title:"Something went wrong!"
    })
  }
})

// }
// else{
//   Swal.fire({
//     icon:"success",
//     title:"fill required data"
//   })
// }


  }}><FaSave fontSize={20} color='#ED5A1B'/> <br /> <p className='text-center'>Save</p>
</Button>
  </Card>
  </Col>
</Row>



<Table responsive className='teamTbl'>
<thead>
  <tr>
    <th>Select Employees</th>
    <th>Approver</th>
  </tr>
</thead>

<tbody>
{
             shareWith?.map((share,i)=>{
               return(
                 <>
<tr>
                 <td value={share?.EmployeeID} className='empTD'>  <Form.Group className="mb-3">
        <Form.Check type="checkbox" label={share?.EmployeeName} onChange={(e) => handleCheckboxChange(share?.EmployeeID, e.target.checked)}/>
      </Form.Group></td>
                 <td className="approvertd">
                 <Form.Group className="mb-3">
        <Form.Check type="checkbox" label="Mark as approver" disabled={countApproverTrue>=2}   onChange={() => handleApproverCheckboxChange(share?.EmployeeID, share?.isApprover)}/>
      </Form.Group>
                 </td>
</tr>
                 </>
               )
             })
           }
 
</tbody>
</Table>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAccess}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseAccess}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>




{/* ---------------------------------------------doc grp---------------------------- */}





      <Modal show={showAccess1} onHide={handleCloseAccess1} centered size='lg'>
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
<Row className='gap-3'>
  <Col md={4}>
  <Form.Group className="mb-4" controlId="formBasicEmail">
  <Form.Label>Search</Form.Label>

          <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1" className='igicon p-2'><FiSearch/></InputGroup.Text>
        <Form.Control
          placeholder="search employee"
          aria-label="Username"
          aria-describedby="basic-addon1"
          className='p-2 igsrch'
          // value={filter}
          // onChange={handleFilterChange}
  
          
          />
      </InputGroup>
      
      </Form.Group>
  </Col>
  <Col md={4}>
  <Form.Group className="mb-3">
        <Form.Label>Permission <span className='req-t'>*</span></Form.Label>
        <Form.Select placeholder='Select Permission' className='p-2' onChange={(e)=>{
            if(e.target.value==="Read"){
              setTeamDataDoc((pre)=>{
                return{
                  ...pre,
                  Reads:"1",
                  Writes:"0"
                }
              })
            }
            else if(e.target.value==="Write"){
              setTeamDataDoc((pre)=>{
                return{
                  ...pre,
                  Reads:"0",
                  Writes:"1"
                }
              })
            }
            else{
              console.log("nothing selected");
            }
          }}>
          <option value=""></option>
          <option value="Read">Read</option>
          <option value="Write">Write</option>
        </Form.Select>
      </Form.Group>
  </Col>
  <Col md={2}>
  <Card className='text-center border-0'>

  <Button variant='' className='mt-2 p-1 saveTeamBtn' onClick={(e)=>{
e.preventDefault();

const dirPermUrl=`https://www.orthosquareportal.com/BMAPI/BombayMetricsService.svc/InsertGroupMember`;


// if(teamData?.Reads==="" || teamData?.Writes===""){
  



fetch(dirPermUrl,{
  method:"POST",
  headers:{
    Accept: "application/json",
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(teamDataDoc)
})
.then((res)=>res.json())
.then((result)=>{
  console.log(result);

  if(result.Status===true){
    Swal.fire({
      icon:'success',
      title:"Group access granted!"
    })

    window.location.reload();
  }
  else{
    Swal.fire({
      icon:"error",
      title:"Something went wrong!"
    })
  }
})

// }
// else{
//   Swal.fire({
//     icon:"success",
//     title:"fill required data"
//   })
// }


  }}><FaSave fontSize={20} color='#ED5A1B'/> <br /> <p className='text-center'>Save</p>
</Button>
  </Card>
  </Col>
</Row>



<Table responsive className='teamTbl'>
<thead>
  <tr>
    <th>Select Employees</th>
    <th>Approver</th>
  </tr>
</thead>

<tbody>
{
             shareWith?.map((share,i)=>{
               return(
                 <>
<tr>
                 <td value={share?.EmployeeID} className='empTD'>  <Form.Group className="mb-3">
        <Form.Check type="checkbox" label={share?.EmployeeName} onChange={(e) => handleCheckboxChange1(share?.EmployeeID, e.target.checked)}/>
      </Form.Group></td>
                 <td className="approvertd">
                 <Form.Group className="mb-3">
        <Form.Check type="checkbox" label="Mark as approver" disabled={countApproverTrue1>=2}   onChange={() => handleApproverCheckboxChange1(share?.EmployeeID, share?.isApprover)}/>
      </Form.Group>
                 </td>
</tr>
                 </>
               )
             })
           }
 
</tbody>
</Table>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAccess}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseAccess}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>






      <Modal show={showfiles} onContextMenu={docWrite==="True"?console.log("editable"):handleContextMenu} onHide={handleClosefiles} size='xl' centered className='shMdl4223'>
       <Modal.Header closeButton>Info</Modal.Header>
       <Modal.Body>
       </Modal.Body>
       <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} style={{ width: 1100, height: 500 }} className='m-auto'/>
      
     </Modal>
        </div>
      </Card>
      </Col>
    </Row>
    </div>
  </div>
    </>
  )
}

export default YourDocuments