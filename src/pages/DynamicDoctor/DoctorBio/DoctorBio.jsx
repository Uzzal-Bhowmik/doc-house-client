import React from "react";
import "./DoctorBio.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Spinner } from "@nextui-org/react";

const DoctorBio = ({ doctorInfo }) => {
  const { about, education, services, specialization } = doctorInfo;

  return (
    <div className="md:w-3/4 mx-auto bg-white rounded-lg pt-8 pb-10 px-8 md:min-h-[700px]">
      <Tabs className="doctor-bio-tabs">
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Locations</Tab>
          <Tab>Review</Tab>
          <Tab>Business Hours</Tab>
        </TabList>

        <TabPanel>
          <div className="mt-8">
            <h4 className="text-2xl font-bold mb-2">About Me</h4>
            <p className="text-[#3B3A3A] text-lg md:w-[85%]">{about}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {/* left side */}
            <div>
              <h4 className="text-2xl font-bold mb-8">Education</h4>
              <ul className="doctor-bio-lists ml-10 space-y-8">
                {education?.map((item) => (
                  <li key={item.university}>
                    <span className="font-bold text-lg">{item.university}</span>
                    <p>{item.degree}</p>
                    <p>{item.years}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* right side */}
            <div className="space-y-8">
              <div>
                <h4 className="text-2xl font-bold mb-4">Services</h4>
                <ul className="doctor-bio-lists ml-10">
                  {services?.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-2xl font-bold mb-4">Specializations</h4>
                <ul className="doctor-bio-lists ml-10">
                  {specialization?.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="w-1/2 text-center mx-auto mt-20">
            <Spinner color="warning" />
            <h3 className="text-2xl mt-5 font-bold">
              Content will be added soon :)
            </h3>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="w-1/2 text-center mx-auto mt-20">
            <Spinner color="warning" />
            <h3 className="text-2xl mt-5 font-bold">
              Content will be added soon :)
            </h3>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="w-1/2 text-center mx-auto mt-20">
            <Spinner color="warning" />
            <h3 className="text-2xl mt-5 font-bold">
              Content will be added soon :)
            </h3>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default DoctorBio;
