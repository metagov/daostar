import React, { useState, useCallback } from "react";
import { Card, Button, Divider } from "@blueprintjs/core";
import './DAOstarResearch.css';
import EmailSignupModal from "../EmailSignUpModal/emailSignUpModal";

const trackPdfInteraction = (title, language) => {
  if (window.gtag) {
    window.gtag('event', 'pdf_open', {
      pdf_title: title,
      pdf_language: language || 'default'
    });
  }
};

const ResearchCard = ({ title, description, pdfUrl, date, languageOptions, setLanguage, onRequestAccess }) => {
  const handlePdfClick = useCallback(() => {
    onRequestAccess(title, pdfUrl, languageOptions ? languageOptions.current : null);
  }, [title, pdfUrl, languageOptions, onRequestAccess]);

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

const Research = () => {
  const [taiwanLanguage, setTaiwanLanguage] = useState("Mandarin");
  const [koreaLanguage, setKoreanLanguage] = useState("Korean");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleRequestAccess = (title, pdfUrl, language) => {
    setSelectedReport({ title, pdfUrl, language });
    setModalOpen(true);
  };

  const handleModalSubmit = (email) => {
    // Simulate sending the report link to the user's email
    console.log(`Sending report "${selectedReport.title}" to email: ${email}`);
    setModalOpen(false);

    // Optionally, you can integrate an API call here to send the email
    // Example:
    // fetch('/api/send-report', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, report: selectedReport })
    // });
  };

  const researchPapers = [
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

  // Sort research papers by date (most recent first)
  const sortedPapers = [...researchPapers].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="explore-page">
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
            onRequestAccess={handleRequestAccess}
          />
        ))}
      </div>
      <EmailSignupModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        reportTitle={selectedReport?.title}
      />
    </div>
  );
};

export default Research;
