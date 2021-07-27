import React, { useCallback, useState, useEffect } from 'react';
import { FiPower, FiMenu } from 'react-icons/fi';
import {
    RiDashboardFill,
    RiTodoFill,
    RiMoneyDollarBoxFill,
    RiCodeSSlashFill,
} from 'react-icons/ri';
import { MdScreenShare, MdSettings } from 'react-icons/md';
import { BsFillPeopleFill, BsFillPersonCheckFill } from 'react-icons/bs';
import { GiTechnoHeart } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { useToast } from '../../hooks/toast';
import {
    Container,
    SideBar,
    SidebarHeaderContent,
    Profile,
    TopBar,
    Welcome,
    RightSide,
    Content,
    ProfilePhoto,
    MenuWrapper,
} from './styles';
import logo from '../../assets/ailouise.png';
import { useAuth } from '../../hooks/auth';

const DashBoardStructure: React.FC = ({ children }) => {
    const { signOut, user } = useAuth();
    const [activeMenu, setActiveMenu] = useState(false);
    const { addToast } = useToast();
    const menuWrapper = document.getElementById('menuWrapper');

    const setMenuOff = useCallback(
        (event) => {
            if (!menuWrapper?.contains(event.target)) {
                setActiveMenu(false);
                document.body.removeEventListener('click', setMenuOff, true);
            }
        },
        [menuWrapper],
    );

    useEffect(() => {
        if (menuWrapper && activeMenu) {
            document.body.addEventListener('click', setMenuOff, true);
        }
    }, [setMenuOff, menuWrapper, activeMenu]);

    const toggleMenu = useCallback(() => {
        setActiveMenu(!activeMenu);
    }, [activeMenu]);

    const toastSignOut = useCallback(() => {
        signOut();
        addToast({
            type: 'success',
            title: 'Logout Success',
            description: 'Your logout was successfully completed',
        });
    }, [addToast, signOut]);

    return (
        <Container>
            <SideBar>
                <SidebarHeaderContent>
                    <span>
                        <img src={logo} alt="aiLouise Logo" />
                    </span>
                    <div>
                        <ul>
                            <li>
                                <div>
                                    <RiDashboardFill />
                                </div>
                                Dashboard
                            </li>
                            <li>
                                <div>
                                    <MdScreenShare />
                                </div>
                                Schedule
                            </li>
                            <li>
                                <div>
                                    <RiTodoFill />
                                </div>
                                ToDos
                            </li>
                            <li>
                                <div>
                                    <BsFillPeopleFill />
                                </div>
                                Providers
                            </li>
                            <li>
                                <div>
                                    <BsFillPersonCheckFill />
                                </div>
                                Costumers
                            </li>
                            <li>
                                <div>
                                    <GiTechnoHeart />
                                </div>
                                Products
                            </li>
                            <li>
                                <div>
                                    <RiMoneyDollarBoxFill />
                                </div>
                                Contability
                            </li>
                            <li>
                                <div>
                                    <RiCodeSSlashFill />
                                </div>
                                Status
                            </li>
                            <li>
                                <div>
                                    <MdSettings />
                                </div>
                                Settings
                            </li>
                        </ul>
                    </div>
                    <button type="button" onClick={signOut}>
                        <FiPower /> SignOut
                    </button>
                </SidebarHeaderContent>
            </SideBar>
            <RightSide>
                <TopBar>
                    <Welcome>
                        <span>
                            <button type="button">
                                <FiMenu />
                            </button>
                        </span>
                        <div>
                            <span>Welcome,</span>
                            <strong>{user.name}</strong>
                        </div>
                    </Welcome>
                    <Profile>
                        <ProfilePhoto
                            onClick={toggleMenu}
                            src={user.avatar_url}
                            alt={user.name}
                        />
                        <MenuWrapper active={activeMenu} id="menuWrapper">
                            <ul>
                                <li>
                                    <Link to="/profile">My Account</Link>
                                </li>
                                <button type="button" onClick={toastSignOut}>
                                    <li>
                                        <FiPower />
                                        Logout
                                    </li>
                                </button>
                            </ul>
                        </MenuWrapper>
                    </Profile>
                </TopBar>
                <Content>{children}</Content>
            </RightSide>
        </Container>
    );
};

export default DashBoardStructure;
