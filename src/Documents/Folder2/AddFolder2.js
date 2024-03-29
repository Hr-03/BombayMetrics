import React,{useState} from 'react'
import "../../Styles/Documents/AddFolder.css";
import Sidebar from '../../Components/Sidebar'
import "../../Styles/Documents/YourDocuments.css";
import Navigate from '../../Components/Navigate'
import { Card, Col, Row,Form, InputGroup, Button } from 'react-bootstrap';
import {FiSearch} from "react-icons/fi";
import { BsPlus, BsThreeDotsVertical } from 'react-icons/bs';
import axios from 'axios';
import Swal from 'sweetalert2';

function AddFolder2() {
    const [inputList, setInputList] = useState([{ file: null, previewUrl: '' }]);

    const [progressE1, setProgressE1] = useState(null);


let empID=sessionStorage.getItem("EmployeeID");


    const [loading, setLoading] = useState(false)
const [loading1, setLoading1] = useState(false)


let selDirID=sessionStorage.getItem("insideFolder");
    
    const [data, setData] = useState({
      DirectoryID:"0",
      DirectoryName:"",
      ParentID:selDirID?selDirID:"0",
      OrderNo:"0",
      URL:"",
      CreatedBy:empID,
      DocumentTitle:"",
      DocumentContent:"",
      DocumentType:"",
      DocumentPath:"",
      Reason:"",
      EmployeeID:empID,
      Size:""
    })

    const handle=(e)=>{
      const newdata={...data}
      newdata[e.target.name]=e.target.value;
      setData(newdata);
      console.log(newdata);

      console.log(data);
    }

    const [images, setimages] = useState([])

    const [file, setfile] = useState(null)


    const [Preview, setPreview] = useState("");


  const handleInputChange = (e) => {
    // const { files } = e.target;
    // const updatedInputList = [...inputList];
    // updatedInputList[index].file = files[0];
    // updatedInputList[index].previewUrl = URL.createObjectURL(files[0]);
    // setInputList(updatedInputList);
    // console.log(inputList)
    // let filesArray = inputList.map((input) => input.file);
    // console.log(filesArray);
    // setimages(filesArray)
    // console.log("below is images ");
    // console.log(images);

    
    setPreview(URL.createObjectURL(e.target.files[0]))
    
    setfile(e.target.files[0])
      
    setData((pre)=>{
      return{
        ...pre,
        DocumentTitle:e.target.files[0].name,
        DocumentType:e.target.files[0].name.split(".")[1],
    Size:e.target.files[0].size

      }
    })

// console.log(data);

  };

  const handleAddClick = () => {
    setInputList([...inputList, { file: null, previewUrl: '' }]);
  };

  const handleRemoveClick = (index) => {
    const updatedInputList = [...inputList];
    updatedInputList.splice(index, 1);
    setInputList(updatedInputList);
  };



  const url=`https://www.orthosquareportal.com/BMAPI/BombayMetricsService.svc/InsertDirectory`;



  const handleSubmit=(e)=>{
    e.preventDefault();

    setLoading(true)
    fetch(url,{
      method:"POST",
      headers:{
        Accept: "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res)=>res.json()).then((result)=>{
      console.log(result);
      setLoading(false)
      if(result.status===true){
        Swal.fire({
          icon:"success",
          title:"Saved successfully!"
        })

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

    console.log(data);
  }
  return (
    <>
      <Navigate/>
    <div className='pblock'>
   
<Sidebar/>
    <div className="content">

    <Row className='m-4'>
      <Col>
      <Card className='p-3'>
        <p className='docTitle mb-4'>Add New Folder</p>

        <Row className='mb-4'>
            <Col md={5}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Folder Name</Form.Label>
        <Form.Control type="text" placeholder="" name="DirectoryName" onChange={handle}  className='p-2'/>
      </Form.Group>
            </Col>
        </Row>

        {/* <Row className='multDocFol'>
            <Col md={5}>
            <p>Documents</p>


{
    inputList.map((input, index) => {
        return (
         <>
           <Card className='p-3 mb-3'>
                <Row>
                    <Col>
                    <Form.Group controlId="formFile" className="mb-3">
        
        <Form.Control type="file"  className='p-2'/>
      </Form.Group>
      <Row>
        <Col md={6}>
        <Button variant='' className='upDoc p-2 px-3'>Upload</Button>
        </Col>
        <Col md={6}>
        {input.previewUrl && input.previewUrl ? (
              <img
                src={input.previewUrl}
                alt="Preview"
                style={{ width: '100px', height: '100px' }}
              />
            ) : (
                                <img
                                  src="https://www.kineosystem.com/wp-content/uploads/2016/08/dummy-prod-1.jpg"
                                  alt="image"
                                  className='docImg' 
                                  name="ImagesBG"
                                //   style={{ width: '200px', height: '200px' }}
                                 
                                />
                              )}
        </Col>
      </Row>
                    </Col>
                    <Col>
                    {inputList.length > 1 && (
              <Button variant='' style={{float:"right",backgroundColor:"red",color:"white",borderColor:"red"}} className='mb-5 mt-2 p-2' onClick={() => handleRemoveClick(index)}>
                Remove
              </Button>
            )}



{inputList.length - 1 === index &&<Button onClick={handleAddClick} className='p-2' style={{backgroundColor:"#008000",color:"white",textTransform:"capitalize",float:"right",borderColor:"#008000"}}><BsPlus fontSize={25}/><span>Add More</span></Button>}
                    </Col>
                </Row>
            </Card>
         </>)})
}
          
            </Col>
        </Row> */}

<Row className=''>
            <Col md={5}>
            <p>Documents</p>



           <Card className='p-3 mb-3'>
                <Row>
                    <Col>
                    <Form.Group controlId="formFile" className="mb-3">
        
        <Form.Control type="file"  className='p-2' onChange={(e) => handleInputChange(e)}/>
      </Form.Group>
      <Row>
        <Col md={6}>
        <Button variant='' className='upDoc p-2 px-3' onClick={ async ()=>{
           const fd=new FormData();

          setLoading1(true)
             fd.append("stream", file);
           
         await axios.post(
            "https://www.orthosquareportal.com/BMAPI/BombayMetricsService.svc/UploadDocument",
            fd,
            {
              onUploadProgress: (ProgressEvent) => {
                // setProgressE1(
                //   Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
                // );
                console.log(
                  "Upload Progress:" +
                    Math.round(
                      (ProgressEvent.loaded / ProgressEvent.total) * 100
                    ) +
                    "%"
                );
              },
            }
          )
          .then((res) => {
            console.log(res.data);

            setLoading1(false)


            if(res.data.status==="1"){

              setData((pre)=>{
                return{
                  ...pre,
                  DocumentPath:res.data.data[0]?.Document
                }
              })


            Swal.fire({
            icon:"success",
            title:"Uploaded successfully!"
            })
            }
            else{
            Swal.fire({
            icon:"error",
            title:"Something went wrong!"
            })
            }
          })

        }}>{loading1?"loading...":"Upload"}</Button>
        </Col>
        <Col md={6}>
        {Preview && Preview ? (
              <img
                src={Preview}
                alt="Preview"
                style={{ width: '100px', height: '100px' }}
              />
            ) : (
                                <img
                                  src="https://tikkurila.com/sites/default/files/styles/thumbnail_800_auto/public/color_resources/%23808589.png?itok=IJlpFCX4"
                                  alt="image"
                                  className='docImg' 
                                  name="ImagesBG"
                                //   style={{ width: '200px', height: '200px' }}
                                 
                                />
                              )}
        </Col>
      </Row>
                    </Col>
                    {/* <Col>
                 
              <Button variant='' style={{float:"right",backgroundColor:"red",color:"white",borderColor:"red"}} className='mb-5 mt-2 p-2' onClick={() => handleRemoveClick(index)}>
                Remove
              </Button>
   



<Button onClick={handleAddClick} className='p-2' style={{backgroundColor:"#008000",color:"white",textTransform:"capitalize",float:"right",borderColor:"#008000"}}><BsPlus fontSize={25}/><span>Add More</span></Button>
                    </Col> */}
                </Row>
            </Card>
      
          
            </Col>
        </Row>
        

        <Row>
            <Col>
            <Button variant='' className='docRejBtn p-2 px-3 m-2'>cancel</Button>
            </Col>
            <Col>
            <Button variant='' className='docSaveBtn p-2 px-4 m-2' onClick={handleSubmit}>{loading?"loading...":"Save"}</Button>
            </Col>
        </Row>
      </Card>
      </Col>
    </Row>
    </div>
  </div>
    </>
  )
}

export default AddFolder2