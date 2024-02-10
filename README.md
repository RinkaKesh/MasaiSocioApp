# MasaiSocioApp
Create a Fullstack Social Media App
Backend
Multiple users should be able to register on the app.
While registering accept the following details.
name ==> String
email ==> String
gender ==> String
password ==> String
These users can create multiple posts.
Post will have the following details.
title ==> String
body ==> String
device ==> String

==> Where device is the one from which the post has been made, it can be "PC", "TABLET", "MOBILE"
Only logged in users can do any kind of CRUD operations.
A user can read, update and delete his/her posts only.
Following Routes should be there.
/users/register ==> To register a new user.
/users/login ==> For logging in generating a token
/posts ==> This will show the posts of logged in users.
/posts/add ==> A logged in user should only be able to add a new post.
/posts/update ==> The logged in user can update his/her posts.
/posts/delete ==> The logged in user can delete his/her posts.

Following Filtering functionalities should also be there.
1. If the device name is passed as query, then it should show only those posts from which device that post has been made.
 2. For Example, device=MOBILE ==> will give mobile posts only.
3. device1=MOBILE & device2=PC ==> will give the posts made by mobile and PC.
Mongo Atlas should be used.
Relationship between posts and user should be managed.
Middleware
Authentication middleware should be there to authenticate the user, for all the restricted routes.

All the good practices while coding should be followed
Hashing the password.
JWT.
MVC.
.env for keeping crucial stuff.
Frontend
You can either use React or just HTML,CSS and JS for frontend.
Following pages should be there.
Home Page
Signup Page.
Login Page.
Posts Page ==> Only that user's posts should be visible who has logged in.
A delete button should also be there, which will delete that particular post.
Along with Delete button there should be an update button as well, which will take you to a form that will ask for things to be updated, and once you fill them and click on the ok button, that particular post should be updated.
There should be a navbar as well which should be visible all the time.
A logout button should be there which will log out the user take you to posts page and no posts should be visible then at posts page.
A counter should be there at the top left corner which will show the number of posts, and once the user logs out, should become 0.
Submission Link
SUBMIT
ASSIGNMENT CONCLUDES DATE AND TIME : (10 FEB, 24 - 11:00 P