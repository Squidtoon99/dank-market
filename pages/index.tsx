import ProfileHeader from "components/ProfileHeader";
import SearchBar from "components/SearchBar";
import { NextPage } from "next";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "rxjs";
import styled from "styled-components";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Loader = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const LoaderCard = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--text-secondary);
    border-radius: 0.5rem;
    padding: 1rem;
    width: 100%;
    max-width: 20rem;
    margin: 1rem;
    height: 30vh;
    transition: var(--transition);
    box-shadow: var(--shadow);

    
    animation: pulse 2s infinite ease-in-out;
    
    @keyframes pulse {
        0% {
            transform: scale(0.98);
            opacity: 0.5;
        }
        50% {
            transform: scale(1);
            opacity: 0.25;
        }
        100% {
            transform: scale(0.98);
            opacity: 0.5;
        }
    }
    `;
const Home: NextPage = () => {
  const [search, setSearch] = useState('');
  const [debounceSearch, setdebounceSearch] = useState('');
  const { data: offers } = useSWR(
    `/api/featured${debounceSearch ? `?search=${debounceSearch}` : ''}`,
    fetcher
  );

  const handleOnChange = useCallback(({ target: { value } }: { target: { value: string; }; }) => {
    setSearch(value);
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setdebounceSearch(search);
    }, 250);

    return () => {
      clearTimeout(timerId);
    };
  }, [search]);

  let content;

  if (!offers) {
    content =
      <Loader>
        {
          [...Array(4)].map((_, i) => (
            <LoaderCard key={i} />
          ))
        }
      </Loader>;
  } else if (offers.length === 0) {
    content = <p>No offers found</p>;
  } else {
    content = offers.map((offer: { id: string; title: string; description: string; }) => (
      <div key={offer.id}>
        <Link href={`/offers/${offer.id}`} passHref>
          <a>
            <h3>{offer.title}</h3>
            <p>{offer.description}</p>
          </a>
        </Link>
      </div>
    ));
  }

  return <>
    <ProfileHeader title="Dank Market" />
    {/* @ts-ignore */}
    <SearchBar placeholder="Search Market" onChange={handleOnChange} />
    {content}
  </>;
};

export default Home;;