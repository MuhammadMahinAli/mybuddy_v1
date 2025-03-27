import React, { useEffect } from "react";
import LandingNav from "../Landing/LandingNav";
import {  lazy,Suspense } from "react";
import Loading from "../Loading/Loading";

const LandingFooter = lazy(() => import("../Landing/LandingFooter"));
const TermsCondition = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const termsContent = [
    {
      title: "1. DEFINITIONS",
      content:
        '"Research Buddy" refers to the research management platform, including all associated tools, services, and applications. "User", "you", or "your" refers to any individual, entity, or organization that accesses or uses Research Buddy. "Content" refers to any information, data, text, images, files, or materials uploaded, created, shared, or stored on Research Buddy.',
    },
    {
      title: "2. ELIGIBILITY",
      content:
        "To use Research Buddy, you must: Be at least 18 years old or have legal parental/guardian consent if required in your jurisdiction. Provide accurate and truthful information when registering an account. Comply with all applicable laws, regulations, and these Terms. If you register on behalf of a company or organization, you represent that you have the authority to bind them to these Terms.",
    },

    {
      title: "3. ACCOUNT REGISTRATION & SECURITY",
      content:
        "Users are required to create an account to access certain features. You are responsible for maintaining the security of your account credentials and agree to notify us immediately if there is any unauthorized access to your account. We reserve the right to suspend or terminate accounts that engage in prohibited activities (see Section 7).",
    },

    {
      title: "4. DATA PRIVACY & SECURITY",
      content:
        "Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your data. Research Buddy uses industry-standard encryption, access controls, and security measures to protect user data. You are responsible for ensuring that any content you upload does not violate data privacy laws, intellectual property rights, or confidentiality agreements.",
    },

    {
      title: "5. USER CONTENT & INTELLECTUAL PROPERTY",
      content:
        "Ownership: Users retain ownership of all intellectual property rights to their content. License: By uploading content, you grant Research Buddy a non-exclusive, worldwide, royalty-free license to process, store, and display content for the sole purpose of operating the platform. Restrictions: You may not upload, distribute, or share any content that is illegal, infringing, harmful, or violates the rights of others.",
    },

    {
      title: "6. USE OF THE PLATFORM",
      content:
        "Users agree to use Research Buddy only for lawful research, project management, and collaboration purposes. The following activities are strictly prohibited: Misrepresenting yourself or impersonating others. Uploading viruses, malware, or malicious code. Reverse engineering, hacking, or attempting to bypass security measures. Using automated tools (bots, scrapers) to extract platform data without permission. Engaging in any activity that disrupts platform functionality or harms other users. We reserve the right to suspend or terminate any account that violates these rules.",
    },

    {
      title: "7. THIRD-PARTY INTEGRATIONS & SERVICES",
      content:
        "Research Buddy may integrate with third-party tools and services to enhance functionality (e.g., AI assistance, video conferencing, cloud storage). We are not responsible for the availability, accuracy, or security of third-party services. Users agree to review and comply with the terms of these services independently.",
    },

    {
      title: "8. TERMINATION & ACCOUNT CLOSURE",
      content:
        "Users may terminate their account at any time by contacting our support team. Research Buddy may suspend or terminate an account without prior notice if: The user violates these Terms. The account engages in fraudulent or unlawful activities. The platform is discontinued or undergoes major service changes. Upon termination, all user data may be deleted permanently unless required to be retained for legal purposes.",
    },

    {
      title: "9. DISCLAIMER OF WARRANTIES",
      content:
        'Research Buddy is provided "as is" and "as available" without any warranties, express or implied. We do not guarantee that the platform will be Error-free, uninterrupted, or always available. Free from security breaches despite our best efforts. Fully compatible with all user devices or software. Users assume all risks associated with the use of Research Buddy.',
    },

    {
      title: "10. LIMITATION OF LIABILITY",
      content:
        "To the fullest extent permitted by law: Research Buddy shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use the platform. We are not responsible for any loss of data, content, or research due to system failures, third-party services, or user actions.",
    },

    {
      title: "11. CHANGES TO TERMS",
      content:
        "Research Buddy reserves the right to update or modify these Terms at any time. We will notify users of significant changes through email or platform notifications. Continued use of Research Buddy after changes are made constitutes acceptance of the updated Terms.",
    },

    {
      title: "12. GOVERNING LAW & DISPUTE RESOLUTION",
      content:
        "These Terms shall be governed by and interpreted in accordance with the laws of Malaysia . Any disputes arising from these Terms shall first be resolved through negotiation. If unresolved, disputes shall be settled through binding arbitration in accordance with applicable laws.",
    },

    {
      title: "",
      content: "",
    },
  ];
  return (
    <div className="relative">
      <div
        className={` w-full bg-gradient-to-b from-[#84a7cd] via-[#c1dae6] to-white max-w-full overflow-hidden flex flex-col items-start justify-start pt-0 px-0 leading-[normal] tracking-[normal]`}
      >
        <div className="  items-center justify-start py-8 box-border bg-cover bg-no-repeat bg-top bg-[url('/star-bg.png')]">
          <LandingNav />

          {/* nav */}

          <h1 className="md:text-start relative text-[25px] xl:text-[40px] mt-20 py-8 font-bold capitalize  bg-[#cedcff] px-5 xl:px-10">
            terms and conditions
          </h1>
          <div className="px-5 xl:px-10 pb-8">
            <div className="flex flex-col gap-6 py-10 ">
              <div className="flex items-center gap-[10px] xl:gap-[18px] flex-wrap">
                <h2 className="text-white text-[30px] xl:text-[40px] capitalize font-normal leading-none self-stretch my-auto">
                  effective date:
                </h2>
                <span className="text-gray-900 text-[25px] xl:text-[35px] capitalize font-medium leading-none self-stretch my-auto">
                  march 21, 2025
                </span>
              </div>
              <div className="flex items-center gap-[10px] xl:gap-[18px] flex-wrap">
                <h2 className="text-white text-[30px] xl:text-[40px] capitalize font-normal leading-none self-stretch my-auto">
                  last updated:
                </h2>
                <span className="text-gray-900 text-[25px] xl:text-[35px] capitalize font-medium leading-none self-stretch my-auto">
                  march 21, 2025
                </span>
              </div>
            </div>

            <p className="text-[20px] xl:text-[25px] font-normal text-white ">
              Welcome to Research Buddy. These Terms and Conditions govern your
              access to and use of Research Buddy’s website, platform, and
              services. By using our platform, you agree to comply with and be
              bound by these terms. If you do not agree to these Terms and
              Conditions, please refrain from using Research Buddy.
            </p>
            <section className="flex flex-col items-stretch justify-center  max-md:max-w-full max-md:mt-10 ">
              <div className="space-y-5 text-3xl font-medium leading-9 mt-[25px] max-md:max-w-full">
                {termsContent.map((paragraph, index) => (
                  <div key={index} className="pb-3">
                    <h1 className="text-gray-900  font-bold leading-none  pb-4 0">
                      {" "}
                      <span
                        className="mb-2 text-[23px] xl:text-[30px]"
                        style={{ textTransform: "capitalize" }}
                      >
                        {paragraph.title}
                      </span>
                    </h1>
                    <p className="text-[20px] xl:text-[25px] font-normal text-white ">
                      {paragraph.content}
                    </p>
                  </div>
                ))}
              </div>
              <div className="pb-3">
                <h1 className="text-gray-900  font-bold leading-none  pb-4 0">
                  {" "}
                  <span
                    className="mb-2 text-[23px] xl:text-[30px]"
                    style={{ textTransform: "capitalize" }}
                  >
                    13. CONTACT INFORMATION
                  </span>
                </h1>
                <p className="text-[20px] xl:text-[25px] font-normal text-white ">
                  For any questions, concerns, or legal inquiries, contact us
                  at:
                  <p className="pt-3">📧 Email: researchbdy@gmail.com</p>
                  <p className="pb-3">🌍 Website: www.researchbdy.com</p>
                  <p>
                    By using Research Buddy, you acknowledge that you have read,
                    understood, and agreed to these Terms and Conditions.
                  </p>
                </p>
              </div>
            </section>
          </div>
   
        </div>
                 {/* footer */}
      <Suspense fallback={<Loading />}>
        <LandingFooter />
      </Suspense>
      </div>
    </div>
  );
};

export default TermsCondition;
