const express = require("express");
const moment = require("moment");
const { hash, sign, verify } = require("../utils/rsa.signature");
const pgp = require("../utils/pgp.signature");
const {
  SECRET_TOKEN,
  OTP,
  PGP_URL_TRANFER,
  RSA_URL_TRANFER,
  RSA_PARTNERCODE,
  SECRET_RSA,
} = require("../config");
const mailController = require("../mailer/mail.controller");
const transferModel = require("../models/transfer.model");
const notifyModel = require("../models/notify.model");
const debtModel = require("../models/debt.model");
const {
  getAccountInfo,
  getIdByAccountNum,
} = require("../models/account.model");
const { htmlOTPTemplate, msgOTPTemplate } = require("../utils/common");
const { TranferInternalBank } = require("../models/transaction.Tranfer.Model");
const { broadcastAll } = require("../ws");
const { saveAlias } = require("../models/receiverInfo.model");
const { MinusTransfer } = require("../models/transaction.Tranfer.Model");
const router = express.Router();
const partnerCode = 5412;
const encoding = "base64";
const bcrypt = require("bcryptjs");

const axios = require("axios");

const validateData = (data) => {
  if (!data.uid) return false;
  if (!data.toAccount) return false;
  if (!data.amount) return false;
  return true;
};

const tranferPgp = async (transaction) => {
  let ts = moment().valueOf(new Date()); // get current milliseconds since the Unix Epoch
  let data = {
    STTTH: `${transaction.to_account}`,
    Time: `${parseInt(ts / 1000)}`,
    STTTHAnother: `${transaction.from_account}`,
    Money: `${transaction.amount}`,
    PartnerCode: `0725`,
    NameAnother: transaction.acc_name,
  };
  console.log(data);
  const UrlApi = PGP_URL_TRANFER;
  let signature = await pgp.signUtf8(JSON.stringify(data));
  data.Signature = Buffer.from(signature).toString(encoding);
  data.Hash = bcrypt.hashSync(
    `${data.STTTH}${data.STTTHAnother}${data.PartnerCode}${data.Time}${data.Money}Nhom6`
  );
  // console.log(data)
  return await axios.post(UrlApi, data);
};

// const tranferRSA = async transaction => {
//   const data = {
//     from: `${transaction.acc_name}`,
//     fromAccountNumber: `${transaction.from_account}`,
//     toAccountNumber: `${transaction.to_account}`,
//     amount: to_account.amount,
//     description: 'Chuy???n li??n ng??n h??ng',
//     ts: Date.now(),
//     recvWindow: 5000,
// }
//   const UrlApi = RSA_URL_TRANFER
//   let signature  =  await rsa.sign(JSON.stringify(data)) //JSON.stringify(data)
//   data.sign = Buffer.from(signature).toString('base64')
//   let hash = await rsa.hash(JSON.stringify(data))
//   data.hash = hash
//   // console.log(data)
//   return axios.post(UrlApi, data)
// }

const tranferRSA = async (transaction) => {
  const data = {
    from: `${transaction.acc_name}`,
    fromAccountNumber: `${transaction.from_account}`,
    toAccountNumber: `${transaction.to_account}`,
    amount: transaction.amount,
    description: "Chuy???n li??n ng??n h??ng",
    ts: Date.now(),
    recvWindow: 5000,
  };
  const UrlApi = RSA_URL_TRANFER;
  const body = {
    data: data, // Request data
    // hash: hash(JSON.stringify(data), SECRET_RSA), // Chu???i hash l???i c???a request data (???? chuy???n th??nh JSON string) b???ng secret key c???a qu?? ?????i t??c,
    partnerId: `${RSA_PARTNERCODE}`, // Partner Id c???a ?????i t??c, ???????c cung c???p khi 2 b??n li??n k???t v???i nhau
  };

  let signature = await sign(JSON.stringify(data)); //JSON.stringify(data)
  body.sign = Buffer.from(signature).toString("base64");
  let hashval = await hash(JSON.stringify(data), SECRET_RSA);
  body.hash = hashval;
  // console.log(data)
  return await axios.post(UrlApi, body);
};

