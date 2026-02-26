const mongoose = require('mongoose');
require('dotenv').config();
const Template = require('./models/Template');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'wishlink_db';

const templates = [
  // Love Templates
  {
    name: 'Eternal Love',
    category: 'love',
    description: 'A timeless love story with beautiful animations',
    thumbnail: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400',
    isPremium: false,
    pages: [
      {
        title: 'Welcome',
        order: 1,
        htmlContent: `
          <div style="min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; padding: 2rem; font-family: 'Georgia', serif;">
            <div style="text-align: center; color: white; animation: fadeIn 1.5s;">
              <h1 style="font-size: 4rem; margin-bottom: 1rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">{{yourName}} & {{partnerName}}</h1>
              <p style="font-size: 1.5rem; opacity: 0.9;">Our Love Story</p>
              <p style="font-size: 1.2rem; margin-top: 2rem;">Since {{relationshipDate}}</p>
            </div>
          </div>
          <style>
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          </style>
        `
      },
      {
        title: 'Love Message',
        order: 2,
        htmlContent: `
          <div style="min-height: 100vh; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 3rem; display: flex; align-items: center; justify-content: center;">
            <div style="max-width: 800px; background: rgba(255,255,255,0.95); padding: 3rem; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
              <h2 style="font-size: 2.5rem; color: #f5576c; text-align: center; margin-bottom: 2rem; font-family: 'Georgia', serif;">My Love Letter</h2>
              <p style="font-size: 1.3rem; line-height: 1.8; color: #333; text-align: center; font-family: 'Georgia', serif;">{{loveMessage}}</p>
              <p style="font-size: 1.3rem; line-height: 1.8; color: #333; text-align: center; margin-top: 2rem; font-family: 'Georgia', serif;">{{customMessage}}</p>
            </div>
          </div>
        `
      },
      {
        title: 'Our Memories',
        order: 3,
        htmlContent: `
          <div style="min-height: 100vh; background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 3rem;">
            <h2 style="font-size: 3rem; text-align: center; color: #333; margin-bottom: 3rem; font-family: 'Georgia', serif;">Our Beautiful Moments</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; max-width: 1200px; margin: 0 auto;">
              {{#each images}}
              <div style="border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.2); transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                <img src="{{this}}" style="width: 100%; height: 300px; object-fit: cover;" alt="Memory">
              </div>
              {{/each}}
            </div>
            {{#if favoriteSong}}
            <div style="text-align: center; margin-top: 3rem;">
              <p style="font-size: 1.5rem; color: #555;">Our Song: <strong>{{favoriteSong}}</strong></p>
            </div>
            {{/if}}
          </div>
        `
      }
    ]
  },
  {
    name: 'Sweet Moments',
    category: 'love',
    description: 'Capture your sweet memories together',
    thumbnail: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400',
    isPremium: true,
    pages: [
      {
        title: 'Cover',
        order: 1,
        htmlContent: `
          <div style="min-height: 100vh; background: linear-gradient(to right, #fa709a 0%, #fee140 100%); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: url('data:image/svg+xml,<svg width=\"100\" height=\"100\" xmlns=\"http://www.w3.org/2000/svg\"><text x=\"50\" y=\"50\" font-size=\"50\" fill=\"rgba(255,255,255,0.1)\" text-anchor=\"middle\">❤</text></svg>') repeat; animation: float 20s infinite linear;"></div>
            <div style="text-align: center; z-index: 1; color: white;">
              <h1 style="font-size: 5rem; margin: 0; text-shadow: 3px 3px 6px rgba(0,0,0,0.2);">{{yourName}} 💕 {{partnerName}}</h1>
              <p style="font-size: 2rem; margin-top: 1rem;">Sweet Moments Together</p>
            </div>
          </div>
          <style>
            @keyframes float {
              from { transform: translateY(0); }
              to { transform: translateY(-100px); }
            }
          </style>
        `
      },
      {
        title: 'Timeline',
        order: 2,
        htmlContent: `
          <div style="min-height: 100vh; background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); padding: 4rem 2rem;">
            <h2 style="font-size: 3rem; text-align: center; color: #d63031; margin-bottom: 3rem;">Our Journey</h2>
            <div style="max-width: 800px; margin: 0 auto;">
              <div style="background: white; padding: 2rem; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); margin-bottom: 2rem;">
                <h3 style="color: #e17055; font-size: 2rem;">❤️ First Meeting</h3>
                <p style="font-size: 1.2rem; color: #555; line-height: 1.6;">{{relationshipDate}}</p>
              </div>
              <div style="background: white; padding: 2rem; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                <h3 style="color: #e17055; font-size: 2rem;">💌 Our Message</h3>
                <p style="font-size: 1.2rem; color: #555; line-height: 1.6;">{{loveMessage}}</p>
              </div>
            </div>
          </div>
        `
      },
      {
        title: 'Gallery',
        order: 3,
        htmlContent: `
          <div style="min-height: 100vh; background: #ffe5ec; padding: 3rem;">
            <h2 style="font-size: 3rem; text-align: center; color: #ff006e; margin-bottom: 3rem;">Captured Memories 📸</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem; max-width: 1200px; margin: 0 auto;">
              {{#each images}}
              <div style="position: relative; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.2); aspect-ratio: 1;">
                <img src="{{this}}" style="width: 100%; height: 100%; object-fit: cover;" alt="Memory">
              </div>
              {{/each}}
            </div>
          </div>
        `
      }
    ]
  },
  {
    name: 'Love Timeline',
    category: 'love',
    description: 'Chronicle your love journey',
    thumbnail: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=400',
    isPremium: false,
    pages: [
      {
        title: 'Beginning',
        order: 1,
        htmlContent: `
          <div style="min-height: 100vh; background: linear-gradient(to bottom, #4b6cb7 0%, #182848 100%); display: flex; align-items: center; justify-content: center; color: white; padding: 2rem;">
            <div style="text-align: center; max-width: 800px;">
              <div style="font-size: 6rem; margin-bottom: 2rem;">💖</div>
              <h1 style="font-size: 4rem; margin-bottom: 1rem;">{{yourName}} & {{partnerName}}</h1>
              <p style="font-size: 1.8rem; opacity: 0.9;">A Love Timeline</p>
              <div style="margin-top: 3rem; font-size: 1.3rem; background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 15px; backdrop-filter: blur(10px);">
                <p>Started: {{relationshipDate}}</p>
              </div>
            </div>
          </div>
        `
      },
      {
        title: 'Story',
        order: 2,
        htmlContent: `
          <div style="min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 4rem 2rem;">
            <div style="max-width: 900px; margin: 0 auto; background: white; padding: 3rem; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
              <h2 style="font-size: 3rem; color: #667eea; text-align: center; margin-bottom: 2rem;">Our Story</h2>
              <div style="font-size: 1.3rem; line-height: 2; color: #444; text-align: justify;">
                <p style="margin-bottom: 1.5rem;">{{loveMessage}}</p>
                <p style="margin-top: 2rem; font-style: italic; color: #764ba2;">{{customMessage}}</p>
              </div>
            </div>
          </div>
        `
      },
      {
        title: 'Photos',
        order: 3,
        htmlContent: `
          <div style="min-height: 100vh; background: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%); padding: 3rem;">
            <h2 style="font-size: 3.5rem; text-align: center; color: #d63031; margin-bottom: 3rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">Precious Moments</h2>
            <div style="max-width: 1400px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 2rem; justify-content: center;">
              {{#each images}}
              <div style="flex: 1 1 calc(33.333% - 2rem); min-width: 300px; max-width: 400px; border-radius: 20px; overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.2); transform: rotate({{@index}}deg);">
                <img src="{{this}}" style="width: 100%; height: 350px; object-fit: cover;" alt="Memory">
              </div>
              {{/each}}
            </div>
          </div>
        `
      }
    ]
  },
  {
    name: 'Romantic Getaway',
    category: 'love',
    description: 'Perfect for travel memories',
    thumbnail: 'https://images.unsplash.com/photo-1502301197179-65228ab57f78?w=400',
    isPremium: true,
    pages: [
      {
        title: 'Adventure',
        order: 1,
        htmlContent: `
          <div style="min-height: 100vh; background: linear-gradient(135deg, #0093E9 0%, #80D0C7 100%); display: flex; align-items: center; justify-content: center; padding: 2rem;">
            <div style="text-align: center; color: white;">
              <h1 style="font-size: 5rem; margin-bottom: 2rem; text-shadow: 3px 3px 8px rgba(0,0,0,0.3);">✈️ Our Adventure ✈️</h1>
              <h2 style="font-size: 3rem; margin-bottom: 1rem;">{{yourName}} & {{partnerName}}</h2>
              <p style="font-size: 1.8rem; background: rgba(255,255,255,0.2); padding: 1rem 2rem; border-radius: 50px; display: inline-block;">Together Since {{relationshipDate}}</p>
            </div>
          </div>
        `
      },
      {
        title: 'Destinations',
        order: 2,
        htmlContent: `
          <div style="min-height: 100vh; background: #f0f4f8; padding: 4rem 2rem;">
            <h2 style="font-size: 3rem; text-align: center; color: #0093E9; margin-bottom: 3rem;">Places We've Been Together</h2>
            <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
              {{#each images}}
              <div style="background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); transition: all 0.3s;" onmouseover="this.style.transform='translateY(-10px)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 25px rgba(0,0,0,0.1)'">
                <img src="{{this}}" style="width: 100%; height: 250px; object-fit: cover;" alt="Travel Memory">
                <div style="padding: 1.5rem;">
                  <p style="color: #555; font-size: 1.1rem;">Beautiful memories together</p>
                </div>
              </div>
              {{/each}}
            </div>
          </div>
        `
      },
      {
        title: 'Message',
        order: 3,
        htmlContent: `
          <div style="min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; padding: 3rem;">
            <div style="max-width: 700px; background: white; padding: 3rem; border-radius: 25px; box-shadow: 0 25px 50px rgba(0,0,0,0.3);">
              <h2 style="font-size: 2.5rem; color: #667eea; text-align: center; margin-bottom: 2rem;">💕 Our Love Note 💕</h2>
              <p style="font-size: 1.4rem; line-height: 1.9; color: #333; text-align: center;">{{loveMessage}}</p>
              <p style="font-size: 1.2rem; line-height: 1.8; color: #666; text-align: center; margin-top: 2rem; font-style: italic;">{{customMessage}}</p>
            </div>
          </div>
        `
      }
    ]
  },
  {
    name: 'Love Diary',
    category: 'love',
    description: 'A personal love diary',
    thumbnail: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400',
    isPremium: false,
    pages: [
      {
        title: 'Cover Page',
        order: 1,
        htmlContent: `
          <div style="min-height: 100vh; background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%); display: flex; align-items: center; justify-content: center; padding: 2rem;">
            <div style="background: white; padding: 4rem; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); text-align: center; border: 5px solid #fdcb6e;">
              <div style="font-size: 4rem; margin-bottom: 2rem;">📖</div>
              <h1 style="font-size: 3.5rem; color: #d63031; margin-bottom: 1rem;">Love Diary</h1>
              <p style="font-size: 2rem; color: #636e72;">{{yourName}} & {{partnerName}}</p>
              <p style="font-size: 1.3rem; color: #636e72; margin-top: 2rem;">Est. {{relationshipDate}}</p>
            </div>
          </div>
        `
      },
      {
        title: 'Entries',
        order: 2,
        htmlContent: `
          <div style="min-height: 100vh; background: #fff8e1; padding: 4rem 2rem;">
            <div style="max-width: 800px; margin: 0 auto;">
              <div style="background: white; padding: 3rem; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border-left: 5px solid #fdcb6e; margin-bottom: 2rem;">
                <h3 style="color: #d63031; font-size: 2rem; margin-bottom: 1rem;">Dear Diary,</h3>
                <p style="font-size: 1.2rem; line-height: 1.8; color: #2d3436;">{{loveMessage}}</p>
              </div>
              <div style="background: white; padding: 3rem; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border-left: 5px solid #ff7675;">
                <h3 style="color: #d63031; font-size: 2rem; margin-bottom: 1rem;">Today I want to say,</h3>
                <p style="font-size: 1.2rem; line-height: 1.8; color: #2d3436;">{{customMessage}}</p>
              </div>
            </div>
          </div>
        `
      },
      {
        title: 'Memory Lane',
        order: 3,
        htmlContent: `
          <div style="min-height: 100vh; background: linear-gradient(to bottom, #ffeaa7 0%, #fab1a0 100%); padding: 3rem;">
            <h2 style="font-size: 3rem; text-align: center; color: #2d3436; margin-bottom: 3rem;">📸 Memory Lane</h2>
            <div style="max-width: 1000px; margin: 0 auto;">
              {{#each images}}
              <div style="background: white; padding: 1.5rem; margin-bottom: 2rem; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
                <img src="{{this}}" style="width: 100%; border-radius: 10px; margin-bottom: 1rem;" alt="Memory">
                <p style="text-align: center; color: #636e72; font-style: italic;">A moment to cherish forever</p>
              </div>
              {{/each}}
            </div>
          </div>
        `
      }
    ]
  },
  // Birthday Templates
  {
    name: 'Birthday Celebration',
    category: 'birthday',
    description: 'Grand birthday celebration theme',
    thumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400',
    isPremium: false,
    pages: [
      {
        title: 'Welcome',
        order: 1,
        htmlContent: `
          <div style="min-height: 100vh; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); display: flex; align-items: center; justify-content: center; padding: 2rem; position: relative; overflow: hidden;">
            <div style="position: absolute; font-size: 5rem; animation: float 3s infinite ease-in-out;">🎈🎉🎂🎁</div>
            <div style="text-align: center; color: white; z-index: 1;">
              <h1 style="font-size: 6rem; margin-bottom: 2rem; text-shadow: 4px 4px 8px rgba(0,0,0,0.3);">🎉 HAPPY BIRTHDAY! 🎉</h1>
              <h2 style="font-size: 4rem; margin-bottom: 1rem;">{{partnerName}}</h2>
              <p style="font-size: 2rem; background: rgba(255,255,255,0.2); padding: 1rem 2rem; border-radius: 50px; display: inline-block;">With Love from {{yourName}}</p>
            </div>
          </div>
          <style>
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-20px); }
            }
          </style>
        `
      },
      {
        title: 'Wishes',
        order: 2,
        htmlContent: `
          <div style="min-height: 100vh; background: linear-gradient(to right, #ff9a9e 0%, #fad0c4 100%); padding: 4rem 2rem; display: flex; align-items: center;">
            <div style="max-width: 800px; margin: 0 auto; background: white; padding: 4rem; border-radius: 25px; box-shadow: 0 20px 60px rgba(0,0,0,0.2);">
              <h2 style="font-size: 3rem; color: #f5576c; text-align: center; margin-bottom: 3rem;">🎂 Birthday Wishes 🎂</h2>
              <p style="font-size: 1.5rem; line-height: 2; color: #333; text-align: center;">{{loveMessage}}</p>
              <p style="font-size: 1.3rem; line-height: 1.9; color: #555; text-align: center; margin-top: 2rem; font-style: italic;">{{customMessage}}</p>
            </div>
          </div>
        `
      },
      {
        title: 'Memories',
        order: 3,
        htmlContent: `
          <div style="min-height: 100vh; background: #fff5f7; padding: 3rem;">
            <h2 style="font-size: 3.5rem; text-align: center; color: #f5576c; margin-bottom: 3rem;">📸 Birthday Memories</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; max-width: 1200px; margin: 0 auto;">
              {{#each images}}
              <div style="border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.2); position: relative;">
                <img src="{{this}}" style="width: 100%; height: 350px; object-fit: cover;" alt="Birthday Memory">
                <div style="position: absolute; top: 10px; right: 10px; background: rgba(245,87,108,0.9); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 1.5rem;">🎉</div>
              </div>
              {{/each}}
            </div>
          </div>
        `
      }
    ]
  },
  {
    name: 'Birthday Surprise',
    category: 'birthday',
    description: 'Surprise birthday greeting',
    thumbnail: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400',
    isPremium: true,
    pages: [
      {
        title: 'Surprise',
        order: 1,
        htmlContent: `
          <div style="min-height: 100vh; background: linear-gradient(135deg, #FEB692 0%, #EA5455 100%); display: flex; align-items: center; justify-content: center; padding: 2rem;">
            <div style="text-align: center; color: white; animation: bounce 1s infinite;">
              <div style="font-size: 8rem; margin-bottom: 2rem;">🎁</div>
              <h1 style="font-size: 5rem; text-shadow: 3px 3px 10px rgba(0,0,0,0.4);">SURPRISE!</h1>
              <h2 style="font-size: 3.5rem; margin-top: 2rem;">Happy Birthday {{partnerName}}!</h2>
            </div>
          </div>
          <style>
            @keyframes bounce {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.1); }
            }
          </style>
        `
      },
      {
        title: 'Special Message',
        order: 2,
        htmlContent: `
          <div style="min-height: 100vh; background: linear-gradient(to bottom, #ffecd2 0%, #fcb69f 100%); padding: 4rem 2rem; display: flex; align-items: center; justify-content: center;">
            <div style="max-width: 900px; background: white; padding: 4rem; border-radius: 30px; box-shadow: 0 25px 70px rgba(0,0,0,0.3); border: 3px dashed #EA5455;">
              <h2 style="font-size: 3rem; color: #EA5455; text-align: center; margin-bottom: 2rem;">🎊 Just For You 🎊</h2>
              <p style="font-size: 1.4rem; line-height: 2; color: #333;">{{loveMessage}}</p>
              <p style="font-size: 1.2rem; line-height: 1.9; color: #555; margin-top: 2rem; padding-top: 2rem; border-top: 2px dashed #EA5455;">{{customMessage}}</p>
              <p style="text-align: center; margin-top: 3rem; font-size: 1.5rem; color: #EA5455;">- {{yourName}} 💝</p>
            </div>
          </div>
        `
      },
      {
        title: 'Photo Collage',
        order: 3,
        htmlContent: `
          <div style="min-height: 100vh; background: #fffbf0; padding: 3rem;">
            <h2 style="font-size: 3.5rem; text-align: center; color: #EA5455; margin-bottom: 3rem;">🎈 Moments Together</h2>
            <div style="max-width: 1400px; margin: 0 auto; columns: 3; column-gap: 2rem;">
              {{#each images}}
              <div style="break-inside: avoid; margin-bottom: 2rem; border-radius: 15px; overflow: hidden; box-shadow: 0 8px 20px rgba(0,0,0,0.15);">
                <img src="{{this}}" style="width: 100%; display: block;" alt="Birthday Memory">
              </div>
              {{/each}}
            </div>
          </div>
        `
      }
    ]
  },
  {
    name: 'Golden Birthday',
    category: 'birthday',
    description: 'Luxurious golden theme',
    thumbnail: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400',
    isPremium: true,
    pages: [
      {
        title: 'Golden Entrance',
        order: 1,
        htmlContent: `
          <div style="min-height: 100vh; background: linear-gradient(135deg, #f7971e 0%, #ffd200 100%); display: flex; align-items: center; justify-content: center; padding: 2rem; position: relative;">
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle, transparent 20%, rgba(255,210,0,0.3) 100%);"></div>
            <div style="text-align: center; color: #5a3e1b; z-index: 1;">
              <div style="font-size: 7rem; margin-bottom: 2rem; filter: drop-shadow(0 5px 15px rgba(0,0,0,0.3));">👑</div>
              <h1 style="font-size: 5rem; font-weight: bold; text-shadow: 2px 2px 8px rgba(255,255,255,0.5);">HAPPY BIRTHDAY</h1>
              <h2 style="font-size: 4rem; margin-top: 1rem; font-family: 'Georgia', serif;">{{partnerName}}</h2>
              <p style="font-size: 1.8rem; margin-top: 2rem; background: rgba(255,255,255,0.3); padding: 1rem 2rem; border-radius: 50px; display: inline-block;">A Golden Celebration</p>
            </div>
          </div>
        `
      },
      {
        title: 'Royal Wishes',
        order: 2,
        htmlContent: `
          <div style="min-height: 100vh; background: #2c1810; padding: 4rem 2rem; display: flex; align-items: center;">
            <div style="max-width: 800px; margin: 0 auto; background: linear-gradient(135deg, #f7971e 0%, #ffd200 100%); padding: 4rem; border-radius: 25px; box-shadow: 0 30px 80px rgba(0,0,0,0.5); border: 3px solid #ffd200;">
              <h2 style="font-size: 3rem; color: #5a3e1b; text-align: center; margin-bottom: 3rem; text-shadow: 1px 1px 3px rgba(255,255,255,0.5);">✨ Golden Wishes ✨</h2>
              <p style="font-size: 1.4rem; line-height: 2; color: #2c1810; text-align: center; font-weight: 500;">{{loveMessage}}</p>
              <p style="font-size: 1.2rem; line-height: 1.9; color: #5a3e1b; text-align: center; margin-top: 2rem;">{{customMessage}}</p>
            </div>
          </div>
        `
      },
      {
        title: 'Treasured Memories',
        order: 3,
        htmlContent: `
          <div style="min-height: 100vh; background: linear-gradient(to bottom, #2c1810 0%, #5a3e1b 100%); padding: 3rem;">
            <h2 style="font-size: 3.5rem; text-align: center; color: #ffd200; margin-bottom: 3rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">💎 Precious Moments</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; max-width: 1200px; margin: 0 auto;">
              {{#each images}}
              <div style="border: 3px solid #ffd200; border-radius: 20px; overflow: hidden; box-shadow: 0 15px 40px rgba(255,210,0,0.3); background: #ffd200; padding: 10px;">
                <img src="{{this}}" style="width: 100%; height: 350px; object-fit: cover; border-radius: 12px;" alt="Golden Memory">
              </div>
              {{/each}}
            </div>
          </div>
        `
      }
    ]
  },
  {
    name: 'Fun Birthday',
    category: 'birthday',
    description: 'Colorful and playful theme',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    isPremium: false,
    pages: [
      {
        title: 'Party Time',
        order: 1,
        htmlContent: `
          <div style="min-height: 100vh; background: linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #FFA07A, #98D8C8); background-size: 400% 400%; animation: gradientShift 5s ease infinite; display: flex; align-items: center; justify-content: center; padding: 2rem;">
            <div style="text-align: center; color: white;">
              <div style="font-size: 8rem; margin-bottom: 1rem; animation: spin 3s linear infinite;">🎊</div>
              <h1 style="font-size: 6rem; text-shadow: 5px 5px 15px rgba(0,0,0,0.4); font-weight: bold;">PARTY TIME!</h1>
              <h2 style="font-size: 4rem; margin-top: 2rem; background: rgba(255,255,255,0.3); padding: 1rem 3rem; border-radius: 60px; display: inline-block;">{{partnerName}}'s Birthday!</h2>
            </div>
          </div>
          <style>
            @keyframes gradientShift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          </style>
        `
      },
      {
        title: 'Fun Message',
        order: 2,
        htmlContent: `
          <div style="min-height: 100vh; background: linear-gradient(to right, #FA8BFF 0%, #2BD2FF 50%, #2BFF88 100%); padding: 4rem 2rem; display: flex; align-items: center;">
            <div style="max-width: 850px; margin: 0 auto; background: white; padding: 4rem; border-radius: 30px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); transform: rotate(-2deg);">
              <h2 style="font-size: 3.5rem; color: #FF6B6B; text-align: center; margin-bottom: 2rem; transform: rotate(2deg);">🎉 Birthday Vibes! 🎉</h2>
              <p style="font-size: 1.4rem; line-height: 2; color: #333; transform: rotate(2deg);">{{loveMessage}}</p>
              <p style="font-size: 1.2rem; line-height: 1.9; color: #555; margin-top: 2rem; transform: rotate(2deg);">{{customMessage}}</p>
              <p style="text-align: right; font-size: 1.5rem; color: #4ECDC4; margin-top: 2rem; transform: rotate(2deg);">🎈 {{yourName}}</p>
            </div>
          </div>
        `
      },
      {
        title: 'Fun Gallery',
        order: 3,
        htmlContent: `
          <div style="min-height: 100vh; background: #fff; padding: 3rem;">
            <h2 style="font-size: 4rem; text-align: center; background: linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 3rem; font-weight: bold;">📸 FUN TIMES!</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; max-width: 1200px; margin: 0 auto;">
              {{#each images}}
              <div style="border-radius: 25px; overflow: hidden; box-shadow: 0 12px 35px rgba(0,0,0,0.2); transform: rotate({{#if @even}}2deg{{else}}-2deg{{/if}}); transition: all 0.3s;" onmouseover="this.style.transform='scale(1.05) rotate(0deg)'" onmouseout="this.style.transform='scale(1) rotate({{#if @even}}2deg{{else}}-2deg{{/if}})'">
                <img src="{{this}}" style="width: 100%; height: 320px; object-fit: cover;" alt="Fun Memory">
              </div>
              {{/each}}
            </div>
          </div>
        `
      }
    ]
  },
  // Anniversary Templates
  {
    name: 'Anniversary Special',
    category: 'anniversary',
    description: 'Celebrate your special milestone',
    thumbnail: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=400',
    isPremium: false,
    pages: [
      {
        title: 'Celebration',
        order: 1,
        htmlContent: `
          <div style="min-height: 100vh; background: linear-gradient(135deg, #b92b27 0%, #1565c0 100%); display: flex; align-items: center; justify-content: center; padding: 2rem;">
            <div style="text-align: center; color: white;">
              <div style="font-size: 7rem; margin-bottom: 2rem;">💑</div>
              <h1 style="font-size: 5rem; text-shadow: 3px 3px 10px rgba(0,0,0,0.4); margin-bottom: 1rem;">Happy Anniversary!</h1>
              <h2 style="font-size: 3.5rem;">{{yourName}} & {{partnerName}}</h2>
              <p style="font-size: 2rem; margin-top: 2rem; background: rgba(255,255,255,0.2); padding: 1rem 2rem; border-radius: 50px; display: inline-block;">Celebrating {{relationshipDate}}</p>
            </div>
          </div>
        `
      },
      {
        title: 'Love Letter',
        order: 2,
        htmlContent: `
          <div style="min-height: 100vh; background: linear-gradient(to right, #ece9e6 0%, #ffffff 100%); padding: 4rem 2rem; display: flex; align-items: center;">
            <div style="max-width: 800px; margin: 0 auto; background: white; padding: 4rem; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.15); border: 2px solid #b92b27;">
              <h2 style="font-size: 3rem; color: #b92b27; text-align: center; margin-bottom: 3rem;">💕 Forever & Always 💕</h2>
              <p style="font-size: 1.4rem; line-height: 2; color: #333; text-align: justify;">{{loveMessage}}</p>
              <p style="font-size: 1.2rem; line-height: 1.9; color: #555; text-align: justify; margin-top: 2rem; font-style: italic;">{{customMessage}}</p>
            </div>
          </div>
        `
      },
      {
        title: 'Our Journey',
        order: 3,
        htmlContent: `
          <div style="min-height: 100vh; background: #f8f9fa; padding: 3rem;">
            <h2 style="font-size: 3.5rem; text-align: center; color: #b92b27; margin-bottom: 3rem;">💖 Our Journey Together</h2>
            <div style="max-width: 1300px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem;">
              {{#each images}}
              <div style="position: relative; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                <img src="{{this}}" style="width: 100%; height: 350px; object-fit: cover;" alt="Anniversary Memory">
                <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(185,43,39,0.9), transparent); padding: 2rem 1rem 1rem; color: white; font-size: 1.2rem; text-align: center;">Together Forever ❤️</div>
              </div>
              {{/each}}
            </div>
          </div>
        `
      }
    ]
  },
  {
    name: 'Forever Together',
    category: 'anniversary',
    description: 'Timeless anniversary celebration',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
    isPremium: true,
    pages: [
      {
        title: 'Eternal',
        order: 1,
        htmlContent: `
          <div style="min-height: 100vh; background: linear-gradient(to bottom, #000000 0%, #434343 100%); display: flex; align-items: center; justify-content: center; padding: 2rem; position: relative; overflow: hidden;">
            <div style="position: absolute; width: 200px; height: 200px; border: 2px solid rgba(255,255,255,0.2); border-radius: 50%; animation: pulse 3s infinite;"></div>
            <div style="text-align: center; color: white; z-index: 1;">
              <div style="font-size: 8rem; margin-bottom: 2rem;">♾️</div>
              <h1 style="font-size: 5rem; margin-bottom: 1rem; font-family: 'Georgia', serif;">Forever Together</h1>
              <h2 style="font-size: 3rem; opacity: 0.9;">{{yourName}} × {{partnerName}}</h2>
              <p style="font-size: 1.8rem; margin-top: 2rem; letter-spacing: 2px;">Since {{relationshipDate}}</p>
            </div>
          </div>
          <style>
            @keyframes pulse {
              0%, 100% { transform: scale(1); opacity: 0.5; }
              50% { transform: scale(1.5); opacity: 0.2; }
            }
          </style>
        `
      },
      {
        title: 'Promise',
        order: 2,
        htmlContent: `
          <div style="min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 4rem 2rem; display: flex; align-items: center; justify-content: center;">
            <div style="max-width: 850px; background: white; padding: 5rem; border-radius: 30px; box-shadow: 0 30px 80px rgba(0,0,0,0.4);">
              <h2 style="font-size: 3.5rem; color: #667eea; text-align: center; margin-bottom: 3rem; font-family: 'Georgia', serif;">Our Promise 💍</h2>
              <p style="font-size: 1.5rem; line-height: 2.2; color: #333; text-align: center; font-style: italic;">{{loveMessage}}</p>
              <div style="height: 2px; background: linear-gradient(to right, transparent, #667eea, transparent); margin: 3rem 0;"></div>
              <p style="font-size: 1.3rem; line-height: 2; color: #555; text-align: center;">{{customMessage}}</p>
            </div>
          </div>
        `
      },
      {
        title: 'Moments',
        order: 3,
        htmlContent: `
          <div style="min-height: 100vh; background: #0f0f0f; padding: 3rem;">
            <h2 style="font-size: 4rem; text-align: center; color: white; margin-bottom: 3rem; font-family: 'Georgia', serif;">✨ Timeless Moments ✨</h2>
            <div style="max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2.5rem;">
              {{#each images}}
              <div style="position: relative; border-radius: 10px; overflow: hidden; box-shadow: 0 15px 45px rgba(255,255,255,0.1);">
                <img src="{{this}}" style="width: 100%; height: 400px; object-fit: cover; filter: grayscale(20%);" alt="Anniversary Memory">
                <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.7), transparent); display: flex; align-items: flex-end; padding: 2rem;">
                  <p style="color: white; font-size: 1.3rem; font-style: italic;">Forever in our hearts</p>
                </div>
              </div>
              {{/each}}
            </div>
          </div>
        `
      }
    ]
  }
];

