## Guideline for using git

### Rules for new branch name 
Use Branch Name : feat-001YourFeatureName <br>
Note: take 001 or 002 or 003 or 004 depends on the previous merged branch

### IMPORTANT NOTE 

--> BEFORE WORKING ON ANY NEW CODE OR CHANGES FIRSTLY YOU SHOULD CHECK YOUR BRANCH BY USING THE COMMAND  git branch 


--> THE BRANCH SHOULD BE MASTER, IF IT IS NOT THEN CHANGE YOUR BRANCH TO MASTER USING COMMAND git checkout master 

--> AND PULL THE LATEST CHANGES FROM REMOTE USING COMMAND git pull origin master

--> THEN YOU CAN FOLLOW FROM STEP 1, BY CREATING YOUR NEW BRANCH FROM MASTER BRANCH


1. CLone this repository by command git clone https://github.com/Team-Engineers/ourntamockpapers.git

2. open this repository in vs code and then open your terminal, 

3. To create a new branch use command git checkout -b feat-YourBranchName

4. Start working on the editing/adding  code, then stage your changes, using command git add .

5. Now add a relevant message to your changes and commit your changes by using command git commit -m "your message"

6. Now push your changes to remote using command git push origin feat-YourBranchName

7. Then go to the github and create pull request for your changes add Thakursachin05 as reviewers, and once your PR got approved by him, then merge your changes to master
