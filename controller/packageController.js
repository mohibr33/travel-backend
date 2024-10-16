const packageModel=require("../model/packageModel")
const connection=require("../config/db")

const addPackage=(req,res)=>{
const packagedata=req.body;
packageModel.addPackage(packagedata,(err,result)=>{
    if(err){
        return res.status(500).send(err.message);
    }
    else{
        return res.status(200).json({
            message:"Package has been added successfully",
            id: result.insertId, 
        });
    }
});
}

const getAllPackages = (req, res) => {
    packageModel.getAllPackages((err, result) => {
        if (err) {
            return res.status(500).json({ message: "Failed to fetch packages", error: err });
        }
        return res.status(200).json(result);
    });
};

const updatePackage = (req, res) => {
    const { id } = req.params;
    const packagedata = req.body; // Retrieve the updated data from the request body
    packageModel.updatePackage(id, packagedata, (err, result) => {
        if (err) {
            return res.status(404).json({ message: "Package not found", error: err.message });
        }
        return res.status(200).json({ message: "Package updated successfully", result });
    });
};

const packageDelete = (req, res) => {
    const { id } = req.params; // Get the package ID from the request parameters
    packageModel.packageDelete(id, (err, result) => {
        if (err) {
            return res.status(404).json({ message: "Package not found", error: err.message });
        }
        return res.status(200).json({ message: "Package deleted successfully", result });
    });
};

module.exports = {
    addPackage,
    getAllPackages,
    updatePackage,
    packageDelete,
}