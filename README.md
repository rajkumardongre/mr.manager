# E.A.T (Employee Activity Tracker)
E.A.T is a website specially built for companies to manage and track the activity of their employees. Through this employer can get a visual representation of work done by the employee. There are two modules in the website - one for admin (employer) and the other for employees. 

Employer Side: Employer can access the admin side through the admin details provided to the employer. The employer will create a login account for each employee by simply adding his details. Employee can access the website (employee's side) through these details. Apart from that, employer can see the tasks performed by his employees and the proportion of time spent in meetings, work, break in a visual manner through pie charts, stacked bar chart, etc.

Employee Side: Employee will login to E.A.T through the credentials provided by the employee. On the website, he will get an option to add tasks with date and time performed. Those added tasks will generate pie charts and graphs for the employee. And the same will also be accessible for the employer. In this way, E.A.T will help employers and employees both to keep a track of their activity.

# Setup

1. Clone the repository by using the web url of this repository.

![image](https://user-images.githubusercontent.com/109237545/194879669-e0c83f39-7f0d-48f0-96b0-d379b49ddde7.png)


2. Open Command Prompt in your computer and move to the speccific folder you want to clone the project into. And then, run the command ```git clone https://github.com/rajkumardongre/mr.manager.git```


3. Now, once the project is cloned. Open the folder into an IDE that you prefer. Here, we will be using Visual Studio Code. Open the terminal and run the command ```npm i``` to install all the dependencies.


4. Once all the dependencies are installed, then create a file named ```.env``` in the folder. And type the below variables in the ```.env``` file. Ensure that you add your URI of mongodb project and insert the password in the URI inplace of <password>.

```JWT_SECRET_KEY = "JWT SECRET KEY"
PORT = 3000
MONGODB_CONNECTION_URI = "<YOUR MONGODB CONNECTION URI>"
ADMIN_EMAIL = "admin@gmail.com"
ADMIN_PASSWORD = "admin"
```

5. Save the file and enter the command ```node app.js``` in the terminal of your IDE. Wait until ```Listening at port 3000``` is visible on the terminal. 

6. Then, you are ready to access the website and to login as an admin, you need to use the email ```admin@gmail.com``` and password ```admin``` as mentioned in the ```.env``` file. Now, the details to access and use the website are given below.

# Using E.A.T Admin

1. You will appear on the login page, you need to enter the admin details as below.

![image](https://user-images.githubusercontent.com/109237545/194884474-05b750ef-40b6-4bdd-852e-c9199bd82fe1.png)

2. After entering the valid credentials, you will login on the home page and a screen like below will be visible. Through the navigation pane you can switch to various sections of admin.

![image](https://user-images.githubusercontent.com/109237545/194884871-e6d90e5c-8756-49ae-9467-2237a5d867f9.png)

3. Then, you need to enter employee details to add an employee and thus create a login account for him/her. Remember the password that you generate for the employee because it will be required for the employee login.

![image](https://user-images.githubusercontent.com/109237545/194885668-3b27e2a7-7112-4bea-bc4c-2a1ebf8d7eb4.png)

4. The same employee would be added to the active employee page.

![image](https://user-images.githubusercontent.com/109237545/194886016-4a676eb1-c384-4c92-8c0b-3e9e4660fb4b.png)

5. You can even deactivate a specific employee using the Deactivate Employee button and the same employees will move to Deactive Employees Page.

![image](https://user-images.githubusercontent.com/109237545/194886412-aec0ea57-57d7-4ba4-91c1-ddab9b355719.png)

6. The employer can even view all the graphs of the employee by clicking on View Profile.

7. Now, the employee can Logout by simply clicking logout button on the bottom left corner.

# Using E.A.T Employee

1. Login with the employee credentials that were given by the employer.

![image](https://user-images.githubusercontent.com/109237545/194886869-341cdd36-06f9-449d-ba50-e9b7e1669bce.png)

2. Now the employee can add tasks he has done (work, break, meet) through My Tasks page and he can see his previous tasks as well.

![image](https://user-images.githubusercontent.com/109237545/194887600-573e1f05-e63d-430f-809d-fba7fd67a311.png)

3. All the graphs are generated as soon as the employee adds the details of the tasks.

![image](https://user-images.githubusercontent.com/109237545/194888419-07939f92-c58b-4c22-88a5-c3001ff72d4b.png)

![image](https://user-images.githubusercontent.com/109237545/194888475-29e11e73-1a6d-48dc-a238-3caded0ef8ad.png)

4. Even one can search for the pie chart at a specific date as well. For example,

![image](https://user-images.githubusercontent.com/109237545/194888714-13903edc-959c-4a04-8c6c-13ef22a6eb63.png)

5. One can edit his profile from the Edit Profile Section

![image](https://user-images.githubusercontent.com/109237545/194889049-5011835c-8723-4e4d-851f-ddef3d7963e6.png)

# Thanks a lot!

Thankyou for being here until the end! Hope you like E.A.T and make use of it to the fullest.


