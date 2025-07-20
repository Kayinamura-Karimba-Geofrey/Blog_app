const e = require("express");
const News = require('../model/newsModel');

exports.createNews = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.files?.image?.[0]?.path;
    const video = req.files?.video?.[0]?.path;
    const news = await News.create({
      title,
      content,
      image,
      video,    
      author: req.user.id,
    });
    res.status(201).json(news);
  } catch (err) {
    res.status(500).json({ message: 'Could not create news', error: err.message });
  } 
};

exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find().populate('author', 'name');
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch news', error: err.message });
  }
};
exports.updateNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: 'News not found' });  
    Object.assign(news, req.body);
    if (req.files?.image) {
      news.image = req.files.image[0].path;
    }
    if (req.files?.video) {
        news.video = req.files.video[0].path;
    }
    await news.save();
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
    }
};

exports.deleteNews = async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: 'News deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
};
exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id).populate('author', 'name');
    if (!news) return res.status(404).json({ message: 'News not found' });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch news', error: err.message });
  }
};
exports.getNewsByAuthor = async (req, res) => {
  try {
    const news = await News.find({ author: req.params.authorId }).populate('author', 'name');
    if (!news.length) return res.status(404).json({ message: 'No news found for this author' });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch news', error: err.message });
  }
};