/**
 * logic chung, chuy???n ti???n li??n ng??n h??ng,
 * b?????c 1: t???o 1 transaction chuy???n ti???n, t???o m?? OTP
 * b?????c 2: user verify OTP th??nh c??ng
 * bu??c 3: th???c hi???n g???i c??c api b??n ng'o??i ng??n h??ng ch??? ch??? k?? tr??? v???
 * b?????c 4: veryfy ch??? k??.
 * b?????c 5. l??u l???i v?? charge ti???n
 */

/*
 * type = 2 chuy???n ti???n
 * type = 1 nh???n ti???n
 * type = 4 chuy???n kho???n n???
 */

router.post("/", async (req, res) => {
  console.log(req.body);
  const type = req.body.type;
  if (req.body.saveAlias && req.body.saveAlias === true) {
    saveAlias({ ...req.body });
  }
  let isValid = validateData(req.body);
  if (!isValid) {
    res.status(200).json({
      error_code: -100,
      message: "invalid parrams",
    });
    return;
  }
  // kh??ng cho chuy???n t???i ch??nh m??nh
  if (req.body.fromAccount === req.body.toAccount) {
    res.status(200).json({
      error_code: -103,
      message: "fromAccount = toAccount",
    });
    return;
  }
  const rows = await getAccountInfo(req.body.fromAccount);
  if (!rows || rows.length === 0) {
    res.status(200).json({
      error_code: -101,
      message: "fromAccount not found",
    });
    return;
  }

  const sender = rows[0];
  // n???u s??? ti???n trong t??i kho???n kh??ng ?????
  // console.log('-------------', sender.surplus)
  if (sender.surplus < req.body.amount) {
    res.status(200).json({
      msg: "failure",
      errorCode: -201,
    });
  } else {
    const entity = {
      acc_name: sender.name,
      from_account: sender.account_num,
      to_account: req.body.toAccount,
      amount: req.body.amount,
      note: req.body.note,
      timestamp: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      type: type, // type tr??? ti???n
      state: 1, // ch??a th??nh c??ng
      partner_code: req.body.partnerCode,
      surplus: 0,
    };
    console.log("entity", entity);
    // res.status(200).json({
    //   msg: 'successfully',
    //   errorCode: 0,
    //   transId: 1
    // })
    // return

    const insertVal = await transferModel.add(entity);
    console.log("insertVal", insertVal);
    const otp = OTP.generate(SECRET_TOKEN);
    console.log("OTP tranfer", otp);
    let msg = msgOTPTemplate(sender.name, "transfer", otp);
    let html_msg = htmlOTPTemplate(sender.name, "transfer", otp);
    mailController.sentMail(
      sender.email,
      "[New Vimo] Please verify OTP for transaction",
      msg,
      html_msg
    );

    res.status(200).json({
      msg: "successfully",
      errorCode: 0,
      transId: insertVal.insertId,
    });

    console.log("den day ", req.body.toAccount);
    if (type === 4) {
      const creditor = await getAccountInfo(req.body.toAccount);
      console.log("creditor : ", creditor);
      const creditorInfo = creditor[0];
      let notify = {
        type: 4,
        recipient: creditorInfo.id,
        account_id: sender.account_num,
        name: sender.name,
        money: req.body.amount,
        message: req.body.note,
        debt_id: req.body.debt_id,
      };
      console.log("notify", notify);
      await notifyModel.deleteByDebtId(req.body.debt_id);
      await debtModel.delete(req.body.debt_id)
      await notifyModel.add(notify);

      broadcastAll(JSON.stringify(notify));
    }
  }
});

