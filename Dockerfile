# בחר את בסיס התמונה
FROM node:18

# הגדרת תיקיית העבודה
WORKDIR /app

# העתקת קבצי package.json ו-package-lock.json
COPY package*.json ./

# התקנת התלויות
RUN npm install

# העתקת שאר הקבצים
COPY . .

# חשיפת הפורט שבו השירות רץ
EXPOSE 3002

# הפעלת השרת
CMD ["npm", "start"]
