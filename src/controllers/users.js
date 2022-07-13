const response = require('../helpers/standardResponse');
const usersModels = require('../models/users');
const { validationResult } = require('express-validator');
const errorResponse = require('../helpers/errorResponse');

const { LIMIT_DATA } = process.env;

exports.getAllUsers = (req, res) => {
  const { search = '', limit = parseInt(LIMIT_DATA), page = 1, sortBy = 'id', sort = 0 } = req.query;
  const offset = (page - 1) * limit;

  if (sort < 0 || sort > 1) {
    return response(res, 'Please input between 0 or 1 for sorts key | 0 for ASC and 1 for DESC');
  }
  let sortVal = sort < 1 ? 'ASC' : 'DESC';
  // console.log(sort);
  usersModels.getAllUsers(search, limit, offset, sortBy, sortVal, (err, result) => {
    if (result.length < 1) {
      return res.redirect('/404');
    }
    const pageInfo = {};
    usersModels.countAllUsers(search, (err, totalData) => {
      pageInfo.totalData = totalData;
      pageInfo.totalPage = Math.ceil(totalData / limit);
      pageInfo.currentPage = parseInt(page);
      pageInfo.nextPage = pageInfo.currentPage < pageInfo.totalPage ? pageInfo.currentPage + 1 : null;
      pageInfo.prevPage = pageInfo.currentPage > 1 ? pageInfo.currentPage - 1 : null;
      return response(res, 'List all users', result, pageInfo);
    });
  });
};

exports.getUserById = (req, res) => {
  const { id } = req.params;
  console.log(id);
  usersModels.getUserById(id, (err, result) => {
    if (result.rows.length > 0) {
      return response(res, 'Detail user', result.rows[0]);
    } else {
      return res.redirect('/404');
    }
  });
};

exports.creatUsers = (req, res) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    // is empty menandakan tidak ada error
    console.log(validation.array());
    return response(res, 'Error occured', validation.array(), null, 400);
  }
  usersModels.createUsers(req.body, (err, result) => {
    if (err) {
      return errorResponse(err, res);
    } else {
      return response(res, 'Create user successfully', result[0]);
    }
  });
};

exports.editUser = (req, res) => {
  const { id } = req.params;
  usersModels.updateUser(id, req.body, (err, result) => {
    if (err) {
      return errorResponse(err, res);
    } else {
      return response(res, 'Edit user successfully', result[0]);
    }
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  usersModels.deleteUser(id, (result) => {
    return response(res, 'User deleted', result[0]);
  });
};
