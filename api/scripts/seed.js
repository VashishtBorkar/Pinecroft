import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Community from '../models/Community.js';
import Post from '../models/Post.js';
import bcrypt from 'bcrypt';

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
console.log("Connected to DB");

const password = await bcrypt.hash('password123', 10);

// 1. Create users
const users = await User.insertMany([
  { username: 'VashishtBorkar', email: 'vashisht@example.com', password },
  { username: 'WarrenBuffet', email: 'warren@example.com', password },
  { username: 'KingJames', email: 'kingjames@example.com', password }
]);

// 2. Create communities
const communities = await Community.insertMany([
  { 
    name: 'Apple', 
    description: 'A hub for discussing Apple’s latest product launches, ecosystem updates, and stock performance.', 
    members: [users[0]._id, users[1]._id] 
  },

  { 
    name: 'tesla', 
    description: 'All things Tesla — EVs, stock news, and more', 
    members: [users[1]._id] 
  },
  { 
    name: 'meta', 
    description: 'VR, social media, and Meta’s market impact', 
    members: [users[2]._id] 
  },
  { 
    name: 'google', 
    description: 'Explore Google’s innovations and stock trends', 
    members: [users[0]._id, users[2]._id] 
  }
]);

// 3. Create posts
const posts = await Post.insertMany([
  {
    title: 'Bullish on Apple After WWDC?',
    content: 'The new chips and Vision Pro updates make me optimistic for Q4.',
    author: users[0]._id,
    community: communities[0]._id
  },
  {
    title: 'Tesla deliveries missed — still long',
    content: 'Market overreacted IMO. Long-term growth story still intact.',
    author: users[1]._id,
    community: communities[1]._id
  },
  {
    title: 'Meta’s AI strategy is heating up',
    content: 'With Llama 3 and open-source models, Meta could take real share from OpenAI.',
    author: users[2]._id,
    community: communities[2]._id
  }
]);

console.log('Seed complete ✅');
process.exit();
