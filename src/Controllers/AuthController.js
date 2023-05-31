const UsuarioModel = require("../Models/UsuarioModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
    async login(req, res) {
        try {
            const { email, senha } = req.body;
            
            const usuarioEncontrado = await UsuarioModel.findOne({ email }).select("+senha");
            if(!usuarioEncontrado) 
                return res.status(403).json({message: "Email ou senha invalidos"});

            const ehCorrespondente = await bcrypt.compare(
                senha, 
                usuarioEncontrado.senha
            );
            if(!ehCorrespondente) 
                return res.status(403).json({message: "Email ou senha invalidos"});

                const { senha: hashdSenha, ...usuario} = usuarioEncontrado.toObject(); 
                const token = jwt.sign({
                    usuario
                }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_IN })

               
            res.status(200).json({ token });
        }   catch (error) {
            res
                .status(500)
                .json({message: "Oops!, Algo deu errado...", error: error.message });
        }
    }
}

module.exports = new AuthController()