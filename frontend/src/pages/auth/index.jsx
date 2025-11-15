import './style.css'
import Card from '../../components/card/Card';
import Logo from '../../components/logo/Logo'

const Auth = ({}) => {

  return (
    <>
      <div className='container'>
        <div className='card-container'>
          <Logo />
          <Card title={"Welcome"} label={"Sign in to your account or create a new one"}/>
        </div>
      </div>
    </>
  )
}

export default Auth
