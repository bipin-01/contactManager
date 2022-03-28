import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createContactAction } from "../../actions/contactsActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function CreateContact({ history }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [department, setDepartment] = useState("");

  const dispatch = useDispatch();

  const contactCreate = useSelector((state) => state.contactCreate);
  const { loading, error, contacts } = contactCreate;


  const resetHandler = () => {
    setName("");
    setDepartment("");
    setNumber("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createContactAction(name, number, department));
    if (!name || !number || !department) return;

    resetHandler();
    history.push("/mycontacts");
  };


  useEffect(() => {}
  , [history]);

  return (
    <MainScreen title="Create a Contact">
      <Card>
        <Card.Header>Create a new Contact</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                value={name}
                placeholder="Enter the Name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="number">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                value={number}
                placeholder="Enter the Number"
                onChange={(e) => setNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="department">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="content"
                value={department}
                placeholder="Enter the Department"
                onChange={(e) => setDepartment(e.target.value)}
              />
            </Form.Group>

            {/* <Form.Group controlId="upic">
              <Form.Label>User Pic</Form.Label>
              <Form.File
                onChange={(e) => postDetails(e.target.files[0])}
                id="custom-file"
                type="image/png"
                label="Upload user Profile"
                custom
              /> */}
            {/* </Form.Group> */}
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Contact
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </MainScreen>
  );
}

export default CreateContact;
