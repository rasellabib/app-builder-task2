# Multi React App Builder

This project is a tool that **automatically generates and builds multiple React apps from a single CSV file**.  
Each CSV entry will be generated as a separate React app.

## Features

- Reads data from a `websites.csv` file to automatically generate multiple apps
- Each app will have a **Hero Section** and a **Contact Section**
- Every app is saved inside the `/build` folder in separate subfolders
- Adding new entries to the CSV will automatically create new apps on the next `npm start`
- Each app follows the standard React build structure and can run independently

---

## Folder Structure

```bash
multi-react-builder
│
├── build-all.js # Main Node.js script to generate apps
├── websites.csv # CSV file containing app data
├── package.json
│
├── template # Base React template used for each generated app
│ ├── public
│ │ └── index.html
│ │
│ └── src
│ ├── index.js
│ ├── App.jsx
│ ├── Hero.jsx
│ └── Contact.jsx
│
└── build # Generated apps will be placed here
├── foodexpress.com
├── techhubbd.com
└── bookbazaar.com
```

---

## Step-by-Step Guide

### 1. Clone or Download the Project

```bash
git clone <repository-url>
cd multi-react-builder
```

### 2. Install Dependencies

```bash
npm install
```

### Dependencies used in this project:

###### csv-parser → For reading CSV files

###### fs-extra → For file operations and copying templates

###### child_process → For executing build commands like npm run build

---

### 3. Add Your CSV Data

```bash
domain,title,description,phone,address
foodexpress.com,Food Express,Delicious meals delivered fast,01712345678,"House 12, Road 5, Banani, Dhaka"
techhubbd.com,Tech Hub BD,Your trusted tech partner,01898765432,"Level 4, Block B, Dhanmondi, Dhaka"
bookbazaar.com,Book Bazaar,Buy and sell books online,01911223344,"Shop 22, New Market, Chittagong"
```

## 4. Run the Script

```bash
npm start
```

#### You should see the following output in the terminal:

```bash
Creating app for: foodexpress.com
Building foodexpress.com...
Creating app for: techhubbd.com
Building techhubbd.com...
Creating app for: bookbazaar.com
Building bookbazaar.com...
All apps have been built successfully!
```

### 6. Run a Generated App

###### To run any generated app locally:

```bash
cd build/foodexpress.com
npm start
```
# app-builder-task2
