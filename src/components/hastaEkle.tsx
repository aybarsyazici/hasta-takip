import { FunctionComponent, useState } from "react";
import { Modal, Form, Card, Button } from "react-bootstrap";
import { Hasta } from "../types/hasta";

interface HastaEkleProps {
  show: boolean;
  handleClose: () => void;
  handleSubmit: (e: Hasta) => void;
}

export interface HastaEkleForm{
  name: string;
  tc: string;
  notes: string;
}

const HastaEkle: FunctionComponent<HastaEkleProps> = ({ show, handleClose, handleSubmit }) => {
  
  const [name, setName] = useState("");
  const [TC, setTC] = useState("");
  const [notes, setNotes] = useState("");


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Hasta Ekle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Hasta Adi</Form.Label>
            <Form.Control type="text" placeholder="Örnek Hasta Adi" value={name} onChange={(e)=>setName(e.currentTarget.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="id">
            <Form.Label>Hasta TC</Form.Label>
            <Form.Control type="text" placeholder="XXXXXXXXXX" value={TC} onChange={(e)=>setTC(e.currentTarget.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="extra">
            <Form.Label>Hasta hk. ekstra notlar</Form.Label>
            <Form.Control as="textarea" rows={3} value={notes} onChange={(e)=>setNotes(e.currentTarget.value)}/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          İptal Et
        </Button>
        <Button variant="primary" onClick={() => {
          const newHasta: Hasta = {
            name: name,
            tc: TC,
            notes: notes,
            date: new Date()
          }
          handleSubmit(newHasta);
          console.log(newHasta)
          handleClose();
        }}>
          Ekle
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default HastaEkle;
