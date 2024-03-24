import React, { useState, useEffect } from "react";
// import "./Navbar.css"; // Import CSS file for styles

const Navbar = () => {
    const [screenWidth, setScreenWidth] = useState(0);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleChange);
        
        return () => {
            window.removeEventListener("resize", handleChange);
        };
    }, []);

    const handleChange = () => {
        setScreenWidth(window.innerWidth);
    };

    const iconBuilder = (arrOfIcons, limit) => {
        const res = [];
        const remainder = arrOfIcons.slice(limit);

        arrOfIcons.slice(0, limit).forEach((icon, index) => {
            res.push(
                <button key={index} className='nav-btn'>
                    <span className="material-symbols-outlined">{icon}</span>
                </button>
            );
        });

        if (remainder.length > 0) {
            res.push(
                <div className='more-btn-div' key="more-btn">
                    <button className='nav-btn' onClick={() => setShow(!show)}>
                        More
                    </button>
                    <div className={show ? "dropdown-content" : "hidden"}>
                        {remainder.map((icon, index) => (
                            <button key={index} className='dropdown-btn'>
                                <span className="material-symbols-outlined">{icon}</span>
                            </button>
                        ))}
                    </div>
                </div>
            );
        }

        return res;
    };

    const arrOfIcons = [
        "search", "home", "delete", "menu", "settings",
        "favorite", "add", "star", "logout"
    ];

    const limit = Math.ceil(screenWidth / 110);

    return (
        <div className="navbar-container">
            <div className="navbar">
                {iconBuilder(arrOfIcons, limit)}
            </div>
        </div>
    );
};

export default Navbar;
