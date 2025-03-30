const express = require('express');
const winston = require('winston');

// Initialize express app
const app = express();
const port = 3000;

// Set up logging
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'calculator-microservice' },
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// Simple API endpoints for arithmetic operations

// Addition endpoint
app.get('/add', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    logger.error('Invalid input for addition');
    return res.status(400).json({ error: 'Invalid numbers' });
  }

  const result = num1 + num2;
  logger.info(`New addition operation: ${num1} + ${num2} = ${result}`);
  res.json({ result });
});

// Subtraction endpoint
app.get('/subtract', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    logger.error('Invalid input for subtraction');
    return res.status(400).json({ error: 'Invalid numbers' });
  }

  const result = num1 - num2;
  logger.info(`New subtraction operation: ${num1} - ${num2} = ${result}`);
  res.json({ result });
});

// Multiplication endpoint
app.get('/multiply', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    logger.error('Invalid input for multiplication');
    return res.status(400).json({ error: 'Invalid numbers' });
  }

  const result = num1 * num2;
  logger.info(`New multiplication operation: ${num1} * ${num2} = ${result}`);
  res.json({ result });
});

// Division endpoint
app.get('/divide', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    logger.error('Invalid input for division');
    return res.status(400).json({ error: 'Invalid numbers' });
  }

  if (num2 === 0) {
    logger.error('Division by zero error');
    return res.status(400).json({ error: 'Cannot divide by zero' });
  }

  const result = num1 / num2;
  logger.info(`New division operation: ${num1} / ${num2} = ${result}`);
  res.json({ result });
});

// Exponentiation endpoint (num1 ^ num2)
app.get('/exponentiate', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    logger.error('Invalid input for exponentiation');
    return res.status(400).json({ error: 'Invalid numbers' });
  }

  const result = Math.pow(num1, num2);
  logger.info(`New exponentiation operation: ${num1} ^ ${num2} = ${result}`);
  res.json({ result });
});

// Square Root endpoint (√num)
app.get('/sqrt', (req, res) => {
  const num = parseFloat(req.query.num);

  if (isNaN(num)) {
    logger.error('Invalid input for square root');
    return res.status(400).json({ error: 'Invalid number' });
  }

  if (num < 0) {
    logger.error('Square root of negative number');
    return res.status(400).json({ error: 'Cannot calculate square root of negative number' });
  }

  const result = Math.sqrt(num);
  logger.info(`New square root operation: √${num} = ${result}`);
  res.json({ result });
});

// Modulo endpoint (num1 % num2)
app.get('/modulo', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    logger.error('Invalid input for modulo');
    return res.status(400).json({ error: 'Invalid numbers' });
  }

  if (num2 === 0) {
    logger.error('Modulo by zero error');
    return res.status(400).json({ error: 'Cannot divide by zero' });
  }

  const result = num1 % num2;
  logger.info(`New modulo operation: ${num1} % ${num2} = ${result}`);
  res.json({ result });
});

// Start the server
app.listen(port, () => {
  console.log(`Calculator microservice running on http://localhost:${port}`);
  logger.info(`Calculator microservice running on http://localhost:${port}`);
});
