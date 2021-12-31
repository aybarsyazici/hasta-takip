import { FunctionComponent, useState, useEffect } from "react";
import { Card, Form } from "react-bootstrap";
import { Hasta } from "../types/hasta";

interface HastaInfoProps {
  hasta: Hasta | undefined;
}

const HastaInfo: FunctionComponent<HastaInfoProps> = ({ hasta }) => {
  const [name, setName] = useState("");
  const [TC, setTC] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (hasta) {
      setName(hasta.name);
      setTC(hasta.tc);
      setNotes(hasta.notes);
      }
  }, [hasta]);

  return (
    <Card bg="light" text="dark" className="mb-2" style={{ height: "85vh" }}>
      <Card.Header>Hasta Detayları</Card.Header>
      <Card.Body>
        <Card.Title>
          {hasta ? null : "Lütfen listeden bir hasta seçiniz"}
        </Card.Title>
        <Card.Text>
          {hasta && (
            <Form>
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
              <Form.Group className="mb-3" controlId="extra">
                <Form.Label>Hasta hk. ekstra notlar</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.currentTarget.value)}
                />
              </Form.Group>
            </Form>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default HastaInfo;
