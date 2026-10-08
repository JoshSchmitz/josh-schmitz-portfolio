import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

// import components
import Language from './Language';
import RingLoader from 'react-spinners/RingLoader';

// import state
import { useGetLanguageQuery } from '../../store/slices/resume/api-language';

const Languages = ({ resumeId, userId, highlight }) => {
  // state
  const {
    data: languages,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetLanguageQuery({ resumeId });
  const [langs, setLangs] = useState([]);

  useEffect(() => {
    async function displayHighlighted() {
      if (languages) {
        const ls = languages
          .filter((l) => l.highlighted === true)
          .sort((a, b) => dayjs(a.startDate) - dayjs(b.startDate));
        if (ls.length === 0) {
          const ls = [...languages];
          setLangs(
            ls
              .sort((a, b) => dayjs(a.startDate) - dayjs(b.startDate))
              .slice(0, 3)
          );
        } else {
          setLangs(ls);
        }
      }
    }
    async function displayFull() {
      if (languages) {
        const ls = [...languages];
        setLangs(ls.sort((a, b) => dayjs(a.startDate) - dayjs(b.startDate)));
      }
    }
    highlight ? displayHighlighted() : displayFull();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languages]);

  return (
    <div id='language' className='categories'>
      <div className='languages'>
        {isLoading && (
          <RingLoader className='loader-page' loading={isLoading} size={50} />
        )}
        {isError && <h1>Error: {error}</h1>}
        {isSuccess &&
          langs.map((lang) => {
            return (
              <Language
                key={lang._id}
                language={lang}
                resume={resumeId}
                user={userId}
              />
            );
          })}
      </div>
    </div>
  );
};
Languages.propTypes = {
  resumeId: PropTypes.string.isRequired,
  userId: PropTypes.string,
  highlight: PropTypes.bool,
};
export default Languages;
