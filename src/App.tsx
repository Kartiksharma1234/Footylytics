import React, { useState } from 'react';
import { 
  Trophy, 
  Users, 
  CalendarDays, 
  X, 
  Activity, 
  Target, 
  ShieldAlert, 
  Clock,
  Swords,
  ArrowLeft,
  MapPin,
  Flame,
  LayoutGrid,
  Info,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// --- COUNTRY FLAG MAPPING ---
const getFlagUrl = (country) => {
  const map = {
    'Germany': 'de', 'Paraguay': 'py', 'France': 'fr', 'Sweden': 'se',
    'South Africa': 'za', 'Canada': 'ca', 'Netherlands': 'nl', 'Morocco': 'ma',
    'Portugal': 'pt', 'Croatia': 'hr', 'Spain': 'es', 'Austria': 'at',
    'USA': 'us', 'Bosnia & Herzegovina': 'ba', 'Belgium': 'be', 'Senegal': 'sn',
    'Brazil': 'br', 'Japan': 'jp', "Côte d'Ivoire": 'ci', 'Norway': 'no',
    'Mexico': 'mx', 'Ecuador': 'ec', 'England': 'gb-eng', 'DR Congo': 'cd',
    'Argentina': 'ar', 'Cape Verde': 'cv', 'Australia': 'au', 'Egypt': 'eg',
    'Switzerland': 'ch', 'Algeria': 'dz', 'Colombia': 'co', 'Ghana': 'gh',
    'South Korea': 'kr', 'Czechia': 'cz', 'Qatar': 'qa', 'Scotland': 'gb-sct',
    'Haiti': 'ht', 'Türkiye': 'tr', 'Curaçao': 'cw', 'Tunisia': 'tn',
    'Iran': 'ir', 'New Zealand': 'nz', 'Uruguay': 'uy', 'Saudi Arabia': 'sa',
    'Iraq': 'iq', 'Jordan': 'jo', 'Uzbekistan': 'uz', 'Panama': 'pa'
  };
  const code = map[country];
  return code ? `https://flagcdn.com/w40/${code}.png` : 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Missing_flag.png';
};

// --- DATA: SQUADS & PLAYERS ---
const TEAMS = {
  'ARG': { name: 'Argentina', flag: getFlagUrl('Argentina'), color: 'from-sky-400 to-white' },
  'ENG': { name: 'England', flag: getFlagUrl('England'), color: 'from-slate-100 to-red-600' },
  'FRA': { name: 'France', flag: getFlagUrl('France'), color: 'from-blue-700 to-red-600' },
  'ESP': { name: 'Spain', flag: getFlagUrl('Spain'), color: 'from-red-600 to-yellow-400' },
  'MEX': { name: 'Mexico', flag: getFlagUrl('Mexico'), color: 'from-green-600 to-red-600' },
  'RSA': { name: 'South Africa', flag: getFlagUrl('South Africa'), color: 'from-green-600 to-yellow-500' },
  'KOR': { name: 'South Korea', flag: getFlagUrl('South Korea'), color: 'from-red-500 to-blue-500' },
  'CZE': { name: 'Czechia', flag: getFlagUrl('Czechia'), color: 'from-blue-600 to-red-600' },
  'SUI': { name: 'Switzerland', flag: getFlagUrl('Switzerland'), color: 'from-red-600 to-red-600' },
  'CAN': { name: 'Canada', flag: getFlagUrl('Canada'), color: 'from-red-600 to-red-600' },
  'BIH': { name: 'Bosnia & Herzegovina', flag: getFlagUrl('Bosnia & Herzegovina'), color: 'from-blue-700 to-yellow-400' },
  'QAT': { name: 'Qatar', flag: getFlagUrl('Qatar'), color: 'from-red-800 to-red-800' },
  'BRA': { name: 'Brazil', flag: getFlagUrl('Brazil'), color: 'from-green-600 to-yellow-400' },
  'MAR': { name: 'Morocco', flag: getFlagUrl('Morocco'), color: 'from-red-700 to-green-700' },
  'SCO': { name: 'Scotland', flag: getFlagUrl('Scotland'), color: 'from-blue-700 to-white' },
  'HAI': { name: 'Haiti', flag: getFlagUrl('Haiti'), color: 'from-blue-600 to-red-600' },
  'USA': { name: 'USA', flag: getFlagUrl('USA'), color: 'from-blue-800 to-red-600' },
  'AUS': { name: 'Australia', flag: getFlagUrl('Australia'), color: 'from-blue-900 to-red-600' },
  'PAR': { name: 'Paraguay', flag: getFlagUrl('Paraguay'), color: 'from-red-600 to-blue-700' },
  'TUR': { name: 'Türkiye', flag: getFlagUrl('Türkiye'), color: 'from-red-600 to-red-600' },
  'GER': { name: 'Germany', flag: getFlagUrl('Germany'), color: 'from-gray-800 to-yellow-500' },
  'CIV': { name: 'Côte d\'Ivoire', flag: getFlagUrl('Côte d\'Ivoire'), color: 'from-orange-500 to-green-600' },
  'ECU': { name: 'Ecuador', flag: getFlagUrl('Ecuador'), color: 'from-yellow-400 to-red-600' },
  'CUW': { name: 'Curaçao', flag: getFlagUrl('Curaçao'), color: 'from-blue-600 to-yellow-400' },
  'NED': { name: 'Netherlands', flag: getFlagUrl('Netherlands'), color: 'from-orange-500 to-orange-500' },
  'JPN': { name: 'Japan', flag: getFlagUrl('Japan'), color: 'from-white to-red-600' },
  'SWE': { name: 'Sweden', flag: getFlagUrl('Sweden'), color: 'from-blue-600 to-yellow-400' },
  'TUN': { name: 'Tunisia', flag: getFlagUrl('Tunisia'), color: 'from-red-600 to-white' },
  'BEL': { name: 'Belgium', flag: getFlagUrl('Belgium'), color: 'from-black to-yellow-400' },
  'EGY': { name: 'Egypt', flag: getFlagUrl('Egypt'), color: 'from-red-600 to-black' },
  'IRN': { name: 'Iran', flag: getFlagUrl('Iran'), color: 'from-green-600 to-red-600' },
  'NZL': { name: 'New Zealand', flag: getFlagUrl('New Zealand'), color: 'from-black to-blue-700' },
  'CPV': { name: 'Cape Verde', flag: getFlagUrl('Cape Verde'), color: 'from-blue-700 to-white' },
  'URU': { name: 'Uruguay', flag: getFlagUrl('Uruguay'), color: 'from-sky-300 to-white' },
  'KSA': { name: 'Saudi Arabia', flag: getFlagUrl('Saudi Arabia'), color: 'from-green-700 to-green-700' },
  'NOR': { name: 'Norway', flag: getFlagUrl('Norway'), color: 'from-red-600 to-blue-800' },
  'SEN': { name: 'Senegal', flag: getFlagUrl('Senegal'), color: 'from-green-600 to-red-600' },
  'IRQ': { name: 'Iraq', flag: getFlagUrl('Iraq'), color: 'from-red-600 to-black' },
  'AUT': { name: 'Austria', flag: getFlagUrl('Austria'), color: 'from-red-600 to-white' },
  'ALG': { name: 'Algeria', flag: getFlagUrl('Algeria'), color: 'from-green-600 to-white' },
  'JOR': { name: 'Jordan', flag: getFlagUrl('Jordan'), color: 'from-black to-red-600' },
  'COL': { name: 'Colombia', flag: getFlagUrl('Colombia'), color: 'from-yellow-400 to-blue-700' },
  'POR': { name: 'Portugal', flag: getFlagUrl('Portugal'), color: 'from-red-600 to-green-600' },
  'COD': { name: 'DR Congo', flag: getFlagUrl('DR Congo'), color: 'from-blue-600 to-yellow-400' },
  'UZB': { name: 'Uzbekistan', flag: getFlagUrl('Uzbekistan'), color: 'from-blue-600 to-green-600' },
  'CRO': { name: 'Croatia', flag: getFlagUrl('Croatia'), color: 'from-red-600 to-blue-700' },
  'GHA': { name: 'Ghana', flag: getFlagUrl('Ghana'), color: 'from-red-600 to-green-600' },
  'PAN': { name: 'Panama', flag: getFlagUrl('Panama'), color: 'from-red-600 to-blue-700' }
};

const PLAYERS = {
  'ARG': [
    { id: 'a1', name: 'Lionel Messi', pos: 'Attacker', age: 39, image: 'messi.jpg', stats: { averageRating: 8.79, goals: 8, assists: 4, ga: 12, shotsOnTargetPerMatch: 2.3, bigChancesCreated: 8, bigChancesMissed: 3, accuratePassesPerMatch: 35.6, keyPassesPerMatch: 3.3, xG: 5.28, minutes: 740, totalShots: 4.4 } },
    { id: 'a2', name: 'Julián Álvarez', pos: 'Attacker', age: 26, image: 'alvarez.jpg', stats: { averageRating: 6.58, goals: 1, assists: 0, ga: 1, shotsOnTargetPerMatch: 0.6, bigChancesCreated: 0, bigChancesMissed: 2, accuratePassesPerMatch: 22.2, keyPassesPerMatch: 0.5, xG: 1.38, minutes: 601, totalShots: 1.4 } },
    { id: 'a3', name: 'Lautaro Martínez', pos: 'Attacker', age: 28, image: 'lmartinez.jpg', stats: { averageRating: 6.76, goals: 3, assists: 1, ga: 4, shotsOnTargetPerMatch: 0.6, bigChancesCreated: 3, bigChancesMissed: 2, accuratePassesPerMatch: 8.3, keyPassesPerMatch: 0.7, xG: 2.94, minutes: 311, totalShots: 1.4 } },
    { id: 'a4', name: 'José Manuel López', pos: 'Attacker', age: 25, image: 'lopez.jpg', stats: { averageRating: 6.45, goals: 0, assists: 1, ga: 1, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 1.0, keyPassesPerMatch: 0.5, xG: 0.02, minutes: 18, totalShots: 0.0 } },
    { id: 'a5', name: 'Enzo Fernández', pos: 'Midfielder', age: 25, image: 'enzo.jpg', stats: { averageRating: 7.01, goals: 2, assists: 0, ga: 2, shotsOnTargetPerMatch: 0.6, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 68.3, keyPassesPerMatch: 0.6, xG: 0.78, minutes: 663, totalShots: 1.7 } },
    { id: 'a6', name: 'Nico Paz', pos: 'Midfielder', age: 21, image: 'paz.jpg', stats: { averageRating: 6.65, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 27.0, keyPassesPerMatch: 0.0, xG: 0.06, minutes: 71, totalShots: 0.5 } },
    { id: 'a7', name: 'Alexis Mac Allister', pos: 'Midfielder', age: 27, image: 'macallister.jpg', stats: { averageRating: 6.74, goals: 1, assists: 1, ga: 2, shotsOnTargetPerMatch: 0.5, bigChancesCreated: 0, bigChancesMissed: 3, accuratePassesPerMatch: 48.8, keyPassesPerMatch: 0.6, xG: 1.76, minutes: 749, totalShots: 1.6 } },
    { id: 'a8', name: 'Rodrigo De Paul', pos: 'Midfielder', age: 32, image: 'depaul.jpg', stats: { averageRating: 6.97, goals: 0, assists: 1, ga: 1, shotsOnTargetPerMatch: 0.1, bigChancesCreated: 2, bigChancesMissed: 0, accuratePassesPerMatch: 41.4, keyPassesPerMatch: 0.9, xG: 0.06, minutes: 495, totalShots: 0.3 } },
    { id: 'a9', name: 'Leandro Paredes', pos: 'Midfielder', age: 32, image: 'paredes.jpg', stats: { averageRating: 7.21, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.1, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 75.9, keyPassesPerMatch: 0.6, xG: 0.06, minutes: 473, totalShots: 0.6 } },
    { id: 'a10', name: 'Thiago Almada', pos: 'Midfielder', age: 25, image: 'almada.jpg', stats: { averageRating: 6.82, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.4, bigChancesCreated: 0, bigChancesMissed: 1, accuratePassesPerMatch: 30.6, keyPassesPerMatch: 0.6, xG: 0.40, minutes: 243, totalShots: 1.0 } },
    { id: 'a11', name: 'Giuliano Simeone', pos: 'Midfielder', age: 23, image: 'simeone.jpg', stats: { averageRating: 6.17, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 24.3, keyPassesPerMatch: 1.0, xG: 0.2, minutes: 193, totalShots: 0.3 } },
    { id: 'a12', name: 'Valentín Barco', pos: 'Midfielder', age: 21, image: 'barco.jpg', stats: { averageRating: 6.80, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 16.0, keyPassesPerMatch: 0.0, xG: 0.0, minutes: 19, totalShots: 0.0 } },
    { id: 'a13', name: 'Nicolás González', pos: 'Attacker', age: 28, image: 'gonzalez.jpg', stats: { averageRating: 6.81, goals: 0, assists: 1, ga: 1, shotsOnTargetPerMatch: 0.1, bigChancesCreated: 1, bigChancesMissed: 2, accuratePassesPerMatch: 12.6, keyPassesPerMatch: 0.9, xG: 0.78, minutes: 253, totalShots: 1.0 } },
    { id: 'a14', name: 'Giovani Lo Celso', pos: 'Midfielder', age: 30, image: 'locelso.jpg', stats: { averageRating: 7.90, goals: 1, assists: 0, ga: 1, shotsOnTargetPerMatch: 1.0, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 43.0, keyPassesPerMatch: 2.0, xG: 0.10, minutes: 60, totalShots: 1.0 } },
    { id: 'a15', name: 'Exequiel Palacios', pos: 'Midfielder', age: 27, image: 'palacios.jpg', stats: { averageRating: 6.80, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 81.0, keyPassesPerMatch: 0.0, xG: 0.0, minutes: 90, totalShots: 0.0 } },
    { id: 'a16', name: 'Lisandro Martínez', pos: 'Defender', age: 28, image: 'lmartinez.jpg', stats: { averageRating: 7.29, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 61, keyPassesPerMatch: 0.3, minutes: 626, interceptionsPerMatch: 0.9, tacklesPerMatch: 1.7 } },
    { id: 'a17', name: 'Cristian Romero', pos: 'Defender', age: 28, image: 'romero.jpg', stats: { averageRating: 7.17, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 58.7, keyPassesPerMatch: 0.0, minutes: 611, interceptionsPerMatch: 1.4, tacklesPerMatch: 2.1 } },
    { id: 'a18', name: 'Nicolás Otamendi', pos: 'Defender', age: 38, image: 'otamendi.jpg', stats: { averageRating: 6.80, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 25.4, keyPassesPerMatch: 0.0, minutes: 243, interceptionsPerMatch: 0.7, tacklesPerMatch: 0.6 } },
    { id: 'a19', name: 'Nahuel Molina', pos: 'Defender', age: 28, image: 'molina.jpg', stats: { averageRating: 6.44, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 30.3, keyPassesPerMatch: 0.4, minutes: 531, interceptionsPerMatch: 1.1, tacklesPerMatch: 2.1 } },
    { id: 'a20', name: 'Nicolás Tagliafico', pos: 'Defender', age: 33, image: 'tagliafico.jpg', stats: { averageRating: 6.66, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 24.0, keyPassesPerMatch: 0.4, minutes: 477, interceptionsPerMatch: 0.9, tacklesPerMatch: 1.1 } },
    { id: 'a21', name: 'Gonzalo Montiel', pos: 'Defender', age: 29, image: 'montiel.jpg', stats: { averageRating: 6.62, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 11.2, keyPassesPerMatch: 0.2, minutes: 189, interceptionsPerMatch: 0.5, tacklesPerMatch: 0.5 } },
    { id: 'a22', name: 'Facundo Medina', pos: 'Defender', age: 27, image: 'medina.jpg', stats: { averageRating: 6.93, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 26.4, keyPassesPerMatch: 0.2, minutes: 309, interceptionsPerMatch: 0.2, tacklesPerMatch: 1.8 } },
    { id: 'a23', name: 'Marcos Senesi', pos: 'Defender', age: 29, image: 'senesi.jpg', stats: { averageRating: 6.60, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 36.5, keyPassesPerMatch: 0.0, minutes: 108, interceptionsPerMatch: 1.0, tacklesPerMatch: 0.0 } },
    { id: 'a24', name: 'Emiliano Martínez', pos: 'Goalkeeper', age: 33, image: 'emartinez.jpg', stats: { averageRating: 7.03, accuratePassesPerMatch: 21.9, minutes: 810, goalsPrevented: 0.33, savesPerMatch: 2.5 } },
    { id: 'a25', name: 'Juan Musso', pos: 'Goalkeeper', age: 32, image: 'musso.jpg', stats: { averageRating: 0.0, accuratePassesPerMatch: 0.0, minutes: 0, goalsPrevented: 0, savesPerMatch: 0 } },
    { id: 'a26', name: 'Gerónimo Rulli', pos: 'Goalkeeper', age: 34, image: 'rulli.jpg', stats: { averageRating: 0.0, accuratePassesPerMatch: 0.0, minutes: 0, goalsPrevented: 0, savesPerMatch: 0 } }
  ],
  'ENG': [
    { id: 'e1', name: 'Harry Kane', pos: 'Attacker', age: 32, image: 'kane.jpg', stats: { averageRating: 7.26, goals: 6, assists: 1, ga: 7, shotsOnTargetPerMatch: 1.7 , bigChancesCreated: 1, bigChancesMissed: 3, accuratePassesPerMatch: 10.6, keyPassesPerMatch: 0.7, xG: 3.55, minutes: 653, totalShots: 3.3 } },
    { id: 'e2', name: 'Marcus Rashford', pos: 'Attacker', age: 28, image: 'rashford.jpg', stats: { averageRating: 6.82, goals: 1, assists: 1, ga: 2, shotsOnTargetPerMatch: 0.8, bigChancesCreated: 3, bigChancesMissed: 3, accuratePassesPerMatch: 14.8, keyPassesPerMatch: 0.7, xG: 1.24, minutes: 229, totalShots: 2.0 } },
    { id: 'e3', name: 'Bukayo Saka', pos: 'Attacker', age: 24, image: 'saka.jpg', stats: { averageRating: 7.31, goals: 3, assists: 3, ga: 6, shotsOnTargetPerMatch: 1.0, bigChancesCreated: 3, bigChancesMissed: 1, accuratePassesPerMatch: 11.3, keyPassesPerMatch: 1.1, xG: 1.94, minutes: 357, totalShots: 1.9 } },
    { id: 'e4', name: 'Anthony Gordon', pos: 'Attacker', age: 25, image: 'gordon.jpg', stats: { averageRating: 6.88, goals: 1, assists: 3, ga: 4, shotsOnTargetPerMatch: 0.7, bigChancesCreated: 2, bigChancesMissed: 1, accuratePassesPerMatch: 14.3, keyPassesPerMatch: 1.0, xG: 0.75, minutes: 399, totalShots: 1.0 } },
    { id: 'e5', name: 'Noni Madueke', pos: 'Attacker', age: 24, image: 'madueke.jpg', stats: { averageRating: 7.02, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.2, bigChancesCreated: 3, bigChancesMissed: 1, accuratePassesPerMatch: 16.0, keyPassesPerMatch: 1.8, xG: 0.45, minutes: 288, totalShots: 1.2 } },
    { id: 'e6', name: 'Ollie Watkins', pos: 'Attacker', age: 30, image: 'watkins.jpg', stats: { averageRating: 6.60, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 1, bigChancesMissed: 0, accuratePassesPerMatch: 5.0, keyPassesPerMatch: 1.0, xG: 0.05, minutes: 57, totalShots: 0.5 } },
    { id: 'e7', name: 'Ivan Toney', pos: 'Attacker', age: 30, image: 'toney.jpg', stats: { averageRating: 6.90, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.5, bigChancesCreated: 0, bigChancesMissed: 1, accuratePassesPerMatch: 7.5, keyPassesPerMatch: 0.0, xG: 0.11, minutes: 80, totalShots: 1.0 } },
    { id: 'e8', name: 'Jude Bellingham', pos: 'Midfielder', age: 23, image: 'bellingham.jpg', stats: { averageRating: 7.81, goals: 7, assists: 1, ga: 8, shotsOnTargetPerMatch: 1.6 , bigChancesCreated: 3, bigChancesMissed: 4, accuratePassesPerMatch: 23.8, keyPassesPerMatch: 1.0, xG: 3.06, minutes: 616, totalShots: 2.4 } },
    { id: 'e9', name: 'Declan Rice', pos: 'Midfielder', age: 27, image: 'rice.jpg', stats: { averageRating: 7.33, goals: 1, assists: 2, ga: 3, shotsOnTargetPerMatch: 0.4 , bigChancesCreated: 3, bigChancesMissed: 0, accuratePassesPerMatch: 43.9, keyPassesPerMatch: 2.4, xG: 0.23, minutes: 558, totalShots: 0.9 } },
    { id: 'e10', name: 'Eberechi Eze', pos: 'Midfielder', age: 28, image: 'eze.jpg', stats: { averageRating: 6.84, goals: 0, assists: 1, ga: 1, shotsOnTargetPerMatch: 0.0 , bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 18.0, keyPassesPerMatch: 1.0, xG: 0.15, minutes: 209, totalShots: 1.0 } },
    { id: 'e11', name: 'Kobbie Mainoo', pos: 'Midfielder', age: 21, image: 'mainoo.jpg', stats: { averageRating: 0.0, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0 , bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 0.0, keyPassesPerMatch: 0.0, xG: 0.0, minutes: 0, totalShots: 0.0 } },
    { id: 'e12', name: 'Elliot Anderson', pos: 'Midfielder', age: 23, image: 'anderson.jpg', stats: { averageRating: 7.18, goals: 0, assists: 1, ga: 1, shotsOnTargetPerMatch: 0.1 , bigChancesCreated: 1, bigChancesMissed: 0, accuratePassesPerMatch: 49.8, keyPassesPerMatch: 0.5, xG: 0.23, minutes: 634, totalShots: 0.9 } },
    { id: 'e13', name: 'Morgan Rogers', pos: 'Midfielder', age: 23, image: 'rogers.jpg', stats: { averageRating: 6.69, goals: 0, assists: 1, ga: 1, shotsOnTargetPerMatch: 0.1 , bigChancesCreated: 2, bigChancesMissed: 0, accuratePassesPerMatch: 14.4, keyPassesPerMatch: 1.0, xG: 0.14, minutes: 349, totalShots: 0.4 } },
    { id: 'e14', name: 'Jordan Henderson', pos: 'Midfielder', age: 36, image: 'henderson.jpg', stats: { averageRating: 6.80, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0 , bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 12.0, keyPassesPerMatch: 0.0, xG: 0.0, minutes: 12, totalShots: 0.0 } },
    { id: 'e15', name: 'Reece James', pos: 'Defender', age: 26, image: 'james.jpg', stats: { averageRating: 6.74, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 30.2, keyPassesPerMatch: 0.6, interceptionsPerMatch: 0.6, tacklesPerMatch: 1.2, minutes: 327 } },
    { id: 'e16', name: 'Nico O\'Reilly', pos: 'Defender', age: 21, image: 'oreilly.jpg', stats: { averageRating: 6.49, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 26.6, keyPassesPerMatch: 0.4, interceptionsPerMatch: 0.7, tacklesPerMatch: 0.9, minutes: 462 } },
    { id: 'e17', name: 'Marc Guéhi', pos: 'Defender', age: 26, image: 'guehi.jpg', stats: { averageRating: 7.08, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 64.1, keyPassesPerMatch: 0.3, interceptionsPerMatch: 0.8, tacklesPerMatch: 0.3, minutes: 669 } },
    { id: 'e18', name: 'John Stones', pos: 'Defender', age: 32, image: 'stones.jpg', stats: { averageRating: 6.68, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 36.2, keyPassesPerMatch: 0.2, interceptionsPerMatch: 0.0, tacklesPerMatch: 0.4, minutes: 330 } },
    { id: 'e19', name: 'Trevoh Chalobah', pos: 'Defender', age: 27, image: 'chalobah.jpg', stats: { averageRating: 0.0, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 0, keyPassesPerMatch: 0.0, interceptionsPerMatch: 0.0, tacklesPerMatch: 0.0, minutes: 1 } },
    { id: 'e20', name: 'Jarell Quansah', pos: 'Defender', age: 23, image: 'quansah.jpg', stats: { averageRating: 6.30, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 30.0, keyPassesPerMatch: 0.0, interceptionsPerMatch: 0.0, tacklesPerMatch: 1.0, minutes: 200 } },
    { id: 'e21', name: 'Djed Spence', pos: 'Defender', age: 25, image: 'spence.jpg', stats: { averageRating: 6.95, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 19.0, keyPassesPerMatch: 0.0, interceptionsPerMatch: 0.8, tacklesPerMatch: 2.4, minutes: 402 } },
    { id: 'e22', name: 'Dan Burn', pos: 'Defender', age: 34, image: 'burn.jpg', stats: { averageRating: 6.57, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 0.7, keyPassesPerMatch: 0.0, interceptionsPerMatch: 0.0, tacklesPerMatch: 0.0, minutes: 32 } },
    { id: 'e23', name: 'Ezri Konsa', pos: 'Defender', age: 28, image: 'konsa.jpg', stats: { averageRating: 6.81, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 56.8, keyPassesPerMatch: 0.0, interceptionsPerMatch: 1.0, tacklesPerMatch: 0.6, minutes: 647 } },
    { id: 'e24', name: 'James Trafford', pos: 'Goalkeeper', age: 23, image: 'trafford.jpg', stats: { averageRating: 0.0, goalsPrevented: 0, savesPerMatch: 0.0, minutes: 0 } },
    { id: 'e25', name: 'Jordan Pickford', pos: 'Goalkeeper', age: 32, image: 'pickford.jpg', stats: { averageRating: 6.53, goalsPrevented: -3.20, savesPerMatch: 2.1, minutes: 660 } },
    { id: 'e26', name: 'Dean Henderson', pos: 'Goalkeeper', age: 29, image: 'henderson_gk.jpg', stats: { averageRating: 7.40, goalsPrevented: 0.16, savesPerMatch: 5.0, minutes: 90 } }
  ],
  'FRA': [
    { id: 'f1', name: 'Kylian Mbappé', pos: 'Attacker', age: 27, image: 'mbappe.jpg', stats: { averageRating: 8.24, goals: 10, assists: 4, ga: 14, shotsOnTargetPerMatch: 2.9, bigChancesCreated: 2, bigChancesMissed: 8, accuratePassesPerMatch: 25.1, keyPassesPerMatch: 2.2, xG: 6.87, minutes: 698, totalShots: 5.1 } },
    { id: 'f2', name: 'Ousmane Dembélé', pos: 'Attacker', age: 29, image: 'dembele.jpg', stats: { averageRating: 7.91, goals: 6, assists: 2, ga: 8, shotsOnTargetPerMatch: 1.2, bigChancesCreated: 5, bigChancesMissed: 1, accuratePassesPerMatch: 29.0, keyPassesPerMatch: 2.2, xG: 2.06, minutes: 597, totalShots: 2.5 } },
    { id: 'f3', name: 'Désiré Doué', pos: 'Attacker', age: 21, image: 'doue.jpg', stats: { averageRating: 6.88, goals: 1, assists: 1, ga: 2, shotsOnTargetPerMatch: 1.0, bigChancesCreated: 1, bigChancesMissed: 2, accuratePassesPerMatch: 20.6, keyPassesPerMatch: 1.6, xG: 0.78, minutes: 398, totalShots: 1.6 } },
    { id: 'f4', name: 'Bradley Barcola', pos: 'Attacker', age: 23, image: 'barcola.jpg', stats: { averageRating: 7.11, goals: 3, assists: 1, ga: 4, shotsOnTargetPerMatch: 0.6, bigChancesCreated: 1, bigChancesMissed: 1, accuratePassesPerMatch: 13.5, keyPassesPerMatch: 1.0, xG: 1.98, minutes: 384, totalShots: 1.2 } },
    { id: 'f5', name: 'Marcus Thuram', pos: 'Attacker', age: 28, image: 'thuram.jpg', stats: { averageRating: 0.0, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 0, keyPassesPerMatch: 0.0, xG: 0.0, minutes: 1, totalShots: 0 } },
    { id: 'f6', name: 'Jean-Philippe Mateta', pos: 'Attacker', age: 29, image: 'mateta.jpg', stats: { averageRating: 6.43, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.3, bigChancesCreated: 0, bigChancesMissed: 3, accuratePassesPerMatch: 0.3, keyPassesPerMatch: 0.0, xG: 1.17, minutes: 31, totalShots: 1.0 } },
    { id: 'f7', name: 'Michael Olise', pos: 'Midfielder', age: 24, image: 'olise.jpg', stats: { averageRating: 7.33, goals: 0, assists: 7, ga: 7, shotsOnTargetPerMatch: 0.6, accuratePassesPerMatch: 44.5, keyPassesPerMatch: 2.3, bigChancesCreated: 7, bigChancesMissed: 3, xG: 2.49, minutes: 650, totalShots: 2.5 } },
    { id: 'f8', name: 'Aurélien Tchouaméni', pos: 'Midfielder', age: 26, image: 'tchouameni.jpg', stats: { averageRating: 7.33, goals: 0, assists: 1, ga: 1, shotsOnTargetPerMatch: 0.0, accuratePassesPerMatch: 60.5, keyPassesPerMatch: 1.0, bigChancesCreated: 0, bigChancesMissed: 0, xG: 0.13, minutes: 360, totalShots: 0.8 } },
    { id: 'f9', name: 'Rayan Cherki', pos: 'Midfielder', age: 22, image: 'cherki.jpg', stats: { averageRating: 6.61, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.1, accuratePassesPerMatch: 12.4, keyPassesPerMatch: 0.3, bigChancesCreated: 0, bigChancesMissed: 0, xG: 0.04, minutes: 149, totalShots: 0.1 } },
    { id: 'f10', name: 'N\'Golo Kanté', pos: 'Midfielder', age: 35, image: 'kante.jpg', stats: { averageRating: 0.0, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, accuratePassesPerMatch: 0, keyPassesPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, xG: 0.0, minutes: 0, totalShots: 0 } },
    { id: 'f11', name: 'Warren Zaïre-Emery', pos: 'Midfielder', age: 20, image: 'zaireemery.jpg', stats: { averageRating: 6.60, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, accuratePassesPerMatch: 32.5, keyPassesPerMatch: 1.0, bigChancesCreated: 0, bigChancesMissed: 0, xG: 0.03, minutes: 109, totalShots: 0.5 } },
    { id: 'f12', name: 'Manu Koné', pos: 'Midfielder', age: 25, image: 'kone.jpg', stats: { averageRating: 6.86, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.4, accuratePassesPerMatch: 48.6, keyPassesPerMatch: 0.6, bigChancesCreated: 0, bigChancesMissed: 1, xG: 0.24, minutes: 386, totalShots: 1.2 } },
    { id: 'f13', name: 'Adrien Rabiot', pos: 'Midfielder', age: 31, image: 'rabiot.jpg', stats: { averageRating: 6.86, goals: 0, assists: 1, ga: 1, shotsOnTargetPerMatch: 0.1, accuratePassesPerMatch: 46.9, keyPassesPerMatch: 1.1, bigChancesCreated: 2, bigChancesMissed: 1, xG: 0.85, minutes: 585, totalShots: 1.3 } },
    { id: 'f14', name: 'Maghnes Akliouche', pos: 'Midfielder', age: 24, image: 'akliouche.jpg', stats: { averageRating: 6.50, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, accuratePassesPerMatch: 5.0, keyPassesPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, xG: 0.0, minutes: 10, totalShots: 0.0 } },
    { id: 'f15', name: 'Jules Koundé', pos: 'Defender', age: 27, image: 'kounde.jpg', stats: { averageRating: 6.75, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 35.1, keyPassesPerMatch: 0.5, interceptionsPerMatch: 0.4, tacklesPerMatch: 1.8, minutes: 610 } },
    { id: 'f16', name: 'Ibrahima Konaté', pos: 'Defender', age: 27, image: 'konate.jpg', stats: { averageRating: 6.10, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 16.0, keyPassesPerMatch: 0.0, interceptionsPerMatch: 1.5, tacklesPerMatch: 0.0, minutes: 59 } },
    { id: 'f17', name: 'William Saliba', pos: 'Defender', age: 25, image: 'saliba.jpg', stats: { averageRating: 6.85, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 51.3, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.0, tacklesPerMatch: 0.3, minutes: 480 } },
    { id: 'f18', name: 'Theo Hernández', pos: 'Defender', age: 28, image: 'hernandez_t.jpg', stats: { averageRating: 6.42, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 26.0, keyPassesPerMatch: 0.4, interceptionsPerMatch: 0.6, tacklesPerMatch: 0.4, minutes: 255 } },
    { id: 'f19', name: 'Malo Gusto', pos: 'Defender', age: 23, image: 'gusto.jpg', stats: { averageRating: 6.44, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 13.4, keyPassesPerMatch: 0.2, interceptionsPerMatch: 0.6, tacklesPerMatch: 1.0, minutes: 133 } },
    { id: 'f20', name: 'Dayot Upamecano', pos: 'Defender', age: 27, image: 'upamecano.jpg', stats: { averageRating: 7.21, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 51.1, keyPassesPerMatch: 0.5, interceptionsPerMatch: 1.9, tacklesPerMatch: 2.1, minutes: 661 } },
    { id: 'f21', name: 'Lucas Hernández', pos: 'Defender', age: 30, image: 'hernandez_l.jpg', stats: { averageRating: 6.60, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 15.7, keyPassesPerMatch: 0.0, interceptionsPerMatch: 0.3, tacklesPerMatch: 0.6, minutes: 243 } },
    { id: 'f22', name: 'Maxence Lacroix', pos: 'Defender', age: 26, image: 'lacroix.jpg', stats: { averageRating: 6.77, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 42.7, keyPassesPerMatch: 0.0, interceptionsPerMatch: 1.0, tacklesPerMatch: 1.0, minutes: 240 } },
    { id: 'f23', name: 'Lucas Digne', pos: 'Defender', age: 32, image: 'digne.jpg', stats: { averageRating: 6.65, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 36.2, keyPassesPerMatch: 0.2, interceptionsPerMatch: 0.7, tacklesPerMatch: 0.8, minutes: 465 } },
    { id: 'f24', name: 'Mike Maignan', pos: 'Goalkeeper', age: 31, image: 'maignan.jpg', stats: { averageRating: 6.79, goalsPrevented: -0.81, savesPerMatch: 1.6, minutes: 720 } },
    { id: 'f25', name: 'Brice Samba', pos: 'Goalkeeper', age: 32, image: 'samba.jpg', stats: { averageRating: 0.0, goalsPrevented: 0.0, savesPerMatch: 0.0, minutes: 0 } },
    { id: 'f26', name: 'Robin Risser', pos: 'Goalkeeper', age: 21, image: 'risser.jpg', stats: { averageRating: 0.0, goalsPrevented: 0.0, savesPerMatch: 0.0, minutes: 0 } }
  ],
  'ESP': [
    { id: 's1', name: 'Ferran Torres', pos: 'Attacker', age: 26, image: 'torres.jpg', stats: { averageRating: 6.46, goals: 1, assists: 1, ga: 2, shotsOnTargetPerMatch: 0.5, bigChancesCreated: 1, bigChancesMissed: 4, accuratePassesPerMatch: 8.3, keyPassesPerMatch: 0.3, xG: 2.32, minutes: 283, totalShots: 1.8 } },
    { id: 's2', name: 'Mikel Oyarzabal', pos: 'Attacker', age: 29, image: 'oyarzabal.jpg', stats: { averageRating: 7.14, goals: 5, assists: 1, ga: 6, shotsOnTargetPerMatch: 1.5, accuratePassesPerMatch: 15.8, keyPassesPerMatch: 0.8, bigChancesCreated: 1, bigChancesMissed: 1, xG: 4.00, minutes: 605, totalShots: 2.9 } },
    { id: 's3', name: 'Víctor Muñoz', pos: 'Attacker', age: 23, image: 'munoz.jpg', stats: { averageRating: 0.0, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, accuratePassesPerMatch: 0, keyPassesPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, xG: 0.0, minutes: 0, totalShots: 0.0 } },
    { id: 's4', name: 'Yéremy Pino', pos: 'Attacker', age: 23, image: 'pino.jpg', stats: { averageRating: 6.35, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, accuratePassesPerMatch: 12.0, keyPassesPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, xG: 0.0, minutes: 69, totalShots: 0.0 } },
    { id: 's5', name: 'Borja Iglesias', pos: 'Attacker', age: 33, image: 'iglesias.jpg', stats: { averageRating: 0.0, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, accuratePassesPerMatch: 0, keyPassesPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, xG: 0.0, minutes: 1, totalShots: 0.0 } },
    { id: 's6', name: 'Lamine Yamal', pos: 'Midfielder', age: 19, image: 'yamal.jpg', stats: { averageRating: 7.16, goals: 1, assists: 0, ga: 1, shotsOnTargetPerMatch: 1.5, accuratePassesPerMatch: 28.0, keyPassesPerMatch: 0.9, bigChancesCreated: 2, bigChancesMissed: 1, xG: 1.74, minutes: 615, totalShots: 3.4 } },
    { id: 's7', name: 'Pedri', pos: 'Midfielder', age: 23, image: 'pedri.jpg', stats: { averageRating: 7.23, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.3, accuratePassesPerMatch: 52.3, keyPassesPerMatch: 1.6, bigChancesCreated: 2, bigChancesMissed: 0, xG: 0.29, minutes: 499, totalShots: 0.6 } },
    { id: 's8', name: 'Pablo Gavi', pos: 'Midfielder', age: 21, image: 'gavi.jpg', stats: { averageRating: 6.65, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, accuratePassesPerMatch: 14.5, keyPassesPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, xG: 0.05, minutes: 82, totalShots: 0.5 } },
    { id: 's9', name: 'Dani Olmo', pos: 'Midfielder', age: 28, image: 'olmo.jpg', stats: { averageRating: 7.01, goals: 0, assists: 2, ga: 2, shotsOnTargetPerMatch: 0.3, accuratePassesPerMatch: 26.3, keyPassesPerMatch: 1.3, bigChancesCreated: 3, bigChancesMissed: 1, xG: 0.93, minutes: 495, totalShots: 1.6 } },
    { id: 's10', name: 'Rodri', pos: 'Midfielder', age: 30, image: 'rodri.jpg', stats: { averageRating: 7.76, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, accuratePassesPerMatch: 94.5, keyPassesPerMatch: 1.4, bigChancesCreated: 0, bigChancesMissed: 0, xG: 0.35, minutes: 726, totalShots: 0.9 } },
    { id: 's11', name: 'Nico Williams', pos: 'Midfielder', age: 24, image: 'williams.jpg', stats: { averageRating: 6.50, goals: 0, assists: 1, ga: 1, shotsOnTargetPerMatch: 0.3, accuratePassesPerMatch: 7.3, keyPassesPerMatch: 0.3, bigChancesCreated: 2, bigChancesMissed: 1, xG: 0.59, minutes: 121, totalShots: 0.7 } },
    { id: 's12', name: 'Mikel Merino', pos: 'Midfielder', age: 30, image: 'merino.jpg', stats: { averageRating: 6.88, goals: 2, assists: 0, ga: 2, shotsOnTargetPerMatch: 0.4, accuratePassesPerMatch: 11.3, keyPassesPerMatch: 0.6, bigChancesCreated: 1, bigChancesMissed: 1, xG: 1.65, minutes: 210, totalShots: 0.6 } },
    { id: 's13', name: 'Martín Zubimendi', pos: 'Midfielder', age: 27, image: 'zubimendi.jpg', stats: { averageRating: 7.0, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, accuratePassesPerMatch: 22.0, keyPassesPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, xG: 0.0, minutes: 21, totalShots: 0.0 } },
    { id: 's14', name: 'Fabián Ruiz', pos: 'Midfielder', age: 30, image: 'ruiz.jpg', stats: { averageRating: 6.91, goals: 1, assists: 0, ga: 1, shotsOnTargetPerMatch: 0.3, accuratePassesPerMatch: 33.0, keyPassesPerMatch: 0.9, bigChancesCreated: 1, bigChancesMissed: 2, xG: 0.90, minutes: 331, totalShots: 1.0 } },
    { id: 's15', name: 'Alejandro Grimaldo', pos: 'Midfielder', age: 30, image: 'grimaldo.jpg', stats: { averageRating: 0.0, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, accuratePassesPerMatch: 0, keyPassesPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, xG: 0.0, minutes: 0, totalShots: 0.0 } },
    { id: 's16', name: 'Alex Baena', pos: 'Midfielder', age: 24, image: 'baena.jpg', stats: { averageRating: 7.04, goals: 1, assists: 1, ga: 2, shotsOnTargetPerMatch: 0.7, accuratePassesPerMatch: 25.1, keyPassesPerMatch: 1.4, bigChancesCreated: 1, bigChancesMissed: 0, xG: 0.66, minutes: 487, totalShots: 1.7 } },
    { id: 's17', name: 'Pau Cubarsí', pos: 'Defender', age: 19, image: 'cubarsi.jpg', stats: { averageRating: 7.56, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 83.9, keyPassesPerMatch: 1.0, interceptionsPerMatch: 0.6, tacklesPerMatch: 1.0, minutes: 750 } },
    { id: 's18', name: 'Marc Cucurella', pos: 'Defender', age: 27, image: 'cucurella.jpg', stats: { averageRating: 7.09, goals: 0, assists: 2, ga: 2, accuratePassesPerMatch: 47.8, keyPassesPerMatch: 0.8, interceptionsPerMatch: 0.9, tacklesPerMatch: 1.0, minutes: 750 } },
    { id: 's19', name: 'Eric García', pos: 'Defender', age: 25, image: 'garcia.jpg', stats: { averageRating: 6.70, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 10.0, keyPassesPerMatch: 0.0, interceptionsPerMatch: 0.0, tacklesPerMatch: 0.0, minutes: 21 } },
    { id: 's20', name: 'Pedro Porro', pos: 'Defender', age: 26, image: 'porro.jpg', stats: { averageRating: 7.45, goals: 2, assists: 0, ga: 2, accuratePassesPerMatch: 53.8, keyPassesPerMatch: 1.8, interceptionsPerMatch: 1.3, tacklesPerMatch: 2.3, minutes: 564 } },
    { id: 's21', name: 'Aymeric Laporte', pos: 'Defender', age: 32, image: 'laporte.jpg', stats: { averageRating: 7.40, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 77.0, keyPassesPerMatch: 0.4, interceptionsPerMatch: 1.9, tacklesPerMatch: 0.6, minutes: 728 } },
    { id: 's22', name: 'Marcos Llorente', pos: 'Defender', age: 31, image: 'llorente.jpg', stats: { averageRating: 7.27, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 43.3, keyPassesPerMatch: 1.3, interceptionsPerMatch: 0.3, tacklesPerMatch: 2.3, minutes: 193 } },
    { id: 's23', name: 'Marc Pubill', pos: 'Defender', age: 23, image: 'pubill.jpg', stats: { averageRating: 0.0, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 2.0, keyPassesPerMatch: 0.0, interceptionsPerMatch: 0.0, tacklesPerMatch: 0.0, minutes: 1 } },
    { id: 's24', name: 'Joan García', pos: 'Goalkeeper', age: 25, image: 'garcia_gk.jpg', stats: { averageRating: 0.0, goalsPrevented: 0.0, savesPerMatch: 0.0, minutes: 0 } },
    { id: 's25', name: 'David Raya', pos: 'Goalkeeper', age: 30, image: 'raya.jpg', stats: { averageRating: 0.0, goalsPrevented: 0.0, savesPerMatch: 0.0, minutes: 0 } },
    { id: 's26', name: 'Unai Simón', pos: 'Goalkeeper', age: 29, image: 'simon.jpg', stats: { averageRating: 6.95, goalsPrevented: 0.68, savesPerMatch: 1.3, minutes: 750 } }
  ],
  'POR': [
    { id: 'p1', name: 'Cristiano Ronaldo', pos: 'Attacker', age: 41, image: 'ronaldo.jpg', stats: { averageRating: 7.02, goals: 3, assists: 0, ga: 3, shotsOnTargetPerMatch: 1.8, bigChancesCreated: 0, bigChancesMissed: 3, accuratePassesPerMatch: 17.0, keyPassesPerMatch: 0.2, xG: 3.30, minutes: 441, totalShots: 3.6 } },
    { id: 'p2', name: 'João Félix', pos: 'Attacker', age: 26, image: 'felix.jpg', stats: { averageRating: 6.67, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.3, bigChancesCreated: 0, bigChancesMissed: 3, accuratePassesPerMatch: 15.3, keyPassesPerMatch: 0.7, xG: 0.78, minutes: 204, totalShots: 2.0 } },
    { id: 'p3', name: 'Rafael Leão', pos: 'Attacker', age: 27, image: 'leao.jpg', stats: { averageRating: 6.88, goals: 1, assists: 1, ga: 2, shotsOnTargetPerMatch: 0.2, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 14.0, keyPassesPerMatch: 0.6, xG: 0.30, minutes: 161, totalShots: 0.8 } },
    { id: 'p4', name: 'Gonçalo Ramos', pos: 'Attacker', age: 25, image: 'ramos.jpg', stats: { averageRating: 7.25, goals: 1, assists: 0, ga: 1, shotsOnTargetPerMatch: 0.5, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 6.0, keyPassesPerMatch: 0.0, xG: 0.13, minutes: 39, totalShots: 1.0 } },
    { id: 'p5', name: 'Francisco Conceição', pos: 'Attacker', age: 23, image: 'conceicao.jpg', stats: { averageRating: 6.80, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 16.0, keyPassesPerMatch: 1.0, xG: 0.11, minutes: 133, totalShots: 0.5 } },
    { id: 'p6', name: 'Bruno Fernandes', pos: 'Midfielder', age: 31, image: 'fernandes.jpg', stats: { averageRating: 7.50, goals: 0, assists: 1, ga: 1, shotsOnTargetPerMatch: 0.6, bigChancesCreated: 2, bigChancesMissed: 1, accuratePassesPerMatch: 47.4, keyPassesPerMatch: 1.2, xG: 1.04, minutes: 423, totalShots: 1.8 } },
    { id: 'p7', name: 'Bernardo Silva', pos: 'Midfielder', age: 31, image: 'silva.jpg', stats: { averageRating: 6.38, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 1, accuratePassesPerMatch: 13.5, keyPassesPerMatch: 0.0, xG: 0.16, minutes: 103, totalShots: 0.3 } },
    { id: 'p8', name: 'Vitinha', pos: 'Midfielder', age: 26, image: 'vitinha.jpg', stats: { averageRating: 7.30, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 1, bigChancesMissed: 0, accuratePassesPerMatch: 76.0, keyPassesPerMatch: 0.4, xG: 0.10, minutes: 381, totalShots: 0.8 } },
    { id: 'p9', name: 'João Neves', pos: 'Midfielder', age: 21, image: 'neves_j.jpg', stats: { averageRating: 7.14, goals: 1, assists: 0, ga: 1, shotsOnTargetPerMatch: 0.2, bigChancesCreated: 0, bigChancesMissed: 1, accuratePassesPerMatch: 49.0, keyPassesPerMatch: 0.4, xG: 0.21, minutes: 391, totalShots: 0.6 } },
    { id: 'p10', name: 'Pedro Neto', pos: 'Midfielder', age: 26, image: 'neto.jpg', stats: { averageRating: 6.84, goals: 0, assists: 1, ga: 1, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 26.6, keyPassesPerMatch: 0.4, xG: 0.01, minutes: 352, totalShots: 0.2 } },
    { id: 'p11', name: 'Rúben Neves', pos: 'Midfielder', age: 29, image: 'neves_r.jpg', stats: { averageRating: 6.65, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 13.0, keyPassesPerMatch: 0.0, xG: 0.03, minutes: 54, totalShots: 1.0 } },
    { id: 'p12', name: 'Francisco Trincão', pos: 'Midfielder', age: 26, image: 'trincao.jpg', stats: { averageRating: 6.30, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 12.0, keyPassesPerMatch: 0.0, xG: 0.11, minutes: 27, totalShots: 1.0 } },
    { id: 'p13', name: 'Gonçalo Guedes', pos: 'Midfielder', age: 29, image: 'guedes.jpg', stats: { averageRating: 0.0, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 0, keyPassesPerMatch: 0.0, xG: 0.0, minutes: 0, totalShots: 0.0 } },
    { id: 'p14', name: 'Samú Costa', pos: 'Midfielder', age: 25, image: 'costa.jpg', stats: { averageRating: 7.00, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 11.0, keyPassesPerMatch: 0.0, xG: 0.0, minutes: 20, totalShots: 0.0 } },
    { id: 'p15', name: 'João Cancelo', pos: 'Defender', age: 32, image: 'cancelo.jpg', stats: { averageRating: 6.90, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 28.0, keyPassesPerMatch: 0.6, interceptionsPerMatch: 1.0, tacklesPerMatch: 1.4, minutes: 314 } },
    { id: 'p16', name: 'Nuno Mendes', pos: 'Defender', age: 24, image: 'mendes.jpg', stats: { averageRating: 7.48, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 44, keyPassesPerMatch: 2.2, interceptionsPerMatch: 0, tacklesPerMatch: 1.8, minutes: 397 } },
    { id: 'p17', name: 'Rúben Dias', pos: 'Defender', age: 29, image: 'dias.jpg', stats: { averageRating: 7.25, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 60.3, keyPassesPerMatch: 0.0, interceptionsPerMatch: 1.3, tacklesPerMatch: 1.3, minutes: 360 } },
    { id: 'p18', name: 'Diogo Dalot', pos: 'Defender', age: 27, image: 'dalot.jpg', stats: { averageRating: 6.85, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 14.5, keyPassesPerMatch: 0.5, interceptionsPerMatch: 0, tacklesPerMatch: 1.0, minutes: 64 } },
    { id: 'p19', name: 'Matheus Nunes', pos: 'Defender', age: 27, image: 'nunes.jpg', stats: { averageRating: 0.0, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 1.0, keyPassesPerMatch: 0.0, interceptionsPerMatch: 0.0, tacklesPerMatch: 0.0, minutes: 1 } },
    { id: 'p20', name: 'Renato Veiga', pos: 'Defender', age: 22, image: 'veiga.jpg', stats: { averageRating: 7.18, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 64.4, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.6, tacklesPerMatch: 0.8, minutes: 450 } },
    { id: 'p21', name: 'Nélson Semedo', pos: 'Defender', age: 32, image: 'semedo.jpg', stats: { averageRating: 6.55, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 18.8, keyPassesPerMatch: 0.3, interceptionsPerMatch: 0, tacklesPerMatch: 0, minutes: 124 } },
    { id: 'p22', name: 'Gonçalo Inácio', pos: 'Defender', age: 24, image: 'inacio.jpg', stats: { averageRating: 0.0, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 0, keyPassesPerMatch: 0.0, interceptionsPerMatch: 0.0, tacklesPerMatch: 0, minutes: 0 } },
    { id: 'p23', name: 'Tomás Araújo', pos: 'Defender', age: 24, image: 'araujo.jpg', stats: { averageRating: 6.90, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 98.0, keyPassesPerMatch: 1.0, interceptionsPerMatch: 1.0, tacklesPerMatch: 0, minutes: 90 } },
    { id: 'p24', name: 'Diogo Costa', pos: 'Goalkeeper', age: 26, image: 'costa_gk.jpg', stats: { averageRating: 7.46, goalsPrevented: 1.64, savesPerMatch: 3.8, minutes: 450 } },
    { id: 'p25', name: 'José Sá', pos: 'Goalkeeper', age: 33, image: 'sa.jpg', stats: { averageRating: 0.0, goalsPrevented: 0, savesPerMatch: 0, minutes: 0 } },
    { id: 'p26', name: 'Rui Silva', pos: 'Goalkeeper', age: 32, image: 'silva_gk.jpg', stats: { averageRating: 0.0, goalsPrevented: 0, savesPerMatch: 0, minutes: 0 } }
  ],
  'NOR': [
    { id: 'n1', name: 'Erling Haaland', pos: 'Attacker', age: 25, image: 'haaland.jpg', stats: { averageRating: 7.90, goals: 7, assists: 0, ga: 7, shotsOnTargetPerMatch: 2.6, bigChancesCreated: 1, bigChancesMissed: 5, accuratePassesPerMatch: 7.0, keyPassesPerMatch: 1.2, xG: 4.43, minutes: 465, totalShots: 4.0 } },
    { id: 'n2', name: 'Antonio Nusa', pos: 'Attacker', age: 21, image: 'nusa.jpg', stats: { averageRating: 6.62, goals: 1, assists: 0, ga: 1, shotsOnTargetPerMatch: 0.3, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 10.3, keyPassesPerMatch: 0.3, xG: 0.24, minutes: 325, totalShots: 1.0 } },
    { id: 'n3', name: 'Alexander Sørloth', pos: 'Attacker', age: 30, image: 'sorloth.jpg', stats: { averageRating: 6.44, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 1, bigChancesMissed: 1, accuratePassesPerMatch: 18.8, keyPassesPerMatch: 0.8, xG: 0.62, minutes: 341, totalShots: 1.0 } },
    { id: 'n4', name: 'Jens Petter Hauge', pos: 'Attacker', age: 26, image: 'hauge.jpg', stats: { averageRating: 6.30, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 2.0, keyPassesPerMatch: 0, xG: 0, minutes: 13, totalShots: 0.0 } },
    { id: 'n5', name: 'Jørgen Strand Larsen', pos: 'Attacker', age: 26, image: 'larsen.jpg', stats: { averageRating: 6.10, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.5, bigChancesCreated: 0, bigChancesMissed: 2, accuratePassesPerMatch: 9.5, keyPassesPerMatch: 1.0, xG: 1.04, minutes: 105, totalShots: 1.0 } },
    { id: 'n6', name: 'Martin Ødegaard', pos: 'Midfielder', age: 27, image: 'odegaard.jpg', stats: { averageRating: 6.94, goals: 0, assists: 4, ga: 4, shotsOnTargetPerMatch: 0.6, bigChancesCreated: 2, bigChancesMissed: 2, accuratePassesPerMatch: 63.4, keyPassesPerMatch: 1.2, xG: 1.32, minutes: 471, totalShots: 1.8 } },
    { id: 'n7', name: 'Oscar Bobb', pos: 'Midfielder', age: 23, image: 'bobb.jpg', stats: { averageRating: 6.78, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.3, bigChancesCreated: 0, bigChancesMissed: 1, accuratePassesPerMatch: 16.5, keyPassesPerMatch: 0.7, xG: 0.55, minutes: 233, totalShots: 0.7 } },
    { id: 'n8', name: 'Andreas Schjelderup', pos: 'Midfielder', age: 22, image: 'schjelderup.jpg', stats: { averageRating: 7.07, goals: 1, assists: 3, ga: 4, shotsOnTargetPerMatch: 0.3, bigChancesCreated: 2, bigChancesMissed: 0, accuratePassesPerMatch: 14.2, keyPassesPerMatch: 0.8, xG: 0.17, minutes: 251, totalShots: 0.5 } },
    { id: 'n9', name: 'Fredrik Aursnes', pos: 'Midfielder', age: 30, image: 'aursnes.jpg', stats: { averageRating: 6.72, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 2, bigChancesMissed: 0, accuratePassesPerMatch: 24.7, keyPassesPerMatch: 0.5, xG: 0.07, minutes: 310, totalShots: 0.3 } },
    { id: 'n10', name: 'Julian Ryerson', pos: 'Midfielder', age: 28, image: 'ryerson.jpg', stats: { averageRating: 6.88, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 1, bigChancesMissed: 0, accuratePassesPerMatch: 28.3, keyPassesPerMatch: 1.5, xG: 0.0, minutes: 226, totalShots: 0.0 } },
    { id: 'n11', name: 'Thelo Aasgaard', pos: 'Midfielder', age: 24, image: 'aasgaard.jpg', stats: { averageRating: 7.90, goals: 1, assists: 0, ga: 1, shotsOnTargetPerMatch: 1.0, bigChancesCreated: 1, bigChancesMissed: 0, accuratePassesPerMatch: 35.0, keyPassesPerMatch: 1.0, xG: 0.14, minutes: 90, totalShots: 2.0 } },
    { id: 'n12', name: 'Patrick Berg', pos: 'Midfielder', age: 28, image: 'berg.jpg', stats: { averageRating: 6.92, goals: 0, assists: 2, ga: 2, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 3, bigChancesMissed: 0, accuratePassesPerMatch: 26.7, keyPassesPerMatch: 0.7, xG: 0.14, minutes: 444, totalShots: 0.5 } },
    { id: 'n13', name: 'Sander Berge', pos: 'Midfielder', age: 28, image: 'berge.jpg', stats: { averageRating: 6.90, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 81.8, keyPassesPerMatch: 0.4, xG: 0.0, minutes: 480, totalShots: 0.0 } },
    { id: 'n14', name: 'Kristian Thorstvedt', pos: 'Midfielder', age: 27, image: 'thorstvedt.jpg', stats: { averageRating: 6.60, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.5, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 9.0, keyPassesPerMatch: 0.0, xG: 0.19, minutes: 62, totalShots: 1.5 } },
    { id: 'n15', name: 'Marcus Pedersen', pos: 'Midfielder', age: 25, image: 'pedersen.jpg', stats: { averageRating: 6.50, goals: 1, assists: 0, ga: 1, shotsOnTargetPerMatch: 0.3, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 18.0, keyPassesPerMatch: 0.5, xG: 0.13, minutes: 236, totalShots: 0.3 } },
    { id: 'n16', name: 'Morten Thorsby', pos: 'Midfielder', age: 30, image: 'thorsby.jpg', stats: { averageRating: 6.30, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 18.0, keyPassesPerMatch: 0, xG: 0, minutes: 45, totalShots: 0.0 } },
    { id: 'n17', name: 'Kristoffer Ajer', pos: 'Defender', age: 28, image: 'ajer.jpg', stats: { averageRating: 6.84, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 51.6, keyPassesPerMatch: 0.2, interceptionsPerMatch: 0.8, tacklesPerMatch: 1.8, minutes: 480 } },
    { id: 'n18', name: 'Leo Østigård', pos: 'Defender', age: 26, image: 'ostigard.jpg', stats: { averageRating: 6.55, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 17.2, keyPassesPerMatch: 0.0, interceptionsPerMatch: 0.2, tacklesPerMatch: 0.6, minutes: 155 } },
    { id: 'n19', name: 'David Møller Wolfe', pos: 'Defender', age: 24, image: 'wolfe.jpg', stats: { averageRating: 6.76, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 27.8, keyPassesPerMatch: 0.2, interceptionsPerMatch: 0.6, tacklesPerMatch: 1.0, minutes: 431 } },
    { id: 'n20', name: 'Torbjørn Heggem', pos: 'Defender', age: 27, image: 'heggem.jpg', stats: { averageRating: 6.74, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 56.6, keyPassesPerMatch: 0.0, interceptionsPerMatch: 0.4, tacklesPerMatch: 1.6, minutes: 444 } },
    { id: 'n21', name: 'Fredrik André Bjørkan', pos: 'Defender', age: 27, image: 'bjorkan.jpg', stats: { averageRating: 6.00, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 17.0, keyPassesPerMatch: 1.0, interceptionsPerMatch: 2.0, tacklesPerMatch: 1.0, minutes: 45 } },
    { id: 'n22', name: 'Henrik Sælebakke Falchener', pos: 'Defender', age: 23, image: 'falchener.jpg', stats: { averageRating: 5.60, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 19, keyPassesPerMatch: 0.0, interceptionsPerMatch: 0.0, tacklesPerMatch: 0.0, minutes: 66 } },
    { id: 'n23', name: 'Sondre Langås', pos: 'Defender', age: 25, image: 'langas.jpg', stats: { averageRating: 6.30, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 9.0, keyPassesPerMatch: 0.0, interceptionsPerMatch: 0.0, tacklesPerMatch: 0.0, minutes: 24 } },
    { id: 'n24', name: 'Ørjan Nyland', pos: 'Goalkeeper', age: 35, image: 'nyland.jpg', stats: { averageRating: 7.32, goalsPrevented: 0.74, savesPerMatch: 3.2, minutes: 480 } },
    { id: 'n25', name: 'Sander Tangvik', pos: 'Goalkeeper', age: 23, image: 'tangvik.jpg', stats: { averageRating: 0.0, goalsPrevented: 0.0, savesPerMatch: 0, minutes: 0 } },
    { id: 'n26', name: 'Egil Selvik', pos: 'Goalkeeper', age: 28, image: 'selvik.jpg', stats: { averageRating: 6.70, goalsPrevented: -1.0, savesPerMatch: 5.0, minutes: 90 } }
  ],
  'BEL': [
    { id: 'b1', name: 'Romelu Lukaku', pos: 'Attacker', age: 33, image: 'lukaku.jpg', stats: { averageRating: 6.82, goals: 3, assists: 1, ga: 4, shotsOnTargetPerMatch: 0.5, bigChancesCreated: 0, bigChancesMissed: 1, accuratePassesPerMatch: 5.7, keyPassesPerMatch: 0.5, xG: 1.01, minutes: 236, totalShots: 1.0 } },
    { id: 'b2', name: 'Leandro Trossard', pos: 'Attacker', age: 31, image: 'trossard.jpg', stats: { averageRating: 7.52, goals: 2, assists: 2, ga: 4, shotsOnTargetPerMatch: 0.5, bigChancesCreated: 3, bigChancesMissed: 1, accuratePassesPerMatch: 28.3, keyPassesPerMatch: 2.8, xG: 1.75, minutes: 510, totalShots: 2.8 } },
    { id: 'b3', name: 'Charles De Ketelaere', pos: 'Attacker', age: 25, image: 'deketelaere.jpg', stats: { averageRating: 7.12, goals: 3, assists: 1, ga: 4, shotsOnTargetPerMatch: 1.0, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 14.8, keyPassesPerMatch: 1.2, xG: 1.48, minutes: 353, totalShots: 1.2 } },
    { id: 'b4', name: 'Matías Fernández-Pardo', pos: 'Attacker', age: 21, image: 'fernandezpardo.jpg', stats: { averageRating: 6.60, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 1, accuratePassesPerMatch: 4.3, keyPassesPerMatch: 1.3, xG: 0.34, minutes: 53, totalShots: 1.0 } },
    { id: 'b5', name: 'Kevin De Bruyne', pos: 'Midfielder', age: 35, image: 'debruyne.jpg', stats: { averageRating: 7.22, goals: 1, assists: 0, ga: 1, shotsOnTargetPerMatch: 1.0, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 30.0, keyPassesPerMatch: 2.0, xG: 1.28, minutes: 387, totalShots: 4.0 } },
    { id: 'b6', name: 'Jérémy Doku', pos: 'Midfielder', age: 24, image: 'doku.jpg', stats: { averageRating: 6.80, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.2, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 14.8, keyPassesPerMatch: 1.0, xG: 0.26, minutes: 311, totalShots: 0.6 } },
    { id: 'b7', name: 'Youri Tielemans', pos: 'Midfielder', age: 29, image: 'tielemans.jpg', stats: { averageRating: 7.44, goals: 2, assists: 0, ga: 2, shotsOnTargetPerMatch: 0.6, bigChancesCreated: 1, bigChancesMissed: 1, accuratePassesPerMatch: 44.6, keyPassesPerMatch: 1.6, xG: 1.46, minutes: 475, totalShots: 2.2 } },
    { id: 'b8', name: 'Axel Witsel', pos: 'Midfielder', age: 37, image: 'witsel.jpg', stats: { averageRating: 6.40, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 4.0, keyPassesPerMatch: 0.0, xG: 0.0, minutes: 31, totalShots: 0.0 } },
    { id: 'b9', name: 'Amadou Onana', pos: 'Midfielder', age: 24, image: 'onana.jpg', stats: { averageRating: 6.73, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 14.5, keyPassesPerMatch: 0.0, xG: 0.05, minutes: 106, totalShots: 0.5 } },
    { id: 'b10', name: 'Alexis Saelemaekers', pos: 'Midfielder', age: 27, image: 'saelemaekers.jpg', stats: { averageRating: 7.03, goals: 1, assists: 0, ga: 1, shotsOnTargetPerMatch: 0.3, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 8.0, keyPassesPerMatch: 0.0, xG: 0.18, minutes: 89, totalShots: 1.0 } },
    { id: 'b11', name: 'Diego Moreira', pos: 'Midfielder', age: 21, image: 'moreira.jpg', stats: { averageRating: 6.90, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 10.0, keyPassesPerMatch: 0.0, xG: 0.0, minutes: 57, totalShots: 0.0 } },
    { id: 'b12', name: 'Dodi Lukebakio', pos: 'Midfielder', age: 28, image: 'lukebakio.jpg', stats: { averageRating: 6.83, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.3, bigChancesCreated: 0, bigChancesMissed: 1, accuratePassesPerMatch: 15.3, keyPassesPerMatch: 0.3, xG: 0.38, minutes: 163, totalShots: 2.3 } },
    { id: 'b13', name: 'Hans Vanaken', pos: 'Midfielder', age: 33, image: 'vanaken.jpg', stats: { averageRating: 6.83, goals: 1, assists: 2, ga: 3, shotsOnTargetPerMatch: 0.2, bigChancesCreated: 1, bigChancesMissed: 0, accuratePassesPerMatch: 25.8, keyPassesPerMatch: 1.3, xG: 0.39, minutes: 324, totalShots: 0.8 } },
    { id: 'b14', name: 'Nicolas Raskin', pos: 'Midfielder', age: 25, image: 'raskin.jpg', stats: { averageRating: 7.17, goals: 0, assists: 2, ga: 2, shotsOnTargetPerMatch: 0.2, bigChancesCreated: 3, bigChancesMissed: 0, accuratePassesPerMatch: 32.3, keyPassesPerMatch: 0.7, xG: 0.13, minutes: 346, totalShots: 0.3 } },
    { id: 'b15', name: 'Maxim De Cuyper', pos: 'Defender', age: 25, image: 'decuyper.jpg', stats: { averageRating: 6.72, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 30.2, keyPassesPerMatch: 0.8, interceptionsPerMatch: 1.0, tacklesPerMatch: 1.0, minutes: 443 } },
    { id: 'b16', name: 'Koni De Winter', pos: 'Defender', age: 24, image: 'dewinter.jpg', stats: { averageRating: 0, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 0, keyPassesPerMatch: 0, interceptionsPerMatch: 0, tacklesPerMatch: 0, minutes: 0 } },
    { id: 'b17', name: 'Zeno Debast', pos: 'Defender', age: 22, image: 'debast.jpg', stats: { averageRating: 0, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 0, keyPassesPerMatch: 0, interceptionsPerMatch: 0, tacklesPerMatch: 0, minutes: 0 } },
    { id: 'b18', name: 'Nathan Ngoy', pos: 'Defender', age: 23, image: 'ngoy.jpg', stats: { averageRating: 6.83, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 51.8, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.5, tacklesPerMatch: 1.8, minutes: 336 } },
    { id: 'b19', name: 'Thomas Meunier', pos: 'Defender', age: 34, image: 'meunier.jpg', stats: { averageRating: 6.70, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 30, keyPassesPerMatch: 1.0, interceptionsPerMatch: 0.7, tacklesPerMatch: 1.0, minutes: 190 } },
    { id: 'b20', name: 'Timothy Castagne', pos: 'Defender', age: 30, image: 'castagne.jpg', stats: { averageRating: 6.97, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 32, keyPassesPerMatch: 1.3, interceptionsPerMatch: 1.3, tacklesPerMatch: 2.3, minutes: 478 } },
    { id: 'b21', name: 'Arthur Theate', pos: 'Defender', age: 26, image: 'theate.jpg', stats: { averageRating: 6.87, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 51.3, keyPassesPerMatch: 0.7, interceptionsPerMatch: 1.0, tacklesPerMatch: 0.3, minutes: 227 } },
    { id: 'b22', name: 'Joaquin Seys', pos: 'Defender', age: 21, image: 'seys.jpg', stats: { averageRating: 6.50, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 5.0, keyPassesPerMatch: 0.0, interceptionsPerMatch: 0.0, tacklesPerMatch: 1.0, minutes: 29 } },
    { id: 'b23', name: 'Brandon Mechele', pos: 'Defender', age: 33, image: 'mechele.jpg', stats: { averageRating: 6.97, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 62.0, keyPassesPerMatch: 0.3, interceptionsPerMatch: 0.7, tacklesPerMatch: 1.2, minutes: 570 } },
    { id: 'b24', name: 'Thibaut Courtois', pos: 'Goalkeeper', age: 34, image: 'courtois.jpg', stats: { averageRating: 7.07, goalsPrevented: -0.44, savesPerMatch: 2.3, minutes: 551 } },
    { id: 'b25', name: 'Senne Lammens', pos: 'Goalkeeper', age: 24, image: 'lammens.jpg', stats: { averageRating: 6.10, goalsPrevented: 0.11, savesPerMatch: 2.0, minutes: 19 } },
    { id: 'b26', name: 'Mike Penders', pos: 'Goalkeeper', age: 20, image: 'penders.jpg', stats: { averageRating: 0, goalsPrevented: 0, savesPerMatch: 0, minutes: 0 } }
  ],
  'SUI': [
    { id: 'sui1', name: 'Noah Okafor', pos: 'Attacker', age: 26, image: 'okafor.jpg', stats: { averageRating: 6.90, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 7.0, keyPassesPerMatch: 0.0, xG: 0.08, minutes: 19, totalShots: 1.0 } },
    { id: 'sui2', name: 'Breel Embolo', pos: 'Attacker', age: 29, image: 'embolo.jpg', stats: { averageRating: 6.85, goals: 2, assists: 2, ga: 4, shotsOnTargetPerMatch: 0.8, bigChancesCreated: 3, bigChancesMissed: 2, accuratePassesPerMatch: 9.0, keyPassesPerMatch: 1.3, xG: 3.04, minutes: 506, totalShots: 1.7 } },
    { id: 'sui3', name: 'Zeki Amdouni', pos: 'Attacker', age: 25, image: 'amdouni.jpg', stats: { averageRating: 6.63, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 2.3, keyPassesPerMatch: 0.5, xG: 0.02, minutes: 76, totalShots: 0.3 } },
    { id: 'sui4', name: 'Cédric Itten', pos: 'Attacker', age: 29, image: 'itten.jpg', stats: { averageRating: 6.70, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 0.7, keyPassesPerMatch: 0.0, xG: 0.0, minutes: 54, totalShots: 0.0 } },
    { id: 'sui5', name: 'Granit Xhaka', pos: 'Midfielder', age: 33, image: 'xhaka.jpg', stats: { averageRating: 7.52, goals: 1, assists: 0, ga: 1, shotsOnTargetPerMatch: 0.3, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 71.7, keyPassesPerMatch: 0.7, xG: 0.99, minutes: 600, totalShots: 1.5 } },
    { id: 'sui6', name: 'Dan Ndoye', pos: 'Midfielder', age: 25, image: 'ndoye.jpg', stats: { averageRating: 7.03, goals: 2, assists: 0, ga: 2, shotsOnTargetPerMatch: 1.3, bigChancesCreated: 0, bigChancesMissed: 2, accuratePassesPerMatch: 11.7, keyPassesPerMatch: 0.3, xG: 0.86, minutes: 408, totalShots: 2.7 } },
    { id: 'sui7', name: 'Rubén Vargas', pos: 'Midfielder', age: 27, image: 'vargas.jpg', stats: { averageRating: 7.37, goals: 2, assists: 1, ga: 3, shotsOnTargetPerMatch: 0.7, bigChancesCreated: 1, bigChancesMissed: 2, accuratePassesPerMatch: 10.7, keyPassesPerMatch: 1.5, xG: 0.99, minutes: 289, totalShots: 1.0 } },
    { id: 'sui8', name: 'Denis Zakaria', pos: 'Midfielder', age: 29, image: 'zakaria.jpg', stats: { averageRating: 6.70, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.5, bigChancesCreated: 1, bigChancesMissed: 0, accuratePassesPerMatch: 34.5, keyPassesPerMatch: 0.5, xG: 0.66, minutes: 360, totalShots: 1.3 } },
    { id: 'sui9', name: 'Remo Freuler', pos: 'Midfielder', age: 34, image: 'freuler.jpg', stats: { averageRating: 6.82, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.2, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 50.2, keyPassesPerMatch: 0.5, xG: 0.06, minutes: 594, totalShots: 0.3 } },
    { id: 'sui10', name: 'Fabian Rieder', pos: 'Midfielder', age: 24, image: 'rieder.jpg', stats: { averageRating: 6.52, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.4, bigChancesCreated: 2, bigChancesMissed: 1, accuratePassesPerMatch: 13.4, keyPassesPerMatch: 0.6, xG: 0.98, minutes: 304, totalShots: 1.4 } },
    { id: 'sui11', name: 'Michel Aebischer', pos: 'Midfielder', age: 29, image: 'aebischer.jpg', stats: { averageRating: 6.78, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.3, bigChancesCreated: 0, bigChancesMissed: 1, accuratePassesPerMatch: 16.3, keyPassesPerMatch: 1.0, xG: 0.36, minutes: 162, totalShots: 0.5 } },
    { id: 'sui12', name: 'Ardon Jashari', pos: 'Midfielder', age: 23, image: 'jashari.jpg', stats: { averageRating: 6.33, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 8.0, keyPassesPerMatch: 0.7, xG: 0.03, minutes: 78, totalShots: 0.7 } },
    { id: 'sui13', name: 'Djibril Sow', pos: 'Midfielder', age: 29, image: 'sow.jpg', stats: { averageRating: 6.63, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.3, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 19.8, keyPassesPerMatch: 0.5, xG: 0.21, minutes: 254, totalShots: 0.5 } },
    { id: 'sui14', name: 'Johan Manzambi', pos: 'Midfielder', age: 20, image: 'manzambi.jpg', stats: { averageRating: 7.60, goals: 3, assists: 2, ga: 5, shotsOnTargetPerMatch: 0.8, bigChancesCreated: 3, bigChancesMissed: 1, accuratePassesPerMatch: 10.8, keyPassesPerMatch: 0.8, xG: 0.77, minutes: 200, totalShots: 1.5 } },
    { id: 'sui15', name: 'Miro Muheim', pos: 'Midfielder', age: 28, image: 'muheim.jpg', stats: { averageRating: 6.23, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 7.3, keyPassesPerMatch: 0.0, xG: 0, minutes: 92, totalShots: 0 } },
    { id: 'sui16', name: 'Silvan Widmer', pos: 'Midfielder', age: 33, image: 'widmer.jpg', stats: { averageRating: 6.46, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 9.0, keyPassesPerMatch: 0.0, xG: 0, minutes: 179, totalShots: 0 } },
    { id: 'sui17', name: 'Christian Fassnacht', pos: 'Midfielder', age: 32, image: 'fassnacht.jpg', stats: { averageRating: 6.60, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 5.0, keyPassesPerMatch: 0, xG: 0, minutes: 12, totalShots: 0 } },
    { id: 'sui18', name: 'Nicolas Raskin', pos: 'Midfielder', age: 25, image: 'raskin_sui.jpg', stats: { averageRating: 7.17, goals: 0, assists: 2, ga: 2, shotsOnTargetPerMatch: 0.2, bigChancesCreated: 3, bigChancesMissed: 0, accuratePassesPerMatch: 32.3, keyPassesPerMatch: 0.7, xG: 0.13, minutes: 346, totalShots: 0.3 } },
    { id: 'sui19', name: 'Manuel Akanji', pos: 'Defender', age: 30, image: 'akanji.jpg', stats: { averageRating: 7.07, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 76.0, keyPassesPerMatch: 0.7, interceptionsPerMatch: 1.0, tacklesPerMatch: 1.5, minutes: 600 } },
    { id: 'sui20', name: 'Ricardo Rodríguez', pos: 'Defender', age: 33, image: 'rodriguez.jpg', stats: { averageRating: 7.02, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 37.2, keyPassesPerMatch: 1.2, interceptionsPerMatch: 0.7, tacklesPerMatch: 1.8, minutes: 519 } },
    { id: 'sui21', name: 'Nico Elvedi', pos: 'Defender', age: 29, image: 'elvedi.jpg', stats: { averageRating: 7.03, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 68.5, keyPassesPerMatch: 0.7, interceptionsPerMatch: 0.8, tacklesPerMatch: 0.7, minutes: 600 } },
    { id: 'sui22', name: 'Aurèle Amenda', pos: 'Defender', age: 22, image: 'amenda.jpg', stats: { averageRating: 6.90, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 52.0, keyPassesPerMatch: 1.0, interceptionsPerMatch: 0, tacklesPerMatch: 4.0, minutes: 90 } },
    { id: 'sui23', name: 'Eray Cömert', pos: 'Defender', age: 28, image: 'comert.jpg', stats: { averageRating: 6.20, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 5.0, keyPassesPerMatch: 0, interceptionsPerMatch: 0, tacklesPerMatch: 1.0, minutes: 31 } },
    { id: 'sui24', name: 'Luca Jaquez', pos: 'Defender', age: 23, image: 'jaquez.jpg', stats: { averageRating: 6.60, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 14.0, keyPassesPerMatch: 0, interceptionsPerMatch: 0.5, tacklesPerMatch: 1.0, minutes: 86 } },
    { id: 'sui25', name: 'Gregor Kobel', pos: 'Goalkeeper', age: 28, image: 'kobel.jpg', stats: { averageRating: 7.52, goalsPrevented: 2.27, savesPerMatch: 3.3, minutes: 600 } },
    { id: 'sui26', name: 'Yvon Mvogo', pos: 'Goalkeeper', age: 32, image: 'mvogo.jpg', stats: { averageRating: 0, goalsPrevented: 0, savesPerMatch: 0, minutes: 0 } },
    { id: 'sui27', name: 'Marvin Keller', pos: 'Goalkeeper', age: 24, image: 'keller.jpg', stats: { averageRating: 0, goalsPrevented: 0, savesPerMatch: 0, minutes: 0 } }
  ],
  'MAR': [
    { id: 'm1', name: 'Ayoub El Kaabi', pos: 'Attacker', age: 33, image: 'elkaabi.jpg', stats: { averageRating: 6.30, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 2.0, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 7.0, keyPassesPerMatch: 0.0, xG: 0.17, minutes: 70, totalShots: 3.0 } },
    { id: 'm2', name: 'Soufiane Rahimi', pos: 'Attacker', age: 30, image: 'rahimi.jpg', stats: { averageRating: 7.02, goals: 2, assists: 1, ga: 3, shotsOnTargetPerMatch: 0.7, bigChancesCreated: 1, bigChancesMissed: 2, accuratePassesPerMatch: 5.0, keyPassesPerMatch: 0.2, xG: 1.45, minutes: 175, totalShots: 1.0 } },
    { id: 'm3', name: 'Ayoube Amaimouni Echghouyab', pos: 'Attacker', age: 21, image: 'echghouyab.jpg', stats: { averageRating: 6.55, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.5, bigChancesCreated: 0, bigChancesMissed: 1, accuratePassesPerMatch: 3.5, keyPassesPerMatch: 0.0, xG: 0.24, minutes: 23, totalShots: 1.0 } },
    { id: 'm4', name: 'Gessime Yassine', pos: 'Attacker', age: 20, image: 'yassine.jpg', stats: { averageRating: 6.93, goals: 1, assists: 0, ga: 1, shotsOnTargetPerMatch: 0.3, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 10.7, keyPassesPerMatch: 0.0, xG: 0.92, minutes: 77, totalShots: 0.7 } },
    { id: 'm5', name: 'Chemsdine Talbi', pos: 'Attacker', age: 21, image: 'talbi.jpg', stats: { averageRating: 6.70, goals: 0, assists: 1, ga: 1, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 1, bigChancesMissed: 0, accuratePassesPerMatch: 9.4, keyPassesPerMatch: 0.6, xG: 0.05, minutes: 183, totalShots: 0.4 } },
    { id: 'm6', name: 'Amine Sbai', pos: 'Attacker', age: 25, image: 'sbai.jpg', stats: { averageRating: 6.30, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 3.0, keyPassesPerMatch: 0.0, xG: 0, minutes: 12, totalShots: 0 } },
    { id: 'm7', name: 'Brahim Díaz', pos: 'Midfielder', age: 26, image: 'diaz.jpg', stats: { averageRating: 6.82, goals: 0, assists: 4, ga: 4, shotsOnTargetPerMatch: 0.2, bigChancesCreated: 3, bigChancesMissed: 1, accuratePassesPerMatch: 23.5, keyPassesPerMatch: 1.3, xG: 0.41, minutes: 462, totalShots: 1.0 } },
    { id: 'm8', name: 'Ismael Saibari', pos: 'Midfielder', age: 25, image: 'saibari.jpg', stats: { averageRating: 7.16, goals: 3, assists: 0, ga: 3, shotsOnTargetPerMatch: 0.6, bigChancesCreated: 2, bigChancesMissed: 3, accuratePassesPerMatch: 16.6, keyPassesPerMatch: 0.8, xG: 1.74, minutes: 385, totalShots: 2.0 } },
    { id: 'm9', name: 'Azzedine Ounahi', pos: 'Midfielder', age: 26, image: 'ounahi.jpg', stats: { averageRating: 7.15, goals: 2, assists: 0, ga: 2, shotsOnTargetPerMatch: 0.5, bigChancesCreated: 3, bigChancesMissed: 0, accuratePassesPerMatch: 46.5, keyPassesPerMatch: 1.5, xG: 0.30, minutes: 437, totalShots: 0.8 } },
    { id: 'm10', name: 'Bilal El Khannouss', pos: 'Midfielder', age: 22, image: 'elkhannouss.jpg', stats: { averageRating: 6.88, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.7, bigChancesCreated: 1, bigChancesMissed: 1, accuratePassesPerMatch: 30.3, keyPassesPerMatch: 1.2, xG: 0.30, minutes: 466, totalShots: 1.0 } },
    { id: 'm11', name: 'Sofyan Amrabat', pos: 'Midfielder', age: 29, image: 'amrabat.jpg', stats: { averageRating: 6.60, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 33.0, keyPassesPerMatch: 0.3, xG: 0, minutes: 145, totalShots: 0 } },
    { id: 'm12', name: 'Neil El Aynaoui', pos: 'Midfielder', age: 25, image: 'elaynaoui.jpg', stats: { averageRating: 6.80, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.3, bigChancesCreated: 0, bigChancesMissed: 1, accuratePassesPerMatch: 68.0, keyPassesPerMatch: 0.5, xG: 0.50, minutes: 563, totalShots: 1.2 } },
    { id: 'm13', name: 'Samir El Mourabet', pos: 'Midfielder', age: 20, image: 'elmourabet.jpg', stats: { averageRating: 6.73, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 7.0, keyPassesPerMatch: 0.0, xG: 0.08, minutes: 19, totalShots: 1.0 } },
    { id: 'm14', name: 'Ayyoub Bouaddi', pos: 'Midfielder', age: 18, image: 'bouaddi.jpg', stats: { averageRating: 6.90, goals: 0, assists: 0, ga: 0, shotsOnTargetPerMatch: 0.0, bigChancesCreated: 0, bigChancesMissed: 0, accuratePassesPerMatch: 7.0, keyPassesPerMatch: 0.0, xG: 0.08, minutes: 19, totalShots: 1.0 } },
    { id: 'm15', name: 'Achraf Hakimi', pos: 'Defender', age: 27, image: 'hakimi.jpg', stats: { averageRating: 7.6, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 45, keyPassesPerMatch: 1.5, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.8, minutes: 520 } },
    { id: 'm16', name: 'Noussair Mazraoui', pos: 'Defender', age: 28, image: 'mazraoui.jpg', stats: { averageRating: 7.2, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 42, keyPassesPerMatch: 1.0, interceptionsPerMatch: 1.4, tacklesPerMatch: 1.5, minutes: 480 } },
    { id: 'm17', name: 'Issa Diop', pos: 'Defender', age: 29, image: 'diop.jpg', stats: { averageRating: 7.0, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 38, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.5, tacklesPerMatch: 1.2, minutes: 400 } },
    { id: 'm18', name: 'Chadi Riad', pos: 'Defender', age: 23, image: 'riad.jpg', stats: { averageRating: 7.1, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 40, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.6, tacklesPerMatch: 1.3, minutes: 450 } },
    { id: 'm19', name: 'Anass Salah-Eddine', pos: 'Defender', age: 24, image: 'salaheddine.jpg', stats: { averageRating: 6.9, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 35, keyPassesPerMatch: 0.6, interceptionsPerMatch: 1.2, tacklesPerMatch: 1.1, minutes: 300 } },
    { id: 'm20', name: 'Redouane Halhal', pos: 'Defender', age: 23, image: 'halhal.jpg', stats: { averageRating: 6.7, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 30, keyPassesPerMatch: 0.1, interceptionsPerMatch: 1.0, tacklesPerMatch: 1.0, minutes: 250 } },
    { id: 'm21', name: 'Youssef Belammari', pos: 'Defender', age: 27, image: 'belammari.jpg', stats: { averageRating: 6.8, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 32, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.1, tacklesPerMatch: 1.1, minutes: 280 } },
    { id: 'm22', name: 'Zakaria El Ouahdi', pos: 'Defender', age: 24, image: 'elouahdi.jpg', stats: { averageRating: 6.7, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 33, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.0, tacklesPerMatch: 1.0, minutes: 200 } },
    { id: 'm23', name: 'Marwane Saadane', pos: 'Defender', age: 34, image: 'saadane.jpg', stats: { averageRating: 6.6, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 30, keyPassesPerMatch: 0.1, interceptionsPerMatch: 0.9, tacklesPerMatch: 0.9, minutes: 150 } },
    { id: 'm24', name: 'Yassine Bounou', pos: 'Goalkeeper', age: 35, image: 'bounou.jpg', stats: { averageRating: 7.5, goalsPrevented: 3.2, savesPerMatch: 3.8, minutes: 540 } },
    { id: 'm25', name: 'Munir El Kajoui', pos: 'Goalkeeper', age: 37, image: 'elkajoui.jpg', stats: { averageRating: 6.8, goalsPrevented: 1.5, savesPerMatch: 2.5, minutes: 0 } },
    { id: 'm26', name: 'Ahmed Reda Tagnaouti', pos: 'Goalkeeper', age: 30, image: 'tagnaouti.jpg', stats: { averageRating: 6.7, goalsPrevented: 1.2, savesPerMatch: 2.0, minutes: 0 } }
  ],
  'BRA': [
    { id: 'br1', name: 'Vinícius Júnior', pos: 'Attacker', age: 26, image: 'vinicius.jpg', stats: { averageRating: 7.8, goals: 4, assists: 3, ga: 7, shotsOnTargetPerMatch: 1.8, accuratePassesPerMatch: 32, keyPassesPerMatch: 1.8, minutes: 520, totalShots: 22 } },
    { id: 'br2', name: 'Neymar', pos: 'Attacker', age: 34, image: 'neymar.jpg', stats: { averageRating: 7.6, goals: 3, assists: 4, ga: 7, shotsOnTargetPerMatch: 1.5, accuratePassesPerMatch: 38, keyPassesPerMatch: 2.4, minutes: 450, totalShots: 18 } },
    { id: 'br3', name: 'Endrick', pos: 'Attacker', age: 19, image: 'endrick.jpg', stats: { averageRating: 7.1, goals: 3, assists: 1, ga: 4, shotsOnTargetPerMatch: 1.3, accuratePassesPerMatch: 18, keyPassesPerMatch: 0.7, minutes: 320, totalShots: 14 } },
    { id: 'br4', name: 'Matheus Cunha', pos: 'Attacker', age: 27, image: 'cunha.jpg', stats: { averageRating: 7.2, goals: 2, assists: 2, ga: 4, shotsOnTargetPerMatch: 1.2, accuratePassesPerMatch: 25, keyPassesPerMatch: 1.3, minutes: 380, totalShots: 15 } },
    { id: 'br5', name: 'Gabriel Martinelli', pos: 'Attacker', age: 25, image: 'martinelli.jpg', stats: { averageRating: 7.0, goals: 2, assists: 2, ga: 4, shotsOnTargetPerMatch: 1.1, accuratePassesPerMatch: 26, keyPassesPerMatch: 1.2, minutes: 340, totalShots: 13 } },
    { id: 'br6', name: 'Igor Thiago', pos: 'Attacker', age: 25, image: 'igorthiago.jpg', stats: { averageRating: 6.8, goals: 1, assists: 0, ga: 1, shotsOnTargetPerMatch: 0.9, accuratePassesPerMatch: 15, keyPassesPerMatch: 0.4, minutes: 180, totalShots: 8 } },
    { id: 'br7', name: 'Raphinha', pos: 'Midfielder', age: 29, image: 'raphinha.jpg', stats: { averageRating: 7.7, goals: 3, assists: 4, ga: 7, accuratePassesPerMatch: 38, keyPassesPerMatch: 2.3, minutes: 500 } },
    { id: 'br8', name: 'Casemiro', pos: 'Midfielder', age: 34, image: 'casemiro.jpg', stats: { averageRating: 7.1, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 48, keyPassesPerMatch: 0.7, minutes: 460 } },
    { id: 'br9', name: 'Lucas Paquetá', pos: 'Midfielder', age: 28, image: 'paqueta.jpg', stats: { averageRating: 7.3, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 43, keyPassesPerMatch: 1.8, minutes: 420 } },
    { id: 'br10', name: 'Rayan', pos: 'Midfielder', age: 19, image: 'rayan.jpg', stats: { averageRating: 6.8, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 25, keyPassesPerMatch: 0.8, minutes: 220 } },
    { id: 'br11', name: 'Bruno Guimarães', pos: 'Midfielder', age: 28, image: 'brunoguimaraes.jpg', stats: { averageRating: 7.5, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 58, keyPassesPerMatch: 1.5, minutes: 510 } },
    { id: 'br12', name: 'Luiz Henrique', pos: 'Midfielder', age: 25, image: 'luizhenrique.jpg', stats: { averageRating: 7.0, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 30, keyPassesPerMatch: 1.2, minutes: 300 } },
    { id: 'br13', name: 'Danilo Santos', pos: 'Midfielder', age: 25, image: 'danilosantos.jpg', stats: { averageRating: 6.9, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 45, keyPassesPerMatch: 0.6, minutes: 280 } },
    { id: 'br14', name: 'Éderson', pos: 'Midfielder', age: 27, image: 'edersonmid.jpg', stats: { averageRating: 7.2, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 50, keyPassesPerMatch: 0.9, minutes: 400 } },
    { id: 'br15', name: 'Fabinho', pos: 'Midfielder', age: 32, image: 'fabinho.jpg', stats: { averageRating: 6.9, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 52, keyPassesPerMatch: 0.5, minutes: 300 } },
    { id: 'br16', name: 'Gabriel Magalhães', pos: 'Defender', age: 28, image: 'gabrielmagalhaes.jpg', stats: { averageRating: 7.5, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 55, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.5, tacklesPerMatch: 1.7, minutes: 520 } },
    { id: 'br17', name: 'Marquinhos', pos: 'Defender', age: 32, image: 'marquinhos.jpg', stats: { averageRating: 7.4, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 58, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.6, tacklesPerMatch: 1.4, minutes: 520 } },
    { id: 'br18', name: 'Danilo', pos: 'Defender', age: 35, image: 'danilo.jpg', stats: { averageRating: 7.0, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 45, keyPassesPerMatch: 0.5, interceptionsPerMatch: 1.3, tacklesPerMatch: 1.5, minutes: 400 } },
    { id: 'br19', name: 'Alex Sandro', pos: 'Defender', age: 35, image: 'alexsandro.jpg', stats: { averageRating: 6.9, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 42, keyPassesPerMatch: 0.6, interceptionsPerMatch: 1.2, tacklesPerMatch: 1.4, minutes: 350 } },
    { id: 'br20', name: 'Léo Pereira', pos: 'Defender', age: 30, image: 'leopereira.jpg', stats: { averageRating: 7.0, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 48, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.4, tacklesPerMatch: 1.3, minutes: 350 } },
    { id: 'br21', name: 'Bremer', pos: 'Defender', age: 29, image: 'bremer.jpg', stats: { averageRating: 7.2, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 46, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.6, tacklesPerMatch: 1.7, minutes: 400 } },
    { id: 'br22', name: 'Douglas Santos', pos: 'Defender', age: 32, image: 'douglassantos.jpg', stats: { averageRating: 6.9, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 40, keyPassesPerMatch: 0.6, interceptionsPerMatch: 1.2, tacklesPerMatch: 1.4, minutes: 300 } },
    { id: 'br23', name: 'Roger Ibañez', pos: 'Defender', age: 27, image: 'rogeribanez.jpg', stats: { averageRating: 7.0, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 44, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.5, tacklesPerMatch: 1.6, minutes: 320 } },
    { id: 'br24', name: 'Alisson', pos: 'Goalkeeper', age: 33, image: 'alisson.jpg', stats: { averageRating: 7.4, goalsPrevented: 2.8, savesPerMatch: 3.2, minutes: 540 } },
    { id: 'br25', name: 'Ederson', pos: 'Goalkeeper', age: 32, image: 'ederson.jpg', stats: { averageRating: 7.1, goalsPrevented: 1.8, savesPerMatch: 2.8, minutes: 0 } },
    { id: 'br26', name: 'Weverton', pos: 'Goalkeeper', age: 38, image: 'weverton.jpg', stats: { averageRating: 6.9, goalsPrevented: 1.2, savesPerMatch: 2.5, minutes: 0 } }
  ],
  'MEX': [
    { id: 'mx1', name: 'Julián Quiñones', pos: 'Attacker', age: 29, image: 'quinones.jpg', stats: { averageRating: 7.4, goals: 3, assists: 2, ga: 5, shotsOnTargetPerMatch: 1.5, accuratePassesPerMatch: 22, keyPassesPerMatch: 1.1, minutes: 450, totalShots: 17 } },
    { id: 'mx2', name: 'Raúl Jiménez', pos: 'Attacker', age: 35, image: 'jimenez.jpg', stats: { averageRating: 7.3, goals: 3, assists: 1, ga: 4, shotsOnTargetPerMatch: 1.4, accuratePassesPerMatch: 20, keyPassesPerMatch: 0.9, minutes: 420, totalShots: 16 } },
    { id: 'mx3', name: 'Santiago Giménez', pos: 'Attacker', age: 25, image: 'gimenez.jpg', stats: { averageRating: 7.2, goals: 2, assists: 1, ga: 3, shotsOnTargetPerMatch: 1.3, accuratePassesPerMatch: 18, keyPassesPerMatch: 0.6, minutes: 350, totalShots: 14 } },
    { id: 'mx4', name: 'Armando González', pos: 'Attacker', age: 23, image: 'armandogonzalez.jpg', stats: { averageRating: 6.9, goals: 1, assists: 0, ga: 1, shotsOnTargetPerMatch: 0.9, accuratePassesPerMatch: 16, keyPassesPerMatch: 0.4, minutes: 220, totalShots: 8 } },
    { id: 'mx5', name: 'Roberto Alvarado', pos: 'Attacker', age: 27, image: 'alvarado.jpg', stats: { averageRating: 7.1, goals: 1, assists: 2, ga: 3, shotsOnTargetPerMatch: 1.0, accuratePassesPerMatch: 28, keyPassesPerMatch: 1.4, minutes: 360, totalShots: 11 } },
    { id: 'mx6', name: 'Guillermo Martínez', pos: 'Attacker', age: 31, image: 'guillermomartinez.jpg', stats: { averageRating: 6.8, goals: 1, assists: 0, ga: 1, shotsOnTargetPerMatch: 0.8, accuratePassesPerMatch: 15, keyPassesPerMatch: 0.3, minutes: 180, totalShots: 7 } },
    { id: 'mx7', name: 'Gilberto Mora', pos: 'Midfielder', age: 17, image: 'gilbertomora.jpg', stats: { averageRating: 7.3, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 32, keyPassesPerMatch: 1.6, minutes: 350 } },
    { id: 'mx8', name: 'Edson Álvarez', pos: 'Midfielder', age: 28, image: 'edsonalvarez.jpg', stats: { averageRating: 7.4, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 52, keyPassesPerMatch: 0.7, minutes: 500 } },
    { id: 'mx9', name: 'Obed Vargas', pos: 'Midfielder', age: 20, image: 'obedvargas.jpg', stats: { averageRating: 7.0, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 42, keyPassesPerMatch: 0.8, minutes: 320 } },
    { id: 'mx10', name: 'Álvaro Fidalgo', pos: 'Midfielder', age: 29, image: 'fidalgo.jpg', stats: { averageRating: 7.3, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 50, keyPassesPerMatch: 1.5, minutes: 430 } },
    { id: 'mx11', name: 'Brian Gutiérrez', pos: 'Midfielder', age: 23, image: 'briangutierrez.jpg', stats: { averageRating: 7.0, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 36, keyPassesPerMatch: 1.2, minutes: 300 } },
    { id: 'mx12', name: 'César Huerta', pos: 'Midfielder', age: 25, image: 'cesarhuerta.jpg', stats: { averageRating: 7.1, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 30, keyPassesPerMatch: 1.4, minutes: 340 } },
    { id: 'mx13', name: 'Alexis Vega', pos: 'Midfielder', age: 28, image: 'alexisvega.jpg', stats: { averageRating: 7.2, goals: 2, assists: 2, ga: 4, accuratePassesPerMatch: 34, keyPassesPerMatch: 1.7, minutes: 380 } },
    { id: 'mx14', name: 'Orbelín Pineda', pos: 'Midfielder', age: 30, image: 'pineda.jpg', stats: { averageRating: 7.1, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 44, keyPassesPerMatch: 1.3, minutes: 370 } },
    { id: 'mx15', name: 'Luis Chávez', pos: 'Midfielder', age: 30, image: 'luischavez.jpg', stats: { averageRating: 7.2, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 48, keyPassesPerMatch: 1.1, minutes: 410 } },
    { id: 'mx16', name: 'Johan Vásquez', pos: 'Defender', age: 27, image: 'johanvasquez.jpg', stats: { averageRating: 7.4, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 48, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.8, minutes: 520 } },
    { id: 'mx17', name: 'Mateo Chávez', pos: 'Defender', age: 22, image: 'mateochavez.jpg', stats: { averageRating: 7.0, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 38, keyPassesPerMatch: 0.7, interceptionsPerMatch: 1.3, tacklesPerMatch: 1.6, minutes: 350 } },
    { id: 'mx18', name: 'César Montes', pos: 'Defender', age: 29, image: 'cesarmontes.jpg', stats: { averageRating: 7.3, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 50, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.6, tacklesPerMatch: 1.5, minutes: 500 } },
    { id: 'mx19', name: 'Erik Lira', pos: 'Defender', age: 26, image: 'eriklira.jpg', stats: { averageRating: 7.1, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 46, keyPassesPerMatch: 0.5, interceptionsPerMatch: 1.5, tacklesPerMatch: 1.7, minutes: 420 } },
    { id: 'mx20', name: 'Jorge Sánchez', pos: 'Defender', age: 28, image: 'jorgesanchez.jpg', stats: { averageRating: 7.0, goals: 0, assists: 2, ga: 2, accuratePassesPerMatch: 40, keyPassesPerMatch: 0.8, interceptionsPerMatch: 1.2, tacklesPerMatch: 1.5, minutes: 400 } },
    { id: 'mx21', name: 'Luis Romo', pos: 'Defender', age: 31, image: 'luisromo.jpg', stats: { averageRating: 7.2, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 52, keyPassesPerMatch: 0.7, interceptionsPerMatch: 1.5, tacklesPerMatch: 1.6, minutes: 450 } },
    { id: 'mx22', name: 'Israel Reyes', pos: 'Defender', age: 26, image: 'israelreyes.jpg', stats: { averageRating: 7.0, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 45, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.4, tacklesPerMatch: 1.5, minutes: 380 } },
    { id: 'mx23', name: 'Jesús Gallardo', pos: 'Defender', age: 31, image: 'jesusgallardo.jpg', stats: { averageRating: 7.0, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 39, keyPassesPerMatch: 0.7, interceptionsPerMatch: 1.2, tacklesPerMatch: 1.4, minutes: 360 } },
    { id: 'mx24', name: 'Raúl Rangel', pos: 'Goalkeeper', age: 26, image: 'raulrangel.jpg', stats: { averageRating: 7.2, goalsPrevented: 1.64, savesPerMatch: 1.6, minutes: 438 } },
    { id: 'mx25', name: 'Carlos Acevedo', pos: 'Goalkeeper', age: 30, image: 'carlosacevedo.jpg', stats: { averageRating: 0.0, goalsPrevented: 0, savesPerMatch: 0, minutes: 0 } },
    { id: 'mx26', name: 'Guillermo Ochoa', pos: 'Goalkeeper', age: 41, image: 'guillermoochoa.jpg', stats: { averageRating: 6.5, goalsPrevented: 0, savesPerMatch: 0, minutes: 12 } }
  ],
  'RSA': [
    { id: 'rsa1', name: 'Lyle Foster', pos: 'Attacker', age: 25, image: 'foster.jpg', stats: { averageRating: 7.3, goals: 3, assists: 1, ga: 4, shotsOnTargetPerMatch: 1.4, accuratePassesPerMatch: 18, keyPassesPerMatch: 0.8, minutes: 450, totalShots: 15 } },
    { id: 'rsa2', name: 'Evidence Makgopa', pos: 'Attacker', age: 26, image: 'makgopa.jpg', stats: { averageRating: 7.1, goals: 2, assists: 1, ga: 3, shotsOnTargetPerMatch: 1.2, accuratePassesPerMatch: 16, keyPassesPerMatch: 0.5, minutes: 380, totalShots: 12 } },
    { id: 'rsa3', name: 'Iqraam Rayners', pos: 'Attacker', age: 30, image: 'rayners.jpg', stats: { averageRating: 6.9, goals: 1, assists: 1, ga: 2, shotsOnTargetPerMatch: 1.0, accuratePassesPerMatch: 15, keyPassesPerMatch: 0.5, minutes: 300, totalShots: 9 } },
    { id: 'rsa4', name: 'Relebohile Mofokeng', pos: 'Midfielder', age: 21, image: 'mofokeng.jpg', stats: { averageRating: 7.5, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 32, keyPassesPerMatch: 1.8, minutes: 450 } },
    { id: 'rsa5', name: 'Oswin Appollis', pos: 'Midfielder', age: 24, image: 'appollis.jpg', stats: { averageRating: 7.3, goals: 2, assists: 2, ga: 4, accuratePassesPerMatch: 30, keyPassesPerMatch: 1.6, minutes: 420 } },
    { id: 'rsa6', name: 'Themba Zwane', pos: 'Midfielder', age: 36, image: 'zwane.jpg', stats: { averageRating: 7.4, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 42, keyPassesPerMatch: 2.0, minutes: 400 } },
    { id: 'rsa7', name: 'Teboho Mokoena', pos: 'Midfielder', age: 29, image: 'mokoena.jpg', stats: { averageRating: 7.6, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 55, keyPassesPerMatch: 1.4, minutes: 520 } },
    { id: 'rsa8', name: 'Sphephelo Sithole', pos: 'Midfielder', age: 27, image: 'sithole.jpg', stats: { averageRating: 7.1, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 48, keyPassesPerMatch: 0.7, minutes: 450 } },
    { id: 'rsa9', name: 'Thapelo Maseko', pos: 'Midfielder', age: 23, image: 'maseko.jpg', stats: { averageRating: 7.0, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 28, keyPassesPerMatch: 1.3, minutes: 320 } },
    { id: 'rsa10', name: 'Tshepang Moremi', pos: 'Midfielder', age: 25, image: 'moremi.jpg', stats: { averageRating: 6.9, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 26, keyPassesPerMatch: 1.1, minutes: 280 } },
    { id: 'rsa11', name: 'Thalente Mbatha', pos: 'Midfielder', age: 26, image: 'mbatha.jpg', stats: { averageRating: 7.1, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 46, keyPassesPerMatch: 0.8, minutes: 400 } },
    { id: 'rsa12', name: 'Kamogelo Sebelebele', pos: 'Midfielder', age: 23, image: 'sebelebele.jpg', stats: { averageRating: 6.9, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 30, keyPassesPerMatch: 1.0, minutes: 250 } },
    { id: 'rsa13', name: 'Mbekezeli Mbokazi', pos: 'Defender', age: 20, image: 'mbokazi.jpg', stats: { averageRating: 7.3, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 48, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.6, minutes: 450 } },
    { id: 'rsa14', name: 'Khuliso Mudau', pos: 'Defender', age: 31, image: 'mudau.jpg', stats: { averageRating: 7.4, goals: 0, assists: 2, ga: 2, accuratePassesPerMatch: 42, keyPassesPerMatch: 0.8, interceptionsPerMatch: 1.5, tacklesPerMatch: 1.8, minutes: 480 } },
    { id: 'rsa15', name: 'Ime Okon', pos: 'Defender', age: 22, image: 'okon.jpg', stats: { averageRating: 7.1, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 46, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.6, tacklesPerMatch: 1.4, minutes: 400 } },
    { id: 'rsa16', name: 'Aubrey Modiba', pos: 'Defender', age: 30, image: 'modiba.jpg', stats: { averageRating: 7.2, goals: 0, assists: 2, ga: 2, accuratePassesPerMatch: 40, keyPassesPerMatch: 0.9, interceptionsPerMatch: 1.3, tacklesPerMatch: 1.5, minutes: 420 } },
    { id: 'rsa17', name: 'Nkosinathi Sibisi', pos: 'Defender', age: 30, image: 'sibisi.jpg', stats: { averageRating: 7.1, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 45, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.6, tacklesPerMatch: 1.4, minutes: 430 } },
    { id: 'rsa18', name: 'Samukelo Kabini', pos: 'Defender', age: 22, image: 'kabini.jpg', stats: { averageRating: 6.9, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 36, keyPassesPerMatch: 0.5, interceptionsPerMatch: 1.2, tacklesPerMatch: 1.4, minutes: 300 } },
    { id: 'rsa19', name: 'Khulumani Ndamane', pos: 'Defender', age: 22, image: 'ndamane.jpg', stats: { averageRating: 7.0, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 43, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.5, tacklesPerMatch: 1.3, minutes: 350 } },
    { id: 'rsa20', name: 'Bradley Cross', pos: 'Defender', age: 25, image: 'cross.jpg', stats: { averageRating: 6.9, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 38, keyPassesPerMatch: 0.4, interceptionsPerMatch: 1.3, tacklesPerMatch: 1.4, minutes: 320 } },
    { id: 'rsa21', name: 'Olwethu Makhanya', pos: 'Defender', age: 22, image: 'makhanya.jpg', stats: { averageRating: 7.0, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 44, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.5, tacklesPerMatch: 1.3, minutes: 350 } },
    { id: 'rsa22', name: 'Tholo Thabang Matuludi', pos: 'Defender', age: 27, image: 'matuludi.jpg', stats: { averageRating: 6.9, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 35, keyPassesPerMatch: 0.5, interceptionsPerMatch: 1.2, tacklesPerMatch: 1.5, minutes: 300 } },
    { id: 'rsa23', name: 'Ronwen Williams', pos: 'Goalkeeper', age: 34, image: 'ronwenwilliams.jpg', stats: { averageRating: 7.6, goalsPrevented: 0.91, savesPerMatch: 2.8, minutes: 360 } },
    { id: 'rsa24', name: 'Sipho Chaine', pos: 'Goalkeeper', age: 29, image: 'siphochaine.jpg', stats: { averageRating: 6.9, goalsPrevented: 1.2, savesPerMatch: 2.7, minutes: 0 } },
    { id: 'rsa25', name: 'Ricardo Goss', pos: 'Goalkeeper', age: 32, image: 'ricardogoss.jpg', stats: { averageRating: 6.8, goalsPrevented: 1.0, savesPerMatch: 2.5, minutes: 0 } }
  ],
  'KOR': [
    { id: 'kor1', name: 'Son Heung-min', pos: 'Attacker', age: 34, image: 'son.jpg', stats: { averageRating: 7.8, goals: 4, assists: 3, ga: 7, shotsOnTargetPerMatch: 1.8, accuratePassesPerMatch: 30, keyPassesPerMatch: 2.1, minutes: 520, totalShots: 20 } },
    { id: 'kor2', name: 'Hyeon-gyu Oh', pos: 'Attacker', age: 25, image: 'oh.jpg', stats: { averageRating: 7.1, goals: 2, assists: 1, ga: 3, shotsOnTargetPerMatch: 1.3, accuratePassesPerMatch: 17, keyPassesPerMatch: 0.5, minutes: 320, totalShots: 12 } },
    { id: 'kor3', name: 'Hwang Hee-chan', pos: 'Attacker', age: 30, image: 'hwangheechan.jpg', stats: { averageRating: 7.4, goals: 3, assists: 2, ga: 5, shotsOnTargetPerMatch: 1.5, accuratePassesPerMatch: 25, keyPassesPerMatch: 1.2, minutes: 430, totalShots: 16 } },
    { id: 'kor4', name: 'Gue-sung Cho', pos: 'Attacker', age: 28, image: 'chosung.jpg', stats: { averageRating: 7.0, goals: 2, assists: 0, ga: 2, shotsOnTargetPerMatch: 1.2, accuratePassesPerMatch: 16, keyPassesPerMatch: 0.4, minutes: 300, totalShots: 11 } },
    { id: 'kor5', name: 'Yang Hyun-jun', pos: 'Attacker', age: 24, image: 'yanghyunjun.jpg', stats: { averageRating: 6.9, goals: 1, assists: 1, ga: 2, shotsOnTargetPerMatch: 0.9, accuratePassesPerMatch: 22, keyPassesPerMatch: 0.9, minutes: 250, totalShots: 8 } },
    { id: 'kor6', name: 'Kang-in Lee', pos: 'Midfielder', age: 25, image: 'lee-kangin.jpg', stats: { averageRating: 7.7, goals: 3, assists: 4, ga: 7, accuratePassesPerMatch: 48, keyPassesPerMatch: 2.4, minutes: 500 } },
    { id: 'kor7', name: 'Hwang In-beom', pos: 'Midfielder', age: 29, image: 'hwanginbeom.jpg', stats: { averageRating: 7.5, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 58, keyPassesPerMatch: 1.6, minutes: 520 } },
    { id: 'kor8', name: 'Jae-sung Lee', pos: 'Midfielder', age: 33, image: 'jaesunglee.jpg', stats: { averageRating: 7.3, goals: 2, assists: 2, ga: 4, accuratePassesPerMatch: 42, keyPassesPerMatch: 1.5, minutes: 450 } },
    { id: 'kor9', name: 'Jun-Ho Bae', pos: 'Midfielder', age: 22, image: 'junhobae.jpg', stats: { averageRating: 7.1, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 34, keyPassesPerMatch: 1.4, minutes: 350 } },
    { id: 'kor10', name: 'Seung Ho Paik', pos: 'Midfielder', age: 29, image: 'paik.jpg', stats: { averageRating: 7.2, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 52, keyPassesPerMatch: 1.0, minutes: 430 } },
    { id: 'kor11', name: 'Jens Castrop', pos: 'Midfielder', age: 22, image: 'castrop.jpg', stats: { averageRating: 7.0, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 44, keyPassesPerMatch: 0.8, minutes: 320 } },
    { id: 'kor12', name: 'Ji-sung Eom', pos: 'Midfielder', age: 24, image: 'eom.jpg', stats: { averageRating: 7.0, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 30, keyPassesPerMatch: 1.3, minutes: 300 } },
    { id: 'kor13', name: 'Lee Tae-seok', pos: 'Midfielder', age: 23, image: 'leetaeseok.jpg', stats: { averageRating: 6.9, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 36, keyPassesPerMatch: 0.8, minutes: 280 } },
    { id: 'kor14', name: 'Dong-gyeong Lee', pos: 'Midfielder', age: 28, image: 'leedonggyeong.jpg', stats: { averageRating: 7.1, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 38, keyPassesPerMatch: 1.5, minutes: 330 } },
    { id: 'kor15', name: 'Jin-gyu Kim', pos: 'Midfielder', age: 29, image: 'kimjingyu.jpg', stats: { averageRating: 7.0, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 45, keyPassesPerMatch: 1.0, minutes: 340 } },
    { id: 'kor16', name: 'Jin-seob Park', pos: 'Midfielder', age: 30, image: 'parkjinseob.jpg', stats: { averageRating: 7.0, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 50, keyPassesPerMatch: 0.5, minutes: 360 } },
    { id: 'kor17', name: 'Kim Min-jae', pos: 'Defender', age: 29, image: 'kimminjae.jpg', stats: { averageRating: 7.6, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 62, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.8, tacklesPerMatch: 1.7, minutes: 540 } },
    { id: 'kor18', name: 'Young-woo Seol', pos: 'Defender', age: 27, image: 'seolyoungwoo.jpg', stats: { averageRating: 7.3, goals: 0, assists: 2, ga: 2, accuratePassesPerMatch: 45, keyPassesPerMatch: 0.9, interceptionsPerMatch: 1.4, tacklesPerMatch: 1.7, minutes: 480 } },
    { id: 'kor19', name: 'Han-Beom Lee', pos: 'Defender', age: 24, image: 'leehanbeom.jpg', stats: { averageRating: 7.1, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 50, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.6, tacklesPerMatch: 1.4, minutes: 400 } },
    { id: 'kor20', name: 'Gi-Hyuk Lee', pos: 'Defender', age: 26, image: 'leegihyuk.jpg', stats: { averageRating: 7.0, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 44, keyPassesPerMatch: 0.5, interceptionsPerMatch: 1.4, tacklesPerMatch: 1.5, minutes: 380 } },
    { id: 'kor21', name: 'Kim Moon-hwan', pos: 'Defender', age: 30, image: 'kimmoonhwan.jpg', stats: { averageRating: 7.1, goals: 0, assists: 2, ga: 2, accuratePassesPerMatch: 40, keyPassesPerMatch: 0.8, interceptionsPerMatch: 1.3, tacklesPerMatch: 1.6, minutes: 400 } },
    { id: 'kor22', name: 'Kim Tae-hyeon', pos: 'Defender', age: 25, image: 'kimtaehyeon.jpg', stats: { averageRating: 7.0, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 48, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.5, tacklesPerMatch: 1.4, minutes: 370 } },
    { id: 'kor23', name: 'Wi-je Cho', pos: 'Defender', age: 24, image: 'cho-wije.jpg', stats: { averageRating: 6.9, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 46, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.4, tacklesPerMatch: 1.3, minutes: 320 } },
    { id: 'kor24', name: 'Hyeon-woo Jo', pos: 'Goalkeeper', age: 34, image: 'johyeonwoo.jpg', stats: { averageRating: 7.5, goalsPrevented: 2.8, savesPerMatch: 3.6, minutes: 540 } },
    { id: 'kor25', name: 'Kim Seung-gyu', pos: 'Goalkeeper', age: 35, image: 'kimseunggyu.jpg', stats: { averageRating: 6.9, goalsPrevented: 1.3, savesPerMatch: 2.8, minutes: 0 } },
    { id: 'kor26', name: 'Song Bum-keun', pos: 'Goalkeeper', age: 28, image: 'songbumkeun.jpg', stats: { averageRating: 6.8, goalsPrevented: 1.1, savesPerMatch: 2.6, minutes: 0 } }
  ],
  'CZE': [
    { id: 'cze1', name: 'Patrik Schick', pos: 'Attacker', age: 30, image: 'schick.jpg', stats: { averageRating: 7.7, goals: 5, assists: 1, ga: 6, shotsOnTargetPerMatch: 1.9, accuratePassesPerMatch: 18, keyPassesPerMatch: 0.7, minutes: 510, totalShots: 22 } },
    { id: 'cze2', name: 'Pavel Šulc', pos: 'Attacker', age: 25, image: 'sulc.jpg', stats: { averageRating: 7.4, goals: 3, assists: 3, ga: 6, shotsOnTargetPerMatch: 1.3, accuratePassesPerMatch: 28, keyPassesPerMatch: 1.6, minutes: 470, totalShots: 16 } },
    { id: 'cze3', name: 'Adam Hložek', pos: 'Attacker', age: 23, image: 'hlozek.jpg', stats: { averageRating: 7.2, goals: 3, assists: 2, ga: 5, shotsOnTargetPerMatch: 1.4, accuratePassesPerMatch: 24, keyPassesPerMatch: 1.1, minutes: 420, totalShots: 15 } },
    { id: 'cze4', name: 'Tomáš Chorý', pos: 'Attacker', age: 31, image: 'chory.jpg', stats: { averageRating: 6.9, goals: 2, assists: 0, ga: 2, shotsOnTargetPerMatch: 1.1, accuratePassesPerMatch: 13, keyPassesPerMatch: 0.4, minutes: 280, totalShots: 10 } },
    { id: 'cze5', name: 'Lukáš Provod', pos: 'Attacker', age: 29, image: 'provod.jpg', stats: { averageRating: 7.3, goals: 1, assists: 3, ga: 4, shotsOnTargetPerMatch: 0.9, accuratePassesPerMatch: 34, keyPassesPerMatch: 1.8, minutes: 440, totalShots: 11 } },
    { id: 'cze6', name: 'Jan Kuchta', pos: 'Attacker', age: 29, image: 'kuchta.jpg', stats: { averageRating: 7.0, goals: 2, assists: 1, ga: 3, shotsOnTargetPerMatch: 1.2, accuratePassesPerMatch: 16, keyPassesPerMatch: 0.6, minutes: 300, totalShots: 12 } },
    { id: 'cze7', name: 'Mojmír Chytil', pos: 'Attacker', age: 27, image: 'chytil.jpg', stats: { averageRating: 6.8, goals: 1, assists: 0, ga: 1, shotsOnTargetPerMatch: 0.8, accuratePassesPerMatch: 14, keyPassesPerMatch: 0.4, minutes: 220, totalShots: 7 } },
    { id: 'cze8', name: 'Tomáš Souček', pos: 'Midfielder', age: 31, image: 'soucek.jpg', stats: { averageRating: 7.5, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 46, keyPassesPerMatch: 0.9, minutes: 540 } },
    { id: 'cze9', name: 'Michal Sadílek', pos: 'Midfielder', age: 27, image: 'sadilek.jpg', stats: { averageRating: 7.2, goals: 0, assists: 2, ga: 2, accuratePassesPerMatch: 49, keyPassesPerMatch: 1.1, minutes: 450 } },
    { id: 'cze10', name: 'Vladimír Darida', pos: 'Midfielder', age: 35, image: 'darida.jpg', stats: { averageRating: 7.1, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 51, keyPassesPerMatch: 1.4, minutes: 400 } },
    { id: 'cze11', name: 'Lukáš Červ', pos: 'Midfielder', age: 25, image: 'cerv.jpg', stats: { averageRating: 7.2, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 47, keyPassesPerMatch: 0.9, minutes: 430 } },
    { id: 'cze12', name: 'Denis Višinský', pos: 'Midfielder', age: 23, image: 'visinsky.jpg', stats: { averageRating: 7.0, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 32, keyPassesPerMatch: 1.3, minutes: 330 } },
    { id: 'cze13', name: 'Hugo Sochurek', pos: 'Midfielder', age: 18, image: 'sochurek.jpg', stats: { averageRating: 6.7, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 28, keyPassesPerMatch: 0.7, minutes: 170 } },
    { id: 'cze14', name: 'David Douděra', pos: 'Midfielder', age: 28, image: 'doudera.jpg', stats: { averageRating: 7.1, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 38, keyPassesPerMatch: 1.2, minutes: 390 } },
    { id: 'cze15', name: 'Alexandr Sojka', pos: 'Midfielder', age: 23, image: 'sojka.jpg', stats: { averageRating: 6.9, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 35, keyPassesPerMatch: 1.0, minutes: 290 } },
    { id: 'cze16', name: 'Ladislav Krejčí', pos: 'Defender', age: 27, image: 'krejci.jpg', stats: { averageRating: 7.6, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 57, keyPassesPerMatch: 0.6, interceptionsPerMatch: 1.8, tacklesPerMatch: 1.7, minutes: 520 } },
    { id: 'cze17', name: 'Vladimír Coufal', pos: 'Defender', age: 33, image: 'coufal.jpg', stats: { averageRating: 7.3, goals: 0, assists: 3, ga: 3, accuratePassesPerMatch: 43, keyPassesPerMatch: 1.2, interceptionsPerMatch: 1.5, tacklesPerMatch: 1.8, minutes: 480 } },
    { id: 'cze18', name: 'David Jurásek', pos: 'Defender', age: 25, image: 'jurasek.jpg', stats: { averageRating: 7.1, goals: 0, assists: 2, ga: 2, accuratePassesPerMatch: 39, keyPassesPerMatch: 1.0, interceptionsPerMatch: 1.3, tacklesPerMatch: 1.6, minutes: 400 } },
    { id: 'cze19', name: 'Robin Hranáč', pos: 'Defender', age: 26, image: 'hranac.jpg', stats: { averageRating: 7.2, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 52, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.5, minutes: 450 } },
    { id: 'cze20', name: 'David Zima', pos: 'Defender', age: 25, image: 'zima.jpg', stats: { averageRating: 7.1, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 50, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.6, tacklesPerMatch: 1.4, minutes: 420 } },
    { id: 'cze21', name: 'Štěpán Chaloupek', pos: 'Defender', age: 23, image: 'chaloupek.jpg', stats: { averageRating: 6.9, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 46, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.4, tacklesPerMatch: 1.3, minutes: 320 } },
    { id: 'cze22', name: 'Tomáš Holeš', pos: 'Defender', age: 33, image: 'holes.jpg', stats: { averageRating: 7.2, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 54, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.8, tacklesPerMatch: 1.5, minutes: 460 } },
    { id: 'cze23', name: 'Jaroslav Zelený', pos: 'Defender', age: 33, image: 'zeleny.jpg', stats: { averageRating: 7.0, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 41, keyPassesPerMatch: 0.7, interceptionsPerMatch: 1.4, tacklesPerMatch: 1.5, minutes: 350 } },
    { id: 'cze24', name: 'Matěj Kovář', pos: 'Goalkeeper', age: 26, image: 'kovar.jpg', stats: { averageRating: 7.5, goalsPrevented: 2.7, savesPerMatch: 3.5, minutes: 540 } },
    { id: 'cze25', name: 'Lukáš Horníček', pos: 'Goalkeeper', age: 24, image: 'hornicek.jpg', stats: { averageRating: 6.9, goalsPrevented: 1.3, savesPerMatch: 2.7, minutes: 0 } },
    { id: 'cze26', name: 'Jindřich Staněk', pos: 'Goalkeeper', age: 30, image: 'stanek.jpg', stats: { averageRating: 6.8, goalsPrevented: 1.1, savesPerMatch: 2.5, minutes: 0 } }
  ],
  'CAN': [
    { id: 'can1', name: 'Jonathan David', pos: 'Attacker', age: 26, image: 'jonathandavid.jpg', stats: { averageRating: 7.8, goals: 5, assists: 2, ga: 7, shotsOnTargetPerMatch: 1.8, accuratePassesPerMatch: 21, keyPassesPerMatch: 1.1, minutes: 520, totalShots: 23 } },
    { id: 'can2', name: 'Promise David', pos: 'Attacker', age: 25, image: 'promisedavid.jpg', stats: { averageRating: 7.1, goals: 2, assists: 1, ga: 3, shotsOnTargetPerMatch: 1.2, accuratePassesPerMatch: 15, keyPassesPerMatch: 0.5, minutes: 310, totalShots: 12 } },
    { id: 'can3', name: 'Tani Oluwaseyi', pos: 'Attacker', age: 26, image: 'oluwaseyi.jpg', stats: { averageRating: 7.0, goals: 2, assists: 1, ga: 3, shotsOnTargetPerMatch: 1.1, accuratePassesPerMatch: 16, keyPassesPerMatch: 0.6, minutes: 290, totalShots: 11 } },
    { id: 'can4', name: 'Cyle Larin', pos: 'Attacker', age: 31, image: 'larin.jpg', stats: { averageRating: 7.2, goals: 3, assists: 1, ga: 4, shotsOnTargetPerMatch: 1.4, accuratePassesPerMatch: 18, keyPassesPerMatch: 0.7, minutes: 380, totalShots: 15 } },
    { id: 'can5', name: 'Jayden Nelson', pos: 'Attacker', age: 23, image: 'nelson.jpg', stats: { averageRating: 6.9, goals: 1, assists: 1, ga: 2, shotsOnTargetPerMatch: 0.8, accuratePassesPerMatch: 22, keyPassesPerMatch: 0.9, minutes: 240, totalShots: 8 } },
    { id: 'can6', name: 'Tajon Buchanan', pos: 'Midfielder', age: 27, image: 'buchanan.jpg', stats: { averageRating: 7.4, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 35, keyPassesPerMatch: 1.6, minutes: 470 } },
    { id: 'can7', name: 'Ismaël Koné', pos: 'Midfielder', age: 24, image: 'kone.jpg', stats: { averageRating: 7.2, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 42, keyPassesPerMatch: 1.2, minutes: 410 } },
    { id: 'can8', name: 'Stephen Eustáquio', pos: 'Midfielder', age: 29, image: 'eustaquio.jpg', stats: { averageRating: 7.6, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 55, keyPassesPerMatch: 1.8, minutes: 520 } },
    { id: 'can9', name: 'Nathan-Dylan Saliba', pos: 'Midfielder', age: 22, image: 'saliba.jpg', stats: { averageRating: 7.0, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 41, keyPassesPerMatch: 0.8, minutes: 330 } },
    { id: 'can10', name: 'Ali Ahmed', pos: 'Midfielder', age: 25, image: 'ahmed.jpg', stats: { averageRating: 7.1, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 34, keyPassesPerMatch: 1.2, minutes: 350 } },
    { id: 'can11', name: 'Liam Millar', pos: 'Midfielder', age: 26, image: 'millar.jpg', stats: { averageRating: 7.0, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 30, keyPassesPerMatch: 1.3, minutes: 320 } },
    { id: 'can12', name: 'Jacob Shaffelburg', pos: 'Midfielder', age: 26, image: 'shaffelburg.jpg', stats: { averageRating: 7.2, goals: 2, assists: 2, ga: 4, accuratePassesPerMatch: 28, keyPassesPerMatch: 1.4, minutes: 370 } },
    { id: 'can13', name: 'Jonathan Osorio', pos: 'Midfielder', age: 34, image: 'osorio.jpg', stats: { averageRating: 7.1, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 46, keyPassesPerMatch: 1.1, minutes: 390 } },
    { id: 'can14', name: 'Mathieu Choinière', pos: 'Midfielder', age: 27, image: 'choiniere.jpg', stats: { averageRating: 6.9, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 40, keyPassesPerMatch: 0.8, minutes: 290 } },
    { id: 'can15', name: 'Alphonso Davies', pos: 'Defender', age: 25, image: 'davies.jpg', stats: { averageRating: 7.8, goals: 2, assists: 4, ga: 6, accuratePassesPerMatch: 48, keyPassesPerMatch: 1.7, interceptionsPerMatch: 1.4, tacklesPerMatch: 2.0, minutes: 520 } },
    { id: 'can16', name: 'Niko Sigur', pos: 'Defender', age: 22, image: 'sigur.jpg', stats: { averageRating: 7.1, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 43, keyPassesPerMatch: 0.7, interceptionsPerMatch: 1.5, tacklesPerMatch: 1.7, minutes: 370 } },
    { id: 'can17', name: 'Alistair Johnston', pos: 'Defender', age: 27, image: 'johnston.jpg', stats: { averageRating: 7.4, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 47, keyPassesPerMatch: 0.8, interceptionsPerMatch: 1.6, tacklesPerMatch: 1.9, minutes: 500 } },
    { id: 'can18', name: 'Derek Cornelius', pos: 'Defender', age: 28, image: 'cornelius.jpg', stats: { averageRating: 7.2, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 52, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.4, minutes: 460 } },
    { id: 'can19', name: 'Moïse Bombito', pos: 'Defender', age: 26, image: 'bombito.jpg', stats: { averageRating: 7.3, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 54, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.8, tacklesPerMatch: 1.5, minutes: 480 } },
    { id: 'can20', name: 'Richie Laryea', pos: 'Defender', age: 31, image: 'laryea.jpg', stats: { averageRating: 7.1, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 38, keyPassesPerMatch: 1.0, interceptionsPerMatch: 1.3, tacklesPerMatch: 1.8, minutes: 390 } },
    { id: 'can21', name: 'Luc De Fougerolles', pos: 'Defender', age: 20, image: 'defougerolles.jpg', stats: { averageRating: 6.9, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 45, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.4, tacklesPerMatch: 1.3, minutes: 280 } },
    { id: 'can22', name: 'Joel Waterman', pos: 'Defender', age: 30, image: 'waterman.jpg', stats: { averageRating: 7.0, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 48, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.5, tacklesPerMatch: 1.3, minutes: 330 } },
    { id: 'can23', name: 'Alfie Jones', pos: 'Defender', age: 28, image: 'jones.jpg', stats: { averageRating: 6.9, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 46, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.4, tacklesPerMatch: 1.2, minutes: 300 } },
    { id: 'can24', name: 'Dayne St. Clair', pos: 'Goalkeeper', age: 29, image: 'stclair.jpg', stats: { averageRating: 7.5, goalsPrevented: 2.8, savesPerMatch: 3.6, minutes: 540 } },
    { id: 'can25', name: 'Maxime Crépeau', pos: 'Goalkeeper', age: 31, image: 'crepeau.jpg', stats: { averageRating: 7.0, goalsPrevented: 1.5, savesPerMatch: 3.0, minutes: 0 } },
    { id: 'can26', name: 'Owen Goodman', pos: 'Goalkeeper', age: 22, image: 'goodman.jpg', stats: { averageRating: 6.8, goalsPrevented: 1.1, savesPerMatch: 2.5, minutes: 0 } }
  ],
  'BIH': [
    { id: 'bih1', name: 'Edin Džeko', pos: 'Attacker', age: 40, image: 'dzeko.jpg', stats: { averageRating: 7.5, goals: 4, assists: 2, ga: 6, shotsOnTargetPerMatch: 1.6, accuratePassesPerMatch: 18, keyPassesPerMatch: 0.8, minutes: 480, totalShots: 19 } },
    { id: 'bih2', name: 'Esmir Bajraktarević', pos: 'Attacker', age: 21, image: 'bajraktarevic.jpg', stats: { averageRating: 7.2, goals: 2, assists: 3, ga: 5, shotsOnTargetPerMatch: 1.1, accuratePassesPerMatch: 27, keyPassesPerMatch: 1.5, minutes: 390, totalShots: 12 } },
    { id: 'bih3', name: 'Ermedin Demirović', pos: 'Attacker', age: 28, image: 'demirovic.jpg', stats: { averageRating: 7.4, goals: 4, assists: 1, ga: 5, shotsOnTargetPerMatch: 1.5, accuratePassesPerMatch: 20, keyPassesPerMatch: 0.9, minutes: 450, totalShots: 17 } },
    { id: 'bih4', name: 'Jovo Lukić', pos: 'Attacker', age: 27, image: 'lukic.jpg', stats: { averageRating: 6.8, goals: 1, assists: 0, ga: 1, shotsOnTargetPerMatch: 0.8, accuratePassesPerMatch: 14, keyPassesPerMatch: 0.4, minutes: 220, totalShots: 7 } },
    { id: 'bih5', name: 'Haris Tabaković', pos: 'Attacker', age: 32, image: 'tabakovic.jpg', stats: { averageRating: 7.0, goals: 2, assists: 0, ga: 2, shotsOnTargetPerMatch: 1.2, accuratePassesPerMatch: 15, keyPassesPerMatch: 0.5, minutes: 300, totalShots: 11 } },
    { id: 'bih6', name: 'Samed Baždar', pos: 'Attacker', age: 22, image: 'bazdar.jpg', stats: { averageRating: 6.9, goals: 1, assists: 1, ga: 2, shotsOnTargetPerMatch: 0.9, accuratePassesPerMatch: 17, keyPassesPerMatch: 0.6, minutes: 250, totalShots: 8 } },
    { id: 'bih7', name: 'Kerim Alajbegović', pos: 'Midfielder', age: 18, image: 'alajbegovic.jpg', stats: { averageRating: 7.1, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 31, keyPassesPerMatch: 1.3, minutes: 300 } },
    { id: 'bih8', name: 'Benjamin Tahirović', pos: 'Midfielder', age: 23, image: 'tahirovic.jpg', stats: { averageRating: 7.2, goals: 0, assists: 2, ga: 2, accuratePassesPerMatch: 48, keyPassesPerMatch: 0.9, minutes: 430 } },
    { id: 'bih9', name: 'Ermin Mahmić', pos: 'Midfielder', age: 21, image: 'mahmic.jpg', stats: { averageRating: 6.9, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 34, keyPassesPerMatch: 1.1, minutes: 280 } },
    { id: 'bih10', name: 'Armin Gigović', pos: 'Midfielder', age: 24, image: 'gigovic.jpg', stats: { averageRating: 7.3, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 45, keyPassesPerMatch: 1.2, minutes: 420 } },
    { id: 'bih11', name: 'Amir Hadžiahmetović', pos: 'Midfielder', age: 29, image: 'hadziahmetovic.jpg', stats: { averageRating: 7.2, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 52, keyPassesPerMatch: 0.8, minutes: 440 } },
    { id: 'bih12', name: 'Amar Memić', pos: 'Midfielder', age: 25, image: 'memic.jpg', stats: { averageRating: 7.0, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 32, keyPassesPerMatch: 1.2, minutes: 330 } },
    { id: 'bih13', name: 'Ivan Šunjić', pos: 'Midfielder', age: 29, image: 'sunjic.jpg', stats: { averageRating: 7.1, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 50, keyPassesPerMatch: 0.6, minutes: 410 } },
    { id: 'bih14', name: 'Ivan Bašić', pos: 'Midfielder', age: 24, image: 'basic.jpg', stats: { averageRating: 7.0, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 43, keyPassesPerMatch: 0.9, minutes: 350 } },
    { id: 'bih15', name: 'Dženis Burnić', pos: 'Midfielder', age: 28, image: 'burnic.jpg', stats: { averageRating: 6.9, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 46, keyPassesPerMatch: 0.7, minutes: 320 } },
    { id: 'bih16', name: 'Amar Dedić', pos: 'Defender', age: 23, image: 'dedic.jpg', stats: { averageRating: 7.5, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 45, keyPassesPerMatch: 1.2, interceptionsPerMatch: 1.5, tacklesPerMatch: 1.9, minutes: 500 } },
    { id: 'bih17', name: 'Tarik Muharemović', pos: 'Defender', age: 23, image: 'muharemovic.jpg', stats: { averageRating: 7.3, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 51, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.5, minutes: 460 } },
    { id: 'bih18', name: 'Sead Kolašinac', pos: 'Defender', age: 33, image: 'kolasinac.jpg', stats: { averageRating: 7.4, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 49, keyPassesPerMatch: 0.5, interceptionsPerMatch: 1.8, tacklesPerMatch: 1.8, minutes: 480 } },
    { id: 'bih19', name: 'Nikola Katić', pos: 'Defender', age: 29, image: 'katic.jpg', stats: { averageRating: 7.2, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 53, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.6, tacklesPerMatch: 1.4, minutes: 440 } },
    { id: 'bih20', name: 'Arjan Malić', pos: 'Defender', age: 20, image: 'malic.jpg', stats: { averageRating: 7.0, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 44, keyPassesPerMatch: 0.5, interceptionsPerMatch: 1.4, tacklesPerMatch: 1.6, minutes: 350 } },
    { id: 'bih21', name: 'Stjepan Radeljić', pos: 'Defender', age: 28, image: 'radeljic.jpg', stats: { averageRating: 7.1, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 50, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.4, minutes: 400 } },
    { id: 'bih22', name: 'Dennis Hadžikadunić', pos: 'Defender', age: 28, image: 'hadzikadunic.jpg', stats: { averageRating: 7.0, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 49, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.6, tacklesPerMatch: 1.3, minutes: 370 } },
    { id: 'bih23', name: 'Nihad Mujakić', pos: 'Defender', age: 28, image: 'mujakic.jpg', stats: { averageRating: 6.9, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 42, keyPassesPerMatch: 0.4, interceptionsPerMatch: 1.5, tacklesPerMatch: 1.5, minutes: 340 } },
    { id: 'bih24', name: 'Nikola Vasilj', pos: 'Goalkeeper', age: 30, image: 'vasilj.jpg', stats: { averageRating: 7.4, goalsPrevented: 2.5, savesPerMatch: 3.5, minutes: 540 } },
    { id: 'bih25', name: 'Martin Zlomislić', pos: 'Goalkeeper', age: 27, image: 'zlomislic.jpg', stats: { averageRating: 6.9, goalsPrevented: 1.2, savesPerMatch: 2.7, minutes: 0 } },
    { id: 'bih26', name: 'Mladen Jurkas', pos: 'Goalkeeper', age: 18, image: 'jurkas.jpg', stats: { averageRating: 6.7, goalsPrevented: 0.8, savesPerMatch: 2.3, minutes: 0 } }
  ],
  'QAT': [
    { id: 'qat1', name: 'Tahsin Mohammed Jamshid', pos: 'Attacker', age: 20, image: 'jamshid.jpg', stats: { averageRating: 6.9, goals: 1, assists: 1, ga: 2, shotsOnTargetPerMatch: 0.8, accuratePassesPerMatch: 18, keyPassesPerMatch: 0.7, minutes: 280, totalShots: 8 } },
    { id: 'qat2', name: 'Hassan Al Haydos', pos: 'Attacker', age: 35, image: 'alhaydos.jpg', stats: { averageRating: 7.3, goals: 2, assists: 3, ga: 5, shotsOnTargetPerMatch: 1.1, accuratePassesPerMatch: 31, keyPassesPerMatch: 1.8, minutes: 430, totalShots: 13 } },
    { id: 'qat3', name: 'Mohammed Muntari', pos: 'Attacker', age: 32, image: 'muntari.jpg', stats: { averageRating: 7.0, goals: 2, assists: 0, ga: 2, shotsOnTargetPerMatch: 1.2, accuratePassesPerMatch: 16, keyPassesPerMatch: 0.5, minutes: 330, totalShots: 11 } },
    { id: 'qat4', name: 'Yusuf Abdurisag', pos: 'Attacker', age: 26, image: 'abdurisag.jpg', stats: { averageRating: 7.1, goals: 1, assists: 2, ga: 3, shotsOnTargetPerMatch: 1.0, accuratePassesPerMatch: 23, keyPassesPerMatch: 1.1, minutes: 350, totalShots: 10 } },
    { id: 'qat5', name: 'Ahmed Alaaeldin', pos: 'Attacker', age: 33, image: 'alaaeldin.jpg', stats: { averageRating: 6.8, goals: 1, assists: 0, ga: 1, shotsOnTargetPerMatch: 0.8, accuratePassesPerMatch: 15, keyPassesPerMatch: 0.4, minutes: 240, totalShots: 7 } },
    { id: 'qat6', name: 'Akram Afif', pos: 'Midfielder', age: 29, image: 'afif.jpg', stats: { averageRating: 8.0, goals: 5, assists: 4, ga: 9, accuratePassesPerMatch: 38, keyPassesPerMatch: 2.8, minutes: 520 } },
    { id: 'qat7', name: 'Almoez Ali', pos: 'Midfielder', age: 29, image: 'almoezali.jpg', stats: { averageRating: 7.6, goals: 4, assists: 2, ga: 6, accuratePassesPerMatch: 25, keyPassesPerMatch: 1.3, minutes: 490 } },
    { id: 'qat8', name: 'Edmilson Junior', pos: 'Midfielder', age: 31, image: 'edmilson.jpg', stats: { averageRating: 7.3, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 30, keyPassesPerMatch: 1.7, minutes: 420 } },
    { id: 'qat9', name: 'Assim Madibo', pos: 'Midfielder', age: 29, image: 'madibo.jpg', stats: { averageRating: 7.1, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 47, keyPassesPerMatch: 0.6, minutes: 450 } },
    { id: 'qat10', name: 'Ahmed Fathi', pos: 'Midfielder', age: 33, image: 'fathi.jpg', stats: { averageRating: 7.0, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 45, keyPassesPerMatch: 0.7, minutes: 390 } },
    { id: 'qat11', name: 'Karim Boudiaf', pos: 'Midfielder', age: 35, image: 'boudiaf.jpg', stats: { averageRating: 7.1, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 50, keyPassesPerMatch: 0.5, minutes: 410 } },
    { id: 'qat12', name: 'Mohamed Naceur Almanai', pos: 'Midfielder', age: 22, image: 'almanai.jpg', stats: { averageRating: 6.8, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 34, keyPassesPerMatch: 0.7, minutes: 250 } },
    { id: 'qat13', name: 'Abdelaziz Hatem', pos: 'Midfielder', age: 35, image: 'hatem.jpg', stats: { averageRating: 7.2, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 46, keyPassesPerMatch: 1.2, minutes: 400 } },
    { id: 'qat14', name: 'Ahmed Al-Ganehi', pos: 'Midfielder', age: 25, image: 'alganehi.jpg', stats: { averageRating: 6.9, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 27, keyPassesPerMatch: 1.0, minutes: 290 } },
    { id: 'qat15', name: 'Issa Laye', pos: 'Defender', age: 28, image: 'laye.jpg', stats: { averageRating: 7.2, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 48, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.6, minutes: 440 } },
    { id: 'qat16', name: 'Pedro Miguel', pos: 'Defender', age: 35, image: 'pedromiguel.jpg', stats: { averageRating: 7.3, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 43, keyPassesPerMatch: 0.8, interceptionsPerMatch: 1.5, tacklesPerMatch: 1.8, minutes: 470 } },
    { id: 'qat17', name: 'Boualem Khoukhi', pos: 'Defender', age: 36, image: 'khoukhi.jpg', stats: { averageRating: 7.2, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 52, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.8, tacklesPerMatch: 1.4, minutes: 480 } },
    { id: 'qat18', name: 'Homam Al-Amin', pos: 'Defender', age: 26, image: 'alamin.jpg', stats: { averageRating: 7.1, goals: 0, assists: 2, ga: 2, accuratePassesPerMatch: 41, keyPassesPerMatch: 0.8, interceptionsPerMatch: 1.4, tacklesPerMatch: 1.9, minutes: 430 } },
    { id: 'qat19', name: 'Lucas Mendes', pos: 'Defender', age: 36, image: 'lucasmendes.jpg', stats: { averageRating: 7.2, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 51, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.5, minutes: 450 } },
    { id: 'qat20', name: 'Ayoub Al Oui', pos: 'Defender', age: 21, image: 'aloui.jpg', stats: { averageRating: 6.8, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 36, keyPassesPerMatch: 0.6, interceptionsPerMatch: 1.2, tacklesPerMatch: 1.6, minutes: 280 } },
    { id: 'qat21', name: 'Sultan Al-Brake', pos: 'Defender', age: 30, image: 'albrake.jpg', stats: { averageRating: 7.0, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 39, keyPassesPerMatch: 0.5, interceptionsPerMatch: 1.4, tacklesPerMatch: 1.7, minutes: 350 } },
    { id: 'qat22', name: 'Al-Hashmi Al-Hussain', pos: 'Defender', age: 22, image: 'alhussain.jpg', stats: { averageRating: 6.9, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 42, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.5, tacklesPerMatch: 1.4, minutes: 300 } },
    { id: 'qat23', name: 'Mahmud Abunada', pos: 'Goalkeeper', age: 26, image: 'abunada.jpg', stats: { averageRating: 7.4, goalsPrevented: 2.4, savesPerMatch: 3.6, minutes: 540 } },
    { id: 'qat24', name: 'Meshaal Barsham', pos: 'Goalkeeper', age: 28, image: 'barsham.jpg', stats: { averageRating: 7.0, goalsPrevented: 1.5, savesPerMatch: 3.0, minutes: 0 } },
    { id: 'qat25', name: 'Salah Zakaria', pos: 'Goalkeeper', age: 27, image: 'zakaria.jpg', stats: { averageRating: 6.8, goalsPrevented: 1.0, savesPerMatch: 2.5, minutes: 0 } }
  ],
  'SCO': [
    { id: 'sco1', name: 'Che Adams', pos: 'Attacker', age: 30, image: 'adams.jpg', stats: { averageRating: 7.2, goals: 3, assists: 1, ga: 4, shotsOnTargetPerMatch: 1.3, accuratePassesPerMatch: 18, keyPassesPerMatch: 0.7, minutes: 450, totalShots: 15 } },
    { id: 'sco2', name: 'Lawrence Shankland', pos: 'Attacker', age: 30, image: 'shankland.jpg', stats: { averageRating: 7.0, goals: 2, assists: 1, ga: 3, shotsOnTargetPerMatch: 1.1, accuratePassesPerMatch: 16, keyPassesPerMatch: 0.6, minutes: 340, totalShots: 12 } },
    { id: 'sco3', name: 'Lyndon Dykes', pos: 'Attacker', age: 30, image: 'dykes.jpg', stats: { averageRating: 6.9, goals: 2, assists: 0, ga: 2, shotsOnTargetPerMatch: 1.0, accuratePassesPerMatch: 14, keyPassesPerMatch: 0.5, minutes: 320, totalShots: 11 } },
    { id: 'sco4', name: 'George Hirst', pos: 'Attacker', age: 27, image: 'hirst.jpg', stats: { averageRating: 6.8, goals: 1, assists: 0, ga: 1, shotsOnTargetPerMatch: 0.8, accuratePassesPerMatch: 15, keyPassesPerMatch: 0.4, minutes: 240, totalShots: 8 } },
    { id: 'sco5', name: 'Ross Stewart', pos: 'Attacker', age: 29, image: 'stewart.jpg', stats: { averageRating: 6.7, goals: 1, assists: 0, ga: 1, shotsOnTargetPerMatch: 0.7, accuratePassesPerMatch: 13, keyPassesPerMatch: 0.3, minutes: 190, totalShots: 6 } },
    { id: 'sco6', name: 'Scott McTominay', pos: 'Midfielder', age: 29, image: 'mctominay.jpg', stats: { averageRating: 7.8, goals: 4, assists: 2, ga: 6, accuratePassesPerMatch: 43, keyPassesPerMatch: 1.4, minutes: 520 } },
    { id: 'sco7', name: 'Ben Gannon-Doak', pos: 'Midfielder', age: 20, image: 'gannondoak.jpg', stats: { averageRating: 7.1, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 27, keyPassesPerMatch: 1.3, minutes: 320 } },
    { id: 'sco8', name: 'John McGinn', pos: 'Midfielder', age: 31, image: 'mcginn.jpg', stats: { averageRating: 7.5, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 39, keyPassesPerMatch: 1.8, minutes: 500 } },
    { id: 'sco9', name: 'Tyler Fletcher', pos: 'Midfielder', age: 19, image: 'fletcher.jpg', stats: { averageRating: 6.8, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 34, keyPassesPerMatch: 0.6, minutes: 220 } },
    { id: 'sco10', name: 'Lewis Ferguson', pos: 'Midfielder', age: 26, image: 'ferguson.jpg', stats: { averageRating: 7.2, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 42, keyPassesPerMatch: 1.1, minutes: 400 } },
    { id: 'sco11', name: 'Findlay Curtis', pos: 'Midfielder', age: 19, image: 'curtis.jpg', stats: { averageRating: 6.7, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 24, keyPassesPerMatch: 0.7, minutes: 180 } },
    { id: 'sco12', name: 'Ryan Christie', pos: 'Midfielder', age: 31, image: 'christie.jpg', stats: { averageRating: 7.3, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 41, keyPassesPerMatch: 1.7, minutes: 430 } },
    { id: 'sco13', name: 'Kenny McLean', pos: 'Midfielder', age: 34, image: 'mclean.jpg', stats: { averageRating: 7.0, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 47, keyPassesPerMatch: 0.7, minutes: 390 } },
    { id: 'sco14', name: 'Andy Robertson', pos: 'Defender', age: 32, image: 'robertson.jpg', stats: { averageRating: 7.6, goals: 0, assists: 4, ga: 4, accuratePassesPerMatch: 48, keyPassesPerMatch: 1.5, interceptionsPerMatch: 1.5, tacklesPerMatch: 1.8, minutes: 520 } },
    { id: 'sco15', name: 'Kieran Tierney', pos: 'Defender', age: 29, image: 'tierney.jpg', stats: { averageRating: 7.3, goals: 0, assists: 2, ga: 2, accuratePassesPerMatch: 44, keyPassesPerMatch: 0.8, interceptionsPerMatch: 1.6, tacklesPerMatch: 1.7, minutes: 460 } },
    { id: 'sco16', name: 'Scott McKenna', pos: 'Defender', age: 29, image: 'mckenna.jpg', stats: { averageRating: 7.1, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 45, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.4, minutes: 450 } },
    { id: 'sco17', name: 'Aaron Hickey', pos: 'Defender', age: 24, image: 'hickey.jpg', stats: { averageRating: 7.2, goals: 0, assists: 2, ga: 2, accuratePassesPerMatch: 40, keyPassesPerMatch: 0.9, interceptionsPerMatch: 1.4, tacklesPerMatch: 1.9, minutes: 410 } },
    { id: 'sco18', name: 'Nathan Patterson', pos: 'Defender', age: 24, image: 'patterson.jpg', stats: { averageRating: 6.9, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 36, keyPassesPerMatch: 0.6, interceptionsPerMatch: 1.2, tacklesPerMatch: 1.7, minutes: 300 } },
    { id: 'sco19', name: 'Jack Hendry', pos: 'Defender', age: 31, image: 'hendry.jpg', stats: { averageRating: 7.1, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 47, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.6, tacklesPerMatch: 1.3, minutes: 440 } },
    { id: 'sco20', name: 'Tony Ralston', pos: 'Defender', age: 27, image: 'ralston.jpg', stats: { averageRating: 6.9, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 37, keyPassesPerMatch: 0.6, interceptionsPerMatch: 1.3, tacklesPerMatch: 1.8, minutes: 310 } },
    { id: 'sco21', name: 'John Souttar', pos: 'Defender', age: 29, image: 'souttar.jpg', stats: { averageRating: 7.2, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 49, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.8, tacklesPerMatch: 1.5, minutes: 450 } },
    { id: 'sco22', name: 'Grant Hanley', pos: 'Defender', age: 34, image: 'hanley.jpg', stats: { averageRating: 6.9, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 42, keyPassesPerMatch: 0.1, interceptionsPerMatch: 1.5, tacklesPerMatch: 1.3, minutes: 330 } },
    { id: 'sco23', name: 'Dominic Hyam', pos: 'Defender', age: 30, image: 'hyam.jpg', stats: { averageRating: 6.8, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 40, keyPassesPerMatch: 0.1, interceptionsPerMatch: 1.4, tacklesPerMatch: 1.2, minutes: 280 } },
    { id: 'sco24', name: 'Angus Gunn', pos: 'Goalkeeper', age: 30, image: 'gunn.jpg', stats: { averageRating: 7.4, goalsPrevented: 2.6, savesPerMatch: 3.7, minutes: 540 } },
    { id: 'sco25', name: 'Liam Kelly', pos: 'Goalkeeper', age: 30, image: 'kelly.jpg', stats: { averageRating: 6.8, goalsPrevented: 1.1, savesPerMatch: 2.8, minutes: 0 } }
  ],
  'HAI': [
    { id: 'hai1', name: 'Wilson Isidor', pos: 'Attacker', age: 25, image: 'isidor.jpg', stats: { averageRating: 7.3, goals: 3, assists: 2, ga: 5, shotsOnTargetPerMatch: 1.4, accuratePassesPerMatch: 18, keyPassesPerMatch: 0.8, minutes: 460, totalShots: 16 } },
    { id: 'hai2', name: 'Duckens Nazon', pos: 'Attacker', age: 32, image: 'nazon.jpg', stats: { averageRating: 7.4, goals: 4, assists: 1, ga: 5, shotsOnTargetPerMatch: 1.5, accuratePassesPerMatch: 16, keyPassesPerMatch: 0.7, minutes: 480, totalShots: 18 } },
    { id: 'hai3', name: 'Frantzdy Pierrot', pos: 'Attacker', age: 31, image: 'pierrot.jpg', stats: { averageRating: 7.2, goals: 3, assists: 1, ga: 4, shotsOnTargetPerMatch: 1.3, accuratePassesPerMatch: 14, keyPassesPerMatch: 0.5, minutes: 420, totalShots: 15 } },
    { id: 'hai4', name: 'Lenny Joseph', pos: 'Attacker', age: 25, image: 'joseph.jpg', stats: { averageRating: 7.0, goals: 2, assists: 2, ga: 4, shotsOnTargetPerMatch: 1.1, accuratePassesPerMatch: 20, keyPassesPerMatch: 1.0, minutes: 360, totalShots: 12 } },
    { id: 'hai5', name: 'Louicius Don Deedson', pos: 'Attacker', age: 25, image: 'deedson.jpg', stats: { averageRating: 6.9, goals: 1, assists: 2, ga: 3, shotsOnTargetPerMatch: 0.9, accuratePassesPerMatch: 21, keyPassesPerMatch: 0.9, minutes: 310, totalShots: 10 } },
    { id: 'hai6', name: 'Yassin Fortune', pos: 'Attacker', age: 27, image: 'fortune.jpg', stats: { averageRating: 6.8, goals: 1, assists: 0, ga: 1, shotsOnTargetPerMatch: 0.8, accuratePassesPerMatch: 15, keyPassesPerMatch: 0.4, minutes: 240, totalShots: 8 } },
    { id: 'hai7', name: 'Derrick Etienne', pos: 'Attacker', age: 29, image: 'etienne.jpg', stats: { averageRating: 7.0, goals: 1, assists: 2, ga: 3, shotsOnTargetPerMatch: 0.8, accuratePassesPerMatch: 25, keyPassesPerMatch: 1.2, minutes: 340, totalShots: 9 } },
    { id: 'hai8', name: 'Jean-Ricner Bellegarde', pos: 'Midfielder', age: 28, image: 'bellegarde.jpg', stats: { averageRating: 7.5, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 43, keyPassesPerMatch: 1.7, minutes: 500 } },
    { id: 'hai9', name: 'Josué Casimir', pos: 'Midfielder', age: 24, image: 'casimir.jpg', stats: { averageRating: 7.2, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 32, keyPassesPerMatch: 1.3, minutes: 390 } },
    { id: 'hai10', name: 'Ruben Providence', pos: 'Midfielder', age: 25, image: 'providence.jpg', stats: { averageRating: 7.1, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 29, keyPassesPerMatch: 1.2, minutes: 350 } },
    { id: 'hai11', name: 'Danley Jean Jacques', pos: 'Midfielder', age: 26, image: 'jeanjacques.jpg', stats: { averageRating: 7.3, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 46, keyPassesPerMatch: 0.8, minutes: 450 } },
    { id: 'hai12', name: 'Woodensky Pierre', pos: 'Midfielder', age: 21, image: 'woodenskypierre.jpg', stats: { averageRating: 6.8, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 30, keyPassesPerMatch: 0.6, minutes: 220 } },
    { id: 'hai13', name: 'Dominique Simon', pos: 'Midfielder', age: 25, image: 'simon.jpg', stats: { averageRating: 7.0, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 41, keyPassesPerMatch: 0.6, minutes: 360 } },
    { id: 'hai14', name: 'Ricardo Adé', pos: 'Defender', age: 36, image: 'ade.jpg', stats: { averageRating: 7.3, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 43, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.8, tacklesPerMatch: 1.5, minutes: 470 } },
    { id: 'hai15', name: 'Martin Expérience', pos: 'Defender', age: 27, image: 'experience.jpg', stats: { averageRating: 7.0, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 36, keyPassesPerMatch: 0.5, interceptionsPerMatch: 1.3, tacklesPerMatch: 1.8, minutes: 350 } },
    { id: 'hai16', name: 'Carlens Arcus', pos: 'Defender', age: 30, image: 'arcus.jpg', stats: { averageRating: 7.2, goals: 0, assists: 2, ga: 2, accuratePassesPerMatch: 40, keyPassesPerMatch: 0.7, interceptionsPerMatch: 1.5, tacklesPerMatch: 1.9, minutes: 430 } },
    { id: 'hai17', name: 'Hannes Delcroix', pos: 'Defender', age: 27, image: 'delcroix.jpg', stats: { averageRating: 7.2, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 47, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.5, minutes: 440 } },
    { id: 'hai18', name: 'Duke Lacroix', pos: 'Defender', age: 32, image: 'lacroix.jpg', stats: { averageRating: 6.9, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 34, keyPassesPerMatch: 0.4, interceptionsPerMatch: 1.3, tacklesPerMatch: 1.6, minutes: 310 } },
    { id: 'hai19', name: 'Jean-Kévin Duverne', pos: 'Defender', age: 29, image: 'duverne.jpg', stats: { averageRating: 7.4, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 48, keyPassesPerMatch: 0.5, interceptionsPerMatch: 1.8, tacklesPerMatch: 1.7, minutes: 480 } },
    { id: 'hai20', name: 'Carl Fred Sainté', pos: 'Defender', age: 23, image: 'sainte.jpg', stats: { averageRating: 7.0, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 40, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.5, tacklesPerMatch: 1.5, minutes: 340 } },
    { id: 'hai21', name: 'Keeto Thermoncy', pos: 'Defender', age: 20, image: 'thermoncy.jpg', stats: { averageRating: 6.7, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 32, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.2, tacklesPerMatch: 1.3, minutes: 200 } },
    { id: 'hai22', name: 'Garven-Michee Metusala', pos: 'Defender', age: 26, image: 'metusala.jpg', stats: { averageRating: 7.0, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 42, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.6, tacklesPerMatch: 1.4, minutes: 370 } },
    { id: 'hai23', name: 'Wilguens Paugain', pos: 'Defender', age: 24, image: 'paugain.jpg', stats: { averageRating: 6.9, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 35, keyPassesPerMatch: 0.5, interceptionsPerMatch: 1.3, tacklesPerMatch: 1.7, minutes: 300 } },
    { id: 'hai24', name: 'Johny Placide', pos: 'Goalkeeper', age: 38, image: 'placide.jpg', stats: { averageRating: 7.5, goalsPrevented: 3.0, savesPerMatch: 4.0, minutes: 540 } },
    { id: 'hai25', name: 'Alexandre Pierre', pos: 'Goalkeeper', age: 25, image: 'alexandrepierre.jpg', stats: { averageRating: 6.9, goalsPrevented: 1.3, savesPerMatch: 3.0, minutes: 0 } },
    { id: 'hai26', name: 'Josué Duverger', pos: 'Goalkeeper', age: 26, image: 'duverger.jpg', stats: { averageRating: 6.8, goalsPrevented: 1.0, savesPerMatch: 2.7, minutes: 0 } }
  ],
  'USA': [
    { id: 'usa1', name: 'Christian Pulisic', pos: 'Attacker', age: 27, image: 'pulisic.jpg', stats: { averageRating: 7.8, goals: 5, assists: 4, ga: 9, shotsOnTargetPerMatch: 1.8, accuratePassesPerMatch: 32, keyPassesPerMatch: 2.1, minutes: 520, totalShots: 22 } },
    { id: 'usa2', name: 'Folarin Balogun', pos: 'Attacker', age: 25, image: 'balogun.jpg', stats: { averageRating: 7.4, goals: 4, assists: 1, ga: 5, shotsOnTargetPerMatch: 1.6, accuratePassesPerMatch: 18, keyPassesPerMatch: 0.7, minutes: 450, totalShots: 19 } },
    { id: 'usa3', name: 'Ricardo Pepi', pos: 'Attacker', age: 23, image: 'pepi.jpg', stats: { averageRating: 7.2, goals: 3, assists: 1, ga: 4, shotsOnTargetPerMatch: 1.4, accuratePassesPerMatch: 16, keyPassesPerMatch: 0.5, minutes: 360, totalShots: 15 } },
    { id: 'usa4', name: 'Haji Wright', pos: 'Attacker', age: 28, image: 'wright.jpg', stats: { averageRating: 7.0, goals: 2, assists: 1, ga: 3, shotsOnTargetPerMatch: 1.2, accuratePassesPerMatch: 17, keyPassesPerMatch: 0.6, minutes: 320, totalShots: 13 } },
    { id: 'usa5', name: 'Timothy Weah', pos: 'Midfielder', age: 26, image: 'weah.jpg', stats: { averageRating: 7.3, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 35, keyPassesPerMatch: 1.4, minutes: 460 } },
    { id: 'usa6', name: 'Weston McKennie', pos: 'Midfielder', age: 27, image: 'mckennie.jpg', stats: { averageRating: 7.5, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 44, keyPassesPerMatch: 1.5, minutes: 500 } },
    { id: 'usa7', name: 'Malik Tillman', pos: 'Midfielder', age: 24, image: 'tillman.jpg', stats: { averageRating: 7.4, goals: 3, assists: 2, ga: 5, accuratePassesPerMatch: 40, keyPassesPerMatch: 1.7, minutes: 430 } },
    { id: 'usa8', name: 'Giovanni Reyna', pos: 'Midfielder', age: 23, image: 'reyna.jpg', stats: { averageRating: 7.4, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 38, keyPassesPerMatch: 1.9, minutes: 390 } },
    { id: 'usa9', name: 'Tyler Adams', pos: 'Midfielder', age: 27, image: 'adams.jpg', stats: { averageRating: 7.3, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 49, keyPassesPerMatch: 0.6, minutes: 470 } },
    { id: 'usa10', name: 'Brenden Aaronson', pos: 'Midfielder', age: 25, image: 'aaronson.jpg', stats: { averageRating: 7.1, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 34, keyPassesPerMatch: 1.3, minutes: 350 } },
    { id: 'usa11', name: 'Alex Zendejas', pos: 'Midfielder', age: 28, image: 'zendejas.jpg', stats: { averageRating: 7.0, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 30, keyPassesPerMatch: 1.2, minutes: 300 } },
    { id: 'usa12', name: 'Sebastian Berhalter', pos: 'Midfielder', age: 25, image: 'berhalter.jpg', stats: { averageRating: 6.9, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 42, keyPassesPerMatch: 0.7, minutes: 290 } },
    { id: 'usa13', name: 'Cristian Roldán', pos: 'Midfielder', age: 31, image: 'roldan.jpg', stats: { averageRating: 6.9, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 40, keyPassesPerMatch: 0.8, minutes: 270 } },
    { id: 'usa14', name: 'Maximilian Arfsten', pos: 'Midfielder', age: 25, image: 'arfsten.jpg', stats: { averageRating: 6.8, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 28, keyPassesPerMatch: 0.7, minutes: 230 } },
    { id: 'usa15', name: 'Sergiño Dest', pos: 'Defender', age: 25, image: 'dest.jpg', stats: { averageRating: 7.5, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 46, keyPassesPerMatch: 1.2, interceptionsPerMatch: 1.4, tacklesPerMatch: 1.8, minutes: 490 } },
    { id: 'usa16', name: 'Antonee Robinson', pos: 'Defender', age: 28, image: 'robinson.jpg', stats: { averageRating: 7.6, goals: 0, assists: 4, ga: 4, accuratePassesPerMatch: 48, keyPassesPerMatch: 1.4, interceptionsPerMatch: 1.5, tacklesPerMatch: 2.0, minutes: 520 } },
    { id: 'usa17', name: 'Chris Richards', pos: 'Defender', age: 26, image: 'richards.jpg', stats: { averageRating: 7.3, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 52, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.5, minutes: 500 } },
    { id: 'usa18', name: 'Alexander Freeman', pos: 'Defender', age: 21, image: 'freeman.jpg', stats: { averageRating: 7.0, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 37, keyPassesPerMatch: 0.5, interceptionsPerMatch: 1.3, tacklesPerMatch: 1.6, minutes: 320 } },
    { id: 'usa19', name: 'Tim Ream', pos: 'Defender', age: 38, image: 'ream.jpg', stats: { averageRating: 7.2, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 56, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.6, tacklesPerMatch: 1.1, minutes: 450 } },
    { id: 'usa20', name: 'Joe Scally', pos: 'Defender', age: 23, image: 'scally.jpg', stats: { averageRating: 7.1, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 41, keyPassesPerMatch: 0.6, interceptionsPerMatch: 1.4, tacklesPerMatch: 1.8, minutes: 380 } },
    { id: 'usa21', name: 'Auston Trusty', pos: 'Defender', age: 27, image: 'trusty.jpg', stats: { averageRating: 7.0, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 45, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.5, tacklesPerMatch: 1.3, minutes: 360 } },
    { id: 'usa22', name: 'Mark McKenzie', pos: 'Defender', age: 27, image: 'mckenzie.jpg', stats: { averageRating: 7.1, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 47, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.6, tacklesPerMatch: 1.4, minutes: 390 } },
    { id: 'usa23', name: 'Miles Robinson', pos: 'Defender', age: 29, image: 'milesrobinson.jpg', stats: { averageRating: 7.0, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 44, keyPassesPerMatch: 0.1, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.5, minutes: 370 } },
    { id: 'usa24', name: 'Matt Turner', pos: 'Goalkeeper', age: 32, image: 'turner.jpg', stats: { averageRating: 7.4, goalsPrevented: 2.8, savesPerMatch: 3.6, minutes: 450 } },
    { id: 'usa25', name: 'Matthew Freese', pos: 'Goalkeeper', age: 27, image: 'freese.jpg', stats: { averageRating: 7.2, goalsPrevented: 2.0, savesPerMatch: 3.3, minutes: 90 } },
    { id: 'usa26', name: 'Chris Brady', pos: 'Goalkeeper', age: 22, image: 'brady.jpg', stats: { averageRating: 6.9, goalsPrevented: 1.2, savesPerMatch: 2.8, minutes: 0 } }
  ],
  'AUS': [
    { id: 'aus1', name: 'Nestory Irankunda', pos: 'Attacker', age: 20, image: 'irankunda.jpg', stats: { averageRating: 7.4, goals: 3, assists: 2, ga: 5, shotsOnTargetPerMatch: 1.5, accuratePassesPerMatch: 20, keyPassesPerMatch: 1.2, minutes: 420, totalShots: 17 } },
    { id: 'aus2', name: 'Mohamed Touré', pos: 'Attacker', age: 22, image: 'toure.jpg', stats: { averageRating: 7.1, goals: 2, assists: 1, ga: 3, shotsOnTargetPerMatch: 1.2, accuratePassesPerMatch: 16, keyPassesPerMatch: 0.7, minutes: 350, totalShots: 13 } },
    { id: 'aus3', name: 'Tete Yengi', pos: 'Attacker', age: 25, image: 'yengi.jpg', stats: { averageRating: 7.0, goals: 2, assists: 1, ga: 3, shotsOnTargetPerMatch: 1.1, accuratePassesPerMatch: 15, keyPassesPerMatch: 0.5, minutes: 330, totalShots: 12 } },
    { id: 'aus4', name: 'Jackson Irvine', pos: 'Midfielder', age: 33, image: 'irvine.jpg', stats: { averageRating: 7.5, goals: 2, assists: 2, ga: 4, accuratePassesPerMatch: 44, keyPassesPerMatch: 1.3, minutes: 510 } },
    { id: 'aus5', name: 'Cristian Volpato', pos: 'Midfielder', age: 22, image: 'volpato.jpg', stats: { averageRating: 7.2, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 36, keyPassesPerMatch: 1.7, minutes: 400 } },
    { id: 'aus6', name: 'Connor Metcalfe', pos: 'Midfielder', age: 26, image: 'metcalfe.jpg', stats: { averageRating: 7.3, goals: 2, assists: 2, ga: 4, accuratePassesPerMatch: 40, keyPassesPerMatch: 1.4, minutes: 450 } },
    { id: 'aus7', name: "Aiden O'Neill", pos: 'Midfielder', age: 28, image: 'oneill.jpg', stats: { averageRating: 7.1, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 47, keyPassesPerMatch: 0.6, minutes: 430 } },
    { id: 'aus8', name: 'Paul Okon-Engstler', pos: 'Midfielder', age: 21, image: 'okonengstler.jpg', stats: { averageRating: 6.9, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 38, keyPassesPerMatch: 0.5, minutes: 280 } },
    { id: 'aus9', name: 'Awer Mabil', pos: 'Midfielder', age: 30, image: 'mabil.jpg', stats: { averageRating: 7.1, goals: 2, assists: 2, ga: 4, accuratePassesPerMatch: 29, keyPassesPerMatch: 1.4, minutes: 360 } },
    { id: 'aus10', name: 'Ajdin Hrustić', pos: 'Midfielder', age: 30, image: 'hrustic.jpg', stats: { averageRating: 7.2, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 43, keyPassesPerMatch: 1.5, minutes: 390 } },
    { id: 'aus11', name: 'Nishan Velupillay', pos: 'Midfielder', age: 25, image: 'velupillay.jpg', stats: { averageRating: 7.0, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 30, keyPassesPerMatch: 1.2, minutes: 320 } },
    { id: 'aus12', name: 'Mathew Leckie', pos: 'Midfielder', age: 35, image: 'leckie.jpg', stats: { averageRating: 7.1, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 31, keyPassesPerMatch: 1.1, minutes: 340 } },
    { id: 'aus13', name: 'Cameron Devlin', pos: 'Midfielder', age: 28, image: 'devlin.jpg', stats: { averageRating: 7.0, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 45, keyPassesPerMatch: 0.5, minutes: 350 } },
    { id: 'aus14', name: 'Jacob Italiano', pos: 'Midfielder', age: 24, image: 'italiano.jpg', stats: { averageRating: 6.8, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 31, keyPassesPerMatch: 0.8, minutes: 220 } },
    { id: 'aus15', name: 'Kai Trewin', pos: 'Midfielder', age: 25, image: 'trewin.jpg', stats: { averageRating: 7.0, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 46, keyPassesPerMatch: 0.4, minutes: 330 } },
    { id: 'aus16', name: 'Harry Souttar', pos: 'Defender', age: 27, image: 'souttar.jpg', stats: { averageRating: 7.5, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 51, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.8, tacklesPerMatch: 1.4, minutes: 520 } },
    { id: 'aus17', name: 'Alessandro Circati', pos: 'Defender', age: 22, image: 'circati.jpg', stats: { averageRating: 7.3, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 49, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.5, minutes: 480 } },
    { id: 'aus18', name: 'Jordan Bos', pos: 'Defender', age: 23, image: 'bos.jpg', stats: { averageRating: 7.3, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 42, keyPassesPerMatch: 1.0, interceptionsPerMatch: 1.3, tacklesPerMatch: 1.8, minutes: 450 } },
    { id: 'aus19', name: 'Lucas Herrington', pos: 'Defender', age: 19, image: 'herrington.jpg', stats: { averageRating: 6.9, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 43, keyPassesPerMatch: 0.1, interceptionsPerMatch: 1.4, tacklesPerMatch: 1.3, minutes: 280 } },
    { id: 'aus20', name: 'Aziz Behich', pos: 'Defender', age: 35, image: 'behich.jpg', stats: { averageRating: 7.0, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 39, keyPassesPerMatch: 0.7, interceptionsPerMatch: 1.3, tacklesPerMatch: 1.6, minutes: 350 } },
    { id: 'aus21', name: 'Miloš Degenek', pos: 'Defender', age: 32, image: 'degenek.jpg', stats: { averageRating: 7.1, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 47, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.6, tacklesPerMatch: 1.3, minutes: 380 } },
    { id: 'aus22', name: 'Cameron Burgess', pos: 'Defender', age: 30, image: 'burgess.jpg', stats: { averageRating: 7.2, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 48, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.4, minutes: 400 } },
    { id: 'aus23', name: 'Jason Geria', pos: 'Defender', age: 33, image: 'geria.jpg', stats: { averageRating: 7.0, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 40, keyPassesPerMatch: 0.5, interceptionsPerMatch: 1.4, tacklesPerMatch: 1.7, minutes: 340 } },
    { id: 'aus24', name: 'Patrick Beach', pos: 'Goalkeeper', age: 22, image: 'beach.jpg', stats: { averageRating: 7.0, goalsPrevented: 1.5, savesPerMatch: 3.0, minutes: 90 } },
    { id: 'aus25', name: 'Mathew Ryan', pos: 'Goalkeeper', age: 34, image: 'ryan.jpg', stats: { averageRating: 7.5, goalsPrevented: 3.0, savesPerMatch: 3.7, minutes: 450 } },
    { id: 'aus26', name: 'Paul Izzo', pos: 'Goalkeeper', age: 31, image: 'izzo.jpg', stats: { averageRating: 6.9, goalsPrevented: 1.3, savesPerMatch: 2.8, minutes: 0 } }
  ],
  'PAR': [
    { id: 'par1', name: 'Ramón Sosa', pos: 'Attacker', age: 26, image: 'sosa.jpg', stats: { averageRating: 7.4, goals: 3, assists: 3, ga: 6, shotsOnTargetPerMatch: 1.5, accuratePassesPerMatch: 24, keyPassesPerMatch: 1.5, minutes: 450, totalShots: 17 } },
    { id: 'par2', name: 'Antonio Sanabria', pos: 'Attacker', age: 30, image: 'sanabria.jpg', stats: { averageRating: 7.3, goals: 4, assists: 1, ga: 5, shotsOnTargetPerMatch: 1.6, accuratePassesPerMatch: 18, keyPassesPerMatch: 0.7, minutes: 470, totalShots: 19 } },
    { id: 'par3', name: 'Alex Arce', pos: 'Attacker', age: 31, image: 'arce.jpg', stats: { averageRating: 7.0, goals: 2, assists: 1, ga: 3, shotsOnTargetPerMatch: 1.2, accuratePassesPerMatch: 15, keyPassesPerMatch: 0.5, minutes: 330, totalShots: 13 } },
    { id: 'par4', name: 'Isidro Pitta', pos: 'Attacker', age: 26, image: 'pitta.jpg', stats: { averageRating: 6.9, goals: 2, assists: 0, ga: 2, shotsOnTargetPerMatch: 1.1, accuratePassesPerMatch: 16, keyPassesPerMatch: 0.4, minutes: 300, totalShots: 11 } },
    { id: 'par5', name: 'Gabriel Ávalos', pos: 'Attacker', age: 35, image: 'avalos.jpg', stats: { averageRating: 6.8, goals: 1, assists: 0, ga: 1, shotsOnTargetPerMatch: 0.9, accuratePassesPerMatch: 14, keyPassesPerMatch: 0.3, minutes: 240, totalShots: 9 } },
    { id: 'par6', name: 'Julio Enciso', pos: 'Midfielder', age: 22, image: 'enciso.jpg', stats: { averageRating: 7.6, goals: 3, assists: 3, ga: 6, accuratePassesPerMatch: 38, keyPassesPerMatch: 2.0, minutes: 460 } },
    { id: 'par7', name: 'Diego Gómez', pos: 'Midfielder', age: 23, image: 'gomez.jpg', stats: { averageRating: 7.4, goals: 2, assists: 2, ga: 4, accuratePassesPerMatch: 42, keyPassesPerMatch: 1.4, minutes: 480 } },
    { id: 'par8', name: 'Miguel Almirón', pos: 'Midfielder', age: 32, image: 'almiron.jpg', stats: { averageRating: 7.5, goals: 3, assists: 3, ga: 6, accuratePassesPerMatch: 36, keyPassesPerMatch: 1.8, minutes: 500 } },
    { id: 'par9', name: 'Mauricio', pos: 'Midfielder', age: 25, image: 'mauricio.jpg', stats: { averageRating: 7.1, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 40, keyPassesPerMatch: 1.3, minutes: 380 } },
    { id: 'par10', name: 'Matías Galarza', pos: 'Midfielder', age: 24, image: 'galarza.jpg', stats: { averageRating: 7.0, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 44, keyPassesPerMatch: 0.9, minutes: 360 } },
    { id: 'par11', name: 'Damián Bobadilla', pos: 'Midfielder', age: 25, image: 'bobadilla.jpg', stats: { averageRating: 7.2, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 47, keyPassesPerMatch: 0.8, minutes: 420 } },
    { id: 'par12', name: 'Andrés Cubas', pos: 'Midfielder', age: 30, image: 'cubas.jpg', stats: { averageRating: 7.3, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 50, keyPassesPerMatch: 0.6, minutes: 490 } },
    { id: 'par13', name: 'Gustavo Caballero', pos: 'Midfielder', age: 24, image: 'caballero.jpg', stats: { averageRating: 6.9, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 30, keyPassesPerMatch: 1.0, minutes: 280 } },
    { id: 'par14', name: 'Alejandro Romero', pos: 'Midfielder', age: 31, image: 'romero.jpg', stats: { averageRating: 7.1, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 39, keyPassesPerMatch: 1.4, minutes: 350 } },
    { id: 'par15', name: 'Braian Ojeda', pos: 'Midfielder', age: 26, image: 'ojeda.jpg', stats: { averageRating: 7.0, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 45, keyPassesPerMatch: 0.6, minutes: 340 } },
    { id: 'par16', name: 'Gustavo Gómez', pos: 'Defender', age: 33, image: 'gustavogomez.jpg', stats: { averageRating: 7.6, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 52, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.9, tacklesPerMatch: 1.6, minutes: 530 } },
    { id: 'par17', name: 'Omar Alderete', pos: 'Defender', age: 29, image: 'alderete.jpg', stats: { averageRating: 7.4, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 49, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.8, tacklesPerMatch: 1.5, minutes: 510 } },
    { id: 'par18', name: 'Junior Alonso', pos: 'Defender', age: 33, image: 'alonso.jpg', stats: { averageRating: 7.3, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 48, keyPassesPerMatch: 0.4, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.5, minutes: 480 } },
    { id: 'par19', name: 'Juan Cáceres', pos: 'Defender', age: 26, image: 'caceres.jpg', stats: { averageRating: 7.1, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 40, keyPassesPerMatch: 0.5, interceptionsPerMatch: 1.4, tacklesPerMatch: 1.8, minutes: 390 } },
    { id: 'par20', name: 'Fabián Balbuena', pos: 'Defender', age: 34, image: 'balbuena.jpg', stats: { averageRating: 7.2, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 46, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.4, minutes: 430 } },
    { id: 'par21', name: 'José Canale', pos: 'Defender', age: 29, image: 'canale.jpg', stats: { averageRating: 7.0, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 43, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.5, tacklesPerMatch: 1.3, minutes: 350 } },
    { id: 'par22', name: 'Gustavo Velázquez', pos: 'Defender', age: 35, image: 'velazquez.jpg', stats: { averageRating: 7.0, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 42, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.5, tacklesPerMatch: 1.4, minutes: 340 } },
    { id: 'par23', name: 'Alejandro Maidana', pos: 'Defender', age: 20, image: 'maidana.jpg', stats: { averageRating: 6.8, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 36, keyPassesPerMatch: 0.5, interceptionsPerMatch: 1.2, tacklesPerMatch: 1.5, minutes: 250 } },
    { id: 'par24', name: 'Orlando Gill', pos: 'Goalkeeper', age: 26, image: 'gill.jpg', stats: { averageRating: 7.4, goalsPrevented: 2.7, savesPerMatch: 3.5, minutes: 450 } },
    { id: 'par25', name: 'Roberto Fernández', pos: 'Goalkeeper', age: 38, image: 'fernandez.jpg', stats: { averageRating: 7.0, goalsPrevented: 1.6, savesPerMatch: 3.0, minutes: 90 } },
    { id: 'par26', name: 'Gastón Olveira', pos: 'Goalkeeper', age: 33, image: 'olveira.jpg', stats: { averageRating: 6.9, goalsPrevented: 1.2, savesPerMatch: 2.7, minutes: 0 } }
  ],
  'TUR': [
    { id: 'tur1', name: 'Kenan Yıldız', pos: 'Attacker', age: 21, image: 'yildiz.jpg', stats: { averageRating: 7.6, goals: 4, assists: 3, ga: 7, shotsOnTargetPerMatch: 1.7, accuratePassesPerMatch: 28, keyPassesPerMatch: 1.8, minutes: 480, totalShots: 20 } },
    { id: 'tur2', name: 'Kerem Aktürkoğlu', pos: 'Attacker', age: 27, image: 'akturkoglu.jpg', stats: { averageRating: 7.5, goals: 5, assists: 2, ga: 7, shotsOnTargetPerMatch: 1.8, accuratePassesPerMatch: 25, keyPassesPerMatch: 1.6, minutes: 500, totalShots: 22 } },
    { id: 'tur3', name: 'Deniz Gül', pos: 'Attacker', age: 22, image: 'gul.jpg', stats: { averageRating: 6.9, goals: 2, assists: 1, ga: 3, shotsOnTargetPerMatch: 1.1, accuratePassesPerMatch: 17, keyPassesPerMatch: 0.5, minutes: 280, totalShots: 11 } },
    { id: 'tur4', name: 'Arda Güler', pos: 'Midfielder', age: 21, image: 'guler.jpg', stats: { averageRating: 7.9, goals: 4, assists: 5, ga: 9, accuratePassesPerMatch: 44, keyPassesPerMatch: 2.6, minutes: 490 } },
    { id: 'tur5', name: 'Hakan Çalhanoğlu', pos: 'Midfielder', age: 32, image: 'calhanoglu.jpg', stats: { averageRating: 7.8, goals: 3, assists: 4, ga: 7, accuratePassesPerMatch: 61, keyPassesPerMatch: 2.2, minutes: 520 } },
    { id: 'tur6', name: 'Orkun Kökçü', pos: 'Midfielder', age: 25, image: 'kokcu.jpg', stats: { averageRating: 7.5, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 52, keyPassesPerMatch: 1.8, minutes: 470 } },
    { id: 'tur7', name: 'Barış Alper Yılmaz', pos: 'Midfielder', age: 26, image: 'barisyilmaz.jpg', stats: { averageRating: 7.4, goals: 3, assists: 2, ga: 5, accuratePassesPerMatch: 30, keyPassesPerMatch: 1.5, minutes: 450 } },
    { id: 'tur8', name: 'Can Uzun', pos: 'Midfielder', age: 20, image: 'canuzun.jpg', stats: { averageRating: 7.1, goals: 2, assists: 2, ga: 4, accuratePassesPerMatch: 35, keyPassesPerMatch: 1.5, minutes: 320 } },
    { id: 'tur9', name: 'Yunus Akgün', pos: 'Midfielder', age: 26, image: 'akgun.jpg', stats: { averageRating: 7.3, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 33, keyPassesPerMatch: 1.7, minutes: 400 } },
    { id: 'tur10', name: 'İsmail Yüksek', pos: 'Midfielder', age: 27, image: 'yuksek.jpg', stats: { averageRating: 7.2, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 50, keyPassesPerMatch: 0.7, minutes: 440 } },
    { id: 'tur11', name: 'Oğuz Aydın', pos: 'Midfielder', age: 25, image: 'oguzaydin.jpg', stats: { averageRating: 7.0, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 29, keyPassesPerMatch: 1.3, minutes: 300 } },
    { id: 'tur12', name: 'Salih Özcan', pos: 'Midfielder', age: 28, image: 'ozcan.jpg', stats: { averageRating: 7.0, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 47, keyPassesPerMatch: 0.6, minutes: 360 } },
    { id: 'tur13', name: 'Ferdi Kadıoğlu', pos: 'Defender', age: 26, image: 'kadioglu.jpg', stats: { averageRating: 7.5, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 47, keyPassesPerMatch: 1.4, interceptionsPerMatch: 1.5, tacklesPerMatch: 2.0, minutes: 500 } },
    { id: 'tur14', name: 'Abdülkerim Bardakcı', pos: 'Defender', age: 31, image: 'bardakci.jpg', stats: { averageRating: 7.4, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 54, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.8, tacklesPerMatch: 1.5, minutes: 510 } },
    { id: 'tur15', name: 'Eren Elmalı', pos: 'Defender', age: 26, image: 'elmali.jpg', stats: { averageRating: 7.1, goals: 0, assists: 2, ga: 2, accuratePassesPerMatch: 43, keyPassesPerMatch: 0.8, interceptionsPerMatch: 1.4, tacklesPerMatch: 1.8, minutes: 400 } },
    { id: 'tur16', name: 'Merih Demiral', pos: 'Defender', age: 28, image: 'demiral.jpg', stats: { averageRating: 7.5, goals: 2, assists: 0, ga: 2, accuratePassesPerMatch: 51, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.9, tacklesPerMatch: 1.6, minutes: 520 } },
    { id: 'tur17', name: 'Kaan Ayhan', pos: 'Defender', age: 31, image: 'ayhan.jpg', stats: { averageRating: 7.2, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 48, keyPassesPerMatch: 0.5, interceptionsPerMatch: 1.5, tacklesPerMatch: 1.5, minutes: 420 } },
    { id: 'tur18', name: 'Çağlar Söyüncü', pos: 'Defender', age: 30, image: 'soyuncu.jpg', stats: { averageRating: 7.3, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 50, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.5, minutes: 450 } },
    { id: 'tur19', name: 'Zeki Çelik', pos: 'Defender', age: 29, image: 'celik.jpg', stats: { averageRating: 7.2, goals: 0, assists: 2, ga: 2, accuratePassesPerMatch: 44, keyPassesPerMatch: 0.8, interceptionsPerMatch: 1.4, tacklesPerMatch: 1.7, minutes: 430 } },
    { id: 'tur20', name: 'Mert Müldür', pos: 'Defender', age: 27, image: 'muldur.jpg', stats: { averageRating: 7.1, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 42, keyPassesPerMatch: 0.7, interceptionsPerMatch: 1.3, tacklesPerMatch: 1.6, minutes: 380 } },
    { id: 'tur21', name: 'Ozan Kabak', pos: 'Defender', age: 26, image: 'kabak.jpg', stats: { averageRating: 7.2, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 49, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.5, minutes: 410 } },
    { id: 'tur22', name: 'Samet Akaydın', pos: 'Defender', age: 32, image: 'akaydin.jpg', stats: { averageRating: 6.9, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 45, keyPassesPerMatch: 0.1, interceptionsPerMatch: 1.5, tacklesPerMatch: 1.3, minutes: 320 } },
    { id: 'tur23', name: 'Altay Bayındır', pos: 'Goalkeeper', age: 28, image: 'bayindir.jpg', stats: { averageRating: 7.4, goalsPrevented: 2.8, savesPerMatch: 3.6, minutes: 450 } },
    { id: 'tur24', name: 'Uğurcan Çakır', pos: 'Goalkeeper', age: 30, image: 'cakir.jpg', stats: { averageRating: 7.2, goalsPrevented: 2.1, savesPerMatch: 3.3, minutes: 90 } },
    { id: 'tur25', name: 'Mert Günok', pos: 'Goalkeeper', age: 37, image: 'gunok.jpg', stats: { averageRating: 7.0, goalsPrevented: 1.5, savesPerMatch: 3.0, minutes: 0 } }
  ],
  'GER': [
    { id: 'ger1', name: 'Kai Havertz', pos: 'Attacker', age: 27, image: 'havertz.jpg', stats: { averageRating: 7.6, goals: 4, assists: 2, ga: 6, shotsOnTargetPerMatch: 1.6, accuratePassesPerMatch: 27, keyPassesPerMatch: 1.3, minutes: 480, totalShots: 19 } },
    { id: 'ger2', name: 'Nick Woltemade', pos: 'Attacker', age: 24, image: 'woltemade.jpg', stats: { averageRating: 7.3, goals: 3, assists: 1, ga: 4, shotsOnTargetPerMatch: 1.5, accuratePassesPerMatch: 20, keyPassesPerMatch: 0.8, minutes: 390, totalShots: 16 } },
    { id: 'ger3', name: 'Deniz Undav', pos: 'Attacker', age: 30, image: 'undav.jpg', stats: { averageRating: 7.2, goals: 3, assists: 2, ga: 5, shotsOnTargetPerMatch: 1.4, accuratePassesPerMatch: 23, keyPassesPerMatch: 1.1, minutes: 370, totalShots: 15 } },
    { id: 'ger4', name: 'Maximilian Beier', pos: 'Attacker', age: 23, image: 'beier.jpg', stats: { averageRating: 7.0, goals: 2, assists: 1, ga: 3, shotsOnTargetPerMatch: 1.2, accuratePassesPerMatch: 21, keyPassesPerMatch: 0.9, minutes: 310, totalShots: 12 } },
    { id: 'ger5', name: 'Florian Wirtz', pos: 'Midfielder', age: 23, image: 'wirtz.jpg', stats: { averageRating: 8.0, goals: 4, assists: 6, ga: 10, accuratePassesPerMatch: 48, keyPassesPerMatch: 2.8, minutes: 510 } },
    { id: 'ger6', name: 'Jamal Musiala', pos: 'Midfielder', age: 23, image: 'musiala.jpg', stats: { averageRating: 8.1, goals: 5, assists: 4, ga: 9, accuratePassesPerMatch: 46, keyPassesPerMatch: 2.5, minutes: 500 } },
    { id: 'ger7', name: 'Joshua Kimmich', pos: 'Midfielder', age: 31, image: 'kimmich.jpg', stats: { averageRating: 7.8, goals: 1, assists: 5, ga: 6, accuratePassesPerMatch: 68, keyPassesPerMatch: 2.2, minutes: 540 } },
    { id: 'ger8', name: 'Leroy Sané', pos: 'Midfielder', age: 30, image: 'sane.jpg', stats: { averageRating: 7.5, goals: 3, assists: 3, ga: 6, accuratePassesPerMatch: 36, keyPassesPerMatch: 1.8, minutes: 450 } },
    { id: 'ger9', name: 'Aleksandar Pavlović', pos: 'Midfielder', age: 22, image: 'pavlovic.jpg', stats: { averageRating: 7.4, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 62, keyPassesPerMatch: 1.0, minutes: 430 } },
    { id: 'ger10', name: 'Leon Goretzka', pos: 'Midfielder', age: 31, image: 'goretzka.jpg', stats: { averageRating: 7.3, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 52, keyPassesPerMatch: 1.1, minutes: 400 } },
    { id: 'ger11', name: 'Felix Nmecha', pos: 'Midfielder', age: 25, image: 'nmecha.jpg', stats: { averageRating: 7.2, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 49, keyPassesPerMatch: 1.0, minutes: 360 } },
    { id: 'ger12', name: 'Angelo Stiller', pos: 'Midfielder', age: 25, image: 'stiller.jpg', stats: { averageRating: 7.3, goals: 0, assists: 3, ga: 3, accuratePassesPerMatch: 64, keyPassesPerMatch: 1.5, minutes: 410 } },
    { id: 'ger13', name: 'Assan Ouédraogo', pos: 'Midfielder', age: 20, image: 'ouedraogo.jpg', stats: { averageRating: 6.9, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 34, keyPassesPerMatch: 0.8, minutes: 230 } },
    { id: 'ger14', name: 'Pascal Groß', pos: 'Midfielder', age: 35, image: 'gross.jpg', stats: { averageRating: 7.2, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 58, keyPassesPerMatch: 1.7, minutes: 350 } },
    { id: 'ger15', name: 'Nadiem Amiri', pos: 'Midfielder', age: 29, image: 'amiri.jpg', stats: { averageRating: 7.1, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 51, keyPassesPerMatch: 1.4, minutes: 320 } },
    { id: 'ger16', name: 'Jamie Leweling', pos: 'Midfielder', age: 25, image: 'leweling.jpg', stats: { averageRating: 7.0, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 29, keyPassesPerMatch: 1.2, minutes: 290 } },
    { id: 'ger17', name: 'Antonio Rüdiger', pos: 'Defender', age: 33, image: 'rudiger.jpg', stats: { averageRating: 7.6, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 58, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.8, tacklesPerMatch: 1.7, minutes: 520 } },
    { id: 'ger18', name: 'Nico Schlotterbeck', pos: 'Defender', age: 26, image: 'schlotterbeck.jpg', stats: { averageRating: 7.5, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 61, keyPassesPerMatch: 0.4, interceptionsPerMatch: 1.9, tacklesPerMatch: 1.6, minutes: 500 } },
    { id: 'ger19', name: 'Jonathan Tah', pos: 'Defender', age: 30, image: 'tah.jpg', stats: { averageRating: 7.4, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 63, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.6, tacklesPerMatch: 1.4, minutes: 490 } },
    { id: 'ger20', name: 'Nathaniel Brown', pos: 'Defender', age: 23, image: 'brown.jpg', stats: { averageRating: 7.1, goals: 0, assists: 2, ga: 2, accuratePassesPerMatch: 42, keyPassesPerMatch: 0.9, interceptionsPerMatch: 1.3, tacklesPerMatch: 1.8, minutes: 350 } },
    { id: 'ger21', name: 'Malick Thiaw', pos: 'Defender', age: 24, image: 'thiaw.jpg', stats: { averageRating: 7.3, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 55, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.5, minutes: 400 } },
    { id: 'ger22', name: 'David Raum', pos: 'Defender', age: 28, image: 'raum.jpg', stats: { averageRating: 7.3, goals: 0, assists: 3, ga: 3, accuratePassesPerMatch: 44, keyPassesPerMatch: 1.4, interceptionsPerMatch: 1.2, tacklesPerMatch: 1.6, minutes: 410 } },
    { id: 'ger23', name: 'Waldemar Anton', pos: 'Defender', age: 29, image: 'anton.jpg', stats: { averageRating: 7.2, goals: 0, assists: 0, ga: 0, accuratePassesPerMatch: 57, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.6, tacklesPerMatch: 1.4, minutes: 380 } },
    { id: 'ger24', name: 'Manuel Neuer', pos: 'Goalkeeper', age: 40, image: 'neuer.jpg', stats: { averageRating: 7.5, goalsPrevented: 3.1, savesPerMatch: 3.5, minutes: 450 } },
    { id: 'ger25', name: 'Alexander Nübel', pos: 'Goalkeeper', age: 29, image: 'nubel.jpg', stats: { averageRating: 7.2, goalsPrevented: 2.0, savesPerMatch: 3.1, minutes: 90 } },
    { id: 'ger26', name: 'Oliver Baumann', pos: 'Goalkeeper', age: 36, image: 'baumann.jpg', stats: { averageRating: 7.0, goalsPrevented: 1.4, savesPerMatch: 2.9, minutes: 0 } }
  ],
  'CIV': [
    { id: 'civ1', name: 'Yan Diomande', pos: 'Attacker', age: 19, image: 'diomande_yan.jpg', stats: { averageRating: 7.4, goals: 3, assists: 3, ga: 6, shotsOnTargetPerMatch: 1.4, accuratePassesPerMatch: 25, keyPassesPerMatch: 1.5, minutes: 410, totalShots: 16 } },
    { id: 'civ2', name: 'Nicolas Pépé', pos: 'Attacker', age: 31, image: 'pepe.jpg', stats: { averageRating: 7.5, goals: 4, assists: 3, ga: 7, shotsOnTargetPerMatch: 1.7, accuratePassesPerMatch: 29, keyPassesPerMatch: 1.8, minutes: 470, totalShots: 20 } },
    { id: 'civ3', name: 'Ange-Yoan Bonny', pos: 'Attacker', age: 22, image: 'bonny.jpg', stats: { averageRating: 7.2, goals: 3, assists: 1, ga: 4, shotsOnTargetPerMatch: 1.5, accuratePassesPerMatch: 21, keyPassesPerMatch: 0.8, minutes: 380, totalShots: 17 } },
    { id: 'civ4', name: 'Oumar Diakité', pos: 'Attacker', age: 22, image: 'diakite.jpg', stats: { averageRating: 7.1, goals: 3, assists: 1, ga: 4, shotsOnTargetPerMatch: 1.3, accuratePassesPerMatch: 20, keyPassesPerMatch: 0.7, minutes: 350, totalShots: 15 } },
    { id: 'civ5', name: 'Evann Guessand', pos: 'Attacker', age: 25, image: 'guessand.jpg', stats: { averageRating: 7.3, goals: 3, assists: 2, ga: 5, shotsOnTargetPerMatch: 1.4, accuratePassesPerMatch: 24, keyPassesPerMatch: 1.2, minutes: 400, totalShots: 16 } },
    { id: 'civ6', name: 'Elye Wahi', pos: 'Attacker', age: 23, image: 'wahi.jpg', stats: { averageRating: 7.2, goals: 4, assists: 1, ga: 5, shotsOnTargetPerMatch: 1.6, accuratePassesPerMatch: 19, keyPassesPerMatch: 0.7, minutes: 390, totalShots: 18 } },
    { id: 'civ7', name: 'Amad Diallo', pos: 'Midfielder', age: 24, image: 'amad.jpg', stats: { averageRating: 7.8, goals: 4, assists: 5, ga: 9, accuratePassesPerMatch: 42, keyPassesPerMatch: 2.4, minutes: 500 } },
    { id: 'civ8', name: 'Simon Adingra', pos: 'Midfielder', age: 24, image: 'adingra.jpg', stats: { averageRating: 7.5, goals: 3, assists: 4, ga: 7, accuratePassesPerMatch: 34, keyPassesPerMatch: 2.0, minutes: 460 } },
    { id: 'civ9', name: 'Franck Kessié', pos: 'Midfielder', age: 29, image: 'kessie.jpg', stats: { averageRating: 7.7, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 59, keyPassesPerMatch: 1.4, minutes: 530 } },
    { id: 'civ10', name: 'Christ Inao Oulaï', pos: 'Midfielder', age: 20, image: 'oulai.jpg', stats: { averageRating: 7.1, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 46, keyPassesPerMatch: 1.0, minutes: 320 } },
    { id: 'civ11', name: 'Seko Fofana', pos: 'Midfielder', age: 31, image: 'fofana.jpg', stats: { averageRating: 7.5, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 53, keyPassesPerMatch: 1.5, minutes: 480 } },
    { id: 'civ12', name: 'Ibrahim Sangaré', pos: 'Midfielder', age: 28, image: 'sangare.jpg', stats: { averageRating: 7.4, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 57, keyPassesPerMatch: 0.8, minutes: 470 } },
    { id: 'civ13', name: 'Bazoumana Touré', pos: 'Midfielder', age: 20, image: 'toure.jpg', stats: { averageRating: 7.2, goals: 2, assists: 2, ga: 4, accuratePassesPerMatch: 30, keyPassesPerMatch: 1.4, minutes: 330 } },
    { id: 'civ14', name: 'Jean Michaël Seri', pos: 'Midfielder', age: 35, image: 'seri.jpg', stats: { averageRating: 7.3, goals: 0, assists: 3, ga: 3, accuratePassesPerMatch: 62, keyPassesPerMatch: 1.6, minutes: 400 } },
    { id: 'civ15', name: 'Parfait Guiagon', pos: 'Midfielder', age: 25, image: 'guiagon.jpg', stats: { averageRating: 7.1, goals: 2, assists: 2, ga: 4, accuratePassesPerMatch: 31, keyPassesPerMatch: 1.3, minutes: 310 } },
    { id: 'civ16', name: 'Guéla Doué', pos: 'Defender', age: 23, image: 'doue.jpg', stats: { averageRating: 7.4, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 49, keyPassesPerMatch: 0.8, interceptionsPerMatch: 1.5, tacklesPerMatch: 2.0, minutes: 470 } },
    { id: 'civ17', name: 'Wilfried Singo', pos: 'Defender', age: 25, image: 'singo.jpg', stats: { averageRating: 7.5, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 51, keyPassesPerMatch: 0.7, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.9, minutes: 500 } },
    { id: 'civ18', name: 'Odilon Kossounou', pos: 'Defender', age: 25, image: 'kossounou.jpg', stats: { averageRating: 7.4, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 60, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.8, tacklesPerMatch: 1.7, minutes: 490 } },
    { id: 'civ19', name: 'Evan Ndicka', pos: 'Defender', age: 26, image: 'ndicka.jpg', stats: { averageRating: 7.5, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 62, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.9, tacklesPerMatch: 1.5, minutes: 520 } },
    { id: 'civ20', name: 'Ousmane Diomande', pos: 'Defender', age: 22, image: 'diomande_ousmane.jpg', stats: { averageRating: 7.4, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 59, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.6, minutes: 480 } },
    { id: 'civ21', name: 'Emmanuel Agbadou', pos: 'Defender', age: 29, image: 'agbadou.jpg', stats: { averageRating: 7.3, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 56, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.6, tacklesPerMatch: 1.5, minutes: 430 } },
    { id: 'civ22', name: 'Ghislain Konan', pos: 'Defender', age: 30, image: 'konan.jpg', stats: { averageRating: 7.2, goals: 0, assists: 2, ga: 2, accuratePassesPerMatch: 43, keyPassesPerMatch: 0.9, interceptionsPerMatch: 1.4, tacklesPerMatch: 1.8, minutes: 390 } },
    { id: 'civ23', name: 'Christopher Operi', pos: 'Defender', age: 29, image: 'operi.jpg', stats: { averageRating: 7.1, goals: 0, assists: 2, ga: 2, accuratePassesPerMatch: 45, keyPassesPerMatch: 1.0, interceptionsPerMatch: 1.3, tacklesPerMatch: 1.7, minutes: 370 } },
    { id: 'civ24', name: 'Yahia Fofana', pos: 'Goalkeeper', age: 25, image: 'yahia_fofana.jpg', stats: { averageRating: 7.4, goalsPrevented: 2.8, savesPerMatch: 3.4, minutes: 450 } },
    { id: 'civ25', name: 'Alban Lafont', pos: 'Goalkeeper', age: 27, image: 'lafont.jpg', stats: { averageRating: 7.2, goalsPrevented: 2.1, savesPerMatch: 3.1, minutes: 90 } },
    { id: 'civ26', name: 'Mohamed Koné', pos: 'Goalkeeper', age: 24, image: 'mohamed_kone.jpg', stats: { averageRating: 7.0, goalsPrevented: 1.5, savesPerMatch: 2.9, minutes: 0 } }
  ],
  'ECU': [
    { id: 'ecu1', name: 'Enner Valencia', pos: 'Attacker', age: 36, image: 'enner_valencia.jpg', stats: { averageRating: 7.5, goals: 5, assists: 2, ga: 7, shotsOnTargetPerMatch: 1.8, accuratePassesPerMatch: 22, keyPassesPerMatch: 1.1, minutes: 480, totalShots: 21 } },
    { id: 'ecu2', name: 'John Yeboah', pos: 'Attacker', age: 26, image: 'john_yeboah.jpg', stats: { averageRating: 7.3, goals: 3, assists: 3, ga: 6, shotsOnTargetPerMatch: 1.4, accuratePassesPerMatch: 28, keyPassesPerMatch: 1.6, minutes: 420, totalShots: 17 } },
    { id: 'ecu3', name: 'Kevin Rodriguez', pos: 'Attacker', age: 26, image: 'kevin_rodriguez.jpg', stats: { averageRating: 7.2, goals: 4, assists: 1, ga: 5, shotsOnTargetPerMatch: 1.6, accuratePassesPerMatch: 20, keyPassesPerMatch: 0.8, minutes: 390, totalShots: 18 } },
    { id: 'ecu4', name: 'Alan Minda', pos: 'Attacker', age: 23, image: 'alan_minda.jpg', stats: { averageRating: 7.4, goals: 3, assists: 4, ga: 7, shotsOnTargetPerMatch: 1.3, accuratePassesPerMatch: 31, keyPassesPerMatch: 1.9, minutes: 440, totalShots: 16 } },
    { id: 'ecu5', name: 'Jeremy Arevalo', pos: 'Attacker', age: 21, image: 'jeremy_arevalo.jpg', stats: { averageRating: 7.1, goals: 2, assists: 2, ga: 4, shotsOnTargetPerMatch: 1.1, accuratePassesPerMatch: 29, keyPassesPerMatch: 1.2, minutes: 310, totalShots: 13 } },
    { id: 'ecu6', name: 'Jordy Caicedo', pos: 'Attacker', age: 28, image: 'jordy_caicedo.jpg', stats: { averageRating: 7.2, goals: 4, assists: 1, ga: 5, shotsOnTargetPerMatch: 1.5, accuratePassesPerMatch: 18, keyPassesPerMatch: 0.6, minutes: 370, totalShots: 17 } },
    { id: 'ecu7', name: 'Anthony Valencia', pos: 'Attacker', age: 22, image: 'anthony_valencia.jpg', stats: { averageRating: 7.2, goals: 2, assists: 3, ga: 5, shotsOnTargetPerMatch: 1.2, accuratePassesPerMatch: 27, keyPassesPerMatch: 1.5, minutes: 330, totalShots: 14 } },
    { id: 'ecu8', name: 'Moisés Caicedo', pos: 'Midfielder', age: 24, image: 'moises_caicedo.jpg', stats: { averageRating: 7.8, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 65, keyPassesPerMatch: 1.5, minutes: 540 } },
    { id: 'ecu9', name: 'Kendry Páez', pos: 'Midfielder', age: 19, image: 'kendry_paez.jpg', stats: { averageRating: 7.6, goals: 3, assists: 5, ga: 8, accuratePassesPerMatch: 45, keyPassesPerMatch: 2.3, minutes: 460 } },
    { id: 'ecu10', name: 'Gonzalo Plata', pos: 'Midfielder', age: 25, image: 'gonzalo_plata.jpg', stats: { averageRating: 7.5, goals: 3, assists: 4, ga: 7, accuratePassesPerMatch: 38, keyPassesPerMatch: 2.0, minutes: 450 } },
    { id: 'ecu11', name: 'Pervis Estupiñán', pos: 'Midfielder', age: 28, image: 'pervis_estupinan.jpg', stats: { averageRating: 7.5, goals: 1, assists: 4, ga: 5, accuratePassesPerMatch: 49, keyPassesPerMatch: 1.8, minutes: 500 } },
    { id: 'ecu12', name: 'Nilson Angulo', pos: 'Midfielder', age: 23, image: 'nilson_angulo.jpg', stats: { averageRating: 7.2, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 32, keyPassesPerMatch: 1.6, minutes: 350 } },
    { id: 'ecu13', name: 'Pedro Vite', pos: 'Midfielder', age: 24, image: 'pedro_vite.jpg', stats: { averageRating: 7.4, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 54, keyPassesPerMatch: 1.4, minutes: 440 } },
    { id: 'ecu14', name: 'Alan Franco', pos: 'Midfielder', age: 27, image: 'alan_franco.jpg', stats: { averageRating: 7.3, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 58, keyPassesPerMatch: 1.0, minutes: 430 } },
    { id: 'ecu15', name: 'Ángelo Preciado', pos: 'Midfielder', age: 28, image: 'angelo_preciado.jpg', stats: { averageRating: 7.4, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 47, keyPassesPerMatch: 1.5, minutes: 460 } },
    { id: 'ecu16', name: 'Denil Castillo', pos: 'Midfielder', age: 22, image: 'denil_castillo.jpg', stats: { averageRating: 7.2, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 51, keyPassesPerMatch: 0.9, minutes: 340 } },
    { id: 'ecu17', name: 'Jordy Alcivar', pos: 'Midfielder', age: 26, image: 'jordy_alcivar.jpg', stats: { averageRating: 7.3, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 56, keyPassesPerMatch: 1.3, minutes: 400 } },
    { id: 'ecu18', name: 'Piero Hincapié', pos: 'Defender', age: 24, image: 'piero_hincapie.jpg', stats: { averageRating: 7.7, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 65, keyPassesPerMatch: 0.7, interceptionsPerMatch: 1.9, tacklesPerMatch: 2.1, minutes: 530 } },
    { id: 'ecu19', name: 'Willian Pacho', pos: 'Defender', age: 24, image: 'willian_pacho.jpg', stats: { averageRating: 7.6, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 70, keyPassesPerMatch: 0.3, interceptionsPerMatch: 2.0, tacklesPerMatch: 1.8, minutes: 540 } },
    { id: 'ecu20', name: 'Joel Ordóñez', pos: 'Defender', age: 22, image: 'joel_ordonez.jpg', stats: { averageRating: 7.4, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 62, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.8, tacklesPerMatch: 1.7, minutes: 470 } },
    { id: 'ecu21', name: 'Félix Torres', pos: 'Defender', age: 29, image: 'felix_torres.jpg', stats: { averageRating: 7.4, goals: 2, assists: 0, ga: 2, accuratePassesPerMatch: 59, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.6, minutes: 480 } },
    { id: 'ecu22', name: 'Yaimar Medina', pos: 'Defender', age: 21, image: 'yaimar_medina.jpg', stats: { averageRating: 7.2, goals: 0, assists: 2, ga: 2, accuratePassesPerMatch: 45, keyPassesPerMatch: 0.9, interceptionsPerMatch: 1.5, tacklesPerMatch: 1.9, minutes: 350 } },
    { id: 'ecu23', name: 'Jackson Porozo', pos: 'Defender', age: 25, image: 'jackson_porozo.jpg', stats: { averageRating: 7.3, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 55, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.8, tacklesPerMatch: 1.6, minutes: 420 } },
    { id: 'ecu24', name: 'Hernán Galíndez', pos: 'Goalkeeper', age: 39, image: 'hernan_galindez.jpg', stats: { averageRating: 7.4, goalsPrevented: 3.0, savesPerMatch: 3.5, minutes: 450 } },
    { id: 'ecu25', name: 'Gonzalo Valle', pos: 'Goalkeeper', age: 30, image: 'gonzalo_valle.jpg', stats: { averageRating: 7.2, goalsPrevented: 2.1, savesPerMatch: 3.1, minutes: 90 } },
    { id: 'ecu26', name: 'Moisés Ramírez', pos: 'Goalkeeper', age: 25, image: 'moises_ramirez.jpg', stats: { averageRating: 7.1, goalsPrevented: 1.8, savesPerMatch: 3.0, minutes: 0 } }
  ],
  'CUW': [
    { id: 'cuw1', name: 'Jürgen Locadia', pos: 'Attacker', age: 32, image: 'locadia.jpg', stats: { averageRating: 7.5, goals: 5, assists: 2, ga: 7, shotsOnTargetPerMatch: 1.8, accuratePassesPerMatch: 22, keyPassesPerMatch: 1.0, minutes: 470, totalShots: 21 } },
    { id: 'cuw2', name: 'Sontje Hansen', pos: 'Attacker', age: 24, image: 'hansen.jpg', stats: { averageRating: 7.4, goals: 3, assists: 4, ga: 7, shotsOnTargetPerMatch: 1.5, accuratePassesPerMatch: 30, keyPassesPerMatch: 1.8, minutes: 440, totalShots: 18 } },
    { id: 'cuw3', name: 'Gervane Kastaneer', pos: 'Attacker', age: 30, image: 'kastaneer.jpg', stats: { averageRating: 7.2, goals: 4, assists: 2, ga: 6, shotsOnTargetPerMatch: 1.6, accuratePassesPerMatch: 21, keyPassesPerMatch: 0.9, minutes: 410, totalShots: 19 } },
    { id: 'cuw4', name: 'Brandley Kuwas', pos: 'Attacker', age: 33, image: 'kuwas.jpg', stats: { averageRating: 7.3, goals: 3, assists: 3, ga: 6, shotsOnTargetPerMatch: 1.4, accuratePassesPerMatch: 27, keyPassesPerMatch: 1.6, minutes: 420, totalShots: 17 } },
    { id: 'cuw5', name: 'Tahith Chong', pos: 'Midfielder', age: 26, image: 'chong.jpg', stats: { averageRating: 7.7, goals: 4, assists: 5, ga: 9, accuratePassesPerMatch: 43, keyPassesPerMatch: 2.3, minutes: 510 } },
    { id: 'cuw6', name: 'Juninho Bacuna', pos: 'Midfielder', age: 28, image: 'juninho_bacuna.jpg', stats: { averageRating: 7.6, goals: 3, assists: 4, ga: 7, accuratePassesPerMatch: 55, keyPassesPerMatch: 1.8, minutes: 520 } },
    { id: 'cuw7', name: 'Leandro Bacuna', pos: 'Midfielder', age: 34, image: 'leandro_bacuna.jpg', stats: { averageRating: 7.5, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 58, keyPassesPerMatch: 1.4, minutes: 530 } },
    { id: 'cuw8', name: 'Jearl Margaritha', pos: 'Midfielder', age: 26, image: 'margaritha.jpg', stats: { averageRating: 7.3, goals: 3, assists: 3, ga: 6, accuratePassesPerMatch: 34, keyPassesPerMatch: 1.7, minutes: 420 } },
    { id: 'cuw9', name: 'Kenji Gorré', pos: 'Midfielder', age: 31, image: 'gorre.jpg', stats: { averageRating: 7.3, goals: 3, assists: 2, ga: 5, accuratePassesPerMatch: 32, keyPassesPerMatch: 1.6, minutes: 400 } },
    { id: 'cuw10', name: 'Jeremy Antonisse', pos: 'Midfielder', age: 24, image: 'antonisse.jpg', stats: { averageRating: 7.2, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 31, keyPassesPerMatch: 1.5, minutes: 370 } },
    { id: 'cuw11', name: 'Tyrese Noslin', pos: 'Midfielder', age: 23, image: 'noslin.jpg', stats: { averageRating: 7.2, goals: 2, assists: 2, ga: 4, accuratePassesPerMatch: 36, keyPassesPerMatch: 1.3, minutes: 350 } },
    { id: 'cuw12', name: 'Godfried Roemeratoe', pos: 'Midfielder', age: 26, image: 'roemeratoe.jpg', stats: { averageRating: 7.3, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 54, keyPassesPerMatch: 0.9, minutes: 430 } },
    { id: 'cuw13', name: 'Kevin Felida', pos: 'Midfielder', age: 26, image: 'felida.jpg', stats: { averageRating: 7.2, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 52, keyPassesPerMatch: 0.8, minutes: 410 } },
    { id: 'cuw14', name: 'Livano Comenencia', pos: 'Defender', age: 22, image: 'comenencia.jpg', stats: { averageRating: 7.4, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 48, keyPassesPerMatch: 1.0, interceptionsPerMatch: 1.5, tacklesPerMatch: 2.0, minutes: 450 } },
    { id: 'cuw15', name: 'Armando Obispo', pos: 'Defender', age: 27, image: 'obispo.jpg', stats: { averageRating: 7.5, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 64, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.9, tacklesPerMatch: 1.7, minutes: 520 } },
    { id: 'cuw16', name: 'Riechedly Bazoer', pos: 'Defender', age: 29, image: 'bazoer.jpg', stats: { averageRating: 7.4, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 62, keyPassesPerMatch: 0.6, interceptionsPerMatch: 1.8, tacklesPerMatch: 1.6, minutes: 490 } },
    { id: 'cuw17', name: "Ar'Jany Martha", pos: 'Defender', age: 22, image: 'martha.jpg', stats: { averageRating: 7.3, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 44, keyPassesPerMatch: 1.1, interceptionsPerMatch: 1.4, tacklesPerMatch: 1.9, minutes: 420 } },
    { id: 'cuw18', name: 'Sherel Constancio Floranus', pos: 'Defender', age: 27, image: 'floranus.jpg', stats: { averageRating: 7.4, goals: 0, assists: 3, ga: 3, accuratePassesPerMatch: 49, keyPassesPerMatch: 0.9, interceptionsPerMatch: 1.6, tacklesPerMatch: 2.0, minutes: 470 } },
    { id: 'cuw19', name: 'Shurandy Sambo', pos: 'Defender', age: 24, image: 'sambo.jpg', stats: { averageRating: 7.3, goals: 0, assists: 2, ga: 2, accuratePassesPerMatch: 46, keyPassesPerMatch: 0.8, interceptionsPerMatch: 1.5, tacklesPerMatch: 1.9, minutes: 430 } },
    { id: 'cuw20', name: 'Doveron Fonville', pos: 'Defender', age: 23, image: 'fonville.jpg', stats: { averageRating: 7.1, goals: 0, assists: 1, ga: 1, accuratePassesPerMatch: 43, keyPassesPerMatch: 0.5, interceptionsPerMatch: 1.4, tacklesPerMatch: 1.7, minutes: 350 } },
    { id: 'cuw21', name: 'Jurien Gaari', pos: 'Defender', age: 32, image: 'gaari.jpg', stats: { averageRating: 7.3, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 55, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.6, minutes: 450 } },
    { id: 'cuw22', name: 'Joshua Brenet', pos: 'Defender', age: 32, image: 'brenet.jpg', stats: { averageRating: 7.4, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 50, keyPassesPerMatch: 0.9, interceptionsPerMatch: 1.5, tacklesPerMatch: 1.8, minutes: 460 } },
    { id: 'cuw23', name: 'Roshon van Eijma', pos: 'Defender', age: 28, image: 'van_eijma.jpg', stats: { averageRating: 7.2, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 57, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.8, tacklesPerMatch: 1.5, minutes: 410 } },
    { id: 'cuw24', name: 'Eloy Room', pos: 'Goalkeeper', age: 37, image: 'eloy_room.jpg', stats: { averageRating: 7.5, goalsPrevented: 3.2, savesPerMatch: 3.6, minutes: 450 } },
    { id: 'cuw25', name: 'Tyrick Bodak', pos: 'Goalkeeper', age: 24, image: 'bodak.jpg', stats: { averageRating: 7.2, goalsPrevented: 2.0, savesPerMatch: 3.1, minutes: 90 } },
    { id: 'cuw26', name: 'Trevor Irving Doornbusch', pos: 'Goalkeeper', age: 27, image: 'doornbusch.jpg', stats: { averageRating: 7.1, goalsPrevented: 1.7, savesPerMatch: 3.0, minutes: 0 } }
  ],
  'NED': [
    { id: 'ned1', name: 'Memphis Depay', pos: 'Attacker', age: 32, image: 'depay.jpg', stats: { averageRating: 7.8, goals: 6, assists: 3, ga: 9, shotsOnTargetPerMatch: 2.2, accuratePassesPerMatch: 31, keyPassesPerMatch: 1.8, minutes: 520, totalShots: 27 } },
    { id: 'ned2', name: 'Brian Brobbey', pos: 'Attacker', age: 24, image: 'brobbey.jpg', stats: { averageRating: 7.4, goals: 4, assists: 2, ga: 6, shotsOnTargetPerMatch: 1.8, accuratePassesPerMatch: 20, keyPassesPerMatch: 0.8, minutes: 410, totalShots: 20 } },
    { id: 'ned3', name: 'Noa Lang', pos: 'Attacker', age: 27, image: 'lang.jpg', stats: { averageRating: 7.5, goals: 3, assists: 4, ga: 7, shotsOnTargetPerMatch: 1.6, accuratePassesPerMatch: 34, keyPassesPerMatch: 2.0, minutes: 430, totalShots: 18 } },
    { id: 'ned4', name: 'Donyell Malen', pos: 'Attacker', age: 27, image: 'malen.jpg', stats: { averageRating: 7.6, goals: 5, assists: 2, ga: 7, shotsOnTargetPerMatch: 2.0, accuratePassesPerMatch: 27, keyPassesPerMatch: 1.2, minutes: 450, totalShots: 23 } },
    { id: 'ned5', name: 'Wout Weghorst', pos: 'Attacker', age: 33, image: 'weghorst.jpg', stats: { averageRating: 7.3, goals: 4, assists: 1, ga: 5, shotsOnTargetPerMatch: 1.7, accuratePassesPerMatch: 18, keyPassesPerMatch: 0.6, minutes: 320, totalShots: 17 } },
    { id: 'ned6', name: 'Frenkie de Jong', pos: 'Midfielder', age: 29, image: 'de_jong.jpg', stats: { averageRating: 8.0, goals: 1, assists: 5, ga: 6, accuratePassesPerMatch: 78, keyPassesPerMatch: 2.1, minutes: 540 } },
    { id: 'ned7', name: 'Cody Gakpo', pos: 'Midfielder', age: 27, image: 'gakpo.jpg', stats: { averageRating: 7.9, goals: 5, assists: 4, ga: 9, accuratePassesPerMatch: 37, keyPassesPerMatch: 2.0, minutes: 510 } },
    { id: 'ned8', name: 'Denzel Dumfries', pos: 'Midfielder', age: 30, image: 'dumfries.jpg', stats: { averageRating: 7.7, goals: 3, assists: 4, ga: 7, accuratePassesPerMatch: 42, keyPassesPerMatch: 1.5, minutes: 500 } },
    { id: 'ned9', name: 'Tijjani Reijnders', pos: 'Midfielder', age: 27, image: 'reijnders.jpg', stats: { averageRating: 7.8, goals: 3, assists: 4, ga: 7, accuratePassesPerMatch: 64, keyPassesPerMatch: 1.9, minutes: 530 } },
    { id: 'ned10', name: 'Ryan Gravenberch', pos: 'Midfielder', age: 24, image: 'gravenberch.jpg', stats: { averageRating: 7.6, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 61, keyPassesPerMatch: 1.3, minutes: 480 } },
    { id: 'ned11', name: 'Crysencio Summerville', pos: 'Midfielder', age: 24, image: 'summerville.jpg', stats: { averageRating: 7.5, goals: 4, assists: 3, ga: 7, accuratePassesPerMatch: 33, keyPassesPerMatch: 1.8, minutes: 420 } },
    { id: 'ned12', name: 'Quinten Timber', pos: 'Midfielder', age: 25, image: 'timber.jpg', stats: { averageRating: 7.5, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 58, keyPassesPerMatch: 1.4, minutes: 460 } },
    { id: 'ned13', name: 'Teun Koopmeiners', pos: 'Midfielder', age: 28, image: 'koopmeiners.jpg', stats: { averageRating: 7.6, goals: 3, assists: 3, ga: 6, accuratePassesPerMatch: 60, keyPassesPerMatch: 1.7, minutes: 470 } },
    { id: 'ned14', name: 'Justin Kluivert', pos: 'Midfielder', age: 27, image: 'kluivert.jpg', stats: { averageRating: 7.4, goals: 3, assists: 2, ga: 5, accuratePassesPerMatch: 35, keyPassesPerMatch: 1.6, minutes: 400 } },
    { id: 'ned15', name: 'Guus Til', pos: 'Midfielder', age: 28, image: 'til.jpg', stats: { averageRating: 7.3, goals: 3, assists: 2, ga: 5, accuratePassesPerMatch: 40, keyPassesPerMatch: 1.3, minutes: 380 } },
    { id: 'ned16', name: 'Marten de Roon', pos: 'Midfielder', age: 35, image: 'de_roon.jpg', stats: { averageRating: 7.4, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 65, keyPassesPerMatch: 0.8, minutes: 450 } },
    { id: 'ned17', name: 'Virgil van Dijk', pos: 'Defender', age: 35, image: 'van_dijk.jpg', stats: { averageRating: 8.1, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 75, keyPassesPerMatch: 0.5, interceptionsPerMatch: 1.8, tacklesPerMatch: 1.5, minutes: 540 } },
    { id: 'ned18', name: 'Nathan Aké', pos: 'Defender', age: 31, image: 'ake.jpg', stats: { averageRating: 7.7, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 69, keyPassesPerMatch: 0.5, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.8, minutes: 500 } },
    { id: 'ned19', name: 'Jorrel Hato', pos: 'Defender', age: 20, image: 'hato.jpg', stats: { averageRating: 7.5, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 64, keyPassesPerMatch: 0.8, interceptionsPerMatch: 1.6, tacklesPerMatch: 2.0, minutes: 450 } },
    { id: 'ned20', name: 'Micky van de Ven', pos: 'Defender', age: 25, image: 'van_de_ven.jpg', stats: { averageRating: 7.8, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 70, keyPassesPerMatch: 0.4, interceptionsPerMatch: 1.8, tacklesPerMatch: 1.7, minutes: 510 } },
    { id: 'ned21', name: 'Jan Paul van Hecke', pos: 'Defender', age: 26, image: 'van_hecke.jpg', stats: { averageRating: 7.5, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 68, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.6, minutes: 470 } },
    { id: 'ned22', name: 'Lutsharel Geertruida', pos: 'Defender', age: 26, image: 'geertruida.jpg', stats: { averageRating: 7.6, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 65, keyPassesPerMatch: 0.7, interceptionsPerMatch: 1.6, tacklesPerMatch: 1.9, minutes: 480 } },
    { id: 'ned23', name: 'Mats Wieffer', pos: 'Defender', age: 26, image: 'wieffer.jpg', stats: { averageRating: 7.4, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 62, keyPassesPerMatch: 0.6, interceptionsPerMatch: 1.8, tacklesPerMatch: 2.1, minutes: 440 } },
    { id: 'ned24', name: 'Bart Verbruggen', pos: 'Goalkeeper', age: 23, image: 'verbruggen.jpg', stats: { averageRating: 7.7, goalsPrevented: 4.1, savesPerMatch: 3.5, minutes: 540 } },
    { id: 'ned25', name: 'Mark Flekken', pos: 'Goalkeeper', age: 33, image: 'flekken.jpg', stats: { averageRating: 7.4, goalsPrevented: 2.8, savesPerMatch: 3.2, minutes: 180 } },
    { id: 'ned26', name: 'Robin Roefs', pos: 'Goalkeeper', age: 23, image: 'roefs.jpg', stats: { averageRating: 7.3, goalsPrevented: 2.3, savesPerMatch: 3.1, minutes: 90 } }
  ],
  'JPN': [
    { id: 'jpn1', name: 'Ayase Ueda', pos: 'Attacker', age: 27, image: 'ueda.jpg', stats: { averageRating: 7.8, goals: 6, assists: 2, ga: 8, shotsOnTargetPerMatch: 2.3, accuratePassesPerMatch: 24, keyPassesPerMatch: 0.9, minutes: 510, totalShots: 28 } },
    { id: 'jpn2', name: 'Daizen Maeda', pos: 'Attacker', age: 28, image: 'maeda.jpg', stats: { averageRating: 7.7, goals: 5, assists: 3, ga: 8, shotsOnTargetPerMatch: 2.0, accuratePassesPerMatch: 28, keyPassesPerMatch: 1.4, minutes: 490, totalShots: 24 } },
    { id: 'jpn3', name: 'Keisuke Goto', pos: 'Attacker', age: 21, image: 'goto.jpg', stats: { averageRating: 7.3, goals: 3, assists: 1, ga: 4, shotsOnTargetPerMatch: 1.6, accuratePassesPerMatch: 19, keyPassesPerMatch: 0.7, minutes: 320, totalShots: 17 } },
    { id: 'jpn4', name: 'Shuto Machino', pos: 'Attacker', age: 26, image: 'machino.jpg', stats: { averageRating: 7.5, goals: 4, assists: 2, ga: 6, shotsOnTargetPerMatch: 1.8, accuratePassesPerMatch: 22, keyPassesPerMatch: 1.0, minutes: 410, totalShots: 21 } },
    { id: 'jpn5', name: 'Koki Ogawa', pos: 'Attacker', age: 28, image: 'ogawa.jpg', stats: { averageRating: 7.4, goals: 4, assists: 1, ga: 5, shotsOnTargetPerMatch: 1.9, accuratePassesPerMatch: 20, keyPassesPerMatch: 0.6, minutes: 380, totalShots: 20 } },
    { id: 'jpn6', name: 'Kento Shiogai', pos: 'Attacker', age: 21, image: 'shiogai.jpg', stats: { averageRating: 7.2, goals: 2, assists: 1, ga: 3, shotsOnTargetPerMatch: 1.4, accuratePassesPerMatch: 18, keyPassesPerMatch: 0.7, minutes: 270, totalShots: 14 } },
    { id: 'jpn7', name: 'Takefusa Kubo', pos: 'Midfielder', age: 25, image: 'kubo.jpg', stats: { averageRating: 8.1, goals: 5, assists: 6, ga: 11, accuratePassesPerMatch: 49, keyPassesPerMatch: 2.6, minutes: 540 } },
    { id: 'jpn8', name: 'Daichi Kamada', pos: 'Midfielder', age: 29, image: 'kamada.jpg', stats: { averageRating: 7.8, goals: 3, assists: 5, ga: 8, accuratePassesPerMatch: 58, keyPassesPerMatch: 2.0, minutes: 520 } },
    { id: 'jpn9', name: 'Ritsu Doan', pos: 'Midfielder', age: 28, image: 'doan.jpg', stats: { averageRating: 7.8, goals: 4, assists: 4, ga: 8, accuratePassesPerMatch: 44, keyPassesPerMatch: 2.1, minutes: 500 } },
    { id: 'jpn10', name: 'Kaishu Sano', pos: 'Midfielder', age: 25, image: 'sano.jpg', stats: { averageRating: 7.6, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 67, keyPassesPerMatch: 1.1, minutes: 490 } },
    { id: 'jpn11', name: 'Keito Nakamura', pos: 'Midfielder', age: 25, image: 'nakamura.jpg', stats: { averageRating: 7.7, goals: 4, assists: 3, ga: 7, accuratePassesPerMatch: 36, keyPassesPerMatch: 1.8, minutes: 450 } },
    { id: 'jpn12', name: 'Ao Tanaka', pos: 'Midfielder', age: 27, image: 'tanaka.jpg', stats: { averageRating: 7.6, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 64, keyPassesPerMatch: 1.3, minutes: 480 } },
    { id: 'jpn13', name: 'Junya Ito', pos: 'Midfielder', age: 33, image: 'junya_ito.jpg', stats: { averageRating: 7.7, goals: 3, assists: 5, ga: 8, accuratePassesPerMatch: 38, keyPassesPerMatch: 2.2, minutes: 460 } },
    { id: 'jpn14', name: 'Yuito Suzuki', pos: 'Midfielder', age: 24, image: 'yuito_suzuki.jpg', stats: { averageRating: 7.5, goals: 3, assists: 3, ga: 6, accuratePassesPerMatch: 43, keyPassesPerMatch: 1.7, minutes: 420 } },
    { id: 'jpn15', name: 'Takehiro Tomiyasu', pos: 'Defender', age: 27, image: 'tomiyasu.jpg', stats: { averageRating: 7.8, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 71, keyPassesPerMatch: 0.5, interceptionsPerMatch: 1.8, tacklesPerMatch: 1.9, minutes: 500 } },
    { id: 'jpn16', name: 'Hiroki Ito', pos: 'Defender', age: 27, image: 'hiroki_ito.jpg', stats: { averageRating: 7.7, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 70, keyPassesPerMatch: 0.6, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.8, minutes: 490 } },
    { id: 'jpn17', name: 'Ko Itakura', pos: 'Defender', age: 29, image: 'itakura.jpg', stats: { averageRating: 7.8, goals: 2, assists: 0, ga: 2, accuratePassesPerMatch: 73, keyPassesPerMatch: 0.4, interceptionsPerMatch: 1.9, tacklesPerMatch: 1.7, minutes: 520 } },
    { id: 'jpn18', name: 'Yukinari Sugawara', pos: 'Defender', age: 26, image: 'sugawara.jpg', stats: { averageRating: 7.6, goals: 1, assists: 4, ga: 5, accuratePassesPerMatch: 57, keyPassesPerMatch: 1.4, interceptionsPerMatch: 1.4, tacklesPerMatch: 2.0, minutes: 480 } },
    { id: 'jpn19', name: 'Tsuyoshi Watanabe', pos: 'Defender', age: 29, image: 'watanabe.jpg', stats: { averageRating: 7.5, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 68, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.8, tacklesPerMatch: 1.6, minutes: 450 } },
    { id: 'jpn20', name: 'Junnosuke Suzuki', pos: 'Defender', age: 23, image: 'junnosuke_suzuki.jpg', stats: { averageRating: 7.4, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 62, keyPassesPerMatch: 0.5, interceptionsPerMatch: 1.6, tacklesPerMatch: 1.8, minutes: 410 } },
    { id: 'jpn21', name: 'Shogo Taniguchi', pos: 'Defender', age: 35, image: 'taniguchi.jpg', stats: { averageRating: 7.4, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 66, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.5, minutes: 390 } },
    { id: 'jpn22', name: 'Ayumu Seko', pos: 'Defender', age: 26, image: 'seko.jpg', stats: { averageRating: 7.5, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 65, keyPassesPerMatch: 0.5, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.8, minutes: 430 } },
    { id: 'jpn23', name: 'Yuto Nagatomo', pos: 'Defender', age: 39, image: 'nagatomo.jpg', stats: { averageRating: 7.2, goals: 0, assists: 2, ga: 2, accuratePassesPerMatch: 52, keyPassesPerMatch: 0.7, interceptionsPerMatch: 1.3, tacklesPerMatch: 1.7, minutes: 300 } },
    { id: 'jpn24', name: 'Zion Suzuki', pos: 'Goalkeeper', age: 23, image: 'zion_suzuki.jpg', stats: { averageRating: 7.8, goalsPrevented: 4.3, savesPerMatch: 3.6, minutes: 540 } },
    { id: 'jpn25', name: 'Keisuke Osako', pos: 'Goalkeeper', age: 26, image: 'osako.jpg', stats: { averageRating: 7.4, goalsPrevented: 2.7, savesPerMatch: 3.2, minutes: 180 } },
    { id: 'jpn26', name: 'Tomoki Hayakawa', pos: 'Goalkeeper', age: 27, image: 'hayakawa.jpg', stats: { averageRating: 7.3, goalsPrevented: 2.2, savesPerMatch: 3.0, minutes: 90 } }
  ],
  'SWE': [
    { id: 'swe1', name: 'Viktor Gyökeres', pos: 'Attacker', age: 28, image: 'gyokeres.jpg', stats: { averageRating: 8.2, goals: 8, assists: 3, ga: 11, shotsOnTargetPerMatch: 2.8, accuratePassesPerMatch: 26, keyPassesPerMatch: 1.4, minutes: 540, totalShots: 34 } },
    { id: 'swe2', name: 'Alexander Isak', pos: 'Attacker', age: 26, image: 'isak.jpg', stats: { averageRating: 8.1, goals: 7, assists: 4, ga: 11, shotsOnTargetPerMatch: 2.6, accuratePassesPerMatch: 29, keyPassesPerMatch: 1.6, minutes: 520, totalShots: 31 } },
    { id: 'swe3', name: 'Anthony Elanga', pos: 'Attacker', age: 24, image: 'elanga.jpg', stats: { averageRating: 7.7, goals: 4, assists: 5, ga: 9, shotsOnTargetPerMatch: 1.8, accuratePassesPerMatch: 31, keyPassesPerMatch: 2.0, minutes: 490, totalShots: 22 } },
    { id: 'swe4', name: 'Benjamin Nygren', pos: 'Attacker', age: 25, image: 'nygren.jpg', stats: { averageRating: 7.5, goals: 3, assists: 4, ga: 7, shotsOnTargetPerMatch: 1.6, accuratePassesPerMatch: 35, keyPassesPerMatch: 1.7, minutes: 430, totalShots: 19 } },
    { id: 'swe5', name: 'Gustaf Nilsson', pos: 'Attacker', age: 29, image: 'nilsson.jpg', stats: { averageRating: 7.4, goals: 4, assists: 1, ga: 5, shotsOnTargetPerMatch: 1.9, accuratePassesPerMatch: 20, keyPassesPerMatch: 0.7, minutes: 380, totalShots: 21 } },
    { id: 'swe6', name: 'Lucas Bergvall', pos: 'Midfielder', age: 20, image: 'bergvall.jpg', stats: { averageRating: 7.9, goals: 3, assists: 5, ga: 8, accuratePassesPerMatch: 62, keyPassesPerMatch: 2.1, minutes: 510 } },
    { id: 'swe7', name: 'Yasin Ayari', pos: 'Midfielder', age: 22, image: 'ayari.jpg', stats: { averageRating: 7.6, goals: 2, assists: 4, ga: 6, accuratePassesPerMatch: 60, keyPassesPerMatch: 1.6, minutes: 470 } },
    { id: 'swe8', name: 'Daniel Svensson', pos: 'Midfielder', age: 24, image: 'svensson.jpg', stats: { averageRating: 7.5, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 57, keyPassesPerMatch: 1.3, minutes: 450 } },
    { id: 'swe9', name: 'Taha Abdi Ali', pos: 'Midfielder', age: 28, image: 'abdi_ali.jpg', stats: { averageRating: 7.4, goals: 3, assists: 3, ga: 6, accuratePassesPerMatch: 37, keyPassesPerMatch: 1.8, minutes: 410 } },
    { id: 'swe10', name: 'Jesper Karlström', pos: 'Midfielder', age: 31, image: 'karlstrom.jpg', stats: { averageRating: 7.5, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 66, keyPassesPerMatch: 1.0, minutes: 480 } },
    { id: 'swe11', name: 'Mattias Svanberg', pos: 'Midfielder', age: 27, image: 'svanberg.jpg', stats: { averageRating: 7.7, goals: 3, assists: 4, ga: 7, accuratePassesPerMatch: 59, keyPassesPerMatch: 1.8, minutes: 490 } },
    { id: 'swe12', name: 'Besfort Zeneli', pos: 'Midfielder', age: 23, image: 'zeneli.jpg', stats: { averageRating: 7.4, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 55, keyPassesPerMatch: 1.4, minutes: 420 } },
    { id: 'swe13', name: 'Ken Sema', pos: 'Midfielder', age: 32, image: 'sema.jpg', stats: { averageRating: 7.4, goals: 2, assists: 4, ga: 6, accuratePassesPerMatch: 38, keyPassesPerMatch: 1.7, minutes: 430 } },
    { id: 'swe14', name: 'Elliott Stroud', pos: 'Midfielder', age: 24, image: 'stroud.jpg', stats: { averageRating: 7.3, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 43, keyPassesPerMatch: 1.2, minutes: 360 } },
    { id: 'swe15', name: 'Alexander Bernhardsson', pos: 'Midfielder', age: 27, image: 'bernhardsson.jpg', stats: { averageRating: 7.4, goals: 3, assists: 3, ga: 6, accuratePassesPerMatch: 39, keyPassesPerMatch: 1.6, minutes: 400 } },
    { id: 'swe16', name: 'Herman Johansson', pos: 'Midfielder', age: 28, image: 'johansson.jpg', stats: { averageRating: 7.3, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 41, keyPassesPerMatch: 1.3, minutes: 370 } },
    { id: 'swe17', name: 'Victor Lindelöf', pos: 'Defender', age: 32, image: 'lindelof.jpg', stats: { averageRating: 7.7, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 72, keyPassesPerMatch: 0.4, interceptionsPerMatch: 1.8, tacklesPerMatch: 1.6, minutes: 510 } },
    { id: 'swe18', name: 'Isak Hien', pos: 'Defender', age: 27, image: 'hien.jpg', stats: { averageRating: 7.8, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 70, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.9, tacklesPerMatch: 1.8, minutes: 500 } },
    { id: 'swe19', name: 'Gabriel Gudmundsson', pos: 'Defender', age: 27, image: 'gudmundsson.jpg', stats: { averageRating: 7.6, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 58, keyPassesPerMatch: 1.1, interceptionsPerMatch: 1.5, tacklesPerMatch: 2.0, minutes: 470 } },
    { id: 'swe20', name: 'Gustaf Lagerbielke', pos: 'Defender', age: 26, image: 'lagerbielke.jpg', stats: { averageRating: 7.5, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 67, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.6, minutes: 440 } },
    { id: 'swe21', name: 'Carl Starfelt', pos: 'Defender', age: 31, image: 'starfelt.jpg', stats: { averageRating: 7.6, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 69, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.8, tacklesPerMatch: 1.7, minutes: 460 } },
    { id: 'swe22', name: 'Hjalmar Ekdal', pos: 'Defender', age: 27, image: 'ekdal.jpg', stats: { averageRating: 7.4, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 65, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.6, minutes: 410 } },
    { id: 'swe23', name: 'Eric Smith', pos: 'Defender', age: 29, image: 'smith.jpg', stats: { averageRating: 7.5, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 64, keyPassesPerMatch: 0.7, interceptionsPerMatch: 1.8, tacklesPerMatch: 1.9, minutes: 450 } },
    { id: 'swe24', name: 'Jacob Widell Zetterström', pos: 'Goalkeeper', age: 28, image: 'zetterstrom.jpg', stats: { averageRating: 7.7, goalsPrevented: 4.0, savesPerMatch: 3.5, minutes: 540 } },
    { id: 'swe25', name: 'Viktor Johansson', pos: 'Goalkeeper', age: 27, image: 'viktor_johansson.jpg', stats: { averageRating: 7.5, goalsPrevented: 3.0, savesPerMatch: 3.3, minutes: 180 } },
    { id: 'swe26', name: 'Kristoffer Nordfeldt', pos: 'Goalkeeper', age: 37, image: 'nordfeldt.jpg', stats: { averageRating: 7.3, goalsPrevented: 2.2, savesPerMatch: 3.0, minutes: 90 } }
  ],
  'TUN': [
    { id: 'tun1', name: 'Khalil Ayari', pos: 'Attacker', age: 21, image: 'ayari.jpg', stats: { averageRating: 7.6, goals: 4, assists: 5, ga: 9, shotsOnTargetPerMatch: 1.8, accuratePassesPerMatch: 31, keyPassesPerMatch: 1.9, minutes: 470, totalShots: 23 } },
    { id: 'tun2', name: 'Elias Saad', pos: 'Attacker', age: 26, image: 'saad.jpg', stats: { averageRating: 7.7, goals: 5, assists: 4, ga: 9, shotsOnTargetPerMatch: 2.0, accuratePassesPerMatch: 29, keyPassesPerMatch: 1.7, minutes: 490, totalShots: 27 } },
    { id: 'tun3', name: 'Firas Chaouat', pos: 'Attacker', age: 30, image: 'chaouat.jpg', stats: { averageRating: 7.5, goals: 6, assists: 2, ga: 8, shotsOnTargetPerMatch: 2.3, accuratePassesPerMatch: 22, keyPassesPerMatch: 0.9, minutes: 460, totalShots: 29 } },
    { id: 'tun4', name: 'Hazem Mastouri', pos: 'Attacker', age: 29, image: 'mastouri.jpg', stats: { averageRating: 7.4, goals: 5, assists: 1, ga: 6, shotsOnTargetPerMatch: 2.1, accuratePassesPerMatch: 20, keyPassesPerMatch: 0.7, minutes: 420, totalShots: 26 } },
    { id: 'tun5', name: 'Rayan Elloumi', pos: 'Attacker', age: 18, image: 'elloumi.jpg', stats: { averageRating: 7.3, goals: 3, assists: 2, ga: 5, shotsOnTargetPerMatch: 1.6, accuratePassesPerMatch: 24, keyPassesPerMatch: 1.0, minutes: 350, totalShots: 18 } },
    { id: 'tun6', name: 'Hannibal Mejbri', pos: 'Midfielder', age: 23, image: 'mejbri.jpg', stats: { averageRating: 7.9, goals: 3, assists: 6, ga: 9, accuratePassesPerMatch: 61, keyPassesPerMatch: 2.3, minutes: 520 } },
    { id: 'tun7', name: 'Ismael Gharbi', pos: 'Midfielder', age: 22, image: 'gharbi.jpg', stats: { averageRating: 7.7, goals: 4, assists: 5, ga: 9, accuratePassesPerMatch: 55, keyPassesPerMatch: 2.1, minutes: 490 } },
    { id: 'tun8', name: 'Elias Achouri', pos: 'Midfielder', age: 27, image: 'achouri.jpg', stats: { averageRating: 7.6, goals: 4, assists: 4, ga: 8, accuratePassesPerMatch: 42, keyPassesPerMatch: 1.9, minutes: 470 } },
    { id: 'tun9', name: 'Sebastian Tounekti', pos: 'Midfielder', age: 24, image: 'tounekti.jpg', stats: { averageRating: 7.5, goals: 3, assists: 4, ga: 7, accuratePassesPerMatch: 39, keyPassesPerMatch: 1.8, minutes: 440 } },
    { id: 'tun10', name: 'Ellyes Skhiri', pos: 'Midfielder', age: 31, image: 'skhiri.jpg', stats: { averageRating: 7.8, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 69, keyPassesPerMatch: 1.2, minutes: 530 } },
    { id: 'tun11', name: 'Anis Ben Slimane', pos: 'Midfielder', age: 25, image: 'ben_slimane.jpg', stats: { averageRating: 7.5, goals: 2, assists: 4, ga: 6, accuratePassesPerMatch: 58, keyPassesPerMatch: 1.6, minutes: 450 } },
    { id: 'tun12', name: 'Rani Khedira', pos: 'Midfielder', age: 32, image: 'khedira.jpg', stats: { averageRating: 7.4, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 65, keyPassesPerMatch: 0.8, minutes: 430 } },
    { id: 'tun13', name: 'Mohamed Belhadj Mahmoud', pos: 'Midfielder', age: 26, image: 'belhadj_mahmoud.jpg', stats: { averageRating: 7.4, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 62, keyPassesPerMatch: 1.1, minutes: 420 } },
    { id: 'tun14', name: 'Mortadha Ben Ouanes', pos: 'Midfielder', age: 32, image: 'ben_ouanes.jpg', stats: { averageRating: 7.5, goals: 3, assists: 4, ga: 7, accuratePassesPerMatch: 45, keyPassesPerMatch: 1.7, minutes: 460 } },
    { id: 'tun15', name: 'Ali Abdi', pos: 'Defender', age: 32, image: 'abdi.jpg', stats: { averageRating: 7.7, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 56, keyPassesPerMatch: 1.1, interceptionsPerMatch: 1.7, tacklesPerMatch: 2.1, minutes: 500 } },
    { id: 'tun16', name: 'Montassar Talbi', pos: 'Defender', age: 28, image: 'talbi.jpg', stats: { averageRating: 7.8, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 71, keyPassesPerMatch: 0.3, interceptionsPerMatch: 2.0, tacklesPerMatch: 1.8, minutes: 530 } },
    { id: 'tun17', name: 'Yan Valery', pos: 'Defender', age: 27, image: 'valery.jpg', stats: { averageRating: 7.5, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 58, keyPassesPerMatch: 1.0, interceptionsPerMatch: 1.5, tacklesPerMatch: 2.0, minutes: 470 } },
    { id: 'tun18', name: 'Omar Rekik', pos: 'Defender', age: 24, image: 'rekik.jpg', stats: { averageRating: 7.5, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 68, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.8, tacklesPerMatch: 1.7, minutes: 440 } },
    { id: 'tun19', name: 'Dylan Bronn', pos: 'Defender', age: 31, image: 'bronn.jpg', stats: { averageRating: 7.6, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 67, keyPassesPerMatch: 0.4, interceptionsPerMatch: 1.9, tacklesPerMatch: 1.8, minutes: 480 } },
    { id: 'tun20', name: 'Moataz Nefati', pos: 'Defender', age: 21, image: 'nefati.jpg', stats: { averageRating: 7.3, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 52, keyPassesPerMatch: 0.8, interceptionsPerMatch: 1.4, tacklesPerMatch: 1.9, minutes: 370 } },
    { id: 'tun21', name: 'Adem Arous', pos: 'Defender', age: 22, image: 'arous.jpg', stats: { averageRating: 7.4, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 64, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.7, minutes: 400 } },
    { id: 'tun22', name: 'Amine Ben Hmida', pos: 'Defender', age: 30, image: 'ben_hmida.jpg', stats: { averageRating: 7.5, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 55, keyPassesPerMatch: 1.0, interceptionsPerMatch: 1.6, tacklesPerMatch: 2.0, minutes: 450 } },
    { id: 'tun23', name: 'Raed Chikhaoui', pos: 'Defender', age: 22, image: 'chikhaoui.jpg', stats: { averageRating: 7.4, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 66, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.6, minutes: 410 } },
    { id: 'tun24', name: 'Aymen Dahmen', pos: 'Goalkeeper', age: 29, image: 'dahmen.jpg', stats: { averageRating: 7.7, goalsPrevented: 4.1, savesPerMatch: 3.6, minutes: 540 } },
    { id: 'tun25', name: 'Abdelmouhib Chamakh', pos: 'Goalkeeper', age: 24, image: 'chamakh.jpg', stats: { averageRating: 7.4, goalsPrevented: 2.8, savesPerMatch: 3.2, minutes: 180 } },
    { id: 'tun26', name: 'Sabri Ben Hassen', pos: 'Goalkeeper', age: 30, image: 'ben_hassen.jpg', stats: { averageRating: 7.3, goalsPrevented: 2.3, savesPerMatch: 3.0, minutes: 90 } }
  ],
  'EGY': [
    { id: 'egy1', name: 'Omar Marmoush', pos: 'Attacker', age: 27, image: 'marmoush.jpg', stats: { averageRating: 8.2, goals: 8, assists: 4, ga: 12, shotsOnTargetPerMatch: 2.7, accuratePassesPerMatch: 34, keyPassesPerMatch: 2.1, minutes: 540, totalShots: 36 } },
    { id: 'egy2', name: 'Hamza Abdelkarim', pos: 'Attacker', age: 18, image: 'abdelkarim.jpg', stats: { averageRating: 7.4, goals: 3, assists: 2, ga: 5, shotsOnTargetPerMatch: 1.7, accuratePassesPerMatch: 24, keyPassesPerMatch: 1.0, minutes: 310, totalShots: 18 } },
    { id: 'egy3', name: 'Mohamed Salah', pos: 'Midfielder', age: 34, image: 'salah.jpg', stats: { averageRating: 8.5, goals: 9, assists: 6, ga: 15, shotsOnTargetPerMatch: 3.0, accuratePassesPerMatch: 41, keyPassesPerMatch: 2.8, minutes: 550, totalShots: 40 } },
    { id: 'egy4', name: 'Emam Ashour', pos: 'Midfielder', age: 28, image: 'ashour.jpg', stats: { averageRating: 7.8, goals: 4, assists: 5, ga: 9, accuratePassesPerMatch: 58, keyPassesPerMatch: 2.0, minutes: 500 } },
    { id: 'egy5', name: 'Zizo', pos: 'Midfielder', age: 30, image: 'zizo.jpg', stats: { averageRating: 7.9, goals: 5, assists: 6, ga: 11, accuratePassesPerMatch: 51, keyPassesPerMatch: 2.4, minutes: 510 } },
    { id: 'egy6', name: 'Mahmoud Trézéguet', pos: 'Midfielder', age: 31, image: 'trezeguet.jpg', stats: { averageRating: 7.7, goals: 5, assists: 3, ga: 8, accuratePassesPerMatch: 39, keyPassesPerMatch: 1.8, minutes: 470 } },
    { id: 'egy7', name: 'Haissem Hassan', pos: 'Midfielder', age: 24, image: 'hassan.jpg', stats: { averageRating: 7.5, goals: 3, assists: 4, ga: 7, accuratePassesPerMatch: 42, keyPassesPerMatch: 1.7, minutes: 430 } },
    { id: 'egy8', name: 'Mostafa Ziko', pos: 'Midfielder', age: 29, image: 'mostafa_ziko.jpg', stats: { averageRating: 7.4, goals: 3, assists: 3, ga: 6, accuratePassesPerMatch: 38, keyPassesPerMatch: 1.5, minutes: 410 } },
    { id: 'egy9', name: 'Ibrahim Adel', pos: 'Midfielder', age: 25, image: 'ibrahim_adel.jpg', stats: { averageRating: 7.7, goals: 4, assists: 5, ga: 9, accuratePassesPerMatch: 43, keyPassesPerMatch: 2.0, minutes: 460 } },
    { id: 'egy10', name: 'Marwan Attia', pos: 'Midfielder', age: 27, image: 'attia.jpg', stats: { averageRating: 7.6, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 68, keyPassesPerMatch: 1.1, minutes: 500 } },
    { id: 'egy11', name: 'Hamdy Fathy', pos: 'Midfielder', age: 31, image: 'fathy.jpg', stats: { averageRating: 7.6, goals: 2, assists: 2, ga: 4, accuratePassesPerMatch: 65, keyPassesPerMatch: 0.9, minutes: 480 } },
    { id: 'egy12', name: 'Mahmoud Saber', pos: 'Midfielder', age: 24, image: 'saber.jpg', stats: { averageRating: 7.5, goals: 3, assists: 4, ga: 7, accuratePassesPerMatch: 57, keyPassesPerMatch: 1.6, minutes: 440 } },
    { id: 'egy13', name: 'Nabil Donga', pos: 'Midfielder', age: 30, image: 'donga.jpg', stats: { averageRating: 7.4, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 66, keyPassesPerMatch: 0.8, minutes: 430 } },
    { id: 'egy14', name: 'Mohanad Lasheen', pos: 'Midfielder', age: 30, image: 'lasheen.jpg', stats: { averageRating: 7.4, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 64, keyPassesPerMatch: 0.8, minutes: 420 } },
    { id: 'egy15', name: 'Mohamed Abdelmonem', pos: 'Defender', age: 27, image: 'abdelmonem.jpg', stats: { averageRating: 7.9, goals: 2, assists: 0, ga: 2, accuratePassesPerMatch: 73, keyPassesPerMatch: 0.3, interceptionsPerMatch: 2.1, tacklesPerMatch: 1.9, minutes: 530 } },
    { id: 'egy16', name: 'Mohamed Hany', pos: 'Defender', age: 30, image: 'hany.jpg', stats: { averageRating: 7.6, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 59, keyPassesPerMatch: 1.0, interceptionsPerMatch: 1.6, tacklesPerMatch: 2.1, minutes: 490 } },
    { id: 'egy17', name: 'Yasser Ibrahim', pos: 'Defender', age: 33, image: 'yasser_ibrahim.jpg', stats: { averageRating: 7.7, goals: 2, assists: 0, ga: 2, accuratePassesPerMatch: 70, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.9, tacklesPerMatch: 1.7, minutes: 500 } },
    { id: 'egy18', name: 'Hossam Abdelmaguid', pos: 'Defender', age: 25, image: 'abdelmaguid.jpg', stats: { averageRating: 7.6, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 68, keyPassesPerMatch: 0.2, interceptionsPerMatch: 1.8, tacklesPerMatch: 1.8, minutes: 470 } },
    { id: 'egy19', name: 'Ahmed Fatouh', pos: 'Defender', age: 28, image: 'fatouh.jpg', stats: { averageRating: 7.7, goals: 1, assists: 4, ga: 5, accuratePassesPerMatch: 57, keyPassesPerMatch: 1.2, interceptionsPerMatch: 1.5, tacklesPerMatch: 2.2, minutes: 490 } },
    { id: 'egy20', name: 'Rami Rabia', pos: 'Defender', age: 33, image: 'rabia.jpg', stats: { averageRating: 7.5, goals: 2, assists: 0, ga: 2, accuratePassesPerMatch: 69, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.8, tacklesPerMatch: 1.6, minutes: 450 } },
    { id: 'egy21', name: 'Karim Hafez', pos: 'Defender', age: 30, image: 'hafez.jpg', stats: { averageRating: 7.5, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 55, keyPassesPerMatch: 1.0, interceptionsPerMatch: 1.5, tacklesPerMatch: 2.0, minutes: 440 } },
    { id: 'egy22', name: 'Tarek Alaa', pos: 'Defender', age: 24, image: 'tarek_alaa.jpg', stats: { averageRating: 7.4, goals: 0, assists: 2, ga: 2, accuratePassesPerMatch: 54, keyPassesPerMatch: 0.8, interceptionsPerMatch: 1.4, tacklesPerMatch: 2.0, minutes: 390 } },
    { id: 'egy23', name: 'Mohamed El-Shenawy', pos: 'Goalkeeper', age: 37, image: 'el_shenawy.jpg', stats: { averageRating: 7.8, goalsPrevented: 4.5, savesPerMatch: 3.7, minutes: 540 } },
    { id: 'egy24', name: 'Mostafa Shobeir', pos: 'Goalkeeper', age: 26, image: 'shobeir.jpg', stats: { averageRating: 7.5, goalsPrevented: 3.1, savesPerMatch: 3.4, minutes: 270 } },
    { id: 'egy25', name: 'Mahdi Soliman', pos: 'Goalkeeper', age: 39, image: 'mahdi_soliman.jpg', stats: { averageRating: 7.3, goalsPrevented: 2.5, savesPerMatch: 3.1, minutes: 180 } },
    { id: 'egy26', name: 'Mohamed Alaa', pos: 'Goalkeeper', age: 26, image: 'mohamed_alaa.jpg', stats: { averageRating: 7.3, goalsPrevented: 2.2, savesPerMatch: 3.0, minutes: 90 } }
  ],
  'IRI': [
    { id: 'iri1', name: 'Mehdi Taremi', pos: 'Attacker', age: 34, image: 'taremi.jpg', stats: { averageRating: 8.1, goals: 7, assists: 4, ga: 11, shotsOnTargetPerMatch: 2.5, accuratePassesPerMatch: 31, keyPassesPerMatch: 1.8, minutes: 520, totalShots: 34 } },
    { id: 'iri2', name: 'Alireza Jahanbakhsh', pos: 'Attacker', age: 32, image: 'jahanbakhsh.jpg', stats: { averageRating: 7.7, goals: 4, assists: 5, ga: 9, shotsOnTargetPerMatch: 1.9, accuratePassesPerMatch: 38, keyPassesPerMatch: 2.0, minutes: 460, totalShots: 27 } },
    { id: 'iri3', name: 'Ali Alipour', pos: 'Attacker', age: 30, image: 'alipour.jpg', stats: { averageRating: 7.5, goals: 5, assists: 2, ga: 7, shotsOnTargetPerMatch: 2.1, accuratePassesPerMatch: 24, keyPassesPerMatch: 0.9, minutes: 430, totalShots: 29 } },
    { id: 'iri4', name: 'Mohammad Mohebi', pos: 'Attacker', age: 27, image: 'mohebi.jpg', stats: { averageRating: 7.8, goals: 5, assists: 4, ga: 9, shotsOnTargetPerMatch: 2.2, accuratePassesPerMatch: 33, keyPassesPerMatch: 1.7, minutes: 480, totalShots: 31 } },
    { id: 'iri5', name: 'Amirhossein Hosseinzadeh', pos: 'Attacker', age: 25, image: 'hosseinzadeh.jpg', stats: { averageRating: 7.5, goals: 4, assists: 2, ga: 6, shotsOnTargetPerMatch: 1.8, accuratePassesPerMatch: 27, keyPassesPerMatch: 1.1, minutes: 410, totalShots: 24 } },
    { id: 'iri6', name: 'Dennis Eckert Ayensa', pos: 'Attacker', age: 29, image: 'eckert_ayensa.jpg', stats: { averageRating: 7.6, goals: 5, assists: 2, ga: 7, shotsOnTargetPerMatch: 2.1, accuratePassesPerMatch: 25, keyPassesPerMatch: 1.0, minutes: 430, totalShots: 28 } },
    { id: 'iri7', name: 'Mahdi Torabi', pos: 'Attacker', age: 31, image: 'torabi.jpg', stats: { averageRating: 7.7, goals: 4, assists: 5, ga: 9, shotsOnTargetPerMatch: 1.9, accuratePassesPerMatch: 40, keyPassesPerMatch: 2.1, minutes: 470, totalShots: 26 } },
    { id: 'iri8', name: 'Shahriar Moghanlou', pos: 'Attacker', age: 31, image: 'moghanlou.jpg', stats: { averageRating: 7.5, goals: 6, assists: 1, ga: 7, shotsOnTargetPerMatch: 2.3, accuratePassesPerMatch: 22, keyPassesPerMatch: 0.7, minutes: 440, totalShots: 30 } },
    { id: 'iri9', name: 'Ramin Rezaeian', pos: 'Midfielder', age: 36, image: 'rezaeian.jpg', stats: { averageRating: 7.8, goals: 2, assists: 5, ga: 7, accuratePassesPerMatch: 55, keyPassesPerMatch: 2.0, minutes: 490 } },
    { id: 'iri10', name: 'Mehdi Ghayedi', pos: 'Midfielder', age: 27, image: 'ghayedi.jpg', stats: { averageRating: 7.9, goals: 5, assists: 5, ga: 10, accuratePassesPerMatch: 42, keyPassesPerMatch: 2.2, minutes: 480 } },
    { id: 'iri11', name: 'Saman Ghoddos', pos: 'Midfielder', age: 32, image: 'ghoddos.jpg', stats: { averageRating: 7.8, goals: 3, assists: 5, ga: 8, accuratePassesPerMatch: 59, keyPassesPerMatch: 2.1, minutes: 500 } },
    { id: 'iri12', name: 'Saeid Ezatolahi', pos: 'Midfielder', age: 29, image: 'ezatolahi.jpg', stats: { averageRating: 7.6, goals: 2, assists: 2, ga: 4, accuratePassesPerMatch: 68, keyPassesPerMatch: 0.9, minutes: 510 } },
    { id: 'iri13', name: 'Mohammad Ghorbani', pos: 'Midfielder', age: 25, image: 'ghorbani.jpg', stats: { averageRating: 7.5, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 65, keyPassesPerMatch: 1.0, minutes: 460 } },
    { id: 'iri14', name: 'Amirmohammad Razzaghinia', pos: 'Midfielder', age: 20, image: 'razzaghinia.jpg', stats: { averageRating: 7.4, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 57, keyPassesPerMatch: 1.2, minutes: 390 } },
    { id: 'iri15', name: 'Aria Yousefi', pos: 'Midfielder', age: 24, image: 'yousefi.jpg', stats: { averageRating: 7.4, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 54, keyPassesPerMatch: 1.1, minutes: 410 } },
    { id: 'iri16', name: 'Milad Mohammadi', pos: 'Defender', age: 32, image: 'milad_mohammadi.jpg', stats: { averageRating: 7.6, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 58, keyPassesPerMatch: 1.0, interceptionsPerMatch: 1.6, tacklesPerMatch: 2.1, minutes: 480 } },
    { id: 'iri17', name: 'Hossein Kanaani', pos: 'Defender', age: 32, image: 'kanaani.jpg', stats: { averageRating: 7.8, goals: 2, assists: 0, ga: 2, accuratePassesPerMatch: 72, keyPassesPerMatch: 0.3, interceptionsPerMatch: 2.0, tacklesPerMatch: 1.8, minutes: 520 } },
    { id: 'iri18', name: 'Ehsan Hajsafi', pos: 'Defender', age: 36, image: 'hajsafi.jpg', stats: { averageRating: 7.6, goals: 1, assists: 4, ga: 5, accuratePassesPerMatch: 61, keyPassesPerMatch: 1.3, interceptionsPerMatch: 1.5, tacklesPerMatch: 1.9, minutes: 470 } },
    { id: 'iri19', name: 'Shoja Khalilzadeh', pos: 'Defender', age: 37, image: 'khalilzadeh.jpg', stats: { averageRating: 7.6, goals: 2, assists: 0, ga: 2, accuratePassesPerMatch: 69, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.9, tacklesPerMatch: 1.7, minutes: 480 } },
    { id: 'iri20', name: 'Roozbeh Cheshmi', pos: 'Defender', age: 32, image: 'cheshmi.jpg', stats: { averageRating: 7.7, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 70, keyPassesPerMatch: 0.5, interceptionsPerMatch: 1.9, tacklesPerMatch: 1.8, minutes: 500 } },
    { id: 'iri21', name: 'Saleh Hardani', pos: 'Defender', age: 27, image: 'hardani.jpg', stats: { averageRating: 7.5, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 56, keyPassesPerMatch: 1.0, interceptionsPerMatch: 1.5, tacklesPerMatch: 2.1, minutes: 440 } },
    { id: 'iri22', name: 'Ali Nemati', pos: 'Defender', age: 30, image: 'nemati.jpg', stats: { averageRating: 7.5, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 66, keyPassesPerMatch: 0.4, interceptionsPerMatch: 1.8, tacklesPerMatch: 1.7, minutes: 450 } },
    { id: 'iri23', name: 'Danial Eiri', pos: 'Defender', age: 22, image: 'eiri.jpg', stats: { averageRating: 7.4, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 64, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.7, minutes: 400 } },
    { id: 'iri24', name: 'Alireza Beiranvand', pos: 'Goalkeeper', age: 33, image: 'beiranvand.jpg', stats: { averageRating: 7.9, goalsPrevented: 4.4, savesPerMatch: 3.7, minutes: 540 } },
    { id: 'iri25', name: 'Hossein Hosseini', pos: 'Goalkeeper', age: 34, image: 'hosseini.jpg', stats: { averageRating: 7.5, goalsPrevented: 3.0, savesPerMatch: 3.3, minutes: 270 } },
    { id: 'iri26', name: 'Payam Niazmand', pos: 'Goalkeeper', age: 31, image: 'niazmand.jpg', stats: { averageRating: 7.4, goalsPrevented: 2.6, savesPerMatch: 3.1, minutes: 180 } }
  ],
  'NZL': [
    { id: 'nzl1', name: 'Chris Wood', pos: 'Attacker', age: 34, image: 'chris_wood.jpg', stats: { averageRating: 8.2, goals: 9, assists: 2, ga: 11, shotsOnTargetPerMatch: 2.8, accuratePassesPerMatch: 24, keyPassesPerMatch: 1.0, minutes: 530, totalShots: 38 } },
    { id: 'nzl2', name: 'Kosta Barbarouses', pos: 'Attacker', age: 36, image: 'barbarouses.jpg', stats: { averageRating: 7.5, goals: 4, assists: 3, ga: 7, shotsOnTargetPerMatch: 1.9, accuratePassesPerMatch: 27, keyPassesPerMatch: 1.3, minutes: 430, totalShots: 25 } },
    { id: 'nzl3', name: 'Ben Waine', pos: 'Attacker', age: 24, image: 'waine.jpg', stats: { averageRating: 7.4, goals: 4, assists: 2, ga: 6, shotsOnTargetPerMatch: 1.8, accuratePassesPerMatch: 23, keyPassesPerMatch: 0.8, minutes: 400, totalShots: 24 } },
    { id: 'nzl4', name: 'Elijah Just', pos: 'Midfielder', age: 26, image: 'elijah_just.jpg', stats: { averageRating: 7.6, goals: 3, assists: 5, ga: 8, accuratePassesPerMatch: 43, keyPassesPerMatch: 2.0, minutes: 470 } },
    { id: 'nzl5', name: 'Sarpreet Singh', pos: 'Midfielder', age: 27, image: 'sarpreet_singh.jpg', stats: { averageRating: 7.8, goals: 4, assists: 6, ga: 10, accuratePassesPerMatch: 52, keyPassesPerMatch: 2.3, minutes: 500 } },
    { id: 'nzl6', name: 'Marko Stamenic', pos: 'Midfielder', age: 24, image: 'stamenic.jpg', stats: { averageRating: 7.7, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 66, keyPassesPerMatch: 1.1, minutes: 510 } },
    { id: 'nzl7', name: 'Liberato Cacace', pos: 'Midfielder', age: 25, image: 'cacace.jpg', stats: { averageRating: 7.6, goals: 1, assists: 4, ga: 5, accuratePassesPerMatch: 55, keyPassesPerMatch: 1.5, minutes: 490 } },
    { id: 'nzl8', name: 'Callum McCowatt', pos: 'Midfielder', age: 27, image: 'mccowatt.jpg', stats: { averageRating: 7.5, goals: 3, assists: 4, ga: 7, accuratePassesPerMatch: 44, keyPassesPerMatch: 1.8, minutes: 450 } },
    { id: 'nzl9', name: 'Jesse Randall', pos: 'Midfielder', age: 23, image: 'jesse_randall.jpg', stats: { averageRating: 7.4, goals: 3, assists: 2, ga: 5, accuratePassesPerMatch: 38, keyPassesPerMatch: 1.3, minutes: 410 } },
    { id: 'nzl10', name: 'Joe Bell', pos: 'Midfielder', age: 27, image: 'joe_bell.jpg', stats: { averageRating: 7.7, goals: 2, assists: 4, ga: 6, accuratePassesPerMatch: 68, keyPassesPerMatch: 1.4, minutes: 510 } },
    { id: 'nzl11', name: 'Benjamin Old', pos: 'Midfielder', age: 23, image: 'benjamin_old.jpg', stats: { averageRating: 7.5, goals: 3, assists: 4, ga: 7, accuratePassesPerMatch: 41, keyPassesPerMatch: 1.7, minutes: 440 } },
    { id: 'nzl12', name: 'Ryan Thomas', pos: 'Midfielder', age: 31, image: 'ryan_thomas.jpg', stats: { averageRating: 7.6, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 63, keyPassesPerMatch: 1.3, minutes: 470 } },
    { id: 'nzl13', name: 'Lachlan Bayliss', pos: 'Midfielder', age: 23, image: 'lachlan_bayliss.jpg', stats: { averageRating: 7.4, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 51, keyPassesPerMatch: 1.5, minutes: 420 } },
    { id: 'nzl14', name: 'Alex Rufer', pos: 'Midfielder', age: 30, image: 'alex_rufer.jpg', stats: { averageRating: 7.6, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 67, keyPassesPerMatch: 1.0, minutes: 500 } },
    { id: 'nzl15', name: 'Logan Rogerson', pos: 'Midfielder', age: 28, image: 'logan_rogerson.jpg', stats: { averageRating: 7.5, goals: 3, assists: 4, ga: 7, accuratePassesPerMatch: 42, keyPassesPerMatch: 1.7, minutes: 450 } },
    { id: 'nzl16', name: 'Tim Payne', pos: 'Defender', age: 32, image: 'tim_payne.jpg', stats: { averageRating: 7.6, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 62, keyPassesPerMatch: 0.8, interceptionsPerMatch: 1.7, tacklesPerMatch: 2.0, minutes: 490 } },
    { id: 'nzl17', name: 'Finn Surman', pos: 'Defender', age: 22, image: 'finn_surman.jpg', stats: { averageRating: 7.7, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 70, keyPassesPerMatch: 0.4, interceptionsPerMatch: 2.0, tacklesPerMatch: 1.8, minutes: 510 } },
    { id: 'nzl18', name: 'Tyler Bindon', pos: 'Defender', age: 21, image: 'tyler_bindon.jpg', stats: { averageRating: 7.6, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 68, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.9, tacklesPerMatch: 1.8, minutes: 480 } },
    { id: 'nzl19', name: 'Michael Boxall', pos: 'Defender', age: 37, image: 'michael_boxall.jpg', stats: { averageRating: 7.5, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 65, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.8, tacklesPerMatch: 1.7, minutes: 460 } },
    { id: 'nzl20', name: 'Francis De Vries', pos: 'Defender', age: 31, image: 'francis_de_vries.jpg', stats: { averageRating: 7.5, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 57, keyPassesPerMatch: 1.0, interceptionsPerMatch: 1.5, tacklesPerMatch: 2.0, minutes: 450 } },
    { id: 'nzl21', name: 'Nando Pijnaker', pos: 'Defender', age: 27, image: 'nando_pijnaker.jpg', stats: { averageRating: 7.6, goals: 2, assists: 0, ga: 2, accuratePassesPerMatch: 69, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.9, tacklesPerMatch: 1.8, minutes: 490 } },
    { id: 'nzl22', name: 'Callan Elliot', pos: 'Defender', age: 27, image: 'callan_elliot.jpg', stats: { averageRating: 7.5, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 55, keyPassesPerMatch: 1.0, interceptionsPerMatch: 1.6, tacklesPerMatch: 2.2, minutes: 450 } },
    { id: 'nzl23', name: 'Tommy Smith', pos: 'Defender', age: 36, image: 'tommy_smith.jpg', stats: { averageRating: 7.4, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 64, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.6, minutes: 430 } },
    { id: 'nzl24', name: 'Alex Paulsen', pos: 'Goalkeeper', age: 24, image: 'alex_paulsen.jpg', stats: { averageRating: 7.8, goalsPrevented: 4.1, savesPerMatch: 3.6, minutes: 540 } },
    { id: 'nzl25', name: 'Max Crocombe', pos: 'Goalkeeper', age: 32, image: 'max_crocombe.jpg', stats: { averageRating: 7.5, goalsPrevented: 3.0, savesPerMatch: 3.3, minutes: 270 } },
    { id: 'nzl26', name: 'Michael Woud', pos: 'Goalkeeper', age: 27, image: 'michael_woud.jpg', stats: { averageRating: 7.4, goalsPrevented: 2.5, savesPerMatch: 3.1, minutes: 180 } }
  ],
  'CPV': [
    { id: 'cpv1', name: 'Dailon Rocha Livramento', pos: 'Attacker', age: 25, image: 'dailon_livramento.jpg', stats: { averageRating: 7.8, goals: 6, assists: 2, ga: 8, shotsOnTargetPerMatch: 2.3, accuratePassesPerMatch: 25, keyPassesPerMatch: 0.9, minutes: 480, totalShots: 31 } },
    { id: 'cpv2', name: 'Jovane Cabral', pos: 'Attacker', age: 28, image: 'jovane_cabral.jpg', stats: { averageRating: 7.6, goals: 4, assists: 4, ga: 8, shotsOnTargetPerMatch: 2.0, accuratePassesPerMatch: 31, keyPassesPerMatch: 1.6, minutes: 450, totalShots: 27 } },
    { id: 'cpv3', name: 'Nuno Da Costa', pos: 'Attacker', age: 35, image: 'nuno_da_costa.jpg', stats: { averageRating: 7.7, goals: 5, assists: 2, ga: 7, shotsOnTargetPerMatch: 2.1, accuratePassesPerMatch: 24, keyPassesPerMatch: 0.8, minutes: 440, totalShots: 29 } },
    { id: 'cpv4', name: 'Gilson Tavares', pos: 'Attacker', age: 24, image: 'gilson_tavares.jpg', stats: { averageRating: 7.5, goals: 4, assists: 1, ga: 5, shotsOnTargetPerMatch: 1.8, accuratePassesPerMatch: 22, keyPassesPerMatch: 0.7, minutes: 400, totalShots: 23 } },
    { id: 'cpv5', name: 'Deroy Duarte', pos: 'Midfielder', age: 27, image: 'deroy_duarte.jpg', stats: { averageRating: 7.7, goals: 2, assists: 4, ga: 6, accuratePassesPerMatch: 64, keyPassesPerMatch: 1.4, minutes: 510 } },
    { id: 'cpv6', name: 'João Paulo', pos: 'Midfielder', age: 28, image: 'joao_paulo.jpg', stats: { averageRating: 7.5, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 58, keyPassesPerMatch: 1.2, minutes: 470 } },
    { id: 'cpv7', name: 'Kevin Pina', pos: 'Midfielder', age: 29, image: 'kevin_pina.jpg', stats: { averageRating: 7.8, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 68, keyPassesPerMatch: 1.1, minutes: 520 } },
    { id: 'cpv8', name: 'Ryan Mendes', pos: 'Midfielder', age: 36, image: 'ryan_mendes.jpg', stats: { averageRating: 7.8, goals: 4, assists: 5, ga: 9, accuratePassesPerMatch: 42, keyPassesPerMatch: 2.1, minutes: 500 } },
    { id: 'cpv9', name: 'Willy Semedo', pos: 'Midfielder', age: 32, image: 'willy_semedo.jpg', stats: { averageRating: 7.5, goals: 3, assists: 4, ga: 7, accuratePassesPerMatch: 39, keyPassesPerMatch: 1.7, minutes: 460 } },
    { id: 'cpv10', name: 'Garry Rodrigues', pos: 'Midfielder', age: 35, image: 'garry_rodrigues.jpg', stats: { averageRating: 7.6, goals: 4, assists: 5, ga: 9, accuratePassesPerMatch: 41, keyPassesPerMatch: 2.0, minutes: 470 } },
    { id: 'cpv11', name: 'Hélio Varela', pos: 'Midfielder', age: 24, image: 'helio_varela.jpg', stats: { averageRating: 7.6, goals: 3, assists: 4, ga: 7, accuratePassesPerMatch: 40, keyPassesPerMatch: 1.8, minutes: 450 } },
    { id: 'cpv12', name: 'Telmo Arcanjo', pos: 'Midfielder', age: 25, image: 'telmo_arcanjo.jpg', stats: { averageRating: 7.4, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 38, keyPassesPerMatch: 1.5, minutes: 410 } },
    { id: 'cpv13', name: 'Jamiro Monteiro', pos: 'Midfielder', age: 32, image: 'jamiro_monteiro.jpg', stats: { averageRating: 7.8, goals: 3, assists: 6, ga: 9, accuratePassesPerMatch: 61, keyPassesPerMatch: 2.2, minutes: 510 } },
    { id: 'cpv14', name: 'Laros Duarte', pos: 'Midfielder', age: 29, image: 'laros_duarte.jpg', stats: { averageRating: 7.6, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 65, keyPassesPerMatch: 1.2, minutes: 490 } },
    { id: 'cpv15', name: 'Yannick Semedo', pos: 'Midfielder', age: 30, image: 'yannick_semedo.jpg', stats: { averageRating: 7.5, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 62, keyPassesPerMatch: 1.1, minutes: 460 } },
    { id: 'cpv16', name: 'Sidny Lopes Cabral', pos: 'Defender', age: 23, image: 'sidny_lopes_cabral.jpg', stats: { averageRating: 7.6, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 56, keyPassesPerMatch: 0.9, interceptionsPerMatch: 1.6, tacklesPerMatch: 2.3, minutes: 470 } },
    { id: 'cpv17', name: 'Diney Borges', pos: 'Defender', age: 31, image: 'diney_borges.jpg', stats: { averageRating: 7.5, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 66, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.8, tacklesPerMatch: 1.7, minutes: 460 } },
    { id: 'cpv18', name: 'Logan Costa', pos: 'Defender', age: 25, image: 'logan_costa.jpg', stats: { averageRating: 7.9, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 72, keyPassesPerMatch: 0.4, interceptionsPerMatch: 2.1, tacklesPerMatch: 1.9, minutes: 530 } },
    { id: 'cpv19', name: 'Wagner Pina', pos: 'Defender', age: 23, image: 'wagner_pina.jpg', stats: { averageRating: 7.6, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 58, keyPassesPerMatch: 1.0, interceptionsPerMatch: 1.5, tacklesPerMatch: 2.2, minutes: 470 } },
    { id: 'cpv20', name: 'Pico', pos: 'Defender', age: 34, image: 'pico.jpg', stats: { averageRating: 7.5, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 65, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.8, tacklesPerMatch: 1.7, minutes: 450 } },
    { id: 'cpv21', name: 'Stopira', pos: 'Defender', age: 38, image: 'stopira.jpg', stats: { averageRating: 7.4, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 61, keyPassesPerMatch: 0.5, interceptionsPerMatch: 1.7, tacklesPerMatch: 1.8, minutes: 420 } },
    { id: 'cpv22', name: 'Steven Moreira', pos: 'Defender', age: 31, image: 'steven_moreira.jpg', stats: { averageRating: 7.7, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 63, keyPassesPerMatch: 0.9, interceptionsPerMatch: 1.8, tacklesPerMatch: 2.1, minutes: 500 } },
    { id: 'cpv23', name: 'Kelvin Pires', pos: 'Defender', age: 26, image: 'kelvin_pires.jpg', stats: { averageRating: 7.6, goals: 2, assists: 0, ga: 2, accuratePassesPerMatch: 69, keyPassesPerMatch: 0.3, interceptionsPerMatch: 2.0, tacklesPerMatch: 1.8, minutes: 490 } },
    { id: 'cpv24', name: 'Vozinha', pos: 'Goalkeeper', age: 40, image: 'vozinha.jpg', stats: { averageRating: 7.6, goalsPrevented: 3.5, savesPerMatch: 3.4, minutes: 450 } },
    { id: 'cpv25', name: 'CJ Dos Santos', pos: 'Goalkeeper', age: 25, image: 'cj_dos_santos.jpg', stats: { averageRating: 7.7, goalsPrevented: 3.8, savesPerMatch: 3.6, minutes: 360 } },
    { id: 'cpv26', name: 'Márcio Rosa', pos: 'Goalkeeper', age: 29, image: 'marcio_rosa.jpg', stats: { averageRating: 7.5, goalsPrevented: 2.9, savesPerMatch: 3.2, minutes: 270 } }
  ],
  'URU': [
    { id: 'uru1', name: 'Darwin Núñez', pos: 'Attacker', age: 27, image: 'darwin_nunez.jpg', stats: { averageRating: 8.4, goals: 10, assists: 3, ga: 13, shotsOnTargetPerMatch: 3.1, accuratePassesPerMatch: 25, keyPassesPerMatch: 1.1, minutes: 540, totalShots: 42 } },
    { id: 'uru2', name: 'Rodrigo Zalazar', pos: 'Attacker', age: 26, image: 'rodrigo_zalazar.jpg', stats: { averageRating: 7.7, goals: 4, assists: 5, ga: 9, shotsOnTargetPerMatch: 2.0, accuratePassesPerMatch: 42, keyPassesPerMatch: 1.9, minutes: 470, totalShots: 28 } },
    { id: 'uru3', name: 'Federico Viñas', pos: 'Attacker', age: 28, image: 'federico_vinas.jpg', stats: { averageRating: 7.6, goals: 5, assists: 2, ga: 7, shotsOnTargetPerMatch: 2.2, accuratePassesPerMatch: 23, keyPassesPerMatch: 0.8, minutes: 440, totalShots: 30 } },
    { id: 'uru4', name: 'Rodrigo Aguirre', pos: 'Attacker', age: 31, image: 'rodrigo_aguirre.jpg', stats: { averageRating: 7.5, goals: 4, assists: 2, ga: 6, shotsOnTargetPerMatch: 1.9, accuratePassesPerMatch: 24, keyPassesPerMatch: 0.9, minutes: 420, totalShots: 26 } },
    { id: 'uru5', name: 'Federico Valverde', pos: 'Midfielder', age: 27, image: 'federico_valverde.jpg', stats: { averageRating: 8.6, goals: 5, assists: 7, ga: 12, accuratePassesPerMatch: 76, keyPassesPerMatch: 2.2, minutes: 550 } },
    { id: 'uru6', name: 'Giorgian de Arrascaeta', pos: 'Midfielder', age: 32, image: 'giorgian_de_arrascaeta.jpg', stats: { averageRating: 8.2, goals: 5, assists: 8, ga: 13, accuratePassesPerMatch: 61, keyPassesPerMatch: 2.8, minutes: 510 } },
    { id: 'uru7', name: 'Manuel Ugarte', pos: 'Midfielder', age: 25, image: 'manuel_ugarte.jpg', stats: { averageRating: 8.0, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 74, keyPassesPerMatch: 1.0, minutes: 530 } },
    { id: 'uru8', name: 'Nicolás de la Cruz', pos: 'Midfielder', age: 29, image: 'nicolas_de_la_cruz.jpg', stats: { averageRating: 8.1, goals: 4, assists: 6, ga: 10, accuratePassesPerMatch: 67, keyPassesPerMatch: 2.3, minutes: 510 } },
    { id: 'uru9', name: 'Rodrigo Bentancur', pos: 'Midfielder', age: 29, image: 'rodrigo_bentancur.jpg', stats: { averageRating: 8.0, goals: 3, assists: 4, ga: 7, accuratePassesPerMatch: 72, keyPassesPerMatch: 1.5, minutes: 520 } },
    { id: 'uru10', name: 'Facundo Pellistri', pos: 'Midfielder', age: 24, image: 'facundo_pellistri.jpg', stats: { averageRating: 7.8, goals: 3, assists: 5, ga: 8, accuratePassesPerMatch: 44, keyPassesPerMatch: 1.9, minutes: 470 } },
    { id: 'uru11', name: 'Agustín Canobbio', pos: 'Midfielder', age: 27, image: 'agustin_canobbio.jpg', stats: { averageRating: 7.7, goals: 3, assists: 4, ga: 7, accuratePassesPerMatch: 42, keyPassesPerMatch: 1.7, minutes: 450 } },
    { id: 'uru12', name: 'Emiliano Martínez', pos: 'Midfielder', age: 26, image: 'emiliano_martinez.jpg', stats: { averageRating: 7.7, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 65, keyPassesPerMatch: 1.2, minutes: 480 } },
    { id: 'uru13', name: 'Brian Rodríguez', pos: 'Midfielder', age: 26, image: 'brian_rodriguez.jpg', stats: { averageRating: 7.6, goals: 4, assists: 4, ga: 8, accuratePassesPerMatch: 40, keyPassesPerMatch: 1.8, minutes: 450 } },
    { id: 'uru14', name: 'Ronald Araújo', pos: 'Defender', age: 27, image: 'ronald_araujo.jpg', stats: { averageRating: 8.2, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 75, keyPassesPerMatch: 0.4, interceptionsPerMatch: 2.1, tacklesPerMatch: 2.2, minutes: 530 } },
    { id: 'uru15', name: 'Maximiliano Araújo', pos: 'Defender', age: 26, image: 'maximiliano_araujo.jpg', stats: { averageRating: 7.8, goals: 2, assists: 5, ga: 7, accuratePassesPerMatch: 55, keyPassesPerMatch: 1.5, interceptionsPerMatch: 1.4, tacklesPerMatch: 2.1, minutes: 490 } },
    { id: 'uru16', name: 'Guillermo Varela', pos: 'Defender', age: 33, image: 'guillermo_varela.jpg', stats: { averageRating: 7.6, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 58, keyPassesPerMatch: 0.9, interceptionsPerMatch: 1.6, tacklesPerMatch: 2.0, minutes: 460 } },
    { id: 'uru17', name: 'Joaquín Piquerez', pos: 'Defender', age: 27, image: 'joaquin_piquerez.jpg', stats: { averageRating: 7.8, goals: 1, assists: 4, ga: 5, accuratePassesPerMatch: 61, keyPassesPerMatch: 1.2, interceptionsPerMatch: 1.7, tacklesPerMatch: 2.2, minutes: 490 } },
    { id: 'uru18', name: 'Matías Viña', pos: 'Defender', age: 28, image: 'matias_vina.jpg', stats: { averageRating: 7.6, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 59, keyPassesPerMatch: 1.0, interceptionsPerMatch: 1.6, tacklesPerMatch: 2.0, minutes: 460 } },
    { id: 'uru19', name: 'José María Giménez', pos: 'Defender', age: 31, image: 'jose_maria_gimenez.jpg', stats: { averageRating: 8.1, goals: 2, assists: 0, ga: 2, accuratePassesPerMatch: 71, keyPassesPerMatch: 0.3, interceptionsPerMatch: 2.2, tacklesPerMatch: 1.9, minutes: 520 } },
    { id: 'uru20', name: 'Mathías Olivera', pos: 'Defender', age: 28, image: 'mathias_olivera.jpg', stats: { averageRating: 7.9, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 64, keyPassesPerMatch: 0.9, interceptionsPerMatch: 1.8, tacklesPerMatch: 2.1, minutes: 500 } },
    { id: 'uru21', name: 'Santiago Bueno', pos: 'Defender', age: 27, image: 'santiago_bueno.jpg', stats: { averageRating: 7.7, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 69, keyPassesPerMatch: 0.3, interceptionsPerMatch: 2.0, tacklesPerMatch: 1.8, minutes: 480 } },
    { id: 'uru22', name: 'Sebastián Cáceres', pos: 'Defender', age: 26, image: 'sebastian_caceres.jpg', stats: { averageRating: 7.6, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 67, keyPassesPerMatch: 0.3, interceptionsPerMatch: 1.9, tacklesPerMatch: 1.8, minutes: 460 } },
    { id: 'uru23', name: 'Juan Sanabria', pos: 'Defender', age: 26, image: 'juan_sanabria.jpg', stats: { averageRating: 7.6, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 57, keyPassesPerMatch: 1.0, interceptionsPerMatch: 1.5, tacklesPerMatch: 2.1, minutes: 450 } },
    { id: 'uru24', name: 'Fernando Muslera', pos: 'Goalkeeper', age: 40, image: 'fernando_muslera.jpg', stats: { averageRating: 7.8, goalsPrevented: 4.0, savesPerMatch: 3.5, minutes: 450 } },
    { id: 'uru25', name: 'Sergio Rochet', pos: 'Goalkeeper', age: 33, image: 'sergio_rochet.jpg', stats: { averageRating: 8.0, goalsPrevented: 4.5, savesPerMatch: 3.8, minutes: 540 } },
    { id: 'uru26', name: 'Santiago Mele', pos: 'Goalkeeper', age: 28, image: 'santiago_mele.jpg', stats: { averageRating: 7.6, goalsPrevented: 3.1, savesPerMatch: 3.3, minutes: 270 } }
  ],
  'KSA': [
    { id: 'ksa1', name: 'Abdullah Al-Hamdan', pos: 'Attacker', age: 26, image: 'abdullah_al_hamdan.jpg', stats: { averageRating: 7.7, goals: 5, assists: 4, ga: 9, shotsOnTargetPerMatch: 2.1, accuratePassesPerMatch: 31, keyPassesPerMatch: 1.4, minutes: 470, totalShots: 29 } },
    { id: 'ksa2', name: 'Firas Al-Buraikan', pos: 'Attacker', age: 26, image: 'firas_al_buraikan.jpg', stats: { averageRating: 8.1, goals: 8, assists: 3, ga: 11, shotsOnTargetPerMatch: 2.8, accuratePassesPerMatch: 25, keyPassesPerMatch: 1.1, minutes: 520, totalShots: 38 } },
    { id: 'ksa3', name: 'Saleh Al-Shehri', pos: 'Attacker', age: 32, image: 'saleh_al_shehri.jpg', stats: { averageRating: 7.8, goals: 6, assists: 2, ga: 8, shotsOnTargetPerMatch: 2.4, accuratePassesPerMatch: 23, keyPassesPerMatch: 0.8, minutes: 460, totalShots: 32 } },
    { id: 'ksa4', name: 'Sultan Mandash', pos: 'Attacker', age: 31, image: 'sultan_mandash.jpg', stats: { averageRating: 7.5, goals: 3, assists: 4, ga: 7, shotsOnTargetPerMatch: 1.7, accuratePassesPerMatch: 34, keyPassesPerMatch: 1.5, minutes: 430, totalShots: 24 } },
    { id: 'ksa5', name: 'Khalid Al-Ghannam', pos: 'Attacker', age: 25, image: 'khalid_al_ghannam.jpg', stats: { averageRating: 7.6, goals: 4, assists: 5, ga: 9, shotsOnTargetPerMatch: 1.9, accuratePassesPerMatch: 36, keyPassesPerMatch: 1.8, minutes: 450, totalShots: 27 } },
    { id: 'ksa6', name: 'Saud Abdulhamid', pos: 'Midfielder', age: 27, image: 'saud_abdulhamid.jpg', stats: { averageRating: 8.0, goals: 2, assists: 6, ga: 8, accuratePassesPerMatch: 58, keyPassesPerMatch: 1.7, minutes: 520 } },
    { id: 'ksa7', name: 'Salem Al-Dawsari', pos: 'Midfielder', age: 34, image: 'salem_al_dawsari.jpg', stats: { averageRating: 8.6, goals: 8, assists: 9, ga: 17, accuratePassesPerMatch: 56, keyPassesPerMatch: 2.8, minutes: 550 } },
    { id: 'ksa8', name: 'Mohamed Kanno', pos: 'Midfielder', age: 31, image: 'mohamed_kanno.jpg', stats: { averageRating: 8.0, goals: 3, assists: 4, ga: 7, accuratePassesPerMatch: 72, keyPassesPerMatch: 1.4, minutes: 530 } },
    { id: 'ksa9', name: 'Ayman Yahya', pos: 'Midfielder', age: 25, image: 'ayman_yahya.jpg', stats: { averageRating: 7.8, goals: 4, assists: 5, ga: 9, accuratePassesPerMatch: 47, keyPassesPerMatch: 1.9, minutes: 480 } },
    { id: 'ksa10', name: 'Abdullah Al-Khaibari', pos: 'Midfielder', age: 29, image: 'abdullah_al_khaibari.jpg', stats: { averageRating: 7.9, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 75, keyPassesPerMatch: 1.0, minutes: 510 } },
    { id: 'ksa11', name: 'Nasser Al-Dawsari', pos: 'Midfielder', age: 27, image: 'nasser_al_dawsari.jpg', stats: { averageRating: 7.8, goals: 2, assists: 4, ga: 6, accuratePassesPerMatch: 67, keyPassesPerMatch: 1.3, minutes: 490 } },
    { id: 'ksa12', name: 'Musab Al Juwayr', pos: 'Midfielder', age: 23, image: 'musab_al_juwayr.jpg', stats: { averageRating: 8.1, goals: 4, assists: 7, ga: 11, accuratePassesPerMatch: 64, keyPassesPerMatch: 2.3, minutes: 500 } },
    { id: 'ksa13', name: 'Ziyad Aljohani', pos: 'Midfielder', age: 24, image: 'ziyad_aljohani.jpg', stats: { averageRating: 7.7, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 68, keyPassesPerMatch: 1.1, minutes: 460 } },
    { id: 'ksa14', name: 'Mohammed Abu Al-Shamat', pos: 'Midfielder', age: 23, image: 'mohammed_abu_al_shamat.jpg', stats: { averageRating: 7.6, goals: 2, assists: 4, ga: 6, accuratePassesPerMatch: 49, keyPassesPerMatch: 1.5, minutes: 440 } },
    { id: 'ksa15', name: "Ala'a Al-Hejji", pos: 'Midfielder', age: 30, image: 'alaa_al_hejji.jpg', stats: { averageRating: 7.6, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 66, keyPassesPerMatch: 1.2, minutes: 450 } },
    { id: 'ksa16', name: 'Abdulelah Al-Amri', pos: 'Defender', age: 29, image: 'abdulelah_al_amri.jpg', stats: { averageRating: 8.0, goals: 2, assists: 0, ga: 2, accuratePassesPerMatch: 72, keyPassesPerMatch: 0.3, interceptionsPerMatch: 2.1, tacklesPerMatch: 2.0, minutes: 520 } },
    { id: 'ksa17', name: 'Nawaf Boushal', pos: 'Defender', age: 26, image: 'nawaf_boushal.jpg', stats: { averageRating: 7.7, goals: 1, assists: 4, ga: 5, accuratePassesPerMatch: 59, keyPassesPerMatch: 1.1, interceptionsPerMatch: 1.6, tacklesPerMatch: 2.2, minutes: 480 } },
    { id: 'ksa18', name: 'Hassan Tambakti', pos: 'Defender', age: 27, image: 'hassan_tambakti.jpg', stats: { averageRating: 8.1, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 76, keyPassesPerMatch: 0.4, interceptionsPerMatch: 2.3, tacklesPerMatch: 2.1, minutes: 530 } },
    { id: 'ksa19', name: 'Ali Lajami', pos: 'Defender', age: 30, image: 'ali_lajami.jpg', stats: { averageRating: 7.8, goals: 1, assists: 0, ga: 1, accuratePassesPerMatch: 71, keyPassesPerMatch: 0.3, interceptionsPerMatch: 2.0, tacklesPerMatch: 1.9, minutes: 490 } },
    { id: 'ksa20', name: 'Moteb Al Harbi', pos: 'Defender', age: 26, image: 'moteb_al_harbi.jpg', stats: { averageRating: 7.8, goals: 1, assists: 4, ga: 5, accuratePassesPerMatch: 61, keyPassesPerMatch: 1.2, interceptionsPerMatch: 1.7, tacklesPerMatch: 2.2, minutes: 490 } },
    { id: 'ksa21', name: 'Ali Majrashi', pos: 'Defender', age: 26, image: 'ali_majrashi.jpg', stats: { averageRating: 7.6, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 58, keyPassesPerMatch: 0.9, interceptionsPerMatch: 1.6, tacklesPerMatch: 2.1, minutes: 460 } },
    { id: 'ksa22', name: 'Hassan Kadesh', pos: 'Defender', age: 33, image: 'hassan_kadesh.jpg', stats: { averageRating: 7.7, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 64, keyPassesPerMatch: 0.7, interceptionsPerMatch: 1.9, tacklesPerMatch: 1.9, minutes: 470 } },
    { id: 'ksa23', name: 'Jehad Thakri', pos: 'Defender', age: 24, image: 'jehad_thakri.jpg', stats: { averageRating: 7.6, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 66, keyPassesPerMatch: 0.5, interceptionsPerMatch: 1.8, tacklesPerMatch: 2.0, minutes: 450 } },
    { id: 'ksa24', name: 'Nawaf Al-Aqidi', pos: 'Goalkeeper', age: 26, image: 'nawaf_al_aqidi.jpg', stats: { averageRating: 8.0, goalsPrevented: 4.4, savesPerMatch: 3.7, minutes: 540 } },
    { id: 'ksa25', name: 'Mohammed Al-Owais', pos: 'Goalkeeper', age: 34, image: 'mohammed_al_owais.jpg', stats: { averageRating: 7.9, goalsPrevented: 4.1, savesPerMatch: 3.6, minutes: 450 } },
    { id: 'ksa26', name: 'Ahmed Al-Kassar', pos: 'Goalkeeper', age: 35, image: 'ahmed_al_kassar.jpg', stats: { averageRating: 7.6, goalsPrevented: 3.0, savesPerMatch: 3.2, minutes: 270 } }
  ],
  'SEN': [
    { id: 'sen1', name: 'Nicolas Jackson', pos: 'Attacker', age: 25, image: 'nicolas_jackson.jpg', stats: { averageRating: 8.2, goals: 8, assists: 4, ga: 12, shotsOnTargetPerMatch: 2.8, accuratePassesPerMatch: 27, keyPassesPerMatch: 1.2, minutes: 530, totalShots: 39 } },
    { id: 'sen2', name: 'Ibrahim Mbaye', pos: 'Attacker', age: 18, image: 'ibrahim_mbaye.jpg', stats: { averageRating: 7.6, goals: 3, assists: 4, ga: 7, shotsOnTargetPerMatch: 1.8, accuratePassesPerMatch: 32, keyPassesPerMatch: 1.5, minutes: 420, totalShots: 24 } },
    { id: 'sen3', name: 'Ismaila Sarr', pos: 'Attacker', age: 28, image: 'ismaila_sarr.jpg', stats: { averageRating: 8.1, goals: 7, assists: 6, ga: 13, shotsOnTargetPerMatch: 2.5, accuratePassesPerMatch: 34, keyPassesPerMatch: 1.9, minutes: 520, totalShots: 36 } },
    { id: 'sen4', name: 'Assane Diao', pos: 'Attacker', age: 20, image: 'assane_diao.jpg', stats: { averageRating: 7.8, goals: 5, assists: 4, ga: 9, shotsOnTargetPerMatch: 2.1, accuratePassesPerMatch: 31, keyPassesPerMatch: 1.6, minutes: 460, totalShots: 29 } },
    { id: 'sen5', name: 'Ahmadou Bamba Dieng', pos: 'Attacker', age: 26, image: 'ahmadou_bamba_dieng.jpg', stats: { averageRating: 7.7, goals: 5, assists: 2, ga: 7, shotsOnTargetPerMatch: 2.2, accuratePassesPerMatch: 22, keyPassesPerMatch: 0.8, minutes: 440, totalShots: 31 } },
    { id: 'sen6', name: 'Cherif Ndiaye', pos: 'Attacker', age: 30, image: 'cherif_ndiaye.jpg', stats: { averageRating: 7.8, goals: 6, assists: 2, ga: 8, shotsOnTargetPerMatch: 2.4, accuratePassesPerMatch: 24, keyPassesPerMatch: 0.9, minutes: 470, totalShots: 33 } },
    { id: 'sen7', name: 'Sadio Mané', pos: 'Midfielder', age: 34, image: 'sadio_mane.jpg', stats: { averageRating: 8.7, goals: 9, assists: 8, ga: 17, accuratePassesPerMatch: 49, keyPassesPerMatch: 2.6, minutes: 550 } },
    { id: 'sen8', name: 'Iliman Ndiaye', pos: 'Midfielder', age: 26, image: 'iliman_ndiaye.jpg', stats: { averageRating: 8.2, goals: 6, assists: 7, ga: 13, accuratePassesPerMatch: 52, keyPassesPerMatch: 2.2, minutes: 520 } },
    { id: 'sen9', name: 'Pape Gueye', pos: 'Midfielder', age: 27, image: 'pape_gueye.jpg', stats: { averageRating: 8.0, goals: 3, assists: 4, ga: 7, accuratePassesPerMatch: 73, keyPassesPerMatch: 1.3, minutes: 530 } },
    { id: 'sen10', name: 'Pape Matar Sarr', pos: 'Midfielder', age: 23, image: 'pape_matar_sarr.jpg', stats: { averageRating: 8.3, goals: 4, assists: 6, ga: 10, accuratePassesPerMatch: 69, keyPassesPerMatch: 1.8, minutes: 540 } },
    { id: 'sen11', name: 'Idrissa Gana Gueye', pos: 'Midfielder', age: 36, image: 'idrissa_gana_gueye.jpg', stats: { averageRating: 7.9, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 76, keyPassesPerMatch: 1.0, minutes: 500 } },
    { id: 'sen12', name: 'Lamine Camara', pos: 'Midfielder', age: 22, image: 'lamine_camara.jpg', stats: { averageRating: 8.2, goals: 4, assists: 7, ga: 11, accuratePassesPerMatch: 71, keyPassesPerMatch: 2.1, minutes: 520 } },
    { id: 'sen13', name: 'Krépin Diatta', pos: 'Midfielder', age: 27, image: 'krepin_diatta.jpg', stats: { averageRating: 7.8, goals: 2, assists: 5, ga: 7, accuratePassesPerMatch: 55, keyPassesPerMatch: 1.6, minutes: 480 } },
    { id: 'sen14', name: 'Habib Diarra', pos: 'Midfielder', age: 22, image: 'habib_diarra.jpg', stats: { averageRating: 8.0, goals: 4, assists: 5, ga: 9, accuratePassesPerMatch: 62, keyPassesPerMatch: 1.7, minutes: 490 } },
    { id: 'sen15', name: 'Bara Sapoko Ndiaye', pos: 'Midfielder', age: 18, image: 'bara_sapoko_ndiaye.jpg', stats: { averageRating: 7.5, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 51, keyPassesPerMatch: 1.2, minutes: 390 } },
    { id: 'sen16', name: 'Pathé Ismaël Ciss', pos: 'Midfielder', age: 32, image: 'pathe_ismael_ciss.jpg', stats: { averageRating: 7.8, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 68, keyPassesPerMatch: 1.1, minutes: 480 } },
    { id: 'sen17', name: 'Mamadou Sarr', pos: 'Defender', age: 20, image: 'mamadou_sarr.jpg', stats: { averageRating: 8.0, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 75, keyPassesPerMatch: 0.4, interceptionsPerMatch: 2.2, tacklesPerMatch: 2.1, minutes: 500 } },
    { id: 'sen18', name: 'Kalidou Koulibaly', pos: 'Defender', age: 35, image: 'kalidou_koulibaly.jpg', stats: { averageRating: 8.4, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 81, keyPassesPerMatch: 0.4, interceptionsPerMatch: 2.5, tacklesPerMatch: 2.2, minutes: 550 } },
    { id: 'sen19', name: 'El Hadji Malick Diouf', pos: 'Defender', age: 21, image: 'el_hadji_malick_diouf.jpg', stats: { averageRating: 8.0, goals: 2, assists: 5, ga: 7, accuratePassesPerMatch: 61, keyPassesPerMatch: 1.4, interceptionsPerMatch: 1.8, tacklesPerMatch: 2.3, minutes: 500 } },
    { id: 'sen20', name: 'Moussa Niakhaté', pos: 'Defender', age: 30, image: 'moussa_niakhate.jpg', stats: { averageRating: 8.1, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 78, keyPassesPerMatch: 0.4, interceptionsPerMatch: 2.3, tacklesPerMatch: 2.1, minutes: 530 } },
    { id: 'sen21', name: 'Ismail Jakobs', pos: 'Defender', age: 26, image: 'ismail_jakobs.jpg', stats: { averageRating: 7.8, goals: 1, assists: 4, ga: 5, accuratePassesPerMatch: 60, keyPassesPerMatch: 1.2, interceptionsPerMatch: 1.7, tacklesPerMatch: 2.2, minutes: 480 } },
    { id: 'sen22', name: 'Antoine Mendy', pos: 'Defender', age: 22, image: 'antoine_mendy.jpg', stats: { averageRating: 7.7, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 65, keyPassesPerMatch: 0.7, interceptionsPerMatch: 1.9, tacklesPerMatch: 2.1, minutes: 460 } },
    { id: 'sen23', name: 'Abdoulaye Seck', pos: 'Defender', age: 34, image: 'abdoulaye_seck.jpg', stats: { averageRating: 7.9, goals: 2, assists: 0, ga: 2, accuratePassesPerMatch: 72, keyPassesPerMatch: 0.3, interceptionsPerMatch: 2.2, tacklesPerMatch: 2.0, minutes: 490 } },
    { id: 'sen24', name: 'Édouard Mendy', pos: 'Goalkeeper', age: 34, image: 'edouard_mendy.jpg', stats: { averageRating: 8.4, goalsPrevented: 5.1, savesPerMatch: 4.0, minutes: 550 } },
    { id: 'sen25', name: 'Mory Diaw', pos: 'Goalkeeper', age: 33, image: 'mory_diaw.jpg', stats: { averageRating: 7.8, goalsPrevented: 3.6, savesPerMatch: 3.5, minutes: 360 } },
    { id: 'sen26', name: 'Yehvann Diouf', pos: 'Goalkeeper', age: 26, image: 'yehvann_diouf.jpg', stats: { averageRating: 7.9, goalsPrevented: 3.9, savesPerMatch: 3.6, minutes: 400 } }
  ],
  'IRQ': [
    { id: 'irq1', name: 'Ali Al-Hamadi', pos: 'Attacker', age: 24, image: 'ali_al_hamadi.jpg', stats: { averageRating: 7.9, goals: 7, assists: 3, ga: 10, shotsOnTargetPerMatch: 2.5, accuratePassesPerMatch: 25, keyPassesPerMatch: 1.1, minutes: 510, totalShots: 35 } },
    { id: 'irq2', name: 'Aymen Hussein', pos: 'Attacker', age: 30, image: 'aymen_hussein.jpg', stats: { averageRating: 8.3, goals: 9, assists: 2, ga: 11, shotsOnTargetPerMatch: 2.9, accuratePassesPerMatch: 22, keyPassesPerMatch: 0.9, minutes: 540, totalShots: 41 } },
    { id: 'irq3', name: 'Mohanad Ali', pos: 'Attacker', age: 26, image: 'mohanad_ali.jpg', stats: { averageRating: 7.8, goals: 6, assists: 2, ga: 8, shotsOnTargetPerMatch: 2.3, accuratePassesPerMatch: 24, keyPassesPerMatch: 0.8, minutes: 470, totalShots: 32 } },
    { id: 'irq4', name: 'Ali Yousif', pos: 'Attacker', age: 30, image: 'ali_yousif.jpg', stats: { averageRating: 7.6, goals: 4, assists: 2, ga: 6, shotsOnTargetPerMatch: 1.9, accuratePassesPerMatch: 21, keyPassesPerMatch: 0.7, minutes: 420, totalShots: 27 } },
    { id: 'irq5', name: 'Zidane Iqbal', pos: 'Midfielder', age: 23, image: 'zidane_iqbal.jpg', stats: { averageRating: 8.3, goals: 4, assists: 7, ga: 11, accuratePassesPerMatch: 72, keyPassesPerMatch: 2.2, minutes: 530 } },
    { id: 'irq6', name: 'Ali Jasim', pos: 'Midfielder', age: 22, image: 'ali_jasim.jpg', stats: { averageRating: 8.1, goals: 5, assists: 6, ga: 11, accuratePassesPerMatch: 51, keyPassesPerMatch: 2.1, minutes: 510 } },
    { id: 'irq7', name: 'Youssef Amyn', pos: 'Midfielder', age: 22, image: 'youssef_amyn.jpg', stats: { averageRating: 7.9, goals: 4, assists: 5, ga: 9, accuratePassesPerMatch: 49, keyPassesPerMatch: 1.8, minutes: 480 } },
    { id: 'irq8', name: 'Ibrahim Bayesh', pos: 'Midfielder', age: 26, image: 'ibrahim_bayesh.jpg', stats: { averageRating: 8.0, goals: 4, assists: 6, ga: 10, accuratePassesPerMatch: 61, keyPassesPerMatch: 1.9, minutes: 500 } },
    { id: 'irq9', name: 'Amir Al-Ammari', pos: 'Midfielder', age: 28, image: 'amir_al_ammari.jpg', stats: { averageRating: 8.1, goals: 3, assists: 5, ga: 8, accuratePassesPerMatch: 74, keyPassesPerMatch: 1.5, minutes: 520 } },
    { id: 'irq10', name: 'Marko Farji', pos: 'Midfielder', age: 22, image: 'marko_farji.jpg', stats: { averageRating: 7.7, goals: 3, assists: 4, ga: 7, accuratePassesPerMatch: 48, keyPassesPerMatch: 1.6, minutes: 450 } },
    { id: 'irq11', name: 'Ahmed Qasem', pos: 'Midfielder', age: 23, image: 'ahmed_qasem.jpg', stats: { averageRating: 7.9, goals: 4, assists: 5, ga: 9, accuratePassesPerMatch: 52, keyPassesPerMatch: 1.8, minutes: 480 } },
    { id: 'irq12', name: 'Aimar Sher', pos: 'Midfielder', age: 23, image: 'aimar_sher.jpg', stats: { averageRating: 7.8, goals: 2, assists: 4, ga: 6, accuratePassesPerMatch: 68, keyPassesPerMatch: 1.3, minutes: 470 } },
    { id: 'irq13', name: 'Kevin Yakob', pos: 'Midfielder', age: 25, image: 'kevin_yakob.jpg', stats: { averageRating: 7.9, goals: 3, assists: 4, ga: 7, accuratePassesPerMatch: 70, keyPassesPerMatch: 1.4, minutes: 490 } },
    { id: 'irq14', name: 'Zaid Ismail', pos: 'Midfielder', age: 24, image: 'zaid_ismail.jpg', stats: { averageRating: 7.7, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 65, keyPassesPerMatch: 1.2, minutes: 450 } },
    { id: 'irq15', name: 'Merchas Doski', pos: 'Defender', age: 26, image: 'merchas_doski.jpg', stats: { averageRating: 7.9, goals: 1, assists: 4, ga: 5, accuratePassesPerMatch: 61, keyPassesPerMatch: 1.2, interceptionsPerMatch: 1.8, tacklesPerMatch: 2.2, minutes: 490 } },
    { id: 'irq16', name: 'Akam Hashem', pos: 'Defender', age: 27, image: 'akam_hashem.jpg', stats: { averageRating: 7.8, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 70, keyPassesPerMatch: 0.4, interceptionsPerMatch: 2.1, tacklesPerMatch: 2.0, minutes: 480 } },
    { id: 'irq17', name: 'Hussein Ali', pos: 'Defender', age: 24, image: 'hussein_ali.jpg', stats: { averageRating: 7.8, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 59, keyPassesPerMatch: 0.9, interceptionsPerMatch: 1.7, tacklesPerMatch: 2.2, minutes: 470 } },
    { id: 'irq18', name: 'Rebin Sulaka', pos: 'Defender', age: 34, image: 'rebin_sulaka.jpg', stats: { averageRating: 8.0, goals: 2, assists: 0, ga: 2, accuratePassesPerMatch: 74, keyPassesPerMatch: 0.3, interceptionsPerMatch: 2.3, tacklesPerMatch: 2.0, minutes: 510 } },
    { id: 'irq19', name: 'Frans Putros', pos: 'Defender', age: 33, image: 'frans_putros.jpg', stats: { averageRating: 7.8, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 69, keyPassesPerMatch: 0.5, interceptionsPerMatch: 2.0, tacklesPerMatch: 1.9, minutes: 480 } },
    { id: 'irq20', name: 'Zaid Tahseen', pos: 'Defender', age: 25, image: 'zaid_tahseen.jpg', stats: { averageRating: 8.1, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 76, keyPassesPerMatch: 0.4, interceptionsPerMatch: 2.4, tacklesPerMatch: 2.1, minutes: 520 } },
    { id: 'irq21', name: 'Mustafa Saadoon', pos: 'Defender', age: 25, image: 'mustafa_saadoon.jpg', stats: { averageRating: 7.7, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 58, keyPassesPerMatch: 0.9, interceptionsPerMatch: 1.7, tacklesPerMatch: 2.1, minutes: 460 } },
    { id: 'irq22', name: 'Ahmed Hasan Maknazi', pos: 'Defender', age: 24, image: 'ahmed_hasan_maknazi.jpg', stats: { averageRating: 7.6, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 57, keyPassesPerMatch: 0.8, interceptionsPerMatch: 1.6, tacklesPerMatch: 2.0, minutes: 440 } },
    { id: 'irq23', name: 'Manaf Younis', pos: 'Defender', age: 29, image: 'manaf_younis.jpg', stats: { averageRating: 7.9, goals: 2, assists: 0, ga: 2, accuratePassesPerMatch: 73, keyPassesPerMatch: 0.3, interceptionsPerMatch: 2.2, tacklesPerMatch: 2.0, minutes: 500 } },
    { id: 'irq24', name: 'Jalal Hassan', pos: 'Goalkeeper', age: 35, image: 'jalal_hassan.jpg', stats: { averageRating: 8.2, goalsPrevented: 4.8, savesPerMatch: 3.9, minutes: 540 } },
    { id: 'irq25', name: 'Ahmed Basil', pos: 'Goalkeeper', age: 29, image: 'ahmed_basil.jpg', stats: { averageRating: 7.8, goalsPrevented: 3.5, savesPerMatch: 3.4, minutes: 360 } },
    { id: 'irq26', name: 'Fahad Talib', pos: 'Goalkeeper', age: 31, image: 'fahad_talib.jpg', stats: { averageRating: 7.7, goalsPrevented: 3.2, savesPerMatch: 3.3, minutes: 300 } }
  ],
  'ALG': [
    { id: 'alg1', name: 'Ibrahim Maza', pos: 'Attacker', age: 20, image: 'ibrahim_maza.jpg', stats: { averageRating: 8.3, goals: 6, assists: 7, ga: 13, shotsOnTargetPerMatch: 2.1, accuratePassesPerMatch: 48, keyPassesPerMatch: 2.2, minutes: 520, totalShots: 32 } },
    { id: 'alg2', name: 'Mohamed Amoura', pos: 'Attacker', age: 26, image: 'mohamed_amoura.jpg', stats: { averageRating: 8.5, goals: 10, assists: 5, ga: 15, shotsOnTargetPerMatch: 2.8, accuratePassesPerMatch: 30, keyPassesPerMatch: 1.5, minutes: 550, totalShots: 42 } },
    { id: 'alg3', name: 'Amine Gouiri', pos: 'Attacker', age: 26, image: 'amine_gouiri.jpg', stats: { averageRating: 8.4, goals: 9, assists: 5, ga: 14, shotsOnTargetPerMatch: 2.6, accuratePassesPerMatch: 34, keyPassesPerMatch: 1.7, minutes: 540, totalShots: 40 } },
    { id: 'alg4', name: 'Farès Ghedjemis', pos: 'Attacker', age: 23, image: 'fares_ghedjemis.jpg', stats: { averageRating: 7.9, goals: 5, assists: 5, ga: 10, shotsOnTargetPerMatch: 2.0, accuratePassesPerMatch: 31, keyPassesPerMatch: 1.6, minutes: 480, totalShots: 30 } },
    { id: 'alg5', name: 'Ahmed Nadhir Benbouali', pos: 'Attacker', age: 26, image: 'ahmed_nadhir_benbouali.jpg', stats: { averageRating: 7.8, goals: 6, assists: 2, ga: 8, shotsOnTargetPerMatch: 2.2, accuratePassesPerMatch: 24, keyPassesPerMatch: 0.9, minutes: 460, totalShots: 31 } },
    { id: 'alg6', name: 'Riyad Mahrez', pos: 'Midfielder', age: 35, image: 'riyad_mahrez.jpg', stats: { averageRating: 8.7, goals: 8, assists: 10, ga: 18, accuratePassesPerMatch: 64, keyPassesPerMatch: 3.1, minutes: 560 } },
    { id: 'alg7', name: 'Anis Hadj Moussa', pos: 'Midfielder', age: 24, image: 'anis_hadj_moussa.jpg', stats: { averageRating: 8.3, goals: 7, assists: 7, ga: 14, accuratePassesPerMatch: 55, keyPassesPerMatch: 2.4, minutes: 520 } },
    { id: 'alg8', name: 'Farès Chaïbi', pos: 'Midfielder', age: 23, image: 'fares_chaibi.jpg', stats: { averageRating: 8.2, goals: 5, assists: 8, ga: 13, accuratePassesPerMatch: 68, keyPassesPerMatch: 2.5, minutes: 530 } },
    { id: 'alg9', name: 'Houssem Aouar', pos: 'Midfielder', age: 28, image: 'houssem_aouar.jpg', stats: { averageRating: 8.3, goals: 6, assists: 7, ga: 13, accuratePassesPerMatch: 72, keyPassesPerMatch: 2.3, minutes: 520 } },
    { id: 'alg10', name: 'Hicham Boudaoui', pos: 'Midfielder', age: 26, image: 'hicham_boudaoui.jpg', stats: { averageRating: 8.1, goals: 3, assists: 5, ga: 8, accuratePassesPerMatch: 78, keyPassesPerMatch: 1.5, minutes: 530 } },
    { id: 'alg11', name: 'Adil Boulbina', pos: 'Midfielder', age: 23, image: 'adil_boulbina.jpg', stats: { averageRating: 7.9, goals: 5, assists: 5, ga: 10, accuratePassesPerMatch: 51, keyPassesPerMatch: 2.0, minutes: 470 } },
    { id: 'alg12', name: 'Nabil Bentaleb', pos: 'Midfielder', age: 31, image: 'nabil_bentaleb.jpg', stats: { averageRating: 8.0, goals: 2, assists: 4, ga: 6, accuratePassesPerMatch: 80, keyPassesPerMatch: 1.3, minutes: 500 } },
    { id: 'alg13', name: 'Ramiz Zerrouki', pos: 'Midfielder', age: 28, image: 'ramiz_zerrouki.jpg', stats: { averageRating: 8.1, goals: 3, assists: 5, ga: 8, accuratePassesPerMatch: 82, keyPassesPerMatch: 1.4, minutes: 520 } },
    { id: 'alg14', name: 'Rafik Belghali', pos: 'Midfielder', age: 24, image: 'rafik_belghali.jpg', stats: { averageRating: 7.9, goals: 2, assists: 6, ga: 8, accuratePassesPerMatch: 62, keyPassesPerMatch: 1.6, minutes: 480 } },
    { id: 'alg15', name: 'Yassine Titraoui', pos: 'Midfielder', age: 22, image: 'yassine_titraoui.jpg', stats: { averageRating: 8.0, goals: 3, assists: 5, ga: 8, accuratePassesPerMatch: 74, keyPassesPerMatch: 1.5, minutes: 490 } },
    { id: 'alg16', name: 'Rayan Aït-Nouri', pos: 'Defender', age: 25, image: 'rayan_ait_nouri.jpg', stats: { averageRating: 8.5, goals: 3, assists: 7, ga: 10, accuratePassesPerMatch: 72, keyPassesPerMatch: 1.8, interceptionsPerMatch: 1.8, tacklesPerMatch: 2.4, minutes: 550 } },
    { id: 'alg17', name: 'Ramy Bensebaini', pos: 'Defender', age: 31, image: 'ramy_bensebaini.jpg', stats: { averageRating: 8.2, goals: 3, assists: 3, ga: 6, accuratePassesPerMatch: 76, keyPassesPerMatch: 0.8, interceptionsPerMatch: 2.1, tacklesPerMatch: 2.2, minutes: 530 } },
    { id: 'alg18', name: 'Aïssa Mandi', pos: 'Defender', age: 34, image: 'aissa_mandi.jpg', stats: { averageRating: 8.0, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 80, keyPassesPerMatch: 0.5, interceptionsPerMatch: 2.3, tacklesPerMatch: 1.9, minutes: 510 } },
    { id: 'alg19', name: 'Jaouen Hadjam', pos: 'Defender', age: 23, image: 'jaouen_hadjam.jpg', stats: { averageRating: 8.0, goals: 2, assists: 5, ga: 7, accuratePassesPerMatch: 68, keyPassesPerMatch: 1.3, interceptionsPerMatch: 1.7, tacklesPerMatch: 2.3, minutes: 500 } },
    { id: 'alg20', name: 'Samir Chergui', pos: 'Defender', age: 27, image: 'samir_chergui.jpg', stats: { averageRating: 7.9, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 74, keyPassesPerMatch: 0.5, interceptionsPerMatch: 2.1, tacklesPerMatch: 2.0, minutes: 490 } },
    { id: 'alg21', name: 'Mohamed Tougai', pos: 'Defender', age: 26, image: 'mohamed_tougai.jpg', stats: { averageRating: 8.0, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 77, keyPassesPerMatch: 0.4, interceptionsPerMatch: 2.3, tacklesPerMatch: 2.0, minutes: 500 } },
    { id: 'alg22', name: 'Zineddine Belaid', pos: 'Defender', age: 27, image: 'zineddine_belaid.jpg', stats: { averageRating: 7.9, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 76, keyPassesPerMatch: 0.4, interceptionsPerMatch: 2.2, tacklesPerMatch: 2.1, minutes: 490 } },
    { id: 'alg23', name: 'Achref Abada', pos: 'Defender', age: 27, image: 'achref_abada.jpg', stats: { averageRating: 7.8, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 73, keyPassesPerMatch: 0.3, interceptionsPerMatch: 2.0, tacklesPerMatch: 1.9, minutes: 470 } },
    { id: 'alg24', name: 'Luca Zidane', pos: 'Goalkeeper', age: 28, image: 'luca_zidane.jpg', stats: { averageRating: 8.2, goalsPrevented: 4.8, savesPerMatch: 3.8, minutes: 540 } },
    { id: 'alg25', name: 'Oussama Benbot', pos: 'Goalkeeper', age: 31, image: 'oussama_benbot.jpg', stats: { averageRating: 8.0, goalsPrevented: 4.1, savesPerMatch: 3.5, minutes: 420 } },
    { id: 'alg26', name: 'Melvin Mastil', pos: 'Goalkeeper', age: 26, image: 'melvin_mastil.jpg', stats: { averageRating: 7.8, goalsPrevented: 3.5, savesPerMatch: 3.3, minutes: 320 } }
  ],
  'JOR': [
    { id: 'jor1', name: 'Mousa Tamari', pos: 'Attacker', age: 29, image: 'mousa_tamari.jpg', stats: { averageRating: 8.5, goals: 9, assists: 7, ga: 16, shotsOnTargetPerMatch: 2.7, accuratePassesPerMatch: 38, keyPassesPerMatch: 2.1, minutes: 550, totalShots: 41 } },
    { id: 'jor2', name: 'Odeh Fakhoury', pos: 'Attacker', age: 20, image: 'odeh_fakhoury.jpg', stats: { averageRating: 8.0, goals: 6, assists: 4, ga: 10, shotsOnTargetPerMatch: 2.2, accuratePassesPerMatch: 31, keyPassesPerMatch: 1.6, minutes: 480, totalShots: 33 } },
    { id: 'jor3', name: 'Ali Olwan', pos: 'Attacker', age: 26, image: 'ali_olwan.jpg', stats: { averageRating: 8.3, goals: 8, assists: 5, ga: 13, shotsOnTargetPerMatch: 2.5, accuratePassesPerMatch: 34, keyPassesPerMatch: 1.8, minutes: 520, totalShots: 38 } },
    { id: 'jor4', name: 'Mohammad Abu Zrayq', pos: 'Midfielder', age: 28, image: 'mohammad_abu_zrayq.jpg', stats: { averageRating: 8.3, goals: 6, assists: 8, ga: 14, accuratePassesPerMatch: 57, keyPassesPerMatch: 2.5, minutes: 530 } },
    { id: 'jor5', name: 'Ali Al Azaizeh', pos: 'Midfielder', age: 22, image: 'ali_al_azaizeh.jpg', stats: { averageRating: 8.0, goals: 5, assists: 6, ga: 11, accuratePassesPerMatch: 54, keyPassesPerMatch: 2.1, minutes: 490 } },
    { id: 'jor6', name: 'Mohannad Abu Taha', pos: 'Midfielder', age: 23, image: 'mohannad_abu_taha.jpg', stats: { averageRating: 7.9, goals: 4, assists: 6, ga: 10, accuratePassesPerMatch: 58, keyPassesPerMatch: 1.9, minutes: 480 } },
    { id: 'jor7', name: 'Nizar Al-Rashdan', pos: 'Midfielder', age: 27, image: 'nizar_al_rashdan.jpg', stats: { averageRating: 8.2, goals: 3, assists: 5, ga: 8, accuratePassesPerMatch: 76, keyPassesPerMatch: 1.5, minutes: 520 } },
    { id: 'jor8', name: 'Mahmoud Al-Mardi', pos: 'Midfielder', age: 32, image: 'mahmoud_al_mardi.jpg', stats: { averageRating: 8.1, goals: 5, assists: 7, ga: 12, accuratePassesPerMatch: 55, keyPassesPerMatch: 2.2, minutes: 510 } },
    { id: 'jor9', name: 'Noor Al-Rawabdeh', pos: 'Midfielder', age: 29, image: 'noor_al_rawabdeh.jpg', stats: { averageRating: 8.1, goals: 3, assists: 5, ga: 8, accuratePassesPerMatch: 74, keyPassesPerMatch: 1.5, minutes: 510 } },
    { id: 'jor10', name: 'Ehsan Haddad', pos: 'Midfielder', age: 32, image: 'ehsan_haddad.jpg', stats: { averageRating: 8.0, goals: 2, assists: 6, ga: 8, accuratePassesPerMatch: 66, keyPassesPerMatch: 1.7, minutes: 500 } },
    { id: 'jor11', name: 'Amer Jamous', pos: 'Midfielder', age: 24, image: 'amer_jamous.jpg', stats: { averageRating: 7.9, goals: 3, assists: 4, ga: 7, accuratePassesPerMatch: 69, keyPassesPerMatch: 1.4, minutes: 480 } },
    { id: 'jor12', name: 'Ibrahim Sadeh', pos: 'Midfielder', age: 26, image: 'ibrahim_sadeh.jpg', stats: { averageRating: 7.9, goals: 3, assists: 4, ga: 7, accuratePassesPerMatch: 71, keyPassesPerMatch: 1.4, minutes: 480 } },
    { id: 'jor13', name: 'Rajaei Ayed', pos: 'Midfielder', age: 32, image: 'rajaei_ayed.jpg', stats: { averageRating: 8.0, goals: 2, assists: 4, ga: 6, accuratePassesPerMatch: 77, keyPassesPerMatch: 1.3, minutes: 500 } },
    { id: 'jor14', name: 'Mohammad Al Daoud', pos: 'Midfielder', age: 34, image: 'mohammad_al_daoud.jpg', stats: { averageRating: 7.8, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 72, keyPassesPerMatch: 1.2, minutes: 460 } },
    { id: 'jor15', name: 'Yazan Al-Arab', pos: 'Defender', age: 30, image: 'yazan_al_arab.jpg', stats: { averageRating: 8.3, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 78, keyPassesPerMatch: 0.4, interceptionsPerMatch: 2.5, tacklesPerMatch: 2.2, minutes: 540 } },
    { id: 'jor16', name: 'Abdallah Nasib', pos: 'Defender', age: 32, image: 'abdallah_nasib.jpg', stats: { averageRating: 8.2, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 76, keyPassesPerMatch: 0.4, interceptionsPerMatch: 2.4, tacklesPerMatch: 2.1, minutes: 530 } },
    { id: 'jor17', name: 'Mo Abualnadi', pos: 'Defender', age: 25, image: 'mo_abualnadi.jpg', stats: { averageRating: 8.1, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 73, keyPassesPerMatch: 0.7, interceptionsPerMatch: 2.1, tacklesPerMatch: 2.3, minutes: 510 } },
    { id: 'jor18', name: 'Mohammad Ali Hasheesh', pos: 'Defender', age: 31, image: 'mohammad_ali_hasheesh.jpg', stats: { averageRating: 8.0, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 70, keyPassesPerMatch: 0.7, interceptionsPerMatch: 1.9, tacklesPerMatch: 2.3, minutes: 500 } },
    { id: 'jor19', name: 'Husam Ali Mohammad Abudahab', pos: 'Defender', age: 26, image: 'husam_ali_mohammad_abudahab.jpg', stats: { averageRating: 8.1, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 75, keyPassesPerMatch: 0.4, interceptionsPerMatch: 2.3, tacklesPerMatch: 2.1, minutes: 510 } },
    { id: 'jor20', name: 'Saad Al Rousan', pos: 'Defender', age: 29, image: 'saad_al_rousan.jpg', stats: { averageRating: 8.0, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 74, keyPassesPerMatch: 0.4, interceptionsPerMatch: 2.2, tacklesPerMatch: 2.0, minutes: 500 } },
    { id: 'jor21', name: 'Saleem Obaid', pos: 'Defender', age: 34, image: 'saleem_obaid.jpg', stats: { averageRating: 7.9, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 72, keyPassesPerMatch: 0.3, interceptionsPerMatch: 2.1, tacklesPerMatch: 1.9, minutes: 480 } },
    { id: 'jor22', name: 'Mohammad Abu Ghoush', pos: 'Defender', age: 21, image: 'mohammad_abu_ghoush.jpg', stats: { averageRating: 7.9, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 67, keyPassesPerMatch: 0.8, interceptionsPerMatch: 1.8, tacklesPerMatch: 2.2, minutes: 470 } },
    { id: 'jor23', name: 'Anas Badawi', pos: 'Defender', age: 28, image: 'anas_badawi.jpg', stats: { averageRating: 7.8, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 69, keyPassesPerMatch: 0.5, interceptionsPerMatch: 2.0, tacklesPerMatch: 2.0, minutes: 470 } },
    { id: 'jor24', name: 'Yazeed Abulaila', pos: 'Goalkeeper', age: 33, image: 'yazeed_abulaila.jpg', stats: { averageRating: 8.3, goalsPrevented: 5.1, savesPerMatch: 4.0, minutes: 550 } },
    { id: 'jor25', name: 'Abdallah Al-Fakhouri', pos: 'Goalkeeper', age: 26, image: 'abdallah_al_fakhouri.jpg', stats: { averageRating: 8.0, goalsPrevented: 4.2, savesPerMatch: 3.6, minutes: 420 } },
    { id: 'jor26', name: 'Noureddin Bani Ateyah', pos: 'Goalkeeper', age: 33, image: 'noureddin_bani_ateyah.jpg', stats: { averageRating: 7.8, goalsPrevented: 3.4, savesPerMatch: 3.3, minutes: 320 } }
  ],
  'COL': [
    { id: 'col1', name: 'Luis Javier Suárez', pos: 'Attacker', age: 28, image: 'luis_javier_suarez.jpg', stats: { averageRating: 8.5, goals: 10, assists: 5, ga: 15, shotsOnTargetPerMatch: 2.8, accuratePassesPerMatch: 35, keyPassesPerMatch: 1.7, minutes: 550, totalShots: 43 } },
    { id: 'col2', name: 'Cucho Hernández', pos: 'Attacker', age: 27, image: 'cucho_hernandez.jpg', stats: { averageRating: 8.4, goals: 9, assists: 6, ga: 15, shotsOnTargetPerMatch: 2.6, accuratePassesPerMatch: 37, keyPassesPerMatch: 1.9, minutes: 540, totalShots: 41 } },
    { id: 'col3', name: 'Jhon Córdoba', pos: 'Attacker', age: 33, image: 'jhon_cordoba.jpg', stats: { averageRating: 8.3, goals: 9, assists: 3, ga: 12, shotsOnTargetPerMatch: 2.7, accuratePassesPerMatch: 30, keyPassesPerMatch: 1.3, minutes: 520, totalShots: 40 } },
    { id: 'col4', name: 'Luis Díaz', pos: 'Midfielder', age: 29, image: 'luis_diaz.jpg', stats: { averageRating: 8.8, goals: 10, assists: 8, ga: 18, accuratePassesPerMatch: 52, keyPassesPerMatch: 2.7, minutes: 560 } },
    { id: 'col5', name: 'James Rodríguez', pos: 'Midfielder', age: 35, image: 'james_rodriguez.jpg', stats: { averageRating: 8.7, goals: 6, assists: 11, ga: 17, accuratePassesPerMatch: 68, keyPassesPerMatch: 3.2, minutes: 540 } },
    { id: 'col6', name: 'Richard Ríos', pos: 'Midfielder', age: 26, image: 'richard_rios.jpg', stats: { averageRating: 8.4, goals: 4, assists: 6, ga: 10, accuratePassesPerMatch: 76, keyPassesPerMatch: 1.8, minutes: 530 } },
    { id: 'col7', name: 'Jhon Arias', pos: 'Midfielder', age: 28, image: 'jhon_arias.jpg', stats: { averageRating: 8.5, goals: 7, assists: 9, ga: 16, accuratePassesPerMatch: 58, keyPassesPerMatch: 2.6, minutes: 550 } },
    { id: 'col8', name: 'Jorge Carrascal', pos: 'Midfielder', age: 28, image: 'jorge_carrascal.jpg', stats: { averageRating: 8.3, goals: 6, assists: 7, ga: 13, accuratePassesPerMatch: 61, keyPassesPerMatch: 2.3, minutes: 520 } },
    { id: 'col9', name: 'Daniel Muñoz', pos: 'Midfielder', age: 30, image: 'daniel_munoz.jpg', stats: { averageRating: 8.4, goals: 5, assists: 7, ga: 12, accuratePassesPerMatch: 64, keyPassesPerMatch: 1.9, minutes: 540 } },
    { id: 'col10', name: 'Juan Fernando Quintero', pos: 'Midfielder', age: 33, image: 'juan_fernando_quintero.jpg', stats: { averageRating: 8.4, goals: 5, assists: 9, ga: 14, accuratePassesPerMatch: 65, keyPassesPerMatch: 2.8, minutes: 510 } },
    { id: 'col11', name: 'Andrés Gómez', pos: 'Midfielder', age: 23, image: 'andres_gomez.jpg', stats: { averageRating: 8.0, goals: 5, assists: 6, ga: 11, accuratePassesPerMatch: 48, keyPassesPerMatch: 2.0, minutes: 480 } },
    { id: 'col12', name: 'Jefferson Lerma', pos: 'Midfielder', age: 31, image: 'jefferson_lerma.jpg', stats: { averageRating: 8.3, goals: 3, assists: 4, ga: 7, accuratePassesPerMatch: 78, keyPassesPerMatch: 1.3, minutes: 530 } },
    { id: 'col13', name: 'Gustavo Puerta', pos: 'Midfielder', age: 22, image: 'gustavo_puerta.jpg', stats: { averageRating: 7.9, goals: 3, assists: 5, ga: 8, accuratePassesPerMatch: 71, keyPassesPerMatch: 1.5, minutes: 470 } },
    { id: 'col14', name: 'Kevin Castaño', pos: 'Midfielder', age: 25, image: 'kevin_castano.jpg', stats: { averageRating: 8.1, goals: 2, assists: 5, ga: 7, accuratePassesPerMatch: 79, keyPassesPerMatch: 1.4, minutes: 500 } },
    { id: 'col15', name: 'Jaminton Campaz', pos: 'Midfielder', age: 26, image: 'jaminton_campaz.jpg', stats: { averageRating: 8.1, goals: 6, assists: 6, ga: 12, accuratePassesPerMatch: 51, keyPassesPerMatch: 2.1, minutes: 500 } },
    { id: 'col16', name: 'Juan Portilla', pos: 'Midfielder', age: 27, image: 'juan_portilla.jpg', stats: { averageRating: 8.0, goals: 2, assists: 4, ga: 6, accuratePassesPerMatch: 75, keyPassesPerMatch: 1.3, minutes: 490 } },
    { id: 'col17', name: 'Davinson Sánchez', pos: 'Defender', age: 30, image: 'davinson_sanchez.jpg', stats: { averageRating: 8.4, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 80, keyPassesPerMatch: 0.4, interceptionsPerMatch: 2.5, tacklesPerMatch: 2.2, minutes: 550 } },
    { id: 'col18', name: 'Yerry Mina', pos: 'Defender', age: 31, image: 'yerry_mina.jpg', stats: { averageRating: 8.3, goals: 3, assists: 1, ga: 4, accuratePassesPerMatch: 76, keyPassesPerMatch: 0.3, interceptionsPerMatch: 2.3, tacklesPerMatch: 2.1, minutes: 530 } },
    { id: 'col19', name: 'Jhon Lucumí', pos: 'Defender', age: 28, image: 'jhon_lucumi.jpg', stats: { averageRating: 8.3, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 82, keyPassesPerMatch: 0.3, interceptionsPerMatch: 2.6, tacklesPerMatch: 2.0, minutes: 540 } },
    { id: 'col20', name: 'Johan Mojica', pos: 'Defender', age: 33, image: 'johan_mojica.jpg', stats: { averageRating: 8.1, goals: 2, assists: 5, ga: 7, accuratePassesPerMatch: 67, keyPassesPerMatch: 1.4, interceptionsPerMatch: 1.8, tacklesPerMatch: 2.3, minutes: 510 } },
    { id: 'col21', name: 'Santiago Arias', pos: 'Defender', age: 34, image: 'santiago_arias.jpg', stats: { averageRating: 8.0, goals: 1, assists: 4, ga: 5, accuratePassesPerMatch: 69, keyPassesPerMatch: 1.2, interceptionsPerMatch: 1.9, tacklesPerMatch: 2.2, minutes: 490 } },
    { id: 'col22', name: 'Deiver Machado', pos: 'Defender', age: 32, image: 'deiver_machado.jpg', stats: { averageRating: 8.0, goals: 1, assists: 4, ga: 5, accuratePassesPerMatch: 66, keyPassesPerMatch: 1.1, interceptionsPerMatch: 1.8, tacklesPerMatch: 2.3, minutes: 490 } },
    { id: 'col23', name: 'Willer Ditta', pos: 'Defender', age: 29, image: 'willer_ditta.jpg', stats: { averageRating: 8.1, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 77, keyPassesPerMatch: 0.4, interceptionsPerMatch: 2.4, tacklesPerMatch: 2.2, minutes: 510 } },
    { id: 'col24', name: 'David Ospina', pos: 'Goalkeeper', age: 37, image: 'david_ospina.jpg', stats: { averageRating: 8.2, goalsPrevented: 4.8, savesPerMatch: 3.8, minutes: 500 } },
    { id: 'col25', name: 'Camilo Vargas', pos: 'Goalkeeper', age: 37, image: 'camilo_vargas.jpg', stats: { averageRating: 8.3, goalsPrevented: 5.0, savesPerMatch: 3.9, minutes: 520 } },
    { id: 'col26', name: 'Álvaro Montero', pos: 'Goalkeeper', age: 31, image: 'alvaro_montero.jpg', stats: { averageRating: 8.0, goalsPrevented: 4.1, savesPerMatch: 3.5, minutes: 420 } }
  ],
  'COD': [
    { id: 'cod1', name: 'Yoane Wissa', pos: 'Attacker', age: 29, image: 'yoane_wissa.jpg', stats: { averageRating: 8.7, goals: 10, assists: 7, ga: 17, shotsOnTargetPerMatch: 2.8, accuratePassesPerMatch: 36, keyPassesPerMatch: 2.0, minutes: 560, totalShots: 44 } },
    { id: 'cod2', name: 'Cédric Bakambu', pos: 'Attacker', age: 35, image: 'cedric_bakambu.jpg', stats: { averageRating: 8.4, goals: 9, assists: 4, ga: 13, shotsOnTargetPerMatch: 2.6, accuratePassesPerMatch: 31, keyPassesPerMatch: 1.5, minutes: 530, totalShots: 41 } },
    { id: 'cod3', name: 'Fiston Mayele', pos: 'Attacker', age: 32, image: 'fiston_mayele.jpg', stats: { averageRating: 8.3, goals: 9, assists: 3, ga: 12, shotsOnTargetPerMatch: 2.7, accuratePassesPerMatch: 29, keyPassesPerMatch: 1.3, minutes: 520, totalShots: 40 } },
    { id: 'cod4', name: 'Meschak Elia', pos: 'Attacker', age: 28, image: 'meschak_elia.jpg', stats: { averageRating: 8.4, goals: 8, assists: 6, ga: 14, shotsOnTargetPerMatch: 2.5, accuratePassesPerMatch: 35, keyPassesPerMatch: 1.8, minutes: 530, totalShots: 39 } },
    { id: 'cod5', name: 'Simon Banza', pos: 'Attacker', age: 29, image: 'simon_banza.jpg', stats: { averageRating: 8.5, goals: 10, assists: 3, ga: 13, shotsOnTargetPerMatch: 2.9, accuratePassesPerMatch: 28, keyPassesPerMatch: 1.2, minutes: 540, totalShots: 45 } },
    { id: 'cod6', name: 'Théo Bongonda', pos: 'Midfielder', age: 30, image: 'theo_bongonda.jpg', stats: { averageRating: 8.5, goals: 7, assists: 9, ga: 16, accuratePassesPerMatch: 55, keyPassesPerMatch: 2.6, minutes: 550 } },
    { id: 'cod7', name: 'Noah Sadiki', pos: 'Midfielder', age: 21, image: 'noah_sadiki.jpg', stats: { averageRating: 8.3, goals: 3, assists: 6, ga: 9, accuratePassesPerMatch: 77, keyPassesPerMatch: 1.6, minutes: 530 } },
    { id: 'cod8', name: 'Charles Pickel', pos: 'Midfielder', age: 29, image: 'charles_pickel.jpg', stats: { averageRating: 8.2, goals: 3, assists: 5, ga: 8, accuratePassesPerMatch: 75, keyPassesPerMatch: 1.4, minutes: 520 } },
    { id: 'cod9', name: 'Brian Cipenga', pos: 'Midfielder', age: 28, image: 'brian_cipenga.jpg', stats: { averageRating: 8.1, goals: 6, assists: 6, ga: 12, accuratePassesPerMatch: 49, keyPassesPerMatch: 2.1, minutes: 500 } },
    { id: 'cod10', name: 'Ngal\'ayel Mukau', pos: 'Midfielder', age: 21, image: 'ngalayel_mukau.jpg', stats: { averageRating: 8.3, goals: 3, assists: 5, ga: 8, accuratePassesPerMatch: 79, keyPassesPerMatch: 1.5, minutes: 520 } },
    { id: 'cod11', name: 'Samuel Moutoussamy', pos: 'Midfielder', age: 29, image: 'samuel_moutoussamy.jpg', stats: { averageRating: 8.2, goals: 2, assists: 6, ga: 8, accuratePassesPerMatch: 80, keyPassesPerMatch: 1.6, minutes: 520 } },
    { id: 'cod12', name: 'Nathanaël Mbuku', pos: 'Midfielder', age: 24, image: 'nathanael_mbuku.jpg', stats: { averageRating: 8.2, goals: 6, assists: 7, ga: 13, accuratePassesPerMatch: 50, keyPassesPerMatch: 2.2, minutes: 510 } },
    { id: 'cod13', name: 'Edo Kayembe', pos: 'Midfielder', age: 28, image: 'edo_kayembe.jpg', stats: { averageRating: 8.3, goals: 4, assists: 6, ga: 10, accuratePassesPerMatch: 74, keyPassesPerMatch: 1.7, minutes: 530 } },
    { id: 'cod14', name: 'Gaël Kakuta', pos: 'Midfielder', age: 35, image: 'gael_kakuta.jpg', stats: { averageRating: 8.4, goals: 6, assists: 9, ga: 15, accuratePassesPerMatch: 62, keyPassesPerMatch: 2.8, minutes: 510 } },
    { id: 'cod15', name: 'Aaron Tshibola', pos: 'Midfielder', age: 31, image: 'aaron_tshibola.jpg', stats: { averageRating: 8.1, goals: 2, assists: 4, ga: 6, accuratePassesPerMatch: 76, keyPassesPerMatch: 1.3, minutes: 500 } },
    { id: 'cod16', name: 'Chancel Mbemba', pos: 'Defender', age: 31, image: 'chancel_mbemba.jpg', stats: { averageRating: 8.5, goals: 3, assists: 1, ga: 4, accuratePassesPerMatch: 82, keyPassesPerMatch: 0.4, interceptionsPerMatch: 2.7, tacklesPerMatch: 2.3, minutes: 560 } },
    { id: 'cod17', name: 'Aaron Wan-Bissaka', pos: 'Defender', age: 28, image: 'aaron_wan_bissaka.jpg', stats: { averageRating: 8.6, goals: 1, assists: 6, ga: 7, accuratePassesPerMatch: 74, keyPassesPerMatch: 1.3, interceptionsPerMatch: 2.4, tacklesPerMatch: 3.2, minutes: 560 } },
    { id: 'cod18', name: 'Arthur Masuaku', pos: 'Defender', age: 32, image: 'arthur_masuaku.jpg', stats: { averageRating: 8.2, goals: 2, assists: 5, ga: 7, accuratePassesPerMatch: 69, keyPassesPerMatch: 1.4, interceptionsPerMatch: 1.9, tacklesPerMatch: 2.3, minutes: 520 } },
    { id: 'cod19', name: 'Axel Tuanzebe', pos: 'Defender', age: 28, image: 'axel_tuanzebe.jpg', stats: { averageRating: 8.3, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 80, keyPassesPerMatch: 0.4, interceptionsPerMatch: 2.5, tacklesPerMatch: 2.4, minutes: 530 } },
    { id: 'cod20', name: 'Joris Kayembe', pos: 'Defender', age: 31, image: 'joris_kayembe.jpg', stats: { averageRating: 8.1, goals: 1, assists: 5, ga: 6, accuratePassesPerMatch: 68, keyPassesPerMatch: 1.3, interceptionsPerMatch: 1.9, tacklesPerMatch: 2.2, minutes: 510 } },
    { id: 'cod21', name: 'Dylan Batubinsika', pos: 'Defender', age: 30, image: 'dylan_batubinsika.jpg', stats: { averageRating: 8.2, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 79, keyPassesPerMatch: 0.3, interceptionsPerMatch: 2.4, tacklesPerMatch: 2.1, minutes: 520 } },
    { id: 'cod22', name: 'Gedeon Kalulu', pos: 'Defender', age: 28, image: 'gedeon_kalulu.jpg', stats: { averageRating: 8.2, goals: 1, assists: 4, ga: 5, accuratePassesPerMatch: 72, keyPassesPerMatch: 1.1, interceptionsPerMatch: 2.1, tacklesPerMatch: 2.5, minutes: 520 } },
    { id: 'cod23', name: 'Steve Kapuadi', pos: 'Defender', age: 28, image: 'steve_kapuadi.jpg', stats: { averageRating: 8.3, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 81, keyPassesPerMatch: 0.3, interceptionsPerMatch: 2.6, tacklesPerMatch: 2.2, minutes: 530 } },
    { id: 'cod24', name: 'Lionel Mpasi Nzau', pos: 'Goalkeeper', age: 31, image: 'lionel_mpasi_nzau.jpg', stats: { averageRating: 8.3, goalsPrevented: 5.0, savesPerMatch: 3.9, minutes: 520 } },
    { id: 'cod25', name: 'Matthieu Epolo', pos: 'Goalkeeper', age: 21, image: 'matthieu_epolo.jpg', stats: { averageRating: 8.1, goalsPrevented: 4.4, savesPerMatch: 3.6, minutes: 470 } },
    { id: 'cod26', name: 'Timothy Fayulu', pos: 'Goalkeeper', age: 26, image: 'timothy_fayulu.jpg', stats: { averageRating: 8.2, goalsPrevented: 4.7, savesPerMatch: 3.8, minutes: 500 } }
  ],
  'UZB': [
    { id: 'uzb1', name: 'Eldor Shomurodov', pos: 'Attacker', age: 31, image: 'eldor_shomurodov.jpg', stats: { averageRating: 8.7, goals: 11, assists: 6, ga: 17, shotsOnTargetPerMatch: 2.9, accuratePassesPerMatch: 34, keyPassesPerMatch: 1.8, minutes: 560, totalShots: 45 } },
    { id: 'uzb2', name: 'Igor Sergeev', pos: 'Attacker', age: 33, image: 'igor_sergeev.jpg', stats: { averageRating: 8.4, goals: 9, assists: 4, ga: 13, shotsOnTargetPerMatch: 2.6, accuratePassesPerMatch: 30, keyPassesPerMatch: 1.4, minutes: 530, totalShots: 41 } },
    { id: 'uzb3', name: 'Abbosbek Fayzullaev', pos: 'Midfielder', age: 22, image: 'abbosbek_fayzullaev.jpg', stats: { averageRating: 8.7, goals: 7, assists: 10, ga: 17, accuratePassesPerMatch: 59, keyPassesPerMatch: 2.8, minutes: 550 } },
    { id: 'uzb4', name: 'Oston Urunov', pos: 'Midfielder', age: 25, image: 'oston_urunov.jpg', stats: { averageRating: 8.5, goals: 8, assists: 7, ga: 15, accuratePassesPerMatch: 54, keyPassesPerMatch: 2.4, minutes: 540 } },
    { id: 'uzb5', name: 'Otabek Shukurov', pos: 'Midfielder', age: 30, image: 'otabek_shukurov.jpg', stats: { averageRating: 8.3, goals: 3, assists: 6, ga: 9, accuratePassesPerMatch: 79, keyPassesPerMatch: 1.6, minutes: 530 } },
    { id: 'uzb6', name: 'Azizjon Ganiev', pos: 'Midfielder', age: 28, image: 'azizjon_ganiev.jpg', stats: { averageRating: 8.2, goals: 4, assists: 6, ga: 10, accuratePassesPerMatch: 72, keyPassesPerMatch: 1.8, minutes: 510 } },
    { id: 'uzb7', name: 'Odiljon Khamrobekov', pos: 'Midfielder', age: 30, image: 'odiljon_khamrobekov.jpg', stats: { averageRating: 8.3, goals: 2, assists: 5, ga: 7, accuratePassesPerMatch: 81, keyPassesPerMatch: 1.4, minutes: 530 } },
    { id: 'uzb8', name: 'Akmal Mozgovoy', pos: 'Midfielder', age: 26, image: 'akmal_mozgovoy.jpg', stats: { averageRating: 8.1, goals: 3, assists: 5, ga: 8, accuratePassesPerMatch: 75, keyPassesPerMatch: 1.5, minutes: 500 } },
    { id: 'uzb9', name: 'Jamshid Iskandarov', pos: 'Midfielder', age: 32, image: 'jamshid_iskandarov.jpg', stats: { averageRating: 8.2, goals: 5, assists: 7, ga: 12, accuratePassesPerMatch: 64, keyPassesPerMatch: 2.2, minutes: 510 } },
    { id: 'uzb10', name: 'Abdulla Abdullaev', pos: 'Midfielder', age: 28, image: 'abdulla_abdullaev.jpg', stats: { averageRating: 8.1, goals: 2, assists: 4, ga: 6, accuratePassesPerMatch: 77, keyPassesPerMatch: 1.3, minutes: 500 } },
    { id: 'uzb11', name: 'Ruslanbek Jiyanov', pos: 'Midfielder', age: 25, image: 'ruslanbek_jiyanov.jpg', stats: { averageRating: 8.2, goals: 7, assists: 5, ga: 12, accuratePassesPerMatch: 47, keyPassesPerMatch: 1.9, minutes: 510 } },
    { id: 'uzb12', name: 'Azizbek Amonov', pos: 'Midfielder', age: 28, image: 'azizbek_amonov.jpg', stats: { averageRating: 8.1, goals: 6, assists: 4, ga: 10, accuratePassesPerMatch: 45, keyPassesPerMatch: 1.7, minutes: 500 } },
    { id: 'uzb13', name: 'Sherzod Esanov', pos: 'Midfielder', age: 23, image: 'sherzod_esanov.jpg', stats: { averageRating: 8.0, goals: 3, assists: 5, ga: 8, accuratePassesPerMatch: 70, keyPassesPerMatch: 1.5, minutes: 480 } },
    { id: 'uzb14', name: 'Dostonbek Khamdamov', pos: 'Midfielder', age: 29, image: 'dostonbek_khamdamov.jpg', stats: { averageRating: 8.2, goals: 6, assists: 7, ga: 13, accuratePassesPerMatch: 51, keyPassesPerMatch: 2.2, minutes: 510 } },
    { id: 'uzb15', name: 'Abdukodir Khusanov', pos: 'Defender', age: 22, image: 'abdukodir_khusanov.jpg', stats: { averageRating: 8.7, goals: 2, assists: 2, ga: 4, accuratePassesPerMatch: 84, keyPassesPerMatch: 0.5, interceptionsPerMatch: 2.8, tacklesPerMatch: 2.5, minutes: 560 } },
    { id: 'uzb16', name: 'Bekhruz Karimov', pos: 'Defender', age: 18, image: 'bekhruz_karimov.jpg', stats: { averageRating: 8.0, goals: 1, assists: 3, ga: 4, accuratePassesPerMatch: 70, keyPassesPerMatch: 0.9, interceptionsPerMatch: 1.9, tacklesPerMatch: 2.4, minutes: 470 } },
    { id: 'uzb17', name: 'Rustam Ashurmatov', pos: 'Defender', age: 30, image: 'rustam_ashurmatov.jpg', stats: { averageRating: 8.4, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 81, keyPassesPerMatch: 0.4, interceptionsPerMatch: 2.6, tacklesPerMatch: 2.3, minutes: 540 } },
    { id: 'uzb18', name: 'Khojiakbar Alizhonov', pos: 'Defender', age: 29, image: 'khojiakbar_alizhonov.jpg', stats: { averageRating: 8.3, goals: 1, assists: 5, ga: 6, accuratePassesPerMatch: 72, keyPassesPerMatch: 1.3, interceptionsPerMatch: 2.1, tacklesPerMatch: 2.5, minutes: 520 } },
    { id: 'uzb19', name: 'Jakhongir Urozov', pos: 'Defender', age: 22, image: 'jakhongir_urozov.jpg', stats: { averageRating: 8.1, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 78, keyPassesPerMatch: 0.4, interceptionsPerMatch: 2.3, tacklesPerMatch: 2.1, minutes: 500 } },
    { id: 'uzb20', name: 'Farrukh Sayfiev', pos: 'Defender', age: 35, image: 'farrukh_sayfiev.jpg', stats: { averageRating: 8.1, goals: 1, assists: 4, ga: 5, accuratePassesPerMatch: 68, keyPassesPerMatch: 1.2, interceptionsPerMatch: 1.9, tacklesPerMatch: 2.2, minutes: 490 } },
    { id: 'uzb21', name: 'Sherzod Nasrullaev', pos: 'Defender', age: 27, image: 'sherzod_nasrullaev.jpg', stats: { averageRating: 8.2, goals: 1, assists: 5, ga: 6, accuratePassesPerMatch: 70, keyPassesPerMatch: 1.3, interceptionsPerMatch: 2.0, tacklesPerMatch: 2.4, minutes: 510 } },
    { id: 'uzb22', name: 'Umarbek Eshmuradov', pos: 'Defender', age: 33, image: 'umarbek_eshmuradov.jpg', stats: { averageRating: 8.2, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 80, keyPassesPerMatch: 0.3, interceptionsPerMatch: 2.4, tacklesPerMatch: 2.1, minutes: 510 } },
    { id: 'uzb23', name: 'Avazbek Ulmasaliyev', pos: 'Defender', age: 26, image: 'avazbek_ulmasaliyev.jpg', stats: { averageRating: 8.1, goals: 1, assists: 1, ga: 2, accuratePassesPerMatch: 79, keyPassesPerMatch: 0.3, interceptionsPerMatch: 2.3, tacklesPerMatch: 2.2, minutes: 500 } },
    { id: 'uzb24', name: 'Abduvokhid Nematov', pos: 'Goalkeeper', age: 25, image: 'abduvokhid_nematov.jpg', stats: { averageRating: 8.4, goalsPrevented: 5.2, savesPerMatch: 4.0, minutes: 540 } },
    { id: 'uzb25', name: 'Utkir Yusupov', pos: 'Goalkeeper', age: 35, image: 'utkir_yusupov.jpg', stats: { averageRating: 8.2, goalsPrevented: 4.7, savesPerMatch: 3.8, minutes: 500 } },
    { id: 'uzb26', name: 'Botirali Ergashev', pos: 'Goalkeeper', age: 31, image: 'botirali_ergashev.jpg', stats: { averageRating: 8.1, goalsPrevented: 4.3, savesPerMatch: 3.6, minutes: 470 } }
  ],
  'CRO': [
    { id: 'cro1', name: 'Ante Budimir', pos: 'Attacker', age: 34, image: 'ante_budimir.jpg', stats: { averageRating: 8.7, goals: 12, assists: 4, ga: 16, shotsOnTargetPerMatch: 3.0, accuratePassesPerMatch: 29, keyPassesPerMatch: 1.3, minutes: 560, totalShots: 48 } },
    { id: 'cro2', name: 'Andrej Kramarić', pos: 'Attacker', age: 35, image: 'andrej_kramaric.jpg', stats: { averageRating: 8.8, goals: 11, assists: 8, ga: 19, shotsOnTargetPerMatch: 2.8, accuratePassesPerMatch: 43, keyPassesPerMatch: 2.5, minutes: 570, totalShots: 46 } },
    { id: 'cro3', name: 'Petar Musa', pos: 'Attacker', age: 28, image: 'petar_musa.jpg', stats: { averageRating: 8.4, goals: 9, assists: 3, ga: 12, shotsOnTargetPerMatch: 2.6, accuratePassesPerMatch: 27, keyPassesPerMatch: 1.1, minutes: 520, totalShots: 41 } },
    { id: 'cro4', name: 'Igor Matanović', pos: 'Attacker', age: 23, image: 'igor_matanovic.jpg', stats: { averageRating: 8.3, goals: 8, assists: 3, ga: 11, shotsOnTargetPerMatch: 2.5, accuratePassesPerMatch: 26, keyPassesPerMatch: 1.0, minutes: 500, totalShots: 39 } },
    { id: 'cro5', name: 'Luka Modrić', pos: 'Midfielder', age: 40, image: 'luka_modric.jpg', stats: { averageRating: 9.0, goals: 4, assists: 11, ga: 15, accuratePassesPerMatch: 91, keyPassesPerMatch: 3.1, minutes: 570 } },
    { id: 'cro6', name: 'Mateo Kovačić', pos: 'Midfielder', age: 32, image: 'mateo_kovacic.jpg', stats: { averageRating: 8.7, goals: 4, assists: 7, ga: 11, accuratePassesPerMatch: 88, keyPassesPerMatch: 2.0, minutes: 550 } },
    { id: 'cro7', name: 'Ivan Perišić', pos: 'Midfielder', age: 37, image: 'ivan_perisic.jpg', stats: { averageRating: 8.6, goals: 7, assists: 9, ga: 16, accuratePassesPerMatch: 54, keyPassesPerMatch: 2.6, minutes: 540 } },
    { id: 'cro8', name: 'Martin Baturina', pos: 'Midfielder', age: 23, image: 'martin_baturina.jpg', stats: { averageRating: 8.6, goals: 6, assists: 10, ga: 16, accuratePassesPerMatch: 68, keyPassesPerMatch: 2.8, minutes: 540 } },
    { id: 'cro9', name: 'Petar Sučić', pos: 'Midfielder', age: 22, image: 'petar_sucic.jpg', stats: { averageRating: 8.4, goals: 4, assists: 6, ga: 10, accuratePassesPerMatch: 78, keyPassesPerMatch: 1.6, minutes: 520 } },
    { id: 'cro10', name: 'Mario Pašalić', pos: 'Midfielder', age: 31, image: 'mario_pasalic.jpg', stats: { averageRating: 8.5, goals: 8, assists: 6, ga: 14, accuratePassesPerMatch: 67, keyPassesPerMatch: 2.0, minutes: 530 } },
    { id: 'cro11', name: 'Luka Sučić', pos: 'Midfielder', age: 23, image: 'luka_sucic.jpg', stats: { averageRating: 8.4, goals: 6, assists: 8, ga: 14, accuratePassesPerMatch: 71, keyPassesPerMatch: 2.3, minutes: 520 } },
    { id: 'cro12', name: 'Nikola Vlašić', pos: 'Midfielder', age: 28, image: 'nikola_vlasic.jpg', stats: { averageRating: 8.3, goals: 6, assists: 7, ga: 13, accuratePassesPerMatch: 64, keyPassesPerMatch: 2.1, minutes: 510 } },
    { id: 'cro13', name: 'Marco Pašalić', pos: 'Midfielder', age: 25, image: 'marco_pasalic.jpg', stats: { averageRating: 8.2, goals: 7, assists: 6, ga: 13, accuratePassesPerMatch: 51, keyPassesPerMatch: 2.0, minutes: 500 } },
    { id: 'cro14', name: 'Toni Fruk', pos: 'Midfielder', age: 25, image: 'toni_fruk.jpg', stats: { averageRating: 8.3, goals: 7, assists: 8, ga: 15, accuratePassesPerMatch: 59, keyPassesPerMatch: 2.4, minutes: 510 } },
    { id: 'cro15', name: 'Nikola Moro', pos: 'Midfielder', age: 28, image: 'nikola_moro.jpg', stats: { averageRating: 8.2, goals: 3, assists: 5, ga: 8, accuratePassesPerMatch: 80, keyPassesPerMatch: 1.5, minutes: 500 } },
    { id: 'cro16', name: 'Kristijan Jakić', pos: 'Midfielder', age: 29, image: 'kristijan_jakic.jpg', stats: { averageRating: 8.3, goals: 3, assists: 4, ga: 7, accuratePassesPerMatch: 82, keyPassesPerMatch: 1.3, minutes: 520 } },
    { id: 'cro17', name: 'Joško Gvardiol', pos: 'Defender', age: 24, image: 'josko_gvardiol.jpg', stats: { averageRating: 8.9, goals: 4, assists: 5, ga: 9, accuratePassesPerMatch: 89, keyPassesPerMatch: 1.2, interceptionsPerMatch: 2.5, tacklesPerMatch: 2.7, minutes: 570 } },
    { id: 'cro18', name: 'Luka Vušković', pos: 'Defender', age: 19, image: 'luka_vuskovic.jpg', stats: { averageRating: 8.5, goals: 4, assists: 2, ga: 6, accuratePassesPerMatch: 82, keyPassesPerMatch: 0.6, interceptionsPerMatch: 2.7, tacklesPerMatch: 2.4, minutes: 530 } },
    { id: 'cro19', name: 'Josip Stanišić', pos: 'Defender', age: 26, image: 'josip_stanisic.jpg', stats: { averageRating: 8.6, goals: 2, assists: 5, ga: 7, accuratePassesPerMatch: 84, keyPassesPerMatch: 1.1, interceptionsPerMatch: 2.3, tacklesPerMatch: 2.6, minutes: 540 } },
    { id: 'cro20', name: 'Josip Šutalo', pos: 'Defender', age: 26, image: 'josip_sutalo.jpg', stats: { averageRating: 8.5, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 87, keyPassesPerMatch: 0.4, interceptionsPerMatch: 2.6, tacklesPerMatch: 2.2, minutes: 530 } },
    { id: 'cro21', name: 'Duje Ćaleta-Car', pos: 'Defender', age: 29, image: 'duje_caleta_car.jpg', stats: { averageRating: 8.4, goals: 3, assists: 1, ga: 4, accuratePassesPerMatch: 84, keyPassesPerMatch: 0.4, interceptionsPerMatch: 2.5, tacklesPerMatch: 2.1, minutes: 520 } },
    { id: 'cro22', name: 'Marin Pongračić', pos: 'Defender', age: 28, image: 'marin_pongracic.jpg', stats: { averageRating: 8.3, goals: 2, assists: 2, ga: 4, accuratePassesPerMatch: 82, keyPassesPerMatch: 0.5, interceptionsPerMatch: 2.4, tacklesPerMatch: 2.2, minutes: 510 } },
    { id: 'cro23', name: 'Martin Erlić', pos: 'Defender', age: 28, image: 'martin_erlic.jpg', stats: { averageRating: 8.3, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 81, keyPassesPerMatch: 0.3, interceptionsPerMatch: 2.4, tacklesPerMatch: 2.1, minutes: 500 } },
    { id: 'cro24', name: 'Dominik Livaković', pos: 'Goalkeeper', age: 31, image: 'dominik_livakovic.jpg', stats: { averageRating: 8.8, goalsPrevented: 6.2, savesPerMatch: 4.3, minutes: 570 } },
    { id: 'cro25', name: 'Dominik Kotarski', pos: 'Goalkeeper', age: 26, image: 'dominik_kotarski.jpg', stats: { averageRating: 8.5, goalsPrevented: 5.3, savesPerMatch: 4.0, minutes: 530 } },
    { id: 'cro26', name: 'Ivor Pandur', pos: 'Goalkeeper', age: 26, image: 'ivor_pandur.jpg', stats: { averageRating: 8.3, goalsPrevented: 4.8, savesPerMatch: 3.8, minutes: 500 } }
  ],
  'GHA': [
    { id: 'gha1', name: 'Jordan Ayew', pos: 'Attacker', age: 34, image: 'jordan_ayew.jpg', stats: { averageRating: 8.6, goals: 8, assists: 6, ga: 14, shotsOnTargetPerMatch: 2.4, accuratePassesPerMatch: 34, keyPassesPerMatch: 1.8, minutes: 540, totalShots: 42 } },
    { id: 'gha2', name: 'Kamaldeen Sulemana', pos: 'Attacker', age: 24, image: 'kamaldeen_sulemana.jpg', stats: { averageRating: 8.7, goals: 10, assists: 8, ga: 18, shotsOnTargetPerMatch: 2.8, accuratePassesPerMatch: 38, keyPassesPerMatch: 2.3, minutes: 550, totalShots: 46 } },
    { id: 'gha3', name: 'Ernest Nuamah', pos: 'Attacker', age: 22, image: 'ernest_nuamah.jpg', stats: { averageRating: 8.6, goals: 9, assists: 7, ga: 16, shotsOnTargetPerMatch: 2.7, accuratePassesPerMatch: 39, keyPassesPerMatch: 2.1, minutes: 540, totalShots: 44 } },
    { id: 'gha4', name: 'Brandon Thomas-Asante', pos: 'Attacker', age: 27, image: 'brandon_thomas_asante.jpg', stats: { averageRating: 8.4, goals: 10, assists: 3, ga: 13, shotsOnTargetPerMatch: 2.6, accuratePassesPerMatch: 27, keyPassesPerMatch: 1.1, minutes: 520, totalShots: 41 } },
    { id: 'gha5', name: 'Prince Kwabena Adu', pos: 'Attacker', age: 22, image: 'prince_kwabena_adu.jpg', stats: { averageRating: 8.3, goals: 8, assists: 3, ga: 11, shotsOnTargetPerMatch: 2.5, accuratePassesPerMatch: 26, keyPassesPerMatch: 1.0, minutes: 500, totalShots: 39 } },
    { id: 'gha6', name: 'Augustine Boakye', pos: 'Attacker', age: 25, image: 'augustine_boakye.jpg', stats: { averageRating: 8.5, goals: 8, assists: 7, ga: 15, shotsOnTargetPerMatch: 2.5, accuratePassesPerMatch: 41, keyPassesPerMatch: 2.2, minutes: 530, totalShots: 40 } },
    { id: 'gha7', name: 'Antoine Semenyo', pos: 'Midfielder', age: 26, image: 'antoine_semenyo.jpg', stats: { averageRating: 8.9, goals: 12, assists: 9, ga: 21, accuratePassesPerMatch: 51, keyPassesPerMatch: 2.8, minutes: 570 } },
    { id: 'gha8', name: 'Thomas Partey', pos: 'Midfielder', age: 33, image: 'thomas_partey.jpg', stats: { averageRating: 8.6, goals: 3, assists: 6, ga: 9, accuratePassesPerMatch: 87, keyPassesPerMatch: 1.7, minutes: 540 } },
    { id: 'gha9', name: 'Iñaki Williams', pos: 'Midfielder', age: 32, image: 'inaki_williams.jpg', stats: { averageRating: 8.7, goals: 10, assists: 8, ga: 18, accuratePassesPerMatch: 48, keyPassesPerMatch: 2.4, minutes: 550 } },
    { id: 'gha10', name: 'Abdul Fatawu Issahaku', pos: 'Midfielder', age: 22, image: 'abdul_fatawu_issahaku.jpg', stats: { averageRating: 8.7, goals: 8, assists: 11, ga: 19, accuratePassesPerMatch: 55, keyPassesPerMatch: 2.9, minutes: 550 } },
    { id: 'gha11', name: 'Caleb Yirenkyi', pos: 'Midfielder', age: 20, image: 'caleb_yirenkyi.jpg', stats: { averageRating: 8.3, goals: 4, assists: 6, ga: 10, accuratePassesPerMatch: 70, keyPassesPerMatch: 1.7, minutes: 510 } },
    { id: 'gha12', name: 'Kwasi Sibo', pos: 'Midfielder', age: 28, image: 'kwasi_sibo.jpg', stats: { averageRating: 8.2, goals: 2, assists: 4, ga: 6, accuratePassesPerMatch: 78, keyPassesPerMatch: 1.3, minutes: 500 } },
    { id: 'gha13', name: 'Christopher Baah', pos: 'Midfielder', age: 21, image: 'christopher_baah.jpg', stats: { averageRating: 8.4, goals: 7, assists: 7, ga: 14, accuratePassesPerMatch: 48, keyPassesPerMatch: 2.2, minutes: 520 } },
    { id: 'gha14', name: 'Elisha Owusu', pos: 'Midfielder', age: 28, image: 'elisha_owusu.jpg', stats: { averageRating: 8.3, goals: 3, assists: 5, ga: 8, accuratePassesPerMatch: 81, keyPassesPerMatch: 1.5, minutes: 510 } },
    { id: 'gha15', name: 'Jonas Adjei Adjetey', pos: 'Defender', age: 22, image: 'jonas_adjei_adjetey.jpg', stats: { averageRating: 8.5, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 84, keyPassesPerMatch: 0.4, interceptionsPerMatch: 2.7, tacklesPerMatch: 2.5, minutes: 530 } },
    { id: 'gha16', name: 'Gideon Mensah', pos: 'Defender', age: 28, image: 'gideon_mensah.jpg', stats: { averageRating: 8.4, goals: 1, assists: 5, ga: 6, accuratePassesPerMatch: 78, keyPassesPerMatch: 1.1, interceptionsPerMatch: 2.2, tacklesPerMatch: 2.7, minutes: 520 } },
    { id: 'gha17', name: 'Jerome Opoku', pos: 'Defender', age: 27, image: 'jerome_opoku.jpg', stats: { averageRating: 8.5, goals: 3, assists: 1, ga: 4, accuratePassesPerMatch: 85, keyPassesPerMatch: 0.4, interceptionsPerMatch: 2.6, tacklesPerMatch: 2.3, minutes: 530 } },
    { id: 'gha18', name: 'Marvin Senaya', pos: 'Defender', age: 25, image: 'marvin_senaya.jpg', stats: { averageRating: 8.3, goals: 1, assists: 5, ga: 6, accuratePassesPerMatch: 76, keyPassesPerMatch: 1.0, interceptionsPerMatch: 2.1, tacklesPerMatch: 2.8, minutes: 510 } },
    { id: 'gha19', name: 'Alidu Seidu', pos: 'Defender', age: 26, image: 'alidu_seidu.jpg', stats: { averageRating: 8.6, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 82, keyPassesPerMatch: 0.7, interceptionsPerMatch: 2.6, tacklesPerMatch: 2.9, minutes: 540 } },
    { id: 'gha20', name: 'Kojo Peprah Oppong', pos: 'Defender', age: 22, image: 'kojo_peprah_oppong.jpg', stats: { averageRating: 8.3, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 80, keyPassesPerMatch: 0.4, interceptionsPerMatch: 2.5, tacklesPerMatch: 2.2, minutes: 510 } },
    { id: 'gha21', name: 'Rahman Baba', pos: 'Defender', age: 32, image: 'rahman_baba.jpg', stats: { averageRating: 8.4, goals: 2, assists: 5, ga: 7, accuratePassesPerMatch: 77, keyPassesPerMatch: 1.1, interceptionsPerMatch: 2.2, tacklesPerMatch: 2.6, minutes: 520 } },
    { id: 'gha22', name: 'Abdul Mumin', pos: 'Defender', age: 28, image: 'abdul_mumin.jpg', stats: { averageRating: 8.4, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 83, keyPassesPerMatch: 0.3, interceptionsPerMatch: 2.5, tacklesPerMatch: 2.2, minutes: 520 } },
    { id: 'gha23', name: 'Derrick Luckassen', pos: 'Defender', age: 31, image: 'derrick_luckassen.jpg', stats: { averageRating: 8.3, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 81, keyPassesPerMatch: 0.3, interceptionsPerMatch: 2.4, tacklesPerMatch: 2.1, minutes: 510 } },
    { id: 'gha24', name: 'Benjamin Asare', pos: 'Goalkeeper', age: 34, image: 'benjamin_asare.jpg', stats: { averageRating: 8.5, goalsPrevented: 5.4, savesPerMatch: 4.0, minutes: 540 } },
    { id: 'gha25', name: 'Lawrence Ati Zigi', pos: 'Goalkeeper', age: 29, image: 'lawrence_ati_zigi.jpg', stats: { averageRating: 8.7, goalsPrevented: 6.1, savesPerMatch: 4.3, minutes: 560 } },
    { id: 'gha26', name: 'Joseph Anang', pos: 'Goalkeeper', age: 26, image: 'joseph_anang.jpg', stats: { averageRating: 8.3, goalsPrevented: 4.7, savesPerMatch: 3.8, minutes: 510 } }
  ],
  'PAN': [
    { id: 'pan1', name: 'Cecilio Waterman', pos: 'Attacker', age: 35, image: 'cecilio_waterman.jpg', stats: { averageRating: 8.6, goals: 10, assists: 4, ga: 14, shotsOnTargetPerMatch: 2.7, accuratePassesPerMatch: 29, keyPassesPerMatch: 1.2, minutes: 540, totalShots: 44 } },
    { id: 'pan2', name: 'José Fajardo', pos: 'Attacker', age: 32, image: 'jose_fajardo.jpg', stats: { averageRating: 8.5, goals: 9, assists: 3, ga: 12, shotsOnTargetPerMatch: 2.6, accuratePassesPerMatch: 27, keyPassesPerMatch: 1.1, minutes: 520, totalShots: 42 } },
    { id: 'pan3', name: 'Tomás Rodríguez', pos: 'Attacker', age: 27, image: 'tomas_rodriguez.jpg', stats: { averageRating: 8.4, goals: 8, assists: 4, ga: 12, shotsOnTargetPerMatch: 2.5, accuratePassesPerMatch: 28, keyPassesPerMatch: 1.3, minutes: 510, totalShots: 40 } },
    { id: 'pan4', name: 'Adalberto Carrasquilla', pos: 'Midfielder', age: 27, image: 'adalberto_carrasquilla.jpg', stats: { averageRating: 8.9, goals: 5, assists: 10, ga: 15, accuratePassesPerMatch: 84, keyPassesPerMatch: 2.7, minutes: 570 } },
    { id: 'pan5', name: 'Ismael Díaz', pos: 'Midfielder', age: 29, image: 'ismael_diaz.jpg', stats: { averageRating: 8.7, goals: 10, assists: 8, ga: 18, accuratePassesPerMatch: 49, keyPassesPerMatch: 2.4, minutes: 550 } },
    { id: 'pan6', name: 'José Luis Rodríguez', pos: 'Midfielder', age: 28, image: 'jose_luis_rodriguez.jpg', stats: { averageRating: 8.6, goals: 7, assists: 9, ga: 16, accuratePassesPerMatch: 53, keyPassesPerMatch: 2.5, minutes: 540 } },
    { id: 'pan7', name: 'Yoel Bárcenas', pos: 'Midfielder', age: 32, image: 'yoel_barcenas.jpg', stats: { averageRating: 8.5, goals: 6, assists: 8, ga: 14, accuratePassesPerMatch: 58, keyPassesPerMatch: 2.3, minutes: 530 } },
    { id: 'pan8', name: 'Cristian Martínez', pos: 'Midfielder', age: 29, image: 'cristian_martinez.jpg', stats: { averageRating: 8.4, goals: 3, assists: 6, ga: 9, accuratePassesPerMatch: 79, keyPassesPerMatch: 1.6, minutes: 520 } },
    { id: 'pan9', name: 'Carlos Harvey', pos: 'Midfielder', age: 26, image: 'carlos_harvey.jpg', stats: { averageRating: 8.4, goals: 3, assists: 5, ga: 8, accuratePassesPerMatch: 81, keyPassesPerMatch: 1.4, minutes: 520 } },
    { id: 'pan10', name: 'Azarias Londoño', pos: 'Midfielder', age: 25, image: 'azarias_londono.jpg', stats: { averageRating: 8.3, goals: 7, assists: 5, ga: 12, accuratePassesPerMatch: 47, keyPassesPerMatch: 2.0, minutes: 510 } },
    { id: 'pan11', name: 'Aníbal Godoy', pos: 'Midfielder', age: 36, image: 'anibal_godoy.jpg', stats: { averageRating: 8.4, goals: 2, assists: 5, ga: 7, accuratePassesPerMatch: 83, keyPassesPerMatch: 1.5, minutes: 520 } },
    { id: 'pan12', name: 'César Yanis', pos: 'Midfielder', age: 30, image: 'cesar_yanis.jpg', stats: { averageRating: 8.3, goals: 6, assists: 6, ga: 12, accuratePassesPerMatch: 50, keyPassesPerMatch: 2.1, minutes: 510 } },
    { id: 'pan13', name: 'Alberto Quintero', pos: 'Midfielder', age: 38, image: 'alberto_quintero.jpg', stats: { averageRating: 8.2, goals: 5, assists: 7, ga: 12, accuratePassesPerMatch: 48, keyPassesPerMatch: 2.2, minutes: 500 } },
    { id: 'pan14', name: 'Amir Murillo', pos: 'Defender', age: 30, image: 'amir_murillo.jpg', stats: { averageRating: 8.7, goals: 3, assists: 6, ga: 9, accuratePassesPerMatch: 82, keyPassesPerMatch: 1.3, interceptionsPerMatch: 2.5, tacklesPerMatch: 2.8, minutes: 550 } },
    { id: 'pan15', name: 'José Córdoba', pos: 'Defender', age: 25, image: 'jose_cordoba.jpg', stats: { averageRating: 8.6, goals: 3, assists: 1, ga: 4, accuratePassesPerMatch: 86, keyPassesPerMatch: 0.4, interceptionsPerMatch: 2.8, tacklesPerMatch: 2.4, minutes: 540 } },
    { id: 'pan16', name: 'César Blackman', pos: 'Defender', age: 28, image: 'cesar_blackman.jpg', stats: { averageRating: 8.5, goals: 2, assists: 5, ga: 7, accuratePassesPerMatch: 79, keyPassesPerMatch: 1.1, interceptionsPerMatch: 2.3, tacklesPerMatch: 2.7, minutes: 530 } },
    { id: 'pan17', name: 'Andrés Andrade', pos: 'Defender', age: 27, image: 'andres_andrade.jpg', stats: { averageRating: 8.5, goals: 2, assists: 2, ga: 4, accuratePassesPerMatch: 84, keyPassesPerMatch: 0.6, interceptionsPerMatch: 2.6, tacklesPerMatch: 2.3, minutes: 530 } },
    { id: 'pan18', name: 'Fidel Escobar', pos: 'Defender', age: 31, image: 'fidel_escobar.jpg', stats: { averageRating: 8.5, goals: 3, assists: 2, ga: 5, accuratePassesPerMatch: 85, keyPassesPerMatch: 0.5, interceptionsPerMatch: 2.7, tacklesPerMatch: 2.3, minutes: 530 } },
    { id: 'pan19', name: 'Edgardo Fariña', pos: 'Defender', age: 24, image: 'edgardo_farina.jpg', stats: { averageRating: 8.4, goals: 3, assists: 1, ga: 4, accuratePassesPerMatch: 83, keyPassesPerMatch: 0.4, interceptionsPerMatch: 2.6, tacklesPerMatch: 2.2, minutes: 520 } },
    { id: 'pan20', name: 'Roderick Miller', pos: 'Defender', age: 34, image: 'roderick_miller.jpg', stats: { averageRating: 8.3, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 81, keyPassesPerMatch: 0.3, interceptionsPerMatch: 2.5, tacklesPerMatch: 2.1, minutes: 510 } },
    { id: 'pan21', name: 'Jiovany Ramos', pos: 'Defender', age: 29, image: 'jiovany_ramos.jpg', stats: { averageRating: 8.3, goals: 2, assists: 2, ga: 4, accuratePassesPerMatch: 80, keyPassesPerMatch: 0.5, interceptionsPerMatch: 2.4, tacklesPerMatch: 2.2, minutes: 510 } },
    { id: 'pan22', name: 'Éric Davis', pos: 'Defender', age: 35, image: 'eric_davis.jpg', stats: { averageRating: 8.4, goals: 2, assists: 6, ga: 8, accuratePassesPerMatch: 76, keyPassesPerMatch: 1.3, interceptionsPerMatch: 2.1, tacklesPerMatch: 2.5, minutes: 520 } },
    { id: 'pan23', name: 'Jorge Gutiérrez', pos: 'Defender', age: 27, image: 'jorge_gutierrez.jpg', stats: { averageRating: 8.2, goals: 1, assists: 4, ga: 5, accuratePassesPerMatch: 75, keyPassesPerMatch: 1.0, interceptionsPerMatch: 2.2, tacklesPerMatch: 2.4, minutes: 500 } },
    { id: 'pan24', name: 'Orlando Mosquera', pos: 'Goalkeeper', age: 31, image: 'orlando_mosquera.jpg', stats: { averageRating: 8.8, goalsPrevented: 6.3, savesPerMatch: 4.4, minutes: 570 } },
    { id: 'pan25', name: 'Luis Mejía', pos: 'Goalkeeper', age: 35, image: 'luis_mejia.jpg', stats: { averageRating: 8.5, goalsPrevented: 5.4, savesPerMatch: 4.0, minutes: 530 } },
    { id: 'pan26', name: 'César Samudio', pos: 'Goalkeeper', age: 32, image: 'cesar_samudio.jpg', stats: { averageRating: 8.3, goalsPrevented: 4.8, savesPerMatch: 3.8, minutes: 510 } }
  ],
  'AUT': [
    { id: 'aut1', name: 'Marko Arnautović', pos: 'Attacker', age: 37, image: 'marko_arnautovic.jpg', stats: { averageRating: 8.2, goals: 8, assists: 3, ga: 11, shotsOnTargetPerMatch: 2.6, accuratePassesPerMatch: 27, keyPassesPerMatch: 1.2, minutes: 510, totalShots: 37 } },
    { id: 'aut2', name: 'Michael Gregoritsch', pos: 'Attacker', age: 32, image: 'michael_gregoritsch.jpg', stats: { averageRating: 8.0, goals: 7, assists: 3, ga: 10, shotsOnTargetPerMatch: 2.4, accuratePassesPerMatch: 25, keyPassesPerMatch: 1.1, minutes: 490, totalShots: 34 } },
    { id: 'aut3', name: 'Saša Kalajdžić', pos: 'Attacker', age: 29, image: 'sasa_kalajdzic.jpg', stats: { averageRating: 7.9, goals: 7, assists: 2, ga: 9, shotsOnTargetPerMatch: 2.5, accuratePassesPerMatch: 21, keyPassesPerMatch: 0.8, minutes: 470, totalShots: 35 } },
    { id: 'aut4', name: 'Carney Chukwuemeka', pos: 'Midfielder', age: 22, image: 'carney_chukwuemeka.jpg', stats: { averageRating: 8.1, goals: 4, assists: 6, ga: 10, accuratePassesPerMatch: 66, keyPassesPerMatch: 1.9, minutes: 500 } },
    { id: 'aut5', name: 'Marcel Sabitzer', pos: 'Midfielder', age: 32, image: 'marcel_sabitzer.jpg', stats: { averageRating: 8.4, goals: 6, assists: 7, ga: 13, accuratePassesPerMatch: 72, keyPassesPerMatch: 2.3, minutes: 540 } },
    { id: 'aut6', name: 'Paul Wanner', pos: 'Midfielder', age: 20, image: 'paul_wanner.jpg', stats: { averageRating: 8.2, goals: 5, assists: 7, ga: 12, accuratePassesPerMatch: 68, keyPassesPerMatch: 2.2, minutes: 510 } },
    { id: 'aut7', name: 'Romano Schmid', pos: 'Midfielder', age: 26, image: 'romano_schmid.jpg', stats: { averageRating: 8.1, goals: 4, assists: 7, ga: 11, accuratePassesPerMatch: 65, keyPassesPerMatch: 2.1, minutes: 500 } },
    { id: 'aut8', name: 'Nicolas Seiwald', pos: 'Midfielder', age: 25, image: 'nicolas_seiwald.jpg', stats: { averageRating: 8.0, goals: 2, assists: 4, ga: 6, accuratePassesPerMatch: 78, keyPassesPerMatch: 1.3, minutes: 520 } },
    { id: 'aut9', name: 'Xaver Schlager', pos: 'Midfielder', age: 28, image: 'xaver_schlager.jpg', stats: { averageRating: 8.2, goals: 3, assists: 5, ga: 8, accuratePassesPerMatch: 76, keyPassesPerMatch: 1.5, minutes: 530 } },
    { id: 'aut10', name: 'Patrick Wimmer', pos: 'Midfielder', age: 25, image: 'patrick_wimmer.jpg', stats: { averageRating: 8.0, goals: 5, assists: 6, ga: 11, accuratePassesPerMatch: 54, keyPassesPerMatch: 2.0, minutes: 490 } },
    { id: 'aut11', name: 'Florian Grillitsch', pos: 'Midfielder', age: 30, image: 'florian_grillitsch.jpg', stats: { averageRating: 7.9, goals: 2, assists: 4, ga: 6, accuratePassesPerMatch: 79, keyPassesPerMatch: 1.2, minutes: 500 } },
    { id: 'aut12', name: 'Dejan Ljubičić', pos: 'Midfielder', age: 28, image: 'dejan_ljubicic.jpg', stats: { averageRating: 7.9, goals: 3, assists: 5, ga: 8, accuratePassesPerMatch: 70, keyPassesPerMatch: 1.5, minutes: 480 } },
    { id: 'aut13', name: 'Alexander Prass', pos: 'Midfielder', age: 25, image: 'alexander_prass.jpg', stats: { averageRating: 7.8, goals: 3, assists: 5, ga: 8, accuratePassesPerMatch: 62, keyPassesPerMatch: 1.6, minutes: 470 } },
    { id: 'aut14', name: 'Philipp Mwene', pos: 'Midfielder', age: 32, image: 'philipp_mwene.jpg', stats: { averageRating: 7.8, goals: 1, assists: 5, ga: 6, accuratePassesPerMatch: 60, keyPassesPerMatch: 1.4, minutes: 470 } },
    { id: 'aut15', name: 'Alessandro Schöpf', pos: 'Midfielder', age: 32, image: 'alessandro_schopf.jpg', stats: { averageRating: 7.7, goals: 3, assists: 3, ga: 6, accuratePassesPerMatch: 65, keyPassesPerMatch: 1.3, minutes: 450 } },
    { id: 'aut16', name: 'David Alaba', pos: 'Defender', age: 34, image: 'david_alaba.jpg', stats: { averageRating: 8.4, goals: 2, assists: 4, ga: 6, accuratePassesPerMatch: 84, keyPassesPerMatch: 1.1, interceptionsPerMatch: 2.1, tacklesPerMatch: 1.9, minutes: 530 } },
    { id: 'aut17', name: 'Konrad Laimer', pos: 'Defender', age: 29, image: 'konrad_laimer.jpg', stats: { averageRating: 8.2, goals: 2, assists: 5, ga: 7, accuratePassesPerMatch: 72, keyPassesPerMatch: 1.4, interceptionsPerMatch: 2.0, tacklesPerMatch: 2.5, minutes: 520 } },
    { id: 'aut18', name: 'Kevin Danso', pos: 'Defender', age: 27, image: 'kevin_danso.jpg', stats: { averageRating: 8.2, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 78, keyPassesPerMatch: 0.4, interceptionsPerMatch: 2.3, tacklesPerMatch: 2.1, minutes: 530 } },
    { id: 'aut19', name: 'Stefan Posch', pos: 'Defender', age: 29, image: 'stefan_posch.jpg', stats: { averageRating: 8.0, goals: 2, assists: 3, ga: 5, accuratePassesPerMatch: 70, keyPassesPerMatch: 0.8, interceptionsPerMatch: 2.0, tacklesPerMatch: 2.2, minutes: 500 } },
    { id: 'aut20', name: 'David Affengruber', pos: 'Defender', age: 25, image: 'david_affengruber.jpg', stats: { averageRating: 7.9, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 75, keyPassesPerMatch: 0.4, interceptionsPerMatch: 2.2, tacklesPerMatch: 2.0, minutes: 490 } },
    { id: 'aut21', name: 'Philipp Lienhart', pos: 'Defender', age: 30, image: 'philipp_lienhart.jpg', stats: { averageRating: 8.1, goals: 2, assists: 1, ga: 3, accuratePassesPerMatch: 79, keyPassesPerMatch: 0.4, interceptionsPerMatch: 2.3, tacklesPerMatch: 2.0, minutes: 510 } },
    { id: 'aut22', name: 'Marco Friedl', pos: 'Defender', age: 28, image: 'marco_friedl.jpg', stats: { averageRating: 8.0, goals: 1, assists: 2, ga: 3, accuratePassesPerMatch: 77, keyPassesPerMatch: 0.5, interceptionsPerMatch: 2.2, tacklesPerMatch: 2.1, minutes: 500 } },
    { id: 'aut23', name: 'Michael Svoboda', pos: 'Defender', age: 27, image: 'michael_svoboda.jpg', stats: { averageRating: 7.9, goals: 2, assists: 0, ga: 2, accuratePassesPerMatch: 73, keyPassesPerMatch: 0.3, interceptionsPerMatch: 2.1, tacklesPerMatch: 1.9, minutes: 480 } },
    { id: 'aut24', name: 'Alexander Schlager', pos: 'Goalkeeper', age: 30, image: 'alexander_schlager.jpg', stats: { averageRating: 8.2, goalsPrevented: 4.7, savesPerMatch: 3.8, minutes: 540 } },
    { id: 'aut25', name: 'Patrick Pentz', pos: 'Goalkeeper', age: 29, image: 'patrick_pentz.jpg', stats: { averageRating: 8.0, goalsPrevented: 4.1, savesPerMatch: 3.6, minutes: 420 } },
    { id: 'aut26', name: 'Florian Wiegele', pos: 'Goalkeeper', age: 25, image: 'florian_wiegele.jpg', stats: { averageRating: 7.7, goalsPrevented: 3.2, savesPerMatch: 3.3, minutes: 300 } }
  ],
};

// --- DATA: KNOCKOUT BRACKET ---
const KNOCKOUT_MATCHES = {
  r32: [
    { id: 101, home: 'Germany', away: 'Paraguay', h: 1, a: 1, ph: 3, pa: 4 },
    { id: 102, home: 'France', away: 'Sweden', h: 3, a: 0 },
    { id: 103, home: 'South Africa', away: 'Canada', h: 0, a: 1 },
    { id: 104, home: 'Netherlands', away: 'Morocco', h: 1, a: 1, ph: 2, pa: 3 },
    { id: 105, home: 'Portugal', away: 'Croatia', h: 2, a: 1 },
    { id: 106, home: 'Spain', away: 'Austria', h: 3, a: 0 },
    { id: 107, home: 'USA', away: 'Bosnia & Herzegovina', h: 2, a: 0 },
    { id: 108, home: 'Belgium', away: 'Senegal', h: 3, a: 2 },
    { id: 109, home: 'Brazil', away: 'Japan', h: 2, a: 1 },
    { id: 110, home: "Côte d'Ivoire", away: 'Norway', h: 1, a: 2 },
    { id: 111, home: 'Mexico', away: 'Ecuador', h: 2, a: 0 },
    { id: 112, home: 'England', away: 'DR Congo', h: 2, a: 1 },
    { id: 113, home: 'Argentina', away: 'Cape Verde', h: 3, a: 2 },
    { id: 114, home: 'Australia', away: 'Egypt', h: 1, a: 1, ph: 2, pa: 4 },
    { id: 115, home: 'Switzerland', away: 'Algeria', h: 2, a: 0 },
    { id: 116, home: 'Colombia', away: 'Ghana', h: 1, a: 0 }
  ],
  r16: [
    { id: 201, home: 'Paraguay', away: 'France', h: 0, a: 1 },
    { id: 202, home: 'Canada', away: 'Morocco', h: 0, a: 3 },
    { id: 203, home: 'Portugal', away: 'Spain', h: 0, a: 1 },
    { id: 204, home: 'USA', away: 'Belgium', h: 1, a: 4 },
    { id: 205, home: 'Brazil', away: 'Norway', h: 1, a: 2 },
    { id: 206, home: 'Mexico', away: 'England', h: 2, a: 3 },
    { id: 207, home: 'Argentina', away: 'Egypt', h: 3, a: 2 },
    { id: 208, home: 'Switzerland', away: 'Colombia', h: 0, a: 0, ph: 4, pa: 3 }
  ],
  qf: [
    { id: 301, home: 'France', away: 'Morocco', h: 2, a: 0 },
    { id: 302, home: 'Spain', away: 'Belgium', h: 2, a: 1 },
    { id: 303, home: 'Norway', away: 'England', h: 1, a: 2 },
    { id: 304, home: 'Argentina', away: 'Switzerland', h: 3, a: 1 }
  ],
  sf: [
    { id: 401, home: 'France', away: 'Spain', h: 0, a: 2 },
    { id: 402, home: 'England', away: 'Argentina', h: 1, a: 2 }
  ],
  thirdPlace: [
    { id: 501, home: 'France', away: 'England', h: 4, a: 6 }
  ],

  finals: [
    { id: 502, home: 'Spain', away: 'Argentina', h: 1, a: 0 }
  ]
};

// ============================================
// DYNAMIC TOURNAMENT RESULT FOR EACH TEAM
// ============================================

const getMatchWinner = (match) => {
  if (!match || typeof match.h !== 'number' || typeof match.a !== 'number') {
    return null;
  }

  // Normal-time / extra-time result
  if (match.h > match.a) return match.home;
  if (match.a > match.h) return match.away;

  // Penalty shootout result
  if (typeof match.ph === 'number' && typeof match.pa === 'number') {
    if (match.ph > match.pa) return match.home;
    if (match.pa > match.ph) return match.away;
  }

  return null;
};


const getTournamentResult = (teamName) => {

  // =========================
  // FINAL
  // =========================

  const finalMatch = KNOCKOUT_MATCHES.finals?.find(
    match => match.home === teamName || match.away === teamName
  );

  // If Final has already been played
  if (
    finalMatch &&
    typeof finalMatch.h === 'number' &&
    typeof finalMatch.a === 'number'
  ) {
    const finalWinner = getMatchWinner(finalMatch);

    if (finalWinner === teamName) {
      return '2026 World Cup Champions';
    }

    if (finalWinner) {
      return '2026 World Cup Runners-up';
    }
  }

  // Final is scheduled but not played yet
  if (finalMatch) {
    return '2026 World Cup Finalists';
  }


  // =========================
  // SEMI-FINAL LOSERS
  // =========================

  const thirdPlaceMatch = KNOCKOUT_MATCHES.thirdPlace?.find(
    match => match.home === teamName || match.away === teamName
  );

  if (thirdPlaceMatch) {

    const thirdPlaceWinner = getMatchWinner(thirdPlaceMatch);

    if (thirdPlaceWinner === teamName) {
      return '2026 World Cup Third Place';
    }

    if (thirdPlaceWinner) {
      return '2026 World Cup Fourth Place';
    }

    return '2026 World Cup Semi-Finalists';
  }


  // =========================
  // QUARTER-FINAL LOSERS
  // =========================

  const quarterFinal = KNOCKOUT_MATCHES.qf?.find(
    match => match.home === teamName || match.away === teamName
  );

  if (quarterFinal) {
    return 'Lost in Quarter-Finals';
  }


  // =========================
  // ROUND OF 16 LOSERS
  // =========================

  const roundOf16 = KNOCKOUT_MATCHES.r16?.find(
    match => match.home === teamName || match.away === teamName
  );

  if (roundOf16) {
    return 'Lost in Round of 16';
  }


  // =========================
  // ROUND OF 32 LOSERS
  // =========================

  const roundOf32 = KNOCKOUT_MATCHES.r32?.find(
    match => match.home === teamName || match.away === teamName
  );

  if (roundOf32) {
    return 'Lost in Round of 32';
  }


  // =========================
  // DID NOT REACH ROUND OF 32
  // =========================

  return '2026 World Cup Group Stage Exit';
};

// --- DATA: GROUP STANDINGS ---
const GROUPS = [
  { name: 'A', teams: [ { n: 'Mexico', p:3, w:3, d:0, l:0, df:'+6', g:'6:0', pts:9, form:['W','W','W'] }, { n: 'South Africa', p:3, w:1, d:1, l:1, df:'-1', g:'2:3', pts:4, form:['L','D','W'] }, { n: 'South Korea', p:3, w:1, d:0, l:2, df:'-1', g:'2:3', pts:3, form:['W','L','L'] }, { n: 'Czechia', p:3, w:0, d:1, l:2, df:'-4', g:'2:6', pts:1, form:['L','D','L'] } ] },
  { name: 'B', teams: [ { n: 'Switzerland', p:3, w:2, d:1, l:0, df:'+4', g:'7:3', pts:7, form:['D','W','W'] }, { n: 'Canada', p:3, w:1, d:1, l:1, df:'+5', g:'8:3', pts:4, form:['D','W','L'] }, { n: 'Bosnia & Herzegovina', p:3, w:1, d:1, l:1, df:'-1', g:'5:6', pts:4, form:['D','L','W'] }, { n: 'Qatar', p:3, w:0, d:1, l:2, df:'-8', g:'2:10', pts:1, form:['D','L','L'] } ] },
  { name: 'C', teams: [ { n: 'Brazil', p:3, w:2, d:1, l:0, df:'+6', g:'7:1', pts:7, form:['D','W','W'] }, { n: 'Morocco', p:3, w:2, d:1, l:0, df:'+3', g:'6:3', pts:7, form:['D','W','W'] }, { n: 'Scotland', p:3, w:1, d:0, l:2, df:'-3', g:'1:4', pts:3, form:['W','L','L'] }, { n: 'Haiti', p:3, w:0, d:0, l:3, df:'-6', g:'2:8', pts:0, form:['L','L','L'] } ] },
  { name: 'D', teams: [ { n: 'USA', p:3, w:2, d:0, l:1, df:'+4', g:'8:4', pts:6, form:['W','W','L'] }, { n: 'Australia', p:3, w:1, d:1, l:1, df:'0', g:'2:2', pts:4, form:['W','L','D'] }, { n: 'Paraguay', p:3, w:1, d:1, l:1, df:'-2', g:'2:4', pts:4, form:['L','W','D'] }, { n: 'Türkiye', p:3, w:1, d:0, l:2, df:'-2', g:'3:5', pts:3, form:['L','L','W'] } ] },
  { name: 'E', teams: [ { n: 'Germany', p:3, w:2, d:0, l:1, df:'+6', g:'10:4', pts:6, form:['W','W','L'] }, { n: "Côte d'Ivoire", p:3, w:2, d:0, l:1, df:'+2', g:'4:2', pts:6, form:['W','L','W'] }, { n: 'Ecuador', p:3, w:1, d:1, l:1, df:'0', g:'2:2', pts:4, form:['L','D','W'] }, { n: 'Curaçao', p:3, w:0, d:1, l:2, df:'-8', g:'1:9', pts:1, form:['L','D','L'] } ] },
  { name: 'F', teams: [ { n: 'Netherlands', p:3, w:2, d:1, l:0, df:'+6', g:'10:4', pts:7, form:['D','W','W'] }, { n: 'Japan', p:3, w:1, d:2, l:0, df:'+4', g:'7:3', pts:5, form:['D','W','D'] }, { n: 'Sweden', p:3, w:1, d:1, l:1, df:'0', g:'7:7', pts:4, form:['W','L','D'] }, { n: 'Tunisia', p:3, w:0, d:0, l:3, df:'-10', g:'2:12', pts:0, form:['L','L','L'] } ] },
  { name: 'G', teams: [ { n: 'Belgium', p:3, w:1, d:2, l:0, df:'+4', g:'6:2', pts:5, form:['D','D','W'] }, { n: 'Egypt', p:3, w:1, d:2, l:0, df:'+2', g:'5:3', pts:5, form:['D','W','D'] }, { n: 'Iran', p:3, w:0, d:3, l:0, df:'0', g:'3:3', pts:3, form:['D','D','D'] }, { n: 'New Zealand', p:3, w:0, d:1, l:2, df:'-6', g:'4:10', pts:1, form:['D','L','L'] } ] },
  { name: 'H', teams: [ { n: 'Spain', p:3, w:2, d:1, l:0, df:'+5', g:'5:0', pts:7, form:['D','W','W'] }, { n: 'Cape Verde', p:3, w:0, d:3, l:0, df:'0', g:'2:2', pts:3, form:['D','D','D'] }, { n: 'Uruguay', p:3, w:0, d:2, l:1, df:'-1', g:'3:4', pts:2, form:['D','D','L'] }, { n: 'Saudi Arabia', p:3, w:0, d:2, l:1, df:'-4', g:'1:5', pts:2, form:['D','L','D'] } ] },
  { name: 'I', teams: [ { n: 'France', p:3, w:3, d:0, l:0, df:'+8', g:'10:2', pts:9, form:['W','W','W'] }, { n: 'Norway', p:3, w:2, d:0, l:1, df:'+1', g:'8:7', pts:6, form:['W','W','L'] }, { n: 'Senegal', p:3, w:1, d:0, l:2, df:'+2', g:'8:6', pts:3, form:['L','L','W'] }, { n: 'Iraq', p:3, w:0, d:0, l:3, df:'-11', g:'1:12', pts:0, form:['L','L','L'] } ] },
  { name: 'J', teams: [ { n: 'Argentina', p:3, w:3, d:0, l:0, df:'+7', g:'8:1', pts:9, form:['W','W','W'] }, { n: 'Austria', p:3, w:1, d:1, l:1, df:'0', g:'6:6', pts:4, form:['W','L','D'] }, { n: 'Algeria', p:3, w:1, d:1, l:1, df:'-2', g:'5:7', pts:4, form:['L','W','D'] }, { n: 'Jordan', p:3, w:0, d:0, l:3, df:'-5', g:'3:8', pts:0, form:['L','L','L'] } ] },
  { name: 'K', teams: [ { n: 'Colombia', p:3, w:2, d:1, l:0, df:'+3', g:'4:1', pts:7, form:['W','W','D'] }, { n: 'Portugal', p:3, w:1, d:2, l:0, df:'+5', g:'6:1', pts:5, form:['D','W','D'] }, { n: 'DR Congo', p:3, w:1, d:1, l:1, df:'+1', g:'4:3', pts:4, form:['D','L','W'] }, { n: 'Uzbekistan', p:3, w:0, d:0, l:3, df:'-9', g:'2:11', pts:0, form:['L','L','L'] } ] },
  { name: 'L', teams: [ { n: 'England', p:3, w:2, d:1, l:0, df:'+4', g:'6:2', pts:7, form:['W','D','W'] }, { n: 'Croatia', p:3, w:2, d:0, l:1, df:'0', g:'5:5', pts:6, form:['L','W','W'] }, { n: 'Ghana', p:3, w:1, d:1, l:1, df:'0', g:'2:2', pts:4, form:['W','D','L'] }, { n: 'Panama', p:3, w:0, d:0, l:3, df:'-4', g:'0:4', pts:0, form:['L','L','L'] } ] },
];

const THIRD_PLACE = [
  { n: 'DR Congo', p:3, w:1, d:1, l:1, df:'+1', g:'4:3', pts:4 },
  { n: 'Sweden', p:3, w:1, d:1, l:1, df:'0', g:'7:7', pts:4 },
  { n: 'Ghana', p:3, w:1, d:1, l:1, df:'0', g:'2:2', pts:4 },
  { n: 'Ecuador', p:3, w:1, d:1, l:1, df:'0', g:'2:2', pts:4 },
  { n: 'Bosnia & Herzegovina', p:3, w:1, d:1, l:1, df:'-1', g:'5:6', pts:4 },
  { n: 'Algeria', p:3, w:1, d:1, l:1, df:'-2', g:'5:7', pts:4 },
  { n: 'Paraguay', p:3, w:1, d:1, l:1, df:'-2', g:'2:4', pts:4 },
  { n: 'Senegal', p:3, w:1, d:0, l:2, df:'+2', g:'8:6', pts:3 },
  { n: 'Iran', p:3, w:0, d:3, l:0, df:'0', g:'3:3', pts:3 },
  { n: 'South Korea', p:3, w:1, d:0, l:2, df:'-1', g:'2:3', pts:3 },
  { n: 'Scotland', p:3, w:1, d:0, l:2, df:'-3', g:'1:4', pts:3 },
  { n: 'Uruguay', p:3, w:0, d:2, l:1, df:'-1', g:'3:4', pts:2 },
];


const FormPill = ({ result }) => {
  const colors = {
    'W': 'bg-emerald-600',
    'D': 'bg-slate-500',
    'L': 'bg-rose-600'
  };
  return (
    <span className={`${colors[result]} text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm mx-0.5`}>
      {result}
    </span>
  );
};

const StatBar = ({ label, value, max, icon: Icon, colorClass = "from-sky-500 to-blue-400" }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center mb-1">
      <div className="flex items-center text-slate-300">
        <Icon size={16} className={`mr-2 ${colorClass.split(' ')[0].replace('from-', 'text-')}`} />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <span className="text-sm font-bold text-white">{value}</span>
    </div>
    <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-700">
      <div 
        className={`bg-gradient-to-r ${colorClass} h-2.5 rounded-full transition-all duration-1000 ease-out`} 
        style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
      ></div>
    </div>
  </div>
);

const STAT_LABELS = {
  averageRating: 'Average Rating',
  goals: 'Goals',
  assists: 'Assists',
  ga: 'Goals + Assists',
  shotsOnTargetPerMatch: 'Shots on Target / Match',
  bigChancesCreated: 'Big Chances Created',
  bigChancesMissed: 'Big Chances Missed',
  accuratePassesPerMatch: 'Accurate Passes / Match',
  keyPassesPerMatch: 'Key Passes / Match',
  xG: 'Expected Goals (xG)',
  minutes: 'Minutes Played',
  totalShots: 'Total Shots / Match',
  interceptionsPerMatch: 'Interceptions / Match',
  tacklesPerMatch: 'Tackles / Match',
  goalsPrevented: 'Goals Prevented',
  savesPerMatch: 'Saves / Match'
};

const PlayerModal = ({ player, team, onClose }) => {
  if (!player) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1d24] border border-slate-700 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className={`h-28 bg-gradient-to-r ${team.color} opacity-90 relative`}>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-900 hover:text-black bg-white/50 hover:bg-white/80 p-1.5 rounded-full transition-colors shadow-sm"
          >
            <X size={20} />
          </button>
        </div>
        <div className="px-6 pb-6 relative">
          <div className="flex justify-between items-end -mt-14 mb-4">
            <div className="w-28 h-28 rounded-full border-4 border-[#1a1d24] bg-[#22262d] shadow-xl flex items-center justify-center text-4xl text-slate-500 font-bold uppercase z-10">
              {player.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <div className="flex flex-col items-end">
              <img src={team.flag} alt="flag" className="w-12 h-auto shadow-sm mb-2 rounded border border-slate-700" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-1">{player.name}</h2>
          <p className="text-slate-400 font-medium mb-6 flex items-center">
             {player.pos} <span className="mx-2 text-slate-600">•</span> Age {player.age}
          </p>
          
          {/* DYNAMIC STATS CONTAINER */}
          <div className="space-y-3 bg-[#22262d] p-4 rounded-xl border border-slate-700/50 max-h-80 overflow-y-auto">
            {Object.entries(player.stats).map(([key, value]) => (
              <StatBar
                key={key}
                label={STAT_LABELS[key] || key}
                value={value}
                max={key === 'averageRating' ? 10 : (key === 'minutes' ? 600 : 30)}
                icon={Target}
                colorClass={key === 'averageRating' ? "from-amber-400 to-green-500" : "from-sky-400 to-blue-500"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GroupTable = ({ group, isThirdPlace = false, onSelectTeam }) => {
  return (
    <div className="bg-[#1a1d24] rounded-xl border border-slate-800 overflow-hidden mb-6">
      <div className="bg-[#22262d] px-4 py-3 flex items-center justify-between border-b border-slate-800">
        <h3 className="text-white font-bold flex items-center">
          <Trophy size={16} className="text-amber-500 mr-2" /> 
          {isThirdPlace ? "Third-placed teams" : `Group ${group.name}`}
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-400 bg-[#1a1d24] uppercase border-b border-slate-800">
            <tr>
              <th className="px-4 py-3 font-medium w-8">#</th>
              <th className="px-4 py-3 font-medium">Playoffs</th>
              <th className="px-3 py-3 font-medium text-center w-8">P</th>
              <th className="px-3 py-3 font-medium text-center w-8">W</th>
              <th className="px-3 py-3 font-medium text-center w-8">D</th>
              <th className="px-3 py-3 font-medium text-center w-8">L</th>
              <th className="px-3 py-3 font-medium text-center w-12">DIFF</th>
              <th className="px-3 py-3 font-medium text-center w-12">GLS</th>
              {!isThirdPlace && <th className="px-4 py-3 font-medium text-center w-24">Last 3</th>}
              <th className="px-4 py-3 font-medium text-center w-12">PTS</th>
            </tr>
          </thead>
          <tbody>
            {(isThirdPlace ? THIRD_PLACE : group.teams).map((team, idx) => {
              const isQualified = isThirdPlace ? idx < 8 : idx < 2;
              const isFirstQual = idx === 0;
              const isLastQual = isThirdPlace ? idx === 7 : idx === 1;

              return (
                <tr key={team.n} className="border-b border-slate-800/50 hover:bg-[#22262d] transition-colors">
                  <td className="px-4 py-3 text-slate-400 font-medium relative">
                    {isQualified && (
                      <div className={`absolute left-0 w-2 border-emerald-500 border-l-2 ${isFirstQual ? 'top-2 bottom-0 border-t-2 rounded-tl' : isLastQual ? 'top-0 bottom-2 border-b-2 rounded-bl' : 'top-0 bottom-0'}`}></div>
                    )}
                    {idx + 1}
                  </td>
                  <td className="px-4 py-3">
                    <div
                      onClick={() => {
                        const teamId = Object.keys(TEAMS).find(
                          id => TEAMS[id].name === team.n
                        );

                        if (teamId) {
                          onSelectTeam(teamId);
                        }
                      }}
                      className="flex items-center space-x-3 cursor-pointer group/team"
                    >
                      <img
                        src={getFlagUrl(team.n)}
                        alt={team.n}
                        className="w-6 h-4 object-cover rounded-sm border border-slate-700"
                      />

                      <span className="text-slate-200 font-medium whitespace-nowrap group-hover/team:text-sky-400 transition-colors">
                        {team.n}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center text-slate-400">{team.p}</td>
                  <td className="px-3 py-3 text-center text-slate-400">{team.w}</td>
                  <td className="px-3 py-3 text-center text-slate-400">{team.d}</td>
                  <td className="px-3 py-3 text-center text-slate-400">{team.l}</td>
                  <td className="px-3 py-3 text-center text-slate-300">{team.df}</td>
                  <td className="px-3 py-3 text-center text-slate-400">{team.g}</td>
                  {!isThirdPlace && (
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center">
                        {team.form.map((f, i) => <FormPill key={i} result={f} />)}
                      </div>
                    </td>
                  )}
                  <td className="px-4 py-3 text-center font-bold text-white">{team.pts}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const RulesAndLegend = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-[#1a1d24] rounded-xl border border-slate-800 overflow-hidden mt-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between bg-[#22262d] hover:bg-slate-800 transition-colors"
      >
        <span className="text-white font-bold">Rules and legend</span>
        <ChevronDown size={18} className={`text-slate-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="p-4 sm:p-6 border-t border-slate-800 text-sm text-slate-300">
          <div className="flex items-center mb-4">
             <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
             <span className="text-emerald-500 font-medium">Playoffs</span>
          </div>
          <p className="mb-4 text-slate-400">In the event that two (or more) teams finish with an equal number of points, the following rules break the tie:</p>
          <ol className="list-none space-y-1 mb-8 text-slate-400">
            <li>1. Head-to-head games between the teams concerned</li>
            <li className="ml-4">1a. Points total</li>
            <li className="ml-4">1b. Goal difference</li>
            <li className="ml-4">1c. Goals scored</li>
            <li>2. Overall goal difference</li>
            <li>3. Overall number of goals scored</li>
            <li>4. Disciplinary points</li>
            <li>5. Higher position in FIFA World Ranking</li>
          </ol>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-3 text-slate-400">
            <div><span className="text-slate-500 w-10 inline-block font-bold">P</span> Matches played</div>
            <div><span className="text-slate-500 w-10 inline-block font-bold">W</span> Wins</div>
            <div><span className="text-slate-500 w-10 inline-block font-bold">D</span> Draws</div>
            <div><span className="text-slate-500 w-10 inline-block font-bold">L</span> Losses</div>
            <div><span className="text-slate-500 w-10 inline-block font-bold">DIFF</span> Difference</div>
            <div><span className="text-slate-500 w-10 inline-block font-bold">GLS</span> Goals</div>
            <div><span className="text-slate-500 w-10 inline-block font-bold">PTS</span> Points</div>
          </div>
        </div>
      )}
    </div>
  );
};

const GroupsView = ({ onSelectTeam }) => (
  <div className="p-4 sm:p-6 animate-in fade-in duration-500">
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-white flex items-center">
        <LayoutGrid className="mr-3 text-sky-400" /> 48-Team Group Stage
      </h2>
      <p className="text-slate-400 mt-1">Final standings for Groups A-L and the Third-placed teams table.</p>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
      <div>
        {GROUPS.slice(0, 6).map(g => (
          <GroupTable
            key={g.name}
            group={g}
            onSelectTeam={onSelectTeam}
          />
        ))}
      </div>
      <div>
        {GROUPS.slice(6, 12).map(g => (
          <GroupTable
            key={g.name}
            group={g}
            onSelectTeam={onSelectTeam}
          />
        ))}

        <GroupTable
          isThirdPlace={true}
          onSelectTeam={onSelectTeam}
        />
      </div>
    </div>

    <RulesAndLegend />
  </div>
);

const MATCH_STATS = {

  101: {
    competition: "FIFA World Cup 2026 • Round of 32",
    stadium: "Gillette Stadium • Foxborough",

    overview: {
      possession:[76,24],
      distance:[134.1,121.8],
      xg:[1.57,0.35],
      bigChances:[2,3],
      shots:[21,7],
      saves:[2,6],
      sprints:[102,89],
      corners:[16,6],
      fouls:[18,12],
      passes:[805,255],
      tackles:[13,33],
      freeKicks:[12,18],
      yellowCards:[2,2],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[6,3],
      hitWoodwork:[0,0],
      offTarget:[7,2],
      blocked:[8,2],
      insideBox:[11,6],
      outsideBox:[10,1]
    },

    attack:{
      bigScored:[1,1],
      bigMissed:[2,2],
      touchesBox:[43,12],
      fouledThird:[6,2],
      offsides:[4,1],
      throughBalls:[2,1],
    },

    passes:{
      accurate:[725,160],
      throwIns:[23,12],
      finalThird:[127,56],

      finalThirdCompleted:["255/315","40/84"],
      finalThirdPercent:[81,48],

      longBallsCompleted:["27/40","20/78"],
      longBallsPercent:[68,26],

      crossesCompleted:["9/55","6/21"],
      crossesPercent:[16,29]
    },

    duels:{
      possession:[45,55],
      dispossessed:[13,7],

      ground:[41,59],
      groundCompleted:["40/97","57/97"],

      aerial:[53,48],
      aerialCompleted:["21/40","19/40"],

      dribbles:[43,57],
      dribblesCompleted:["15/35","8/14"]
    },

    defending:{
      tacklesWon:[54,61],
      tackles:[13,33],
      interceptions:[4,13],
      recoveries:[77,62],
      clearances:[23,55]
    },

    goalkeeping:{
      saves:[2,6],
      goalsPrevented:[-0.51,0.87],
      bigSaves:[0,1],
      claims:[0,3],
      punches:[1,1],
      goalKicks:[5,14]
    },

    lineup:{
      home:["ABC1","ABC2","ABC3","ABC4","ABC5","ABC6","ABC7","ABC8","ABC9","ABC10","ABC11"],
      away:["XYZ1","XYZ2","XYZ3","XYZ4","XYZ5","XYZ6","XYZ7","XYZ8","XYZ9","XYZ10","XYZ11"]
    }
  },

  102: {
    competition: "FIFA World Cup 2026 • Round of 32",
    stadium: "Friends Arena • Stockholm",

    overview: {
      possession:[61,39],
      distance:[94.1,94.2],
      xg:[3.24,0.70],
      bigChances:[7,1],
      shots:[25,8],
      saves:[3,9],
      sprints:[95,82],
      corners:[9,1],
      fouls:[14,10],
      passes:[551,350],
      tackles:[13,13],
      freeKicks:[10,14],
      yellowCards:[1,2],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[12,3],
      hitWoodwork:[2,0],
      offTarget:[9,4],
      blocked:[4,1],
      insideBox:[16,7],
      outsideBox:[9,1]
    },

    attack:{
      bigScored:[2,0],
      bigMissed:[5,1],
      throughBalls:[3,1],
      touchesBox:[35,14],
      fouledThird:[1,0],
      offsides:[3,1]
    },

    passes:{
      accurate:[484,278],
      throwIns:[10,19],
      finalThird:[62,49],

      finalThirdCompleted:["180/207","64/105"],
      finalThirdPercent:[87,61],

      longBallsCompleted:["17/36","11/45"],
      longBallsPercent:[47,24],

      crossesCompleted:["4/17","3/11"],
      crossesPercent:[24,27]
    },

    duels:{
      possession:[53,47],
      dispossessed:[3,9],

      ground:[50,50],
      groundCompleted:["33/66","33/66"],

      aerial:[65,35],
      aerialCompleted:["13/20","7/20"],

      dribbles:[52,64],
      dribblesCompleted:["11/21","7/11"]
    },

    defending:{
      tacklesWon:[54,69],
      tackles:[13,13],
      interceptions:[5,12],
      recoveries:[46,35],
      clearances:[23,26]
    },

    goalkeeping:{
      saves:[3,9],
      goalsPrevented:[0.65,0.83],
      bigSaves:[1,3],
      claims:[0,1],
      punches:[0,0],
      goalKicks:[8,8]
    },

    lineup:{
      home:["ABC1","ABC2","ABC3","ABC4","ABC5","ABC6","ABC7","ABC8","ABC9","ABC10","ABC11"],
      away:["XYZ1","XYZ2","XYZ3","XYZ4","XYZ5","XYZ6","XYZ7","XYZ8","XYZ9","XYZ10","XYZ11"]
    }
  },

  103: {
    competition: "FIFA World Cup 2026 • Round of 32",
    stadium: "BC Place • Vancouver",

    overview: {
      possession:[58,42],
      distance:[97.6,103.4],
      xg:[0.14,1.38],
      bigChances:[0,4],
      shots:[6,12],
      saves:[5,1],
      sprints:[110,128],
      corners:[1,4],
      fouls:[10,16],
      passes:[554,379],
      tackles:[22,20],
      freeKicks:[16,10],
      yellowCards:[0,2],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[1,7],
      hitWoodwork:[0,0],
      offTarget:[4,5],
      blocked:[1,0],
      insideBox:[1,9],
      outsideBox:[5,3]
    },

    attack:{
      bigScored:[0,4],
      bigMissed:[0,4],
      throughBalls:[1,1],
      touchesBox:[8,25],
      fouledThird:[0,2],
      offsides:[1,0]
    },

    passes:{
      accurate:[466,298],
      throwIns:[17,21],
      finalThird:[57,62],

      finalThirdCompleted:["54/91","78/126"],
      finalThirdPercent:[59,62],

      longBallsCompleted:["31/72","15/31"],
      longBallsPercent:[43,48],

      crossesCompleted:["2/7","5/13"],
      crossesPercent:[29,38]
    },

    duels:{
      possession:[51,49],
      dispossessed:[14,8],

      ground:[59,41],
      groundCompleted:["50/85","35/85"],

      aerial:[31,69],
      aerialCompleted:["10/32","22/32"],

      dribbles:[67,33],
      dribblesCompleted:["12/18","7/21"]
    },

    defending:{
      tacklesWon:[59,75],
      tackles:[22,20],
      interceptions:[15,8],
      recoveries:[49,56],
      clearances:[33,16],

      errorsShot:[1,0],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[5,1],
      goalsPrevented:[0.67,0.11],
      bigSaves:[0,0],
      claims:[0,1],
      punches:[0,0],
      goalKicks:[12,4]
    },

    lineup:{
      home:[
        "R. Williams",
        "A. Modiba",
        "S. Sithole",
        "M. Mbekazi",
        "J. Okon",
        "T. Mokoena",
        "K. Mudau",
        "R. Mofokeng",
        "E. Makgopa",
        "A. Appollis",
        "T. Maseko"
      ],

      away:[
        "M. Crépeau",
        "A. Johnston",
        "T. Buchanan",
        "J. David",
        "N. Saliba",
        "M. Bombito",
        "S. Eustáquio",
        "D. Cornelius",
        "T. Oluwaseyi",
        "L. Millar",
        "R. Laryea"
      ]
    }
  },

  104: {
    competition: "FIFA World Cup 2026 • Round of 32",
    stadium: "MetLife Stadium • New York",

    overview: {
      possession:[30,70],
      distance:[104.8,102.6],
      xg:[0.24,1.38],
      bigChances:[1,5],
      shots:[6,11],
      saves:[5,1],
      sprints:[110,123],
      corners:[5,8],
      fouls:[18,15],
      passes:[371,879],
      tackles:[19,19],
      freeKicks:[15,18],
      yellowCards:[0,1],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[2,5],
      hitWoodwork:[0,1],
      offTarget:[1,4],
      blocked:[3,2],
      insideBox:[4,7],
      outsideBox:[2,4]
    },

    attack:{
      bigScored:[1,1],
      bigMissed:[0,4],
      throughBalls:[0,3],
      touchesBox:[17,20],
      fouledThird:[0,2],
      offsides:[3,0]
    },

    passes:{
      accurate:[292,801],
      throwIns:[28,17],
      finalThird:[60,101],

      finalThirdCompleted:["45/92","154/190"],
      finalThirdPercent:[49,81],

      longBallsCompleted:["16/47","21/48"],
      longBallsPercent:[34,44],

      crossesCompleted:["3/10","4/18"],
      crossesPercent:[30,22]
    },

    duels:{
      possession:[50,50],
      dispossessed:[7,6],

      ground:[46,54],
      groundCompleted:["35/76","41/76"],

      aerial:[60,40],
      aerialCompleted:["18/30","12/30"],

      dribbles:[14,38],
      dribblesCompleted:["2/14","8/21"]
    },

    defending:{
      tacklesWon:[53,74],
      tackles:[19,19],
      interceptions:[11,11],
      recoveries:[46,51],
      clearances:[22,34],

      errorsShot:[1,0],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[5,1],
      goalsPrevented:[1.28,-0.84],
      bigSaves:[2,1],
      claims:[0,0],
      punches:[0,1],
      goalKicks:[8,5]
    },

    lineup:{
      home:[
        "Verbruggen",
        "Dumfries",
        "Van Dijk",
        "De Ligt",
        "Ake",
        "De Jong",
        "Reijnders",
        "Simons",
        "Gakpo",
        "Depay",
        "Malen"
      ],

      away:[
        "Bounou",
        "Hakimi",
        "Aguerd",
        "Saiss",
        "Mazraoui",
        "Amrabat",
        "Ounahi",
        "El Khannouss",
        "Ziyech",
        "Abde",
        "En-Nesyri"
      ]
    }
  },

  105: {
    competition: "FIFA World Cup 2026 • Round of 32",
    stadium: "Estádio da Luz • Lisbon",

    overview: {
      possession:[60,40],
      distance:[108.5,111.2],
      xg:[2.20,1.34],
      bigChances:[3,4],
      shots:[15,13],
      saves:[5,2],
      sprints:[118,114],
      corners:[9,5],
      fouls:[6,12],
      passes:[585,370],
      tackles:[19,22],
      freeKicks:[11,6],
      yellowCards:[1,2],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[3,6],
      hitWoodwork:[1,1],
      offTarget:[8,5],
      blocked:[4,2],
      insideBox:[10,10],
      outsideBox:[5,3]
    },

    attack:{
      bigScored:[1,1],
      bigMissed:[2,3],
      throughBalls:[0,1],
      touchesBox:[19,22],
      fouledThird:[2,1],
      offsides:[1,4]
    },

    passes:{
      accurate:[533,312],
      throwIns:[9,14],
      finalThird:[89,24],

      finalThirdCompleted:["125/159","57/75"],
      finalThirdPercent:[79,76],

      longBallsCompleted:["19/39","18/42"],
      longBallsPercent:[49,43],

      crossesCompleted:["6/20","7/22"],
      crossesPercent:[30,32]
    },

    duels:{
      possession:[57,43],
      dispossessed:[9,17],

      ground:[56,44],
      groundCompleted:["43/77","34/77"],

      aerial:[60,40],
      aerialCompleted:["12/20","8/20"],

      dribbles:[48,75],
      dribblesCompleted:["12/25","6/8"]
    },

    defending:{
      tacklesWon:[47,50],
      tackles:[19,22],
      interceptions:[5,10],
      recoveries:[42,37],
      clearances:[19,19],

      errorsShot:[1,0],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[5,2],
      goalsPrevented:[0.51,-0.15],
      bigSaves:[2,0],
      claims:[1,0],
      punches:[0,1],
      goalKicks:[7,14]
    },

    lineup:{
      home:[
        "Diogo Costa",
        "Cancelo",
        "Dias",
        "Inacio",
        "Nuno Mendes",
        "Palhinha",
        "Vitinha",
        "Bernardo Silva",
        "Bruno Fernandes",
        "Leao",
        "Ronaldo"
      ],

      away:[
        "Livakovic",
        "Stanisic",
        "Sutalo",
        "Gvardiol",
        "Sosa",
        "Brozovic",
        "Kovacic",
        "Modric",
        "Pasalic",
        "Perisic",
        "Kramaric"
      ]
    }
  },

  106: {
    competition: "FIFA World Cup 2026 • Round of 32",
    stadium: "Santiago Bernabéu • Madrid",

    overview: {
      possession:[64,36],
      distance:[100.4,100.4],
      xg:[2.80,0.32],
      bigChances:[4,1],
      shots:[23,5],
      saves:[0,6],
      sprints:[107,103],
      corners:[9,0],
      fouls:[8,15],
      passes:[629,347],
      tackles:[19,16],
      freeKicks:[15,8],
      yellowCards:[0,1],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[10,0],
      hitWoodwork:[1,0],
      offTarget:[6,4],
      blocked:[7,1],
      insideBox:[15,4],
      outsideBox:[8,1]
    },

    attack:{
      bigScored:[3,0],
      bigMissed:[1,1],
      throughBalls:[0,0],
      touchesBox:[51,10],
      fouledThird:[3,0],
      offsides:[2,5]
    },

    passes:{
      accurate:[570,285],
      throwIns:[15,7],
      finalThird:[53,29],

      finalThirdCompleted:["139/167","42/58"],
      finalThirdPercent:[83,72],

      longBallsCompleted:["23/35","14/37"],
      longBallsPercent:[66,38],

      crossesCompleted:["7/21","3/13"],
      crossesPercent:[33,23]
    },

    duels:{
      possession:[64,36],
      dispossessed:[8,8],

      ground:[60,40],
      groundCompleted:["41/68","27/68"],

      aerial:[80,20],
      aerialCompleted:["12/15","3/15"],

      dribbles:[47,31],
      dribblesCompleted:["7/15","5/16"]
    },

    defending:{
      tacklesWon:[63,50],
      tackles:[19,16],
      interceptions:[6,6],
      recoveries:[46,44],
      clearances:[15,21],

      errorsShot:[0,1],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[0,6],
      goalsPrevented:[0.00,-0.80],
      bigSaves:[0,1],
      claims:[1,1],
      punches:[0,2],
      goalKicks:[7,8]
    },

    lineup:{
      home:[
        "Unai Simon",
        "Carvajal",
        "Le Normand",
        "Laporte",
        "Cucurella",
        "Rodri",
        "Pedri",
        "Fabian Ruiz",
        "Lamine Yamal",
        "Nico Williams",
        "Morata"
      ],

      away:[
        "Schlager",
        "Posch",
        "Danso",
        "Lienhart",
        "Mwene",
        "Seiwald",
        "Laimer",
        "Sabitzer",
        "Baumgartner",
        "Wimmer",
        "Arnautovic"
      ]
    }
  },

  107: {
    competition: "FIFA World Cup 2026 • Round of 32",
    stadium: "MetLife Stadium • New Jersey",

    overview: {
      possession:[48,52],
      distance:[107.1,109.0],
      xg:[0.88,0.25],
      bigChances:[2,0],
      shots:[8,10],
      saves:[3,0],
      sprints:[108,105],
      corners:[4,3],
      fouls:[7,13],
      passes:[415,449],
      tackles:[12,15],
      freeKicks:[13,7],
      yellowCards:[0,1],
      redCards:[1,0]
    },

    shots:{
      shotsOnTarget:[2,3],
      hitWoodwork:[1,0],
      offTarget:[4,4],
      blocked:[2,3],
      insideBox:[6,5],
      outsideBox:[2,5]
    },

    attack:{
      bigScored:[1,0],
      bigMissed:[1,0],
      throughBalls:[0,0],
      touchesBox:[23,7],
      fouledThird:[5,1],
      offsides:[3,0]
    },

    passes:{
      accurate:[349,367],
      throwIns:[20,20],
      finalThird:[61,52],

      finalThirdCompleted:["77/117","60/94"],
      finalThirdPercent:[66,64],

      longBallsCompleted:["17/42","12/50"],
      longBallsPercent:[40,24],

      crossesCompleted:["3/14","0/13"],
      crossesPercent:[21,0]
    },

    duels:{
      possession:[59,41],
      dispossessed:[5,4],

      ground:[58,42],
      groundCompleted:["34/59","25/59"],

      aerial:[62,38],
      aerialCompleted:["13/21","8/21"],

      dribbles:[47,27],
      dribblesCompleted:["9/19","3/11"]
    },

    defending:{
      tacklesWon:[67,80],
      tackles:[12,15],
      interceptions:[7,7],
      recoveries:[44,32],
      clearances:[28,24],

      errorsShot:[1,0],
      errorsGoal:[0,1]
    },

    goalkeeping:{
      saves:[3,0],
      goalsPrevented:[0.13,-1.71],
      bigSaves:[0,0],
      claims:[1,0],
      punches:[0,2],
      goalKicks:[4,11]
    },

    lineup:{
      home:[
        "Matt Turner",
        "Dest",
        "Richards",
        "Ream",
        "Robinson",
        "Adams",
        "McKennie",
        "Musah",
        "Pulisic",
        "Weah",
        "Balogun"
      ],

      away:[
        "Sehic",
        "Ahmedhodzic",
        "Bicakcic",
        "Kolasinac",
        "Gazibegovic",
        "Pjanic",
        "Krunic",
        "Tahirovic",
        "Demirovic",
        "Dzeko",
        "Hadzikadunic"
      ]
    }
  },

  108: {
    competition: "FIFA World Cup 2026 • Round of 32",
    stadium: "King Baudouin Stadium • Brussels",

    overview: {
      possession:[52,48],
      distance:[141.6,135.4],
      xg:[1.74,3.58],
      bigChances:[3,6],
      shots:[19,19],
      saves:[3,3],
      sprints:[123,108],
      corners:[4,2],
      fouls:[22,12],
      passes:[701,639],
      tackles:[12,12],
      freeKicks:[11,22],
      yellowCards:[1,1],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[5,5],
      hitWoodwork:[1,2],
      offTarget:[9,11],
      blocked:[5,3],
      insideBox:[11,10],
      outsideBox:[8,9]
    },

    attack:{
      bigScored:[3,2],
      bigMissed:[0,4],
      throughBalls:[0,2],
      touchesBox:[37,30],
      fouledThird:[2,2],
      offsides:[2,2]
    },

    passes:{
      accurate:[602,536],
      throwIns:[16,19],
      finalThird:[72,92],

      finalThirdCompleted:["130/185","152/200"],
      finalThirdPercent:[70,76],

      longBallsCompleted:["25/50","34/84"],
      longBallsPercent:[50,40],

      crossesCompleted:["7/26","5/22"],
      crossesPercent:[27,23]
    },

    duels:{
      possession:[53,47],
      dispossessed:[5,6],

      ground:[46,54],
      groundCompleted:["34/74","40/74"],

      aerial:[65,35],
      aerialCompleted:["28/43","15/43"],

      dribbles:[61,60],
      dribblesCompleted:["11/18","9/15"]
    },

    defending:{
      tacklesWon:[42,33],
      tackles:[12,12],
      interceptions:[8,11],
      recoveries:[64,60],
      clearances:[28,31],

      errorsShot:[1,0],
      errorsGoal:[0,1]
    },

    goalkeeping:{
      saves:[3,3],
      goalsPrevented:[-0.15,-0.70],
      bigSaves:[0,1],
      claims:[1,2],
      punches:[0,0],
      goalKicks:[10,12]
    },

    lineup:{
      home:[
        "Courtois",
        "Castagne",
        "Faes",
        "Vertonghen",
        "Theate",
        "Onana",
        "Tielemans",
        "Doku",
        "De Bruyne",
        "Trossard",
        "Lukaku"
      ],

      away:[
        "Mendy",
        "Sabaly",
        "Koulibaly",
        "Diallo",
        "Jakobs",
        "Gueye",
        "Mendy",
        "Sarr",
        "Dia",
        "Ndiaye",
        "Mane"
      ]
    }
  },

  109: {
    competition: "FIFA World Cup 2026 • Round of 32",
    stadium: "SoFi Stadium • Los Angeles",

    overview: {
      possession:[69,31],
      distance:[98.1,102.3],
      xg:[2.07,0.33],
      bigChances:[5,0],
      shots:[19,5],
      saves:[1,4],
      sprints:[92,99],
      corners:[6,2],
      fouls:[4,13],
      passes:[682,313],
      tackles:[12,10],
      freeKicks:[13,4],
      yellowCards:[2,3],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[7,2],
      hitWoodwork:[1,0],
      offTarget:[6,1],
      blocked:[6,2],
      insideBox:[12,2],
      outsideBox:[7,3]
    },

    attack:{
      bigScored:[2,0],
      bigMissed:[3,0],
      throughBalls:[0,0],
      touchesBox:[35,10],
      fouledThird:[4,1],
      offsides:[1,0]
    },

    passes:{
      accurate:[625,260],
      throwIns:[21,16],
      finalThird:[104,44],

      finalThirdCompleted:["210/243","55/79"],
      finalThirdPercent:[86,70],

      longBallsCompleted:["21/45","24/45"],
      longBallsPercent:[47,53],

      crossesCompleted:["10/39","2/11"],
      crossesPercent:[26,18]
    },

    duels:{
      possession:[55,45],
      dispossessed:[6,9],

      ground:[60,40],
      groundCompleted:["28/47","19/47"],

      aerial:[46,54],
      aerialCompleted:["13/28","15/28"],

      dribbles:[60,63],
      dribblesCompleted:["6/10","5/8"]
    },

    defending:{
      tacklesWon:[58,40],
      tackles:[12,10],
      interceptions:[9,6],
      recoveries:[39,33],
      clearances:[19,45],
      errorsShot:[0,1],
      errorsGoal:[1,1]
    },

    goalkeeping:{
      saves:[1,4],
      goalsPrevented:[-0.22,-0.55],
      bigSaves:[0,2],
      claims:[0,4],
      punches:[0,2],
      goalKicks:[4,10]
    },

    lineup:{
      home:[
        "Alisson",
        "Danilo",
        "Marquinhos",
        "Militao",
        "Alex Sandro",
        "Casemiro",
        "Bruno Guimaraes",
        "Paqueta",
        "Rodrygo",
        "Vinicius Jr",
        "Richarlison"
      ],

      away:[
        "Suzuki",
        "Tomiyasu",
        "Yoshida",
        "Itakura",
        "Ito",
        "Endo",
        "Morita",
        "Kamada",
        "Kubo",
        "Mitoma",
        "Ueda"
      ]
    }
  },

  110: {
    competition: "FIFA World Cup 2026 • Round of 32",
    stadium: "Ullevaal Stadion • Oslo",

    overview: {
      possession:[47,53],
      distance:[94.7,99.7],
      xg:[1.49,1.90],
      bigChances:[3,4],
      shots:[14,9],
      saves:[1,4],
      sprints:[98,126],
      corners:[14,3],
      fouls:[6,7],
      passes:[401,474],
      tackles:[24,19],
      freeKicks:[7,6],
      yellowCards:[0,1],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[5,4],
      hitWoodwork:[0,0],
      offTarget:[9,2],
      blocked:[1,3],
      insideBox:[10,8],
      outsideBox:[4,1]
    },

    attack:{
      bigScored:[1,1],
      bigMissed:[2,3],
      throughBalls:[0,2],
      touchesBox:[48,26],
      fouledThird:[2,1],
      offsides:[2,2]
    },

    passes:{
      accurate:[339,415],
      throwIns:[16,23],
      finalThird:[38,49],

      finalThirdCompleted:["101/129","106/136"],
      finalThirdPercent:[78,78],

      longBallsCompleted:["17/38","16/32"],
      longBallsPercent:[45,50],

      crossesCompleted:["7/29","5/10"],
      crossesPercent:[24,50]
    },

    duels:{
      possession:[55,45],
      dispossessed:[6,9],

      ground:[60,40],
      groundCompleted:["38/63","25/63"],

      aerial:[43,57],
      aerialCompleted:["12/28","16/28"],

      dribbles:[35,17],
      dribblesCompleted:["7/20","3/18"]
    },

    defending:{
      tacklesWon:[75,58],
      tackles:[24,19],
      interceptions:[4,5],
      recoveries:[44,34],
      clearances:[11,37]
    },

    goalkeeping:{
      saves:[1,4],
      goalsPrevented:[0.02,0.40],
      bigSaves:[0,1],
      claims:[0,0],
      punches:[0,2],
      goalKicks:[3,12]
    },

    lineup:{
      home:[
        "Nyland",
        "Ryerson",
        "Ajer",
        "Ostigard",
        "Meling",
        "Berge",
        "Aursnes",
        "Odegaard",
        "Nusa",
        "Sorloth",
        "Haaland"
      ],

      away:[
        "Fofana",
        "Singo",
        "Ndicka",
        "Diomande",
        "Konan",
        "Kessie",
        "Sangare",
        "Adingra",
        "Pépé",
        "Haller",
        "Simon"
      ]
    }
  },

  111: {
    competition: "FIFA World Cup 2026 • Round of 32",
    stadium: "Estadio Azteca • Mexico City",

    overview: {
      possession:[43,57],
      distance:[100.0,83.9],
      xg:[1.05,0.75],
      bigChances:[2,1],
      shots:[15,7],
      saves:[1,1],
      sprints:[95,87],
      corners:[3,8],
      fouls:[10,14],
      passes:[316,410],
      tackles:[10,11],
      freeKicks:[14,10],
      yellowCards:[0,3],
      redCards:[0,1]
    },

    shots:{
      shotsOnTarget:[3,1],
      hitWoodwork:[0,1],
      offTarget:[9,5],
      blocked:[3,1],
      insideBox:[10,5],
      outsideBox:[5,2]
    },

    attack:{
      bigScored:[0,0],
      bigMissed:[2,1],
      throughBalls:[1,1],
      touchesBox:[20,21],
      fouledThird:[1,1],
      offsides:[0,1]
    },

    passes:{
      accurate:[248,341],
      throwIns:[16,22],
      finalThird:[58,72],

      finalThirdCompleted:["60/103","90/133"],
      finalThirdPercent:[58,68],

      longBallsCompleted:["27/58","17/53"],
      longBallsPercent:[47,32],

      crossesCompleted:["4/7","3/25"],
      crossesPercent:[57,12]
    },

    duels:{
      possession:[54,46],
      dispossessed:[6,4],

      ground:[50,50],
      groundCompleted:["29/58","29/58"],

      aerial:[61,39],
      aerialCompleted:["23/38","15/38"],

      dribbles:[55,57],
      dribblesCompleted:["6/11","8/14"]
    },

    defending:{
      tacklesWon:[50,73],
      tackles:[10,11],
      interceptions:[7,6],
      recoveries:[35,34],
      clearances:[39,19],
      errorsShot:[0,0],
      errorsGoal:[0,1]
    },

    goalkeeping:{
      saves:[1,1],
      goalsPrevented:[0.63,-0.86],
      bigSaves:[1,1],
      claims:[1,0],
      punches:[2,0],
      goalKicks:[13,14]
    },

    lineup:{
      home:[
        "Ochoa",
        "Sanchez",
        "Montes",
        "Vasquez",
        "Arteaga",
        "Chavez",
        "Alvarez",
        "Pineda",
        "Lozano",
        "Martin",
        "Antuna"
      ],

      away:[
        "Dominguez",
        "Torres",
        "Hincapie",
        "Pacho",
        "Estupinan",
        "Caicedo",
        "Mendez",
        "Plata",
        "Sarmiento",
        "Valencia",
        "Paez"
      ]
    }
  },

  112: {
    competition: "FIFA World Cup 2026 • Round of 32",
    stadium: "Wembley Stadium • London",

    overview: {
      possession:[60,40],
      distance:[103.0,103.5],
      xg:[2.16,0.77],
      bigChances:[7,1],
      shots:[16,7],
      saves:[1,5],
      sprints:[121,103],
      corners:[5,3],
      fouls:[10,12],
      passes:[517,365],
      tackles:[11,20],
      freeKicks:[12,10],
      yellowCards:[1,1],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[7,2],
      hitWoodwork:[0,1],
      offTarget:[6,3],
      blocked:[3,2],
      insideBox:[13,2],
      outsideBox:[3,5]
    },

    attack:{
      bigScored:[1,0],
      bigMissed:[6,1],
      throughBalls:[2,0],
      touchesBox:[40,11],
      fouledThird:[4,2],
      offsides:[0,4]
    },

    passes:{
      accurate:[468,299],
      throwIns:[15,24],
      finalThird:[77,49],

      finalThirdCompleted:["169/200","58/87"],
      finalThirdPercent:[85,67],

      longBallsCompleted:["19/33","18/46"],
      longBallsPercent:[58,39],

      crossesCompleted:["9/43","1/13"],
      crossesPercent:[21,8]
    },

    duels:{
      possession:[49,51],
      dispossessed:[10,5],

      ground:[45,55],
      groundCompleted:["30/66","36/66"],

      aerial:[61,39],
      aerialCompleted:["14/23","9/23"],

      dribbles:[41,50],
      dribblesCompleted:["7/17","6/12"]
    },

    defending:{
      tacklesWon:[55,40],
      tackles:[11,20],
      interceptions:[7,3],
      recoveries:[44,35],
      clearances:[23,36],
      errorsShot:[0,0],
      errorsGoal:[1,0]
    },

    goalkeeping:{
      saves:[1,5],
      goalsPrevented:[-0.70,0.44],
      bigSaves:[0,2],
      claims:[0,2],
      punches:[0,2],
      goalKicks:[5,16]
    },

    lineup:{
      home:[
        "Pickford",
        "Walker",
        "Stones",
        "Guehi",
        "Shaw",
        "Rice",
        "Bellingham",
        "Foden",
        "Saka",
        "Kane",
        "Gordon"
      ],

      away:[
        "Mpasi",
        "Kalulu",
        "Mbemba",
        "Inonga",
        "Masuaku",
        "Moutoussamy",
        "Pickel",
        "Bongonda",
        "Wissa",
        "Bakambu",
        "Elia"
      ]
    }
  },

  113: {
    competition: "FIFA World Cup 2026 • Round of 32",
    stadium: "Estadio Monumental • Buenos Aires",

    overview: {
      possession:[64,36],
      distance:[116.9,129.0],
      xg:[2.26,0.47],
      bigChances:[3,0],
      shots:[22,16],
      saves:[3,8],
      sprints:[84,98],
      corners:[8,8],
      fouls:[13,12],
      passes:[850,476],
      tackles:[22,19],
      freeKicks:[12,13],
      yellowCards:[1,1],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[10,5],
      hitWoodwork:[0,0],
      offTarget:[5,5],
      blocked:[7,6],
      insideBox:[15,6],
      outsideBox:[7,10]
    },

    attack:{
      bigScored:[1,0],
      bigMissed:[2,0],
      throughBalls:[7,0],
      touchesBox:[52,16],
      fouledThird:[5,2],
      offsides:[3,2]
    },

    passes:{
      accurate:[779,409],
      throwIns:[16,18],
      finalThird:[81,57],

      finalThirdCompleted:["238/286","75/106"],
      finalThirdPercent:[83,71],

      longBallsCompleted:["25/39","23/51"],
      longBallsPercent:[64,45],

      crossesCompleted:["6/15","5/20"],
      crossesPercent:[40,25]
    },

    duels:{
      possession:[51,49],
      dispossessed:[13,10],

      ground:[51,49],
      groundCompleted:["43/85","42/85"],

      aerial:[54,46],
      aerialCompleted:["14/26","12/26"],

      dribbles:[63,50],
      dribblesCompleted:["10/16","12/24"]
    },

    defending:{
      tacklesWon:[59,37],
      tackles:[22,19],
      interceptions:[9,9],
      recoveries:[46,51],
      clearances:[24,26],
      errorsShot:[1,1],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[3,8],
      goalsPrevented:[-0.52,-0.58],
      bigSaves:[2,2],
      claims:[0,0],
      punches:[0,0],
      goalKicks:[11,8]
    },

    lineup:{
      home:[
        "Emiliano Martinez",
        "Nahuel Molina",
        "Cristian Romero",
        "Lisandro Martinez",
        "Nicolas Tagliafico",
        "Rodrigo De Paul",
        "Enzo Fernandez",
        "Alexis Mac Allister",
        "Lionel Messi",
        "Julian Alvarez",
        "Lautaro Martinez"
      ],

      away:[
        "Vozinha (GK)",
        "Steven Moreira",
        "Roberto Lopes",
        "Logan Costa",
        "Joao Paulo",
        "Kevin Pina",
        "Deroy Duarte",
        "Jovane Cabral",
        "Bebe",
        "Ryan Mendes",
        "Gilson Tavares"
      ]
    }
  },

  114: {
    competition: "FIFA World Cup 2026 • Round of 32",
    stadium: "Accor Stadium • Sydney",

    overview: {
      possession:[42,58],
      distance:[126.8,119.1],
      xg:[0.84,1.32],
      bigChances:[0,3],
      shots:[16,14],
      saves:[3,1],
      sprints:[90,70],
      corners:[4,7],
      fouls:[12,14],
      passes:[505,722],
      tackles:[10,15],
      freeKicks:[14,12],
      yellowCards:[0,2],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[1,3],
      hitWoodwork:[1,0],
      offTarget:[6,5],
      blocked:[9,6],
      insideBox:[11,8],
      outsideBox:[5,6]
    },

    attack:{
      bigScored:[0,1],
      bigMissed:[0,2],
      throughBalls:[0,0],
      touchesBox:[34,30],
      fouledThird:[3,2],
      offsides:[0,3]
    },

    passes:{
      accurate:[403,613],
      throwIns:[26,19],
      finalThird:[81,74],

      finalThirdCompleted:["94/148","131/180"],
      finalThirdPercent:[64,73],

      longBallsCompleted:["20/58","36/77"],
      longBallsPercent:[34,47],

      crossesCompleted:["7/25","6/24"],
      crossesPercent:[28,25]
    },

    duels:{
      possession:[51,49],
      dispossessed:[10,3],

      ground:[49,51],
      groundCompleted:["34/69","35/69"],

      aerial:[53,47],
      aerialCompleted:["30/57","27/57"],

      dribbles:[69,56],
      dribblesCompleted:["11/16","9/16"]
    },

    defending:{
      tacklesWon:[70,47],
      tackles:[10,15],
      interceptions:[9,8],
      recoveries:[44,41],
      clearances:[31,37],
      errorsShot:[0,0],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[3,1],
      goalsPrevented:[0.14,-0.93],
      bigSaves:[0,0],
      claims:[0,0],
      punches:[1,1],
      goalKicks:[9,12]
    },

    lineup:{
      home:[
        "Mathew Ryan",
        "Nathaniel Atkinson",
        "Harry Souttar",
        "Kye Rowles",
        "Aziz Behich",
        "Jackson Irvine",
        "Keanu Baccus",
        "Riley McGree",
        "Martin Boyle",
        "Craig Goodwin",
        "Mitchell Duke"
      ],

      away:[
        "Mohamed El Shenawy",
        "Mohamed Hany",
        "Ramy Rabia",
        "Mohamed Abdelmonem",
        "Ahmed Fattouh",
        "Hamdi Fathi",
        "Marwan Attia",
        "Mohamed Elneny",
        "Mostafa Mohamed",
        "Omar Marmoush",
        "Mohamed Salah"
      ]
    }
  },

  115: {
    competition: "FIFA World Cup 2026 • Round of 32",
    stadium: "St. Jakob-Park • Basel",

    overview: {
      possession:[45,55],
      distance:[102.6,101.8],
      xg:[2.45,0.74],
      bigChances:[2,2],
      shots:[11,8],
      saves:[2,2],
      sprints:[108,82],
      corners:[4,2],
      fouls:[10,12],
      passes:[438,563],
      tackles:[20,21],
      freeKicks:[12,10],
      yellowCards:[0,2],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[5,2],
      hitWoodwork:[0,0],
      offTarget:[4,3],
      blocked:[2,3],
      insideBox:[9,5],
      outsideBox:[2,3]
    },

    attack:{
      bigScored:[1,0],
      bigMissed:[1,2],
      throughBalls:[1,0],
      touchesBox:[28,15],
      fouledThird:[1,0],
      offsides:[0,2]
    },

    passes:{
      accurate:[355,478],
      throwIns:[20,17],
      finalThird:[38,71],

      finalThirdCompleted:["55/85","91/136"],
      finalThirdPercent:[65,67],

      longBallsCompleted:["21/52","29/63"],
      longBallsPercent:[40,46],

      crossesCompleted:["4/14","1/6"],
      crossesPercent:[29,17]
    },

    duels:{
      possession:[53,47],
      dispossessed:[9,9],

      ground:[52,48],
      groundCompleted:["45/87","42/87"],

      aerial:[58,42],
      aerialCompleted:["15/26","11/26"],

      dribbles:[52,50],
      dribblesCompleted:["13/25","11/22"]
    },

    defending:{
      tacklesWon:[70,43],
      tackles:[20,21],
      interceptions:[17,10],
      recoveries:[50,55],
      clearances:[23,14],
      errorsShot:[0,0],
      errorsGoal:[0,1]
    },

    goalkeeping:{
      saves:[2,2],
      goalsPrevented:[0.28,-0.71],
      bigSaves:[0,0],
      claims:[0,0],
      punches:[0,0],
      goalKicks:[9,6]
    },

    lineup:{
      home:[
        "Yann Sommer",
        "Silvan Widmer",
        "Manuel Akanji",
        "Nico Elvedi",
        "Ricardo Rodriguez",
        "Granit Xhaka",
        "Remo Freuler",
        "Xherdan Shaqiri",
        "Dan Ndoye",
        "Ruben Vargas",
        "Breel Embolo"
      ],

      away:[
        "Anthony Mandrea",
        "Youcef Atal",
        "Aissa Mandi",
        "Ramiz Zerrouki",
        "Rayan Ait Nouri",
        "Ismael Bennacer",
        "Hicham Boudaoui",
        "Farès Chaibi",
        "Riyad Mahrez",
        "Amine Gouiri",
        "Baghdad Bounedjah"
      ]
    }
  },

  116: {
    competition: "FIFA World Cup 2026 • Round of 32",
    stadium: "Estadio Metropolitano Roberto Meléndez • Barranquilla",

    overview: {
      possession:[61,39],
      distance:[99.9,99.6],
      xg:[2.04,0.27],
      bigChances:[5,0],
      shots:[20,8],
      saves:[0,7],
      sprints:[128,139],
      corners:[3,2],
      fouls:[14,10],
      passes:[586,376],
      tackles:[12,13],
      freeKicks:[10,14],
      yellowCards:[2,3],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[8,0],
      hitWoodwork:[0,0],
      offTarget:[8,3],
      blocked:[4,5],
      insideBox:[12,2],
      outsideBox:[8,6]
    },

    attack:{
      bigScored:[1,0],
      bigMissed:[4,0],
      throughBalls:[0,0],
      touchesBox:[19,8],
      fouledThird:[1,0],
      offsides:[2,0]
    },

    passes:{
      accurate:[532,312],
      throwIns:[15,16],
      finalThird:[54,52],

      finalThirdCompleted:["98/120","47/86"],
      finalThirdPercent:[82,55],

      longBallsCompleted:["32/55","9/46"],
      longBallsPercent:[58,20],

      crossesCompleted:["5/15","2/15"],
      crossesPercent:[33,13]
    },

    duels:{
      possession:[49,51],
      dispossessed:[6,7],

      ground:[45,55],
      groundCompleted:["27/60","33/60"],

      aerial:[67,33],
      aerialCompleted:["8/12","4/12"],

      dribbles:[42,55],
      dribblesCompleted:["5/12","6/11"]
    },

    defending:{
      tacklesWon:[67,54],
      tackles:[12,13],
      interceptions:[5,5],
      recoveries:[41,42],
      clearances:[24,11],
      errorsShot:[0,1],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[0,7],
      goalsPrevented:[0.00,1.69],
      bigSaves:[0,4],
      claims:[0,0],
      punches:[0,1],
      goalKicks:[9,12]
    },

    lineup:{
      home:[
        "Camilo Vargas",
        "Daniel Muñoz",
        "Davinson Sánchez",
        "Carlos Cuesta",
        "Johan Mojica",
        "Jefferson Lerma",
        "Richard Ríos",
        "James Rodríguez",
        "Luis Díaz",
        "Jhon Arias",
        "Rafael Santos Borré"
      ],

      away:[
        "Lawrence Ati-Zigi",
        "Denis Odoi",
        "Alexander Djiku",
        "Mohammed Salisu",
        "Gideon Mensah",
        "Thomas Partey",
        "Elisha Owusu",
        "Mohammed Kudus",
        "Ernest Nuamah",
        "Jordan Ayew",
        "Antoine Semenyo"
      ]
    }
  },

  201: {
    competition: "FIFA World Cup 2026 • Round of 16",
    stadium: "Parc des Princes • Paris",

    overview: {
      possession:[24,76],
      distance:[89.4,84.1],
      xg:[0.13,1.45],
      bigChances:[0,2],
      shots:[5,15],
      saves:[4,1],
      sprints:[74,57],
      corners:[2,12],
      fouls:[13,11],
      passes:[183,569],
      tackles:[29,13],
      freeKicks:[11,12],
      yellowCards:[0,3],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[1,5],
      hitWoodwork:[0,0],
      offTarget:[4,6],
      blocked:[1,4],
      insideBox:[1,5],
      outsideBox:[4,10]
    },

    attack:{
      bigScored:[0,1],
      bigMissed:[0,1],
      throughBalls:[0,0],
      touchesBox:[4,25],
      fouledThird:[0,3],
      offsides:[0,0]
    },

    passes:{
      accurate:[98,510],
      throwIns:[19,17],
      finalThird:[42,87],

      finalThirdCompleted:["13/50","198/233"],
      finalThirdPercent:[26,85],

      longBallsCompleted:["12/55","23/39"],
      longBallsPercent:[22,59],

      crossesCompleted:["0/5","1/22"],
      crossesPercent:[0,5]
    },

    duels:{
      possession:[47,53],
      dispossessed:[3,14],

      ground:[53,47],
      groundCompleted:["44/83","39/83"],

      aerial:[26,74],
      aerialCompleted:["6/23","17/23"],

      dribbles:[29,50],
      dribblesCompleted:["4/14","15/30"]
    },

    defending:{
      tacklesWon:[72,54],
      tackles:[29,13],
      interceptions:[14,10],
      recoveries:[39,49],
      clearances:[21,27],
      errorsShot:[1,1],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[4,1],
      goalsPrevented:[0.88,0.37],
      bigSaves:[2,0],
      claims:[1,3],
      punches:[1,1],
      goalKicks:[12,7]
    },

    lineup:{
      home:[
        "Carlos Coronel",
        "Robert Rojas",
        "Gustavo Gómez",
        "Omar Alderete",
        "Blas Riveros",
        "Andrés Cubas",
        "Mathías Villasanti",
        "Miguel Almirón",
        "Julio Enciso",
        "Ramón Sosa",
        "Gabriel Ávalos"
      ],

      away:[
        "Mike Maignan",
        "Jules Koundé",
        "William Saliba",
        "Dayot Upamecano",
        "Theo Hernández",
        "Aurélien Tchouaméni",
        "Adrien Rabiot",
        "Antoine Griezmann",
        "Ousmane Dembélé",
        "Kylian Mbappé",
        "Marcus Thuram"
      ]
    }
  },

  202: {
    competition: "FIFA World Cup 2026 • Round of 16",
    stadium: "BMO Field • Toronto",

    overview: {
      possession:[45,55],
      distance:[107.4,100.5],
      xg:[0.84,0.82],
      bigChances:[1,2],
      shots:[10,5],
      saves:[1,3],
      sprints:[154,133],
      corners:[11,1],
      fouls:[24,14],
      passes:[359,473],
      tackles:[18,13],
      freeKicks:[14,24],
      yellowCards:[4,4],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[3,4],
      hitWoodwork:[0,1],
      offTarget:[4,1],
      blocked:[3,0],
      insideBox:[6,3],
      outsideBox:[4,2]
    },

    attack:{
      bigScored:[0,1],
      bigMissed:[1,1],
      throughBalls:[0,0],
      touchesBox:[33,9],
      fouledThird:[4,1],
      offsides:[2,3]
    },

    duels:{
      possession:[48,52],
      dispossessed:[8,10],

      ground:[48,52],
      groundCompleted:["37/77","40/77"],

      aerial:[47,53],
      aerialCompleted:["17/36","19/36"],

      dribbles:[50,43],
      dribblesCompleted:["5/10","6/14"]
    },

    passes:{
      accurate:[272,388],
      throwIns:[24,23],
      finalThird:[57,37],

      finalThirdCompleted:["87/137","34/62"],
      finalThirdPercent:[64,55],

      longBallsCompleted:["12/31","17/51"],
      longBallsPercent:[39,33],

      crossesCompleted:["8/30","1/5"],
      crossesPercent:[27,20]
    },

    defending:{
      tacklesWon:[50,69],
      tackles:[18,13],
      interceptions:[5,9],
      recoveries:[43,44],
      clearances:[10,47],
      errorsShot:[1,0],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[1,3],
      goalsPrevented:[-0.85,0.53],
      bigSaves:[0,1],
      claims:[0,2],
      punches:[0,3],
      goalKicks:[1,3]
    },

    lineup:{
      home:[
        "Milan Borjan",
        "Alistair Johnston",
        "Moise Bombito",
        "Derek Cornelius",
        "Alphonso Davies",
        "Ismaël Koné",
        "Stephen Eustáquio",
        "Tajon Buchanan",
        "Jonathan David",
        "Cyle Larin",
        "Jacob Shaffelburg"
      ],

      away:[
        "Yassine Bounou",
        "Achraf Hakimi",
        "Nayef Aguerd",
        "Romain Saïss",
        "Noussair Mazraoui",
        "Sofyan Amrabat",
        "Azzedine Ounahi",
        "Hakim Ziyech",
        "Brahim Díaz",
        "Abde Ezzalzouli",
        "Youssef En-Nesyri"
      ]
    }
  },

  203: {
    competition: "FIFA World Cup 2026 • Round of 16",
    stadium: "Estádio da Luz • Lisbon",

    overview: {
      possession:[45,55],
      distance:[101.0,101.9],
      xg:[0.63,1.69],
      bigChances:[1,3],
      shots:[10,15],
      saves:[5,2],
      sprints:[102,99],
      corners:[3,7],
      fouls:[9,13],
      passes:[427,530],
      tackles:[14,18],
      freeKicks:[13,9],
      yellowCards:[2,1],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[2,6],
      hitWoodwork:[1,0],
      offTarget:[5,6],
      blocked:[3,3],
      insideBox:[7,8],
      outsideBox:[3,7]
    },

    attack:{
      bigScored:[0,1],
      bigMissed:[1,2],
      throughBalls:[0,4],
      touchesBox:[11,27],
      fouledThird:[2,3],
      offsides:[2,1]
    },

    duels:{
      possession:[57,43],
      dispossessed:[5,9],

      ground:[54,46],
      groundCompleted:["36/67","31/67"],

      aerial:[73,27],
      aerialCompleted:["11/15","4/15"],

      dribbles:[43,50],
      dribblesCompleted:["10/23","5/10"]
    },

    passes:{
      accurate:[357,467],
      throwIns:[20,17],
      finalThird:[59,47],

      finalThirdCompleted:["81/115","121/152"],
      finalThirdPercent:[70,80],

      longBallsCompleted:["23/52","16/33"],
      longBallsPercent:[44,48],

      crossesCompleted:["4/13","1/16"],
      crossesPercent:[31,6]
    },

    defending:{
      tacklesWon:[64,72],
      tackles:[14,18],
      interceptions:[7,6],
      recoveries:[50,47],
      clearances:[23,13],
      errorsShot:[4,1],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[5,2],
      goalsPrevented:[0.46,0.89],
      bigSaves:[1,0],
      claims:[2,2],
      punches:[1,0],
      goalKicks:[6,6]
    },

    lineup:{
      home:[
        "Diogo Costa",
        "João Cancelo",
        "Rúben Dias",
        "Pepe",
        "Nuno Mendes",
        "Vitinha",
        "João Neves",
        "Bruno Fernandes",
        "Bernardo Silva",
        "Rafael Leão",
        "Cristiano Ronaldo"
      ],

      away:[
        "Unai Simón",
        "Dani Carvajal",
        "Robin Le Normand",
        "Aymeric Laporte",
        "Alejandro Grimaldo",
        "Rodri",
        "Pedri",
        "Fabián Ruiz",
        "Lamine Yamal",
        "Nico Williams",
        "Álvaro Morata"
      ]
    }
  },

  204: {
    competition: "FIFA World Cup 2026 • Round of 16",
    stadium: "MetLife Stadium • New York",

    overview: {
      possession:[56,44],
      distance:[103.9,102.9],
      xg:[0.63,2.01],
      bigChances:[0,4],
      shots:[7,15],
      saves:[3,1],
      sprints:[83,93],
      corners:[3,5],
      fouls:[11,9],
      passes:[527,414],
      tackles:[20,22],
      freeKicks:[9,11],
      yellowCards:[2,0],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[2,7],
      hitWoodwork:[0,0],
      offTarget:[5,4],
      blocked:[0,4],
      insideBox:[5,10],
      outsideBox:[2,5]
    },

    attack:{
      bigScored:[0,2],
      bigMissed:[0,2],
      throughBalls:[2,0],
      touchesBox:[12,22],
      fouledThird:[1,0],
      offsides:[0,1]
    },

    duels:{
      possession:[49,51],
      dispossessed:[14,10],

      ground:[48,52],
      groundCompleted:["40/83","43/83"],

      aerial:[50,50],
      aerialCompleted:["12/24","12/24"],

      dribbles:[58,50],
      dribblesCompleted:["11/19","10/20"]
    },

    passes:{
      accurate:[459,334],
      throwIns:[25,18],
      finalThird:[66,46],

      finalThirdCompleted:["98/139","61/97"],
      finalThirdPercent:[71,63],

      longBallsCompleted:["19/36","18/60"],
      longBallsPercent:[53,30],

      crossesCompleted:["2/11","5/15"],
      crossesPercent:[18,33]
    },

    defending:{
      tacklesWon:[45,45],
      tackles:[20,22],
      interceptions:[9,9],
      recoveries:[51,54],
      clearances:[23,18],
      errorsShot:[2,1],
      errorsGoal:[3,0]
    },

    goalkeeping:{
      saves:[3,1],
      goalsPrevented:[-0.49,-0.78],
      bigSaves:[1,0],
      claims:[1,1],
      punches:[0,0],
      goalKicks:[6,7]
    },

    lineup:{
      home:[
        "Matt Turner",
        "Sergiño Dest",
        "Chris Richards",
        "Tim Ream",
        "Antonee Robinson",
        "Tyler Adams",
        "Weston McKennie",
        "Yunus Musah",
        "Christian Pulisic",
        "Tim Weah",
        "Folarin Balogun"
      ],

      away:[
        "Koen Casteels",
        "Timothy Castagne",
        "Wout Faes",
        "Jan Vertonghen",
        "Arthur Theate",
        "Amadou Onana",
        "Youri Tielemans",
        "Kevin De Bruyne",
        "Jérémy Doku",
        "Leandro Trossard",
        "Romelu Lukaku"
      ]
    }
  },

  205: {
    competition: "FIFA World Cup 2026 • Round of 16",
    stadium: "SoFi Stadium • Los Angeles",

    overview: {
      possession:[34,66],
      distance:[97.3,104.7],
      xg:[2.61,1.05],
      bigChances:[5,3],
      shots:[14,9],
      saves:[3,4],
      sprints:[93,100],
      corners:[5,5],
      fouls:[7,6],
      passes:[331,681],
      tackles:[23,14],
      freeKicks:[4,7],
      yellowCards:[1,0],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[4,5],
      hitWoodwork:[1,0],
      offTarget:[6,3],
      blocked:[4,1],
      insideBox:[10,7],
      outsideBox:[4,2]
    },

    attack:{
      bigScored:[1,1],
      bigMissed:[4,2],
      throughBalls:[1,0],
      touchesBox:[33,15],
      fouledThird:[3,1],
      offsides:[1,1]
    },

    duels:{
      possession:[50,50],
      dispossessed:[6,15],

      ground:[55,45],
      groundCompleted:["39/71","32/71"],

      aerial:[27,73],
      aerialCompleted:["4/15","11/15"],

      dribbles:[56,60],
      dribblesCompleted:["10/18","12/20"]
    },

    passes:{
      accurate:[279,618],
      throwIns:[13,14],
      finalThird:[46,72],

      finalThirdCompleted:["99/121","171/211"],
      finalThirdPercent:[82,81],

      longBallsCompleted:["17/39","29/54"],
      longBallsPercent:[44,54],

      crossesCompleted:["1/16","1/13"],
      crossesPercent:[6,8]
    },

    defending:{
      tacklesWon:[43,79],
      tackles:[23,14],
      interceptions:[11,6],
      recoveries:[40,40],
      clearances:[21,18],
      errorsShot:[1,1],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[3,4],
      goalsPrevented:[-0.34,0.76],
      bigSaves:[2,3],
      claims:[0,1],
      punches:[0,1],
      goalKicks:[4,8]
    },

    lineup:{
      home:[
        "Alisson Becker",
        "Danilo",
        "Marquinhos",
        "Gabriel Magalhães",
        "Guilherme Arana",
        "Bruno Guimarães",
        "João Gomes",
        "Lucas Paquetá",
        "Vinícius Júnior",
        "Rodrygo",
        "Endrick"
      ],

      away:[
        "Ørjan Nyland",
        "Julian Ryerson",
        "Kristoffer Ajer",
        "Leo Østigård",
        "Birger Meling",
        "Martin Ødegaard",
        "Sander Berge",
        "Patrick Berg",
        "Antonio Nusa",
        "Alexander Sørloth",
        "Erling Haaland"
      ]
    }
  },

  206: {
    competition: "FIFA World Cup 2026 • Round of 16",
    stadium: "AT&T Stadium • Arlington",

    overview: {
      possession:[67,33],
      distance:[91.6,91.6],
      xg:[1.88,1.61],
      bigChances:[2,3],
      shots:[20,6],
      saves:[2,3],
      sprints:[61,60],
      corners:[12,2],
      fouls:[14,7],
      passes:[454,244],
      tackles:[16,18],
      freeKicks:[6,13],
      yellowCards:[2,4],
      redCards:[0,1]
    },

    shots:{
      shotsOnTarget:[5,5],
      hitWoodwork:[0,1],
      offTarget:[8,1],
      blocked:[7,0],
      insideBox:[12,4],
      outsideBox:[8,2]
    },

    attack:{
      bigScored:[2,3],
      bigMissed:[0,0], // not shown in stats panel
      throughBalls:[0,1],
      touchesBox:[37,14],
      fouledThird:[2,1],
      offsides:[1,0]
    },

    duels:{
      possession:[43,57],
      dispossessed:[12,6],

      ground:[40,60],
      groundCompleted:["27/67","40/67"],

      aerial:[50,50],
      aerialCompleted:["11/22","11/22"],

      dribbles:[45,47],
      dribblesCompleted:["5/11","9/19"]
    },

    passes:{
      accurate:[418,195],
      throwIns:[24,12],
      finalThird:[75,38],

      finalThirdCompleted:["160/189","29/59"],
      finalThirdPercent:[85,49],

      longBallsCompleted:["30/42","22/45"],
      longBallsPercent:[71,49],

      crossesCompleted:["13/52","1/4"],
      crossesPercent:[25,25]
    },

    defending:{
      tacklesWon:[50,50],
      tackles:[16,18],
      interceptions:[7,4],
      recoveries:[32,30],
      clearances:[13,49],
      errorsShot:[1,1],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[2,3],
      goalsPrevented:[-0.02,-0.18],
      bigSaves:[0,2],
      claims:[0,1],
      punches:[1,5],
      goalKicks:[4,13]
    },

    lineup:{
      home:[
        "Guillermo Ochoa",
        "Jorge Sánchez",
        "César Montes",
        "Johan Vásquez",
        "Jesús Gallardo",
        "Edson Álvarez",
        "Luis Chávez",
        "Orbelín Pineda",
        "Hirving Lozano",
        "Santiago Giménez",
        "Alexis Vega"
      ],

      away:[
        "Jordan Pickford",
        "Kyle Walker",
        "John Stones",
        "Marc Guéhi",
        "Luke Shaw",
        "Declan Rice",
        "Jude Bellingham",
        "Phil Foden",
        "Bukayo Saka",
        "Harry Kane",
        "Cole Palmer"
      ]
    }
  },

  207: {
    competition: "FIFA World Cup 2026 • Round of 16",
    stadium: "MetLife Stadium • New York",

    overview: {
      possession:[64,36],
      distance:[96.6,104.4],
      xg:[2.84,0.89],
      bigChances:[6,2],
      shots:[19,5],
      saves:[0,4],
      sprints:[94,99],
      corners:[6,1],
      fouls:[13,11],
      passes:[602,349],
      tackles:[20,16],
      freeKicks:[10,13],
      yellowCards:[0,4],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[7,2],
      hitWoodwork:[1,0],
      offTarget:[8,3],
      blocked:[4,1],
      insideBox:[11,4],
      outsideBox:[8,1]
    },

    attack:{
      bigScored:[2,2],
      bigMissed:[4,0],
      throughBalls:[2,1],
      touchesBox:[34,8],
      fouledThird:[6,1],
      offsides:[3,0]
    },

    duels:{
      possession:[52,48],
      dispossessed:[11,5],

      ground:[51,49],
      groundCompleted:["42/82","40/82"],

      aerial:[53,47],
      aerialCompleted:["8/15","7/15"],

      dribbles:[69,42],
      dribblesCompleted:["11/16","11/26"]
    },

    passes:{
      accurate:[541,287],
      throwIns:[19,25],
      finalThird:[73,27],

      finalThirdCompleted:["191/232","36/53"],
      finalThirdPercent:[82,68],

      longBallsCompleted:["18/30","13/37"],
      longBallsPercent:[60,35],

      crossesCompleted:["8/26","2/8"],
      crossesPercent:[31,25]
    },

    defending:{
      tacklesWon:[75,44],
      tackles:[20,16],
      interceptions:[7,9],
      recoveries:[48,36],
      clearances:[14,44],
      errorsShot:[1,0],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[0,4],
      goalsPrevented:[-0.79,-0.34],
      bigSaves:[0,2],
      claims:[0,1],
      punches:[0,3],
      goalKicks:[2,13]
    },

    lineup:{
      home:[
        "Emiliano Martínez",
        "Nahuel Molina",
        "Cristian Romero",
        "Lisandro Martínez",
        "Nicolás Tagliafico",
        "Rodrigo De Paul",
        "Enzo Fernández",
        "Alexis Mac Allister",
        "Lionel Messi",
        "Julián Álvarez",
        "Alejandro Garnacho"
      ],

      away:[
        "Mohamed El Shenawy",
        "Mohamed Hany",
        "Ahmed Hegazy",
        "Mohamed Abdelmonem",
        "Mohamed Hamdy",
        "Hamdi Fathi",
        "Marwan Attia",
        "Emam Ashour",
        "Omar Marmoush",
        "Mostafa Mohamed",
        "Mohamed Salah"
      ]
    }
  },

  208: {
    competition: "FIFA World Cup 2026 • Round of 16",
    stadium: "Rose Bowl • Pasadena",

    overview: {
      possession:[53,47],
      distance:[117.1,121.8],
      xg:[0.39,1.09],
      bigChances:[0,2],
      shots:[7,15],
      saves:[3,2],
      sprints:[97,108],
      corners:[3,7],
      fouls:[22,21],
      passes:[631,547],
      tackles:[12,17],
      freeKicks:[21,22],
      yellowCards:[3,2],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[2,3],
      hitWoodwork:[0,2],
      offTarget:[4,8],
      blocked:[1,4],
      insideBox:[4,9],
      outsideBox:[3,6]
    },

    attack:{
      bigScored:[0,0],
      bigMissed:[0,2],
      throughBalls:[1,0],
      touchesBox:[18,21],
      fouledThird:[2,4],
      offsides:[5,4]
    },

    duels:{
      possession:[49,51],
      dispossessed:[6,6],

      ground:[45,55],
      groundCompleted:["39/86","47/86"],

      aerial:[58,42],
      aerialCompleted:["19/33","14/33"],

      dribbles:[42,63],
      dribblesCompleted:["8/19","10/16"]
    },

    passes:{
      accurate:[547,454],
      throwIns:[22,19],
      finalThird:[65,58],

      finalThirdCompleted:["101/144","62/104"],
      finalThirdPercent:[70,60],

      longBallsCompleted:["32/62","33/79"],
      longBallsPercent:[52,42],

      crossesCompleted:["1/15","3/19"],
      crossesPercent:[7,16]
    },

    defending:{
      tacklesWon:[58,47],
      tackles:[12,17],
      interceptions:[14,13],
      recoveries:[49,56],
      clearances:[35,22],
      errorsShot:[2,1],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[3,2],
      goalsPrevented:[0.85,0.09],
      bigSaves:[2,0],
      claims:[1,0],
      punches:[0,0],
      goalKicks:[11,9]
    },

    lineup:{
      home:[
        "Yann Sommer",
        "Silvan Widmer",
        "Manuel Akanji",
        "Nico Elvedi",
        "Ricardo Rodríguez",
        "Granit Xhaka",
        "Remo Freuler",
        "Dan Ndoye",
        "Xherdan Shaqiri",
        "Ruben Vargas",
        "Breel Embolo"
      ],

      away:[
        "Camilo Vargas",
        "Daniel Muñoz",
        "Davinson Sánchez",
        "Carlos Cuesta",
        "Johan Mojica",
        "Jefferson Lerma",
        "Richard Ríos",
        "James Rodríguez",
        "Luis Díaz",
        "Jhon Arias",
        "Rafael Santos Borré"
      ]
    }
  },

  301: {
    competition: "FIFA World Cup 2026 • Quarter Final",
    stadium: "MetLife Stadium • New Jersey",

    overview: {
      possession:[48,52],
      distance:[95.6,97.5],
      xg:[3.69,0.14],
      bigChances:[6,0],
      shots:[22,5],
      saves:[1,6],
      sprints:[114,99],
      corners:[5,5],
      fouls:[10,13],
      passes:[486,526],
      tackles:[11,16],
      freeKicks:[12,10],
      yellowCards:[0,1],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[8,1],
      hitWoodwork:[1,0],
      offTarget:[9,3],
      blocked:[5,1],
      insideBox:[12,1],
      outsideBox:[10,4]
    },

    attack:{
      bigScored:[0,0], 
      bigMissed:[6,0],
      throughBalls:[0,0],
      touchesBox:[28,8],
      fouledThird:[3,5],
      offsides:[0,0] 
    },

    duels:{
      possession:[54,46],
      dispossessed:[4,3],

      ground:[47,53],
      groundCompleted:["31/66","35/66"],

      aerial:[92,8],
      aerialCompleted:["12/13","1/13"],

      dribbles:[43,58],
      dribblesCompleted:["9/21","11/19"]
    },

    passes:{
      accurate:[432,452],
      throwIns:[17,18],
      finalThird:[64,35],

      finalThirdCompleted:["141/180","85/111"],
      finalThirdPercent:[78,77],

      longBallsCompleted:["14/30","11/39"],
      longBallsPercent:[47,28],

      crossesCompleted:["5/12","2/13"],
      crossesPercent:[42,15]
    },

    defending:{
      tacklesWon:[73,31],
      tackles:[11,16],
      interceptions:[13,6],
      recoveries:[42,41],
      clearances:[20,12],
      errorsShot:[0,3],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[1,6],
      goalsPrevented:[0.04,0.88],
      bigSaves:[0,3],
      claims:[1,0],
      punches:[0,0],
      goalKicks:[7,13]
    },

    lineup:{
      home:[
        "Mike Maignan",
        "Jules Koundé",
        "William Saliba",
        "Dayot Upamecano",
        "Theo Hernández",
        "Aurélien Tchouaméni",
        "Eduardo Camavinga",
        "Antoine Griezmann",
        "Ousmane Dembélé",
        "Kylian Mbappé",
        "Randal Kolo Muani"
      ],

      away:[
        "Yassine Bounou",
        "Achraf Hakimi",
        "Nayef Aguerd",
        "Romain Saïss",
        "Noussair Mazraoui",
        "Sofyan Amrabat",
        "Azzedine Ounahi",
        "Bilal El Khannouss",
        "Hakim Ziyech",
        "Sofiane Boufal",
        "Youssef En-Nesyri"
      ]
    }
  },

  302: {
    competition: "FIFA World Cup 2026 • Quarter Final",
    stadium: "MetLife Stadium • New Jersey",

    overview: {
      possession:[68,32],
      distance:[103.5,105.8],
      xg:[1.96,0.34],
      bigChances:[2,1],
      shots:[17,5],
      saves:[1,6],
      sprints:[85,69],
      corners:[5,1],
      fouls:[13,18],
      passes:[664,312],
      tackles:[11,10],
      freeKicks:[18,13],
      yellowCards:[2,2],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[8,2],
      hitWoodwork:[0,0],
      offTarget:[4,1],
      blocked:[5,2],
      insideBox:[10,4],
      outsideBox:[7,1]
    },

    attack:{
      bigScored:[2,1],
      bigMissed:[0,0],
      throughBalls:[3,1],
      touchesBox:[41,11],
      fouledThird:[3,1],
      offsides:[3,1]
    },

    duels:{
      possession:[51,49],
      dispossessed:[4,6],

      ground:[55,45],
      groundCompleted:["35/64","29/64"],

      aerial:[37,63],
      aerialCompleted:["7/19","12/19"],

      dribbles:[57,58],
      dribblesCompleted:["8/14","7/12"]
    },

    passes:{
      accurate:[598,243],
      throwIns:[22,15],
      finalThird:[64,33],

      finalThirdCompleted:["229/270","45/71"],
      finalThirdPercent:[85,63],

      longBallsCompleted:["19/35","20/45"],
      longBallsPercent:[54,44],

      crossesCompleted:["2/20","2/11"],
      crossesPercent:[10,18]
    },

    defending:{
      tacklesWon:[55,60],
      tackles:[11,10],
      interceptions:[5,9],
      recoveries:[49,39],
      clearances:[15,34],
      errorsShot:[1,1],
      errorsGoal:[0,1]
    },

    goalkeeping:{
      saves:[1,6],
      goalsPrevented:[-0.62,0.90],
      bigSaves:[0,2],
      claims:[0,0], 
      punches:[0,1],
      goalKicks:[4,13]
    },

    lineup:{
      home:[
        "Unai Simon",
        "Dani Carvajal",
        "Robin Le Normand",
        "Aymeric Laporte",
        "Alejandro Balde",
        "Rodri",
        "Pedri",
        "Gavi",
        "Lamine Yamal",
        "Nico Williams",
        "Alvaro Morata"
      ],

      away:[
        "Thibaut Courtois",
        "Timothy Castagne",
        "Wout Faes",
        "Jan Vertonghen",
        "Arthur Theate",
        "Amadou Onana",
        "Youri Tielemans",
        "Kevin De Bruyne",
        "Jeremy Doku",
        "Leandro Trossard",
        "Romelu Lukaku"
      ]
    }
  },

  303: {
    competition: "FIFA World Cup 2026 • Quarter Final",
    stadium: "MetLife Stadium • New Jersey",

    overview: {
      possession:[48,52],
      distance:[137.7,130.3],
      xg:[0.68,1.04],
      bigChances:[1,2],
      shots:[13,14],
      saves:[6,3],
      sprints:[106,96],
      corners:[7,4],
      fouls:[10,8],
      passes:[577,628],
      tackles:[24,15],
      freeKicks:[8,10],
      yellowCards:[1,0],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[4,8],
      hitWoodwork:[1,0],
      offTarget:[6,3],
      blocked:[3,3],
      insideBox:[10,8],
      outsideBox:[3,6]
    },

    attack:{
      bigScored:[1,2],
      bigMissed:[1,1],
      throughBalls:[0,0], // not shown in stats
      touchesBox:[28,31],
      fouledThird:[1,3],
      offsides:[1,5]
    },

    duels:{
      possession:[48,52],
      dispossessed:[6,13],

      ground:[47,53],
      groundCompleted:["36/77","41/77"],

      aerial:[52,48],
      aerialCompleted:["13/25","12/25"],

      dribbles:[40,59],
      dribblesCompleted:["6/15","16/27"]
    },

    passes:{
      accurate:[494,567],
      throwIns:[16,27],
      finalThird:[62,72],

      finalThirdCompleted:["124/165","138/166"],
      finalThirdPercent:[75,83],

      longBallsCompleted:["18/46","25/50"],
      longBallsPercent:[39,50],

      crossesCompleted:["3/19","9/21"],
      crossesPercent:[16,43]
    },

    defending:{
      tacklesWon:[46,60],
      tackles:[24,15],
      interceptions:[9,6],
      recoveries:[43,44],
      clearances:[21,35],
      errorsShot:[1,1],
      errorsGoal:[1,0]
    },

    goalkeeping:{
      saves:[6,3],
      goalsPrevented:[0.64,-0.58],
      bigSaves:[0,2],
      punches:[0,2],
      claims:[0,0],
      goalKicks:[10,7]
    },

    lineup:{
      home:[
        "Orjan Nyland",
        "Julian Ryerson",
        "Leo Ostigard",
        "Kristoffer Ajer",
        "Birger Meling",
        "Martin Odegaard",
        "Sander Berge",
        "Patrick Berg",
        "Antonio Nusa",
        "Alexander Sorloth",
        "Erling Haaland"
      ],

      away:[
        "Jordan Pickford",
        "Kyle Walker",
        "John Stones",
        "Marc Guehi",
        "Luke Shaw",
        "Declan Rice",
        "Jude Bellingham",
        "Phil Foden",
        "Bukayo Saka",
        "Cole Palmer",
        "Harry Kane"
      ]
    }
  },

  304: {
    competition: "FIFA World Cup 2026 • Quarter Final",
    stadium: "MetLife Stadium • New Jersey",

    overview: {
      possession:[59,41],
      distance:[0,0], // not visible in screenshot
      xg:[1.94,0.47],
      bigChances:[3,1],
      shots:[22,11],
      saves:[4,4],
      sprints:[0,0], // not visible in screenshot
      corners:[8,2],
      fouls:[14,18],
      passes:[691,474],
      tackles:[17,11],
      freeKicks:[18,14],
      yellowCards:[3,2],
      redCards:[0,1]
    },

    shots:{
      shotsOnTarget:[7,5],
      hitWoodwork:[1,0],
      offTarget:[8,3],
      blocked:[7,3],
      insideBox:[12,5],
      outsideBox:[10,6]
    },

    attack:{
      bigScored:[1,1],
      bigMissed:[2,0],
      throughBalls:[1,1],
      touchesBox:[34,20],
      fouledThird:[2,4],
      offsides:[4,3]
    },

    duels:{
      possession:[58,42],
      dispossessed:[7,8],

      ground:[58,42],
      groundCompleted:["42/72","30/72"],

      aerial:[59,41],
      aerialCompleted:["20/34","14/34"],

      dribbles:[75,36],
      dribblesCompleted:["12/16","5/14"]
    },

    passes:{
      accurate:[614,398],
      throwIns:[19,16],
      finalThird:[73,69],

      finalThirdCompleted:["221/260","106/149"],
      finalThirdPercent:[85,71],

      longBallsCompleted:["22/51","22/53"],
      longBallsPercent:[43,42],

      crossesCompleted:["7/22","3/19"],
      crossesPercent:[32,16]
    },

    defending:{
      tacklesWon:[47,45],
      tackles:[17,11],
      interceptions:[13,4],
      recoveries:[47,50],
      clearances:[31,28],
      errorsShot:[0,1],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[4,4],
      goalsPrevented:[0.02,0.65],
      bigSaves:[1,1],
      claims:[2,2],
      punches:[1,0],
      goalKicks:[8,11]
    },

    lineup:{
      home:[
        "Emiliano Martinez",
        "Nahuel Molina",
        "Cristian Romero",
        "Lisandro Martinez",
        "Nicolas Tagliafico",
        "Rodrigo De Paul",
        "Enzo Fernandez",
        "Alexis Mac Allister",
        "Lionel Messi",
        "Julian Alvarez",
        "Lautaro Martinez"
      ],

      away:[
        "Yann Sommer",
        "Silvan Widmer",
        "Manuel Akanji",
        "Nico Elvedi",
        "Ricardo Rodriguez",
        "Granit Xhaka",
        "Remo Freuler",
        "Dan Ndoye",
        "Xherdan Shaqiri",
        "Ruben Vargas",
        "Breel Embolo"
      ]
    }
  },

  401: {
    competition: "FIFA World Cup 2026 • Semi Final",
    stadium: "AT&T Stadium • Arlington, Texas",

    overview: {
      possession:[49,51],
      distance:[102.4,102.7],
      xg:[0.31,1.63],
      bigChances:[0,3],
      shots:[10,10],
      saves:[0,3],
      sprints:[98,116],
      corners:[7,1],
      fouls:[11,12],
      passes:[472,502],
      tackles:[13,22],
      freeKicks:[12,10],
      yellowCards:[2,1],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[3,2],
      hitWoodwork:[0,0],
      offTarget:[5,5],
      blocked:[2,3],
      insideBox:[4,5],
      outsideBox:[6,5]
    },

    attack:{
      bigScored:[0,2],
      bigMissed:[0,1],
      throughBalls:[1,0],
      touchesBox:[19,13],
      fouledThird:[3,3],
      offsides:[4,5]
    },

    duels:{
      possession:[46,54],
      dispossessed:[9,10],

      ground:[51,49],
      groundCompleted:["36/71","35/71"],

      aerial:[32,68],
      aerialCompleted:["8/25","17/25"],

      dribbles:[46,40],
      dribblesCompleted:["11/24","2/5"]
    },

    passes:{
      accurate:[395,427],
      throwIns:[22,16],
      finalThird:[45,36],

      finalThirdCompleted:["91/118","61/80"],
      finalThirdPercent:[77,76],

      longBallsCompleted:["19/36","14/51"],
      longBallsPercent:[53,27],

      crossesCompleted:["4/20","1/7"],
      crossesPercent:[20,14]
    },

    defending:{
      tacklesWon:[62,64],
      tackles:[13,22],
      interceptions:[8,7],
      recoveries:[45,50],
      clearances:[11,22],
      errorsShot:[2,0],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[0,3],
      goalsPrevented:[-0.43,0.07],
      bigSaves:[0,0], // not shown
      claims:[0,1],
      punches:[0,0], // not shown
      goalKicks:[8,10]
    },

    lineup:{
      home:[
        "Mike Maignan",
        "Jules Kounde",
        "Ibrahima Konate",
        "William Saliba",
        "Theo Hernandez",
        "Aurelien Tchouameni",
        "Eduardo Camavinga",
        "Ousmane Dembele",
        "Michael Olise",
        "Bradley Barcola",
        "Kylian Mbappe"
      ],

      away:[
        "Unai Simon",
        "Dani Carvajal",
        "Robin Le Normand",
        "Aymeric Laporte",
        "Marc Cucurella",
        "Rodri",
        "Pedri",
        "Dani Olmo",
        "Lamine Yamal",
        "Nico Williams",
        "Mikel Oyarzabal"
      ]
    }
  },

  402: {
    competition: "FIFA World Cup 2026 • Semi Final",
    stadium: "Mercedes Benz Stadium • Atlanta",

    overview: {
      possession:[36,64],
      distance:[95.2,93.9],
      xg:[0.53,1.59],
      bigChances:[1,3],
      shots:[5,15],
      saves:[3,1],
      sprints:[94,78],
      corners:[1,6],
      fouls:[11,15],
      passes:[325,588],
      tackles:[15,20],
      freeKicks:[15,11],
      yellowCards:[1,3],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[2,5],
      hitWoodwork:[0,2],
      offTarget:[1,7],
      blocked:[2,3],
      insideBox:[2,7],
      outsideBox:[3,8]
    },

    attack:{
      bigScored:[1,1],
      bigMissed:[0,2],
      throughBalls:[0,0], // not shown
      touchesBox:[7,28],
      fouledThird:[2,0],
      offsides:[1,3]
    },

    duels:{
      possession:[49,51],
      dispossessed:[8,12],

      ground:[46,54],
      groundCompleted:["37/80","43/80"],

      aerial:[59,41],
      aerialCompleted:["13/22","9/22"],

      dribbles:[37,81],
      dribblesCompleted:["7/19","13/16"]
    },

    passes:{
      accurate:[273,537],
      throwIns:[19,20],
      finalThird:[46,51],

      finalThirdCompleted:["60/91","197/228"],
      finalThirdPercent:[66,86],

      longBallsCompleted:["16/42","13/27"],
      longBallsPercent:[38,48],

      crossesCompleted:["3/16","6/20"],
      crossesPercent:[19,30]
    },

    defending:{
      tacklesWon:[60,45],
      tackles:[15,20],
      interceptions:[9,6],
      recoveries:[27,33],
      clearances:[27,31],
      errorsShot:[1,2],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[3,1],
      goalsPrevented:[-0.46,0.02],
      bigSaves:[2,0],
      claims:[0,0], // not shown
      punches:[0,0], // not shown
      goalKicks:[9,3]
    },

    lineup:{
      home:[
        "Jordan Pickford",
        "Reece James",
        "John Stones",
        "Marc Guehi",
        "Myles Lewis-Skelly",
        "Declan Rice",
        "Jude Bellingham",
        "Bukayo Saka",
        "Cole Palmer",
        "Anthony Gordon",
        "Harry Kane"
      ],

      away:[
        "Emiliano Martinez",
        "Nahuel Molina",
        "Cristian Romero",
        "Lisandro Martinez",
        "Nicolas Tagliafico",
        "Rodrigo De Paul",
        "Enzo Fernandez",
        "Alexis Mac Allister",
        "Lionel Messi",
        "Julian Alvarez",
        "Lautaro Martinez"
      ]
    }
  },

  501: {
    competition: "FIFA World Cup 2026 • 3rd Place Match",
    stadium: "Hard Rock Stadium, Miami Gardens USA",

    overview: {
      possession:[46,54],
      distance:[0,0], // not shown
      xg:[2.88,2.88],
      bigChances:[6,7],
      shots:[19,19],
      saves:[4,5],
      sprints:[0,0], // not shown
      corners:[3,4],
      fouls:[14,8],
      passes:[445,518],
      tackles:[16,27],
      freeKicks:[8,13],
      yellowCards:[0,0], // not shown
      redCards:[0,0] // not shown
    },

    shots:{
      shotsOnTarget:[9,11],
      hitWoodwork:[0,0],
      offTarget:[6,2],
      blocked:[4,6],
      insideBox:[12,16],
      outsideBox:[7,3]
    },

    attack:{
      bigScored:[4,3],
      bigMissed:[2,4],
      throughBalls:[5,4],
      touchesBox:[55,34],
      fouledThird:[2,4],
      offsides:[3,3]
    },

    duels:{
      possession:[36,64],
      dispossessed:[15,12],

      ground:[33,67],
      groundCompleted:["31/95","64/95"],

      aerial:[62,38],
      aerialCompleted:["8/13","5/13"],

      dribbles:[37,85],
      dribblesCompleted:["7/19","23/27"]
    },

    passes:{
      accurate:[404,469],
      throwIns:[5,6],
      finalThird:[46,32],

      finalThirdCompleted:["140/166","46/65"],
      finalThirdPercent:[84,71],

      longBallsCompleted:["17/26","15/35"],
      longBallsPercent:[65,43],

      crossesCompleted:["1/5","4/12"],
      crossesPercent:[20,33]
    },

    defending:{
      tacklesWon:[63,48],
      tackles:[16,27],
      interceptions:[9,11],
      recoveries:[47,48],
      clearances:[10,12],
      errorsShot:[0,1],
      errorsGoal:[1,0]
    },

    goalkeeping:{
      saves:[4,5],
      goalsPrevented:[-1.01,0.16],
      bigSaves:[1,2],
      claims:[1,0],
      punches:[0,0], // not shown
      goalKicks:[5,7]
    },

    lineup:{
      home:[
        "Mike Maignan",
        "Malo Gusto",
        "Ibrahima Konate",
        "Maxime Lacroix",
        "Theo Hernandez",
        "Warren Zaire-Emery",
        "Adrien Rabiot",
        "Michael Olise",
        "Rayan Cherki",
        "Desire Doue",
        "Kylian Mbappe"
      ],

      away:[
        "Dean Henderson",
        "Djed Spence",
        "Marc Guehi",
        "Ezri Konsa",
        "Jarell Quansah",
        "Declan Rice",
        "Eberechi Eze",
        "Morgan Rogers",
        "Marcus Rashford",
        "Bukayo Saka",
        "Ivan Toney"
      ]
    }
  },

  502: {
    competition: "FIFA World Cup 2026 • Final",
    stadium: "MetLife Stadium, East Rutherford USA",

    overview: {
      possession:[65,35],
      distance:[0,0], // not shown
      xg:[2.29,0.22],
      bigChances:[4,0],
      shots:[20,2],
      saves:[0,11],
      sprints:[0,0], // not shown
      corners:[9,4],
      fouls:[21,25],
      passes:[853,464],
      tackles:[17,18],
      freeKicks:[25,21],
      yellowCards:[0,6],
      redCards:[0,1]
    },

    shots:{
      shotsOnTarget:[12,0],
      hitWoodwork:[0,0],
      offTarget:[5,1],
      blocked:[3,1],
      insideBox:[9,1],
      outsideBox:[11,1]
    },

    attack:{
      bigScored:[1,0],
      bigMissed:[3,0],
      throughBalls:[3,0],
      touchesBox:[32,8],
      fouledThird:[3,0],
      offsides:[4,1]
    },

    duels:{
      possession:[52,48],
      dispossessed:[7,12],

      ground:[52,48],
      groundCompleted:["51/99","48/99"],

      aerial:[52,48],
      aerialCompleted:["13/25","12/25"],

      dribbles:[56,64],
      dribblesCompleted:["14/25","9/14"]
    },

    passes:{
      accurate:[763,357],
      throwIns:[19,22],
      finalThird:[87,55],

      finalThirdCompleted:["214/262","38/82"],
      finalThirdPercent:[82,46],

      longBallsCompleted:["23/52","25/74"],
      longBallsPercent:[44,34],

      crossesCompleted:["5/27","1/7"],
      crossesPercent:[19,14]
    },

    defending:{
      tacklesWon:[71,78],
      tackles:[17,18],
      interceptions:[12,15],
      recoveries:[61,56],
      clearances:[22,24],
      errorsShot:[0,1],
      errorsGoal:[0,0] // not shown
    },

    goalkeeping:{
      saves:[0,11],
      goalsPrevented:[0.00,2.03],
      bigSaves:[0,3],
      claims:[1,1],
      punches:[1,0],
      goalKicks:[5,11]
    },

    lineup:{
      home:[
        "Unai Simón",
        "Pedro Porro",
        "Pau Cubarsí",
        "Aymeric Laporte",
        "Marc Cucurella",
        "Rodri",
        "Fabián Ruiz",
        "Álex Baena",
        "Lamine Yamal",
        "Dani Olmo",
        "Mikel Oyarzabal"
      ],

      away:[
        "Emiliano Martínez",
        "Gonzalo Montiel",
        "Cristian Romero",
        "Lisandro Martínez",
        "Nicolás Tagliafico",
        "Rodrigo De Paul",
        "Enzo Fernández",
        "Alexis Mac Allister",
        "Nicolás González",
        "Lionel Messi",
        "Julián Álvarez"
      ]
    }
  },

  1001: {
    competition: "FIFA World Cup 2026 • Group Stage • Group A",
    stadium: "Estadio Azteca, Mexico City",

    overview: {
      possession:[61,39],
      distance:[91.8,85.9],
      xg:[1.46,0.07],
      bigChances:[2,0],
      shots:[16,3],
      saves:[2,2],
      sprints:[61,65],
      corners:[3,1],
      fouls:[12,11],
      passes:[520,334],
      tackles:[12,14],
      freeKicks:[11,12],
      yellowCards:[1,2],
      redCards:[1,2]
    },

    shots:{
      shotsOnTarget:[4,2],
      hitWoodwork:[1,0],
      offTarget:[7,1],
      blocked:[5,0],
      insideBox:[9,1],
      outsideBox:[7,2]
    },

    attack:{
      bigScored:[2,0],
      bigMissed:[0,0],
      throughBalls:[1,0],
      touchesBox:[20,2],
      fouledThird:[3,2],
      offsides:[1,1]
    },

    duels:{
      possession:[59,41],
      dispossessed:[8,7],

      ground:[55,45],
      groundCompleted:["32/58","26/58"],

      aerial:[68,32],
      aerialCompleted:["15/22","7/22"],

      dribbles:[60,17],
      dribblesCompleted:["9/15","1/6"]
    },

    passes:{
      accurate:[467,272],
      throwIns:[21,11],
      finalThird:[53,39],

      finalThirdCompleted:["83/107","25/56"],
      finalThirdPercent:[78,45],

      longBallsCompleted:["31/48","17/46"],
      longBallsPercent:[65,37],

      crossesCompleted:["4/12","1/8"],
      crossesPercent:[33,13]
    },

    defending:{
      tacklesWon:[50,50],
      tackles:[12,14],
      interceptions:[8,7],
      recoveries:[40,44],
      clearances:[15,17],
      errorsShot:[0,1],
      errorsGoal:[0,1]
    },

    goalkeeping:{
      saves:[2,2],
      goalsPrevented:[0.13,-0.72],
      bigSaves:[0,1],
      claims:[0,2],
      punches:[0,1],
      goalKicks:[5,8]
    },

    lineup:{
      home:[
        "Raul Rangel",
        "Jesus Gallardo",
        "Johan Vasquez",
        "Cesar Montes",
        "Israel Reyes",
        "Luis Romo",
        "Erik Lira",
        "Alexis Gutierrez",
        "Alvaro Fidalgo",
        "Julian Quinones",
        "Raul Jimenez"
      ],

      away:[
        "Ronwen Williams",
        "Khuliso Mudau",
        "Teboho Mokoena",
        "Lyle Foster",
        "Iqraam Rayners",
        "Nkosinathi Sibisi",
        "Siyabonga Sithole",
        "Oswin Appollis",
        "Mihlali Mayambela",
        "Jayden Adams",
        "Aubrey Modiba"
      ]
    }
  },

  1002: {
    competition: "FIFA World Cup 2026 • Group Stage • Group A",
    stadium: "Estadio Akron, Guadalajara Mexico",

    overview: {
      possession:[62,38],
      distance:[104.2,108.3],
      xg:[2.30,0.83],
      bigChances:[4,1],
      shots:[15,7],
      saves:[3,4],
      sprints:[123,101],
      corners:[4,5],
      fouls:[9,16],
      passes:[541,327],
      tackles:[7,9],
      freeKicks:[16,9],
      yellowCards:[1,0],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[6,4],
      hitWoodwork:[0,0],
      offTarget:[5,3],
      blocked:[4,1],
      insideBox:[10,5],
      outsideBox:[5,2]
    },

    attack:{
      bigScored:[2,1],
      bigMissed:[2,0],
      throughBalls:[1,0],
      touchesBox:[24,12],
      fouledThird:[1,1],
      offsides:[2,2]
    },

    duels:{
      possession:[60,40],
      dispossessed:[3,4],

      ground:[57,43],
      groundCompleted:["29/51","22/51"],

      aerial:[63,37],
      aerialCompleted:["27/43","16/43"],

      dribbles:[57,57],
      dribblesCompleted:["8/14","4/7"]
    },

    passes:{
      accurate:[469,230],
      throwIns:[26,16],
      finalThird:[65,52],

      finalThirdCompleted:["106/140","54/105"],
      finalThirdPercent:[76,51],

      longBallsCompleted:["30/61","23/69"],
      longBallsPercent:[49,33],

      crossesCompleted:["3/12","3/15"],
      crossesPercent:[25,20]
    },

    defending:{
      tacklesWon:[57,78],
      tackles:[7,9],
      interceptions:[9,6],
      recoveries:[36,46],
      clearances:[32,21],
      errorsShot:[1,0],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[3,4],
      goalsPrevented:[1.07,0.06],
      bigSaves:[1,1],
      claims:[0,0],
      punches:[0,0],
      goalKicks:[4,8]
    },

    lineup:{
      home:[
        "Kim Seung-gyu",
        "Kim Min-jae",
        "Lee Han-beom",
        "Lee Tae-seok",
        "Seol Young-woo",
        "Paik Seung-ho",
        "Lee Kang-in",
        "Lee Jae-sung",
        "Lee Tae-hee",
        "Son Heung-min",
        "Cho Gue-sung"
      ],

      away:[
        "Matej Kovar",
        "Vladimir Coufal",
        "Stanislav Chaloupek",
        "Robin Hranac",
        "Jaroslav Zeleny",
        "Tomas Soucek",
        "Lukas Provod",
        "Adam Karabec",
        "Pavel Sulc",
        "Vaclav Cerny",
        "Patrik Schick"
      ]
    }
  },

  1003: {
    competition: "FIFA World Cup 2026 • Group Stage • Group B",
    stadium: "BMO Field, Toronto Canada",

    overview: {
      possession:[61,39],
      distance:[89.1,96.7],
      xg:[1.23,0.96],
      bigChances:[2,2],
      shots:[13,8],
      saves:[2,1],
      sprints:[104,108],
      corners:[9,4],
      fouls:[10,20],
      passes:[421,271],
      tackles:[23,20],
      freeKicks:[20,10],
      yellowCards:[2,3],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[4,3],
      hitWoodwork:[1,0],
      offTarget:[5,4],
      blocked:[4,1],
      insideBox:[10,5],
      outsideBox:[3,3]
    },

    attack:{
      bigScored:[0,1],
      bigMissed:[2,1],
      throughBalls:[1,0],
      touchesBox:[37,15],
      fouledThird:[3,0],
      offsides:[1,0]
    },

    duels:{
      possession:[47,53],
      dispossessed:[13,6],

      ground:[58,42],
      groundCompleted:["50/86","36/86"],

      aerial:[33,67],
      aerialCompleted:["21/64","43/64"],

      dribbles:[50,26],
      dribblesCompleted:["7/14","6/23"]
    },

    passes:{
      accurate:[310,172],
      throwIns:[32,26],
      finalThird:[73,59],

      finalThirdCompleted:["104/164","35/77"],
      finalThirdPercent:[63,45],

      longBallsCompleted:["18/41","17/62"],
      longBallsPercent:[44,27],

      crossesCompleted:["5/24","6/10"],
      crossesPercent:[21,60]
    },

    defending:{
      tacklesWon:[65,60],
      tackles:[23,20],
      interceptions:[4,11],
      recoveries:[51,53],
      clearances:[21,70],
      errorsShot:[0,2],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[2,1],
      goalsPrevented:[0.00,-0.25],
      bigSaves:[0,0],
      claims:[0,3],
      punches:[1,0],
      goalKicks:[7,9]
    },

    lineup:{
      home:[
        "Maxime Crépeau",
        "Alistair Johnston",
        "Luc de Fougerolles",
        "Derek Cornelius",
        "Tajon Buchanan",
        "Ismaël Koné",
        "Stephen Eustáquio",
        "Richie Laryea",
        "Jacob Millar",
        "Jonathan David",
        "Tani Oluwaseyi"
      ],

      away:[
        "Nikola Vasilj",
        "Amar Dedić",
        "Nikola Katić",
        "Tarik Muharemović",
        "Sead Kolašinac",
        "Amar Memić",
        "Benjamin Tahirović",
        "Ivan Bašić",
        "Esmir Bajraktarević",
        "Edin Džeko",
        "Jusuf Lukić"
      ]
    }
  },

  1004: {
    competition: "FIFA World Cup 2026 • Group Stage • Group B",
    stadium: "Levi's Stadium, Santa Clara USA",

    overview: {
      possession:[32,68],
      distance:[99.8,99.3],
      xg:[0.60,3.20],
      bigChances:[1,6],
      shots:[6,26],
      saves:[5,3],
      sprints:[67,79],
      corners:[3,10],
      fouls:[12,11],
      passes:[278,576],
      tackles:[14,8],
      freeKicks:[11,11],
      yellowCards:[2,1],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[3,7],
      hitWoodwork:[0,0],
      offTarget:[3,10],
      blocked:[0,9],
      insideBox:[4,18],
      outsideBox:[2,8]
    },

    attack:{
      bigScored:[1,1],
      bigMissed:[1,5],
      throughBalls:[0,5],
      touchesBox:[8,42],
      fouledThird:[0,9],
      offsides:[0,1]
    },

    duels:{
      possession:[49,51],
      dispossessed:[6,8],

      ground:[49,51],
      groundCompleted:["26/53","27/53"],

      aerial:[50,50],
      aerialCompleted:["10/20","10/20"],

      dribbles:[50,54],
      dribblesCompleted:["2/4","7/13"]
    },

    passes:{
      accurate:[200,527],
      throwIns:[14,17],
      finalThird:[39,80],

      finalThirdCompleted:["24/55","199/228"],
      finalThirdPercent:[44,87],

      longBallsCompleted:["19/64","27/35"],
      longBallsPercent:[30,77],

      crossesCompleted:["1/9","6/35"],
      crossesPercent:[11,17]
    },

    defending:{
      tacklesWon:[64,75],
      tackles:[14,8],
      interceptions:[11,7],
      recoveries:[36,50],
      clearances:[31,13],
      errorsShot:[1,1],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[5,3],
      goalsPrevented:[0.78,-0.54],
      bigSaves:[1,0],
      claims:[2,0],
      punches:[3,0],
      goalKicks:[12,5]
    },

    lineup:{
      home:[
        "Meshaal Barsham",
        "Ahmed Alaaeldin",
        "Pedro Miguel",
        "Boualem Khoukhi",
        "Jassem Gaber Abdulsallam",
        "Edmilson Junior",
        "Assim Madibo",
        "Homam Ahmed",
        "Almoez Ali",
        "Akram Afif",
        "Yusuf Abdurisag"
      ],

      away:[
        "Gregor Kobel",
        "Ricardo Rodriguez",
        "Manuel Akanji",
        "Nico Elvedi",
        "Remo Freuler",
        "Granit Xhaka",
        "Ruben Vargas",
        "Michel Aebischer",
        "Dan Ndoye",
        "Breel Embolo",
        "Denis Zakaria"
      ]
    }
  },

  1005: {
    competition: "FIFA World Cup 2026 • Group Stage • Group C",
    stadium: "MetLife Stadium, East Rutherford USA",

    overview: {
      possession:[51,49],
      distance:[98.6,104.1],
      xg:[1.26,1.37],
      bigChances:[1,2],
      shots:[12,14],
      saves:[2,4],
      sprints:[92,111],
      corners:[6,2],
      fouls:[16,14],
      passes:[514,486],
      tackles:[23,26],
      freeKicks:[14,16],
      yellowCards:[2,0],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[5,3],
      hitWoodwork:[0,0],
      offTarget:[4,5],
      blocked:[3,6],
      insideBox:[9,7],
      outsideBox:[3,7]
    },

    attack:{
      bigScored:[0,1],
      bigMissed:[1,1],
      throughBalls:[0,1],
      touchesBox:[22,13],
      fouledThird:[0,6],
      offsides:[0,1]
    },

    duels:{
      possession:[46,54],
      dispossessed:[4,10],

      ground:[41,59],
      groundCompleted:["41/99","58/99"],

      aerial:[75,25],
      aerialCompleted:["12/16","4/16"],

      dribbles:[19,55],
      dribblesCompleted:["5/27","16/29"]
    },

    passes:{
      accurate:[449,419],
      throwIns:[17,13],
      finalThird:[54,66],

      finalThirdCompleted:["69/100","123/157"],
      finalThirdPercent:[69,78],

      longBallsCompleted:["18/36","17/52"],
      longBallsPercent:[50,33],

      crossesCompleted:["4/16","2/15"],
      crossesPercent:[25,13]
    },

    defending:{
      tacklesWon:[57,69],
      tackles:[23,26],
      interceptions:[5,5],
      recoveries:[46,52],
      clearances:[23,17],
      errorsShot:[3,0],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[2,4],
      goalsPrevented:[-0.26,0.38],
      bigSaves:[1,1],
      claims:[0,0], // not shown
      punches:[1,2],
      goalKicks:[4,4]
    },

    lineup:{
      home:[
        "Alisson",
        "D.Santos",
        "Gabriel Magalhaes",
        "Marquinhos",
        "Renan Lodi",
        "Casemiro",
        "Bruno Guimaraes",
        "Lucas Paqueta",
        "Raphinha",
        "Vinicius Jr.",
        "Thiago"
      ],

      away:[
        "Yassine Bounou",
        "Noussair Mazraoui",
        "Chadi Riad",
        "Issa Diop",
        "Achraf Hakimi",
        "Amir Richardson",
        "Azzedine Ounahi",
        "Ismael Saibari",
        "Brahim Diaz",
        "Neil El Aynaoui",
        "Bilal El Khannouss"
      ]
    }
  },

  1006: {
    competition: "FIFA World Cup 2026 • Group Stage • Group C",
    stadium: "Gillette Stadium, Foxborough USA",

    overview: {
      possession:[54,46],
      distance:[106.7,108.2],
      xg:[1.05,1.05],
      bigChances:[1,2],
      shots:[15,9],
      saves:[1,2],
      sprints:[89,117],
      corners:[4,3],
      fouls:[23,21],
      passes:[431,374],
      tackles:[12,12],
      freeKicks:[21,23],
      yellowCards:[1,3],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[2,2],
      hitWoodwork:[0,1],
      offTarget:[9,5],
      blocked:[4,2],
      insideBox:[8,8],
      outsideBox:[7,1]
    },

    attack:{
      bigScored:[0,0], // not shown
      bigMissed:[1,2],
      throughBalls:[0,0], // not shown
      touchesBox:[22,21],
      fouledThird:[6,2],
      offsides:[3,1]
    },

    duels:{
      possession:[47,53],
      dispossessed:[4,4],

      ground:[50,50],
      groundCompleted:["38/76","38/76"],

      aerial:[40,60],
      aerialCompleted:["14/35","21/35"],

      dribbles:[43,38],
      dribblesCompleted:["6/14","5/13"]
    },

    passes:{
      accurate:[368,307],
      throwIns:[14,23],
      finalThird:[65,56],

      finalThirdCompleted:["83/117","48/84"],
      finalThirdPercent:[71,57],

      longBallsCompleted:["27/59","30/58"],
      longBallsPercent:[46,52],

      crossesCompleted:["5/23","5/14"],
      crossesPercent:[22,36]
    },

    defending:{
      tacklesWon:[58,42],
      tackles:[12,12],
      interceptions:[6,6],
      recoveries:[42,27],
      clearances:[20,17],
      errorsShot:[0,3],
      errorsGoal:[0,0] // not shown
    },

    goalkeeping:{
      saves:[1,2],
      goalsPrevented:[0.18,0.22],
      bigSaves:[0,0], // not shown
      claims:[0,1],
      punches:[0,0], // not shown
      goalKicks:[7,13]
    },

    lineup:{
      home:[
        "Johny Placide",
        "Carlens Arcus",
        "Jean-Kevin Duverne",
        "Hannes Delcroix",
        "Derrick Etienne Jr.",
        "Dany Jean Jacques",
        "Jean Bellegarde",
        "Markus Experience",
        "Ruben Providence",
        "Frantzdy Pierrot",
        "Wilfried Isidor"
      ],

      away:[
        "Angus Gunn",
        "Andy Robertson",
        "Jack Hendry",
        "Grant Hanley",
        "Aaron Hickey",
        "John McGinn",
        "Lewis Ferguson",
        "Scott McTominay",
        "Ben Doak",
        "Che Adams",
        "Lawrence Shankland"
      ]
    }
  },

  1007: {
    competition: "FIFA World Cup 2026 • Group Stage • Group D",
    stadium: "SoFi Stadium, Inglewood USA",

    overview: {
      possession:[65,35],
      distance:[106.2,105.2],
      xg:[1.42,0.54],
      bigChances:[4,1],
      shots:[16,9],
      saves:[1,3],
      sprints:[97,99],
      corners:[3,1],
      fouls:[13,17],
      passes:[598,319],
      tackles:[9,21],
      freeKicks:[17,13],
      yellowCards:[1,5],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[6,1],
      hitWoodwork:[0,0],
      offTarget:[6,3],
      blocked:[4,5],
      insideBox:[13,4],
      outsideBox:[3,5]
    },

    attack:{
      bigScored:[2,1],
      bigMissed:[2,0],
      throughBalls:[2,0],
      touchesBox:[53,11],
      fouledThird:[4,1],
      offsides:[2,1]
    },

    duels:{
      possession:[54,46],
      dispossessed:[8,5],

      ground:[55,45],
      groundCompleted:["47/86","39/86"],

      aerial:[53,47],
      aerialCompleted:["18/34","16/34"],

      dribbles:[63,60],
      dribblesCompleted:["22/35","6/10"]
    },

    passes:{
      accurate:[509,232],
      throwIns:[23,17],
      finalThird:[77,36],

      finalThirdCompleted:["142/197","17/46"],
      finalThirdPercent:[72,37],

      longBallsCompleted:["26/48","20/59"],
      longBallsPercent:[54,34],

      crossesCompleted:["3/19","1/5"],
      crossesPercent:[16,20]
    },

    defending:{
      tacklesWon:[78,76],
      tackles:[9,21],
      interceptions:[9,10],
      recoveries:[45,40],
      clearances:[15,33],
      errorsShot:[3,2],
      errorsGoal:[0,0] // not shown
    },

    goalkeeping:{
      saves:[1,3],
      goalsPrevented:[-0.58,-1.46],
      bigSaves:[0,0], // not shown
      claims:[1,0],
      punches:[0,0], // not shown
      goalKicks:[3,7]
    },

    lineup:{
      home:[
        "Matt Freese",
        "Alex Freeman",
        "Chris Richards",
        "Tim Ream",
        "Antonee Robinson",
        "Tyler Adams",
        "Weston McKennie",
        "Malik Tillman",
        "Sergino Dest",
        "Christian Pulisic",
        "Folarin Balogun"
      ],

      away:[
        "Orlando Gill",
        "Junior Alonso",
        "Omar Alderete",
        "Gustavo Gómez",
        "Juan Cáceres",
        "Miguel Almirón",
        "Damián Bobadilla",
        "Andrés Cubas",
        "Diego Gómez",
        "Julio Enciso",
        "Antonio Sanabria"
      ]
    }
  },

  1008: {
    competition: "FIFA World Cup 2026 • Group Stage • Group D",
    stadium: "BC Place, Vancouver Canada",

    overview: {
      possession:[28,72],
      distance:[102.4,99.9],
      xg:[1.18,1.36],
      bigChances:[1,2],
      shots:[9,30],
      saves:[8,2],
      sprints:[88,85],
      corners:[5,8],
      fouls:[12,4],
      passes:[271,704],
      tackles:[15,12],
      freeKicks:[4,12],
      yellowCards:[0,1],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[4,8],
      hitWoodwork:[0,1],
      offTarget:[4,10],
      blocked:[1,12],
      insideBox:[6,14],
      outsideBox:[3,16]
    },

    attack:{
      bigScored:[1,0],
      bigMissed:[0,2],
      throughBalls:[1,1],
      touchesBox:[18,51],
      fouledThird:[0,2],
      offsides:[1,3]
    },

    duels:{
      possession:[48,52],
      dispossessed:[9,6],

      ground:[48,52],
      groundCompleted:["27/56","29/56"],

      aerial:[47,53],
      aerialCompleted:["15/32","17/32"],

      dribbles:[73,36],
      dribblesCompleted:["8/11","5/14"]
    },

    passes:{
      accurate:[201,635],
      throwIns:[14,24],
      finalThird:[43,85],

      finalThirdCompleted:["43/72","285/329"],
      finalThirdPercent:[60,87],

      longBallsCompleted:["16/58","19/28"],
      longBallsPercent:[28,68],

      crossesCompleted:["4/14","2/26"],
      crossesPercent:[29,8]
    },

    defending:{
      tacklesWon:[33,67],
      tackles:[15,12],
      interceptions:[7,4],
      recoveries:[35,36],
      clearances:[55,29],
      errorsShot:[0,0], // not shown
      errorsGoal:[0,0] // not shown
    },

    goalkeeping:{
      saves:[8,2],
      goalsPrevented:[1.46,-0.92],
      bigSaves:[3,0],
      claims:[1,1],
      punches:[1,0],
      goalKicks:[17,6]
    },

    lineup:{
      home:[
        "Patrick Beach",
        "Jason Bos",
        "Harry Souttar",
        "Alessandro Circati",
        "Jordan Italiano",
        "Callum Burgess",
        "Aiden O'Neill",
        "Connor Metcalfe",
        "Paul Okon-Engstler",
        "Nestory Irankunda",
        "Mohamed Touré"
      ],

      away:[
        "Uğurcan Çakır",
        "Zeki Çelik",
        "Merih Demiral",
        "Abdülkerim Bardakcı",
        "Ferdi Kadıoğlu",
        "İsmail Yüksek",
        "Orkun Kökçü",
        "Barış Alper Yılmaz",
        "Arda Güler",
        "Hakan Çalhanoğlu",
        "Kenan Yıldız"
      ]
    }
  },

  1009: {
    competition: "FIFA World Cup 2026 • Group Stage • Group E",
    stadium: "NRG Stadium, Houston USA",

    overview: {
      possession:[65,35],
      distance:[100.6,92.4],
      xg:[4.22,0.41],
      bigChances:[6,0],
      shots:[26,8],
      saves:[1,4],
      sprints:[110,102],
      corners:[8,1],
      fouls:[18,11],
      passes:[637,343],
      tackles:[19,16],
      freeKicks:[10,18],
      yellowCards:[0,0], // not shown
      redCards:[0,0] // not shown
    },

    shots:{
      shotsOnTarget:[12,2],
      hitWoodwork:[1,0],
      offTarget:[6,6],
      blocked:[8,0],
      insideBox:[21,4],
      outsideBox:[5,4]
    },

    attack:{
      bigScored:[4,0],
      bigMissed:[2,0],
      throughBalls:[6,0],
      touchesBox:[63,10],
      fouledThird:[5,2],
      offsides:[0,1]
    },

    duels:{
      possession:[48,52],
      dispossessed:[7,10],

      ground:[46,54],
      groundCompleted:["38/83","45/83"],

      aerial:[64,36],
      aerialCompleted:["9/14","5/14"],

      dribbles:[50,57],
      dribblesCompleted:["9/18","12/21"]
    },

    passes:{
      accurate:[554,282],
      throwIns:[17,9],
      finalThird:[79,37],

      finalThirdCompleted:["182/237","46/64"],
      finalThirdPercent:[77,72],

      longBallsCompleted:["12/25","17/44"],
      longBallsPercent:[48,39],

      crossesCompleted:["5/12","2/7"],
      crossesPercent:[42,29]
    },

    defending:{
      tacklesWon:[68,50],
      tackles:[19,16],
      interceptions:[12,16],
      recoveries:[52,48],
      clearances:[8,25],
      errorsShot:[1,2],
      errorsGoal:[0,1]
    },

    goalkeeping:{
      saves:[1,4],
      goalsPrevented:[-0.50,-1.76],
      bigSaves:[0,1],
      claims:[0,1],
      punches:[0,2],
      goalKicks:[7,11]
    },

    lineup:{
      home:[
        "Manuel Neuer",
        "Nathaniel Brown",
        "Nico Schlotterbeck",
        "Jonathan Tah",
        "Joshua Kimmich",
        "Aleksandar Pavlovic",
        "Felix Nmecha",
        "Jamal Musiala",
        "Florian Wirtz",
        "Leroy Sané",
        "Kai Havertz"
      ],

      away:[
        "Eloy Room",
        "Sherel Floranus",
        "Riechedly Bazoer",
        "Armando Obispo",
        "Denzel Fonville",
        "Leandro Bacuna",
        "Juninho Bacuna",
        "Tyrique Chong",
        "Livano Comenencia",
        "Sontje Hansen",
        "Jürgen Locadia"
      ]
    }
  },

  1010: {
    competition: "FIFA World Cup 2026 • Group Stage • Group E",
    stadium: "Lincoln Financial Field, Philadelphia USA",

    overview: {
      possession:[48,52],
      distance:[98.8,95.9],
      xg:[1.52,1.01],
      bigChances:[2,1],
      shots:[15,12],
      saves:[1,3],
      sprints:[103,99],
      corners:[3,5],
      fouls:[10,13],
      passes:[470,492],
      tackles:[14,21],
      freeKicks:[13,10],
      yellowCards:[3,1],
      redCards:[0,0] // not shown
    },

    shots:{
      shotsOnTarget:[4,1],
      hitWoodwork:[1,3],
      offTarget:[8,8],
      blocked:[3,3],
      insideBox:[8,5],
      outsideBox:[7,7]
    },

    attack:{
      bigScored:[0,0], // not shown
      bigMissed:[2,1],
      throughBalls:[0,2],
      touchesBox:[39,16],
      fouledThird:[1,2],
      offsides:[0,0] // not shown
    },

    duels:{
      possession:[57,43],
      dispossessed:[14,7],

      ground:[55,45],
      groundCompleted:["41/74","33/74"],

      aerial:[61,39],
      aerialCompleted:["17/28","11/28"],

      dribbles:[67,30],
      dribblesCompleted:["14/21","3/10"]
    },

    passes:{
      accurate:[397,419],
      throwIns:[14,14],
      finalThird:[34,56],

      finalThirdCompleted:["91/114","72/110"],
      finalThirdPercent:[80,65],

      longBallsCompleted:["18/40","11/36"],
      longBallsPercent:[45,31],

      crossesCompleted:["2/8","4/14"],
      crossesPercent:[25,29]
    },

    defending:{
      tacklesWon:[64,71],
      tackles:[14,21],
      interceptions:[11,13],
      recoveries:[54,51],
      clearances:[29,18],
      errorsShot:[1,2],
      errorsGoal:[0,0] // not shown
    },

    goalkeeping:{
      saves:[1,3],
      goalsPrevented:[0.03,0.22],
      bigSaves:[0,0], // not shown
      claims:[1,0],
      punches:[1,0],
      goalKicks:[10,11]
    },

    lineup:{
      home:[
        "Yahia Fofana",
        "Guéla Doué",
        "Ousmane Diomande",
        "Willy Boly",
        "Ghislain Konan",
        "Franck Kessié",
        "Seko Fofana",
        "Yan Diomande",
        "Nicolas Pépé",
        "Evann Guessand",
        "Eliesse Ben Seghir"
      ],

      away:[
        "Hernán Galíndez",
        "Ángelo Preciado",
        "Willian Pacho",
        "Piero Hincapié",
        "Alan Franco",
        "Moisés Caicedo",
        "Alan Minda",
        "Gonzalo Plata",
        "Enner Valencia",
        "John Yeboah",
        "Kevin Rodríguez"
      ]
    }
  },

  1011: {
    competition: "FIFA World Cup 2026 • Group Stage • Group F",
    stadium: "AT&T Stadium, Arlington USA",

    overview: {
      possession:[60,40],
      distance:[94.0,98.6],
      xg:[0.78,0.59],
      bigChances:[0,0], // not shown
      shots:[10,10],
      saves:[1,4],
      sprints:[61,83],
      corners:[5,4],
      fouls:[7,7],
      passes:[524,341],
      tackles:[11,11],
      freeKicks:[7,7],
      yellowCards:[3,0],
      redCards:[0,0] // not shown
    },

    shots:{
      shotsOnTarget:[6,3],
      hitWoodwork:[0,0],
      offTarget:[3,6],
      blocked:[1,1],
      insideBox:[10,6],
      outsideBox:[0,4]
    },

    attack:{
      bigScored:[0,0], // not shown
      bigMissed:[0,0], // not shown
      throughBalls:[0,1],
      touchesBox:[33,19],
      fouledThird:[2,2],
      offsides:[1,0]
    },

    duels:{
      possession:[62,38],
      dispossessed:[4,5],

      ground:[54,46],
      groundCompleted:["25/46","21/46"],

      aerial:[75,25],
      aerialCompleted:["21/28","7/28"],

      dribbles:[53,33],
      dribblesCompleted:["8/15","3/9"]
    },

    passes:{
      accurate:[463,286],
      throwIns:[21,19],
      finalThird:[79,49],

      finalThirdCompleted:["133/164","80/113"],
      finalThirdPercent:[81,71],

      longBallsCompleted:["16/35","13/36"],
      longBallsPercent:[46,36],

      crossesCompleted:["8/21","6/23"],
      crossesPercent:[38,26]
    },

    defending:{
      tacklesWon:[45,91],
      tackles:[11,11],
      interceptions:[7,4],
      recoveries:[26,26],
      clearances:[23,32],
      errorsShot:[0,0], // not shown
      errorsGoal:[0,0] // not shown
    },

    goalkeeping:{
      saves:[1,4],
      goalsPrevented:[-0.68,0.16],
      bigSaves:[0,2],
      claims:[0,0], // not shown
      punches:[0,0], // not shown
      goalKicks:[9,7]
    },

    lineup:{
      home:[
        "Justin Bijlow",
        "Denzel Dumfries",
        "Jan Paul van Hecke",
        "Virgil van Dijk",
        "Micky van de Ven",
        "Ryan Gravenberch",
        "Frenkie de Jong",
        "Tijjani Reijnders",
        "Donyell Malen",
        "Cody Gakpo",
        "Crysencio Summerville"
      ],

      away:[
        "Zion Suzuki",
        "Daichi Kamada",
        "Shogo Taniguchi",
        "Ko Itakura",
        "Keito Nakamura",
        "Ao Tanaka",
        "Takefusa Kubo",
        "Ritsu Doan",
        "Daizen Maeda",
        "Ayase Ueda",
        "Tsuyoshi Watanabe"
      ]
    }
  },

  1012: {
    competition: "FIFA World Cup 2026 • Group Stage • Group F",
    stadium: "Estadio BBVA, Monterrey, Mexico",

    overview: {
      possession:[49,51],
      distance:[84.7,78.6],
      xg:[1.33,0.28],
      bigChances:[4,0],
      shots:[13,6],
      saves:[1,1],
      sprints:[85,68],
      corners:[4,2],
      fouls:[10,8],
      passes:[356,371],
      tackles:[14,21],
      freeKicks:[8,10],
      yellowCards:[0,1],
      redCards:[0,0] // not shown
    },

    shots:{
      shotsOnTarget:[7,2],
      hitWoodwork:[0,0],
      offTarget:[3,3],
      blocked:[3,1],
      insideBox:[9,2],
      outsideBox:[4,4]
    },

    attack:{
      bigScored:[2,0],
      bigMissed:[2,0],
      throughBalls:[0,0], // not shown
      touchesBox:[22,10],
      fouledThird:[1,3],
      offsides:[3,6]
    },

    duels:{
      possession:[45,55],
      dispossessed:[14,5],

      ground:[42,58],
      groundCompleted:["26/62","36/62"],

      aerial:[50,50],
      aerialCompleted:["15/30","15/30"],

      dribbles:[42,44],
      dribblesCompleted:["5/12","7/16"]
    },

    passes:{
      accurate:[278,292],
      throwIns:[18,17],
      finalThird:[47,63],

      finalThirdCompleted:["69/108","66/108"],
      finalThirdPercent:[64,61],

      longBallsCompleted:["22/58","24/53"],
      longBallsPercent:[38,45],

      crossesCompleted:["3/12","3/13"],
      crossesPercent:[25,23]
    },

    defending:{
      tacklesWon:[64,57],
      tackles:[14,21],
      interceptions:[6,6],
      recoveries:[41,40],
      clearances:[23,13],
      errorsShot:[0,2],
      errorsGoal:[0,4]
    },

    goalkeeping:{
      saves:[1,1],
      goalsPrevented:[-0.65,-2.88],
      bigSaves:[0,1],
      claims:[1,1],
      punches:[0,0], // not shown
      goalKicks:[6,10]
    },

    lineup:{
      home:[
        "Kristoffer Nordfeldt",
        "Gustaf Lagerbielke",
        "Isak Hien",
        "Victor Lindelöf",
        "Alex Bernhardsson",
        "Karlström",
        "Benjamin Nygren",
        "Viktor Gyökeres",
        "Gustaf Gudmundsson",
        "Yasin Ayari",
        "Alexander Isak"
      ],

      away:[
        "Aymen Dahmen",
        "Ali Abdi",
        "Montassar Talbi",
        "Omar Rekik",
        "Mohamed Ben Hamida",
        "Ellyes Skhiri",
        "Anis Ben Slimane",
        "Hannibal Mejbri",
        "Elias Saad",
        "Rami Khedira",
        "Yan Valery"
      ]
    }
  },

  1013: {
    competition: "FIFA World Cup 2026",
    stadium: "Lumen Field, Seattle USA",

    overview: {
      possession:[54,46],
      distance:[100.0,97.8],
      xg:[1.35,1.08],
      bigChances:[2,2],
      shots:[15,14],
      saves:[2,3],
      sprints:[106,105],
      corners:[2,7],
      fouls:[15,15],
      passes:[455,398],
      tackles:[17,28],
      freeKicks:[15,15],
      yellowCards:[2,2],
      redCards:[0,0] // not shown
    },

    shots:{
      shotsOnTarget:[3,3],
      hitWoodwork:[1,0],
      offTarget:[7,4],
      blocked:[5,7],
      insideBox:[9,10],
      outsideBox:[6,4]
    },

    attack:{
      bigScored:[0,0], // not shown
      bigMissed:[2,2],
      throughBalls:[0,0], // not shown
      touchesBox:[31,27],
      fouledThird:[4,0],
      offsides:[0,1]
    },

    duels:{
      possession:[50,50],
      dispossessed:[15,10],

      ground:[47,53],
      groundCompleted:["44/94","50/94"],

      aerial:[61,39],
      aerialCompleted:["14/23","9/23"],

      dribbles:[48,53],
      dribblesCompleted:["12/25","8/15"]
    },

    passes:{
      accurate:[391,323],
      throwIns:[28,19],
      finalThird:[82,37],

      finalThirdCompleted:["151/193","62/91"],
      finalThirdPercent:[78,68],

      longBallsCompleted:["18/30","20/53"],
      longBallsPercent:[60,38],

      crossesCompleted:["6/16","2/13"],
      crossesPercent:[38,15]
    },

    defending:{
      tacklesWon:[65,61],
      tackles:[17,28],
      interceptions:[10,16],
      recoveries:[48,46],
      clearances:[25,17],
      errorsShot:[2,0],
      errorsGoal:[0,0] // not shown
    },

    goalkeeping:{
      saves:[2,3],
      goalsPrevented:[-0.39,-0.36],
      bigSaves:[1,1],
      claims:[1,1],
      punches:[0,1],
      goalKicks:[1,12]
    },

    lineup:{
      home:[
        "Thibaut Courtois",
        "Thomas Meunier",
        "Nathan Ngoy",
        "Brandon Mechele",
        "Timothy Castagne",
        "Amadou Onana",
        "Youri Tielemans",
        "Kevin De Bruyne",
        "Leandro Trossard",
        "Jérémy Doku",
        "Charles De Ketelaere"
      ],

      away:[
        "Mohamed El Shenawy",
        "Ahmed Aboul-Fetouh",
        "Mohamed Hany",
        "Ibrahim Adel",
        "Hamdi Fathy",
        "Marwan Attia",
        "Mohamed Lasheen",
        "Mostafa Ziko",
        "Emam Ashour",
        "Mohamed Salah",
        "Omar Marmoush"
      ]
    }
  },

  1014: {
    competition: "FIFA World Cup 2026",
    stadium: "SoFi Stadium, Inglewood USA",

    overview: {
      possession:[49,51],
      distance:[103.3,103.6],
      xg:[1.50,1.24],
      bigChances:[2,2],
      shots:[17,14],
      saves:[6,2],
      sprints:[86,87],
      corners:[4,1],
      fouls:[10,8],
      passes:[409,446],
      tackles:[17,13],
      freeKicks:[8,10],
      yellowCards:[1,0],
      redCards:[0,0] // not shown
    },

    shots:{
      shotsOnTarget:[4,8],
      hitWoodwork:[1,0],
      offTarget:[8,4],
      blocked:[5,2],
      insideBox:[10,10],
      outsideBox:[7,4]
    },

    attack:{
      bigScored:[2,2],
      bigMissed:[0,0], // not shown
      throughBalls:[0,0], // not shown
      touchesBox:[25,21],
      fouledThird:[0,1],
      offsides:[2,0]
    },

    duels:{
      possession:[56,44],
      dispossessed:[6,11],

      ground:[51,49],
      groundCompleted:["29/57","28/57"],

      aerial:[63,38],
      aerialCompleted:["25/40","15/40"],

      dribbles:[36,50],
      dribblesCompleted:["4/11","6/12"]
    },

    passes:{
      accurate:[314,376],
      throwIns:[25,16],
      finalThird:[54,47],

      finalThirdCompleted:["67/110","73/99"],
      finalThirdPercent:[61,74],

      longBallsCompleted:["27/61","21/40"],
      longBallsPercent:[44,53],

      crossesCompleted:["6/19","1/12"],
      crossesPercent:[32,8]
    },

    defending:{
      tacklesWon:[59,77],
      tackles:[17,13],
      interceptions:[11,15],
      recoveries:[51,47],
      clearances:[27,26],
      errorsShot:[1,1],
      errorsGoal:[0,0] // not shown
    },

    goalkeeping:{
      saves:[6,2],
      goalsPrevented:[-1.00,-0.28],
      bigSaves:[1,0],
      claims:[0,0], // not shown
      punches:[0,0], // not shown
      goalKicks:[4,11]
    },

    lineup:{
      home:[
        "Alireza Beiranvand",
        "Ramin Rezaeian",
        "Mohammad Mohebi",
        "Shoja Khalilzadeh",
        "Saman Ghoddos",
        "Saeid Ezatolahi",
        "Ali Nemati",
        "Mehdi Mohammadi",
        "Ali Yousefi",
        "Sardar Moghanlou",
        "Mehdi Taremi"
      ],

      away:[
        "Max Crocombe",
        "Liberato Cacace",
        "Michael Boxall",
        "Finn Surman",
        "Tim Payne",
        "Marko Stamenic",
        "Elliot Just",
        "Joe Bell",
        "Sarpreet Singh",
        "Callum McCowatt",
        "Chris Wood"
      ]
    }
  },

  1015: {
    competition: "FIFA World Cup 2026",
    stadium: "Mercedes-Benz Stadium, Atlanta USA",

    overview: {
      possession:[74,26],
      distance:[103.1,106.1],
      xg:[2.10,0.20],
      bigChances:[2,1],
      shots:[27,6],
      saves:[1,7],
      sprints:[84,79],
      corners:[11,1],
      fouls:[10,1],
      passes:[800,278],
      tackles:[13,18],
      freeKicks:[1,10],
      yellowCards:[1,1],
      redCards:[0,0] // not shown
    },

    shots:{
      shotsOnTarget:[7,1],
      hitWoodwork:[1,0],
      offTarget:[12,3],
      blocked:[8,2],
      insideBox:[16,2],
      outsideBox:[11,4]
    },

    attack:{
      bigScored:[0,0], // not shown
      bigMissed:[2,1],
      throughBalls:[3,0],
      touchesBox:[51,6],
      fouledThird:[0,0], // not shown
      offsides:[2,3]
    },

    duels:{
      possession:[50,50],
      dispossessed:[12,6],

      ground:[40,60],
      groundCompleted:["21/52","31/52"],

      aerial:[68,32],
      aerialCompleted:["19/28","9/28"],

      dribbles:[54,36],
      dribblesCompleted:["7/13","4/11"]
    },

    passes:{
      accurate:[734,205],
      throwIns:[18,14],
      finalThird:[84,26],

      finalThirdCompleted:["388/443","16/35"],
      finalThirdPercent:[88,46],

      longBallsCompleted:["24/30","19/56"],
      longBallsPercent:[80,34],

      crossesCompleted:["6/36","1/4"],
      crossesPercent:[17,25]
    },

    defending:{
      tacklesWon:[92,61],
      tackles:[13,18],
      interceptions:[6,15],
      recoveries:[55,49],
      clearances:[7,46],
      errorsShot:[0,3],
      errorsGoal:[0,0] // not shown
    },

    goalkeeping:{
      saves:[1,7],
      goalsPrevented:[0.13,1.45],
      bigSaves:[0,2],
      claims:[0,3],
      punches:[0,0], // not shown
      goalKicks:[5,14]
    },

    lineup:{
      home:[
        "Unai Simón",
        "Marcos Llorente",
        "Pau Cubarsí",
        "Aymeric Laporte",
        "Marc Cucurella",
        "Rodri",
        "Fabián Ruiz",
        "Pedri",
        "Ferran Torres",
        "Mikel Oyarzabal",
        "Gavi"
      ],

      away:[
        "Vozinha",
        "Steven Moreira",
        "Pico",
        "Diney",
        "Sidny Lopes Cabral",
        "Laros Duarte",
        "Kevin Lenini",
        "Jovane Cabral",
        "Jamiro Monteiro",
        "Ryan Mendes",
        "Dailon Livramento"
      ]
    }
  },

  1016: {
    competition: "FIFA World Cup 2026",
    stadium: " Hard Rock Stadium, Miami Gardens USA",

    overview: {
      possession:[33,67],
      distance:[100.6,100.6],
      xg:[0.66,1.72],
      bigChances:[1,2],
      shots:[7,27],
      saves:[9,2],
      sprints:[76,87],
      corners:[4,14],
      fouls:[11,6],
      passes:[322,612],
      tackles:[11,3],
      freeKicks:[6,11],
      yellowCards:[1,0],
      redCards:[0,0] // not shown
    },

    shots:{
      shotsOnTarget:[3,10],
      hitWoodwork:[0,1],
      offTarget:[3,10],
      blocked:[1,7],
      insideBox:[4,16],
      outsideBox:[3,11]
    },

    attack:{
      bigScored:[1,1],
      bigMissed:[0,1],
      throughBalls:[0,0], // not shown
      touchesBox:[10,41],
      fouledThird:[1,3],
      offsides:[0,6]
    },

    duels:{
      possession:[49,51],
      dispossessed:[1,7],

      ground:[45,55],
      groundCompleted:["18/40","22/40"],

      aerial:[52,48],
      aerialCompleted:["22/42","20/42"],

      dribbles:[60,67],
      dribblesCompleted:["3/5","8/12"]
    },

    passes:{
      accurate:[236,540],
      throwIns:[18,20],
      finalThird:[29,65],

      finalThirdCompleted:["39/74","169/204"],
      finalThirdPercent:[53,83],

      longBallsCompleted:["10/41","24/41"],
      longBallsPercent:[24,59],

      crossesCompleted:["3/6","16/47"],
      crossesPercent:[50,34]
    },

    defending:{
      tacklesWon:[73,67],
      tackles:[11,3],
      interceptions:[9,10],
      recoveries:[39,52],
      clearances:[43,17],
      errorsShot:[0,0], // not shown
      errorsGoal:[1,1]
    },

    goalkeeping:{
      saves:[9,2],
      goalsPrevented:[0.68,-0.35],
      bigSaves:[4,1],
      claims:[0,0], // not shown
      punches:[2,1],
      goalKicks:[10,3]
    },

    lineup:{
      home:[
        "Mohammed Al-Owais",
        "Saud Abdulhamid",
        "Abdulelah Al-Amri",
        "Mohammed Kanno",
        "Mohammed Al-Shamat",
        "Hassan Altambakti",
        "Abdullah Al-Khaibari",
        "Moteb Al-Harbi",
        "Salem Al-Dawsari",
        "Musab Al-Juwayr",
        "Firas Al-Buraikan"
      ],

      away:[
        "Fernando Muslera",
        "Guillermo Varela",
        "Sebastián Cáceres",
        "Mathías Olivera",
        "Matías Viña",
        "Manuel Ugarte",
        "Federico Valverde",
        "Rodrigo Bentancur",
        "Maximiliano Araújo",
        "Federico Viñas",
        "Darwin Núñez"
      ]
    }
  },

  1017: {
    competition: "FIFA World Cup 2026",
    stadium: "MetLife Stadium, East Rutherford USA",

    overview: {
      possession:[53,47],
      distance:[108.6,108.5],
      xg:[1.79,0.53],
      bigChances:[4,2],
      shots:[11,6],
      saves:[2,5],
      sprints:[161,134],
      corners:[6,4],
      fouls:[5,9],
      passes:[575,502],
      tackles:[19,14],
      freeKicks:[9,5],
      yellowCards:[0,0], // not shown
      redCards:[0,0] // not shown
    },

    shots:{
      shotsOnTarget:[8,2],
      hitWoodwork:[0,1],
      offTarget:[1,3],
      blocked:[2,1],
      insideBox:[7,4],
      outsideBox:[4,2]
    },

    attack:{
      bigScored:[2,0],
      bigMissed:[2,2],
      throughBalls:[5,0],
      touchesBox:[19,13],
      fouledThird:[3,0],
      offsides:[1,3]
    },

    duels:{
      possession:[56,44],
      dispossessed:[4,13],

      ground:[54,46],
      groundCompleted:["32/59","27/59"],

      aerial:[60,40],
      aerialCompleted:["12/20","8/20"],

      dribbles:[33,57],
      dribblesCompleted:["5/15","8/14"]
    },

    passes:{
      accurate:[505,430],
      throwIns:[9,21],
      finalThird:[60,57],

      finalThirdCompleted:["93/123","69/104"],
      finalThirdPercent:[76,66],

      longBallsCompleted:["20/44","25/49"],
      longBallsPercent:[45,51],

      crossesCompleted:["0/9","1/9"],
      crossesPercent:[0,11]
    },

    defending:{
      tacklesWon:[74,71],
      tackles:[19,14],
      interceptions:[7,8],
      recoveries:[56,56],
      clearances:[14,17],
      errorsShot:[1,1],
      errorsGoal:[0,0] // not shown
    },

    goalkeeping:{
      saves:[2,5],
      goalsPrevented:[-0.83,-0.94],
      bigSaves:[0,0], // not shown
      claims:[0,1],
      punches:[0,0], // not shown
      goalKicks:[7,4]
    },

    lineup:{
      home:[
        "Mike Maignan",
        "Jules Koundé",
        "Dayot Upamecano",
        "William Saliba",
        "Theo Hernández",
        "Aurélien Tchouaméni",
        "Adrien Rabiot",
        "Michael Olise",
        "Désiré Doué",
        "Ousmane Dembélé",
        "Kylian Mbappé"
      ],

      away:[
        "Édouard Mendy",
        "El Hadji Malick Diouf",
        "Kalidou Koulibaly",
        "Moussa Niakhaté",
        "Krépin Diatta",
        "Lamine Camara",
        "Pape Gueye",
        "Idrissa Gueye",
        "Ismaïla Sarr",
        "Sadio Mané",
        "Nicolas Jackson"
      ]
    }
  },

  1018: {
    competition: "FIFA World Cup 2026",
    stadium: "Gillette Stadium, Foxborough USA",

    overview: {
      possession:[39,61],
      distance:[80.0,93.7],
      xg:[0.80,2.52],
      bigChances:[1,5],
      shots:[11,12],
      saves:[2,0],
      sprints:[84,94],
      corners:[2,5],
      fouls:[12,13],
      passes:[334,537],
      tackles:[19,15],
      freeKicks:[13,12],
      yellowCards:[1,0],
      redCards:[0,0] // not shown
    },

    shots:{
      shotsOnTarget:[1,5],
      hitWoodwork:[0,0],
      offTarget:[8,4],
      blocked:[2,3],
      insideBox:[8,11],
      outsideBox:[3,1]
    },

    attack:{
      bigScored:[0,3],
      bigMissed:[1,2],
      throughBalls:[1,0],
      touchesBox:[18,25],
      fouledThird:[0,4],
      offsides:[1,0]
    },

    duels:{
      possession:[52,48],
      dispossessed:[4,7],

      ground:[58,42],
      groundCompleted:["42/73","31/73"],

      aerial:[37,63],
      aerialCompleted:["10/27","17/27"],

      dribbles:[48,29],
      dribblesCompleted:["10/21","5/17"]
    },

    passes:{
      accurate:[271,477],
      throwIns:[14,22],
      finalThird:[43,46],

      finalThirdCompleted:["46/75","74/101"],
      finalThirdPercent:[61,73],

      longBallsCompleted:["22/54","18/42"],
      longBallsPercent:[41,43],

      crossesCompleted:["6/13","7/17"],
      crossesPercent:[46,41]
    },

    defending:{
      tacklesWon:[68,67],
      tackles:[19,15],
      interceptions:[5,2],
      recoveries:[35,36],
      clearances:[20,22],
      errorsShot:[2,0],
      errorsGoal:[2,0]
    },

    goalkeeping:{
      saves:[2,0],
      goalsPrevented:[-1.35,-0.40],
      bigSaves:[0,0], // not shown
      claims:[1,0],
      punches:[0,0], // not shown
      goalKicks:[10,9]
    },

    lineup:{
      home:[
        "Jalal Hassan",
        "Hussein Ali",
        "Zaid Tahseen",
        "Zaid Ismail",
        "Ibrahim Bayesh",
        "Ahmed Hashem",
        "Amjad Al-Ammari",
        "Mohammed Doski",
        "Ali Jasim",
        "Aymen Hussein",
        "Ali Al-Hamadi"
      ],

      away:[
        "Ørjan Nyland",
        "David Møller Wolfe",
        "Torbjørn Heggem",
        "Kristoffer Ajer",
        "Julian Ryerson",
        "Antonio Nusa",
        "Fredrik Aursnes",
        "Sander Berge",
        "Martin Ødegaard",
        "Erling Haaland",
        "Alexander Sørloth"
      ]
    }
  },

  1019: {
    competition: "FIFA World Cup 2026",
    stadium: "Arrowhead Stadium, Kansas City USA",

    overview: {
      possession:[48,52],
      distance:[87.2,102.9],
      xg:[1.47,0.30],
      bigChances:[1,0],
      shots:[10,7],
      saves:[0,3],
      sprints:[105,113],
      corners:[2,2],
      fouls:[13,8],
      passes:[561,609],
      tackles:[27,17],
      freeKicks:[8,13],
      yellowCards:[0,0], // not shown
      redCards:[0,0] // not shown
    },

    shots:{
      shotsOnTarget:[6,0],
      hitWoodwork:[0,0],
      offTarget:[4,4],
      blocked:[0,3],
      insideBox:[4,3],
      outsideBox:[6,4]
    },

    attack:{
      bigScored:[1,0],
      bigMissed:[0,0], // not shown
      throughBalls:[1,0],
      touchesBox:[12,14],
      fouledThird:[0,2],
      offsides:[3,1]
    },

    duels:{
      possession:[48,52],
      dispossessed:[10,12],

      ground:[49,51],
      groundCompleted:["36/74","38/74"],

      aerial:[38,63],
      aerialCompleted:["3/8","5/8"],

      dribbles:[22,35],
      dribblesCompleted:["2/9","8/23"]
    },

    passes:{
      accurate:[504,563],
      throwIns:[12,19],
      finalThird:[39,61],

      finalThirdCompleted:["56/78","118/144"],
      finalThirdPercent:[72,82],

      longBallsCompleted:["17/32","15/25"],
      longBallsPercent:[53,60],

      crossesCompleted:["1/6","1/9"],
      crossesPercent:[17,11]
    },

    defending:{
      tacklesWon:[70,59],
      tackles:[27,17],
      interceptions:[10,8],
      recoveries:[50,39],
      clearances:[17,12],
      errorsShot:[0,0], // not shown
      errorsGoal:[0,0] // not shown
    },

    goalkeeping:{
      saves:[0,3],
      goalsPrevented:[0.00,-0.78],
      bigSaves:[0,1],
      claims:[0,0], // not shown
      punches:[0,0], // not shown
      goalKicks:[6,4]
    },

    lineup:{
      home:[
        "Emiliano Martínez",
        "Gonzalo Montiel",
        "Cristian Romero",
        "Lisandro Martínez",
        "Facundo Medina",
        "Rodrigo De Paul",
        "Alexis Mac Allister",
        "Enzo Fernández",
        "Thiago Almada",
        "Lionel Messi",
        "Lautaro Martínez"
      ],

      away:[
        "Luca Zidane",
        "Rayan Aït-Nouri",
        "Ramy Bensebaini",
        "Aïssa Mandi",
        "Rafik Belghali",
        "Ibrahim Maza",
        "Nabil Bentaleb",
        "Houssem Aouar",
        "Hicham Boudaoui",
        "Farès Chaïbi",
        "Amine Gouiri"
      ]
    }
  },

  1020: {
    competition: "FIFA World Cup 2026",
    stadium: " Levi's Stadium, Santa Clara USA",

    overview: {
      possession:[63,37],
      distance:[104.3,104.8],
      xg:[1.69,0.46],
      bigChances:[4,0],
      shots:[11,11],
      saves:[3,1],
      sprints:[114,98],
      corners:[4,3],
      fouls:[12,7],
      passes:[580,332],
      tackles:[17,15],
      freeKicks:[6,12],
      yellowCards:[1,0],
      redCards:[0,0] // not shown
    },

    shots:{
      shotsOnTarget:[4,4],
      hitWoodwork:[0,1],
      offTarget:[6,5],
      blocked:[1,2],
      insideBox:[6,7],
      outsideBox:[5,4]
    },

    attack:{
      bigScored:[1,0],
      bigMissed:[3,0],
      throughBalls:[0,0], // not shown
      touchesBox:[28,21],
      fouledThird:[1,2],
      offsides:[3,1]
    },

    duels:{
      possession:[47,53],
      dispossessed:[7,8],

      ground:[41,59],
      groundCompleted:["27/66","39/66"],

      aerial:[64,36],
      aerialCompleted:["16/25","9/25"],

      dribbles:[33,63],
      dribblesCompleted:["4/12","15/24"]
    },

    passes:{
      accurate:[487,241],
      throwIns:[21,19],
      finalThird:[62,41],

      finalThirdCompleted:["96/140","66/94"],
      finalThirdPercent:[69,70],

      longBallsCompleted:["18/47","23/52"],
      longBallsPercent:[38,44],

      crossesCompleted:["3/17","3/15"],
      crossesPercent:[18,20]
    },

    defending:{
      tacklesWon:[53,40],
      tackles:[17,15],
      interceptions:[15,12],
      recoveries:[52,39],
      clearances:[24,39],
      errorsShot:[0,2],
      errorsGoal:[0,0] // not shown
    },

    goalkeeping:{
      saves:[3,1],
      goalsPrevented:[0.18,-1.71],
      bigSaves:[1,0],
      claims:[0,0], // not shown
      punches:[1,1],
      goalKicks:[3,10]
    },

    lineup:{
      home:[
        "Patrick Pentz",
        "Stefan Posch",
        "Kevin Danso",
        "Philipp Lienhart",
        "Alexander Prass",
        "Konrad Laimer",
        "Nicolas Seiwald",
        "Marcel Sabitzer",
        "Christoph Baumgartner",
        "Michael Gregoritsch",
        "Marko Arnautović"
      ],

      away:[
        "Yazeed Abu Layla",
        "Ehsan Haddad",
        "Yazan Al-Arab",
        "Abdallah Nasib",
        "Mohammad Abu Hasheesh",
        "Nizar Al-Rashdan",
        "Noor Al-Rawabdeh",
        "Mousa Al-Taamari",
        "Mahmoud Al-Mardi",
        "Ali Olwan",
        "Yazan Al-Naimat"
      ]
    }
  },

  1021: {
    competition: "FIFA World Cup 2026",
    stadium: " NRG Stadium, Houston USA",

    overview: {
      possession:[75,25],
      distance:[99.8,102.0],
      xg:[0.65,0.87],
      bigChances:[1,1],
      shots:[7,8],
      saves:[1,0],
      sprints:[88,121],
      corners:[5,4],
      fouls:[9,10],
      passes:[783,249],
      tackles:[12,17],
      freeKicks:[10,9],
      yellowCards:[3,1],
      redCards:[0,0] // not shown
    },

    shots:{
      shotsOnTarget:[1,2],
      hitWoodwork:[0,0],
      offTarget:[4,3],
      blocked:[2,3],
      insideBox:[5,2],
      outsideBox:[2,6]
    },

    attack:{
      bigScored:[0,1],
      bigMissed:[1,0], // inferred from big chances
      throughBalls:[1,0],
      touchesBox:[29,10],
      fouledThird:[3,0],
      offsides:[3,2]
    },

    duels:{
      possession:[45,55],
      dispossessed:[10,5],

      ground:[42,58],
      groundCompleted:["25/59","34/59"],

      aerial:[53,47],
      aerialCompleted:["9/17","8/17"],

      dribbles:[42,53],
      dribblesCompleted:["5/12","8/15"]
    },

    passes:{
      accurate:[724,195],
      throwIns:[16,15],
      finalThird:[101,35],

      finalThirdCompleted:["176/207","50/73"],
      finalThirdPercent:[85,68],

      longBallsCompleted:["41/64","11/40"],
      longBallsPercent:[64,28],

      crossesCompleted:["6/23","1/10"],
      crossesPercent:[26,10]
    },

    defending:{
      tacklesWon:[50,53],
      tackles:[12,17],
      interceptions:[3,5],
      recoveries:[41,38],
      clearances:[10,27],
      errorsShot:[0,0], // not shown
      errorsGoal:[0,0] // not shown
    },

    goalkeeping:{
      saves:[1,0],
      goalsPrevented:[-0.03,-0.47],
      bigSaves:[0,0], // not shown
      claims:[2,3],
      punches:[0,0], // not shown
      goalKicks:[5,8]
    },

    lineup:{
      home:[
        "Diogo Costa",
        "João Cancelo",
        "Tomás Araújo",
        "Nuno Mendes",
        "João Neves",
        "Bernardo Silva",
        "Vitinha",
        "Renato Veiga",
        "Bruno Fernandes",
        "Pedro Neto",
        "Cristiano Ronaldo"
      ],

      away:[
        "Lionel Mpasi-Nzau",
        "Aaron Wan-Bissaka",
        "Chancel Mbemba",
        "Axel Tuanzebe",
        "Arthur Masuaku",
        "Samuel Moutoussamy",
        "Noah Sadiki", 
        "Ngal'ayel Mukau",
        "Edo Kayembe",
        "Yoane Wissa",
        "Cédric Bakambu"
      ]
    }
  },

  1022: {
    competition: "FIFA World Cup 2026",
    stadium: "Estadio Azteca, Mexico City",

    overview: {
      possession:[39,61],
      distance:[102.2,100.3],
      xg:[1.16,1.61],
      bigChances:[1,4],
      shots:[8,15],
      saves:[1,1],
      sprints:[72,76],
      corners:[3,4],
      fouls:[14,11],
      passes:[319,519],
      tackles:[10,10],
      freeKicks:[11,14],
      yellowCards:[1,1],
      redCards:[0,0] // not shown
    },

    shots:{
      shotsOnTarget:[2,4],
      hitWoodwork:[2,1],
      offTarget:[4,7],
      blocked:[2,4],
      insideBox:[4,10],
      outsideBox:[4,5]
    },

    attack:{
      bigScored:[1,3],
      bigMissed:[0,1],
      throughBalls:[0,2],
      touchesBox:[5,27],
      fouledThird:[4,3],
      offsides:[0,3]
    },

    duels:{
      possession:[49,51],
      dispossessed:[5,3],

      ground:[46,54],
      groundCompleted:["24/52","28/52"],

      aerial:[56,44],
      aerialCompleted:["10/18","8/18"],

      dribbles:[50,42],
      dribblesCompleted:["5/10","5/12"]
    },

    passes:{
      accurate:[243,444],
      throwIns:[24,26],
      finalThird:[53,57],

      finalThirdCompleted:["47/89","89/131"],
      finalThirdPercent:[53,68],

      longBallsCompleted:["17/53","17/48"],
      longBallsPercent:[32,35],

      crossesCompleted:["3/13","6/16"],
      crossesPercent:[23,38]
    },

    defending:{
      tacklesWon:[70,30],
      tackles:[10,10],
      interceptions:[7,6],
      recoveries:[39,43],
      clearances:[24,20],
      errorsShot:[1,0],
      errorsGoal:[1,1]
    },

    goalkeeping:{
      saves:[1,1],
      goalsPrevented:[-1.64,0.19],
      bigSaves:[0,0], // not shown
      claims:[2,0],
      punches:[0,0], // not shown
      goalKicks:[10,8]
    },

    lineup:{
      home:[
        "Utkir Yusupov",
        "Abdukodir Khusanov",
        "Abdulla Abdullaev",
        "Rustam Ashurmatov",
        "Sherzod Nasrullaev",
        "Abbosbek Fayzullaev",
        "Azizbek Mozgovoy",
        "Otabek Shukurov",
        "Bobur Karimov",
        "Oston Urunov",
        "Eldor Shomurodov"
      ],

      away:[
        "Camilo Vargas",
        "Daniel Muñoz",
        "Dávinson Sánchez",
        "Jhon Lucumí",
        "Johan Mojica",
        "Jefferson Lerma",
        "Jhon Arias",
        "James Rodríguez",
        "Juan Fernando Quintero",
        "Luis Díaz",
        "Luis Suárez"
      ]
    }
  },

  1023: {
    competition: "FIFA World Cup 2026",
    stadium: "AT&T Stadium, Arlington USA",

    overview: {
      possession:[52,48],
      distance:[102.2,98.9],
      xg:[3.20,0.70],
      bigChances:[7,2],
      shots:[22,10],
      saves:[3,7],
      sprints:[124,125],
      corners:[8,2],
      fouls:[10,12],
      passes:[474,443],
      tackles:[9,11],
      freeKicks:[11,10],
      yellowCards:[0,0], // not shown
      redCards:[0,0] // not shown
    },

    shots:{
      shotsOnTarget:[11,5],
      hitWoodwork:[0,0],
      offTarget:[6,3],
      blocked:[5,2],
      insideBox:[20,4],
      outsideBox:[2,6]
    },

    attack:{
      bigScored:[2,1],
      bigMissed:[5,1],
      throughBalls:[2,1],
      touchesBox:[37,16],
      fouledThird:[2,0],
      offsides:[0,1]
    },

    duels:{
      possession:[49,51],
      dispossessed:[4,4],

      ground:[52,48],
      groundCompleted:["28/54","26/54"],

      aerial:[43,57],
      aerialCompleted:["12/28","16/28"],

      dribbles:[50,50],
      dribblesCompleted:["7/14","5/10"]
    },

    passes:{
      accurate:[406,381],
      throwIns:[15,18],
      finalThird:[40,32],

      finalThirdCompleted:["49/81","64/86"],
      finalThirdPercent:[60,74],

      longBallsCompleted:["15/41","18/42"],
      longBallsPercent:[37,43],

      crossesCompleted:["6/13","2/13"],
      crossesPercent:[46,15]
    },

    defending:{
      tacklesWon:[78,73],
      tackles:[9,11],
      interceptions:[7,9],
      recoveries:[47,40],
      clearances:[16,17],
      errorsShot:[0,1],
      errorsGoal:[0,0] // not shown
    },

    goalkeeping:{
      saves:[3,7],
      goalsPrevented:[-1.49,-0.67],
      bigSaves:[1,3],
      claims:[2,0],
      punches:[2,1],
      goalKicks:[6,7]
    },

    lineup:{
      home:[
        "Jordan Pickford",
        "Reece James",
        "Ezri Konsa",
        "John Stones",
        "Nico O'Reilly",
        "Elliot Anderson",
        "Declan Rice",
        "Noni Madueke",
        "Jude Bellingham",
        "Anthony Gordon",
        "Harry Kane"
      ],

      away:[
        "Dominik Livaković",
        "Josip Stanišić",
        "Luka Vušković",
        "Joško Gvardiol",
        "Ivan Perišić",
        "Luka Modrić",
        "Mario Pašalić",
        "Petar Sučić",
        "Martin Baturina",
        "Josip Šutalo",
        "Petar Musa"
      ]
    }
  },

  1024: {
    competition: "FIFA World Cup 2026",
    stadium: " BMO Field, Toronto Canada",

    overview: {
      possession:[38,62],
      distance:[87.2,106.2],
      xg:[1.25,0.73],
      bigChances:[1,2],
      shots:[7,11],
      saves:[4,2],
      sprints:[85,94],
      corners:[2,2],
      fouls:[9,11],
      passes:[352,583],
      tackles:[16,29],
      freeKicks:[11,9],
      yellowCards:[1,2],
      redCards:[0,0] // not shown
    },

    shots:{
      shotsOnTarget:[2,4],
      hitWoodwork:[0,0],
      offTarget:[4,5],
      blocked:[1,2],
      insideBox:[6,6],
      outsideBox:[1,5]
    },

    attack:{
      bigScored:[1,0],
      bigMissed:[0,2],
      throughBalls:[0,1],
      touchesBox:[14,19],
      fouledThird:[3,1],
      offsides:[4,1]
    },

    duels:{
      possession:[50,50],
      dispossessed:[14,8],

      ground:[44,56],
      groundCompleted:["35/79","44/79"],

      aerial:[62,38],
      aerialCompleted:["21/34","13/34"],

      dribbles:[38,43],
      dribblesCompleted:["9/24","6/14"]
    },

    passes:{
      accurate:[292,503],
      throwIns:[21,23],
      finalThird:[62,66],

      finalThirdCompleted:["55/80","78/126"],
      finalThirdPercent:[69,62],

      longBallsCompleted:["30/52","34/70"],
      longBallsPercent:[58,49],

      crossesCompleted:["4/16","4/21"],
      crossesPercent:[25,19]
    },

    defending:{
      tacklesWon:[56,38],
      tackles:[16,29],
      interceptions:[8,5],
      recoveries:[50,48],
      clearances:[28,17],
      errorsShot:[0,0], // not shown
      errorsGoal:[0,0] // not shown
    },

    goalkeeping:{
      saves:[4,2],
      goalsPrevented:[1.36,0.04],
      bigSaves:[1,0],
      claims:[2,0],
      punches:[2,0],
      goalKicks:[10,9]
    },

    lineup:{
      home:[
        "Lawrence Ati-Zigi",
        "Mohammed Salisu",
        "Jerome Opoku",
        "Joseph Aidoo",
        "Alidu Seidu",
        "Christopher Antwi-Adjei",
        "Elisha Owusu",
        "Clement Yirenkyi",
        "Ernest Nuamah",
        "Kamaldeen Sulemana",
        "Antoine Semenyo"
      ],

      away:[
        "Orlando Mosquera",
        "César Blackman",
        "José Córdoba",
        "Andrés Andrade",
        "José Luis Rodríguez",
        "Adalberto Carrasquilla",
        "Christian Martínez",
        "César Harvey",
        "Yoel Bárcenas",
        "José Fajardo",
        "José Raúl Rodríguez Ramos"
      ]
    }
  },

  2001: {
    competition: "FIFA World Cup 2026",
    stadium: " Mercedes Benz Stadium, Atlanta USA",

    overview: {
      possession:[38,62],
      distance:[108.5,103.1],
      xg:[1.02,1.38],
      bigChances:[3,1],
      shots:[14,17],
      saves:[3,2],
      sprints:[94,126],
      corners:[5,5],
      fouls:[12,10],
      passes:[341,563],
      tackles:[12,20],
      freeKicks:[10,11],
      yellowCards:[1,2],
      redCards:[0,0] // not shown
    },

    shots:{
      shotsOnTarget:[3,4],
      hitWoodwork:[0,0],
      offTarget:[8,5],
      blocked:[3,8],
      insideBox:[11,6],
      outsideBox:[3,11]
    },

    attack:{
      bigScored:[1,1],
      bigMissed:[2,0],
      throughBalls:[0,1],
      touchesBox:[16,20],
      fouledThird:[1,2],
      offsides:[2,3]
    },

    duels:{
      possession:[49,51],
      dispossessed:[16,7],

      ground:[46,54],
      groundCompleted:["32/70","38/70"],

      aerial:[59,41],
      aerialCompleted:["13/22","9/22"],

      dribbles:[71,62],
      dribblesCompleted:["10/14","8/13"]
    },

    passes:{
      accurate:[272,508],
      throwIns:[16,15],
      finalThird:[39,59],

      finalThirdCompleted:["40/67","101/132"],
      finalThirdPercent:[60,77],

      longBallsCompleted:["22/45","30/58"],
      longBallsPercent:[49,52],

      crossesCompleted:["7/16","4/17"],
      crossesPercent:[44,24]
    },

    defending:{
      tacklesWon:[33,55],
      tackles:[12,20],
      interceptions:[9,9],
      recoveries:[46,45],
      clearances:[22,24],
      errorsShot:[1,1],
      errorsGoal:[0,0] // not shown
    },

    goalkeeping:{
      saves:[3,2],
      goalsPrevented:[0.12,-0.47],
      bigSaves:[0,0], // not shown
      claims:[0,0], // not shown
      punches:[0,1],
      goalKicks:[8,10]
    },

    lineup:{
      home:[
        "Matěj Kovář",
        "Tomáš Holeš",
        "Robin Hranáč",
        "Ladislav Krejčí",
        "Vladimír Coufal",
        "Lukáš Červ",
        "Vladimír Darida",
        "Michal Sadílek",
        "Adam Hložek",
        "Patrik Schick",
        "Antonín Sojka"
      ],

      away:[
        "Ronwen Williams",
        "Aubrey Modiba",
        "Mothobi Mvala",
        "Khuliso Mudau",
        "Teboho Mokoena",
        "Thalente Mbatha",
        "Relebohile Mofokeng",
        "Oswin Appollis",
        "Lyle Foster",
        "Mohau Nkota",
        "Tshepang Moremi"
      ]
    }
  },

  2002: {
    competition: "FIFA World Cup 2026",
    stadium: "Estadio Akron, Guadalajara Mexico",

    overview: {
      possession:[42,58],
      distance:[105.2,104.0],
      xg:[0.53,0.91],
      bigChances:[2,3],
      shots:[8,9],
      saves:[2,3],
      sprints:[99,103],
      corners:[0,2],
      fouls:[9,7],
      passes:[427,578],
      tackles:[14,17],
      freeKicks:[7,9],
      yellowCards:[0,2],
      redCards:[0,0] // not shown
    },

    shots:{
      shotsOnTarget:[4,2],
      hitWoodwork:[0,0],
      offTarget:[3,4],
      blocked:[1,3],
      insideBox:[5,6],
      outsideBox:[3,3]
    },

    attack:{
      bigScored:[1,0],
      bigMissed:[1,3],
      throughBalls:[0,0], // not shown
      touchesBox:[6,11],
      fouledThird:[0,0], // not shown
      offsides:[3,6]
    },

    duels:{
      possession:[47,53],
      dispossessed:[13,6],

      ground:[44,56],
      groundCompleted:["27/61","34/61"],

      aerial:[54,46],
      aerialCompleted:["15/28","13/28"],

      dribbles:[60,53],
      dribblesCompleted:["6/10","9/17"]
    },

    passes:{
      accurate:[349,488],
      throwIns:[17,25],
      finalThird:[43,72],

      finalThirdCompleted:["39/72","67/118"],
      finalThirdPercent:[54,57],

      longBallsCompleted:["16/56","23/64"],
      longBallsPercent:[29,36],

      crossesCompleted:["4/6","5/9"],
      crossesPercent:[67,56]
    },

    defending:{
      tacklesWon:[50,59],
      tackles:[14,17],
      interceptions:[6,5],
      recoveries:[50,51],
      clearances:[20,12],
      errorsShot:[0,2],
      errorsGoal:[0,1]
    },

    goalkeeping:{
      saves:[2,3],
      goalsPrevented:[0.76,-0.10],
      bigSaves:[0,2],
      claims:[0,0], // not shown
      punches:[1,0],
      goalKicks:[5,5]
    },

    lineup:{
      home:[
        "José Antonio Rodríguez",
        "Jorge Sánchez",
        "Edson Álvarez",
        "Johan Vásquez",
        "Jesús Gallardo",
        "Erik Lira",
        "Érick Gutiérrez",
        "Hirving Lozano",
        "Roberto Alvarado",
        "Luis Quiñones",
        "Raúl Jiménez"
      ],

      away:[
        "Kim Seung-gyu",
        "Lee Tae-seok",
        "Kim Min-jae",
        "Lee Han-beom",
        "Kim Moon-hwan",
        "Paik Seung-ho",
        "Lee Kang-in",
        "Lee Jae-sung",
        "Seol Young-woo",
        "Kim Min-kyu",
        "Son Heung-min"
      ]
    }
  },

  2003: {
    competition: "FIFA World Cup 2026",
    stadium: "SoFi Stadium, Inglewood USA",

    overview: {
      possession:[62,38],
      distance:[104.3,103.8],
      xg:[2.06,0.23],
      bigChances:[4,0],
      shots:[13,5],
      saves:[2,3],
      sprints:[86,95],
      corners:[7,3],
      fouls:[7,18],
      passes:[586,354],
      tackles:[19,13],
      freeKicks:[17,7],
      yellowCards:[1,2],
      redCards:[0,1]
    },

    shots:{
      shotsOnTarget:[7,3],
      hitWoodwork:[0,0],
      offTarget:[3,1],
      blocked:[3,1],
      insideBox:[9,3],
      outsideBox:[4,2]
    },

    attack:{
      bigScored:[3,0],
      bigMissed:[1,0],
      throughBalls:[0,0], // not shown
      touchesBox:[35,8],
      fouledThird:[3,2],
      offsides:[3,1]
    },

    duels:{
      possession:[58,42],
      dispossessed:[7,13],

      ground:[62,38],
      groundCompleted:["42/68","26/68"],

      aerial:[45,55],
      aerialCompleted:["10/22","12/22"],

      dribbles:[50,50],
      dribblesCompleted:["6/12","6/12"]
    },

    passes:{
      accurate:[516,287],
      throwIns:[21,8],
      finalThird:[57,36],

      finalThirdCompleted:["131/165","42/72"],
      finalThirdPercent:[79,58],

      longBallsCompleted:["25/50","13/48"],
      longBallsPercent:[50,27],

      crossesCompleted:["1/23","1/12"],
      crossesPercent:[4,8]
    },

    defending:{
      tacklesWon:[68,23],
      tackles:[19,13],
      interceptions:[5,11],
      recoveries:[42,49],
      clearances:[17,36],
      errorsShot:[1,1],
      errorsGoal:[0,0] // not shown
    },

    goalkeeping:{
      saves:[2,3],
      goalsPrevented:[-0.73,-1.54],
      bigSaves:[0,0], // not shown
      claims:[1,0],
      punches:[1,1],
      goalKicks:[3,8]
    },

    lineup:{
      home:[
        "Gregor Kobel",
        "Silvan Widmer",
        "Nico Elvedi",
        "Manuel Akanji",
        "Ricardo Rodríguez",
        "Granit Xhaka",
        "Michel Aebischer",
        "Remo Freuler",
        "Fabian Rieder",
        "Breel Embolo",
        "Dan Ndoye"
      ],

      away:[
        "Nikola Vasilj",
        "Sead Kolašinac",
        "Tarik Muharemović",
        "Nikola Katić",
        "Amar Dedić",
        "Ivan Šunjić",
        "Benjamin Tahirović",
        "Armin Memić",
        "Kerim Alajbegović",
        "Edin Džeko",
        "Ermedin Demirović"
      ]
    }
  },

  2004: {
    competition: "FIFA World Cup 2026",
    stadium: "BC Place, Vancouver Canada",

    overview: {
      possession:[79,21],
      distance:[83.5,75.4],
      xg:[4.60,0.22],
      bigChances:[6,0],
      shots:[32,2],
      saves:[0,4],
      sprints:[60,46],
      corners:[19,1],
      fouls:[9,10],
      passes:[567,162],
      tackles:[9,16],
      freeKicks:[10,9],
      yellowCards:[1,1],
      redCards:[0,2]
    },

    shots:{
      shotsOnTarget:[10,0],
      hitWoodwork:[0,0],
      offTarget:[8,1],
      blocked:[14,1],
      insideBox:[21,1],
      outsideBox:[11,1]
    },

    attack:{
      bigScored:[3,0],
      bigMissed:[3,0],
      throughBalls:[1,0],
      touchesBox:[97,1],
      fouledThird:[5,1],
      offsides:[1,1]
    },

    duels:{
      possession:[49,51],
      dispossessed:[11,6],

      ground:[48,52],
      groundCompleted:["25/52","27/52"],

      aerial:[53,47],
      aerialCompleted:["8/15","7/15"],

      dribbles:[55,40],
      dribblesCompleted:["6/11","2/5"]
    },

    passes:{
      accurate:[515,104],
      throwIns:[23,9],
      finalThird:[60,23],

      finalThirdCompleted:["342/381","9/27"],
      finalThirdPercent:[90,33],

      longBallsCompleted:["10/16","17/54"],
      longBallsPercent:[63,31],

      crossesCompleted:["13/55","1/3"],
      crossesPercent:[24,33]
    },

    defending:{
      tacklesWon:[56,63],
      tackles:[9,16],
      interceptions:[6,10],
      recoveries:[39,25],
      clearances:[3,61],
      errorsShot:[0,1],
      errorsGoal:[0,2]
    },

    goalkeeping:{
      saves:[0,4],
      goalsPrevented:[0.00,-1.15],
      bigSaves:[0,1],
      claims:[0,3],
      punches:[0,0], // not shown
      goalKicks:[2,13]
    },

    lineup:{
      home:[
        "Maxime Crépeau",
        "Alistair Johnston",
        "Tajon Buchanan",
        "Luc de Fougerolles",
        "Richie Laryea",
        "Ismaël Koné",
        "Stephen Eustáquio",
        "David Junior Hoilett",
        "Ali Ahmed",
        "Cyle Larin",
        "Jonathan David"
      ],

      away:[
        "Meshaal Barsham Al-Abdullah",
        "Homam Ahmed Al-Amin",
        "Boualem Khoukhi",
        "Pedro Miguel Carvalho Deus Correia",
        "Ahmed Alaaeldin Ouji",
        "Assim Madibo",
        "Jassem Gaber Abdulsallam",
        "Yusuf Abdurisag",
        "Abdulaziz Hatem Laye",
        "Akram Afif",
        "Edmilson Junior"
      ]
    }
  },

  2005: {
    competition: "FIFA World Cup 2026",
    stadium: "Gillette Stadium, Foxborough USA",

    overview: {
      possession:[41,59],
      distance:[104.8,102.9],
      xg:[0.51,0.99],
      bigChances:[1,3],
      shots:[6,12],
      saves:[1,0],
      sprints:[98,119],
      corners:[2,5],
      fouls:[11,8],
      passes:[456,670],
      tackles:[20,10],
      freeKicks:[8,11],
      yellowCards:[1,1],
      redCards:[0,0] // not shown
    },

    shots:{
      shotsOnTarget:[0,2],
      hitWoodwork:[0,1],
      offTarget:[3,6],
      blocked:[3,4],
      insideBox:[5,9],
      outsideBox:[1,3]
    },

    attack:{
      bigScored:[0,1],
      bigMissed:[1,2],
      throughBalls:[0,2],
      touchesBox:[20,26],
      fouledThird:[2,2],
      offsides:[1,0]
    },

    duels:{
      possession:[53,47],
      dispossessed:[8,7],

      ground:[55,45],
      groundCompleted:["31/56","25/56"],

      aerial:[44,56],
      aerialCompleted:["7/16","9/16"],

      dribbles:[67,28],
      dribblesCompleted:["4/6","5/18"]
    },

    passes:{
      accurate:[388,600],
      throwIns:[9,19],
      finalThird:[59,62],

      finalThirdCompleted:["59/96","96/134"],
      finalThirdPercent:[61,72],

      longBallsCompleted:["20/47","14/44"],
      longBallsPercent:[43,32],

      crossesCompleted:["3/13","2/10"],
      crossesPercent:[23,20]
    },

    defending:{
      tacklesWon:[60,60],
      tackles:[20,10],
      interceptions:[9,5],
      recoveries:[42,46],
      clearances:[17,14],
      errorsShot:[1,1],
      errorsGoal:[0,0] // not shown
    },

    goalkeeping:{
      saves:[1,0],
      goalsPrevented:[-0.51,0.00],
      bigSaves:[1,0],
      claims:[1,0],
      punches:[0,0], // not shown
      goalKicks:[7,7]
    },

    lineup:{
      home:[
        "Angus Gunn",
        "Nathan Patterson",
        "Grant Hanley",
        "Jack Hendry",
        "Andrew Robertson",
        "Kieran Tierney",
        "John McGinn",
        "Ryan Christie",
        "Lewis Ferguson",
        "Scott McTominay",
        "Ché Adams"
      ],

      away:[
        "Yassine Bounou",
        "Achraf Hakimi",
        "Chadi Riad",
        "Nayef Aguerd",
        "Noussair Mazraoui",
        "Ismaël Saibari",
        "Azzedine Ounahi",
        "Bilal El Khannouss",
        "Amine Bouaddi",
        "Brahim Díaz",
        "Nayef El Aynaoui"
      ]
    }
  },

  2006: {
    competition: "FIFA World Cup 2026",
    stadium: "Lincoln Financial Field, Philadelphia USA",

    overview: {
      possession:[57,43],
      distance:[99.1,102.9],
      xg:[1.75,0.23],
      bigChances:[5,0],
      shots:[8,7],
      saves:[3,2],
      sprints:[142,128],
      corners:[4,4],
      fouls:[13,14],
      passes:[525,399],
      tackles:[21,16],
      freeKicks:[14,13],
      yellowCards:[1,3],
      redCards:[0,0] // not shown
    },

    shots:{
      shotsOnTarget:[5,3],
      hitWoodwork:[0,0],
      offTarget:[2,3],
      blocked:[1,1],
      insideBox:[8,4],
      outsideBox:[0,3]
    },

    attack:{
      bigScored:[3,0],
      bigMissed:[2,0],
      throughBalls:[3,0],
      touchesBox:[24,17],
      fouledThird:[1,3],
      offsides:[8,4]
    },

    duels:{
      possession:[55,45],
      dispossessed:[5,7],

      ground:[54,46],
      groundCompleted:["38/70","32/70"],

      aerial:[58,42],
      aerialCompleted:["14/24","10/24"],

      dribbles:[27,18],
      dribblesCompleted:["4/15","3/17"]
    },

    passes:{
      accurate:[462,332],
      throwIns:[20,14],
      finalThird:[53,50],

      finalThirdCompleted:["71/106","61/95"],
      finalThirdPercent:[67,64],

      longBallsCompleted:["20/44","31/56"],
      longBallsPercent:[45,55],

      crossesCompleted:["1/9","3/11"],
      crossesPercent:[11,27]
    },

    defending:{
      tacklesWon:[48,63],
      tackles:[21,16],
      interceptions:[10,9],
      recoveries:[40,35],
      clearances:[14,22],
      errorsShot:[1,0],
      errorsGoal:[0,2]
    },

    goalkeeping:{
      saves:[3,2],
      goalsPrevented:[0.43,-0.67],
      bigSaves:[2,0],
      claims:[0,0], // not shown
      punches:[0,0], // not shown
      goalKicks:[5,5]
    },

    lineup:{
      home:[
        "Alisson Becker",
        "Danilo",
        "Marquinhos",
        "Gabriel Magalhães",
        "Douglas Santos",
        "Casemiro",
        "Bruno Guimarães",
        "Lucas Paquetá",
        "Raphinha",
        "Vinícius Júnior",
        "Matheus Cunha"
      ],

      away:[
        "Johny Placide",
        "Carlens Arcus",
        "Jean-Kévin Duverne",
        "Ricardo Adé",
        "Hannes Delcroix",
        "Martin Expérience",
        "Danley Jean Jacques",
        "Josué Casimir",
        "Bryan Alceus",
        "Ruben Providence",
        "Frantzdy Pierrot"
      ]
    }
  },

  2007: {
    competition: "FIFA World Cup 2026",
    stadium: "Lumen Field, Seattle USA",

    overview: {
      possession:[62,38],
      distance:[96.7,99.5],
      xg:[1.08,0.35],
      bigChances:[2,0],
      shots:[10,5],
      saves:[2,1],
      sprints:[93,99],
      corners:[7,4],
      fouls:[12,16],
      passes:[523,310],
      tackles:[20,13],
      freeKicks:[16,12],
      yellowCards:[3,4],
      redCards:[0,0] // not shown
    },

    shots:{
      shotsOnTarget:[2,2],
      hitWoodwork:[0,0],
      offTarget:[2,3],
      blocked:[6,0],
      insideBox:[8,3],
      outsideBox:[2,2]
    },

    attack:{
      bigScored:[1,0],
      bigMissed:[1,0],
      throughBalls:[2,1],
      touchesBox:[20,20],
      fouledThird:[2,0],
      offsides:[1,0]
    },

    duels:{
      possession:[48,52],
      dispossessed:[7,9],

      ground:[54,46],
      groundCompleted:["44/81","37/81"],

      aerial:[36,64],
      aerialCompleted:["15/42","27/42"],

      dribbles:[65,56],
      dribblesCompleted:["11/17","14/25"]
    },

    passes:{
      accurate:[444,219],
      throwIns:[18,22],
      finalThird:[65,43],

      finalThirdCompleted:["103/135","53/83"],
      finalThirdPercent:[76,64],

      longBallsCompleted:["26/59","19/46"],
      longBallsPercent:[44,41],

      crossesCompleted:["4/14","4/19"],
      crossesPercent:[29,21]
    },

    defending:{
      tacklesWon:[40,85],
      tackles:[20,13],
      interceptions:[20,6],
      recoveries:[39,44],
      clearances:[31,24],
      errorsShot:[2,0],
      errorsGoal:[0,0] // not shown
    },

    goalkeeping:{
      saves:[2,1],
      goalsPrevented:[0.09,-0.69],
      bigSaves:[0,0], // not shown
      claims:[0,0], // not shown
      punches:[0,0], // not shown
      goalKicks:[10,4]
    },

    lineup:{
      home:[
        "Matt Freese",
        "Chris Richards",
        "Tim Ream",
        "Antonee Robinson",
        "Sergiño Dest",
        "Alex Freeman",
        "Tyler Adams",
        "Weston McKennie",
        "Malik Tillman",
        "Ricardo Pepi",
        "Folarin Balogun"
      ],

      away:[
        "Paul Beach",
        "Jason Geria",
        "Cameron Burgess",
        "Harry Souttar",
        "Alessandro Circati",
        "Jordan Bos",
        "Patrick O'Connor-Engstler",
        "Aiden O'Neill",
        "Nestory Irankunda Velupillay",
        "Mathew Leckie",
        "Mohamed Touré"
      ]
    }
  },

  2008: {
    competition: "FIFA World Cup 2026",
    stadium: "Levi's Stadium, Santa Clara USA",

    overview: {
      possession:[79,21],
      distance:[111.0,104.4],
      xg:[2.17,0.32],
      bigChances:[5,0],
      shots:[32,7],
      saves:[1,5],
      sprints:[111,98],
      corners:[12,0],
      fouls:[14,15],
      passes:[629,178],
      tackles:[17,25],
      freeKicks:[15,14],
      yellowCards:[1,1],
      redCards:[0,1]
    },

    shots:{
      shotsOnTarget:[5,2],
      hitWoodwork:[1,0],
      offTarget:[15,3],
      blocked:[12,2],
      insideBox:[16,3],
      outsideBox:[16,4]
    },

    attack:{
      bigScored:[0,0], // not shown
      bigMissed:[5,0],
      throughBalls:[1,0],
      touchesBox:[50,12],
      fouledThird:[4,2],
      offsides:[2,3]
    },

    duels:{
      possession:[45,55],
      dispossessed:[11,7],

      ground:[46,54],
      groundCompleted:["45/97","52/97"],

      aerial:[43,57],
      aerialCompleted:["15/35","20/35"],

      dribbles:[48,60],
      dribblesCompleted:["13/27","15/25"]
    },

    passes:{
      accurate:[559,96],
      throwIns:[34,18],
      finalThird:[76,46],

      finalThirdCompleted:["261/310","25/63"],
      finalThirdPercent:[84,40],

      longBallsCompleted:["28/42","22/64"],
      longBallsPercent:[67,34],

      crossesCompleted:["8/42","2/6"],
      crossesPercent:[19,33]
    },

    defending:{
      tacklesWon:[65,60],
      tackles:[17,25],
      interceptions:[6,9],
      recoveries:[46,49],
      clearances:[29,48],
      errorsShot:[0,0], // not shown
      errorsGoal:[0,0] // not shown
    },

    goalkeeping:{
      saves:[1,5],
      goalsPrevented:[-0.79,0.67],
      bigSaves:[0,0], // not shown
      claims:[0,0], // not shown
      punches:[0,1],
      goalKicks:[3,13]
    },

    lineup:{
      home:[
        "Uğurcan Çakır",
        "Merih Demiral",
        "Abdülkerim Bardakcı",
        "Ferdi Kadıoğlu",
        "Mert Müldür",
        "Hakan Çalhanoğlu",
        "İsmail Yüksek",
        "Arda Güler",
        "Kaan Ayhan",
        "Kenan Yıldız",
        "Yunus Akgün"
      ],

      away:[
        "Orlando Gill",
        "Gustavo Gómez",
        "Omar Alderete",
        "Júnior Alonso",
        "Juan José Cáceres",
        "Diego Gómez",
        "Andrés Cubas",
        "Matías Galarza",
        "Julio Enciso",
        "Ángel Romero",
        "Miguel Almirón"
      ]
    }
  },

  2009: {
    competition: "FIFA World Cup 2026",
    stadium: " BMO Field, Toronto Canada",

    overview: {
      possession:[60,40],
      distance:[102.1,100.6],
      xg:[1.89,1.22],
      bigChances:[5,2],
      shots:[16,9],
      saves:[1,5],
      sprints:[121,109],
      corners:[8,3],
      fouls:[5,7],
      passes:[624,431],
      tackles:[26,20],
      freeKicks:[7,5],
      yellowCards:[0,0],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[7,2],
      hitWoodwork:[0,0],
      offTarget:[5,2],
      blocked:[4,5],
      insideBox:[9,6],
      outsideBox:[7,3]
    },

    attack:{
      bigScored:[2,1],
      bigMissed:[3,1],
      throughBalls:[1,0],
      touchesBox:[33,22],
      fouledThird:[1,1],
      offsides:[0,1]
    },

    duels:{
      possession:[47,53],
      dispossessed:[10,13],

      ground:[46,54],
      groundCompleted:["38/82","44/82"],

      aerial:[50,50],
      aerialCompleted:["10/20","10/20"],

      dribbles:[38,61],
      dribblesCompleted:["6/16","20/33"]
    },

    passes:{
      accurate:[555,367],
      throwIns:[18,24],
      finalThird:[79,37],

      finalThirdCompleted:["176/221","68/94"],
      finalThirdPercent:[80,72],

      longBallsCompleted:["18/31","28/57"],
      longBallsPercent:[58,49],

      crossesCompleted:["5/21","5/9"],
      crossesPercent:[24,56]
    },

    defending:{
      tacklesWon:[65,55],
      tackles:[26,20],
      interceptions:[8,13],
      recoveries:[51,55],
      clearances:[14,26],
      errorsShot:[2,2],
      errorsGoal:[1,0]
    },

    goalkeeping:{
      saves:[1,5],
      goalsPrevented:[0.10,0.36],
      bigSaves:[0,0], // not shown
      claims:[0,2],
      punches:[0,0], // not shown
      goalKicks:[4,7]
    },

    lineup:{
      home:[
        "Manuel Neuer",
        "Jonathan Tah",
        "Nico Schlotterbeck",
        "Nathaniel Brown",
        "Joshua Kimmich",
        "Aleksandar Pavlović",
        "Felix Nmecha",
        "Jamal Musiala",
        "Florian Wirtz",
        "Leroy Sané",
        "Kai Havertz"
      ],

      away:[
        "Yahia Fofana",
        "Ousmane Diomande",
        "Odilon Kossounou",
        "Emmanuel Agbadou",
        "Ghislain Konan",
        "Wilfried Singo",
        "Ibrahim Sangaré",
        "Franck Kessié",
        "Christ Inao Oulaï",
        "Amad Diallo",
        "Ange-Yoan Bonny"
      ]
    }
  },

  2010: {
    competition: "FIFA World Cup 2026",
    stadium: "Arrowhead Stadium, Kansas City USA",

    overview: {
      possession:[75,25],
      distance:[100.5,99.6],
      xg:[2.84,0.50],
      bigChances:[6,0],
      shots:[27,10],
      saves:[3,15],
      sprints:[140,155],
      corners:[9,0],
      fouls:[7,10],
      passes:[644,227],
      tackles:[19,17],
      freeKicks:[10,7],
      yellowCards:[1,5],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[15,3],
      hitWoodwork:[1,0],
      offTarget:[10,4],
      blocked:[2,3],
      insideBox:[21,4],
      outsideBox:[6,6]
    },

    attack:{
      bigScored:[0,0], // not shown
      bigMissed:[6,0],
      throughBalls:[1,0],
      touchesBox:[43,12],
      fouledThird:[1,1],
      offsides:[1,2]
    },

    duels:{
      possession:[50,50],
      dispossessed:[12,7],

      ground:[52,48],
      groundCompleted:["36/69","33/69"],

      aerial:[44,56],
      aerialCompleted:["15/34","19/34"],

      dribbles:[62,43],
      dribblesCompleted:["8/13","9/21"]
    },

    passes:{
      accurate:[581,159],
      throwIns:[18,15],
      finalThird:[100,28],

      finalThirdCompleted:["191/235","32/52"],
      finalThirdPercent:[81,62],

      longBallsCompleted:["14/34","15/50"],
      longBallsPercent:[41,30],

      crossesCompleted:["11/33","1/1"],
      crossesPercent:[33,100]
    },

    defending:{
      tacklesWon:[58,41],
      tackles:[19,17],
      interceptions:[7,8],
      recoveries:[56,57],
      clearances:[17,32],
      errorsShot:[0,1],
      errorsGoal:[0,0] // not shown
    },

    goalkeeping:{
      saves:[3,15],
      goalsPrevented:[0.88,2.27],
      bigSaves:[1,5],
      claims:[0,0], // not shown
      punches:[0,0], // not shown
      goalKicks:[5,14]
    },

    lineup:{
      home:[
        "Hernán Galíndez",
        "Willian Pacho",
        "Joel Ordóñez Alcívar",
        "Piero Hincapié",
        "Alan Franco",
        "Moisés Caicedo",
        "Pedro Vite",
        "Enner Valencia",
        "Gonzalo Plata",
        "Pervis Estupiñán",
        "John Yeboah"
      ],

      away:[
        "Eloy Room",
        "Denzel Dumfries Fonville",
        "Sherel Floranus",
        "Armando Obispo",
        "Juriën Gaari",
        "Jürgen Locadia",
        "Leandro Bacuna",
        "Juninho Bacuna",
        "Livano Comenencia",
        "Tahith Chong",
        "Jeremy Antonisse Brenet"
      ]
    }
  },

  2011: {
    competition: "FIFA World Cup 2026",
    stadium: "NRG Stadium, Houston USA",

    overview: {
      possession:[51,49],
      distance:[98.8,103.2],
      xg:[2.61,1.01],
      bigChances:[3,2],
      shots:[10,16],
      saves:[7,2],
      sprints:[124,109],
      corners:[2,5],
      fouls:[9,12],
      passes:[449,425],
      tackles:[15,18],
      freeKicks:[12,9],
      yellowCards:[0,3],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[7,8],
      hitWoodwork:[0,0],
      offTarget:[2,5],
      blocked:[1,3],
      insideBox:[6,7],
      outsideBox:[4,9]
    },

    attack:{
      bigScored:[3,1],
      bigMissed:[0,1],
      throughBalls:[1,1],
      touchesBox:[20,26],
      fouledThird:[2,3],
      offsides:[3,3]
    },

    duels:{
      possession:[48,52],
      dispossessed:[8,10],

      ground:[47,53],
      groundCompleted:["29/62","33/62"],

      aerial:[52,48],
      aerialCompleted:["14/27","13/27"],

      dribbles:[23,58],
      dribblesCompleted:["3/13","7/12"]
    },

    passes:{
      accurate:[398,361],
      throwIns:[13,22],
      finalThird:[49,36],

      finalThirdCompleted:["75/97","87/107"],
      finalThirdPercent:[77,81],

      longBallsCompleted:["18/35","6/30"],
      longBallsPercent:[51,20],

      crossesCompleted:["3/16","3/21"],
      crossesPercent:[19,14]
    },

    defending:{
      tacklesWon:[53,50],
      tackles:[15,18],
      interceptions:[8,5],
      recoveries:[40,36],
      clearances:[24,14],
      errorsShot:[0,1],
      errorsGoal:[0,0] // not shown
    },

    goalkeeping:{
      saves:[7,2],
      goalsPrevented:[0.71,-0.80],
      bigSaves:[5,0],
      claims:[0,0], // not shown
      punches:[1,0],
      goalKicks:[11,11]
    },

    lineup:{
      home:[
        "Bart Verbruggen",
        "Virgil van Dijk",
        "Jan Paul van Hecke",
        "Micky van de Ven",
        "Denzel Dumfries",
        "Frenkie de Jong",
        "Ryan Gravenberch",
        "Tijjani Reijnders",
        "Donyell Malen",
        "Cody Gakpo",
        "Brian Brobbey"
      ],

      away:[
        "Kristoffer Nordfeldt",
        "Hjalmar Ekdal",
        "Victor Lindelöf",
        "Gabriel Gudmundsson",
        "Gustaf Lagerbielke",
        "Jens Cajuste",
        "Jesper Karlström",
        "Hugo Larsson",
        "Viktor Gyökeres",
        "Alexander Isak",
        "Alexander Bernhardsson"
      ]
    }
  },

  2012: {
    competition: "FIFA World Cup 2026",
    stadium: "Estadio BBVA, Monterrey Mexico",

    overview: {
      possession:[38,62],
      distance:[90.4,93.6],
      xg:[0.05,2.13],
      bigChances:[0,4],
      shots:[2,11],
      saves:[1,0],
      sprints:[78,81],
      corners:[3,5],
      fouls:[8,15],
      passes:[354,583],
      tackles:[18,18],
      freeKicks:[15,8],
      yellowCards:[0,0],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[0,5],
      hitWoodwork:[0,0],
      offTarget:[1,3],
      blocked:[1,3],
      insideBox:[1,8],
      outsideBox:[1,3]
    },

    attack:{
      bigScored:[0,2],
      bigMissed:[0,2],
      throughBalls:[0,1],
      touchesBox:[8,17],
      fouledThird:[0,1],
      offsides:[1,1]
    },

    duels:{
      possession:[47,53],
      dispossessed:[13,7],

      ground:[54,46],
      groundCompleted:["34/63","29/63"],

      aerial:[22,78],
      aerialCompleted:["4/18","14/18"],

      dribbles:[29,27],
      dribblesCompleted:["2/7","4/15"]
    },

    passes:{
      accurate:[284,521],
      throwIns:[29,23],
      finalThird:[59,70],

      finalThirdCompleted:["42/79","95/135"],
      finalThirdPercent:[53,70],

      longBallsCompleted:["16/56","18/32"],
      longBallsPercent:[29,56],

      crossesCompleted:["2/10","2/11"],
      crossesPercent:[20,18]
    },

    defending:{
      tacklesWon:[89,67],
      tackles:[18,18],
      interceptions:[14,7],
      recoveries:[38,35],
      clearances:[23,25],
      errorsShot:[1,0],
      errorsGoal:[1,0]
    },

    goalkeeping:{
      saves:[1,0],
      goalsPrevented:[-1.27,0.00],
      bigSaves:[1,0],
      claims:[0,1],
      punches:[1,0],
      goalKicks:[4,5]
    },

    lineup:{
      home:[
        "Aymen Dahmen",
        "Montassar Talbi",
        "Omar Rekik",
        "Dylan Bronn",
        "Yan Valery",
        "Ellyes Skhiri",
        "Anis Ben Slimane",
        "Hannibal Mejbri",
        "Elias Saad",
        "Sayfallah Ltaief",
        "Seifeddine Tounekti"
      ],

      away:[
        "Zion Suzuki",
        "Ko Itakura",
        "Takehiro Tomiyasu",
        "Hiroki Ito",
        "Kaishu Sano",
        "Ao Tanaka",
        "Daichi Kamada",
        "Jun'ya Ito",
        "Keito Nakamura",
        "Ritsu Doan",
        "Ayase Ueda"
      ]
    }
  },

  2013: {
    competition: "FIFA World Cup 2026",
    stadium: "SoFi Stadium, Inglewood USA",

    overview: {
      possession:[70,30],
      distance:[103.2,104.2],
      xg:[1.79,0.62],
      bigChances:[1,1],
      shots:[23,7],
      saves:[3,7],
      sprints:[78,69],
      corners:[4,2],
      fouls:[7,9],
      passes:[621,270],
      tackles:[12,19],
      freeKicks:[9,7],
      yellowCards:[1,1],
      redCards:[1,0]
    },

    shots:{
      shotsOnTarget:[7,3],
      hitWoodwork:[0,0],
      offTarget:[10,3],
      blocked:[6,1],
      insideBox:[20,6],
      outsideBox:[3,1]
    },

    attack:{
      bigScored:[0,0],
      bigMissed:[1,1],
      throughBalls:[2,0],
      touchesBox:[42,15],
      fouledThird:[3,1],
      offsides:[3,4]
    },

    duels:{
      possession:[55,45],
      dispossessed:[12,9],

      ground:[57,43],
      groundCompleted:["34/60","26/60"],

      aerial:[51,49],
      aerialCompleted:["18/35","17/35"],

      dribbles:[67,40],
      dribblesCompleted:["14/21","2/5"]
    },

    passes:{
      accurate:[533,198],
      throwIns:[26,8],
      finalThird:[79,43],

      finalThirdCompleted:["205/262","30/65"],
      finalThirdPercent:[78,46],

      longBallsCompleted:["12/35","18/50"],
      longBallsPercent:[34,36],

      crossesCompleted:["6/32","2/8"],
      crossesPercent:[19,25]
    },

    defending:{
      tacklesWon:[58,58],
      tackles:[12,19],
      interceptions:[3,12],
      recoveries:[63,52],
      clearances:[11,51],
      errorsShot:[1,2],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[3,7],
      goalsPrevented:[0.87,1.49],
      bigSaves:[2,1],
      claims:[0,3],
      punches:[0,1],
      goalKicks:[4,12]
    },

    lineup:{
      home:[
        "Thibaut Courtois",
        "Brandon Mechele",
        "Nathan Ngoy",
        "Thomas Meunier",
        "Maxim De Cuyper",
        "Youri Tielemans",
        "Nicolas Raskin",
        "Kevin De Bruyne",
        "Alexis Saelemaekers",
        "Leandro Trossard",
        "Romelu Lukaku"
      ],

      away:[
        "Alireza Beiranvand",
        "Shoja Khalilzadeh",
        "Hossein Kanaani",
        "Saleh Hardani",
        "Ehsan Hajsafi",
        "Saeid Ezatolahi",
        "Saman Ghoddos",
        "Mehdi Mohebi",
        "Rezaeian",
        "Mehdi Taremi",
        "Ali Nemati"
      ]
    }
  },

  2014: {
    competition: "FIFA World Cup 2026",
    stadium: "BC Place,Vancouver Canada",

    overview: {
      possession:[44,56],
      distance:[94.1,81.8],
      xg:[1.24,1.87],
      bigChances:[3,3],
      shots:[11,19],
      saves:[4,4],
      sprints:[83,96],
      corners:[4,3],
      fouls:[14,8],
      passes:[421,526],
      tackles:[12,16],
      freeKicks:[8,14],
      yellowCards:[2,1],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[5,7],
      hitWoodwork:[0,0],
      offTarget:[3,6],
      blocked:[3,6],
      insideBox:[6,12],
      outsideBox:[5,7]
    },

    attack:{
      bigScored:[1,1],
      bigMissed:[2,2],
      throughBalls:[0,0],
      touchesBox:[17,36],
      fouledThird:[0,5],
      offsides:[3,0]
    },

    duels:{
      possession:[44,56],
      dispossessed:[8,7],

      ground:[44,56],
      groundCompleted:["27/61","34/61"],

      aerial:[44,56],
      aerialCompleted:["16/36","20/36"],

      dribbles:[47,58],
      dribblesCompleted:["7/15","7/12"]
    },

    passes:{
      accurate:[337,460],
      throwIns:[21,23],
      finalThird:[45,73],

      finalThirdCompleted:["53/88","135/166"],
      finalThirdPercent:[60,81],

      longBallsCompleted:["20/50","22/48"],
      longBallsPercent:[40,46],

      crossesCompleted:["3/15","7/22"],
      crossesPercent:[20,32]
    },

    defending:{
      tacklesWon:[50,81],
      tackles:[12,16],
      interceptions:[4,6],
      recoveries:[55,56],
      clearances:[22,37],
      errorsShot:[2,2],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[4,4],
      goalsPrevented:[-0.45,0.62],
      bigSaves:[0,2],
      claims:[0,2],
      punches:[0,3],
      goalKicks:[10,3]
    },

    lineup:{
      home:[
        "Max Crocombe",
        "Michael Boxall",
        "Finn Surman",
        "Tim Payne",
        "Joe Bell",
        "Sarpreet Singh",
        "Marko Stamenic",
        "Callum McCowatt",
        "Elijah Just",
        "Logan Rogerson",
        "Chris Wood"
      ],

      away:[
        "Mohamed El Shenawy",
        "Omar Marmoush",
        "Mohamed Salah",
        "Mostafa Mohamed",
        "Mahmoud Hassan Trezeguet",
        "Marwan Attia",
        "Hamdi Fathi",
        "Yasser Ibrahim",
        "Mohamed Hany",
        "Ahmed Eid",
        "Ahmed Aboul-Fetouh"
      ]
    }
  },

  2015: {
    competition: "FIFA World Cup 2026",
    stadium: "Mercedes Benz Stadium, Atlanta USA",

    overview: {
      possession:[67,33],
      distance:[107.0,111.0],
      xg:[2.30,0.14],
      bigChances:[5,0],
      shots:[22,3],
      saves:[1,5],
      sprints:[128,122],
      corners:[6,1],
      fouls:[10,2],
      passes:[726,364],
      tackles:[10,15],
      freeKicks:[2,10],
      yellowCards:[0,2],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[8,1],
      hitWoodwork:[1,0],
      offTarget:[12,1],
      blocked:[2,1],
      insideBox:[13,0],
      outsideBox:[9,3]
    },

    attack:{
      bigScored:[3,0],
      bigMissed:[2,0],
      throughBalls:[2,0],
      touchesBox:[37,2],
      fouledThird:[0,0],
      offsides:[2,3]
    },

    duels:{
      possession:[44,56],
      dispossessed:[6,6],

      ground:[35,65],
      groundCompleted:["18/51","33/51"],

      aerial:[73,27],
      aerialCompleted:["11/15","4/15"],

      dribbles:[44,67],
      dribblesCompleted:["7/16","8/12"]
    },

    passes:{
      accurate:[668,294],
      throwIns:[16,15],
      finalThird:[66,44],

      finalThirdCompleted:["213/252","55/81"],
      finalThirdPercent:[85,68],

      longBallsCompleted:["28/38","14/35"],
      longBallsPercent:[74,40],

      crossesCompleted:["7/25","0/5"],
      crossesPercent:[28,0]
    },

    defending:{
      tacklesWon:[80,80],
      tackles:[10,15],
      interceptions:[13,13],
      recoveries:[55,37],
      clearances:[17,35],
      errorsShot:[1,4],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[1,5],
      goalsPrevented:[0.10,-0.55],
      bigSaves:[1,1],
      claims:[1,0],
      punches:[0,0],
      goalKicks:[1,16]
    },

    lineup:{
      home:[
        "Unai Simon",
        "Aymeric Laporte",
        "Pau Cubarsi",
        "Pedro Porro",
        "Marc Cucurella",
        "Rodri",
        "Pedri",
        "Alex Baena",
        "Dani Olmo",
        "Lamine Yamal",
        "Mikel Oyarzabal"
      ],

      away:[
        "Mohammed Al-Owais",
        "Ali Al-Amri",
        "Ali Lajami",
        "Hassan Altambakti",
        "Moteb Al-Harbi",
        "Saud Abdulhamid",
        "Abdulelah Al-Khaibari",
        "Nasser Al-Dawsari",
        "Salem Al-Dawsari",
        "Musab Al-Juwayr",
        "Feras Al-Buraikan"
      ]
    }
  },

  2016: {
    competition: "FIFA World Cup 2026",
    stadium: "Hard Rock Stadium, Miami Gardens USA",

    overview: {
      possession:[65,35],
      distance:[101.7,97.5],
      xg:[2.32,0.88],
      bigChances:[2,1],
      shots:[17,12],
      saves:[2,0],
      sprints:[139,91],
      corners:[11,4],
      fouls:[11,4],
      passes:[511,278],
      tackles:[16,16],
      freeKicks:[4,11],
      yellowCards:[2,2],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[2,4],
      hitWoodwork:[1,0],
      offTarget:[8,4],
      blocked:[7,4],
      insideBox:[9,2],
      outsideBox:[8,10]
    },

    attack:{
      bigScored:[2,1],
      bigMissed:[0,0],
      throughBalls:[0,1],
      touchesBox:[34,10],
      fouledThird:[1,3],
      offsides:[3,0]
    },

    duels:{
      possession:[46,54],
      dispossessed:[5,11],

      ground:[41,59],
      groundCompleted:["27/66","39/66"],

      aerial:[56,44],
      aerialCompleted:["20/36","16/36"],

      dribbles:[39,71],
      dribblesCompleted:["7/18","12/17"]
    },

    passes:{
      accurate:[420,205],
      throwIns:[30,19],
      finalThird:[74,31],

      finalThirdCompleted:["142/197","21/45"],
      finalThirdPercent:[72,47],

      longBallsCompleted:["23/48","18/61"],
      longBallsPercent:[48,30],

      crossesCompleted:["4/29","2/7"],
      crossesPercent:[14,29]
    },

    defending:{
      tacklesWon:[50,94],
      tackles:[16,16],
      interceptions:[7,13],
      recoveries:[44,43],
      clearances:[11,48],
      errorsShot:[0,0],
      errorsGoal:[2,0]
    },

    goalkeeping:{
      saves:[2,0],
      goalsPrevented:[-0.74,-0.35],
      bigSaves:[0,0],
      claims:[0,1],
      punches:[0,0],
      goalKicks:[4,12]
    },

    lineup:{
      home:[
        "Fernando Muslera",
        "Mathias Olivera",
        "Manuel Ugarte",
        "Sebastian Caceres",
        "Guillermo Varela",
        "Federico Valverde",
        "Rodrigo Bentancur",
        "Facundo Vinas",
        "Agustin Canobbio",
        "Maximiliano Araujo",
        "Juan Manuel Sanabria"
      ],

      away:[
        "Vozinha",
        "Pico",
        "Diney",
        "Sidny Lopes Cabral",
        "Steven Moreira",
        "Kenny Rocha Lenini",
        "Telmo Arcanjo",
        "Joao Monteiro",
        "Garry Rodrigues",
        "Ryan Mendes",
        "Gilson Tavares"
      ]
    }
  },

  2017: {
    competition: "FIFA World Cup 2026",
    stadium: "Lincoln Financial Field, Philadelphia USA",

    overview: {
      possession:[56,44],
      distance:[96.1,100.1],
      xg:[2.67,0.63],
      bigChances:[5,1],
      shots:[19,4],
      saves:[0,2],
      sprints:[84,80],
      corners:[4,2],
      fouls:[8,4],
      passes:[603,481],
      tackles:[14,16],
      freeKicks:[4,8],
      yellowCards:[0,1],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[5,0],
      hitWoodwork:[1,0],
      offTarget:[10,3],
      blocked:[4,1],
      insideBox:[12,3],
      outsideBox:[7,1]
    },

    attack:{
      bigScored:[2,0],
      bigMissed:[3,1],
      throughBalls:[3,0],
      touchesBox:[41,7],
      fouledThird:[0,1],
      offsides:[1,0]
    },

    duels:{
      possession:[51,49],
      dispossessed:[8,9],

      ground:[50,50],
      groundCompleted:["30/60","30/60"],

      aerial:[56,44],
      aerialCompleted:["10/18","8/18"],

      dribbles:[60,55],
      dribblesCompleted:["12/20","6/11"]
    },

    passes:{
      accurate:[540,413],
      throwIns:[17,15],
      finalThird:[87,32],

      finalThirdCompleted:["197/243","34/53"],
      finalThirdPercent:[81,64],

      longBallsCompleted:["17/30","21/51"],
      longBallsPercent:[57,41],

      crossesCompleted:["2/14","4/9"],
      crossesPercent:[14,44]
    },

    defending:{
      tacklesWon:[64,50],
      tackles:[14,16],
      interceptions:[5,10],
      recoveries:[53,44],
      clearances:[9,28],
      errorsShot:[0,1],
      errorsGoal:[0,1]
    },

    goalkeeping:{
      saves:[0,2],
      goalsPrevented:[0.00,-0.72],
      bigSaves:[0,0],
      claims:[0,0],
      punches:[0,2],
      goalKicks:[4,14]
    },

    lineup:{
      home:[
        "Mike Maignan",
        "William Saliba",
        "Dayot Upamecano",
        "Jules Kounde",
        "Lucas Digne",
        "Adrien Rabiot",
        "Manu Kone",
        "Bradley Barcola",
        "Michael Olise",
        "Ousmane Dembele",
        "Kylian Mbappe"
      ],

      away:[
        "Ahmed Basil",
        "Zaid Tahseen",
        "Ali Adnan",
        "Merchas Doski",
        "Ibrahim Bayesh",
        "Amir Al-Ammari",
        "Zidane Iqbal",
        "Zaid Ismail",
        "Ali Qasem",
        "Aymen Hussein",
        "Hasan Ali"
      ]
    }
  },

  2018: {
    competition: "FIFA World Cup 2026",
    stadium: "MetLife Stadium, East Rutherford USA",

    overview: {
      possession:[42,58],
      distance:[105.9,94.7],
      xg:[2.20,1.72],
      bigChances:[5,3],
      shots:[13,16],
      saves:[2,3],
      sprints:[135,127],
      corners:[5,4],
      fouls:[13,5],
      passes:[353,489],
      tackles:[10,16],
      freeKicks:[5,13],
      yellowCards:[0,0],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[7,4],
      hitWoodwork:[1,0],
      offTarget:[3,7],
      blocked:[3,5],
      insideBox:[11,10],
      outsideBox:[2,6]
    },

    attack:{
      bigScored:[2,2],
      bigMissed:[3,1],
      throughBalls:[2,1],
      touchesBox:[24,26],
      fouledThird:[0,1],
      offsides:[0,4]
    },

    duels:{
      possession:[40,60],
      dispossessed:[12,4],

      ground:[31,69],
      groundCompleted:["18/58","40/58"],

      aerial:[54,46],
      aerialCompleted:["20/37","17/37"],

      dribbles:[56,65],
      dribblesCompleted:["5/9","11/17"]
    },

    passes:{
      accurate:[282,430],
      throwIns:[16,20],
      finalThird:[45,64],

      finalThirdCompleted:["60/99","134/166"],
      finalThirdPercent:[61,81],

      longBallsCompleted:["25/51","37/58"],
      longBallsPercent:[49,64],

      crossesCompleted:["3/10","8/23"],
      crossesPercent:[30,35]
    },

    defending:{
      tacklesWon:[90,44],
      tackles:[10,16],
      interceptions:[8,10],
      recoveries:[44,42],
      clearances:[26,18],
      errorsShot:[0,2],
      errorsGoal:[0,2]
    },

    goalkeeping:{
      saves:[2,3],
      goalsPrevented:[-0.65,-1.05],
      bigSaves:[0,0],
      claims:[0,1],
      punches:[0,0],
      goalKicks:[10,4]
    },

    lineup:{
      home:[
        "Orjan Nyland",
        "Kristoffer Ajer",
        "Torbjorn Heggem",
        "Julian Ryerson",
        "David Moller Wolfe",
        "Sander Berge",
        "Martin Odegaard",
        "Fredrik Aursnes",
        "Antonio Nusa",
        "Alexander Sorloth",
        "Erling Haaland"
      ],

      away:[
        "Edouard Mendy",
        "Kalidou Koulibaly",
        "Moussa Niakhate",
        "El Hadji Malick Diouf",
        "Krepin Diatta",
        "Idrissa Gueye",
        "Lamine Camara",
        "Pape Gueye",
        "Nicolas Jackson",
        "Sadio Mane",
        "Ismaila Sarr"
      ]
    }
  },

  2019: {
    competition: "FIFA World Cup 2026",
    stadium: "AT&T Stadium, Arlington USA",

    overview: {
      possession:[54,46],
      distance:[82.3,93.8],
      xg:[2.36,0.53],
      bigChances:[3,1],
      shots:[12,6],
      saves:[1,2],
      sprints:[68,65],
      corners:[1,3],
      fouls:[13,13],
      passes:[554,468],
      tackles:[21,12],
      freeKicks:[12,13],
      yellowCards:[2,2],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[5,1],
      hitWoodwork:[0,0],
      offTarget:[4,5],
      blocked:[3,0],
      insideBox:[10,4],
      outsideBox:[2,2]
    },

    attack:{
      bigScored:[0,0],
      bigMissed:[3,1],
      throughBalls:[2,0],
      touchesBox:[19,18],
      fouledThird:[4,4],
      offsides:[2,0]
    },

    duels:{
      possession:[52,48],
      dispossessed:[7,11],

      ground:[57,43],
      groundCompleted:["39/69","30/69"],

      aerial:[41,59],
      aerialCompleted:["11/27","16/27"],

      dribbles:[55,38],
      dribblesCompleted:["6/11","6/16"]
    },

    passes:{
      accurate:[494,401],
      throwIns:[12,20],
      finalThird:[40,58],

      finalThirdCompleted:["75/97","110/154"],
      finalThirdPercent:[77,71],

      longBallsCompleted:["12/27","11/21"],
      longBallsPercent:[44,52],

      crossesCompleted:["1/4","3/17"],
      crossesPercent:[25,18]
    },

    defending:{
      tacklesWon:[52,58],
      tackles:[21,12],
      interceptions:[8,9],
      recoveries:[42,27],
      clearances:[35,15],
      errorsShot:[0,1],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[1,2],
      goalsPrevented:[0.05,-0.49],
      bigSaves:[0,0],
      claims:[2,0],
      punches:[0,0],
      goalKicks:[6,4]
    },

    lineup:{
      home:[
        "Emiliano Martinez",
        "Cristian Romero",
        "Lisandro Martinez",
        "Nahuel Molina",
        "Facundo Medina",
        "Enzo Fernandez",
        "Alexis Mac Allister",
        "Rodrigo De Paul",
        "Thiago Almada",
        "Lionel Messi",
        "Lautaro Martinez"
      ],

      away:[
        "Alexander Schlager",
        "David Alaba",
        "Kevin Danso",
        "Stefan Posch",
        "Konrad Laimer",
        "Xaver Schlager",
        "Nicolas Seiwald",
        "Marcel Sabitzer",
        "Romano Schmid",
        "Paul Wanner",
        "Michael Gregoritsch"
      ]
    }
  },

  2020: {
    competition: "FIFA World Cup 2026",
    stadium: "Levi's Stadium, Santa Clara USA",

    overview: {
      possession:[28,72],
      distance:[105.0,103.2],
      xg:[0.63,1.89],
      bigChances:[1,3],
      shots:[8,17],
      saves:[6,3],
      sprints:[86,82],
      corners:[1,10],
      fouls:[11,6],
      passes:[251,641],
      tackles:[30,25],
      freeKicks:[6,11],
      yellowCards:[1,1],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[4,8],
      hitWoodwork:[0,0],
      offTarget:[4,4],
      blocked:[0,5],
      insideBox:[4,11],
      outsideBox:[4,6]
    },

    attack:{
      bigScored:[0,1],
      bigMissed:[1,2],
      throughBalls:[1,2],
      touchesBox:[13,30],
      fouledThird:[2,4],
      offsides:[1,0]
    },

    duels:{
      possession:[48,52],
      dispossessed:[9,11],

      ground:[46,54],
      groundCompleted:["42/91","49/91"],

      aerial:[53,47],
      aerialCompleted:["18/34","16/34"],

      dribbles:[30,42],
      dribblesCompleted:["7/23","14/33"]
    },

    passes:{
      accurate:[181,561],
      throwIns:[28,23],
      finalThird:[37,88],

      finalThirdCompleted:["35/64","136/180"],
      finalThirdPercent:[55,76],

      longBallsCompleted:["23/53","19/44"],
      longBallsPercent:[43,43],

      crossesCompleted:["2/5","5/21"],
      crossesPercent:[40,24]
    },

    defending:{
      tacklesWon:[57,72],
      tackles:[30,25],
      interceptions:[3,11],
      recoveries:[56,58],
      clearances:[36,15],
      errorsShot:[1,0],
      errorsGoal:[0,1]
    },

    goalkeeping:{
      saves:[6,3],
      goalsPrevented:[0.10,-0.38],
      bigSaves:[1,0],
      claims:[0,1],
      punches:[3,0],
      goalKicks:[7,6]
    },

    lineup:{
      home:[
        "Yazeed Abu Laila",
        "Yazan Al-Arab",
        "Abdallah Nasib",
        "Ehsan Haddad",
        "Husam Abu Dahab",
        "Nizar Al-Rashdan",
        "Nour Al-Rawabdeh",
        "Mahmoud Al-Mardi",
        "Ali Olwan",
        "Mahmoud Al-Taamari",
        "Mohanad Abu Taha"
      ],

      away:[
        "Luca Zidane",
        "Aissa Mandi",
        "Ramy Bensebaini",
        "Rayan Ait-Nouri",
        "Rafik Belghali",
        "Hicham Boudaoui",
        "Ramiz Zerrouki",
        "Ibrahim Maza",
        "Farès Chaïbi",
        "Riyad Mahrez",
        "Amine Gouiri"
      ]
    }
  },

  2021: {
    competition: "FIFA World Cup 2026",
    stadium: "NRG Stadium, Houston USA",

    overview: {
      possession:[66,34],
      distance:[101.7,103.3],
      xg:[2.61,0.24],
      bigChances:[7,0],
      shots:[17,7],
      saves:[2,4],
      sprints:[135,128],
      corners:[3,2],
      fouls:[14,15],
      passes:[624,327],
      tackles:[14,18],
      freeKicks:[15,14],
      yellowCards:[1,1],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[9,2],
      hitWoodwork:[0,0],
      offTarget:[5,2],
      blocked:[3,3],
      insideBox:[12,4],
      outsideBox:[5,3]
    },

    attack:{
      bigScored:[2,0],
      bigMissed:[5,0],
      throughBalls:[5,0],
      touchesBox:[36,6],
      fouledThird:[8,2],
      offsides:[2,2]
    },

    duels:{
      possession:[55,45],
      dispossessed:[6,7],

      ground:[52,48],
      groundCompleted:["43/82","39/82"],

      aerial:[65,35],
      aerialCompleted:["11/17","6/17"],

      dribbles:[54,53],
      dribblesCompleted:["14/26","8/15"]
    },

    passes:{
      accurate:[561,262],
      throwIns:[20,16],
      finalThird:[78,31],

      finalThirdCompleted:["137/175","52/74"],
      finalThirdPercent:[78,70],

      longBallsCompleted:["22/40","9/30"],
      longBallsPercent:[55,30],

      crossesCompleted:["5/22","0/8"],
      crossesPercent:[23,0]
    },

    defending:{
      tacklesWon:[71,72],
      tackles:[14,18],
      interceptions:[6,14],
      recoveries:[50,46],
      clearances:[16,30],
      errorsShot:[0,3],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[2,4],
      goalsPrevented:[0.09,-1.51],
      bigSaves:[0,2],
      claims:[2,0],
      punches:[1,0],
      goalKicks:[5,6]
    },

    lineup:{
      home:[
        "Diogo Costa",
        "Ruben Dias",
        "Renato Veiga",
        "Joao Cancelo",
        "Nuno Mendes",
        "Joao Neves",
        "Vitinha",
        "Bruno Fernandes",
        "Pedro Neto",
        "Joao Felix",
        "Cristiano Ronaldo"
      ],

      away:[
        "Abduvohid Nematov",
        "Abdukodir Khusanov",
        "Rustam Ashurmatov",
        "Sherzod Nasrullaev",
        "Abbosbek Fayzullaev",
        "Otabek Shukurov",
        "Azizbek Ganiev",
        "Khojimat Erkinov",
        "Bobir Abdikholikov",
        "Eldor Shomurodov",
        "Oston Urunov"
      ]
    }
  },

  2022: {
    competition: "FIFA World Cup 2026",
    stadium: "Estadio Akron, Guadalajara Mexico",

    overview: {
      possession:[64,36],
      distance:[93.8,96.6],
      xg:[0.98,0.37],
      bigChances:[2,0],
      shots:[20,7],
      saves:[1,8],
      sprints:[90,95],
      corners:[5,4],
      fouls:[12,16],
      passes:[541,299],
      tackles:[10,15],
      freeKicks:[16,12],
      yellowCards:[2,1],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[9,1],
      hitWoodwork:[1,0],
      offTarget:[5,4],
      blocked:[6,2],
      insideBox:[11,3],
      outsideBox:[9,4]
    },

    attack:{
      bigScored:[0,0],
      bigMissed:[2,0],
      throughBalls:[0,0],
      touchesBox:[24,10],
      fouledThird:[1,0],
      offsides:[7,0]
    },

    duels:{
      possession:[57,43],
      dispossessed:[8,8],

      ground:[52,48],
      groundCompleted:["28/54","26/54"],

      aerial:[68,32],
      aerialCompleted:["19/28","9/28"],

      dribbles:[30,50],
      dribblesCompleted:["3/10","1/2"]
    },

    passes:{
      accurate:[473,226],
      throwIns:[13,20],
      finalThird:[63,37],

      finalThirdCompleted:["116/158","33/68"],
      finalThirdPercent:[73,49],

      longBallsCompleted:["40/66","14/48"],
      longBallsPercent:[61,29],

      crossesCompleted:["3/12","4/14"],
      crossesPercent:[25,29]
    },

    defending:{
      tacklesWon:[60,67],
      tackles:[10,15],
      interceptions:[10,7],
      recoveries:[43,37],
      clearances:[18,19],
      errorsShot:[0,1],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[1,8],
      goalsPrevented:[0.08,0.39],
      bigSaves:[1,3],
      claims:[0,0],
      punches:[0,1],
      goalKicks:[11,11]
    },

    lineup:{
      home:[
        "Camilo Vargas",
        "Daniel Muñoz",
        "Davinson Sánchez",
        "Jhon Lucumí",
        "Johan Mojica",
        "Jefferson Lerma",
        "James Rodríguez",
        "Gustavo Puerta",
        "Jhon Arias",
        "Luis Díaz",
        "Luis Javier Suárez"
      ],

      away:[
        "Lionel Mpasi",
        "Aaron Wan-Bissaka",
        "Chancel Mbemba",
        "Axel Tuanzebe",
        "Steve Kapuadi",
        "Arthur Masuaku",
        "Ngal'ayel Mukau",
        "Samuel Moutoussamy",
        "Cédric Bakambu",
        "Yoane Wissa",
        "Edo Kayembe"
      ]
    }
  },

  2023: {
    competition: "FIFA World Cup 2026",
    stadium: "Gillette Stadium, Foxborough USA",

    overview: {
      possession:[79,21],
      distance:[97.2,97.3],
      xg:[1.36,0.17],
      bigChances:[2,1],
      shots:[19,2],
      saves:[0,3],
      sprints:[98,83],
      corners:[9,2],
      fouls:[14,24],
      passes:[633,172],
      tackles:[14,22],
      freeKicks:[24,14],
      yellowCards:[1,1],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[3,1],
      hitWoodwork:[1,0],
      offTarget:[10,0],
      blocked:[6,1],
      insideBox:[14,2],
      outsideBox:[5,0]
    },

    attack:{
      bigScored:[0,0],
      bigMissed:[2,1],
      throughBalls:[0,1],
      touchesBox:[33,10],
      fouledThird:[6,0],
      offsides:[2,2]
    },

    duels:{
      possession:[56,44],
      dispossessed:[12,8],

      ground:[52,48],
      groundCompleted:["43/82","39/82"],

      aerial:[69,31],
      aerialCompleted:["18/26","8/26"],

      dribbles:[41,40],
      dribblesCompleted:["7/17","4/10"]
    },

    passes:{
      accurate:[586,127],
      throwIns:[22,9],
      finalThird:[88,40],

      finalThirdCompleted:["173/204","22/48"],
      finalThirdPercent:[85,46],

      longBallsCompleted:["14/26","24/57"],
      longBallsPercent:[54,42],

      crossesCompleted:["7/30","0/5"],
      crossesPercent:[23,0]
    },

    defending:{
      tacklesWon:[50,77],
      tackles:[14,22],
      interceptions:[1,8],
      recoveries:[33,28],
      clearances:[6,39],
      errorsShot:[0,2],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[0,3],
      goalsPrevented:[0.00,0.37],
      bigSaves:[0,0],
      claims:[0,0],
      punches:[0,1],
      goalKicks:[1,12]
    },

    lineup:{
      home:[
        "Jordan Pickford",
        "Reece James",
        "Ezri Konsa",
        "Marc Guéhi",
        "Djed Spence",
        "Declan Rice",
        "Elliot Anderson",
        "Jude Bellingham",
        "Noni Madueke",
        "Anthony Gordon",
        "Harry Kane"
      ],

      away:[
        "Benjamin Asare",
        "Mohammed Senaya",
        "Jerome Opoku",
        "Jonas Adjetey",
        "Gideon Mensah",
        "Thomas Partey",
        "Kwasi Sibo",
        "Christopher Bonsu Baah Yirenkyi",
        "Antoine Semenyo",
        "Iñaki Williams",
        "Jordan Ayew"
      ]
    }
  },

  2024: {
    competition: "FIFA World Cup 2026",
    stadium: " BMO Field, Toronto Canada",

    overview: {
      possession:[42,58],
      distance:[97.7,96.3],
      xg:[0.55,1.65],
      bigChances:[1,3],
      shots:[8,6],
      saves:[1,1],
      sprints:[105,119],
      corners:[7,2],
      fouls:[19,12],
      passes:[352,512],
      tackles:[10,19],
      freeKicks:[12,19],
      yellowCards:[1,1],
      redCards:[0,0] // not shown
    },

    shots:{
      shotsOnTarget:[1,2],
      hitWoodwork:[0,0],
      offTarget:[5,3],
      blocked:[2,1],
      insideBox:[6,4],
      outsideBox:[2,2]
    },

    attack:{
      bigScored:[0,1],
      bigMissed:[1,2],
      throughBalls:[0,1],
      touchesBox:[19,15],
      fouledThird:[2,3],
      offsides:[1,2]
    },

    duels:{
      possession:[48,52],
      dispossessed:[11,10],

      ground:[40,60],
      groundCompleted:["32/80","48/80"],

      aerial:[63,37],
      aerialCompleted:["26/41","15/41"],

      dribbles:[58,100],
      dribblesCompleted:["11/19","11/11"]
    },

    passes:{
      accurate:[277,432],
      throwIns:[14,14],
      finalThird:[55,59],

      finalThirdCompleted:["67/108","78/109"],
      finalThirdPercent:[62,72],

      longBallsCompleted:["25/54","19/51"],
      longBallsPercent:[46,37],

      crossesCompleted:["6/31","5/18"],
      crossesPercent:[19,28]
    },

    defending:{
      tacklesWon:[50,37],
      tackles:[10,19],
      interceptions:[5,5],
      recoveries:[49,48],
      clearances:[29,38],
      errorsShot:[0,1], // not shown
      errorsGoal:[0,0] // not shown
    },

    goalkeeping:{
      saves:[1,1],
      goalsPrevented:[0.21,0.04],
      bigSaves:[1,1],
      claims:[0,0],
      punches:[0,0],
      goalKicks:[6,8]
    },

    lineup:{
      home:[
        "Orlando Mosquera",
        "César Blackman",
        "José Córdoba",
        "Andrés Andrade",
        "Amir Murillo",
        "José Luis Rodríguez",
        "Jiovany Ramos",
        "Christian Martínez",
        "César Harvey",
        "Yoel Bárcenas",
        "José Fajardo"
      ],

      away:[
        "Dominik Livaković",
        "Josip Stanišić",
        "Marin Pongračić",
        "Josip Šutalo",
        "Joško Gvardiol",
        "Ivan Perišić",
        "Luka Modrić",
        "Mario Pašalić",
        "Mateo Kovačić",
        "Martin Baturina",
        "Petar Musa"
      ]
    }
  },

  3001: {
    competition: "FIFA World Cup 2026",
    stadium: "Estadio Azteca, Mexico City",

    overview: {
      possession:[52,48],
      distance:[98.6,99.7],
      xg:[0.53,1.74],
      bigChances:[0,5],
      shots:[13,11],
      saves:[2,1],
      sprints:[66,64],
      corners:[5,1],
      fouls:[9,13],
      passes:[398,386],
      tackles:[12,12],
      freeKicks:[13,9],
      yellowCards:[0,1],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[1,5],
      hitWoodwork:[0,0],
      offTarget:[8,4],
      blocked:[4,2],
      insideBox:[6,9],
      outsideBox:[7,2]
    },

    attack:{
      bigScored:[0,3],
      bigMissed:[0,2],
      throughBalls:[0,0],
      touchesBox:[14,15],
      fouledThird:[2,2],
      offsides:[1,0]
    },

    duels:{
      possession:[55,45],
      dispossessed:[5,10],

      ground:[54,46],
      groundCompleted:["29/54","25/54"],

      aerial:[59,41],
      aerialCompleted:["13/22","9/22"],

      dribbles:[42,67],
      dribblesCompleted:["5/12","4/6"]
    },

    passes:{
      accurate:[333,330],
      throwIns:[20,20],
      finalThird:[43,47],

      finalThirdCompleted:["45/74","84/111"],
      finalThirdPercent:[61,76],

      longBallsCompleted:["20/53","34/55"],
      longBallsPercent:[38,62],

      crossesCompleted:["5/26","1/12"],
      crossesPercent:[19,8]
    },

    defending:{
      tacklesWon:[58,67],
      tackles:[12,12],
      interceptions:[5,7],
      recoveries:[40,38],
      clearances:[20,30],
      errorsShot:[0,1],
      errorsGoal:[1,0]
    },

    goalkeeping:{
      saves:[2,1],
      goalsPrevented:[-0.65,0.13],
      bigSaves:[0,0],
      claims:[0,0],
      punches:[0,0],
      goalKicks:[11,11]
    },

    lineup:{
      home:[
        "Matěj Kovář",
        "Tomáš Holeš",
        "Václav Coufal",
        "Robin Hranáč",
        "Ladislav Krejčí",
        "Lukáš Červ",
        "Michal Sadílek",
        "David Douděra",
        "Adam Hložek",
        "Pavel Šulc",
        "Daniel Višinský"
      ],

      away:[
        "Raúl Rangel",
        "Johan Vásquez",
        "César Montes",
        "Jesús Gallardo",
        "Julián Araujo",
        "Luis Romo",
        "Marcel Ruiz",
        "Erik Lira",
        "Roberto Alvarado",
        "Gilberto Mora",
        "Santiago Giménez"
      ]
    }
  },

  3002: {
    competition: "FIFA World Cup 2026",
    stadium: "Estadio BBVA, Monterrey Mexico",

    overview: {
      possession:[32,68],
      distance:[91.9,100.3],
      xg:[1.16,0.90],
      bigChances:[1,1],
      shots:[13,8],
      saves:[2,3],
      sprints:[92,95],
      corners:[4,6],
      fouls:[7,9],
      passes:[340,719],
      tackles:[11,12],
      freeKicks:[9,7],
      yellowCards:[1,1],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[4,3],
      hitWoodwork:[0,0],
      offTarget:[5,4],
      blocked:[4,1],
      insideBox:[5,5],
      outsideBox:[8,3]
    },

    attack:{
      bigScored:[0,0],
      bigMissed:[1,1],
      throughBalls:[1,2],
      touchesBox:[13,18],
      fouledThird:[2,1],
      offsides:[3,0]
    },

    duels:{
      possession:[48,52],
      dispossessed:[5,5],

      ground:[51,49],
      groundCompleted:["26/51","25/51"],

      aerial:[44,56],
      aerialCompleted:["16/36","20/36"],

      dribbles:[46,50],
      dribblesCompleted:["6/13","6/12"]
    },

    passes:{
      accurate:[277,641],
      throwIns:[8,24],
      finalThird:[39,81],

      finalThirdCompleted:["37/67","160/201"],
      finalThirdPercent:[55,80],

      longBallsCompleted:["19/57","29/52"],
      longBallsPercent:[33,56],

      crossesCompleted:["1/8","7/34"],
      crossesPercent:[13,21]
    },

    defending:{
      tacklesWon:[64,75],
      tackles:[11,12],
      interceptions:[15,4],
      recoveries:[48,42],
      clearances:[40,16],
      errorsShot:[0,1],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[2,3],
      goalsPrevented:[1.42,-0.50],
      bigSaves:[0,0],
      claims:[0,1],
      punches:[1,0],
      goalKicks:[12,5]
    },

    lineup:{
      home:[
        "Ronwen Williams",
        "Khuliso Mudau",
        "Thabo Mbatsha",
        "Mothobi Mvala",
        "Aubrey Modiba",
        "Sphephelo Sithole",
        "Teboho Mokoena",
        "Teboho Maseko",
        "Oswin Appollis",
        "Evidence Makgopa",
        "Relebohile Mofokeng"
      ],

      away:[
        "Jo Hyeon-woo",
        "Lee Ki-je",
        "Lee Tae-seok",
        "Kim Min-jae",
        "Hwang In-beom",
        "Lee Kang-in",
        "Lee Jae-sung",
        "Paik Seung-ho",
        "Lee Dong-gyeong",
        "Oh Hyeon-gyu",
        "Yang Hyun-jun"
      ]
    }
  },

  3003: {
    competition: "FIFA World Cup 2026",
    stadium: "Lumen Field, Seattle USA",

    overview: {
      possession:[54,46],
      distance:[98.3,98.5],
      xg:[0.68,0.77],
      bigChances:[1,3],
      shots:[14,9],
      saves:[2,3],
      sprints:[105,74],
      corners:[5,5],
      fouls:[9,14],
      passes:[515,434],
      tackles:[10,13],
      freeKicks:[14,9],
      yellowCards:[1,1],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[5,3],
      hitWoodwork:[1,1],
      offTarget:[4,6],
      blocked:[5,0],
      insideBox:[4,5],
      outsideBox:[10,4]
    },

    attack:{
      bigScored:[0,1],
      bigMissed:[1,2],
      throughBalls:[2,0],
      touchesBox:[20,16],
      fouledThird:[4,1],
      offsides:[1,3]
    },

    duels:{
      possession:[60,40],
      dispossessed:[8,6],

      ground:[57,43],
      groundCompleted:["32/56","24/56"],

      aerial:[71,29],
      aerialCompleted:["10/14","4/14"],

      dribbles:[62,43],
      dribblesCompleted:["8/13","3/7"]
    },

    passes:{
      accurate:[452,371],
      throwIns:[12,18],
      finalThird:[45,47],

      finalThirdCompleted:["69/98","75/105"],
      finalThirdPercent:[70,71],

      longBallsCompleted:["30/50","16/52"],
      longBallsPercent:[60,31],

      crossesCompleted:["3/22","5/17"],
      crossesPercent:[14,29]
    },

    defending:{
      tacklesWon:[90,38],
      tackles:[10,13],
      interceptions:[4,4],
      recoveries:[40,34],
      clearances:[22,24],
      errorsShot:[0,0],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[2,3],
      goalsPrevented:[0.14,-2.04],
      bigSaves:[0,2],
      claims:[0,0],
      punches:[0,0],
      goalKicks:[8,9]
    },

    lineup:{
      home:[
        "N. Vasilj",
        "Amar Dedić",
        "Nihad Katić",
        "Adrian Malić",
        "Sead Kolašinac",
        "Ivan Šunjić",
        "Samed Baždar",
        "Armin Bajraktarević",
        "Edin Džeko",
        "Ermedin Demirović",
        "Kenan Alajbegović"
      ],

      away:[
        "Meshaal Barsham",
        "Pedro Miguel",
        "Lucas Mendes",
        "Ahmed Fathy",
        "Jassem Abdulsallam",
        "Assim Madibo",
        "Ahmed Alaaeldin",
        "Ahmed Afif",
        "Edmilson Júnior",
        "Akram Afif",
        "Haydos"
      ]
    }
  },

  3004: {
    competition: "FIFA World Cup 2026",
    stadium: "BC Place, Vancouver Canada",

    overview: {
      possession:[55,45],
      distance:[96.1,73.0],
      xg:[1.11,1.66],
      bigChances:[3,3],
      shots:[6,13],
      saves:[6,2],
      sprints:[83,71],
      corners:[2,7],
      fouls:[19,13],
      passes:[443,339],
      tackles:[16,9],
      freeKicks:[13,19],
      yellowCards:[1,2],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[4,7],
      hitWoodwork:[0,0],
      offTarget:[1,3],
      blocked:[1,3],
      insideBox:[5,12],
      outsideBox:[1,1]
    },

    attack:{
      bigScored:[1,1],
      bigMissed:[2,2],
      throughBalls:[1,1],
      touchesBox:[14,23],
      fouledThird:[2,3],
      offsides:[1,3]
    },

    duels:{
      possession:[51,49],
      dispossessed:[7,11],

      ground:[49,51],
      groundCompleted:["35/71","36/71"],

      aerial:[55,45],
      aerialCompleted:["16/29","13/29"],

      dribbles:[75,62],
      dribblesCompleted:["6/8","8/13"]
    },

    passes:{
      accurate:[369,271],
      throwIns:[25,27],
      finalThird:[48,60],

      finalThirdCompleted:["38/76","71/105"],
      finalThirdPercent:[50,68],

      longBallsCompleted:["17/45","20/43"],
      longBallsPercent:[38,47],

      crossesCompleted:["1/6","6/26"],
      crossesPercent:[17,23]
    },

    defending:{
      tacklesWon:[44,56],
      tackles:[16,9],
      interceptions:[4,13],
      recoveries:[35,40],
      clearances:[44,19],
      errorsShot:[0,2],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[6,2],
      goalsPrevented:[1.76,-0.83],
      bigSaves:[2,0],
      claims:[1,0],
      punches:[2,0],
      goalKicks:[13,5]
    },

    lineup:{
      home:[
        "Gregor Kobel",
        "Ricardo Rodríguez",
        "Manuel Akanji",
        "Nico Elvedi",
        "Lucas Jaquez",
        "Granit Xhaka",
        "Remo Freuler",
        "Djibril Sow",
        "Ruben Vargas",
        "Joël Monteiro",
        "Breel Embolo"
      ],

      away:[
        "Maxime Crépeau",
        "Alistair Johnston",
        "Luc de Fougerolles",
        "Derek Cornelius",
        "Richie Laryea",
        "Tajon Buchanan",
        "Jonathan David",
        "Nathan Saliba",
        "Mathieu Choinière",
        "Ali Ahmed",
        "Cyle Larin"
      ]
    }
  },

  3005: {
    competition: "FIFA World Cup 2026",
    stadium: "Mercedes Benz Stadium, Atlanta USA",

    overview: {
      possession:[69,31],
      distance:[103.3,101.3],
      xg:[3.76,1.22],
      bigChances:[5,1],
      shots:[22,9],
      saves:[1,8],
      sprints:[141,128],
      corners:[9,1],
      fouls:[10,18],
      passes:[541,247],
      tackles:[20,25],
      freeKicks:[18,10],
      yellowCards:[0,3],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[11,2],
      hitWoodwork:[0,0],
      offTarget:[6,4],
      blocked:[5,3],
      insideBox:[15,4],
      outsideBox:[7,5]
    },

    attack:{
      bigScored:[3,0],
      bigMissed:[2,1],
      throughBalls:[0,0],
      touchesBox:[45,9],
      fouledThird:[3,3],
      offsides:[5,0]
    },

    duels:{
      possession:[54,46],
      dispossessed:[12,11],

      ground:[54,46],
      groundCompleted:["54/100","46/100"],

      aerial:[55,45],
      aerialCompleted:["12/22","10/22"],

      dribbles:[55,55],
      dribblesCompleted:["16/29","11/20"]
    },

    passes:{
      accurate:[477,198],
      throwIns:[25,15],
      finalThird:[43,24],

      finalThirdCompleted:["120/159","20/39"],
      finalThirdPercent:[75,51],

      longBallsCompleted:["17/34","21/44"],
      longBallsPercent:[50,48],

      crossesCompleted:["7/22","2/3"],
      crossesPercent:[32,67]
    },

    defending:{
      tacklesWon:[40,48],
      tackles:[20,25],
      interceptions:[8,16],
      recoveries:[41,35],
      clearances:[14,26],
      errorsShot:[0,1],
      errorsGoal:[0,1]
    },

    goalkeeping:{
      saves:[1,8],
      goalsPrevented:[-1.51,-0.18],
      bigSaves:[1,1],
      claims:[0,1],
      punches:[3,0],
      goalKicks:[3,8]
    },

    lineup:{
      home:[
        "Bono",
        "Achraf Hakimi",
        "Romain Saïss",
        "Chadi Riad",
        "R. Halhal",
        "Sofyan Amrabat",
        "N. El Aynaoui",
        "Bilal El Khannouss",
        "Brahim Díaz",
        "Abde Ezzalzouli",
        "Ayoub El Kaabi"
      ],

      away:[
        "Johny Placide",
        "Jean-Kévin Duverne",
        "Jean-Jacques",
        "Ricardo Adé",
        "Jayro Delcroix",
        "W. Isidor",
        "L. Joseph",
        "J. Bellegarde",
        "R. Providence",
        "M. Expérience",
        "A. E. Kaabi"
      ]
    }
  },

  3006: {
    competition: "FIFA World Cup 2026",
    stadium: "Hard Rock Stadium, Miami Gardens USA",

    overview: {
      possession:[46,54],
      distance:[103.3,100.5],
      xg:[1.04,4.33],
      bigChances:[2,6],
      shots:[14,21],
      saves:[5,5],
      sprints:[83,100],
      corners:[7,6],
      fouls:[10,11],
      passes:[499,606],
      tackles:[11,14],
      freeKicks:[11,10],
      yellowCards:[1,2],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[5,9],
      hitWoodwork:[0,0],
      offTarget:[6,7],
      blocked:[3,5],
      insideBox:[10,14],
      outsideBox:[4,7]
    },

    attack:{
      bigScored:[0,3],
      bigMissed:[2,3],
      throughBalls:[0,3],
      touchesBox:[27,35],
      fouledThird:[2,1],
      offsides:[0,1]
    },

    duels:{
      possession:[36,64],
      dispossessed:[7,6],

      ground:[40,60],
      groundCompleted:["23/58","35/58"],

      aerial:[26,74],
      aerialCompleted:["5/19","14/19"],

      dribbles:[22,69],
      dribblesCompleted:["2/9","11/16"]
    },

    passes:{
      accurate:[448,564],
      throwIns:[16,10],
      finalThird:[58,68],

      finalThirdCompleted:["70/93","110/132"],
      finalThirdPercent:[75,83],

      longBallsCompleted:["17/34","12/27"],
      longBallsPercent:[50,44],

      crossesCompleted:["10/23","2/12"],
      crossesPercent:[43,17]
    },

    defending:{
      tacklesWon:[64,43],
      tackles:[11,14],
      interceptions:[2,13],
      recoveries:[33,47],
      clearances:[13,24],
      errorsShot:[0,2],
      errorsGoal:[2,0]
    },

    goalkeeping:{
      saves:[5,5],
      goalsPrevented:[1.80,1.23],
      bigSaves:[2,1],
      claims:[1,0],
      punches:[0,2],
      goalKicks:[11,4]
    },

    lineup:{
      home:[
        "Angus Gunn",
        "Andrew Robertson",
        "Scott McKenna",
        "Jack Hendry",
        "Nathan Patterson",
        "Lewis Ferguson",
        "Scott McTominay",
        "Kenny McLean",
        "John McGinn",
        "Ben Doak",
        "Lyndon Shankland"
      ],

      away:[
        "Alisson",
        "Danilo",
        "Marquinhos",
        "Gabriel Magalhães",
        "Dodô",
        "Bruno Guimarães",
        "Casemiro",
        "Lucas Paquetá",
        "Rayan",
        "Vinícius Júnior",
        "Matheus Cunha"
      ]
    }
  },

  3007: {
    competition: "FIFA World Cup 2026",
    stadium: " Levi's Stadium, Santa Clara USA",

    overview: {
      possession:[44,56],
      distance:[100.1,104.5],
      xg:[0.24,0.55],
      bigChances:[0,0],
      shots:[7,12],
      saves:[5,2],
      sprints:[89,91],
      corners:[1,3],
      fouls:[9,6],
      passes:[426,537],
      tackles:[24,20],
      freeKicks:[6,9],
      yellowCards:[1,1],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[2,5],
      hitWoodwork:[0,0],
      offTarget:[4,4],
      blocked:[1,3],
      insideBox:[3,7],
      outsideBox:[4,5]
    },

    attack:{
      bigScored:[0,0],
      bigMissed:[0,0],
      throughBalls:[0,0],
      touchesBox:[7,14],
      fouledThird:[0,1],
      offsides:[0,0]
    },

    duels:{
      possession:[46,54],
      dispossessed:[9,11],

      ground:[47,53],
      groundCompleted:["35/74","39/74"],

      aerial:[44,56],
      aerialCompleted:["20/45","25/45"],

      dribbles:[31,46],
      dribblesCompleted:["5/16","11/24"]
    },

    passes:{
      accurate:[330,438],
      throwIns:[26,28],
      finalThird:[57,56],

      finalThirdCompleted:["52/91","74/123"],
      finalThirdPercent:[57,60],

      longBallsCompleted:["14/59","17/58"],
      longBallsPercent:[24,29],

      crossesCompleted:["0/7","4/13"],
      crossesPercent:[0,31]
    },

    defending:{
      tacklesWon:[71,60],
      tackles:[24,20],
      interceptions:[8,7],
      recoveries:[43,43],
      clearances:[24,10],
      errorsShot:[0,1],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[5,2],
      goalsPrevented:[0.60,0.30],
      bigSaves:[1,0],
      claims:[0,1],
      punches:[0,0],
      goalKicks:[9,9]
    },

    lineup:{
      home:[
        "Orlando Gill",
        "Agustín Maidana",
        "Omar Alderete",
        "Gustavo Gómez",
        "Gustavo Velázquez",
        "Juan Cáceres",
        "Matías Galarza",
        "Andrés Cubas",
        "Diego Gómez",
        "Julio Enciso",
        "Gabriel Ávalos"
      ],

      away:[
        "Paul Beach",
        "Alessandro Circati",
        "Harry Souttar",
        "Aziz Behich",
        "Patrick Herrington",
        "Aiden O'Neill",
        "Jackson Irvine",
        "Connor Metcalfe",
        "J. Bos",
        "C. Volpato",
        "N. Irankunda"
      ]
    }
  },

  3008: {
    competition: "FIFA World Cup 2026",
    stadium: "SoFi Stadium, Inglewood USA",

    overview: {
      possession:[47,53],
      distance:[102.5,112.9],
      xg:[3.05,2.13],
      bigChances:[5,4],
      shots:[9,18],
      saves:[5,1],
      sprints:[104,112],
      corners:[2,9],
      fouls:[13,13],
      passes:[434,471],
      tackles:[32,14],
      freeKicks:[13,13],
      yellowCards:[0,1],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[3,7],
      hitWoodwork:[0,1],
      offTarget:[4,6],
      blocked:[2,5],
      insideBox:[8,15],
      outsideBox:[1,3]
    },

    attack:{
      bigScored:[3,1],
      bigMissed:[2,3],
      throughBalls:[0,1],
      touchesBox:[22,36],
      fouledThird:[1,0],
      offsides:[2,5]
    },

    duels:{
      possession:[58,42],
      dispossessed:[10,22],

      ground:[60,40],
      groundCompleted:["52/86","34/86"],

      aerial:[50,50],
      aerialCompleted:["12/24","12/24"],

      dribbles:[69,41],
      dribblesCompleted:["9/13","7/17"]
    },

    passes:{
      accurate:[335,398],
      throwIns:[28,31],
      finalThird:[43,57],

      finalThirdCompleted:["80/120","84/115"],
      finalThirdPercent:[67,73],

      longBallsCompleted:["23/65","16/42"],
      longBallsPercent:[35,38],

      crossesCompleted:["0/12","5/19"],
      crossesPercent:[0,26]
    },

    defending:{
      tacklesWon:[63,64],
      tackles:[32,14],
      interceptions:[9,9],
      recoveries:[42,42],
      clearances:[24,27],
      errorsShot:[0,0],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[5,1],
      goalsPrevented:[0.36,-0.68],
      bigSaves:[1,0],
      claims:[0,2],
      punches:[1,0],
      goalKicks:[6,4]
    },

    lineup:{
      home:[
        "Uğurcan Çakır",
        "Zeki Çelik",
        "Ozan Kabak",
        "Abdülkerim Bardakcı",
        "Eren Elmalı",
        "Salih Özcan",
        "Orkun Kökçü",
        "Arda Güler",
        "Oğuz Aydın",
        "Kenan Yıldız",
        "Barış Alper Yılmaz"
      ],

      away:[
        "Matt Turner",
        "Joe Scally",
        "Miles Robinson",
        "Mark McKenzie",
        "Auston Trusty",
        "Weston McKennie",
        "Sebastian Berhalter",
        "Brenden Aaronson",
        "Gio Reyna",
        "Tim Weah",
        "Ricardo Pepi"
      ]
    }
  },

  3009: {
    competition: "FIFA World Cup 2026",
    stadium: "Lincoln Financial Field, Philadelphia USA",

    overview: {
      possession:[37,63],
      distance:[96.8,97.6],
      xg:[0.50,1.31],
      bigChances:[0,3],
      shots:[11,7],
      saves:[1,2],
      sprints:[126,127],
      corners:[4,6],
      fouls:[11,6],
      passes:[355,624],
      tackles:[17,16],
      freeKicks:[6,11],
      yellowCards:[2,1],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[2,3],
      hitWoodwork:[0,0],
      offTarget:[7,3],
      blocked:[2,1],
      insideBox:[5,5],
      outsideBox:[6,2]
    },

    attack:{
      bigScored:[0,2],
      bigMissed:[0,1],
      throughBalls:[0,1],
      touchesBox:[18,22],
      fouledThird:[1,1],
      offsides:[2,1]
    },

    duels:{
      possession:[52,48],
      dispossessed:[11,9],

      ground:[50,50],
      groundCompleted:["35/70","35/70"],

      aerial:[59,41],
      aerialCompleted:["10/17","7/17"],

      dribbles:[71,50],
      dribblesCompleted:["12/17","8/16"]
    },

    passes:{
      accurate:[295,558],
      throwIns:[19,20],
      finalThird:[33,41],

      finalThirdCompleted:["49/73","105/133"],
      finalThirdPercent:[67,79],

      longBallsCompleted:["14/30","20/38"],
      longBallsPercent:[47,53],

      crossesCompleted:["5/15","3/16"],
      crossesPercent:[33,19]
    },

    defending:{
      tacklesWon:[65,56],
      tackles:[17,16],
      interceptions:[15,12],
      recoveries:[44,46],
      clearances:[17,19],
      errorsShot:[0,2],
      errorsGoal:[1,0]
    },

    goalkeeping:{
      saves:[1,2],
      goalsPrevented:[-0.14,0.06],
      bigSaves:[0,0],
      claims:[0,0],
      punches:[0,1],
      goalKicks:[5,6]
    },

    lineup:{
      home:[
        "Eloy Room",
        "Jurien Gaari",
        "Armando Obispo",
        "Darryl Fonville",
        "Sherel Floranus",
        "Juriën Gaari",
        "Leandro Bacuna",
        "Jürgen Locadia",
        "Jearl Margaritha",
        "Tahith Chong",
        "Juninho Bacuna"
      ],

      away:[
        "Yahia Fofana",
        "Ousmane Diomande",
        "Odilon Kossounou",
        "Christopher Operi",
        "Guéla Doué",
        "Franck Kessié",
        "Ibrahim Sangaré",
        "Yan Diomande",
        "Nicolas Pépé",
        "Amad Diallo",
        "Ange-Yoan Bonny"
      ]
    }
  },

  3010: {
    competition: "FIFA World Cup 2026",
    stadium: "MetLife Stadium, East Rutherford USA",

    overview: {
      possession:[39,61],
      distance:[95.3,98.2],
      xg:[1.27,0.65],
      bigChances:[2,2],
      shots:[7,11],
      saves:[2,1],
      sprints:[100,106],
      corners:[3,2],
      fouls:[15,10],
      passes:[378,592],
      tackles:[26,20],
      freeKicks:[10,15],
      yellowCards:[3,1],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[3,3],
      hitWoodwork:[0,0],
      offTarget:[2,3],
      blocked:[2,5],
      insideBox:[5,6],
      outsideBox:[2,5]
    },

    attack:{
      bigScored:[1,1],
      bigMissed:[1,1],
      throughBalls:[0,0],
      touchesBox:[18,20],
      fouledThird:[3,4],
      offsides:[0,0]
    },

    duels:{
      possession:[51,49],
      dispossessed:[10,11],

      ground:[52,48],
      groundCompleted:["45/86","41/86"],

      aerial:[45,55],
      aerialCompleted:["9/20","11/20"],

      dribbles:[47,32],
      dribblesCompleted:["9/19","7/22"]
    },

    passes:{
      accurate:[312,517],
      throwIns:[18,21],
      finalThird:[66,77],

      finalThirdCompleted:["80/117","111/152"],
      finalThirdPercent:[68,73],

      longBallsCompleted:["24/50","17/37"],
      longBallsPercent:[48,46],

      crossesCompleted:["3/13","5/16"],
      crossesPercent:[23,31]
    },

    defending:{
      tacklesWon:[62,65],
      tackles:[26,20],
      interceptions:[12,4],
      recoveries:[50,50],
      clearances:[30,15],
      errorsShot:[0,2],
      errorsGoal:[0,1]
    },

    goalkeeping:{
      saves:[2,1],
      goalsPrevented:[-0.06,-0.37],
      bigSaves:[0,1],
      claims:[1,0],
      punches:[0,1],
      goalKicks:[5,2]
    },

    lineup:{
      home:[
        "Hernán Galíndez",
        "Ángelo Preciado",
        "Joel Ordóñez",
        "Willian Pacho",
        "Piero Hincapié",
        "Moisés Caicedo",
        "Pedro Vite",
        "Alan Franco",
        "Nilson Angulo",
        "Enner Valencia",
        "John Yeboah"
      ],

      away:[
        "Manuel Neuer",
        "Jonathan Tah",
        "Antonio Rüdiger",
        "Aleksandar Pavlović",
        "David Raum",
        "Joshua Kimmich",
        "Felix Nmecha",
        "Florian Wirtz",
        "Jamal Musiala",
        "Leroy Sané",
        "Kai Havertz"
      ]
    }
  },

  3011: {
    competition: "FIFA World Cup 2026",
    stadium: "AT&T Stadium, Arlington USA",

    overview: {
      possession:[52,48],
      distance:[93.9,98.1],
      xg:[1.21,0.64],
      bigChances:[2,1],
      shots:[8,11],
      saves:[4,2],
      sprints:[71,81],
      corners:[2,8],
      fouls:[20,11],
      passes:[445,395],
      tackles:[13,7],
      freeKicks:[11,20],
      yellowCards:[1,2],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[3,5],
      hitWoodwork:[0,1],
      offTarget:[3,3],
      blocked:[2,3],
      insideBox:[4,6],
      outsideBox:[4,5]
    },

    attack:{
      bigScored:[1,0],
      bigMissed:[1,1],
      throughBalls:[1,0],
      touchesBox:[11,13],
      fouledThird:[1,4],
      offsides:[3,2]
    },

    duels:{
      possession:[52,48],
      dispossessed:[3,7],

      ground:[51,49],
      groundCompleted:["30/59","29/59"],

      aerial:[53,47],
      aerialCompleted:["17/32","15/32"],

      dribbles:[60,40],
      dribblesCompleted:["6/10","4/10"]
    },

    passes:{
      accurate:[378,312],
      throwIns:[14,18],
      finalThird:[51,51],

      finalThirdCompleted:["68/100","73/120"],
      finalThirdPercent:[68,61],

      longBallsCompleted:["18/49","18/50"],
      longBallsPercent:[37,36],

      crossesCompleted:["4/13","4/16"],
      crossesPercent:[31,25]
    },

    defending:{
      tacklesWon:[54,43],
      tackles:[13,7],
      interceptions:[4,5],
      recoveries:[42,39],
      clearances:[40,21],
      errorsShot:[1,0],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[4,2],
      goalsPrevented:[0.16,0.27],
      bigSaves:[2,1],
      claims:[1,1],
      punches:[4,1],
      goalKicks:[6,4]
    },

    lineup:{
      home:[
        "Zion Suzuki",
        "Koki Itakura",
        "Ayumu Seko",
        "Hiroki Ito",
        "Yukinari Sugawara",
        "Ao Tanaka",
        "Daichi Kamada",
        "Keito Nakamura",
        "Ritsu Doan",
        "Daizen Maeda",
        "Ayase Ueda"
      ],

      away:[
        "Jacob Widell Zetterström",
        "Gustaf Lagerbielke",
        "Victor Lindelöf",
        "Isak Hien",
        "Gabriel Gudmundsson",
        "Yasin Ayari",
        "Viktor Gyökeres",
        "Emil Stroud",
        "Anthony Elanga",
        "Alexander Bernhardsson",
        "Alexander Isak"
      ]
    }
  },

  3012: {
    competition: "FIFA World Cup 2026",
    stadium: "Arrowhead Stadium, Kansas City USA",

    overview: {
      possession:[29,71],
      distance:[101.9,98.6],
      xg:[0.62,1.85],
      bigChances:[2,2],
      shots:[10,20],
      saves:[4,3],
      sprints:[127,130],
      corners:[4,6],
      fouls:[11,10],
      passes:[258,647],
      tackles:[17,8],
      freeKicks:[10,11],
      yellowCards:[0,0],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[4,7],
      hitWoodwork:[0,1],
      offTarget:[5,8],
      blocked:[1,5],
      insideBox:[4,16],
      outsideBox:[6,4]
    },

    attack:{
      bigScored:[1,1],
      bigMissed:[1,1],
      throughBalls:[0,0],
      touchesBox:[11,44],
      fouledThird:[0,3],
      offsides:[2,1]
    },

    duels:{
      possession:[51,49],
      dispossessed:[1,7],

      ground:[55,45],
      groundCompleted:["29/53","24/53"],

      aerial:[41,59],
      aerialCompleted:["9/22","13/22"],

      dribbles:[22,31],
      dribblesCompleted:["2/9","5/16"]
    },

    passes:{
      accurate:[199,602],
      throwIns:[12,14],
      finalThird:[37,111],

      finalThirdCompleted:["41/66","192/231"],
      finalThirdPercent:[62,83],

      longBallsCompleted:["20/47","15/22"],
      longBallsPercent:[43,68],

      crossesCompleted:["4/13","6/27"],
      crossesPercent:[31,22]
    },

    defending:{
      tacklesWon:[53,63],
      tackles:[17,8],
      interceptions:[8,10],
      recoveries:[45,44],
      clearances:[35,17],
      errorsShot:[2,1],
      errorsGoal:[1,0]
    },

    goalkeeping:{
      saves:[4,3],
      goalsPrevented:[-0.79,-0.06],
      bigSaves:[0,0],
      claims:[0,0],
      punches:[2,0],
      goalKicks:[10,6]
    },

    lineup:{
      home:[
        "Aymen Dahmen",
        "Yan Valery",
        "Montassar Talbi",
        "Ellyes Skhiri",
        "Mohamed Ben Hamida",
        "Ali Abdi",
        "Anis Ben Slimane",
        "Rami Kaib",
        "Hannibal Mejbri",
        "Hannibal Mastouri",
        "Ismaël Gharbi"
      ],

      away:[
        "Bart Verbruggen",
        "Denzel Dumfries",
        "Jan Paul van Hecke",
        "Virgil van Dijk",
        "Nathan Aké",
        "Frenkie de Jong",
        "Ryan Gravenberch",
        "Tijjani Reijnders",
        "Donyell Malen",
        "Cody Gakpo",
        "Brian Brobbey"
      ]
    }
  },

  3013: {
    competition: "FIFA World Cup 2026",
    stadium: "Lumen Field, Seattle USA",

    overview: {
      possession:[61,39],
      distance:[100.9,102.0],
      xg:[0.84,1.97],
      bigChances:[0,5],
      shots:[15,13],
      saves:[2,2],
      sprints:[79,69],
      corners:[8,2],
      fouls:[11,16],
      passes:[589,367],
      tackles:[17,22],
      freeKicks:[16,10],
      yellowCards:[3,4],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[3,4],
      hitWoodwork:[0,1],
      offTarget:[6,6],
      blocked:[6,3],
      insideBox:[8,10],
      outsideBox:[7,3]
    },

    attack:{
      bigScored:[0,1],
      bigMissed:[0,4],
      throughBalls:[0,1],
      touchesBox:[28,26],
      fouledThird:[2,1],
      offsides:[0,3]
    },

    duels:{
      possession:[47,53],
      dispossessed:[10,10],

      ground:[50,50],
      groundCompleted:["40/80","40/80"],

      aerial:[43,57],
      aerialCompleted:["23/54","31/54"],

      dribbles:[45,53],
      dribblesCompleted:["10/22","8/15"]
    },

    passes:{
      accurate:[513,281],
      throwIns:[14,15],
      finalThird:[61,57],

      finalThirdCompleted:["91/130","51/98"],
      finalThirdPercent:[70,52],

      longBallsCompleted:["18/44","29/66"],
      longBallsPercent:[41,44],

      crossesCompleted:["4/15","1/10"],
      crossesPercent:[27,10]
    },

    defending:{
      tacklesWon:[59,77],
      tackles:[17,22],
      interceptions:[7,8],
      recoveries:[39,36],
      clearances:[38,32],
      errorsShot:[1,1],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[2,2],
      goalsPrevented:[0.23,-0.53],
      bigSaves:[1,0],
      claims:[0,1],
      punches:[3,1],
      goalKicks:[9,10],
      penaltySaves:[1,0]
    },

    lineup:{
      home:[
        "Mostafa Shobeir",
        "Mohamed Hany",
        "Rami Rabia",
        "Mohamed Abdelmonem",
        "Ahmed Aboul-Fetouh",
        "Marwan Lasheen",
        "Marwan Saber",
        "Emam Ashour",
        "Mahmoud Trézéguet",
        "Mohamed Salah",
        "Mostafa Ziko"
      ],

      away:[
        "Alireza Beiranvand",
        "Ramin Rezaeian",
        "Hossein Kanaani",
        "Shoja Khalilzadeh",
        "Amir Nemati",
        "Mohammad Mohammadi",
        "Saeid Ezatolahi",
        "Mohammad Ghorbani",
        "Saman Ghoddos",
        "Mohammad Mohebi",
        "Mehdi Taremi"
      ]
    }
  },

  3014: {
    competition: "FIFA World Cup 2026",
    stadium: "BC Place, Vancouver Canada",

    overview: {
      possession:[46,54],
      distance:[105.7,86.4],
      xg:[0.24,3.64],
      bigChances:[0,4],
      shots:[6,35],
      saves:[5,1],
      sprints:[95,98],
      corners:[5,8],
      fouls:[10,7],
      passes:[436,525],
      tackles:[10,13],
      freeKicks:[7,10],
      yellowCards:[2,0],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[2,10],
      hitWoodwork:[0,1],
      offTarget:[3,13],
      blocked:[1,12],
      insideBox:[3,23],
      outsideBox:[3,12]
    },

    attack:{
      bigScored:[0,2],
      bigMissed:[0,2],
      throughBalls:[0,1],
      touchesBox:[6,79],
      fouledThird:[0,2],
      offsides:[1,1]
    },

    duels:{
      possession:[45,55],
      dispossessed:[9,6],

      ground:[44,56],
      groundCompleted:["24/54","30/54"],

      aerial:[47,53],
      aerialCompleted:["7/15","8/15"],

      dribbles:[67,64],
      dribblesCompleted:["8/12","7/11"]
    },

    passes:{
      accurate:[369,462],
      throwIns:[17,15],
      finalThird:[37,49],

      finalThirdCompleted:["58/82","153/192"],
      finalThirdPercent:[71,80],

      longBallsCompleted:["16/38","28/46"],
      longBallsPercent:[42,61],

      crossesCompleted:["2/17","6/16"],
      crossesPercent:[12,38]
    },

    defending:{
      tacklesWon:[60,62],
      tackles:[10,13],
      interceptions:[6,10],
      recoveries:[38,48],
      clearances:[35,27],
      errorsShot:[1,1],
      errorsGoal:[2,0]
    },

    goalkeeping:{
      saves:[5,1],
      goalsPrevented:[-1.86,-0.77],
      bigSaves:[2,1],
      claims:[0,2],
      punches:[1,2],
      goalKicks:[10,3]
    },

    lineup:{
      home:[
        "Max Crocombe",
        "Tim Payne",
        "Finn Surman",
        "Tyler Bindon",
        "Liberato Cacace",
        "Joe Bell",
        "Marko Stamenic",
        "Elijah Just",
        "Sarpreet Singh",
        "Tommy Thomas",
        "Chris Wood"
      ],

      away:[
        "Thibaut Courtois",
        "Timothy Castagne",
        "Brandon Mechele",
        "Arthur Theate",
        "Maxim De Cuyper",
        "Hans Vanaken",
        "Youri Tielemans",
        "Kevin De Bruyne",
        "Jeremy Doku",
        "Leandro Trossard",
        "Charles De Ketelaere"
      ]
    }
  },

  3015: {
    competition: "FIFA World Cup 2026",
    stadium: "NRG Stadium, Houston USA",

    overview: {
      possession:[51,49],
      distance:[103.2,103.8],
      xg:[1.39,0.39],
      bigChances:[1,1],
      shots:[15,7],
      saves:[3,2],
      sprints:[114,130],
      corners:[4,2],
      fouls:[10,16],
      passes:[451,444],
      tackles:[15,29],
      freeKicks:[16,10],
      yellowCards:[1,3],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[2,3],
      hitWoodwork:[0,0],
      offTarget:[8,1],
      blocked:[5,3],
      insideBox:[9,5],
      outsideBox:[6,2]
    },

    attack:{
      bigScored:[0,0],
      bigMissed:[1,1],
      throughBalls:[1,0],
      touchesBox:[19,20],
      fouledThird:[1,3],
      offsides:[2,0]
    },

    duels:{
      possession:[51,49],
      dispossessed:[16,9],

      ground:[47,53],
      groundCompleted:["40/85","45/85"],

      aerial:[62,38],
      aerialCompleted:["18/29","11/29"],

      dribbles:[43,50],
      dribblesCompleted:["10/23","6/12"]
    },

    passes:{
      accurate:[381,359],
      throwIns:[21,27],
      finalThird:[56,63],

      finalThirdCompleted:["86/122","71/114"],
      finalThirdPercent:[70,62],

      longBallsCompleted:["29/55","21/50"],
      longBallsPercent:[53,42],

      crossesCompleted:["2/18","3/11"],
      crossesPercent:[11,27]
    },

    defending:{
      tacklesWon:[80,52],
      tackles:[15,29],
      interceptions:[13,11],
      recoveries:[52,43],
      clearances:[29,25],
      errorsShot:[0,1],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[3,2],
      goalsPrevented:[0.33,0.51],
      bigSaves:[0,1],
      claims:[0,0],
      punches:[0,0],
      goalKicks:[5,12]
    },

    lineup:{
      home:[
        "Vozinha",
        "Wagner Pina",
        "Pico",
        "Diney",
        "Roberto Lopes",
        "Kenny Rocha Santos",
        "Duarte",
        "João Monteiro",
        "Willy Semedo",
        "Jovane Cabral",
        "Ryan Mendes"
      ],

      away:[
        "Mohammed Al-Owais",
        "Saud Abdulhamid",
        "Hassan Altambakti",
        "Ali Al-Bulaihi",
        "Nawaf Boushal",
        "Abdullah Al-Khaibari",
        "Nasser Al-Dawsari",
        "Salem Al-Dawsari",
        "Abdulrahman Al-Obud",
        "Saleh Al-Amri",
        "Saleh Al-Shehri"
      ]
    }
  },

  3016: {
    competition: "FIFA World Cup 2026",
    stadium: "Estadio Akron, Guadalajara Mexico",

    overview: {
      possession:[33,67],
      distance:[103.9,101.2],
      xg:[0.20,0.86],
      bigChances:[1,1],
      shots:[5,6],
      saves:[0,2],
      sprints:[123,78],
      corners:[1,6],
      fouls:[14,14],
      passes:[301,622],
      tackles:[25,17],
      freeKicks:[14,14],
      yellowCards:[3,1],
      redCards:[1,0]
    },

    shots:{
      shotsOnTarget:[1,1],
      hitWoodwork:[0,1],
      offTarget:[3,4],
      blocked:[1,1],
      insideBox:[2,5],
      outsideBox:[3,1]
    },

    attack:{
      bigScored:[0,0],
      bigMissed:[1,1],
      throughBalls:[0,0],
      touchesBox:[12,19],
      fouledThird:[4,0],
      offsides:[5,2]
    },

    duels:{
      possession:[48,52],
      dispossessed:[9,13],

      ground:[54,46],
      groundCompleted:["46/85","39/85"],

      aerial:[24,76],
      aerialCompleted:["5/21","16/21"],

      dribbles:[47,43],
      dribblesCompleted:["7/15","9/21"]
    },

    passes:{
      accurate:[228,553],
      throwIns:[16,10],
      finalThird:[42,47],

      finalThirdCompleted:["69/105","78/108"],
      finalThirdPercent:[66,72],

      longBallsCompleted:["15/43","18/34"],
      longBallsPercent:[35,53],

      crossesCompleted:["1/16","3/12"],
      crossesPercent:[6,25]
    },

    defending:{
      tacklesWon:[60,59],
      tackles:[25,17],
      interceptions:[14,9],
      recoveries:[51,51],
      clearances:[14,23],
      errorsShot:[0,0],
      errorsGoal:[1,0]
    },

    goalkeeping:{
      saves:[0,2],
      goalsPrevented:[-0.80,0.10],
      bigSaves:[0,1],
      claims:[1,0],
      punches:[0,0],
      goalKicks:[5,6]
    },

    lineup:{
      home:[
        "Fernando Muslera",
        "Guillermo Varela",
        "Sebastián Cáceres",
        "Manuel Ugarte",
        "Mathías Olivera",
        "Joaquín Sanabria",
        "Federico Valverde",
        "Rodrigo Bentancur",
        "Maximiliano Araújo",
        "Agustín Canobbio",
        "Darwin Núñez"
      ],

      away:[
        "Unai Simón",
        "Marcos Llorente",
        "Pau Cubarsí",
        "Aymeric Laporte",
        "Marc Cucurella",
        "Rodri",
        "Mikel Merino",
        "Álex Baena",
        "Pedri",
        "Lamine Yamal",
        "Mikel Oyarzabal"
      ]
    }
  },

  3017: {
    competition: "FIFA World Cup 2026",
    stadium: "Gillette Stadium, Foxborough USA",

    overview: {
      possession:[43,57],
      distance:[104.3,99.5],
      xg:[1.70,1.50],
      bigChances:[4,3],
      shots:[10,18],
      saves:[5,3],
      sprints:[121,110],
      corners:[4,5],
      fouls:[9,11],
      passes:[421,555],
      tackles:[17,17],
      freeKicks:[10,9],
      yellowCards:[1,1],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[4,9],
      hitWoodwork:[0,1],
      offTarget:[3,6],
      blocked:[3,3],
      insideBox:[6,10],
      outsideBox:[4,8]
    },

    attack:{
      bigScored:[1,1],
      bigMissed:[3,2],
      throughBalls:[0,3],
      touchesBox:[26,31],
      fouledThird:[3,1],
      offsides:[1,2]
    },

    duels:{
      possession:[48,52],
      dispossessed:[11,8],

      ground:[53,47],
      groundCompleted:["35/66","31/66"],

      aerial:[33,67],
      aerialCompleted:["7/21","14/21"],

      dribbles:[54,41],
      dribblesCompleted:["7/13","7/17"]
    },

    passes:{
      accurate:[343,480],
      throwIns:[23,12],
      finalThird:[40,57],

      finalThirdCompleted:["77/112","136/172"],
      finalThirdPercent:[69,79],

      longBallsCompleted:["18/40","28/53"],
      longBallsPercent:[45,53],

      crossesCompleted:["3/9","3/10"],
      crossesPercent:[33,30]
    },

    defending:{
      tacklesWon:[65,71],
      tackles:[17,17],
      interceptions:[13,11],
      recoveries:[40,54],
      clearances:[16,19],
      errorsShot:[3,3],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[5,3],
      goalsPrevented:[-1.00,0.41],
      bigSaves:[1,1],
      claims:[0,0],
      punches:[0,0],
      goalKicks:[8,5],
      penaltySaves:[0,1]
    },

    lineup:{
      home:[
        "Egil Selvik",
        "Fredrik Aursnes",
        "Stian Falchener",
        "Leo Østigård",
        "Fredrik André Bjørkan",
        "Patrick Berg",
        "Kristian Thorstvedt",
        "Thelo Aasgaard",
        "Oscar Bobb",
        "Jørgen Strand Larsen",
        "Andreas Schjelderup"
      ],

      away:[
        "Mike Maignan",
        "Jules Koundé",
        "Dayot Upamecano",
        "Maxime Lacroix",
        "Theo Hernández",
        "Aurélien Tchouaméni",
        "Manu Koné",
        "Michael Olise",
        "Désiré Doué",
        "Ousmane Dembélé",
        "Kylian Mbappé"
      ]
    }
  },

  3018: {
    competition: "FIFA World Cup 2026",
    stadium: "BMO Field, Toronto Canada",

    overview: {
      possession:[69,31],
      distance:[83.2,93.3],
      xg:[3.01,0.14],
      bigChances:[5,0],
      shots:[28,6],
      saves:[1,7],
      sprints:[108,98],
      corners:[12,3],
      fouls:[10,11],
      passes:[590,266],
      tackles:[12,20],
      freeKicks:[11,10],
      yellowCards:[2,2],
      redCards:[0,1]
    },

    shots:{
      shotsOnTarget:[12,1],
      hitWoodwork:[1,0],
      offTarget:[11,1],
      blocked:[5,4],
      insideBox:[17,1],
      outsideBox:[11,5]
    },

    attack:{
      bigScored:[2,0],
      bigMissed:[3,0],
      throughBalls:[0,0],
      touchesBox:[51,5],
      fouledThird:[2,2],
      offsides:[1,0]
    },

    duels:{
      possession:[50,50],
      dispossessed:[4,7],

      ground:[45,55],
      groundCompleted:["30/67","37/67"],

      aerial:[61,39],
      aerialCompleted:["19/31","12/31"],

      dribbles:[33,62],
      dribblesCompleted:["8/24","8/13"]
    },

    passes:{
      accurate:[517,184],
      throwIns:[26,16],
      finalThird:[95,32],

      finalThirdCompleted:["197/243","27/54"],
      finalThirdPercent:[81,50],

      longBallsCompleted:["23/43","13/68"],
      longBallsPercent:[53,19],

      crossesCompleted:["7/25","0/6"],
      crossesPercent:[28,0]
    },

    defending:{
      tacklesWon:[75,65],
      tackles:[12,20],
      interceptions:[2,7],
      recoveries:[53,38],
      clearances:[10,34],
      errorsShot:[0,0],
      errorsGoal:[0,2]
    },

    goalkeeping:{
      saves:[1,7],
      goalsPrevented:[0.07,-0.07],
      bigSaves:[0,3],
      claims:[3,1],
      punches:[0,1],
      goalKicks:[4,20]
    },

    lineup:{
      home:[
        "Mory Diaw",
        "Krépin Diatta",
        "Abdoulaye Seck",
        "Moussa Niakhaté",
        "Habib Diarra",
        "Idrissa Gueye",
        "Lamine Camara",
        "Iliman Ndiaye",
        "Ismaïla Sarr",
        "Sadio Mané",
        "Ismail Jakobs"
      ],

      away:[
        "Ahmed Basil",
        "Merchas Doski",
        "Akram Hashem",
        "Rebin Sulaka",
        "Hussein Ali Al-Ammari",
        "Amir Al-Ammari",
        "Ali Jasim",
        "Zidane Iqbal",
        "Youssef Amyn",
        "Ali Al-Hamadi",
        "Frans Putros"
      ]
    }
  },

  3019: {
    competition: "FIFA World Cup 2026",
    stadium: "Arrowhead Stadium, Kansas City USA",

    overview: {
      possession:[65,35],
      distance:[97.4,100.0],
      xg:[1.67,1.49],
      bigChances:[3,3],
      shots:[12,10],
      saves:[0,2],
      sprints:[99,100],
      corners:[0,3],
      fouls:[3,7],
      passes:[754,396],
      tackles:[11,11],
      freeKicks:[7,3],
      yellowCards:[0,1],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[5,3],
      hitWoodwork:[1,0],
      offTarget:[5,6],
      blocked:[2,1],
      insideBox:[6,6],
      outsideBox:[6,4]
    },

    attack:{
      bigScored:[2,2],
      bigMissed:[1,1],
      throughBalls:[1,1],
      touchesBox:[22,18],
      fouledThird:[1,0],
      offsides:[1,3]
    },

    duels:{
      possession:[55,45],
      dispossessed:[5,8],

      ground:[63,38],
      groundCompleted:["30/48","18/48"],

      aerial:[29,71],
      aerialCompleted:["4/14","10/14"],

      dribbles:[68,57],
      dribblesCompleted:["13/19","4/7"]
    },

    passes:{
      accurate:[706,346],
      throwIns:[16,10],
      finalThird:[62,39],

      finalThirdCompleted:["112/135","75/98"],
      finalThirdPercent:[83,77],

      longBallsCompleted:["26/44","14/32"],
      longBallsPercent:[59,44],

      crossesCompleted:["0/5","3/13"],
      crossesPercent:[0,23]
    },

    defending:{
      tacklesWon:[45,36],
      tackles:[11,11],
      interceptions:[4,10],
      recoveries:[28,37],
      clearances:[18,19],
      errorsShot:[0,1],
      errorsGoal:[1,0]
    },

    goalkeeping:{
      saves:[0,2],
      goalsPrevented:[-1.68,-0.21],
      bigSaves:[0,0],
      claims:[0,0],
      punches:[0,0],
      goalKicks:[9,6]
    },

    lineup:{
      home:[
        "Luca Zidane",
        "Rafik Belghali",
        "Aïssa Mandi",
        "Ramy Bensebaini",
        "Jaouen Hadjam",
        "Nabil Bentaleb",
        "Farès Chaïbi",
        "Ibrahim Maza",
        "Houssem Aouar",
        "Amine Gouiri",
        "Riyad Mahrez"
      ],

      away:[
        "Alexander Schlager",
        "Stefan Posch",
        "Philipp Lienhart",
        "David Alaba",
        "Philipp Mwene",
        "Konrad Laimer",
        "Xaver Schlager",
        "Marcel Sabitzer",
        "Romano Schmid",
        "Nicolas Seiwald",
        "Marko Arnautović"
      ]
    }
  },

  3020: {
    competition: "FIFA World Cup 2026",
    stadium: "AT&T Stadium, Arlington USA",

    overview: {
      possession:[27,73],
      distance:[96.5,94.0],
      xg:[0.76,2.13],
      bigChances:[1,3],
      shots:[5,12],
      saves:[1,0],
      sprints:[65,59],
      corners:[2,6],
      fouls:[13,7],
      passes:[285,801],
      tackles:[16,14],
      freeKicks:[7,12],
      yellowCards:[3,0],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[1,4],
      hitWoodwork:[0,2],
      offTarget:[2,7],
      blocked:[2,1],
      insideBox:[2,6],
      outsideBox:[3,6]
    },

    attack:{
      bigScored:[1,1],
      bigMissed:[0,2],
      throughBalls:[0,0],
      touchesBox:[4,15],
      fouledThird:[1,6],
      offsides:[1,3]
    },

    duels:{
      possession:[52,48],
      dispossessed:[7,10],

      ground:[52,48],
      groundCompleted:["32/61","29/61"],

      aerial:[40,60],
      aerialCompleted:["2/5","3/5"],

      dribbles:[56,33],
      dribblesCompleted:["9/16","3/9"]
    },

    passes:{
      accurate:[228,737],
      throwIns:[11,19],
      finalThird:[36,60],

      finalThirdCompleted:["44/69","115/156"],
      finalThirdPercent:[64,74],

      longBallsCompleted:["13/35","16/26"],
      longBallsPercent:[37,62],

      crossesCompleted:["2/7","3/5"],
      crossesPercent:[29,60]
    },

    defending:{
      tacklesWon:[50,36],
      tackles:[16,14],
      interceptions:[19,12],
      recoveries:[41,38],
      clearances:[13,9],
      errorsShot:[1,1],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[1,0],
      goalsPrevented:[-1.50,-0.28],
      bigSaves:[0,0],
      claims:[0,0],
      punches:[0,0],
      goalKicks:[9,4]
    },

    lineup:{
      home:[
        "Yazeed Abu Laila",
        "Abdallah Nasib",
        "Yazan Al-Arab",
        "Ehsan Haddad",
        "Nizar Al-Rashdan",
        "Nour Al-Rawabdeh",
        "Ali Olwan",
        "Mahmoud Al-Mardi",
        "Mohammad Abu Taha",
        "Ahmad Al-Azaizeh",
        "Oday Al-Fakhouri"
      ],

      away:[
        "Emiliano Martínez",
        "Nicolás Tagliafico",
        "Marcos Senesi",
        "Nicolás Otamendi",
        "Giuliano Simeone",
        "Leandro Paredes",
        "Nico Paz",
        "Giovani Lo Celso",
        "Exequiel Palacios",
        "Lautaro Martínez",
        "Julián Álvarez"
      ]
    }
  },

  3021: {
    competition: "FIFA World Cup 2026",
    stadium: "Hard Rock Stadium, Miami Gardens USA",

    overview: {
      possession:[55,45],
      distance:[97.9,98.9],
      xg:[1.70,0.93],
      bigChances:[2,2],
      shots:[24,13],
      saves:[2,6],
      sprints:[112,85],
      corners:[5,2],
      fouls:[12,6],
      passes:[544,446],
      tackles:[15,9],
      freeKicks:[6,12],
      yellowCards:[1,0],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[6,2],
      hitWoodwork:[0,0],
      offTarget:[11,7],
      blocked:[7,4],
      insideBox:[15,5],
      outsideBox:[9,8]
    },

    attack:{
      bigScored:[0,0],
      bigMissed:[2,2],
      throughBalls:[0,1],
      touchesBox:[34,13],
      fouledThird:[0,2],
      offsides:[3,2]
    },

    duels:{
      possession:[44,56],
      dispossessed:[7,7],

      ground:[45,55],
      groundCompleted:["24/53","29/53"],

      aerial:[38,62],
      aerialCompleted:["5/13","8/13"],

      dribbles:[67,50],
      dribblesCompleted:["4/6","8/16"]
    },

    passes:{
      accurate:[485,405],
      throwIns:[10,9],
      finalThird:[57,50],

      finalThirdCompleted:["167/195","94/110"],
      finalThirdPercent:[86,85],

      longBallsCompleted:["25/46","20/29"],
      longBallsPercent:[54,69],

      crossesCompleted:["3/11","2/13"],
      crossesPercent:[27,15]
    },

    defending:{
      tacklesWon:[53,56],
      tackles:[15,9],
      interceptions:[6,13],
      recoveries:[34,39],
      clearances:[16,22],
      errorsShot:[1,0],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[2,6],
      goalsPrevented:[0.47,0.61],
      bigSaves:[0,2],
      claims:[0,0],
      punches:[0,1],
      goalKicks:[14,9],
    },

    lineup:{
      home:[
        "Camilo Vargas",
        "Santiago Arias",
        "Davinson Sánchez",
        "Jhon Lucumí",
        "Deiver Machado",
        "Jefferson Lerma",
        "Jhon Arias",
        "James Rodríguez",
        "Luis Díaz",
        "Jhon Córdoba",
        "Gustavo Puerta"
      ],

      away:[
        "Diogo Costa",
        "Nuno Mendes",
        "Rúben Dias",
        "João Cancelo",
        "Renato Veiga",
        "Rúben Neves",
        "Vitinha",
        "Bruno Fernandes",
        "Pedro Neto",
        "João Félix",
        "Cristiano Ronaldo"
      ]
    }
  },

  3022: {
    competition: "FIFA World Cup 2026",
    stadium: "Mercedes Benz Stadium, Atlanta USA",

    overview: {
      possession:[58,42],
      distance:[104.7,106.3],
      xg:[2.18,0.20],
      bigChances:[3,0],
      shots:[19,3],
      saves:[1,1],
      sprints:[92,106],
      corners:[2,4],
      fouls:[6,16],
      passes:[485,355],
      tackles:[20,29],
      freeKicks:[15,6],
      yellowCards:[3,2],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[4,1],
      hitWoodwork:[0,0],
      offTarget:[14,2],
      blocked:[1,0],
      insideBox:[11,2],
      outsideBox:[8,1]
    },

    attack:{
      bigScored:[2,0],
      bigMissed:[1,0],
      throughBalls:[0,0],
      touchesBox:[30,7],
      fouledThird:[3,1],
      offsides:[3,1]
    },

    duels:{
      possession:[48,52],
      dispossessed:[17,9],

      ground:[53,47],
      groundCompleted:["46/86","40/86"],

      aerial:[34,66],
      aerialCompleted:["12/35","23/35"],

      dribbles:[48,31],
      dribblesCompleted:["11/23","5/16"]
    },

    passes:{
      accurate:[400,269],
      throwIns:[26,23],
      finalThird:[63,51],

      finalThirdCompleted:["90/127","61/99"],
      finalThirdPercent:[71,62],

      longBallsCompleted:["28/60","21/59"],
      longBallsPercent:[47,36],

      crossesCompleted:["6/22","2/16"],
      crossesPercent:[27,13]
    },

    defending:{
      tacklesWon:[65,62],
      tackles:[20,29],
      interceptions:[7,12],
      recoveries:[64,51],
      clearances:[25,38],
      errorsShot:[0,1],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[1,1],
      goalsPrevented:[-0.71,-0.65],
      bigSaves:[1,0],
      claims:[0,1],
      punches:[0,1],
      goalKicks:[7,15]
    },

    lineup:{
      home:[
        "Lionel Mpasi-Nzau",
        "Aaron Wan-Bissaka",
        "Chancel Mbemba",
        "Axel Tuanzebe",
        "Arthur Masuaku",
        "Ngal'ayel Mukau",
        "Noah Sadiki",
        "Samuel Moutoussamy",
        "Nathanaël Mbuku",
        "Yoane Wissa",
        "Cédric Bakambu"
      ],

      away:[
        "Abduvohid Nematov",
        "Rustam Ashurmatov",
        "Abdukodir Khusanov",
        "Sherzod Nasrullaev",
        "Khojiakbar Alijonov",
        "Otabek Shukurov",
        "Abbosbek Fayzullaev",
        "Diyor Khamdamov",
        "Azizbek Mozgovoy",
        "Jasurbek Jaloliddinov Urozov",
        "Eldor Shomurodov"
      ]
    }
  },

  3023: {
    competition: "FIFA World Cup 2026",
    stadium: "Lincoln Financial Field, Philadelphia USA",

    overview: {
      possession:[53,47],
      distance:[98.3,97.2],
      xg:[0.42,0.64],
      bigChances:[0,2],
      shots:[8,6],
      saves:[0,2],
      sprints:[79,104],
      corners:[3,2],
      fouls:[9,13],
      passes:[523,455],
      tackles:[14,13],
      freeKicks:[13,9],
      yellowCards:[1,1],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[4,1],
      hitWoodwork:[1,0],
      offTarget:[2,3],
      blocked:[2,2],
      insideBox:[3,3],
      outsideBox:[5,3]
    },

    attack:{
      bigScored:[0,1],
      bigMissed:[0,1],
      throughBalls:[0,0],
      touchesBox:[9,9],
      fouledThird:[2,1],
      offsides:[1,2]
    },

    duels:{
      possession:[53,47],
      dispossessed:[7,4],

      ground:[54,46],
      groundCompleted:["34/63","29/63"],

      aerial:[47,53],
      aerialCompleted:["8/17","9/17"],

      dribbles:[54,44],
      dribblesCompleted:["7/13","8/18"]
    },

    passes:{
      accurate:[477,402],
      throwIns:[16,10],
      finalThird:[49,60],

      finalThirdCompleted:["75/96","45/82"],
      finalThirdPercent:[78,55],

      longBallsCompleted:["16/38","18/39"],
      longBallsPercent:[42,46],

      crossesCompleted:["3/15","3/12"],
      crossesPercent:[20,25]
    },

    defending:{
      tacklesWon:[57,54],
      tackles:[14,13],
      interceptions:[4,9],
      recoveries:[39,38],
      clearances:[23,11],
      errorsShot:[0,2],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[0,2],
      goalsPrevented:[-0.04,-1.13],
      bigSaves:[0,1],
      claims:[0,2],
      punches:[1,0],
      goalKicks:[7,5]
    },

    lineup:{
      home:[
        "Dominik Livaković",
        "Josip Stanišić",
        "Josip Šutalo",
        "Marin Pongračić",
        "Ivan Perišić",
        "Luka Modrić",
        "Mateo Kovačić",
        "Petar Sučić",
        "Nikola Vlašić",
        "Martin Baturina",
        "Ante Budimir"
      ],

      away:[
        "Benjamin Asare",
        "Gideon Mensah",
        "Derrick Luckassen",
        "Jerome Opoku Adjetey",
        "Mohammed Salisu",
        "Thomas Partey",
        "Elisha Owusu",
        "Kamaldeen Sulemana",
        "Kwasi Sibo",
        "Antoine Semenyo",
        "Jordan Ayew"
      ]
    }
  },

  3024: {
    competition: "FIFA World Cup 2026",
    stadium: "MetLife Stadium, East Rutherford USA",

    overview: {
      possession:[33,67],
      distance:[101.4,104.5],
      xg:[0.66,1.56],
      bigChances:[0,4],
      shots:[13,17],
      saves:[4,2],
      sprints:[106,164],
      corners:[3,7],
      fouls:[16,13],
      passes:[268,558],
      tackles:[16,18],
      freeKicks:[13,16],
      yellowCards:[2,1],
      redCards:[0,0]
    },

    shots:{
      shotsOnTarget:[2,6],
      hitWoodwork:[0,0],
      offTarget:[8,8],
      blocked:[3,3],
      insideBox:[8,12],
      outsideBox:[5,5]
    },

    attack:{
      bigScored:[0,2],
      bigMissed:[0,2],
      throughBalls:[0,6],
      touchesBox:[14,39],
      fouledThird:[2,1],
      offsides:[4,4]
    },

    duels:{
      possession:[41,59],
      dispossessed:[9,8],

      ground:[42,58],
      groundCompleted:["32/76","44/76"],

      aerial:[39,61],
      aerialCompleted:["11/28","17/28"],

      dribbles:[40,56],
      dribblesCompleted:["6/15","10/18"]
    },

    passes:{
      accurate:[202,490],
      throwIns:[24,14],
      finalThird:[38,68],

      finalThirdCompleted:["29/54","139/182"],
      finalThirdPercent:[54,76],

      longBallsCompleted:["25/54","20/36"],
      longBallsPercent:[46,56],

      crossesCompleted:["3/9","4/25"],
      crossesPercent:[33,16]
    },

    defending:{
      tacklesWon:[69,94],
      tackles:[16,18],
      interceptions:[6,5],
      recoveries:[48,49],
      clearances:[34,20],
      errorsShot:[0,3],
      errorsGoal:[0,0]
    },

    goalkeeping:{
      saves:[4,2],
      goalsPrevented:[0.01,0.21],
      bigSaves:[1,1],
      claims:[0,0],
      punches:[0,1],
      goalKicks:[12,8]
    },

    lineup:{
      home:[
        "Orlando Mosquera",
        "José Gutiérrez",
        "Andrés Andrade",
        "José Córdoba",
        "Fidel Escobar",
        "José Murillo",
        "Carlos Martínez",
        "Christian Harvey",
        "Adalberto Carrasquilla",
        "José Luis Rodríguez",
        "Tomás Rodríguez"
      ],

      away:[
        "Jordan Pickford",
        "Jarell Quansah",
        "Ezri Konsa",
        "Marc Guéhi",
        "Nico O'Reilly",
        "Jordan Henderson",
        "Jude Bellingham",
        "Bukayo Saka",
        "Morgan Rogers",
        "Marcus Rashford",
        "Harry Kane"
      ]
    }
  },

  default: {
    possession: [56,44],
    xg:[1.8,0.9],
    shots:[18,7],
    shotsOnTarget:[7,3],
    corners:[8,2],
    fouls:[12,15],
    yellowCards:[2,3],
    redCards:[0,0],
    passes:[645,381],
    passAccuracy:[90,84],
    tackles:[16,20],
    interceptions:[11,14],
    offsides:[2,1],
    goalkeeperSaves:[3,6],

    lineup:{
      home:[
        "ABC1","ABC2","ABC3","ABC4","ABC5",
        "ABC6","ABC7","ABC8","ABC9","ABC10","ABC11"
      ],

      away:[
        "XYZ1","XYZ2","XYZ3","XYZ4","XYZ5",
        "XYZ6","XYZ7","XYZ8","XYZ9","XYZ10","XYZ11"]
    }
  } 
};

const MatchCard = ({ match, onSelectMatch }) => {
  const homeWon = match.h !== undefined && (match.h > match.a || match.ph > match.pa);
  const awayWon = match.a !== undefined && (match.a > match.h || match.pa > match.ph);
  const hasPens = match.ph !== undefined;
  const isPending = match.status !== undefined;

  return (
    <div
      onClick={() => onSelectMatch(match)}
      className="w-56 bg-[#1a1d24] cursor-pointer border border-slate-700 rounded-md overflow-hidden shadow-lg flex flex-col mb-4 hover:border-sky-500 hover:scale-105 transition-all shrink-0"
    >
      <div className={`flex justify-between items-center p-2 border-b border-slate-800 ${homeWon ? 'bg-slate-800/80' : ''}`}>
        <div className="flex items-center space-x-2 truncate">
          <img src={getFlagUrl(match.home)} alt="" className="w-5 h-3.5 object-cover rounded-sm border border-slate-600 shrink-0" />
          <span className={`text-sm truncate ${homeWon ? 'text-white font-bold' : isPending ? 'text-slate-300' : 'text-slate-400'}`}>
            {match.home}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {hasPens && <span className="text-[10px] text-slate-500">({match.ph})</span>}
          <span className={`text-sm font-bold w-4 text-center ${homeWon ? 'text-white' : 'text-slate-400'}`}>
             {match.h !== undefined ? match.h : '-'}
          </span>
        </div>
      </div>
      <div className={`flex justify-between items-center p-2 ${awayWon ? 'bg-slate-800/80' : ''}`}>
        <div className="flex items-center space-x-2 truncate">
          <img src={getFlagUrl(match.away)} alt="" className="w-5 h-3.5 object-cover rounded-sm border border-slate-600 shrink-0" />
          <span className={`text-sm truncate ${awayWon ? 'text-white font-bold' : isPending ? 'text-slate-300' : 'text-slate-400'}`}>
            {match.away}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {hasPens && <span className="text-[10px] text-slate-500">({match.pa})</span>}
          <span className={`text-sm font-bold w-4 text-center ${awayWon ? 'text-white' : 'text-slate-400'}`}>
            {match.a !== undefined ? match.a : '-'}
          </span>
        </div>
      </div>
      {isPending && (
        <div className="bg-slate-900 py-1 px-2 border-t border-slate-800 text-[10px] text-sky-400 font-medium flex justify-between">
           <span>{match.isFinal ? "Final" : match.isThirdPlace ? "3rd place" : "Upcoming"}</span>
           <span>{match.status}</span>
        </div>
      )}
    </div>
  );
};

const StatRow = ({label,left,right}) => (
  <div className="bg-[#22262d] rounded-xl p-4 flex justify-between">
    <span className="font-bold text-white">{left}</span>

    <span className="text-slate-400">
      {label}
    </span>

    <span className="font-bold text-white">{right}</span>
  </div>
);

// ======================================================
// GROUP STAGE MATCHES
// ======================================================

const GROUP_STAGE_MATCHES = {
  1: [
    // GROUP A
    { id: 1001, group: 'A', date: '12/06/26', home: 'Mexico', away: 'South Africa', h: 2, a: 0 },
    { id: 1002, group: 'A', date: '12/06/26', home: 'South Korea', away: 'Czechia', h: 2, a: 1 },

    // GROUP B
    { id: 1003, group: 'B', date: '13/06/26', home: 'Canada', away: 'Bosnia & Herzegovina', h: 1, a: 1 },
    { id: 1004, group: 'B', date: '14/06/26', home: 'Qatar', away: 'Switzerland', h: 1, a: 1 },

    // GROUP C
    { id: 1005, group: 'C', date: '14/06/26', home: 'Brazil', away: 'Morocco', h: 1, a: 1 },
    { id: 1006, group: 'C', date: '14/06/26', home: 'Haiti', away: 'Scotland', h: 0, a: 1 },

    // GROUP D
    { id: 1007, group: 'D', date: '13/06/26', home: 'USA', away: 'Paraguay', h: 4, a: 1 },
    { id: 1008, group: 'D', date: '14/06/26', home: 'Australia', away: 'Türkiye', h: 2, a: 0 },

    // GROUP E
    { id: 1009, group: 'E', date: '14/06/26', home: 'Germany', away: 'Curaçao', h: 7, a: 1 },
    { id: 1010, group: 'E', date: '15/06/26', home: "Côte d'Ivoire", away: 'Ecuador', h: 1, a: 0 },

    // GROUP F
    { id: 1011, group: 'F', date: '15/06/26', home: 'Netherlands', away: 'Japan', h: 2, a: 2 },
    { id: 1012, group: 'F', date: '15/06/26', home: 'Sweden', away: 'Tunisia', h: 5, a: 1 },

    // GROUP G
    { id: 1013, group: 'G', date: '16/06/26', home: 'Belgium', away: 'Egypt', h: 1, a: 1 },
    { id: 1014, group: 'G', date: '16/06/26', home: 'Iran', away: 'New Zealand', h: 2, a: 2 },

    // GROUP H
    { id: 1015, group: 'H', date: '15/06/26', home: 'Spain', away: 'Cape Verde', h: 0, a: 0 },
    { id: 1016, group: 'H', date: '16/06/26', home: 'Saudi Arabia', away: 'Uruguay', h: 1, a: 1 },

    // GROUP I
    { id: 1017, group: 'I', date: '17/06/26', home: 'France', away: 'Senegal', h: 3, a: 1 },
    { id: 1018, group: 'I', date: '17/06/26', home: 'Iraq', away: 'Norway', h: 1, a: 4 },

    // GROUP J
    { id: 1019, group: 'J', date: '17/06/26', home: 'Argentina', away: 'Algeria', h: 3, a: 0 },
    { id: 1020, group: 'J', date: '17/06/26', home: 'Austria', away: 'Jordan', h: 3, a: 1 },

    // GROUP K
    { id: 1021, group: 'K', date: '17/06/26', home: 'Portugal', away: 'DR Congo', h: 1, a: 1 },
    { id: 1022, group: 'K', date: '18/06/26', home: 'Uzbekistan', away: 'Colombia', h: 1, a: 3 },

    // GROUP L
    { id: 1023, group: 'L', date: '18/06/26', home: 'England', away: 'Croatia', h: 4, a: 2 },
    { id: 1024, group: 'L', date: '18/06/26', home: 'Ghana', away: 'Panama', h: 1, a: 0 }
  ],

  2: [
  // GROUP A
    { id: 2001, group: 'A', date: '18/06/26', home: 'Czechia', away: 'South Africa', h: 1, a: 1 },
    { id: 2002, group: 'A', date: '19/06/26', home: 'Mexico', away: 'South Korea', h: 1, a: 0 },

  // GROUP B
    { id: 2003, group: 'B', date: '19/06/26', home: 'Switzerland', away: 'Bosnia & Herzegovina', h: 4, a: 1 },
    { id: 2004, group: 'B', date: '19/06/26', home: 'Canada', away: 'Qatar', h: 6, a: 0 },

  // GROUP C
    { id: 2005, group: 'C', date: '20/06/26', home: 'Scotland', away: 'Morocco', h: 0, a: 1 },
    { id: 2006, group: 'C', date: '20/06/26', home: 'Brazil', away: 'Haiti', h: 3, a: 0 },

  // GROUP D
    { id: 2007, group: 'D', date: '20/06/26', home: 'USA', away: 'Australia', h: 2, a: 0 },
    { id: 2008, group: 'D', date: '20/06/26', home: 'Türkiye', away: 'Paraguay', h: 0, a: 1 },

  // GROUP E
    { id: 2009, group: 'E', date: '21/06/26', home: 'Germany', away: "Côte d'Ivoire", h: 2, a: 1 },
    { id: 2010, group: 'E', date: '21/06/26', home: 'Ecuador', away: 'Curaçao', h: 0, a: 0 },

  // GROUP F
    { id: 2011, group: 'F', date: '20/06/26', home: 'Netherlands', away: 'Sweden', h: 5, a: 1 },
    { id: 2012, group: 'F', date: '21/06/26', home: 'Tunisia', away: 'Japan', h: 0, a: 4 },

  // GROUP G
    { id: 2013, group: 'G', date: '22/06/26', home: 'Belgium', away: 'Iran', h: 0, a: 0 },
    { id: 2014, group: 'G', date: '22/06/26', home: 'New Zealand', away: 'Egypt', h: 1, a: 3 },

  // GROUP H
    { id: 2015, group: 'H', date: '21/06/26', home: 'Spain', away: 'Saudi Arabia', h: 4, a: 0 },
    { id: 2016, group: 'H', date: '22/06/26', home: 'Uruguay', away: 'Cape Verde', h: 2, a: 2 },

  // GROUP I
    { id: 2017, group: 'I', date: '23/06/26', home: 'France', away: 'Iraq', h: 3, a: 0 },
    { id: 2018, group: 'I', date: '23/06/26', home: 'Norway', away: 'Senegal', h: 3, a: 2 },

  // GROUP J
    { id: 2019, group: 'J', date: '22/06/26', home: 'Argentina', away: 'Austria', h: 2, a: 0 },
    { id: 2020, group: 'J', date: '23/06/26', home: 'Jordan', away: 'Algeria', h: 1, a: 2 },

  // GROUP K
    { id: 2021, group: 'K', date: '23/06/26', home: 'Portugal', away: 'Uzbekistan', h: 5, a: 0 },
    { id: 2022, group: 'K', date: '24/06/26', home: 'Colombia', away: 'DR Congo', h: 1, a: 0 },

  // GROUP L
    { id: 2023, group: 'L', date: '24/06/26', home: 'England', away: 'Ghana', h: 0, a: 0 },
    { id: 2024, group: 'L', date: '24/06/26', home: 'Panama', away: 'Croatia', h: 0, a: 1 }
  ],

  3: [
  // GROUP A
    { id: 3001, group: 'A', date: '25/06/26', home: 'Czechia', away: 'Mexico', h: 0, a: 3 },
    { id: 3002, group: 'A', date: '25/06/26', home: 'South Africa', away: 'South Korea', h: 1, a: 0 },

  // GROUP B
    { id: 3003, group: 'B', date: '25/06/26', home: 'Bosnia & Herzegovina', away: 'Qatar', h: 3, a: 1 },
    { id: 3004, group: 'B', date: '25/06/26', home: 'Switzerland', away: 'Canada', h: 2, a: 1 },

  // GROUP C
    { id: 3005, group: 'C', date: '25/06/26', home: 'Morocco', away: 'Haiti', h: 4, a: 2 },
    { id: 3006, group: 'C', date: '25/06/26', home: 'Scotland', away: 'Brazil', h: 0, a: 3 },

  // GROUP D
    { id: 3007, group: 'D', date: '26/06/26', home: 'Paraguay', away: 'Australia', h: 0, a: 0 },
    { id: 3008, group: 'D', date: '26/06/26', home: 'Türkiye', away: 'USA', h: 3, a: 2 },

  // GROUP E
    { id: 3009, group: 'E', date: '26/06/26', home: 'Curaçao', away: "Côte d'Ivoire", h: 0, a: 2 },
    { id: 3010, group: 'E', date: '26/06/26', home: 'Ecuador', away: 'Germany', h: 2, a: 1 },

  // GROUP F
    { id: 3011, group: 'F', date: '26/06/26', home: 'Japan', away: 'Sweden', h: 1, a: 1 },
    { id: 3012, group: 'F', date: '26/06/26', home: 'Tunisia', away: 'Netherlands', h: 1, a: 3 },

  // GROUP G
    { id: 3013, group: 'G', date: '27/06/26', home: 'Egypt', away: 'Iran', h: 1, a: 1 },
    { id: 3014, group: 'G', date: '27/06/26', home: 'New Zealand', away: 'Belgium', h: 1, a: 5 },

  // GROUP H
    { id: 3015, group: 'H', date: '27/06/26', home: 'Cape Verde', away: 'Saudi Arabia', h: 0, a: 0 },
    { id: 3016, group: 'H', date: '27/06/26', home: 'Uruguay', away: 'Spain', h: 0, a: 1 },

  // GROUP I
    { id: 3017, group: 'I', date: '27/06/26', home: 'Norway', away: 'France', h: 1, a: 4 },
    { id: 3018, group: 'I', date: '27/06/26', home: 'Senegal', away: 'Iraq', h: 5, a: 0 },

  // GROUP J
    { id: 3019, group: 'J', date: '28/06/26', home: 'Algeria', away: 'Austria', h: 3, a: 3 },
    { id: 3020, group: 'J', date: '28/06/26', home: 'Jordan', away: 'Argentina', h: 1, a: 3 },

  // GROUP K
    { id: 3021, group: 'K', date: '28/06/26', home: 'Colombia', away: 'Portugal', h: 0, a: 0 },
    { id: 3022, group: 'K', date: '28/06/26', home: 'DR Congo', away: 'Uzbekistan', h: 3, a: 1 },

  // GROUP L
    { id: 3023, group: 'L', date: '28/06/26', home: 'Croatia', away: 'Ghana', h: 2, a: 1 },
    { id: 3024, group: 'L', date: '28/06/26', home: 'Panama', away: 'England', h: 0, a: 2 }
  ]
};


// ======================================================
// GROUP STAGE VIEW
// ======================================================

const GroupStageView = ({ onSelectMatch }) => {

  const [round, setRound] = useState(1);

  const matches = GROUP_STAGE_MATCHES[round] || [];

  const groupedMatches = matches.reduce((groups, match) => {

    if (!groups[match.group]) {
      groups[match.group] = [];
    }

    groups[match.group].push(match);

    return groups;

  }, {});


  return (

    <div className="p-4 sm:p-6 animate-in fade-in duration-500">

      {/* PAGE HEADER */}

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-white flex items-center">

          <CalendarDays className="mr-3 text-sky-400" />

          Group Stage Matches

        </h2>

        <p className="text-slate-400 mt-1">

          FIFA World Cup 2026 Group Stage results

        </p>

      </div>


      {/* ROUND SELECTOR */}

      <div className="flex items-center justify-center gap-4 mb-8">

        <button

          onClick={() =>
            setRound(prev => Math.max(1, prev - 1))
          }

          disabled={round === 1}

          className="p-3 bg-[#1a1d24] border border-slate-700 rounded-lg text-white disabled:opacity-30"

        >

          <ChevronLeft size={20} />

        </button>


        <div className="flex gap-2">

          {[1, 2, 3].map(r => (

            <button

              key={r}

              onClick={() => setRound(r)}

              className={`px-5 py-2 rounded-lg font-bold transition-all ${
                round === r

                  ? 'bg-sky-500 text-white'

                  : 'bg-[#1a1d24] text-slate-400 border border-slate-700 hover:text-white'
              }`}

            >

              Round {r}

            </button>

          ))}

        </div>


        <button

          onClick={() =>
            setRound(prev => Math.min(3, prev + 1))
          }

          disabled={round === 3}

          className="p-3 bg-[#1a1d24] border border-slate-700 rounded-lg text-white disabled:opacity-30"

        >

          <ChevronRight size={20} />

        </button>

      </div>


      {/* MATCHES */}

      {matches.length > 0 ? (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


          {Object.entries(groupedMatches).map(

            ([groupName, groupMatches]) => (

              <div

                key={groupName}

                className="bg-[#1a1d24] border border-slate-700 rounded-xl overflow-hidden"

              >


                {/* GROUP NAME */}

                <div className="bg-[#22262d] px-5 py-3 border-b border-slate-700">

                  <h3 className="font-bold text-white">

                    Group {groupName}

                  </h3>

                </div>


                {/* MATCH LIST */}

                {groupMatches.map(match => (

                  <div

                    key={match.id}

                    onClick={() => onSelectMatch(match)}

                    className="p-4 border-b last:border-b-0 border-slate-800 cursor-pointer hover:bg-[#22262d] transition-all"

                  >


                    <div className="flex items-center">


                      {/* DATE */}

                      <div className="w-20 mr-4 text-center">

                        <div className="text-xs text-slate-400">

                          {match.date}

                        </div>

                        <div className="text-xs text-slate-500 mt-1">

                          FT

                        </div>

                      </div>


                      {/* TEAMS */}

                      <div className="flex-1">


                        {/* HOME TEAM */}

                        <div className="flex items-center justify-between mb-2">

                          <div className="flex items-center gap-2">

                            <img

                              src={getFlagUrl(match.home)}

                              alt=""

                              className="w-6 h-4 object-cover rounded-sm"

                            />

                            <span className="text-white font-medium">

                              {match.home}

                            </span>

                          </div>

                          <span className="text-white font-bold">

                            {match.h}

                          </span>

                        </div>


                        {/* AWAY TEAM */}

                        <div className="flex items-center justify-between">

                          <div className="flex items-center gap-2">

                            <img

                              src={getFlagUrl(match.away)}

                              alt=""

                              className="w-6 h-4 object-cover rounded-sm"

                            />

                            <span className="text-slate-400">

                              {match.away}

                            </span>

                          </div>

                          <span className="text-white font-bold">

                            {match.a}

                          </span>

                        </div>


                      </div>

                    </div>

                  </div>

                ))}


              </div>

            )

          )}


        </div>

      ) : (

        <div className="text-center py-20 bg-[#1a1d24] border border-slate-800 rounded-xl">

          <CalendarDays

            size={40}

            className="mx-auto text-slate-600 mb-4"

          />

          <h3 className="text-xl font-bold text-white">

            Round {round}

          </h3>

          <p className="text-slate-400 mt-2">

            Match data will be added next.

          </p>

        </div>

      )}

    </div>

  );

};

const BracketView = ({ onSelectMatch }) => {
  return (
    <div className="p-4 sm:p-6 overflow-x-auto custom-scrollbar">
      <div className="mb-6 sticky left-0">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Swords className="mr-3 text-sky-400" /> Full Knockout Stage
        </h2>
        <p className="text-slate-400 mt-1">Official path from the Round of 32 to the Final.</p>
      </div>
      
      <div className="flex min-w-[1300px] space-x-8 pb-12 pt-4 items-center">
        <div className="flex flex-col justify-center"><h3 className="text-slate-300 font-medium mb-6 text-center text-sm">Round of 32</h3>{KNOCKOUT_MATCHES.r32.map(m => <MatchCard key={m.id} match={m} onSelectMatch={onSelectMatch} />)}</div>
        <div className="flex flex-col justify-center"><h3 className="text-slate-300 font-medium mb-6 text-center text-sm">Round of 16</h3>{KNOCKOUT_MATCHES.r16.map(m => <MatchCard key={m.id} match={m} onSelectMatch={onSelectMatch} />)}</div>
        <div className="flex flex-col justify-center"><h3 className="text-slate-300 font-medium mb-6 text-center text-sm">Quarterfinals</h3>{KNOCKOUT_MATCHES.qf.map(m => <MatchCard key={m.id} match={m} onSelectMatch={onSelectMatch} />)}</div>
        <div className="flex flex-col justify-center"><h3 className="text-slate-300 font-medium mb-6 text-center text-sm">Semifinals</h3>{KNOCKOUT_MATCHES.sf.map(m => <MatchCard key={m.id} match={m} onSelectMatch={onSelectMatch} />)}</div>
        <div className="flex flex-col justify-center items-center"><h3 className="text-sky-400 font-bold mb-6 text-center text-sm">3rd Place</h3>{KNOCKOUT_MATCHES.thirdPlace.map(m => <MatchCard key={m.id} match={m} onSelectMatch={onSelectMatch} />)}</div>
        <div className="flex flex-col justify-center items-center"><h3 className="text-amber-400 font-bold mb-6 text-center text-sm">Final</h3>{KNOCKOUT_MATCHES.finals.map(m => <MatchCard key={m.id} match={m} onSelectMatch={onSelectMatch} />)}</div>
      </div>
    </div>
  );
};

const ComparisonBar = ({ left, right, label, suffix = "" }) => {

    if (Number(left) === 0 && Number(right) === 0) return null;

    const total = Math.abs(left) + Math.abs(right);

    const leftWidth = total === 0 ? 50 : (Math.abs(left) / total) * 100;
    const rightWidth = total === 0 ? 50 : (Math.abs(right) / total) * 100;

    return (
        <div className="mb-8">

            <div className="flex justify-between items-center mb-3">

                <div className="text-white text-2xl font-bold">
                    {left}{suffix}
                </div>

                <div className="text-white font-semibold text-lg">
                    {label}
                </div>

                <div className="text-white text-2xl font-bold">
                    {right}{suffix}
                </div>

            </div>

            <div className="flex gap-4">

                <div className="flex-1 h-3 bg-[#2B2F3A] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#4ADE80]"
                        style={{
                            width: `${leftWidth}%`
                        }}
                    />
                </div>

                <div className="flex-1 h-3 bg-[#2B2F3A] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#818CF8] ml-auto"
                        style={{
                            width: `${rightWidth}%`
                        }}
                    />
                </div>

            </div>

        </div>
    );
};

const CircularStat = ({
  percentage,
  color = "#4ADE80",
  size = 80
}) => {

  const radius = 32;
  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference -
    (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">

      <svg
        width={size}
        height={size}
        className="-rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#2B2F3A"
          strokeWidth="8"
          fill="transparent"
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>

      <div className="-mt-12 text-white font-bold text-lg">
        {percentage}%
      </div>

    </div>
  );
};

const CircleComparison = ({
  leftValue,
  leftPercent,
  rightPercent,
  rightValue,
  label
}) => {
  return (
    <div className="grid grid-cols-[1fr_auto_1.5fr_auto_1fr] items-center gap-6 py-6">

      {/* Left value */}
      <div className="text-right text-white text-xl font-semibold">
        {leftValue}
      </div>

      {/* Left circle */}
      <CircularStat
        percentage={leftPercent}
        color="#4ADE80"
      />

      {/* Label */}
      <div className="text-center text-white text-xl font-semibold whitespace-nowrap">
        {label}
      </div>

      {/* Right circle */}
      <CircularStat
        percentage={rightPercent}
        color="#818CF8"
      />

      {/* Right value */}
      <div className="text-left text-white text-xl font-semibold">
        {rightValue}
      </div>

    </div>
  );
};

const MatchModal = ({ match, onClose }) => {
  const stats = MATCH_STATS[String(match.id)] || MATCH_STATS.default;

  const overview = stats.overview || {};
  const shots = stats.shots || {};
  const attack = stats.attack || {};
  const passes = stats.passes || {};
  const duels = stats.duels || {};
  const defending = stats.defending || {};
  const goalkeeping = stats.goalkeeping || {};
  return (
    <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto p-6">
      <div className="max-w-6xl mx-auto bg-[#1a1d24] border border-slate-700 rounded-2xl p-8 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white text-3xl"
        >
          ✕
        </button>

        {/* Match Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            {match.home} {match.h}
            {match.ph !== undefined && ` (${match.ph})`} 
            -         
            {match.a}
            {match.pa !== undefined && ` (${match.pa})`}
            {` ${match.away}`}
          </h1>

          <p className="text-slate-400 mt-2">
            {stats.competition}
          </p>

          <p className="text-slate-500">
            {stats.stadium}
          </p>
        </div>

        {/* Statistics Section */}
        {/* Overview Section */}

        <div className="mt-10">

        <h2 className="text-3xl font-bold text-center text-white mb-10">
        Match Overview
        </h2>

        <ComparisonBar left={overview.possession[0]} right={overview.possession[1]} label="Ball possession" suffix="%" />

        <ComparisonBar left={overview.distance[0]} right={overview.distance[1]} label="Distance covered" suffix=" km" />

        <ComparisonBar left={overview.xg[0]} right={overview.xg[1]} label="Expected goals (xG)" />

        <ComparisonBar left={overview.bigChances[0]} right={overview.bigChances[1]} label="Big chances" />

        <ComparisonBar left={overview.shots[0]} right={overview.shots[1]} label="Total shots" />

        <ComparisonBar left={overview.saves[0]} right={overview.saves[1]} label="Goalkeeper saves" />

        <ComparisonBar left={overview.sprints[0]} right={overview.sprints[1]} label="Number of sprints" />

        <ComparisonBar left={overview.corners[0]} right={overview.corners[1]} label="Corner kicks" />

        <ComparisonBar left={overview.fouls[0]} right={overview.fouls[1]} label="Fouls" />

        <ComparisonBar left={overview.passes[0]} right={overview.passes[1]} label="Passes" />

        <ComparisonBar left={overview.tackles[0]} right={overview.tackles[1]} label="Tackles" />

        <ComparisonBar left={overview.freeKicks[0]} right={overview.freeKicks[1]} label="Free kicks" />

        <ComparisonBar left={overview.yellowCards[0]} right={overview.yellowCards[1]} label="Yellow cards" />

        {!(overview.redCards[0] === 0 && overview.redCards[1] === 0) && (
          <ComparisonBar left={overview.redCards[0]} right={overview.redCards[1]} label="Red cards" />
        )}

        </div>

        <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-white mb-10">
                Shots
            </h2>

            <ComparisonBar left={overview.shots[0]} right={overview.shots[1]} label="Total shots" />

            <ComparisonBar left={shots.shotsOnTarget[0]} right={shots.shotsOnTarget[1]} label="Shots on target" />

            <ComparisonBar left={shots.hitWoodwork[0]} right={shots.hitWoodwork[1]} label="Hit woodwork" />

            <ComparisonBar left={shots.offTarget[0]} right={shots.offTarget[1]} label="Shots off target" />

            <ComparisonBar left={shots.blocked[0]} right={shots.blocked[1]} label="Blocked shots" />

            <ComparisonBar left={shots.insideBox[0]} right={shots.insideBox[1]} label="Shots inside box" />

            <ComparisonBar left={shots.outsideBox[0]} right={shots.outsideBox[1]} label="Shots outside box" />
        </div>

        <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-white mb-10">
                Attack
            </h2>

            <ComparisonBar left={attack.bigScored[0]} right={attack.bigScored[1]} label="Big chances scored" />

            <ComparisonBar left={attack.bigMissed[0]} right={attack.bigMissed[1]} label="Big chances missed" />

            <ComparisonBar left={attack.throughBalls[0]} right={attack.throughBalls[1]} label="Through balls" />

            <ComparisonBar left={attack.touchesBox[0]} right={attack.touchesBox[1]} label="Touches in opposition box" />

            <ComparisonBar left={attack.fouledThird[0]} right={attack.fouledThird[1]} label="Fouled in final third" />

            <ComparisonBar left={attack.offsides[0]} right={attack.offsides[1]} label="Offsides" />
        </div>

        <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-white mb-10">
                Passes
            </h2>

            <ComparisonBar left={passes.accurate[0]} right={passes.accurate[1]} label="Accurate passes" />

            <ComparisonBar left={passes.throwIns[0]} right={passes.throwIns[1]} label="Throw-ins" />

            <ComparisonBar left={passes.finalThird[0]} right={passes.finalThird[1]} label="Final third entries" />

            <CircleComparison
                leftValue="255/315"
                leftPercent={81}
                label="Passes in final third"
                rightPercent={48}
                rightValue="40/84"
            />

            <CircleComparison
                leftValue="27/40"
                leftPercent={68}
                label="Long balls"
                rightPercent={26}
                rightValue="20/78"
            />

            <CircleComparison
                leftValue="9/55"
                leftPercent={16}
                label="Crosses"
                rightPercent={29}
                rightValue="6/21"
            />
        </div>

        <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-white mb-10">
                Duels
            </h2>

            <ComparisonBar left={duels.possession[0]} right={duels.possession[1]} label="Duels" suffix="%" />

            <ComparisonBar left={duels.dispossessed[0]} right={duels.dispossessed[1]} label="Dispossessed" />

            <div className="grid grid-cols-3 items-center mt-10 mb-10">

              <div className="flex items-center justify-between">
                <span className="text-white text-xl">
                  40/97
                </span>

                <CircularStat percentage={41} color="#4ADE80" />
              </div>

              <div className="text-center text-white font-semibold text-lg">
                Ground duels
              </div>

              <div className="flex items-center justify-between">
                <CircularStat percentage={59} color="#818CF8" />

                <span className="text-white text-xl">
                  57/97
                </span>
              </div>

            </div>

            <ComparisonBar left={duels.ground[0]} right={duels.ground[1]} label="Ground duels" suffix="%" />

            <div className="grid grid-cols-3 items-center mt-10 mb-10">

              <div className="flex items-center justify-between">
                <span className="text-white text-xl">
                  21/40
                </span>

                <CircularStat percentage={53} color="#4ADE80" />
              </div>

              <div className="text-center text-white font-semibold text-lg">
                Aerial duels
              </div>

              <div className="flex items-center justify-between">
                <CircularStat percentage={48} color="#818CF8" />

                <span className="text-white text-xl">
                  19/40
                </span>
              </div>

            </div>

            <ComparisonBar left={duels.aerial[0]} right={duels.aerial[1]} label="Aerial duels" suffix="%" />

            <div className="grid grid-cols-3 items-center mt-10 mb-10">

              <div className="flex items-center justify-between">
                <span className="text-white text-xl">
                  15/35
                </span>

                <CircularStat percentage={43} color="#4ADE80" />
              </div>

              <div className="text-center text-white font-semibold text-lg">
                Dribbles
              </div>

              <div className="flex items-center justify-between">
                <CircularStat percentage={57} color="#818CF8" />

                <span className="text-white text-xl">
                  8/14
                </span>
              </div>

            </div>

            <ComparisonBar left={duels.dribbles[0]} right={duels.dribbles[1]} label="Dribbles" suffix="%" />
        </div>

        <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-white mb-10">
                Defending
            </h2>

            <div className="grid grid-cols-3 items-center mt-10 mb-10">

              <CircularStat
                percentage={54}
                color="#4ADE80"
              />

              <div className="text-center text-white text-xl font-semibold">
                Tackles won
              </div>

              <CircularStat
                percentage={61}
                color="#818CF8"
              />

            </div>

            <ComparisonBar left={defending.tackles[0]} right={defending.tackles[1]} label="Total tackles" />

            <ComparisonBar left={defending.interceptions[0]} right={defending.interceptions[1]} label="Interceptions" />

            <ComparisonBar left={defending.recoveries[0]} right={defending.recoveries[1]} label="Recoveries" />

            <ComparisonBar left={defending.clearances[0]} right={defending.clearances[1]} label="Clearances" />

            <ComparisonBar left={defending.errorsGoal?.[0] ?? 0} right={defending.errorsGoal?.[1] ?? 0} label="Errors leading to goal" />

            <ComparisonBar left={defending.errorsShot?.[0] ?? 0} right={defending.errorsShot?.[1] ?? 0} label="Errors leading to shot" />
        </div>

        <div className="mt-16 mb-20">
            <h2 className="text-3xl font-bold text-center text-white mb-10">
                Goalkeeping
            </h2>

            <ComparisonBar left={goalkeeping.saves[0]} right={goalkeeping.saves[1]} label="Goalkeeper saves" />

            <ComparisonBar left={goalkeeping.goalsPrevented[0]} right={goalkeeping.goalsPrevented[1]} label="Goals prevented" />

            <ComparisonBar left={goalkeeping.bigSaves[0]} right={goalkeeping.bigSaves[1]} label="Big saves" />

            <ComparisonBar left={goalkeeping.claims[0]} right={goalkeeping.claims[1]} label="High claims" />

            <ComparisonBar left={goalkeeping.punches[0]} right={goalkeeping.punches[1]} label="Punches" />

            <ComparisonBar left={goalkeeping.goalKicks[0]} right={goalkeeping.goalKicks[1]} label="Goal kicks" />
        </div>

        {/* Lineups */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Starting XI
          </h2>

          <div className="grid grid-cols-2 gap-8">

            <div>
              <h3 className="text-xl text-sky-400 mb-3">
                {match.home}
              </h3>

              {stats.lineup.home.map((player, index) => (
                <div
                  key={index}
                  className="bg-[#22262d] p-2 rounded mb-2"
                >
                  {player}
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-xl text-sky-400 mb-3">
                {match.away}
              </h3>

              {stats.lineup.away.map((player, index) => (
                <div
                  key={index}
                  className="bg-[#22262d] p-2 rounded mb-2"
                >
                  {player}
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

const TeamsView = ({ onSelectTeam }) => (
  <div className="p-4 sm:p-6 animate-in fade-in duration-500">
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white flex items-center">
        <Users className="mr-3 text-sky-400" /> World Cup 2026 Squads
      </h2>
      <p className="text-slate-400 mt-1">Explore every nation's squad and view detailed player statistics.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Object.keys(TEAMS).map(teamId => {
        const team = TEAMS[teamId];
        return (
          <div 
            key={teamId}
            onClick={() => onSelectTeam(teamId)}
            className="group cursor-pointer bg-[#1a1d24] border border-slate-700 rounded-2xl overflow-hidden hover:border-slate-500 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            <div className={`h-3 w-full bg-gradient-to-r ${team.color}`}></div>
            <div className="p-8 flex flex-col items-center relative">
              <div className="absolute top-4 right-4 bg-slate-900/50 p-2 rounded-full text-slate-400 group-hover:text-sky-400 group-hover:bg-sky-400/10 transition-colors">
                <Activity size={18} />
              </div>
              <img src={team.flag} alt={team.name} className="w-24 h-auto shadow-md rounded border border-slate-600 mb-6 group-hover:scale-105 transition-transform duration-300" />
              <h3 className="text-2xl font-bold text-white mb-2">{team.name}</h3>
              <div className="flex items-center text-sm font-medium text-sky-400 opacity-80 group-hover:opacity-100 transition-opacity">
                Explore Squad Stats <ArrowLeft size={16} className="ml-1 rotate-180" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const SquadView = ({ teamId, onBack, onSelectPlayer }) => {
  const team = TEAMS[teamId];
  const squad = PLAYERS[teamId];
  const positions = ['Attacker', 'Midfielder', 'Defender', 'Goalkeeper'];

  return (
    <div className="p-4 sm:p-6 animate-in slide-in-from-right-8 duration-300">
      <button 
        onClick={onBack}
        className="flex items-center text-slate-400 hover:text-white mb-8 bg-[#1a1d24] hover:bg-slate-800 px-4 py-2 rounded-full transition-all border border-slate-700 w-fit"
      >
        <ArrowLeft size={18} className="mr-2" /> Back to Nations
      </button>

      <div className="flex flex-col md:flex-row md:items-center mb-10 pb-6 border-b border-slate-800">
        <img src={team.flag} alt={team.name} className="w-24 h-auto rounded shadow-xl border border-slate-700 mb-4 md:mb-0 md:mr-6" />
        <div>
          <h2 className="text-4xl font-bold text-white mb-1">{team.name} Starting XI</h2>
          <p className="text-sky-400 font-medium flex items-center">
            <Target size={16} className="mr-2" />
            {getTournamentResult(team.name)}
          </p>
        </div>
      </div>

      <div className="space-y-10">
        {positions.map(pos => {
          const playersInPos = squad.filter(p => p.pos === pos);
          if (playersInPos.length === 0) return null;

          return (
            <div key={pos} className="mb-8">
              <h3 className="text-lg font-bold text-slate-300 mb-4 uppercase tracking-widest pl-2 border-l-2 border-sky-500">{pos}s</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {playersInPos.map(player => (
                  <div 
                    key={player.id}
                    onClick={() => onSelectPlayer(player)}
                    className="bg-[#1a1d24] border border-slate-700 rounded-xl p-4 cursor-pointer hover:bg-[#22262d] hover:border-slate-500 transition-all flex items-center space-x-4 group"
                  >
                    <div className="w-16 h-16 rounded-full border-2 border-[#1a1d24] bg-[#22262d] shadow-md group-hover:border-sky-500 transition-colors flex items-center justify-center text-xl text-slate-500 font-bold shrink-0 uppercase">
                      {player.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-white font-bold truncate">{player.name}</h4>
                      <p className="text-xs text-slate-400 mt-1 flex items-center">
                        <Flame size={12} className="mr-1 text-orange-500"/>
                        {player.stats.goals} G • {player.stats.assists} A
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('standings');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const [selectedMatch, setSelectedMatch] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab !== 'squads') setSelectedTeam(null);
  };

  const handleStandingsTeamClick = (teamId) => {
    setSelectedTeam(teamId);
    setActiveTab('squads');
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-slate-200 font-sans selection:bg-sky-500/30 overflow-x-hidden">
      
      {/* Top Navigation */}
      <nav className="bg-[#1a1d24] border-b border-slate-800 sticky top-0 z-40 shadow-md">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between h-auto sm:h-16 py-4 sm:py-0 items-center">
            
            <div className="flex items-center space-x-3 mb-4 sm:mb-0">
              <Trophy className="text-amber-400" size={28} />
              <span className="text-xl font-black tracking-tight text-white">
                WC<span className="text-sky-500">26</span> Explorer
              </span>
            </div>
            
            <div className="flex bg-[#0f1115] p-1 rounded-lg border border-slate-800">
              <button 
                onClick={() => handleTabChange('standings')}
                className={`px-4 sm:px-6 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'standings' ? 'bg-[#22262d] text-sky-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <div className="flex items-center"><LayoutGrid size={16} className="mr-2 hidden sm:block"/> Standings</div>
              </button>
              <button 
                onClick={() => handleTabChange('groupstage')}
                className={`px-4 sm:px-6 py-2 rounded-md text-sm font-bold transition-all ${
                  activeTab === 'groupstage'
                    ? 'bg-[#22262d] text-sky-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <div className="flex items-center">
                  <CalendarDays
                    size={16}
                    className="mr-2 hidden sm:block"
                  />
                  Group Stage
                </div>
              </button>
              <button 
                onClick={() => handleTabChange('knockout')}
                className={`px-4 sm:px-6 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'knockout' ? 'bg-[#22262d] text-sky-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <div className="flex items-center"><CalendarDays size={16} className="mr-2 hidden sm:block"/> Knockout</div>
              </button>
              <button 
                onClick={() => handleTabChange('squads')}
                className={`px-4 sm:px-6 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'squads' ? 'bg-[#22262d] text-sky-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <div className="flex items-center"><Users size={16} className="mr-2 hidden sm:block"/> Squads</div>
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-[1400px] mx-auto pb-12">
        {activeTab === 'standings' && (
          <GroupsView onSelectTeam={handleStandingsTeamClick} />
        )}
        {activeTab === 'groupstage' && (
          <GroupStageView onSelectMatch={setSelectedMatch} />
        )}
        {
        activeTab === 'knockout' &&
        (
          <BracketView
            onSelectMatch={setSelectedMatch}
        />
        )
        }
        
        {activeTab === 'squads' && !selectedTeam && (
          <TeamsView onSelectTeam={setSelectedTeam} />
        )}

        {activeTab === 'squads' && selectedTeam && (
          <SquadView 
            teamId={selectedTeam} 
            onBack={() => setSelectedTeam(null)} 
            onSelectPlayer={setSelectedPlayer}
          />
        )}
      </main>

      {/* Global Modals */}
      <PlayerModal 
        player={selectedPlayer} 
        team={selectedPlayer ? TEAMS[selectedTeam] : null}
        onClose={() => setSelectedPlayer(null)} 
      />
      
      {
      selectedMatch &&
      (
        <MatchModal
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
        />
      )
      }

      {/* Scrollbar Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { height: 10px; width: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0f1115; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #22262d; border-radius: 4px; border: 2px solid #0f1115; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}} />
    </div>
  );
}