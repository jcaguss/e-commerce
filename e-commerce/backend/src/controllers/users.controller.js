import { userModel } from "../models/users.models.js";
import CustomError from "../services/customErrors.js";
import NErrors from "../services/enums.js";
import { generateUserInfo } from "../services/errors/UserInfo.js";
import { sendRecoveryMail } from "../config/nodemailer.js";
import { createHash } from "../utils/bcrypt.js";
import { deletedUsersMail } from "../config/nodemailer.js"
import crypto from "crypto";

const recoveryLinks = {};

export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({}, 'first_name email rol -_id')
    res.status(200).send({ respuesta: "ok", mensaje: users });
  } catch (error) {
    res.status(500).send({ error: `Error al consultar usuarios ${error}` });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await userModel.findById(id);
    !users
      ? res.status(404).send({ error: "Usuario no encontrado" })
      : res.status(200).send({ respuesta: "ok", mensaje: users });
  } catch (error) {
    res.status(500).send({ error: `Error al consultar usuarios ${error}` });
  }
};

export const putUserById = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, age, email, password } = req.body;
  try {
    if (!first_name || !last_name || !age || !email || !password) {
      CustomError.createError({
        name: "Error al actualizar Usuario",
        cause: generateUserInfo({
          first_name,
          last_name,
          age,
          email,
          password,
        }),
        message: "Error al tratar de actualizar Usuario",
        code: NErrors.INVALID_TYPE_ERROR,
      });
    }
    const user = await userModel.findByIdAndUpdate(id, {
      last_name,
      first_name,
      age,
      email,
      password,
    });
    !user
      ? res.status(404).send({ error: "Usuario no encontrado" })
      : res.status(200).send({ respuesta: "ok", mensaje: user });
  } catch (error) {
    res.status(500).send({ error: error.code, mensaje: error });
  }
};

export const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findByIdAndDelete(id);
    !user
      ? res
          .status(404)
          .send({ respuesta: "error", mensaje: "  User not found" })
      : res.status(200).send({ respuesta: "ok", mensaje: user });
  } catch (error) {
    res.status(400).send({ error: `Error en Eliminar Usuario ${error}` });
  }
};

export const passwRec = (req, res) => {
  const { email } = req.body;
  try {
    const token = crypto.randomBytes(20).toString("hex"); // token unico para que no haya dos usuarion con el mismo link de rec
    recoveryLinks[token] = { email: email, timestamp: Date.now() };
    const recoveryLink = `http://localhost:8080/api/users/reset-password/${token}`;
    sendRecoveryMail(email, recoveryLink);
    res.status(200).send("Correo de recuperacion enviado");
  } catch (error) {
    res.status(500).send(`Error al enviar el mail ${error}`);
  }
};
export const accPassRec = async (req, res) => {
  const { token } = req.params;
  const { newPassword, newPassword2 } = req.body;
  try {
    const linkData = recoveryLinks[token];
    if (linkData && Date.now() - linkData.timestamp <= 3600000) {
      const { email } = linkData;
      if (newPassword == newPassword2) {
        // modificar user con nueva contraseña
        const user = await userModel.findOne({ email: email });
        const id = user._id.toString();
        const passwordHash = createHash(newPassword.toString());
        await userModel.findByIdAndUpdate(id, { password: passwordHash });
        delete recoveryLinks[token];
        res.status(200).send("Contraseña modificada correctamente");
      } else {
        res.status(400).send("Las contraseñas deben ser identicas");
      }
    } else {
      res.status(400).send("Token invalido o expirado. Intente nuevamente.");
    }
  } catch (error) {
    res.status(500).send(`Error al modificar contraseña ${error}`);
  }
};

export const deleteInactiveUsers = async (req, res) => {
  const limit = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  let deletedUsersEmails = []

  try {

    const usersToDelete = await userModel.find({ last_connection: { $lt: limit }, rol: { $ne: 'admin' }})

    deletedUsersEmails = usersToDelete.map(user => user.email)

    for (const emailUser of deletedUsersEmails) {
      deletedUsersMail(emailUser)
    }

    await userModel.deleteMany({ last_connection: { $lt: limit }, rol: { $ne: 'admin' }})
    res.status(200).send({ mensaje: 'Usuarios inactivos eliminados con éxito'})
  } catch (error) {
    res.status(500).send({ mensaje: 'Hubo un error al eliminar los usuarios inactivos', error })
  }
};

