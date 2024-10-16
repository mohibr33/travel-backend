const mysql=require("mysql2")
const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"travel"
})
connection.connect((err)=>{
    if(err){
        console.log("Error connecting to the database");
        return ;
    }
    else {
        console.log("Connected to the database");
    }

})
module.exports=connection;