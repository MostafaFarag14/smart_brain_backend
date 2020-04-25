const handleRegister = (req, res, db, bcrypt) => {
  db('users')
    .returning('*')
    .insert(
      {
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 8),
        joined: new Date()
      }
    )
    .then(user => {
      if (user.length) {
        res.json(user[user.length - 1])
      }
      else {
        res.json('error regirstering')
      }
    }
    )
    .catch(err => res.status('400').json('already exists'))
}

module.exports = {
  handleRegister: handleRegister
}