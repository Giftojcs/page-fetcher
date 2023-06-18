const request = require('request');
const fs = require('fs');
const readline = require('readline');

const url = process.argv[2];
const filePath = process.argv[3];

// Function to download the resource from the URL to the file path
const downloadResource = (url, filePath) => {
  request.get(url, (error, response, body) => {
    if (error) {
      console.log('Error:', error);
      return;
    }
    
    if (response.statusCode !== 200) {
      console.log('Error:', response.statusMessage);
      return;
    }

    fs.writeFile(filePath, body, (error) => {
      if (error) {
        console.log('Error:', error);
        return;
      }

      const fileSize = body.length;
      console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}`);
    });
  });
};

// Check if the file path already exists
if (fs.existsSync(filePath)) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('The file already exists. Do you want to overwrite it? (Y/N) ', (answer) => {
    if (answer.toLowerCase() === 'y') {
      downloadResource(url, filePath);
    } else {
      console.log('Operation cancelled.');
    }
    rl.close();
  });
} else {
  downloadResource(url, filePath);
}

