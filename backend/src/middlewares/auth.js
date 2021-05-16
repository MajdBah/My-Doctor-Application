import models from '../models';
import jsonwebtoken from 'jsonwebtoken';

const isLoggedIn = (req, res, next) => {
   try{
      if(!req.headers.authorization){
         return res.status(400).json({message: 'لم يتم توفير رمز الدخول'});
      }
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
      req.currentUser = decoded;
      next();
   }catch(e){
      res.status(500).json(e.message);
   }
}

export default isLoggedIn;