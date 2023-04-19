import React, { useState } from "react";
import {
    Badge,
    Button,
    Card,
    Col,
    Container,
    Grid,
    Input,
    Loading,
    Row,
    Switch,
    Table,
    Text,
    Tooltip,
    useTheme,
} from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import { MdClose, MdDownload } from "react-icons/md";
import { IoRefreshOutline } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import useGetAllHosts from "../hooks/useGetAllHosts";
import useGetSearch from "../hooks/useGetSearch";

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
    const [searchText, setSearchText] = useState("");
    const [showTable, setShowTable] = useState(false);

    const {
        data: hosts,
        isLoading: hostLoading,
        refetch,
        isRefetching,
    } = useGetAllHosts();
    const {
        mutate,
        isLoading: searchLoading,
        isSuccess: searchLoaded,
        data: rows,
    } = useGetSearch();

    const handleSearch = () => {
        mutate(searchText);
        setShowTable(true);
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
                    <Badge
                        color="success"
                        variant="flat"
                        css={{ fontSize: 15 }}
                    >
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
        <Container lg>
            {/* Search bar */}
            <div className="w-full flex flex-row items-center justify-center py-10">
                <Input
                    placeholder="Search for a file"
                    width="100%"
                    css={{
                        h: "50px",
                    }}
                    aria-label="Search for a file"
                    className="shadow-md bg-transparent"
                    contentRightStyling={false}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                    contentRight={
                        searchText.length > 0 ? (
                            <MdClose
                                style={{
                                    cursor: "pointer",
                                    marginRight: "1rem",
                                }}
                                onClick={() => {
                                    setSearchText("");
                                    setShowTable(false);
                                }}
                                color={theme.colors.accents5}
                            />
                        ) : (
                            <FaSearch
                                style={{
                                    cursor: "pointer",
                                    marginRight: "1rem",
                                }}
                                onClick={() => {
                                    handleSearch();
                                }}
                                color={theme.colors.accents5}
                            />
                        )
                    }
                />
            </div>

            <div className="w-full relative">
                <AnimatePresence>
                    {/* Table */}
                    {searchLoading && (
                        <motion.div
                            key="loading"
                            initial={{ y: 10, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 10, opacity: 0, scale: 0.95 }}
                            transition={{
                                duration: 0.3,
                            }}
                            style={{
                                position: "absolute",
                                width: "100%",
                            }}
                        >
                            <div
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Loading
                                    type="spinner"
                                    size="xl"
                                    color="success"
                                />
                            </div>
                        </motion.div>
                    )}
                    {showTable && searchLoaded && (
                        <motion.div
                            key="table"
                            initial={{ y: 10, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 10, opacity: 0, scale: 0.95 }}
                            transition={{
                                duration: 0.3,
                            }}
                            style={{
                                position: "absolute",
                                width: "100%",
                            }}
                        >
                            <Table
                                bordered
                                shadow={false}
                                color="secondary"
                                aria-label="Example pagination  table"
                                css={{
                                    height: "auto",
                                    minWidth: "100%",
                                    backgroundColor: "$accents1",
                                }}
                            >
                                <Table.Header columns={columns}>
                                    {(column) => (
                                        <Table.Column
                                            key={column?.key}
                                            align={
                                                column?.key === "action"
                                                    ? "center"
                                                    : "start"
                                            }
                                        >
                                            {column?.label}
                                        </Table.Column>
                                    )}
                                </Table.Header>
                                <Table.Body items={rows ?? []}>
                                    {(item) => (
                                        <Table.Row key={item?.key}>
                                            {(columnKey) => (
                                                <Table.Cell>
                                                    {renderCell(
                                                        item,
                                                        columnKey
                                                    )}
                                                </Table.Cell>
                                            )}
                                        </Table.Row>
                                    )}
                                </Table.Body>
                                <Table.Pagination
                                    shadow
                                    noMargin
                                    align="center"
                                    color={"success"}
                                    rowsPerPage={8}
                                    onPageChange={(page) =>
                                        console.log({ page })
                                    }
                                />
                            </Table>
                        </motion.div>
                    )}
                    {/* History */}
                    {!showTable && (
                        <motion.div
                            key="history"
                            initial={{ y: 10, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 10, opacity: 0, scale: 0.95 }}
                            transition={{
                                duration: 0.3,
                            }}
                            style={{
                                position: "absolute",
                                width: "100%",
                            }}
                        >
                            <Grid.Container gap={3} css={{ p: 0 }}>
                                <Grid direction="column" xs={9}>
                                    <Container
                                        fluid
                                        responsive={false}
                                        className="rounded-lg"
                                        css={{
                                            backgroundColor: "$accents3",
                                            m: 0,
                                            pt: 10,
                                        }}
                                    >
                                        <h1
                                            style={{
                                                fontSize: 28,
                                                fontWeight: 500,
                                            }}
                                        >
                                            History
                                        </h1>
                                        <div
                                            style={{
                                                height: "1px",
                                                width: "100%",
                                                marginTop: "10px",
                                                backgroundColor: "grey",
                                            }}
                                        />
                                        <div
                                            style={{
                                                marginTop: "2%",
                                            }}
                                        >
                                            {history.map((histElement) => (
                                                <Card
                                                    key={histElement?.key}
                                                    isPressable
                                                    variant="bordered"
                                                    css={{
                                                        mw: "100%",
                                                        mb: "$10",
                                                    }}
                                                >
                                                    <Card.Body>
                                                        <Text>
                                                            {histElement?.name}
                                                        </Text>
                                                    </Card.Body>
                                                </Card>
                                            ))}
                                        </div>
                                    </Container>
                                </Grid>
                                <Grid xs={3}>
                                    <Card
                                        css={{
                                            mw: "100%",
                                            mh: "70vh",
                                            borderStyle: "none",
                                        }}
                                    >
                                        <Card.Header
                                            style={{
                                                justifyContent: "space-between",
                                                paddingLeft: 22,
                                                paddingRight: 22,
                                            }}
                                        >
                                            <Text b>Available Hosts</Text>
                                            <span class="relative flex h-3 w-3">
                                                <span
                                                    class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                                                    style={{
                                                        backgroundColor:
                                                            "#17c964",
                                                    }}
                                                />
                                                <span
                                                    class="relative inline-flex rounded-full h-3 w-3"
                                                    style={{
                                                        backgroundColor:
                                                            "#17c964",
                                                    }}
                                                />
                                            </span>
                                        </Card.Header>
                                        <Card.Divider />
                                        <div
                                            style={{
                                                marginTop: 15,
                                                flex: 1,
                                                paddingLeft: 15,
                                                paddingRight: 15,
                                                overflowY: "scroll",
                                            }}
                                        >
                                            {hostLoading || isRefetching ? (
                                                <div
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        display: "flex",
                                                        justifyContent:
                                                            "center",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Loading
                                                        type="spinner"
                                                        size="xl"
                                                        color="success"
                                                    />
                                                </div>
                                            ) : (
                                                (hosts ?? []).map((host) => (
                                                    <Card
                                                        isPressable
                                                        variant="bordered"
                                                        css={{
                                                            mw: "100%",
                                                            mb: "$10",
                                                        }}
                                                    >
                                                        <Card.Body
                                                            style={{
                                                                textAlign:
                                                                    "center",
                                                                padding: 8,
                                                            }}
                                                        >
                                                            <Text>{host}</Text>
                                                        </Card.Body>
                                                    </Card>
                                                ))
                                            )}
                                        </div>
                                        <Card.Divider />
                                        <Card.Footer>
                                            <Row justify="center">
                                                <Button
                                                    onClick={() => refetch()}
                                                    size="md"
                                                    style={{
                                                        backgroundColor:
                                                            "#17c964",
                                                    }}
                                                    icon={
                                                        <IoRefreshOutline
                                                            color="#fff"
                                                            size={22}
                                                        />
                                                    }
                                                >
                                                    Refresh
                                                </Button>
                                            </Row>
                                        </Card.Footer>
                                    </Card>
                                </Grid>
                            </Grid.Container>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* <Button onClick={() => setShowTable((prev) => !prev)}>
                Toggle
            </Button> */}
        </Container>
    );
};

export default Home;
