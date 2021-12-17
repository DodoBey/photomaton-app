import React from 'react';


const logo = "/images/textLogo.png";

const Header = () => {

    return <>
        <div className="headerWrapper">
            <img className="logo" src={logo} alt="logo" className="textLogo" />
        </div>
    </>
}

export default Header;