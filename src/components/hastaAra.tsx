import { FunctionComponent } from "react";
import {
    Modal,
    Form,
    Card,
    Button,
  } from "react-bootstrap";

interface HastaAraProps {
    show: boolean;
    handleClose: () => void;
}

const HastaAra: FunctionComponent<HastaAraProps> = ({show, handleClose}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Hasta Ara</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Hasta Adi</Form.Label>
            <Form.Control type="text" placeholder="Örnek Hasta Adi" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="id">
            <Form.Label>Hasta TC</Form.Label>
            <Form.Control type="text" placeholder="XXXXXXXXXX" />
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
