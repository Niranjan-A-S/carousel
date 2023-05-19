import { memo, useCallback } from "react";
import styled, { css } from "styled-components";

export const MinimapWrapper = styled.div`
    display: flex;
    justify-content: center;
    grid-column: 1/4;
    column-gap: 20px;
`;

export const StyledMinimap = styled.img<{ isFocused: boolean }>`
    width: 50px;
    aspect-ratio: 1/1;  
    cursor: pointer;
    height:${({ isFocused }) => isFocused ? 'scale(2px)' : 'unset'};
    transition: transform 0.3s ease;
    
    ${({ isFocused }) =>
        isFocused && css`
            transform: scale(200%);
    `};
`;

export const Minimap = memo(({ images, selectedIndex, changeIndex }: { images: string[], selectedIndex: number, changeIndex: any }) => {

    const renderMinimap = useCallback(() =>
        images.map((imageUrl, index) => <StyledMinimap
            key={imageUrl}
            src={imageUrl}
            isFocused={selectedIndex === index}
            onClick={() => changeIndex(index)}
        />),
        [changeIndex, images, selectedIndex]);

    return <MinimapWrapper >{renderMinimap()}</MinimapWrapper>
});