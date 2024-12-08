import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './Research.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs`

const PDFViewer = ({ url, onClose }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  console.log("PDF URL:", url);

  return (
    <div className="pdf-modal">
      <div className="pdf-modal-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <div className="pdf-controls top-controls">
          <button 
            onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
            className="zoom-btn"
          >
            Zoom Out
          </button>
          <span>{Math.round(scale * 100)}%</span>
          <button 
            onClick={() => setScale(s => Math.min(2, s + 0.1))}
            className="zoom-btn"
          >
            Zoom In
          </button>
          <a href={url} download className="download-btn">Download</a>
        </div>
        <div className="pdf-document">
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div className="loading">Loading PDF...</div>}
            error={<div className="error">Failed to load PDF. Please try again.</div>}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page 
                key={`page_${index + 1}`}
                pageNumber={index + 1} 
                scale={scale}
                renderTextLayer={true}
                renderAnnotationLayer={true}
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
};

const Research = () => {
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [taiwanLanguage, setTaiwanLanguage] = useState('Mandarin');

  const researchPapers = [
    {
        title: "The State of DAOs in Singapore",
        description: "An analysis of the DAO ecosystem in Singapore, highlighting regulatory and innovation trends.",
        pdfUrl: "/reports/singapore.pdf",
        date: "Aug 2024"
    },
    {
      title: "The State of DAOs in Taiwan",
      description: {
        Mandarin: "An in-depth analysis of the DAO landscape in Taiwan, focusing on local governance and community engagement.",
        English: "The English version of the comprehensive report on DAOs in Taiwan, covering governance and community aspects."
      },
      pdfUrl: {
        Mandarin: "/reports/taiwan_mandarin.pdf",
        English: "/reports/taiwan_english.pdf"
      },
      date: "Nov 2024"
    },
    {
      title: "The State of DAOs in Korea",
      description: "A comprehensive report on the development and challenges of DAOs in Korea.",
      pdfUrl: "/reports/korea.pdf",
      date: "Oct 2024"
    },
    {
      title: "The State of DAOs in Japan",
      description: "Exploring the unique aspects of DAOs in Japan, including cultural and regulatory impacts.",
      pdfUrl: "/reports/japan.pdf",
      date: "April 2024"
    },
    {
      title: "The DAO Policy Trilemma",
      description: "An exploration of the policy challenges faced by DAOs, proposing potential solutions.",
      pdfUrl: "/reports/trilemma.pdf",
      date: "April 2024"
    }
  ];

  return (
    <div className="research-container">
      <div className="research-header">
        <h1>Research Reports</h1>
        <p>Explore our latest research and insights on DAOs and decentralized governance.</p>
      </div>
      
      <div className="research-grid">
        {researchPapers.map((paper, index) => (
          <div key={index} className="research-card">
            <h2>{paper.title}</h2>
            <p className="date">{paper.date}</p>
            {paper.title === "The State of DAOs in Taiwan" ? (
              <>
                <p>{paper.description.Mandarin}</p>
                <div className="language-buttons">
                  <button 
                    className={`language-btn ${taiwanLanguage === 'Mandarin' ? 'active' : ''}`}
                    onClick={() => setTaiwanLanguage('Mandarin')}
                  >
                    Mandarin
                  </button>
                  <button 
                    className={`language-btn ${taiwanLanguage === 'English' ? 'active' : ''}`}
                    onClick={() => setTaiwanLanguage('English')}
                  >
                    English
                  </button>
                </div>
                <button 
                  className="view-pdf-btn bottom-right"
                  onClick={() => setSelectedPaper({ ...paper, pdfUrl: paper.pdfUrl[taiwanLanguage] })}
                >
                  View PDF
                </button>
              </>
            ) : (
              <>
                <p>{paper.description}</p>
                <button 
                  className="view-pdf-btn bottom-right"
                  onClick={() => setSelectedPaper(paper)}
                >
                  View PDF
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      {selectedPaper && (
        <PDFViewer 
          url={selectedPaper.pdfUrl} 
          onClose={() => setSelectedPaper(null)} 
        />
      )}
    </div>
  );
};

export default Research; 