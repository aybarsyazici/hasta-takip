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
  const [filterCount, setFilterCount] = useState(0);
  const [selectedHastaIndex, setSelectedHastaIndex] = useState<number>();

  const closeHastaAra = () => setHastaAra(false);
  const openHastaAra = () => setHastaAra(true);

  const closeHastaEkle = () => setHastaEkle(false);
  const openHastaEkle = () => setHastaEkle(true);

  const filterHasta = (e: SearchParameters) => {
    console.log(e);
    let filteredHastalar = hastalar;

    if (e.tc !== "") {
      filteredHastalar = filteredHastalar.filter((hasta) =>
        hasta.tc.includes(e.tc)
      );
      setFilterCount(1);
    }
    if (
      e.arrival[0] !== null &&
      e.arrival[1] !== null &&
      e.arrival[0] !== undefined &&
      e.arrival[1] !== undefined
    ) {
      e.arrival[1]?.setDate(e.arrival[1].getDate() + 1);
      filteredHastalar = filteredHastalar.filter((hasta) => {
        if (hasta.arrival === undefined) {
          return false;
        }
        return (
          // @ts-ignore: Object is possibly 'null'.
          new Date(hasta.arrival).getTime() <= e.arrival[1]?.getTime() &&
          // @ts-ignore: Object is possibly 'null'.
          new Date(hasta.arrival).getTime() >= e.arrival[0].getTime()
        );
      });
      setFilterCount(1);
    }
    if (e.name !== "") {
      filteredHastalar = filteredHastalar.filter((hasta) =>
        hasta.name.includes(e.name)
      );
      setFilterCount(1);
    }

    setHastaList(filteredHastalar);
  };

  const updateHasta = (e: Hasta) => {
    if (selectedHastaIndex) {
      hastalar[selectedHastaIndex] = e;
      fs.writeFile(
        "./src/data.json",
        JSON.stringify(hastalar),
        (err: any) => {}
      );
      setFilterCount(0);
      setHastaList(hastalar);
    }
  };

  const handleEkle = (e: Hasta) => {
    hastalar.push(e);
    fs.writeFile("./src/data.json", JSON.stringify(hastalar), (err: any) => {});
    setFilterCount(0);
    setHastaList(hastalar);
  };

  const handleDelete = (e: Hasta) => {
    hastalar = hastalar.filter((hasta) => hasta.tc !== e.tc);
    setSelectedHastaIndex(undefined);
    fs.writeFile("./src/data.json", JSON.stringify(hastalar), (err: any) => {
      // (err);
    });
    setFilterCount(0);
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
      <HastaInfo
        hasta={selectedHastaIndex !== undefined ? hastaList[selectedHastaIndex] : undefined}
        handleClose={() => setSelectedHastaIndex(undefined)}
        handleSubmit={(e) => updateHasta(e)}
      />
      <Container>
        <Row>
          <Col xs={4}>
            <Button variant="primary" onClick={openHastaAra}>
              Hasta Arama menusu
            </Button>
          </Col>
          <Col xs={4}>
            {filterCount > 0 && (
              <Button
                variant="info"
                onClick={() => {
                  setHastaList(hastalar);
                  setFilterCount(0);
                }}
              >
                Tüm Hastaları Göster
              </Button>
            )}
          </Col>
          <Col xs={4}>
            <Button variant="success" onClick={openHastaEkle}>
              Hasta Ekleme menusu
            </Button>
          </Col>
        </Row>
        <Row style={{ marginTop: "1rem" }}>
          <HastaTable
            hastaList={hastaList}
            onHastaSelect={(e) => {
              setSelectedHastaIndex(e);
            }}
            onHastaDelete={(e) => handleDelete(e)}
            key={hastaList.length}
          />
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default App;
