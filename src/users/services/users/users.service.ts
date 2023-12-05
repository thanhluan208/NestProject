import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/createUsers.dto';
import { User } from 'src/users/types/Users';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      age: 25,
      email: 'johnDoe@gmail.com',
      createdAt: new Date(),
    },
    {
      id: 2,
      name: 'Jane Doe',
      age: 25,
      email: 'JaneDoe@gmail.com',
      createdAt: new Date(),
    },
    {
      id: 3,
      name: 'John Smith',
      age: 25,
      email: 'JohnSmith@gmail.com',
      createdAt: new Date(),
    },
  ];

  findUser(id: number) {
    return this.users.find((user) => user.id === id);
  }

  getAllUsers() {
    return this.users;
  }

  createCustomer(newUser: CreateUserDto) {
    const id = this.users.length + 1;
    const createdAt = new Date();
    this.users.push({
      ...newUser,
      id,
      createdAt,
    });
  }
}
