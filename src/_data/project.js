export default function () {
  //create our own project settings here
  return {
    environment: process.env.MODE || 'development',
  };
}

// use {{ project.environment }} in the .md or .njk files
