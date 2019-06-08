import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        {/* Now you could think that you simply say go up to the assets folder and then to the images folder and to burger logo png. Now this will not work as you would expect it to work due to the way our build workflow here is set up, keep in mind, the source folder is only the folder we're working in. 
    
        In the end, webpack will take all these files, bundle them together and create a new output folder. We can see that here because we're in development mode where all of that will happen in memory but once we do publish our app, we will get a real different folder where all the optimized, compiled and bundled assets are contained in. 
        
        Now therefore these assets folder here to the source folder will not be shipped to any real server, the whole source folder won't be shipped there. Hence we should also make webpack aware of the fact that we're using this image and we're actually doing that by importing the image into our javascript file. 
        
        Now of course just like for the css files, this does not mean that webpack mixes the image with our javascript code, how would that look like anyways? It just means we make webpack aware of the fact that we're using this image and webpack will then handle this image with a special plug-in or a special module that was added to webpack, to its config, will handle the image, will basically copy it over to the destination directory it creates, again only in memory during development and we'll even optimize the image. */}
        <img src={burgerLogo} alt="MyBurger" />
        {/* simply set source to burger logo and this will again refer to a string in the end to the path where webpack stored the optimized and copied image. */}
    </div>
);

export default logo;