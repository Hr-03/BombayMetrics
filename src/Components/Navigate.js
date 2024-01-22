import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import logo from "../Assets/logo.svg";
import user from "../Assets/user.svg";
import {BsBell} from "react-icons/bs";

function Navigate() {
  return (
    <>
    <Container fluid>
<Row>
    <Col>
    <Card className='pt-0 pb-0 p-5 navcrds'>
        <Row>
            <Col>
            <img src={logo} alt="" srcset="" />
            </Col>
            <Col className=''>
            <div className="navs pt-4">
                <p className='m-2 pt-1 me-4'><BsBell fontSize={28} color='#304480'/></p>
                <p><img src={user} alt="" srcset="" className='usericon'/><span>Employee</span></p>
            </div>
            </Col>
        </Row>
    </Card>
    </Col>
</Row>
    </Container>
    </>
  )
}

export default Navigate