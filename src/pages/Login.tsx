import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { validatePasswordAndEmail } from '../utils/validation';
import useLocalStorage from '../hooks/useLocalStorage';
import { ActionLogin } from '../redux/actions/actions';

const INITIAL_STATE = {
  user: {
    email: '',
    password: '',
  },
};

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, setValue] = useLocalStorage('user');

  const [userLogin, setUserLogin] = useState(INITIAL_STATE);
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setUserLogin((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        [name]: value,
      },
    }));
    const updatedInputs = { ...userLogin.user, [name]: value };
    const isValid = validatePasswordAndEmail(updatedInputs);
    setDisabled(!isValid);
  };

  return (
    <div>
      <form>
        <input
          type="email"
          name="email"
          value={ userLogin.user.email }
          onChange={ (event) => handleSubmit(event) }
          data-testid="email-input"
          placeholder="Digite seu Email"
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          value={ userLogin.user.password }
          onChange={ (event) => handleSubmit(event) }
          placeholder="Digite sua senha"
        />
        <button
          type="submit"
          onClick={ (event) => {
            event?.preventDefault();
            setValue({ email: userLogin.user.email });
            dispatch(ActionLogin(userLogin.user));
            navigate('/meals');
          } }
          disabled={ disabled }
          data-testid="login-submit-btn"
        >
          Enter
        </button>
      </form>
    </div>
  );
}
