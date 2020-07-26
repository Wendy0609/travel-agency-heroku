add a single.ejs file to link gallery page to individual webpage.
add a mement module for foot display copyright year @ current year
add a property to the database array calls: description 
in order to run new created moment module, at Git Bash need run: npm install moment
error_message.ejs created under views folder  
//setup MongoDB:
created folder named models and a file: mygallery.js this is the schema of this mygallery db
create .env file 
create .gitignore file
create _build.js 
create module by adding (12-14) to app.js :
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
at Git Bash run the following(16-18):
npm install dotenv
npm install mongoos
node _build.js -- this is to push the local db mygallery to mongoDB
