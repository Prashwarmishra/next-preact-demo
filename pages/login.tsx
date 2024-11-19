import LoginComponent from '../components/Login';
import useNavigation from '../hooks/useNavigation';

const Login = () => {
  useNavigation();
  return <LoginComponent />;
};

export default Login;
