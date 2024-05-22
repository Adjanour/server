import mongoose from 'mongoose';
import UserModel from './models/user';
import TeamModel from './models/team';
import ProjectModel from './models/project';
import TaskModel from './models/task';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/task-tribe', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log('Connected to MongoDB');

    // Insert sample data
    const userData = [
        { uid: 'user4', email: 'user4@example.com', displayName: 'User 4'},
        { uid: 'user5', email: 'user5@example.com', displayName: 'User 5' }
    ];

    const teamData = [
        
        { name: 'Team D', description: 'Team D Description', members: [] },
        { name: 'Team E', description: 'Team E Description', members: [] }
    ];

    const projectData = [
        
        { name: 'Project 4', description: 'Project 4 Description', teamId: '', tasks: [] },
        { name: 'Project 5', description: 'Project 5 Description', teamId: '', tasks: [] }
    ];

    const taskData = [
        { projectId: '', title: 'Task 1', description: 'Task 1 Description', status: 'pending', createdBy: '', assignedTo: '' },
        { projectId: '', title: 'Task 2', description: 'Task 2 Description', status: 'pending', createdBy: '', assignedTo: '' },
        { projectId: '', title: 'Task 3', description: 'Task 3 Description', status: 'pending', createdBy: '', assignedTo: '' },
        { projectId: '', title: 'Task 4', description: 'Task 4 Description', status: 'pending', createdBy: '', assignedTo: '' },
        { projectId: '', title: 'Task 5', description: 'Task 5 Description', status: 'pending', createdBy: '', assignedTo: '' }
    ];

    // Insert users
    UserModel.insertMany(userData)
        .then(users => {
            console.log('Users inserted:', users);
            teamData.forEach((team: { members: any[] }) => {
                team.members = users.map(user => user._id);
            });
            // Insert teams
            TeamModel.insertMany(teamData)
                .then(teams => {
                    console.log('Teams inserted:', teams);
                    projectData.forEach((project, index) => {
                        project.teamId = teams[index]._id;
                    });
                    // Insert projects
                    ProjectModel.insertMany(projectData)
                        .then(projects => {
                            console.log('Projects inserted:', projects);
                            taskData.forEach((task, index) => {
                                task.projectId = projects[index]._id;
                                task.createdBy = users[index]._id;
                                task.assignedTo = users[(index + 1) % users.length]._id; // Assign to next user in the list
                            });
                            // Insert tasks
                            TaskModel.insertMany(taskData)
                                .then(tasks => {
                                    console.log('Tasks inserted:', tasks);
                                    mongoose.disconnect();
                                })
                                .catch(err => console.error('Error inserting tasks:', err));
                        })
                        .catch(err => console.error('Error inserting projects:', err));
                })
                .catch(err => console.error('Error inserting teams:', err));
        })
        .catch(err => console.error('Error inserting users:', err));
})
.catch(err => console.error('Error connecting to MongoDB:', err));
