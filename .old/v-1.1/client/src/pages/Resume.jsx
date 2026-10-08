//import components
import { useParams } from 'react-router-dom';
import Resume from '../components/resume/Resume';

const ResumePage = () => {
  const { id } = useParams();

  return (
    <main>
      <div className='container'>
        <Resume resumeId={id} />
      </div>
    </main>
  );
};
export default ResumePage;
