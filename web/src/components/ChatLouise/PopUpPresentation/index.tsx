import React, { useCallback, useState, useRef } from 'react';
import {
    AiFillStar,
    AiOutlineCheckCircle,
    AiFillClockCircle,
    AiFillCaretDown,
} from 'react-icons/ai';
import { FaPaintBrush } from 'react-icons/fa';
import axios from 'axios';
import api from '../../../services/api';
import project from '../../../assets/project.jpeg';

import {
    PopUpContainer,
    DesignsProject,
    PopUpContent,
    PopUpContentSettings,
    ItemSettingProject,
} from './styles';

import { DoingProject, ContentProjectDoing } from '../Project/styles';

interface IMessage {
    origin: string;
    content: string;
    action?: string;
}

interface IRequestProps {
    isChat: boolean;
    display: boolean;
    setMessage: React.Dispatch<React.SetStateAction<IMessage[]>>;
}

const PopUpPresentation: React.FC<IRequestProps> = ({
    isChat,
    display,
    setMessage,
}) => {
    const [content, setContent] = useState({
        index: 1,
        contents: 2,
        display: true,
    });
    const [displayDesign, setDisplayDesign] = useState<boolean>(false);
    const [checkedItems, setCheckedItems] = useState<number[]>([1]);
    const [projectDoing, setProjectDoing] = useState<boolean>(false);
    const [projectDoingContentShow, setProjectDoingContentShow] =
        useState<boolean>(false);
    const [projectUrl, setProjectUrl] = useState<string>(
        'https://presentations.ailouise.com/show/telmo-default',
    );
    const [projectNameClient, setProjectNameClient] = useState<string>();

    const isWritting = useRef<HTMLInputElement | null>(null);
    const isClientName = useRef<HTMLInputElement | null>(null);
    const displayPopUpContent = useRef<HTMLDivElement | null>(null);

    const isClientNameFunc = useCallback(({ target }) => {
        if (target.value) {
            setProjectNameClient(target.value);
        }
    }, []);

    const searchFunc = useCallback(() => {
        if (isWritting.current) {
            const letters = isWritting.current.value;
            letters.length >= 5
                ? setDisplayDesign(true)
                : setDisplayDesign(false);
        }
    }, []);

    const sendProject = useCallback(async () => {
        const postData = {
            title: `Olá, ${projectNameClient}! Sou a Louise`,
            status: 'publish',
            slug: `${projectNameClient}`,
        };

        // const TokenBearer = axios
        //     .post(
        //         'https://presentations.ailouise.com/wp-json/jwt-auth/v1/token',
        //         {
        //             username: 'ailouise1104',
        //             password: '8IwcGDbDUu&0)0H%tD8yhqHC',
        //         },
        //     )
        //     .then(response => response.data.token);

        // console.log(TokenBearer);

        const axiosConfig = {
            headers: {
                Authorization: `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcHJlc2VudGF0aW9ucy5haWxvdWlzZS5jb20iLCJpYXQiOjE2MzA4Njc3ODIsIm5iZiI6MTYzMDg2Nzc4MiwiZXhwIjoxNjMxNDcyNTgyLCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxIn19fQ.SI-o9X0dbihj7fjD_lyiXKkbdb0y8EUJA_LgXF_U-20'}`,
            },
        };

        await api
            .post('projects/new', {
                kind: 'presentation',
                name: projectNameClient,
            })
            .then(async response => {
                const messages = response.data.map((mss: IMessage) => ({
                    origin: mss.origin,
                    content: mss.content,
                }));
                setMessage(oldVals => [...oldVals, ...messages]);
                setProjectDoingContentShow(true);

                setTimeout(async () => {
                    const respCreateProject = await axios
                        .post('/wp/v2/show/', postData, axiosConfig)
                        .then(res => res.data.link);
                    setProjectDoing(true);
                    setProjectUrl(respCreateProject);
                    setMessage(oldVals => [
                        ...oldVals,
                        {
                            origin: 'lu',
                            content: `Está prontinho, Gabriel. Mais rápido que o esperado. Arrasa lá!`,
                        },
                    ]);
                }, 12000);
            });
    }, [setMessage, projectNameClient]);

    const nextContent = useCallback((): void => {
        if (content.index >= content.contents) {
            if (displayPopUpContent.current) {
                displayPopUpContent.current.style.visibility = 'hidden';
                sendProject();
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
    }, [content.index, content.contents, sendProject]);

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

    const openProject = useCallback(() => {
        setProjectDoing(!projectDoing);
    }, [projectDoing, setProjectDoing]);

    return (
        <>
            <DoingProject
                onClick={openProject}
                display={projectDoing}
                visibilityContent={projectDoingContentShow}
            >
                <div>
                    <AiFillClockCircle />
                    Building Project...
                    <AiFillCaretDown />
                </div>
                <ContentProjectDoing display={projectDoing}>
                    <img src={project} alt="Project Building" />
                    <h3>Building Project for Telmo</h3>
                    <p>
                        Estou construindo seu projeto, Gabriel. Em breve estará
                        pronto! Fique atento em...
                    </p>
                    <div>
                        <a href={projectUrl} target="_blank" rel="noreferrer">
                            Acesse Aqui
                        </a>
                    </div>
                </ContentProjectDoing>
            </DoingProject>
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
                            ref={isClientName}
                            onChange={isClientNameFunc}
                            type="text"
                            placeholder="Client Name"
                        />
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
                                    <h4>
                                        3 Meetings for Review with Specialists
                                    </h4>
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
        </>
    );
};

export default PopUpPresentation;
