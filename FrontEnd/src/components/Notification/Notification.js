import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Container} from "reactstrap";
import Websocket from 'react-websocket';
import {Link, useHistory} from "react-router-dom";
import {faCreditCard} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {formatMoney} from "../../utils/utils";
import {useDispatch} from "react-redux";
// import {delNotify, getNotify} from "../../redux/actions/remind.action";
import {SocketUrl} from "../../shares/baseUrl";

const Notification = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [alertData, setAlertData] = useState([]);

  function handleOpen() {
    console.log('connected:)')
  }

  function handleClose() {
    console.log('disconnected:(')
  }

  const handleData = useCallback((result) => {
    console.log(result);
    const uid = parseInt(localStorage.getItem('uid'));
    let data = JSON.parse(result);
    const recipient = parseInt(data.recipient);
    if (uid === recipient) {
      history.go(0);
    }
  }, [history])

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const uid = localStorage.getItem('uid');
    // dispatch(getNotify(uid, accessToken))
    //     .then((response) => {
    //       if (response.status !== 403) {
    //         setAlertData(response);
    //       }
    //     });
    // return () => {

    // }
  }, [dispatch])

  function closeAlert(notifyId) {
    console.log(notifyId);
    const accessToken = localStorage.getItem('accessToken');
    // dispatch(delNotify(notifyId, accessToken))
    //     .then(() => {
    //       const uid = localStorage.getItem('uid');
    //       // dispatch(getNotify(uid, accessToken))
    //       //     .then((response) => {
    //       //       setAlertData(response);
    //       //     });
    //     })
  }


  return (
      <>
        <Websocket url={SocketUrl}
                   onMessage={handleData} onOpen={handleOpen}
                   onClose={handleClose}/>
        <Container>
          {
            alertData &&
            alertData.map((alert, index) => {
              if (alert.type === 1) {
                return (
                    <Alert key={index} style={{textAlign: "left"}} color="danger">
                      <div onClick={() => closeAlert(alert.id)} className="close" data-dismiss="alert" aria-label="close" title="close">??
                      </div>
                      <strong>[Nh???c n???]</strong> B???n n??? t??i kho???n {alert.account_id} ({alert.name}) s???
                      ti???n {formatMoney(alert.money)} VN??.<br/>
                      Nh???n v??o ????y ?????{" "}
                      <Link
                          to={`/transfer?account=${alert.account_id}&name=${alert.name}&money=${alert.money}&note=${alert.message}&debt=${alert.debt_id}`}>
                        Thanh to??n{" "}
                        <FontAwesomeIcon style={{marginRight: "10px"}} icon={faCreditCard}/>
                      </Link>.
                      <br/>
                      Xem <Link to="/reminder">danh s??ch n??? ch??a thanh to??n</Link>
                    </Alert>
                )
              } else if (alert.type === 2) {
                return (
                    <Alert key={index} style={{textAlign: "left"}} color="info">
                      <div onClick={() => closeAlert(alert.id)} className="close" data-dismiss="alert" aria-label="close" title="close">??
                      </div>
                      <strong>[Ch??? n??? h???y]</strong> Ch??? n??? c?? t??i kho???n {alert.account_id} ({alert.name}) ???? h???y nh???c n??? v???i n???i dung :<br/>
                      {alert.message}<br/>
                      Xem <Link to="/reminder">danh s??ch n??? ch??a thanh to??n</Link>
                    </Alert>
                )
              } else if (alert.type === 3) {
                return (
                    <Alert key={index} style={{textAlign: "left"}} color="warning">
                      <div onClick={() => closeAlert(alert.id)} className="close" data-dismiss="alert" aria-label="close" title="close">??
                      </div>
                      <strong>[Con n??? h???y]</strong> Con n??? c?? t??i kho???n {alert.account_id} ({alert.name}) ???? h???y nh???c n??? v???i n???i dung :<br/>
                      {alert.message}<br/>
                      Xem <Link to="/debt">danh s??ch nh???c n???</Link>
                    </Alert>
                )
              } else if (alert.type === 4) {
                return (
                    <Alert key={index} style={{textAlign: "left"}} color="success">
                      <div onClick={() => closeAlert(alert.id)} className="close" data-dismiss="alert" aria-label="close" title="close">??
                      </div>
                      <strong>[Con n??? ???? thanh to??n]</strong> Con n??? c?? t??i kho???n {alert.account_id} ({alert.name}) ???? thanh to??n n??? v???i n???i
                      dung
                      :<br/>
                      {alert.message}<br/>
                      Xem <Link to="/debt">danh s??ch nh???c n???</Link>
                    </Alert>
                )
              } else {
                return (
                    <Alert key={index} style={{textAlign: "left"}} color="primary">
                      <div onClick={() => closeAlert(alert.id)} className="close" data-dismiss="alert" aria-label="close" title="close">??
                      </div>
                      <strong>Th??ng b??o l???i</strong>
                    </Alert>
                )
              }
            })
          }
        </Container>
      </>
  );
}

export default Notification;