// AnotherComponent.tsx

import React from 'react';
import { ProfileForm } from './profileform';
import { Nav } from '../component/Nav';
 // Adjust path as per your file structure

const AnotherComponent = () => {
    return (
        <><Nav />
        <div className='mt-7'>
            <ProfileForm />
        </div></>
    );
};

export default AnotherComponent;
