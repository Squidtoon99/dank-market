import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Search = styled.div`
    position: relative;
    padding: 0;
    margin-inline: 1rem;
`;

const SearchInput = styled.input`
    width: 100%;
    height: 3rem;
    padding: 0.5rem;
    border: none;
    border-radius: 50px;
    background-color: var(--color-light);
    color: var(--text-secondary);
    font-size: 1rem;
    transition: var(--transition);
    outline: none;
    padding-left: 30px;
`;

const Icon = styled.div`
    position: absolute;
    top: 0.9rem;
    left: 0.5rem;
    color: var(--color-secondary);
    font-size: 1rem;
`;

const SearchBar: React.FC<{ placeholder: string; }> = ({ ...props }) => {
    return <Search>
        <Icon>
            <FontAwesomeIcon icon={faSearch} />
        </Icon>
        <SearchInput type="text" {...props} />
    </Search>;
};

export default SearchBar;