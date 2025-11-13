import process from "process";
import connectDB from "../config/db.js";
const defaultPostImg =  "../../src/assets/blog-pics/fs1React.jpg"

const categoryDescriptions = {
  fullstack: [
    "Learn how to build a MERN stack application from scratch with best practices.",
    "A guide to connecting React frontend with Express backend efficiently.",
    "Tips on structuring fullstack projects for scalability.",
    "How to integrate MongoDB with Node.js in a fullstack environment.",
    "Understanding authentication flows in fullstack applications.",
    "Deploying a fullstack app to the cloud using modern tools.",
    "Managing state and API calls in a fullstack project.",
    "Optimizing performance for fullstack applications.",
    "Handling errors and logging in fullstack development.",
  ],
  backend: [
    "Building RESTful APIs with Node.js and Express.",
    "Introduction to microservices architecture for backend systems.",
    "Authentication and authorization strategies for backend apps.",
    "Connecting Node.js to MongoDB for data persistence.",
    "Designing scalable backend systems with proper routing.",
    "Implementing caching and optimization techniques in backend.",
    "Error handling and logging in backend development.",
    "Securing your APIs with JWT and OAuth.",
    "Testing backend endpoints efficiently with tools like Postman.",
  ],
  mobile: [
    "Getting started with React Native for cross-platform apps.",
    "Building responsive mobile UI with best design practices.",
    "Handling navigation and routing in mobile apps.",
    "Managing state in React Native applications.",
    "Integrating APIs and backend services in mobile apps.",
    "Optimizing mobile app performance and speed.",
    "Debugging and testing mobile applications effectively.",
    "Using device features like camera and location in apps.",
    "Publishing your mobile app to Google Play and App Store.",
  ],
  "ai&ml": [
    "Introduction to supervised and unsupervised learning algorithms.",
    "Building your first machine learning model with Python.",
    "Data preprocessing and feature engineering techniques.",
    "Understanding neural networks and deep learning basics.",
    "Evaluating model performance and metrics.",
    "Applying categories/ai&ml in real-world projects and applications.",
    "Implementing regression and classification models.",
    "Working with datasets and cleaning data for ML.",
    "Automating ML workflows using Python libraries.",
  ],
  qa: [
    "Manual testing strategies and creating effective test cases.",
    "Introduction to automated testing and frameworks.",
    "Bug tracking and reporting best practices.",
    "Understanding QA processes in software development.",
    "Load and performance testing essentials.",
    "Writing efficient test scripts using automation tools.",
    "Regression testing and version control integration.",
    "Testing web and mobile applications effectively.",
    "QA metrics and how to measure software quality.",
  ],
  devops: [
    "Setting up CI/CD pipelines using GitHub Actions.",
    "Containerization with Docker and best practices.",
    "Orchestrating containers with Kubernetes.",
    "Monitoring and logging in cloud environments.",
    "Infrastructure as Code with Terraform and scripts.",
    "Automating deployments and server management.",
    "Understanding DevOps culture and workflow.",
    "Cloud services and deployment strategies.",
    "Security and reliability in DevOps pipelines.",
  ],
};

const categoriesTitle = {
  fullstack: [
    "Learn MERN Stack Basics",
    "Connect React with Express",
    "Structuring Fullstack Projects",
    "Integrate MongoDB with Node.js",
    "Authentication Flows in Fullstack",
    "Deploy Fullstack App to Cloud",
    "Managing State in Fullstack",
    "Optimizing Fullstack Performance",
    "Error Handling in Fullstack Apps",
  ],
  backend: [
    "Building RESTful APIs",
    "Microservices Architecture Intro",
    "Auth Strategies for Backend",
    "Node.js + MongoDB Connection",
    "Scalable Backend Design",
    "Caching and Optimization",
    "Error Handling in Backend",
    "API Security with JWT/OAuth",
    "Testing Backend Endpoints",
  ],
  mobile: [
    "React Native Basics",
    "Responsive Mobile UI Design",
    "Navigation in Mobile Apps",
    "State Management in React Native",
    "Integrating APIs in Mobile Apps",
    "Optimizing Mobile Performance",
    "Debugging Mobile Apps",
    "Using Device Features",
    "Publishing Mobile Apps",
  ],

  "ai&ml": [
    "Intro to Supervised & Unsupervised Learning",
    "First ML Model with Python",
    "Data Preprocessing Techniques",
    "Neural Networks Basics",
    "Evaluating ML Models",
    "Applying ML in Real Projects",
    "Regression & Classification Models",
    "Working with Datasets",
    "Automating ML Workflows",
  ],
  qa: [
    "Manual Testing Strategies",
    "Intro to Automated Testing",
    "Bug Tracking Best Practices",
    "Understanding QA Processes",
    "Load & Performance Testing",
    "Writing Efficient Test Scripts",
    "Regression Testing Techniques",
    "Web & Mobile Testing",
    "QA Metrics and Measurements",
  ],
  devops: [
    "CI/CD with GitHub Actions",
    "Containerization with Docker",
    "Kubernetes Orchestration",
    "Monitoring & Logging",
    "Infrastructure as Code",
    "Automating Deployments",
    "DevOps Culture & Workflow",
    "Cloud Deployment Strategies",
    "Security in DevOps Pipelines",
  ],
};

const categories = ["fullstack", "backend", "mobile", "ai&ml", "qa", "devops"];

const defaultPosts = [];

categories.forEach((category) => {
  for (let i = 0; i < 9; ++i) {
    defaultPosts.push({
      id: i,
      title: categoriesTitle[category][i],
      category: category,
      isDefault: true,
      description: categoryDescriptions[category][i],
      image: `${defaultPostImg}`,
      readTime: `${5 + (i % 5)} min`,
      likes: "",
      views: "",
      createdAt: Date.now(),
    });
  }
});

const settingDefaultPosts = async () => {
  try {
    const db = await connectDB();
    const collectionPosts = db.collection("posts-default");

    console.log("Connected to DB ✅");

    // await collectionPosts.deleteMany()
    const result = await collectionPosts.insertMany(defaultPosts);

    console.log("Inserted successfully ✅", result);
    process.exit(0);
  } catch (err) {
    console.error("Error inserting default posts:", err);
    process.exit(1);
  }
};

settingDefaultPosts();

// export default settingDefaultPosts;
