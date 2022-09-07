import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUser from "hooks/useUser";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import styled from "styled-components";

const Icon = styled.a`
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

const AccountIcon = () => {
    const { user, mutateUser } = useUser();
    useEffect(() => {
        fetch('/api/user').then(u => u.json()).then(u => mutateUser(u));
    });

    let icon;
    if (user) {
        icon = <Image
            src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
            alt="Profile Picture"
            width={64}
            height={64}
            style={{
                borderRadius: '50%',
                width: '3rem',
                height: '3rem',
            }}
        />;
    } else {
        icon = <FontAwesomeIcon icon={faUserCircle} />;
    }
    return <Link href="/profile">
        <Icon>
            {icon}
        </Icon>
    </Link>;
};

export default AccountIcon;