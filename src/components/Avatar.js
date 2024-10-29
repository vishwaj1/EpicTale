// Avatar.js
import React from 'react';
import avatarImage from '../assets/avatar.png';

const Avatar = () => {
    return (
        <div className="avatar-container">
            <img src={avatarImage} alt="Avatar" className="avatar" />
        </div>
    );
};

export default Avatar;