// @ts-nocheck
import styled, { css } from "styled-components";
import { faCompass, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useScrollDirection } from "hooks";
import NavLink from "./NavLink";

const Bar = styled.div`
    --nav-scroll-height: 3rem;
    z-index: 15;
    display: flex;
    position: fixed;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    bottom: 1rem;
    width: 90%;
    border-radius: 50px;
    background-color: var(--color-secondary);
    color: var(--text-secondary);
    padding: 0.5rem;
    left: 4%;
    /* transform: translate(-50%, 0); */
    transition: var(--transition);
    height: var(--nav-scroll-height);
    

    @media (min-width: 768px) {
        display: none;
    }

    a.active {
        color: var(--color-primary);
    }

    a {
        display: block;
        transition: var(--transition);
        .active {
            color: var(--text-primary);
        }

        &:not(.active):hover {
            color: var(--color-light);
        }
    }

    @media (prefers-reduced-motion: no-preference) {
    ${props =>
        props.scrollDirection === 'up' &&
        css`
        height: var(--nav-scroll-height);
        transform: translateY(0px);
        box-shadow: 0 10px 30px -10px var(--color-secondary);
      `};
    ${props =>
        props.scrollDirection === 'down' &&
        css`
        height: var(--nav-scroll-height);
        transform: translateY(calc(var(--nav-scroll-height) + 1rem));
        box-shadow: 0 10px 30px -10px var(--color-secondary);
      `};
  }
`;

const Tab = () => {
    // @ts-ignore
    const scrollDirection = useScrollDirection('down');

    const routes = [
        {
            name: 'Home',
            icon: faHouse,
            path: '/'
        },
        {
            name: 'Explore',
            icon: faCompass,
            path: '/explore'
        },
        {
            name: 'Profile',
            icon: faUser,
            path: '/profile'
        }
    ];
    return <Bar scrollDirection={scrollDirection} aria-current="page" >
        {routes.map((route, index) => (
            <NavLink key={index} href={route.path}>
                <FontAwesomeIcon icon={route.icon} />
            </NavLink>
        ))}
    </Bar >;
};

export default Tab;