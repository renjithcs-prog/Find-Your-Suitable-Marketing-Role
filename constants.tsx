import React from 'react';
import { RoleType, Question, RoleData } from './types';
import { 
  Instagram, 
  BarChart3, 
  PenTool, 
  Search, 
  Laptop, 
  Smartphone,
  TrendingUp,
  Globe,
  Coffee
} from 'lucide-react';

export const APP_COLORS = {
  yellow: '#FFD700',
  electricBlue: '#2563EB', // Tailwind blue-600 roughly
  black: '#000000',
};

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What's your favorite part of scrolling social media?",
    options: [
      { id: '1a', text: "Analyzing why a post went viral", weight: RoleType.SOCIAL_MEDIA, icon: "🔥" },
      { id: '1b', text: "Judging the ads that pop up", weight: RoleType.PERFORMANCE, icon: "📊" },
      { id: '1c', text: "Reading the captions & stories", weight: RoleType.CONTENT, icon: "✍️" },
      { id: '1d', text: "I don't scroll, I search for info", weight: RoleType.SEO, icon: "🔍" },
    ]
  },
  {
    id: 2,
    question: "If you had to work on a project, how would you start?",
    options: [
      { id: '2a', text: "Open a spreadsheet & look at data", weight: RoleType.PERFORMANCE, icon: "📈" },
      { id: '2b', text: "Start filming or designing visuals", weight: RoleType.SOCIAL_MEDIA, icon: "🎨" },
      { id: '2c', text: "Research keywords & competitors", weight: RoleType.SEO, icon: "🕵️‍♂️" },
      { id: '2d', text: "Grab coffee and work from a cafe solo", weight: RoleType.FREELANCER, icon: "☕" },
    ]
  },
  {
    id: 3,
    question: "What motivates you the most?",
    options: [
      { id: '3a', text: "Seeing immediate ROI (Money In/Out)", weight: RoleType.PERFORMANCE, icon: "💰" },
      { id: '3b', text: "Building a loyal community of fans", weight: RoleType.SOCIAL_MEDIA, icon: "❤️" },
      { id: '3c', text: "Ranking #1 on Google", weight: RoleType.SEO, icon: "🏆" },
      { id: '3d', text: "Freedom to work when I want", weight: RoleType.FREELANCER, icon: "🦅" },
    ]
  },
  {
    id: 4,
    question: "Which tool sounds more fun to master?",
    options: [
      { id: '4a', text: "Facebook Ads Manager", weight: RoleType.PERFORMANCE, icon: "🎯" },
      { id: '4b', text: "Instagram Reels / TikTok", weight: RoleType.SOCIAL_MEDIA, icon: "🎥" },
      { id: '4c', text: "WordPress & Blogging", weight: RoleType.CONTENT, icon: "📝" },
      { id: '4d', text: "Multiple tools, I'm a jack of all trades", weight: RoleType.FREELANCER, icon: "🛠️" },
    ]
  },
  {
    id: 5,
    question: "Pick a superpower:",
    options: [
      { id: '5a', text: "Mind Control (Persuasive Writing)", weight: RoleType.CONTENT, icon: "🧠" },
      { id: '5b', text: "Prediction (Spotting Trends)", weight: RoleType.SOCIAL_MEDIA, icon: "🔮" },
      { id: '5c', text: "Invisibility (Behind the scenes Strategy)", weight: RoleType.SEO, icon: "👻" },
      { id: '5d', text: "Teleportation (Digital Nomad Life)", weight: RoleType.FREELANCER, icon: "🌍" },
    ]
  }
];

export const ROLE_DETAILS: Record<RoleType, RoleData> = {
  [RoleType.SOCIAL_MEDIA]: {
    title: "Social Media Marketer",
    description: "You live for the feed. This role matches your creativity + thinking style.",
    visualIcon: <Instagram size={64} />,
    bgGradient: "from-pink-500 to-yellow-500",
    textColor: "text-pink-500"
  },
  [RoleType.PERFORMANCE]: {
    title: "Performance Marketer",
    description: "You love data and results. Graphs and dashboards are your playground.",
    visualIcon: <BarChart3 size={64} />,
    bgGradient: "from-green-400 to-blue-500",
    textColor: "text-green-500"
  },
  [RoleType.CONTENT]: {
    title: "Content Marketer",
    description: "Words are your weapon. You know how to tell a story that sells.",
    visualIcon: <PenTool size={64} />,
    bgGradient: "from-purple-500 to-indigo-500",
    textColor: "text-purple-500"
  },
  [RoleType.SEO]: {
    title: "SEO Specialist",
    description: "You play the long game. Ranking #1 is the only option.",
    visualIcon: <Search size={64} />,
    bgGradient: "from-blue-400 to-cyan-300",
    textColor: "text-blue-500"
  },
  [RoleType.FREELANCER]: {
    title: "Freelance Hustler",
    description: "You value freedom. Your home setup + coffee is your empire.",
    visualIcon: <Laptop size={64} />,
    bgGradient: "from-orange-400 to-red-500",
    textColor: "text-orange-500"
  },
};