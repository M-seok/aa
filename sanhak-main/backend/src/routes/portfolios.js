const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');

// 포트폴리오 생성
router.post('/', async (req, res) => {
  try {
    const { title, description, content, userId } = req.body;
    const portfolio = new Portfolio({
      title,
      description,
      content,
      userId,
      views: {
        total: 0,
        daily: []
      }
    });
    await portfolio.save();
    res.status(201).json(portfolio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 포트폴리오 조회 (조회수 증가 포함)
router.get('/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: '포트폴리오를 찾을 수 없습니다.' });
    }

    // 오늘 날짜의 시작 시간
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 조회수 증가
    portfolio.views.total += 1;

    // 오늘 날짜의 조회수 데이터 찾기
    const todayView = portfolio.views.daily.find(view => 
      view.date.getTime() === today.getTime()
    );

    if (todayView) {
      todayView.count += 1;
    } else {
      portfolio.views.daily.push({
        date: today,
        count: 1
      });
    }

    await portfolio.save();
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 포트폴리오 통계 조회
router.get('/:id/stats', async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: '포트폴리오를 찾을 수 없습니다.' });
    }

    // 오늘 날짜의 시작 시간
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 오늘의 조회수 찾기
    const todayView = portfolio.views.daily.find(view => 
      view.date.getTime() === today.getTime()
    );

    const stats = {
      totalViews: portfolio.views.total,
      todayViews: todayView ? todayView.count : 0,
      dailyStats: portfolio.views.daily.map(view => ({
        date: view.date,
        count: view.count
      }))
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 포트폴리오 목록 조회
router.get('/', async (req, res) => {
  try {
    const portfolios = await Portfolio.find();
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 포트폴리오 수정
router.put('/:id', async (req, res) => {
  try {
    const { title, description, content } = req.body;
    const portfolio = await Portfolio.findById(req.params.id);
    
    if (!portfolio) {
      return res.status(404).json({ message: '포트폴리오를 찾을 수 없습니다.' });
    }

    portfolio.title = title || portfolio.title;
    portfolio.description = description || portfolio.description;
    portfolio.content = content || portfolio.content;
    portfolio.updatedAt = Date.now();

    await portfolio.save();
    res.json(portfolio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 포트폴리오 삭제
router.delete('/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: '포트폴리오를 찾을 수 없습니다.' });
    }
    await portfolio.remove();
    res.json({ message: '포트폴리오가 삭제되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 