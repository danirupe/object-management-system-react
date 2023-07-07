# Object Management System
The aim of the project is to create a simple CRUD application simulating an **Object Management System (OMS)**. The OMS allows users to **create, read, update and delete** objects of different types (categories). Each object has a type and a set of properties. The properties are defined by the user and assigned to the type. The user can also create, read, update and delete types and properties.

#### Example:
The application can be used to manage a list of books. The user can create a type called "Book" and assign properties like "Title", "Author", "Year", "ISBN", etc. Then, the user can create objects of type "Book" and assign values to the properties. 

## Technologies and tools
The application has been implemented using **React and TypeScript** and styled using **Tailwind CSS**. The application uses **Redux Toolkit** for status management, React Router for navigation and React Hook Form for form management.

## Folder Structure
The application has been implemented using a component-based approach. The folder "components" contains the main components of the application and the folder "store" contains all the files related to the Redux store.

src/
  |-- assets/
  |-- components/
  |-- models/
  |-- pages/
  |-- store/
  |-- utility/