import React from 'react';

export enum ScreenState {
  LANDING = 'LANDING',
  QUIZ = 'QUIZ',
  CALCULATING = 'CALCULATING',
  SIGNUP = 'SIGNUP',
  RESULT = 'RESULT'
}

export enum RoleType {
  SOCIAL_MEDIA = 'Social Media Marketer',
  PERFORMANCE = 'Performance Marketer',
  CONTENT = 'Content Marketer',
  SEO = 'SEO Specialist',
  FREELANCER = 'Freelancer'
}

export interface Option {
  id: string;
  text: string;
  weight: RoleType; // Which role this option leans towards
  icon: string;
}

export interface Question {
  id: number;
  question: string;
  options: Option[];
}

export interface RoleData {
  title: string;
  description: string;
  visualIcon: React.ReactNode;
  bgGradient: string;
  textColor: string;
}

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}