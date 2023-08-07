const Project = require("../models/ProjectModel");
exports.getAllProjects = async () => {
  return await Project.find().select('-user');
};

exports.createProject = async (project) => {
  return await Project.create(project);
};
exports.getProjectById = async (id) => {
  return await Project.findById(id);
};

exports.updateProject = async (id, project) => {
  return await Project.findByIdAndUpdate(id, project,{new:true}).select('-user');;
};

exports.deleteProject = async (id) => {
  return await Project.findByIdAndDelete(id);
};
