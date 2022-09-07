import ProfileHeader from 'components/ProfileHeader';
import SearchBar from 'components/SearchBar';
import { GetStaticProps, NextPage } from 'next';
import { firestore as db, itemToJSON } from "lib/firebase";
import { Item } from 'types';
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import styled from "styled-components";

const FeatureList = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

const Card = styled.a`
    position: relative;
    width: fit-content;
    margin: 18px auto;
    cursor: pointer;
    color: var(--text-secondary);
    z-index:1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 90%;
    min-width: 30%;
    min-height: 180px;
    padding: 0 15px;
    background: var(--color-light);
    box-shadow: 0 10px 30px -10px var(--color-secondary);
    border-radius: 25px;
    
    transition: var(--transition);

    /* backdrop-filter: blur(5px);  */
    @media (min-width: 768px) {
        width: 80%;
        margin: 12px;
    }

    @media (min-width: 1024px) {
        width: 20%;
    }

    background-image: url(${({ item }: { item: Item; }) => item.icon.replace('gif', 'webp')});
    
    &:hover {
        transform: scale(1.025);
        background-image: url(${({ item }: { item: Item; }) => item.icon});
    }

    ::after{
        content:"";
        position:absolute;
        background: linear-gradient(0deg,        rgba(39,38,42,1) 0%, rgba(255,255,255,0)     60%);
        z-index:2;
        border-radius: 25px;
        height:100%;
        width:100%;
        top:0;
        left:0;
    }
`;

const CardHeader = styled.h2`
    position: absolute;
    bottom: 5%;
    left: 5%;
    line-height: 50px;
    z-index:3;
    font-size: 2rem;
    color: var(--text-primary);
    opacity: 0.95;
    font-weight: 700;
    margin: 0;
    padding: 8px 0;
    filter: drop-shadow(1 1 1rem rgba(255,255,255, 1));
`;

const CardHeaderEnd = styled.h2`
    position: absolute;
    bottom: -3px;
    left: 5%;
    line-height: 25px;
    z-index:3;
    font-size: 1rem;
    color: var(--color-primary);
    opacity: 0.95;
    font-weight: 500;
    margin: 0;
    padding: 8px 0;
    filter: drop-shadow(1 1 1rem rgba(255,255,255, 1));
`;

const LIMIT = 15;


const Explore: NextPage<{ items: Item[]; }> = ({ items }) => {
    return <>
        <ProfileHeader title="Explore" />
        <SearchBar placeholder="Search for items" />
        <FeatureList>
            {items.map(item => {
                return <Card item={item} key={item.slug} href={item.slug}>
                    <CardHeader>{item.name}</CardHeader>
                    <CardHeaderEnd>{item.offers} offers</CardHeaderEnd>
                </Card>;
            })}
        </FeatureList>
        <div style={{ height: '100px' }} />
    </>;
};

export const getStaticProps: GetStaticProps = async () => {
    const itemsRef = collection(db, 'items');
    const itemsQuery = query(itemsRef, where('offers', '>', 0), orderBy('offers', 'desc'), limit(LIMIT));
    const itemsSnapshot = await getDocs(itemsQuery);
    const items = itemsSnapshot.docs.map(itemToJSON);
    return {
        props: { items },
        revalidate: 60 * 60 // will be passed to the page component as props
    };
};

export default Explore;