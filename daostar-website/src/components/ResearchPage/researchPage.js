import React, { useState, useCallback } from "react";
import { Card, Button, Divider } from "@blueprintjs/core";
import './researchPage.css';

// ===============================
// Data
// ===============================

// Research Programs Data
const researchPrograms = [
  {
    title: "Research Collaborator",
    description: "Join our inclusive community of researchers working on DAO-related topics",
    bulletPoints: [
      "Join our Slack community",
      "Participate in regular research collaboration calls",
      "Share ideas and collaborate with other researchers"
    ],
    buttonText: "Join DAOstar Slack",
    buttonLink: "https://join.slack.com/t/daostar/shared_invite/zt-33cyohbj4-Tk0COtKWTl7I3pu~YmHepw",
    disabled: false
  },
  {
    title: "Research Contributor",
    description: "Earn recognition for your research by publishing with DAOstar",
    bulletPoints: [
      "Submit and publish research papers",
      "Get recognized as a DAOstar Research Contributor",
      "Join a network of DAO researchers and practitioners"
    ],
    buttonText: "Submit Contributor Application",
    buttonLink: "https://forms.gle/cLZXbWKkufRKJEMX7",
    disabled: false
  },
  {
    title: "Research Fellow",
    description: "Our intensive fellowship program for researchers who want to shape the future of DAO research",
    bulletPoints: [
      "Participate in a dedicated fellowship program",
      "Collaborate with other fellows on research",
      "Publish research with DAOstar"
    ],
    buttonText: "Next Season Coming Soo!",
    buttonLink: "#",
    disabled: true
  }
];

// Research Papers Data
const researchPapers = [
  {
    title: "Towards a DAO ID",
    description: "An exploration of extending the daoURI identity model to a more robust model based on daoID.",
    pdfUrl: "/reports/daoid.pdf",
    date: "April 2025",
  },
  {
    title: "The DAO Policy Trilemma",
    description: "An exploration of the policy challenges faced by DAOs, proposing potential solutions.",
    pdfUrl: "/reports/trilemma.pdf",
    date: "April 2024",
  },
  {
    title: "The State of DAOs in Japan",
    description: "Exploring the unique aspects of DAOs in Japan, including cultural and regulatory impacts.",
    pdfUrl: "/reports/japan.pdf",
    date: "April 2024",
  },
  {
    title: "The State of DAOs in Singapore",
    description: "An analysis of the DAO ecosystem in Singapore, highlighting regulatory and innovation trends.",
    pdfUrl: "/reports/singapore.pdf",
    date: "Aug 2024",
  },
  {
    title: "The State of DAOs in Taiwan",
    description: "An in-depth analysis of the DAO landscape in Taiwan, focusing on local governance.",
    pdfUrl: {
      Mandarin: "/reports/taiwan_mandarin.pdf",
      English: "/reports/taiwan_english.pdf",
    },
    date: "Nov 2024",
  },
  {
    title: "The State of DAOs in Korea",
    description: "A comprehensive report on the development and challenges of DAOs in Korea.",
    pdfUrl: {
      Korean: "/reports/korea_korean.pdf",
      English: "/reports/korea_english.pdf",
    },
    date: "Oct 2024",
  },
  {
    title: "The State of DAO Security",
    description: "An analysis of DAO security vulnerabilities and introducing a security standard.",
    pdfUrl: "/reports/security.pdf",
    date: "Dec 2024",
  },
  {
    title: "State of DAO M&A",
    description: "An in-depth analysis of mergers and acquisitions in the DAO space.",
    pdfUrl: "/reports/mna.pdf",
    date: "Feb 2025",
  },
  {
    title: "Delegate Incentives Report",
    description: "A comprehensive analysis of incentive mechanisms for DAO delegates and their impact on governance.",
    pdfUrl: "/reports/delegate.pdf",
    date: "Feb 2025",
  }
];

// Season 0 Fellows Data
const season0Fellows = [
  { name: "Joseph Low", imagePath: "/researchers/joseph.jpg" },
  { name: "Frank Hu", imagePath: "/researchers/placeholder.png" },
  { name: "Twinfin", imagePath: "/researchers/placeholder.png" },
  { name: "Yvonne Cho", imagePath: "/researchers/yvonne.jpeg" },
  { name: "Hisashi Oki", imagePath: "/researchers/placeholder.png" }
];

// Season 1 Fellows Data
const season1Fellows = [
  { name: "Victoria Kozlova", imagePath: "/researchers/victoria.jpg" },
  { name: "Ben Biedermann", imagePath: "/researchers/ben.jpg" },
  { name: "Jillian Grennan", imagePath: "/researchers/jillian.png" },
  { name: "Ryan Peters", imagePath: "/researchers/ryan.png" },
  { name: "Teije Hidde Donker", imagePath: "/researchers/teije.jpg" },
  { name: "Marcus Khoo", imagePath: "/researchers/marcus.jpg" },
  { name: "Sneha Vijayan", imagePath: "/researchers/sneha.jpg" }
];

// ===============================
// Utility Functions
// ===============================

const trackPdfInteraction = (title, language) => {
  if (window.gtag) {
    window.gtag('event', 'pdf_open', {
      pdf_title: title,
      pdf_language: language || 'default'
    });
  }
};

// ===============================
// Research Reports Section
// ===============================

