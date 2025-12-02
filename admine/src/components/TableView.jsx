import { Container, Row, Col, Table } from "react-bootstrap";
import PropTypes from "prop-types";
import ActionButtons from "./ActionButtons";
import "../disc/css/main.css";

const TableView = ({ data, title, columns, onUpdateRow, onDeleteRow, page = 1, pageSize = 5, menuActive }) => {
  if (!data || data.length === 0) {
    return (
      <Container className="py-5">
        <Row>
          <Col className="text-center text-muted">
            Tidak ada data yang tersedia untuk {title}.
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <div className="table-view my-4">
      <Container fluid>
        <Row className="mb-3">
          <Col>
            <h4 className="fw-bold text-primary border-bottom pb-2">{title}</h4>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="table-responsive position-relative">
              <Table
                bordered
                hover
                responsive
                className="shadow-sm align-middle data-table"
              >
                <thead className="table-primary">
                  <tr>
                    {columns.map(col => (
                      <th
                        key={col.key}
                        style={{
                          width: col.width || "auto",
                          textAlign: col.align || "left"
                        }}
                      >
                        {col.label}
                      </th>
                    ))}

                    <th style={{ width: "50px", textAlign: "center" }}>
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((row, index) => (
                    <tr key={index}>
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          style={{
                            width: col.width || "auto",
                            textAlign: col.align || "left",
                            verticalAlign: "middle",
                          }}
                        >
                          {col.type === "index" ? (
                            ((page - 1) * pageSize) + index + 1
                          ) : col.type === "image" ? (
                            row[col.key] ? (
                              <img
                                src={
                                  menuActive === "informasi"
                                    ? `/uploads/information/${row[col.key]}`
                                    : `/uploads/apps/${row[col.key]}`
                                }
                                alt="img"
                                width="50"
                                height="50"
                                style={{
                                  objectFit: "cover",
                                  borderRadius: "6px",
                                }}
                              />
                            ) : (
                              "-"
                            )
                          ) : col.type === "html" ? (
                            <div
                              dangerouslySetInnerHTML={{ __html: row[col.key] }}
                              style={{ textAlign: col.align || "left" }}
                            />
                          ) : (
                            row[col.key]
                          )}
                        </td>
                      ))}

                      {/* Kolom Aksi */}
                      <td className="text-center" style={{ width: "80px" }}>
                        <ActionButtons
                          row={row}
                          onUpdate={() => onUpdateRow(row)}
                          onDelete={() => onDeleteRow(row)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>

              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

TableView.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  onUpdateRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  menuActive: PropTypes.string.isRequired,
};


TableView.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  onUpdateRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  menuActive: PropTypes.string.isRequired,
};

export default TableView;
