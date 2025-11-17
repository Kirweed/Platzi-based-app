export interface ProductDTO {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
}
