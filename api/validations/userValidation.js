module.exports.validateRole = (req, res, next) => {
      try{
          
          if(!req.body || !req.body.role || !(req.body.role === "usar" || req.body.role === "sela")){
            return res.status(401).json({
                message: 'Validation failed'
            });
          }
          next();
    }
    catch{
        return res.status(401).json({
            message: 'Validation failed'
        });
    }
};