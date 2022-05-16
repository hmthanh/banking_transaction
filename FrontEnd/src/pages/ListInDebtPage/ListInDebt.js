import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Card, CardGroup, Col, Container, Row } from 'reactstrap';
import { getInDebt } from '../../redux/actions/InDebt.action';
import firebaseDB from '../../shares/firebase';

const ListInDebt = () => {
  // this.refDB = realtimeDB.ref();
  const dispatch = useDispatch();
  const notiData = useState({});
  const realtimeDB = 0;
  console.log("dsfsdfsdsdf");
  
  const GetInDebtInfo = useSelector((state) => {
    return state.GetInDebtInfo.data
  });

  useEffect(() => {
    let accessToken = localStorage.getItem('accessToken');
    let uid = localStorage.getItem('uid');
    dispatch(getInDebt(uid, accessToken))
      .then((response) => {
        console.log(response)
      })
  }, [dispatch])

  return (
    <Container className="container" style={{ marginTop: '20px' }}>
      <Row className="justify-content-center">
        <Col md={12}>
          <CardGroup className="mb-0">
            <Card className="p-6">
              <div className="card-block" style={{ padding: "20px 40px" }}>
                {/* <h3 className="col-centered table-heading">DANH SÁCH NỢ</h3>
                  <Table>
                    <thead>
                    <tr>
                      <th>#</th>
                      <th>Tên Tài Khoản</th>
                      <th>Số Tiền</th>
                      <th>Ngày giao dịch</th>
                      <th>Ghi chú</th>
                      <th width="160">Thanh toán</th>
                      <th width="165">Huỷ nhắc nợ</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      GetInDebtInfo.item &&
                      GetInDebtInfo.item.map((item, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.name}</td>
                            <td>{item.debt_val}</td>
                            <td>{formatMoment(item.date_time)}</td>
                            <td>{item.note}</td>
                            <td>
                              <Link
                                  to={`/transfer?account=${item.owner_account}&name=${item.name}&money=${item.debt_val}&note=${item.note}&debt=${item.id}`}>
                                <Button color="success">
                                  <span style={{marginRight: "10px"}}>Thanh toán</span>
                                  <FontAwesomeIcon icon={faCreditCard}></FontAwesomeIcon>
                                </Button>
                              </Link>
                            </td>
                            <td>
                              <CancelRemind debtId={item.id}></CancelRemind>
                            </td>
                          </tr>
                      ))
                    }
                    </tbody>
                  </Table> */}

                  <Alert>
                    <h4 className="alert-heading">
                      Well done!
                    </h4>
                    <p>
                      Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.
                    </p>
                    <hr />
                    <p className="mb-0">
                      Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
                    </p>
                  </Alert>
              </div>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default ListInDebt;