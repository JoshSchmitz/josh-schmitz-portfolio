import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

//import components
import Contact from '../contact/Contact';
import Experiences from '../experience/Experiences';

// import redux state
import { useGetResumeQuery } from '../../store/slices/resume/api-resume';

const HomeContent = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // get main resume id
  let userId = '656776679c8a5750bef8d7fc';
  if (userInfo) {
    userId = userInfo._id;
  }

  // state
  const { data: resumes } = useGetResumeQuery({ userId });
  const [mainResumeId, setMainResumeId] = useState('658782a85238abdb1f4f1500');

  useEffect(() => {
    async function getMainResume() {
      const res = await resumes;
      if (res) {
        res.forEach((r) => {
          if (r.main === true) {
            setMainResumeId(r._id);
          }
        });
      }
    }
    getMainResume();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return (
    <article id='homepage'>
      <Contact style='vertical' />
      <div className='details'>
        <Experiences resumeId={mainResumeId} />
      </div>
    </article>
  );
};
export default HomeContent;
