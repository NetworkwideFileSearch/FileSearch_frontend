import React from "react";
import {
  Badge,
  Card,
  Col,
  Container,
  Input,
  Row,
  Switch,
  Table,
  Text,
  Tooltip,
  useTheme,
} from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import { MdDownload } from "react-icons/md";

const columns = [
  {
    key: "name",
    label: "File Name",
  },
  {
    key: "host",
    label: "Host",
  },
  {
    key: "location",
    label: "File Location",
  },
  {
    key: "size",
    label: "Size",
  },
  {
    key: "action",
    label: "Action",
  },
];

const rows = [
  {
    key: "1",
    name: "Resume.pdf",
    host: "192.168.143.27",
    location: "D:/Me/Placement/Resume/Resume.pdf",
    size: "9MB",
  },
  {
    key: "2",
    name: "Me.pdf",
    host: "192.168.45.27",
    location: "D:/Me/Placement/Resume/Resume.pdf",
    size: "12MB",
  },
  {
    key: "3",
    name: "Resume.pdf",
    host: "100.168.143.27",
    location: "D:/Me/Placement/Resume/Resume.pdf",
    size: "9MB",
  },
  {
    key: "4",
    name: "Me.pdf",
    host: "192.168.143.27",
    location: "D:/Me/Placement/Resume/Resume.pdf",
    size: "12MB",
  },
  {
    key: "5",
    name: "Resume.pdf",
    host: "192.78.143.27",
    location: "D:/Me/Placement/Resume/Resume.pdf",
    size: "12MB",
  },
  {
    key: "6",
    name: "Hello.pdf",
    host: "192.168.143.27",
    location: "D:/Me/Placement/Resume/Resume.pdf",
    size: "8MB",
  },
  {
    key: "7",
    name: "Resume.pdf",
    host: "192.168.143.27",
    location: "D:/Me/Placement/Resume/Resume.pdf",
    size: "12MB",
  },
  {
    key: "8",
    name: "No.pdf",
    host: "192.168.143.27",
    location: "D:/Me/Placement/Resume/Resume.pdf",
    size: "8MB",
  },
  {
    key: "9",
    name: "Resume.pdf",
    host: "192.168.143.27",
    location: "D:/Me/Placement/Resume/Resume.pdf",
    size: "12MB",
  },
  {
    key: "10",
    name: "Resume.pdf",
    host: "192.168.143.27",
    location: "D:/Me/Placement/Resume/Resume.pdf",
    size: "8MB",
  },
  {
    key: "11",
    name: "Resume.pdf",
    host: "192.168.143.27",
    location: "D:/Me/Placement/Resume/Resume.pdf",
    size: "12MB",
  },
  {
    key: "12",
    name: "Resume.pdf",
    host: "192.168.143.27",
    location: "D:/Me/Placement/Resume/Resume.pdf",
    size: "8MB",
  },
  {
    key: "13",
    name: "Resume.pdf",
    host: "192.168.143.27",
    location: "D:/Me/Placement/Resume/Resume.pdf",
    size: "12MB",
  },
];

const history = [
  {
    key: "1",
    name: "Resume 1.pdf",
  },
  {
    key: "2",
    name: "Resume 6.pdf",
  },
  {
    key: "3",
    name: "Resume 5.pdf",
  },
  {
    key: "4",
    name: "Resume 4.pdf",
  },
  {
    key: "5",
    name: "Resume 2.pdf",
  },
];

const Home = () => {
  const { theme } = useTheme();

  const handleSearch = () => {
    console.log("Search Button clicked");
    alert("To be implemented!");
  };

  const renderCell = (row, columnKey) => {
    const cellValue = row[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <Col>
            <Row>
              <Text css={{ fontSize: 15 }}>{cellValue}</Text>
            </Row>
          </Col>
        );
        break;
      case "host":
        return (
          <Badge color="success" variant="flat" css={{ fontSize: 15 }}>
            {cellValue}
          </Badge>
        );
        break;
      case "location":
        return (
          <Col>
            <Row>
              <Text css={{ fontSize: 15 }}>{cellValue}</Text>
            </Row>
          </Col>
        );
        break;
      case "size":
        return (
          <Badge isSquared css={{ fontSize: 15, fontWeight: 500 }}>
            {cellValue}
          </Badge>
        );
        break;
      case "action":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex", justifyContent: "center" }}>
              <Tooltip content="Download">
                <MdDownload
                  style={{ cursor: "pointer" }}
                  color="#fff"
                  onClick={() => console.log("Download")}
                />
              </Tooltip>
            </Col>
          </Row>
        );
        break;
      default:
        break;
    }
  };

  return (
    <Container style={{ position: "relative", width: "100%" }}>
      {/* Search bar */}
      <div
        style={{
          marginTop: "5%",
          marginLeft: "25%",
          marginBottom: "3%",
          width: "50%",
        }}>
        <Input
          placeholder="Search for a file"
          width="100%"
          aria-label="Search for a file"
          style={{ paddingLeft: "2rem" }}
          contentRightStyling={false}
          contentRight={
            <FaSearch
              style={{ cursor: "pointer", marginRight: "1rem" }}
              onClick={() => {
                console.log("first");
                handleSearch();
              }}
              color={theme.colors.accents5}
            />
          }
        />
      </div>
      {/* Table */}
      <div>
        <Table
          bordered
          shadow={false}
          color="secondary"
          aria-label="Example pagination  table"
          css={{
            height: "auto",
            minWidth: "100%",
          }}>
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column
                key={column?.key}
                align={column?.key === "action" ? "center" : "start"}>
                {column?.label}
              </Table.Column>
            )}
          </Table.Header>
          <Table.Body items={rows}>
            {(item) => (
              <Table.Row key={item?.key}>
                {(columnKey) => (
                  <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                )}
              </Table.Row>
            )}
          </Table.Body>
          <Table.Pagination
            shadow
            noMargin
            align="center"
            rowsPerPage={8}
            onPageChange={(page) => console.log({ page })}
          />
        </Table>
      </div>
      {/* History */}
      <div>
        <h1 style={{ fontSize: 28, fontWeight: 500 }}>History</h1>
        <div
          style={{
            height: "0.2vh",
            width: "100%",
            backgroundColor: "#fff",
          }}
        />
        <div
          style={{
            marginTop: "2%",
          }}>
          {history.map((histElement) => (
            <Card
              key={histElement?.key}
              isPressable
              variant="bordered"
              css={{ mw: "100%", mb: "$10" }}>
              <Card.Body>
                <Text>{histElement?.name}</Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Home;
