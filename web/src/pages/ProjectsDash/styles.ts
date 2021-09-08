import styled from 'styled-components';

export const Content = styled.main`
    display: flex;
    max-width: 100%;
    flex-direction: column;
`;

export const PageTitle = styled.div`
    display: flex;
    flex-direction: column;
    p {
        margin-top: 8px;
        color: #61ce70;
        display: flex;
        align-items: center;
        font-weight: 600;
    }
`;

export const ProjectsList = styled.ul`
    width: 100%;
    list-style-type: none;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 1em;
    flex-direction: row;
    margin-top: 50px;

    li {
        padding: 10px;
        background: 50px;
        margin: 0.5%;
        background: #202020;
        border-radius: 4px;
        cursor: pointer;
        transition: background 300ms;

        &:hover {
            background: #534d9f;

            button {
                background: #8176ff;
            }
        }

        img {
            width: 100%;
            height: 180px;
            border-radius: 4px;
            object-fit: cover;
        }

        div {
            padding: 10px;

            h2 {
                font-size: 18px;
            }

            button {
                margin-top: 15px;
                padding: 5px 10px;
                color: white;
                background: #272727;
                font-size: 10px;
                font-weight: 600;
                border: 0;
                border-radius: 4px;
                transition: background 300ms;
            }
        }
    }
`;
