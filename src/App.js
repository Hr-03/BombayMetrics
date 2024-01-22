// import logo from './logo.svg';
import './App.css';
import { Card, Col, Container, Row } from 'react-bootstrap';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import YourDocuments from './Documents/YourDocuments';
import AddDocument from './Documents/AddDocument';
import AddFolder from './Documents/AddFolder';
import InsideFolder from './Documents/InsideFolder';
import InsideFolder2 from './Documents/InsideFolder2';
import InsideFolder3 from './Documents/InsideFolder3';
import InsideFolder4 from './Documents/InsideFolder4';
import InsideFolder5 from './Documents/InsideFolder5';
import AddDocument1 from './Documents/Folder1/AddDocument1';
import AddFolder1 from './Documents/Folder1/AddFolder1';
import AddDocument2 from './Documents/Folder2/AddDocument2';
import AddFolder2 from './Documents/Folder2/AddFolder2';
import AddDocument3 from './Documents/Folder3/AddDocument3';
import AddFolder3 from './Documents/Folder3/AddFolder3';
import AddDocument4 from './Documents/Folder4/AddDocument4';
import AddFolder4 from './Documents/Folder4/AddFolder4';
import AddDocument5 from './Documents/Folder5/AddDocument5';
import DocumentHistory from './Documents/DocumentHistory';

function App() {
  return (
   <>
  <Router>
    <Routes>
      <Route path='/' element={<YourDocuments/>}/>
      <Route path='/addDoc' element={<AddDocument/>}/>
      <Route path='/addFol' element={<AddFolder/>}/>
      <Route path='/inFolder' element={<InsideFolder/>}/>
      <Route path='/inFolder2' element={<InsideFolder2/>}/>
      <Route path='/inFolder3' element={<InsideFolder3/>}/>
      <Route path='/inFolder4' element={<InsideFolder4/>}/>
      <Route path='/inFolder5' element={<InsideFolder5/>}/>
      <Route path='/addDoc1' element={<AddDocument1/>}/>
      <Route path='/addFol1' element={<AddFolder1/>}/>
      <Route path='/addDoc2' element={<AddDocument2/>}/>
      <Route path='/addFol2' element={<AddFolder2/>}/>
      <Route path='/addDoc3' element={<AddDocument3/>}/>
      <Route path='/addFol3' element={<AddFolder3/>}/>
      <Route path='/addDoc4' element={<AddDocument4/>}/>
      <Route path='/addFol4' element={<AddFolder4/>}/>
      <Route path='/addDoc5' element={<AddDocument5/>}/>
      <Route path='/doc-hst/:DocumentID' element={<DocumentHistory/>}/>
     
    </Routes>
  </Router>
   
   </>
  );
}

export default App;
