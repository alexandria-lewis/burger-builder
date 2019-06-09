import axios from 'axios';

// Now I have my own axios instance configured for this base URL, this is also the reason why I use this instance approach because later in the course when we add authentication, we'll all use a different URL with axios, so I don't want to set to base URL as a global default even though for the moment I could do that.
const instance = axios.create({
    baseURL: 'https://react-my-burger-2153f.firebaseio.com/'
});

export default instance;