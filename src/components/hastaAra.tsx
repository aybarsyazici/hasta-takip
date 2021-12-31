import { FunctionComponent, useState } from "react";
import {
    Modal,
    Form,
    Button,
  } from "react-bootstrap";

interface HastaAraProps {
    show: boolean;
    handleClose: () => void;
}

const HastaAra: FunctionComponent<HastaAraProps> = ({ show, handleClose }) => {
  
  const [name, setName] = useState("");
  const [TC, setTC] = useState("");
  const [notes, setNotes] = useState("");


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Hasta Ara</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="name" >
            <Form.Label>Hasta Adi</Form.Label>
            <Form.Control type="text" placeholder="Örnek Hasta Adi" value={name} onChange={(e)=>setName(e.currentTarget.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="id">
            <Form.Label>Hasta TC</Form.Label>
            <Form.Control type="text" placeholder="XXXXXXXXXX" value={TC} onChange={(e)=>setTC(e.currentTarget.value)}/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          İptal Et
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Ara   
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default HastaAra;
