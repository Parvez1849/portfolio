// src/data/mockData.js

export const mockData = {
  templateId: 1,
  basic: {
    name: "Dr. Evelyn Reed",
  },
  hero: {
    name: "Dr. Evelyn Reed",
    title: "Lead Data Scientist",
    tagline: "Unlocking insights from complex data ecosystems.",
    profileImage: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  about: {
    bio: "A passionate data scientist with over 10 years of experience in machine learning, statistical modeling, and data visualization. My goal is to leverage data to solve real-world problems and drive business value.",
    location: "San Francisco, CA",
    email: "evelyn.reed@example.com",
    phone: "+1 234 567 890",
    socials: {
      linkedin: "https://linkedin.com/...",
      github: "https://github.com/...",
    },
    // YAHAN SAMPLE RESUME LINK ADD KIYA GAYA HAI
    resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" 
  },
  skills: [
    { id: 1, name: "Machine Learning", level: 95 },
    { id: 2, name: "Python & R", level: 90 },
    { id: 3, name: "Data Visualization", level: 85 },
  ],
  services: [
    { id: 1, title: "Predictive Modeling", description: "Building models to forecast future trends." },
    { id: 2, title: "Data Strategy", description: "Helping businesses make data-driven decisions." },
    { id: 3, title: "NLP", description: "Analyzing and understanding human language." },
  ],
  projects: [
    { 
      id: 1, 
      title: "Market Basket Analysis", 
      image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600", 
      description: "Analyzed transaction data to find co-occurring products.",
      link: "https://example.com/market-analysis-project"
    },
    { 
      id: 2, 
      title: "Sentiment Analysis Tool", 
      image: "https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg?auto=compress&cs=tinysrgb&w=600", 
      description: "A tool to classify customer reviews as positive or negative.",
      link: "https://github.com/example/sentiment-tool"
    },
    { 
      id: 3, 
      title: "Project (No Link)", 
      image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600", 
      description: "Is project mein link nahi hai, isliye button nahi dikhega."
    },
  ],
  testimonials: [
    { id: 1, quote: "Evelyn's insights were game-changing for our team.", author: "CEO, TechCorp" }
  ],
  contact: {
    message: "Let's connect and discuss how data can transform your business.",
    email: "evelyn.reed@example.com",
    phone: "+1 234 567 890",
  }
};