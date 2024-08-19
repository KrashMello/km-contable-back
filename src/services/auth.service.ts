import { Service } from "elumian/core/decorators";
import { Elumian } from "elumian/core";
import bcrypt from "bcrypt";

@Service
export class Auth {
  async login(data: { username: string; password: string }) {
    const sessionActive = Elumian.cache.list.Auth.map((v) => {
      return Elumian.crypto.hardDecrypt(v.data).username;
    }).filter((v) => v === data.username)[0];
    if (sessionActive) {
      return { type: "warning", message: "Ya hay una sesion activa" };
    }
    const userData = await Elumian.prisma.users.findUnique({
      select: {
        id: true,
        username: true,
        password: true,
      },
      where: {
        username: data.username,
      },
    });
    if (userData) {
      const comparePassword = bcrypt.compareSync(
        data.password,
        userData.password,
      );

      if (comparePassword) {
        delete userData.password;

        return Elumian.cache.singCacheData({
          key: "Auth",
          data: userData,
          encrypted: true,
          expire: true,
        });
      } else {
        return { type: "warning", message: "Contraseña invalida" };
      }
    } else {
      return { type: "warning", message: "nombre de usuario invalido" };
    }
  }
}
