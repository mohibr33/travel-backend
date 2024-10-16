const connection=require("../config/db")

class Package{
    constructor(destination,description,startdate,enddate){
        this.destination=destination;
        this.description=description;
        this.startdate=startdate;
        this.enddate=enddate;
   }
   check(){
    if(!this.destination||!this.description||!this.startdate||!this.enddate){
        return res.status(400).json("All fields are required")
   }
}
}

const addPackage=(packagedata,callback)=>{
const package=new Package(packagedata.destination,packagedata.description,packagedata.enddate,packagedata.startdate)
try{
    package.check()
}catch(error){
    return callback(err,null)
}
const query=`Insert into package(destination,description,startdate,enddate) values(?,?,?,?)`
connection.query(query,[package.description,package.destination,package.enddate,package.startdate],(err,result)=>{
if(err){
    return callback(err,null)
}
callback(null,result);
});
}

  const getAllPackages = (req, res) => {
    const query = `SELECT * FROM package`; // Adjust the table name if needed
    connection.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Failed to fetch Packages", error: err });
        }
        res.status(200).json(result);
    });
};
const packageDelete=(id,callback)=>{
    const query = `DELETE FROM package WHERE id= ?`;
    connection.query(query,[id],(err,result)=>{
      if(err){
        return callback(err,null);
      }
      if(result.affectedRows===0){
        return callback(new Error("Package not found for deletion",null))
      }
      callback(null,result)
    })
  }
  const updatePackage = (id, packagedata, callback) => {
    const package=new Package(packagedata.destination,packagedata.description,packagedata.enddate,packagedata.startdate)

  
    try {
      package.check();
    } catch (error) {
      return callback(error, null);
    }
  
    const query = `UPDATE package SET destination = ?, description = ? , enddate=?, startdate=? WHERE id = ?`;
    connection.query(query, [package.description,package.destination,package.startdate,package.enddate, id], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      if (result.affectedRows === 0) {
        return callback(new Error("Package not found for update"), null);
      }
      callback(null, result);
    });
  };    

  module.exports={
    addPackage,
    getAllPackages,
    updatePackage,
    packageDelete,
  }