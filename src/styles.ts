import styled from "styled-components";

export const Container = styled.div`
    height: 100vh;
    display: grid;
    padding: 100px 150px;
    grid-template-columns: auto 500px auto;
    align-items: center;
    justify-content: center;
    justify-items: center;
`;

export const Image = styled.img`
    height: 500px;
    width: 500px;
    background-repeat: no-repeat;
    justify-self: center;
    border-radius: 10px;
    user-select: none;
    animation: animate;

    @keyframes animate  {
        0% {
            opacity : 10%;
        }
        50%{
            opacity : 50%;
        }
        100% {
            opacity : 100%;
        }
    }

`;

export const LeftArrow = styled.img`
    cursor: pointer;
    height: 50px;
    width: 50px;
`;

export const RightArrow = styled(LeftArrow)`
    transform: rotate(180deg);
`;


