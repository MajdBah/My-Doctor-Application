import Sequelize from 'sequelize';

const sequelize = new Sequelize(
   process.env.DB,
   process.env.DB_USER,
   process.env.DB_PASS,
   {
      dialect: 'postgres',
   }
);

const models = {
   User: sequelize['import']('./user'),
   Profile: sequelize['import']('./profile'),
}

Object.keys(models).forEach(key => {
   if('associate' in models[key]){
      models[key].associate(models);
   }
})

sequelize.authenticate()
   .then(() => {
      console.log("Connetion has been establieshed successfully!");
   })
   .catch(err => {
      console.log("Error with connection", err);
   });

   export {sequelize};
   export default models;
