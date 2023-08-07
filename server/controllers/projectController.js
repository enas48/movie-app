const projectService = require("../services/projectService");
const User = require("../models/UserModel");
const HttpError = require("../middleware/errorMiddleware");



// @desc get projects
//@route GET /projects
//@access private
const getProjects = async (req, res, next) => {
  try {
    const projects = await projectService.getAllProjects();
    res.status(200).json({ projects: projects, message: "Get projects" });
  } catch (err) {
    const error = new HttpError( err.message , 500);
    return next(error);
  } 
}
// @desc create project
//@route POST /projects
//@access private
const createProject = async (req, res, next) => {
  try {
    const imageurl = req.file.path;
    const {title, url, demo, tags, userId} = req.body;
    const project = await projectService.createProject({title, url, demo,tags:JSON.parse(tags), user:userId,image:imageurl});
    res.status(200).json({project: project, message: "Project Added Successfully" });
  } catch (err) {
    const error = new HttpError( err.message , 500);
    return next(error);

  }
}
// @desc get project
//@route GET /projects/:id
//@access private
const getProjectById = async (req, res, next) => {
  try {
    const project = await projectService.getProjectById(req.params.id);
    if(!project){
      const error = new HttpError( 'project not found' , 400);
      return next(error);
     
    } else{
    res.status(200).json({project: project, message: `find project ${req.params.id}` });
    } 
      } catch (err) {
        const error = new HttpError( err.message , 500);
        return next(error);
  }
}
// @desc update project
//@route put /projects/:id
//@access private
const updateProject = async (req, res, next) => {
  try {

    const userId= req.body.user;
    const project = await projectService.getProjectById(req.params.id);
    if(!project){
      const error = new HttpError('project not found' , 400);
      return next(error);
    } else{
      if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        const error = new HttpError('user not found' , 401);
        return next(error);
      }
    const user = await User.findById(userId);
    //check fpr  user 
    if(!user){
      const error = new HttpError('user not found' , 401);
      return next(error);
    }
    //make sure user is logged in match project user
    if(project.user.toString() !== user.id){
      const error = new HttpError( 'user not authorized' , 401);
      return next(error);
    }
    const {title, url, demo, tags} = req.body;
    if(req.file){
      imageurl = req.file.path;
    }else{
      imageurl = project.image;
    }
    const updatedProject = await projectService.updateProject(req.params.id,{title, url, demo, tags:JSON.parse(tags), image:imageurl});
    res.status(200).json({ project:updatedProject, message: `project updated successfully` }); 
    }
  } catch (err) {
    const error = new HttpError( err.message , 500);
    return next(error);
  } 
}
// @desc delete project
//@route delete /projects/:id
//@access private
const deleteProject = async (req, res, next) => {
  try {
    const project = await projectService.getProjectById(req.params.id);
    if(!project){
      const error = new HttpError('project not found' , 400);
      return next(error);
    } else{
    const deletedProject = await projectService.deleteProject(req.params.id);
    res.status(200).json({ message: `project deleted successfully` });
  } 
  }catch (err) {
    const error = new HttpError( err.message , 500);
    return next(error);
  }
}
module.exports = {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  
};