// Add 10 more templates to reach 20
const additionalTemplates = [
  {
    name: 'Heart & Soul',
    category: 'love',
    description: 'Deep connection and soulmates',
    thumbnail: 'https://images.unsplash.com/photo-1583391733975-05f90883df29?w=400',
    isPremium: true,
    pages: [
      { title: 'Connection', order: 1, htmlContent: '<div style="min-height: 100vh; background: linear-gradient(135deg, #FF512F 0%, #DD2476 100%); display: flex; align-items: center; justify-content: center;"><div style="text-align: center; color: white;"><h1 style="font-size: 5rem;">❤️ Heart & Soul ❤️</h1><h2 style="font-size: 3rem; margin-top: 2rem;">{{yourName}} & {{partnerName}}</h2></div></div>' },
      { title: 'Message', order: 2, htmlContent: '<div style="min-height: 100vh; background: #fff; padding: 4rem; display: flex; align-items: center;"><div style="max-width: 800px; margin: 0 auto;"><p style="font-size: 1.5rem; line-height: 2; color: #333;">{{loveMessage}}</p><p style="font-size: 1.3rem; margin-top: 2rem; color: #555;">{{customMessage}}</p></div></div>' },
      { title: 'Photos', order: 3, htmlContent: '<div style="min-height: 100vh; background: #f5f5f5; padding: 3rem;"><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">{{#each images}}<img src="{{this}}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 15px;" alt="Memory">{{/each}}</div></div>' }
    ]
  },
  {
    name: 'Magical Moments',
    category: 'love',
    description: 'Create magic together',
    thumbnail: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400',
    isPremium: false,
    pages: [
      { title: 'Magic', order: 1, htmlContent: '<div style="min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center;"><div style="text-align: center; color: white;"><h1 style="font-size: 6rem;">✨ Magical Moments ✨</h1><h2 style="font-size: 3rem;">{{yourName}} & {{partnerName}}</h2></div></div>' },
      { title: 'Story', order: 2, htmlContent: '<div style="min-height: 100vh; background: white; padding: 4rem;"><div style="max-width: 800px; margin: 0 auto;"><p style="font-size: 1.4rem; line-height: 2;">{{loveMessage}}</p><p style="font-size: 1.2rem; margin-top: 2rem;">{{customMessage}}</p></div></div>' },
      { title: 'Gallery', order: 3, htmlContent: '<div style="min-height: 100vh; background: #e8eaf6; padding: 3rem;"><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem;">{{#each images}}<img src="{{this}}" style="width: 100%; height: 320px; object-fit: cover; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2);" alt="Memory">{{/each}}</div></div>' }
    ]
  },
  {
    name: 'Love Chronicles',
    category: 'love',
    description: 'Chronicle your love story',
    thumbnail: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400',
    isPremium: true,
    pages: [
      { title: 'Chapter 1', order: 1, htmlContent: '<div style="min-height: 100vh; background: linear-gradient(to bottom, #2c3e50 0%, #3498db 100%); display: flex; align-items: center; justify-content: center;"><div style="text-align: center; color: white;"><h1 style="font-size: 5rem;">Love Chronicles</h1><h2 style="font-size: 3rem; margin-top: 2rem;">{{yourName}} & {{partnerName}}</h2></div></div>' },
      { title: 'Our Story', order: 2, htmlContent: '<div style="min-height: 100vh; background: #ecf0f1; padding: 4rem;"><div style="max-width: 900px; margin: 0 auto; background: white; padding: 3rem; border-radius: 15px;"><p style="font-size: 1.4rem; line-height: 2;">{{loveMessage}}</p><p style="font-size: 1.2rem; margin-top: 2rem;">{{customMessage}}</p></div></div>' },
      { title: 'Memories', order: 3, htmlContent: '<div style="min-height: 100vh; background: white; padding: 3rem;"><div style="columns: 3; column-gap: 2rem;">{{#each images}}<div style="break-inside: avoid; margin-bottom: 2rem;"><img src="{{this}}" style="width: 100%; border-radius: 10px;" alt="Memory"></div>{{/each}}</div></div>' }
    ]
  },
  {
    name: 'Modern Romance',
    category: 'love',
    description: 'Contemporary love design',
    thumbnail: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=400',
    isPremium: false,
    pages: [
      { title: 'Modern Love', order: 1, htmlContent: '<div style="min-height: 100vh; background: #000; color: white; display: flex; align-items: center; justify-content: center;"><div style="text-align: center;"><h1 style="font-size: 6rem; font-weight: 100; letter-spacing: 10px;">LOVE</h1><h2 style="font-size: 2.5rem; margin-top: 2rem;">{{yourName}} × {{partnerName}}</h2></div></div>' },
      { title: 'Words', order: 2, htmlContent: '<div style="min-height: 100vh; background: white; padding: 4rem; display: flex; align-items: center;"><div style="max-width: 700px; margin: 0 auto;"><p style="font-size: 1.5rem; line-height: 2; color: #333;">{{loveMessage}}</p><p style="font-size: 1.3rem; margin-top: 2rem; color: #666;">{{customMessage}}</p></div></div>' },
      { title: 'Visual', order: 3, htmlContent: '<div style="min-height: 100vh; background: #f8f8f8; padding: 3rem;"><div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">{{#each images}}<img src="{{this}}" style="width: 100%; height: 400px; object-fit: cover;" alt="Memory">{{/each}}</div></div>' }
    ]
  },
  {
    name: 'Elegant Love',
    category: 'love',
    description: 'Sophisticated and elegant',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400',
    isPremium: true,
    pages: [
      { title: 'Elegance', order: 1, htmlContent: '<div style="min-height: 100vh; background: linear-gradient(135deg, #8e9eab 0%, #eef2f3 100%); display: flex; align-items: center; justify-content: center;"><div style="text-align: center;"><h1 style="font-size: 5rem; font-family: Georgia, serif; color: #2c3e50;">Elegant Love</h1><h2 style="font-size: 3rem; margin-top: 2rem; color: #34495e;">{{yourName}} & {{partnerName}}</h2></div></div>' },
      { title: 'Letter', order: 2, htmlContent: '<div style="min-height: 100vh; background: #ecf0f1; padding: 4rem; display: flex; align-items: center;"><div style="max-width: 800px; margin: 0 auto; background: white; padding: 4rem; box-shadow: 0 10px 40px rgba(0,0,0,0.1);"><p style="font-size: 1.4rem; line-height: 2; font-family: Georgia, serif;">{{loveMessage}}</p><p style="font-size: 1.2rem; margin-top: 2rem; font-family: Georgia, serif;">{{customMessage}}</p></div></div>' },
      { title: 'Gallery', order: 3, htmlContent: '<div style="min-height: 100vh; background: white; padding: 3rem;"><div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;">{{#each images}}<img src="{{this}}" style="width: 100%; height: 350px; object-fit: cover;" alt="Memory">{{/each}}</div></div>' }
    ]
  },
  {
    name: 'Milestone Birthday',
    category: 'birthday',
    description: 'Special milestone celebration',
    thumbnail: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=400',
    isPremium: true,
    pages: [
      { title: 'Milestone', order: 1, htmlContent: '<div style="min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center;"><div style="text-align: center; color: white;"><h1 style="font-size: 7rem;">🎉 MILESTONE 🎉</h1><h2 style="font-size: 4rem; margin-top: 2rem;">{{partnerName}}</h2><p style="font-size: 2rem; margin-top: 1rem;">Happy Birthday!</p></div></div>' },
      { title: 'Wishes', order: 2, htmlContent: '<div style="min-height: 100vh; background: white; padding: 4rem; display: flex; align-items: center;"><div style="max-width: 800px; margin: 0 auto;"><p style="font-size: 1.5rem; line-height: 2;">{{loveMessage}}</p><p style="font-size: 1.3rem; margin-top: 2rem;">{{customMessage}}</p></div></div>' },
      { title: 'Photos', order: 3, htmlContent: '<div style="min-height: 100vh; background: #f0f0f0; padding: 3rem;"><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">{{#each images}}<img src="{{this}}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 15px;" alt="Memory">{{/each}}</div></div>' }
    ]
  },
  {
    name: 'Party Time',
    category: 'birthday',
    description: 'Ultimate party celebration',
    thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400',
    isPremium: false,
    pages: [
      { title: 'Party', order: 1, htmlContent: '<div style="min-height: 100vh; background: linear-gradient(45deg, #FF6B6B, #4ECDC4); display: flex; align-items: center; justify-content: center;"><div style="text-align: center; color: white;"><h1 style="font-size: 7rem;">🎊 PARTY! 🎊</h1><h2 style="font-size: 4rem; margin-top: 2rem;">{{partnerName}}</h2></div></div>' },
      { title: 'Message', order: 2, htmlContent: '<div style="min-height: 100vh; background: white; padding: 4rem;"><div style="max-width: 800px; margin: 0 auto;"><p style="font-size: 1.5rem; line-height: 2;">{{loveMessage}}</p><p style="font-size: 1.3rem; margin-top: 2rem;">{{customMessage}}</p></div></div>' },
      { title: 'Gallery', order: 3, htmlContent: '<div style="min-height: 100vh; background: #fafafa; padding: 3rem;"><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">{{#each images}}<img src="{{this}}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 10px;" alt="Memory">{{/each}}</div></div>' }
    ]
  },
  {
    name: 'Birthday Bliss',
    category: 'birthday',
    description: 'Blissful birthday wishes',
    thumbnail: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=400',
    isPremium: false,
    pages: [
      { title: 'Bliss', order: 1, htmlContent: '<div style="min-height: 100vh; background: linear-gradient(to right, #fa709a 0%, #fee140 100%); display: flex; align-items: center; justify-content: center;"><div style="text-align: center; color: white;"><h1 style="font-size: 6rem;">Birthday Bliss</h1><h2 style="font-size: 4rem; margin-top: 2rem;">{{partnerName}}</h2></div></div>' },
      { title: 'Wishes', order: 2, htmlContent: '<div style="min-height: 100vh; background: white; padding: 4rem;"><div style="max-width: 800px; margin: 0 auto;"><p style="font-size: 1.5rem; line-height: 2;">{{loveMessage}}</p><p style="font-size: 1.3rem; margin-top: 2rem;">{{customMessage}}</p></div></div>' },
      { title: 'Memories', order: 3, htmlContent: '<div style="min-height: 100vh; background: #fffbf0; padding: 3rem;"><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">{{#each images}}<img src="{{this}}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 10px;" alt="Memory">{{/each}}</div></div>' }
    ]
  },
  {
    name: 'Grand Celebration',
    category: 'birthday',
    description: 'Grand birthday celebration',
    thumbnail: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400',
    isPremium: true,
    pages: [
      { title: 'Grand', order: 1, htmlContent: '<div style="min-height: 100vh; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); display: flex; align-items: center; justify-content: center;"><div style="text-align: center; color: white;"><h1 style="font-size: 7rem;">🎊 GRAND 🎊</h1><h2 style="font-size: 4rem; margin-top: 2rem;">{{partnerName}}</h2><p style="font-size: 2rem; margin-top: 1rem;">Happy Birthday!</p></div></div>' },
      { title: 'Message', order: 2, htmlContent: '<div style="min-height: 100vh; background: white; padding: 4rem;"><div style="max-width: 800px; margin: 0 auto;"><p style="font-size: 1.5rem; line-height: 2;">{{loveMessage}}</p><p style="font-size: 1.3rem; margin-top: 2rem;">{{customMessage}}</p></div></div>' },
      { title: 'Photos', order: 3, htmlContent: '<div style="min-height: 100vh; background: #f5f5f5; padding: 3rem;"><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">{{#each images}}<img src="{{this}}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 15px;" alt="Memory">{{/each}}</div></div>' }
    ]
  },
  {
    name: 'Anniversary Memories',
    category: 'anniversary',
    description: 'Cherished anniversary memories',
    thumbnail: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=400',
    isPremium: false,
    pages: [
      { title: 'Memories', order: 1, htmlContent: '<div style="min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center;"><div style="text-align: center; color: white;"><h1 style="font-size: 6rem;">Anniversary</h1><h2 style="font-size: 3rem; margin-top: 2rem;">{{yourName}} & {{partnerName}}</h2></div></div>' },
      { title: 'Message', order: 2, htmlContent: '<div style="min-height: 100vh; background: white; padding: 4rem;"><div style="max-width: 800px; margin: 0 auto;"><p style="font-size: 1.5rem; line-height: 2;">{{loveMessage}}</p><p style="font-size: 1.3rem; margin-top: 2rem;">{{customMessage}}</p></div></div>' },
      { title: 'Gallery', order: 3, htmlContent: '<div style="min-height: 100vh; background: #f9f9f9; padding: 3rem;"><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">{{#each images}}<img src="{{this}}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 10px;" alt="Memory">{{/each}}</div></div>' }
    ]
  }
];

templates.push(...additionalTemplates);

async function seedDatabase() {
  try {
    await mongoose.connect(`${MONGO_URL}/${DB_NAME}`);
    
    console.log('Connected to MongoDB');
    
    // Clear existing templates
    await Template.deleteMany({});
    console.log('Cleared existing templates');
    
    // Insert new templates
    await Template.insertMany(templates);
    console.log(`Successfully seeded ${templates.length} templates`);
    
    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
