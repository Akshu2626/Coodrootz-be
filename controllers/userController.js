const User = require('../models/User');
const Role = require('../models/Role');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('role');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.assignRole = async (req, res) => {
  const { userId, roleId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const role = await Role.findById(roleId);
    if (!role) return res.status(404).json({ error: 'Role not found' });

    user.role = roleId;
    await user.save();

    res.json({ message: 'Role assigned successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateIsAdmin = async (req, res) => {
  // const { userId } = req.params;
  const { isAdmin, userId } = req.body;

  try {
    // Validate input
    if (!userId || !isAdmin) {
      return res.status(400).json({ message: 'User ID and isAdmin value are required' });
    }

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isAdmin },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user isAdmin field:', error);
    res.status(500).json({ message: 'Server error' });
  }
};