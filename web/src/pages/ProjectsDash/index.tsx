import React from 'react';
import DashBoardStructure from '../DashBoardStructure';
import { Content, PageTitle, ProjectsList } from './styles';
import project from '../../assets/project.jpeg';

const ProjectDash: React.FC = () => {
    return (
        <DashBoardStructure>
            <Content>
                <PageTitle>
                    <h1>Projects on Company</h1>
                    <p>Your Projects with your Team</p>
                </PageTitle>
                <ProjectsList>
                    <li>
                        <img src={project} alt="Project Thumbnail" />
                        <div>
                            <h2>Presentation Telmo</h2>
                            <button type="button">See More</button>
                        </div>
                    </li>
                    <li>
                        <img src={project} alt="Project Thumbnail" />
                        <div>
                            <h2>Presentation Telmo</h2>
                            <button type="button">See More</button>
                        </div>
                    </li>
                    <li>
                        <img src={project} alt="Project Thumbnail" />
                        <div>
                            <h2>Presentation Telmo</h2>
                            <button type="button">See More</button>
                        </div>
                    </li>
                    <li>
                        <img src={project} alt="Project Thumbnail" />
                        <div>
                            <h2>Presentation Telmo</h2>
                            <button type="button">See More</button>
                        </div>
                    </li>
                    <li>
                        <img src={project} alt="Project Thumbnail" />
                        <div>
                            <h2>Presentation Telmo</h2>
                            <button type="button">See More</button>
                        </div>
                    </li>
                    <li>
                        <img src={project} alt="Project Thumbnail" />
                        <div>
                            <h2>Presentation Telmo</h2>
                            <button type="button">See More</button>
                        </div>
                    </li>
                    <li>
                        <img src={project} alt="Project Thumbnail" />
                        <div>
                            <h2>Presentation Telmo</h2>
                            <button type="button">See More</button>
                        </div>
                    </li>
                    <li>
                        <img src={project} alt="Project Thumbnail" />
                        <div>
                            <h2>Presentation Telmo</h2>
                            <button type="button">See More</button>
                        </div>
                    </li>
                </ProjectsList>
            </Content>
        </DashBoardStructure>
    );
};

export default ProjectDash;
