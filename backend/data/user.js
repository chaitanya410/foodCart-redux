import bcrypt from "bcrypt";

const users = [
    {
        name: 'Admin User',
        email: 'admin@admin.com',
        password: bcrypt.hashSync('12345678', 10),
        isAdmin: true
    },
    {
        name: 'Shantanu',
        email: 'shantanu@gmail.com',
        password: bcrypt.hashSync('12345678', 10),
        isAdmin: false
    },
    {
        name: 'Nitin',
        email: 'nitin@gmail.com',
        password: bcrypt.hashSync('12345678', 10),
        isAdmin: false
    },
];

export default users;