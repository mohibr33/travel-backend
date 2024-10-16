const adminModel=require("../model/adminModel") 
// Add a new admin
const addAdmin = (req, res) => {
    const adminData = req.body; // Get admin data from request body
    adminModel.addAdmin(adminData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ message: "Admin added successfully", id: result.insertId });
    });
};

// Update an admin
const updateAdmin = (req, res) => {
    const { id } = req.params; // Get admin ID from request parameters
    const adminData = req.body; // Get updated admin data from request body
    adminModel.updateAdmin(id, adminData, (err, result) => {
        if (err) {
            return res.status(404).json({ message: "Admin not found", error: err.message });
        }
        res.status(200).json({ message: "Admin updated successfully" });
    });
};

// Delete an admin
const adminDelete = (req, res) => {
    const { id } = req.params; // Get admin ID from request parameters
    adminModel.adminDelete(id, (err, result) => {
        if (err) {
            return res.status(404).json({ message: "Admin not found", error: err.message });
        }
        res.status(200).json({ message: "Admin deleted successfully" });
    });
};
module.exports={
    adminDelete,
    addAdmin,
    updateAdmin,
}