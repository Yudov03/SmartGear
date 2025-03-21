const Smartgear = require('../models/Smartgear');

exports.getSmartgears = async (req, res) => {
  try {
    const smartgears = await Smartgear.find();
    res.status(200).json(smartgears);
  } catch (error) {
      console.error('Error retrieving print history:', error);
      res.status(500).json({ message: 'Error retrieving print history', error });
  }
};

exports.viewSmartgear = async (req, res) => {
  try {
    const { id } = req.params;

    const smartgear = await Smartgear.findOne({ id: parseInt(id) });

    if (!smartgear) {
      return res.status(404).json({ message: 'Không tìm thấy máy in!' });
    }

    res.status(200).json(smartgear);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
