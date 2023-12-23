import React from "react";
import "./Services.css";
import docPic from "../../../assets/services-doc.png";
import teeth from "../../../assets/teeth.png";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Button } from "@nextui-org/react";
import { Slide } from "react-awesome-reveal";

const Services = () => {
  return (
    <div className="container my-20">
      <Slide direction="up" duration={2000} triggerOnce>
        <div className="flex justify-center items-center">
          <div className="md:w-[40%]">
            <img src={docPic} alt="" className="block ms-auto" />
          </div>

          <div className="md:w-[50%] ms-8">
            <h3 className="text-4xl font-bold">Our Services</h3>
            <p className="my-5 text-[#3B3A3A]">
              At Our Medical Help Center, we are dedicated to providing you with
              a wide range of high-quality medical services that cater to your
              every need. From routine check-ups to advanced treatments and
              personalized wellness programs, we offer comprehensive healthcare
              solutions that prioritize your well-being.
            </p>

            <Tabs>
              <TabList>
                <Tab>
                  <p>Cavity Protection</p>
                </Tab>
                <Tab>
                  <p>Cosmetic Dentistry</p>
                </Tab>
                <Tab>
                  <p>Oral Surgery</p>
                </Tab>
              </TabList>

              <TabPanel>
                <img
                  src={teeth}
                  alt=""
                  className="mt-8 block md:w-full h-[350px] rounded-xl"
                />
                <div className="mt-8 mb-5 space-y-3">
                  <h3 className="text-4xl font-bold">
                    Electro Gastrology Therapy and Advanced Techniques
                  </h3>
                  <p>
                    Experience the Future of Digestive Health with Electro
                    Gastrology Therapy (EGT). Our innovative EGT services
                    harness the power of cutting-edge technology to target and
                    address gastrointestinal concerns with precision and
                    effectiveness. Through non-invasive, gentle electrical
                    stimulation, EGT helps regulate digestive functions,
                    alleviate discomfort, and promote overall gastrointestinal
                    well-being.
                  </p>
                </div>

                <Button color="warning" radius="sm" size="lg" variant="ghost">
                  More Details
                </Button>
              </TabPanel>

              <TabPanel>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7s7U_1ZjtWWoSBw5PAqqvxNMB4BPKLzoIwQ&usqp=CAU"
                  alt=""
                  className="mt-8 block md:w-full h-[350px] rounded-xl"
                />

                <div className="mt-8 mb-5 space-y-3">
                  <h3 className="text-4xl font-bold">
                    Smile Renewed: Advanced Dental Therapies
                  </h3>
                  <p>
                    Experience the transformative power of advanced dental
                    therapies at Smile Renewed. Our specialized dental
                    treatments are designed to address a wide range of oral
                    health concerns. Whether you need periodontal therapy,
                    endodontic treatments, or restorative procedures, our
                    skilled team of dental professionals and other experts in
                    this regard. So, do check out our awesome labs and then make
                    you decision
                  </p>
                </div>

                <Button color="warning" radius="sm" size="lg" variant="ghost">
                  More Details
                </Button>
              </TabPanel>
              <TabPanel>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2kw-mCAZHqWfqRCqhtOdddL5qtJ_daW0yYQ&usqp=CAU"
                  alt=""
                  className="mt-8 block md:w-full h-[350px] rounded-xl"
                />

                <div className="mt-8 mb-5 space-y-3">
                  <h3 className="text-4xl font-bold">
                    Dental Wellness Solutions: Therapeutic Care for Your Smile
                  </h3>
                  <p>
                    At Dental Wellness Solutions, we offer a range of
                    therapeutic dental services to ensure the long-term health
                    and beauty of your smile. Our dental therapists are experts
                    in providing treatments such as gum therapy, TMJ therapy,
                    and preventive care. We are committed to not only addressing
                    immediate dental concerns but also promoting lasting oral
                    wellness. Trust us to deliver gentle.
                  </p>
                </div>

                <Button color="warning" radius="sm" size="lg" variant="ghost">
                  More Details
                </Button>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </Slide>
    </div>
  );
};

export default Services;
