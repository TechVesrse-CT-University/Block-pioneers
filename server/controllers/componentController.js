import Component from '../model/componentModel.js';

// Save a new component
export const saveComponent = async (req, res) => {
  let { name, description, css, author, tags } = req.body;

  try {
    // Validate required fields
    if (!name || !description || !css) {
      return res.status(400).json({ message: 'Name, description and CSS are required' });
    }

    // Convert CSS string to object if needed
    if (typeof css === 'string') {
      css = css.split(';').reduce((obj, rule) => {
        const [key, value] = rule.split(':').map(s => s.trim());
        if (key && value) obj[key] = value;
        return obj;
      }, {});
    }

    const newComponent = new Component({
      name,
      description,
      css,
      author: author || 'Anonymous',
      tags: tags || []
    });

    const savedComponent = await newComponent.save();
    res.status(201).json(savedComponent);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error saving component',
      error: error.message 
    });
  }
};

// Get all components
export const getComponents = async (req, res) => {
  try {
    const components = await Component.find().sort({ createdAt: -1 });
    res.status(200).json(components);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching components',
      error: error.message 
    });
  }
};

// Search components
export const searchComponents = async (req, res) => {
  const { query } = req.query;

  try {
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const results = await Component.find(
      { $text: { $search: query } },
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error searching components',
      error: error.message 
    });
  }
};

// Like a component
export const likeComponent = async (req, res) => {
  const { id } = req.params;

  try {
    const component = await Component.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!component) {
      return res.status(404).json({ message: 'Component not found' });
    }

    res.status(200).json(component);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error liking component',
      error: error.message 
    });
  }
};
