import React, { FunctionComponent, useEffect, useState } from "react";
import { Pagination, Table, Modal, Button } from "react-bootstrap";
import { Hasta } from "../types/hasta";
import { AiOutlineLeft, AiOutlineRight, AiOutlineDelete } from "react-icons/ai";
import "../styles/hastaTable.scss";

interface HastaTableProps {
  hastaList: Hasta[];
  onHastaSelect: (e: Hasta) => void;
  onHastaDelete: (e: Hasta) => void;
}

const HastaTable: FunctionComponent<HastaTableProps> = ({
  hastaList,
  onHastaSelect,
  onHastaDelete,
}) => {
  const [hastaToShow, setHastaToShow] = useState<Hasta[]>(
    hastaList.slice(0, 20)
  );
  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState<Hasta>();
  const [selectedHasta, setSelectedHasta] = useState<Hasta>();

  useEffect(() => {
    setHastaToShow(hastaList.slice(index * 20, (index + 1) * 20));
  }, [index, hastaList]);
  console.log('list rerender');

  const indexSize = hastaList.length / 20;
  return (
    <React.Fragment>
      <Modal show={showModal !== undefined}>
        <Modal.Header onClick={() => setShowModal(undefined)}>
          <Modal.Title>Hasta Silme</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Bu hastayı silmek istediğinizden emin misiniz?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              onHastaDelete(showModal as Hasta);
              setShowModal(undefined);
            }}
          >
            Evet
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(undefined)}>
            İptal
          </Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>İsim</th>
            <th>TC</th>
            <th>Gelis Tarihi</th>
            <th>MDT</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {hastaToShow.map((hasta) => (
            <tr
              key={hasta.tc}
              onClick={() => {
                onHastaSelect(hasta);
                setSelectedHasta(hasta);
              }}
              className={selectedHasta?.tc === hasta.tc ? "hasta--active" : ""}
            >
              <td>{hasta.name}</td>
              <td>{hasta.tc}</td>
              <td>
                {new Date(hasta.arrival).toLocaleDateString("tr-TR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </td>
              <td>
                {hasta.mdt ? new Date(hasta.mdt).toLocaleDateString("tr-TR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                }) : '-'}
              </td>
              <td
                onClick={() => {
                  setShowModal(hasta);
                }}
              >
                {" "}
                <AiOutlineDelete />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      Sayfa: {index}
      <Pagination>
        <Pagination.Item
          onClick={() => (index > 0 ? setIndex(index - 1) : null)}
        >
          <AiOutlineLeft />
        </Pagination.Item>
        <Pagination.Item
          onClick={() => (index < indexSize ? setIndex(index + 1) : null)}
        >
          <AiOutlineRight />
        </Pagination.Item>
      </Pagination>
    </React.Fragment>
  );
};

export default HastaTable;
