import React from 'react';
import {render} from 'react-dom';
import Layout from './Layout';
import AdminLayout from './AdminLayout';
import global from './Global.less'
// //import 'normalize.css';
const appEl = document.getElementById('app');
const adminEl = document.getElementById('adminApp');

if(appEl){
    render(<Layout />, appEl);
}

if(adminEl){
    render(<AdminLayout />, adminEl);
}



