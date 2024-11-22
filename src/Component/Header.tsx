import LogoLink from '../assets/fontsnap-logo-final.svg'
const Header = () => {
  return (
    <header>
        <div>
            <img src={LogoLink} alt="logo-image" style={{width: '120px',height: '40px'}}/>
        </div>
        <div>
            <button></button>
            <button></button>
            <button></button>
        </div>
    </header>
  )
}

export default Header