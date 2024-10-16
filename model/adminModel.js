const connection=require("../config/db")

class Admin {
    constructor(password, email) {
      this.password = password;
      this.email = email;
    }
    check() {
      if (!this.email || !this.password) {
        throw new Error("All fields are required.");
      }
    }
  }
  //create
  const addAdmin = (adminData, callback) => {
    const admin = new Admin(adminData.password, adminData.email); //instance
    
    try {
      admin.check();  
    } catch (error) {
      return callback(error, null); 
    }
    const query = `INSERT INTO admin (password, email) VALUES (?, ?)`;
      connection.query(query, [admin.password, admin.email ], (err, result) => {
      if (err) {
        return callback(err, null); 
      }
      callback(null, result); 
    });
  };
  //delete
  const adminDelete=(id,callback)=>{
    const query = `DELETE FROM admin WHERE id= ?`;
    connection.query(query,[id],(err,result)=>{
      if(err){
        return callback(err,null);
      }
      if(result.affectedRows===0){
        return callback(new Error("Admin not found for deletion",null))
      }
      callback(null,result)
    })
  }
  const updateAdmin = (id, adminData, callback) => {
    const admin = new Admin(adminData.password, adminData.email); // Create an instance

    try {
        admin.check(); // Validate admin data
    } catch (error) {
        return callback(error, null);
    }

    // Fixed table name from 'form' to 'admin' for updating the admin
    const query = `UPDATE admin SET password = ?, email = ? WHERE id = ?`;
    connection.query(query, [admin.password, admin.email, id], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        if (result.affectedRows === 0) {
            return callback(new Error("Admin not found for update"), null);
        }
        callback(null, result);
    });
};

  module.exports = {
    addAdmin,
    adminDelete,
    updateAdmin,
  
  };