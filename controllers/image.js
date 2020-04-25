const handleImageDetect = (req, res, db) => {
  const { id } = req.body
  db('users')
  .where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then( data => {
    console.log(data)
    res.json(data[0])
  })
  .catch( err => {
    res.status('400').json('error occured')
  })
  
}

module.exports = {
  handleImageDetect: handleImageDetect
}