# FEProjectApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.21.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Fordev

### 1) Setup ก่อนเริ่มพัฒนา

1. ติดตั้ง Node.js LTS (แนะนำ v20+)
2. ติดตั้ง Angular CLI v18

```bash
npm install -g @angular/cli@18
```

3. ติดตั้ง package ของโปรเจกต์

```bash
npm install
```

### 2) PrimeNG ที่โปรเจกต์นี้ใช้

- primeng@18
- @primeuix/themes
- primeicons
- primeflex

กรณีต้องติดตั้งใหม่:

```bash
npm install primeng@18 @primeuix/themes primeicons primeflex
```

PrimeNG v18 docs:
https://v18.primeng.org/installation

### 3) วิธีรันโปรเจกต์

```bash
npm start
```

เปิดที่:
http://localhost:4200/

### 4) Workflow ทำงานร่วมกับเพื่อน (Git)

1. ดึงโค้ดล่าสุดก่อนเริ่มงานทุกครั้ง

```bash
git pull origin main
```

2. สร้าง branch แยกสำหรับงานตัวเอง

```bash
git checkout -b feature/<feature-name>
```

3. ทำงานและ commit

```bash
git add .
git commit -m "feat: <short-description>"
```

4. push branch ขึ้น GitHub

```bash
git push -u origin feature/<feature-name>
```

### 5) หมายเหตุสำคัญ

- ห้าม push งานตรงเข้า `main` ถ้าเป็นงานฟีเจอร์
- ควร pull ก่อนเริ่มงานทุกครั้งเพื่อลด conflict
- ถ้าเจอปัญหา package ให้ลบ `node_modules` และ `package-lock.json` แล้วรัน `npm install` ใหม่
