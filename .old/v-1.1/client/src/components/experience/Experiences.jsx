import { useEffect, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

//import components
import RingLoader from 'react-spinners/RingLoader';
import Company from './Company';

// import state
import { useGetExperienceQuery } from '../../store/slices/resume/api-experience';

const Experiences = ({ resumeId, userId, highlight }) => {
  // state
  const {
    data: xp,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetExperienceQuery({ resumeId });
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    /* 
      - extract all companies from experiences and build array of companies
      - inside each company, build array with all experiences for that company
    */
    async function buildCompanies() {
      const experiences = await xp;
      if (experiences) {
        // extract unique companies from experiences
        const company = [];
        experiences.forEach((e) => {
          if (!company.find((c) => c.name === e.company.name)) {
            company.push({
              name: e.company.name,
              experiences: [],
            });
          }
        });

        // for each company, push experiences to array in company object
        company.forEach((c) => {
          // filter experiences by name, sort by start date descending
          const exp = experiences
            .filter((e) => e.company.name === c.name)
            .sort((a, b) => dayjs(b.startDate) - dayjs(a.startDate));

          // loop filtered/sorted experiences
          exp.forEach((e, i) => {
            c.experiences.push({
              _id: e._id,
              position: e.position,
              description: e.description,
              location: {
                address: e.company.location.address,
                city: e.company.location.city,
                state: e.company.location.state,
                postcode: e.company.location.postcode,
              },
              startDate: e.startDate,
              endDate: e.endDate,
              highlighted: e.highlighted,
              skills: e.skills,
            });

            if (i === 0) {
              // first item, set company end date
              c.endDate = e.endDate;

              // if only one experience, set start date, else set sequential if current start date and next end date matches
              if (exp.length === 1) {
                c.startDate = e.startDate;
              }
            } else {
              // set company start date
              c.startDate = e.startDate;
            }

            // if more than one experience and current experience is not the last, set sequential if current start date and next end date matches
            if (exp.length > 1 && i < exp.length - 1) {
              if (
                `${dayjs(e.startDate)}` === `${dayjs(exp[i + 1].endDate)}` ||
                `${dayjs(e.startDate)}` ===
                  `${dayjs(exp[i + 1].endDate).add(1, 'day')}`
              ) {
                c.experiences[i].sequential = true;
              }
            }
          });
        });

        highlight
          ? setCompanies(
              company
                .sort((a, b) => dayjs(b.endDate) - dayjs(a.endDate))
                .slice(0, 1)
            )
          : setCompanies(
              company.sort((a, b) => dayjs(b.endDate) - dayjs(a.endDate))
            );
      }
    }
    buildCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xp]);

  return (
    <div className='companies'>
      {isLoading && (
        <RingLoader className='loader-page' loading={isLoading} size={50} />
      )}
      {isError && <h1>Error: {error}</h1>}
      {isSuccess &&
        companies.map((comp) => {
          return (
            <Company
              key={nanoid()}
              company={comp}
              resumeId={resumeId}
              user={userId}
            ></Company>
          );
        })}
    </div>
  );
};
Experiences.propTypes = {
  resumeId: PropTypes.string.isRequired,
  userId: PropTypes.string,
  highlight: PropTypes.bool,
};
export default Experiences;
