const userModel = require('../models/userModel')

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        _id: user._id,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};


const registerController = async (req, res) => {
    try {
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).json({
            status:true,
            newUser,
        })
    } catch (error) {
        res.status(400).json(
            {
                success: false,
                error
            }
        )
    }
}

module.exports = {
  loginController,
  registerController
};
