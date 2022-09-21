import { projectAuth} from '../firebase/config'

export const usePasswordReset = () => {

  // const { authIsReady} = useAuthContext()
  // const authh = projectAuth.aut
  const passwordReset =  async (email) => {
    projectAuth.sendPasswordResetEmail(email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }

  return {passwordReset}
}




