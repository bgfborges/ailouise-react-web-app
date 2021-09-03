import React, { useCallback, useState, useRef } from 'react';
import { AiFillStar, AiOutlineCheckCircle } from 'react-icons/ai';
import { FaPaintBrush } from 'react-icons/fa';
import {
    PopUpContainer,
    DesignsProject,
    PopUpContent,
    PopUpContentSettings,
    ItemSettingProject,
} from './styles';

interface IRequestProps {
    isChat: boolean;
    display: boolean;
}

const PopUpPresentation: React.FC<IRequestProps> = ({ isChat, display }) => {
    const [content, setContent] = useState({
        index: 1,
        contents: 2,
        display: true,
    });
    const [displayDesign, setDisplayDesign] = useState<boolean>(false);
    const [checkedItems, setCheckedItems] = useState<number[]>([1]);

    const isWritting = useRef<HTMLInputElement | null>(null);
    const displayPopUpContent = useRef<HTMLDivElement | null>(null);

    const searchFunc = useCallback(() => {
        if (isWritting.current) {
            const letters = isWritting.current.value;
            letters.length >= 5
                ? setDisplayDesign(true)
                : setDisplayDesign(false);
        }
    }, []);

    const nextContent = useCallback((): void => {
        if (content.index >= content.contents) {
            if (displayPopUpContent.current) {
                displayPopUpContent.current.style.visibility = 'hidden';
            }
            setContent({
                index: 0,
                contents: 0,
                display: false,
            });
            return;
        }
        setContent({
            index: content.index + 1,
            contents: 2,
            display: true,
        });
    }, [content.index, content.contents]);

    const selectItem = useCallback(
        e => {
            const selected = Number(e.currentTarget.dataset.index);
            if (selected) {
                const alreadSelected = checkedItems.find(
                    item => item === selected,
                );
                if (!alreadSelected) {
                    setCheckedItems(oldVal => [...oldVal, selected]);
                } else {
                    setCheckedItems(
                        checkedItems.filter(item => item !== selected),
                    );
                }
            }
        },
        [checkedItems],
    );

    return (
        <PopUpContainer
            isChat={isChat}
            index={content.index}
            ref={displayPopUpContent}
            display={display}
        >
            <PopUpContent key={1}>
                <div>
                    <AiFillStar />
                    <h3>Choose your Design Start</h3>
                </div>
                <div>
                    <input
                        ref={isWritting}
                        onChange={searchFunc}
                        type="text"
                        placeholder="Search Design"
                    />
                </div>
                <div>
                    <DesignsProject
                        display={displayDesign}
                        onClick={nextContent}
                    >
                        <AiOutlineCheckCircle />
                        <h5>Built-in Minimalista</h5>
                    </DesignsProject>
                </div>
            </PopUpContent>
            <PopUpContentSettings key={2} checked={checkedItems}>
                <div>
                    <FaPaintBrush />
                    <h3>Selecting Characteristics</h3>
                </div>
                <div>
                    <ul>
                        <li>
                            <ItemSettingProject
                                data-index={1}
                                onClick={selectItem}
                            >
                                <AiOutlineCheckCircle />
                                <h4>Google Analytics AI</h4>
                            </ItemSettingProject>
                        </li>
                        <li>
                            <ItemSettingProject
                                data-index={2}
                                onClick={selectItem}
                            >
                                <AiOutlineCheckCircle />
                                <h4>SEO 100%</h4>
                            </ItemSettingProject>
                        </li>
                        <li>
                            <ItemSettingProject
                                data-index={3}
                                onClick={selectItem}
                            >
                                <AiOutlineCheckCircle />
                                <h4>Dedicated Hosting</h4>
                            </ItemSettingProject>
                        </li>
                        <li>
                            <ItemSettingProject
                                data-index={4}
                                onClick={selectItem}
                            >
                                <AiOutlineCheckCircle />
                                <h4>3 Meetings for Review with Specialists</h4>
                            </ItemSettingProject>
                        </li>
                        <li>
                            <ItemSettingProject
                                data-index={5}
                                onClick={selectItem}
                            >
                                <AiOutlineCheckCircle />
                                <h4>Ready in 1 day</h4>
                            </ItemSettingProject>
                        </li>
                    </ul>
                    <button type="button" onClick={nextContent}>
                        Create
                    </button>
                </div>
            </PopUpContentSettings>
        </PopUpContainer>
    );
};

export default PopUpPresentation;
