const ApiError = require('../error/ApiError');
const {validationResult} = require('express-validator');
const CV = require('../models/CV');
const pdfTemplate = require('../documents');
const pdf = require('html-pdf');
const path = require('path');
const fs = require('fs');

class cvController {
  async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.internal('Некорректные данные!'));
      }
      const {first_name, current_position, last_name, skills, projectActivities} = req.body;
      const cv = new CV({first_name, current_position, last_name, skills, projectActivities});

      await cv.save();

      res.status(201).json("Создано CV!");
    } catch (e) {
      return next(ApiError.internal('Не удалось создать резюме!'));
    }
  };

  async getAll(req, res, next) {
    try {
      const cvs = await CV.find();

      return res.json(cvs);
    } catch (e) {
      return next(ApiError.internal('Не удалось получить резюме!'));
    }
  };

  async get(req, res, next) {
    try {
      const _id = req.query.id;
      const cv = await CV.findOne({_id});

      return res.json(cv);
    } catch (e) {
      return next(ApiError.internal('Не удалось получить резюме!'));
    }
  };

  async createPdf(req, res, next) {
    try {
      const _id = req.query.id;
      const cv = await CV.findOne({_id});
      pdf.create(pdfTemplate(cv), {}).toFile(`./documents/result-${_id}.pdf`, (err) => {
        if(err) {
          return next(ApiError.internal('Не удалось создать pdf!'));
        }
        return res.sendFile(path.resolve(`./documents/result-${_id}.pdf`), null, (err) => {
          if(err) {
            return next(ApiError.internal('Не удалось создать pdf!'));
          }
          fs.unlink(path.resolve(`./documents/result-${_id}.pdf`), (err) => {
            if(err) {
              return next(ApiError.internal('Не удалось удалить pdf!'));
            }
          })
        });
      });
    } catch (e) {
      return next(ApiError.internal('Не удалось создать pdf!'));
    }
  };
}

module.exports = new cvController();
