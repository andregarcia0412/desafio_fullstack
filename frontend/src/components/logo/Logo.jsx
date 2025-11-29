import React from 'react'
import './style.logo.css'
import Wallet from '../../assets/wallet.png'

const Logo = ({}) => {

    const [isLoaded, setLoaded] = React.useState(false)

    React.useEffect(() => {
        setLoaded(true)
    }, [])

    return(
        <div className={`logo-container ${isLoaded ? 'logo-active' : ''}`}>
            <div className={'icon-container'}>
                <img src={Wallet} alt="wallet-icon"/>
            </div>
            <h1>LookUp</h1>
        </div>
    )
}

export default Logo