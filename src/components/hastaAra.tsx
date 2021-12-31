import { FunctionComponent, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import { DateRange } from "@mui/lab/DateRangePicker/RangeTypes";

export interface SearchParameters {
  name: string;
  tc: string;
  arrival: DateRange<Date>;
  birthdate: DateRange<Date>;
}

interface HastaAraProps {
  show: boolean;
  handleClose: () => void;
  handleSubmit: (e:SearchParameters) => void;
}

const HastaAra: FunctionComponent<HastaAraProps> = ({ show, handleClose, handleSubmit}) => {
  const [name, setName] = useState("");
  const [TC, setTC] = useState("");
  const [arrivalDate, setArrivalDate] = useState<DateRange<Date>>([null, null]);
  const [birthdate, setBirthdate] = useState<DateRange<Date>>([null, null]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Hasta Ara</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
          <Form.Group className="mb-3" controlId="arrival Date">
            <Form.Label>Gelis Gunu</Form.Label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateRangePicker
                startText="Baslangic"
                endText="Bitis"
                value={arrivalDate}
                onChange={(date) => setArrivalDate(date)}
                renderInput={(startProps, endProps) => (
                  <>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> - </Box>
                    <TextField {...endProps} />
                  </>
                )}
              />
            </LocalizationProvider>
          </Form.Group>
          <Form.Group className="mb-3" controlId="arrival Date">
            <Form.Label>MDT</Form.Label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateRangePicker
                startText="Baslangic"
                endText="Bitis"
                value={birthdate}
                onChange={(date) => setBirthdate(date)}
                renderInput={(startProps, endProps) => (
                  <>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> - </Box>
                    <TextField {...endProps} />
                  </>
                )}
              />
            </LocalizationProvider>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          İptal Et
        </Button>
        <Button variant="primary" onClick={() => {
          handleSubmit({
            name: name,
            tc: TC,
            arrival: arrivalDate,
            birthdate: birthdate
          });
          setName("");
          setTC("");
          setArrivalDate([null, null]);
          setBirthdate([null, null]);
          handleClose();
        }}>
          Ara
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default HastaAra;
