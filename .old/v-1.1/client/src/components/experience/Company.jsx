import PropTypes from 'prop-types';
import dayjs from 'dayjs';

// import components
import Experience from './Experience';

const Company = ({ company, resumeId, user }) => {
  return (
    <div className='company'>
      <div className='headline'>
        <h2 className='company-name'>{company.name}</h2>
        {company.experiences.length > 1 && (
          <p className='company-dates'>
            {company.startDate !== ''
              ? dayjs(company.startDate).add(1, 'day').format('MMMM D, YYYY')
              : 'Now'}{' '}
            to{' '}
            {company.endDate !== ''
              ? dayjs(company.endDate).add(1, 'day').format('MMMM D, YYYY')
              : 'Now'}
          </p>
        )}
      </div>
      <div className='experiences'>
        {company.experiences.map((exp) => {
          return (
            <Experience
              key={exp._id}
              experience={exp}
              resume={resumeId}
              user={user}
            />
          );
        })}
      </div>
    </div>
  );
};
Company.propTypes = {
  company: PropTypes.object.isRequired,
  resumeId: PropTypes.string.isRequired,
  user: PropTypes.string,
};
export default Company;
