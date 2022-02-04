import React, {useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import {SidebarData} from "./SideBarData";
import { IconContext } from 'react-icons';
import '../css/Navbar.css'
import * as IoIcons from "react-icons/io";
import logo from '../../Images/Logo.png'


function Sidebar({groupeId}) {

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>

                <nav className={ 'col-2 nav-menu active'}>
                    <ul className='nav-menu-items'>
                        <li className='navbar-toggle'>
                            <Link to={`/groupe/home/${groupeId}`} className='navbar-brand'>
                                <img className={'navbar-brand'} src={logo}/>
                            </Link>
                        </li>
                        <li className={"nav-text"}>
                            <Link to={`/groupe/home/${groupeId}`}>
                                <AiIcons.AiFillHome />
                                <span>Home</span>
                            </Link>
                        </li>
                        <li className={"nav-text"}>
                            <Link to={`/groupe/admin/users/${groupeId}`}>
                                <IoIcons.IoMdPeople />
                                <span>Members</span>
                            </Link>
                        </li>
                        <li className={"nav-text"}>
                            <Link to={`/groupe/admin/trips/${groupeId}`}>
                                <IoIcons.IoIosAirplane />
                                <span>Travel</span>
                            </Link>
                        </li>
                        <li className={"nav-text"}>
                            <Link to={`/groupe/admin/demandes/${groupeId}`}>
                                <IoIcons.IoIosPersonAdd />
                                <span>Demands</span>
                            </Link>
                        </li>
                        <li className={"nav-text"}>
                            <Link to={`/createTrip/${groupeId}`}>
                                <IoIcons.IoIosAddCircleOutline/>
                                <span>Create trip</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </IconContext.Provider>
        </>

    );
}

export default Sidebar;