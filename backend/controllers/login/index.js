const User = require("../../models/User");

const signInWithGoogle = async (req, res) => {
  try {
    const { newUserData } = req.body;
    const providerData = newUserData.providerData[0];
    const user = await User.findOne({ email: providerData.email }).exec();

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    };

    if (user) {
      // Combined token for existing user
      const token = JSON.stringify({
        uid: user.uid,
        provider: user.providerId,
      });

      res.cookie("auth-token", token, cookieOptions);
      res.status(200).json(user);
      return;
    }

    const newUser = new User({
      providerId: providerData.providerId,
      displayName: providerData.displayName,
      email: providerData.email,
      phoneNumber: providerData.phoneNumber,
      photoURL: providerData.photoURL,
      uid: providerData.uid,
    });
    await newUser.save();

    // Combined token for new user
    const token = JSON.stringify({
      uid: newUser.uid,
      provider: newUser.providerId,
    });

    res.cookie("auth-token", token, cookieOptions);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { signInWithGoogle };
