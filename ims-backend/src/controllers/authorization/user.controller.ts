import { Request, Response } from "express";
import { User } from "../../models/authorization/user";
import { RoleUser } from "../../models/authorization/role_user";
import { Role } from "../../models/authorization/role";

export class UserController {
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.findAll({
        include: [
          {
            model: RoleUser,
            include: [
              {
                model: Role
              }
            ]
          }
        ]
      });

      res.status(200).json({ users });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
  }

  public async assignRoleToUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const roleId = req.body.roleId;

      // Validar que userId no sea undefined
      if (!userId) {
        res.status(400).json({ error: 'ID de usuario es requerido' });
        return;
      }

      // Validar que roleId no sea undefined
      if (!roleId) {
        res.status(400).json({ error: 'ID de rol es requerido' });
        return;
      }

      const userIdNum = parseInt(userId);
      const roleIdNum = parseInt(roleId);

      // Validar que userId sea un número válido
      if (isNaN(userIdNum)) {
        res.status(400).json({ error: 'ID de usuario inválido' });
        return;
      }

      // Validar que roleId sea válido
      if (isNaN(roleIdNum)) {
        res.status(400).json({ error: 'ID de rol inválido' });
        return;
      }

      // Validar que exista el usuario activo
      const user = await User.findOne({
        where: {
          id: userIdNum,
          is_active: "ACTIVE"
        }
      });
      
      if (!user) {
        res.status(404).json({ error: 'Usuario no encontrado o inactivo' });
        return;
      }

      // Validar que exista el rol
      const role = await Role.findByPk(roleIdNum);
      if (!role) {
        res.status(404).json({ error: 'Rol no encontrado' });
        return;
      }

      // Buscar si ya existe un RoleUser activo para este usuario
      const existingRoleUser = await RoleUser.findOne({
        where: {
          user_id: userIdNum,
          is_active: "ACTIVE"
        }
      });

      if (existingRoleUser) {
        // Si existe, actualizar el rol
        await existingRoleUser.update({
          role_id: roleIdNum
        });
        res.status(200).json({
          message: 'Rol actualizado correctamente',
          roleUser: existingRoleUser
        });
      } else {
        // Si no existe, crear uno nuevo
        const newRoleUser = await RoleUser.create({
          user_id: userIdNum,
          role_id: roleIdNum,
          is_active: "ACTIVE"
        });
        res.status(201).json({
          message: 'Rol asignado correctamente',
          roleUser: newRoleUser
        });
      }
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ error: 'Error al asignar el rol al usuario', details: error.message });
    }
  }
}
