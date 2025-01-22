

function authentication(req,res,next){

const header = req.header.authorization
const token = header.split(' ')[1];

}
module.exports = authentication;
