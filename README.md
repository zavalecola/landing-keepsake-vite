# Keepsake Landing (`landing-keepsake-vite`)

Адаптивний лендинг Keepsake, зібраний на базі **Vite**, **Vituum**, **Pug** та **SCSS** із налаштованими **PostCSS / Autoprefixer**, **Prettier**, **Stylelint**, **Husky + lint-staged** та автоматичною публікацією на **GitHub Pages** через **GitHub Actions**.

- **Демо (GitHub Pages):** https://zavalecola.github.io/landing-keepsake-vite/

---

## Вимоги до середовища та команди

- **Node.js** (версія 20+ або 22 LTS) та **npm**

| Команда           | Призначення                                                      |
| :---------------- | :--------------------------------------------------------------- |
| `npm install`     | Встановлення залежностей проєкту                                 |
| `npm run dev`     | Запуск локального сервера розробки з гарячим оновленням          |
| `npm run build`   | Продакшн-збірка проєкту у директорію `dist/`                     |
| `npm run preview` | Локальний перегляд зібраної продакшн-версії з `dist/`            |
| `npm run format`  | Автоформатування коду та стилів через Prettier                   |
| `npm run lint`    | Перевірка стилів (`lint:styles`) та форматування (`lint:format`) |

---

## Структура проєкту та архітектура Pug і SCSS

```text
landing-keepsake-vite/
├── .github/workflows/   # Workflow GitHub Actions для деплою на GitHub Pages
├── .husky/              # Git-хуки (зокрема pre-commit через lint-staged)
├── src/
│   ├── assets/          # Зображення, іконки та медіаресурси
│   ├── components/      # Компоненти (header, footer) та секції (hero, works, services, about, contact)
│   ├── data/            # Дані для шаблонів (масиви об'єктів, списки)
│   ├── includes/        # Фрагменти шаблону (head, meta, fonts)
│   ├── layouts/         # Базові макети сторінок (extends / block)
│   ├── mixins/          # Pug-міксини (btn, icon, picture, work-card)
│   ├── pages/           # Сторінки (index.pug, index.js)
│   └── styles/          # Модульні SCSS-файли та main.scss
├── package.json
├── package-lock.json
├── postcss.config.js
└── vite.config.js
```
