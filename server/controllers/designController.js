const Design = require('../models/Design');

exports.createDesign = async (req, res) => {
  try {
    const design = new Design(req.body);
    await design.save();
    res.status(201).json({ message: 'Design created successfully', design });
  } catch (error) {
    res.status(500).json({ message: 'Error creating design', error });
  }
};