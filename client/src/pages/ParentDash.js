import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "../components/Grid";
import { useStoreContext } from "../utils/GlobalState";
import CardParent from "../components/CardParent";
import API from "../utils/API";

function ParentDash() {
  const [state, dispatch] = useStoreContext();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    API.getStudentsByParent().then(res => {
      console.log("GET ALL STUDENTS By PARENT RESP", res.data);
      setStudents(res.data);
    });
  }, []);

  // const { id } = useParams();

  return (
    <Container fluid>
      <h1>Parent Dashboard</h1>
      <Row>
        <Col size='md-12'>
          <CardParent />
        </Col>
      </Row>
      <Row>
        <Col size='md-12'>
          <div className='card'>
            {/*{students.map(student => (
          <h3 key={student.id}>{student.name}</h3>
        )
        )} */}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ParentDash;
