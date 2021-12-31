import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import HastaAra, { SearchParameters } from "./components/hastaAra";
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

  const filterHasta = (e: SearchParameters) => {
    let filteredHastalar = hastalar;

    if(e.tc !== ''){
      filteredHastalar = filteredHastalar.filter((hasta)=>hasta.tc.includes(e.tc));
    }
    if(e.arrival[0] !== null && e.arrival[1] !== null && e.arrival[0] !== undefined && e.arrival[1] !== undefined){
      // @ts-ignore: Object is possibly 'null'.
      filteredHastalar = filteredHastalar.filter((hasta)=> hasta.arrival.getTime() <= e!.arrival[1]?.getTime() && hasta.arrival.getTime() >= e!.arrival[0]?.getTime())
    }
  };

  const handleEkle = (e: Hasta) => {
    hastalar.push(e);
    fs.writeFile("./src/data.json", JSON.stringify(hastalar), (err: any) => {
    });
    setHastaList(hastalar);
  };

  const handleDelete = (e: Hasta) => {
    hastalar = hastalar.filter((hasta) => hasta.tc !== e.tc)
    setSelectedHasta(undefined);
    fs.writeFile("./src/data.json", JSON.stringify(hastalar), (err: any) => {
      // (err);
    });
    setHastaList(hastalar);

  };

  // useEffect(()=>{
  //   console.log(hastaList)
  // },[hastaList])

  return (
    <React.Fragment>
      <HastaAra
        handleClose={closeHastaAra}
        show={hastaAra}
        handleSubmit={filterHasta}
      />
      <HastaEkle
        handleClose={closeHastaEkle}
        show={hastaEkle}
        handleSubmit={handleEkle}
      />
      <HastaInfo hasta={selectedHasta} handleClose={()=>setSelectedHasta(undefined)}/>

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
          <HastaTable
            hastaList={hastaList}
            onHastaSelect={(e) => setSelectedHasta(e)}
            onHastaDelete={(e) => handleDelete(e)}
          />
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default App;
