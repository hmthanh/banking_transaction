const db = require('../utils/db')

module.exports = {
  add: entity => {
    return db.add(entity, 'receiver_info')
  },

  update: (id, entity) => {
    return db.patch(entity, {id: id}, 'receiver_info')
  },

  get: (id) => {
    return db.load(`
      SELECT * FROM receiver_info WHERE owner_id=${id}`, null)
  },

  countAcc: (acc) => {
    return db.load(`
      SELECT COUNT(*) as num FROM receiver_info WHERE account_num=${acc}`)
  },

  searching: (val, acc) => {
    return db.load(`
      SELECT u.name, b.account_num 
      FROM user_account u
      JOIN banking_info b ON b.owner_id = u.id
      WHERE u.name LIKE '%${val}%' OR b.account_num LIKE '%${acc}%'`)
  },

  delete: (id) => {
    return db.del({id: id}, 'receiver_info')
  },

  getByPartner: (id, partnerCode) => {
    return db.load(`
      SELECT * 
      FROM receiver_info 
      WHERE owner_id=${id} AND partner_bank=${partnerCode}`)
  },
  saveAlias: async data => {
    if (data.toName && data.uid) {
      let entity = {
        account_num: data.toAccount,
        owner_id: data.uid, 
        alias_name: data.toName,
        partner_bank: parseInt(data.partnerCode)
      }
      let rows = await db.load(`SELECT COUNT(*) as num FROM receiver_info WHERE account_num=${data.toAccount} AND owner_id=${data.uid}`)
      // console.log('=========rows SELECT COUNT==========', rows)
      if(!rows || rows[0].num === 0){
        db.add(entity, 'receiver_info')
      }
      
    } else {
      console.log('=========require toName and uid in body request==========')
    }
    
  }
};
