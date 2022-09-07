import { faBell, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styled from "styled-components";

const Icon = styled.div`
    position: relative;
    display: flex;
    background-color: var(--color-light);
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    justify-content: center;
    align-items: center;
    transition: var(--transition);

    &:hover {
        background-color: var(--text-secondary);
        cursor: pointer;
    }
`;

const Bubble = styled.div`
    position: absolute;
    top: 0;
    color: var(--color-primary);
    width: 0.1rem;
    height: 0.1rem;

    .fa-circle {
        font-size: 0.5rem;
    }

    // pulse 
    animation: pulse 2s infinite;
    @keyframes pulse {
        0% {
            transform: scale(0.95);
            opacity: 0.5;

        }
        70% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0.95);
            opacity: 0.1;
        }
    }
`;

const NotificationIcon = () => {
    return <Link href="/profile/notifications">
        <Icon>
            <FontAwesomeIcon icon={faBell} />
            <Bubble>
                <FontAwesomeIcon icon={faCircle} />
            </Bubble>
        </Icon>
    </Link>;
};

export default NotificationIcon;
