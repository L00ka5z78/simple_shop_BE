Hey there! This is Frontend to simple shop/dashboard application. It is a project I wrote to test my skills in actually connecting backend and fronted. 
Aplication has CRUD operations, where one can add, remove, update, list products.
Also there is a registration form where you have to give some required data. Login form is also built.

Tech stack used to build this project: JavaScript, ReactJs, CSS, MongoDB Compass, Express, NodeJS.

To run this app you should clone this repository:

BACKEND
git clone https://github.com/L00ka5z78/simple_shop_BE

FRONTEND
git clone https://github.com/L00ka5z78/simple_shop_FE

Install all dependencies. To do that, run npm install in PROJECTS DIRECTORY.

Install mongoDB Compass on your device and remember to have mongo running in terminal. 
Sometimes there are problems to run mongo, therefor i will give few hints.
After installing on your device try to run it from terminal in your project.
If it will not run, create a script in package.json file like this: "start-mongo": "cd /d **your path to /MongoDb/bin/ && mongod.exe **",

and run the database in the background in your backend. 
Then run the project in the backend: npm run start. If everything went right, you will see messages that server is running and database is connected.

Things I am happy with:
1. It works well,
2. Looks ok

Things I should work with:
1. Add validation. Theres some bugs like: adding empty form after clicking button. 
2. Big ammount of code in one file. I mean index.js. I will split it in few files soon.

Some screenshots:

register and login form

![regi](https://user-images.githubusercontent.com/110019733/223359370-27eb4ab1-de44-4ce0-9154-630f8c87581e.png)

![log](https://user-images.githubusercontent.com/110019733/223359476-79f4d2c8-c477-4196-84c7-321c2ac639e8.png)


dashboard and it features:




![updt](https://user-images.githubusercontent.com/110019733/223359668-9da77006-08d9-42e8-8738-65382570300b.png)
![productlist](https://user-images.githubusercontent.com/110019733/223359670-26a8fdf2-6065-4610-8246-a8d3a2e3fdea.png)
![ser](https://user-images.githubusercontent.com/110019733/223359673-49d2d6cb-7433-4c15-a13a-fcc4b6717986.png)

Some thoughts: Git branching and pull requests doesnt exist.
I was to focused or maybe afraid a bit not to loose data during merging and other git operations. 
So, this is thing I need to be better at. And hopefully next projects will be better structured.

Another thing is, to migrate to typescript from JS, but Im not there yet.
Learning typescript hard now, but it will take some time when I will be able to do it completly form scratch.
My React skills are not the best ones. I see I can do better job with forms, and structuring states better.

