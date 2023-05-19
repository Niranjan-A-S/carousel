import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { LeftArrow, RightArrow, Image, Container } from '../styles';
import { ICarousel } from '../types';
import { Minimap } from './minimap';
import axios from 'axios';

export const Carousel: FC<ICarousel> = memo(({ autoCycle = false, loop = false, hideMinimap = true, defaultKey }) => {

    const [images, setImages] = useState<string[]>([]);

    //Getting random images from API
    useEffect(() => {
        (async function fetchData() {
            const options = {
                method: 'GET',
                url: 'https://hargrimm-wikihow-v1.p.rapidapi.com/images',
                params: { count: '20' },
                headers: {
                    'X-RapidAPI-Key': '0f6afe1502msh515292c5c966abep11a156jsndc6156c3c9f1',
                    'X-RapidAPI-Host': 'hargrimm-wikihow-v1.p.rapidapi.com'
                }
            };

            try {
                const { data } = await axios.request(options);
                setImages(Object.values(data));
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    const lastIndex = useMemo(() => images.length - 1, [images.length]);
    const middleIndex = useMemo(() => Math.floor(images.length / 2), [images.length])
    const [index, setIndex] = useState(defaultKey ?? middleIndex);

    const changeIndex = useCallback((actionType: 'increment' | 'decrement') => {
        let nextIndex = 0;
        if (loop) {
            if (actionType === 'increment') {
                nextIndex = index === lastIndex ? 0 : index + 1;
            } else if (actionType === 'decrement') {
                nextIndex = index === 0 ? lastIndex : index - 1;
            }
        } else {
            if (actionType === 'increment') {
                nextIndex = index === lastIndex ? index : index + 1;
            } else if (actionType === 'decrement') {
                nextIndex = index === 0 ? index : index - 1;
            }
        }
        setIndex(nextIndex);
    }, [lastIndex, index, loop]);


    const incrementIndex = useCallback(() => {
        changeIndex('increment');
    }, [changeIndex]);

    const decrementIndex = useCallback(() => {
        changeIndex('decrement');
    }, [changeIndex]);


    const handleKeyDown = useCallback(({ key }: KeyboardEvent) => {
        switch (key) {
            case "ArrowLeft":
                decrementIndex();
                break;
            case "ArrowRight":
                incrementIndex();
                break;
            default:
                break;
        }
    }, [incrementIndex, decrementIndex])

    const cycleAutomatic = useCallback(() => {
        setTimeout(() => {
            setIndex((index + 1) % images.length);
        }, 2000);
    }, [images.length, index]);

    useEffect(() => {
        if (autoCycle) {
            cycleAutomatic();
            return;
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [autoCycle, cycleAutomatic, handleKeyDown]);

    const selectImage = useCallback((index: number) => {
        setIndex(index);
    }, []);

    const renderMinimap = useCallback(() => hideMinimap ? <Minimap images={images} selectedIndex={index} changeIndex={selectImage} /> : null, [hideMinimap, images, index, selectImage]);

    return (
        <Container>
            <LeftArrow src="arrow.png" onClick={decrementIndex} />
            <Image src={images[index]} />
            <RightArrow src="arrow.png" onClick={incrementIndex} />
            {renderMinimap()}
        </Container>
    );
});
