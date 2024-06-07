export class User {
    id: number;
    username: string;
    email: string;
    image: string;
    password: string;
    constructor(
        id: number,
        username: string, 
        email: string,
        image: string, 
        password: string
    ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.image = image;
        this.password = password;
    }
}
