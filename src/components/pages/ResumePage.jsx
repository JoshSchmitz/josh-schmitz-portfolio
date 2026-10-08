import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import Icon from '../icon/Icon';
import SkillsList from '../skills/SkillsList';
import Portrait from '../portrait/Portrait';
import SocialButton from '../button/SocialButton';

const ResumePage = () => {
  const navigate = useNavigate();
  const [resume, setResume] = useState([]);
  const [experiencesOpen, setExperiencesOpen] = useState(false);
  const [accomplishmentsOpen, setAccomplishmentsOpen] = useState(false);
  const [groupsOpen, setGroupsOpen] = useState(false);

  useEffect(() => {
    const resumeData = [
      {
        id: '00001',
        educations: [
          {
            id: '00001',
            degree: 'Bachelors of Science',
            institution: 'The College of St. Scholastica',
            startDate: '2008',
            endDate: '2012',
            majors: ['Computer Information Systems'],
            minors: [],
            focuses: ['Web Design', 'Software Engineering'],
          },
        ],
        experiences: [
          {
            id: '00001',
            position: 'Site Operations Manager',
            company: 'May Mobility',
            description:
              'Directed AV site operations with an emphasis on safety and alignment with headquarters objectives. Tested software, collected data, oversaw team autonomy, prepared reports, streamlined workflows, and collaborated with partners to enhance operations and customer service.',
            startDate: '4/16/2025',
            endDate: '',
          },
          {
            id: '00002',
            position: 'Site Supervisor II',
            company: 'May Mobility',
            description:
              'Led two safe winter seasons, showing strong leadership in training and safety. Developed processes for gathering video from vehicle cameras for quality assurance, optimized AVO schedules with full-time positions, managed issue reporting and resolution with partners by remaining calm and decisive under pressure to ensure smooth transit fleet operations.',
            startDate: '1/1/2025',
            endDate: '4/15/2025',
          },
          {
            id: '00003',
            position: 'Site Supervisor',
            company: 'May Mobility',
            description:
              'Supervised a transit fleet comprising both autonomous vehicles and human operators, ensuring compliance with safety regulations. Gathered data and feedback, working with engineering teams to keep vehicles in good operational condition.',
            startDate: '3/6/2024',
            endDate: '12/31/2024',
          },
          {
            id: '00004',
            position: 'Autonomous Vehicle Operator',
            company: 'May Mobility',
            description:
              'Operated Autonomous Vehicles (AV) prioritizing safety, rider comfort, and autonomous operation by deciding when to use autonomous mode, anticipating vehicle actions, taking control when unsafe or uncomfortable, and logging events for continuous improvement.',
            startDate: '12/05/2023',
            endDate: '3/05/2024',
          },
          {
            id: '00005',
            position: 'IT Systems Specialist',
            company: 'North Homes Children & Family Services',
            description:
              'Optimized IT processes with our Managed IT partner, aligning technology with business goals. Developed an IT intranet, documented policies and inventory, and automated workflows using SharePoint and PowerAutomate.',
            startDate: '3/22/2021',
            endDate: '9/29/2023',
          },
        ],
        skills: [
          {
            id: '00001',
            name: 'Web Applications',
            level: 7,
            icon: 'IoCodeSlash',
          },
          {
            id: '00002',
            name: 'Figma',
            level: 4,
            icon: 'PiFigmaLogoBold',
          },
          {
            id: '00003',
            name: 'UI/UX',
            level: 3,
            icon: 'IoPencil',
          },
          {
            id: '00004',
            name: 'UI/Project Management',
            level: 5,
            icon: 'IoBarChart',
          },
          {
            id: '00005',
            name: 'Mobile First Design',
            level: 9,
            icon: 'IoPhonePortraitOutline',
          },
          {
            id: '00006',
            name: 'React',
            level: 6,
            icon: 'IoLogoReact',
          },
          {
            id: '00007',
            name: 'SharePoint',
            level: 8,
            icon: 'SiMicrosoftsharepoint',
          },
          {
            id: '00008',
            name: 'Logos',
            level: 5,
            icon: 'IoPencil',
          },
          {
            id: '00009',
            name: 'GitHub',
            level: 7,
            icon: 'IoLogoGithub',
          },
          {
            id: '00010',
            name: 'Process Improvement',
            level: 6,
            icon: 'IoBarChart',
          },
          {
            id: '00011',
            name: 'MongoDB',
            level: 4,
            icon: 'SiMongodb',
          },
          {
            id: '00012',
            name: 'Constructive Feedback',
            level: 8,
            icon: 'IoPeople',
          },
          {
            id: '00013',
            name: 'Sass',
            level: 6,
            icon: 'IoLogoSass',
          },
          {
            id: '00014',
            name: 'NodeJS',
            level: 4,
            icon: 'IoLogoNodejs',
          },
          {
            id: '00015',
            name: 'Example Leadership',
            level: 7,
            icon: 'IoPeople',
          },
          {
            id: '00016',
            name: 'Organization',
            level: 9,
            icon: 'IoGitBranch',
          },
          {
            id: '00017',
            name: 'Active Listening',
            level: 7,
            icon: 'IoPeople',
          },
          {
            id: '00018',
            name: 'Conflict Resolution',
            level: 5,
            icon: 'IoPeople',
          },
          {
            id: '00019',
            name: 'Properties & Variables',
            level: 6,
            icon: 'PiFigmaLogoBold',
          },
          {
            id: '00020',
            name: 'Content Design',
            level: 3,
            icon: 'BiBookContent',
          },
          {
            id: '00021',
            name: 'Graphic Design',
            level: 4,
            icon: 'IoPencil',
          },
        ],
        leaderships: [
          {
            id: '00001',
            title: 'Via Crisis Management',
            description:
              'Led the reporting and follow-up of an emergency issue with Via that significantly impeded site operations. Adjusted shift operations for AVOs to address the disruption while gathering bug reports and collaborating with Via to ensure the resolution was successfully completed.',
          },
          {
            id: '00002',
            title: 'Lead Tenor',
            description:
              'Served as Lead Tenor in the Duluth Bible Church choir, organized sectionals, supported new tenors, and set a strong vocal example.',
          },
          {
            id: '00003',
            title: 'Via Crisis Management',
            description:
              'Led the reporting and follow-up of an emergency issue with Via that significantly impeded site operations. Adjusted shift operations for AVOs to address the disruption while gathering bug reports and collaborating with Via to ensure the resolution was successfully completed.',
          },
        ],
        projects: [
          {
            id: '00001',
            title: 'goMARTI 2.0 Re-launch',
            description:
              'Oversaw AV site operations for the launch of the goMARTI 2.0 project, focusing on safety, service continuity, and expansion planning. Managed the transition to two new vehicle ADK platforms, expanded routes by 10 miles and 20 stops, extended the service area by 2.5 miles, completed three software testing and release cycles, and increased service hours by 151.',
            date: '9/1/2025',
          },
          {
            id: '00002',
            title: 'Garmin Camera QA Process',
            description:
              'Established a weekly routine for collecting and archiving vehicle camera footage on an external hard drive, including SD card replacement, formatting for reuse, and daily Garmin camera shutdowns to ensure quality assurance and equipment longevity. ',
            date: '9/1/2024',
          },
          {
            id: '00003',
            title: 'NH Conference Room Tech Install',
            description:
              'Planned and executed the installation of a multimedia system for meetings, conferencing, and presentations. Led the project from planning and initial bids to final installation and user training. ',
            date: '7/1/2023',
          },
          {
            id: '00004',
            title: 'NH Server Upgrade',
            description:
              'Facilitated the upgrade of our server infrastructure with our Managed IT Provider, including regular update meetings, decision making, and internal communication on downtime and changes.',
            date: '8/1/2023',
          },
        ],
        accomplishments: [
          {
            id: '00001',
            title: 'Resume Website Design',
            description:
              'Designed a fully prototyped and working Figma file of Josh Schmitz resume and portfolio website. This mobile first design includes a reusable component structure for scalability and ease in conversion to the final website product. ',
            date: '2026',
          },
        ],
        groups: [
          {
            id: '00001',
            name: 'Boy Scouts of America',
            position: 'Eagle Scout',
            startDate: '2007',
            endDate: 'Present',
          },
          {
            id: '00002',
            name: 'The College of St. Scholastica Computer Club',
            position: 'Webmaster',
            startDate: '2009',
            endDate: '2012',
          },
          {
            id: '00003',
            name: 'Duluth Bible Church Standing Choir',
            position: 'Tenor',
            startDate: '2004',
            endDate: '2020',
          },
          {
            id: '00004',
            name: 'Grace Campus Fellowship, CSS Chapter ',
            position: 'President',
            startDate: '2010',
            endDate: '2012',
          },
          {
            id: '00005',
            name: 'Students Today Leaders Forever, CSS Chapter ',
            position: 'Bus Core',
            startDate: '2011',
            endDate: '2012',
          },
          {
            id: '00006',
            name: 'Boy Scouts of America',
            position: 'Boy Scout',
            startDate: '2005',
            endDate: '2007',
          },
        ],
        awards: [
          {
            id: '00001',
            title: 'Eagle Scout',
            issuingBody: 'Boy Scouts of America',
            date: '8/20/2007',
            icon: 'MdMilitaryTech',
          },
          {
            id: '00002',
            title: 'STEM Scholar',
            issuingBody: 'National Science Foundation',
            date: '8/20/2010',
            icon: 'IoRibbon',
          },
        ],
      },
    ];

    setResume(resumeData);
  }, []);

  const skillClick = () => {
    navigate('/skills');
  };

  const experienceSectionClick = () => {
    setExperiencesOpen(!experiencesOpen);
  };

  const accomplishmentSectionClick = () => {
    setAccomplishmentsOpen(!accomplishmentsOpen);
  };

  const groupSectionClick = () => {
    setGroupsOpen(!groupsOpen);
  };
  const figmaClick = () => {
    window.open('https://www.figma.com/@joshuahschmitz', '_blank');
  };
  const githubClick = () => {
    window.open('https://github.com/JoshSchmitz', '_blank');
  };
  const linkedinClick = () => {
    window.open('https://www.linkedin.com/in/joshuahschmitz/', '_blank');
  };
  const emailClick = () => {
    window.open('mailto:josh.schmitz1@gmail.com', '_self');
  };

  return (
    <div className='body'>
      <div className='content-resume'>
        <div className='profile'>
          <Portrait />
          <div className='details'>
            <div className='headline'>
              <h2 className='name'>Joshuah Schmitz</h2>
            </div>
            <div className='bio'>
              <h5 className='title'>About Me</h5>
              <div className='bio-text'>
                <p>
                  Josh Schmitz is a Site Operations Manager for May Mobility who
                  leads an autonomous vehicle deployment in Grand Rapids, MN.
                  Josh believes that autonomous vehicles can reshape the
                  transportation landscape, creating movement opportunities for
                  everyone.
                </p>
                <p>
                  He oversaw the AV relaunch of goMARTI 2.0, and managed Garmin
                  Camera QA Process and NH Server Upgrade projects. He is a
                  mentor, Eagle Scout, and NSF STEM Scholar.
                </p>
                <p>
                  Josh holds a Bachelors of Science in Computer Information
                  Systems from The College of St. Scholastica.
                </p>
              </div>
            </div>
            <div className='social'>
              <SocialButton icon='PiFigmaLogoBold' onClick={figmaClick} />
              <SocialButton icon='IoLogoGithub' onClick={githubClick} />
              <SocialButton icon='IoLogoLinkedin' onClick={linkedinClick} />
              <SocialButton icon='IoMailOutline' onClick={emailClick} />
            </div>
          </div>
        </div>
        {resume.map((resume) => (
          <div className='resume' key={resume.id}>
            <div className='column'>
              {resume.educations.length !== 0 && (
                <div className='education-section'>
                  <h2 className='title'>Education</h2>
                  <div className='educations'>
                    {resume.educations.map((education) => (
                      <div className='education' key={education.id}>
                        <div className='headline'>
                          <div className='degree'>{education.degree}</div>
                          <div className='institution'>
                            {education.institution}
                          </div>
                        </div>
                        <div className='details'>
                          {education.majors.length !== 0 && (
                            <div className='majors'>
                              <div className='label'>
                                {education.majors.length > 1
                                  ? 'Majors:'
                                  : 'Major:'}
                              </div>
                              {education.majors.map((major, index) => (
                                <div className='major' key={major}>
                                  <div className='name'>{major}</div>
                                  {index < education.majors.length - 1 && (
                                    <div className='separator'></div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                          {education.minors.length !== 0 && (
                            <div className='minors'>
                              <div className='label'>
                                {education.minors.length > 1
                                  ? 'Minors:'
                                  : 'Minor:'}
                              </div>
                              {education.minors.map((minor, index) => (
                                <div className='minor' key={minor}>
                                  <div className='name'>{minor}</div>
                                  {index < education.minors.length - 1 && (
                                    <div className='separator'></div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                          {education.focuses.length !== 0 && (
                            <div className='focuses'>
                              <div className='label'>Focus:</div>
                              {education.focuses.map((focus, index) => (
                                <div className='focus' key={focus}>
                                  <div className='name'>{focus}</div>
                                  {index < education.focuses.length - 1 && (
                                    <div className='separator'></div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                          <div className='date'>
                            <div className='start'>{education.startDate}</div>
                            <div className='separator'></div>
                            <div className='end'>
                              {education.endDate
                                ? education.endDate
                                : 'Present'}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {resume.experiences.length !== 0 && (
                <div
                  className={
                    experiencesOpen
                      ? 'experiences-section-open'
                      : 'experiences-section-closed'
                  }
                >
                  <div className='title' onClick={experienceSectionClick}>
                    Experience
                    <Icon icon='IoChevronUp' />
                  </div>
                  <div className='experiences'>
                    {resume.experiences
                      .sort((a, b) => dayjs(b.startDate) - dayjs(a.startDate))
                      .map((exp, index, array) => (
                        <div
                          key={exp.id}
                          className={
                            index === array.length - 1
                              ? (exp.company === array[index - 1].company) &
                                dayjs(exp.endDate).isSame(
                                  dayjs(array[index - 1].startDate).add(
                                    1,
                                    'day',
                                  ),
                                  'day',
                                )
                                ? 'experience sequence-end'
                                : 'experience'
                              : (exp.company === array[index + 1].company) &
                                  dayjs(exp.startDate).isSame(
                                    dayjs(array[index + 1].endDate).add(
                                      1,
                                      'day',
                                    ),
                                    'day',
                                  )
                                ? index !== 0
                                  ? (exp.company === array[index - 1].company) &
                                    dayjs(exp.endDate).isSame(
                                      dayjs(array[index - 1].startDate).add(
                                        1,
                                        'day',
                                      ),
                                      'day',
                                    )
                                    ? 'experience sequence-start'
                                    : 'experience sequence'
                                  : 'experience sequence-start'
                                : (exp.company === array[index - 1].company) &
                                    dayjs(exp.endDate).isSame(
                                      dayjs(array[index - 1].startDate).add(
                                        1,
                                        'day',
                                      ),
                                      'day',
                                    )
                                  ? 'experience'
                                  : 'experience sequence-end'
                          }
                        >
                          <div className='sidebar'>
                            <div className='before'></div>
                            <div className='dot-bg'>
                              <div className='dot-stroke'>
                                <div className='dot-center'></div>
                              </div>
                            </div>
                            <div className='after'></div>
                          </div>
                          <div className='info'>
                            <div className='position'>{exp.position}</div>
                            <div className='details'>
                              <div className='company'>{exp.company}</div>
                              <div className='description'>
                                {exp.description}
                              </div>
                              <div className='date'>
                                <div className='start'>{exp.startDate}</div>
                                <div className='separator'></div>
                                <div className='end'>
                                  {exp.endDate ? exp.endDate : 'Present'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className='fade'></div>
                </div>
              )}
              {resume.skills.length !== 0 && (
                <div className='skills-section'>
                  <div className='title'>Skills</div>
                  <SkillsList
                    type='chip'
                    skills={resume.skills}
                    onClick={skillClick}
                  />
                </div>
              )}
              {resume.leaderships.length !== 0 && (
                <div className='leadership-section'>
                  <div className='title'>Leadership</div>
                  <div className='leaderships'>
                    {resume.leaderships.map((leadership) => (
                      <div className='leadership' key={leadership.id}>
                        <div className='title'>{leadership.title}</div>
                        <div className='description'>
                          {leadership.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className='column'>
              {resume.projects.length !== 0 && (
                <div className='project-section'>
                  <div className='title'>Projects</div>
                  <div className='projects'>
                    {resume.projects.map((project) => (
                      <div className='project' key={project.id}>
                        <div className='title'>
                          <div className='date'>
                            {dayjs(project.date).format('YYYY')}
                          </div>
                          <div className='name'>{project.title}</div>
                        </div>
                        <div className='description'>{project.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {resume.accomplishments.length !== 0 && (
                <div
                  className={
                    accomplishmentsOpen
                      ? 'accomplishment-section-open'
                      : 'accomplishment-section-closed'
                  }
                >
                  <div className='title' onClick={accomplishmentSectionClick}>
                    <p>Accomplishments</p>
                    <Icon icon='IoChevronUp' />
                  </div>
                  <div className='accomplishments'>
                    {resume.accomplishments.map((accomplishment) => (
                      <div className='accomplishment' key={accomplishment.id}>
                        <div className='title'>
                          <div className='date'>
                            {dayjs(accomplishment.date).format('YYYY')}
                          </div>
                          <div className='name'>{accomplishment.title}</div>
                        </div>
                        <div className='description'>
                          {accomplishment.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {resume.groups.length !== 0 && (
                <div
                  className={
                    groupsOpen ? 'group-section-open' : 'group-section-closed'
                  }
                >
                  <div className='title' onClick={groupSectionClick}>
                    Groups
                    <Icon icon='IoChevronUp' />
                  </div>
                  <div className='groups'>
                    {resume.groups.map((group) => (
                      <div className='group' key={group.id}>
                        <div className='position'>{group.position}</div>
                        <div className='name'>{group.name}</div>
                        <div className='date'>
                          <div className='start'>{group.startDate}</div>
                          <div className='separator'></div>
                          <div className='end'>{group.endDate}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {resume.awards.length !== 0 && (
                <div className='award-section'>
                  <div className='title'>Awards</div>
                  <div className='awards'>
                    {resume.awards.map((award) => (
                      <div className='award' key={award.id}>
                        <Icon icon={award.icon} />
                        <div className='title'>{award.title}</div>
                        <div className='issuing-body'>{award.issuingBody}</div>
                        <div className='date'>
                          {dayjs(award.date).format('YYYY')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};
export default ResumePage;
