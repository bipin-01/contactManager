import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteContactAction, updateContactAction } from "../../actions/contactsActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";

function SingleContact({ match, history }) {
  const [name, setName] = useState();
  const [number, setNumber] = useState();
  const [department, setDepartment] = useState();
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const contactUpdate = useSelector((state) => state.contactUpdate);
  const { loading, error } = contactUpdate;

  const contactDelete = useSelector((state) => state.contactDelete);
  const { loading: loadingDelete, error: errorDelete } = contactDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteContactAction(id));
    }
    history.push("/mycontacts");
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/contacts/${match.params.id}`);

      setName(data.name);
      setNumber(data.number);
      setDepartment(data.department);
      setDate(data.updatedAt);
    };

    fetching();
  }, [match.params.id, date]);

  const resetHandler = () => {
    setName("");
    setNumber("");
    setDepartment("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateContactAction(match.params.id, name, number, department));
    if (!name || !number || !department) return;

    resetHandler();
    history.push("/mycontacts");
  };

  return (
    <MainScreen title="Edit Contact">
      <Card>
        <Card.Header>Edit your Contact</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter the Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="number">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the content"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="department">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="content"
                placeholder="Enter the Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Contact
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(match.params.id)}
            >
              Delete Contact
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SingleContact;
