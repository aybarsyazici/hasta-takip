import { FunctionComponent, useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { Hasta } from "../types/hasta";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import "../styles/hastaEkle.scss";

interface HastaEkleProps {
  show: boolean;
  handleClose: () => void;
  handleSubmit: (e: Hasta) => void;
}

export interface HastaEkleForm {
  name: string;
  tc: string;
  notes: string;
}

const HastaEkle: FunctionComponent<HastaEkleProps> = ({
  show,
  handleClose,
  handleSubmit,
}) => {
  const [name, setName] = useState("");
  const [TC, setTC] = useState("");
  const [notes, setNotes] = useState("");
  const [arrival, setArrival] = useState<Date>(new Date());
  const [mdt, setmdt] = useState<Date>();
  const [address, setAddress] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");
  const [onam, setOnam] = useState<string>("");
  const [email, setEmail] = useState<string>("");


  return (
    <Modal show={show} onHide={handleClose} dialogClassName="hasta-ekle-modal">
      <Modal.Header closeButton>
        <Modal.Title>Hasta Ekle</Modal.Title>
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
                  style={{ height: "520px" }}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          İptal Et
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            const newHasta: Hasta = {
              name: name,
              tc: TC,
              notes: notes,
              telephone: telephone,
              address: address,
              onam: onam,
              arrival: arrival,
              mdt: mdt,
              email: email,
            };
            handleSubmit(newHasta);
            // console.log(newHasta);
            handleClose();
            setName("");
            setTC("");
            setNotes("");
            setTelephone("");
            setAddress("");
            setOnam("");
            setArrival(new Date());
            setmdt(undefined);
            setEmail("");
          }}
        >
          Ekle
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default HastaEkle;
