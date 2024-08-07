import React from 'react';
import icons from 'glyphicons';
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider as PostContext} from './context/PostsContext';
import {Provider as UserContext } from './context/UserContext';
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserContext>
    <PostContext>
        <BrowserRouter >
        <App />
        </BrowserRouter>
    </PostContext>
    </UserContext>
);
// You need to add the prop for the URL