router.post("/:id", async (req, res) => {
  // console.log('req.body', req.body);

  let otp = req.body.OTP;
  const isValid = OTP.verify({ token: otp, secret: SECRET_TOKEN });
  if (!isValid)
    res.status(200).json({
      msg: "failure, invalid OTP",
      errorCode: -202, // m?? l???i OTP kh??ng h???p l???
    });
  else {
    let transaction = await transferModel.get(req.body.transId);
    if (!transaction || transaction.length == 0) {
      res.status(200).json({
        msg: "failure, invalid transId",
        errorCode: -207, // m?? l???i OTP kh??ng h???p l???
      });
      return;
    }
    transaction = transaction[0];
    // chuy???n kho???n n???i b???
    if (
      transaction.partner_code === null ||
      transaction.partner_code === "0" ||
      transaction.partner_code === 0
    ) {
      TranferInternalBank(transaction)
        .then((val) => {
          // console.log(val)
          res.status(200).json({
            msg: "successfully",
            errorCode: 0,
            transId: req.body.transId, // m?? transaction th???c hi??n giao d???ch c???n g???i ??i trong b?????c 3(OTP)
            to_account: transaction.to_account, // s??? t??i kho???n th??? h?????ng
            amount: transaction.amount, // s??? ti???n giao d???ch
            from_account: transaction.from_account,
            timestamp: transaction.timestamp,
          });
        })
        .catch((err) => {
          res.status(200).json({
            msg: "failure, invalid OTP",
            errorCode: -202, // m?? l???i sOTP kh??ng h???p l???
          });
        });
    } else {
      // chuy???n kho???n pgp
      if (
        transaction.partner_code === "7261" ||
        transaction.partner_code === 7261
      ) {
        let isFalse = false;
        try {
          await MinusTransfer(transaction);
        } catch (err) {
          isFalse = true;
        }
        if (isFalse) {
          res.status(200).json({
            msg: "S??? d?? kh??ng ?????",
            errorCode: -100,
          });
          return;
        }

        let respose = await tranferPgp(transaction);
        // console.log(respose.data)

        let signature = respose.data.sign;

        if (!signature) signature = `don't respone signature`;
        const tran = {
          type: 2,
          state: 0,
          signature: signature,
        };
        let isVerify = await pgp.verify(signature);
        if (isVerify) {
          // console.log(transaction)
          transaction.signature = signature;
          // patch(tran, {trans_id: req.body.transId}, 'transaction_tranfer')
          res.status(200).json({
            msg: "successfully",
            errorCode: 0,
            transId: req.body.transId, // m?? transaction th???c hi??n giao d???ch c???n g???i ??i trong b?????c 3(OTP)
            to_account: transaction.to_account, // s??? t??i kho???n th??? h?????ng
            amount: transaction.amount, // s??? ti???n giao d???ch
            from_account: transaction.from_account,
            timestamp: transaction.timestamp,
          });
        } else {
          res.status(200).json({
            msg: "invalid",
            errorCode: 101,
          });
        }
      } else {
        let respose = await tranferRSA(transaction);
        // console.log(respose)

        let signature = respose.data.sign;
        if (!signature) signature = `don't respone signature`;
        const tran = {
          type: 2,
          state: 0,
          signature: signature,
        };
        //verify(signature)
        transaction.signature = signature;
        await MinusTransfer(transaction);
        res.status(200).json({
          msg: "successfully",
          errorCode: 0,
          transId: req.body.transId, // m?? transaction th???c hi??n giao d???ch c???n g???i ??i trong b?????c 3(OTP)
          to_account: transaction.to_account, // s??? t??i kho???n th??? h?????ng
          amount: transaction.amount, // s??? ti???n giao d???ch,
          from_account: transaction.from_account,
          timestamp: transaction.timestamp,
        });
      }
      res.status(200).json({
        msg: "tranfer another backing not suport yet!!",
        errorCode: -203, // m?? l???i sOTP kh??ng h???p l???
      });
    }
  }
});

module.exports = router;
