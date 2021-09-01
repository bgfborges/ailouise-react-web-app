import React, { useCallback, useState } from 'react';
import PopUpContent from './PopUpContent';
import { PopUpContainer, PopUpSliderBullets } from './styles';

const FullPopUp: React.FC = () => {
    const [content, setContent] = useState({
        index: 1,
        contents: 4,
        display: true,
    });

    const nextContent = useCallback((): void => {
        if (content.index >= content.contents) {
            setContent({
                index: 0,
                contents: 0,
                display: false,
            });
            return;
        }
        setContent({
            index: content.index + 1,
            contents: 4,
            display: true,
        });
    }, [content.index, content.contents]);

    const closePopup = useCallback((): void => {
        nextContent();
        localStorage.removeItem('@aiLouise:googleCalendar');
    }, [nextContent]);

    const backContent = useCallback((): void => {
        if (content.index >= content.contents) {
            setContent({
                index: 0,
                contents: 0,
                display: false,
            });
            return;
        }
        setContent({
            index: content.index - 1,
            contents: 4,
            display: true,
        });
    }, [content.index, content.contents]);

    const indents = [];
    for (let i = 0; i < content.contents; i += 1) {
        indents.push(<span key={i} />);
    }

    return (
        <PopUpContainer index={content.index} displayPopup={content.display}>
            <div>
                <main>
                    <PopUpContent
                        index={content.index}
                        nextFunc={nextContent}
                        backFunc={backContent}
                        finishFunc={closePopup}
                    />
                </main>
                <PopUpSliderBullets index={content.index}>
                    {indents}
                </PopUpSliderBullets>
            </div>
        </PopUpContainer>
    );
};

export default FullPopUp;
