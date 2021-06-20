<h1 align ="center">🔰 MS Teams Clone 🔰</h1

<p>An attempt to make a clone of existing MS Team for <a href="https://microsoft.acehacker.com/engage2021/">Micorsoft Engage 2021</a>🔗.</p>

<p> It was a challenge given by Microsft to build a replica of MS Team with a mandatory feature
where atleast 2 people can join a room and have video call. On my way of building this I used <strong>MERN</strong> stack for building its frontend and backend. 
I tried and added more featrues by myself to make it user-friendly</p>

<hr>


<h2> How to run in local system 💻 </h2>
<p> This project containns 2 folder 📁 <strong>"client"</strong> and <strong>"server"</strong> <br> 
Client conatins frontend part and server contains backend part for this website  </p>

### Prerequisites
<em> ‼️ You should have node version higher than 8</em><br>
<em> ‼️ Get a free account of <a href="https://www.twilio.com/">Twilio</a> and pen down your <strong>Account sid</strong>,
<strong>API key</strong> and<strong> API sid</strong></em><br>
<em> ‼️ Get a free account of <a href="https://chatengine.io/">Chat Engine</a> and note down your <strong>project ID</strong> and <strong>API key</strong> </em><br>

<em> store them in .env file in src folder of client and root directory of server  </em><br>
 ✔️1. Clone this repository 
 ```sh
  git clone https://github.com/AdityaKumar-01/MS-Teams-clone.git
 ```
 ✔️2. cd into client and then run 
 ```sh
  cd client
  npm install
 ```
 ✔️3. cd into server and then run 
 ```sh
  cd server
  npm install
 ```
 This will install all the dependencies required and your are good to go 💯
<hr>
 
<h2> Working 🛠 </h2>

<strong>Frontend</strong>
<p>For frontend I used React to build components like form teams and other things. React is a go to option for projects like this where you have multiple repeating 
components and lot of rendering of components is required. Frontend was supported by lots of other NPM packages too to make the work easy and nice.</p>
<br>
Here is a list of those NPM packages 📝

📍 <a href="https://www.npmjs.com/package/@material-ui/core">Material UI core</a><br>
📍 <a href="https://www.npmjs.com/package/@material-ui/icons">Material UI icons</a><br>
📍 <a href="https://www.npmjs.com/package/axios">Axios</a><br>
📍 <a href="https://www.npmjs.com/package/react-avatar">React Avatar</a><br>
📍 <a href="https://www.npmjs.com/package/react-chat-engine">React Chat Engine</a><br>
📍 <a href="https://www.npmjs.com/package/react-scroll-to-bottom">React Scroll To Bottom</a><br>
📍 <a href="https://useanimations.com/">Use Animations</a><br>
📍 <a href="https://www.npmjs.com/package/twilio">Twilio</a><br>
📍 <a href="https://www.npmjs.com/package/uuid">UUID</a><br>

 
<strong> Backend</strong>
<p> For backend I used NodeJS for creating servers and routes. I used node for backend because it has support from a big community for
its packages and twilio and chat Engine is very easy to integrate. For database I used <strong>MongoDB Atlas</strong> which is cloud based data storage.</p>
<br>
Here is a list of those NPM packages 📝<br>
📍 <a href="https://www.npmjs.com/package/axios">Axios</a><br>
📍 <a href="https://www.npmjs.com/package/twilio">Twilio</a><br>
📍 <a href="https://www.npmjs.com/package/uuid">UUID</a><br>
📍 <a href="https://www.npmjs.com/package/cors">Cors</a><br>
📍 <a href="https://www.npmjs.com/package/express">Express</a><br>
📍 <a href="https://www.npmjs.com/package/mongoose">Mongoose</a><br>
📍 <a href="https://www.npmjs.com/package/nodemon">Nodemon</a><br>
📍 <a href="https://www.npmjs.com/package/sha256">SHA256</a><br>
 
 <h2>Tools in Spotlight🔆</h2>
 <h3><a href="https://chatengine.io/">Chat Engine</a></h3>
 <p> Chat Engine helps you to build chat app. You dont have to write all the componets from scratch and every part of it is customizable. 
 In this project I reconfigured most of the components like created own form to send message, created own custom styled chat messages and added functionality like sending pictures and 
 starting a video call with memebers of chat room and many more. It also has its REST API with which you can interact with teh database it has. </p> 
 <br>
 <h3><a href="https://www.twilio.com/">Twilio</a></h3>
 <p> Twilio is a very superb tool for communication. It has various feature like bulk message sender, audio and video call and many more. I used its video calling API 
 which is a wrapper around <strong>WebRTC</strong>. It provide you support at both frontend and backend to lisrtend various activity like people joining and leaving call,
 their tracks like audio and video and many more. It gives you a JWT token which is used for sessions to add people in a video conference. </p>

 
