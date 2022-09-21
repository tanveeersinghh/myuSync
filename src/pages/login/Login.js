import {useState} from 'react'
import { useHistory } from 'react-router-dom'
import { useLogin } from '../../hooks/useLogin'

function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const {login,isPending,error} = useLogin()
  let history = useHistory();

  const handlePasswordReset = () =>
  {
    history.push('/resetpassword')
  }

  const handleSubmit = (e) =>
  {
    e.preventDefault()
      login(email,password)
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="auth-form">
      <h2>Login</h2>
      <label>
        <span>email:</span>
        <input
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
     
      {isPending && (
        <button className="btn" disabled>
          Logging in...
        </button>
      )}
      {!isPending && <button className="btn" type="submit" name='login'>Login</button>}
      
      
      {error && <div className="error">{error}</div>}
    </form>
    <span>{!isPending && <button className="btn" onClick={handlePasswordReset}>Forgot Password</button>}</span>
    </div>
    
    
  );
}

export default Login;
