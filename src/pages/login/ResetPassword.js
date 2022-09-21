import {useState} from 'react'
import { useHistory } from 'react-router-dom'
import { usePasswordReset } from '../../hooks/usePasswordReset'


function ResetPassword() {
  const [email,setEmail] = useState('')
  const [resetDone, setResetDone] = useState(false)
  const {passwordReset} = usePasswordReset()
  let history = useHistory();


  const handleSubmit = (e) =>
  {
    e.preventDefault()
    passwordReset(email)
    setResetDone(true)
    setTimeout(() => {
      history.push('/login')
    }, 4000);
    

  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="auth-form">
      <h2>Reset Password</h2>
      
      <label>
        <span>email:</span>
        <input
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>

      {/* {isPending && (
        <button className="btn" disabled>
          Logging in...
        </button>
      )} */}
    <button className="btn" type="submit" name='login'>Reset Password</button>
      
      
    {resetDone && (<div className="message">Password reset email sent successfully!</div>)}
    </form>

    </div>
    
    
  );
}

export default ResetPassword;
