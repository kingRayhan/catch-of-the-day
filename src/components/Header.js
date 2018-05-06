import React from 'react';
const Header = ({ tagline }) => (
    <React.Fragment>
        <header className="top">
            <h1>
                Catch
                <span className="ofThe">
                    <span className="of">of</span>
                    <span className="the">The</span>
                </span>
                Day
            </h1>
        </header>
        <h3 className="tagline">
            <span>{tagline}</span>
        </h3>
    </React.Fragment>
)
export default Header;