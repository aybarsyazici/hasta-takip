import { FunctionComponent, useState, useEffect } from "react";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import { Hasta } from "../types/hasta";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import "../styles/hastaInfo.scss"

interface HastaInfoProps {
  hasta: Hasta | undefined;
  handleClose: () => void;
  handleSubmit: (e: Hasta) => void;
}

const HastaInfo: FunctionComponent<HastaInfoProps> = ({ hasta,handleClose, handleSubmit }) => {
  const [name, setName] = useState(hasta?.name);
  const [TC, setTC] = useState(hasta?.tc);
  const [notes, setNotes] = useState(hasta?.notes);
  const [arrival, setArrival] = useState(hasta?.arrival);
  const [mdt, setmdt] = useState(hasta?.mdt);
  const [address, setAddress] = useState(hasta?.address);
  const [telephone, setTelephone] = useState(hasta?.telephone);
  const [onam, setOnam] = useState(hasta?.onam);
  const [email, setEmail] = useState(hasta?.email);

  useEffect(() => {
    if (hasta) {
      setName(hasta.name);
      setTC(hasta.tc);
      setNotes(hasta.notes);
      setArrival(hasta.arrival);
      setmdt(hasta.mdt);
      setAddress(hasta.address);
      setTelephone(hasta.telephone);
      setOnam(hasta.onam);
      setEmail(hasta.email);
    }
  }, [hasta]);

  return (
    <Modal show={hasta !== undefined} onHide={handleClose} dialogClassName="hasta-info-modal">
      <Modal.Header closeButton>
        <Modal.Title>Hasta Detaylari</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Hasta Adi</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Örnek Hasta Adi"
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="id">
                <Form.Label>Hasta TC</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="XXXXXXXXXX"
                  value={TC}
                  onChange={(e) => setTC(e.currentTarget.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="id">
                <Form.Label>Hasta Telefon</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Telefon"
                  value={telephone}
                  onChange={(e) => setTelephone(e.currentTarget.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="id">
                <Form.Label>Hasta Adres</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Adres"
                  value={address}
                  onChange={(e) => setAddress(e.currentTarget.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="id">
                <Form.Label>Hasta Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Gelis Tarihi"
                    value={arrival}
                    onChange={(newValue) => {
                      if (newValue) {
                        setArrival(newValue);
                      }
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="MDT"
                    value={mdt ? mdt : null}
                    onChange={(newValue) => {
                      if (newValue) {
                        setmdt(newValue);
                      }
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Form.Group>

              <Form.Group className="mb-3" controlId="extra">
                <Form.Label>Hasta onam formlari</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={onam}
                  onChange={(e) => setOnam(e.currentTarget.value)}
                  style={{ height: "50px" }}
                />
              </Form.Group>
            </Col>
            <Col md={8}>
              <Form.Group className="mb-3" controlId="extra">
                <Form.Label>Hasta hk. ekstra notlar</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.currentTarget.value)}
                  style={{ height: "550px" }}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>{
          handleSubmit({
            name: name ? name : "",
            tc: TC ? TC : "",
            address: address ? address : "",
            notes: notes ? notes : "",
            onam: onam ? onam: "",
            telephone: telephone ? telephone : "",
            email: email ? email : "",
            arrival: arrival,
            mdt: mdt
          })
          handleClose();
        }}>Guncelle</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default HastaInfo;
