const Group = require("../models/Group");

// @desc Get All Groups
// @routes GET /groups
// @access PRIVATE
const getAllGroups = async (req, res) => {
  const result = await Group.find().lean();

  res.json(result);
};

// @desc Create Group
// @routes POST /groups
// @access PRIVATE
const createGroup = async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: "Name is required" });

  // check if there is a duplicate
  const duplicate = await Group.findOne({ name: name }).lean();
  if (duplicate)
    return res.status(409).json({ message: "Name of Group Already Exist." });

  const result = await Group.create({ name: name });
  if (result) {
    res.json({ message: `${result.name} successfully created` });
  } else {
    res.status(400).json({ message: "Invalid data" });
  }
};

//@desc Delete Group
//@routes DELETE /groups
//@access PRIVATE
const deleteGroup = async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: "ID is required" });

  const foundGroup = await Group.findById(id).exec();
  if (!foundGroup) return res.status(400).json({ message: "Group not found" });

  const result = await foundGroup.deleteOne();

  res.json({ message: `${result.name} successfully deleted!` });
};

module.exports = {
  getAllGroups,
  createGroup,
  deleteGroup,
};
