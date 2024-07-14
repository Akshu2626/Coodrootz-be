// controllers/roleController.js
const Role = require('../models/Role');
const Menu = require('../models/Menu');

// Get all roles
exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find()
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new role
exports.createRole = async (req, res) => {
  const { name, menus } = req.body;

  try {
    const roleExists = await Role.findOne({ name });
    if (roleExists) {
      return res.status(400).json({ message: 'Role already exists' });
    }

    const newRole = new Role({
      name,
      menus,
    });

    const savedRole = await newRole.save();
    res.status(201).json(savedRole);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

//get roll by id

exports.getRoleById = async (req, res) => {
  const { id } = req.body;

  try {
    // Validate input
    if (!id) {
      return res.status(400).json({ message: 'ID parameter is required' });
    }

    // Find role by ID
    const role = await Role.findById(id);

    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    res.status(200).json(role);
  } catch (error) {
    console.error('Error fetching role:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update an existing role

exports.updateRole = async (req, res) => {
  const { id, name, menus } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'ID, name, and menus are required' });
  }

  try {
    const updatedRole = await Role.findByIdAndUpdate(
      id,
      { name, menus },
      { new: true } // Return the updated document
    );

    if (!updatedRole) {
      return res.status(404).json({ message: 'Role not found' });
    }

    res.status(200).json(updatedRole);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};





// Delete a role
exports.deleteRole = async (req, res) => {
  const { id } = req.body;

  try {
    const deletedRole = await Role.findByIdAndDelete(id);

    if (!deletedRole) {
      return res.status(404).json({ message: 'Role not found' });
    }

    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
