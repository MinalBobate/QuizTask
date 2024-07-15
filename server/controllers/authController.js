import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export const register = async (req, res) => {
  const { firstname,lastname, email, role, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    console.log("console",firstname,lastname,role,password,email);
    user = new User({
      firstname,
      lastname,
      email,
      role,
      password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    console.log("user",user);
    const see=await user.save()
    .then(function( data) {
      
 })
.catch(function(error){
   console.log(error);
});;
    console.log("see",see);
    // const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).send('User saved');
  } catch (err) {
    res.status(500).send('Server error');
  }

};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials 1' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials 2' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json(token );
  } catch (err) {
    res.status(500).send('Server error');
  }
};
