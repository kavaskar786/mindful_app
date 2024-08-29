import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import firebase from "../../../utils/firebase";
import { logout } from "../../../store/features/auth/authSlice.js";
import { useEffect } from "react";
import logo from "../../../assets/images/mlf1.png";
 // Adjust the path to your logo

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleLogout();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <img src={logo} alt="My Logo" style={{ width: "150px", height: "auto" }} />
      <h2>Logout</h2>
    </div>
  );
};

export default Logout;
