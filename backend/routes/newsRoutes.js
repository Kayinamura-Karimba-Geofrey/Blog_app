const express = require('express');
const router = express.Router();
const {
  createNews,
  getAllNews,
  updateNews,
  deleteNews,
  getNewsById,
  getNewsByAuthor
} = require('../controllers/newsControllers');

const upload = require('../middleware/upload');
const authorisation = require('../middleware/authorisation');

/**
 * @swagger
 * /api/news:
 *   post:
 *     summary: Create news
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               video:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: News created
 *       500:
 *         description: Could not create news
 */
router.post(
  '/',
  authorisation(['admin']),
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
  ]),
  createNews
);

/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: Get all news
 *     tags: [News]
 *     responses:
 *       200:
 *         description: List of news
 *       500:
 *         description: Could not fetch news
 */
router.get('/', getAllNews);

/**
 * @swagger
 * /api/news/{id}:
 *   get:
 *     summary: Get news by ID
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: News item
 *       404:
 *         description: News not found
 *       500:
 *         description: Could not fetch news
 */
router.get('/:id', getNewsById);

/**
 * @swagger
 * /api/news/{id}:
 *   put:
 *     summary: Update news
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: News updated
 *       404:
 *         description: News not found
 *       500:
 *         description: Update failed
 */
router.put('/:id', updateNews);

/**
 * @swagger
 * /api/news/{id}:
 *   delete:
 *     summary: Delete news
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: News deleted
 *       404:
 *         description: News not found
 *       500:
 *         description: Delete failed
 */
router.delete('/:id', deleteNews);

/**
 * @swagger
 * /api/news/author/{authorId}:
 *   get:
 *     summary: Get news by author
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: authorId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: News by author
 *       404:
 *         description: No news found for this author
 *       500:
 *         description: Could not fetch news
 */
router.get('/author/:authorId', getNewsByAuthor);

module.exports = router;
