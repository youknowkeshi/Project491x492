# ใช้ Node.js เป็น Base Image
FROM node:20

# ตั้งค่า Working Directory
WORKDIR /app

# คัดลอก package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง Dependencies
RUN npm install

# คัดลอกไฟล์โปรเจค
COPY . .

# สร้างโปรเจค
RUN npm run build

# กำหนดพอร์ตที่ให้บริการ
EXPOSE 3000

# รันเซิร์ฟเวอร์
CMD ["npm", "run", "dev"]
