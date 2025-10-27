const db = require('../config/database');

// Create new task
const createTask = async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required.'
      });
    }

    // Validate priority
    const validPriorities = ['baja', 'media', 'alta'];
    const taskPriority = priority || 'media';

    if (!validPriorities.includes(taskPriority)) {
      return res.status(400).json({
        success: false,
        message: 'Priority must be: baja, media, or alta.'
      });
    }

    // Insert task
    const [result] = await db.query(
      'INSERT INTO tasks (user_id, title, description, priority, status) VALUES (?, ?, ?, ?, ?)',
      [userId, title, description || '', taskPriority, 'por_hacer']
    );

    res.status(201).json({
      success: true,
      message: 'Task created successfully.',
      task: {
        id: result.insertId,
        title,
        description: description || '',
        priority: taskPriority,
        status: 'por_hacer',
        user_id: userId
      }
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating task.'
    });
  }
};

// Get all tasks for user
const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status } = req.query;

    let query = 'SELECT * FROM tasks WHERE user_id = ?';
    let params = [userId];

    // Filter by status if provided
    if (status) {
      const validStatuses = ['por_hacer', 'en_progreso', 'completada'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status. Must be: por_hacer, en_progreso, or completada.'
        });
      }
      query += ' AND status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC';

    const [tasks] = await db.query(query, params);

    res.json({
      success: true,
      count: tasks.length,
      tasks
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching tasks.'
    });
  }
};

// Update task status
const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    // Validate status
    const validStatuses = ['por_hacer', 'en_progreso', 'completada'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be: por_hacer, en_progreso, or completada.'
      });
    }

    // Check if task exists and belongs to user
    const [tasks] = await db.query(
      'SELECT id FROM tasks WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or you do not have permission.'
      });
    }

    // Update status
    await db.query(
      'UPDATE tasks SET status = ?, updated_at = NOW() WHERE id = ?',
      [status, id]
    );

    // Get updated task
    const [updatedTasks] = await db.query(
      'SELECT * FROM tasks WHERE id = ?',
      [id]
    );

    res.json({
      success: true,
      message: 'Task status updated successfully.',
      task: updatedTasks[0]
    });
  } catch (error) {
    console.error('Update task status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating task.'
    });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if task exists and belongs to user
    const [tasks] = await db.query(
      'SELECT id FROM tasks WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or you do not have permission.'
      });
    }

    // Delete task
    await db.query('DELETE FROM tasks WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Task deleted successfully.'
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting task.'
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask
};
