
import './style.css'

function AuthLayout({children}) {
    return (
        <main className='auth-container'>
            {children}
        </main>
    );
  }
  
  export default AuthLayout;
  