import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import swal from "sweetalert";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { deleteLogging } from "../actions/inventoryAction";

const mapStateToProps = (state) => {
  return {
    getLoggingList: state.inventorys.getLoggingList,
    errorLoggingList: state.inventorys.errorLoggingList,
    HitungLogging: state.inventorys.getLoggingList.length, //HITUNG JUMLAH DATA LOGGING
  };
};

const handleClick = (dispatch, id) => {
  swal({
    title: "Apakah Anda yakin akan menghapus data ini ?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      dispatch(deleteLogging(id));
      swal("Data Inventory Sukses dihapus", {
        icon: "success",
      });
    } else {
      swal("Data gagal dihapus");
    }
  });
};

const { SearchBar } = Search;
const defaultSorted = [
  {
    dataField: "id",
    order: "asc",
  },
];

const TableLoggingFullAccess = (props) => {
  const columns = [
  
    {
      dataField: "id",
      text: "id",
      sort: true,
      align:'center',
      headerStyle: () => {
        return { width: "5%",
      backgroundColor: '#2D93B9' };
      },
    },
    {
      dataField: "logical_uid",
      text: "UID", 
      sort: true,
      headerStyle: () => {
        return { width: "15%",
      backgroundColor: '#2D93B9',
    };
      },
    },
    {
      dataField: "qty",
      text: "Jumlah",
      sort: true,
      align:'center',
      headerStyle: () => {
        return { 
      backgroundColor: '#2D93B9' };
      },
    },
    {
      dataField: "time",
      text: "Waktu",
      sort: true,
      align:'center',
      headerStyle: () => {
        return { 
      backgroundColor: '#2D93B9',
      width: "20%"
   };
      },
    },
    {
      dataField: "warehouse",
      text: "Warehouse",
      sort: true,
      headerStyle: () => {
        return { 
      backgroundColor: '#2D93B9' };
      },
    },
    {
      dataField: "link",
      text: "Action",
      headerStyle: () => {
        return { width: "30%" ,
        backgroundColor:'#2D93B9'};
      },
      formatter: (rowContent, row) => {
        return (
          <div>
            <Link to={"DetailLogging/" + row.id}>
              <Button color="dark" className="mr-2">
                <FontAwesomeIcon icon={faInfo} /> Detail
              </Button>
            </Link>

            <Link to={"EditLogging/" + row.id}>
              <Button color="dark" className="mr-2">
                <FontAwesomeIcon icon={faEdit} /> Edit
              </Button>
            </Link>

            <Button
              color="dark"
              className="mr-2"
              onClick={() => handleClick(props.dispatch, row.id)}
            >
              <FontAwesomeIcon icon={faTrash} /> Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Container>
      {props.getLoggingList ? (
        <div>
          <div align="center">
            <Row>
              <Col>
              <br></br>
             </Col>
            </Row>
          </div>
          <br />
          <ToolkitProvider
            bootstrap4
            keyField="id"
            data={props.getLoggingList}
            columns={columns}
            defaultSorted={defaultSorted}
            search
          >
            {(props) => (
              <div>
                <Row>
                  <Col>
                    <div className="float-right">
                      <SearchBar {...props.searchProps} placeholder="Cari.." />
                                            
                    </div>
                  </Col>
                </Row>
                <BootstrapTable
                  {...props.baseProps}
                  pagination={paginationFactory()}
                />
              </div>
            )}
          </ToolkitProvider>
        </div>
      ) : (
        <div className="text-center">
          {props.errorLoggingList ? (
            <h4>{props.errorLoggingList}</h4>
          ) : (
            <Spinner color="dark" />
          )}
        </div>
      )}
    </Container>
  );
};

export default connect(mapStateToProps, null)(TableLoggingFullAccess);