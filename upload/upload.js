const multer=require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file)
      cb(null, 'public')
    },
    filename: function (req, file, cb) {
        console.log(file)
      cb(null, Date.now()+"-"+file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })
  module.exports=upload;