const ResearchCard = ({ title, description, pdfUrl, date, languageOptions, setLanguage }) => {
  const handlePdfClick = useCallback(() => {
    const currentLanguage = languageOptions ? languageOptions.current : 'default';
    trackPdfInteraction(title, currentLanguage);
    window.open(languageOptions ? pdfUrl[languageOptions.current] : pdfUrl, '_blank');
  }, [title, pdfUrl, languageOptions]);

  return (
    <Card className="research-card">
      <h3 className="card-title">{title}</h3>
      <Divider />
      <div className="card-content">
        <div className="card-description-container">
          <p className="card-description">{description}</p>
          <p className="bp4-text-small">
            <span className="bp4-text-muted">Published: </span>{date}
          </p>
        </div>
      </div>
      <Divider />
      <div className="action-buttons">
        {languageOptions && (
          <div className="button-group">
            {Object.keys(pdfUrl).map((lang) => (
              <Button
                key={lang}
                className={`secondary ${languageOptions.current === lang ? "active" : ""}`}
                onClick={() => setLanguage(lang)}
              >
                {lang}
              </Button>
            ))}
          </div>
        )}
        <Button
          className="primary view-pdf-btn"
          onClick={handlePdfClick}
        >
          View PDF
        </Button>
      </div>
    </Card>
  );
};

const ReportsSection = () => {
  const [taiwanLanguage, setTaiwanLanguage] = useState("Mandarin");
  const [koreaLanguage, setKoreanLanguage] = useState("Korean");

  // Sort research papers by date (most recent first)
  const sortedPapers = [...researchPapers].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="reports-section">
      <h1>Research Reports</h1>
      <p>Explore our latest research and insights on DAOs and decentralized governance.</p>
      <div className="research-card-outlay">
        {sortedPapers.map((paper, index) => (
          <ResearchCard
            key={index}
            title={paper.title}
            description={paper.description}
            pdfUrl={paper.pdfUrl}
            date={paper.date}
            languageOptions={
              paper.pdfUrl.Mandarin 
                ? { current: taiwanLanguage }
                : paper.pdfUrl.Korean
                ? { current: koreaLanguage }
                : null
            }
            setLanguage={
              paper.pdfUrl.Mandarin 
                ? setTaiwanLanguage
                : paper.pdfUrl.Korean
                ? setKoreanLanguage
                : null
            }
          />
        ))}
      </div>
    </div>
  );
};

// ===============================
// Research Programs Section
// ===============================

const ProgramCard = ({ title, description, bulletPoints, buttonText, buttonLink, disabled }) => {
  const handleButtonClick = useCallback(() => {
    if (!disabled && buttonLink) {
      window.open(buttonLink, '_blank');
    }
  }, [buttonLink, disabled]);

  return (
    <Card className="research-card program-card">
      <h3 className="card-title">{title}</h3>
      <Divider />
      <div className="card-content">
        <div className="card-description-container">
          <p className="card-description">{description}</p>
          <ul className="program-bullet-points">
            {bulletPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
      <Divider />
      <div className="action-buttons">
        {disabled ? (
          <div className="coming-soon-text">Coming Soon</div>
        ) : (
          <Button
            className="primary view-pdf-btn"
            onClick={handleButtonClick}
          >
            {buttonText}
          </Button>
        )}
      </div>
    </Card>
  );
};

const ProgramsSection = () => {
  return (
    <div className="programs-section">
      <h1>Research Programs</h1>
      <p>Join our research community and contribute to the advancement of DAO knowledge and practices.</p>
      <div className="research-card-outlay">
        {researchPrograms.map((program, index) => (
          <ProgramCard
            key={index}
            title={program.title}
            description={program.description}
            bulletPoints={program.bulletPoints}
            buttonText={program.buttonText}
            buttonLink={program.buttonLink}
            disabled={program.disabled}
          />
        ))}
      </div>
    </div>
  );
};

// ===============================
// Fellows Section
// ===============================

const FellowCard = ({ name, imagePath }) => {
  return (
    <Card className="fellow-card">
      <div className="fellow-image-container">
        <img 
          src={imagePath} 
          alt={`${name}`} 
          className="fellow-image"
          onError={(e) => {
            // Fallback to a text-based placeholder if image fails to load
            e.target.onerror = null;
            e.target.style.display = "none";
            e.target.parentNode.classList.add("fellow-image-fallback");
            e.target.parentNode.innerText = name.split(' ').map(n => n[0]).join('');
          }}
        />
      </div>
      <h3 className="fellow-name">{name}</h3>
    </Card>
  );
};

const FellowsSection = () => {
  return (
    <div className="fellows-section">
      <h1>Our Researchers</h1>
      <p>Meet our talented Researchers who are driving innovation in DAO governance and decentralized systems.</p>

      <h3 className="season-title">Season 1 Research Fellows</h3>
      <div className="fellows-grid">
        {season1Fellows.map((fellow, index) => (
          <FellowCard 
            key={index}
            name={fellow.name}
            imagePath={fellow.imagePath}
          />
        ))}
      </div>
      
      <h3 className="season-title">Season 0 Research Fellows</h3>
      <div className="fellows-grid">
        {season0Fellows.map((fellow, index) => (
          <FellowCard 
            key={index}
            name={fellow.name}
            imagePath={fellow.imagePath}
          />
        ))}
      </div>
    </div>
  );
};

// ===============================
// Main Research Page Component
// ===============================

const Research = () => {
  return (
    <div className="explore-page">
      <ReportsSection />
      <Divider className="section-divider" />
      <ProgramsSection />
      <Divider className="section-divider" />
      <FellowsSection />
    </div>
  );
};

export default Research;
