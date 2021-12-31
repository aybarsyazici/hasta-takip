import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import HastaAra from "./components/hastaAra";
import HastaEkle from "./components/hastaEkle";
import HastaInfo from "./components/hastaInfo";
import HastaTable from "./components/hastaTable";
import "./styles/app.scss";
import { Hasta } from "./types/hasta";

const fs = window.require("fs");
let hastalar: Hasta[] = require("./data.json");

function App() {
  const [hastaAra, setHastaAra] = useState(false);
  const [hastaEkle, setHastaEkle] = useState(false);
  const [hastaList, setHastaList] = useState(hastalar);
  const [selectedHasta, setSelectedHasta] = useState<Hasta>();

  const closeHastaAra = () => setHastaAra(false);
  const openHastaAra = () => setHastaAra(true);

  const closeHastaEkle = () => setHastaEkle(false);
  const openHastaEkle = () => setHastaEkle(true);

  const handleEkle = (e: Hasta) => {
    hastalar.push(e);
    setHastaList(hastalar);
    fs.writeFile("./src/data.json", JSON.stringify(hastalar), (err: any) => {
      console.log(err);
    });
  };

  const handleDelete = (e: Hasta) => {
    setHastaList(hastaList.filter((hasta) => hasta.tc !== e.tc));
    fs.writeFile("./src/data.json", JSON.stringify(hastaList), (err: any) => {
      console.log(err);
    });
  }

  return (
    <React.Fragment>
      <HastaAra handleClose={closeHastaAra} show={hastaAra} />
      <HastaEkle
        handleClose={closeHastaEkle}
        show={hastaEkle}
        handleSubmit={handleEkle}
      />
      <Container>
        <Row>
          <Col xs={6}>
            <Button variant="primary" onClick={openHastaAra}>
              Hasta Arama menusu
            </Button>
          </Col>
          <Col xs={6}>
            <Button variant="success" onClick={openHastaEkle}>
              Hasta Ekleme menusu
            </Button>
          </Col>
        </Row>
        <Row style={{ marginTop: "1rem" }}>
          <Col xs={12} md={6}>
            <HastaTable
              hastaList={hastaList}
              onHastaSelect={(e) => setSelectedHasta(e)}
              onHastaDelete={(e) => handleDelete(e)}
            />
          </Col>
          <Col xs={12} md={6}>
            <HastaInfo hasta={selectedHasta}/>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default App;
