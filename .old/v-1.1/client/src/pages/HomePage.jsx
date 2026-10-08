import { useEffect, useState } from 'react';
import { useGetResumeQuery } from '../store/slices/resume/api-resume';
// import { useSelector } from 'react-redux';

// import RingLoader from 'react-spinners/RingLoader';
import Contact from '../components/contact/Contact';
import Experiences from '../components/experience/Experiences';
import Educations from '../components/education/Educations';
import Skills from '../components/skill/Skills';
import Leaderships from '../components/leadership/Leaderships';
import Projects from '../components/project/Projects';

const HomePage = () => {
  const userId = '656776679c8a5750bef8d7fc';
  // const resumeId = '658782a85238abdb1f4f1500';

  // state
  const { data: resumes, isSuccess } = useGetResumeQuery({ userId });
  const [mainResumeId, setMainResumeId] = useState('658782a85238abdb1f4f1500');

  useEffect(() => {
    async function getMainResume() {
      if (isSuccess) {
        const res = await resumes;
        if (res) {
          res.forEach((r) => {
            if (r.main === true) {
              setMainResumeId(r._id);
            }
          });
        }
      }
    }
    getMainResume();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumes]);

  return (
    <main>
      <div id='homepage' className='container'>
        <Contact style='vertical' />
        <div id='details'>
          <Experiences resumeId={mainResumeId} highlight />
          <Educations resumeId={mainResumeId} highlight />
          <Skills resumeId={mainResumeId} highlight />
          <Leaderships resumeId={mainResumeId} highlight />
          <Projects resumeId={mainResumeId} highlight />
        </div>
      </div>
    </main>
  );
};
export default HomePage;
