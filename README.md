# HoliDaze

Holidaze is a venue booking platform built with React and Vite. It allows users to browse venues, make bookings, and manage venues as a venue manager. The application includes features such as user registration, venue management, and booking functionality.

![Holidaze Screenshot](./src/images/holidaze-home-readme.jpg)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#Features)
- [Technologies used](#technologies-used)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [License](#license)

### Installation

To get started with this project, clone the repository and install the dependencies:

1. Clone the repository:

```bash
   git clone https://github.com/EliseAur/holidaze.git
```

2. Navigate to the project Directory:

```bash
cd holidaze
```

3. Install dependencies

```bash
npm install
```

## Usage

To start the development server, run:

```bash
npm run dev
```

This will start the Vite development server, and you can view the application in your browser.

To build the project for production, run:

```bash
npm run build
```

## Features

1. Venue Browsing:

- A user may search for a specific venue.
- A user may view a specific venue page by its ID.

2. Calendar Integration:

- A user may view a calendar with available dates for a venue.

3. User Registration:

- A user with a stud.noroff.no email may register as a customer.
- A user with a stud.noroff.no email may register as a venue manager.
  Note: Venue managers hosting venues cannot undo their role unless they delete their venues. Venues with bookings cannot be deleted.

4. Customer Features:

- A registered customer may create a booking at a venue.
- A registered customer may view their upcoming bookings.

5. Venue Manager Features:

- A registered venue manager may create a venue (Includes validation for all fields on both mobile and desktop)
- A registered venue manager may update a venue they manage.
- A registered venue manager may delete a venue they manage.
- A registered venue manager may view bookings for a venue they manage.

6. User Account Management:

- A registered user may log in.
- A registered user may update their avatar.
- A registered user may log out.

## Technologies Used

- **React**: Frontend framework
- **Vite**: Build tool for fast development
- **React Router**: For routing
- **Yup**: For form validation
- **Tailwind CSS**: For styling

## Dependencies

- `@fortawesome/fontawesome-svg-core`: ^6.7.2
- `@fortawesome/free-brands-svg-icons`: ^6.7.2
- `@fortawesome/free-solid-svg-icons`: ^6.7.2
- `@fortawesome/react-fontawesome`: ^0.2.2
- `@headlessui/react`: ^2.2.0
- `@hookform/resolvers`: ^4.1.3
- `@tailwindcss/vite`: ^4.0.4
- `date-fns`: ^4.1.0
- `react`: ^19.0.0
- `react-datepicker`: ^8.1.0
- `react-dom`: ^19.0.0
- `react-hook-form`: ^7.54.2
- `react-responsive`: ^10.0.1
- `react-responsive-carousel`: ^3.2.23
- `react-router-dom`: ^7.2.0
- `tailwindcss`: ^4.0.4
- `yup`: ^1.6.1

## Dev Dependencies

- `@babel/preset-env`: ^7.26.9
- `@babel/preset-react`: ^7.26.3
- `@eslint/js`: ^9.19.0
- `@testing-library/jest-dom`: ^6.6.3
- `@testing-library/react`: ^16.3.0
- `@testing-library/user-event`: ^14.6.1
- `@types/react`: ^19.0.8
- `@types/react-dom`: ^19.0.3
- `@vitejs/plugin-react`: ^4.4.1
- `autoprefixer`: ^10.4.20
- `babel-jest`: ^29.7.0
- `eslint`: ^9.19.0
- `eslint-plugin-jest`: ^28.11.0
- `eslint-plugin-react`: ^7.37.4
- `eslint-plugin-react-hooks`: ^5.0.0
- `eslint-plugin-react-refresh`: ^0.4.18
- `globals`: ^15.14.0
- `identity-obj-proxy`: ^3.0.0
- `jest`: ^29.7.0
- `jest-environment-jsdom`: ^29.7.0
- `postcss`: ^8.5.1
- `prettier`: ^3.4.2
- `vite`: ^6.3.3

## License

This project is licensed under the MIT License.
