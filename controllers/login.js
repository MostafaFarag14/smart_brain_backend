handleLogin = (req, res, db, bcrypt) => {
  let passIsValid = false
  db.select('*').from('users').where({
    email: req.body.email
  })
  .then(users => {
    if (users.length > 0) {
      passIsValid = bcrypt.compareSync(req.body.password, users[0].password)
        if (passIsValid) {
          res.json(users[0])
        }
        else {
          res.status('400').json('wrong pass')
        }
      }
      else {
        res.status('400').json('wrong user')
      }
    })
    .catch(err => {
      console.log(err)
      res.status('400').json('wrong credentials')
    })
}

module.exports = {
  handleLogin: handleLogin
}