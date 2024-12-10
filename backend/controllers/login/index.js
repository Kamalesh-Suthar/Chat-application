const signInWithGoogle = async (req, res) => {
  try {
    const { newUserData } = req.body;
    const providerData = newUserData.providerData[0];
    const user = await User.findOne({ email: providerData.email }).exec();
    if (user) {
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
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { signInWithGoogle };
