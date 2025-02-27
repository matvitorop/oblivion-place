# Place Of Oblivion
## :question: Description 
Place of oblivion - web application and casino simulator created on **ASP.NET** as backend part and on **React** as frontend part (Typescript + Material UI). The project implements a system of game sessions, balance management, and authorization via HTTPOnly Cookies.
## :hammer: Technologies
- Backend: `ASP.NET`, `Entity Framework`, `AutoMapper`, `JWT`
- Frontend: `React`, `TypeScript`, `Zustand`, `Vite`, `Material UI`
- Database: `MSSQL`
- API documentation: `Swagger`
- State-manager: `Zustand`
- Validation: `react-hook-form`, `yup`
## :mag_right: Functionality
- [x] Registration, login and authorization via HTTPOnly Cookies
- [x] Data safety via routing and state-manager
- [x] Ability to roll the slots test your luck by getting prizes  
- [x] Balance deposit every 10 seconds
- [x] Conducting gaming sessions (“roll” the slot)
- [x] Displaying the history of sessions
## :exclamation: Project setup
### 1. Cloning repository
```
# Choose directory for cloning repository
git clone https://github.com/matvitorop/oblivion-place.git
```
### 2. Launch backend part (ASP.NET Core Web API)
```
cd PlaceOfOblivion.Server
# Config your connection string in appsettings.json
# Execute migration
dotnet ef database update
# Launch a server
set ASPNETCORE_ENVIRONMENT=Development (development mode with swagger)
dotnet run --urls "https://localhost:7024;http://localhost:5287"
```
_Also you can find [example appsettings.json](./PlaceOfOblivion.Server/data-example.json) to make your connection string_
### 3. Launch frontend part (React)
```
cd placeofoblivion.client
npm install
npm run dev
```
## :black_nib: API Documentation
Swagger is available at: `https://localhost:7024/swagger/index.html` after launching a server
## :page_with_curl: Licenses
This project is using **MIT LICENSE**. For more details, see:
- [MIT LICENSE](./LICENSE.txt)
- [Frontend licenses summary](./licenses-frontend.txt)
- [Backend licenses summary](./licenses-backend.txt)
## :grinning: Authors
[TOROP Matvii](https://github.com/matvitorop) - backend and frontend developer, idea creator
## :star: Additional
- [Privacy policy](./PRIVACY_POLICY.md)
- [Storybook](./placeofoblivion.client/.storybook)
- [Frontend documentation](./frontend-documentation)
