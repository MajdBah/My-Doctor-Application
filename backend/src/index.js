import 'dotenv/config';
import models, {sequelize} from './models/index';
import app from './app';

sequelize.sync().then(() => {
   app.listen(process.env.PORT, () => {
      console.log("Server Is Working in http://localhost/"+process.env.PORT);
   });
})
