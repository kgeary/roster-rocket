import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { useStoreContext } from "../utils/GlobalState";
import CardStudent from "../components/CardStudent";
import API from "../utils/API";
import * as ACTIONS from "../utils/actions";

function Student() {
  const [state, dispatch] = useStoreContext();
  const [student, setStudent] = useState(null);
  const [status, setStatus] = useState(null);
  const { id } = useParams();

  const loadData = () => {
    dispatch({ type: ACTIONS.LOADING });
    API.getStudentById(id)
      .then(res => {
        console.log("GET STUDENT BY ID " + id, res.data);
        setStudent(res.data);
        if (!res.data) {
          throw new Error("Unable to Find Student");
        }
      })
      .catch(err => {
        setStatus(<h1>{err.message}</h1>);
        setStudent(undefined);
      })
      .finally(() => {
        dispatch({ type: ACTIONS.DONE });
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const LoadScreen = () => {
    return (
      <Container fluid>
        <h1>Loading Student Data...</h1>
      </Container>
    );
  };

  if (state.loading) {
    return LoadScreen();
  }

  return (
    <Container fluid>
      {student ? (
        <React.Fragment>
          <div className='gap' />
          <h1>Student Page {student ? student.name : null}</h1>
          <Row>
            <Col size='md-12'>
              <CardStudent
                student={student}
                updateFunc={loadData}
                accordion={true}
              />
            </Col>
          </Row>
        </React.Fragment>
      ) : (
        status
      )}
    </Container>
  );
}

export default Student;
