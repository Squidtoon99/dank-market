import styled, { css } from 'styled-components';
import AccountIcon from './Profile';
import NotificationIcon from './NotificationIcon';

const MobileAccountHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 1rem;
    gap: 0.75rem;

    @media (min-width: 768px) {
        display: none;
    }
`;

const Title = styled.h1`
    font-size: 1.5em;
    text-align: start;
    color: var(--color-secondary);
    font-weight: 600;
    flex-grow: 1;
    `;

const AccountHeader = ({ title }: { title: string; }) => {
    return <>
        <MobileAccountHeader>
            <Title>
                {title}
            </Title>
            <NotificationIcon />
            <AccountIcon />
        </MobileAccountHeader>
    </>;
};

export default AccountHeader;;