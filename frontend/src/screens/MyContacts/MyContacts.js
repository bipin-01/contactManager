import React, { useEffect } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import "./MyContacts.css";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteContactAction,
  listContacts,
} from "../../actions/contactsActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function MyContacts({ history, search }) {
  const dispatch = useDispatch();

  const contactList = useSelector((state) => state.contactList);
  const { loading, error, contacts } = contactList;


  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const contactDelete = useSelector((state) => state.contactDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = contactDelete;

  const contactCreate = useSelector((state) => state.contactCreate);
  const { success: successCreate } = contactCreate;

  const contactUpdate = useSelector((state) => state.contactUpdate);
  const { success: successUpdate } = contactUpdate;

  useEffect(() => {
    dispatch(listContacts());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteContactAction(id));
    }
  };

  return (
    <MainScreen title={`Welcome ${userInfo && userInfo.name}..`}>
      <Link to="/createcontact">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new Contact
        </Button>
      </Link>
      
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}

      {contacts &&
        contacts
          .filter((filteredContact) =>
            filteredContact.name.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map((contact) => (
              <Card style={{ margin: 10 }} key={contact._id}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 0.2,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                      {contact.name}
                      <div className="profilePic">
                      <img src={contact.upic} alt={contact.name}  /></div>
                      </span>
                      <span  style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}> <h4>
                      <Badge variant="success">
                        Department - {contact.department}
                      </Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                     <p> Phone no-{contact.number}</p>
                     </blockquote>
                    </span>
                  <div>
                    <Button href={`/contact/${contact._id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(contact._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
              </Card>
          ))}
    </MainScreen>
  );
}

export default MyContacts;
